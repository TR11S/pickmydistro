---
layout: default
title: Home
---

<div id="hero-section" class="flex flex-col items-center justify-center min-h-screen text-center px-4">
    <div class="space-y-6 max-w-2xl">
        <span class="px-3 py-1 text-xs font-mono text-zinc-400 border border-zinc-800 rounded-full uppercase tracking-widest">
            System Selector v1.0
        </span>
        <h1 class="text-6xl md:text-7xl font-bold tracking-tight text-white">
            SELECT YOUR <br />
            <span class="text-zinc-500">DISTRIBUTION</span>
        </h1>
        <p class="text-xl text-zinc-400 font-light max-w-lg mx-auto">
            Initialize the compatibility algorithm to match your hardware and workflow requirements.
        </p>
        <button onclick="startQuiz()" class="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-black transition-all duration-200 bg-white font-mono hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black">
            <span>> EXECUTE_INIT</span>
            <div class="absolute inset-0 border-2 border-white translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
        </button>
    </div>
</div>

<div id="quiz-section" class="hidden flex-col items-center justify-center min-h-screen p-4">
    <div id="question-container" class="bg-black p-10 border border-zinc-800 max-w-2xl w-full relative">
        <div class="absolute top-0 left-0 w-2 h-2 bg-white"></div>
        <div class="absolute top-0 right-0 w-2 h-2 bg-white"></div>
        <div class="absolute bottom-0 left-0 w-2 h-2 bg-white"></div>
        <div class="absolute bottom-0 right-0 w-2 h-2 bg-white"></div>

        <div id="questions-wrapper">
            {% for question in site.data.QuizData %}
            <div class="question-step {% unless forloop.first %}hidden{% endunless %}" data-step="{{ forloop.index0 }}" data-variable="{{ question.variable }}">
                
                <div class="flex justify-between items-end mb-8 border-b border-zinc-900 pb-4">
                    <span class="font-mono text-zinc-500 text-sm">0{{ forloop.index }} / 0{{ forloop.length }}</span>
                    <span class="font-mono text-zinc-500 text-xs uppercase tracking-widest">Input Parameter</span>
                </div>

                <h2 class="text-3xl font-bold text-white mb-2">{{ question.text }}</h2>
                <p class="text-zinc-400 mb-12 font-light">{{ question.description }}</p>
                
                <div class="px-2 py-6">
                    <input type="range" min="-3" max="3" step="1" value="0" 
                           class="slider mb-8">
                    
                    <div class="flex justify-between items-center font-mono text-xs uppercase tracking-wider text-zinc-500">
                        <span class="w-1/3 text-left">{{ question.labelLeft }}</span>
                        <div class="w-1/3 text-center">
                            <span class="inline-block px-3 py-1 border border-zinc-800 text-white" id="val-{{ forloop.index0 }}">0</span>
                        </div>
                        <span class="w-1/3 text-right">{{ question.labelRight }}</span>
                    </div>
                </div>

                <div class="mt-16 flex justify-end">
                    {% if forloop.last %}
                    <button onclick="calculateResults()" class="px-8 py-3 bg-white text-black font-mono text-sm font-bold hover:bg-zinc-200 transition">
                        COMPILE RESULTS
                    </button>
                    {% else %}
                    <button onclick="nextStep({{ forloop.index0 }})" class="px-8 py-3 bg-zinc-900 text-white border border-zinc-800 font-mono text-sm hover:border-zinc-600 transition">
                        CONFIRM_SELECTION
                    </button>
                    {% endif %}
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</div>

<div id="results-section" class="hidden flex-col items-center justify-center min-h-screen p-4">
    <div class="bg-black border border-zinc-800 max-w-lg w-full text-center relative p-12">
        <div class="absolute inset-0 bg-linear-to-b from-zinc-900/20 to-transparent pointer-events-none"></div>
        
        <div class="mb-8">
            <span class="font-mono text-xs text-green-500 border border-green-900 bg-green-900/20 px-2 py-1">
                ● MATCH FOUND
            </span>
        </div>
        
        <h1 id="distro-name" class="text-6xl font-black text-white mb-6 tracking-tighter uppercase">...</h1>
        <p id="distro-desc" class="text-zinc-400 mb-10 text-lg font-light leading-relaxed"></p>
        
        <div class="grid gap-4">
            <a id="distro-link" href="#" target="_blank" class="block w-full py-4 bg-white text-black font-bold font-mono hover:bg-zinc-200 transition">
                INITIATE_DOWNLOAD
            </a>
            <button onclick="location.reload()" class="block w-full py-4 bg-black border border-zinc-800 text-zinc-400 font-mono text-xs hover:text-white hover:border-white transition">
                RESET_SYSTEM
            </button>
        </div>
    </div>
</div>

<script>
    // Inject Distro data
    const distroData = {{ site.data.Distros.distros | jsonify }};
</script>