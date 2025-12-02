// ✅ 초안: toolbar 버튼 클릭 시 해당 섹션으로 이동
// const toolbarButtons = document.querySelectorAll("#toolbar button");
//
// toolbarButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//         const targetId = button.dataset.target;
//         const targetSection = document.getElementById(targetId);
//
//         if (targetSection) {
//             targetSection.scrollIntoView({behavior: "smooth"});
//         }
//     });
// });


// ✅ 툴바 이동 오류 수정 테스트: 이동중 스크롤, 클릭시 뒤틀림 발생
// let isScrolling = false; // 이동 중 플래그
//
// document.querySelectorAll("#toolbar button").forEach(btn => {
//     btn.addEventListener("click", () => {
//         if (isScrolling) return; // 이동 중이면 무시
//
//         const targetId = btn.dataset.target;
//         const targetEl = document.getElementById(targetId);
//         if (!targetEl) return;
//
//         isScrolling = true; // 이동 시작
//
//         // scrollTo 이동
//         window.scrollInstance.scrollTo(targetEl, {
//             offset: 0,
//             duration: 800,
//             easing: [0.25, 0, 0.35, 1],
//             callback: () => {
//                 // 이동 끝난 후 위치 고정
//                 const originalLerp = window.scrollInstance.lerp;
//                 window.scrollInstance.lerp = 0;
//
//                 requestAnimationFrame(() => {
//                     window.scrollInstance.lerp = originalLerp;
//                     isScrolling = false; // 이동 종료 후 다시 허용
//                 });
//
//                 window.scrollInstance.update();
//             }
//         });
//     });
// });
//
// // 이동 중 스크롤 막기
// window.addEventListener("wheel", (e) => {
//     if (isScrolling) e.preventDefault();
// }, { passive: false });


// ✅ 툴바 이동(순간이동)으로 변경 수정 테스트:
// 툴바 순간이동 후 빠른 안정화 -> 문제: 스크롤의 관성이 남아있을때, 이전위치가 보이는 현상 발견
// 관성 있을땐 이동 안되게끔! 그냥 막아버림
// window.addEventListener('DOMContentLoaded', () => {
//     const toolbar = document.querySelector('#toolbar');
//     const scrollInstance = window.scrollInstance;
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     if (!toolbar || !scrollInstance || !scrollContainer) return;
//
//     // 🔒 스크롤 잠금
//     const lockScroll = () => {
//         scrollContainer.style.pointerEvents = "none";
//         document.body.style.overflow = "hidden";
//     };
//
//     // 🔓 스크롤 해제
//     const unlockScroll = () => {
//         scrollContainer.style.pointerEvents = "";
//         document.body.style.overflow = "";
//     };
//
//     // -------------------------------
//     // 1️⃣ 관성 체크
//     // -------------------------------
//     let isScrolling = false;
//     let scrollTimeout;
//
//     scrollInstance.on('scroll', () => {
//         isScrolling = true;
//
//         clearTimeout(scrollTimeout);
//         scrollTimeout = setTimeout(() => {
//             isScrolling = false;
//         }, 50); // 관성 안정화 시간(ms)
//     });
//
//     // -------------------------------
//     // 2️⃣ 버튼 클릭 시 이동
//     // -------------------------------
//     toolbar.querySelectorAll('button[data-target]').forEach(button => {
//         button.addEventListener('click', (e) => {
//             e.preventDefault();
//
//             // 관성 중이면 이동 무시
//             if (isScrolling) return;
//
//             const targetId = button.getAttribute('data-target');
//             const targetEl = document.getElementById(targetId);
//             if (!targetEl) return;
//
//             // 1️⃣ 이동 중 입력 막기
//             lockScroll();
//
//             // 2️⃣ Locomotive 순간이동
//             scrollInstance.scrollTo(targetEl, {
//                 offset: 0,
//                 duration: 0,        // 즉시 이동 (텔포)
//                 disableLerp: true,  // 보간 끔
//                 callback: () => {
//                     // 3️⃣ 상태 강제 업데이트
//                     requestAnimationFrame(() => scrollInstance.update());
//
//                     // 4️⃣ 잠금 해제 (짧은 딜레이)
//                     setTimeout(() => {
//                         unlockScroll();
//                     }, 100);
//                 }
//             });
//         });
//     });
// });


// ✅ [추가] 커서 색깔 변환 주기 코드
// window.addEventListener('DOMContentLoaded', () => {
//     const toolbar = document.querySelector('#toolbar');
//     const scrollInstance = window.scrollInstance;
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//     const cursorOuter = document.querySelector(".cursor--large");
//     const cursorInner = document.querySelector(".cursor--small");
//
//     if (!toolbar || !scrollInstance || !scrollContainer || !cursorOuter || !cursorInner) return;
//
//     // 스크롤 잠금 / 해제
//     const lockScroll = () => {
//         scrollContainer.style.pointerEvents = "none";
//         document.body.style.overflow = "hidden";
//     };
//     const unlockScroll = () => {
//         scrollContainer.style.pointerEvents = "";
//         document.body.style.overflow = "";
//     };
//
//     // 관성 체크
//     let isScrolling = false;
//     let scrollTimeout;
//     let hoverButton = null;
//
//     scrollInstance.on('scroll', () => {
//         isScrolling = true;
//         clearTimeout(scrollTimeout);
//
//         scrollTimeout = setTimeout(() => {
//             isScrolling = false;
//
//             // 관성 끝나면 툴바 위 커서 색상 원래 상태로 복귀
//             if (hoverButton) {
//                 gsap.to(cursorOuter, {
//                     duration: 0.2,
//                     borderColor: "rgb(255,60,60)",
//                     backgroundColor: "transparent",
//                     boxShadow: "none"
//                 });
//                 gsap.to(cursorInner, {
//                     duration: 0.2,
//                     backgroundColor: "rgb(255,60,60)",
//                     boxShadow: "none"
//                 });
//             }
//
//         }, 50); // 관성 안정화 시간
//     });
//
//     // 툴바 버튼 이벤트
//     toolbar.querySelectorAll('button[data-target]').forEach(button => {
//
//         // 클릭 이동
//         button.addEventListener('click', (e) => {
//             e.preventDefault();
//             if (isScrolling) return; // 관성 중 이동 금지
//
//             const targetId = button.getAttribute('data-target');
//             const targetEl = document.getElementById(targetId);
//             if (!targetEl) return;
//
//             lockScroll();
//             scrollInstance.scrollTo(targetEl, {
//                 offset: 0,
//                 duration: 0,
//                 disableLerp: true,
//                 callback: () => {
//                     requestAnimationFrame(() => scrollInstance.update());
//                     setTimeout(() => unlockScroll(), 100);
//                 }
//             });
//         });
//
//         // 마우스 오버
//         button.addEventListener('pointerenter', () => {
//             hoverButton = button;
//
//             if (isScrolling) {
//                 // 관성 중 툴바 hover → 클릭 불가 느낌 색상 + 발광
//                 gsap.to(cursorOuter, {
//                     duration: 0.2,
//                     borderColor: "#777777",                 // 탁한 회색
//                     backgroundColor: "rgba(119,119,119,0.3)",
//                     boxShadow: "0 0 8px rgba(119,119,119,0.6)"
//                 });
//                 gsap.to(cursorInner, {
//                     duration: 0.2,
//                     backgroundColor: "#777777",
//                     boxShadow: "0 0 5px rgba(119,119,119,0.7)"
//                 });
//             }
//         });
//
//         // 마우스 벗어남
//         button.addEventListener('pointerleave', () => {
//             hoverButton = null;
//
//             // 원래 색상 복귀
//             gsap.to(cursorOuter, {
//                 duration: 0.2,
//                 borderColor: "rgb(255,60,60)",
//                 backgroundColor: "transparent",
//                 boxShadow: "none"
//             });
//             gsap.to(cursorInner, {
//                 duration: 0.2,
//                 backgroundColor: "rgb(255,60,60)",
//                 boxShadow: "none"
//             });
//         });
//     });
// });


// ✅ 스크롤 방식 자체를 변경 gsap로만 적용
