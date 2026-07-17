# Obsidian to PreTeXt Conversion Pipeline

Convert your Obsidian Markdown notes to PreTeXt XML format for professional mathematical publishing.

## Features

- **YAML Frontmatter** parsing (title, tags, aliases)
- **Wikilink conversion** to PreTeXt `<xref>` elements
- **MathJax preservation** (`$inline$` → `<m>`, `$$block$$` → `<md>`)
- **One note = one section** with stable `xml:id`
- **Automatic backlink generation**
- **Graph data export** for visualization

## Quick Start

```bash
# Install dependencies
pip install pyyaml

# Convert notes
python convert.py /path/to/obsidian/vault ./output

# With graph generation
python convert.py /path/to/vault ./output --generate-graph --verbose
```

## Usage

```
usage: convert.py [-h] [-v] [--generate-graph] [--graph-output GRAPH_OUTPUT]
                  input_dir output_dir

Convert Obsidian Markdown notes to PreTeXt XML

positional arguments:
  input_dir             Obsidian vault or notes directory
  output_dir            Output directory for PreTeXt files

optional arguments:
  -h, --help            show this help message and exit
  -v, --verbose         Verbose output
  --generate-graph      Generate notes-graph.json for visualization
  --graph-output PATH   Path for graph JSON output (default: notes-graph.json)
```

## Output Structure

```
output/
├── sec-note-title.ptx      # One file per note
├── sec-another-note.ptx
├── _includes.ptx           # xi:include statements for easy import
└── notes-graph.json        # Graph data (if --generate-graph)
```

## Integration with PreTeXt

### Option 1: Include All Notes in a Chapter

```xml
<chapter xml:id="ch-notes">
<title>My Notes</title>

<xi:include href="converted/sec-note-1.ptx"/>
<xi:include href="converted/sec-note-2.ptx"/>
<!-- Or use generated _includes.ptx as reference -->

</chapter>
```

### Option 2: Selective Import

Copy specific `.ptx` files to your source directory and include them where needed.

## Requirements

- Python 3.8+
- PyYAML (`pip install pyyaml`)

## Obsidian Note Format

### Recommended Frontmatter

```yaml
---
title: Note Title
tags: [tag1, tag2]
aliases: [alternate name, another alias]
created: 2024-01-15
---
```

### Supported Markdown Elements

- Headers (`#`, `##`, `###`)
- Bold (`**text**`)
- Italic (`*text*`)
- Inline code (`` `code` ``)
- Code blocks (``` ```language ```)
- Wikilinks (`[[Note]]`, `[[Note|Display]]`)
- External links (`[text](url)`)
- Inline math (`$x^2$`)
- Block math (`$$\sum_{i=1}^n x_i$$`)
- Unordered lists (`- item`)
- Ordered lists (`1. item`)
- Blockquotes (`> quote`)
- Obsidian callouts (`> [!note]`, `> [!warning]`, etc.)

## xml:id Generation

IDs are generated automatically from titles:

| Title | Generated ID |
|-------|--------------|
| "Introduction" | `sec-introduction` |
| "Metric Spaces" | `sec-metric-spaces` |
| "What is ∈?" | `sec-what-is` |

Aliases are indexed for wikilink resolution but don't generate IDs.

## Backlinks

The converter automatically tracks which notes link to each other:

1. Parses all `[[wikilinks]]` in every note
2. Builds a reverse lookup of incoming links
3. Adds a "Backlinks" section to notes that are referenced

## Graph Visualization

Generate `notes-graph.json` for the graph visualization module:

```bash
python convert.py vault/ output/ --generate-graph
```

Copy the generated JSON to your `graph-module/` folder.

## Limitations

- **Embeds** (`![[note]]`): Not supported
- **Mermaid diagrams**: Preserved as code blocks
- **Dataview queries**: Removed
- **Inline tags** (`#tag`): Not converted
- **Footnotes**: Not supported

## Documentation

See [MAPPING.md](MAPPING.md) for the complete element mapping table.

## Example

### Input: `Metric Spaces.md`

```markdown
---
title: Metric Spaces
tags: [topology, analysis]
---

A **metric space** is a pair $(X, d)$ where $d$ is a [[distance function]].

## Examples

1. $\mathbb{R}^n$ with Euclidean distance
2. Any set with the discrete metric
```

### Output: `sec-metric-spaces.ptx`

```xml
<!-- tags: topology, analysis -->
<section xml:id="sec-metric-spaces">
<title>Metric Spaces</title>

<p>A <term>metric space</term> is a pair <m>(X, d)</m> where <m>d</m> is a <xref ref="sec-distance-function"/>.</p>

<paragraphs xml:id="para-examples">
<title>Examples</title>

<ol>
<li><p><m>\mathbb{R}^n</m> with Euclidean distance</p></li>
<li><p>Any set with the discrete metric</p></li>
</ol>

</paragraphs>

</section>
```
