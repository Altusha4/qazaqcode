/**
 * Qazaq Cinema Code
 * Улучшенная версия: интерактивность, визуальные эффекты и оптимизация
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
});

/* ---------------- GLOSSARY ---------------- */

function initGlossary() {
    const grid = document.getElementById("glossaryGrid");
    if (!grid) return;

    grid.innerHTML = "";

    words.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "glossary-card";
        // Добавляем атрибут задержки анимации для красивого появления по очереди
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
    // Сброс предыдущего аудио и стилей
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

/* ---------------- CHART ---------------- */

function initChart() {
    const canvas = document.getElementById("surveyChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Настройка шрифтов для Chart.js
    Chart.defaults.font.family = "'Montserrat', sans-serif";
    Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--dark');

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Ұлттық код", "Юмор", "Отбасы"],
            datasets: [{
                label: "Маңыздылық (%)",
                data: [85, 92, 78],
                backgroundColor: [
                    "rgba(0, 96, 100, 0.7)",
                    "rgba(196, 160, 6, 0.7)",
                    "rgba(0, 77, 64, 0.7)"
                ],
                borderColor: ["#006064", "#c4a006", "#004d40"],
                borderWidth: 2,
                borderRadius: 10, // Скругление столбиков
                hoverBackgroundColor: "#006064"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { display: false }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

/* ---------------- THEME ---------------- */

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const btn = document.getElementById("themeBtn");

    if (btn) {
        const isDark = document.body.classList.contains("dark-theme");
        btn.innerText = isDark ? "☀️" : "🌙";

        // Перерисовываем график при смене темы для обновления цветов текста (опционально)
        initChart();
    }
}

/* ---------------- AOS (Scroll Animation) ---------------- */

function setupAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Срабатывает чуть раньше появления
    });

    document.querySelectorAll("[data-aos]").forEach(el => observer.observe(el));
}

/* ---------------- SMOOTH SCROLL ---------------- */

function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}
// Логика для трейлеров
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("trailerPlayer");
    const closeBtn = document.querySelector(".close-modal");
    const buttons = document.querySelectorAll(".play-trailer-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const videoId = btn.getAttribute("data-video");
            // Формируем ссылку с автовоспроизведением
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = "flex";
        });
    });

    // Закрытие при клике на крестик
    closeBtn.onclick = () => {
        modal.style.display = "none";
        iframe.src = ""; // Очищаем ссылку, чтобы остановить звук
    };

    // Закрытие при клике вне окна
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            iframe.src = "";
        }
    };
});

/* ---------------- HEADER EFFECT ---------------- */

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
// Сайт жүктелгенде Loader-ді өшіру
window.addEventListener("load", () => {
    const loader = document.getElementById("loader-wrapper");
    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 1500); // 1.5 секунд көрсетіледі
});

// Басты тақырыпқа тышқан қозғалысымен параллакс қосу
document.querySelector(".hero").addEventListener("mousemove", (e) => {
    const title = document.querySelector(".hero h1");
    const moveX = (e.clientX - window.innerWidth / 2) * 0.03;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.03;
    title.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
// Фонда қалқып жүретін элементтер жасау
function createFloatingIcons() {
    const container = document.body;
    const icons = ['🎬', '🎥', '🍿', '🇰🇿', '✨'];
    
    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.innerText = icons[Math.floor(Math.random() * icons.length)];
        icon.className = 'floating-icon';
        icon.style.left = Math.random() * 100 + 'vw';
        icon.style.top = Math.random() * 100 + 'vh';
        icon.style.fontSize = (Math.random() * 20 + 10) + 'px';
        icon.style.opacity = '0.1';
        icon.style.position = 'fixed';
        icon.style.pointerEvents = 'none';
        icon.style.zIndex = '-1';
        container.appendChild(icon);
        
        // Анимация
        animateIcon(icon);
    }
}

function animateIcon(el) {
    let x = Math.random() * 2 - 1;
    let y = Math.random() * 2 - 1;
    
    setInterval(() => {
        const rect = el.getBoundingClientRect();
        el.style.transform = `translate(${x}px, ${y}px)`;
        x += Math.random() * 2 - 1;
        y += Math.random() * 2 - 1;
    }, 100);
}

createFloatingIcons();