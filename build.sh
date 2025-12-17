#!/bin/bash

# Build the PreTeXt project
echo "Building PreTeXt project..."
pretext build web

# Copy custom CSS and assets to output directory
echo "Copying custom CSS and assets..."
mkdir -p output/web/external
cp assets/custom-theme.css output/web/external/
cp assets/wisp.jpg output/web/external/
cp assets/logo.png output/web/external/
cp assets/favicon.png output/web/

# Copy graph module files
echo "Copying graph module files..."
mkdir -p output/web/graph
cp graph-module/graph.js output/web/graph/
cp graph-module/graph.css output/web/graph/
cp graph-module/notes-graph.json output/web/graph/
cp assets/graph-toggle.js output/web/graph/
cp assets/d3.min.js output/web/graph/

# Also add override to ALL CSS files including runestone
for rcss in output/web/_static/prefix-*.css output/web/_static/pretext/css/*.css; do
  if [ -f "$rcss" ]; then
    cat >> "$rcss" << 'RUNESTONEFIX'
/* FIX: Override frontmatter/backmatter TOC colors */
.toc-frontmatter.contains-active,
.toc-backmatter.contains-active,
.toc-frontmatter.contains-active .toc-title-box,
.toc-backmatter.contains-active .toc-title-box,
.toc-frontmatter.contains-active .toc-title-box a,
.toc-backmatter.contains-active .toc-title-box a,
.toc-frontmatter.contains-active a.internal,
.toc-backmatter.contains-active a.internal {
  background: linear-gradient(135deg, rgba(20, 181, 255, 0.3), rgba(121, 82, 245, 0.2)) !important;
  background-color: rgba(20, 181, 255, 0.25) !important;
  background-image: linear-gradient(135deg, rgba(20, 181, 255, 0.3), rgba(121, 82, 245, 0.2)) !important;
}
RUNESTONEFIX
  fi
done

# Add override to theme.css directly
echo "Injecting overrides into theme.css..."
cat >> output/web/_static/pretext/css/theme.css << 'CSSOVERRIDE'

/* FINAL OVERRIDE - added by build.sh */
.ptx-toc li.toc-frontmatter.contains-active,
.ptx-toc li.toc-frontmatter.active,
.ptx-toc li.toc-backmatter.contains-active,
.ptx-toc li.toc-backmatter.active,
.ptx-toc li.toc-chapter.contains-active,
.ptx-toc li.toc-item.contains-active,
.ptx-toc li.toc-item.active {
  background: linear-gradient(135deg, rgba(20, 181, 255, 0.22), rgba(121, 82, 245, 0.16)) !important;
  background-color: rgba(20, 181, 255, 0.2) !important;
  border-color: rgba(20, 181, 255, 0.4) !important;
  border-radius: 16px !important;
}
.ptx-toc li.toc-item.contains-active > .toc-title-box,
.ptx-toc li.toc-item.active > .toc-title-box,
.ptx-toc .toc-title-box {
  background: transparent !important;
  background-color: transparent !important;
}
/* CRITICAL: Override anchor element background in frontmatter/backmatter */
.ptx-toc .toc-frontmatter.contains-active .toc-title-box a,
.ptx-toc .toc-frontmatter.contains-active .toc-title-box .internal,
.ptx-toc .toc-frontmatter.active .toc-title-box a,
.ptx-toc .toc-backmatter.contains-active .toc-title-box a,
.ptx-toc .toc-backmatter.contains-active .toc-title-box .internal,
nav.ptx-toc .toc-frontmatter.contains-active .toc-title-box a.internal,
nav.ptx-toc .toc-backmatter.contains-active .toc-title-box a.internal,
.toc-frontmatter.contains-active a.internal,
.toc-backmatter.contains-active a.internal,
.toc-frontmatter.contains-active a,
.toc-backmatter.contains-active a {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
}
CSSOVERRIDE

# Inject CSS link and favicon into all HTML files
echo "Injecting custom CSS and favicon into HTML files..."
for file in output/web/*.html; do
  # Check if the file already has the custom CSS link
  if ! grep -q "custom-theme.css" "$file"; then
    # Insert the link tag in head
    sed -i 's|</head>|<link rel="stylesheet" type="text/css" href="external/custom-theme.css">\n</head>|' "$file"
  fi
  
  # Inject D3 and graph toggle scripts before closing body tag
  if ! grep -q "graph-toggle.js" "$file"; then
    sed -i 's|</body>|<script src="graph/d3.min.js"></script>\n<script src="graph/graph-toggle.js"></script>\n</body>|' "$file"
  fi
  
  # Fix search bar - inject styles at END of body to override PreTeXt bundles
  if ! grep -q "search-final-fix" "$file"; then
    sed -i 's|</body>|<style id="search-final-fix">body.pretext dialog#ptx-search-modal.pretext-search, body.pretext dialog#ptx-search-modal, body dialog.pretext-search, dialog#ptx-search-modal, dialog.pretext-search { position: fixed !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 560px !important; min-width: 560px !important; max-width: none !important; min-height: 420px !important; max-height: 80vh !important; padding: 1.5rem !important; background: rgba(13, 17, 23, 0.97) !important; border: 1px solid rgba(20, 181, 255, 0.25) !important; border-radius: 16px !important; z-index: 10000 !important; box-sizing: border-box !important; overflow: auto !important; } dialog#ptx-search-modal .searchresultsplaceholder, dialog.pretext-search .searchresultsplaceholder { width: 100% !important; min-width: 100% !important; max-width: none !important; display: flex !important; flex-direction: column !important; gap: 1rem !important; } dialog#ptx-search-modal::backdrop { background: rgba(0, 0, 0, 0.7) !important; } .search-results-controls { display: flex !important; align-items: center !important; gap: 0.75rem !important; width: 100% !important; min-height: 48px !important; box-sizing: border-box !important; } #ptxsearch { flex: 1 !important; min-width: 0 !important; height: 44px !important; padding: 0 16px !important; background: rgba(18, 22, 30, 0.95) !important; border: 1px solid rgba(20, 181, 255, 0.25) !important; border-radius: 10px !important; color: #e0e0e0 !important; font-size: 14px !important; box-sizing: border-box !important; } #closesearchresults { width: 44px !important; height: 44px !important; min-width: 44px !important; min-height: 44px !important; flex-shrink: 0 !important; background: rgba(20, 181, 255, 0.12) !important; border: 1px solid rgba(20, 181, 255, 0.25) !important; border-radius: 10px !important; color: #14b5ff !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; box-sizing: border-box !important; }</style>\n</body>|' "$file"
  fi
  
  # Direct inline style injection for toc-frontmatter.contains-active
  sed -i 's|<li class="toc-item toc-frontmatter contains-active">|<li class="toc-item toc-frontmatter contains-active" style="background: linear-gradient(135deg, rgba(20, 181, 255, 0.22), rgba(121, 82, 245, 0.16)) !important; border-radius: 16px !important;">|g' "$file"
  sed -i 's|<li class="toc-item toc-backmatter contains-active">|<li class="toc-item toc-backmatter contains-active" style="background: linear-gradient(135deg, rgba(20, 181, 255, 0.22), rgba(121, 82, 245, 0.16)) !important; border-radius: 16px !important;">|g' "$file"
  
  # Inject JavaScript override by using perl for complex substitution
  if ! grep -q "toc-color-override" "$file"; then
    perl -i -0pe 's|</body>|<style id="toc-color-override">
.ptx-toc li.toc-frontmatter.contains-active,
.ptx-toc li.toc-backmatter.contains-active {
  background: linear-gradient(135deg, rgba(20, 181, 255, 0.22), rgba(121, 82, 245, 0.16)) !important;
  background-color: rgba(20, 181, 255, 0.2) !important;
  border-color: rgba(20, 181, 255, 0.4) !important;
  border-radius: 16px !important;
}
.toc-frontmatter.contains-active .toc-title-box a,
.toc-backmatter.contains-active .toc-title-box a,
.toc-frontmatter.contains-active a.internal,
.toc-backmatter.contains-active a.internal {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
}
</style>
<script>
(function() {
  function overrideTocColors() {
    document.querySelectorAll(".toc-frontmatter, .toc-backmatter").forEach(function(el) {
      if (el.classList.contains("contains-active") \|\| el.classList.contains("active")) {
        el.style.setProperty("background", "linear-gradient(135deg, rgba(20, 181, 255, 0.22), rgba(121, 82, 245, 0.16))", "important");
        el.style.setProperty("background-color", "rgba(20, 181, 255, 0.2)", "important");
        el.style.setProperty("border-radius", "16px", "important");
        // Override anchors inside
        el.querySelectorAll("a, .internal").forEach(function(a) {
          a.style.setProperty("background", "transparent", "important");
          a.style.setProperty("background-color", "transparent", "important");
          a.style.setProperty("background-image", "none", "important");
        });
      }
    });
  }
  overrideTocColors();
  document.addEventListener("DOMContentLoaded", overrideTocColors);
  window.addEventListener("load", overrideTocColors);
  setInterval(overrideTocColors, 100);
})();
</script>
</body>|gs' "$file"
  fi
  
  # Check if the file already has the favicon
  if ! grep -q "favicon.png" "$file"; then
    # Insert the favicon link in the <head>
    sed -i 's|</head>|<link rel="icon" type="image/png" href="favicon.png">\n</head>|' "$file"
  fi
  
  # Update footer with custom branding
  if grep -q "ptx-content-footer" "$file"; then
    # Replace footer content with eigenscribe copyright
    sed -i 's|<footer class="ptx-content-footer">.*</footer>|<footer class="ptx-content-footer"><span class="copyright">eigenscribe © 2025</span></footer>|' "$file"
  fi
  
  # Remove all content from page footer and replace with custom branding
  if grep -q 'id="ptx-page-footer"' "$file"; then
    # Use perl for multiline replacement - match everything up to </body>
    perl -i -0pe 's|<div id="ptx-page-footer" class="ptx-page-footer">.*?</div>\s*</body>|<div id="ptx-page-footer" class="ptx-page-footer" style="background: rgba(0, 0, 0, 0.7); border-top: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 2rem 1rem;"><div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem;"><img src="external/logo.png" alt="eigenscribe logo" style="width: 35px; height: 35px; filter: drop-shadow(0 0 8px rgba(0, 232, 255, 0.5));"><p style="font-family: Aclonica, sans-serif; background: linear-gradient(130deg, #00ffee, #0a95eb); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-size: 1rem; margin: 0;">eigenscribe © 2025</p></div></div>\n</body>|gs' "$file"
  fi
done

echo "Build complete! Custom styling and assets applied."
