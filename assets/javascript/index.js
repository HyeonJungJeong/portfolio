$contentsThird = document.getElementById(`three`).querySelector(':scope > .container > .contents');
$contentsFour = document.getElementById(`four`).querySelector(':scope > .container > .contents');

/* 요소와 뷰포트의 가시성 교차를 관찰하기 위한 객체 IntersectionObserver 객체화 및 관찰 함수 정의 */
const intersectionObserver = new IntersectionObserver((entries) => {
    /* 모든 관찰 대상(entries)에 대해 */
    entries.forEach((entry) => {
        /* 만약 관찰 대상이 뷰포트의 가시성에 대해 교차중이면(보이고 있으면) */
        if (entry.isIntersecting === true) {
            /* visible 클래스 추가 */
            entry.target.classList.add('visible');
        } else {
            /* 안 보이면 visible 클래스 제거 */
            entry.target.classList.remove('visible');
        }
    });
}, {
    /* 뷰포트에 대한 마진 -80px는 실제 관찰할 뷰포트보다 더 좁은 영역에 대해 관찰을 하겠다는 의미. 더 큰 값이나, 작은 값을 부여하여 차이를 관찰해 볼 것. */
    rootMargin: '-80px'
});
/* 모든 .box를 선택하고 유사배열객체(NodeList)를 실제 배열로 전환하기 위해 Array.from 호출 */
const $featuresThird = Array.from($contentsThird.querySelectorAll(':scope > .feature'));
/* 선택한 .box 요소들을 반복하여 교차 관찰 객체에 관찰(observer)함수 호출 */
$featuresThird.forEach(($feature) => intersectionObserver.observe($feature));

const $featuresFour = Array.from($contentsFour.querySelectorAll(':scope > .feature'));
/* 선택한 .box 요소들을 반복하여 교차 관찰 객체에 관찰(observer)함수 호출 */
$featuresFour.forEach(($feature) => intersectionObserver.observe($feature));


/* 아래 로직은 그냥 body가 스크롤 됨에 따라 스크롤 퍼센트(0% ~ 100%)에 따른 배경 색상을 지정하기 위한 로직 */
/* 가장 어두운 색 바운더리 지정 */
const [darkestR, darkestG, darkestB] = [33, 15, 55];
/* 가장 밝은 색 바운더리 지정 */
const [lightestR, lightestG, lightestB] = [220, 160, 109];

window.addEventListener('scroll', () => {
    /* 스크롤 % 계산 */
    /* 과거에는 document.body 로 접근했으나 현대에는 document.documentElement로 접근 */
    /* document.documentElement.scrollTop: 현재 세로축으로 스크롤된 px 값(가장 상단에서 0) */
    /* document.documentElement.scrollHeight: 스크롤 할 수 있는 최대 높이인 px 값(문서 가장 위부터 가장 아래까지의 높이) */
    /* document.documentElement.clientHeight: 화면 상 보고있는 페이지의 높이 */
    /* scrollHeight에서 clientHeight를 빼주는 이유는 scrollTop은 바닥까지 도달할 수 없으나 scrollHeight는 바닥까지의 높이를 계산함으로 100%가 나올 수 없기 때문임. */
    const scrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    const r = Math.trunc(darkestR + (lightestR - darkestR) * scrollPercent);
    const g = Math.trunc(darkestG + (lightestG - darkestG) * scrollPercent);
    const b = Math.trunc(darkestB + (lightestB - darkestB) * scrollPercent);
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

const MAX_ROTATE_DEG = 10; // 회전시킬 수 있는 최대 각도 정의(10도)
const $box = document.getElementById('main').querySelector(':scope > .wrapper > #one > .container > .introduction > .box');
document.body.addEventListener('mousemove', (e) => {
    // body 태그에서 마우스 커서가 움직일때 해당 마우스 커서의 위치를 문서 크기로 나누어 백분율로 계산하여 rotate 시킬 각도로 환산
    const xPct = e.x / document.documentElement.clientWidth;
    const yPct = e.y / document.documentElement.clientHeight;
    const yDeg = (xPct - 0.5) * 2 * MAX_ROTATE_DEG;
    const xDeg = (yPct - 0.5) * 2 * MAX_ROTATE_DEG;
    $box.style.transform = `rotateX(${-xDeg}deg) rotateY(${yDeg}deg) translate(-50%, -50%)`;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

let slideIndex = 0;

function openERPModal() {
    document.getElementById("ERP-modal").style.display = "block";
    showERPSlides(slideIndex);
}

function closeERPModal() {
    document.getElementById("ERP-modal").style.display = "none";
    slideIndex = 0;
}

function plusERPSlides(n) {
    showERPSlides(slideIndex += n);
}

function showERPSlides(n) {
    let slides = document.getElementsByClassName("ERP-slide");
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function openTAZAModal() {
    document.getElementById("TAZA-modal").style.display = "block";
    showTAZASlides(slideIndex);
}

function closeTAZAModal() {
    document.getElementById("TAZA-modal").style.display = "none";
    slideIndex = 0;
}

function plusTAZASlides(n) {
    showTAZASlides(slideIndex += n);
}

function showTAZASlides(n) {
    let slides = document.getElementsByClassName("TAZA-slide");
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function openECSModal() {
    document.getElementById("ECS-modal").style.display = "block";
    showECSSlides(slideIndex);
}

function closeECSModal() {
    document.getElementById("ECS-modal").style.display = "none";
    slideIndex = 0;
}

function plusECSSlides(n) {
    showECSSlides(slideIndex += n);
}

function showECSSlides(n) {
    let slides = document.getElementsByClassName("ECS-slide");
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function openESPModal() {
    document.getElementById("ESP-modal").style.display = "block";
    showESPSlides(slideIndex);
}

function closeESPModal() {
    document.getElementById("ESP-modal").style.display = "none";
    slideIndex = 0;
}

function plusESPSlides(n) {
    showESPSlides(slideIndex += n);
}

function showESPSlides(n) {
    let slides = document.getElementsByClassName("ESP-slide");
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}



