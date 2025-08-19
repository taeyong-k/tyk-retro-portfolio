const okBtn = document.querySelector('.btn-ok');
const cancelBtn = document.querySelector('.btn-cancel');
const aboutSection = document.querySelector('#about'); // 어바웃 섹션 id

function animateButtons() {
    // OK 버튼 2.5초 애니메이션
    okBtn.classList.add('pulse');
    setTimeout(() => okBtn.classList.remove('pulse'), 2500);

    // Cancel 버튼 0.5초 딜레이 후 2.5초 애니메이션
    setTimeout(() => {
        cancelBtn.classList.add('pulse');
        setTimeout(() => cancelBtn.classList.remove('pulse'), 2500);
    }, 3000); // OK 2.5초 + 대기 0.5초
}

// Intersection Observer 설정
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                animateButtons();                   // 처음 실행 (1초 뒤)
                setInterval(animateButtons, 11000); // 11초 주기 반복
            }, 1000);
            observer.unobserve(entry.target);   // 한 번만 감지
        }
    });
}, { threshold: 0.4 }); // 섹션 40% 보이면 실행

observer.observe(aboutSection);
