/**
 * Qazaq Cinema Code - Жобаның логикасы
 * Барлық құқықтар қорғалған © 2026
 */

// 1. Мәдени глоссарий деректері (20 термин)
const words = [
    { w: "Қонақасы", d: "Қонаққа берілетін ең таңдаулы ас, сый-құрмет." },
    { w: "Ибалық", d: "Келіннің немесе жастардың үлкенге әдебі." },
    { w: "Сәлем салу", d: "Келіннің үлкендерге ізет көрсету рәсімі." },
    { w: "Киіт", d: "Құдалықта өзара сыйланатын бағалы киімдер мен бұйымдар." },
    { w: "Төр", d: "Үйдің ең сыйлы орны, үлкендер мен қонақтарға арналған." },
    { w: "Бата", d: "Жақсы тілек, рухани қолдауы мен үлкендердің рұқсаты." },
    { w: "Намыс", d: "Жеке абырой мен ұлттық мақтаныш коды." },
    { w: "Құдалық", d: "Екі әулеттің туыстық қарым-қатынасын бекіту рәсімі." },
    { w: "Сүйінші", d: "Қуанышты хабар жеткізгенде берілетін сыйлық." },
    { w: "Шашу", d: "Қуаныш сәтінде шашылатын тәттілер мен тиындар." },
    { w: "Ақсақал", d: "Әулеттің немесе ауылдың ақылшысы, тәжірибелі қарт." },
    { w: "Қалжың", d: "Қазақ комедиясының негізі, астарлы әзіл." },
    { w: "Ағайын", d: "Туыстық байланыс пен бірлік символы." },
    { w: "Болмыс", d: "Ұлттың өзіндік табиғаты мен мінез-құлқы." },
    { w: "Тәлім", d: "Кино арқылы юмормен берілетін жанама тәрбие." },
    { w: "Енші", d: "Балаларға бөлініп берілетін мұра немесе мүлік." },
    { w: "Мәдени код", d: "Ұлтты өзгелерден ерекшелейтін рухани таңба." },
    { w: "Жеті ата", d: "Туыстық шежірені білудің маңыздылығы." },
    { w: "Қонақжайлық", d: "Қазақ болмысының ажырамас бөлігі." },
    { w: "Кие", d: "Қасиетті саналатын ұғымдар мен дәстүрлер." }
];

// 2. Документ жүктелгенде орындалатын функциялар
document.addEventListener('DOMContentLoaded', () => {
    initGlossary();
    loadQuestion();
    initChart();
    setupAOS();
});

// 3. Глоссарийді генерациялау
function initGlossary() {
    const grid = document.getElementById('glossaryGrid');
    if (!grid) return;

    words.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glossary-card';
        card.innerHTML = `
            <h4>${item.w}</h4>
            <p>${item.d}</p>
            <span style="font-size: 0.8rem; opacity: 0.5;">🔊 Тыңдау</span>
        `;
        card.onclick = () => speak(item.w);
        grid.appendChild(card);
    });
}

// 4. Мәтінді дыбыстау
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'kk-KZ';
        msg.rate = 0.9;
        window.speechSynthesis.speak(msg);
    }
}

// 5. Статистика (Chart.js)
function initChart() {
    const canvas = document.getElementById('surveyChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ұлттық код', 'Юмор', 'Отбасы'],
            datasets: [{
                label: 'Маңыздылық (%)',
                data: [85, 92, 78],
                backgroundColor: ['rgba(0, 96, 100, 0.7)', 'rgba(196, 160, 6, 0.7)', 'rgba(0, 77, 64, 0.7)'],
                borderColor: ['#006064', '#c4a006', '#004d40'],
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

// 6. Тақырыпты ауыстыру
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
}

// 7. Квиз логикасы
const questions = [
    { q: "Қай фильмде 'сәлем салу' басты мәдени код?", a: ["Бизнес по-казахски", "Келінжан", "Құдалар", "Аким"], c: 1 },
    { q: "Қуанышты хабар үшін берілетін сый қалай аталады?", a: ["Бата", "Киіт", "Сүйінші", "Шашу"], c: 2 },
    { q: "Қонаққа берілетін арнайы дәм қалай аталады?", a: ["Енші", "Қонақасы", "Қалжың", "Төр"], c: 1 }
];

let curQ = 0;
function loadQuestion() {
    const qText = document.getElementById('q-text');
    const optCont = document.getElementById('quiz-options');
    const feedback = document.getElementById('q-feedback');
    const nextBtn = document.getElementById('next-btn');
    const qProgress = document.getElementById('quiz-progress');

    if (!qText || !optCont) return;

    const q = questions[curQ];
    if (qProgress) qProgress.innerText = `Сұрақ: ${curQ + 1} / ${questions.length}`;

    qText.innerText = q.q;
    optCont.innerHTML = '';
    feedback.innerText = '';
    nextBtn.style.display = 'none';

    q.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (i === q.c) {
                feedback.innerText = "Дұрыс! ✅";
                feedback.style.color = "#4CAF50";
            } else {
                feedback.innerText = "Қате! ❌";
                feedback.style.color = "#f44336";
            }
            Array.from(document.getElementsByClassName('quiz-btn')).forEach(b => b.disabled = true);
            if (curQ < questions.length - 1) {
                nextBtn.style.display = 'block';
            } else {
                feedback.innerText += " Квиз аяқталды!";
            }
        };
        optCont.appendChild(btn);
    });
}

function loadNextQuestion() {
    curQ++;
    loadQuestion();
}

// 8. Дизайн және анимация
window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

function setupAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}