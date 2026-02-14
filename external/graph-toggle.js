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
  createGraphOverlay();
}

function createToggleButton() {
  const navRight = document.querySelector('.ptx-navbar .navbar-right') || 
                   document.querySelector('.ptx-navbar-contents') ||
                   document.querySelector('.ptx-navbar');
  if (!navRight) {
    console.warn('Graph toggle: Navigation container not found');
    return;
  }

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'graph-toggle-btn';
  toggleBtn.innerHTML = '<span class="graph-icon">🌳</span><span>Zettle Tree</span>';
  toggleBtn.title = 'Toggle Graph View';
  toggleBtn.addEventListener('click', toggleGraph);

  navRight.appendChild(toggleBtn);
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
  if (isGraphVisible) {
    hideGraph();
  } else {
    await showGraph();
  }
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

async function initializeGraph() {
  try {
    if (typeof d3 === 'undefined') {
      throw new Error('D3 library not loaded');
    }
    const container = document.getElementById('graph-container');
    if (!container) return;

    const response = await fetch(GRAPH_DATA_URL);
    if (!response.ok) throw new Error(`Failed to load graph data: ${response.status}`);
    const data = await response.json();

    graphInstance = createCanvasGraph(d3, container, data);
  } catch (error) {
    console.error('Error initializing graph:', error);
    const container = document.getElementById('graph-container');
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

  const controls = document.createElement('div');
  controls.className = 'graph-controls';
  controls.innerHTML = `
    <button class="graph-btn zoom-in" title="Zoom In">+</button>
    <button class="graph-btn zoom-out" title="Zoom Out">−</button>
    <button class="graph-btn zoom-reset" title="Reset View">⟲</button>
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
    const connections = linkCounts.get(nodeId) || 0;
    if (maxConnections === minConnections) return '#a855f7';
    const t = (connections - minConnections) / (maxConnections - minConnections);
    const r = Math.round(236 + (124 - 236) * t);
    const g = Math.round(72 + (58 - 72) * t);
    const b = Math.round(153 + (237 - 153) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function getNodeRadius(node) {
    const baseRadius = 8;
    const connections = linkCounts.get(node.id) || 0;
    return baseRadius + Math.sqrt(connections) * 2;
  }

  let transform = d3.zoomIdentity;
  let hoveredNode = null;
  let draggedNode = null;

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

    ctx.strokeStyle = 'rgba(20, 181, 255, 0.3)';
    ctx.lineWidth = 1.5 / transform.k;
    processedLinks.forEach(link => {
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);
      ctx.stroke();
    });

    nodes.forEach(node => {
      const radius = getNodeRadius(node);
      const isHovered = hoveredNode === node;
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, isHovered ? radius + 3 : radius, 0, 2 * Math.PI);
      ctx.fillStyle = isHovered ? '#00e8ff' : getNodeColor(node.id);
      ctx.fill();
      
      if (isHovered) {
        ctx.strokeStyle = '#00e8ff';
        ctx.lineWidth = 2 / transform.k;
        ctx.stroke();
      }
    });

    ctx.fillStyle = '#e0e0e0';
    ctx.font = `${14 / transform.k}px Aclonica, sans-serif`;
    ctx.textAlign = 'center';
    nodes.forEach(node => {
      const radius = getNodeRadius(node);
      ctx.fillText(node.title || node.id, node.x, node.y + radius + 14 / transform.k);
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
      
      if (node) {
        tooltip.innerHTML = buildTooltip(node);
        tooltip.classList.remove('hidden');
      } else {
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
      draggedNode.fx = null;
      draggedNode.fy = null;
      draggedNode = null;
      canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
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

  canvas.addEventListener('click', (event) => {
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

  d3.select(canvas).call(zoom);

  controls.querySelector('.zoom-in').addEventListener('click', () => {
    d3.select(canvas).transition().duration(300).call(zoom.scaleBy, 1.3);
  });
  controls.querySelector('.zoom-out').addEventListener('click', () => {
    d3.select(canvas).transition().duration(300).call(zoom.scaleBy, 0.7);
  });
  controls.querySelector('.zoom-reset').addEventListener('click', () => {
    d3.select(canvas).transition().duration(500).call(zoom.transform, d3.zoomIdentity);
  });

  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    canvas.width = newWidth;
    canvas.height = newHeight;
    simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2)).alpha(0.3).restart();
  });

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
