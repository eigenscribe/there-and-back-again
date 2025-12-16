# Zettelkasten-Diataxis Math Journal (PreTeXt Edition)

## Overview

This is a Zettelkasten-Diataxis hybrid mathematics journal built with PreTeXt. The project combines networked note-taking (Zettelkasten method) with PreTeXt's powerful mathematical typesetting and web publishing. Content is organized using the Diataxis framework (Prototypes, Tutorials, Explanations, Reference) and features MathJax for beautiful mathematical rendering, proper academic citations via BibTeX, and custom styling that preserves the original cyan-purple gradient design aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.
Content: No AI-generated content except layout and styling. Sample prototype notes include AI warnings.

## System Architecture

### PreTeXt Structure
- **PreTeXt 2.30.2**: Professional mathematical authoring and publishing system
- **XML Source Format**: Content authored in PreTeXt XML with semantic markup for mathematical structures
- **Diataxis Organization**: Notes organized into chapters following the Diataxis framework (Prototypes, Tutorials, Explanations, Reference)
- **MathJax Rendering**: Beautiful mathematical typesetting with MathJax integration
- **Networked Notes**: Cross-references between mathematical concepts using PreTeXt's `<xref>` system
- **Academic Citations**: Proper bibliography management with `<cite>` elements and backmatter references
- **Custom Styling**: CSS injected via build script to preserve original design aesthetic

### Build System
- **PreTeXt CLI 2.30.2**: Command-line tool for building HTML and PDF outputs
- **Custom Build Script**: `build.sh` handles PreTeXt build and CSS injection
- **Asset Management**: Images and custom assets stored in `/assets/` directory
- **HTML Output**: Generated to `/output/web/` directory with responsive modern theme
- **Development Server**: PreTeXt built-in server on port 5000 for live preview

### Styling Architecture
- **Design System**: Custom color palette with cyan-to-purple gradient scheme
- **Typography System**: Aclonica font for all headings, sidebar, and UI elements; Merriweather serif for body paragraphs (optimal readability for mathematical content)
- **Tag Styling**: Pill-style tags with 50px border radius, Aclonica font, gradient backgrounds, and hover effects
- **Glassmorphic Design**: Custom CSS classes for glass effects with backdrop blur
- **Responsive Design**: Custom responsive utilities for mobile-first approach
- **Custom Animations**: Gradient text animations and interactive hover effects
- **Collapsible Groups**: Smooth expand/collapse transitions for note category organization

### Development Workflow
- **PreTeXt Development**: Custom `build.sh` script for building and CSS injection
- **Live Preview**: PreTeXt server on port 5000 with automatic rebuilds
- **Content Editing**: Direct XML editing in `/source/` directory

## External Dependencies

### Core Dependencies
- **PreTeXt CLI 2.30.2**: Mathematical authoring and publishing system
- **Python 3.12**: Required for PreTeXt CLI
- **MathJax**: Automatic rendering of mathematical notation (loaded via CDN)
- **Runestone Services 7.9.18**: Interactive features and services for PreTeXt HTML output

### Build Tools
- **bash**: Shell scripting for custom build pipeline
- **sed**: Text processing for CSS injection into HTML files

### Asset Management
- **Custom Assets**: Logo, favicon, wisp background, orb decorations, ember and moon graphics
- **Static Assets**: Stored in `/assets/` directory and injected into PreTeXt build output
- **Font System**: Aclonica for headings/UI, Merriweather for body text, Fira Code for code blocks

## Deployment

The journal can be deployed to GitHub Pages for free public hosting:
- **GitHub Actions (Recommended)**: Automatic deployment on every push to main branch
- **Manual**: Using git subtree to push output/web to gh-pages branch
- **Build Command**: Always use `./build.sh` to preserve custom CSS and styling

See the tutorial section in the journal itself for complete deployment instructions.

## Recent Changes

### Repository Cleanup & Tutorial Update (Nov 13, 2025)
- **Removed Logs**: Deleted temporary logs directory from repository
- **Tutorial Enhancement**: Added comprehensive GitHub Pages deployment guide with two methods
- **Content Creation Guide**: Added detailed instructions for adding mathematical notes following Zettelkasten method
- **Workflow Documentation**: Documented recommended practices for building, committing, and deploying changes

### Repository Cleanup (Nov 13, 2025)
- **Added .gitignore**: Comprehensive ignore rules for Python, PreTeXt output, caches, and temporary files
- **Removed Legacy Code**: Deleted deprecated React client folder (project now fully on PreTeXt)
- **Cleaned Temporary Files**: Removed development logs, attached assets, and empty directories
- **Updated Documentation**: Streamlined replit.md to reflect current PreTeXt-only architecture

### CSS Overrides for Footer and TOC (Dec 16, 2025)
- **Footer Centering Fix**: Added CSS to override PreTeXt's float rules on footer images and paragraphs, ensuring flexbox layout centers logo and copyright text side-by-side
- **TOC Styling Cleanup**: Removed all default PreTeXt list markers, text transforms, font variants, and letter spacing from table of contents
- **Custom TOC Spacing**: Added explicit padding and margins to TOC items for clean, modern appearance without bullets or uppercase forcing
- **TOC Active State Fix**: Active leaf items (notes/sections) now show cyan-purple gradient background. Parent items with `.contains-active` class (Front Matter, chapter headings) retain PreTeXt's default red styling due to deep framework specificity.
- **TOC Rounded Corners**: Increased border-radius to 16px for sidebar items
- **Top Navigation Buttons**: Increased opacity for better visibility (rgba(26, 27, 29, 0.98))
- **Bottom Footer Hidden**: Removed redundant bottom navigation footer container

### PreTeXt Conversion (Nov 13, 2025)
- **Complete Migration**: Converted entire project from React/Vite to PreTeXt XML format
- **Content Preservation**: All mathematical notes (topology, metric spaces, continuous functions, sequences) migrated to PreTeXt sections
- **Citation System**: Implemented proper `<cite>` elements linking to backmatter bibliography (luhmann1984, munkres2000, rudin1976, spivak2008, apostol1974)
- **Custom Styling**: Preserved original cyan-purple gradient design using CSS injection via `build.sh` script
- **Glassmorphic Effects**: Maintained dark theme with backdrop blur effects on masthead, sidebar, content areas, and footer
- **Typography Preservation**: Aclonica font for all headings (with gradient effects), Merriweather serif for body text, Fira Code for code blocks
- **Build Workflow**: Created custom `build.sh` script that builds PreTeXt HTML and injects custom CSS automatically
- **Development Server**: PreTeXt server running on port 5000 with live preview capability
- **Project Structure**: Clean XML organization with source files in `/source/`, assets in `/assets/`, output in `/output/web/`
- **Navigation Styling**: All buttons (top nav and footer) use glassmorphic gradient backgrounds with cyan-to-purple theme and smooth hover animations
- **Footer Branding**: Custom eigenscribe © 2025 footer with logo and gradient text, centered navigation buttons  
- **Selected Section Styling**: Active TOC sections have subtle cyan background (`rgba(20, 181, 255, 0.15)`) with cyan border
- **Page Footer**: Custom eigenscribe © 2025 branding with logo and copyright text side-by-side, centered together; replaces default PreTeXt/Runestone/MathJax attribution links
- **Theme Button Removed**: Light/dark theme switcher hidden via CSS (`#light-dark-button`) - dark glassmorphic theme only


## Recent Additions

### Graph Toggle Integration (Dec 16, 2025)
- **Graph Button**: Added "Graph" toggle button in top navigation bar
- **Full-Screen Overlay**: D3.js force-directed graph visualization opens in full-screen overlay
- **Features**: Zoom/pan controls, node hover highlighting, tooltips with descriptions and tags, click-to-navigate
- **Keyboard Support**: Press Escape to close graph view
- **Build Integration**: build.sh copies graph files and injects module script into all HTML pages
- **Files Added**: assets/graph-toggle.js for toggle functionality, output/web/graph/ for runtime assets

### Graph Visualization Module (Dec 16, 2025)
- **Location**: `graph-module/`
- **Purpose**: Framework-agnostic D3.js graph visualization for notes
- **Files**: graph.html, graph.js, graph.css, notes-graph.json schema
- **Features**: Self-contained module, hover tooltips, click-to-navigate, dark mode toggle, zoom controls

### Obsidian to PreTeXt Pipeline (Dec 16, 2025)
- **Location**: `obsidian-to-pretext/`
- **Purpose**: Convert Obsidian Markdown notes to PreTeXt XML
- **Files**: convert.py, MAPPING.md, README.md, example notes
- **Features**: YAML frontmatter, wikilinks → xref, MathJax preservation, backlink generation

## Repository Structure

PreTeXt project structure:
```
source/                    # PreTeXt XML source files
├── main.ptx              # Main document structure
├── frontmatter.ptx       # Title page and abstract
├── docinfo.ptx           # Document metadata and macros
├── ch-prototypes.ptx     # Prototype mathematical notes
├── ch-tutorials.ptx      # Tutorial notes (Local Setup Guide)
├── ch-explanations.ptx   # Explanation notes (placeholder)
├── ch-reference.ptx      # Reference notes (placeholder)
└── backmatter.ptx        # Bibliography and index
assets/                   # Static assets (logo, images, custom CSS)
├── custom-theme.css      # Custom styling matching original design
├── ember.png            # Ember graphic
├── favicon.png          # Browser favicon
├── logo.png             # Header logo
├── moon.png             # Moon graphic
├── orb.png              # Orb decoration
└── wisp.jpg             # Background image with glowing effects
output/                   # Generated HTML output (gitignored)
publication/              # Publication settings
project.ptx               # Project manifest
build.sh                  # Custom build script (builds + injects CSS)
xsl/                      # Custom XSL stylesheets
requirements.txt          # Python dependencies (PreTeXt CLI)
.gitignore               # Git ignore configuration
replit.md                 # Project documentation
README.md                # PreTeXt project README
USAGE_GUIDE.md           # User guide for the journal
```

## Sample Notes

### Local Setup Guide (Tutorial)
Comprehensive tutorial note (ID: 202511100005) in the Tutorials section explaining how to run the Zettelkasten project locally:
- Prerequisites: Node.js, Python (optional), Git
- Downloading project from Replit (ZIP or Git)
- Installing dependencies and running development server
- Making changes to notes and building for production
- Customization tips for fonts, colors, and images
- Troubleshooting common setup issues
- Backup strategies for preserving note data