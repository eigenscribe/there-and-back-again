let allElements = [];

fetch("elements.json")
  .then(response => response.json())
  .then(elements => {
      allElements = elements;
      buildPeriodicTable(elements);
  });

document.getElementById("interpretation-select").addEventListener("change", (e) => {
    buildPeriodicTable(allElements, e.target.value);
});

function buildPeriodicTable(elements, interpretation = "family") {
    const container = document.getElementById("periodic-table");
    container.innerHTML = ""; // Clear existing

    elements.forEach(element => {
        const tile = document.createElement("div");
        tile.className = `element ${element.family}`;
        tile.style.gridColumn = element.group;
        tile.style.gridRow = element.period;

        if (interpretation !== "family") {
            const val = element[interpretation];
            if (interpretation === "electronegativity") {
                // Scale 0 to 4.0
                const intensity = (val / 4.0) * 100;
                tile.style.background = `hsl(200, 100%, ${100 - intensity/2}%)`;
                tile.style.color = intensity > 60 ? "black" : "white";
            } else if (interpretation === "atomicRadius") {
                // Scale 30 to 300
                const intensity = ((val - 30) / 270) * 100;
                tile.style.background = `hsl(300, 100%, ${100 - intensity/2}%)`;
                tile.style.color = intensity > 60 ? "black" : "white";
            }
        } else {
            tile.style.background = ""; // Use CSS classes
            tile.style.color = "";
        }

        tile.innerHTML = `
            <div class="atomic-number">
                ${element.atomicNumber}
            </div>

            <div class="symbol">
                ${element.symbol}
            </div>

            <div class="name">
                ${element.name}
            </div>
        `;
        container.appendChild(tile);
    });
}