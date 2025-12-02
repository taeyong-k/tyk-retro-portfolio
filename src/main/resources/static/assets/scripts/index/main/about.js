const okBtn = document.querySelector('.btn-ok');
const cancelBtn = document.querySelector('.btn-cancel');
const aboutSection = document.querySelector('#about');

function animateButtons() {
    okBtn.classList.add('pulse');
    setTimeout(() => okBtn.classList.remove('pulse'), 800);

    setTimeout(() => {
        cancelBtn.classList.add('pulse');
        setTimeout(() => cancelBtn.classList.remove('pulse'), 800);
    }, 1800);
}

// Intersection Observer 설정
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                animateButtons();
                setInterval(animateButtons, 8000); // 8초 주기 반복
            }, 1000);
            observer.unobserve(entry.target);
        }
    });
}, {threshold: 0.4});

observer.observe(aboutSection);
