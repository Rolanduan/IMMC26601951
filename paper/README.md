# IMMC Wildlife Protection Paper

This folder is now organized as a maintainable paper package rather than a single LaTeX file.

## Structure

- `main.tex`: thin entry point that assembles the manuscript
- `tex/preamble.tex`: document class, packages, layout, macros, and page style
- `tex/frontmatter.tex`: summary sheet and letter to IMMC
- `tex/body.tex`: thin aggregator for the main technical report
- `tex/sections/`: chapter-level source files for the main report
- `tex/references.tex`: inline bibliography block
- `tex/appendices.tex`: appendices and AI use report
- `code/`: reference implementations for GIS preprocessing, risk scoring, allocation, and simulation
- `figures_src/`: editable SVG figure sources
- `figures/`: exported PNG figures consumed by LaTeX
- `map_assets/`: base-map assets used by the figure pipeline
- `generate_professional_figures.js`: regenerates figure source SVGs
- `export_figures.ps1`: exports PNG figures from SVG
- `build.ps1`: compile wrapper with engine detection and optional cleanup

## Figure Workflow

Regenerate figure sources:

```powershell
node .\generate_professional_figures.js
```

Export the figures used by the paper:

```powershell
powershell -ExecutionPolicy Bypass -File .\export_figures.ps1
```

## Build Workflow

Compile the paper with automatic engine detection:

```powershell
powershell -ExecutionPolicy Bypass -File .\build.ps1
```

Clean auxiliary files first, then compile:

```powershell
powershell -ExecutionPolicy Bypass -File .\build.ps1 -Clean
```

If no LaTeX engine is installed, `build.ps1` stops with an explicit error message instead of failing silently.

## Notes

- The bibliography remains inline for portability and to avoid a BibTeX dependency.
- The appendix pages are intentionally separated from the main report page count.
- Generated compile artifacts are ignored by `paper/.gitignore`.
