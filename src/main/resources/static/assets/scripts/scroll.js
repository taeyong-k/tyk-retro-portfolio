// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     // 2️⃣ ScrollTrigger 연동
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });



// 일단, 스크롤 가능 하게 된 코드
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전
//     const projectsSection = document.getElementById('projects');
//     const itemsContainer = document.querySelector(".items");
//
//     if (projectsSection && itemsContainer) {
//         gsap.to(itemsContainer, {
//             rotation: -360, // 전체 트랙 1~5 회전
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 scroller: scrollContainer,
//                 start: "top top",   // 화면에 딱 들어올 때 시작
//                 end: "bottom top",  // 섹션 끝까지 pin 유지
//                 pin: true,          // 화면 딱 고정
//                 scrub: true,
//                 onUpdate: self => {
//                     const progress = self.progress; // 0 ~ 1
//                     const rotation = 360 * progress; // + 방향으로 회전
//                     gsap.set(itemsContainer, {rotation: rotation});
//                     updateRightArea(rotation);
//                 }
//             }
//         });
//     }
//
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('[data-scroll-container]');

    // 1️⃣ LocomotiveScroll 초기화
    window.scrollInstance = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.07,
        multiplier: 0.7,
        getDirection: true,
        getSpeed: true,
        firefoxMultiplier: 50
    });

    window.scrollInstance.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length
                ? window.scrollInstance.scrollTo(value, 0, 0)
                : window.scrollInstance.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
    ScrollTrigger.refresh();

    // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전 (스냅 적용)
    const projectsSection = document.getElementById('projects');
    const itemsContainer = document.querySelector(".items");

    if (projectsSection && itemsContainer) {
        gsap.to(itemsContainer, {
            rotation: -360,
            ease: "none",
            scrollTrigger: {
                trigger: projectsSection,
                scroller: scrollContainer,
                start: "top top",
                end: "bottom top",
                pin: true,
                scrub: true,
                onUpdate: self => {
                    const progress = self.progress;
                    const rotation = 360 * progress;
                    gsap.set(itemsContainer, { rotation });

                    // ❗ 실제 보정 및 데이터 갱신은 프로젝트 JS에서 처리
                    if (window.updateRightArea) {
                        window.updateRightArea(rotation);
                    }
                }
            }
        });
    }

    // 3️⃣ fade-up 요소 애니메이션
    gsap.utils.toArray(".fade-up").forEach(el => {
        gsap.fromTo(el,
            {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    scroller: scrollContainer,
                    start: "top 100%",
                    end: "top 55%",
                    scrub: 1.5
                }
            }
        );
    });
});



