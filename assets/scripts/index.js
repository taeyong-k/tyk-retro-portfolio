const textElement = document.getElementById('text'); // 텍스트를 표시할 HTML 요소
const texts = ['HELLO WORLD!', 'TY PORTFOLIO ✌️', 'JR. DEVELOPER']; // 타이핑할 텍스트들
let textIndex = 0; // 현재 타이핑할 텍스트의 인덱스
let index = 0; // 현재 텍스트의 문자 위치
let typingInterval; // 타이핑을 위한 setTimeout ID
let isTyping = false; // 타이핑 상태 추적


// 타이핑 함수
function typeText() {
    if (!isTyping) return; // 타이핑 상태가 아니면 실행되지 않도록

    // 현재 텍스트의 모든 글자가 출력되지 않았다면
    if (index < texts[textIndex].length) {
        textElement.innerHTML += texts[textIndex][index]; // 한 글자씩 화면에 추가
        index++; // 인덱스를 하나 증가시켜서 다음 글자 표시
        typingInterval = setTimeout(typeText, 150); // 150ms 후에 다시 타이핑
    } else if (textIndex < texts.length - 1) {
        textIndex++; // 다음 텍스트로 넘어가기
        index = 0; // 문자 인덱스를 0으로 초기화
        setTimeout(() => {
            textElement.innerHTML += '<br>'; // 줄바꿈
            typeText(); // 다음 텍스트 타이핑 시작
        }, 800); // 800ms 후에 다음 텍스트 시작
    } else {
        setTimeout(() => {
            textElement.innerHTML = ''; // 텍스트 초기화 (페이지 새로 고침처럼)
            textIndex = 0; // 첫 번째 텍스트로 돌아가기
            index = 0; // 문자 인덱스를 0으로 초기화
            typeText(); // 다시 처음부터 타이핑 시작
        }, 5000); // 텍스트가 다 끝난 후 2초 후에 초기화하고 다시 시작
    }
}
// 나중에 지우기
const toolbar = document.querySelector('#header > .toolbar');
toolbar.classList.add('active');
// 로딩창 함수
document.addEventListener("DOMContentLoaded", function () {
    let loadingText = document.getElementById("loadingText");
    let loadingForm = document.getElementById("loadingForm");
    let root = document.getElementById('root');
    let intro = document.getElementById("intro"); // 메인 화면 요소
    let progress = 0;

    // 처음에는 메인 화면 숨기기
    root.style.display = "none";
    intro.style.display = "none";

    let interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 2; // 2~6% 랜덤 증가
        if (progress > 100) progress = 100;
        loadingText.textContent = `Loading... ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingForm.style.animation = "fadeOut 1s forwards";
            }, 500);
        }
    }, 150); // 로딩 속도 조정

    // 애니메이션이 끝나면 로딩 화면을 숨기고 메인 화면 표시
    loadingForm.addEventListener("animationend", () => {
        loadingForm.style.display = "none";
        root.style.display = "block"; // root 화면 표시
        intro.style.display = "flex"; // 메인 화면 표시
    });
});

// 애니메이션이 끝난 후 타이핑 시작 + 툴바 등장
document.getElementById('intro').addEventListener('animationend', function (event) {
    if (event.animationName === 'crt-power-on') {
        isTyping = true;
        textElement.innerHTML = ''; // 기존 텍스트 초기화
        typeText(); // 타이핑 시작

        // 툴바 등장
        const toolbar = document.querySelector('#header > .toolbar');
        toolbar.classList.add('active');
    }
});
