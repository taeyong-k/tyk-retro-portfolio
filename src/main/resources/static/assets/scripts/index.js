import './index/main/toolbar.js'
import './index/main/intro.js'
import './index/main/about.js'
import './index/main/skill.js'
import './index/main/project.js'
import './index/main/footer.js'

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

