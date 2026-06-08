import { buildLegend } from "./modules/legend.js";
import { buildTile   } from "./modules/tile.js";
import { buildModal  } from "./modules/modal.js";

const root      = document.getElementById("periodic-table-app");
const gradients = {          //  exactly the same colors you used in React
  "alkali-metal"    : ["#F75594","#F76755"],
  "alkaline-earth"  : ["#F78F55","#F7B855"],
  "transition-metal": ["#00FF97","#00FFD6"],
  "post-transition" : ["#00E8FF","#00A8FF"],
  "metalloid"       : ["#52D6FF","#52ABFF"],
  "nonmetal"        : ["#5280FF","#5255FF"],
  "halogen"         : ["#7A52FF","#7952F5"],
  "noble-gas"       : ["#A252F5","#CA52F5"],
  "lanthanide"      : ["#81FE38","#50FE38"],
  "actinide"        : ["#F7B855","#F78F55"],
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
root.appendChild(legend);

// -------------------------------------------------------------------
// 3.  Grid      (period / group labels + tiles)
// -------------------------------------------------------------------
const grid = document.createElement("div");
grid.className = "grid";
root.appendChild(grid);

const groupLabels  = ["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII"];
const periodLabels = [1,2,3,4,5,6,7];

// empty corner
grid.appendChild(document.createElement("div"));

// group labels
groupLabels.slice(1).forEach(lbl=>{
  const d = document.createElement("div");d.className="group-label";d.textContent=lbl;grid.appendChild(d);
});

// fetch data -> draw tiles
fetch("elements.json").then(r=>r.json()).then(elements=>{
  // period labels
  periodLabels.forEach(p => {
    const d = document.createElement("div");
    d.className = "period-label";
    d.textContent = p;
    d.style.gridColumn = 1;
    d.style.gridRow = p + 1;
    grid.appendChild(d);
  });

  // finally place tiles at their absolute position using CSS Grid coordinates
  elements.forEach(el=>{
    const tile = buildTile(el, gradients, openModal);
    tile.style.gridColumn = el.gridCol + 1; // +1 because of label col
    tile.style.gridRow    = el.gridRow + 1; // +1 because of label row
    grid.appendChild(tile);
  });
});

// -------------------------------------------------------------------
// 4.  Modal (appended once, then re-used)
// -------------------------------------------------------------------
const modal = buildModal();
document.body.appendChild(modal);
function openModal(el){ modal.render(el,gradients) }