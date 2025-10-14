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


// 1. 스크롤js에서도 공유해서 사용할 수 있게 프로젝트 전역화 (전역화 하고 기존 기능과 동일한지 먼저)
// 2. 전역화 완료 후, 스크롤 멈췄을때, 영역에 기반 하여 중앙 정렬되게끔 (아래코드 참고)
// 3. 드래그 + 스크롤 업데이트 하기 (잘 적용이 안되는듯함..!)
// 4. 스크롤 중, 화면 한번씩 튀는 현상 고치기.... (프로젝트 구간이 제일 심한듯?)
// 5. 프로젝트 : 애니메이션 작동중 - 스크롤 막기 (방법이 있나 모르겟음...)
// 6. 인트로 : 애니메이션 작동중 - 스크롤 막기 (방법이 있나 모르겟음...)
// 7. 배경색 맞추던지 따로 두던지 등 생각해보기!
// 8. 스킬.............렉 오지는거 어떻게 할지.........ㅅㅂ....
// 9. 그 외 디테일은 이력서 내면서 조금씩 수정하기
// 실험중인 코드
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('[data-scroll-container]');

    // 1️⃣ LocomotiveScroll 초기화
    window.scrollInstance = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.07,
        multiplier: 0.7,
        getDirection: true,
        getSpeed: true,
        firefoxMultiplier: 50
    });

    window.scrollInstance.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length
                ? window.scrollInstance.scrollTo(value, 0, 0)
                : window.scrollInstance.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener('refresh', () => window.scrollInstance.update());
    ScrollTrigger.refresh();

    // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전 (스냅 적용)
    const projectsSection = document.getElementById('projects');
    const itemsContainer = document.querySelector(".items");

    if (projectsSection && itemsContainer) {
        gsap.to(itemsContainer, {
            rotation: -360,
            ease: "none",
            scrollTrigger: {
                trigger: projectsSection,
                scroller: scrollContainer,
                start: "top top",
                end: "bottom top",
                pin: true,
                scrub: true,
                onUpdate: self => {
                    const progress = self.progress;
                    const rotation = 360 * progress;
                    gsap.set(itemsContainer, { rotation });

                    // ❗ 실제 보정 및 데이터 갱신은 프로젝트 JS에서 처리
                    if (window.updateRightArea) {
                        window.updateRightArea(rotation);
                    }
                }
            }
        });
    }

    // 3️⃣ fade-up 요소 애니메이션
    gsap.utils.toArray(".fade-up").forEach(el => {
        gsap.fromTo(el,
            {opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)"},
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    scroller: scrollContainer,
                    start: "top 100%",
                    end: "top 55%",
                    scrub: 1.5
                }
            }
        );
    });
});

// // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// // -> 스크롤시 -> 영역에서 스크롤 멈추면 중앙정렬됐던 코드
// // (프로젝트 전역화가 되있어야 가능함)
// // 문제 : 정렬은 잘되나, 정렬될때 (갤러리 2번 막 회전함 + 정보가 일치하지않음)
//     // 2️⃣ 프로젝트 섹션 pin + 스크롤 연동 트랙 회전 (스냅 적용)
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
//                     const progress = self.progress;
//                     const rotation = 360 * progress;
//                     gsap.set(itemsContainer, { rotation });
//
//                     // 실시간 오른쪽 영역 업데이트 (선택 사항)
//                     updateRightArea(rotation);
//
//                     // 스크롤 멈춤 체크 (debounce)
//                     if (scrollTimeout) clearTimeout(scrollTimeout);
//                     scrollTimeout = setTimeout(() => {
//                         // 이전 snap 애니메이션 있으면 kill
//                         if (snapTween) snapTween.kill();
//
//                         // 중앙 스냅 계산
//                         const totalTracks = ProjectGallery.total / 2;
//                         const rotationPerTrack = ProjectGallery.degree * 2;
//                         let rawIndex = progress * totalTracks;
//                         let activeIndex = Math.floor(rawIndex);
//                         const localProgress = rawIndex - activeIndex;
//
//                         if (localProgress >= 0.5) activeIndex += 1;
//                         if (activeIndex >= totalTracks) activeIndex = totalTracks - 1;
//
//                         const targetRotation = -activeIndex * rotationPerTrack;
//
//                         // 스냅 애니메이션 실행
//                         snapTween = gsap.to(itemsContainer, {
//                             rotation: targetRotation,
//                             duration: 0.4,
//                             ease: "power2.out",
//                             onComplete: () => {
//                                 // 중앙 트랙 기준 정확한 데이터 업데이트
//                                 ProjectGallery.updateRightArea(targetRotation);
//                                 snapTween = null;
//                             }
//                         });
//                     }, 100); // 멈춤 후 0.1초 delay
//                 }
//             }
//         });
//     }


