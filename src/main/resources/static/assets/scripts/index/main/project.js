console.clear();

gsap.registerPlugin(ScrollTrigger, Flip);

// 초기 숨김 처리 (wheel, arrow 둘 다)
gsap.set([".wheel", ".arrow"], { autoAlpha: 0 });

let wheel = document.querySelector(".wheel");
let images = gsap.utils.toArray(".wheel__card");

// arrow 애니메이션
gsap.to(".arrow", {
    y: 5,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
});

function setup() {
    let radius = wheel.offsetWidth / 2;
    let center = wheel.offsetWidth / 2;
    let total = images.length;
    let slice = (2 * Math.PI) / total;
    console.log("wheel width:", wheel.offsetWidth);
    console.log("radius:", radius);
    console.log("images length:", total);

    images.forEach((item, i) => {
        let angle = i * slice;

        let x = center + radius * Math.sin(angle);
        let y = center - radius * Math.cos(angle);

        gsap.set(item, {
            rotation: angle + "_rad",
            xPercent: -50,
            yPercent: -50,
            x: x,
            y: y
        });
    });
}

window.addEventListener("load", () => {
    setTimeout(() => {
        setup();
        ScrollTrigger.refresh();
        // gsap.set([".wheel", ".arrow"], { autoAlpha: 1 });
    }, 100);
});

// setup();
window.addEventListener("resize", setup);

gsap.to(".wheel", {
    rotate: () => -360,
    ease: "none",
    duration: images.length,
    scrollTrigger: {
        trigger: "#projects",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        snap: 1 / images.length,
        invalidateOnRefresh: true,
        // wheel 회전 애니메이션이 projects 영역에 있을 때만 돌아가도록
        toggleActions: "play pause resume pause"
    }
});

let cards = gsap.utils.toArray(".wheel__card");
let header = document.querySelector(".slider-header");

// 마지막 클릭된 카드 기억용
let lastClickedCard = null;

// 카드 클릭 시 플립 애니메이션
cards.forEach((card) => {
    card.addEventListener("click", (e) => {
        if (lastClickedCard) {
            putBack(e);
        }
        flip(e);
    });
});

header.addEventListener("click", (e) => {
    if (!lastClickedCard) return;
    putBack(e);
});

// 카드 이미지 원래 자리로 돌려놓기
function putBack(e) {
    let image = header.querySelector("img");
    let state = Flip.getState(image);
    lastClickedCard.appendChild(image);

    Flip.from(state, {
        duration: 0.6,
        ease: "sine.out",
        absolute: true
    });
    lastClickedCard = null;
}

// 카드 이미지 플립해서 헤더로 가져오기
function flip(e) {
    const card = e.currentTarget;
    const image = card.querySelector("img");
    let state = Flip.getState(image);

    header.appendChild(image);

    Flip.from(state, {
        duration: 0.6,
        ease: "sine.out",
        absolute: true
    });
    lastClickedCard = card;
}

// ScrollTrigger로 projects 구간에서 wheel, arrow 보이기/숨기기
ScrollTrigger.create({
    trigger: "#projects",
    start: "top center",
    end: "bottom center",
    onEnter: () => {
        gsap.to([".wheel", ".arrow"], { autoAlpha: 1, duration: 0.5 });
        document.querySelector('.slider-header').classList.add('active');
    },
    onLeave: () => {
        gsap.to([".wheel", ".arrow"], { autoAlpha: 0, duration: 0.5 });
        document.querySelector('.slider-header').classList.remove('active');
    },
    onEnterBack: () => {
        gsap.to([".wheel", ".arrow"], { autoAlpha: 1, duration: 0.5 });
        document.querySelector('.slider-header').classList.add('active');
    },
    onLeaveBack: () => {
        gsap.to([".wheel", ".arrow"], { autoAlpha: 0, duration: 0.5 });
        document.querySelector('.slider-header').classList.remove('active');
    }
});















