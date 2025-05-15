# Intro 페이지 개발 기록 및 계획

---

## ⚠️ 문제점

- 다른 환경에서 인트로 페이지 렉 발생 → 최적화 필요  
- 비디오로 대체하는 방안 검토 중  
  - 화면 녹화 툴 사용  
  - 필요 시 비디오 편집 툴로 편집 후 적용  

---

## 📌 개발 계획 및 참고

### Toolbar

- 참고 사이트: [2024 프론트엔드 | 김상준](https://portfoliosj-react.netlify.app/)

### Intro

- CRT 모니터 효과 + 레트로 타이핑 효과 적용  
- 인트로(표지) 화면으로 최종 채택  
- 이보아 개발자님의 [Retro Typing Effect 구현하기](https://velog.io/@leeboa2003/%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98Retro-Typing-Effect-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0) 참고

---

## ✂️ 작업 내역 요약

### Toolbar

- 폰트  
  - EN: DotGothic16  
  - KR: IBM Plex Sans KR  
- 위치 및 크기  
  - 상단 고정, 스크롤 따라오도록 설정  
- 애니메이션  
  - 인트로 종료 후 부드럽게 등장  
  - CRT 느낌의 색상과 텍스트 그림자 적용  
  - Hover 시 약간 확대 효과

### Intro

- CSS  
  - 로딩창 추가 (단순함 보완)  
  - CRT 효과 강화  
    - scanLines 애니메이션 개선 (before/after 분리, 위→아래 스캔 라인)  
    - CRT 전원 켜짐 애니메이션  
    - RGB 색상 분리(글리치) 효과  
    - 미세 흔들림 효과  
- JS  
  - 타이핑 함수 개선 (중복 실행 방지 및 반복 타이핑 구현)  
  - 로딩창 애니메이션 (2~6% 랜덤 증가)  
  - 전원 켜짐 애니메이션 완료 후 타이핑 시작  

---

## 🚧 문제 해결 기록

### 1) 타이핑 텍스트 색상 문제

- 문제  
  - 오프닝 애니메이션 추가 후 텍스트 색상이 너무 밝고 튀는 현상 발생  
- 원인  
  - 오프닝 애니메이션 내 `color` 및 `background` 속성 중복 적용  
  - `z-index` 및 위치 설정 문제도 영향  
- 해결  
  - 불필요한 색상 관련 속성 제거  
  - `z-index` 재조정 및 투명도 조절  
  - 기존 코드를 이보아님 코드 기반으로 재구성  
- 회고  
  - 불필요한 코드 제거와 역할 분리가 문제 해결의 핵심  
  - 명확하고 간결한 코드 유지가 유지보수에 유리함

### 2) 글리치 효과 애니메이션 문제

- 문제  
  - JS로 한 글자씩 렌더링 방식 때문에 글리치 효과 적용 어려움  
  - `text-shadow` 조절 시 기존 CRT 느낌 훼손  
- 해결  
  - 글리치 효과는 포기  
  - 대신 CRT 화면 깜빡임 및 전원 플래시 애니메이션으로 분위기 강화  
- 회고  
  - 구현 불가능한 효과는 대체 애니메이션으로 분위기 살리기 중요

---

## 🧪 test code (optional)  
### Retro Typing Effect & 애니메이션 구현  

인트로 화면에 적용한 레트로 타이핑 효과와 애니메이션 주요 구현 내용입니다.  

### 주요 특징  

- **CSS 애니메이션**으로 타이핑 커서 깜빡임과 CRT 모니터 스캔 라인 효과 구현  
- 텍스트가 출력되는 박스가 세로→가로→전체 확장되는 3단계 애니메이션 적용  
- 애니메이션 종료 후 JS로 타이핑 효과 시작, 여러 문장 순차 출력 및 반복 재생  

### 사용 기술 및 핵심 코드  
```
#section1 {
  position: relative;
  background-color: black;
  color: #56dfb4;
  font-family: 'PyeongChangPeace-Bold', sans-serif;
  font-size: 72px;
  letter-spacing: 5px;
  width: 70vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* 타이핑 텍스트 및 커서 스타일 */
.console {
  white-space: nowrap;
  text-shadow: 0 0 10px #00FF00;
  position: relative;
}

.cursor {
  animation: blink 0.8s infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* 스캔라인 애니메이션 */
.scanlines::before {
  height: 2px;
  background-color: rgba(0,255,0,0.2);
  animation: scanlines 10s linear infinite;
}

.scanlines::after {
  background: repeating-linear-gradient(0deg, transparent 1px, rgba(0,255,0,0.2) 2px);
  background-size: 100% 4px;
  animation: scanlines 10s steps(60) infinite;
}

@keyframes scanlines {
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
}

/* 오프닝 애니메이션 */
.typing {
  animation: expandHeight 2.25s cubic-bezier(...) 1 forwards,
             expandWidth 2s cubic-bezier(...) 2.52s forwards,
             fullExpand 2s cubic-bezier(...) 4.25s forwards;
}
```

```
const textElement = document.getElementById('text');
const texts = ['', 'HELLO WORLD!', 'TY PORTFOLIO✌️'];
let textIndex = 0, index = 0;
let typingInterval;
let isTyping = false;

function typeText() {
  if (!isTyping) return;
  
  if (index < texts[textIndex].length) {
    textElement.innerHTML += texts[textIndex][index];
    index++;
    typingInterval = setTimeout(typeText, 150);
  } else if (textIndex < texts.length - 1) {
    textIndex++;
    index = 0;
    setTimeout(() => {
      textElement.innerHTML += '<br>';
      typeText();
    }, 800);
  } else {
    setTimeout(() => {
      textElement.innerHTML = '';
      textIndex = 0;
      index = 0;
      typeText();
    }, 2000);
  }
}

// 애니메이션 종료 후 타이핑 시작
document.getElementById('section1').addEventListener('animationend', e => {
  if (e.animationName === 'fullExpand') {
    isTyping = true;
    textElement.innerHTML = '';
    typeText();
  }
});
```
