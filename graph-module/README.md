# Notes Graph Visualization Module

A framework-agnostic, static module for visualizing note connections in PreTeXt-generated HTML sites.

## Features

- **Pure JavaScript** (ES Modules) - No React, Vue, or build tools required
- **D3.js-powered** force-directed graph visualization
- **Hover effects** with tooltip showing note details and tags
- **Click-to-open** note navigation
- **Dark mode support** with theme toggle
- **Zoom and pan** controls
- **Responsive** resizing
- **Embeddable** in any HTML page

## Files

| File | Description |
|------|-------------|
| `graph.html` | Standalone HTML page for the graph |
| `graph.js` | ES Module with `NotesGraph` class |
| `graph.css` | Styling with CSS variables for theming |
| `notes-graph.json` | Example data file |
| `notes-graph-schema.json` | JSON Schema for data validation |

## Quick Start

### Option 1: Standalone Page

1. Copy all files to your PreTeXt output directory
2. Update `notes-graph.json` with your note data
3. Open `graph.html` in a browser

### Option 2: Embed in Existing Page

The module is fully self-contained and creates all necessary DOM elements internally:

```html
<div id="my-graph" style="width: 100%; height: 500px;"></div>

<script type="module">
  import { NotesGraph } from './graph.js';
  
  const graph = new NotesGraph('#my-graph', {
    nodeRadius: 6,
    linkDistance: 100,
    showLabels: true,
    showControls: true,  // Creates zoom/theme controls
    onNodeClick: (node) => {
      window.location.href = node.url;
    }
  });
  
  graph.loadData('notes-graph.json');
</script>
```

The `NotesGraph` class automatically creates:
- SVG canvas for the graph
- Tooltip element for hover information
- Control buttons (zoom in/out, reset, theme toggle) if `showControls: true`
- Injects necessary CSS styles

## Configuration Options

```javascript
new NotesGraph('#my-container', {
  nodeRadius: 6,           // Base radius for nodes
  nodeRadiusScale: 1.5,    // Scale factor based on connections
  linkDistance: 80,        // Target distance between linked nodes
  chargeStrength: -200,    // Repulsion force between nodes
  labelOffset: 12,         // Distance of labels from nodes
  showLabels: true,        // Show/hide node labels
  showControls: true,      // Show zoom/theme control buttons
  baseUrl: '',             // Base URL prefix for note links
  onNodeClick: (node, event) => { /* custom handler */ }
});
```

## Data Format

### nodes-graph.json

```json
{
  "nodes": [
    {
      "id": "unique-id",
      "title": "Note Title",
      "url": "relative/path.html",
      "tags": ["tag1", "tag2"],
      "description": "Brief description",
      "color": "#optional-color",
      "group": "backmatter"
    }
  ],
  "links": [
    {
      "source": "source-node-id",
      "target": "target-node-id",
      "type": "reference|prerequisite|builds-on|related|backlink",
      "weight": 1
    }
  ]
}
```

### Node Properties

| Property | Required | Description |
|----------|----------|-------------|
| `id` | Yes | Unique identifier (matches PreTeXt xml:id) |
| `title` | No | Display title |
| `url` | No | Link to the note's HTML page |
| `tags` | No | Array of tags for categorization |
| `description` | No | Tooltip description |
| `color` | No | Custom node color |
| `group` | No | Folder or collection used for grouping and coloring |
| `aliases` | No | Alternative names (from Obsidian) |

### Link Types

| Type | Description |
|------|-------------|
| `reference` | General reference/citation |
| `prerequisite` | Source is required before target |
| `builds-on` | Target expands on source |
| `related` | General relationship |
| `backlink` | Auto-generated reverse link |

## Theming

The module uses CSS custom properties for theming. Override these in your stylesheet:

```css
:root {
  --bg-color: #0a0a0f;
  --node-color: #14b5ff;
  --node-hover-color: #a855f7;
  --link-color: rgba(20, 181, 255, 0.3);
  --text-color: #e0e0e0;
  --tooltip-bg: rgba(10, 10, 15, 0.95);
}

[data-theme="light"] {
  --bg-color: #f5f5f7;
  --node-color: #0891b2;
  /* ... light mode overrides */
}
```

## API Methods

```javascript
const graph = new NotesGraph('#graph-svg');

// Load data from URL
await graph.loadData('notes-graph.json');

// Set data directly
graph.setData({ nodes: [...], links: [...] });

// Zoom controls
graph.zoomBy(1.3);  // Zoom in
graph.zoomBy(0.7);  // Zoom out
graph.resetZoom();  // Reset to default
graph.zoomToFit();  // Fit all nodes in view

// Theme
graph.toggleDarkMode();

// Cleanup
graph.destroy();
```

## Integration with PreTeXt

Add a link in your PreTeXt frontmatter or navigation:

```xml
<url href="graph.html">Note Graph</url>
```

Or embed directly in a PreTeXt custom element using raw HTML injection.

## Browser Support

- Modern browsers with ES Module support
- D3.js v7 loaded from CDN
- No polyfills required for evergreen browsers
