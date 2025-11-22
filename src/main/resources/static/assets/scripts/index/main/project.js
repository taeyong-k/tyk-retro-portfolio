// import {projectsData} from './projectData.js';
//
// document.addEventListener("DOMContentLoaded", () => {
//     // 페이지 진입 시 첫 프로젝트(Pixterest) 정보 세팅
//     updateRightArea(0, false);
// });
//
// const images = gsap.utils.toArray(".item");
//
// const imageSize = images.length;
// const total = images.length;
// const degree = 360 / total;
//
// let animationTriggered = false; // 애니메이션 실행 여부 플래그
// let draggableInstance; // 드래그 인스턴스 저장
//
// // 초기 설정 및 스크롤 이벤트 등록
// const init = () => {
//     // 초기에는 이미지 숨김
//     gsap.set(images, {opacity: 0});
//
//     // IntersectionObserver로 프로젝트 섹션 감지
//     const projectsSection = document.getElementById('projects');
//     if (projectsSection) {
//         const observer = new IntersectionObserver(entries => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting && !animationTriggered) {
//                     animationTriggered = true;
//                     runAnimation();
//                 } else if (!entry.isIntersecting && animationTriggered) {
//                     resetAnimation();
//                     animationTriggered = false;
//                 }
//             });
//         }, {threshold: 0.7}); // 화면 70% 보이면 실행
//
//         observer.observe(projectsSection);
//     }
//
//     // 페이지 로드 시 초기 체크 (딜레이로 렌더링 보정)
//     setTimeout(checkProjectSection, 100);
// };
//
// // 프로젝트 섹션이 화면에 보이는지 감지
// const checkProjectSection = () => {
//     const projectsSection = document.getElementById('projects');
//     if (!projectsSection) return;
//
//     const rect = projectsSection.getBoundingClientRect();
//     const triggerPoint = window.innerHeight * 0.3; // 70% 노출 시 애니메이션 실행
//
//     // 프로젝트 섹션이 화면에 진입했을 때
//     if (!animationTriggered && rect.bottom >= 0 && rect.top <= triggerPoint) {
//         animationTriggered = true;
//         runAnimation();
//     }
//
//     // 프로젝트 섹션이 화면에서 완전히 벗어났을 때 -> 상태 초기화
//     if (animationTriggered && (rect.bottom < 0 || rect.top > window.innerHeight)) {
//         resetAnimation(); // 애니메이션 상태 초기화 함수 호출
//         animationTriggered = false;
//     }
// };
//
// let galleryAnimationTimeline = null; // 갤러리 애니메이션 타임라인을 저장할 변수
//
// // 애니메이션 상태 초기화 함수
// const resetAnimation = () => {
//     // 기존에 실행 중인 갤러리 애니메이션 타임라인이 있다면 중지하고 초기화합니다.
//     if (galleryAnimationTimeline) {
//         galleryAnimationTimeline.kill(); // 특정 타임라인만 완전히 중지
//         galleryAnimationTimeline = null; // 참조 초기화
//     }
//
//     // 모든 애니메이션 타임라인 중지 및 초기화
//     gsap.killTweensOf(images);
//
//     // 오른쪽 영역 관련 모든 애니메이션 중지
//     const rightArea = document.querySelector(".right-area");
//     const infoItems = rightArea?.querySelectorAll(".info > *") || [];
//
//     gsap.killTweensOf(rightArea);
//     gsap.killTweensOf(infoItems);
//
//     // 이미지 상태 초기화
//     gsap.set(images, {
//         opacity: 0,
//         x: 0,
//         y: 0,
//         rotation: 0,
//         scale: 1,
//         transformOrigin: "center center"
//     });
//
//     // 오른쪽 영역 초기화
//     if (rightArea) {
//         gsap.set(rightArea, {opacity: 0, x: 50});
//         gsap.set(infoItems, {opacity: 0, y: 20});
//     }
//
//     // items 컨테이너 회전값 강제 리셋 (항상 첫 프로젝트가 중앙으로 오게)
//     gsap.set(".items", {rotation: 0});
//
//     // 드래그 상태 초기화
//     if (draggableInstance) {
//         draggableInstance.rotation = 0; // Draggable 내부 rotation 값 초기화
//         draggableInstance.update();    // 상태 반영
//         draggableInstance.disable();
//     }
//
//     // ➤ track-label 초기화 추가
//     const trackLabels = document.querySelectorAll('.track-label');
//     trackLabels.forEach(label => label.classList.remove('animate'));
// };
//
// let initialAnimationDone = false; // 최초 갤러리 애니메이션 완료 여부
// const itemsContainer = document.querySelector(".items");
//
// // 프로젝트 이미지 원형 배치 및 애니메이션 실행
// const runAnimation = () => {
//     // 새로운 애니메이션 시작 전에 혹시 이전 타임라인이 남아있다면 초기화
//     if (galleryAnimationTimeline) {
//         galleryAnimationTimeline.kill();
//         galleryAnimationTimeline = null;
//     }
//
//     if (draggableInstance) draggableInstance.disable(); // 애니메이션 시작 전 드래그 비활성화
//     itemsContainer.classList.remove("hover-enabled");   // 애니메이션 시작 전에는 hover 비활성화
//
//     // 1animation 실행 전에 right-area 데이터 업데이트
//     updateRightArea(0, false); // 첫 프로젝트 기준, 실제 데이터 바로 세팅
//     gsap.set(".right-area", {opacity:0, x:50}); // 완전히 숨김 상태에서 시작
//
//     galleryAnimationTimeline = gsap.timeline({
//         onComplete: () => {
//             if (draggableInstance) draggableInstance.enable(); // 애니메이션 끝나면 드래그 활성화
//             animateTrackLabels();
//
//             // ✅ 항상 첫 번째 프로젝트(Pixterest)로 초기화
//             previousActiveIndex = 0;
//
//             // 현재 중앙 트랙 index로 previousActiveIndex 초기화
//             const centerRotation = 0; // 초기 중앙 기준 회전값
//             const snapUnit = degree * 2;
//             previousActiveIndex = Math.round((centerRotation % 360) / snapUnit);
//             initialAnimationDone = true; // 최초 완료 표시
//
//             itemsContainer.classList.add("hover-enabled");  // hover 활성화
//         }
//     });
//
//     images.forEach((image, index) => {
//         gsap.set(image, {opacity: 1});
//
//         // 초기 회전 각도 및 크기 설정
//         const sign = Math.floor((index / 2) % 2) ? 1 : -1;
//         const value = Math.floor((index + 4) / 4) * 4;
//         const rotation = index > imageSize - 3 ? 0 : sign * value;
//
//         gsap.set(image, {
//             rotation: rotation,
//             scale: 0.5,
//         });
//
//         // 이미지가 화면 밖에서 날아오는 애니메이션
//         galleryAnimationTimeline.from(
//             image,
//             {
//                 x: 0,
//                 y: index % 2
//                     ? -window.innerHeight - image.clientHeight * 4
//                     : window.innerHeight + image.clientHeight * 4,
//                 rotation: index % 2 ? 200 : -200,
//                 scale: 4,
//                 opacity: 1,
//                 ease: "power4.out",
//                 duration: 1,
//                 delay: 0.15 * Math.floor(index / 2),
//             },
//             0
//         );
//
//         let rotationAngle = -index * degree;
//
//         // 최종 크기를 1로 복원
//         galleryAnimationTimeline.to(
//             image,
//             {
//                 scale: 1,
//                 duration: 0,
//             },
//             0.15 * (imageSize / 2 - 1) + 1
//         );
//
//         // 원형 배치로 정렬하는 애니메이션
//         galleryAnimationTimeline.to(
//             image,
//             {
//                 transformOrigin: "-60vh center",
//                 rotation:
//                     index > imageSize / 2 ? degree * (imageSize - index) : rotationAngle,
//                 duration: 1,
//                 ease: "power1.out",
//             },
//             0.15 * (imageSize / 2 - 1) + 1
//         );
//     });
//
//     // ➤ 오른쪽 영역 등장 애니메이션
//     galleryAnimationTimeline.fromTo(
//         ".right-area",                  // 애니메이션 적용 대상
//         {opacity: 0, x: 50, pointerEvents: "none"},          // 시작 상태: 투명 + 오른쪽으로 50px 이동
//         {opacity: 1, x: 0, duration: 0.8, ease: "power2.out", pointerEvents: "auto"}, // 종료 상태: 불투명 + 원래 위치
//         "-=0.5"                         // 타이밍: 이전 애니메이션 끝나기 0.5초 전에 시작
//     );
//
//     // ➤ 오른쪽 내부 정보 stagger 등장
//     galleryAnimationTimeline.fromTo(
//         ".right-area .info > *",         // 오른쪽 영역 info 하위 요소들을 아래에서 위로 순차적으로 나타나게 함
//         {y: 20, opacity: 0},           // 시작 상태: 아래로 20px 이동 + 투명
//         {y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out"}, // 종료 상태: 원래 위치 + 보이게, 0.6초, 0.1초 간격, 자연스러운 감속
//         "-=0.3"                          // 이전 애니메이션 끝나기 0.3초 전에 시작
//     );
// };
//
// // 드래그로 이미지 원형 회전 기능 활성화
// const draggable = () => {
//     let start = 0;
//     draggableInstance = Draggable.create(".items", {
//         type: "rotation",
//
//         onDragStart: function () {
//             start = this.rotation;
//         },
//         onDragEnd: function () {
//             const rotation = this.rotation;
//             const snapUnit = degree * 2; // 2개 단위 스냅
//             const offset = Math.abs(rotation - start);
//             let targetRotation;
//
//             // 드래그 방향에 따라 회전값 계산
//             if (rotation > start) {
//                 if (rotation - start < degree / 2) {
//                     targetRotation = rotation - offset;
//                 } else {
//                     targetRotation = rotation + (2 * degree - offset);
//                 }
//             } else {
//                 if (Math.abs(rotation - start) < degree / 2) {
//                     targetRotation = rotation + offset;
//                 } else {
//                     targetRotation = rotation - (2 * degree - offset);
//                 }
//             }
//
//             // 스냅 단위로 회전값 보정
//             targetRotation = Math.round(targetRotation / snapUnit) * snapUnit;
//
//             gsap.to(".items", {
//                 rotation: targetRotation,
//                 duration: 0.8,
//                 ease: "power2.out",
//                 onComplete: () => {
//                     // ➤ 드래그로 인한 회전일 때만 updateRightArea
//                     updateRightArea(targetRotation, true);
//                 }
//             });
//         },
//     })[0];
// };
//
// // 초기 실행
// init(); // 스크롤 감지 및 애니메이션 준비
// draggable(); // 드래그 회전 기능 활성화
//
//
// let previousActiveIndex = null; // 마지막으로 표시된 프로젝트 인덱스
//
// // function updateRightArea(currentRotation, isFromDrag = false) {
// window.updateRightArea = function (currentRotation, isFromDrag = false) {
//     const snapUnit = degree * 2;
//     let activeIndex = Math.round((currentRotation % 360) / snapUnit);
//
//     if (activeIndex < 0) activeIndex += total / 2;
//
//     const isSameTrack = activeIndex === previousActiveIndex;
//     previousActiveIndex = activeIndex;
//     if (isFromDrag && isSameTrack) return;
//
//     const projectData = projectsData[activeIndex];
//     const rightArea = document.querySelector(".right-area");
//     if (!projectData || !rightArea) return;
//
//     // ✅ 변경 체크 후 DOM 갱신
//     if (rightArea.querySelector(".title h1").textContent !== projectData.title) {
//         rightArea.querySelector(".title h1").textContent = projectData.title;
//     }
//     if (rightArea.querySelector(".date p").textContent !== projectData.date) {
//         rightArea.querySelector(".date p").textContent = projectData.date;
//     }
//
//     const updateInnerHTML = (containerSelector, dataArray) => {
//         const container = rightArea.querySelector(containerSelector);
//         if (!container) return;
//         const newHTML = dataArray.map(d => `<p>${d}</p>`).join("");
//         if (container.innerHTML !== newHTML) container.innerHTML = newHTML;
//     }
//
//     updateInnerHTML(".type div div", projectData.type);
//     updateInnerHTML(".language div div", projectData.language);
//     updateInnerHTML(".framework div div", projectData.framework);
//     updateInnerHTML(".etc div div", projectData.etc);
//
//     const featureList = rightArea.querySelector(".feature ol");
//     if (featureList) {
//         const newHTML = projectData.features.map(f => `<li>${f}</li>`).join("");
//         if (featureList.innerHTML !== newHTML) featureList.innerHTML = newHTML;
//     }
//
//     const slideContainer = rightArea.querySelector(".container");
//     if (slideContainer) {
//         const newSlidesHTML = projectData.slides
//             .map(slide => `<div class="slide" style="background-image:url('${slide}')"></div>`)
//             .join("");
//         if (slideContainer.innerHTML !== newSlidesHTML) {
//             slideContainer.innerHTML = newSlidesHTML;
//             slidesPlugin(); // 슬라이드 이벤트 재설정
//         }
//     }
//
//     rightArea.dataset.siteUrl = projectData.siteUrl;
//     rightArea.dataset.githubUrl = projectData.githubUrl;
//
//     animateTrackLabels();
//
//     // 오른쪽 영역 등장 애니메이션
//     // + 드래그로 호출된 경우만 등장 애니메이션 실행
//     if (isFromDrag) {
//         const infoItems = rightArea.querySelectorAll(".info > *");
//         const rightTimeline = gsap.timeline();
//         rightTimeline.fromTo(
//             rightArea,
//             {opacity: 0, x: 50, pointerEvents: "none"},
//             {opacity: 1, x: 0, duration: 1.5, ease: "power3.out", pointerEvents: "auto"}
//         );
//         rightTimeline.fromTo(
//             infoItems,
//             {y: 20, opacity: 0},
//             {y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out"},
//             "-=1.2"
//         );
//     }
// }
//
// // 화면 중앙에 있는 right-area의 track-label만 애니메이션 실행
// function animateTrackLabels() {
//     const trackLabels = document.querySelectorAll('.track-label');
//     const centerX = window.innerWidth / 2;
//
//     let closestLabel = null;
//     let minDistance = Infinity;
//
//     trackLabels.forEach(label => {
//         const rect = label.getBoundingClientRect();
//         const labelCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(centerX - labelCenter);
//
//         if (distance < minDistance) {
//             minDistance = distance;
//             closestLabel = label;
//         }
//     });
//
//     // 모든 라벨에서 animate 제거
//     trackLabels.forEach(label => label.classList.remove('animate'));
//
//     // 화면 중앙에 있는 라벨만 animate 적용
//     if (closestLabel) {
//         closestLabel.classList.add('animate');
//     }
// }
//
//
// // GSAP 이미지 슬라이드
// function slidesPlugin() {
//     const projects = document.querySelectorAll(".right-area");
//
//     projects.forEach((project) => {
//         const slides = project.querySelectorAll(".slide");
//
//         // 초기 활성화 상태 (3번째 슬라이드)
//         if (slides.length > 2) {
//             slides.forEach(slide => slide.classList.remove("active"));
//             slides[2].classList.add("active");
//         }
//
//         slides.forEach((slide) => {
//             slide.replaceWith(slide.cloneNode(true)); // 이벤트 초기화
//         });
//
//         // 이벤트 재설정
//         project.querySelectorAll(".slide").forEach((slide) => {
//             slide.addEventListener("click", () => {
//                 if (slide.classList.contains("active")) {
//                     openModal(slide);
//                     return;
//                 }
//                 project.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
//                 slide.classList.add("active");
//             });
//         });
//     });
// }
//
//
// // ✅ 최초 실행
// slidesPlugin();
//
//
// // 모달 열기 함수
// function openModal(slide) {
//     const modal = document.querySelector(".image-modal");
//     const modalImg = modal.querySelector("img");
//     const closeBtn = modal.querySelector(".close-button");
//
//     // 슬라이드 배경 이미지를 모달에 적용
//     const bg = slide.style.backgroundImage;
//     modalImg.src = bg.slice(5, -2); // url("...") 형태니까 자르기
//
//     modal.classList.add("show");
//     document.body.style.overflow = "hidden"; // 스크롤 막기
//
//     // 버튼 폭 맞추는 함수
//     const updateButtonWidth = () => {
//         closeBtn.style.width = modalImg.clientWidth + "px";
//     };
//
//     // 이미지 로드 후 초기 폭 설정
//     modalImg.onload = updateButtonWidth;
//
//     // 리사이즈 시 폭 자동 업데이트
//     window.addEventListener("resize", updateButtonWidth);
//
//     // 모달 닫기 함수
//     const closeModal = () => {
//         modal.classList.remove("show");
//         document.body.style.overflow = "";
//         window.removeEventListener("resize", updateButtonWidth); // 이벤트 제거
//     };
//
//     // 모달 외부 클릭 시 닫기
//     modal.addEventListener("click", (e) => {
//         if (e.target === modal) closeModal();
//     });
//
//     // 닫기 버튼 클릭 시
//     closeBtn.addEventListener("click", closeModal);
// }
//
//
// const projectModal = document.getElementById("modal");
// const modalMessage = document.getElementById("modalMessage");
// const projectCloseBtn = projectModal.querySelector(".close-button");
//
// // 모든 프로젝트 버튼 처리
// document.querySelectorAll(".right-area").forEach((project) => {
//     const viewBtn = project.querySelector(".button-area button:nth-child(1)");
//     const githubBtn = project.querySelector(".button-area button:nth-child(2)");
//
//     // "보기" 버튼 클릭
//     viewBtn.addEventListener("click", () => {
//         const siteUrl = project.dataset.siteUrl;
//         if (siteUrl && siteUrl !== "#" && siteUrl !== "local") {
//             window.open(siteUrl, "_blank");
//         } else {
//             modalMessage.innerHTML = "🚧 이 프로젝트는 현재 배포되지 않았습니다.<br>GitHub에서 코드를 확인하실 수 있습니다.";
//             projectModal.classList.add("show");
//             document.body.style.overflow = "hidden"; // 스크롤 막기
//         }
//     });
//
//     // "GitHub" 버튼 클릭
//     githubBtn.addEventListener("click", () => {
//         const githubUrl = project.dataset.githubUrl;
//         if (githubUrl && githubUrl !== "#") {
//             window.open(githubUrl, "_blank");
//         } else {
//             modalMessage.innerHTML = "🚧 GitHub 링크가 준비되지 않았습니다.";
//             projectModal.classList.add("show");
//             document.body.style.overflow = "hidden";
//         }
//     });
// });
//
// // 모달 닫기: 외부 클릭
// projectModal.addEventListener("click", (e) => {
//     if (e.target === projectModal) {
//         projectModal.classList.remove("show");
//         document.body.style.overflow = ""; // 스크롤 해제
//     }
// });
//
// // 닫기 버튼 클릭
// projectCloseBtn.addEventListener("click", () => {
//     projectModal.classList.remove("show");
//     document.body.style.overflow = "";
// });


// import {projectsData} from './projectData.js';
//
// window.AppState = window.AppState || {
//     isScrolling: false,
//     currentRotation: 0,
//     activeProjectIndex: 0,
//     isGalleryAnimating: false,
//     hasInitialGalleryAnimationRun: false,
// };
//
// document.addEventListener("DOMContentLoaded", () => {
//     updateRightArea(0, false); // 최초 세팅
//     init();                    // 스크롤 감지 및 애니메이션 준비
// });
//
// const images = gsap.utils.toArray(".item");
// const imageSize = images.length;
// const total = images.length;
// const degree = 360 / total;
//
// let animationTriggered = false; // 애니메이션 실행 여부 플래그
//
// // 초기 설정 및 스크롤 이벤트 등록
// const init = () => {
//     gsap.set(images, {opacity: 0});
//
//     const projectsSection = document.getElementById('projects');
//     if (!projectsSection) return;
//
//     // IntersectionObserver 등록
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             if (entry.intersectionRatio >= 0.99 && !animationTriggered) {
//                 animationTriggered = true;
//                 runAnimation();
//             } else if (entry.intersectionRatio < 0.01 && animationTriggered) {
//                 resetAnimation();
//                 animationTriggered = false;
//             }
//         });
//     }, {threshold: Array.from({length: 101}, (_, i) => i / 100)});
//     observer.observe(projectsSection);
//
//     // 초기 강제 체크 (로드 직후 스크롤로 내려도 감지)
//     setTimeout(checkProjectSection, 100);
// };
//
// // 프로젝트 섹션 위치 강제 체크
// const checkProjectSection = () => {
//     const projectsSection = document.getElementById('projects');
//     if (!projectsSection) return;
//     const rect = projectsSection.getBoundingClientRect();
//
//     if (!animationTriggered && rect.top <= 0 && rect.bottom >= window.innerHeight) {
//         animationTriggered = true;
//         runAnimation();
//     } else if (animationTriggered && rect.bottom < window.innerHeight * 0.01) {
//         resetAnimation();
//         animationTriggered = false;
//     }
// };
//
//
// let galleryAnimationTimeline = null; // 갤러리 애니메이션 타임라인을 저장할 변수
//
// // 애니메이션 상태 초기화 함수
// const resetAnimation = () => {
//     if (galleryAnimationTimeline) {
//         galleryAnimationTimeline.kill(); // 특정 타임라인만 완전히 중지
//         galleryAnimationTimeline = null; // 참조 초기화
//     }
//
//     // 모든 애니메이션 타임라인 중지 및 초기화
//     gsap.killTweensOf(images);
//
//     // 오른쪽 영역 관련 모든 애니메이션 중지
//     const rightArea = document.querySelector(".right-area");
//     const infoItems = rightArea?.querySelectorAll(".info > *") || [];
//
//     gsap.killTweensOf(rightArea);
//     gsap.killTweensOf(infoItems);
//
//     // 이미지 상태 초기화
//     gsap.set(images, {
//         opacity: 0,
//         x: 0,
//         y: 0,
//         rotation: 0,
//         scale: 1,
//         transformOrigin: "center center"
//     });
//
//     // 오른쪽 영역 초기화
//     if (rightArea) {
//         gsap.set(rightArea, {opacity: 0, x: 50});
//         gsap.set(infoItems, {opacity: 0, y: 20});
//     }
//
//     // items 컨테이너 회전값 강제 리셋 (항상 첫 프로젝트가 중앙으로 오게)
//     gsap.set(".items", {rotation: 0});
//
//     // ➤ track-label 초기화 추가
//     const trackLabels = document.querySelectorAll('.track-label');
//     trackLabels.forEach(label => label.classList.remove('animate'));
// };
//
// const itemsContainer = document.querySelector(".items");
//
// // 프로젝트 이미지 원형 배치 및 애니메이션 실행
// const runAnimation = () => {
//     window.AppState.isGalleryAnimating = true;
//
//     // 새로운 애니메이션 시작 전에 혹시 이전 타임라인이 남아있다면 초기화
//     if (galleryAnimationTimeline) {
//         galleryAnimationTimeline.kill();
//         galleryAnimationTimeline = null;
//     }
//
//     itemsContainer.classList.remove("hover-enabled");   // 애니메이션 시작 전에는 hover 비활성화
//     updateRightArea(0, false); // 첫 프로젝트 기준, 실제 데이터 바로 세팅
//     gsap.set(".right-area", {opacity:0, x:50}); // 완전히 숨김 상태에서 시작
//
//     if (window.smoother) window.smoother.paused(true);  // ➤ 스크롤 잠금
//
//     galleryAnimationTimeline = gsap.timeline({
//         onComplete: () => {
//             // ✅ 항상 첫 번째 프로젝트(Pixterest)로 초기화
//             previousActiveIndex = 0;
//
//             // 현재 중앙 트랙 index로 previousActiveIndex 초기화
//             const centerRotation = 0; // 초기 중앙 기준 회전값
//             const snapUnit = degree * 2;
//             previousActiveIndex = Math.round((centerRotation % 360) / snapUnit);
//             window.AppState.hasInitialGalleryAnimationRun = true;
//
//             itemsContainer.classList.add("hover-enabled");  // hover 활성화
//
//
//             setTimeout(() => {
//                 if (window.smoother) window.smoother.paused(false);
//             }, 300); // 0.3초 안정화 시간후, 스크롤 다시 활성화
//
//             animateTrackLabels();
//
//             window.AppState.isGalleryAnimating = false;
//         }
//     });
//
//     images.forEach((image, index) => {
//         gsap.set(image, {opacity: 1});
//
//         // 초기 회전 각도 및 크기 설정
//         const sign = Math.floor((index / 2) % 2) ? 1 : -1;
//         const value = Math.floor((index + 4) / 4) * 4;
//         const rotation = index > imageSize - 3 ? 0 : sign * value;
//
//         gsap.set(image, {
//             rotation: rotation,
//             scale: 0.5,
//         });
//
//         // 이미지가 화면 밖에서 날아오는 애니메이션
//         galleryAnimationTimeline.from(
//             image,
//             {
//                 x: 0,
//                 y: index % 2
//                     ? -window.innerHeight - image.clientHeight * 4
//                     : window.innerHeight + image.clientHeight * 4,
//                 rotation: index % 2 ? 200 : -200,
//                 scale: 4,
//                 opacity: 1,
//                 ease: "power4.out",
//                 duration: 1,
//                 delay: 0.15 * Math.floor(index / 2),
//             },
//             0
//         );
//
//         let rotationAngle = -index * degree;
//
//         // 최종 크기를 1로 복원
//         galleryAnimationTimeline.to(
//             image,
//             {
//                 scale: 1,
//                 duration: 0,
//             },
//             0.15 * (imageSize / 2 - 1) + 1
//         );
//
//         // 원형 배치로 정렬하는 애니메이션
//         galleryAnimationTimeline.to(
//             image,
//             {
//                 transformOrigin: "-60vh center",
//                 rotation:
//                     index > imageSize / 2 ? degree * (imageSize - index) : rotationAngle,
//                 duration: 1,
//                 ease: "power1.out",
//             },
//             0.15 * (imageSize / 2 - 1) + 1
//         );
//     });
//
//     // ➤ 오른쪽 영역 등장 애니메이션
//     galleryAnimationTimeline.fromTo(
//         ".right-area",                  // 애니메이션 적용 대상
//         {opacity: 0, x: 50, pointerEvents: "none"},          // 시작 상태: 투명 + 오른쪽으로 50px 이동
//         {opacity: 1, x: 0, duration: 0.8, ease: "power2.out", pointerEvents: "auto"}, // 종료 상태: 불투명 + 원래 위치
//         "-=0.5"                         // 타이밍: 이전 애니메이션 끝나기 0.5초 전에 시작
//     );
//
//     // ➤ 오른쪽 내부 정보 stagger 등장
//     galleryAnimationTimeline.fromTo(
//         ".right-area .info > *",         // 오른쪽 영역 info 하위 요소들을 아래에서 위로 순차적으로 나타나게 함
//         {y: 20, opacity: 0},           // 시작 상태: 아래로 20px 이동 + 투명
//         {y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out"}, // 종료 상태: 원래 위치 + 보이게, 0.6초, 0.1초 간격, 자연스러운 감속
//         "-=0.3"                          // 이전 애니메이션 끝나기 0.3초 전에 시작
//     );
// };
//
// // 초기 실행
// init(); // 스크롤 감지 및 애니메이션 준비
//
// let previousActiveIndex = null; // 마지막으로 표시된 프로젝트 인덱스
//
// window.updateRightArea = function (currentRotation, isFromDrag = false) {
//     const snapUnit = degree * 2;
//     let activeIndex = Math.round((currentRotation % 360) / snapUnit);
//
//     if (activeIndex < 0) activeIndex += total / 2;
//
//     const isSameTrack = activeIndex === previousActiveIndex;
//     previousActiveIndex = activeIndex;
//     if (isFromDrag && isSameTrack) return;
//
//     const projectData = projectsData[activeIndex];
//     const rightArea = document.querySelector(".right-area");
//     if (!projectData || !rightArea) return;
//
//     // ✅ 변경 체크 후 DOM 갱신
//     if (rightArea.querySelector(".title h1").textContent !== projectData.title) {
//         rightArea.querySelector(".title h1").textContent = projectData.title;
//     }
//     if (rightArea.querySelector(".date p").textContent !== projectData.date) {
//         rightArea.querySelector(".date p").textContent = projectData.date;
//     }
//
//     const updateInnerHTML = (containerSelector, dataArray) => {
//         const container = rightArea.querySelector(containerSelector);
//         if (!container) return;
//         const newHTML = dataArray.map(d => `<p>${d}</p>`).join("");
//         if (container.innerHTML !== newHTML) container.innerHTML = newHTML;
//     }
//
//     updateInnerHTML(".type div div", projectData.type);
//     updateInnerHTML(".language div div", projectData.language);
//     updateInnerHTML(".framework div div", projectData.framework);
//     updateInnerHTML(".etc div div", projectData.etc);
//
//     const featureList = rightArea.querySelector(".feature ol");
//     if (featureList) {
//         const newHTML = projectData.features.map(f => `<li>${f}</li>`).join("");
//         if (featureList.innerHTML !== newHTML) featureList.innerHTML = newHTML;
//     }
//
//     const slideContainer = rightArea.querySelector(".container");
//     if (slideContainer) {
//         const newSlidesHTML = projectData.slides
//             .map(slide => `<div class="slide" style="background-image:url('${slide}')"></div>`)
//             .join("");
//         if (slideContainer.innerHTML !== newSlidesHTML) {
//             slideContainer.innerHTML = newSlidesHTML;
//             slidesPlugin(); // 슬라이드 이벤트 재설정
//         }
//     }
//
//     rightArea.dataset.siteUrl = projectData.siteUrl;
//     rightArea.dataset.githubUrl = projectData.githubUrl;
//
//     if (window.AppState.hasInitialGalleryAnimationRun && !window.AppState.isGalleryAnimating) {
//         animateTrackLabels();
//     }
//
//     // 오른쪽 영역 등장 애니메이션
//     // + 드래그로 호출된 경우만 등장 애니메이션 실행
//     if (isFromDrag) {
//         const infoItems = rightArea.querySelectorAll(".info > *");
//         const rightTimeline = gsap.timeline();
//         rightTimeline.fromTo(
//             rightArea,
//             {opacity: 0, x: 50, pointerEvents: "none"},
//             {opacity: 1, x: 0, duration: 1.5, ease: "power3.out", pointerEvents: "auto"}
//         );
//         rightTimeline.fromTo(
//             infoItems,
//             {y: 20, opacity: 0},
//             {y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out"},
//             "-=1.2"
//         );
//     }
// }
//
// // 화면 중앙에 있는 right-area의 track-label만 애니메이션 실행
// function animateTrackLabels() {
//     const trackLabels = document.querySelectorAll('.track-label');
//     const centerX = window.innerWidth / 2;
//
//     let closestLabel = null;
//     let minDistance = Infinity;
//
//     trackLabels.forEach(label => {
//         const rect = label.getBoundingClientRect();
//         const labelCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(centerX - labelCenter);
//
//         if (distance < minDistance) {
//             minDistance = distance;
//             closestLabel = label;
//         }
//     });
//
//     // 모든 라벨에서 animate 제거
//     trackLabels.forEach(label => label.classList.remove('animate'));
//
//     // 화면 중앙에 있는 라벨만 animate 적용
//     if (closestLabel) {
//         closestLabel.classList.add('animate');
//     }
// }
//
//
// // GSAP 이미지 슬라이드
// function slidesPlugin() {
//     const projects = document.querySelectorAll(".right-area");
//
//     projects.forEach((project) => {
//         const slides = project.querySelectorAll(".slide");
//
//         // 초기 활성화 상태 (3번째 슬라이드)
//         if (slides.length > 2) {
//             slides.forEach(slide => slide.classList.remove("active"));
//             slides[2].classList.add("active");
//         }
//
//         slides.forEach((slide) => {
//             slide.replaceWith(slide.cloneNode(true)); // 이벤트 초기화
//         });
//
//         // 이벤트 재설정
//         project.querySelectorAll(".slide").forEach((slide) => {
//             slide.addEventListener("click", () => {
//                 if (slide.classList.contains("active")) {
//                     openModal(slide);
//                     return;
//                 }
//                 project.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
//                 slide.classList.add("active");
//             });
//         });
//     });
// }
//
//
// // ✅ 최초 실행
// slidesPlugin();
//
//
// // 모달 열기 함수
// function openModal(slide) {
//     const modal = document.querySelector(".image-modal");
//     const modalImg = modal.querySelector("img");
//     const closeBtn = modal.querySelector(".close-button");
//
//     // 슬라이드 배경 이미지를 모달에 적용
//     const bg = slide.style.backgroundImage;
//     modalImg.src = bg.slice(5, -2); // url("...") 형태니까 자르기
//
//     modal.classList.add("show");
//     if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
//
//     // 버튼 폭 맞추는 함수
//     const updateButtonWidth = () => {
//         closeBtn.style.width = modalImg.clientWidth + "px";
//     };
//
//     // 이미지 로드 후 초기 폭 설정
//     modalImg.onload = updateButtonWidth;
//
//     // 리사이즈 시 폭 자동 업데이트
//     window.addEventListener("resize", updateButtonWidth);
//
//     // 모달 닫기 함수
//     const closeModal = () => {
//         modal.classList.remove("show");
//         if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
//         window.removeEventListener("resize", updateButtonWidth); // 이벤트 제거
//     };
//
//     // 모달 외부 클릭 시 닫기
//     modal.addEventListener("click", (e) => {
//         if (e.target === modal) closeModal();
//     });
//
//     // 닫기 버튼 클릭 시
//     closeBtn.addEventListener("click", closeModal);
// }
//
//
// const projectModal = document.getElementById("modal");
// const modalMessage = document.getElementById("modalMessage");
// const projectCloseBtn = projectModal.querySelector(".close-button");
//
// // 모든 프로젝트 버튼 처리
// document.querySelectorAll(".right-area").forEach((project) => {
//     const viewBtn = project.querySelector(".button-area button:nth-child(1)");
//     const githubBtn = project.querySelector(".button-area button:nth-child(2)");
//
//     // "보기" 버튼 클릭
//     viewBtn.addEventListener("click", () => {
//         const siteUrl = project.dataset.siteUrl;
//         if (siteUrl && siteUrl !== "#" && siteUrl !== "local") {
//             window.open(siteUrl, "_blank");
//         } else {
//             modalMessage.innerHTML = "🚧 이 프로젝트는 현재 배포되지 않았습니다.<br>GitHub에서 코드를 확인하실 수 있습니다.";
//             projectModal.classList.add("show");
//             if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
//         }
//     });
//
//     // "GitHub" 버튼 클릭
//     githubBtn.addEventListener("click", () => {
//         const githubUrl = project.dataset.githubUrl;
//         if (githubUrl && githubUrl !== "#") {
//             window.open(githubUrl, "_blank");
//         } else {
//             modalMessage.innerHTML = "🚧 GitHub 링크가 준비되지 않았습니다.";
//             projectModal.classList.add("show");
//             if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
//         }
//     });
// });
//
// // 모달 닫기: 외부 클릭
// projectModal.addEventListener("click", (e) => {
//     if (e.target === projectModal) {
//         projectModal.classList.remove("show");
//         if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
//     }
// });
//
// // 닫기 버튼 클릭
// projectCloseBtn.addEventListener("click", () => {
//     projectModal.classList.remove("show");
//     if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
// });


// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// ★★★★★★★★★★★★★★★★★★★★★★★★★프로젝트 섹션 수정 -완★★★★★★★★★★★★★★★★★★★★★★★★★
// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// import {projectsData} from './projectData.js';
//
// window.AppState = window.AppState || {
//     isScrolling: false,
//     currentRotation: 0,
//     activeProjectIndex: 0,
//     isGalleryAnimating: false,
//     hasInitialGalleryAnimationRun: false,
// };
//
// document.addEventListener("DOMContentLoaded", () => {
//     updateRightArea(0, false); // 최초 세팅
//     init();                    // 스크롤 감지 및 애니메이션 준비
// });
//
// const images = gsap.utils.toArray(".item");
// const imageSize = images.length;
// const total = images.length;
// const degree = 360 / total;
//
// let animationTriggered = false; // 애니메이션 실행 여부 플래그
//
// // helper: 섹션을 스무스 스크롤로 뷰포트 상단에 맞춘 뒤 콜백 실행
// const scrollAndAlignThenRun = (el, cb) => {
//     if (!el) return cb();
//
//     const targetTop = 0;
//     const tolerance = 3;
//     let finished = false;
//
//     const tryFinish = () => {
//         const rect = el.getBoundingClientRect();
//         if (Math.abs(rect.top - targetTop) <= tolerance) {
//             if (finished) return;
//             finished = true;
//             window.removeEventListener('scroll', onScroll);
//             clearInterval(poll);
//             setTimeout(() => cb(), 60);
//         }
//     };
//
//     const onScroll = () => tryFinish();
//
//     el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     window.addEventListener('scroll', onScroll, { passive: true });
//
//     const poll = setInterval(tryFinish, 40);
//
//     setTimeout(() => {
//         if (finished) return;
//         finished = true;
//         window.removeEventListener('scroll', onScroll);
//         clearInterval(poll);
//         cb();
//     }, 900);
// };
//
//
// // 초기 설정 및 스크롤 이벤트 등록
// const init = () => {
//     // const isMobile = window.innerWidth <= 800;
//
//     gsap.set(images, {opacity: 0});
//
//     const projectsSection = document.getElementById('projects');
//     if (!projectsSection) return;
//
//     // // 📱 모바일: 애니메이션 없이 바로 보이게
//     // if (isMobile) {
//     //     gsap.set(images, { opacity: 1 });
//     //     const rightArea = document.querySelector(".right-area");
//     //     if (rightArea) {
//     //         gsap.set(rightArea, { opacity: 1, x: 0 });
//     //         gsap.set(".right-area .info > *", { opacity: 1, y: 0 });
//     //     }
//     //     return; // ❌ 모바일은 여기서 끝
//     // }
//
//     // IntersectionObserver 등록
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             const ratio = entry.intersectionRatio;
//             if (ratio >= 0.85 && !animationTriggered) {
//                 animationTriggered = true;
//                 scrollAndAlignThenRun(projectsSection, runAnimation);
//             } else if (ratio < 0.05 && animationTriggered) {
//                 resetAnimation();
//                 animationTriggered = false;
//             }
//         });
//     }, {threshold: Array.from({length: 101}, (_, i) => i / 100)});
//
//     observer.observe(projectsSection);
//
//     setTimeout(checkProjectSection, 100);   // 초기 강제 체크 (로드 직후 스크롤로 내려도 감지)
// };
//
// // 프로젝트 섹션 위치 강제 체크
// const checkProjectSection = () => {
//     const projectsSection = document.getElementById('projects');
//     if (!projectsSection) return;
//     const rect = projectsSection.getBoundingClientRect();
//
//     if (!animationTriggered && rect.top <= 0 && rect.bottom >= window.innerHeight) {
//         animationTriggered = true;
//         scrollAndAlignThenRun(projectsSection, runAnimation);
//     } else if (animationTriggered && rect.bottom < window.innerHeight * 0.01) {
//         resetAnimation();
//         animationTriggered = false;
//     }
// };
//
// let galleryAnimationTimeline = null; // 갤러리 애니메이션 타임라인을 저장할 변수
//
// // 애니메이션 상태 초기화 함수
// const resetAnimation = () => {
//     if (galleryAnimationTimeline) {
//         galleryAnimationTimeline.kill(); // 특정 타임라인만 완전히 중지
//         galleryAnimationTimeline = null; // 참조 초기화
//     }
//
//     // 모든 애니메이션 타임라인 중지 및 초기화
//     gsap.killTweensOf(images);
//
//     // 오른쪽 영역 관련 모든 애니메이션 중지
//     const rightArea = document.querySelector(".right-area");
//     const infoItems = rightArea?.querySelectorAll(".info > *") || [];
//
//     gsap.killTweensOf(rightArea);
//     gsap.killTweensOf(infoItems);
//
//     // 이미지 상태 초기화
//     gsap.set(images, {
//         opacity: 0,
//         x: 0,
//         y: 0,
//         rotation: 0,
//         scale: 1,
//         transformOrigin: "center center"
//     });
//
//     // 오른쪽 영역 초기화
//     if (rightArea) {
//         gsap.set(rightArea, {opacity: 0, x: 50});
//         gsap.set(infoItems, {opacity: 0, y: 20});
//     }
//
//     // items 컨테이너 회전값 강제 리셋 (항상 첫 프로젝트가 중앙으로 오게)
//     gsap.set(".items", {rotation: 0});
//
//     // ➤ track-label 초기화 추가
//     const trackLabels = document.querySelectorAll('.track-label');
//     trackLabels.forEach(label => label.classList.remove('animate'));
// };
//
// const itemsContainer = document.querySelector(".items");
//
// // 프로젝트 이미지 원형 배치 및 애니메이션 실행
// const runAnimation = () => {
//     // ✅ 모바일에서는 모든 애니메이션 비활성화
//     if (window.innerWidth < 800) return;
//
//     // ✅ 툴바 이동 중이면 애니메이션 실행하지 않음
//     if (window.isScrollingToSection) return;
//
//     window.AppState.isGalleryAnimating = true;
//
//     // 새로운 애니메이션 시작 전에 혹시 이전 타임라인이 남아있다면 초기화
//     if (galleryAnimationTimeline) {
//         galleryAnimationTimeline.kill();
//         galleryAnimationTimeline = null;
//     }
//
//     itemsContainer.classList.remove("hover-enabled");   // 애니메이션 시작 전에는 hover 비활성화
//     updateRightArea(0, false); // 첫 프로젝트 기준, 실제 데이터 바로 세팅
//     gsap.set(".right-area", {opacity:0, x:50}); // 완전히 숨김 상태에서 시작
//
//     if (window.smoother) window.smoother.paused(true);  // ➤ 스크롤 잠금
//
//     galleryAnimationTimeline = gsap.timeline({
//         onComplete: () => {
//             // ✅ 항상 첫 번째 프로젝트(Pixterest)로 초기화
//             previousActiveIndex = 0;
//
//             // 현재 중앙 트랙 index로 previousActiveIndex 초기화
//             const centerRotation = 0; // 초기 중앙 기준 회전값
//             const snapUnit = degree * 2;
//             previousActiveIndex = Math.round((centerRotation % 360) / snapUnit);
//             window.AppState.hasInitialGalleryAnimationRun = true;
//
//             itemsContainer.classList.add("hover-enabled");  // hover 활성화
//
//
//             setTimeout(() => {
//                 if (window.smoother) window.smoother.paused(false);
//             }, 300); // 0.3초 안정화 시간후, 스크롤 다시 활성화
//
//             animateTrackLabels();
//
//             window.AppState.isGalleryAnimating = false;
//         }
//     });
//
//     images.forEach((image, index) => {
//         gsap.set(image, {opacity: 1});
//
//         // 초기 회전 각도 및 크기 설정
//         const sign = Math.floor((index / 2) % 2) ? 1 : -1;
//         const value = Math.floor((index + 4) / 4) * 4;
//         const rotation = index > imageSize - 3 ? 0 : sign * value;
//
//         gsap.set(image, {
//             x: 0,
//             y: 0,
//             rotation: rotation,
//             scale: 0.5,
//         });
//
//         // 이미지가 화면 밖에서 날아오는 애니메이션
//         galleryAnimationTimeline.from(
//             image,
//             {
//                 x: 0,
//                 y: index % 2
//                     ? -window.innerHeight - image.clientHeight * 4
//                     : window.innerHeight + image.clientHeight * 4,
//                 rotation: index % 2 ? 200 : -200,
//                 scale: 4,
//                 opacity: 1,
//                 ease: "power4.out",
//                 duration: 1,
//                 delay: 0.15 * Math.floor(index / 2),
//             },
//             0
//         );
//
//         let rotationAngle = -index * degree;
//
//         // 최종 크기를 1로 복원
//         galleryAnimationTimeline.to(
//             image,
//             {
//                 scale: 1,
//                 duration: 0,
//             },
//             0.15 * (imageSize / 2 - 1) + 1
//         );
//
//         // 원형 배치로 정렬하는 애니메이션
//         galleryAnimationTimeline.to(
//             image,
//             {
//                 x: 0,
//                 y: 0,
//                 transformOrigin: "-60vh center",
//                 rotation:
//                     index > imageSize / 2 ? degree * (imageSize - index) : rotationAngle,
//                 duration: 1,
//                 ease: "power1.out",
//             },
//             0.15 * (imageSize / 2 - 1) + 1
//         );
//     });
//
//     // ➤ 오른쪽 영역 등장 애니메이션
//     galleryAnimationTimeline.fromTo(
//         ".right-area",                  // 애니메이션 적용 대상
//         {opacity: 0, x: 50, pointerEvents: "none"},          // 시작 상태: 투명 + 오른쪽으로 50px 이동
//         {opacity: 1, x: 0, duration: 0.8, ease: "power2.out", pointerEvents: "auto"}, // 종료 상태: 불투명 + 원래 위치
//         "-=0.5"                         // 타이밍: 이전 애니메이션 끝나기 0.5초 전에 시작
//     );
//
//     // ➤ 오른쪽 내부 정보 stagger 등장
//     galleryAnimationTimeline.fromTo(
//         ".right-area .info > *",         // 오른쪽 영역 info 하위 요소들을 아래에서 위로 순차적으로 나타나게 함
//         {y: 20, opacity: 0},           // 시작 상태: 아래로 20px 이동 + 투명
//         {y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out"}, // 종료 상태: 원래 위치 + 보이게, 0.6초, 0.1초 간격, 자연스러운 감속
//         "-=0.3"                          // 이전 애니메이션 끝나기 0.3초 전에 시작
//     );
// };
//
// // 초기 실행
// init(); // 스크롤 감지 및 애니메이션 준비
//
// let previousActiveIndex = null; // 마지막으로 표시된 프로젝트 인덱스
//
// window.updateRightArea = function (currentRotation, isFromDrag = false) {
//     // 문자열이면 숫자로 변환
//     if (typeof currentRotation === "string") {
//         currentRotation = parseFloat(currentRotation);
//     }
//
//     const snapUnit = degree * 2; // 한 트랙 당 회전 각도
//     const totalTracks = total / 2;
//
//     // 트랙 인덱스 계산
//     let activeIndex = Math.round((currentRotation % 360) / snapUnit);
//     if (activeIndex < 0) activeIndex += totalTracks;
//
//     const isSameTrack = activeIndex === previousActiveIndex;
//
//     previousActiveIndex = activeIndex;
//     if (isFromDrag && isSameTrack) return;
//
//     const projectData = projectsData[activeIndex];
//     const rightArea = document.querySelector(".right-area");
//
//     if (!projectData || !rightArea) {
//         return;
//     }
//
//     // ✅ DOM 갱신
//     if (rightArea.querySelector(".title h1").textContent !== projectData.title) {
//         rightArea.querySelector(".title h1").textContent = projectData.title;
//     }
//     if (rightArea.querySelector(".date p").textContent !== projectData.date) {
//         rightArea.querySelector(".date p").textContent = projectData.date;
//     }
//
//     const updateInnerHTML = (containerSelector, dataArray) => {
//         const container = rightArea.querySelector(containerSelector);
//         if (!container) return;
//         const newHTML = dataArray.map(d => `<p>${d}</p>`).join("");
//         if (container.innerHTML !== newHTML) container.innerHTML = newHTML;
//     }
//
//     updateInnerHTML(".type div div", projectData.type);
//     updateInnerHTML(".language div div", projectData.language);
//     updateInnerHTML(".framework div div", projectData.framework);
//     updateInnerHTML(".etc div div", projectData.etc);
//
//     const featureList = rightArea.querySelector(".feature ol");
//     if (featureList) {
//         const newHTML = projectData.features.map(f => `<li>${f}</li>`).join("");
//         if (featureList.innerHTML !== newHTML) featureList.innerHTML = newHTML;
//     }
//
//     const slideContainer = rightArea.querySelector(".container");
//     if (slideContainer) {
//         const newSlidesHTML = projectData.slides
//             .map(slide => `<div class="slide" style="background-image:url('${slide}')"></div>`)
//             .join("");
//         if (slideContainer.innerHTML !== newSlidesHTML) {
//             slideContainer.innerHTML = newSlidesHTML;
//             slidesPlugin();
//         }
//     }
//
//     rightArea.dataset.siteUrl = projectData.siteUrl;
//     rightArea.dataset.githubUrl = projectData.githubUrl;
//
//     if (window.AppState.hasInitialGalleryAnimationRun && !window.AppState.isGalleryAnimating) {
//         animateTrackLabels();
//     }
//
//     if (isFromDrag) {
//         const infoItems = rightArea.querySelectorAll(".info > *");
//         const rightTimeline = gsap.timeline();
//
//         // ✅ 수정: 갤러리 애니메이션이 끝난 경우만 실행
//         if (!window.AppState.isGalleryAnimating) {
//             rightTimeline.fromTo(
//                 rightArea,
//                 {opacity: 0, x: 50, pointerEvents: "none"},
//                 {opacity: 1, x: 0, duration: 1.5, ease: "power3.out", pointerEvents: "auto"}
//             );
//             rightTimeline.fromTo(
//                 infoItems,
//                 {y: 20, opacity: 0},
//                 {y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out"},
//                 "-=1.2"
//             );
//         }
//     }
// }
//
// // 화면 중앙에 있는 right-area의 track-label만 애니메이션 실행
// function animateTrackLabels() {
//     const trackLabels = document.querySelectorAll('.track-label');
//     const centerX = window.innerWidth / 2;
//
//     let closestLabel = null;
//     let minDistance = Infinity;
//
//     trackLabels.forEach(label => {
//         const rect = label.getBoundingClientRect();
//         const labelCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(centerX - labelCenter);
//
//         if (distance < minDistance) {
//             minDistance = distance;
//             closestLabel = label;
//         }
//     });
//
//     // 모든 라벨에서 animate 제거
//     trackLabels.forEach(label => label.classList.remove('animate'));
//
//     // 화면 중앙에 있는 라벨만 animate 적용
//     if (closestLabel) {
//         closestLabel.classList.add('animate');
//     }
// }
//
//
// // GSAP 이미지 슬라이드
// function slidesPlugin() {
//     const projects = document.querySelectorAll(".right-area");
//
//     projects.forEach((project) => {
//         const slides = project.querySelectorAll(".slide");
//
//         // 초기 활성화 상태 (3번째 슬라이드)
//         if (slides.length > 2) {
//             slides.forEach(slide => slide.classList.remove("active"));
//             slides[2].classList.add("active");
//         }
//
//         slides.forEach((slide) => {
//             slide.replaceWith(slide.cloneNode(true)); // 이벤트 초기화
//         });
//
//         // 이벤트 재설정
//         project.querySelectorAll(".slide").forEach((slide) => {
//             slide.addEventListener("click", () => {
//                 if (slide.classList.contains("active")) {
//                     openModal(slide);
//                     return;
//                 }
//                 project.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
//                 slide.classList.add("active");
//             });
//         });
//     });
// }
//
//
// // ✅ 최초 실행
// slidesPlugin();
//
//
// // 모달 열기 함수
// function openModal(slide) {
//     const modal = document.querySelector(".image-modal");
//     const modalImg = modal.querySelector("img");
//     const closeBtn = modal.querySelector(".close-button");
//
//     // 슬라이드 배경 이미지를 모달에 적용
//     const bg = slide.style.backgroundImage;
//     modalImg.src = bg.slice(5, -2); // url("...") 형태니까 자르기
//
//     modal.classList.add("show");
//     if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
//
//     // 버튼 폭 맞추는 함수
//     const updateButtonWidth = () => {
//         closeBtn.style.width = modalImg.clientWidth + "px";
//     };
//
//     // 이미지 로드 후 초기 폭 설정
//     modalImg.onload = updateButtonWidth;
//
//     // 리사이즈 시 폭 자동 업데이트
//     window.addEventListener("resize", updateButtonWidth);
//
//     // 모달 닫기 함수
//     const closeModal = () => {
//         modal.classList.remove("show");
//         if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
//         window.removeEventListener("resize", updateButtonWidth); // 이벤트 제거
//     };
//
//     // 모달 외부 클릭 시 닫기
//     modal.addEventListener("click", (e) => {
//         if (e.target === modal) closeModal();
//     });
//
//     // 닫기 버튼 클릭 시
//     closeBtn.addEventListener("click", closeModal);
// }
//
//
// const projectModal = document.getElementById("modal");
// const modalMessage = document.getElementById("modalMessage");
// const projectCloseBtn = projectModal.querySelector(".close-button");
//
// // 모든 프로젝트 버튼 처리
// document.querySelectorAll(".right-area").forEach((project) => {
//     const viewBtn = project.querySelector(".button-area button:nth-child(1)");
//     const githubBtn = project.querySelector(".button-area button:nth-child(2)");
//
//     // "보기" 버튼 클릭
//     viewBtn.addEventListener("click", () => {
//         const siteUrl = project.dataset.siteUrl;
//         if (siteUrl && siteUrl !== "#" && siteUrl !== "local") {
//             window.open(siteUrl, "_blank");
//         } else {
//             modalMessage.innerHTML = "🚧 이 프로젝트는 현재 배포되지 않았습니다.<br>GitHub에서 코드를 확인하실 수 있습니다.";
//             projectModal.classList.add("show");
//             if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
//         }
//     });
//
//     // "GitHub" 버튼 클릭
//     githubBtn.addEventListener("click", () => {
//         const githubUrl = project.dataset.githubUrl;
//         if (githubUrl && githubUrl !== "#") {
//             window.open(githubUrl, "_blank");
//         } else {
//             modalMessage.innerHTML = "🚧 GitHub 링크가 준비되지 않았습니다.";
//             projectModal.classList.add("show");
//             if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
//         }
//     });
// });
//
// // 모달 닫기: 외부 클릭
// projectModal.addEventListener("click", (e) => {
//     if (e.target === projectModal) {
//         projectModal.classList.remove("show");
//         if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
//     }
// });
//
// // 닫기 버튼 클릭
// projectCloseBtn.addEventListener("click", () => {
//     projectModal.classList.remove("show");
//     if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
// });





// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// ★★★★★★★★★★★★★★★★★★★★★★★★프로젝트 섹션 수정 -완 v2★★★★★★★★★★★★★★★★★★★★★★★★
// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// pc <-> 모바일 반응형 수정!!!!!
// (매우 잘되고, 딱 단점 하나! 모바일 변경시 갤러리 등장애니메이션 때문에 공백 시간이 있다는것)
// import {projectsData} from './projectData.js';
//
// window.AppState = window.AppState || {
//     isScrolling: false,
//     currentRotation: 0,
//     activeProjectIndex: 0,
//     isGalleryAnimating: false,
//     hasInitialGalleryAnimationRun: false,
// };
//
// document.addEventListener("DOMContentLoaded", () => {
//     handleResize();
//     updateRightArea(0, false); // 최초 세팅
//     init();                    // 스크롤 감지 및 애니메이션 준비
// });
//
// const images = gsap.utils.toArray(".item");
// const imageSize = images.length;
// const total = images.length;
// const degree = 360 / total;
//
// let animationTriggered = false; // 애니메이션 실행 여부 플래그
//
// // helper: 섹션을 스무스 스크롤로 뷰포트 상단에 맞춘 뒤 콜백 실행
// const scrollAndAlignThenRun = (el, cb) => {
//     if (!el) return cb();
//
//     const targetTop = 0;
//     const tolerance = 3;
//     let finished = false;
//
//     const tryFinish = () => {
//         const rect = el.getBoundingClientRect();
//         if (Math.abs(rect.top - targetTop) <= tolerance) {
//             if (finished) return;
//             finished = true;
//             window.removeEventListener('scroll', onScroll);
//             clearInterval(poll);
//             setTimeout(() => cb(), 60);
//         }
//     };
//
//     const onScroll = () => tryFinish();
//
//     el.scrollIntoView({behavior: 'smooth', block: 'start'});
//     window.addEventListener('scroll', onScroll, {passive: true});
//
//     const poll = setInterval(tryFinish, 40);
//
//     setTimeout(() => {
//         if (finished) return;
//         finished = true;
//         window.removeEventListener('scroll', onScroll);
//         clearInterval(poll);
//         cb();
//     }, 900);
// };
//
//
// // 초기 설정 및 스크롤 이벤트 등록
// const init = () => {
//     gsap.set(images, {opacity: 0});
//
//     const projectsSection = document.getElementById('projects');
//     if (!projectsSection) return;
//
//     // IntersectionObserver 등록
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             const ratio = entry.intersectionRatio;
//             if (ratio >= 0.85 && !animationTriggered) {
//                 animationTriggered = true;
//                 scrollAndAlignThenRun(projectsSection, runAnimation);
//             } else if (ratio < 0.05 && animationTriggered) {
//                 resetAnimation();
//                 animationTriggered = false;
//             }
//         });
//     }, {threshold: Array.from({length: 101}, (_, i) => i / 100)});
//
//     observer.observe(projectsSection);
//
//     setTimeout(checkProjectSection, 100);   // 초기 강제 체크 (로드 직후 스크롤로 내려도 감지)
// };
//
// // 프로젝트 섹션 위치 강제 체크
// const checkProjectSection = () => {
//     const projectsSection = document.getElementById('projects');
//     if (!projectsSection) return;
//     const rect = projectsSection.getBoundingClientRect();
//
//     if (!animationTriggered && rect.top <= 0 && rect.bottom >= window.innerHeight) {
//         animationTriggered = true;
//         scrollAndAlignThenRun(projectsSection, runAnimation);
//     } else if (animationTriggered && rect.bottom < window.innerHeight * 0.01) {
//         resetAnimation();
//         animationTriggered = false;
//     }
// };
//
// const handleResize = () => {
//     const isMobile = window.innerWidth <= 650;
//     const rightArea = document.querySelector(".right-area");
//     const itemsContainer = document.querySelector(".items");
//
//     if (!rightArea || !itemsContainer) return;
//
//     if (isMobile) {
//         // 모바일: 갤러리 숨김, 오른쪽 영역 항상 표시
//         itemsContainer.style.display = "none";
//         rightArea.style.display = "block";
//
//         // 애니메이션 중지
//         if (galleryAnimationTimeline) galleryAnimationTimeline.kill();
//         galleryAnimationTimeline = null;
//         gsap.set(images, {opacity: 0});
//         updateRightArea(window.AppState.currentRotation); // 데이터 강제 렌더
//     } else {
//         // PC: 무조건 초기 애니메이션 호출 금지
//         itemsContainer.style.display = "flex";
//         rightArea.style.display = "block";
//         gsap.set(images, {opacity: 0});
//         gsap.set(rightArea, {opacity: 0, x: 50});
//     }
// };
// window.addEventListener("resize", handleResize);
//
// let galleryAnimationTimeline = null; // 갤러리 애니메이션 타임라인을 저장할 변수
//
// // 애니메이션 상태 초기화 함수
// const resetAnimation = () => {
//     if (galleryAnimationTimeline) {
//         galleryAnimationTimeline.kill(); // 특정 타임라인만 완전히 중지
//         galleryAnimationTimeline = null; // 참조 초기화
//     }
//
//     // 모든 애니메이션 타임라인 중지 및 초기화
//     gsap.killTweensOf(images);
//
//     // 오른쪽 영역 관련 모든 애니메이션 중지
//     const rightArea = document.querySelector(".right-area");
//     const infoItems = rightArea?.querySelectorAll(".info > *") || [];
//
//     gsap.killTweensOf(rightArea);
//     gsap.killTweensOf(infoItems);
//
//     // 이미지 상태 초기화
//     gsap.set(images, {
//         opacity: 0,
//         x: 0,
//         y: 0,
//         rotation: 0,
//         scale: 1,
//         transformOrigin: "center center"
//     });
//
//     // 오른쪽 영역 초기화
//     if (rightArea) {
//         gsap.set(rightArea, {opacity: 0, x: 50});
//         gsap.set(infoItems, {opacity: 0, y: 20});
//     }
//
//     // items 컨테이너 회전값 강제 리셋 (항상 첫 프로젝트가 중앙으로 오게)
//     gsap.set(".items", {rotation: 0});
//
//     const itemsContainer = document.querySelector(".items");
//     if (itemsContainer && window.innerWidth > 650) {
//         gsap.set(itemsContainer, {rotation: 0});
//         itemsContainer.style.display = "flex";
//     }
//
//     // ➤ track-label 초기화 추가
//     const trackLabels = document.querySelectorAll('.track-label');
//     trackLabels.forEach(label => label.classList.remove('animate'));
// };
//
// const itemsContainer = document.querySelector(".items");
//
// // 프로젝트 이미지 원형 배치 및 애니메이션 실행
// const runAnimation = () => {
//     // ✅ 툴바 이동 중이면 애니메이션 실행하지 않음
//     if (window.isScrollingToSection) return;
//
//     window.AppState.isGalleryAnimating = true;
//
//     // 새로운 애니메이션 시작 전에 혹시 이전 타임라인이 남아있다면 초기화
//     if (galleryAnimationTimeline) {
//         galleryAnimationTimeline.kill();
//         galleryAnimationTimeline = null;
//     }
//
//     itemsContainer.classList.remove("hover-enabled");   // 애니메이션 시작 전에는 hover 비활성화
//     updateRightArea(0, false); // 첫 프로젝트 기준, 실제 데이터 바로 세팅
//     gsap.set(".right-area", {opacity: 0, x: 50}); // 완전히 숨김 상태에서 시작
//
//     if (window.smoother) window.smoother.paused(true);  // ➤ 스크롤 잠금
//
//     galleryAnimationTimeline = gsap.timeline({
//         onComplete: () => {
//             // ✅ 항상 첫 번째 프로젝트(Pixterest)로 초기화
//             previousActiveIndex = 0;
//
//             // 현재 중앙 트랙 index로 previousActiveIndex 초기화
//             const centerRotation = 0; // 초기 중앙 기준 회전값
//             const snapUnit = degree * 2;
//             previousActiveIndex = Math.round((centerRotation % 360) / snapUnit);
//             window.AppState.hasInitialGalleryAnimationRun = true;
//
//             itemsContainer.classList.add("hover-enabled");  // hover 활성화
//
//
//             setTimeout(() => {
//                 if (window.smoother) window.smoother.paused(false);
//             }, 300); // 0.3초 안정화 시간후, 스크롤 다시 활성화
//
//             animateTrackLabels();
//
//             window.AppState.isGalleryAnimating = false;
//         }
//     });
//
//     images.forEach((image, index) => {
//         gsap.set(image, {opacity: 1});
//
//         // 초기 회전 각도 및 크기 설정
//         const sign = Math.floor((index / 2) % 2) ? 1 : -1;
//         const value = Math.floor((index + 4) / 4) * 4;
//         const rotation = index > imageSize - 3 ? 0 : sign * value;
//
//         gsap.set(image, {
//             x: 0,
//             y: 0,
//             rotation: rotation,
//             scale: 0.5,
//         });
//
//         // 이미지가 화면 밖에서 날아오는 애니메이션
//         galleryAnimationTimeline.from(
//             image,
//             {
//                 x: 0,
//                 y: index % 2
//                     ? -window.innerHeight - image.clientHeight * 4
//                     : window.innerHeight + image.clientHeight * 4,
//                 rotation: index % 2 ? 200 : -200,
//                 scale: 4,
//                 opacity: 1,
//                 ease: "power4.out",
//                 duration: 1,
//                 delay: 0.15 * Math.floor(index / 2),
//             },
//             0
//         );
//
//         let rotationAngle = -index * degree;
//
//         // 최종 크기를 1로 복원
//         galleryAnimationTimeline.to(
//             image,
//             {
//                 scale: 1,
//                 duration: 0,
//             },
//             0.15 * (imageSize / 2 - 1) + 1
//         );
//
//         // 원형 배치로 정렬하는 애니메이션
//         galleryAnimationTimeline.to(
//             image,
//             {
//                 x: 0,
//                 y: 0,
//                 transformOrigin: "-60vh center",
//                 rotation:
//                     index > imageSize / 2 ? degree * (imageSize - index) : rotationAngle,
//                 duration: 1,
//                 ease: "power1.out",
//             },
//             0.15 * (imageSize / 2 - 1) + 1
//         );
//     });
//
//     // ➤ 오른쪽 영역 등장 애니메이션
//     galleryAnimationTimeline.fromTo(
//         ".right-area",                  // 애니메이션 적용 대상
//         {opacity: 0, x: 50, pointerEvents: "none"},          // 시작 상태: 투명 + 오른쪽으로 50px 이동
//         {opacity: 1, x: 0, duration: 0.8, ease: "power2.out", pointerEvents: "auto"}, // 종료 상태: 불투명 + 원래 위치
//         "-=0.5"                         // 타이밍: 이전 애니메이션 끝나기 0.5초 전에 시작
//     );
//
//     // ➤ 오른쪽 내부 정보 stagger 등장
//     galleryAnimationTimeline.fromTo(
//         ".right-area .info > *",         // 오른쪽 영역 info 하위 요소들을 아래에서 위로 순차적으로 나타나게 함
//         {y: 20, opacity: 0},           // 시작 상태: 아래로 20px 이동 + 투명
//         {y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out"}, // 종료 상태: 원래 위치 + 보이게, 0.6초, 0.1초 간격, 자연스러운 감속
//         "-=0.3"                          // 이전 애니메이션 끝나기 0.3초 전에 시작
//     );
// };
//
// // 초기 실행
// init(); // 스크롤 감지 및 애니메이션 준비
//
// let previousActiveIndex = null; // 마지막으로 표시된 프로젝트 인덱스
//
// window.updateRightArea = function (currentRotation, isFromDrag = false) {
//     // 문자열이면 숫자로 변환
//     if (typeof currentRotation === "string") {
//         currentRotation = parseFloat(currentRotation);
//     }
//
//     const snapUnit = degree * 2; // 한 트랙 당 회전 각도
//     const totalTracks = total / 2;
//
//     // 트랙 인덱스 계산
//     let activeIndex = Math.round((currentRotation % 360) / snapUnit);
//     if (activeIndex < 0) activeIndex += totalTracks;
//
//     const isSameTrack = activeIndex === previousActiveIndex;
//
//     previousActiveIndex = activeIndex;
//     if (isFromDrag && isSameTrack) return;
//
//     const projectData = projectsData[activeIndex];
//     const rightArea = document.querySelector(".right-area");
//
//     if (!projectData || !rightArea) {
//         return;
//     }
//
//     // ✅ DOM 갱신
//     if (rightArea.querySelector(".title h1").textContent !== projectData.title) {
//         rightArea.querySelector(".title h1").textContent = projectData.title;
//     }
//     if (rightArea.querySelector(".date p").textContent !== projectData.date) {
//         rightArea.querySelector(".date p").textContent = projectData.date;
//     }
//
//     const updateInnerHTML = (containerSelector, dataArray) => {
//         const container = rightArea.querySelector(containerSelector);
//         if (!container) return;
//         const newHTML = dataArray.map(d => `<p>${d}</p>`).join("");
//         if (container.innerHTML !== newHTML) container.innerHTML = newHTML;
//     }
//
//     updateInnerHTML(".type div div", projectData.type);
//     updateInnerHTML(".language div div", projectData.language);
//     updateInnerHTML(".framework div div", projectData.framework);
//     updateInnerHTML(".etc div div", projectData.etc);
//
//     const featureList = rightArea.querySelector(".feature ol");
//     if (featureList) {
//         const newHTML = projectData.features.map(f => `<li>${f}</li>`).join("");
//         if (featureList.innerHTML !== newHTML) featureList.innerHTML = newHTML;
//     }
//
//     const slideContainer = rightArea.querySelector(".container");
//     if (slideContainer) {
//         const newSlidesHTML = projectData.slides
//             .map(slide => `<div class="slide" style="background-image:url('${slide}')"></div>`)
//             .join("");
//         if (slideContainer.innerHTML !== newSlidesHTML) {
//             slideContainer.innerHTML = newSlidesHTML;
//             slidesPlugin();
//         }
//     }
//
//     rightArea.dataset.siteUrl = projectData.siteUrl;
//     rightArea.dataset.githubUrl = projectData.githubUrl;
//
//     if (window.AppState.hasInitialGalleryAnimationRun && !window.AppState.isGalleryAnimating) {
//         animateTrackLabels();
//     }
//
//     if (isFromDrag) {
//         const infoItems = rightArea.querySelectorAll(".info > *");
//         const rightTimeline = gsap.timeline();
//
//         // ✅ 수정: 갤러리 애니메이션이 끝난 경우만 실행
//         if (!window.AppState.isGalleryAnimating) {
//             rightTimeline.fromTo(
//                 rightArea,
//                 {opacity: 0, x: 50, pointerEvents: "none"},
//                 {opacity: 1, x: 0, duration: 1.5, ease: "power3.out", pointerEvents: "auto"}
//             );
//             rightTimeline.fromTo(
//                 infoItems,
//                 {y: 20, opacity: 0},
//                 {y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out"},
//                 "-=1.2"
//             );
//         }
//     }
// }
//
// // 화면 중앙에 있는 right-area의 track-label만 애니메이션 실행
// function animateTrackLabels() {
//     const trackLabels = document.querySelectorAll('.track-label');
//     const centerX = window.innerWidth / 2;
//
//     let closestLabel = null;
//     let minDistance = Infinity;
//
//     trackLabels.forEach(label => {
//         const rect = label.getBoundingClientRect();
//         const labelCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(centerX - labelCenter);
//
//         if (distance < minDistance) {
//             minDistance = distance;
//             closestLabel = label;
//         }
//     });
//
//     // 모든 라벨에서 animate 제거
//     trackLabels.forEach(label => label.classList.remove('animate'));
//
//     // 화면 중앙에 있는 라벨만 animate 적용
//     if (closestLabel) {
//         closestLabel.classList.add('animate');
//     }
// }
//
//
// // GSAP 이미지 슬라이드
// function slidesPlugin() {
//     const projects = document.querySelectorAll(".right-area");
//
//     projects.forEach((project) => {
//         const slides = project.querySelectorAll(".slide");
//
//         // 초기 활성화 상태 (3번째 슬라이드)
//         if (slides.length > 2) {
//             slides.forEach(slide => slide.classList.remove("active"));
//             slides[2].classList.add("active");
//         }
//
//         slides.forEach((slide) => {
//             slide.replaceWith(slide.cloneNode(true)); // 이벤트 초기화
//         });
//
//         // 이벤트 재설정
//         project.querySelectorAll(".slide").forEach((slide) => {
//             slide.addEventListener("click", () => {
//                 if (slide.classList.contains("active")) {
//                     openModal(slide);
//                     return;
//                 }
//                 project.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
//                 slide.classList.add("active");
//             });
//         });
//     });
// }
//
//
// // ✅ 최초 실행
// slidesPlugin();
//
//
// // 모달 열기 함수
// function openModal(slide) {
//     const modal = document.querySelector(".image-modal");
//     const modalImg = modal.querySelector("img");
//     const closeBtn = modal.querySelector(".close-button");
//
//     // 슬라이드 배경 이미지를 모달에 적용
//     const bg = slide.style.backgroundImage;
//     modalImg.src = bg.slice(5, -2); // url("...") 형태니까 자르기
//
//     modal.classList.add("show");
//     if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
//
//     // 버튼 폭 맞추는 함수
//     const updateButtonWidth = () => {
//         closeBtn.style.width = modalImg.clientWidth + "px";
//     };
//
//     // 이미지 로드 후 초기 폭 설정
//     modalImg.onload = updateButtonWidth;
//
//     // 리사이즈 시 폭 자동 업데이트
//     window.addEventListener("resize", updateButtonWidth);
//
//     // 모달 닫기 함수
//     const closeModal = () => {
//         modal.classList.remove("show");
//         if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
//         window.removeEventListener("resize", updateButtonWidth); // 이벤트 제거
//     };
//
//     // 모달 외부 클릭 시 닫기
//     modal.addEventListener("click", (e) => {
//         if (e.target === modal) closeModal();
//     });
//
//     // 닫기 버튼 클릭 시
//     closeBtn.addEventListener("click", closeModal);
// }
//
//
// const projectModal = document.getElementById("modal");
// const modalMessage = document.getElementById("modalMessage");
// const projectCloseBtn = projectModal.querySelector(".close-button");
//
// // 모든 프로젝트 버튼 처리
// document.querySelectorAll(".right-area").forEach((project) => {
//     const viewBtn = project.querySelector(".button-area button:nth-child(1)");
//     const githubBtn = project.querySelector(".button-area button:nth-child(2)");
//
//     // "보기" 버튼 클릭
//     viewBtn.addEventListener("click", () => {
//         const siteUrl = project.dataset.siteUrl;
//         if (siteUrl && siteUrl !== "#" && siteUrl !== "local") {
//             window.open(siteUrl, "_blank");
//         } else {
//             modalMessage.innerHTML = "🚧 이 프로젝트는 현재 배포되지 않았습니다.<br>GitHub에서 코드를 확인하실 수 있습니다.";
//             projectModal.classList.add("show");
//             if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
//         }
//     });
//
//     // "GitHub" 버튼 클릭
//     githubBtn.addEventListener("click", () => {
//         const githubUrl = project.dataset.githubUrl;
//         if (githubUrl && githubUrl !== "#") {
//             window.open(githubUrl, "_blank");
//         } else {
//             modalMessage.innerHTML = "🚧 GitHub 링크가 준비되지 않았습니다.";
//             projectModal.classList.add("show");
//             if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
//         }
//     });
// });
//
// // 모달 닫기: 외부 클릭
// projectModal.addEventListener("click", (e) => {
//     if (e.target === projectModal) {
//         projectModal.classList.remove("show");
//         if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
//     }
// });
//
// // 닫기 버튼 클릭
// projectCloseBtn.addEventListener("click", () => {
//     projectModal.classList.remove("show");
//     if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
// });














import {projectsData} from './projectData.js';

window.AppState = window.AppState || {
    isScrolling: false,
    currentRotation: 0,
    activeProjectIndex: 0,
    isGalleryAnimating: false,
    hasInitialGalleryAnimationRun: false,
};

document.addEventListener("DOMContentLoaded", () => {
    handleResize();
    updateRightArea(0, false); // 최초 세팅
    init();                    // 스크롤 감지 및 애니메이션 준비
});

const images = gsap.utils.toArray(".item");
const imageSize = images.length;
const total = images.length;
const degree = 360 / total;

let animationTriggered = false; // 애니메이션 실행 여부 플래그

// helper: 섹션을 스무스 스크롤로 뷰포트 상단에 맞춘 뒤 콜백 실행
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

const handleResize = () => {
    const isMobile = window.innerWidth <= 650;
    const rightArea = document.querySelector(".right-area");
    const itemsContainer = document.querySelector(".items");

    if (!rightArea || !itemsContainer) return;

    if (isMobile) {
        // 🔥 갤러리 DOM 자체 삭제
        if (itemsContainer.parentNode) {
            itemsContainer.parentNode.removeChild(itemsContainer);
        }
        rightArea.style.display = "block";

        // 애니메이션 중지
        if (galleryAnimationTimeline) galleryAnimationTimeline.kill();
        galleryAnimationTimeline = null;
        gsap.set(images, {opacity: 0});
        updateRightArea(window.AppState.currentRotation); // 데이터 강제 렌더
    } else {
        // PC: 무조건 초기 애니메이션 호출 금지
        itemsContainer.style.display = "flex";
        rightArea.style.display = "block";
        gsap.set(images, {opacity: 0});
        gsap.set(rightArea, {opacity: 0, x: 50});
    }
};
window.addEventListener("resize", handleResize);

let galleryAnimationTimeline = null; // 갤러리 애니메이션 타임라인을 저장할 변수

// 애니메이션 상태 초기화 함수
const resetAnimation = () => {
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
        gsap.set(rightArea, {opacity: 0, x: 50});
        gsap.set(infoItems, {opacity: 0, y: 20});
    }

    // items 컨테이너 회전값 강제 리셋 (항상 첫 프로젝트가 중앙으로 오게)
    gsap.set(".items", {rotation: 0});

    const itemsContainer = document.querySelector(".items");
    if (itemsContainer && window.innerWidth > 650) {
        gsap.set(itemsContainer, {rotation: 0});
        itemsContainer.style.display = "flex";
    }

    // ➤ track-label 초기화 추가
    const trackLabels = document.querySelectorAll('.track-label');
    trackLabels.forEach(label => label.classList.remove('animate'));
};

const itemsContainer = document.querySelector(".items");

// 프로젝트 이미지 원형 배치 및 애니메이션 실행
const runAnimation = () => {
    // ✅ 툴바 이동 중이면 애니메이션 실행하지 않음
    if (window.isScrollingToSection) return;

    window.AppState.isGalleryAnimating = true;

    // 새로운 애니메이션 시작 전에 혹시 이전 타임라인이 남아있다면 초기화
    if (galleryAnimationTimeline) {
        galleryAnimationTimeline.kill();
        galleryAnimationTimeline = null;
    }

    itemsContainer.classList.remove("hover-enabled");   // 애니메이션 시작 전에는 hover 비활성화
    updateRightArea(0, false); // 첫 프로젝트 기준, 실제 데이터 바로 세팅
    gsap.set(".right-area", {opacity: 0, x: 50}); // 완전히 숨김 상태에서 시작

    if (window.smoother) window.smoother.paused(true);  // ➤ 스크롤 잠금

    galleryAnimationTimeline = gsap.timeline({
        onComplete: () => {
            // ✅ 항상 첫 번째 프로젝트(Pixterest)로 초기화
            previousActiveIndex = 0;

            // 현재 중앙 트랙 index로 previousActiveIndex 초기화
            const centerRotation = 0; // 초기 중앙 기준 회전값
            const snapUnit = degree * 2;
            previousActiveIndex = Math.round((centerRotation % 360) / snapUnit);
            window.AppState.hasInitialGalleryAnimationRun = true;

            itemsContainer.classList.add("hover-enabled");  // hover 활성화


            setTimeout(() => {
                if (window.smoother) window.smoother.paused(false);
            }, 300); // 0.3초 안정화 시간후, 스크롤 다시 활성화

            animateTrackLabels();

            window.AppState.isGalleryAnimating = false;
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
        ".right-area",                  // 애니메이션 적용 대상
        {opacity: 0, x: 50, pointerEvents: "none"},          // 시작 상태: 투명 + 오른쪽으로 50px 이동
        {opacity: 1, x: 0, duration: 0.8, ease: "power2.out", pointerEvents: "auto"}, // 종료 상태: 불투명 + 원래 위치
        "-=0.5"                         // 타이밍: 이전 애니메이션 끝나기 0.5초 전에 시작
    );

    // ➤ 오른쪽 내부 정보 stagger 등장
    galleryAnimationTimeline.fromTo(
        ".right-area .info > *",         // 오른쪽 영역 info 하위 요소들을 아래에서 위로 순차적으로 나타나게 함
        {y: 20, opacity: 0},           // 시작 상태: 아래로 20px 이동 + 투명
        {y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out"}, // 종료 상태: 원래 위치 + 보이게, 0.6초, 0.1초 간격, 자연스러운 감속
        "-=0.3"                          // 이전 애니메이션 끝나기 0.3초 전에 시작
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

    // ✅ DOM 갱신
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

        // ✅ 수정: 갤러리 애니메이션이 끝난 경우만 실행
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

    // 모든 라벨에서 animate 제거
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
            slide.replaceWith(slide.cloneNode(true)); // 이벤트 초기화
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


// ✅ 최초 실행
slidesPlugin();


// 모달 열기 함수
function openModal(slide) {
    const modal = document.querySelector(".image-modal");
    const modalImg = modal.querySelector("img");
    const closeBtn = modal.querySelector(".close-button");

    // 슬라이드 배경 이미지를 모달에 적용
    const bg = slide.style.backgroundImage;
    modalImg.src = bg.slice(5, -2); // url("...") 형태니까 자르기

    modal.classList.add("show");
    if (window.smoother) window.smoother.paused(true); // 스크롤 잠금

    // 버튼 폭 맞추는 함수
    const updateButtonWidth = () => {
        closeBtn.style.width = modalImg.clientWidth + "px";
    };

    // 이미지 로드 후 초기 폭 설정
    modalImg.onload = updateButtonWidth;

    // 리사이즈 시 폭 자동 업데이트
    window.addEventListener("resize", updateButtonWidth);

    // 모달 닫기 함수
    const closeModal = () => {
        modal.classList.remove("show");
        if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
        window.removeEventListener("resize", updateButtonWidth); // 이벤트 제거
    };

    // 모달 외부 클릭 시 닫기
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // 닫기 버튼 클릭 시
    closeBtn.addEventListener("click", closeModal);
}


const projectModal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const projectCloseBtn = projectModal.querySelector(".close-button");

// 모든 프로젝트 버튼 처리
document.querySelectorAll(".right-area").forEach((project) => {
    const viewBtn = project.querySelector(".button-area button:nth-child(1)");
    const githubBtn = project.querySelector(".button-area button:nth-child(2)");

    // "보기" 버튼 클릭
    viewBtn.addEventListener("click", () => {
        const siteUrl = project.dataset.siteUrl;
        if (siteUrl && siteUrl !== "#" && siteUrl !== "local") {
            window.open(siteUrl, "_blank");
        } else {
            modalMessage.innerHTML = "🚧 이 프로젝트는 현재 배포되지 않았습니다.<br>GitHub에서 코드를 확인하실 수 있습니다.";
            projectModal.classList.add("show");
            if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
        }
    });

    // "GitHub" 버튼 클릭
    githubBtn.addEventListener("click", () => {
        const githubUrl = project.dataset.githubUrl;
        if (githubUrl && githubUrl !== "#") {
            window.open(githubUrl, "_blank");
        } else {
            modalMessage.innerHTML = "🚧 GitHub 링크가 준비되지 않았습니다.";
            projectModal.classList.add("show");
            if (window.smoother) window.smoother.paused(true); // 스크롤 잠금
        }
    });
});

// 모달 닫기: 외부 클릭
projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove("show");
        if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
    }
});

// 닫기 버튼 클릭
projectCloseBtn.addEventListener("click", () => {
    projectModal.classList.remove("show");
    if (window.smoother) window.smoother.paused(false); // ✅ 스크롤 재개
});