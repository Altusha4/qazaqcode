/**
 * Qazaq Cinema Code
 * Толық жаңартылған нұсқа: 5 график, аудио, трейлерлер және эффектілер
 */

const words = [
    { w: "Қонақасы", d: "Қонаққа берілетін ең таңдаулы ас, сый-құрмет.", file: "konakasy.mp3" },
    { w: "Ибалық", d: "Келіннің немесе жастардың үлкенге әдебі.", file: "ibalyk.mp3" },
    { w: "Сәлем салу", d: "Келіннің үлкендерге ізет көрсету рәсімі.", file: "salem-salu.mp3" },
    { w: "Киіт", d: "Құдалықта өзара сыйланатын бағалы киімдер мен бұйымдар.", file: "kiit.mp3" },
    { w: "Төр", d: "Үйдің ең сыйлы орны, үлкендер мен қонақтарға арналған.", file: "tor.mp3" },
    { w: "Бата", d: "Жақсы тілек, рухани қолдауы мен үлкендердің рұқсаты.", file: "bata.mp3" },
    { w: "Намыс", d: "Жеке абырой мен ұлттық мақтаныш коды.", file: "namys.mp3" },
    { w: "Құдалық", d: "Екі әулеттің туыстық қарым-қатынасын бекіту рәсімі.", file: "kudalyk.mp3" },
    { w: "Сүйінші", d: "Қуанышты хабар жеткізгенде берілетін сыйлық.", file: "suyinshi.mp3" },
    { w: "Шашу", d: "Қуаныш сәтінде шашылатын тәттілер мен тиындар.", file: "shashu.mp3" },
    { w: "Ақсақал", d: "Әулеттің немесе ауылдың ақылшысы, тәжірибелі қарт.", file: "aksakal.mp3" },
    { w: "Қалжың", d: "Қазақ комедиясының негізі, астарлы әзіл.", file: "kalzhyn.mp3" },
    { w: "Ағайын", d: "Туыстық байланыс пен бірлік символы.", file: "agayin.mp3" },
    { w: "Болмыс", d: "Ұлттың өзіндік табиғаты мен мінез-құлқы.", file: "bolmys.mp3" },
    { w: "Тәлім", d: "Кино арқылы юмормен берілетін жанама тәрбие.", file: "talim.mp3" },
    { w: "Енші", d: "Балаларға бөлініп берілетін мұра немесе мүлік.", file: "enshi.mp3" },
    { w: "Мәдени код", d: "Ұлтты өзгелерден ерекшелейтін рухани таңба.", file: "medenikod.mp3" },
    { w: "Жеті ата", d: "Туыстық шежірені білудің маңыздылығы.", file: "zheti-ata.mp3" },
    { w: "Қонақжайлық", d: "Қазақ болмысының ажырамас бөлігі.", file: "konakzhailyk.mp3" },
    { w: "Кие", d: "Қасиетті саналатын ұғымдар мен дәстүрлер.", file: "kie.mp3" }
];

let currentAudio = null;
let activeCard = null;

/* ---------------- INIT ---------------- */

document.addEventListener("DOMContentLoaded", () => {
    initGlossary();
    initChart();
    setupAOS();
    setupSmoothScroll();
    setupVideoModal();
    createFloatingIcons();
});

/* ---------------- GLOSSARY ---------------- */

function initGlossary() {
    const grid = document.getElementById("glossaryGrid");
    if (!grid) return;

    grid.innerHTML = "";

    words.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "glossary-card";
        card.setAttribute("data-aos", "fade-up");
        card.style.transitionDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <h4>${item.w}</h4>
            <p>${item.d}</p>
            <div class="audio-indicator" style="font-size:0.7rem; margin-top:12px; opacity:0.6;">
                <span>▶ Тыңдау</span>
            </div>
        `;

        card.addEventListener("click", () => playAudio(item.file, card));
        grid.appendChild(card);
    });
}

/* ---------------- AUDIO ---------------- */

function playAudio(filename, cardElement) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        if (activeCard) activeCard.classList.remove("playing");
    }

    const audioPath = `audio/${filename}`;
    const audio = new Audio(audioPath);

    audio.play()
        .then(() => {
            cardElement.classList.add("playing");
            activeCard = cardElement;
            currentAudio = audio;
        })
        .catch(error => {
            console.error("Аудио ойнату қатесі:", error);
        });

    audio.onended = () => {
        cardElement.classList.remove("playing");
    };
}

/* ---------------- CHARTS (5 ГРАФИКОВ) ---------------- */

function initChart() {
    // Шрифтер мен түстерді теңшеу
    Chart.defaults.font.family = "'Montserrat', sans-serif";
    const isDark = document.body.classList.contains("dark-theme");
    const textColor = isDark ? "#f1f5f9" : "#1a1a1a";

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: textColor, font: { size: 12 } }
            }
        }
    };

    // 1. Кино жанрларына басымдық (Вопрос №2)
    const genreCtx = document.getElementById('genreChart');
    if (genreCtx) {
        new Chart(genreCtx, {
            type: 'doughnut',
            data: {
                labels: ['Комедия', 'Басқалар'],
                datasets: [{
                    data: [86.7, 13.3],
                    backgroundColor: ['#c4a006', '#006064'],
                    borderWidth: 0
                }]
            },
            options: commonOptions
        });
    }

    // 2. Мәдени кодты түсінуге әсері (Вопрос №6)
    const impactCtx = document.getElementById('impactChart');
    if (impactCtx) {
        new Chart(impactCtx, {
            type: 'pie',
            data: {
                labels: ['Түсінуге көмектеседі', 'Әсері аз'],
                datasets: [{
                    data: [92, 8],
                    backgroundColor: ['#006064', '#cfd8dc'],
                    borderWidth: 0
                }]
            },
            options: commonOptions
        });
    }

    // 3. Жиі байқалатын элементтер (Вопрос №8, 9, 7)
    const codesCtx = document.getElementById('codesChart');
    if (codesCtx) {
        new Chart(codesCtx, {
            type: 'bar',
            data: {
                labels: ['Қонақжайлық', 'Тіл/Әзіл', 'Салт-дәстүр'],
                datasets: [{
                    label: 'Байқалу жиілігі (%)',
                    data: [90, 70, 76.7],
                    backgroundColor: '#006064',
                    borderRadius: 8
                }]
            },
            options: {
                ...commonOptions,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { color: textColor } },
                    x: { ticks: { color: textColor } }
                }
            }
        });
    }

    // 4. Құндылықтарды сақтауға үлесі (Вопрос №11)
    const valuesCtx = document.getElementById('valuesChart');
    if (valuesCtx) {
        new Chart(valuesCtx, {
            type: 'pie',
            data: {
                labels: ['Үлес қосады', 'Күмәнді'],
                datasets: [{
                    data: [56.7, 43.3],
                    backgroundColor: ['#004d40', '#cfd8dc'],
                    borderWidth: 0
                }]
            },
            options: commonOptions
        });
    }

    // 5. Дәстүрлерді көбірек көрсету қажеттілігі (Вопрос №7)
    const futureCtx = document.getElementById('futureChart');
    if (futureCtx) {
        new Chart(futureCtx, {
            type: 'bar',
            data: {
                labels: ['Көбірек қажет', 'Жеткілікті'],
                datasets: [{
                    data: [76.7, 23.3],
                    backgroundColor: '#c4a006',
                    borderRadius: 8
                }]
            },
            options: {
                ...commonOptions,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { color: textColor } },
                    x: { ticks: { color: textColor } }
                }
            }
        });
    }
}

/* ---------------- THEME ---------------- */

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const btn = document.getElementById("themeBtn");

    if (btn) {
        const isDark = document.body.classList.contains("dark-theme");
        btn.innerText = isDark ? "☀️" : "🌙";
        initChart(); // Түстерді жаңарту үшін графиктерді қайта салу
    }
}

/* ---------------- VIDEO MODAL ---------------- */

function setupVideoModal() {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("trailerPlayer");
    const closeBtn = document.querySelector(".close-modal");
    const buttons = document.querySelectorAll(".play-trailer-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const videoId = btn.getAttribute("data-video");
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = "flex";
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            iframe.src = "";
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            iframe.src = "";
        }
    };
}

/* ---------------- UTILS ---------------- */

function setupAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll("[data-aos]").forEach(el => observer.observe(el));
}

function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });
}

window.addEventListener("load", () => {
    const loader = document.getElementById("loader-wrapper");
    if (loader) {
        setTimeout(() => { loader.classList.add("loader-hidden"); }, 1000);
    }
});

/* ---------------- EFFECTS ---------------- */

document.querySelector(".hero").addEventListener("mousemove", (e) => {
    const title = document.querySelector(".hero h1");
    if (!title) return;
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    title.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

function createFloatingIcons() {
    const container = document.body;
    const icons = ['🎬', '🎥', '🍿', '🇰🇿', '✨'];
    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.innerText = icons[Math.floor(Math.random() * icons.length)];
        icon.className = 'floating-icon';
        icon.style.cssText = `
            left: ${Math.random() * 100}vw; top: ${Math.random() * 100}vh;
            font-size: ${Math.random() * 20 + 10}px; opacity: 0.1;
            position: fixed; pointer-events: none; z-index: -1;
        `;
        container.appendChild(icon);
        animateIcon(icon);
    }
}

function animateIcon(el) {
    let x = Math.random() * 2 - 1;
    let y = Math.random() * 2 - 1;
    setInterval(() => {
        el.style.transform = `translate(${x}px, ${y}px)`;
        x += (Math.random() - 0.5) * 2;
        y += (Math.random() - 0.5) * 2;
    }, 100);
}

window.addEventListener("scroll", () => {
    const header = document.getElementById("mainHeader");
    if (!header) return;
    if (window.scrollY > 50) {
        header.style.padding = "12px 8%";
        header.style.background = getComputedStyle(document.body).getPropertyValue('--header-bg');
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
    } else {
        header.style.padding = "20px 8%";
        header.style.boxShadow = "none";
    }
});