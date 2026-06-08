export function buildLegend(categories, onHover) {
  const wrapper = document.createElement("div");
  wrapper.className = "legend";

  Object.entries(categories).forEach(([cat, gradient]) => {
    if (cat === "unknown") return;
    const btn = document.createElement("button");
    btn.textContent = cat.replace("-", " ");
    btn.style.background = `linear-gradient(90deg,${gradient[0]},61.8%,${gradient[1]})`;
    btn.addEventListener("mouseenter", () => onHover(cat));
    btn.addEventListener("mouseleave", () => onHover(null));
    wrapper.appendChild(btn);
  });
  return wrapper;
}