import {projectsData} from './projectData.js';

window.AppState = window.AppState || {
    isScrolling: false,
    currentRotation: 0,
    activeProjectIndex: 0,
    isGalleryAnimating: false,
    hasInitialGalleryAnimationRun: false,
};

document.addEventListener("DOMContentLoaded", () => {
    updateRightArea(0, false); // 최초 세팅
    init();                    // 스크롤 감지 및 애니메이션 준비
});

const images = gsap.utils.toArray(".item");
const imageSize = images.length;
const total = images.length;
const degree = 360 / total;

let animationTriggered = false; // 애니메이션 실행 여부 플래그

const scrollAndAlignThenRun = (el, cb) => {
    if (!el) return cb();

    const targetTop = 0;
    const tolerance = 3;
    let finished = false;

    const tryFinish = () => {
        const rect = el.getBoundingClientRect();
        if (Math.abs(rect.top - targetTop) <= tolerance) {
            if (finished) return;
            finished = true;
            window.removeEventListener('scroll', onScroll);
            clearInterval(poll);
            setTimeout(() => cb(), 60);
        }
    };

    const onScroll = () => tryFinish();

    el.scrollIntoView({behavior: 'smooth', block: 'start'});
    window.addEventListener('scroll', onScroll, {passive: true});

    const poll = setInterval(tryFinish, 40);

    setTimeout(() => {
        if (finished) return;
        finished = true;
        window.removeEventListener('scroll', onScroll);
        clearInterval(poll);
        cb();
    }, 900);
};


// 초기 설정 및 스크롤 이벤트 등록
const init = () => {
    gsap.set(images, {opacity: 0});

    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    // IntersectionObserver 등록
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio;
            if (ratio >= 0.85 && !animationTriggered) {
                animationTriggered = true;
                scrollAndAlignThenRun(projectsSection, runAnimation);
            } else if (ratio < 0.05 && animationTriggered) {
                resetAnimation();
                animationTriggered = false;
            }
        });
    }, {threshold: Array.from({length: 101}, (_, i) => i / 100)});

    observer.observe(projectsSection);

    setTimeout(checkProjectSection, 100);   // 초기 강제 체크 (로드 직후 스크롤로 내려도 감지)
};

// 프로젝트 섹션 위치 강제 체크
const checkProjectSection = () => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    const rect = projectsSection.getBoundingClientRect();

    if (!animationTriggered && rect.top <= 0 && rect.bottom >= window.innerHeight) {
        animationTriggered = true;
        scrollAndAlignThenRun(projectsSection, runAnimation);
    } else if (animationTriggered && rect.bottom < window.innerHeight * 0.01) {
        resetAnimation();
        animationTriggered = false;
    }
};

let galleryAnimationTimeline = null; // 갤러리 애니메이션 타임라인을 저장할 변수

// 애니메이션 상태 초기화 함수
const resetAnimation = () => {
    if (window.smoother) window.smoother.paused(false);

    if (galleryAnimationTimeline) {
        galleryAnimationTimeline.kill(); // 특정 타임라인만 완전히 중지
        galleryAnimationTimeline = null; // 참조 초기화
    }

    // 모든 애니메이션 타임라인 중지 및 초기화
    gsap.killTweensOf(images);

    const rightArea = document.querySelector(".right-area");
    const infoItems = rightArea?.querySelectorAll(".info > *") || [];

    gsap.killTweensOf(rightArea);
    gsap.killTweensOf(infoItems);

    // 이미지 상태 초기화
    gsap.set(images, {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        transformOrigin: "center center"
    });

    if (rightArea) {
        gsap.set(rightArea, {opacity: 0, x: 50});
        gsap.set(infoItems, {opacity: 0, y: 20});
    }

    gsap.set(".items", {rotation: 0});

    const trackLabels = document.querySelectorAll('.track-label');
    trackLabels.forEach(label => label.classList.remove('animate'));
};

// 카드 배경 업데이트 함수
const updateCardBackground = () => {
    const isAnimationRunning = window.AppState.isGalleryAnimating;
    const isMobile = window.innerWidth <= 700;

    document.querySelectorAll(".card").forEach(card => {
        if (isAnimationRunning) {
            card.classList.remove("mobile-card");
        } else {
            if (isMobile) {
                card.classList.add("mobile-card");
            } else {
                card.classList.remove("mobile-card");
            }
        }
    });
};
window.addEventListener("resize", updateCardBackground);

const itemsContainer = document.querySelector(".items");
const gallery = document.querySelector(".center");

// 프로젝트 이미지 원형 배치 및 애니메이션 실행
const runAnimation = () => {
    gallery.classList.remove("mobile-gallery");

    // 툴바 이동 중이면 애니메이션 실행하지 않음
    if (window.isScrollingToSection) return;

    window.AppState.isGalleryAnimating = true;

    if (galleryAnimationTimeline) {
        galleryAnimationTimeline.kill();
        galleryAnimationTimeline = null;
    }

    itemsContainer.classList.remove("hover-enabled");   // 애니메이션 시작 전에는 hover 비활성화
    updateRightArea(0, false);                          // 첫 프로젝트 기준, 실제 데이터 바로 세팅
    gsap.set(".right-area", {opacity: 0, x: 50});       // 완전히 숨김 상태에서 시작

    if (window.smoother) window.smoother.paused(true);  // 스크롤 잠금

    galleryAnimationTimeline = gsap.timeline({
        onComplete: () => {
            previousActiveIndex = 0;

            // 현재 중앙 트랙 index로 previousActiveIndex 초기화
            const centerRotation = 0;
            const snapUnit = degree * 2;
            previousActiveIndex = Math.round((centerRotation % 360) / snapUnit);
            window.AppState.hasInitialGalleryAnimationRun = true;

            itemsContainer.classList.add("hover-enabled");


            setTimeout(() => {
                if (window.smoother) window.smoother.paused(false);
            }, 300);

            animateTrackLabels();

            window.AppState.isGalleryAnimating = false;

            updateCardBackground();
        }
    });

    images.forEach((image, index) => {
        gsap.set(image, {opacity: 1});

        // 초기 회전 각도 및 크기 설정
        const sign = Math.floor((index / 2) % 2) ? 1 : -1;
        const value = Math.floor((index + 4) / 4) * 4;
        const rotation = index > imageSize - 3 ? 0 : sign * value;

        gsap.set(image, {
            x: 0,
            y: 0,
            rotation: rotation,
            scale: 0.5,
        });

        // 이미지가 화면 밖에서 날아오는 애니메이션
        galleryAnimationTimeline.from(
            image,
            {
                x: 0,
                y: index % 2
                    ? -window.innerHeight - image.clientHeight * 4
                    : window.innerHeight + image.clientHeight * 4,
                rotation: index % 2 ? 200 : -200,
                scale: 4,
                opacity: 1,
                ease: "power4.out",
                duration: 1,
                delay: 0.15 * Math.floor(index / 2),
            },
            0
        );

        let rotationAngle = -index * degree;

        // 최종 크기를 1로 복원
        galleryAnimationTimeline.to(
            image,
            {
                scale: 1,
                duration: 0,
            },
            0.15 * (imageSize / 2 - 1) + 1
        );

        // 원형 배치로 정렬하는 애니메이션
        galleryAnimationTimeline.to(
            image,
            {
                x: 0,
                y: 0,
                transformOrigin: "-60vh center",
                rotation:
                    index > imageSize / 2 ? degree * (imageSize - index) : rotationAngle,
                duration: 1,
                ease: "power1.out",
            },
            0.15 * (imageSize / 2 - 1) + 1
        );
    });

    // ➤ 오른쪽 영역 등장 애니메이션
    galleryAnimationTimeline.fromTo(
        ".right-area",
        {opacity: 0, x: 50, pointerEvents: "none"},
        {
            opacity: 1, x: 0, duration: 0.8, ease: "power2.out", pointerEvents: "auto",
            onStart: () => {
                if (window.innerWidth <= 700) {
                    setTimeout(() => {
                        if (gallery) gallery.classList.add("mobile-gallery");
                    }, 420);
                } else {
                    if (gallery) gallery.classList.remove("mobile-gallery");
                }
            }
        },
        "-=0.5"
    );

    // ➤ 오른쪽 내부 정보 등장
    galleryAnimationTimeline.fromTo(
        ".right-area .info > *",
        {y: 20, opacity: 0},
        {y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out"},
        "-=0.3"
    );
};

// 초기 실행
init(); // 스크롤 감지 및 애니메이션 준비

let previousActiveIndex = null; // 마지막으로 표시된 프로젝트 인덱스

window.updateRightArea = function (currentRotation, isFromDrag = false) {
    // 문자열이면 숫자로 변환
    if (typeof currentRotation === "string") {
        currentRotation = parseFloat(currentRotation);
    }

    const snapUnit = degree * 2; // 한 트랙 당 회전 각도
    const totalTracks = total / 2;

    // 트랙 인덱스 계산
    let activeIndex = Math.round((currentRotation % 360) / snapUnit);
    if (activeIndex < 0) activeIndex += totalTracks;

    const isSameTrack = activeIndex === previousActiveIndex;

    previousActiveIndex = activeIndex;
    if (isFromDrag && isSameTrack) return;

    const projectData = projectsData[activeIndex];
    const rightArea = document.querySelector(".right-area");

    if (!projectData || !rightArea) {
        return;
    }

    // DOM 갱신
    if (rightArea.querySelector(".title h1").textContent !== projectData.title) {
        rightArea.querySelector(".title h1").textContent = projectData.title;
    }
    if (rightArea.querySelector(".date p").textContent !== projectData.date) {
        rightArea.querySelector(".date p").textContent = projectData.date;
    }

    const updateInnerHTML = (containerSelector, dataArray) => {
        const container = rightArea.querySelector(containerSelector);
        if (!container) return;
        const newHTML = dataArray.map(d => `<p>${d}</p>`).join("");
        if (container.innerHTML !== newHTML) container.innerHTML = newHTML;
    }

    updateInnerHTML(".type div div", projectData.type);
    updateInnerHTML(".language div div", projectData.language);
    updateInnerHTML(".framework div div", projectData.framework);
    updateInnerHTML(".etc div div", projectData.etc);

    const featureList = rightArea.querySelector(".feature ol");
    if (featureList) {
        const newHTML = projectData.features.map(f => `<li>${f}</li>`).join("");
        if (featureList.innerHTML !== newHTML) featureList.innerHTML = newHTML;
    }

    const slideContainer = rightArea.querySelector(".container");
    if (slideContainer) {
        const newSlidesHTML = projectData.slides
            .map(slide => `<div class="slide" style="background-image:url('${slide}')"></div>`)
            .join("");
        if (slideContainer.innerHTML !== newSlidesHTML) {
            slideContainer.innerHTML = newSlidesHTML;
            slidesPlugin();
        }
    }

    rightArea.dataset.siteUrl = projectData.siteUrl;
    rightArea.dataset.githubUrl = projectData.githubUrl;

    if (window.AppState.hasInitialGalleryAnimationRun && !window.AppState.isGalleryAnimating) {
        animateTrackLabels();
    }

    if (isFromDrag) {
        const infoItems = rightArea.querySelectorAll(".info > *");
        const rightTimeline = gsap.timeline();

        // 수정: 갤러리 애니메이션이 끝난 경우만 실행
        if (!window.AppState.isGalleryAnimating) {
            rightTimeline.fromTo(
                rightArea,
                {opacity: 0, x: 50, pointerEvents: "none"},
                {opacity: 1, x: 0, duration: 1.5, ease: "power3.out", pointerEvents: "auto"}
            );
            rightTimeline.fromTo(
                infoItems,
                {y: 20, opacity: 0},
                {y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out"},
                "-=1.2"
            );
        }
    }
}

// 화면 중앙에 있는 right-area의 track-label만 애니메이션 실행
function animateTrackLabels() {
    const trackLabels = document.querySelectorAll('.track-label');
    const centerX = window.innerWidth / 2;

    let closestLabel = null;
    let minDistance = Infinity;

    trackLabels.forEach(label => {
        const rect = label.getBoundingClientRect();
        const labelCenter = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - labelCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestLabel = label;
        }
    });

    trackLabels.forEach(label => label.classList.remove('animate'));

    // 화면 중앙에 있는 라벨만 animate 적용
    if (closestLabel) {
        closestLabel.classList.add('animate');
    }
}


// GSAP 이미지 슬라이드
function slidesPlugin() {
    const projects = document.querySelectorAll(".right-area");

    projects.forEach((project) => {
        const slides = project.querySelectorAll(".slide");

        // 초기 활성화 상태 (3번째 슬라이드)
        if (slides.length > 2) {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[2].classList.add("active");
        }

        slides.forEach((slide) => {
            slide.replaceWith(slide.cloneNode(true));
        });

        // 이벤트 재설정
        project.querySelectorAll(".slide").forEach((slide) => {
            slide.addEventListener("click", () => {
                if (slide.classList.contains("active")) {
                    openModal(slide);
                    return;
                }
                project.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
                slide.classList.add("active");
            });
        });
    });
}

slidesPlugin();


// 모달 열기 함수
function openModal(slide) {
    const modal = document.querySelector(".image-modal");
    const modalImg = modal.querySelector("img");
    const closeBtn = modal.querySelector(".close-button");

    const bg = slide.style.backgroundImage;
    modalImg.src = bg.slice(5, -2); // url("...") 형태니까 자르기

    modal.classList.add("show");
    if (window.smoother) window.smoother.paused(true);

    const updateButtonWidth = () => {
        closeBtn.style.width = modalImg.clientWidth + "px";
    };

    modalImg.onload = updateButtonWidth;

    window.addEventListener("resize", updateButtonWidth);

    const closeModal = () => {
        modal.classList.remove("show");
        if (window.smoother) window.smoother.paused(false);
        window.removeEventListener("resize", updateButtonWidth);
    };

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    closeBtn.addEventListener("click", closeModal);
}


const projectModal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const projectCloseBtn = projectModal.querySelector(".close-button");

// 모든 프로젝트 버튼 처리
document.querySelectorAll(".right-area").forEach((project) => {
    const viewBtn = project.querySelector(".button-area button:nth-child(1)");
    const githubBtn = project.querySelector(".button-area button:nth-child(2)");

    viewBtn.addEventListener("click", () => {
        const siteUrl = project.dataset.siteUrl;
        if (siteUrl && siteUrl !== "#" && siteUrl !== "local") {
            window.open(siteUrl, "_blank");
        } else {
            modalMessage.innerHTML = "🚧 이 프로젝트는 현재 배포되지 않았습니다.<br>GitHub에서 코드를 확인하실 수 있습니다.";
            projectModal.classList.add("show");
            if (window.smoother) window.smoother.paused(true);
        }
    });

    githubBtn.addEventListener("click", () => {
        const githubUrl = project.dataset.githubUrl;
        if (githubUrl && githubUrl !== "#") {
            window.open(githubUrl, "_blank");
        } else {
            modalMessage.innerHTML = "🚧 GitHub 링크가 준비되지 않았습니다.";
            projectModal.classList.add("show");
            if (window.smoother) window.smoother.paused(true);
        }
    });
});

projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove("show");
        if (window.smoother) window.smoother.paused(false);
    }
});

projectCloseBtn.addEventListener("click", () => {
    projectModal.classList.remove("show");
    if (window.smoother) window.smoother.paused(false);
});