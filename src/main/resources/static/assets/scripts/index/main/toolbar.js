// toolbar 버튼 클릭 시 해당 섹션으로 이동
const toolbarButtons = document.querySelectorAll("#toolbar button");

toolbarButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.target;
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({behavior: "smooth"});
        }
    });
});