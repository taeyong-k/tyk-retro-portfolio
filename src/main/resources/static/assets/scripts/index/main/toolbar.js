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
//

// // 이전 위치 깜빢이는 버그 수정중...!? (프로젝트때문인것도 있는거같아서 하고 나서 다시 수정해보자!)
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
//         scrollInstance.update();
//     };
//
//     // 관성 체크
//     let isScrolling = false;
//     let scrollTimeout = null;
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
//         }, 50); // 관성 안정화 시간
//     });
//
//     // 툴바 버튼 이벤트
//     toolbar.querySelectorAll('button[data-target]').forEach(button => {
//
//         // 클릭 이동
//         button.addEventListener('click', (e) => {
//             e.preventDefault();
//
//             // 관성 중 이동 금지 (원래 코드 로직 유지)
//             if (isScrolling) return;
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
//             });
//
//             // 안정화 후 스크롤 다시 활성화
//             setTimeout(() => {
//                 unlockScroll();
//             }, 100);
//         });
//
//         // 마우스 오버
//         button.addEventListener('pointerenter', () => {
//             hoverButton = button;
//
//             // 관성 중이면 클릭 불가 느낌 색상 + 발광 (원래 코드 로직 유지)
//             if (isScrolling) {
//                 gsap.to(cursorOuter, {
//                     duration: 0.2,
//                     borderColor: "#777777",
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

document.querySelectorAll("#toolbar button").forEach(btn => {
    btn.addEventListener("click", () => {
        const targetEl = document.getElementById(btn.dataset.target);
        if (!targetEl || !window.smoother) return;
        if (window.isScrollingToSection) return;

        window.isScrollingToSection = true;

        // 클릭 중 커서 색상 즉시 변환
        if (window.updateCursorColor) window.updateCursorColor(true);

        window.smoother.scrollTo(targetEl, true);

        setTimeout(() => {
            window.isScrollingToSection = false;

            // 이동 끝나면 커서 원래색 강제 복귀
            if (window.updateCursorColor) window.updateCursorColor(false);
        }, 700);
    });
});


