const images = gsap.utils.toArray(".item");

const imageSize = images.length;
const total = images.length;
const degree = 360 / total;

let animationTriggered = false; // 애니메이션 실행 여부 플래그
let draggableInstance; // 드래그 인스턴스 저장

// 초기 설정 및 스크롤 이벤트 등록
const init = () => {
    // 초기에는 이미지 숨김
    gsap.set(images, {opacity: 0});

    // 스크롤 이벤트로 프로젝트 섹션 감지
    window.addEventListener('scroll', checkProjectSection);

    // 페이지 로드 시 초기 체크 (딜레이로 렌더링 보정)
    setTimeout(checkProjectSection, 100);
};

// 프로젝트 섹션이 화면에 보이는지 감지
const checkProjectSection = () => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const rect = projectsSection.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.3; // 70% 노출 시 애니메이션 실행

    // 프로젝트 섹션이 화면에 진입했을 때
    if (!animationTriggered && rect.bottom >= 0 && rect.top <= triggerPoint) {
        animationTriggered = true;
        runAnimation();
    }

    // 프로젝트 섹션이 화면에서 완전히 벗어났을 때 -> 상태 초기화
    if (animationTriggered && (rect.bottom < 0 || rect.top > window.innerHeight)) {
        resetAnimation(); // 애니메이션 상태 초기화 함수 호출
        animationTriggered = false;
    }
};

let galleryAnimationTimeline = null; // 갤러리 애니메이션 타임라인을 저장할 변수

// 애니메이션 상태 초기화 함수
const resetAnimation = () => {
    // 기존에 실행 중인 갤러리 애니메이션 타임라인이 있다면 중지하고 초기화합니다.
    if (galleryAnimationTimeline) {
        galleryAnimationTimeline.kill(); // 특정 타임라인만 완전히 중지
        galleryAnimationTimeline = null; // 참조 초기화
    }

    // 모든 애니메이션 타임라인 중지 및 초기화
    gsap.killTweensOf(images);

    // 오른쪽 영역 관련 모든 애니메이션 중지
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

    // 오른쪽 영역 초기화
    if (rightArea) {
        gsap.set(rightArea, { opacity: 0, x: 50 });
        gsap.set(infoItems, { opacity: 0, y: 20 });
    }

    // 드래그 상태 초기화
    if (draggableInstance) {
        draggableInstance.rotation = 0; // Draggable 내부 rotation 값 초기화
        draggableInstance.update();    // 상태 반영
        draggableInstance.disable();
    }
};

// 프로젝트 이미지 원형 배치 및 애니메이션 실행
const runAnimation = () => {
    // 새로운 애니메이션 시작 전에 혹시 이전 타임라인이 남아있다면 초기화
    if (galleryAnimationTimeline) {
        galleryAnimationTimeline.kill();
        galleryAnimationTimeline = null;
    }

    if (draggableInstance) draggableInstance.disable(); // 애니메이션 시작 전 드래그 비활성화

    galleryAnimationTimeline = gsap.timeline({
        onComplete: () => {
            if (draggableInstance) draggableInstance.enable(); // 애니메이션 끝나면 드래그 활성화
        }
    });

    images.forEach((image, index) => {
        gsap.set(image, {opacity: 1});

        // 초기 회전 각도 및 크기 설정
        const sign = Math.floor((index / 2) % 2) ? 1 : -1;
        const value = Math.floor((index + 4) / 4) * 4;
        const rotation = index > imageSize - 3 ? 0 : sign * value;

        gsap.set(image, {
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
        ".right-area",                  // 애니메이션 적용 대상
        { opacity: 0, x: 50 },          // 시작 상태: 투명 + 오른쪽으로 50px 이동
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, // 종료 상태: 불투명 + 원래 위치
        "-=0.5"                         // 타이밍: 이전 애니메이션 끝나기 0.5초 전에 시작
    );

    // ➤ 오른쪽 내부 정보 stagger 등장
    galleryAnimationTimeline.fromTo(
        ".right-area .info > *",         // 오른쪽 영역 info 하위 요소들을 아래에서 위로 순차적으로 나타나게 함
        { y: 20, opacity: 0 },           // 시작 상태: 아래로 20px 이동 + 투명
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, // 종료 상태: 원래 위치 + 보이게, 0.6초, 0.1초 간격, 자연스러운 감속
        "-=0.3"                          // 이전 애니메이션 끝나기 0.3초 전에 시작
    );
};

// 드래그로 이미지 원형 회전 기능 활성화
const draggable = () => {
    let start = 0;
    draggableInstance = Draggable.create(".items", {
        type: "rotation",

        onDragStart: function () {
            start = this.rotation;
        },
        onDragEnd: function () {
            const rotation = this.rotation;
            const snapUnit = degree * 2; // 2개 단위 스냅

            const offset = Math.abs(rotation - start);
            let targetRotation;

            // 드래그 방향에 따라 회전값 계산
            if (rotation > start) {
                if (rotation - start < degree / 2) {
                    targetRotation = rotation - offset;
                } else {
                    targetRotation = rotation + (2 * degree - offset);
                }
            } else {
                if (Math.abs(rotation - start) < degree / 2) {
                    targetRotation = rotation + offset;
                } else {
                    targetRotation = rotation - (2 * degree - offset);
                }
            }

            // 스냅 단위로 회전값 보정
            targetRotation = Math.round(targetRotation / snapUnit) * snapUnit;

            gsap.to(".items", {
                rotation: targetRotation,
                duration: 0.8,
                ease: "power2.out"
            });
        },
    })[0];
};

// 초기 실행
init(); // 스크롤 감지 및 애니메이션 준비
draggable(); // 드래그 회전 기능 활성화


// GSAP 이미지 슬라이드
function slidesPlugin() {
    const projects = document.querySelectorAll(".right-area");

    projects.forEach((project) => {
        const slides = project.querySelectorAll(".slide");

        slides[2].classList.add("active");

        for (const slide of slides) {
            slide.addEventListener("click", () => {
                if (slide.classList.contains("active")) {
                    openModal(slide);
                    return;
                }

                clearActiveClasses();
                slide.classList.add("active");
            });
        }

        function clearActiveClasses() {
            slides.forEach((slide) => {
                slide.classList.remove("active");
            });
        }
    });
}

slidesPlugin();

// 모달 열기 함수
function openModal(slide) {
    const modal = document.querySelector(".image-modal");
    const modalImg = modal.querySelector("img");

    // 슬라이드 배경 이미지를 모달에 적용
    const bg = slide.style.backgroundImage;
    modalImg.src = bg.slice(5, -2); // url("...") 형태니까 자르기

    modal.classList.add("show");

    document.body.style.overflow = "hidden";    // 스크롤 막기
}

const modal = document.querySelector(".image-modal");
const closeBtn = modal.querySelector(".close-button");

// 모달 닫기 함수
function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

// 모달 외부 클릭 시: 닫기
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// 닫기 버튼 클릭 시: 닫기
closeBtn.addEventListener("click", () => {
    closeModal();
});

/* ------------------------------------------------------------------------------ */
// 모든 프로젝트의 버튼 처리
document.querySelectorAll(".right-area").forEach((project) => {
    const viewBtn = project.querySelector(".button-area button:nth-child(1)");
    const githubBtn = project.querySelector(".button-area button:nth-child(2)");

    // 보기 버튼 클릭
    viewBtn.addEventListener("click", () => {
        // 해당 프로젝트 URL 가져오기
        const siteUrl = project.dataset.siteUrl; // data-site-url 속성으로 URL 지정
        if (siteUrl) window.open(siteUrl, "_blank");
    });

    // 깃허브 버튼 클릭
    githubBtn.addEventListener("click", () => {
        const githubUrl = project.dataset.githubUrl; // data-github-url 속성으로 URL 지정
        if (githubUrl) window.open(githubUrl, "_blank");
    });
});
