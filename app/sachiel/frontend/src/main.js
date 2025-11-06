import './style.css';
import { SaveFile } from "../wailsjs/go/main/App.js";

const editor = document.getElementById("editor");
const saveIndicator = document.getElementById("saveIndicator");

let saveTimeout = null;
let lastSavedContent = "";

// fade-in/out animation
function showSaveIndicator() {
   // reset animation by removing and re-adding class
  saveIndicator.classList.remove("active");
  void saveIndicator.offsetWidth; // forces reflow so CSS restarts
  saveIndicator.classList.add("active");
}

window.addEventListener("load", () => {
  const splash = document.querySelector(".splash-screen");
  const app = document.querySelector(".app-container");
  const canvas = document.getElementById("logoCanvas");
  const ctx = canvas.getContext("2d");

  // wait for the SVG to finish (≈3 s) then grab it
  setTimeout(() => {
    const svg = document.getElementById("svgLogo");
    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svg64 = btoa(unescape(encodeURIComponent(xml))); // safer encoding
    img.src = "data:image/svg+xml;base64," + svg64;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      svg.remove();              // hide stroke version
      createAndAnimateParticles(window.innerWidth/2, window.innerHeight/2);
    };
  }, 3000);


  // High DPI fix
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Wait for font before drawing
  document.fonts.ready.then(() => {
    console.log("Font loaded, drawing...");
  });

  function createAndAnimateParticles(centerX, centerY) {
    // Grab current text pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const particles = [];

    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const i = (y * canvas.width + x) * 4;
        const alpha = imageData.data[i + 3];
        if (alpha > 128) {
          particles.push({
            x: x,
            y: y,
            speedX: (Math.random() - 0.5) * 10,
            speedY: (Math.random() - 1.2) * 8,
            size: Math.random() * 2 + 1,
            alpha: 1,
            color: `rgba(230,197,80,${Math.random() * 0.8 + 0.2})`,
          });
        }
      }
    }

    // Clear original text after capture
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animateParticles(particles);
  }

  function animateParticles(particles) {
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.08; // gravity
        p.alpha -= 0.015;

        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color.replace(")", `,${p.alpha})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (particles.some((p) => p.alpha > 0)) {
        requestAnimationFrame(animate);
      } else {
        endSplash();
      }
    }

    animate();
  }

  function endSplash() {
    splash.style.transition = "opacity 1.5s ease";
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = "none";
      app.classList.add("visible");
    }, 1500);
  }
});

// manual save (Ctrl+S)
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    triggerSave();
  }
});

// autosave when typing stops
editor.addEventListener("input", () => {
  // clear previous timer
  if (saveTimeout) clearTimeout(saveTimeout);

  // start new timer (3 seconds of inactivity)
  saveTimeout = setTimeout(() => {
    // only save if text actually changed
    if (editor.value !== lastSavedContent) {
      triggerSave();
    }
  }, 2000);
});

function triggerSave() {
  const content = editor.value;

  SaveFile(content)
    .then(() => {
      lastSavedContent = content;
      console.log("✅ Autosaved");
      showSaveIndicator();
    })
    .catch(console.error);
}

