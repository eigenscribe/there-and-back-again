# New Zettelkasten Structure - Quick Reference

## Structure Complete ✓

Your PreTeX book is now organized into 8 main sections following atomic note-taking principles:

```
source/
├─ 01-frontmatter/          → Intent, Conventions, How-to-read
├─ 02-scribing/             → Stable synthesis (Foundations, Methods, Interpretability, Unifications)
├─ 03-eigenthoughts/        → Pre-canonical ideas (Intent, Loss-Gems, Fragments)
├─ 04-scriber-labs/         → Project writeups (About, Projects)
├─ 05-field-notes/          → External source notes (Papers, Books, Talks, Docs, Repos)
├─ 06-practice/             → Exercises and explorations
├─ 07-meta/                 → Workflow, Systems, Citations Guide
├─ 08-backmatter/           → Glossary, Index, Bibliography
├─ docinfo.ptx              → Document metadata
└─ main.ptx                 → Main entry point (configured)
```

## How to Add Notes

### Adding a Single Note

1. **Create the .ptx file** with a descriptive name in the appropriate directory:
   ```bash
   touch source/02-scribing/foundations/your-note-title.ptx
   ```

2. **Write atomic content** (wrap in `<section>` tags):
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <section xml:id="sec-unique-id" xmlns:xi="http://www.w3.org/2001/XInclude">
     <title>Your Note Title</title>
     <p>Your content here...</p>
   </section>
   ```

3. **Include it** in the parent chapter file using `<xi:include>`:
   ```xml
   <xi:include href="./foundations/your-note-title.ptx" />
   ```

### Adding a New Subsection (e.g., in Scribing)

If you want to add a new category under Scribing (not just Foundations, Methods, etc.):

1. Create a new directory: `mkdir source/02-scribing/your-category/`
2. Add your note files there
3. Update `ch-scribing.ptx` to include a new `<section>` with includes

## File Naming Conventions

- **Chapter wrappers**: `ch-{chapter-name}.ptx` (e.g., `ch-scribing.ptx`)
- **Section wrappers**: Named after their purpose or topic
- **Individual notes**: Atomic names describing the content (e.g., `zettelkasten-principles.ptx`, `matrix-multiplication.ptx`)
- **XML IDs**: Use lowercase with hyphens (e.g., `xml:id="sec-matrix-mult"`)

## Citations

See **Meta → Citation Guidelines** in your book for comprehensive instructions on:
- Using `<xref ref="bib-id" />` tags in your text
- Converting BibTeX to PreTeX XML format
- Managing bibliography files in `08-backmatter/`

## Building Your Book

```bash
cd /workspaces/there-and-back-again
pretextbook build web       # Build HTML version
pretextbook build print     # Build PDF version
pretextbook view web        # View in browser
```

## Long-Term Maintenance Tips

1. **Keep IDs unique and meaningful**: Use your note title as reference
2. **Document significant migrations**: When moving Eigenthoughts → Scribing, keep a note in Meta
3. **Regular bibliography updates**: Add citations to `08-backmatter/bibliography.ptx` as you go
4. **Link across chapters**: Use `<xref>` to create a web of interconnected ideas
5. **Archive old versions**: Consider dating major refactors in git commits

## Next Steps

1. Edit frontmatter sections in `01-frontmatter/` with your intent and conventions
2. Add your first notes to `02-scribing/foundations/`
3. Configure citation system in `08-backmatter/`
4. Build and test: `pretextbook build web && pretextbook view web`

---

**Note**: All old chapter files (ch-prototypes, ch-tutorials, ch-explanations, ch-reference) have been removed. Your new main.ptx is the entry point for all builds.
