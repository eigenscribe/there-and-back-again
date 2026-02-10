# PreTeXt Knowledge Base Best Practices Guide

## Overview

Your restructured knowledge base follows a **narrative-driven organization** rather than a strict topical one. Ideas flow through development stages: raw capture → exploration → synthesis → application. This supports long-term maintenance and evolution.

---

## 1. Atomic Note Structure

Each note should be **self-contained** while being **well-connected**.

### What Makes a Note Atomic?

- **Single focus**: One primary concept or idea
- **Reusable**: Can be understood independently
- **Timeless**: References don't break; cross-references clarify connections
- **Modest length**: 300-2000 words typically (no hard rule)

### Anatomy of an Atomic Note

```xml
<?xml version="1.0" encoding="UTF-8"?>

<subsection xml:id="sec-topic-slug" xmlns:xi="http://www.w3.org/2001/XInclude">
  <title>Meaningful Title</title>
  
  <!-- Metadata -->
  <p>
    <term>Status:</term> <alert>🧪</alert> Draft / <alert>📝</alert> Developing / <alert>✓</alert> Stable
  </p>
  <p>
    <term>Date Created:</term> YYYY-MM-DD
  </p>
  <p>
    <term>Last Updated:</term> YYYY-MM-DD
  </p>
  <p>
    <term>Tags:</term> tag1, tag2, tag3
  </p>

  <introduction>
    <p>Why this note exists; what it's about.</p>
  </introduction>

  <!-- Main content -->
  <p>Your synthesis, explanation, or exploration.</p>

  <!-- Key insight or takeaway -->
  <note>
    <title>Key Insight</title>
    <p>The thing to remember.</p>
  </note>

  <!-- Connections -->
  <p>
    <term>Related notes:</term> 
    <xref ref="sec-related-topic-1" />, 
    <xref ref="sec-related-topic-2" />
  </p>

  <p>
    <term>Based on:</term> 
    See <xref ref="sec-field-papers" /> for primary sources.
  </p>

</subsection>
```

---

## 2. ID Naming Conventions

Use **meaningful, hierarchical IDs** for long-term stability and searchability.

### Pattern

```
sec-{chapter-abbr}-{topic-slug}-{note-num}
```

### Examples

```xml
<!-- Scribing: Foundations -->
<subsection xml:id="sec-found-linear-algebra-001">

<!-- Scribing: Methods -->
<subsection xml:id="sec-method-proof-strategy-003">

<!-- Eigenthoughts: Loss Gems -->
<subsection xml:id="sec-gem-curiosity-driven-001">

<!-- Practice: Exercises -->
<subsection xml:id="sec-practice-calc-limits-002">
```

### Abbreviations

| Chapter           | Abbr      |
|-------------------|-----------|
| Foundations       | `found`   |
| Methods           | `method`  |
| Interpretability  | `interp`  |
| Unifications      | `unif`    |
| Eigenthoughts     | `gem`     |
| Field Notes       | `field`   |
| Practice          | `practice`|

> **Stability**: Once an ID is published, **never change it**. If you need to restructure, create a redirect or alias in Meta.

---

## 3. The Lifecycle of Ideas

Ideas flow through these stages naturally:

### Stage 1: Raw Capture
- Tool: Personal note-taking app (Obsidian, Logseq, Apple Notes, etc.)
- Duration: Minutes to days
- Where: Local, not in this repo

### Stage 2: Eigenthoughts - Fragments
- What: Quick observations, incomplete thoughts
- File: `03-eigenthoughts/fragments/fragment-NNN.ptx`
- Status: `🧪 Raw Fragment`
- Duration: Days to weeks

### Stage 3: Eigenthoughts - Loss Gems
- What: Curated but still developing ideas
- File: `03-eigenthoughts/loss-gems.ptx`
- Status: `📝 Developing` or `💎 Gem`
- Duration: Weeks to months

### Stage 4: Scribing
- What: Stable, canonical syntheses
- File: `02-scribing/{foundations|methods|interpretability|unifications}/note-NNN.ptx`
- Status: `✓ Stable`
- Duration: Long-lived; refined over years

### Stage 5: Practice & Labs
- What: Applications, working through ideas
- File: `06-practice/` or `04-scriber-labs/`
- Duration: Varies

### Transition Rules

1. **Fragment → Gem**: When you've explored an idea enough to articulate it
2. **Gem → Scribing**: When you can place it in a broader framework
3. **Scribing → Meta**: Reflect on what you learned from the process

---

## 4. Cross-Referencing

Use PreTeXt's `<xref>` for robust internal linking.

### Why Cross-References Matter for Longevity

- **Stable IDs**: Links never break (unlike URLs)
- **Auto-generated text**: "see Section 3.2" updates automatically if sections renumber
- **Bidirectional awareness**: You can see which notes reference each note

### Cross-Reference Patterns

```xml
<!-- To a specific section -->
<p>See <xref ref="sec-found-linear-algebra-001" /> for details.</p>

<!-- With custom text -->
<p>This builds on <xref ref="sec-method-proof-strategy-003" text="proof strategies" />.</p>

<!-- Multiple references -->
<p>
  Compare with <xref ref="sec-found-topology-002" /> 
  and <xref ref="sec-unif-categorical-001" />.
</p>
```

### Cross-Reference Strategy

- **Forward references**: "We'll expand on this in [future section]"
- **Backward references**: "As we saw in [earlier note]"
- **Lateral references**: "Compare with [related idea in different section]"

---

## 5. Managing Your Workflow

### Weekly Workflow

1. **Monday**: Review Fragments from last week
2. **Tuesday-Thursday**: Deep work on developing ideas
3. **Friday**: Promote promising ideas to Loss Gems; update related notes
4. **Monthly**: Quarterly review—which Gems are ready for Scribing?

### Monthly Review

1. Look at all notes with Status `📝 Developing`
2. For each:
   - Is it crystallized? → Promote to Scribing
   - Is it stuck? → Move to Fragments or archive
   - Does it connect to other ideas? → Add cross-references
3. Update the index and glossary

### Quarterly Deep Dive

1. Review Scribing chapters
2. Look for **synthesis opportunities**: Can you write a unifying note?
3. Archive or refactor anything that feels dated
4. Update Meta notes about your process

---

## 6. Tags and Organization

Use consistent tags to create informal cross-cutting categories.

### Tag Examples

```
# Domain tags
#topology #analysis #linear-algebra #probability

# Method tags
#proof #example #definition #theorem

# Stage tags
#foundational #exploratory #applied

# Status tags
#stable #provisional #archived

# Temporal tags
#2024 #review-needed #revisit-2025
```

### Using Tags in HTML Views

If you generate an HTML version, you can create a tag cloud or tag-based index:

```xml
<p>
  <term>Tags:</term>
  <c>#topology</c>, <c>#foundations</c>, <c>#example</c>
</p>
```

PreTeXt's search will index these tags.

---

## 7. Long-Term Maintenance

### Archival Strategy for Decades

1. **Version Control**: Everything lives in Git
   - Commit regularly with clear messages
   - Tag major milestones
   - Keep history pristine (rewrite commits rarely)

2. **Immutability of Published Notes**
   - Once a note is in Scribing, it's canonical
   - If you want to substantially change it, mark a new version
   - Use Meta to explain what changed

3. **Format Stability**
   - PreTeXt is XML-based and human-readable
   - If PreTeXt disappears, your notes are still readable plaintext
   - Periodic exports to PDF for long-term preservation

### Backup and Preservation

```bash
# Regular export to PDF
cd /workspaces/there-and-back-again
pretext build pdf  # Creates static PDFs

# Archive to Internet Archive
# https://archive.org/about/exclude.php

# GitHub backup (if not already there)
git push origin main

# Local backup
rsync -av /workspaces/there-and-back-again/ /backup/path/
```

---

## 8. Citation Best Practices

See `07-meta/citations.ptx` for detailed citation guidance.

### Quick Reference

1. **All citations go in `references.bib`** (BibTeX format)
2. **Cite in text** using `<cite bib="key" />`
3. **Link to Field Notes** summaries
4. **Archive important sources** via Archive.org or local PDFs

### Example Citation Flow

```
📄 Paper discovered
    ↓
📝 Add to references.bib with meaningful key (smith2024neural)
    ↓
🔖 Summarize in Field Notes / Papers section
    ↓
📌 Cite in Scribing using <cite bib="smith2024neural" />
    ↓
🔗 Add cross-reference: "See <xref ref="sec-field-papers" />"
```

---

## 9. Index and Glossary Maintenance

### Glossary

Add entries as you introduce key terms:

```xml
<section xml:id="sec-topology-intro">
  <title>Introduction to Topology</title>
  <idx>topology</idx>
  <idx>topological space</idx>
  ...
</section>
```

PreTeXt automatically builds the glossary/index. Periodically review:
- Are important terms well-indexed?
- Should you add cross-references in the glossary?

### Index Tags

Use `<idx>` liberally:
```xml
<p>
  A <term><idx>topological space</idx></term> is a set 
  <m>X</m> together with a <term><idx>topology</idx></term>...
</p>
```

---

## 10. Meta-Documentation

The Meta chapter is crucial for long-term survival. Document:

### What to Record in Meta

```
07-meta/
├── workflow.ptx       # Your process
├── systems.ptx        # Tools and infrastructure
├── citations.ptx      # How you handle references
└── (future sections)  # Add as needed
```

### What Should be in Meta - Examples

- **Workflow**: "On Fridays, I review fragments and promote to gems"
- **Tools**: "I use Obsidian for capture, then move curated ideas here"
- **Architecture**: "Why are there 4 Scribing subsections?"
- **Decisions**: "Why not organize by topic instead of narrative stage?"
- **Conventions**: "When I write 'see X', here's what I mean"

**Future You will be grateful.**

---

## 11. Expanding the Structure

### Adding a New Scribing Subsection

If your knowledge grows, you might need more subsections. Example: add "Applications"

1. Create directory: `02-scribing/applications/`
2. Create `note-001.ptx` template
3. Update `ch-scribing.ptx` to include:
   ```xml
   <section xml:id="sec-applications-chapter">
     <title>Applications</title>
     <xi:include href="./applications/note-001.ptx" />
   </section>
   ```
4. Document decision in `07-meta/workflow.ptx`

### Adding a Project to Scriber Labs

1. Create directory: `04-scriber-labs/projects/project-name/`
2. Create files:
   - `README.ptx` (with repo link)
   - `overview.ptx`
   - `design-notes.ptx`
   - `postmortem.ptx`
3. Update `ch-scriber-labs.ptx` to include the subsection

---

## 12. Building and Publishing

### Local Development

```bash
cd /workspaces/there-and-back-again

# Build HTML
pretext build html

# Build PDF
pretext build pdf

# View HTML
open output/web/index.html
```

### Deployment

Once you're happy with the structure:

1. **Choose hosting**:
   - GitHub Pages (free)
   - Netlify (free, automatic builds)
   - Personal server

2. **Set up CI/CD** (e.g., GitHub Actions):
   ```yaml
   # .github/workflows/build.yml
   - name: Build with PreTeXt
     run: pretext build html
   ```

3. **Publish**: Push to `gh-pages` branch or deployment target

---

## 13. Sample Note Templates

### Scribing Note (Stable Synthesis)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<subsection xml:id="sec-{section}-{topic}-{num}" xmlns:xi="http://www.w3.org/2001/XInclude">
  <title>[Concept]: [Aspect]</title>
  
  <p><term>Status:</term> <alert>✓</alert> Stable</p>
  <p><term>Tags:</term> tag1, tag2</p>

  <introduction>
    <p>One sentence: what is this about?</p>
  </introduction>

  <definition>
    <statement>
      <p>Formal definition if applicable.</p>
    </statement>
  </definition>

  <p>Explanation and context.</p>

  <example>
    <statement>
      <p>Concrete example.</p>
    </statement>
  </example>

  <note>
    <title>Key Insight</title>
    <p>The main takeaway.</p>
  </note>

  <p><term>See also:</term> <xref ref="related-note" /></p>
</subsection>
```

### Eigenthought Gem (Provisional)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<subsection xml:id="sec-gem-{topic}-{num}" xmlns:xi="http://www.w3.org/2001/XInclude">
  <title>💎 [Intriguing Title]</title>
  
  <p><term>Status:</term> <alert>📝</alert> Developing</p>
  <p><term>Date:</term> YYYY-MM-DD</p>

  <introduction>
    <p>What sparked this reflection?</p>
  </introduction>

  <p>Raw exploration of the idea.</p>

  <question>
    <p>What remains unclear?</p>
  </question>

  <p><term>Next steps:</term> Explore X by [date]</p>
</subsection>
```

---

## 14. Troubleshooting

### "I've created too many fragments"

This is okay! Review monthly and:
- Consolidate fragments on the same topic
- Publish promising ones as Gems
- Archive truly minor ones

### "The structure feels wrong after 6 months"

Restructure! Document the change in Meta. The whole point is that this evolves.

### "I have cross-references to notes I deleted"

Don't delete notes—archive them. Create a note saying "This idea didn't pan out, see gem-X instead" to preserve references.

### "My PDF is huge"

Build selectively:
```bash
pretext build html --source-file 02-scribing/ch-scribing.ptx
```

Or generate separate PDFs per chapter.

---

## 15. Final Thoughts

This structure is **opinionated but flexible**. It's built around the idea that knowledge **evolves** and that **process is part of the product**.

### Key Principles

1. **Atomicity**: Individual notes are independent
2. **Connectivity**: Cross-references bind them together
3. **Narrative**: Organization reflects how ideas develop, not just what they are
4. **Longevity**: Every decision is made with decades in mind
5. **Honesty**: Meta documentation captures your actual process

### Starting Out

1. Migrate a few of your best Scribing notes
2. Create 2-3 Gems in Eigenthoughts
3. Add 5-10 sources to Field Notes
4. Create sample Practice exercises
5. Add a Meta note about *your* workflow

**Then iterate, expand, and refine over months and years.**

---

## Appendix: Quick Reference

### File Structure

```
source/
├── main-new.ptx (USE THIS - copy to main.ptx when ready)
├── docinfo.ptx (update with your info)
├── 01-frontmatter/
│   ├── intent.ptx
│   ├── conventions.ptx
│   ├── how-to-read.ptx
│   └── frontmatter-wrapper.ptx
├── 02-scribing/
│   ├── ch-scribing.ptx
│   ├── foundations/ (note-001.ptx, note-002.ptx, ...)
│   ├── methods/
│   ├── interpretability/
│   └── unifications/
├── 03-eigenthoughts/
│   ├── ch-eigenthoughts.ptx
│   ├── intent.ptx
│   ├── loss-gems.ptx
│   └── fragments/
├── 04-scriber-labs/
│   ├── ch-scriber-labs.ptx
│   ├── about/
│   └── projects/ (one dir per project)
├── 05-field-notes/
│   └── ch-field-notes.ptx
├── 06-practice/
│   └── ch-practice.ptx
├── 07-meta/
│   ├── ch-meta.ptx
│   ├── workflow.ptx
│   ├── systems.ptx
│   └── citations.ptx
└── 08-backmatter/
    ├── backmatter-wrapper.ptx
    ├── glossary.ptx
    └── bibliography-notes.ptx
```

### Status Indicators

| Indicator | Meaning | Action |
|-----------|---------|--------|
| 🧪 Draft | Raw fragment | Develop or discard |
| 📝 Developing | Eigenthought in progress | Monitor; promote when ready |
| 💎 Gem | Promising but provisional | Include in research |
| ✓ Stable | Canonical Scribing note | Reference and build upon |

### Common Commands

```bash
# Initialize Python environment for PreTeXt
python3 -m venv venv
source venv/bin/activate

# Install PreTeXt
pip install pretext-cli

# Build and preview
pretext build html && open output/web/index.html

# Check for errors
pretext validate

# Clean build
rm -rf output && pretext build html
```

---

**Last updated:** 2024-02-10
**For questions:** Refer to the Meta chapter or PreTeXt documentation
