// gsap.registerPlugin(ScrollTrigger);
//
// // 요소 애니메이션 부드럽게
// gsap.utils.toArray(".fade-up").forEach((el) => {
//     gsap.fromTo(el,
//         {
//             opacity: 0.5,
//             y: 80,
//             scale: 0.65,
//             filter: "blur(4px)"
//         },
//         {
//             opacity: 1,
//             y: 0,
//             scale: 1,                // 점진적으로 커지도록
//             filter: "blur(0px)",     // 점점 선명하게
//             ease: "power2.out",      // 부드럽게 흐느적
//             scrollTrigger: {
//                 trigger: el,
//                 start: "top 97%",   // 화면 아래쪽에서 요소가 나타날 때부터 시작
//                 end: "top 50%",     // 요소가 화면 중간 정도 올라올 때 끝
//                 scrub: 2.5,         // 요소가 뒤에서 천천히 따라오도록 (지연/탄성)
//             }
//         }
//     );
// });


// // 스크롤 + 요소 페이드 코드
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화 (휠 포함)
//     const scroll = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,       // 낮을수록 느리고 흐느적
//         multiplier: 0.7,  // 스크롤 폭 조절
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50 // Firefox에서 휠 반응 속도 보정
//     });
//
//     // 2️⃣ ScrollTrigger 연동
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
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             { opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)" },
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",  // 화면 아래에서 등장
//                     end: "top 55%",      // 화면 상단 지나면 사라짐
//                     scrub: 3             // 느릿하게 따라옴
//                 }
//             }
//         );
//     });
// });

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('[data-scroll-container]');

    // 1️⃣ LocomotiveScroll 초기화 (전역 등록)
    window.scrollInstance = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.07,
        multiplier: 0.7,
        getDirection: true,
        getSpeed: true,
        firefoxMultiplier: 50
    });

    // 2️⃣ ScrollTrigger 연동
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
                    scrub: 3
                }
            }
        );
    });
});








