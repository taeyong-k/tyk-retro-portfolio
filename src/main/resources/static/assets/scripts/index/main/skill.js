// 폰트맵: 문자별 7x5 LED dot 패턴 (1 = 점 켬, 0 = 끔)
const fontMap = {
    'A': ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
    'B': ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
    'C': ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
    'D': ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
    'E': ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
    'F': ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
    'G': ['01110', '10001', '10000', '10111', '10001', '10001', '01110'],
    'H': ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
    'I': ['01110', '00100', '00100', '00100', '00100', '00100', '01110'],
    'J': ['00001', '00001', '00001', '00001', '10001', '10001', '01110'],
    'K': ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
    'L': ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
    'M': ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
    'N': ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
    'O': ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    'P': ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
    'Q': ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
    'R': ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
    'S': ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
    'T': ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
    'U': ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
    'V': ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
    'W': ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
    'X': ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
    'Y': ['10001', '10001', '10001', '01010', '00100', '00100', '00100'],
    'Z': ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
    ':': ['00000', '00100', '00100', '00000', '00100', '00100', '00000'],
    ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000']
};

// 카테고리별 스킬 데이터 (텍스트 + 로고 이미지 경로)
const skillsData = {
    languages: [
        {text: "JAVA", logo: 'languages/java.png'},
        {text: 'PYTHON', logo: 'languages/python.png'},
        {text: 'JAVASCRIPT', logo: 'languages/js.png'},
        {text: '', logo: 'default.png'},
    ],
    frontend: [
        {text: 'HTML', logo: 'frontend/html.png'},
        {text: 'CSS', logo: 'frontend/css.png'},
        {text: 'SCSS', logo: 'frontend/scss.png'},
        {text: 'THYMELEAF', logo: 'frontend/thymeleaf.png'},
    ],
    backend: [
        {text: 'Spring Boot', logo: 'backend/springboot.png'},
        {text: 'Spring', logo: 'backend/spring.png'},
        {text: 'JPA', logo: 'backend/jpa.png'},
        {text: 'MyBatis', logo: 'backend/mybatis.png'},
        {text: 'JDBC', logo: 'backend/jdbc.jpg'},
        {text: 'Lombok', logo: 'backend/lombok.png'},
    ],
    database: [
        {text: 'Maria DB', logo: 'database/mariadb.png'},
        {text: '', logo: 'default.png'},
        {text: '', logo: 'default.png'},
        {text: '', logo: 'default.png'},
    ],
    devOps: [
        {text: 'Google Cloud', logo: 'devOps/gcp.png'},
        {text: 'Cloudflare', logo: 'devOps/cloudflare.png'},
        {text: 'Linux', logo: 'devOps/linux.png'},
        {text: 'Gabia', logo: 'devOps/gabia.png'},
    ],
    tools: [
        {text: 'Eclipse', logo: 'tools/eclipse.png'},
        {text: 'IntelliJ', logo: 'tools/intellij.png'},
        {text: 'pythonIDE', logo: 'tools/pythonIDE.png'},
        {text: 'Git', logo: 'tools/git.png'},
        {text: 'GitHub', logo: 'tools/github.png'},
        {text: 'Maven', logo: 'tools/maven.png'},
        {text: 'JDK', logo: 'tools/jdk.png'},
        {text: 'VMware', logo: 'tools/vmware.png'},
    ],
};

// 메시지 LED dot 렌더링
function renderMessage(container, text) {
    if (!container) return;
    container.innerHTML = '';
    const rows = 7;
    const fragment = document.createDocumentFragment();

    for (let r = 0; r < rows; r++) {
        for (let ch of text.toUpperCase()) {
            const line = fontMap[ch] ? fontMap[ch][r] : fontMap[' '][r];
            for (let bit of line) {
                const dot = document.createElement('div');
                dot.classList.add('led-dot');
                if (bit === '1') dot.classList.add('led-on');
                fragment.appendChild(dot);
            }
            const spacer = document.createElement('div');
            spacer.style.width = '5px';
            spacer.style.height = '5px';
            fragment.appendChild(spacer);
        }
    }
    container.appendChild(fragment);
    container.style.gridTemplateColumns = `repeat(${text.length * 6}, 5px)`;
}


// 스킬 하나 생성
function createSkillElement({text, logo}) {
    const skill = document.createElement('div');
    skill.className = 'skill';

    const img = document.createElement('img');
    img.className = 'logo';
    img.alt = text;
    img.src = logo.includes('/')
        ? `./assets/images/skills/${logo}`
        : `./assets/images/${logo}`;

    if (logo === 'default.png') {
        img.classList.add('logo-default');
    }

    const led = document.createElement('div');
    led.className = 'led-message';

    skill.append(img, led);
    renderMessage(led, text);

    skill.addEventListener('click', () => {
        document.querySelectorAll('.skill.selected').forEach(el => el.classList.remove('selected'));

        skill.classList.add('selected');
    });

    return skill;
}

// 보드에 스킬 갱신
function updateSkillsBoard(category) {
    const skillContainer = document.querySelector('.skill-container');
    const skillTitle = document.querySelector('#skillLeft .skill-title');

    skillContainer.innerHTML = '';
    skillTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    const skillList = skillsData[category] || [];

    skillList.forEach(skillData => {
        const skillElem = createSkillElement(skillData);
        skillContainer.appendChild(skillElem);
    });
}

// 버튼 클릭 이벤트 바인딩
document.querySelectorAll('#skillNav li').forEach(li => {
    li.addEventListener('click', e => {
        e.preventDefault();

        // li 안에 있는 a 태그에서 data-category 읽기
        const link = li.querySelector('a');
        if (!link) return;

        const category = link.dataset.category;
        updateSkillsBoard(category);

        // 선택된 버튼 표시
        document.querySelectorAll('#skillNav li').forEach(item => item.classList.remove('selected'));
        li.classList.add('selected');
    });
});

// 처음엔 languages 표시
updateSkillsBoard('languages');
document.querySelector('[data-category="languages"]').parentElement.classList.add('selected');

// 스킬 섹션에 머무를 때, 일정 시간마다 자동으로 카테고리를 바꾸고, 그 바뀔 때 hover 애니메이션도 같이 동작하게
// 1. 순서 정의
const skillCategories = ['languages', 'frontend', 'backend', 'database', 'devOps', 'tools'];
let currentCategoryIndex = 0;
let autoRotateInterval = null;

// 2. 자동 전환 함수
function autoRotateSkills() {
    currentCategoryIndex = (currentCategoryIndex + 1) % skillCategories.length;
    const category = skillCategories[currentCategoryIndex];

    // 카테고리 업데이트
    updateSkillsBoard(category);

    // 버튼 선택 시각효과
    document.querySelectorAll('#skillNav li').forEach(item => item.classList.remove('selected'));
    const selectedLi = document.querySelector(`[data-category="${category}"]`)?.parentElement;
    if (selectedLi) {
        selectedLi.classList.add('selected');

        // 호버 효과 강제 트리거
        selectedLi.classList.add('hovered');
        setTimeout(() => selectedLi.classList.remove('hovered'), 1000); // 잠깐만 유지
    }
}

// 3. 스킬 섹션이 화면에 보일 때만 작동
const skillSection = document.getElementById('skills');

const observer = new IntersectionObserver(entries => {
    const entry = entries[0];

    if (entry.intersectionRatio >= 0.3) {
        startAutoRotate();
    }

    if (entry.intersectionRatio <= 0.2) {
        stopAutoRotate();
        clearTimeout(inactivityTimer);
    }
}, { threshold: Array.from({length: 101}, (_, i) => i / 100) }); // 0~1, 0.01 단위로 촘촘하게 감지

observer.observe(skillSection);


// 사용자 활동 감지로 자동전환 잠시 멈춤 & 다시 시작 기능
let inactivityTimer;
const INACTIVITY_LIMIT = 3000;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    stopAutoRotate();
    inactivityTimer = setTimeout(() => {
        startAutoRotate();
    }, INACTIVITY_LIMIT);
}

function startAutoRotate() {
    if (!autoRotateInterval) {
        // 현재 선택된 카테고리 찾아서 인덱스 맞추기
        const selectedLi = document.querySelector('#skillNav li.selected a');
        if (selectedLi) {
            const currentCategory = selectedLi.dataset.category;
            const idx = skillCategories.indexOf(currentCategory);
            currentCategoryIndex = idx >= 0 ? idx : 0;
        } else {
            currentCategoryIndex = 0;
        }

        autoRotateInterval = setInterval(autoRotateSkills, 5000);
    }
}

function stopAutoRotate() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
    }
}

// 사용자 액션 감지해서 타이머 리셋
['click', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, () => {
        if (isSkillSectionInView()) {
            resetInactivityTimer();
        }
    });
});

// tools 스킬 컨테이너(스크롤 되는 영역)
const skillContainer = document.querySelector('.skill-container');

// 휠 감지해서 타이머 리셋
if (skillContainer) {
    skillContainer.addEventListener('wheel', (e) => {
        const selectedLi = document.querySelector('#skillNav li.selected a');
        if (selectedLi && selectedLi.dataset.category === 'tools') {
            resetInactivityTimer();
        }
    });
}

function isSkillSectionInView() {
    const rect = skillSection.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// 초기 실행 시 섹션이 이미 보이면 자동 전환 시작
if (isSkillSectionInView()) {
    resetInactivityTimer();
}
