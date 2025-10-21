import './index/main/toolbar.js'
import './index/main/intro.js'
import './index/main/about.js'
import './index/main/skill.js'
import './index/main/project.js'
import './index/main/footer.js'

document.addEventListener("DOMContentLoaded", () => {
    const { gsap } = window;

    const cursorOuter = document.querySelector(".cursor--large");
    const cursorInner = document.querySelector(".cursor--small");
    let isStuck = false;
    let mouse = { x: -100, y: -100 };

    document.documentElement.style.scrollBehavior = "smooth";

    let cursorOuterOriginalState = { width: cursorOuter.offsetWidth, height: cursorOuter.offsetHeight };
    let isFirstMove = true;

    // toolbar 버튼
    const toolbarButtons = document.querySelectorAll("#toolbar button");
    toolbarButtons.forEach(btn => {
        btn.addEventListener("pointerenter", handleMouseEnter);
        btn.addEventListener("pointerleave", handleMouseLeave);
    });

    // (추가) About 섹션 버튼
    const aboutButtons = document.querySelectorAll("#about .btn-box button");
    aboutButtons.forEach(btn => {
        btn.addEventListener("pointerenter", handleMouseEnter);
        btn.addEventListener("pointerleave", handleMouseLeave);
    });

    // (추가) skill 섹션 카테고리
    const skillCategoryLinks = document.querySelectorAll("#skills .skill-nav-list li");
    skillCategoryLinks.forEach(link => {
        link.addEventListener("pointerenter", handleMouseEnter);
        link.addEventListener("pointerleave", handleMouseLeave);
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

    // 커서 색상 업데이트 함수 (+추가)
    window.updateCursorColor = (isScrolling) => {
        if (isScrolling) {
            gsap.to(cursorOuter, {
                duration: 0.2,
                borderColor: "#777777",
                backgroundColor: "rgba(119,119,119,0.3)",
                boxShadow: "0 0 8px rgba(119,119,119,0.6)"
            });
            gsap.to(cursorInner, {
                duration: 0.2,
                backgroundColor: "#777777",
                boxShadow: "0 0 5px rgba(119,119,119,0.7)"
            });
        } else {
            gsap.to(cursorOuter, {
                duration: 0.2,
                borderColor: "",
                backgroundColor: "transparent",
                boxShadow: "0 0 0 rgba(0,0,0,0)"
            });
            gsap.to(cursorInner, {
                duration: 0.2,
                backgroundColor: "rgb(255,60,60)",
                boxShadow: "0 0 0 rgba(0,0,0,0)"
            });
        }
    };

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

        let width = targetBox.width;
        let height = targetBox.height;
        let x = targetBox.left;
        let y = targetBox.top;

        // skills li만 살짝 크게
        if (e.currentTarget.closest("#skills")) {
            const extra = 15; // 조정값
            width += extra;
            height += extra;
            x -= extra / 2;
            y -= extra / 2;
        }

        gsap.to(cursorOuter, {
            duration: 0.2,
            x,
            y,
            width,
            height,
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

