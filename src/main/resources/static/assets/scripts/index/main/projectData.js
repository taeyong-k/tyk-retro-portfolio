// assets/scripts/index/main/projectData.js
export const projectsData = [
    {
        title: "Pixterest",
        date: "2025.06.20 - 25.08.05",
        type: ["팀", "사이드", "반응형"],
        language: ["Java", "HTML, SCSS, CSS, JS", "MariaDB", "JDK"],
        framework: ["Spring Boot, Spring MVC", "Thymeleaf", "MyBatis", "Lombok", "Masonry.js, imagesLoaded"],
        etc: ["IntelliJ, Maven", "Git, GitHub, Notion", "Google Cloud", "Cloudflare", "Gabia"],
        features: [
            "Pinterest를 모티브로 한 이미지 기반 SNS 서비스 Pixterest를 2인 팀 프로젝트로 개발하며, 실사용 가능한 기능 구현과 완성도 높은 프로젝트 제작을 목표로 진행했습니다.",
            "Spring Boot, Thymeleaf, MariaDB를 활용해 전체 시스템 구조를 설계하고, 백엔드 핵심 기능 개발을 주도했습니다.",
            "Masonry.js 기반 홈 피드 벽돌형 레이아웃을 구현하고, 무한 스크롤 기능을 적용해 사용자 경험을 향상시켰습니다.",
            "핀/보드 CRUD, 이미지 업로드, 댓글 시스템, Toast 메시지 등 주요 기능을 설계 및 개발하고, Google Cloud와 Cloudflare를 활용해 실제 서비스 환경에서 운영 가능하도록 구성했습니다."
        ],
        slides: [
            "/assets/images/project/pixterest/board.png",
            "/assets/images/project/pixterest/pin.png",
            "/assets/images/project/pixterest/home.png",
            "/assets/images/project/pixterest/pin-more.png",
            "/assets/images/project/pixterest/pin-edit.png"
        ],
        siteUrl: "https://pixterest.taeyong.dev/",
        githubUrl: "https://github.com/taeyong-k/pixterest"
    },
    { // 사용한 스킬은 다하고 나서 수정!!!!
        title: "포트폴리오 (레트로)",
        date: "2025.04.01 - 2025.09.진행중",
        type: ["개인", "사이드", "반응형"],
        language: ["Java", "HTML, SCSS, CSS, JS", "MariaDB", "JDK"],
        // framework: ["Spring Boot, Spring MVC", "Thymeleaf", "MyBatis", "Lombok", "GSAP", "Font Awesome, Ionicons"],
        framework: ["Spring Boot, Spring MVC", "Lombok", "GSAP", "Font Awesome, Ionicons"],
        etc: ["IntelliJ, Maven", "Git, GitHub, Notion", "Google Cloud", "Cloudflare", "Gabia"],
        features: [
            "레트로 스타일 기반 포트폴리오 '포트폴리오-레트로버전 v2'를 1인 프로젝트로 개발하며, 이전 포트폴리오의 한계를 개선하고 시각적 완성도와 직관적인 UI/UX 구현을 목표로 진행했습니다.",
            "HTML, CSS/SCSS, JavaScript, Thymeleaf로 원페이지 스크롤, 레트로 테마, 인터랙티브 애니메이션 및 LED 스킬 보드 UI/UX를 구현했습니다.",
            "백엔드(Spring Boot, Spring MVC, JDBC, MariaDB)와 연동하여 프로젝트/커리어/스킬 데이터 관리, 세션 처리, DB 저장/조회 기능을 포함한 전체 포트폴리오 구조를 설계했습니다.",
            "GSAP, Draggable, Block Reveal 등 라이브러리를 활용한 애니메이션 최적화, 모바일 반응형 대응, 부하 최소화, 사용자 활동 기반 인터랙션 제어 등 고도화된 프론트엔드 기능을 구현했습니다."

        ],
        slides: [
            "/assets/images/project/retro-portfolio/career.png",
            "/assets/images/project/retro-portfolio/about.png",
            "/assets/images/project/retro-portfolio/intro.png",
            "/assets/images/project/retro-portfolio/skill.png",
            "/assets/images/project/retro-portfolio/project.png"
        ],
        siteUrl: "https://www.taeyong.dev/",
        githubUrl: "https://github.com/taeyong-k/tyk-retro-portfolio"
    },
    {
        title: "독서 마라톤",
        date: "2025.05.12 - 2025.05.19",
        type: ["팀", "사이드"],
        language: ["Java", "HTML, SCSS, CSS, JS", "MariaDB", "JDK"],
        framework: ["Spring Boot, Spring MVC", "Thymeleaf", "MyBatis", "Lombok"],
        etc: ["IntelliJ", "Maven", "Git", "GitHub", "Notion"],
        features: [
            "사용자가 읽고 싶은 책을 선택하고 목표를 설정해 마라톤처럼 독서를 진행할 수 있는 독서 마라톤 웹 서비스를 4인 팀으로 개발했습니다.",
            "Spring Boot와 Java 기반 백엔드 설계 및 핵심 로직 구현을 담당하며, 도서 검색, 카트 담기, 마라톤 시작, 진행 현황 관리 등 전체 서비스 흐름을 설계했습니다.",
            "HTML, CSS, SCSS, JavaScript를 활용하여 UI/UX를 구현하고, 외부 API 연동, 세션 기반 인증, DB 저장/조회 기능을 포함한 실사용 가능한 서비스 환경을 구성했습니다.",
            "팀원 간 역할 분담을 통해 로그인/회원 관리, 마이페이지, 마라톤 현황 페이지 등을 개발하며, 실제 서비스 수준의 기능 경험과 협업 역량을 강화했습니다."

        ],
        slides: [
            "/assets/images/project/ReadingMarathon/start.png",
            "/assets/images/project/ReadingMarathon/search.png",
            "/assets/images/project/ReadingMarathon/home.png",
            "/assets/images/project/ReadingMarathon/login.png",
            "/assets/images/project/ReadingMarathon/ing.png",
            "/assets/images/project/ReadingMarathon/mypage.png"
        ],
        siteUrl: "local",
        githubUrl: "https://github.com/taeyong-k/ReadingMarathon"
    },
    {
        title: "포트폴리오",
        date: "2025.03.26 - 2025.03.31",
        type: ["개인", "사이드", "반응형"],
        language: ["HTML", "CSS", "JS"],
        framework: ["Lombok"],
        etc: ["IntelliJ", "Maven", "Git", "GitHub"],
        features: [
            "나만의 개발 히스토리를 보여주기 위해 제작한 첫 포트폴리오 사이트로, Black & White 기반에 톤 다운된 포인트 컬러를 사용하여 시각적 피로를 줄이고 콘텐츠 중심 UI를 구현했습니다.",
            "HTML, CSS, JavaScrip 을 활용해 전체 레이아웃과 네비게이션, 섹션별 카드/디스켓 기반 UI를 설계했습니다.",
            "About Me, Certification, Skill, Project, Career 등 주요 섹션을 직관적으로 구성하고, 프로젝트 카드 클릭, topAnchor 이동, 반응형 웹 등 핵심 기능을 구현했습니다.",
            "모바일 반응형 문제, 프로젝트 카드 배치, 버튼 클릭 로직 등 개발 과정에서 발생한 트러블슈팅을 통해 설계 및 코드 구조를 개선하며 학습 경험을 쌓았습니다."
        ],
        slides: [
            "/assets/images/project/portfolio/skill.png",
            "/assets/images/project/portfolio/career.png",
            "/assets/images/project/portfolio/about.png",
            "/assets/images/project/portfolio/project.png",
            "/assets/images/project/portfolio/project-more.png"
        ],
        siteUrl: "local",
        githubUrl: "https://github.com/taeyong-k/tyk-portfolio"
    },
    {
        title: "영화 포스터 퀴즈",
        date: "2025.03.14 - 2025.03.19",
        type: ["팀", "사이드"],
        language: ["HTML", "CSS", "JS"],
        framework: ["Lombok"],
        etc: ["IntelliJ", "Maven", "Git", "GitHub"],
        features: [
            "영화 포스터를 보고 제목을 맞추는 퀴즈 게임 서비스를 6일간 개발하며, 단기간 내 실사용 가능한 완성도를 목표로 진행했습니다.",
            "JavaScript와 fetch()를 활용해 TMDB API에서 최신 영화 데이터를 동적으로 불러오고, 중복되지 않도록 랜덤 출제 로직을 구현했습니다.",
            "HTML, CSS로 웹 구조와 스타일을 설계하고, JS로 입력 포커스, 마우스/키보드 이벤트 등 사용자 인터랙션을 구현했습니다.",
            "게임 시작, 문제 진행, 정답 처리, 결과 표시 등 주요 로직을 안정적으로 개발하며 직관적인 플레이 경험을 제공했습니다."
        ],
        slides: [
            "/assets/images/project/moviequiz/55.png",
            "/assets/images/project/moviequiz/22.png",
            "/assets/images/project/moviequiz/11.png",
            "/assets/images/project/moviequiz/33.png",
            "/assets/images/project/moviequiz/44.png"
        ],
        siteUrl: "local",
        githubUrl: "https://github.com/taeyong-k/moviequiz"
    },
];
