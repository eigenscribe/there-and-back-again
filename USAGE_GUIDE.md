# There And Back Again - Usage Guide

A PreTeXt-based knowledge base for Eigenscribe Inc. with Zettelkasten note-taking methodology and interactive graph visualization.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Start](#quick-start)
3. [Recreating from GitHub](#recreating-from-github)
4. [Connecting to Obsidian](#connecting-to-obsidian)
5. [Adding New Notes](#adding-new-notes)
6. [Building and Publishing](#building-and-publishing)
7. [Customization](#customization)

---

## Project Overview

This project combines:
- **PreTeXt**: Professional mathematical authoring system with beautiful MathJax rendering
- **Zettelkasten Method**: Interconnected notes with bidirectional links
- **Diataxis Framework**: Content organized as Prototypes, Tutorials, Explanations, Reference
- **D3.js Graph View**: Interactive visualization of note connections
- **Obsidian Integration**: Pipeline to convert Obsidian Markdown notes to PreTeXt XML (⚠️ Haven't tested myself ⚠️)

### Project Structure

```
zettelkasten-pretext/
├──source
│    ├── 01-frontmatter
│    │   ├── conventions.ptx
│    │   ├── frontmatter-wrapper.ptx
│    │   ├── how-to-read.ptx
│    │   └── intent.ptx
│    ├── 02-scribing
│    │   ├── ch-scribing.ptx
│    │   ├── foundations
│    │   │   └── note-001.ptx
│    │   ├── interpretability
│    │   │   └── note-001.ptx
│    │   ├── methods
│    │   │   └── note-001.ptx
│    │   └── unifications
│    │       └── note-001.ptx
│    ├── 03-eigenthoughts
│    │   ├── ch-eigenthoughts.ptx
│    │   ├── fragments
│    │   │   └── fragment-001.ptx
│    │   ├── intent.ptx
│    │   └── loss-gems.ptx
│    ├── 04-scriber-labs
│    │   ├── about
│    │   │   └── README.ptx
│    │   ├── ch-scriber-labs.ptx
│    │   └── projects
│    ├── 05-field-notes
│    │   ├── books
│    │   ├── ch-field-notes.ptx
│    │   ├── docs
│    │   ├── external-repos
│    │   ├── papers
│    │   └── talks
│    ├── 06-practice
│    │   └── ch-practice.ptx
│    ├── 07-meta
│    │   ├── ch-meta.ptx
│    │   ├── citations.ptx
│    │   ├── systems.ptx
│    │   └── workflow.ptx
│    ├── 08-backmatter
│    │   ├── backmatter-wrapper.ptx
│    │   ├── bibliography-notes.ptx
│    │   ├── glossary.ptx
│    │   └── index.ptx
│    ├── docinfo.ptx
└────└── main.ptx
```

---

## Quick Start

### Prerequisites
- Python 3.10+
- Git

### Running Locally

1. Install PreTeXt CLI:
   ```bash
   pip install pretext
   ```

2. Build the project:
   ```bash
   ./build.sh
   ```

3. Start the development server:
   ```bash
   cd output/web && python -m http.server 5000
   ```

4. Open http://localhost:5000 in your browser

---

## Recreating from GitHub

### Step 1: Clone the Repository

```bash
git clone https://github.com/eigenscribe/there-and-back-again.git
cd there-and-back-again
```

### Step 2: Install Dependencies

```bash
# Create virtual environment (optional but recommended)
python -m venv .venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install PreTeXt CLI
pip install -r requirements.txt
```

### Step 3: Build the Project

```bash
./build.sh
```

This script:
1. Runs `pretext build web` to generate HTML
2. Copies custom assets (CSS, images, graph files)
3. Injects custom styling into generated HTML

### Step 4: Preview Locally

```bash
cd output/web
python -m http.server 5000
```

### Step 5: Deploy to GitHub Pages

**Option A: GitHub Actions (Recommended)**

1. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [main]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         
         - name: Set up Python
           uses: actions/setup-python@v4
           with:
             python-version: '3.11'
         
         - name: Install PreTeXt
           run: pip install pretext
         
         - name: Build
           run: ./build.sh
         
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./output/web
   ```

2. Enable GitHub Pages in repository Settings → Pages → Source: `gh-pages` branch

**Option B: Manual Deployment**

```bash
# Build the project
./build.sh

# Deploy to gh-pages branch
git subtree push --prefix output/web origin gh-pages
```

---

## Connecting to Obsidian

The `obsidian-to-pretext/` folder contains a converter that transforms Obsidian Markdown notes into PreTeXt XML.

### Setup

1. Create a folder for your Obsidian vault notes:
   ```bash
   mkdir -p obsidian-to-pretext/my_notes
   ```

2. Copy or symlink notes from your Obsidian vault:
   ```bash
   # Option 1: Copy notes
   cp ~/Documents/MyVault/Math/*.md obsidian-to-pretext/my_notes/
   
   # Option 2: Symlink entire folder
   ln -s ~/Documents/MyVault/Math obsidian-to-pretext/my_notes
   ```

### Obsidian Note Format

Your Obsidian notes should include YAML frontmatter:

```markdown
---
id: "202511150001"
title: "Topological Spaces"
tags: [topology, foundations]
category: prototype
description: "Introduction to topological spaces and open sets"
---

# Topological Spaces

A **topological space** is a pair $(X, \tau)$ where...

## Definition

$$
\tau \subseteq \mathcal{P}(X)
$$

See also: [[Metric Spaces]] and [[Continuous Functions]]

## References

- [@munkres2000] Chapter 2
```

### Converting Notes

```bash
cd obsidian-to-pretext
python convert.py my_notes/ ../source/
```

The converter:
- Parses YAML frontmatter for metadata
- Converts `[[wikilinks]]` to PreTeXt `<xref>` references
- Preserves LaTeX math (both inline `$...$` and display `$$...$$`)
- Maps categories to Diataxis chapters (prototype, tutorial, explanation, reference)
- Generates backlinks for bidirectional navigation

### Updating the Graph

After adding new notes, update the graph data:

```bash
python obsidian-to-pretext/generate_graph.py source/ graph-module/notes-graph.json
```

### Workflow for Continuous Sync

1. Write notes in Obsidian using the required frontmatter format
2. Run the converter when ready to publish
3. Build with `./build.sh`
4. Commit and push to deploy

---

## Adding New Notes

### Method 1: Direct PreTeXt XML

Create a new section in the appropriate chapter file (e.g., `source/ch-prototypes.ptx`):

```xml
<section xml:id="sec-your-note-id">
  <title>Your Note Title</title>
  
  <p><em>Note ID:</em> 202512160001 | <em>Tags:</em> tag1, tag2</p>
  
  <subsection>
    <title>Main Content</title>
    <p>Your content here with <m>x^2 + y^2 = z^2</m> inline math.</p>
    
    <definition>
      <title>Your Definition</title>
      <statement>
        <p>A formal definition using display math:</p>
        <me>\int_a^b f(x)\,dx = F(b) - F(a)</me>
      </statement>
    </definition>
  </subsection>
  
  <subsection>
    <title>Related Notes</title>
    <p>See <xref ref="sec-other-note"/> for more details.</p>
  </subsection>
</section>
```

### Method 2: Via Obsidian Converter

1. Write the note in Obsidian with proper frontmatter
2. Run the converter: `python obsidian-to-pretext/convert.py`
3. The note will be added to the appropriate chapter

### Updating Graph Data

After adding notes, update `graph-module/notes-graph.json`:

```json
{
  "nodes": [
    {
      "id": "sec-your-note-id",
      "title": "Your Note Title",
      "url": "sec-your-note-id.html",
      "tags": ["tag1", "tag2"],
      "description": "Brief description"
    }
  ],
  "links": [
    {
      "source": "sec-your-note-id",
      "target": "sec-related-note"
    }
  ]
}
```

---

## Building and Publishing

### Build Commands

```bash
# Full build with custom styling
./build.sh

# PreTeXt only (without custom CSS injection)
pretext build web

# Generate PDF (if configured)
pretext build pdf
```

### Build Script Details

The `build.sh` script:
1. Runs `pretext build web`
2. Copies custom CSS and assets to `output/web/external/`
3. Copies graph module files to `output/web/graph/`
4. Injects custom CSS link into all HTML files
5. Injects graph toggle script before `</body>`
6. Applies additional CSS overrides for TOC styling

### Publishing Options

1. **GitHub Pages**: Free hosting with custom domain support
2. **Netlify**: Drag-and-drop `output/web/` folder
3. **Vercel**: Connect GitHub repo and set output directory
4. **Self-hosted**: Upload `output/web/` to any web server

---

## Customization

### Changing Colors

Edit `assets/custom-theme.css` root variables:

```css
:root {
  --color-primary: #14b5ff;      /* Cyan */
  --color-secondary: #7952f5;    /* Purple */
  --color-bg: #0d1117;           /* Background */
  --color-text: whitesmoke;      /* Text */
}
```

### Changing Fonts

Update font imports and variables in `assets/custom-theme.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');

:root {
  --font-heading: 'YourFont', sans-serif;
  --font-body: 'Merriweather', serif;
}
```

### Graph Colors

The graph uses a pink-to-purple gradient based on connection count:
- **Pink** (`#ec4899`): Nodes with fewest connections
- **Purple** (`#7c3aed`): Nodes with most connections

To change, edit `assets/graph-toggle.js` in the `getNodeColor()` function.

### Background Image

Replace `assets/wisp.jpg` with your preferred background image.

---

## Tips for Mathematical Note-Taking

1. **Atomic Notes**: Each note should cover one concept
2. **Link Generously**: Use `<xref>` to connect related ideas
3. **Use Definitions/Theorems**: PreTeXt provides `<definition>`, `<theorem>`, `<proof>` elements
4. **Tag Consistently**: Create a taxonomy for easy navigation
5. **Review Graph**: Use the graph view to find isolated notes that need connections

---

## Troubleshooting

### Build Errors

```bash
# Check PreTeXt version
pretext --version

# Validate XML
pretext view  # Opens validation report
```

### Graph Not Showing

1. Check browser console for JavaScript errors
2. Verify `graph-module/notes-graph.json` is valid JSON
3. Ensure node IDs match section `xml:id` attributes

### Styling Not Applied

1. Hard refresh browser (Ctrl+Shift+R)
2. Verify `build.sh` completed successfully
3. Check that `output/web/external/custom-theme.css` exists

---

Happy note-taking!
