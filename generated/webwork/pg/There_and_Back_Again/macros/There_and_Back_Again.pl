#############################################################################
# This macro library supports WeBWorK problems from the PreTeXt project named
# There and Back Again
#############################################################################


# Return a string containing the latex-image-preamble contents.
# To be used by LaTeXImage objects as in:
# $image->addToPreamble(latexImagePreamble())

sub latexImagePreamble {
return <<'END_LATEX_IMAGE_PREAMBLE'
% Minimal LaTeX preamble for extracted images (avoid global package option clashes)
% Provide only the packages needed for TikZ/PGF and image extraction.
\usepackage{tikz}
\usepackage{pgfplots}
\pgfplotsset{compat=1.17}
\usepackage{tkz-euclide}
\usepackage{standalone}
\usepackage[active,tightpage]{preview}
\PreviewEnvironment{tikzpicture}

% TikZ libraries commonly used in figures
\usetikzlibrary{positioning,arrows,decorations.pathreplacing,shapes,backgrounds,calc}

  % Ensure dimensions used by PreTeXt's extractor are defined
  % \\\width and \\\height are referenced by the extractor wrapper
  % so set them to reasonable defaults to avoid "Division by 0" errors.
  \newlength\width
  \newlength\height
  \setlength\width{1.0\textwidth}
  \setlength\height{0.6\textheight}
  % Force a safe resize behavior for extracted images (avoid division-by-zero)
  \usepackage{letltxmacro}
  \LetLtxMacro\OriginalResizebox\resizebox
  \renewcommand{\resizebox}[3]{\OriginalResizebox{1.0\textwidth}{!}{#3}}

END_LATEX_IMAGE_PREAMBLE
}
