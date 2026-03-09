# IMMC Loss-Flow Interdiction Paper

This folder contains the full source package for the Etosha manuscript. The paper is organized around a new decision spine: threat-transport diagnosis, lexicographic barrier design, queueing-based service reliability, and morphology-based transfer.

## Package Layout

- `main.tex`: top-level assembly file
- `tex/preamble.tex`: layout, macros, and page-style definitions
- `tex/frontmatter.tex`: summary sheet and letter to IMMC
- `tex/body.tex`: aggregator for the main report
- `tex/sections/`: chapter-level manuscript sources
- `tex/references.tex`: inline bibliography block
- `tex/appendices.tex`: appendices and AI use report
- `code/`: reference implementations for the four analytic layers
- `figures_src/`: editable SVG source plates
- `figures/`: exported PNG figures included by LaTeX
- `map_assets/`: map resources used by the figure pipeline
- `generate_professional_figures.js`: regenerates the visual plates
- `export_figures.ps1`: exports the PNG figure set
- `build.ps1`: compile wrapper with engine detection and cleanup support

## Manuscript Logic

The paper is structured around one park-defense loop:

1. Build a threat-transport graph from ingress, habitat, road, and station structure.
2. Diagnose hinge zones through residual weighted loss flow.
3. Solve a lexicographic barrier-design problem for patrol templates, sentinels, and UAV reserve.
4. Size staffing and reserve logic with a queueing reliability layer.
5. Rebuild the model for other parks by morphology rather than by copying the map.

## Figure Workflow

Regenerate figure source plates:

```powershell
node .\generate_professional_figures.js
```

Export the PNG figures used by the manuscript:

```powershell
powershell -ExecutionPolicy Bypass -File .\export_figures.ps1
```

## Build Workflow

Compile with automatic engine detection:

```powershell
powershell -ExecutionPolicy Bypass -File .\build.ps1
```

Clean auxiliary files first, then compile:

```powershell
powershell -ExecutionPolicy Bypass -File .\build.ps1 -Clean
```

If no LaTeX engine is installed, `build.ps1` stops with a clear actionable error instead of failing silently.

## Notes

- The bibliography is inline for portability and to avoid a BibTeX dependency.
- Page headers use continuous total-page counting across the full PDF.
- Compile artifacts are ignored by `paper/.gitignore`.
