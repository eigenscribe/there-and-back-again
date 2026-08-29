# PowerShell build script for PreTeXt project
# NOTE TO FUTURE AI: This project uses dual build scripts (build.sh and build.ps1).
# ALWAYS keep them in sync when making changes to either.
$ErrorActionPreference = "Stop"

# Activate virtual environment if it exists
if (Test-Path ".venv\Scripts\Activate.ps1") {
    Write-Host "Activating virtual environment..."
    & .venv\Scripts\Activate.ps1
}

# Remove old cache and build artifacts to ensure a clean build
Write-Host "🧹 Forcing PreTeXt rebuild..."
if (Test-Path ".build") { Remove-Item -Recurse -Force ".build" }
if (Test-Path ".ptx") { Remove-Item -Recurse -Force ".ptx" }
if (Test-Path "output/web") { Remove-Item -Recurse -Force "output/web" }

# Build the PreTeXt project
Write-Host "Building PreTeXt project..."
if (Get-Command "pretext" -ErrorAction SilentlyContinue) {
    pretext build web
} elseif (Get-Command "python" -ErrorAction SilentlyContinue) {
    python -m pretext build web
} else {
    python3 -m pretext build web
}

# 🚨 CRITICAL CHECK
if (-not (Test-Path "output/web")) {
    Write-Error "❌ ERROR: PreTeXt did not generate output/web"
    exit 1
}

# Copy custom CSS and assets to output directory
Write-Host "Copying custom CSS and assets..."
New-Item -ItemType File -Path "output/web/.nojekyll" -Force | Out-Null
New-Item -ItemType Directory -Path "output/web/external/elements" -Force | Out-Null
Copy-Item "assets/custom-theme.css" "output/web/external/"
Copy-Item -Recurse "assets/elements/*" "output/web/external/elements/"
Copy-Item "assets/wisp.jpg" "output/web/external/"
Copy-Item "assets/logo.png" "output/web/external/"
Copy-Item "assets/cover.png" "output/web/external/"
Copy-Item "assets/favicon.png" "output/web/external/"
Copy-Item "assets/ember.png" "output/web/external/"
Copy-Item "assets/orb.png" "output/web/external/"
Copy-Item "assets/space-bg.png" "output/web/external/"
Copy-Item "assets/favicon.png" "output/web/"
New-Item -ItemType Directory -Path "output/web/external/widgets/periodic-table" -Force | Out-Null
Copy-Item -Recurse "assets/widgets/periodic-table/*" "output/web/external/widgets/periodic-table/" -Force

# Update the graph data from source
Write-Host "Updating graph data..."
if (Get-Command "python" -ErrorAction SilentlyContinue) {
    python graph-module/update_graph.py
} else {
    python3 graph-module/update_graph.py
}

# Copy graph module files
Write-Host "Copying graph module files..."
New-Item -ItemType Directory -Path "output/web/graph" -Force | Out-Null
Copy-Item "graph-module/graph.js" "output/web/graph/"
Copy-Item "graph-module/graph.css" "output/web/graph/"
Copy-Item "graph-module/notes-graph.json" "output/web/graph/"
Copy-Item "assets/graph-toggle.js" "output/web/graph/"
Copy-Item "assets/d3.min.js" "output/web/graph/"

# Also add override to ALL CSS files including runestone
$runestoneFix = @"

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
"@

$cssFiles = Get-ChildItem -Path "output/web/_static/prefix-*.css", "output/web/_static/pretext/css/*.css" -ErrorAction SilentlyContinue
foreach ($file in $cssFiles) {
    Add-Content -Path $file.FullName -Value $runestoneFix
}

# Add override to theme.css directly
Write-Host "Injecting overrides into theme.css..."
$cssOverride = @"

/* FINAL OVERRIDE - added by build.ps1 */
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
"@
Add-Content -Path "output/web/_static/pretext/css/theme.css" -Value $cssOverride

# Inject CSS link and favicon into all HTML files
Write-Host "Injecting custom CSS, emojis and favicon into HTML files..."

# 1. Process ALL HTML files (including knowls) for emojis and tag brackets
Write-Host "Post-processing all HTML files (recursive)..."
$allHtmlFiles = Get-ChildItem -Path "output/web" -Filter "*.html" -Recurse
foreach ($file in $allHtmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Inject custom emoji spans
    $content = $content -replace ':favicon:', '<span class="twemoji" title=":favicon:"></span>'
    $content = $content -replace ':proofmark:', '<span class="twemoji" title=":proofmark:"></span>'
    $content = $content -replace ':eigenote:', '<span class="twemoji" title=":eigenote:"></span>'
    $content = $content -replace ':ember:', '<span class="twemoji" title=":ember:"></span>'
    $content = $content -replace ':logo:', '<span class="twemoji" title=":logo:"></span>'
    
    # Remove brackets from <tag> elements
    $content = [regex]::Replace($content, '(<code class="code-inline tex2jax_ignore">)&lt;(.*?)&gt;(<\/code>)', '$1$2$3')
    
    # Convert language-none in program blocks to language-bash for Prism syntax highlighting
    $content = [regex]::Replace($content, '(<pre class="program[^"]*"><code class=")language-none(")', '$1language-bash$2')
    
    Set-Content -Path $file.FullName -Value $content
}

# 2. Process only top-level HTML files for path-sensitive injections
$topLevelHtmlFiles = Get-ChildItem -Path "output/web" -Filter "*.html"
foreach ($file in $topLevelHtmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if the file already has the custom CSS link
    if ($content -notmatch "custom-theme.css") {
        $content = $content -replace '(</head>)', "<link rel=`"stylesheet`" type=`"text/css`" href=`"external/custom-theme.css`">`n`$1"
    }

    # Inject Aclonica font
    if ($content -notmatch "family=Aclonica") {
        $content = $content -replace '(</head>)', "<link href=`"https://fonts.googleapis.com/css2?family=Aclonica&display=swap`" rel=`"stylesheet`">`n`$1"
    }
    
    # Inject D3 and graph toggle scripts
    if ($content -notmatch "graph-toggle.js") {
        $content = $content -replace '(</body>)', "<script src=`"graph/d3.min.js`"></script>`n<script src=`"graph/graph-toggle.js`"></script>`n`$1"
    }
    
    # Inject interactive tabs script
    if ($content -notmatch "elements/tabs.js") {
        $content = $content -replace '(</body>)', "<script src=`"external/elements/tabs.js`"></script>`n`$1"
    }
    
    # Fix search bar
    if ($content -notmatch "search-fix") {
        $searchFixStyle = @"
<style id="search-fix">#searchresultsplaceholder, .searchresultsplaceholder { display: none !important; position: fixed !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 560px !important; min-width: 560px !important; max-width: 560px !important; min-height: 280px !important; padding: 1.5rem !important; background: rgba(13, 17, 23, 0.97) !important; border: 1px solid rgba(20, 181, 255, 0.25) !important; border-radius: 16px !important; z-index: 10000 !important; flex-direction: column !important; gap: 1rem !important; box-sizing: border-box !important; overflow: visible !important; } #searchresultsplaceholder.search-active, .searchresultsplaceholder.search-active { display: flex !important; } .search-results-controls { display: flex !important; align-items: center !important; gap: 0.75rem !important; width: 100% !important; min-height: 48px !important; box-sizing: border-box !important; } #ptxsearch { flex: 1 !important; min-width: 0 !important; height: 44px !important; padding: 0 16px !important; background: rgba(18, 22, 30, 0.95) !important; border: 1px solid rgba(20, 181, 255, 0.25) !important; border-radius: 10px !important; color: #e0e0e0 !important; font-size: 14px !important; box-sizing: border-box !important; } #closesearchresults { width: 44px !important; height: 44px !important; min-width: 44px !important; min-height: 44px !important; flex-shrink: 0 !important; background: rgba(20, 181, 255, 0.12) !important; border: 1px solid rgba(20, 181, 255, 0.25) !important; border-radius: 10px !important; color: #14b5ff !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; box-sizing: border-box !important; }</style>
"@
        $searchFixScript = @"
<script>(function(){var sp=document.getElementById("searchresultsplaceholder");var sb=document.getElementById("searchbutton");var cb=document.getElementById("closesearchresults");if(sp)sp.style.display="none";if(sb)sb.addEventListener("click",function(){if(sp){sp.classList.add("search-active");sp.style.display="flex";}});if(cb)cb.addEventListener("click",function(){if(sp){sp.classList.remove("search-active");sp.style.display="none";}});})();</script>
"@
        $content = $content -replace '(</head>)', "$searchFixStyle`n`$1"
        $content = $content -replace '(</body>)', "$searchFixScript`n`$1"
    }
    
    # Direct inline style injection
    $content = $content -replace '<li class="toc-item toc-frontmatter contains-active">', '<li class="toc-item toc-frontmatter contains-active" style="background: linear-gradient(135deg, rgba(20, 181, 255, 0.22), rgba(121, 82, 245, 0.16)) !important; border-radius: 16px !important;">'
    $content = $content -replace '<li class="toc-item toc-backmatter contains-active">', '<li class="toc-item toc-backmatter contains-active" style="background: linear-gradient(135deg, rgba(20, 181, 255, 0.22), rgba(121, 82, 245, 0.16)) !important; border-radius: 16px !important;">'
    
    # Inject JavaScript override
    if ($content -notmatch "toc-color-override") {
        $tocOverride = @"
<style id="toc-color-override">
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
      if (el.classList.contains("contains-active") || el.classList.contains("active")) {
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
"@
        $content = $content -replace '(</body>)', "$tocOverride`n`$1"
    }
    
    # Favicon check
    if ($content -notmatch "favicon.png") {
        $content = $content -replace '(</head>)', "<link rel=`"icon`" type=`"image/png`" href=`"favicon.png`">`n`$1"
    }
    
    # Glassmorphic TOC styling
    if ($content -notmatch "glassmorphic-toc") {
        $glassmorphicStyle = @"
<style id="glassmorphic-toc">:root{--toclevel1-background:transparent!important;--toclevel2-background:transparent!important;--toclevel3-background:transparent!important}nav#ptx-toc.ptx-toc,nav#ptx-toc.ptx-toc ul.structural,nav#ptx-toc.ptx-toc .toc-item-list{background:transparent!important}nav#ptx-toc.ptx-toc .toc-title-box{background:transparent!important}nav#ptx-toc.ptx-toc li.toc-item,nav#ptx-toc.ptx-toc li.toc-frontmatter,nav#ptx-toc.ptx-toc li.toc-backmatter,nav#ptx-toc.ptx-toc li.toc-chapter{background:linear-gradient(135deg,rgba(20,181,255,0.18),rgba(59,130,246,0.22))!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;border:1px solid rgba(59,130,246,0.35)!important;border-radius:14px!important;box-shadow:0 4px 20px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.08)!important}nav#ptx-toc.ptx-toc li.toc-item.contains-active,nav#ptx-toc.ptx-toc li.toc-item.active,nav#ptx-toc.ptx-toc li.toc-frontmatter.contains-active,nav#ptx-toc.ptx-toc li.toc-backmatter.contains-active,nav#ptx-toc.ptx-toc li.toc-chapter.contains-active{background:linear-gradient(135deg,rgba(20,30,60,0.9),rgba(40,50,100,0.85))!important;border:1px solid rgba(100,120,200,0.5)!important;box-shadow:0 6px 24px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.1)!important}nav#ptx-toc.ptx-toc .toc-title-box>.internal{background:transparent!important}nav#ptx-toc.ptx-toc li.toc-item ul.structural{background:transparent!important;padding-left:0.75rem!important}</style>
"@
        $content = $content -replace '(</head>)', "$glassmorphicStyle`n`$1"
    }
    
    # Update footer
    if ($content -match "ptx-content-footer") {
        $content = [regex]::Replace($content, '<footer class="ptx-content-footer">.*?</footer>', '<footer class="ptx-content-footer"><span class="copyright">eigenscribe © 2025-2026</span></footer>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    }
    
    # Page footer replacement
    if ($content -match 'id="ptx-page-footer"') {
        $newFooter = @"
<div id="ptx-page-footer" class="ptx-page-footer" style="background: rgba(0, 0, 0, 0.7); border-top: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 1.5rem 1rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
<img src="external/logo.png" alt="eigenscribe logo" style="width: 35px; height: 35px; filter: drop-shadow(0 0 8px rgba(0, 232, 255, 0.5));">
<p style="font-family: Aclonica, sans-serif; background: linear-gradient(130deg, #00ffee, #0a95eb); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-size: 1rem; margin: 0;">eigenscribe © 2025-2026</p>
</div>
"@
        $content = [regex]::Replace($content, '<div id="ptx-page-footer" class="ptx-page-footer">.*?</div>(\s*<script)', "$newFooter`$1", [System.Text.RegularExpressions.RegexOptions]::Singleline)
    }
    
    Set-Content -Path $file.FullName -Value $content
}

# 3. Clean up brackets in search index
if (Test-Path "output/web/lunr-pretext-search-index.js") {
    Write-Host "Cleaning up brackets in search index..."
    $indexContent = Get-Content -Path "output/web/lunr-pretext-search-index.js" -Raw
    $indexContent = $indexContent -replace '<(\d{12})>', '$1'
    $indexContent = $indexContent -replace 'Tags:\s+<([^>]+)>', 'Tags: $1'
    $indexContent = $indexContent -replace '\s+,\s+<([^>]+)>', ' , $1'
    Set-Content -Path "output/web/lunr-pretext-search-index.js" -Value $indexContent
}

Write-Host "✅ Build complete! Custom styling and assets applied."
