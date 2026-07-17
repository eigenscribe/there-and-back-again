# Obsidian to PreTeXt Mapping Table

This document describes how Obsidian Markdown elements are converted to PreTeXt XML.

## Frontmatter Mapping

| Obsidian YAML | PreTeXt | Notes |
|---------------|---------|-------|
| `title` | `<title>` | Section title |
| `tags` | Comment | `<!-- tags: tag1, tag2 -->` |
| `aliases` | Lookup table | Used for wikilink resolution |
| `created` | Not used | Could add to metadata |
| `modified` | Not used | Could add to metadata |

## Element Mapping

### Text Formatting

| Markdown | PreTeXt | Example |
|----------|---------|---------|
| `**bold**` | `<term>bold</term>` | Semantic emphasis |
| `*italic*` | `<em>italic</em>` | Emphasis |
| `` `code` `` | `<c>code</c>` | Inline code |

### Headers

| Markdown | PreTeXt | Notes |
|----------|---------|-------|
| `# H1` | `<subsection>` | Creates nested structure |
| `## H2` | `<paragraphs>` | Named paragraph group |
| `### H3+` | `<p><term>text</term></p>` | Bold paragraph |

### Links

| Markdown | PreTeXt | Example |
|----------|---------|---------|
| `[[Note]]` | `<xref ref="sec-note"/>` | Internal cross-reference |
| `[[Note\|Display]]` | `<xref ref="sec-note" text="custom">Display</xref>` | Custom display text |
| `[[Note#Section]]` | `<xref ref="sec-note"/>` | Section anchor (simplified) |
| `[text](url)` | `<url href="url">text</url>` | External link |

### Math

| Markdown | PreTeXt | Notes |
|----------|---------|-------|
| `$inline$` | `<m>inline</m>` | Inline math |
| `$$block$$` | `<md>block</md>` | Block equation |

### Lists

| Markdown | PreTeXt | Example |
|----------|---------|---------|
| `- item` | `<ul><li><p>item</p></li></ul>` | Unordered list |
| `1. item` | `<ol><li><p>item</p></li></ol>` | Ordered list |

### Code Blocks

````markdown
```python
code here
```
````

Becomes:

```xml
<program language="python">
<code>
code here
</code>
</program>
```

### Blockquotes

| Markdown | PreTeXt |
|----------|---------|
| `> quote` | `<blockquote><p>quote</p></blockquote>` |

### Callouts (Obsidian-specific)

| Obsidian Callout | PreTeXt |
|------------------|---------|
| `> [!note]` | `<note>` |
| `> [!warning]` | `<warning>` |
| `> [!tip]` | `<insight>` |
| `> [!important]` | `<warning>` |
| `> [!example]` | `<example>` |
| `> [!info]` | `<note>` |

## xml:id Generation Rules

1. **Base transformation:**
   - Lowercase the title
   - Remove special characters except alphanumeric, spaces, hyphens
   - Replace spaces/underscores with hyphens
   - Remove consecutive hyphens
   - Strip leading/trailing hyphens

2. **Prefix:**
   - All sections use `sec-` prefix
   - Subsections use `subsec-` prefix
   - Paragraphs use `para-` prefix

3. **Collision handling:**
   - If ID already exists, append 6-char MD5 hash of filepath

4. **Examples:**
   | Title | xml:id |
   |-------|--------|
   | "Introduction to Topology" | `sec-introduction-to-topology` |
   | "Metric Spaces (Basics)" | `sec-metric-spaces-basics` |
   | "What is ∈?" | `sec-what-is` |
   | "202411-Note" | `sec-202411-note` |

## Backlink Strategy

### How Backlinks Work

1. **First pass:** Parse all notes and extract outgoing `[[wikilinks]]`
2. **Build lookup:** Create title → xml:id and alias → xml:id maps
3. **Second pass:** For each link A → B, add A to B's backlinks set
4. **Output:** Generate `<paragraphs>` section with backlink references

### Backlink Output Format

```xml
<paragraphs>
<title>Backlinks</title>
<p>
This note is referenced by: <xref ref="sec-note-a"/>, <xref ref="sec-note-b"/>
</p>
</paragraphs>
```

### Bidirectional Link Handling

- Forward links: Converted to `<xref ref="target-id"/>`
- Backlinks: Automatically computed and added to target notes
- Unresolved links: Converted to `<em>display text</em>` (graceful degradation)

## Unsupported Features

These Obsidian features are not converted:

| Feature | Handling |
|---------|----------|
| `![[embed]]` | Ignored (becomes plain text) |
| Mermaid diagrams | Preserved as code block |
| Dataview queries | Removed |
| Comments `%%` | Removed |
| Tags in body `#tag` | Not converted |
| Footnotes | Not converted (future: `<fn>`) |

## Recommended Workflow

1. **Organize notes** in folders matching your Diataxis structure
2. **Add frontmatter** with title, tags, aliases
3. **Run converter:** `python convert.py vault/ source/`
4. **Review output:** Check `_includes.ptx` for include statements
5. **Add to chapter:** Copy includes to your chapter file
6. **Build:** Run `pretext build web`

## Example Note Conversion

### Input (Obsidian)

```markdown
---
title: Metric Spaces
tags: [topology, analysis]
aliases: [metric space, distance function]
---

# Definition

A **metric space** is a set $X$ together with a function $d: X \times X \to \mathbb{R}$ called a *metric*.

See also [[Topology Introduction]] and [[Continuous Functions]].

## Properties

1. $d(x, y) \geq 0$ (non-negativity)
2. $d(x, y) = 0 \iff x = y$ (identity)

> [!note] Important
> Every metric space is a topological space.
```

### Output (PreTeXt)

```xml
<!-- tags: topology, analysis -->
<section xml:id="sec-metric-spaces">
<title>Metric Spaces</title>

<subsection xml:id="subsec-definition">
<title>Definition</title>

<p>A <term>metric space</term> is a set <m>X</m> together with a function <m>d: X \times X \to \mathbb{R}</m> called a <em>metric</em>.</p>

<p>See also <xref ref="sec-topology-introduction"/> and <xref ref="sec-continuous-functions"/>.</p>

</subsection>

<paragraphs xml:id="para-properties">
<title>Properties</title>

<ol>
<li><p><m>d(x, y) \geq 0</m> (non-negativity)</p></li>
<li><p><m>d(x, y) = 0 \iff x = y</m> (identity)</p></li>
</ol>

<note>
<title>Important</title>
<p>Every metric space is a topological space.</p>
</note>

</paragraphs>

<paragraphs>
<title>Backlinks</title>
<p>
This note is referenced by: <xref ref="sec-topology-introduction"/>
</p>
</paragraphs>

</section>
```
