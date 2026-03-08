# 🦁 Protecting Wildlife at Scale: Strategic Resource Allocation for Etosha National Park

**IMMC 2026 | Control Number: IMMC26601951**

---

## 📋 Project Overview

This repository contains our submission for the **International Mathematical Modeling Challenge (IMMC) 2026** on **"Protecting Wildlife at Scale"** - optimizing anti-poaching resource allocation for Etosha National Park, Namibia.

### 🎯 Problem Statement

Etosha National Park (22,270 km²) faces critical conservation challenges: protecting endangered species (black rhinos, elephants, lions) across vast terrain with severely limited resources. Traditional uniform patrol coverage is insufficient—**we need strategic, priority-based allocation**.

### 💡 Our Approach

We develop an **integrated three-model framework**:

1. **Model I: Spatial Risk Modeling** - Converts wildlife density, species sensitivity, accessibility, and threat data into a park-wide risk surface
2. **Model II: Mixed-Integer Optimization** - Assigns patrol loops, sensors, and drone sorties under staffing and coverage constraints
3. **Model III: Stochastic Simulation** - Evaluates deployment performance through illegal entry, detection, and interception scenarios

### 📊 Key Results

| Metric | Uniform | Strategic | Improvement |
|--------|---------|-----------|-------------|
| Weighted Protection Coverage | 0.64 | **0.87** | +36% |
| Mean Detection Probability | 0.47 | **0.66** | +40% |
| Protection Index | 0.56 | **0.74** | +32% |
| Minimum Staffing | — | **34 rangers** | Science-based |

---

## 📁 Repository Structure

```
IMMC26601951/
├── README.md                    # This file
├── paper/
│   ├── main.tex                 # Complete paper (single file)
│   ├── refs.bib                 # Bibliography
│   ├── README.md                # Paper-specific documentation
│   ├── figures/                 # Rendered figures (PNG)
│   ├── figures_src/             # Editable figure sources (SVG)
│   ├── map_assets/              # Etosha base-map assets
│   ├── code/                    # Reference implementations
│   ├── generate_professional_figures.js  # Figure generation
│   └── export_figures.ps1       # SVG to PNG export script
└── .gitignore                   # Git ignore rules
```

---

## 🚀 Quick Start

### Prerequisites

- **LaTeX Distribution**: TeX Live, MacTeX, or MiKTeX
- **Compiler**: pdflatex (recommended)
- **Optional**: Node.js (for figure generation)

### Compilation

```bash
# Navigate to paper directory
cd paper

# Compile the paper
pdflatex main.tex
pdflatex main.tex  # Run twice for references
```

### Figure Generation (Optional)

If you want to regenerate figures from SVG sources:

```powershell
# Windows PowerShell
.\export_figures.ps1
```

Or use the Node.js script:

```bash
node generate_professional_figures.js
```

---

## 📊 Paper Contents

The complete paper includes:

### Sections

1. **Summary Sheet** - Executive summary for judges
2. **Letter to IMMC** - Management recommendations in plain language
3. **Introduction** - Problem context and objectives
4. **Model I: Spatial Risk Modeling** - Risk surface construction
5. **Model II: Optimization** - Patrol allocation formulation
6. **Model III: Simulation** - Performance evaluation
7. **Results** - Etosha baseline and sensitivity analysis
8. **Discussion** - Limitations, extensions, and transferability
9. **References** - Academic citations

### Figures

1. System Architecture
2. Etosha Grid and Risk Heatmap
3. Risk Decomposition and Patrol Routes
4. Allocation Dashboard
5. Simulation Results
6. Robustness Distribution
7. Sensitivity Analysis Panels
8. Transferability Matrix
9. Station Response Map
10. Sensor/Drone Deployment Map
11. Ranger Requirement Curve
12. Scenario Analysis Matrix

---

## 🔬 Technical Details

### Model I: Spatial Risk Modeling

**Inputs:**
- Wildlife density distribution
- Species sensitivity (IUCN status, keystone species)
- Water dependency patterns
- Accessibility (road networks, gates)
- Response difficulty (travel time)

**Output:**
- Park-wide risk surface identifying high-priority zones

### Model II: Mixed-Integer Optimization

**Decision Variables:**
- Patrol route assignment
- Fixed sensor placement
- Drone sortie scheduling

**Constraints:**
- Staffing limits (ranger availability)
- Travel time constraints
- Revisit frequency requirements
- Budget limitations

**Objective:**
Maximize weighted protection coverage

### Model III: Stochastic Simulation

**Process:**
1. Illegal entry generation
2. Detection probability assessment
3. Dispatch and response modeling
4. Interception success calculation

**Output Metrics:**
- Detection probability
- Response time distribution
- Protection index

---

## 🌍 Key Findings

### Optimal Deployment Strategy

**Eastern-Southern Corridor Focus:**
- Allocate nearly **50%** of patrol time to eastern hotspot corridor
- Allocate **33%** to southern-central corridor
- Remainder to lower-risk western and northern areas

### Staffing Requirements

**Minimum Staffing Floor:**
- **34 field rangers** (17 two-person teams) required
- Maintains protection index above 0.70
- Staffing is the **dominant bottleneck**

### Technology Allocation

**Fixed Sensors:**
- Most effective in **persistent hotspots**
- Declining marginal returns after saturation

**Drones:**
- Best for **flexible coverage**
- Uncertainty reduction
- Not patrol substitutes

---

## 📈 Sensitivity Analysis

### Key Insights

1. **Staffing Availability** - Dominant lever
2. **Detection Quality** - Second most important
3. **Patrol Interval** - Significant impact
4. **Sensor Coverage** - Diminishing returns after hotspot saturation

---

## 🌐 Transferability

The framework separates:
- **Universal decision logic** (applicable to any park)
- **Park-specific layers** (ecological and mobility data)

Successfully validated for:
- **Yellowstone National Park** (USA)
- **Kakadu National Park** (Australia)

---

## 📧 Citation

If you use this work, please cite:

```bibtex
@misc{immc26601951,
  title = {Protecting Wildlife at Scale: Strategic Resource Allocation for Etosha National Park},
  author = {Team IMMC26601951},
  year = {2026},
  month = {March},
  note = {International Mathematical Modeling Challenge (IMMC) 2026 Submission},
  url = {https://github.com/Rolanduan/IMMC26601951}
}
```

---

## 📄 License

This work is submitted for the IMMC 2026 competition. All rights reserved to the authors.

---

## 🙏 Acknowledgments

- IMMC 2026 Problem Committee
- Etosha National Park ecologists and rangers
- Open-source LaTeX and scientific computing communities

---

<div align="center">

**🌐 Protecting Wildlife Through Mathematical Optimization 🌐**

*"*The decisive geography is the eastern-southern corridor. Concentrating patrols and monitoring there produces substantially better protection than spreading effort evenly.*"*

</div>
