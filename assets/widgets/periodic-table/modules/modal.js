export function buildModal() {
  const overlay = document.createElement("div");
  overlay.id = "modal";

  const box = document.createElement("div");
  box.className = "modal-box";
  overlay.appendChild(box);

  const close = document.createElement("div");
  close.id = "close-btn";
  close.textContent = "×";
  close.onclick = () => overlay.classList.remove("open");
  box.appendChild(close);

  // everything else is injected later
  overlay.render = (el, gradients) => {
    const [c1, c2] = gradients[el.category];
    box.style.background = `linear-gradient(135deg,${c1}33, ${c2}33)`; // 20% opacity
    box.innerHTML = `
        <div id="close-btn">×</div>
        <div style="text-align: center; margin-bottom: 0.3rem;">
          <h3 style="background: linear-gradient(135deg, ${c1}, ${c2}); -webkit-background-clip: text; color: transparent;">${el.symbol}</h3>
          <h4>${el.name}</h4>
          <div style="font-size: 0.75rem; color: #fff; opacity: 0.9;">Atomic Number: ${el.number}</div>
        </div>
        <div class="modal-grid">
          <div class="modal-item"><strong>Atomic mass</strong><br>${el.mass}</div>
          <div class="modal-item"><strong>Category</strong><br>${el.category.replace("-"," ")}</div>
          ${el.electronConfig ? `<div class="modal-item" style="grid-column:1/3"><strong>Electron configuration</strong><br><code style="font-family: 'Fira Code', monospace; font-size: 0.75rem;">${el.electronConfig}</code></div>` : ""}
          ${el.description ? `<div class="modal-item" style="grid-column:1/3; font-size: 0.75rem; line-height: 1.3;">${el.description}</div>` : ""}
        </div>
    `;
    box.querySelector("#close-btn").onclick = close.onclick; // re-bind
    overlay.classList.add("open");
  };
  return overlay;
}