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
      nodeRadius: options.nodeRadius || 30,
      nodeRadiusScale: options.nodeRadiusScale || 10,
      linkDistance: options.linkDistance || 300,
      chargeStrength: options.chargeStrength || -1500,
      labelOffset: options.labelOffset || 14,
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
    this.hoverTimeout = null;
    
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
      const title = document.createElement('div');
      title.id = 'graph-title';
      title.className = 'graph-title';
      title.textContent = 'There and Back Again Zettel Tree';
      this.rootContainer.appendChild(title);

      const controls = document.createElement('div');
      controls.id = 'graph-controls';
      controls.className = 'graph-controls';
      controls.innerHTML = `
        <div class="search-container">
          <input type="text" class="graph-search" placeholder="Search notes...">
          <div class="search-results hidden"></div>
        </div>
        <div class="control-buttons">
          <button class="graph-btn zoom-in" title="Zoom In">+</button>
          <button class="graph-btn zoom-out" title="Zoom Out">−</button>
          <button class="graph-btn zoom-reset" title="Reset View">⟲</button>
          <button class="graph-btn toggle-full" title="Full Size">⛶</button>
          <button class="graph-btn toggle-theme" title="Toggle Theme">◐</button>
        </div>
      `;
      this.rootContainer.appendChild(controls);
      this.elements.controls = controls;
      this.elements.searchInput = controls.querySelector('.graph-search');
      this.elements.searchResults = controls.querySelector('.search-results');
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
      #graph-title, .graph-title {
        position: absolute;
        top: 20px;
        left: 20px;
        font-family: 'Aclonica', sans-serif;
        font-size: 0.7rem;
        font-weight: bold;
        background: linear-gradient(130deg, #3b82f6, #8b5cf6, #d946ef);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 10px rgba(0, 255, 238, 0.4);
        z-index: 100;
        pointer-events: none;
        text-align: left;
        white-space: normal;
        max-width: 200px;
        line-height: 1.2;
        opacity: 0.5;
        transition: opacity 0.3s ease;
      }
      #graph-controls, .graph-controls {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
        z-index: 100;
        pointer-events: auto;
      }
      .control-buttons {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .search-container {
        position: relative;
        width: 220px;
      }
      .graph-search {
        width: 100%;
        padding: 10px 14px;
        background: var(--control-bg, rgba(20, 20, 30, 0.8));
        border: 1px solid var(--tooltip-border, rgba(0, 255, 238, 0.3));
        border-radius: 8px;
        color: var(--text-color, #e0e0e0);
        font-size: 14px;
        backdrop-filter: blur(8px);
        outline: none;
        transition: all 0.2s ease;
      }
      .graph-search:focus {
        border-color: var(--node-color, #00ffee);
        box-shadow: 0 0 8px rgba(0, 255, 238, 0.3);
      }
      .search-results {
        position: absolute;
        top: calc(100% + 5px);
        left: 0;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        background: var(--tooltip-bg, rgba(10, 10, 15, 0.95));
        border: 1px solid var(--tooltip-border, rgba(0, 255, 238, 0.5));
        border-radius: 8px;
        z-index: 101;
      }
      .search-result-item {
        padding: 8px 12px;
        cursor: pointer;
        font-size: 13px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      .search-result-item:hover {
        background: rgba(0, 255, 238, 0.1);
      }
      .search-results.hidden { display: none; }
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
        background: var(--control-hover, rgba(0, 255, 238, 0.3));
        transform: scale(1.05);
        box-shadow: 0 0 12px rgba(0, 255, 238, 0.4);
      }
      .graph-tooltip {
        position: absolute;
        padding: 8px 12px;
        background: var(--tooltip-bg, rgba(10, 10, 15, 0.95));
        border: 1px solid var(--tooltip-border, rgba(0, 255, 238, 0.5));
        border-radius: 8px;
        font-size: 13px;
        pointer-events: none;
        z-index: 200;
        max-width: 240px;
        backdrop-filter: blur(12px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transition: opacity 0.15s ease;
        color: var(--text-color, #e0e0e0);
      }
      .graph-tooltip.hidden { opacity: 0; visibility: hidden; }
      .graph-tooltip .tooltip-title { font-weight: 600; margin-bottom: 4px; color: var(--node-color, #00ffee); }
      .graph-tooltip .tooltip-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
      .graph-tooltip .tooltip-tag { padding: 2px 8px; background: var(--link-color, rgba(0, 255, 238, 0.3)); border-radius: 12px; font-size: 11px; }
      .graph-svg { width: 100%; height: 100%; display: block; }
      .link {
        stroke: var(--link-color, rgba(0, 255, 238, 0.4));
        stroke-width: 1px;
        stroke-opacity: 0.4;
        stroke-linecap: round;
        transition: all 0.2s ease;
      }
      .link.highlighted {
        stroke: var(--link-hover-color, rgba(168, 85, 247, 0.7));
        stroke-width: 3px;
        stroke-opacity: 1;
      }
      .node-label {
        font-size: 8px;
        fill: var(--text-color, #e0e0e0);
        pointer-events: none;
        text-anchor: middle;
        dominant-baseline: middle;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .node-label.visible { opacity: 0.35; }
      .node-label.important { opacity: 0.5; font-weight: bold; }
      .node-label.dimmed { opacity: 0.1; }
      .node.search-match {
        stroke: #fff;
        stroke-width: 3px;
      }
      .node.pinned {
        stroke: #a855f7;
        stroke-width: 3px;
        stroke-dasharray: 4;
      }
      .node.search-dimmed {
        opacity: 0.2;
      }
      .link.search-dimmed {
        opacity: 0.1;
      }
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
        this.updateSemanticZoom(event.transform.k);
      });

    this.svg.call(this.zoom)
      .on("dblclick.zoom", null);
  }

  setupControls() {
    if (!this.elements.controls) return;
    
    const zoomIn = this.elements.controls.querySelector('.zoom-in');
    const zoomOut = this.elements.controls.querySelector('.zoom-out');
    const zoomReset = this.elements.controls.querySelector('.zoom-reset');
    const toggleTheme = this.elements.controls.querySelector('.toggle-theme');
    const toggleFull = this.elements.controls.querySelector('.toggle-full');

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
    if (toggleFull) {
      toggleFull.addEventListener('click', () => this.zoomToFit());
    }

    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
      this.elements.searchInput.addEventListener('focus', () => {
        if (this.elements.searchInput.value) this.elements.searchResults.classList.remove('hidden');
      });
      document.addEventListener('click', (e) => {
        if (!this.elements.controls.contains(e.target)) {
          this.elements.searchResults.classList.add('hidden');
        }
      });
    }
  }

  handleSearch(query) {
    const results = this.elements.searchResults;
    if (!query) {
      results.innerHTML = '';
      results.classList.add('hidden');
      this.highlightNodes(null);
      return;
    }

    const filtered = this.data.nodes.filter(n => 
      (n.title && n.title.toLowerCase().includes(query.toLowerCase())) ||
      (n.id && n.id.toLowerCase().includes(query.toLowerCase())) ||
      (n.tags && n.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
    ).slice(0, 10);

    if (filtered.length > 0) {
      results.innerHTML = filtered.map(n => `
        <div class="search-result-item" data-id="${n.id}">
          ${n.title || n.id}
          <div style="font-size: 10px; opacity: 0.6;">${n.group || ''}</div>
        </div>
      `).join('');
      results.classList.remove('hidden');
      
      results.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.getAttribute('data-id');
          const node = this.data.nodes.find(n => n.id === id);
          if (node) this.focusOnNode(node);
          results.classList.add('hidden');
          this.elements.searchInput.value = node.title || node.id;
        });
      });
    } else {
      results.innerHTML = '<div class="search-result-item">No results found</div>';
      results.classList.remove('hidden');
    }

    // Highlight matches in the graph
    const matchIds = new Set(filtered.map(n => n.id));
    this.highlightNodes(matchIds);
  }

  highlightNodes(ids) {
    const { d3 } = this;
    const nodeElements = this.nodesGroup.selectAll('.node');
    const labelElements = this.labelsGroup.selectAll('.node-label');
    const linkElements = this.linksGroup.selectAll('.link');
    
    if (!ids) {
      nodeElements.classed('search-match', false).classed('search-dimmed', false);
      labelElements.classed('visible', d => (this.linkCounts.get(d.id) || 0) > 5);
      linkElements.classed('search-dimmed', false);
      return;
    }

    nodeElements
      .classed('search-match', d => ids.has(d.id))
      .classed('search-dimmed', d => !ids.has(d.id));
    
    labelElements.classed('visible', d => ids.has(d.id));

    linkElements.classed('search-dimmed', l => {
      const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
      const targetId = typeof l.target === 'object' ? l.target.id : l.target;
      return !ids.has(sourceId) || !ids.has(targetId);
    });
  }

  focusOnNode(node) {
    const { d3 } = this;
    const scale = 2;
    const translate = [this.width / 2 - scale * node.x, this.height / 2 - scale * node.y];

    this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    
    // Trigger hover effect temporarily
    this.handleNodeHover(null, node, true, this.linksGroup.selectAll('line'), this.nodesGroup.selectAll('circle'));
    setTimeout(() => {
       // Keep tooltip visible or just leave it
    }, 2000);
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      this.rootContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  zoomBy(factor) {
    const { d3 } = this;
    this.svg.transition()
      .duration(300)
      .call(this.zoom.scaleBy, factor);
  }

  resetZoom() {
    this.zoomToFit();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.rootContainer.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
  }

  updateSemanticZoom(k) {
    const { d3 } = this;
    const { labelOffset } = this.options;
    
    // Scale nodes inversely with zoom to keep them visible when zoomed out
    const nodeScale = Math.max(1, 1 / Math.pow(k, 0.5));
    const labelScale = Math.max(1, 1 / Math.pow(k, 0.4));

    this.nodesGroup.selectAll('.node')
      .attr('r', d => this.getNodeRadius(d, this.linkCounts) * nodeScale);

    if (this.options.showLabels) {
      this.labelsGroup.selectAll('.node-label')
        .style('font-size', `${8 * labelScale}px`)
        .attr('dy', d => (this.getNodeRadius(d, this.linkCounts) * nodeScale) + (labelOffset * labelScale));
    }
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

    this.linkCounts = new Map();
    processedLinks.forEach(l => {
      this.linkCounts.set(l.source, (this.linkCounts.get(l.source) || 0) + 1);
      this.linkCounts.set(l.target, (this.linkCounts.get(l.target) || 0) + 1);
    });

    this.simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(processedLinks)
        .id(d => d.id)
        .distance(linkDistance)
        .strength(0.1)) // More organic
      .force('charge', d3.forceManyBody().strength(chargeStrength))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collision', d3.forceCollide().radius(d => this.getNodeRadius(d, this.linkCounts) + 8)) // More space
      .force('x', d3.forceX(this.width / 2).strength(0.01))
      .force('y', d3.forceY(this.height / 2).strength(0.01));

    const link = this.linksGroup.selectAll('line')
      .data(processedLinks)
      .join('line')
      .attr('class', d => `link ${d.type || ''}`)
      .attr('stroke-width', d => (d.weight || 1) + 1.2);

    const node = this.nodesGroup.selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('class', 'node')
      .attr('r', d => this.getNodeRadius(d, this.linkCounts))
      .attr('fill', d => this.getNodeColor(d))
      .attr('filter', d => {
        const secondary = this.getSecondaryColor(d);
        return secondary ? `drop-shadow(0 0 8px ${secondary})` : null;
      })
      .call(this.drag());

    if (showLabels) {
      const label = this.labelsGroup.selectAll('text')
        .data(nodes)
        .join('text')
        .attr('class', d => {
          const connections = this.linkCounts.get(d.id) || 0;
          return `node-label ${connections > 5 ? 'important visible' : ''}`;
        })
        .attr('dy', d => this.getNodeRadius(d, this.linkCounts) + labelOffset);

      const self = this;
      label.each(function(d) {
        const el = self.d3.select(this);
        const title = d.title || d.id;
        const words = title.split(/\s+/);
        el.text(null);
        
        let currentLine = [];
        let lineCount = 0;
        const maxLineLength = 16;
        
        for (const word of words) {
          if (currentLine.join(' ').length + word.length > maxLineLength && currentLine.length > 0) {
            el.append('tspan')
              .attr('x', 0)
              .attr('dy', lineCount === 0 ? 0 : '1.2em')
              .text(currentLine.join(' '));
            currentLine = [word];
            lineCount++;
          } else {
            currentLine.push(word);
          }
        }
        el.append('tspan')
          .attr('x', 0)
          .attr('dy', lineCount === 0 ? 0 : '1.2em')
          .text(currentLine.join(' '));
      });
    }

    node.on('mouseenter', (event, d) => this.handleNodeHover(event, d, true, link, node))
        .on('mouseleave', (event, d) => this.handleNodeHover(event, d, false, link, node))
        .on('click', (event, d) => {
          if (d.fx !== null && d.fx !== undefined) {
            d.fx = null;
            d.fy = null;
            this.d3.select(event.currentTarget).classed('pinned', false);
            this.simulation.alpha(0.3).restart();
          }
        })
        .on('dblclick', (event, d) => this.handleNodeClick(event, d));

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
          .attr('y', d => d.y)
          .selectAll('tspan')
          .attr('x', d => d.x);
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
    const groupColors = {
      'frontmatter': 'var(--color-example)',
      'default': 'var(--color-example)',
      'setting-the-stage': 'var(--color-section)',
      'eigenotes': 'var(--color-section)',
      'bridges': 'var(--color-section)',
      'field-notes': 'var(--color-section)',
      'practice-problems': 'var(--color-definition)',
      'meta': 'var(--color-claim)',
      'backmatter': 'var(--color-claim)'
    };

    if (node.group && groupColors[node.group]) return groupColors[node.group];

    const id = node.id || '';
    if (id.startsWith('ch-')) return 'var(--color-keter)';
    if (id.startsWith('sec-')) return 'var(--color-section)';
    if (id.startsWith('subsec-')) return 'var(--color-subsection)';
    if (id.startsWith('ex-')) return 'var(--color-example)';
    if (id.startsWith('sub-')) return 'var(--color-sub)';
    if (id.startsWith('app-')) return 'var(--color-appendix)';
    if (id.startsWith('def-')) return 'var(--color-definition)';
    if (id.startsWith('ga-')) return 'var(--color-ga)';
    if (id.startsWith('claim-')) return 'var(--color-claim)';
    if (id.startsWith('thm-')) return 'var(--color-theorem)';
    
    if (node.color) return node.color;
    return 'var(--color-appendix)';
  }

  getSecondaryColor(node) {
    const groupColors = {
      'frontmatter': 'var(--color-example-dark)',
      'default': 'var(--color-example-dark)',
      'setting-the-stage': 'var(--color-section-dark)',
      'eigenotes': 'var(--color-section-dark)',
      'bridges': 'var(--color-section-dark)',
      'field-notes': 'var(--color-section-dark)',
      'practice-problems': 'var(--color-definition-dark)',
      'meta': 'var(--color-claim-dark)',
      'backmatter': 'var(--color-claim-dark)'
    };

    if (node.group && groupColors[node.group]) return groupColors[node.group];

    const id = node.id || '';
    if (id.startsWith('ch-')) return 'var(--color-keter-dark)';
    if (id.startsWith('sec-')) return 'var(--color-section-dark)';
    if (id.startsWith('subsec-')) return 'var(--color-subsection-dark)';
    if (id.startsWith('ex-')) return 'var(--color-example-dark)';
    if (id.startsWith('sub-')) return 'var(--color-sub-dark)';
    if (id.startsWith('app-')) return 'var(--color-appendix-dark)';
    if (id.startsWith('def-')) return 'var(--color-definition-dark)';
    if (id.startsWith('ga-')) return 'var(--color-ga-dark)';
    if (id.startsWith('claim-')) return 'var(--color-claim-dark)';
    if (id.startsWith('thm-')) return 'var(--color-theorem-dark)';
    return 'var(--color-appendix-dark)';
  }

  drag() {
    const { d3 } = this;
    const simulation = this.simulation;

    return d3.drag()
      .on('start', function(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', function(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', function(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        // Node stays pinned after drag
        d3.select(this).classed('pinned', true);
      });
  }

  handleNodeHover(event, d, isEntering, linkElements, nodeElements) {
    const tooltip = this.elements.tooltip;
    const titleElement = document.getElementById('graph-title');
    
    if (this.hoverTimeout) clearTimeout(this.hoverTimeout);

    if (isEntering) {
      this.hoverTimeout = setTimeout(() => {
        if (titleElement) {
          titleElement.textContent = d.title || d.id;
          titleElement.style.opacity = '1.0';
        }
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
          .classed('visible', n => connectedIds.has(n.id))
          .classed('dimmed', n => !connectedIds.has(n.id));

        if (tooltip) {
          tooltip.innerHTML = this.buildTooltipContent(d);
          tooltip.classList.remove('hidden');
          this.positionTooltip(event, tooltip);
        }
      }, 50); // Small debounce for smoother UI
    } else {
      if (titleElement) {
        titleElement.textContent = 'There and Back Again Zettel Tree';
        titleElement.style.opacity = '0.5';
      }
      nodeElements.classed('highlighted', false).classed('dimmed', false);
      linkElements.classed('highlighted', false).classed('dimmed', false);
      
      this.labelsGroup.selectAll('text')
        .classed('visible', d => (this.linkCounts.get(d.id) || 0) > 5)
        .classed('dimmed', false);

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
      window.open(this.options.baseUrl + node.url, '_self');
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
    nodeRadius: 30,
    linkDistance: 300,
    chargeStrength: -1500,
    showLabels: true,
    showControls: true,
    onNodeClick: (node, event) => {
      if (event.type === 'dblclick' && node.url) {
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