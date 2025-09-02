const textElement = document.getElementById('text');                // 텍스트를 표시할 HTML 요소
const texts = ['HELLO WORLD!', 'TY PORTFOLIO ✌️', 'JR. DEVELOPER']; // 타이핑할 텍스트들
let textIndex = 0;      // 현재 타이핑할 텍스트의 인덱스
let index = 0;          // 현재 텍스트의 문자 위치
let typingInterval;     // 타이핑을 위한 setTimeout ID
let isTyping = false;   // 타이핑 상태 추적


// ✅ intro: retro typing effect 함수
function typeText() {
    if (!isTyping) return;                                  // 타이핑 상태가 아니면 실행되지 않도록

    // 현재 텍스트의 모든 글자가 출력되지 않았다면
    if (index < texts[textIndex].length) {
        textElement.innerHTML += texts[textIndex][index];   // 한 글자씩 화면에 추가
        index++;                                            // 인덱스를 하나 증가시켜서 다음 글자 표시
        typingInterval = setTimeout(typeText, 150);         // 150ms 후에 다시 타이핑
    } else if (textIndex < texts.length - 1) {
        textIndex++;                                        // 다음 텍스트로 넘어가기
        index = 0;                                          // 문자 인덱스를 0으로 초기화
        setTimeout(() => {
            textElement.innerHTML += '<br>';                // 줄바꿈
            typeText();                                     // 다음 텍스트 타이핑 시작
        }, 800);                                            // 800ms 후에 다음 텍스트 시작
    } else {
        setTimeout(() => {
            textElement.innerHTML = '';                     // 텍스트 초기화 (페이지 새로 고침처럼)
            textIndex = 0;                                  // 첫 번째 텍스트로 돌아가기
            index = 0;                                      // 문자 인덱스를 0으로 초기화
            typeText();                                     // 다시 처음부터 타이핑 시작
        }, 5000);                                           // 텍스트가 다 끝난 후 5초 후에 초기화하고 다시 시작
    }
}

const $intro = document.getElementById("legacy-intro");
const $toolbar = document.querySelector('.toolbar');

// ✅ 인트로 시작
window.addEventListener('DOMContentLoaded', () => {
    $intro.style.display = 'flex';
    $intro.classList.add('animate');
});

// ✅ intro 애니메이션 끝난 후 툴바 → 타이핑
$intro.addEventListener('animationend', () => {
    $toolbar.classList.add('active');       // 툴바 등장

    setTimeout(() => {                      // 툴바 내려오는 데 600ms 걸리니까
        isTyping = true;                    // 그 직후 intro: retro typing effect 타이핑 시작
        textElement.innerHTML = '';
        typeText();
    }, 600);                                // ← toolbar - transition 시간에 맞춰줌
});