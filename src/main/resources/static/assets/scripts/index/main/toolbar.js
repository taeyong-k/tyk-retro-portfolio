document.querySelectorAll("#toolbar button").forEach(btn => {
    btn.addEventListener("click", () => {
        const targetEl = document.getElementById(btn.dataset.target);
        if (!targetEl || !window.smoother) return;
        if (window.isScrollingToSection) return;

        window.isScrollingToSection = true;
        if (window.updateCursorColor) window.updateCursorColor(true);

        // 프로젝트 애니메이션 도중이면 스크롤 잠금 해제
        if (window.AppState?.isGalleryAnimating) {
            window.AppState.isGalleryAnimating = false;
            if (window.smoother.paused()) window.smoother.paused(false);
        }

        window.smoother.scrollTo(targetEl, true);

        setTimeout(() => {
            window.isScrollingToSection = false;
            if (window.updateCursorColor) window.updateCursorColor(false);
        }, 700);
    });
});
