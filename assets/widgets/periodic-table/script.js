import { buildLegend } from "./modules/legend.js";
import { buildTile   } from "./modules/tile.js";
import { buildSelectionToggle } from "./modules/selection-toggle.js";

const root      = document.getElementById("periodic-table-app");
console.log("Periodic Table App v1.0.4 loaded");

// -------------------------------------------------------------------
// 0.  Header
// -------------------------------------------------------------------
const header = document.createElement("div");
header.className = "header";
header.style.textAlign = "center";
header.style.width = "100%";
header.style.zIndex = "10";
header.style.marginBottom = "0.1rem";
header.innerHTML = `
    <h1 style="margin: 0; line-height: 1.1;">Periodic Table</h1>
    <h2 style="margin: 0; line-height: 1.1;">Cosmic Elements Explorer</h2>
`;
root.appendChild(header);

const gradients = {
  "alkali-metal": ["#F75594", "#F76755"],
  "alkaline-earth": ["#F78F55", "#F7B855"],
  "transition-metal": ["#00FF97", "#00FFD6"],
  "post-transition": ["#00E8FF", "#00A8FF"],
  "metalloid": ["#52D6FF", "#52ABFF"],
  "nonmetal": ["#5280FF", "#5255FF"],
  "halogen": ["#7A52FF", "#7952F5"],
  "noble-gas": ["#A252F5", "#CA52F5"],
  "lanthanide": ["#81FE38", "#50FE38"],
  "actinide": ["#F7B855", "#F78F55"],
  "unknown": ["#AAAAAA", "#777777"]
};

// -------------------------------------------------------------------
// 2.  Legend  (hover filtering)
// -------------------------------------------------------------------
let hoveredCat = null;

const legend = buildLegend(gradients, cat => {
  hoveredCat = cat;
  document.querySelectorAll(".tile").forEach(t =>
    t.classList.toggle("dimmed", hoveredCat && t.dataset.category !== hoveredCat)
  );
});
// Note: Legend is appended to grid below

// -------------------------------------------------------------------
// 3.  Main Layout (Table)
// -------------------------------------------------------------------
const mainLayout = document.createElement("div");
mainLayout.className = "main-layout";
root.appendChild(mainLayout);

const gridContainer = document.createElement("div");
gridContainer.className = "grid-container";
mainLayout.appendChild(gridContainer);

const grid = document.createElement("div");
grid.className = "grid";
gridContainer.appendChild(grid);

// Auto-scale if in a narrow container
let resizeTimer = null;
const resizeObserver = new ResizeObserver(entries => {
  if (resizeTimer) cancelAnimationFrame(resizeTimer);
  resizeTimer = requestAnimationFrame(() => {
    for (let entry of entries) {
      const containerWidth = entry.contentRect.width;
      if (containerWidth <= 0) continue;

      // Reset styles to measure true unscaled width
      grid.style.transition = "none";
      grid.style.transform = "none";
      grid.style.marginBottom = "0";
      grid.style.width = "max-content"; // Force it to its content width for measurement

      const unscaledGridWidth = grid.offsetWidth;
      if (unscaledGridWidth <= 0) {
        grid.style.width = "";
        continue;
      }

      let scale = (containerWidth / unscaledGridWidth);
      
      // Limit scaling - scale up if needed, but don't overflow
      // Using a slightly more aggressive multiplier (1.0) to fill width, 
      // the resize observer will handle overflow if it happens.
      scale = scale * 1.0;
      scale = Math.min(scale, 3.5); 
      if (scale < 0.1) scale = 0.1;

      const currentScale = parseFloat(root.getAttribute('data-current-scale') || "0");
      if (Math.abs(currentScale - scale) < 0.005) {
          // Restore state
          grid.style.transition = "";
          grid.style.transform = currentScale ? `scale(${currentScale})` : "none";
          grid.style.width = "";
          const unscaledHeight = grid.offsetHeight;
          grid.style.marginBottom = currentScale ? `-${unscaledHeight - (unscaledHeight * currentScale)}px` : "0";
          continue;
      }

      // Apply scale
      grid.style.transition = ""; 
      grid.style.transform = `scale(${scale})`;
      grid.style.width = ""; // Reset width to allow grid layout to work correctly
      
      // Calculate scaled height
      const unscaledHeight = grid.offsetHeight;
      const scaledHeight = unscaledHeight * scale;
      
      grid.style.marginBottom = `-${unscaledHeight - scaledHeight}px`;

      root.setAttribute('data-current-scale', scale.toFixed(3));

      // Update iframe height if applicable
      if (window.frameElement) {
        requestAnimationFrame(() => {
          const totalHeight = root.scrollHeight;
          window.frameElement.style.height = (totalHeight + 300) + "px";
        });
      }
    }
  });
});

// Observe the root container for width changes
resizeObserver.observe(root);

const groupLabels  = ["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII"];
const periodLabels = [1,2,3,4,5,6,7];

grid.appendChild(document.createElement("div")); // empty corner at 1,2 (Col 1, Row 2)

// group labels
groupLabels.slice(1).forEach((lbl, index)=>{
  const d = document.createElement("div");
  d.className="group-label";
  d.textContent=lbl;
  d.style.gridColumn = index + 2; // Start from Column 2
  d.style.gridRow = 2; // Fixed row for group labels
  grid.appendChild(d);
});

// fetch data -> draw tiles
fetch("elements.json")
  .then(r => {
    if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
    return r.json();
  })
  .then(elements => {
    // period labels
    periodLabels.forEach(p => {
      const d = document.createElement("div");
      d.className = "period-label";
      d.textContent = p;
      d.style.gridColumn = 1;
      d.style.gridRow = p + 2; // +2 because of header and group row
      grid.appendChild(d);
    });

    // finally place tiles at their absolute position using CSS Grid coordinates
    elements.forEach(el => {
      const tile = buildTile(el, gradients, (clickedEl) => {
        // Show Overlay
        showOverlay(clickedEl, gradients);
        
        // Highlight selected tile
        document.querySelectorAll(".tile").forEach(t => t.classList.remove("selected"));
        const targetTile = Array.from(document.querySelectorAll(".tile")).find(t => {
           const sym = t.querySelector(".tile-symbol");
           return sym && sym.innerText === clickedEl.symbol;
        });
        if (targetTile) targetTile.classList.add("selected");
      });
      tile.style.gridColumn = el.gridCol + 1; // +1 because of label col
      tile.style.gridRow = el.gridRow + 2; // +2 because of header and label row
      grid.appendChild(tile);
    });

    // Initial scale calculation after elements are added
    setTimeout(() => {
        const rootWidth = root.offsetWidth;
        const gridWidth = grid.offsetWidth;
        if (rootWidth > 0 && gridWidth > 0) {
            let scale = (rootWidth / gridWidth);
            scale = Math.min(scale, 1.2);
            grid.style.transform = `scale(${scale})`;
            grid.style.transformOrigin = "top center";
            const scaledHeight = grid.getBoundingClientRect().height;
            grid.style.marginBottom = `-${grid.offsetHeight - scaledHeight}px`;
        }
    }, 100);

    // Create top info area (Legend)
    const legendArea = document.createElement("div");
    legendArea.className = "legend-area";
    legendArea.style.width = "100%";
    legendArea.style.display = "flex";
    legendArea.style.justifyContent = "center";
    legendArea.style.padding = "0.2rem 1rem";
    legendArea.appendChild(legend);
    root.insertBefore(legendArea, mainLayout);
  })
  .catch(err => {
    console.error("Failed to load elements:", err);
    const errorMsg = document.createElement("div");
    errorMsg.style.color = "red";
    errorMsg.style.padding = "20px";
    errorMsg.textContent = "Error loading periodic table data: " + err.message;
    root.appendChild(errorMsg);
  });

// -------------------------------------------------------------------
// 4.  Overlay Logic
// -------------------------------------------------------------------
const modal = document.getElementById("modal");

function showOverlay(el, gradients) {
  const [c1, c2] = gradients[el.category];
  const modalBox = modal.querySelector(".modal-box");
  
  modalBox.innerHTML = `
    <div id="close-btn">&times;</div>
    <div class="modal-content">
       <div class="modal-header">
          <div class="modal-symbol" style="background: linear-gradient(135deg, ${c1}, ${c2}); -webkit-background-clip: text; color: transparent;">${el.symbol}</div>
          <div class="modal-title-info">
            <h3>${el.name}</h3>
            <div class="modal-number">Atomic Number: ${el.number}</div>
          </div>
       </div>
       <div class="modal-details">
          <div class="modal-item"><strong>Mass:</strong> ${el.mass}</div>
          ${el.electronConfig ? `<div class="modal-item"><strong>Config:</strong> <code style="font-family: 'Fira Code', monospace;">${el.electronConfig}</code></div>` : ""}
          ${el.category ? `<div class="modal-item"><strong>Category:</strong> ${el.category.replace("-", " ")}</div>` : ""}
          ${el.description ? `<div class="modal-item full-width modal-description">${el.description}</div>` : ""}
       </div>
    </div>
  `;

  modal.classList.add("open");
  
  // Re-attach close event because we replaced innerHTML
  modal.querySelector("#close-btn").addEventListener("click", () => {
    modal.classList.remove("open");
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
}