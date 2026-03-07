# IMMC Wildlife Protection Paper (Etosha Case)

This folder contains a compile-oriented LaTeX paper package:

- `main.tex`: full manuscript (summary sheet, letter, sections 1--11, appendix, AI use report)
- `refs.bib`: source bibliography data archive (the manuscript now compiles without BibTeX)
- `code/`: reference implementations for GIS preprocessing, risk scoring, allocation, and simulation
- `map_assets/`: downloaded base map used for map-based figure reprocessing
- `figures_src/*.svg`: editable figure sources
- `figures/*.png`: rendered figures used by `\includegraphics`
- `generate_professional_figures.js`: regenerate all professional figure SVG sources (15 figures)
- `export_figures.ps1`: re-render all PNG figures from SVG via Edge headless mode

## Regenerate figure sources

```powershell
node .\generate_professional_figures.js
```

## Re-export figures

```powershell
powershell -ExecutionPolicy Bypass -File .\export_figures.ps1
```

## Compile (when TeX is installed)

```powershell
pdflatex main.tex
pdflatex main.tex
```

This version is refactored to avoid BibTeX and package-heavy source listings, so a standard `pdflatex` workflow is sufficient.
