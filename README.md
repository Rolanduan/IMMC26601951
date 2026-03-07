# IMMC26601951

This repository is cleaned for IMMC submission and contains only the competition paper package.

## Structure

- `paper/main.tex` - full manuscript
- `paper/refs.bib` - bibliography
- `paper/figures/` - rendered figures used in the paper
- `paper/figures_src/` - editable SVG figure sources
- `paper/map_assets/` - Etosha base-map assets
- `paper/code/` - reference implementations for GIS preprocessing, risk modeling, allocation, and simulation
- `paper/generate_professional_figures.js` - regenerate figure SVG sources
- `paper/export_figures.ps1` - export SVG figures to PNG

## Build

When TeX is available:

```powershell
cd .\paper
xelatex main.tex
bibtex main
xelatex main.tex
xelatex main.tex
```
