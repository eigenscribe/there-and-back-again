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
    box.style.background = `linear-gradient(135deg,${gradients[el.category].join(",")})`;
    box.innerHTML = `
        <div id="close-btn">×</div>
        <h3>${el.symbol}</h3>
        <h4>${el.name}</h4>
        <div>Atomic Number : ${el.number}</div>
        <div class="modal-grid">
          <div class="modal-item"><strong>Atomic mass</strong><br>${el.mass}</div>
          <div class="modal-item"><strong>Category</strong><br>${el.category.replace("-"," ")}</div>
          ${el.electronConfig ? `<div class="modal-item" style="grid-column:1/3"><strong>Electron configuration</strong><br>${el.electronConfig}</div>` : ""}
          ${el.description ? `<div class="modal-item" style="grid-column:1/3">${el.description}</div>` : ""}
        </div>
    `;
    box.querySelector("#close-btn").onclick = close.onclick; // re-bind
    overlay.classList.add("open");
  };
  return overlay;
}