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
- **Client Development**: Vite dev server on port 3000 with HMR
- **Backend Development**: Flask development server with CORS for API testing
- **Code Quality**: ESLint configuration with React-specific rules and hooks linting

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
- **Custom Assets**: Dragon logo, triquetra favicon, wisp background with glowing orbs, and orb footer decoration
- **Static Assets**: Served from `/client/public/assets/` during development and `/public/assets/` in production
- **Build Assets**: Compiled CSS and JavaScript served from `/client/dist/`
- **Font System**: Aclonica for headings/UI, Merriweather for body text, Fira Code for code blocks

## Recent Changes

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
- **Footer Branding**: Custom eigenscribe © 2025 footer with dragon logo and gradient text, centered navigation buttons
- **Selected Section Styling**: All selected sections (root and subsections) use purple theme to avoid clashing with gradient text
- **Page Footer**: Custom eigenscribe © 2025 branding with dragon logo positioned at absolute bottom of every page

### Original React Version (Nov 10, 2025)

### Tag System Enhancement
- Implemented pill-style tags with 50px border radius matching reference design
- Updated all tags to use Aclonica font for visual consistency
- Added gradient backgrounds and hover effects to tags throughout the application
- Sidebar tags reduced to minimal size (0.55rem) for clean, compact appearance
- Tags now have smooth transitions and subtle shadow effects

### Diataxis Note Grouping System
- Implemented collapsible note groups in sidebar following Diataxis framework
- Five category groups: Prototypes, Tutorials, How-to Guides, Explanations, Reference
- All groups show count including zeros for transparency (e.g., "PROTOTYPES (4)", "TUTORIALS (0)")
- All groups start collapsed by default for clean initial view
- Groups visually grouped with subtle background containers
- Tighter spacing between notes for cohesive appearance
- Empty groups show "No notes yet" placeholder to indicate available categories
- All groups expand/collapse independently with smooth animations
- Current sample notes categorized under "Prototypes" group

### Note Metadata Refinement
- Reorganized note header: title first, then tags (left) and ID (right)
- Note ID badge with magical purple glow effect and square corners for vintage indexing aesthetic
- ID displays as compact digital-style badge with subtle neon effect
- Tags positioned below title for better visual hierarchy
- Reduced metadata size for cleaner content presentation

### Linked Notes Enhancement
- Linked notes now display note titles instead of IDs for better readability
- Redesigned linked note buttons with subtle, minimal styling
- Buttons use muted colors and only highlight on hover
- Smooth horizontal slide animation on hover
- Changed from monospace to body font for natural reading

### User Assets Integration
- Integrated custom dragon logo in header
- Set triquetra knot as browser favicon
- Applied mystical wisp background with glowing cyan orbs
- Added orb decoration to footer with soft glow effect

### Knowledge Graph Visualization
- Implemented interactive knowledge graph page to visualize note network connections
- Physics-based force-directed graph shows all notes as nodes with bidirectional links as edges
- Nodes color-coded by Diataxis category (purple for prototypes, with distinct colors for other categories)
- Node sizes reflect connection count - more linked notes appear larger
- Custom canvas rendering with Aclonica font labels and glowing effects matching site aesthetics
- Click-to-navigate functionality - clicking any node navigates to that note in the main view
- Header navigation with "Notes" and "Graph" links for seamless page switching
- Legend showing category color mappings for easy interpretation
- Glassmorphic container with backdrop blur maintains visual consistency with rest of app
- Graph auto-zooms to fit all nodes on load for optimal initial view
- Responsive design with mobile-optimized layouts

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
├── dragon.png           # Dragon logo
└── triquetra.png        # Triquetra favicon
output/web/               # Generated HTML output (not committed)
publication/              # Publication settings
project.ptx               # Project manifest
build.sh                  # Custom build script (builds + injects CSS)
xsl/                      # Custom XSL stylesheets
client/                   # Original React version (preserved for reference)
replit.md                 # Project documentation
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