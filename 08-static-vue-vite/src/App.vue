<template>
  <main class="app">
    <div class="card">
      <div class="logo">⚡</div>
      <h1>Vue 3 + Vite Static Demo</h1>
      <p class="subtitle">Deployed as a <strong>Static Site</strong> on ServerAutomation</p>

      <div class="counter-box">
        <p class="counter-label">Interactive Counter</p>
        <div class="counter-controls">
          <button @click="count--" class="btn btn-minus">−</button>
          <span class="counter-value">{{ count }}</span>
          <button @click="count++" class="btn btn-plus">+</button>
        </div>
      </div>

      <div class="facts">
        <div v-for="fact in facts" :key="fact.icon" class="fact-item">
          <span class="fact-icon">{{ fact.icon }}</span>
          <span>{{ fact.text }}</span>
        </div>
      </div>

      <div class="badge">Powered by ServerAutomation</div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
const facts = [
  { icon: '📦', text: 'Built with Vite — blazing fast HMR and bundling' },
  { icon: '🟢', text: 'Vue 3 Composition API with reactive state' },
  { icon: '☁️', text: 'Deployed as static HTML/CSS/JS — no server needed' },
  { icon: '🚀', text: 'Served from S3-compatible storage via reverse proxy' },
];
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.app { width: 100%; display: flex; justify-content: center; }

.card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 3rem;
  max-width: 560px;
  width: 100%;
  color: #fff;
  text-align: center;
}

.logo { font-size: 3rem; margin-bottom: 1rem; }
h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 0.5rem; }
.subtitle { color: #8892b0; margin-bottom: 2rem; }
.subtitle strong { color: #42b883; }

.counter-box {
  background: rgba(66,184,131,0.1);
  border: 1px solid rgba(66,184,131,0.3);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}
.counter-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #8892b0; margin-bottom: 1rem; }
.counter-controls { display: flex; align-items: center; justify-content: center; gap: 1.5rem; }
.counter-value { font-size: 2.5rem; font-weight: 700; color: #42b883; min-width: 60px; }

.btn {
  width: 44px; height: 44px; border-radius: 50%; border: none; cursor: pointer;
  font-size: 1.5rem; font-weight: bold; transition: transform 0.15s, background 0.15s;
  display: flex; align-items: center; justify-content: center;
}
.btn:active { transform: scale(0.9); }
.btn-minus { background: rgba(255,100,100,0.2); color: #ff6464; }
.btn-plus  { background: rgba(66,184,131,0.2); color: #42b883; }
.btn:hover { filter: brightness(1.3); }

.facts { text-align: left; margin-bottom: 2rem; }
.fact-item {
  display: flex; align-items: flex-start; gap: 0.75rem;
  padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.06);
  color: #ccd6f6; font-size: 0.95rem;
}
.fact-icon { font-size: 1.2rem; }

.badge {
  background: linear-gradient(135deg, #42b883, #347d5f);
  border-radius: 50px; padding: 0.5rem 1.5rem;
  font-size: 0.85rem; font-weight: 600; letter-spacing: 0.5px;
}
</style>
