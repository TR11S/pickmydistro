let currentStep = 0;
const userAnswers = {};

function startQuiz() {
    document.getElementById('hero-section').classList.add('hidden');
    const quizSection = document.getElementById('quiz-section');
    quizSection.classList.remove('hidden');
    quizSection.classList.add('flex');
    
    // Initialize listeners
    document.querySelectorAll('.slider').forEach((slider, index) => {
        slider.addEventListener('input', (e) => {
            document.getElementById(`val-${index}`).innerText = e.target.value;
        });
    });
}

function nextStep(stepIndex) {
    const currentEl = document.querySelector(`[data-step="${stepIndex}"]`);
    const variable = currentEl.getAttribute('data-variable');
    const value = parseInt(currentEl.querySelector('.slider').value);
    
    // Map -3 to 3 input to 1-10 scale (Value + 5)
    // -3 => 2 (Minimal)
    //  0 => 5 (Neutral)
    // +3 => 8 (Maximal)
    userAnswers[variable] = value + 5;

    currentEl.classList.add('hidden');
    const nextEl = document.querySelector(`[data-step="${stepIndex + 1}"]`);
    if (nextEl) {
        nextEl.classList.remove('hidden');
    }
}

function calculateResults() {
    const finalStep = document.querySelector('.question-step:not(.hidden)');
    const variable = finalStep.getAttribute('data-variable');
    userAnswers[variable] = parseInt(finalStep.querySelector('.slider').value) + 5;

    let bestMatch = null;
    let lowestScore = Infinity;

    for (const key in distroData) {
        const distro = distroData[key];
        let totalDifference = 0;

        for (const varName in userAnswers) {
            const userVal = userAnswers[varName];
            const distroVal = distro.values[varName] || 5; 
            totalDifference += Math.abs(userVal - distroVal);
        }

        if (totalDifference < lowestScore) {
            lowestScore = totalDifference;
            bestMatch = distro;
        }
    }

    displayResults(bestMatch);
}

function displayResults(distro) {
    document.getElementById('quiz-section').classList.remove('flex');
    document.getElementById('quiz-section').classList.add('hidden');
    
    const results = document.getElementById('results-section');
    results.classList.remove('hidden');
    results.classList.add('flex');

    document.getElementById('distro-name').innerText = distro.name;
    document.getElementById('distro-desc').innerText = distro.description;
    document.getElementById('distro-link').href = distro.website;
}