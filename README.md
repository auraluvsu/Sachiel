# ✨ Sachiel — The Minimalist Text Editor

> “Write in flow.”

Sachiel is a lightweight, distraction-free desktop text editor designed for writers, thinkers, and developers who crave **elegance without clutter**.  
It’s built with **Go (Wails)** and **HTML/CSS/JS**, blending native performance with a modern, animated interface.

---

## 🕊️ Philosophy

Most editors overwhelm you with options.  
Sachiel does the opposite — it greets you with silence and simplicity.  
Launch it, and you’re already writing.

No tabs.  
No toolbars.  
Just your thoughts — and a touch of gold.

---

## ⚙️ Features

### Core
- 📝 **Instant startup** — loads directly into a blank document.  
- 💾 **Autosave** — content is automatically saved 2 seconds after you stop typing.  
- ✅ **Manual save** — `Ctrl+S` for instant save feedback with a glowing checkmark indicator.  
- 🎨 **Three themes (coming soon)** — light, dark, and frosted glass.  
- 🔤 **Comfortaa font** — minimalist, geometric, easy on the eyes.  

### Aesthetic touches
- ✍️ **Calligraphic splash screen** — your app name writes itself in golden light.  
- 🌫️ **Dust disintegration effect** — the intro dissolves into particles before fading into your workspace.  
- 🌟 **Golden border glow** — subtle breathing animation around the text area.  
- 🪶 **Focus mode** — no distractions, no UI noise.

---

## 🧩 Tech Stack

| Layer | Technology | Description |
|-------|-------------|--------------|
| 🧠 Logic | **Go (Wails)** | Native desktop runtime for fast builds and cross-platform support. |
| 🎨 Frontend | **HTML, CSS, JS** | Lightweight UI layer for the editor and splash animations. |
| 💌 Persistence | **Go File System** | Files are saved locally using the Wails backend (`SaveFile` binding). |
| 🔆 Animations | **Canvas / SVG / CSS** | Hand-written calligraphy effect, particle disintegration, and border glow. |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have:
- **Go** ≥ 1.22  
- **Node.js** ≥ 18  
- **Wails CLI** installed  
  ```bash
  go install github.com/wailsapp/wails/v2/cmd/wails@latest

