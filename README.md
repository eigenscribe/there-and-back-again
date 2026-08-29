# There and Back Again

> A PreTeXt-based mathematical knowledge base and networked Zettelkasten journal for Eigenscribe Inc.

---

## Overview

**There and Back Again** is an interactive, networked mathematical notebook built with [PreTeXt](https://pretextbook.org). It integrates a Zettelkasten note-taking methodology, Diataxis content structuring, interactive D3.js force-directed graph visualization, custom glassmorphic styling, and an Obsidian Markdown-to-PreTeXt conversion pipeline.

Key capabilities include:
- **PreTeXt Authoring**: Semantic XML source compiled into accessible HTML and publication-quality LaTeX PDF output.
- **Interactive Graph Visualization**: D3.js force-directed graph connecting notes, definitions, theorems, and topics with dynamic filtering and navigation.
- **Obsidian Integration**: Automated pipeline to convert Obsidian Markdown notes (wikilinks, tags, math blocks) into structured PreTeXt XML.
- **Custom Theming**: Dark/light glassmorphic UI with responsive typography, custom emoji support, Prism syntax highlighting, and interactive widgets.

---

## Tech Stack

- **Core Framework**: [PreTeXt CLI](https://pretextbook.org) (`>=2.50.0`)
- **Languages**: 
  - **Python** (`>=3.11`) for build orchestration, graph generation, and conversion pipelines
  - **XML / PreTeXt / XSLT / LaTeX** for structured document authoring and PDF typesetting
  - **JavaScript (ES Modules) & CSS3** for UI widgets, theming, and D3.js visualization
  - **Bash / PowerShell / Perl** for cross-platform build automation and HTML post-processing
- **Libraries & Tools**:
  - [D3.js v7](https://d3js.org/) for graph network rendering
  - [MathJax](https://www.mathjax.org/) for web mathematics rendering
  - [Lunr.js](https://lunrjs.com/) for client-side search
  - [PyYAML](https://pyyaml.org/) for frontmatter parsing in the Obsidian converter
  - [Pillow](https://python-pillow.org/) / [pdfcropmargins](https://github.com/bpvest/pdfCropMargins) / [Playwright](https://playwright.dev/) for asset extraction and management
- **Package Management**:
  - `uv` (`pyproject.toml`, `uv.lock`)
  - `pip` (`requirements.txt`)

---

## Requirements & Prerequisites

- **Python**: Version 3.11 or higher
- **Package Manager**: `uv` (recommended) or `pip`
- **Shell Environment**:
  - **macOS / Linux**: Bash / Zsh with standard Unix utilities (`perl`, `find`)
  - **Windows**: PowerShell 5.1+ or PowerShell 7+
- **Optional Tools**:
  - **TeX Live / LaTeX**: Required only for compiling PDF print output (`pretext build print`) or rendering standalone TikZ/PGF diagrams
  - **Node.js**: (Optional) For advanced web asset development or Playwright browser automation

---

## Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/eigenscribe/there-and-back-again.git
cd there-and-back-again
```

### 2. Set Up Virtual Environment

Using **uv** (recommended):
```bash
uv sync
source .venv/bin/activate   # On Windows: .venv\Scripts\Activate.ps1
```

Using standard **Python venv & pip**:
```bash
python3 -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

## Build & Run Commands

### Full Automated Build (Recommended)

This project provides dual build scripts that run PreTeXt compilation, update the graph index, copy assets and widgets, and apply post-processing injections (custom glassmorphic theme, search enhancements, fonts, and metadata):

- **macOS / Linux**:
  ```bash
  ./build.sh
  ```
- **Windows (PowerShell)**:
  ```powershell
  .\build.ps1
  ```

> [!IMPORTANT]
> **Dual Build Script Notice:** This project maintains both `build.sh` (Unix) and `build.ps1` (Windows PowerShell). When modifying build logic or post-processing steps, ensure both scripts are kept in sync.

### PreTeXt CLI Commands

Once your virtual environment is active, you can invoke PreTeXt directly:

```bash
# Build web output (HTML)
pretext build web

# Build print output (PDF via LaTeX)
pretext build print

# Preview local web server (serves output/web)
pretext view web

# Deploy output to GitHub Pages
pretext deploy
```

### Manual Local Preview

If you prefer using Python's built-in HTTP server to inspect the generated build:
```bash
cd output/web
python3 -m http.server 5000
# Open http://localhost:5000 in your browser
```

---

## Scripts & Entry Points

| Script / Entry Point | Description |
|----------------------|-------------|
| `source/main.ptx` | Main PreTeXt document root incorporating frontmatter, parts, and backmatter |
| `build.sh` / `build.ps1` | Primary build scripts for web generation, asset sync, graph update, and HTML post-processing |
| `graph-module/update_graph.py` | Scans `.ptx` files in `source/` to regenerate `graph-module/notes-graph.json` |
| `graph-module/graph.html` | Standalone interactive note connection visualizer |
| `obsidian-to-pretext/convert.py` | CLI tool converting Obsidian markdown vaults to PreTeXt `.ptx` XML files |
| `project.ptx` | PreTeXt project manifest defining build targets (`web`, `print`) |
| `publication/publication.ptx` | PreTeXt publication configuration controlling chunking, numbering, and HTML/LaTeX styling |

### Using the Obsidian Converter

Convert an Obsidian vault into PreTeXt XML sections:
```bash
python obsidian-to-pretext/convert.py /path/to/obsidian/vault ./output --generate-graph --verbose
```
Refer to `obsidian-to-pretext/README.md` and `obsidian-to-pretext/MAPPING.md` for syntax mapping details.

---

## Environment Variables & Configuration

- **`PATH`**: The build scripts automatically prepend `./.bin` to `$PATH` if present for local validator binaries.
- **`TODO`**: Document any custom continuous integration (CI) tokens, remote asset storage URLs, or automated deployment environment variables as they are introduced.

---

## Testing & Quality Assurance

- **PreTeXt Build Validation**: Run `./build.sh` (or `pretext build web`) to validate XML structure, internal cross-references, and schema compliance.
- **Graph Schema Validation**: Ensure `graph-module/notes-graph.json` complies with `graph-module/notes-graph-schema.json`.
- **Conversion Verification**: Review sample conversion output in `obsidian-to-pretext/test-output/`.
- **`TODO`**: Add automated continuous integration (CI) workflows (e.g. GitHub Actions) with unit tests (`pytest`), XML linter validation, and end-to-end browser tests via Playwright.

---

## Project Structure

```
there-and-back-again/
├── source/                      # PreTeXt XML source files
│   ├── main.ptx                # Document root & structure
│   ├── docinfo.ptx             # Metadata, macros, TikZ/LaTeX preambles
│   ├── frontmatter/            # Acknowledgements, conventions, methodology
│   ├── scribing/               # Scribing chapters, bridges, eigenotes, field notes
│   ├── practice-problems/      # Practice problems and exercises
│   ├── meta/                   # Knowledge structures, cheat sheets, standards
│   └── backmatter/             # Foundations, appendices, reference materials
├── assets/                      # Static assets, themes, and interactive components
│   ├── custom-theme.css        # Glassmorphic custom CSS
│   ├── graph-toggle.js         # Embedded graph toggle overlay script
│   ├── d3.min.js               # D3.js library bundle
│   ├── widgets/                # Interactive widgets (e.g., periodic table)
│   └── elements/               # UI components (e.g., tabs.js)
├── graph-module/               # D3.js interactive graph visualizer
│   ├── graph.html              # Standalone graph page
│   ├── graph.js                # NotesGraph ES Module
│   ├── graph.css               # Graph styling and theme variables
│   ├── update_graph.py         # Source parser and graph generator
│   ├── notes-graph.json        # Compiled note graph data
│   └── notes-graph-schema.json # JSON Schema for graph verification
├── obsidian-to-pretext/        # Obsidian-to-PreTeXt translation pipeline
│   ├── convert.py              # Markdown-to-PTX converter script
│   ├── MAPPING.md              # Markdown-to-PreTeXt syntax reference
│   └── example-notes/          # Sample Obsidian notes
├── publication/                # PreTeXt publication configuration
│   └── publication.ptx         # Chunking, numbering, and publisher settings
├── generated-assets/           # PreTeXt-generated diagrams & figures
│   ├── mermaid/                # Generated Mermaid diagrams
│   ├── prefigure/              # Generated Prefigure assets
│   ├── qrcode/                 # Generated QR codes
│   └── webwork/                # WeBWorK problem assets
├── guidelines/                 # Project documentation and usage guides
│   └── USAGE_GUIDE.md          # Comprehensive workflow and authoring guide
├── output/                     # Generated build output (gitignored)
│   ├── web/                    # Compiled HTML site
│   └── print/                  # Compiled PDF document
├── build.sh                    # Unix build & post-processing script
├── build.ps1                   # Windows PowerShell build script
├── project.ptx                 # PreTeXt project manifest
├── pyproject.toml              # Project configuration and dependencies (uv)
├── requirements.txt            # Locked pip dependencies
└── LICENSE                     # MIT License
```

---

## PreTeXt Authoring & Environment Tips

### Learning PreTeXt

- [PreTeXt Documentation](https://pretextbook.org/documentation.html): Official guides and publisher references.
- [Sample Book](https://pretextbook.org/examples/sample-book/annotated/): Reference for division, theorem, and exercise syntax.

### Working in GitHub Codespaces / Containers

If developing in a Codespace or minimalist container:
- **Missing LaTeX packages**: Install via `tlmgr`:
  ```bash
  tlmgr install <package-name>
  tlmgr path add
  ```
- **SageMath**: Install if generating `<sageplot>` images.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

Copyright © 2025 eigenscribe.