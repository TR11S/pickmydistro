console.log("Quiz script loaded successfully.");

function startQuiz() {
    console.log("Button clicked!");
    const hero = document.getElementById('hero-section');
    const quiz = document.getElementById('quiz-section');

    if (hero && quiz) {
        hero.style.display = 'none';
        quiz.classList.remove('hidden');
        quiz.classList.add('flex');
        console.log("UI Swapped.");
    } else {
        console.error("Could not find hero or quiz sections in the DOM.");
    }
}