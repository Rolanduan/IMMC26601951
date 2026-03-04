# IMMC26601951: Routing for Life-Saving Deliveries

**Control Number: IMMC26601951**

**2026 IMMC International Round - Problem: Routing for Life-Saving Deliveries**

## Overview

This paper addresses the routing optimization problem for humanitarian aid delivery under road network uncertainty, focusing on vaccine and medical supply distribution in Somalia.

## Key Results

- **23% reduction** in expected delivery time compared to deterministic routing
- **89% on-time delivery rate** (vs 67% baseline)
- **31% improvement** using multi-warehouse coordination
- Near-optimal solutions (gap < 4%) within 3-4 minutes

## Paper Structure

1. **Introduction** - Background, problem statement, research contributions
2. **Problem Analysis** - Variable identification, assumptions, precise formulation
3. **Literature Review** - VRP, stochastic programming, humanitarian logistics
4. **Data Analysis** - Somalia road network statistics, probability modeling
5. **Model Formulation** - Progressive models (deterministic → stochastic → multi-depot)
6. **Solution Algorithm** - ALNS metaheuristic, L-shaped method, clustering
7. **Results** - Computational experiments, multi-warehouse comparison, Pareto optimization
8. **Sensitivity Analysis** - Parameter, assumption, and algorithm sensitivity
9. **Model Evaluation** - Advantages, limitations, validation
10. **Conclusion** - Key findings, recommendations, future work

## Files

- `main.tex` - Main LaTeX document
- `sections/` - Individual chapter files
- `appendices/` - Supplementary materials, derivations, code
- `references.bib` - Bibliography

## Compilation

Compile using XeLaTeX or LuaLaTeX (recommended for Chinese support):

```bash
xelatex main.tex
bibtex main
xelatex main.tex
xelatex main.tex
```

## Requirements

- TeX Live or MiKTeX distribution
- LaTeX packages: ctex, amsmath, graphicx, booktabs, algorithm, hyperref

## Authors

**Control Number: IMMC26601951**

*(Per IMMC rules, no individual names or institutional affiliations appear in this paper)*

## License

This work is submitted for the 2026 International Mathematical Modeling Challenge (IMMC).

## Date

March 2026
