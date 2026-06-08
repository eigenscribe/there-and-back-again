export function buildTile(el, gradients, onClick) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.category = el.category;

  // dynamic background
  const [c1, c2] = gradients[el.category];
  // Using higher alpha (AA = 67% or CC = 80%) and adding a white tint for lightness
  tile.style.background = `linear-gradient(135deg, ${c1}cc, 61.8%, ${c2}cc), rgba(255,255,255,0.2)`;
  
  const overlay = document.createElement("div");
  overlay.className = "tile-overlay";
  overlay.style.background = `linear-gradient(${el.gridCol * 20 + el.gridRow * 10}deg, 
      rgba(20, 181, 255, 0.4) 0%, 
      rgba(82, 128, 255, 0.3) 61.8%, 
      rgba(121, 82, 245, 0.4) 100%)`;
  
  tile.innerHTML = `
      <span class="tile-number">${el.number}</span>
      <span class="tile-symbol">${el.symbol}</span>
      <span class="tile-mass">${el.mass}</span>
  `;
  tile.appendChild(overlay);
  tile.onclick = () => onClick(el);
  return tile;
}