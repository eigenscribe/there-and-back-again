/**
 * Graph Toggle Integration for PreTeXt
 * Canvas-based force-directed graph for smooth interactions
 */

const GRAPH_DATA_URL = 'graph/notes-graph.json';

let graphInstance = null;
let isGraphVisible = false;

console.log('Graph toggle: script loaded');

function init() {
  console.log('Graph toggle: initializing...');
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}

function setup() {
  createToggleButton();
  createGraphSidebar();
  createGraphOverlay();
}

function createGraphSidebar() {
  const ptxPage = document.querySelector('.ptx-page');
  if (!ptxPage) return;

  ptxPage.classList.add('graph-hidden');

  let sidebarRight = document.querySelector('.ptx-sidebar-right');
  if (!sidebarRight) {
    sidebarRight = document.createElement('div');
    sidebarRight.className = 'ptx-sidebar-right';
    
    // Insert sidebar at the beginning of ptx-page so it's high up
    ptxPage.prepend(sidebarRight);
  }

  // Create widget wrapper
  const widgetWrapper = document.createElement('div');
  widgetWrapper.className = 'sidebar-widget-wrapper';
  widgetWrapper.innerHTML = `
      <div id="graph-sidebar-container"></div>
  `;
  
  // Prepend the graph widget to the sidebar to ensure it's at the top
  sidebarRight.prepend(widgetWrapper);
}

function createToggleButton() {
  const navContents = document.querySelector('.ptx-navbar-contents');
  if (!navContents) {
    console.warn('Graph toggle: Navigation container not found');
    return;
  }

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'graph-toggle-btn';
  toggleBtn.className = 'button active';
  toggleBtn.innerHTML = '<span class="graph-icon">🌳</span><span class="name">Zettel Tree</span>';
  toggleBtn.title = 'Toggle Graph View';
  toggleBtn.addEventListener('click', toggleGraph);

  // Auto-align: insert after .treebuttons (Prev/Up/Next)
  const treeButtons = navContents.querySelector('.treebuttons');
  if (treeButtons) {
    treeButtons.after(toggleBtn);
  } else {
    navContents.appendChild(toggleBtn);
  }
}

function createGraphOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'graph-overlay';
  overlay.innerHTML = `
    <button id="graph-close-btn">← Back to Document</button>
    <div id="graph-container"></div>
  `;
  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('#graph-close-btn');
  closeBtn.addEventListener('click', hideGraph);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isGraphVisible) {
      hideGraph();
    }
  });
}

async function toggleGraph() {
  const ptxPage = document.querySelector('.ptx-page');
  if (ptxPage) {
    if (isGraphVisible) {
      hideGraphSidebar();
    } else {
      await showGraphSidebar();
    }
  } else {
    if (isGraphVisible) {
      hideGraph();
    } else {
      await showGraph();
    }
  }
}

async function showGraphSidebar() {
  console.log('Graph toggle: showGraphSidebar called');
  const ptxPage = document.querySelector('.ptx-page');
  const container = document.getElementById('graph-sidebar-container');
  if (!ptxPage || !container) return;

  ptxPage.classList.remove('graph-hidden');
  isGraphVisible = true;
  document.getElementById('graph-toggle-btn').classList.add('active');

  if (!graphInstance) {
    console.log('Graph toggle: initializing graph in sidebar...');
    await initializeGraph('graph-sidebar-container');
  }
}

function hideGraphSidebar() {
  const ptxPage = document.querySelector('.ptx-page');
  if (!ptxPage) return;

  ptxPage.classList.add('graph-hidden');
  isGraphVisible = false;
  document.getElementById('graph-toggle-btn').classList.remove('active');
}

async function showGraph() {
  console.log('Graph toggle: showGraph called');
  const overlay = document.getElementById('graph-overlay');
  if (!overlay) {
    console.error('Graph toggle: overlay element not found!');
    return;
  }

  console.log('Graph toggle: showing overlay');
  overlay.style.display = 'block';
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });
  
  isGraphVisible = true;
  document.body.style.overflow = 'hidden';

  if (!graphInstance) {
    console.log('Graph toggle: initializing graph...');
    await initializeGraph();
  }
}

function hideGraph() {
  const overlay = document.getElementById('graph-overlay');
  if (!overlay) return;

  overlay.classList.remove('visible');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
  
  isGraphVisible = false;
  document.body.style.overflow = '';
}

async function initializeGraph(containerId = 'graph-container') {
  try {
    if (typeof d3 === 'undefined') {
      throw new Error('D3 library not loaded');
    }
    const container = document.getElementById(containerId);
    if (!container) return;

    const response = await fetch(GRAPH_DATA_URL);
    if (!response.ok) throw new Error(`Failed to load graph data: ${response.status}`);
    const data = await response.json();

    graphInstance = createCanvasGraph(d3, container, data);
  } catch (error) {
    console.error('Error initializing graph:', error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<div style="color: #ff6b6b; padding: 40px; text-align: center;">
        <h3>Failed to load graph</h3>
        <p>${error.message}</p>
      </div>`;
    }
  }
}

function createCanvasGraph(d3, container, data) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  container.innerHTML = '';

  const title = document.createElement('div');
  title.id = 'graph-title';
  title.className = 'graph-title';
  title.textContent = 'There and Back Again Zettel Tree';
  
  // Apply TOC title styling
  title.style.position = 'absolute';
  title.style.top = '20px';
  title.style.left = '50%';
  title.style.transform = 'translateX(-50%)';
  title.style.fontFamily = "'Aclonica', sans-serif";
  title.style.fontSize = "1.1rem";
  title.style.fontWeight = "bold";
  title.style.background = "linear-gradient(130deg, #3b82f6, #8b5cf6, #d946ef)";
  title.style.webkitBackgroundClip = "text";
  title.style.backgroundClip = "text";
  title.style.webkitTextFillColor = "transparent";
  title.style.textShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
  title.style.whiteSpace = "normal";
  title.style.maxWidth = "300px";
  title.style.lineHeight = "1.2";
  title.style.textAlign = "center";
  title.style.zIndex = '100';
  title.style.pointerEvents = "none";
  title.style.opacity = "0.7";
  title.style.transition = "opacity 0.3s ease";
  container.appendChild(title);

  const controls = document.createElement('div');
  controls.id = 'graph-controls';
  controls.className = 'graph-controls';
  controls.style.position = 'absolute';
  controls.style.top = '20px';
  controls.style.right = '20px';
  controls.style.display = 'flex';
  controls.style.flexDirection = 'column';
  controls.style.gap = '8px';
  controls.style.pointerEvents = 'auto';
  controls.style.zIndex = '100';

  controls.innerHTML = `
    <button class="graph-btn zoom-in" title="Zoom In">+</button>
    <button class="graph-btn zoom-out" title="Zoom Out">−</button>
    <button class="graph-btn zoom-reset" title="Reset View">⟲</button>
    <button class="graph-btn zoom-fit" title="Full Size">⛶</button>
  `;
  container.appendChild(controls);

  const tooltip = document.createElement('div');
  tooltip.className = 'graph-tooltip hidden';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.position = 'fixed';
  tooltip.style.zIndex = '10002';
  container.appendChild(tooltip);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  const { nodes, links } = data;
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const processedLinks = links
    .filter(l => nodeMap.has(l.source) && nodeMap.has(l.target))
    .map(l => ({ ...l }));

  const linkCounts = new Map();
  processedLinks.forEach(l => {
    linkCounts.set(l.source, (linkCounts.get(l.source) || 0) + 1);
    linkCounts.set(l.target, (linkCounts.get(l.target) || 0) + 1);
  });

  const connectionValues = nodes.map(n => linkCounts.get(n.id) || 0);
  const minConnections = Math.min(...connectionValues);
  const maxConnections = Math.max(...connectionValues);
  
  function getNodeColor(nodeId) {
    if (nodeId.startsWith('ch-') || nodeId.startsWith('sec-')) return '#3b82f6';
    if (nodeId.startsWith('app-') || nodeId.startsWith('ga-')) return '#636ff6';
    if (nodeId.startsWith('subsec-') || nodeId.startsWith('sub-')) return '#8b5cf6';
    if (nodeId.startsWith('def-') || nodeId.startsWith('thm-') || nodeId.startsWith('claim-')) return '#b251f2';
    if (nodeId.startsWith('ex-')) return '#d946ef';

    const connections = linkCounts.get(nodeId) || 0;
    if (maxConnections === minConnections) return '#8b5cf6';
    const t = (connections - minConnections) / (maxConnections - minConnections);
    // Interpolate between blue (#3b82f6) and magenta (#d946ef)
    const r = Math.round(59 + (217 - 59) * t);
    const g = Math.round(130 + (70 - 130) * t);
    const b = Math.round(246 + (239 - 246) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function getNodeRadius(node) {
    const baseRadius = 6;
    const connections = linkCounts.get(node.id) || 0;
    return baseRadius + Math.sqrt(connections) * 1.5;
  }

  let transform = d3.zoomIdentity;
  let hoveredNode = null;
  let draggedNode = null;
  let hoverTimeout = null;

  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(processedLinks).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => getNodeRadius(d) + 10))
    .alphaDecay(0.02)
    .on('tick', render);

  function render() {
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    processedLinks.forEach(link => {
      const isPrerequisite = link.type === 'prerequisite';
      ctx.strokeStyle = isPrerequisite ? 'rgba(74, 222, 128, 0.6)' : 'rgba(20, 181, 255, 0.3)';
      ctx.lineWidth = ((link.weight || 1) + 1.2) / transform.k;
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);
      ctx.stroke();
    });

    nodes.forEach(node => {
      const radius = getNodeRadius(node) * Math.max(1, 1 / Math.pow(transform.k, 0.5));
      const isHovered = hoveredNode === node;
      const isPinned = node.fx !== undefined && node.fx !== null;
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, isHovered ? radius + 3 : radius, 0, 2 * Math.PI);
      ctx.fillStyle = isHovered ? '#00e8ff' : getNodeColor(node.id);
      ctx.fill();
      
      if (isHovered || isPinned) {
        ctx.strokeStyle = isPinned ? '#a855f7' : '#00e8ff';
        ctx.lineWidth = (isPinned ? 3 : 2) / transform.k;
        if (isPinned) ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    ctx.fillStyle = '#e0e0e0';
    ctx.font = `${11 / transform.k}px Aclonica, sans-serif`;
    ctx.textAlign = 'center';
    const lineHeight = 12 / transform.k;
    nodes.forEach(node => {
      if (node !== hoveredNode) return;
      const radius = getNodeRadius(node) * Math.max(1, 1 / Math.pow(transform.k, 0.5));
      const title = node.title || node.id;
      const words = title.split(/\s+/);
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        if (currentLine.length + words[i].length + 1 < 16) {
          currentLine += " " + words[i];
        } else {
          lines.push(currentLine);
          currentLine = words[i];
        }
      }
      lines.push(currentLine);

      lines.forEach((line, i) => {
        ctx.fillText(line, node.x, node.y + radius + (11 / transform.k) + (i * lineHeight));
      });
    });

    ctx.restore();
  }

  function getNodeAtPoint(x, y) {
    const [tx, ty] = transform.invert([x, y]);
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      const radius = getNodeRadius(node);
      const dx = tx - node.x;
      const dy = ty - node.y;
      if (dx * dx + dy * dy < radius * radius) {
        return node;
      }
    }
    return null;
  }

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (draggedNode) {
      const [tx, ty] = transform.invert([x, y]);
      draggedNode.fx = tx;
      draggedNode.fy = ty;
      simulation.alpha(0.3).restart();
      return;
    }

    const node = getNodeAtPoint(x, y);
    
    if (node !== hoveredNode) {
      hoveredNode = node;
      canvas.style.cursor = node ? 'pointer' : 'grab';
      
      if (hoverTimeout) clearTimeout(hoverTimeout);
      
      const titleElement = container.querySelector('#graph-title');
      if (node) {
        hoverTimeout = setTimeout(() => {
          if (titleElement) {
            titleElement.textContent = node.title || node.id;
            titleElement.style.opacity = '1.0';
          }
          tooltip.innerHTML = buildTooltip(node);
          tooltip.classList.remove('hidden');
        }, 50);
      } else {
        if (titleElement) {
          titleElement.textContent = 'There and Back Again Zettel Tree';
          titleElement.style.opacity = '0.7';
        }
        tooltip.classList.add('hidden');
      }
      render();
    }
    
    if (hoveredNode) {
      tooltip.style.left = `${event.clientX + 15}px`;
      tooltip.style.top = `${event.clientY - 10}px`;
    }
  });

  canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const node = getNodeAtPoint(x, y);
    
    if (node) {
      draggedNode = node;
      node.fx = node.x;
      node.fy = node.y;
      canvas.style.cursor = 'grabbing';
    }
  });

  canvas.addEventListener('mouseup', () => {
    if (draggedNode) {
      // Node stays pinned after drag
      draggedNode = null;
      canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
      render();
    }
  });

  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const node = getNodeAtPoint(x, y);
    
    if (node && node.fx !== undefined && node.fx !== null) {
      node.fx = null;
      node.fy = null;
      simulation.alpha(0.3).restart();
      render();
    }
  });

  canvas.addEventListener('mouseleave', () => {
    hoveredNode = null;
    tooltip.classList.add('hidden');
    if (draggedNode) {
      draggedNode.fx = null;
      draggedNode.fy = null;
      draggedNode = null;
    }
    render();
  });

  canvas.addEventListener('dblclick', (event) => {
    if (hoveredNode && hoveredNode.url) {
      window.location.href = hoveredNode.url;
    }
  });

  const zoom = d3.zoom()
    .scaleExtent([0.1, 4])
    .on('zoom', (event) => {
      transform = event.transform;
      render();
    });

  d3.select(canvas).call(zoom)
    .on("dblclick.zoom", null);

  controls.querySelector('.zoom-in').addEventListener('click', () => {
    d3.select(canvas).transition().duration(300).call(zoom.scaleBy, 1.3);
  });
  controls.querySelector('.zoom-out').addEventListener('click', () => {
    d3.select(canvas).transition().duration(300).call(zoom.scaleBy, 0.7);
  });
  controls.querySelector('.zoom-reset').addEventListener('click', () => {
    d3.select(canvas).transition().duration(500).call(zoom.transform, d3.zoomIdentity);
  });

  controls.querySelector('.zoom-fit').addEventListener('click', () => {
    zoomToFit();
  });

  function zoomToFit() {
    if (nodes.length === 0) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodes.forEach(n => {
      const r = getNodeRadius(n);
      minX = Math.min(minX, n.x - r);
      minY = Math.min(minY, n.y - r);
      maxX = Math.max(maxX, n.x + r);
      maxY = Math.max(maxY, n.y + r);
    });
    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;
    if (graphWidth === 0 || graphHeight === 0) return;
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const scale = 0.8 / Math.max(graphWidth / width, graphHeight / height);
    const t = d3.zoomIdentity.translate(width / 2 - scale * midX, height / 2 - scale * midY).scale(scale);
    d3.select(canvas).transition().duration(750).call(zoom.transform, t);
  }

  // Initial fit
  setTimeout(zoomToFit, 100);

  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    if (newWidth === 0 || newHeight === 0) return;
    canvas.width = newWidth;
    canvas.height = newHeight;
    simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2)).alpha(0.3).restart();
  });

  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const newWidth = entry.contentRect.width;
      const newHeight = entry.contentRect.height;
      if (newWidth === 0 || newHeight === 0) continue;
      canvas.width = newWidth;
      canvas.height = newHeight;
      simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2)).alpha(0.3).restart();
    }
  });
  resizeObserver.observe(container);

  return { simulation, canvas, zoom };
}

function buildTooltip(node) {
  let html = `<div class="tooltip-title">${node.title || node.id}</div>`;
  if (node.description) {
    html += `<div style="margin-top: 4px; opacity: 0.8; font-size: 12px;">${node.description}</div>`;
  }
  if (node.tags && node.tags.length > 0) {
    html += '<div class="tooltip-tags">';
    node.tags.forEach(tag => {
      html += `<span class="tooltip-tag">${tag}</span>`;
    });
    html += '</div>';
  }
  return html;
}

init();
