fetch("elements.json")
  .then(response => response.json())
  .then(elements => {
      buildPeriodicTable(elements);
  });

function buildPeriodicTable(elements) {
    const container =
        document.getElementById("periodic-table");
    elements.forEach(element => {
        const tile =
            document.createElement("div");
        tile.className = "element";
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