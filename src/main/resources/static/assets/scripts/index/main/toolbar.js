// // toolbar 버튼 클릭 시 해당 섹션으로 이동
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

// // 툴바 이동 잘됨 -> 문제: 이동후, 이전 스크롤 위치가 순간적으로 보임
// document.querySelectorAll("#toolbar button").forEach(btn => {
//     btn.addEventListener("click", () => {
//         const targetId = btn.dataset.target;
//         const targetEl = document.getElementById(targetId);
//         if (!targetEl) return;
//
//         window.scrollInstance.scrollTo(targetEl, {
//             offset: 0,
//             duration: 800,
//             easing: [0.25, 0, 0.35, 1],
//             callback: () => {
//                 // 여기서는 update만, refresh는 절대 호출하지 않음
//                 window.scrollInstance.update();
//             }
//         });
//     });
// });

// // 위 코드에서 오류 수정 된듯함 -> 문제: 이동중에 이동하면 꼬임현상 발생
// document.querySelectorAll("#toolbar button").forEach(btn => {
//     btn.addEventListener("click", () => {
//         const targetId = btn.dataset.target;
//         const targetEl = document.getElementById(targetId);
//         if (!targetEl) return;
//
//         // 1. scrollTo 이동
//         window.scrollInstance.scrollTo(targetEl, {
//             offset: 0,
//             duration: 800,
//             easing: [0.25, 0, 0.35, 1],
//             callback: () => {
//                 // 2. 이동 끝난 후 잠시 lerp 0으로 고정
//                 const originalLerp = window.scrollInstance.lerp;
//                 window.scrollInstance.lerp = 0;
//
//                 // 3. 다음 프레임에서 원래 lerp로 복귀
//                 requestAnimationFrame(() => {
//                     window.scrollInstance.lerp = originalLerp;
//                 });
//
//                 // 4. 위치 강제 업데이트
//                 window.scrollInstance.update();
//             }
//         });
//     });
// });

// // 툴바 이동중 막기 -> 문제: 이동중 스크롤, 클릭시 뒤틀림 발생
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




