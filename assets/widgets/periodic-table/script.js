import { buildLegend } from "./modules/legend.js";
import { buildTile   } from "./modules/tile.js";
import { buildModal  } from "./modules/modal.js";

const root      = document.getElementById("periodic-table-app");
console.log("Periodic Table App v1.0.1 loaded");

// -------------------------------------------------------------------
// 0.  Header
// -------------------------------------------------------------------
const header = document.createElement("div");
header.className = "header";
header.style.textAlign = "center";
header.innerHTML = `
    <h1>Periodic Table</h1>
    <h2>Cosmic Elements Explorer</h2>
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
// 3.  Grid      (period / group labels + tiles)
// -------------------------------------------------------------------
const grid = document.createElement("div");
grid.className = "grid";
root.appendChild(grid);
grid.appendChild(legend); // Append legend inside the grid

// Auto-scale if in a narrow container (like the sidebar)
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    const width = entry.contentRect.width;
      // 19 columns * tile-size. Base width should match the natural width of the grid.
    // In style.css, tile-size is up to 40px. 19 * 40 = 760. plus gaps and labels.
    const BASE_WIDTH = 860; 
    const isSidebar = entry.target.closest('.ptx-sidebar-right') !== null || window.innerWidth < 900;
    
    if (width < BASE_WIDTH && width > 0) {
      const scale = width / BASE_WIDTH;
      root.style.transform = `scale(${scale})`;
      root.style.transformOrigin = "top left";
      root.style.width = (100 / scale) + "%";
      root.style.height = "auto";
      root.style.marginLeft = "0";
      root.style.left = "0";
      root.style.display = "flex";
      root.style.flexDirection = "column";
      root.style.alignItems = "flex-start";
      root.style.justifyContent = "flex-start";
      root.style.minHeight = "fit-content";
      
      const legend = root.querySelector('.legend');
      if (legend) {
        legend.style.padding = "0 20px";
        legend.style.width = "100%";
        legend.style.justifyContent = "center";
      }
      
      // Hide title if very small to save space
      const h1 = root.querySelector('h1');
      if (h1) h1.style.display = (width < 400 || isSidebar) ? 'none' : 'block';
      const h2 = root.querySelector('h2');
      if (h2) h2.style.display = (width < 400 || isSidebar) ? 'none' : 'block';
    } else {
      root.style.transform = "none";
      root.style.width = "100%";
      root.style.height = "auto";
      root.style.marginLeft = "0";
      root.style.left = "0";
      root.style.display = "flex";
      root.style.flexDirection = "column";
      root.style.alignItems = "center";
      root.style.minHeight = "fit-content";
      const legend = root.querySelector('.legend');
      if (legend) {
        legend.style.padding = "0";
        legend.style.width = "auto";
        legend.style.justifyContent = "center";
      }
      const h1 = root.querySelector('h1');
      if (h1) h1.style.display = 'block';
      const h2 = root.querySelector('h2');
      if (h2) h2.style.display = 'block';
    }
  }
});
resizeObserver.observe(document.body);

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
      const tile = buildTile(el, gradients, openModal);
      tile.style.gridColumn = el.gridCol + 1; // +1 because of label col
      tile.style.gridRow = el.gridRow + 2; // +2 because of header and label row
      grid.appendChild(tile);
    });
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
// 4.  Modal (appended once, then re-used)
// -------------------------------------------------------------------
const modal = buildModal();
document.body.appendChild(modal);
function openModal(el){ modal.render(el,gradients) }