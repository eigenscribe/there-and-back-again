#!/bin/bash
# NOTE TO FUTURE AI: This project uses dual build scripts (build.sh and build.ps1).
# ALWAYS keep them in sync when making changes to either.
set -e

# Check if running on Windows (Git Bash/WSL) and if a PowerShell script exists
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
  if [ -f "build.ps1" ]; then
    echo "🪟 Windows detected. Running build.ps1 via PowerShell..."
    powershell.exe -ExecutionPolicy Bypass -File build.ps1
    exit $?
  fi
fi

# Activate virtual environment if it exists
if [ -d ".venv" ]; then
  if [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
  elif [ -f ".venv/Scripts/activate" ]; then
    source .venv/Scripts/activate
  fi
fi

# Ensure local validator is in PATH
if [ -d ".bin" ]; then
  export PATH="$PWD/.bin:$PATH"
fi


# Remove old cache and build artifacts to ensure a clean build
echo "🧹 Forcing PreTeXt rebuild..."

# Remove only the internal PreTeXt cache (NOT everything)
rm -rf .build/
rm -rf .ptx/
rm -rf output/web/

# Build the PreTeXt project
echo "Building PreTeXt project..."
if command -v pretext >/dev/null 2>&1; then
  pretext build web
elif python3 -m pretext --version >/dev/null 2>&1; then
  python3 -m pretext build web
else
  python -m pretext build web
fi

# 🚨 CRITICAL CHECK
if [ ! -d "output/web" ]; then
  echo "❌ ERROR: PreTeXt did not generate output/web"
  exit 1
fi

# Copy custom CSS and assets to output directory
echo "Copying custom CSS and assets..."
touch output/web/.nojekyll
mkdir -p output/web/external/elements
cp assets/custom-theme.css output/web/external/
cp -r assets/elements/* output/web/external/elements/
cp assets/wisp.jpg output/web/external/
cp assets/logo.png output/web/external/
cp assets/cover.png output/web/external/
cp assets/favicon.png output/web/external/
cp assets/ember.png output/web/external/
cp assets/orb.png output/web/external/
cp assets/proofmark.png output/web/external/
cp assets/space-bg.png output/web/external/
cp assets/favicon.png output/web/
mkdir -p output/web/external/widgets/periodic-table
cp -r assets/widgets/periodic-table/* output/web/external/widgets/periodic-table/

# Update the graph data from source
echo "Updating graph data..."
if command -v python >/dev/null 2>&1; then
  python graph-module/update_graph.py
else
  python3 graph-module/update_graph.py
fi

# Copy graph module files
echo "Copying graph module files..."
mkdir -p output/web/graph
cp graph-module/graph.js output/web/graph/
cp graph-module/graph.css output/web/graph/
cp graph-module/notes-graph.json output/web/graph/
cp assets/graph-toggle.js output/web/graph/
cp assets/d3.min.js output/web/graph/

# Inject CSS link, favicon, and postprocessing into HTML files
echo "Injecting custom CSS, emojis and favicon into HTML files..."
if command -v python >/dev/null 2>&1; then
  python scripts/postprocess_html.py
else
  python3 scripts/postprocess_html.py
fi

echo "✅ Build complete! Custom styling and assets applied."