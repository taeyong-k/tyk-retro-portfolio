const images = gsap.utils.toArray(".item");

const imageSize = images.length;
const total = images.length;
const degree = 360 / total;

let animationTriggered = false; // 애니메이션 실행 여부를 체크하는 변수

const init = () => {
    // 초기 상태 설정: 애니메이션이 시작되기 전까지 이미지를 숨김
    // 기존 애니메이션이 'from' 방식으로 화면 밖에서 날아오므로,
    // 초기에는 이미지를 완전히 보이지 않게 처리할 필요가 있습니다.
    gsap.set(images, {opacity: 0});

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', checkProjectSection);

    // 페이지 로드 시에도 한 번 체크 (이미 프로젝트 섹션이 보이는 경우를 위해)
    // 약간의 딜레이를 주어 초기 렌더링에 방해되지 않게 합니다.
    setTimeout(checkProjectSection, 100);
};

// 프로젝트 섹션이 화면에 보이는지 체크
const checkProjectSection = () => {
    if (animationTriggered) return; // 이미 애니메이션이 실행됐으면 더 이상 진행하지 않음

    const projectsSection = document.getElementById('projects');
    if (!projectsSection) {
        console.warn("#projects 엘리먼트를 찾을 수 없습니다.");
        return;
    }

    const rect = projectsSection.getBoundingClientRect();

    // 프로젝트 섹션이 뷰포트에 75% 이상 들어왔을 때 (원하시는 도착 시점 기준으로 조정 가능)
    // rect.bottom >= 0 : 섹션의 하단이 뷰포트 상단보다 아래에 있음
    // rect.top <= window.innerHeight * 0.75 : 섹션의 상단이 뷰포트 75% 높이 지점보다 위에 있음
    if (rect.bottom >= 0 && rect.top <= window.innerHeight * 0.75) {
        animationTriggered = true; // 애니메이션 실행 표시
        window.removeEventListener('scroll', checkProjectSection); // 한 번 실행 후 이벤트 리스너 제거
        runAnimation(); // 원래의 애니메이션 로직 실행
    }
};

// 와이님의 원래 애니메이션 로직을 담은 함수
const runAnimation = () => {
    const timeline = gsap.timeline();

    images.forEach((image, index) => {
        // 이미지가 날아와서 펼쳐지는 시작점에서는 불투명하게 만듦
        gsap.set(image, {opacity: 1});

        const sign = Math.floor((index / 2) % 2) ? 1 : -1;
        const value = Math.floor((index + 4) / 4) * 4;
        const rotation = index > imageSize - 3 ? 0 : sign * value;

        gsap.set(image, {
            rotation: rotation,
            scale: 0.5,
        });

        timeline.from(
            image,
            {
                x: window.innerHeight - image.clientHeight,
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

        timeline.to(
            image,
            {
                scale: 1,
                duration: 0,
            },
            0.15 * (imageSize / 2 - 1) + 1
        );

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

const draggable = () => {
    let start = 0;
    Draggable.create(".items", {
        type: "rotation",

        onDragStart: function () {
            start = this.rotation;
        },
        onDragEnd: function () {
            const rotation = this.rotation;
            const snapUnit = degree * 2; // 2개 묶음 단위

            const offset = Math.abs(rotation - start);
            let targetRotation;

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
            // 계산된 회전값을 가장 가까운 스냅 위치로 보정
            targetRotation = Math.round(targetRotation / snapUnit) * snapUnit;

            gsap.to(".items", {
                rotation: targetRotation,
                duration: 0.8,
                ease: "power2.out"
            });
        },
    });
};

init(); // 초기화 함수만 바로 호출하여 스크롤 이벤트를 감지 시작
draggable(); // 드래그 기능은 항상 활성화