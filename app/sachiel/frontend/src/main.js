import './style.css';
import './app.css';
import { SaveFile } from '../wailsjs/go/main/App'

const editor = document.getElementById("editor")

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault()
    SaveFile(editor.value).then(() => {
      console.log("Saved successfully!")
    })
  }
})

