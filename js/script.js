/**
 * Qazaq Cinema Code
 * Полная версия с локальными аудио файлами
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

/* ---------------- INIT ---------------- */

document.addEventListener("DOMContentLoaded", () => {
    initGlossary();
    initChart();
    setupAOS();
});

/* ---------------- GLOSSARY ---------------- */

function initGlossary() {
    const grid = document.getElementById("glossaryGrid");
    if (!grid) return;

    grid.innerHTML = "";

    words.forEach(item => {
        const card = document.createElement("div");
        card.className = "glossary-card";

        card.innerHTML = `
            <h4>${item.w}</h4>
            <p>${item.d}</p>
            <span style="font-size:0.75rem;opacity:0.6;display:block;margin-top:10px;">🔊 Тыңдау</span>
        `;

        card.addEventListener("click", () => playAudio(item.file));

        grid.appendChild(card);
    });
}

/* ---------------- AUDIO ---------------- */

function playAudio(filename) {

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const audioPath = `audio/${filename}`;
    const audio = new Audio(audioPath);

    audio.preload = "auto";

    audio.play().catch(error => {
        console.error("Ошибка воспроизведения:", error);
    });

    currentAudio = audio;
}

/* ---------------- CHART ---------------- */

function initChart() {
    const canvas = document.getElementById("surveyChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

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
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
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
        btn.innerText = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
    }
}

/* ---------------- AOS ---------------- */

function setupAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll("[data-aos]").forEach(el => observer.observe(el));
}

/* ---------------- HEADER EFFECT ---------------- */

window.addEventListener("scroll", () => {
    const header = document.getElementById("mainHeader");
    if (!header) return;

    if (window.scrollY > 50) {
        header.style.padding = "10px 5%";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
        header.style.padding = "15px 5%";
        header.style.boxShadow = "none";
    }
});
