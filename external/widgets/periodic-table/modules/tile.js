export function buildTile(el, gradients, onClick) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.category = el.category;

  // dynamic background
  const [c1, c2] = gradients[el.category];
  tile.style.background = `linear-gradient(135deg,${c1}33 0%,${c2}33 100%)`; // 20% opacity hex
  
  // flowing overlay
  const overlay = document.createElement("div");
  overlay.className = "tile-overlay";
  overlay.style.background = `linear-gradient(${el.gridCol * 20 + el.gridRow * 10}deg, 
      rgba(20, 181, 255, 0.4), 
      rgba(82, 128, 255, 0.3), 
      rgba(121, 82, 245, 0.4))`;
  tile.appendChild(overlay);

  tile.innerHTML += `
      <span class="tile-number">${el.number}</span>
      <span class="tile-symbol" style="background: linear-gradient(135deg, ${c1}, ${c2}); -webkit-background-clip: text; color: transparent;">${el.symbol}</span>
      <span class="tile-mass">${el.mass}</span>
  `;
  tile.onclick = () => onClick(el);
  return tile;
}