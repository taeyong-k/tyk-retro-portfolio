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
                    scrub: 1.5
                }
            }
        );
    });
});








