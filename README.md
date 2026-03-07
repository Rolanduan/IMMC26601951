# IMMC26601951

This repository is cleaned for IMMC submission and contains a compile-oriented competition paper package.

## Structure

- `paper/main.tex` - full manuscript
- `main.tex` - root compile entry for Overleaf or local LaTeX
- `paper/refs.bib` - source bibliography archive
- `paper/figures/` - rendered figures used in the paper
- `paper/figures_src/` - editable SVG figure sources
- `paper/map_assets/` - Etosha base-map assets
- `paper/code/` - reference implementations for GIS preprocessing, risk modeling, allocation, and simulation
- `paper/generate_professional_figures.js` - regenerate figure SVG sources
- `paper/export_figures.ps1` - export SVG figures to PNG

## Build

When TeX is available:

```powershell
pdflatex main.tex
pdflatex main.tex
```
