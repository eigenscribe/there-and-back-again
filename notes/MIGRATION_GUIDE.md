# Migration Guide: Old Structure → New Structure

## Overview

Your knowledge base is being restructured for long-term sustainability and clearer idea flow. This guide helps you migrate your existing content.

---

## Step 1: Backup Your Current Work

```bash
cd /workspaces/there-and-back-again

# Create a backup branch
git checkout -b backup/old-structure

# Or create a local backup
cp -r source/ source.backup/
```

---

## Step 2: Review the New Structure

Key directories created:

```
source/
├── 01-frontmatter/         # Intent, Conventions, How-to-Read
├── 02-scribing/            # Stable syntheses (Foundations, Methods, etc.)
├── 03-eigenthoughts/       # Atomic developing ideas
├── 04-scriber-labs/        # Project writeups
├── 05-field-notes/         # External sources
├── 06-practice/            # Exercises, proofs, drills
├── 07-meta/                # Workflow, systems, citations
└── 08-backmatter/          # Glossary, bibliography, index
```

---

## Step 3: Migrate Existing Content

### Your Current Files

Based on your workspace, you have:
- `ch-prototypes.ptx` → Likely goes to **Eigenthoughts** or **Scribing**
- `ch-tutorials.ptx` → **Practice** or **Scribing - Methods**
- `ch-explanations.ptx` → **Scribing**
- `ch-reference.ptx` → **Field Notes** or **Scribing - Foundations**
- `frontmatter.ptx` → **01-frontmatter/frontmatter-wrapper.ptx** (already created)
- `backmatter.ptx` → **08-backmatter/backmatter-wrapper.ptx** (already created)

### Migration Process

For each chapter file:

1. **Examine the content**: What is it teaching or exploring?
2. **Classify**: Which new chapter category fits best?
3. **Extract notes**: Break each major section into atomic `.ptx` files
4. **Update IDs**: Rename to the new ID convention
5. **Cross-reference**: Add links between related notes

### Example: Migrating `ch-prototypes.ptx`

**Old structure:**
```xml
<chapter xml:id="ch-prototypes">
  <section xml:id="sec-topology-intro">
    <subsection xml:id="subsec-topo-fundamentals">
      <!-- content -->
    </subsection>
    <subsection xml:id="subsec-topo-examples">
      <!-- content -->
    </subsection>
  </section>
  <section xml:id="sec-metric-spaces">
    <!-- content -->
  </section>
</chapter>
```

**New structure:**
```
02-scribing/foundations/
├── note-001-topological-spaces.ptx
├── note-002-topological-examples.ptx
└── note-003-metric-spaces.ptx
```

**For each file:**

```xml
<!-- note-001-topological-spaces.ptx -->
<?xml version="1.0" encoding="UTF-8"?>
<subsection xml:id="sec-found-topology-001" xmlns:xi="http://www.w3.org/2001/XInclude">
  <title>Topological Spaces: Fundamentals</title>
  
  <p><term>Status:</term> <alert>✓</alert> Stable</p>
  <p><term>Tags:</term> topology, foundations</p>

  <!-- Copy content from old subsection -->
  <!-- Update cross-references to new IDs -->
  
</subsection>
```

---

## Step 4: Files Provided for You

These are **already created** — you just need to populate them:

### Front Matter
- `01-frontmatter/intent.ptx` — Explain why your knowledge base exists
- `01-frontmatter/conventions.ptx` — Document your notation and voice
- `01-frontmatter/how-to-read.ptx` — Navigation guide

### Scribing Templates
- `02-scribing/foundations/note-001.ptx` (template)
- `02-scribing/methods/note-001.ptx` (template)
- `02-scribing/interpretability/note-001.ptx` (template)
- `02-scribing/unifications/note-001.ptx` (template)

### Eigenthoughts
- `03-eigenthoughts/intent.ptx` — Why Eigenthoughts exist
- `03-eigenthoughts/loss-gems.ptx` — Store for curated provisional ideas
- `03-eigenthoughts/fragments/fragment-001.ptx` (template)

### Other Chapters
- `04-scriber-labs/ch-scriber-labs.ptx` (with structure template)
- `05-field-notes/ch-field-notes.ptx` (with section stubs)
- `06-practice/ch-practice.ptx` (with section stubs)
- `07-meta/ch-meta.ptx` — Workflow, systems, citations

### Backmatter
- `08-backmatter/backmatter-wrapper.ptx` — Glossary, bibliography, index
- `08-backmatter/glossary.ptx` (template)
- `08-backmatter/bibliography-notes.ptx` (template)

---

## Step 5: Activate the New Structure

When you're ready to switch to the new structure:

```bash
# Backup the old main
cp source/main.ptx source/main-old.ptx

# Use the new main
cp source/main-new.ptx source/main.ptx

# Test the build
pretext validate
pretext build html
```

---

## Step 6: Add Your Content

### Phase 1: Front Matter (1-2 hours)
Write brief versions of:
- **intent.ptx**: Why this knowledge base exists (1-2 paragraphs)
- **conventions.ptx**: Your notation, voice, abbreviations (1-2 pages)
- **how-to-read.ptx**: Navigation guide (already provided with examples)

### Phase 2: Migrate Your Best 5-10 Stable Notes
Pick your most polished content:
1. Copy content from old files
2. Break into atomic notes (one concept per file)
3. Place in appropriate Scribing subsection
4. Update IDs using the naming convention
5. Add cross-references

### Phase 3: Add 5-10 Eigenthoughts
Pick interesting ideas that are still developing:
1. Convert to Gems or Fragments
2. Add to `loss-gems.ptx` or `fragments/`
3. Mark with status `📝 Developing`

### Phase 4: Seed Field Notes
Add 5-10 key references:
1. Create subsections under each topic in `ch-field-notes.ptx`
2. Summarize important papers, books, talks
3. Link to primary sources
4. Cross-reference to where you cite them in Scribing

---

## Step 7: Handle Old Files

After migrating content:

```bash
# Keep old files for reference temporarily
mv source/ch-*.ptx source/.archive/

# Or delete if you've fully migrated
# rm source/ch-*.ptx

# Commit the change
git add -A
git commit -m "Migrate to new PreTeXt structure"
```

---

## Step 8: Update docinfo.ptx

Review and update your metadata:

```xml
<docinfo xmlns:xi="http://www.w3.org/2001/XInclude">
  <document-id>there-and-back-again</document-id>
  <blurb shelf="[Your Field]">
    Long-term knowledge base on [your topics of interest].
  </blurb>

  <!-- Update author, year, website as needed -->

  <!-- Optional: Add bibliography configuration -->
  <bibliography>
    <bibfile relative-to="source" source="references.bib" />
  </bibliography>
</docinfo>
```

---

## Step 9: (Optional) Create a references.bib

For citations, create `source/references.bib`:

```bibtex
% Add your citations here
@article{smith2024example,
  author = {Smith, John},
  title = {An Example Paper},
  journal = {Journal Name},
  year = {2024},
  volume = {1},
  pages = {1-10}
}
```

Then cite in text:
```xml
<p>
  Research shows this <cite bib="smith2024example" />.
</p>
```

---

## Troubleshooting Migration

### "I have 50+ notes to migrate—where do I start?"

1. **Phase 1:** Migrate 5-10 **core** notes (foundations)
2. **Phase 2:** Build out **methods** (how you do things)
3. **Phase 3:** Add **everything else** incrementally over months

### "Some notes don't fit neatly into one section"

**Cross-reference!** A note can live in one place and be referenced from many:

```xml
<!-- In Foundations -->
<subsection xml:id="sec-found-metric-spaces-001">
  ...
</subsection>

<!-- In Methods, reference it -->
<p>
  See <xref ref="sec-found-metric-spaces-001" /> 
  for the underlying definition.
</p>
```

### "The old structure made sense for my domain—can I change it?"

**Absolutely.** This is a template. You can:
- Add new subsections to Scribing (e.g., "Case Studies")
- Replace subsection names with your own categories
- Change the chapter order

**But document why in `07-meta/workflow.ptx`.**

### "How do I handle content that's between old and new?"

Use **Eigenthoughts**. If something doesn't fit Scribing yet, it goes to:
1. Fragments (raw)
2. Loss Gems (promising)
3. Eventually promoted to Scribing

---

## Migration Timeline Suggestion

### Week 1
- [ ] Read PRETEXT_BESTPRACTICES.md
- [ ] Review new directory structure
- [ ] Write intent, conventions, how-to-read (30 min each)

### Week 2-3
- [ ] Migrate 5-10 core notes to Scribing
- [ ] Add basic cross-references

### Week 4+
- [ ] Add Eigenthoughts and Field Notes incrementally
- [ ] Migrate Practice exercises
- [ ] Build out Projects under Scriber Labs as they develop

---

## Validation Checklist

After migration:

- [ ] `pretext validate` passes with no errors
- [ ] `pretext build html` completes successfully
- [ ] All cross-references in Scribing point to existing notes
- [ ] Frontmatter explains purpose and conventions
- [ ] At least one Eigenthought gem exists
- [ ] At least 5 Field Notes are documented
- [ ] docinfo.ptx reflects your actual info
- [ ] Meta chapter explains your workflow

---

## Next Steps

1. **Read PRETEXT_BESTPRACTICES.md** (comprehensive guide)
2. **Write your frontmatter** (intent, conventions)
3. **Pick 3-5 notes** and migrate them as examples
4. **Switch to main-new.ptx** when you're confident
5. **Build and preview**: `pretext build html`
6. **Iterate:** Add content gradually over months

---

## Questions?

Refer to:
- **PRETEXT_BESTPRACTICES.md** — Detailed practices and examples
- **07-meta/citations.ptx** — Citation handling
- **01-frontmatter/how-to-read.ptx** — Navigation and note lifecycle
- **PreTeXt docs** — [pretextbook.org](https://pretextbook.org)

Good luck!
