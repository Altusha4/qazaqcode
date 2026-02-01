/**
 * Qazaq Cinema Code - Зерттеу Жобасының Логикасы
 */

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

const badSoundingWords = ["Шашу", "Киіт", "Тәлім", "Қалжың", "Төр", "Кие"];

document.addEventListener('DOMContentLoaded', () => {
    initGlossary();
    initChart();
    setupAOS();
});

// Глоссарийді құру
function initGlossary() {
    const grid = document.getElementById('glossaryGrid');
    if (!grid) return;
    words.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glossary-card';
        const isBad = badSoundingWords.includes(item.w);
        card.innerHTML = `<h4>${item.w}</h4><p>${item.d}</p>${!isBad ? '<span style="font-size:0.75rem;opacity:0.6;">🔊 Тыңдау</span>' : ''}`;
        if (!isBad) card.onclick = () => speak(item.w);
        grid.appendChild(card);
    });
}

function speak(text) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'kk-KZ';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
}

// Статистика (Chart.js)
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
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
}

function setupAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});