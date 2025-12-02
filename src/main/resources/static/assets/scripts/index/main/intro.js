const $header = document.getElementById('header');
const video = document.querySelector("#intro video");
const tvEnd = 2;

video.removeAttribute('loop');
video.currentTime = 0;
video.play();

// TV 애니메이션 끝나면 header 표시
setTimeout(() => {
    $header.classList.add('visible');
}, tvEnd * 1000);

// 타이핑 구간 무한 반복
video.addEventListener('timeupdate', () => {
    if (video.currentTime >= video.duration - 0.05) {
        video.currentTime = tvEnd;
        video.play();
    }
});
