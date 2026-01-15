---
layout: default
title: Home
---

<!-- Animated Background Gradients -->
<div class="gradient-mesh gradient-mesh-1"></div>
<div class="gradient-mesh gradient-mesh-2"></div>

<!-- Hero Section -->
<div id="hero-section" class="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
    <div class="max-w-4xl mx-auto space-y-10">
        
        <!-- Hero Card -->
        <div class="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div class="space-y-6">
                <!-- Badge -->
                <div class="inline-block">
                    <span class="px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-500/30">
                        System Recommendation Engine
                    </span>
                </div>
                
                <!-- Title -->
                <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
                    <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Find Your
                    </span>
                    <br>
                    <span class="text-white">
                        Linux Distribution
                    </span>
                </h1>
                
                <!-- Subtitle -->
                <p class="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Advanced matching algorithm analyzes your preferences to recommend the perfect Linux distribution for your needs.
                </p>
            </div>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <button onclick="startQuiz('beginner')" class="btn-glow group relative w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl overflow-hidden transition-all">
                    <span class="relative z-10 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        Beginner Quiz
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                
                <button onclick="startQuiz('advanced')" class="btn-glow group relative w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden transition-all">
                    <span class="relative z-10 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                        </svg>
                        Advanced Quiz
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
            </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="scroll-indicator mt-12">
            <svg class="w-6 h-6 mx-auto text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
        </div>
    </div>
</div>

<!-- Quiz Section -->
<div id="quiz-section" class="hidden relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
    <div class="glass-card rounded-3xl shadow-2xl p-6 sm:p-12 max-w-4xl w-full">
        
        <!-- Progress Bar -->
        <div class="mb-12">
            <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-medium text-slate-400">
                    <span id="current-question" class="text-blue-400 text-lg font-bold">1</span>
                    <span class="text-slate-600 mx-2">/</span>
                    <span id="total-questions">3</span>
                </span>
                <span class="text-sm font-medium text-blue-400">
                    <span id="progress-percent">0</span>%
                </span>
            </div>
            <div class="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                <div id="progress-bar" class="progress-glow h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500" style="width: 0%"></div>
            </div>
        </div>

        <!-- Questions Container -->
        <div id="questions-wrapper" class="min-h-[400px]">
            {% for question in site.data.QuizData %}
            <div class="question-step {% unless forloop.first %}hidden{% endunless %}" data-step="{{ forloop.index0 }}" data-variable="{{ question.variable }}">
                
                <!-- Question Content -->
                <div class="mb-16">
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {{ question.text }}
                    </h2>
                    <p class="text-lg sm:text-xl text-slate-400 leading-relaxed">
                        {{ question.description }}
                    </p>
                </div>

                <!-- Slider Section -->
                <div class="mb-16">
                    <!-- Slider -->
                    <div class="mb-8">
                        <input type="range" min="-3" max="3" step="1" value="0" 
                               class="slider w-full mb-12">
                    </div>
                    
                    <!-- Labels and Value Display -->
                    <div class="flex items-center justify-between gap-4 mb-8">
                        <span class="text-sm sm:text-base font-medium text-slate-400 text-left flex-1">
                            {{ question.labelLeft }}
                        </span>
                        <div class="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl">
                            <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" id="val-{{ forloop.index0 }}">
                                0
                            </span>
                        </div>
                        <span class="text-sm sm:text-base font-medium text-slate-400 text-right flex-1">
                            {{ question.labelRight }}
                        </span>
                    </div>

                    <!-- Scale Markers -->
                    <div class="flex justify-between text-xs text-slate-600">
                        <span>-3</span>
                        <span>-2</span>
                        <span>-1</span>
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                </div>

                <!-- Navigation -->
                <div class="flex gap-4">
                    {% unless forloop.first %}
                    <button onclick="prevStep({{ forloop.index0 }})" class="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 font-semibold rounded-xl border border-slate-700/50 transition-all">
                        Previous
                    </button>
                    {% endunless %}
                    
                    <button onclick="{% if forloop.last %}calculateResults(){% else %}nextStep({{ forloop.index0 }}){% endif %}" class="btn-glow flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all">
                        {% if forloop.last %}
                        View Results
                        {% else %}
                        Continue
                        {% endif %}
                    </button>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</div>

<!-- Results Section -->
<div id="results-section" class="hidden relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 py-20">
    <div class="max-w-7xl w-full">
        
        <!-- Header -->
        <div class="text-center mb-16 fade-in">
            <span class="inline-block px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 rounded-full border border-green-500/30 mb-6">
                Analysis Complete
            </span>
            <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Your Matches
                </span>
            </h2>
            <p class="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
                Based on comprehensive analysis of your preferences and requirements
            </p>
        </div>

        <!-- Featured Result (Top Match) -->
        <div id="featured-result" class="mb-12">
            <!-- Will be populated by JavaScript -->
        </div>

        <!-- Secondary Results Grid -->
        <div id="secondary-results" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Will be populated by JavaScript -->
        </div>

        <!-- Action Button -->
        <div class="text-center mt-16 fade-in">
            <button onclick="location.reload()" class="btn-glow px-10 py-5 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold rounded-xl transition-all border border-slate-600/50">
                <span class="flex items-center gap-3">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Restart Analysis
                </span>
            </button>
        </div>
    </div>
</div>

<script>
    // Inject Distro data
    const distroData = {{ site.data.Distros.distros | jsonify }};
</script>