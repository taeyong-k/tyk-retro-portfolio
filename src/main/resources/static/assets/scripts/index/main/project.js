const images = gsap.utils.toArray(".item");

const imageSize = images.length;
const total = images.length;
const degree = 360 / total;

let animationTriggered = false; // 애니메이션 실행 여부 플래그
let draggableInstance; // 드래그 인스턴스 저장

// 초기 설정 및 스크롤 이벤트 등록
const init = () => {
    // 초기에는 이미지 숨김
    gsap.set(images, { opacity: 0 });

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
    const triggerPoint = window.innerHeight * 0.5; // 50% 노출 시 애니메이션 실행

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

// 애니메이션 상태 초기화 함수
const resetAnimation = () => {
    // 모든 애니메이션 타임라인 중지 및 초기화
    gsap.killTweensOf(images);

    // 이미지 상태 초기화
    gsap.set(images, {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        transformOrigin: "center center"
    });

    // 드래그 상태 초기화
    if (draggableInstance) {
        draggableInstance.rotation = 0; // Draggable 내부 rotation 값 초기화
        draggableInstance.update();    // 상태 반영
        draggableInstance.disable();
    }
};

// 프로젝트 이미지 원형 배치 및 애니메이션 실행
const runAnimation = () => {
    if (draggableInstance) draggableInstance.disable(); // 애니메이션 시작 전 드래그 비활성화

    const timeline = gsap.timeline({
        onComplete: () => {
            if (draggableInstance) draggableInstance.enable(); // 애니메이션 끝나면 드래그 활성화
        }
    });

    // const timeline = gsap.timeline();

    images.forEach((image, index) => {
        gsap.set(image, { opacity: 1 });

        // 초기 회전 각도 및 크기 설정
        const sign = Math.floor((index / 2) % 2) ? 1 : -1;
        const value = Math.floor((index + 4) / 4) * 4;
        const rotation = index > imageSize - 3 ? 0 : sign * value;

        gsap.set(image, {
            rotation: rotation,
            scale: 0.5,
        });

        // 이미지가 화면 밖에서 날아오는 애니메이션
        timeline.from(
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
        timeline.to(
            image,
            {
                scale: 1,
                duration: 0,
            },
            0.15 * (imageSize / 2 - 1) + 1
        );

        // 원형 배치로 정렬하는 애니메이션
        timeline.to(
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











