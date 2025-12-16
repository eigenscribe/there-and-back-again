/**
 * Graph Toggle Integration for PreTeXt
 * Adds a toggle button to switch between document and graph views
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
    // Try multiple selectors for different PreTeXt versions
    const navRight = document.querySelector('.ptx-navbar .navbar-right') || 
                     document.querySelector('.ptx-navbar-contents') ||
                     document.querySelector('.ptx-navbar');
    if (!navRight) {
      console.warn('Graph toggle: Navigation container not found');
      return;
    }

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'graph-toggle-btn';
    toggleBtn.innerHTML = '<span class="graph-icon">◉</span><span>Graph</span>';
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
      // D3 is loaded globally via script tag
      if (typeof d3 === 'undefined') {
        throw new Error('D3 library not loaded');
      }
      const container = document.getElementById('graph-container');
      if (!container) return;

      const response = await fetch(GRAPH_DATA_URL);
      if (!response.ok) throw new Error(`Failed to load graph data: ${response.status}`);
      const data = await response.json();

      graphInstance = createGraph(d3, container, data);
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

  function createGraph(d3, container, data) {
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
    container.appendChild(tooltip);

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('display', 'block');

    const g = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));

    svg.call(zoom);

    controls.querySelector('.zoom-in').addEventListener('click', () => {
      svg.transition().duration(300).call(zoom.scaleBy, 1.3);
    });
    controls.querySelector('.zoom-out').addEventListener('click', () => {
      svg.transition().duration(300).call(zoom.scaleBy, 0.7);
    });
    controls.querySelector('.zoom-reset').addEventListener('click', () => {
      svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
    });

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

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(processedLinks).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => getNodeRadius(d, linkCounts) + 10));

    const linksGroup = g.append('g').attr('class', 'links');
    const nodesGroup = g.append('g').attr('class', 'nodes');
    const labelsGroup = g.append('g').attr('class', 'labels');

    const link = linksGroup.selectAll('line')
      .data(processedLinks)
      .join('line')
      .attr('stroke', 'rgba(20, 181, 255, 0.3)')
      .attr('stroke-width', 1.5);

    const node = nodesGroup.selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => getNodeRadius(d, linkCounts))
      .attr('fill', '#14b5ff')
      .attr('cursor', 'pointer')
      .call(drag(d3, simulation));

    const label = labelsGroup.selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.title || d.id)
      .attr('font-size', '11px')
      .attr('fill', '#e0e0e0')
      .attr('text-anchor', 'middle')
      .attr('dy', d => getNodeRadius(d, linkCounts) + 14)
      .style('pointer-events', 'none');

    node.on('mouseenter', function(event, d) {
      d3.select(this).attr('fill', '#a855f7');
      
      const connectedIds = new Set([d.id]);
      processedLinks.forEach(l => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        if (sourceId === d.id) connectedIds.add(targetId);
        if (targetId === d.id) connectedIds.add(sourceId);
      });

      node.style('opacity', n => connectedIds.has(n.id) ? 1 : 0.2);
      link.style('opacity', l => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        return (sourceId === d.id || targetId === d.id) ? 1 : 0.1;
      });
      label.style('opacity', n => connectedIds.has(n.id) ? 1 : 0.1);

      tooltip.innerHTML = buildTooltip(d);
      tooltip.classList.remove('hidden');
      positionTooltip(event, tooltip, container);
    });

    node.on('mouseleave', function() {
      d3.select(this).attr('fill', '#14b5ff');
      node.style('opacity', 1);
      link.style('opacity', 1);
      label.style('opacity', 0.8);
      tooltip.classList.add('hidden');
    });

    node.on('click', (event, d) => {
      if (d.url) {
        window.location.href = d.url;
      }
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      label
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    setTimeout(() => zoomToFit(d3, svg, g, zoom, width, height), 500);

    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      svg.attr('width', newWidth).attr('height', newHeight);
      simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2)).alpha(0.3).restart();
    });

    return { simulation, svg, zoom };
  }

  function getNodeRadius(node, linkCounts) {
    const baseRadius = 8;
    const connections = linkCounts.get(node.id) || 0;
    return baseRadius + Math.sqrt(connections) * 2;
  }

  function drag(d3, simulation) {
    return d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
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

  function positionTooltip(event, tooltip, container) {
    const padding = 15;
    const rect = container.getBoundingClientRect();
    let x = event.clientX - rect.left + padding;
    let y = event.clientY - rect.top + padding;

    if (x + tooltip.offsetWidth > rect.width) {
      x = event.clientX - rect.left - tooltip.offsetWidth - padding;
    }
    if (y + tooltip.offsetHeight > rect.height) {
      y = event.clientY - rect.top - tooltip.offsetHeight - padding;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  function zoomToFit(d3, svg, g, zoom, width, height, padding = 50) {
    const bounds = g.node().getBBox();
    if (bounds.width === 0 || bounds.height === 0) return;

    const scale = 0.8 / Math.max(bounds.width / width, bounds.height / height);
    const midX = bounds.x + bounds.width / 2;
    const midY = bounds.y + bounds.height / 2;
    const translate = [width / 2 - scale * midX, height / 2 - scale * midY];

    svg.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
  }

init();
