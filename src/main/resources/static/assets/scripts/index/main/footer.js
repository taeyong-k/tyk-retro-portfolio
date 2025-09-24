(function(){
    // requestAnimationFrame 호환
    window.requestAnimationFrame = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame;

    // canvas 셋업
    var canvas = document.querySelector("#footer canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "source-over";

    var particles = [];
    var pIndex = 0;
    var frameCount = 0;
    var confettiId = null; // 애니메이션 ID 저장용
    var textAnimations = []; // 텍스트 애니메이션 객체 저장용

    var params = {
        colorful_mode: true,
        amount: 5,
        bg_color: "none",
        // bg_color: "#222",
        vx: 2,
        vy: 4,
        size: 10
    };

    function Particle(x,vx,vy,color,size){
        this.x = x;
        this.y = -canvas.height/2;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        particles[pIndex] = this;
        this.id = pIndex++;
        this.life = 0;
        this.maxlife = 600;
        this.degree = Math.random() * 360;
        this.size = Math.floor(getRandom(size*0.8, size));
    }

    Particle.prototype.draw = function(){
        this.degree += 1;
        this.vx *= 0.99;
        this.vy *= 0.999;
        this.x += this.vx + Math.cos(this.degree*Math.PI/180);
        this.y += this.vy;

        var w = this.size;
        var h = Math.cos(this.degree*Math.PI/45)*this.size;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + w/2, this.y + h);
        ctx.lineTo(this.x + w, this.y + h);
        ctx.lineTo(this.x + w, this.y);
        ctx.closePath();
        ctx.fill();

        this.life++;
        if(this.life >= this.maxlife) delete particles[this.id];
    }

    // confetti loop
    function confettiLoop(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        canvas.style.background = params.bg_color;

        frameCount++;
        if(frameCount % (11 - params.amount) === 0){
            var hue = Math.floor(Math.random()*13)*30;
            var hsl_color = "hsl(" + hue + ", 80%, 60%)";
            new Particle(canvas.width*Math.random(),
                getRandom(-params.vx, params.vx),
                getRandom(params.vy-2, params.vy),
                hsl_color, params.size);
        }

        for(var i in particles){
            if(particles[i]) particles[i].draw();
        }

        confettiId = requestAnimationFrame(confettiLoop);
    }

    // 텍스트 애니메이션
    function startTextAnimation(){
        const littles = document.querySelectorAll(".little span");
        littles.forEach((little, i) => {
            little.animate(
                [
                    { transform: "translateX(100%)", opacity: 0 },
                    { transform: "translateX(0%)", opacity: 1, offset: 0.15 },
                    { transform: "translateX(0%)", opacity: 1, offset: 0.8 },
                    { transform: "translateX(-100%)", opacity: 0 }
                ],
                {
                    duration: 10000,
                    delay: -5000 * i,
                    iterations: Infinity,
                    easing: "cubic-bezier(.5,-0,.49,1.25)"
                }
            );
        });
    }

    function stopAnimations(){
        // confetti 중지
        if(confettiId){
            cancelAnimationFrame(confettiId);
            confettiId = null;
        }
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles = [];
        pIndex = 0;

        // 텍스트 애니메이션 중지
        textAnimations.forEach(anim => anim.cancel());
        textAnimations = [];
    }

    // IntersectionObserver
    const footer = document.querySelector("#footer");

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting && entry.intersectionRatio >= 0.1){
                confettiLoop();
                startTextAnimation();
            } else {
                stopAnimations(); // footer 벗어나면 초기화
            }
        });
    }, { threshold: 0.1 });

    observer.observe(footer);

    // resize
    window.addEventListener("resize", function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
})();

