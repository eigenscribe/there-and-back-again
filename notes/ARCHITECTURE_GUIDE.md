# Architecture & Workflow Visual Guide

## Overall Book Structure

```
📖 There and Back Again (Main Book)
│
├─ 📄 Frontmatter
│  ├─ Intent: Why this exists
│  ├─ Conventions: Notation & voice
│  └─ How to Read: Navigation guide
│
├─ 📕 Scribing (Stable Syntheses)
│  ├─ Foundations (Core Concepts)
│  ├─ Methods (Techniques)
│  ├─ Interpretability (Mechanisms)
│  └─ Unifications (Cross-Domain)
│
├─ 💭 Eigenthoughts (Atomic Ideas)
│  ├─ Intent: Why eigenthoughts exist
│  ├─ Loss Gems 💎 (Curated Provisional)
│  └─ Fragments (Raw Observations)
│
├─ 🔬 Scriber Labs (Projects)
│  ├─ About Labs (How to use this section)
│  └─ Projects
│     └─ [Each project has README, overview, design, postmortem]
│
├─ 🗂️ Field Notes (External Sources)
│  ├─ Papers
│  ├─ Books
│  ├─ Talks
│  ├─ Documentation
│  └─ External Repos
│
├─ ✏️ Practice (Application)
│  ├─ Exercises
│  ├─ Sketches
│  ├─ Proofs
│  └─ Drills
│
├─ ⚙️ Meta (About the KB)
│  ├─ Workflow (Your process)
│  ├─ Systems (Tools & infrastructure)
│  └─ Citations (Handling references) ⭐
│
└─ 📑 Backmatter
   ├─ Glossary (Indexed terms)
   ├─ Bibliography (Reference notes)
   └─ Index (Full-text index)
```

---

## Idea Lifecycle: From Raw to Canonical

```
Your Brain / External Sources
        │
        ▼
    🧪 Raw Idea
   (In your notes app)
        │
        ▼
📁 Fragment (Days → Weeks)
   03-eigenthoughts/fragments/
   Status: 🧪 Draft
   "Quick observation"
        │
        │ (Develop & explore)
        ▼
💎 Loss Gem (Weeks → Months)
   03-eigenthoughts/loss-gems.ptx
   Status: 📝 Developing
   "Promising but provisional"
        │
        │ (Integrate, refine, place in context)
        ▼
📕 Scribing (Months → Years)
   02-scribing/{foundations|methods|...}/
   Status: ✓ Stable
   "Canonical synthesis"
        │
        │ (Practice, apply, teach)
        ▼
🔬 Practice & Labs
   06-practice/ or 04-scriber-labs/
   Status: ✓ Stable + Applied
   "In use and tested"
```

**Key insight:** This reflects reality. Real knowledge evolves gradually.

---

## File Organization: Atomic Pattern

Each major section follows this pattern:

```
XX-section-name/
├── ch-section-name.ptx          ← Chapter wrapper
├── intent.ptx                   ← (Optional) Why this section exists
├── subsection-1/
│   ├── note-001.ptx             ← Atomic note template
│   ├── note-002.ptx
│   └── note-NNN.ptx
├── subsection-2/
│   ├── note-001.ptx
│   └── ...
└── README.md                    ← (Optional) Quick reference
```

### Example: Scribing / Foundations

```
02-scribing/
├── ch-scribing.ptx                (includes foundations, methods, etc.)
│
└── foundations/
    ├── note-001-sets-and-logic.ptx
    ├── note-002-functions.ptx
    ├── note-003-metric-spaces.ptx
    ├── note-004-topological-spaces.ptx
    └── note-005-continuity.ptx    ← Each file has one main topic
```

Each note is **atomic** and **referenceable**:

```xml
<!-- In note-002 -->
<subsection xml:id="sec-found-functions-002">
  <title>Functions and Composition</title>
  ...
  <p>See <xref ref="sec-found-sets-and-logic-001" /> for set notation.</p>
</subsection>
```

---

## Cross-Referencing Network

```
                    ┌─ found-sets-001
                    │       ↑
                    │     [references]
                    │       │
found-functions-002 ───────┘
      │     ▲
      │     └──── [also in]
      │           04-scriber-labs/project-X/design.ptx
      │
      └─► [example in] ──► 06-practice/proof-001.ptx
            └──► [cites paper] ──► 05-field-notes/papers


04-scriber-labs connects to:
  ├─ 02-scribing (uses concepts)
  ├─ 05-field-notes (based on)
  └─ 06-practice (tests ideas)

06-practice links to:
  ├─ 02-scribing (applies)
  ├─ 04-scriber-labs (projects)
  └─ 05-field-notes (references sources)
```

**Every connection is explicit via `<xref>`.**

---

## Citation Integration

```
05-field-notes/papers
    │
    ├─ Summary of smith2024neural
    │     └─ Link to source
    │     └─ Key insights
    │
02-scribing/foundations/note-001
    │
    ├─ Cite smith2024neural <cite bib="smith2024neural" />
    │     └─ "See 05-field-notes for my summary"
    │
07-meta/citations.ptx
    │
    └─ How to manage citations correctly
```

**Complete guide in `07-meta/citations.ptx`** — no guessing!

---

## Your Workflow (Typical Day)

```
09:00 AM  [Inspiration strikes]
          └─► Quick note in Obsidian
          
Later     [Review & develop]
          └─► Move to 03-eigenthoughts/fragments/
              Status: 🧪
          
Next Day  [Refine & structure]
          └─► Promote to 03-eigenthoughts/loss-gems.ptx
              Status: 📝

Next Week [Integrate]
          └─► Place in 02-scribing context
              Write cross-references
              Status: ✓

Next Month [Revisit]
           └─► Refine based on new understanding
               Update related notes
               Add to Practice section
```

Document your actual workflow in `07-meta/workflow.ptx`.

---

## ID Naming Convention

```
Pattern: sec-{section-abbr}-{topic-slug}-{number}

Examples:
  ┌─────────────────────────────────────────────┐
  │ sec-found-linear-algebra-001                 │
  │ ├─ found = Scribing: Foundations             │
  │ ├─ linear-algebra = Topic                    │
  │ └─ 001 = First note on this topic           │
  └─────────────────────────────────────────────┘

  sec-method-proof-strategy-003     (Methods: Method 3 on proofs)
  sec-gem-curiosity-driven-001      (Eigenthoughts: Gem 1 on curiosity)
  sec-practice-calc-limits-002      (Practice: Exercise 2 on limits)
  sec-found-topology-004            (Foundations: Note 4 on topology)

Abbreviations:
  found     = Foundations
  method    = Methods
  interp    = Interpretability
  unif      = Unifications
  gem       = Eigenthoughts/Gems
  field     = Field Notes
  practice  = Practice
  lab       = Scriber Labs
```

**Once set, never change.** Links depend on stability.

---

## Chapter Progression (How to Read)

### Reader Path 1: Learning Mode
```
01-frontmatter
    ↓
02-scribing/foundations
    ↓
02-scribing/methods
    ↓
06-practice (try things)
    ↓
04-scriber-labs (see real projects)
```

### Reader Path 2: Research Mode
```
05-field-notes (what exists)
    ↓
02-scribing (my synthesis)
    ↓
03-eigenthoughts (emerging ideas)
    ↓
04-scriber-labs (exploration)
```

### Reader Path 3: Topic Deep-Dive
```
Use search or index
    ↓
Read specific Scribing notes
    ↓
Follow cross-references
    ↓
Check Field Notes for sources
    ↓
Practice exercises
```

Document expected reading patterns in `01-frontmatter/how-to-read.ptx`.

---

## Directory Tree (What Exists)

```
source/
├── docinfo.ptx                      ← Metadata
├── main.ptx                         ← Current (switch to main-new.ptx)
├── main-new.ptx                     ← ← Use this when ready
│
├── 01-frontmatter/
│   ├── frontmatter-wrapper.ptx     (includes all 3 sections)
│   ├── intent.ptx                  ← ✍️ Write this
│   ├── conventions.ptx              ← ✍️ Write this
│   └── how-to-read.ptx              (example provided)
│
├── 02-scribing/
│   ├── ch-scribing.ptx             (includes all 4 subsections)
│   ├── foundations/
│   │   └── note-001.ptx             (template)
│   ├── methods/
│   │   └── note-001.ptx             (template)
│   ├── interpretability/
│   │   └── note-001.ptx             (template)
│   └── unifications/
│       └── note-001.ptx             (template)
│
├── 03-eigenthoughts/
│   ├── ch-eigenthoughts.ptx
│   ├── intent.ptx                  (why eigenthoughts exist)
│   ├── loss-gems.ptx               (store for gems)
│   └── fragments/
│       └── fragment-001.ptx         (template)
│
├── 04-scriber-labs/
│   ├── ch-scriber-labs.ptx         (structure + template)
│   ├── about/
│   │   └── README.ptx
│   └── projects/                   (one dir per project)
│
├── 05-field-notes/
│   └── ch-field-notes.ptx          (structure + sections)
│
├── 06-practice/
│   └── ch-practice.ptx             (structure + 4 sections)
│
├── 07-meta/
│   ├── ch-meta.ptx                 (includes all 3 sections)
│   ├── workflow.ptx                ← ✍️ Describe your process
│   ├── systems.ptx                 (tools & setup)
│   └── citations.ptx               ⭐ COMPLETE GUIDE
│
└── 08-backmatter/
    ├── backmatter-wrapper.ptx
    ├── glossary.ptx                (indexed terms)
    └── bibliography-notes.ptx      (source notes)
```

Legend:
- ✍️ = Fill in with your content
- ⭐ = Already complete, just use it
- (template) = Copy and modify

---

## Version Control Tips

```bash
# Initialize git if not already done
git init
git add -A
git commit -m "Initial PreTeX structure"

# Create branches for experimentation
git checkout -b feature/add-topology

# Safe switching
git checkout -b backup/old-structure  # Keep old structure safe
git checkout main                      # Back to main

# Tag milestones
git tag v1.0-stable-content
git tag v2.0-comprehensive

# Easy rollback if needed
git revert <commit-hash>
```

---

## Testing Checklist

```
□ Clone repo locally
  $ git clone ...

□ Install PreTeX if needed
  $ pip install pretext-cli

□ Validate XML
  $ pretext validate source/main-new.ptx

□ Build HTML
  $ pretext build html

□ View output
  $ open output/web/index.html

□ Check for:
  ✓ No broken references (xref warnings)
  ✓ All includes resolved
  ✓ Frontmatter renders
  ✓ Navigation works
  ✓ Index/glossary generated

□ Switch to new main
  $ cp source/main.ptx source/main-old.ptx
  $ cp source/main-new.ptx source/main.ptx

□ Final build
  $ pretext build html
```

---

## Long-Term Backup Strategy

```
Daily:   git push origin        (GitHub/GitLab)
Weekly:  rsync to external      (Local drive)
Monthly: Archive to Archive.org (Web backup)
Yearly:  Export to PDF + ZIP    (Offline storage)
```

See `PRETEXT_BESTPRACTICES.md § 7` for details.

---

## Quick Reference: What to Do Next

```
TODAY
├─ Read QUICKSTART.md
├─ Test pretext build html
└─ Review folder structure

THIS WEEK
├─ Update docinfo.ptx
├─ Write intent.ptx
├─ Write conventions.ptx
├─ Migrate 3-5 best notes
└─ Test: pretext build html

NEXT WEEK
├─ Write workflow.ptx (Meta)
├─ Add Field Notes references
├─ Create 3-5 Eigenthought gems
└─ Create Practice exercises

MONTH 1+
├─ Migrate remaining content
├─ Refine cross-references
├─ Switch to main-new.ptx officially
└─ Deploy/publish
```

---

**You now have a complete system for sustainable knowledge building.** 🎉

Start small, iterate often, think long-term.
