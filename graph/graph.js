/**
 * Notes Graph Visualization Module
 * A framework-agnostic, embeddable graph visualization using D3.js
 * 
 * Usage:
 *   import { NotesGraph } from './graph.js';
 *   const graph = new NotesGraph('#graph-container');
 *   graph.loadData('notes-graph.json');
 */

const D3_CDN = 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

class NotesGraph {
  constructor(containerSelector, options = {}) {
    this.rootContainer = document.querySelector(containerSelector);
    if (!this.rootContainer) {
      console.error(`Container not found: ${containerSelector}`);
      return;
    }
    
    this.options = {
      nodeRadius: options.nodeRadius || 6,
      nodeRadiusScale: options.nodeRadiusScale || 1.5,
      linkDistance: options.linkDistance || 80,
      chargeStrength: options.chargeStrength || -200,
      labelOffset: options.labelOffset || 12,
      showLabels: options.showLabels !== false,
      showControls: options.showControls !== false,
      onNodeClick: options.onNodeClick || null,
      baseUrl: options.baseUrl || '',
      ...options
    };
    
    this.data = { nodes: [], links: [] };
    this.simulation = null;
    this.svg = null;
    this.g = null;
    this.zoom = null;
    this.d3 = null;
    this.darkMode = true;
    
    this.elements = {};
    
    this.init();
  }

  async init() {
    this.d3 = await import(D3_CDN);
    this.createDOM();
    this.setupSVG();
    this.setupControls();
    this.setupZoom();
  }

  createDOM() {
    this.rootContainer.style.position = 'relative';
    this.rootContainer.innerHTML = '';
    
    if (this.options.showControls) {
      const controls = document.createElement('div');
      controls.className = 'graph-controls';
      controls.innerHTML = `
        <button class="graph-btn zoom-in" title="Zoom In">+</button>
        <button class="graph-btn zoom-out" title="Zoom Out">−</button>
        <button class="graph-btn zoom-reset" title="Reset View">⟲</button>
        <button class="graph-btn toggle-theme" title="Toggle Theme">◐</button>
      `;
      this.rootContainer.appendChild(controls);
      this.elements.controls = controls;
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'graph-tooltip hidden';
    this.rootContainer.appendChild(tooltip);
    this.elements.tooltip = tooltip;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'graph-svg');
    this.rootContainer.appendChild(svg);
    this.container = svg;
    
    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('notes-graph-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'notes-graph-styles';
    style.textContent = `
      .graph-controls {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 100;
      }
      .graph-btn {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 8px;
        background: var(--control-bg, rgba(20, 20, 30, 0.8));
        color: var(--text-color, #e0e0e0);
        font-size: 18px;
        cursor: pointer;
        backdrop-filter: blur(8px);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .graph-btn:hover {
        background: var(--control-hover, rgba(20, 181, 255, 0.3));
        transform: scale(1.05);
      }
      .graph-tooltip {
        position: absolute;
        padding: 12px 16px;
        background: var(--tooltip-bg, rgba(10, 10, 15, 0.95));
        border: 1px solid var(--tooltip-border, rgba(20, 181, 255, 0.5));
        border-radius: 8px;
        font-size: 14px;
        pointer-events: none;
        z-index: 200;
        max-width: 300px;
        backdrop-filter: blur(12px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transition: opacity 0.15s ease;
        color: var(--text-color, #e0e0e0);
      }
      .graph-tooltip.hidden { opacity: 0; visibility: hidden; }
      .graph-tooltip .tooltip-title { font-weight: 600; margin-bottom: 4px; color: var(--node-color, #14b5ff); }
      .graph-tooltip .tooltip-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
      .graph-tooltip .tooltip-tag { padding: 2px 8px; background: var(--link-color, rgba(20, 181, 255, 0.3)); border-radius: 12px; font-size: 11px; }
      .graph-svg { width: 100%; height: 100%; display: block; }
    `;
    document.head.appendChild(style);
  }

  setupSVG() {
    const { d3 } = this;
    
    this.width = this.rootContainer.clientWidth;
    this.height = this.rootContainer.clientHeight;

    this.svg = d3.select(this.container)
      .attr('width', this.width)
      .attr('height', this.height);

    this.g = this.svg.append('g');

    this.linksGroup = this.g.append('g').attr('class', 'links');
    this.nodesGroup = this.g.append('g').attr('class', 'nodes');
    this.labelsGroup = this.g.append('g').attr('class', 'labels');

    window.addEventListener('resize', () => this.handleResize());
  }

  setupZoom() {
    const { d3 } = this;
    
    this.zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        this.g.attr('transform', event.transform);
      });

    this.svg.call(this.zoom);
  }

  setupControls() {
    if (!this.elements.controls) return;
    
    const zoomIn = this.elements.controls.querySelector('.zoom-in');
    const zoomOut = this.elements.controls.querySelector('.zoom-out');
    const zoomReset = this.elements.controls.querySelector('.zoom-reset');
    const toggleTheme = this.elements.controls.querySelector('.toggle-theme');

    if (zoomIn) {
      zoomIn.addEventListener('click', () => this.zoomBy(1.3));
    }
    if (zoomOut) {
      zoomOut.addEventListener('click', () => this.zoomBy(0.7));
    }
    if (zoomReset) {
      zoomReset.addEventListener('click', () => this.resetZoom());
    }
    if (toggleTheme) {
      toggleTheme.addEventListener('click', () => this.toggleDarkMode());
    }
  }

  zoomBy(factor) {
    const { d3 } = this;
    this.svg.transition()
      .duration(300)
      .call(this.zoom.scaleBy, factor);
  }

  resetZoom() {
    const { d3 } = this;
    this.svg.transition()
      .duration(500)
      .call(this.zoom.transform, d3.zoomIdentity);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.rootContainer.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
  }

  handleResize() {
    this.width = this.rootContainer.clientWidth;
    this.height = this.rootContainer.clientHeight;

    this.svg
      .attr('width', this.width)
      .attr('height', this.height);

    if (this.simulation) {
      this.simulation
        .force('center', this.d3.forceCenter(this.width / 2, this.height / 2))
        .alpha(0.3)
        .restart();
    }
  }

  async loadData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load: ${response.status}`);
      this.data = await response.json();
      this.render();
    } catch (error) {
      console.error('Error loading graph data:', error);
    }
  }

  setData(data) {
    this.data = data;
    this.render();
  }

  render() {
    const { d3 } = this;
    const { nodes, links } = this.data;
    const { nodeRadius, nodeRadiusScale, linkDistance, chargeStrength, showLabels, labelOffset } = this.options;

    this.linksGroup.selectAll('*').remove();
    this.nodesGroup.selectAll('*').remove();
    this.labelsGroup.selectAll('*').remove();

    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    const processedLinks = links
      .filter(l => nodeMap.has(l.source) && nodeMap.has(l.target))
      .map(l => ({
        source: l.source,
        target: l.target,
        ...l
      }));

    const linkCounts = new Map();
    processedLinks.forEach(l => {
      linkCounts.set(l.source, (linkCounts.get(l.source) || 0) + 1);
      linkCounts.set(l.target, (linkCounts.get(l.target) || 0) + 1);
    });

    this.simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(processedLinks)
        .id(d => d.id)
        .distance(linkDistance))
      .force('charge', d3.forceManyBody().strength(chargeStrength))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collision', d3.forceCollide().radius(d => this.getNodeRadius(d, linkCounts) + 5));

    const link = this.linksGroup.selectAll('line')
      .data(processedLinks)
      .join('line')
      .attr('class', 'link')
      .attr('stroke-width', d => d.weight || 1);

    const node = this.nodesGroup.selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('class', 'node')
      .attr('r', d => this.getNodeRadius(d, linkCounts))
      .attr('fill', d => this.getNodeColor(d))
      .call(this.drag());

    if (showLabels) {
      const label = this.labelsGroup.selectAll('text')
        .data(nodes)
        .join('text')
        .attr('class', 'node-label')
        .attr('dy', d => this.getNodeRadius(d, linkCounts) + labelOffset)
        .text(d => d.title || d.id);
    }

    node.on('mouseenter', (event, d) => this.handleNodeHover(event, d, true, link, node))
        .on('mouseleave', (event, d) => this.handleNodeHover(event, d, false, link, node))
        .on('click', (event, d) => this.handleNodeClick(event, d));

    this.simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      if (showLabels) {
        this.labelsGroup.selectAll('text')
          .attr('x', d => d.x)
          .attr('y', d => d.y);
      }
    });

    this.zoomToFit();
  }

  getNodeRadius(node, linkCounts) {
    const { nodeRadius, nodeRadiusScale } = this.options;
    const connections = linkCounts.get(node.id) || 0;
    return nodeRadius + Math.sqrt(connections) * nodeRadiusScale;
  }

  getNodeColor(node) {
    const style = getComputedStyle(document.documentElement);
    return node.color || style.getPropertyValue('--node-color').trim();
  }

  drag() {
    const { d3 } = this;
    const simulation = this.simulation;

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

  handleNodeHover(event, d, isEntering, linkElements, nodeElements) {
    const tooltip = this.elements.tooltip;
    
    if (isEntering) {
      const connectedIds = new Set([d.id]);
      this.data.links.forEach(l => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        if (sourceId === d.id) connectedIds.add(targetId);
        if (targetId === d.id) connectedIds.add(sourceId);
      });

      nodeElements
        .classed('highlighted', n => n.id === d.id)
        .classed('dimmed', n => !connectedIds.has(n.id));

      linkElements
        .classed('highlighted', l => {
          const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
          const targetId = typeof l.target === 'object' ? l.target.id : l.target;
          return sourceId === d.id || targetId === d.id;
        })
        .classed('dimmed', l => {
          const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
          const targetId = typeof l.target === 'object' ? l.target.id : l.target;
          return sourceId !== d.id && targetId !== d.id;
        });

      this.labelsGroup.selectAll('text')
        .classed('dimmed', n => !connectedIds.has(n.id));

      if (tooltip) {
        tooltip.innerHTML = this.buildTooltipContent(d);
        tooltip.classList.remove('hidden');
        this.positionTooltip(event, tooltip);
      }
    } else {
      nodeElements.classed('highlighted', false).classed('dimmed', false);
      linkElements.classed('highlighted', false).classed('dimmed', false);
      this.labelsGroup.selectAll('text').classed('dimmed', false);

      if (tooltip) {
        tooltip.classList.add('hidden');
      }
    }
  }

  buildTooltipContent(node) {
    let html = `<div class="tooltip-title">${node.title || node.id}</div>`;
    
    if (node.description) {
      html += `<div class="tooltip-description">${node.description}</div>`;
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

  positionTooltip(event, tooltip) {
    const padding = 15;
    const rect = this.rootContainer.getBoundingClientRect();
    
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

  handleNodeClick(event, node) {
    if (this.options.onNodeClick) {
      this.options.onNodeClick(node, event);
    } else if (node.url) {
      window.location.href = this.options.baseUrl + node.url;
    }
  }

  zoomToFit(padding = 50) {
    const { d3 } = this;
    const nodes = this.data.nodes;
    
    if (nodes.length === 0) return;

    setTimeout(() => {
      const bounds = this.g.node().getBBox();
      const fullWidth = this.width;
      const fullHeight = this.height;
      const width = bounds.width;
      const height = bounds.height;
      const midX = bounds.x + width / 2;
      const midY = bounds.y + height / 2;

      if (width === 0 || height === 0) return;

      const scale = 0.8 / Math.max(width / fullWidth, height / fullHeight);
      const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];

      this.svg.transition()
        .duration(750)
        .call(
          this.zoom.transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        );
    }, 500);
  }

  destroy() {
    if (this.simulation) {
      this.simulation.stop();
    }
    window.removeEventListener('resize', this.handleResize);
    this.svg.selectAll('*').remove();
  }
}

async function initGraph() {
  await new Promise(resolve => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve);
  });

  const container = document.getElementById('graph-container');
  if (!container) return;

  const graph = new NotesGraph('#graph-container', {
    nodeRadius: 6,
    linkDistance: 100,
    chargeStrength: -300,
    showLabels: true,
    showControls: true,
    onNodeClick: (node) => {
      if (node.url) {
        window.open(node.url, '_self');
      }
    }
  });

  setTimeout(() => {
    graph.loadData('notes-graph.json');
  }, 100);
}

initGraph();

export { NotesGraph };
