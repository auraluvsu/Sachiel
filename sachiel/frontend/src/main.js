import { SaveFile } from "../wailsjs/go/main/App.js";

const editor = document.getElementById("editor");
const saveIndicator = document.getElementById("saveIndicator");
let saveTimeout = null;
let lastSavedContent = "";

// --- Splash Animation ---
window.addEventListener("DOMContentLoaded", () => {
  const splash = document.querySelector(".splash-screen");
  const app = document.querySelector(".app-container");
  const canvas = document.getElementById("logoCanvas");
  const ctx = canvas.getContext("2d");

  // High DPI scaling fix
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Once splash animation finishes, fade out and show editor
  const startFade = () => {
    splash.style.transition = "opacity 1.5s ease";
    splash.style.opacity = 0;

    setTimeout(() => {
      splash.classList.add("hidden");
      app.classList.add("visible");
      console.log("✅ Splash ended, app visible");
    }, 1500);
  };

  // Wait for animation frames to complete before fading
  requestAnimationFrame(() => {
    setTimeout(startFade, 4500); // slightly longer wait for webview render delay
  });

  // ⏱️ Fallback: always force visible after 8s
  setTimeout(() => {
    if (!app.classList.contains("visible")) {
      console.warn("⚠️ Fallback triggered — forcing app visible");
      splash.classList.add("hidden");
      app.classList.add("visible");
    }
  }, 8000);
});

// --- Save indicator animation ---
function showSaveIndicator() {
  saveIndicator.classList.remove("active");
  void saveIndicator.offsetWidth; // restart animation
  saveIndicator.classList.add("active");
}

// --- Autosave after typing ---
editor.addEventListener("input", () => {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    if (editor.value !== lastSavedContent) triggerSave();
  }, 2000);
});

// --- Manual save (Ctrl+S) ---
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    triggerSave();
  }
});

// --- Save file handler ---
function triggerSave() {
  const content = editor.value;
  SaveFile(content)
    .then(() => {
      lastSavedContent = content;
      console.log("✅ Saved");
      showSaveIndicator();
    })
    .catch(console.error);
}

