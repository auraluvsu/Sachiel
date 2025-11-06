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

