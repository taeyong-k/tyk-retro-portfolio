const textElement = document.getElementById('text');                // 텍스트를 표시할 HTML 요소
const texts = ['HELLO WORLD!', 'TY PORTFOLIO ✌️', 'JR. DEVELOPER']; // 타이핑할 텍스트들
let textIndex = 0;      // 현재 타이핑할 텍스트의 인덱스
let index = 0;          // 현재 텍스트의 문자 위치
let typingInterval;     // 타이핑을 위한 setTimeout ID
let isTyping = false;   // 타이핑 상태 추적


// ✅ intro: retro typing effect 함수
function typeText() {
    if (!isTyping) return;  // 타이핑 상태가 아니면 실행되지 않도록

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

const $loadingForm = document.getElementById("loadingForm");
const $loadingText = document.getElementById("loadingText");
const $root = document.getElementById("root");
const $intro = document.getElementById("intro");
const $toolbar = document.querySelector('.toolbar');

// ✅ 로딩 퍼센트 증가 시뮬레이션
let progress = 0;
let interval = setInterval(() => {          // setInterval: 함수 (Function) | 일정 간격으로 반복 실행
    progress++;
    if (progress > 100) {
        progress = 100;
    }
    $loadingText.textContent = `Loading... ${progress}%`;

    if (progress === 100) {
        clearInterval(interval);            // clearInterval: 함수 (Function) | setInterval을 취소
        setTimeout(() => {                  // setTimeout: 함수 (Function) | 일정 시간 후 한 번만 실행
            $loadingForm.style.opacity = '0';
        }, 300);
    }
});

// ✅ 페이지 리소스 로드 완료 이벤트 (페이지 안의 모든 리소스(이미지, CSS 등))
//  -> 느린 컴퓨터에선 적절한 로딩창 효과, 빠른 컴퓨터에선 빠르게 마무리 되는 자연스러운 UX를 위함
window.onload = () => {
    if (progress < 100) {                       // 만약 progress가 아직 100이 안 됐다면,
        clearInterval(interval);
        let fastInterval = setInterval(() => {  // 빠르게 1씩 증가시키는 interval 시작
            progress++;
            if (progress >= 100) {              // 마찬가지로 100이상 시 종료
                progress = 100;
                $loadingText.textContent = `Loading... ${progress}%`;
                clearInterval(fastInterval);
                setTimeout(() => {
                    $loadingForm.style.opacity = '0';
                }, 300);
                return;
            }
            $loadingText.textContent = `Loading... ${progress}%`;
        }, 10);                                 // 10ms 간격으로 빠르게 100%까지 올려버림
    }
};

// ✅ 로딩 끝: → intro 등장 → intro 애니메이션 시작
$loadingForm.addEventListener('transitionend', () => {
    $loadingForm.style.display = 'none';
    $root.style.display = 'block';

    setTimeout(() => {                      // 500ms 딜레이 후 intro 애니메이션 시작
        $intro.style.display = 'flex';
        $intro.classList.add('animate');
    }, 500);
});

// ✅ intro 애니메이션 끝난 후 실행
$intro.addEventListener('animationend', () => {
    $toolbar.classList.add('active');       // 툴바 등장

    setTimeout(() => {                      // 툴바 내려오는 데 600ms 걸리니까
        isTyping = true;                    // 그 직후 intro: retro typing effect 타이핑 시작
        textElement.innerHTML = '';
        typeText();
    }, 600);                                // ← toolbar - transition 시간에 맞춰줌
});

