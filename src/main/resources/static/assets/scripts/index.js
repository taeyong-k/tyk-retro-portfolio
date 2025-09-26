import './index/main/toolbar.js'
import './index/main/intro.js'
import './index/main/about.js'
import './index/main/skill.js'
import './index/main/project.js'
import './index/main/footer.js'

// 원래 사용하던 코드
// document.addEventListener("DOMContentLoaded", () => {
//     const {gsap} = window;
//
//     const root = document.getElementById('root');
//     const cursorOuter = root.querySelector(".cursor--large");
//     const cursorInner = root.querySelector(".cursor--small");
//     let isStuck = false;
//     let mouse = {
//         x: -100,
//         y: -100,
//     };
//
//     // 스크롤 보정
//     let scrollHeight = 0;
//     window.addEventListener('scroll', () => {
//         scrollHeight = window.scrollY;
//     });
//
//     // 버튼에 마우스 이벤트 (cursorOuter 커짐 <-> 원상복구)
//     const buttons = document.querySelectorAll("button");
//     buttons.forEach((button) => {
//         button.addEventListener("pointerenter", handleMouseEnter);
//         button.addEventListener("pointerleave", handleMouseLeave);
//     });
//
//     // 마우스 이동 시 좌표 업데이트
//     document.body.addEventListener("pointermove", updateCursorPosition);
//
//     // 클릭 시, 작은 커서 애니메이션 (scale: 1만큼 커지기)
//     document.body.addEventListener("pointerdown", () => {
//         gsap.to(cursorInner, 0.15, {
//             scale: 2,
//         });
//     });
//     document.body.addEventListener("pointerup", () => {
//         gsap.to(cursorInner, 0.15, {
//             scale: 1,
//         });
//     });
//
//
//     let cursorOuterOriginalState = {width: 0, height: 0};
//     let isFirstMove = true;
//
//     // 마우스 좌표 추적 (현재 마우스 위치 실시간으로 저장)
//     function updateCursorPosition(e) {
//         mouse.x = e.pageX;
//         mouse.y = e.pageY;
//
//         // 첫 마우스 움직임 시에만 커서 크기 측정
//         if (isFirstMove) {
//             cursorOuterOriginalState.width = cursorOuter.getBoundingClientRect().width;
//             cursorOuterOriginalState.height = cursorOuter.getBoundingClientRect().height;
//             isFirstMove = false;
//         }
//     }
//
//     // 커서 위치 업데이트 애니메이션
//     function updateCursor() {
//         // 작은 커서: 항상 마우스 따라다니도록
//         gsap.set(cursorInner, {
//             x: mouse.x - cursorInner.offsetWidth / 2,
//             y: mouse.y - cursorInner.offsetHeight / 2,
//         });
//
//         // 큰 커서: 버튼 위가 아닐때만, 따라 다니도록
//         if (!isStuck) {
//             gsap.to(cursorOuter, {
//                 duration: 0.15,
//                 x: mouse.x - cursorOuterOriginalState.width / 2,
//                 y: mouse.y - cursorOuterOriginalState.height / 2,
//             });
//         }
//
//         // 프레임 마다 커서 위치 갱신
//         requestAnimationFrame(updateCursor);
//     }
//
//     updateCursor();
//
//     // 버튼 들어갈때: 커서 바꾸기 (버튼 크기만큼 커지게 + 사각형)
//     function handleMouseEnter(e) {
//         isStuck = true;
//         const targetBox = e.currentTarget.getBoundingClientRect();
//
//         // 버튼의 실제 border-radius 가져오기
//         const style = window.getComputedStyle(e.currentTarget);
//         const borderRadius = style.borderRadius;
//
//         gsap.to(cursorOuter, 0.2, {
//             x: targetBox.left,
//             y: targetBox.top + scrollHeight,
//             width: targetBox.width,
//             height: targetBox.height,
//             borderRadius: borderRadius, // 버튼 모서리 그대로 적용
//             backgroundColor: "rgba(255, 255, 255, 0.1)",
//         });
//     }
//
//     // 버튼 내려올때: 원래 크기와 원형 복귀
//     function handleMouseLeave(e) {
//         isStuck = false;
//         gsap.to(cursorOuter, 0.2, {
//             width: cursorOuterOriginalState.width,
//             height: cursorOuterOriginalState.height,
//             borderRadius: "50%",
//             backgroundColor: "transparent",
//         });
//     }
//
//     // 스킬 nav 링크 선택
//     const skillItems = document.querySelectorAll("#skillNav li");
//
//     skillItems.forEach((li) => {
//         li.addEventListener("pointerenter", (e) => {
//             isStuck = true;
//             const rect = li.getBoundingClientRect();
//             const padding = 8; // li::before inset 값에 맞춤
//             gsap.to(cursorOuter, 0.2, {
//                 x: rect.left - padding,
//                 y: rect.top - padding + scrollHeight,
//                 width: rect.width + padding * 2,
//                 height: rect.height + padding * 2,
//                 borderRadius: 0,
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//             });
//         });
//
//         li.addEventListener("pointerleave", () => {
//             isStuck = false;
//             gsap.to(cursorOuter, 0.2, {
//                 width: cursorOuterOriginalState.width,
//                 height: cursorOuterOriginalState.height,
//                 borderRadius: "50%",
//                 backgroundColor: "transparent",
//             });
//         });
//     });
//
// });

// 라이브러리 추가 후 보정 한 코드(루트 안)
// document.addEventListener("DOMContentLoaded", () => {
//     const { gsap } = window;
//
//     const root = document.getElementById('root');
//     const cursorOuter = root.querySelector(".cursor--large");
//     const cursorInner = root.querySelector(".cursor--small");
//     let isStuck = false;
//     let mouse = { x: -100, y: -100 };
//     let scroll;
//
//     // LocomotiveScroll 초기화
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//     scroll = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.08,
//         multiplier: 0.7
//     });
//
//     scroll.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => scroll.update());
//     ScrollTrigger.refresh();
//
//     // 커서 원래 상태
//     let cursorOuterOriginalState = { width: 0, height: 0 };
//     let isFirstMove = true;
//
//     // 버튼 hover 이벤트
//     const buttons = document.querySelectorAll("button");
//     buttons.forEach((button) => {
//         button.addEventListener("pointerenter", handleMouseEnter);
//         button.addEventListener("pointerleave", handleMouseLeave);
//     });
//
//     // pointermove
//     document.body.addEventListener("pointermove", updateCursorPosition);
//
//     // 클릭 시 작은 커서 확대
//     document.body.addEventListener("pointerdown", () => {
//         gsap.to(cursorInner, 0.15, { scale: 2 });
//     });
//     document.body.addEventListener("pointerup", () => {
//         gsap.to(cursorInner, 0.15, { scale: 1 });
//     });
//
//     function updateCursorPosition(e) {
//         const scrollY = scroll.scroll.instance.scroll.y;
//         const scrollX = scroll.scroll.instance.scroll.x;
//
//         // LocomotiveScroll 기준으로 커서 위치 계산
//         mouse.x = e.clientX + scrollX;
//         mouse.y = e.clientY + scrollY;
//
//         if (isFirstMove) {
//             cursorOuterOriginalState.width = cursorOuter.getBoundingClientRect().width;
//             cursorOuterOriginalState.height = cursorOuter.getBoundingClientRect().height;
//             isFirstMove = false;
//         }
//     }
//
//     function updateCursor() {
//         gsap.set(cursorInner, {
//             x: mouse.x - cursorInner.offsetWidth / 2,
//             y: mouse.y - cursorInner.offsetHeight / 2
//         });
//
//         if (!isStuck) {
//             gsap.to(cursorOuter, {
//                 duration: 0.15,
//                 x: mouse.x - cursorOuterOriginalState.width / 2,
//                 y: mouse.y - cursorOuterOriginalState.height / 2
//             });
//         }
//
//         requestAnimationFrame(updateCursor);
//     }
//     updateCursor();
//
//     function handleMouseEnter(e) {
//         isStuck = true;
//         const targetBox = e.currentTarget.getBoundingClientRect();
//         const style = window.getComputedStyle(e.currentTarget);
//         const borderRadius = style.borderRadius;
//
//         gsap.to(cursorOuter, 0.2, {
//             x: targetBox.left + scroll.scroll.instance.scroll.x,
//             y: targetBox.top + scroll.scroll.instance.scroll.y,
//             width: targetBox.width,
//             height: targetBox.height,
//             borderRadius: borderRadius,
//             backgroundColor: "rgba(255, 255, 255, 0.1)"
//         });
//     }
//
//     function handleMouseLeave(e) {
//         isStuck = false;
//         gsap.to(cursorOuter, 0.2, {
//             width: cursorOuterOriginalState.width,
//             height: cursorOuterOriginalState.height,
//             borderRadius: "50%",
//             backgroundColor: "transparent"
//         });
//     }
// });

// 루트 밖 버전 (툴바 때문에 수정중)
document.addEventListener("DOMContentLoaded", () => {
    const { gsap } = window;

    const cursorOuter = document.querySelector(".cursor--large");
    const cursorInner = document.querySelector(".cursor--small");
    let isStuck = false;
    let mouse = { x: -100, y: -100 };

    const scrollContainer = document.querySelector('[data-scroll-container]');
    const scroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.08,
        multiplier: 0.7
    });

    scroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();

    let cursorOuterOriginalState = { width: cursorOuter.offsetWidth, height: cursorOuter.offsetHeight };
    let isFirstMove = true;

    const buttons = document.querySelectorAll("#toolbar button");
    buttons.forEach(button => {
        button.addEventListener("pointerenter", handleMouseEnter);
        button.addEventListener("pointerleave", handleMouseLeave);
    });

    document.body.addEventListener("pointermove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        if (isFirstMove) {
            cursorOuterOriginalState.width = cursorOuter.offsetWidth;
            cursorOuterOriginalState.height = cursorOuter.offsetHeight;
            isFirstMove = false;
        }
    });

    document.body.addEventListener("pointerdown", () => {
        gsap.to(cursorInner, { duration: 0.15, scale: 2 });
    });
    document.body.addEventListener("pointerup", () => {
        gsap.to(cursorInner, { duration: 0.15, scale: 1 });
    });

    function updateCursor() {
        gsap.set(cursorInner, {
            x: mouse.x - cursorInner.offsetWidth / 2,
            y: mouse.y - cursorInner.offsetHeight / 2
        });

        if (!isStuck) {
            gsap.to(cursorOuter, {
                duration: 0.15,
                x: mouse.x - cursorOuterOriginalState.width / 2,
                y: mouse.y - cursorOuterOriginalState.height / 2
            });
        }

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    function handleMouseEnter(e) {
        isStuck = true;
        const targetBox = e.currentTarget.getBoundingClientRect();
        const style = window.getComputedStyle(e.currentTarget);

        gsap.to(cursorOuter, {
            duration: 0.2,
            x: targetBox.left,
            y: targetBox.top,
            width: targetBox.width,
            height: targetBox.height,
            borderRadius: style.borderRadius,
            backgroundColor: "rgba(255,255,255,0.1)"
        });
    }

    function handleMouseLeave() {
        isStuck = false;
        gsap.to(cursorOuter, {
            duration: 0.2,
            width: cursorOuterOriginalState.width,
            height: cursorOuterOriginalState.height,
            borderRadius: "50%",
            backgroundColor: "transparent"
        });
    }
});

