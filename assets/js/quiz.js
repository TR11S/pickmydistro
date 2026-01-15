let currentStep = 0;
const userAnswers = {};
let quizMode = 'beginner'; // 'beginner' or 'advanced'
const totalQuestions = document.querySelectorAll('.question-step').length;

// Initialize quiz with mode selection
function startQuiz(mode) {
    quizMode = mode;
    console.log('Starting quiz in', mode, 'mode');
    
    document.getElementById('hero-section').classList.add('hidden');
    const quizSection = document.getElementById('quiz-section');
    quizSection.classList.remove('hidden');
    quizSection.classList.add('flex');
    
    // Update total questions display
    document.getElementById('total-questions').textContent = totalQuestions;
    
    // Initialize slider listeners with visual feedback
    document.querySelectorAll('.slider').forEach((slider, index) => {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById(`val-${index}`).innerText = value;
            
            // Update slider gradient based on value
            updateSliderGradient(slider, value);
        });
        
        // Initialize gradient on load
        updateSliderGradient(slider, slider.value);
    });
    
    updateProgress();
}

// Update slider visual gradient fill
function updateSliderGradient(slider, value) {
    // Map -3 to 3 range to 0-100%
    const percentage = ((parseFloat(value) + 3) / 6) * 100;
    slider.style.background = `linear-gradient(90deg, 
        rgba(59, 130, 246, 0.3) 0%, 
        rgba(139, 92, 246, 0.3) ${percentage}%, 
        rgba(30, 41, 59, 0.8) ${percentage}%, 
        rgba(51, 65, 85, 0.8) 100%)`;
}

// Update progress bar with glow effect
function updateProgress() {
    const progress = (currentStep / totalQuestions) * 100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progress + '%';
    document.getElementById('progress-percent').textContent = Math.round(progress);
    document.getElementById('current-question').textContent = currentStep + 1;
}

// Navigate to next step
function nextStep(stepIndex) {
    const currentEl = document.querySelector(`[data-step="${stepIndex}"]`);
    const variable = currentEl.getAttribute('data-variable');
    const value = parseInt(currentEl.querySelector('.slider').value);
    
    // Map -3 to 3 scale to 1-10 scale
    userAnswers[variable] = ((value + 3) / 6) * 9 + 1;
    
    // Transition to next question
    currentEl.style.opacity = '0';
    currentEl.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        currentEl.classList.add('hidden');
        const nextEl = document.querySelector(`[data-step="${stepIndex + 1}"]`);
        if (nextEl) {
            nextEl.classList.remove('hidden');
            nextEl.style.opacity = '0';
            nextEl.style.transform = 'translateX(20px)';
            
            // Animate in
            setTimeout(() => {
                nextEl.style.transition = 'all 0.4s ease';
                nextEl.style.opacity = '1';
                nextEl.style.transform = 'translateX(0)';
            }, 50);
            
            currentStep = stepIndex + 1;
            updateProgress();
        }
    }, 300);
}

// Navigate to previous step
function prevStep(stepIndex) {
    const currentEl = document.querySelector(`[data-step="${stepIndex}"]`);
    
    currentEl.style.opacity = '0';
    currentEl.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        currentEl.classList.add('hidden');
        const prevEl = document.querySelector(`[data-step="${stepIndex - 1}"]`);
        if (prevEl) {
            prevEl.classList.remove('hidden');
            prevEl.style.opacity = '0';
            prevEl.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                prevEl.style.transition = 'all 0.4s ease';
                prevEl.style.opacity = '1';
                prevEl.style.transform = 'translateX(0)';
            }, 50);
            
            currentStep = stepIndex - 1;
            updateProgress();
        }
    }, 300);
}

// Calculate match results
function calculateResults() {
    // Save final answer
    const finalStep = document.querySelector('.question-step:not(.hidden)');
    const variable = finalStep.getAttribute('data-variable');
    const value = parseInt(finalStep.querySelector('.slider').value);
    userAnswers[variable] = ((value + 3) / 6) * 9 + 1;
    
    console.log('User answers:', userAnswers);
    
    const matches = [];
    
    // Calculate match score for each distro
    for (const key in distroData) {
        const distro = distroData[key];
        let totalDifference = 0;
        let questionCount = 0;
        
        for (const varName in userAnswers) {
            const userVal = userAnswers[varName];
            const distroVal = distro.values[varName] || 5.5;
            const difference = Math.abs(userVal - distroVal);
            totalDifference += difference;
            questionCount++;
        }
        
        const maxPossibleDiff = questionCount * 9;
        const matchPercentage = Math.round(100 * (1 - (totalDifference / maxPossibleDiff)));
        
        matches.push({
            key: key,
            data: distro,
            matchPercentage: matchPercentage,
            difference: totalDifference
        });
    }
    
    // Sort by best match
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    displayResults(matches);
}

// Display results with featured card and grid
function displayResults(matches) {
    document.getElementById('quiz-section').classList.remove('flex');
    document.getElementById('quiz-section').classList.add('hidden');
    
    const resultsSection = document.getElementById('results-section');
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('flex');
    
    // Create featured card for top match
    const featuredContainer = document.getElementById('featured-result');
    featuredContainer.innerHTML = '';
    featuredContainer.appendChild(createFeaturedCard(matches[0]));
    
    // Create grid of secondary results
    const secondaryContainer = document.getElementById('secondary-results');
    secondaryContainer.innerHTML = '';
    
    for (let i = 1; i < matches.length; i++) {
        secondaryContainer.appendChild(createSecondaryCard(matches[i], i));
    }
    
    // Add parallax hover effect
    addParallaxEffect();
}

// Create featured card for #1 match
function createFeaturedCard(match) {
    const card = document.createElement('div');
    card.className = 'featured-card distro-card glass-card rounded-3xl p-8 sm:p-12 shadow-2xl fade-in';
    
    card.innerHTML = `
        <div class="card-glow"></div>
        <div class="relative z-10">
            <!-- Crown Badge -->
            <div class="flex items-center justify-between mb-8">
                <div class="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                    <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="text-sm font-bold text-yellow-300 uppercase tracking-wider">Best Match</span>
                </div>
                <div class="text-right">
                    <div class="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        ${match.matchPercentage}%
                    </div>
                    <div class="text-sm text-slate-400 uppercase tracking-wider mt-1">Compatibility</div>
                </div>
            </div>
            
            <!-- Distro Info -->
            <div class="mb-8">
                <h3 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                    ${match.data.name}
                </h3>
                <p class="text-lg sm:text-xl text-slate-300 leading-relaxed">
                    ${match.data.description}
                </p>
            </div>
            
            <!-- Match Bar -->
            <div class="mb-8">
                <div class="flex justify-between text-sm font-medium text-slate-400 mb-3">
                    <span>Match Analysis</span>
                    <span>${match.matchPercentage}%</span>
                </div>
                <div class="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden">
                    <div class="progress-glow h-3 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-1000" style="width: ${match.matchPercentage}%"></div>
                </div>
            </div>
            
            <!-- CTA Button -->
            <a href="${match.data.website}" target="_blank" 
               class="btn-glow inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all text-lg">
                <span>Visit Official Site</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
            </a>
        </div>
    `;
    
    return card;
}

// Create secondary result cards
function createSecondaryCard(match, index) {
    const card = document.createElement('div');
    card.className = `distro-card glass-card rounded-2xl p-6 shadow-xl fade-in fade-in-${index + 1}`;
    
    // Color based on match percentage
    let matchColor, matchBg;
    if (match.matchPercentage >= 75) {
        matchColor = 'from-green-400 to-blue-400';
        matchBg = 'from-green-500/20 to-blue-500/20';
    } else if (match.matchPercentage >= 50) {
        matchColor = 'from-blue-400 to-purple-400';
        matchBg = 'from-blue-500/20 to-purple-500/20';
    } else {
        matchColor = 'from-slate-400 to-slate-500';
        matchBg = 'from-slate-500/20 to-slate-600/20';
    }
    
    card.innerHTML = `
        <div class="card-glow"></div>
        <div class="relative z-10">
            <!-- Match Badge -->
            <div class="flex items-center justify-between mb-6">
                <span class="inline-flex items-center px-3 py-1.5 bg-gradient-to-r ${matchBg} border border-white/10 rounded-full text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Match
                </span>
                <span class="text-3xl font-bold bg-gradient-to-r ${matchColor} bg-clip-text text-transparent">
                    ${match.matchPercentage}%
                </span>
            </div>
            
            <!-- Distro Name -->
            <h4 class="text-2xl sm:text-3xl font-bold text-white mb-3">
                ${match.data.name}
            </h4>
            
            <!-- Description -->
            <p class="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed line-clamp-3">
                ${match.data.description}
            </p>
            
            <!-- Match Bar -->
            <div class="mb-6">
                <div class="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                    <div class="h-2 rounded-full bg-gradient-to-r ${matchColor} transition-all duration-1000" style="width: ${match.matchPercentage}%"></div>
                </div>
            </div>
            
            <!-- CTA Link -->
            <a href="${match.data.website}" target="_blank" 
               class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors group">
                <span>Learn More</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    `;
    
    return card;
}

// Add parallax hover effect to cards
function addParallaxEffect() {
    const cards = document.querySelectorAll('.distro-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

console.log('Quiz system initialized with', totalQuestions, 'questions');