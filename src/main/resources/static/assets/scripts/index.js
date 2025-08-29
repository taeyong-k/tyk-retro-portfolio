import './index/main/toolbar.js'
import './index/main/intro.js'
import './index/main/about.js'
import './index/main/project.js'
import './index/main/skill.js'

document.addEventListener("DOMContentLoaded", () => {
    console.clear();

    const {gsap} = window;

    const root = document.getElementById('root');
    const cursorOuter = root.querySelector(".cursor--large");
    const cursorInner = root.querySelector(".cursor--small");
    let isStuck = false;
    let mouse = {
        x: -100,
        y: -100,
    };

    // 스크롤 보정
    let scrollHeight = 0;
    window.addEventListener('scroll', () => {
        scrollHeight = window.scrollY;
    });

    // 버튼에 마우스 이벤트 (cursorOuter 커짐 <-> 원상복구)
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("pointerenter", handleMouseEnter);
        button.addEventListener("pointerleave", handleMouseLeave);
    });

    // 마우스 이동 시 좌표 업데이트
    document.body.addEventListener("pointermove", updateCursorPosition);

    // 클릭 시, 작은 커서 애니메이션 (scale: 1만큼 커지기)
    document.body.addEventListener("pointerdown", () => {
        gsap.to(cursorInner, 0.15, {
            scale: 2,
        });
    });
    document.body.addEventListener("pointerup", () => {
        gsap.to(cursorInner, 0.15, {
            scale: 1,
        });
    });


    let cursorOuterOriginalState = { width: 0, height: 0 };
    let isFirstMove = true;
    // 마우스 좌표 추적 (현재 마우스 위치 실시간으로 저장)
    function updateCursorPosition(e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;

        // 첫 마우스 움직임 시에만 커서 크기 측정
        if (isFirstMove) {
            cursorOuterOriginalState.width = cursorOuter.getBoundingClientRect().width;
            cursorOuterOriginalState.height = cursorOuter.getBoundingClientRect().height;
            isFirstMove = false;
        }
    }

    // 커서 위치 업데이트 애니메이션
    function updateCursor() {
        // 작은 커서: 항상 마우스 따라다니도록
        gsap.set(cursorInner, {
            x: mouse.x - cursorInner.offsetWidth / 2,
            y: mouse.y - cursorInner.offsetHeight / 2,
        });

        // 큰 커서: 버튼 위가 아닐때만, 따라 다니도록
        if (!isStuck) {
            gsap.to(cursorOuter, {
                duration: 0.15,
                x: mouse.x - cursorOuterOriginalState.width / 2,
                y: mouse.y - cursorOuterOriginalState.height / 2,
            });
        }

        // 프레임 마다 커서 위치 갱신
        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // 버튼 들어갈때: 커서 바꾸기 (버튼 크기만큼 커지게 + 사각형)
    function handleMouseEnter(e) {
        isStuck = true;
        const targetBox = e.currentTarget.getBoundingClientRect();
        gsap.to(cursorOuter, 0.2, {
            x: targetBox.left,
            y: targetBox.top + scrollHeight,
            width: targetBox.width,
            height: targetBox.height,
            borderRadius: 0,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
        });
    }

    // 버튼 내려올때: 원래 크기와 원형 복귀
    function handleMouseLeave(e) {
        isStuck = false;
        gsap.to(cursorOuter, 0.2, {
            width: cursorOuterOriginalState.width,
            height: cursorOuterOriginalState.height,
            borderRadius: "50%",
            backgroundColor: "transparent",
        });
    }

});
