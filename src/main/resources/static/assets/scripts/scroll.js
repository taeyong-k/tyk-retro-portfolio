// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     // 2️⃣ ScrollTrigger 연동
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });


// 일단, 스크롤 가능 하게 된 코드
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전
//     const projectsSection = document.getElementById('projects');
//     const itemsContainer = document.querySelector(".items");
//
//     if (projectsSection && itemsContainer) {
//         gsap.to(itemsContainer, {
//             rotation: -360, // 전체 트랙 1~5 회전
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 scroller: scrollContainer,
//                 start: "top top",   // 화면에 딱 들어올 때 시작
//                 end: "bottom top",  // 섹션 끝까지 pin 유지
//                 pin: true,          // 화면 딱 고정
//                 scrub: true,
//                 onUpdate: self => {
//                     const progress = self.progress; // 0 ~ 1
//                     const rotation = 360 * progress; // + 방향으로 회전
//                     gsap.set(itemsContainer, {rotation: rotation});
//                     updateRightArea(rotation);
//                 }
//             }
//         });
//     }
//
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });

// 프로젝트 전 / 스크롤+툴바 완벽 코드
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전 (스냅 적용)
//     const projectsSection = document.getElementById('projects');
//     const itemsContainer = document.querySelector(".items");
//
//     if (projectsSection && itemsContainer) {
//         gsap.to(itemsContainer, {
//             rotation: -360,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 scroller: scrollContainer,
//                 start: "top top",
//                 end: "bottom top",
//                 pin: true,
//                 scrub: true,
//                 onUpdate: self => {
//                     const progress = self.progress;
//                     const rotation = 360 * progress;
//                     gsap.set(itemsContainer, { rotation });
//
//                     // ❗ 실제 보정 및 데이터 갱신은 프로젝트 JS에서 처리
//                     if (window.updateRightArea) {
//                         window.updateRightArea(rotation);
//                     }
//                 }
//             }
//         });
//     }
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });


// 1. (완) 스크롤js에서도 공유해서 사용할 수 있게 프로젝트 전역화 (전역화 하고 기존 기능과 동일한지 먼저)
// 2. (완) 전역화 완료 후, 스크롤 멈췄을때, 영역에 기반 하여 중앙 정렬되게끔 (아래코드 참고)
// 3. 드래그 + 스크롤 업데이트 하기 (잘 적용이 안되는듯함..!)
// 4. (완) 스크롤 중, 화면 한번씩 튀는 현상 고치기.... (프로젝트 구간이 제일 심한듯?)
// 5. 프로젝트 : 애니메이션 작동중 - 스크롤 막기 (방법이 있나 모르겟음...)
// 6. 인트로 : 애니메이션 작동중 - 스크롤 막기 (방법이 있나 모르겟음...)
// 7. 배경색 맞추던지 따로 두던지 등 생각해보기!
// 8. 스킬.............렉 오지는거 어떻게 할지.........ㅅㅂ....
// 9. 그 외 디테일은 이력서 내면서 조금씩 수정하기

// // 중앙정렬 완료 코드
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전 + 중앙 정렬 스냅
//     const projectsSection = document.getElementById('projects');
//     const itemsContainer = document.querySelector(".items");
//     let scrollTimeout;
//     let snapTween = null; // 이전 snap 애니메이션 저장
//
//     if (projectsSection && itemsContainer) {
//         gsap.to(itemsContainer, {
//             rotation: -360,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 scroller: scrollContainer,
//                 start: "top top",
//                 end: "bottom top",
//                 pin: true,
//                 scrub: true,
//                 onUpdate: self => {
//                     // 스크롤 진행 상태
//                     const progress = self.progress;
//                     const rotation = 360 * progress;
//                     gsap.set(itemsContainer, {rotation});
//
//                     // 🔄 전역 상태 갱신
//                     window.AppState.isScrolling = true;
//                     window.AppState.currentRotation = rotation;
//
//                     // 오른쪽 정보 업데이트
//                     if (window.updateRightArea) {
//                         window.updateRightArea(rotation);
//                     }
//
//                     // 🕒 스크롤 멈춤 감지
//                     if (scrollTimeout) clearTimeout(scrollTimeout);
//                     scrollTimeout = setTimeout(() => {
//                         window.AppState.isScrolling = false; // 스크롤 멈춤 상태
//
//                         // 이전 스냅 애니메이션 있으면 중단
//                         if (snapTween) snapTween.kill();
//
//                         // 트랙 단위 계산 (트랙 = 2개 아이템 묶음)
//                         const totalItems = document.querySelectorAll(".item").length;
//                         const degreePerItem = 360 / totalItems;
//                         const degreePerTrack = degreePerItem * 2; // 트랙 한 칸 회전각
//
//                         // 현재 rotation (0..360 범위 권장)
//                         let normalizedRotation = rotation % 360;
//                         if (normalizedRotation < 0) normalizedRotation += 360;
//
//                         // rawTrack: 0..(trackCount-1) 범위의 실수 인덱스
//                         const trackCount = Math.floor(totalItems / 2);
//                         const rawTrack = normalizedRotation / degreePerTrack;
//
//                         // 반올림으로 가장 가까운 '트랙' 선택
//                         let activeTrackIndex = Math.round(rawTrack);
//
//                         // 경계값 보정
//                         if (activeTrackIndex < 0) activeTrackIndex = 0;
//                         if (activeTrackIndex >= trackCount) activeTrackIndex = trackCount - 1;
//
//                         // 타겟 회전: 트랙 인덱스 * 트랙당 회전각
//                         const targetRotation = activeTrackIndex * degreePerTrack;
//
//                         // 스냅 실행 (기존 동작과 동일한 easing/duration 사용)
//                         snapTween = gsap.to(itemsContainer, {
//                             rotation: targetRotation,
//                             duration: 0.4,
//                             ease: "power2.out",
//                             onUpdate: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation);
//                             },
//                             onComplete: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 window.AppState.activeProjectIndex = activeTrackIndex;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation, true);
//                                 if (window.scrollInstance && window.scrollInstance.update) {
//                                     window.scrollInstance.update(); // ✅ LocomotiveScroll 상태 동기화
//                                 }
//                                 snapTween = null;
//                             }
//                         });
//                     }, 120); // 멈춤 후 0.12초 후 스냅 발동
//                 }
//             }
//         });
//     }
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });

// // 스크롤시, 마지막 트랙1 반복되는거 수정중 (수정은 됏으나,,, 살짝의 문제가 있고, 또, 스크롤 폭이 좁아져 불편함)
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전 + 중앙 정렬 스냅
//     // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전 + 중앙 정렬 스냅 (수정판)
//     const projectsSection = document.getElementById('projects');
//     const itemsContainer = document.querySelector(".items");
//     let scrollTimeout;
//     let snapTween = null;
//
//     if (projectsSection && itemsContainer) {
//         const totalItems = document.querySelectorAll(".item").length;
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2;
//         const trackCount = Math.floor(totalItems / 2); // 트랙 단위
//
//         // 실제 ScrollTrigger end 계산: 마지막 트랙 기준
//         const scrollRange = window.innerHeight * trackCount; // 화면 1개 높이 * 트랙 개수 (필요시 조정)
//
//         gsap.to(itemsContainer, {
//             rotation: 0, // 초기 rotation 0
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 scroller: scrollContainer,
//                 start: "top top",
//                 end: `+=${scrollRange}`, // 마지막 트랙 기준으로 scroll 범위 설정
//                 pin: true,
//                 scrub: true,
//                 onUpdate: self => {
//                     // 트랙 단위 rotation 계산
//                     let progress = self.progress; // 0~1
//                     let rawTrackRotation = progress * degreePerTrack * (trackCount - 1); // 마지막 트랙에서 멈춤
//                     gsap.set(itemsContainer, { rotation: rawTrackRotation });
//
//                     // 전역 상태 갱신
//                     window.AppState.isScrolling = true;
//                     window.AppState.currentRotation = rawTrackRotation;
//
//                     if (window.updateRightArea) {
//                         window.updateRightArea(rawTrackRotation);
//                     }
//
//                     // 스크롤 멈춤 감지
//                     if (scrollTimeout) clearTimeout(scrollTimeout);
//                     scrollTimeout = setTimeout(() => {
//                         window.AppState.isScrolling = false;
//
//                         if (snapTween) snapTween.kill();
//
//                         // 현재 트랙 index 계산
//                         const normalizedRotation = rawTrackRotation % 360;
//                         let activeTrackIndex = Math.round(normalizedRotation / degreePerTrack);
//                         if (activeTrackIndex < 0) activeTrackIndex = 0;
//                         if (activeTrackIndex >= trackCount) activeTrackIndex = trackCount - 1;
//
//                         const targetRotation = activeTrackIndex * degreePerTrack;
//
//                         snapTween = gsap.to(itemsContainer, {
//                             rotation: targetRotation,
//                             duration: 0.4,
//                             ease: "power2.out",
//                             onUpdate: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation);
//                             },
//                             onComplete: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 window.AppState.activeProjectIndex = activeTrackIndex;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation, true);
//                                 if (window.scrollInstance && window.scrollInstance.update) {
//                                     window.scrollInstance.update();
//                                 }
//                                 snapTween = null;
//                             }
//                         });
//                     }, 120);
//                 }
//             }
//         });
//     }
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });


// 중앙정렬 + 트랙1~5까지만 스크롤 수정완 (문제: 프로젝트 섹션 벗어나면 화면이 튐)
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전 + 중앙 정렬 스냅
//     const projectsSection = document.getElementById('projects');
//     const itemsContainer = document.querySelector(".items");
//     let scrollTimeout;
//     let snapTween = null;
//
//     if (projectsSection && itemsContainer) {
//         const items = document.querySelectorAll(".item");
//         const totalItems = items.length;
//         const tracks = Math.floor(totalItems / 2);
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2; // 트랙 단위 회전 각
//
//         // ScrollTrigger end px 계산: 트랙 5개만 회전
//         const sectionHeight = projectsSection.offsetHeight;
//         const trackScrollPx = sectionHeight * (tracks / tracks); // section 전체 범위
//         gsap.to(itemsContainer, {
//             rotation: 0, // 시작 회전 0
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 scroller: scrollContainer,
//                 start: "top top",
//                 end: () => `+=${sectionHeight}`, // section 높이 만큼만
//                 pin: true,
//                 scrub: true,
//                 onUpdate: self => {
//                     const progress = self.progress; // 0~1
//                     const rotation = degreePerTrack * (tracks - 1) * progress; // 최대 트랙만큼 회전
//                     gsap.set(itemsContainer, {rotation});
//
//                     window.AppState.isScrolling = true;
//                     window.AppState.currentRotation = rotation;
//
//                     if (window.updateRightArea) {
//                         window.updateRightArea(rotation);
//                     }
//
//                     // 🕒 스크롤 멈춤 감지
//                     if (scrollTimeout) clearTimeout(scrollTimeout);
//                     scrollTimeout = setTimeout(() => {
//                         window.AppState.isScrolling = false;
//
//                         if (snapTween) snapTween.kill();
//
//                         // 가장 가까운 트랙 선택
//                         const activeTrackIndex = Math.round(rotation / degreePerTrack);
//                         const targetRotation = activeTrackIndex * degreePerTrack;
//
//                         snapTween = gsap.to(itemsContainer, {
//                             rotation: targetRotation,
//                             duration: 0.4,
//                             ease: "power2.out",
//                             onUpdate: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation);
//                             },
//                             onComplete: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 window.AppState.activeProjectIndex = activeTrackIndex;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation, true);
//                                 if (window.scrollInstance && window.scrollInstance.update) {
//                                     window.scrollInstance.update();
//                                 }
//                                 snapTween = null;
//                             }
//                         });
//                     }, 120);
//                 }
//             }
//         });
//     }
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });

// 스크롤(위,아래), 중앙 정렬(후, 스크롤할때 조금 어긋나긴하는데... 일단..), 트랙1~5, 갤러리-정보영역 일치
// 문제: 스크롤하다가? 한번씩 화면이 튐 현상 or 안보이는 현상
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 2️⃣ 프로젝트 섹션: pin + 회전 + 스냅
//     const projectsSection = document.getElementById('projects');
//     const itemsContainer = document.querySelector(".items");
//     let scrollTimeout;
//     let snapTween = null;
//
//     if (projectsSection && itemsContainer) {
//         const items = document.querySelectorAll(".item");
//         const totalItems = items.length;
//         const tracks = Math.floor(totalItems / 2);
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2; // 트랙 단위 회전
//
//         gsap.to(itemsContainer, {
//             rotation: 0,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 scroller: scrollContainer,
//                 start: "top top",
//                 end: () => `+=${projectsSection.offsetHeight}`, // section 높이만큼
//                 pin: true,
//                 scrub: true,
//                 onUpdate: self => {
//                     const progress = self.progress; // 0~1
//                     const rotation = degreePerTrack * (tracks - 1) * progress;
//                     gsap.set(itemsContainer, { rotation });
//
//                     window.AppState.isScrolling = true;
//                     window.AppState.currentRotation = rotation;
//
//                     if (window.updateRightArea) window.updateRightArea(rotation);
//
//                     // 🕒 스크롤 멈춤 감지
//                     if (scrollTimeout) clearTimeout(scrollTimeout);
//                     scrollTimeout = setTimeout(() => {
//                         window.AppState.isScrolling = false;
//
//                         if (snapTween) snapTween.kill();
//
//                         // 가장 가까운 트랙 선택 (rotation clamp)
//                         const activeTrackIndex = Math.round(rotation / degreePerTrack);
//                         const clampedIndex = Math.max(0, Math.min(activeTrackIndex, tracks - 1));
//                         const targetRotation = clampedIndex * degreePerTrack;
//
//                         snapTween = gsap.to(itemsContainer, {
//                             rotation: targetRotation,
//                             duration: 0.4,
//                             ease: "power2.out",
//                             onUpdate: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation);
//                             },
//                             onComplete: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 window.AppState.activeProjectIndex = clampedIndex;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation, true);
//                                 snapTween = null;
//                             }
//                         });
//                     }, 120);
//                 }
//             }
//         });
//     }
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             { opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)" },
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });

// 스크롤(위,아래), 중앙 정렬(후, 스크롤할때 조금 어긋나긴하는데... 일단..), 트랙1~5, 갤러리-정보 일치, 스크롤시 화면 튐 문제 해결
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // 2️⃣ 프로젝트 섹션: pin + 회전 + 스냅
//     const projectsSection = document.getElementById('projects');
//     const itemsContainer = document.querySelector(".items");
//     let scrollTimeout;
//     let snapTween = null;
//
//     if (projectsSection && itemsContainer) {
//         const items = document.querySelectorAll(".item");
//         const totalItems = items.length;
//         const tracks = Math.floor(totalItems / 2);
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2; // 트랙 단위 회전
//
//         gsap.to(itemsContainer, {
//             rotation: 0,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 scroller: scrollContainer,
//                 start: "top top",
//                 end: () => `+=${projectsSection.offsetHeight}`,
//                 pin: true,
//                 scrub: true,
//                 onUpdate: self => {
//                     const progress = self.progress; // 0~1
//                     const rotation = degreePerTrack * (tracks - 1) * progress;
//                     gsap.set(itemsContainer, { rotation });
//
//                     window.AppState.isScrolling = true;
//                     window.AppState.currentRotation = rotation;
//
//                     if (window.updateRightArea) window.updateRightArea(rotation);
//
//                     // 🕒 스크롤 멈춤 감지
//                     if (scrollTimeout) clearTimeout(scrollTimeout);
//                     scrollTimeout = setTimeout(() => {
//                         window.AppState.isScrolling = false;
//
//                         if (snapTween) snapTween.kill();
//
//                         // 가장 가까운 트랙 선택 (rotation clamp)
//                         const activeTrackIndex = Math.round(rotation / degreePerTrack);
//                         const clampedIndex = Math.max(0, Math.min(activeTrackIndex, tracks - 1));
//                         const targetRotation = clampedIndex * degreePerTrack;
//
//                         snapTween = gsap.to(itemsContainer, {
//                             rotation: targetRotation,
//                             duration: 0.4,
//                             ease: "power2.out",
//                             onUpdate: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation);
//                             },
//                             onComplete: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 window.AppState.activeProjectIndex = clampedIndex;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation, true);
//
//                                 // 🔹 프로젝트 섹션 내부 스냅 완료 후 스크롤 위치 동기화
//                                 if (window.scrollInstance && window.scrollInstance.update) {
//                                     window.scrollInstance.update();
//                                 }
//
//                                 snapTween = null;
//                             }
//                         });
//                     }, 120);
//                 },
//                 // 🔹 프로젝트 섹션 벗어날 때 화면 튐 방지
//                 onLeave: self => {
//                     if (window.scrollInstance) {
//                         const currentY = window.scrollInstance.scroll.instance.scroll.y;
//                         window.scrollInstance.scrollTo(currentY, { duration: 0 });
//                     }
//                 },
//                 onLeaveBack: self => {
//                     if (window.scrollInstance) {
//                         const currentY = window.scrollInstance.scroll.instance.scroll.y;
//                         window.scrollInstance.scrollTo(currentY, { duration: 0 });
//                     }
//                 }
//             }
//         });
//     }
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             { opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)" },
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });

// // 스크롤 아예 잠금 테스트 중... 일단 이건 안됌..!
// gsap.registerPlugin(ScrollTrigger);
//
// window.addEventListener('DOMContentLoaded', () => {
//     const scrollContainer = document.querySelector('[data-scroll-container]');
//
//     // 1️⃣ LocomotiveScroll 초기화
//     window.scrollInstance = new LocomotiveScroll({
//         el: scrollContainer,
//         smooth: true,
//         lerp: 0.07,
//         multiplier: 0.7,
//         getDirection: true,
//         getSpeed: true,
//         firefoxMultiplier: 50
//     });
//
//     window.scrollInstance.on('scroll', ScrollTrigger.update);
//
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//         scrollTop(value) {
//             return arguments.length
//                 ? window.scrollInstance.scrollTo(value, 0, 0)
//                 : window.scrollInstance.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: scrollContainer.style.transform ? "transform" : "fixed"
//     });
//
//     ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
//     ScrollTrigger.refresh();
//
//     // ① 스크롤 잠금/해제 함수
//     function lockScroll() {
//         window.addEventListener('wheel', preventDefault, { passive: false });
//         window.addEventListener('touchmove', preventDefault, { passive: false });
//     }
//     function unlockScroll() {
//         window.removeEventListener('wheel', preventDefault);
//         window.removeEventListener('touchmove', preventDefault);
//     }
//     function preventDefault(e) {
//         e.preventDefault();
//         e.stopPropagation();
//     }
//
//     // 2️⃣ 프로젝트 섹션: pin + 회전 + 스냅
//     const projectsSection = document.getElementById('projects');
//     const itemsContainer = document.querySelector(".items");
//     let scrollTimeout;
//     let snapTween = null;
//
//     if (projectsSection && itemsContainer) {
//         const items = document.querySelectorAll(".item");
//         const totalItems = items.length;
//         const tracks = Math.floor(totalItems / 2);
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2; // 트랙 단위 회전
//
//         gsap.to(itemsContainer, {
//             rotation: 0,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 scroller: scrollContainer,
//                 start: "top top",
//                 end: () => `+=${projectsSection.offsetHeight}`,
//                 pin: true,
//                 scrub: true,
//                 onEnter: () => lockScroll(),
//                 onEnterBack: () => lockScroll(),
//                 onLeave: () => unlockScroll(),
//                 onLeaveBack: () => unlockScroll(),
//                 onUpdate: self => {
//                     const progress = self.progress;
//                     const rotation = degreePerTrack * (tracks - 1) * progress;
//                     gsap.set(itemsContainer, { rotation });
//
//                     window.AppState.isScrolling = true;
//                     window.AppState.currentRotation = rotation;
//
//                     if (window.updateRightArea) window.updateRightArea(rotation);
//
//                     // 🕒 스크롤 멈춤 감지
//                     if (scrollTimeout) clearTimeout(scrollTimeout);
//                     scrollTimeout = setTimeout(() => {
//                         window.AppState.isScrolling = false;
//
//                         if (snapTween) snapTween.kill();
//
//                         const activeTrackIndex = Math.round(rotation / degreePerTrack);
//                         const clampedIndex = Math.max(0, Math.min(activeTrackIndex, tracks - 1));
//                         const targetRotation = clampedIndex * degreePerTrack;
//
//                         snapTween = gsap.to(itemsContainer, {
//                             rotation: targetRotation,
//                             duration: 0.4,
//                             ease: "power2.out",
//                             onUpdate: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation);
//                             },
//                             onComplete: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 window.AppState.activeProjectIndex = clampedIndex;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation, true);
//
//                                 if (window.scrollInstance && window.scrollInstance.update) {
//                                     window.scrollInstance.update();
//                                 }
//
//                                 snapTween = null;
//                             }
//                         });
//                     }, 120);
//                 },
//                 onLeave: self => {
//                     if (window.scrollInstance) {
//                         const currentY = window.scrollInstance.scroll.instance.scroll.y;
//                         window.scrollInstance.scrollTo(currentY, { duration: 0 });
//                     }
//                 },
//                 onLeaveBack: self => {
//                     if (window.scrollInstance) {
//                         const currentY = window.scrollInstance.scroll.instance.scroll.y;
//                         window.scrollInstance.scrollTo(currentY, { duration: 0 });
//                     }
//                 }
//             }
//         });
//     }
//
//     // 3️⃣ fade-up 요소 애니메이션
//     gsap.utils.toArray(".fade-up").forEach(el => {
//         gsap.fromTo(el,
//             { opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)" },
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     scroller: scrollContainer,
//                     start: "top 100%",
//                     end: "top 55%",
//                     scrub: 1.5
//                 }
//             }
//         );
//     });
// });


// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// 스크롤 방식 자체를 변경 gsap로만 스무스 효과 적용
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//
// window.addEventListener("DOMContentLoaded", () => {
//     // 1️⃣ ScrollSmoother 초기화
//     window.smoother = ScrollSmoother.create({
//         wrapper: "#root",
//         content: "#main",
//         smooth: 1.2,        // 부드러움 정도 (0.8~1.5 사이 조정 가능)
//         effects: true,
//     });
//
//     // 2️⃣ 인트로 애니메이션 동안 스크롤 잠금
//     const tvEnd = 2;
//     const root = document.querySelector("#root");
//
//     smoother.paused(true);               // 스크롤Smoother 정지
//     root.style.overflow = "hidden";      // 스크롤바 숨김
//     document.body.style.overflow = "hidden";
//
//     setTimeout(() => {
//         smoother.paused(false);          // 스크롤 재개
//         root.style.overflow = "";        // 스크롤바 복원
//         document.body.style.overflow = "";
//     }, tvEnd * 1000);
//
//     // 3️⃣ 프로젝트 섹션: pin + 회전 + 스냅
//     const projectsSection = document.getElementById("projects");
//     const itemsContainer = document.querySelector(".items");
//     let scrollTimeout;
//     let snapTween = null;
//
//     if (projectsSection && itemsContainer) {
//         const items = document.querySelectorAll(".item");
//         const totalItems = items.length;
//         const tracks = Math.floor(totalItems / 2);
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2;
//
//         gsap.to(itemsContainer, {
//             rotation: 0,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 start: "top top",
//                 end: () => `+=${projectsSection.offsetHeight}`,
//                 pin: true,
//                 scrub: true,
//                 onUpdate: (self) => {
//                     const progress = self.progress;
//                     const rotation = degreePerTrack * (tracks - 1) * progress;
//                     gsap.set(itemsContainer, { rotation });
//
//                     window.AppState.isScrolling = true;
//                     window.AppState.currentRotation = rotation;
//                     if (window.updateRightArea) window.updateRightArea(rotation);
//
//                     // 🕒 스크롤 멈춤 감지
//                     if (scrollTimeout) clearTimeout(scrollTimeout);
//                     scrollTimeout = setTimeout(() => {
//                         window.AppState.isScrolling = false;
//
//                         if (snapTween) snapTween.kill();
//
//                         // 가장 가까운 트랙 스냅
//                         const activeTrackIndex = Math.round(rotation / degreePerTrack);
//                         const clampedIndex = Math.max(0, Math.min(activeTrackIndex, tracks - 1));
//                         const targetRotation = clampedIndex * degreePerTrack;
//
//                         snapTween = gsap.to(itemsContainer, {
//                             rotation: targetRotation,
//                             duration: 0.4,
//                             ease: "power2.out",
//                             onUpdate: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 if (window.updateRightArea) window.updateRightArea(targetRotation);
//                             },
//                             onComplete: () => {
//                                 window.AppState.currentRotation = targetRotation;
//                                 window.AppState.activeProjectIndex = clampedIndex;
//                                 if (window.updateRightArea)
//                                     window.updateRightArea(targetRotation, true);
//                                 snapTween = null;
//                             },
//                         });
//                     }, 120);
//                 },
//             },
//         });
//     }
//
//     // 4️⃣ fade-up 애니메이션 (원본 유지)
//     gsap.utils.toArray(".fade-up").forEach((el) => {
//         gsap.fromTo(
//             el,
//             { opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)" },
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     start: "top 100%",
//                     end: "top 65%",
//                     scrub: 1.5,
//                 },
//             }
//         );
//     });
// });


// // 스크롤 폭 조정, 트랙 1~5까지 회전 (문제: 푸터 까지 스크롤이 안감)
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//
// window.addEventListener("DOMContentLoaded", () => {
//     // 1️⃣ ScrollSmoother 초기화
//     window.smoother = ScrollSmoother.create({
//         wrapper: "#root",
//         content: "#main",
//         smooth: 1.2,
//         effects: true,
//         ignore: ".items, .right-area",
//     });
//
//     // 2️⃣ 인트로 애니메이션 동안 스크롤 잠금
//     const tvEnd = 2;
//     const root = document.querySelector("#root");
//
//     smoother.paused(true);
//     root.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";
//
//     setTimeout(() => {
//         smoother.paused(false);
//         root.style.overflow = "";
//         document.body.style.overflow = "";
//     }, tvEnd * 1000);
//
//     // 3️⃣ 프로젝트 섹션: pin + 회전 + 스냅 + 폭 제한
//     const projectsSection = document.getElementById("projects");
//     const itemsContainer = document.querySelector(".items");
//     let scrollTimeout;
//     let snapTween = null;
//
//     if (projectsSection && itemsContainer) {
//         const items = document.querySelectorAll(".item");
//         const totalItems = items.length;
//         const tracks = Math.floor(totalItems / 2);
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2;
//
//         // 트랙 전체를 다 돌릴 수 있는 충분한 스크롤 길이 계산
//         const baseHeight = projectsSection.offsetHeight;
//         const extraHeightPerTrack = 300; // 한 트랙당 필요한 추가 스크롤 px (조절 가능)
//         const triggerEnd = baseHeight + tracks * extraHeightPerTrack;
//
//         ScrollTrigger.create({
//             trigger: projectsSection,
//             start: "top top",
//             end: () => `+=${triggerEnd}`, // 트랙 전체 + 푸터 진입
//             pin: true,
//             scrub: true,
//             onUpdate: (self) => {
//                 const progress = self.progress;
//                 const rotation = degreePerTrack * (tracks - 1) * progress;
//                 gsap.set(itemsContainer, { rotation });
//
//                 window.AppState.isScrolling = true;
//                 window.AppState.currentRotation = rotation;
//                 if (window.updateRightArea) window.updateRightArea(rotation);
//
//                 // 스크롤 멈춤 감지 + 스냅
//                 if (scrollTimeout) clearTimeout(scrollTimeout);
//                 scrollTimeout = setTimeout(() => {
//                     window.AppState.isScrolling = false;
//
//                     if (snapTween) snapTween.kill();
//
//                     const activeTrackIndex = Math.round(rotation / degreePerTrack);
//                     const clampedIndex = Math.max(0, Math.min(activeTrackIndex, tracks - 1));
//                     const targetRotation = clampedIndex * degreePerTrack;
//
//                     snapTween = gsap.to(itemsContainer, {
//                         rotation: targetRotation,
//                         duration: 0.4,
//                         ease: "power2.out",
//                         onUpdate: () => {
//                             window.AppState.currentRotation = targetRotation;
//                             if (window.updateRightArea) window.updateRightArea(targetRotation);
//                         },
//                         onComplete: () => {
//                             window.AppState.currentRotation = targetRotation;
//                             window.AppState.activeProjectIndex = clampedIndex;
//                             if (window.updateRightArea)
//                                 window.updateRightArea(targetRotation, true);
//                             snapTween = null;
//                         },
//                     });
//                 }, 120);
//             },
//         });
//     }
//
//     // 4️⃣ fade-up 애니메이션
//     gsap.utils.toArray(".fade-up").forEach((el) => {
//         gsap.fromTo(
//             el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     start: "top 100%",
//                     end: "top 65%",
//                     scrub: 1.5,
//                 },
//             }
//         );
//     });
// });


// 다 완료 but 문제: 스크롤 자동정렬 때, 업뎃 안됨의 문제
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//
// window.addEventListener("DOMContentLoaded", () => {
//     window.AppState = {
//         isScrolling: false,
//         currentRotation: 0,
//         activeProjectIndex: 0,
//     };
//
//     // 1️⃣ ScrollSmoother 초기화
//     window.smoother = ScrollSmoother.create({
//         wrapper: "#root",
//         content: "#main",
//         smooth: 1.2,
//         effects: true,
//         ignore: ".items, .right-area",
//     });
//
//     // 2️⃣ 인트로 애니메이션 동안 스크롤 잠금
//     const tvEnd = 2;
//     const root = document.querySelector("#root");
//
//     smoother.paused(true);
//     root.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";
//
//     setTimeout(() => {
//         smoother.paused(false);
//         root.style.overflow = "";
//         document.body.style.overflow = "";
//     }, tvEnd * 1000);
//
//     // 3️⃣ 프로젝트 섹션: pin + 회전 + 스냅 + 폭 제한
//     const projectsSection = document.getElementById("projects");
//     const itemsContainer = document.querySelector(".items");
//     let scrollTimeout;
//     let snapTween = null;
//
//     if (projectsSection && itemsContainer) {
//         const items = document.querySelectorAll(".item");
//         const totalItems = items.length;
//         const tracks = Math.floor(totalItems / 2);
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2;
//
//         const baseHeight = projectsSection.offsetHeight;
//         const extraHeightPerTrack = 300; // 한 트랙당 필요한 추가 스크롤 px (조절 가능)
//         const triggerEnd = baseHeight + tracks * extraHeightPerTrack;
//
//         // ➤ 초기 rotation 세팅 (로드 직후 바로 보이게)
//         gsap.set(itemsContainer, { rotation: 0 });
//         if (window.updateRightArea) window.updateRightArea(0);
//
//         ScrollTrigger.create({
//             trigger: projectsSection,
//             start: "top top",
//             end: () => `+=${triggerEnd}`, // 트랙 전체 + 푸터 진입
//             pin: true,
//             scrub: true,
//             onUpdate: (self) => {
//                 const progress = self.progress;
//                 const rotation = degreePerTrack * (tracks - 1) * progress;
//
//                 if (window.AppState.isDragging) return;
//                 gsap.set(itemsContainer, { rotation });
//
//                 window.AppState.isScrolling = true;
//                 window.AppState.currentRotation = rotation;
//                 if (window.updateRightArea) window.updateRightArea(rotation);
//
//                 // 스크롤 멈춤 감지 + 스냅
//                 if (scrollTimeout) clearTimeout(scrollTimeout);
//                 scrollTimeout = setTimeout(() => {
//                     window.AppState.isScrolling = false;
//
//                     if (snapTween) snapTween.kill();
//
//                     const activeTrackIndex = Math.round(rotation / degreePerTrack);
//                     const clampedIndex = Math.max(0, Math.min(activeTrackIndex, tracks - 1));
//                     const targetRotation = clampedIndex * degreePerTrack;
//
//                     snapTween = gsap.to(itemsContainer, {
//                         rotation: targetRotation,
//                         duration: 0.4,
//                         ease: "power2.out",
//                         onUpdate: () => {
//                             window.AppState.currentRotation = targetRotation;
//                             if (window.updateRightArea) window.updateRightArea(targetRotation);
//                         },
//                         onComplete: () => {
//                             window.AppState.currentRotation = targetRotation;
//                             window.AppState.activeProjectIndex = clampedIndex;
//                             if (window.updateRightArea)
//                                 window.updateRightArea(targetRotation, true);
//                             snapTween = null;
//                         },
//                     });
//                 }, 120);
//             },
//         });
//     }
//
//     // 4️⃣ fade-up 애니메이션
//     gsap.utils.toArray(".fade-up").forEach((el) => {
//         gsap.fromTo(
//             el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     start: "top 100%",
//                     end: "top 65%",
//                     scrub: 1.5,
//                 },
//             }
//         );
//     });
// });


// 스크롤 갱신 수정 (빠져나갈때, 너무 빠름)
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//
// window.addEventListener("DOMContentLoaded", () => {
//     // 💡 스크롤 정규화 추가: 스크롤 이벤트의 일관성을 높여 부드러움을 개선
//     ScrollTrigger.normalizeScroll(true);
//
//     window.AppState = {
//         isScrolling: false,
//         currentRotation: 0,
//         activeProjectIndex: 0,
//         isSnapping: false,
//     };
//
//     // 1️⃣ ScrollSmoother 초기화
//     window.smoother = ScrollSmoother.create({
//         wrapper: "#root",
//         content: "#main",
//         smooth: 1.2,
//         effects: true,
//         ignore: ".items, .right-area",
//     });
//
//     // 2️⃣ 인트로 애니메이션 동안 스크롤 잠금
//     const tvEnd = 2;
//     const root = document.querySelector("#root");
//
//     smoother.paused(true);
//     root.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";
//
//     setTimeout(() => {
//         smoother.paused(false);
//         root.style.overflow = "";
//         document.body.style.overflow = "";
//     }, tvEnd * 1000);
//
//     // 3️⃣ 프로젝트 섹션: pin + 회전 + 스냅 + 폭 제한
//     const projectsSection = document.getElementById("projects");
//     const itemsContainer = document.querySelector(".items");
//
//     if (projectsSection && itemsContainer) {
//         const items = document.querySelectorAll(".item");
//         const totalItems = items.length;
//         const tracks = Math.floor(totalItems / 2);
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2;
//
//         const baseHeight = projectsSection.offsetHeight;
//         const extraHeightPerTrack = 300;
//         // 트랙이 없거나 1개일 때는 추가 스크롤 높이를 0으로 설정
//         const triggerEnd = baseHeight + (tracks > 1 ? (tracks - 1) * extraHeightPerTrack : 0);
//
//         // ➤ 초기 rotation 세팅 (로드 직후 바로 보이게)
//         gsap.set(itemsContainer, {rotation: 0});
//         if (window.updateRightArea) window.updateRightArea(0);
//
//         gsap.to(itemsContainer, {
//             rotation: (tracks > 1 ? (tracks - 1) : 0) * degreePerTrack, // 회전할 트랙이 1개 초과일 때만 회전
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 start: "top top",
//                 end: () => `+=${triggerEnd}`,
//                 pin: true,
//                 scrub: 1.5,
//                 snap: {
//                     snapTo: (progress) => {
//                         if (tracks <= 1) return 0;
//                         const activeTrackIndex = Math.round(progress * (tracks - 1));
//                         return activeTrackIndex / (tracks - 1);
//                     },
//                     duration: 0.5,
//                     ease: "power2.out",
//                     onStart: () => {
//                         window.AppState.isSnapping = true;
//                     },
//                     onComplete: () => {
//                         window.AppState.isSnapping = false;
//                         const finalRotation = itemsContainer._gsap.rotation;
//                         window.AppState.currentRotation = finalRotation;
//                         window.AppState.activeProjectIndex = tracks > 0 ? Math.round(finalRotation / degreePerTrack) : 0;
//                         if (window.updateRightArea) window.updateRightArea(finalRotation, true);
//                     },
//                 },
//                 onUpdate: (self) => {
//                     window.AppState.isScrolling = true;
//
//                     if (!window.AppState.isSnapping && !window.AppState.isDragging) {
//                         const currentRotation = self.progress * ((tracks > 1 ? (tracks - 1) : 0) * degreePerTrack);
//                         window.AppState.currentRotation = currentRotation;
//                         if (window.updateRightArea) window.updateRightArea(currentRotation);
//                     }
//
//                     clearTimeout(self.scrollTimeout);
//                     self.scrollTimeout = setTimeout(() => {
//                         window.AppState.isScrolling = false;
//                     }, 150);
//                 },
//                 onEnter: () => {
//                     window.AppState.activeProjectIndex = 0;
//                 },
//                 onRefresh: () => { // ScrollTrigger가 새로고침되거나 크기 변경 시 호출
//                     const initialRotation = itemsContainer._gsap.rotation;
//                     window.AppState.currentRotation = initialRotation;
//                     window.AppState.activeProjectIndex = tracks > 0 ? Math.round(initialRotation / degreePerTrack) : 0;
//                     if (window.updateRightArea) window.updateRightArea(initialRotation, true);
//                 },
//             }
//         });
//     }
//
//     // 4️⃣ fade-up 애니메이션
//     gsap.utils.toArray(".fade-up").forEach((el) => {
//         gsap.fromTo(
//             el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     start: "top 100%",
//                     end: "top 65%",
//                     scrub: 1.5,
//                 },
//             }
//         );
//     });
// });

// 스크롤 부드러움 극대화
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//
// window.addEventListener("DOMContentLoaded", () => {
//     // 💡 스크롤 정규화 추가: 스크롤 이벤트의 일관성을 높여 부드러움을 개선
//     ScrollTrigger.normalizeScroll(true);
//
//     window.AppState = {
//         isScrolling: false,
//         currentRotation: 0,
//         activeProjectIndex: 0,
//         isSnapping: false,
//     };
//
//     // 1️⃣ ScrollSmoother 초기화
//     window.smoother = ScrollSmoother.create({
//         wrapper: "#root",
//         content: "#main",
//         smooth: 2,
//         effects: true,
//     });
//
//     // 2️⃣ 인트로 애니메이션 동안 스크롤 잠금
//     const tvEnd = 2;
//     const root = document.querySelector("#root");
//
//     smoother.paused(true);
//     root.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";
//
//     setTimeout(() => {
//         smoother.paused(false);
//         root.style.overflow = "";
//         document.body.style.overflow = "";
//     }, tvEnd * 1000);
//
//     // 3️⃣ 프로젝트 섹션: pin + 회전 + 스냅 + 폭 제한
//     const projectsSection = document.getElementById("projects");
//     const itemsContainer = document.querySelector(".items");
//
//     if (projectsSection && itemsContainer) {
//         const items = document.querySelectorAll(".item");
//         const totalItems = items.length;
//         const tracks = Math.floor(totalItems / 2);
//         const degreePerItem = 360 / totalItems;
//         const degreePerTrack = degreePerItem * 2;
//
//         const baseHeight = projectsSection.offsetHeight;
//         const extraHeightPerTrack = 300;
//         const effectiveTracksForRotation = (tracks > 1 ? tracks - 1 : 0);
//         const scrollDistanceForRotation = effectiveTracksForRotation * extraHeightPerTrack;
//
//         const triggerEnd = baseHeight + scrollDistanceForRotation;
//
//         // ➤ 초기 rotation 세팅 (로드 직후 바로 보이게)
//         gsap.set(itemsContainer, { rotation: 0 });
//         if (window.updateRightArea) window.updateRightArea(0);
//
//         gsap.to(itemsContainer, {
//             rotation: effectiveTracksForRotation * degreePerTrack,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: projectsSection,
//                 start: "top top",
//                 end: () => `+=${triggerEnd}`,
//                 pin: true,
//                 scrub: 0.8,
//                 snap: {
//                     snapTo: (progress) => {
//                         if (effectiveTracksForRotation === 0) return 0;
//                         const activeTrackIndex = Math.round(progress * effectiveTracksForRotation);
//                         return activeTrackIndex / effectiveTracksForRotation;
//                     },
//                     duration: 0.5,
//                     ease: "power2.out",
//                     onStart: () => {
//                         window.AppState.isSnapping = true;
//                     },
//                     onComplete: () => {
//                         window.AppState.isSnapping = false;
//                         const finalRotation = itemsContainer._gsap.rotation;
//                         window.AppState.currentRotation = finalRotation;
//                         window.AppState.activeProjectIndex = tracks > 0 ? Math.round(finalRotation / degreePerTrack) : 0;
//                         if (window.updateRightArea) window.updateRightArea(finalRotation, true);
//                     },
//                 },
//                 onUpdate: (self) => {
//                     window.AppState.isScrolling = true;
//
//                     if (!window.AppState.isSnapping && !window.AppState.isDragging) {
//                         const currentRotation = self.progress * (effectiveTracksForRotation * degreePerTrack);
//                         window.AppState.currentRotation = currentRotation;
//                         if (window.updateRightArea) window.updateRightArea(currentRotation);
//                     }
//
//                     clearTimeout(self.scrollTimeout);
//                     self.scrollTimeout = setTimeout(() => {
//                         window.AppState.isScrolling = false;
//                     }, 150);
//                 },
//                 onEnter: () => {
//                     window.AppState.activeProjectIndex = 0;
//                 },
//                 onRefresh: () => {
//                     const initialRotation = itemsContainer._gsap.rotation;
//                     window.AppState.currentRotation = initialRotation;
//                     window.AppState.activeProjectIndex = tracks > 0 ? Math.round(initialRotation / degreePerTrack) : 0;
//                     if (window.updateRightArea) window.updateRightArea(initialRotation, true);
//                 },
//             }
//         });
//     }
//
//     // 4️⃣ fade-up 애니메이션
//     gsap.utils.toArray(".fade-up").forEach((el) => {
//         gsap.fromTo(
//             el,
//             {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 filter: "blur(0px)",
//                 ease: "power2.out",
//                 scrollTrigger: {
//                     trigger: el,
//                     start: "top 100%",
//                     end: "top 65%",
//                     scrub: 1.5,
//                 },
//             }
//         );
//     });
// });

// 스크롤 역방향시 트랙5 정보 업댓 수정중 (현재 코드는 원본 코드임)
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

window.addEventListener("DOMContentLoaded", () => {
    // 💡 스크롤 정규화 추가: 스크롤 이벤트의 일관성을 높여 부드러움을 개선
    ScrollTrigger.normalizeScroll(true);

    window.AppState = {
        isScrolling: false,
        currentRotation: 0,
        activeProjectIndex: 0,
        isSnapping: false,
    };

    // 1️⃣ ScrollSmoother 초기화
    window.smoother = ScrollSmoother.create({
        wrapper: "#root",
        content: "#scroll-container",
        smooth: 2,
        effects: true,
    });

    // 2️⃣ 인트로 애니메이션 동안 스크롤 잠금
    const tvEnd = 2;
    const root = document.querySelector("#root");

    smoother.paused(true);
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        smoother.paused(false);
        root.style.overflow = "";
        document.body.style.overflow = "";
    }, tvEnd * 1000);

    // 3️⃣ 프로젝트 섹션: pin + 회전 + 스냅 + 폭 제한
    const projectsSection = document.getElementById("projects");
    const itemsContainer = document.querySelector(".items");

    if (projectsSection && itemsContainer) {
        const items = document.querySelectorAll(".item");
        const totalItems = items.length;
        const tracks = Math.floor(totalItems / 2);
        const degreePerItem = 360 / totalItems;
        const degreePerTrack = degreePerItem * 2;

        const baseHeight = projectsSection.offsetHeight;
        const extraHeightPerTrack = 300;
        const effectiveTracksForRotation = (tracks > 1 ? tracks - 1 : 0);
        const scrollDistanceForRotation = effectiveTracksForRotation * extraHeightPerTrack;

        const triggerEnd = baseHeight + scrollDistanceForRotation;

        // ➤ 초기 rotation 세팅 (로드 직후 바로 보이게)
        gsap.set(itemsContainer, { rotation: 0 });
        if (window.updateRightArea) window.updateRightArea(0);

        gsap.to(itemsContainer, {
            rotation: effectiveTracksForRotation * degreePerTrack,
            ease: "none",
            scrollTrigger: {
                trigger: projectsSection,
                start: "top top",
                end: () => `+=${triggerEnd}`,
                pin: true,
                scrub: 0.8,
                snap: {
                    snapTo: (progress) => {
                        if (effectiveTracksForRotation === 0) return 0;
                        const activeTrackIndex = Math.round(progress * effectiveTracksForRotation);
                        return activeTrackIndex / effectiveTracksForRotation;
                    },
                    duration: 0.5,
                    ease: "power2.out",
                    onStart: () => {
                        window.AppState.isSnapping = true;
                    },
                    onComplete: () => {
                        window.AppState.isSnapping = false;
                        const finalRotation = itemsContainer._gsap.rotation;
                        window.AppState.currentRotation = finalRotation;
                        window.AppState.activeProjectIndex = tracks > 0 ? Math.round(finalRotation / degreePerTrack) : 0;
                        if (window.updateRightArea) window.updateRightArea(finalRotation, true);
                    },
                },
                onUpdate: (self) => {
                    window.AppState.isScrolling = true;

                    if (!window.AppState.isSnapping && !window.AppState.isDragging) {
                        const currentRotation = self.progress * (effectiveTracksForRotation * degreePerTrack);
                        window.AppState.currentRotation = currentRotation;
                        if (window.updateRightArea) window.updateRightArea(currentRotation);
                    }

                    clearTimeout(self.scrollTimeout);
                    self.scrollTimeout = setTimeout(() => {
                        window.AppState.isScrolling = false;
                    }, 150);
                },
                onEnter: () => {
                    window.AppState.activeProjectIndex = 0;
                },
                onRefresh: () => {
                    const initialRotation = itemsContainer._gsap.rotation;
                    window.AppState.currentRotation = initialRotation;
                    window.AppState.activeProjectIndex = tracks > 0 ? Math.round(initialRotation / degreePerTrack) : 0;
                    if (window.updateRightArea) window.updateRightArea(initialRotation, true);
                },
            }
        });
    }

    // 4️⃣ fade-up 애니메이션
    gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(
            el,
            {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 100%",
                    end: "top 65%",
                    scrub: 1.5,
                },
            }
        );
    });
});




