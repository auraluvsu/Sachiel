import './style.css';
import { SaveFile } from '../wailsjs/go/main/App'

const editor = document.getElementById("editor")

const saveIndicator = document.getElementById("saveIndicator");

function showSaveIndicator() {
  saveIndicator.classList.remove("hidden");
  saveIndicator.classList.add("visible");

  setTimeout(() => {
    saveIndicator.classList.remove("visible");
    saveIndicator.classList.add("hidden");
  }, 1500);
}


window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault()
    // inside the save handler
    SaveFile(editor.value)
      .then(() => {
        console.log("Saved");
        showSaveIndicator();
      })
      .catch(console.error);
  }
})

