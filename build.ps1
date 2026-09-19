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

# Inject CSS link, favicon, and postprocessing into HTML files
Write-Host "Injecting custom CSS, emojis and favicon into HTML files..."
if (Get-Command python -ErrorAction SilentlyContinue) {
    python scripts/postprocess_html.py
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    python3 scripts/postprocess_html.py
}

Write-Host "✅ Build complete! Custom styling and assets applied."
