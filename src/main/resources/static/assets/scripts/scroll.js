gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

window.addEventListener("DOMContentLoaded", () => {
    ScrollTrigger.normalizeScroll(true);

    window.AppState = {
        isScrolling: false,
        currentRotation: 0,
        activeProjectIndex: 0,
        isSnapping: false,
    };

    // ScrollSmoother 초기화
    window.smoother = ScrollSmoother.create({
        wrapper: "#root",
        content: "#scroll-container",
        smooth: 3,
        effects: true,
    });

    // 인트로 애니메이션 동안 스크롤 잠금
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

    // 프로젝트 섹션: pin + 회전 + 스냅 + 폭 제한
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
                // onUpdate: (self) => {
                //     window.AppState.isScrolling = true;
                //
                //     if (!window.AppState.isSnapping && !window.AppState.isDragging) {
                //         const currentRotation = self.progress * (effectiveTracksForRotation * degreePerTrack);
                //         window.AppState.currentRotation = currentRotation;
                //         if (window.updateRightArea) window.updateRightArea(currentRotation);
                //     }
                //
                //     clearTimeout(self.scrollTimeout);
                //     self.scrollTimeout = setTimeout(() => {
                //         window.AppState.isScrolling = false;
                //     }, 100);
                // },
                onUpdate: (self) => {
                    window.AppState.isScrolling = true;

                    const currentRotation = self.progress * (effectiveTracksForRotation * degreePerTrack);
                    window.AppState.currentRotation = currentRotation;

                    if (window.updateRightArea) window.updateRightArea(currentRotation);

                    clearTimeout(self.scrollTimeout);
                    self.scrollTimeout = setTimeout(() => {
                        window.AppState.isScrolling = false;
                    }, 100);
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

    // fade-up 애니메이션
    gsap.utils.toArray(".fade-up").forEach((el) => {
        if (!el.closest("#project-title")) {
            gsap.fromTo(
                el,
                {opacity: 0.3, y: 60, scale: 0.65, filter: "blur(4px)"},
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 100%",
                        end: "top 60%",
                        scrub: 2,
                    },
                }
            );
        }
    });

    // 프로젝트 타이틀 개별 글자 애니메이션
    gsap.fromTo(
        "#project-title h1",
        { opacity: 0.3, y: 80, scale: 0.65, filter: "blur(4px)" },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "slow(0.7, 0.7, false)",
            stagger: 0.1,
            scrollTrigger: {
                trigger: "#project-title",
                start: "top 95%",
                end: "top 45%",
                scrub: 3,
            },
        }
    );
});
