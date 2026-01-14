---
layout: default
title: Home
---

<div id="hero-section" class="flex-col items-center justify-center min-h-screen text-center">
    <h1 class="text-5xl font-bold text-blue-400">Find Your Perfect Linux Distro</h1>
    <p class="mt-4 text-xl text-slate-300">Answer a few questions to get started.</p>
    <button onclick="startQuiz()" class="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition cursor-pointer">
        Start the Quiz
    </button>
</div>

<div id="quiz-section" class="hidden flex-col items-center justify-center min-h-screen">
    <div id="question-container" class="bg-slate-900 p-8 rounded-2xl border border-slate-800 max-w-lg w-full">
        <h2 id="question-text" class="text-2xl font-bold mb-6">Loading question...</h2>
        <div id="answer-buttons" class="grid gap-4">
            </div>
    </div>
</div>


<style>
.slider::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    background: #3b82f6;
    cursor: pointer;
    border-radius: 50%;
    border: 3px solid #1e293b;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: #3b82f6;
    cursor: pointer;
    border-radius: 50%;
    border: 3px solid #1e293b;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.slider::-webkit-slider-thumb:hover {
    background: #60a5fa;
    transform: scale(1.1);
}

.slider::-moz-range-thumb:hover {
    background: #60a5fa;
    transform: scale(1.1);
}
</style>