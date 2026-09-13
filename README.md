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
- **Automated CI/CD**: Dual platform build scripts (Bash/PowerShell) and GitHub Actions workflows for continuous compilation and deployment to GitHub Pages and Cloudflare Pages.

---

## Tech Stack

- **Core Framework**: [PreTeXt CLI](https://pretextbook.org) (`>=2.50.0`)
- **Languages**:
  - **Python** (`>=3.11`): Build orchestration, graph generation, reference conversion, and Obsidian translation pipelines
  - **XML / PreTeXt / XSLT / LaTeX**: Structured document authoring, publisher settings, and PDF typesetting
  - **JavaScript (ES Modules) & CSS3**: UI widgets, custom glassmorphic styling, and interactive D3.js network visualization
  - **Bash / PowerShell / Perl**: Cross-platform build automation and HTML post-processing
- **Libraries & Tools**:
  - [D3.js v7](https://d3js.org/): Interactive note graph network rendering
  - [MathJax](https://www.mathjax.org/): Web mathematical notation rendering
  - [Lunr.js](https://lunrjs.com/): Client-side offline search indexing
  - [PyYAML](https://pyyaml.org/): Frontmatter parsing in the Obsidian converter
  - [bibtexparser](https://bibtexparser.readthedocs.io/): BibTeX-to-PreTeXt reference parsing
  - [Pillow](https://python-pillow.org/) / [pdfcropmargins](https://github.com/bpvest/pdfCropMargins) / [Playwright](https://playwright.dev/): Asset extraction and management
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
  - **Node.js**: (Version 22+) For advanced web asset development or Playwright browser automation

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

This project provides synchronized dual build scripts that execute PreTeXt compilation, update the graph index, copy assets and widgets, and apply post-processing injections (custom glassmorphic theme, search enhancements, fonts, and metadata):

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

# Build all deploy targets
pretext build --deploys

# Stage deployment without publishing
pretext deploy --stage-only

# Preview local web server (serves output/web)
pretext view web

# Deploy output to configured hosting
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
| `source/main.ptx` | Main PreTeXt document root incorporating `docinfo.ptx`, `frontmatter/`, parts, and `backmatter/` |
| `project.ptx` | PreTeXt project manifest defining build targets (`web`, `print`) and output paths |
| `publication/publication.ptx` | Publication configuration controlling chunking, numbering, and HTML/LaTeX styling |
| `build.sh` / `build.ps1` | Primary build scripts for web generation, asset synchronization, graph update, and HTML post-processing |
| `graph-module/update_graph.py` | Scans `.ptx` files in `source/` to regenerate `graph-module/notes-graph.json` |
| `graph-module/graph.html` | Standalone interactive note connection visualizer |
| `obsidian-to-pretext/convert.py` | CLI tool converting Obsidian markdown vaults to PreTeXt `.ptx` XML sections |
| `SOFIAS-FOLDER/references/build_references.py` | Helper script converting `references.bib` BibTeX entries into PreTeXt `<references>` XML |

### Using the Obsidian Converter

Convert an Obsidian vault into PreTeXt XML sections:
```bash
python obsidian-to-pretext/convert.py /path/to/obsidian/vault ./output --generate-graph --verbose
```
Refer to `obsidian-to-pretext/README.md` and `obsidian-to-pretext/MAPPING.md` for syntax mapping details.

### Updating Note Graph Data

To manually regenerate note graph data independently of the full build:
```bash
python graph-module/update_graph.py
```

---

## Environment Variables & Configuration

- **Local Path**:
  - `PATH`: The build scripts automatically prepend `./.bin` to `$PATH` if present for local validator binaries.
- **Continuous Integration (CI/CD)**:
  - `PTX_ENABLE_DEPLOY_GHPAGES`: Set to `'yes'` in repository variables to enable automated deployment to GitHub Pages via GitHub Actions.
  - `GITHUB_TOKEN`: Standard GitHub Actions secret used for authenticating deployments and workflow triggers.
  - `CLOUDFLARE_PROJECT_NAME`: Repository variable specifying the target Cloudflare Pages project name.
  - `CLOUDFLARE_API_TOKEN`: Repository secret token for deploying build artifacts to Cloudflare Pages.
  - `CLOUDFLARE_ACCOUNT_ID`: Repository secret identifier for the target Cloudflare account.
- **`TODO`**: Document any custom remote asset storage URLs, private package registry credentials, or additional production deployment environment variables as they are introduced.

---

## Testing & Quality Assurance

- **PreTeXt Build Validation**: Run `./build.sh` (or `pretext build web`) to validate XML structure, internal cross-references, and schema compliance.
- **Graph Schema Validation**: Ensure `graph-module/notes-graph.json` complies with `graph-module/notes-graph-schema.json`.
- **Conversion Verification**: Review sample conversion input and output in `obsidian-to-pretext/example-notes/` and `obsidian-to-pretext/test-output/`.
- **Continuous Integration**:
  - `.github/workflows/pretext-cli.yml`: Pull request and manual workflow for building in `oscarlevin/pretext-full` container and staging deployment.
  - `.github/workflows/pretext-deploy.yml`: Workflow for building and pushing deploy artifacts to the `gh-pages` branch.
- **`TODO`**: Add automated test suite (e.g. `pytest` unit tests for `update_graph.py` and `convert.py`, XML linter validation, and end-to-end browser tests via Playwright).

---

## Project Structure

```
there-and-back-again/
├── .github/
│   └── workflows/              # GitHub Actions CI/CD workflows
│       ├── pretext-cli.yml     # Pull request validation and Cloudflare/Pages staging
│       └── pretext-deploy.yml  # Manual build and deploy to gh-pages branch
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
│   ├── example-notes/          # Sample Obsidian notes
│   └── test-output/            # Sample conversion outputs
├── SOFIAS-FOLDER/              # Reference tools and usage guides
│   ├── references/             # BibTeX reference files & build_references.py
│   └── USAGE-GUIDES/           # Reference authoring guides
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
│   ├── print/                  # Compiled PDF document
│   └── stage/                  # Staged deployment artifacts
├── build.sh                    # Unix build & post-processing script
├── build.ps1                   # Windows PowerShell build script
├── project.ptx                 # PreTeXt project manifest
├── pyproject.toml              # Project configuration and dependencies (uv)
├── requirements.txt            # Locked pip dependencies
├── uv.lock                     # Locked dependency tree for uv
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