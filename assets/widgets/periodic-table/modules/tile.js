export function buildTile(el, gradients, onClick) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.category = el.category;

  // dynamic background
  const [c1, c2] = gradients[el.category];
  tile.style.background = `linear-gradient(135deg,${c1} 0%,${c2} 100%)`;
  tile.style.backgroundSize = "200% 200%";

  // flowing overlay
  tile.style.setProperty("animation","hue 12s infinite linear");
  tile.innerHTML = `
      <span class="tile-number">${el.number}</span>
      <span class="tile-symbol">${el.symbol}</span>
      <span class="tile-mass">${el.mass}</span>
  `;
  tile.onclick = () => onClick(el);
  return tile;
}