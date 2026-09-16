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
Copy-Item "assets/proofmark.png" "output/web/external/"
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

# Inject CSS link and favicon into all HTML files
Write-Host "Injecting custom CSS, emojis and favicon into HTML files..."

# 1. Process ALL HTML files (including knowls) for emojis and tag brackets via postprocess_html.py
Write-Host "Post-processing all HTML files (recursive)..."
if (Get-Command python -ErrorAction SilentlyContinue) {
    python scripts/postprocess_html.py
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    python3 scripts/postprocess_html.py
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
    
    # Favicon check
    if ($content -notmatch "favicon.png") {
        $content = $content -replace '(</head>)', "<link rel=`"icon`" type=`"image/png`" href=`"favicon.png`">`n`$1"
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
