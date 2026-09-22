# Agent Development Guide for There and Back Again

This document provides project-specific technical reference, build instructions, testing workflows, and development guidelines for advanced developers and autonomous agents working on **There and Back Again**.

---

## 1. Project Architecture & Tooling

The project is an interactive mathematical knowledge base and networked Zettelkasten notebook constructed using [PreTeXt](https://pretextbook.org). It combines semantic XML source compilation with a Python-based post-processing and graph data pipeline.

### Core Components
- **PreTeXt Source (`source/`)**: Modular `.ptx` XML documents defining chapters, sections, definitions, theorems, and metadata.
- **Project Manifest (`project.ptx`)**: Configuration defining build targets (`web`, `print`) and publication options.
- **Dual Build Orchestration (`build.ps1` / `build.sh`)**: Platform-specific build scripts that invoke the PreTeXt compiler, copy assets, update the D3.js knowledge graph, and run HTML post-processing.
- **Graph Generator (`graph-module/update_graph.py`)**: Traverses `source/**/*.ptx` to parse node titles, XML IDs, cross-references (`<xref ref="..."/>`), `<tag>`, `<idx>`, and `#hashtag` tokens into `notes-graph.json`.
- **HTML Postprocessor (`scripts/postprocess_html.py`)**: Traverses `output/web/**/*.html` to inject glassmorphic CSS, font imports, D3 graph scripts, search fixes, emoji wrappers (`<span class="toc-emoji">`), and sanitize the Lunr search index.
- **Obsidian Translation Pipeline (`obsidian-to-pretext/convert.py`)**: Standalone converter translating Obsidian Markdown notes with YAML frontmatter, wikilinks `[[...]]`, and LaTeX math blocks into PreTeXt XML sections.
- **Reference Generator (`SOFIAS-FOLDER/references/build_references.py`)**: Converts BibTeX citations into PreTeXt `<references>` XML format.

---

## 2. Build & Configuration Instructions

### Prerequisites
- **Python**: `>=3.11` (Python 3.12 recommended)
- **Package Manager**: `uv` (recommended) or `pip`
- **Shell**: PowerShell (Windows) or Bash/Zsh (Linux/macOS)

### Environment Setup
Activate the virtual environment:
```powershell
# Using uv (recommended)
uv sync

# Virtual environment activation (Windows PowerShell)
.venv\Scripts\Activate.ps1

# Virtual environment activation (Linux / macOS)
source .venv/bin/activate
```

*Note on external dependencies*: The core virtual environment includes `pretext` (2.53+), `prefig`, `lxml`, and related packages. The Obsidian converter script requires `pyyaml` (`uv run --with pyyaml python obsidian-to-pretext/convert.py ...`), and the reference builder requires `bibtexparser`.

### Running the Full Build
Always use the synchronized root build script to ensure all assets, graph nodes, and post-processing steps are generated:

- **Windows PowerShell**:
  ```powershell
  .\build.ps1
  ```
- **macOS / Linux**:
  ```bash
  ./build.sh
  ```

### Build Pipeline Lifecycle
1. **Cache Purge**: Removes `.build/`, `.ptx/`, and `output/web/` to guarantee deterministic builds.
2. **PreTeXt Compilation**: Executes `pretext build web` to render XML source into `output/web/`.
3. **Asset Deployment**: Copies `.nojekyll`, `assets/custom-theme.css`, `assets/elements/`, images, and interactive widgets (`assets/widgets/periodic-table/`) into `output/web/external/`.
4. **Graph Generation**: Executes `python graph-module/update_graph.py` which compiles `notes-graph.json` into `output/web/graph/`.
5. **HTML Postprocessing**: Executes `python scripts/postprocess_html.py` which modifies output HTML files in-place and sanitizes `output/web/lunr-pretext-search-index.js`.

### PreTeXt CLI Commands
Direct CLI commands when developing or inspecting single targets:
```bash
# Build HTML web target
uv run pretext build web

# View built web output locally
uv run pretext view web

# Build PDF print target (requires LaTeX / TeX Live)
uv run pretext build print
```

### Local Development Server
To inspect the built output directly via HTTP server:
```powershell
python -m http.server 5000 --directory output/web
```
Then navigate to `http://localhost:5000`.

---

## 3. Testing Information

### Test Frameworks & Execution
The project uses standard Python testing tools. You can run tests using Python's built-in `unittest` module or with `pytest` via `uv`:

#### 1. Running Tests with `unittest` (Standard Library)
```powershell
# Run a specific test module
uv run python -m unittest test_module.py

# Discover and run all tests in a directory
uv run python -m unittest discover -s tests -p "test_*.py"
```

#### 2. Running Tests with `pytest` via `uv`
```powershell
uv run --with pytest pytest
uv run --with pytest pytest path/to/test_file.py
```

### Testing Guidelines & Patterns

When adding automated tests for pipeline scripts (`scripts/postprocess_html.py`, `graph-module/update_graph.py`, `obsidian-to-pretext/convert.py`):
1. **Path Resolution**: Scripts are distributed across subfolders (`scripts/`, `graph-module/`, `obsidian-to-pretext/`). Ensure tests configure `sys.path` or set `PYTHONPATH=.`.
2. **Emoji Parsing Behavior**: `scripts/postprocess_html.py` wraps contiguous Unicode emojis into a single `<span class="toc-emoji">...</span>` and skips emojis within `<code>`, `<pre>`, `<script>`, `<style>`, and `<math>` tags.
3. **Graph Extraction**: `graph-module/update_graph.py` extracts tags from `<tag>`, `<idx><term>`, and `#hashtag` patterns in the XML tree.
4. **ID Generation**: `obsidian-to-pretext/convert.py` strips non-alphanumeric characters, hyphenates strings, and prefixes IDs with `sec-`.

### Verified Test Example
The following tested test suite demonstrates testing core utilities across the pipeline:

```python
import unittest
import sys
from pathlib import Path
import xml.etree.ElementTree as ET

# Configure path imports
root_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(root_dir / "scripts"))
sys.path.insert(0, str(root_dir / "graph-module"))

from postprocess_html import wrap_emoji_in_html
from update_graph import get_tags, get_title


class TestProjectUtilities(unittest.TestCase):
    def test_wrap_emoji_in_html(self):
        input_html = "<p>Welcome to the project! 🚀✨</p>"
        processed = wrap_emoji_in_html(input_html)
        # Consecutive emojis are matched together into a single span
        self.assertEqual(processed, '<p>Welcome to the project! <span class="toc-emoji">🚀✨</span></p>')

    def test_skip_emoji_inside_code(self):
        input_html = "<code>🚀 do not touch</code>"
        processed = wrap_emoji_in_html(input_html)
        self.assertEqual(input_html, processed)

    def test_get_tags_and_title_from_xml(self):
        xml_content = """
        <section xml:id="sec-sample">
            <title>Sample Section</title>
            <tag>physics, mathematics</tag>
            <idx><term>quantum</term></idx>
            <p>Here is #linear-algebra concept.</p>
        </section>
        """
        elem = ET.fromstring(xml_content)
        title = get_title(elem)
        tags = get_tags(elem)

        self.assertEqual(title, "Sample Section")
        self.assertIn("physics", tags)
        self.assertIn("mathematics", tags)
        self.assertIn("quantum", tags)
        self.assertIn("linear algebra", tags)


if __name__ == "__main__":
    unittest.main()
```

---

## 4. Additional Development Guidelines

### Dual Build Script Synchronization (CRITICAL)
- The repository maintains two synchronized build scripts:
  - `build.ps1` for Windows PowerShell.
  - `build.sh` for Unix/Linux/macOS shells.
- **Rule**: Whenever modifying build steps, asset copy commands, or post-processing invocations, you **MUST** update both `build.ps1` and `build.sh` simultaneously.

### PreTeXt XML Conventions
- **XML IDs**: Every `<chapter>`, `<section>`, `<subsection>`, `<definition>`, `<theorem>`, `<figure>`, and `<table`> must have a unique `xml:id`.
  - Prefix sections with `sec-`, subsections with `subsec-`, chapters with `ch-`, and tables with `tab-`.
- **Mathematical Notation**:
  - Use `<m>...</m>` for inline math expressions.
  - Use `<me>...</me>` for single-line display math without alignment.
  - Use `<md><mrow>...</mrow></md>` for multiline aligned display equations.
  - Do not use raw unescaped LaTeX symbols (`<`, `>`, `&`) directly in text; use XML entities (`&lt;`, `&gt;`, `&amp;`) or place inside `<m>`/`<me>`/`<md>`.
- **Cross-References**: Use `<xref ref="target-xml-id"/>` for internal linking.

### Graph & Tagging Conventions
- Note nodes are automatically detected by `graph-module/update_graph.py` from any XML element with an `xml:id` belonging to `supported_tags` (`chapter`, `section`, `subsection`, `appendix`, `claim`, `definition`, `example`, `theorem`, `lemma`, `proposition`, `corollary`, `identity`, `gi`, `glossary`).
- Tags can be declared using:
  - `<tag>tag1, tag2</tag>`
  - `<idx><term>tag</term></idx>`
  - Inline hashtag format in paragraphs: `#tag-name` (hyphens convert to spaces).
- Note groups and visualization colors are governed by top-level source folders (`source/scribing`, `source/backmatter`, `source/meta`, `source/practice-problems`, etc.). If adding new top-level categories, register their colors in `group_colors` inside `graph-module/update_graph.py`.

### HTML Postprocessing Invariants
- `scripts/postprocess_html.py` performs in-place DOM string manipulations on compiled HTML output:
  - Custom twemoji placeholders (`:favicon:`, `:proofmark:`, `:eigenote:`, `:ember:`, `:logo:`) are converted to `<span class="twemoji" ...></span>`.
  - Top-level files receive `<link rel="stylesheet" href="external/custom-theme.css">`, font references, tab handlers, D3 graph scripts, and custom header/footer injections.
  - When editing `scripts/postprocess_html.py`, ensure regex tokens properly isolate tags (`<[^>]+>`) from raw text to prevent corrupting tag attributes or script contents.
