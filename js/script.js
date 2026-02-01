const words = [
    { w: "Қонақасы", d: "Қонаққа берілетін ең таңдаулы ас, сый-құрмет." },
    { w: "Ибалық", d: "Келіннің немесе жастардың үлкенге әдебі." },
    { w: "Сәлем салу", d: "Келіннің үлкендерге ізет көрсету рәсімі." },
    { w: "Киіт", d: "Құдалықта өзара сыйланатын бағалы киімдер." },
    { w: "Төр", d: "Үйдің ең сыйлы орны, үлкендерге арналған." },
    { w: "Бата", d: "Жақсы тілек, рухани қолдауы мен рұқсаты." },
    { w: "Намыс", d: "Жеке абырой мен ұлттық мақтаныш коды." },
    { w: "Құдалық", d: "Екі әулеттің туыстық қарым-қатынасын бекіту." },
    { w: "Сүйінші", d: "Қуанышты хабар жеткізгенде берілетін сый." },
    { w: "Шашу", d: "Қуаныш сәтінде шашылатын тәттілер мен тиындар." },
    { w: "Ақсақал", d: "Әулеттің немесе ауылдың ақылшысы, қарт." },
    { w: "Қалжың", d: "Қазақ комедиясының негізі, астарлы әзіл." },
    { w: "Ағайын", d: "Туыстық байланыс пен бірлік символы." },
    { w: "Болмыс", d: "Ұлттың өзіндік табиғаты мен мінез-құлқы." },
    { w: "Тәлім", d: "Кино арқылы берілетін жанама тәрбие." },
    { w: "Енші", d: "Балаларға бөлініп берілетін мұра немесе мүлік." },
    { w: "Мәдени код", d: "Ұлтты өзгелерден ерекшелейтін рухани таңба." },
    { w: "Жеті ата", d: "Туыстық шежірені білудің маңыздылығы." },
    { w: "Қонақжайлық", d: "Қазақ болмысының ажырамас бөлігі." },
    { w: "Кие", d: "Қасиетті саналатын ұғымдар мен дәстүрлер." }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('glossaryGrid');
    words.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glossary-card';
        card.innerHTML = `<h4>${item.w}</h4><p>${item.d}</p>`;
        card.onclick = () => speak(item.w);
        grid.appendChild(card);
    });
    loadQuestion();
    initChart();
});

function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'kk-KZ';
    window.speechSynthesis.speak(msg);
}

function initChart() {
    const ctx = document.getElementById('surveyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ұлттық код', 'Юмор', 'Отбасы'],
            datasets: [{
                label: 'Респонденттер (%)',
                data: [85, 92, 78],
                backgroundColor: ['#006064', '#c4a006', '#004d40']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

const questions = [
    { q: "Қай фильмде 'сәлем салу' басты мәдени код?", a: ["Бизнес по-казахски", "Келінжан", "Құдалар", "Аким"], c: 1 },
    { q: "Қуанышты хабар үшін берілетін сый қалай аталады?", a: ["Бата", "Киіт", "Сүйінші", "Шашу"], c: 2 },
    { q: "Қонаққа берілетін арнайы дәм қалай аталады?", a: ["Енші", "Қонақасы", "Қалжың", "Төр"], c: 1 }
];

let curQ = 0;
function loadQuestion() {
    const q = questions[curQ];
    document.getElementById('q-text').innerText = q.q;
    document.getElementById('quiz-progress').innerText = `Сұрақ: ${curQ + 1} / ${questions.length}`;
    const optCont = document.getElementById('quiz-options');
    optCont.innerHTML = '';
    document.getElementById('q-feedback').innerText = '';
    document.getElementById('next-btn').style.display = 'none';

    q.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            if (i === q.c) document.getElementById('q-feedback').innerText = "Дұрыс! ✅";
            else document.getElementById('q-feedback').innerText = "Қате! ❌";
            Array.from(document.getElementsByClassName('quiz-btn')).forEach(b => b.disabled = true);
            if (curQ < questions.length - 1) document.getElementById('next-btn').style.display = 'block';
            else document.getElementById('q-feedback').innerText += " Квиз аяқталды!";
        };
        optCont.appendChild(btn);
    });
}

function loadNextQuestion() { curQ++; loadQuestion(); }

window.addEventListener('scroll', () => {
    document.getElementById('mainHeader').classList.toggle('scrolled', window.scrollY > 50);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));