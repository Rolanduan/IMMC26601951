# IMMC Wildlife Protection Paper (Etosha Case)

This folder contains a complete LaTeX paper package:

- `main.tex`: full manuscript (summary sheet, letter, sections 1--11, appendix, AI use report)
- `refs.bib`: bibliography entries
- `code/`: reference implementations for GIS preprocessing, risk scoring, allocation, and simulation
- `map_assets/`: downloaded base map used for map-based figure reprocessing
- `figures_src/*.svg`: editable figure sources
- `figures/*.png`: rendered figures used by `\includegraphics`
- `generate_professional_figures.js`: regenerate all professional figure SVG sources (15 figures)
- `export_figures.ps1`: re-render all PNG figures from SVG via Edge headless mode

## Regenerate figure sources

```powershell
node .\paper\generate_professional_figures.js
```

## Re-export figures

```powershell
powershell -ExecutionPolicy Bypass -File .\paper\export_figures.ps1
```

## Compile (when TeX is installed)

```powershell
cd .\paper
xelatex main.tex
bibtex main
xelatex main.tex
xelatex main.tex
```

`pdflatex/xelatex/bibtex` were not available in the current shell environment, so compilation was not executed here.
