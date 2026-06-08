export function buildSelectionToggle() {
  const container = document.createElement("div");
  container.className = "selection-toggle";
  
  // Placeholder state
  container.innerHTML = `
    <div class="toggle-placeholder">
      <p>Select an element to see details</p>
    </div>
  `;

  container.update = (el, gradients) => {
    if (!el) {
      container.innerHTML = `
        <div class="toggle-placeholder">
          <p>Select an element to see details</p>
        </div>
      `;
      return;
    }

    const [c1, c2] = gradients[el.category];
    container.innerHTML = `
      <div class="toggle-content">
        <div class="toggle-header">
          <div class="toggle-symbol" style="background: linear-gradient(135deg, ${c1}, 61.8%, ${c2}); -webkit-background-clip: text; color: transparent;">${el.symbol}</div>
          <div class="toggle-main-info">
            <div class="toggle-name">${el.name}</div>
            <div class="toggle-number">Atomic Number: ${el.number}</div>
          </div>
        </div>
        <div class="toggle-details">
          <div class="toggle-item"><strong>Mass:</strong> ${el.mass}</div>
          ${el.electronConfig ? `<div class="toggle-item"><strong>Config:</strong> <code style="font-family: 'Fira Code', monospace;">${el.electronConfig}</code></div>` : ""}
          ${el.description ? `<div class="toggle-item full-width description">${el.description}</div>` : ""}
        </div>
      </div>
    `;
  };

  return container;
}
