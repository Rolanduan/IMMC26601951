"""
Enhanced System Structure Diagram Generator
Publication-quality conservation operations system architecture
HTML SVG-level quality with professional styling
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle, Rectangle
import numpy as np

# Set publication-quality parameters
plt.rcParams.update({
    'font.size': 10,
    'font.family': 'serif',
    'font.serif': ['Times New Roman'],
    'figure.dpi': 300,
    'savefig.dpi': 300,
    'axes.linewidth': 0.8,
})

# Create large figure for system architecture
fig, ax = plt.subplots(figsize=(16, 12))
ax.set_xlim(0, 100)
ax.set_ylim(0, 100)
ax.axis('off')

# ============================================================================
# Helper Functions
# ============================================================================
def draw_box(ax, x, y, width, height, text, color, fontsize=10, fontweight='bold'):
    """Draw a fancy box with text"""
    box = FancyBboxPatch((x, y), width, height,
                         boxstyle="round,pad=0.1", edgecolor='black',
                         facecolor=color, linewidth=1.5, alpha=0.9)
    ax.add_patch(box)
    ax.text(x + width/2, y + height/2, text, ha='center', va='center',
           fontsize=fontsize, fontweight=fontweight, color='black')
    return box

def draw_arrow(ax, x1, y1, x2, y2, color='black', style='->', lw=1.5):
    """Draw arrow between two points"""
    arrow = FancyArrowPatch((x1, y1), (x2, y2),
                           arrowstyle=style, color=color,
                           linewidth=lw, mutation_scale=20)
    ax.add_patch(arrow)
    return arrow

# ============================================================================
# Title Section
# ============================================================================
ax.text(50, 97, 'Conservation Operations System Architecture',
       ha='center', va='top', fontsize=16, fontweight='bold')
ax.text(50, 94, 'Etosha National Park Strategic Resource Allocation Framework',
       ha='center', va='top', fontsize=12, style='italic')

# ============================================================================
# LAYER 1: INPUT LAYER (Top)
# ============================================================================
layer_y = 86
ax.text(5, layer_y + 2.5, 'INPUT LAYER',
       fontsize=10, fontweight='bold', color='gray')

# Input boxes
inputs = [
    (10, 'Species Data', '#abd9e9'),
    (25, 'Threat Intelligence', '#fdae61'),
    (40, 'Terrain Maps', '#abd9e9'),
    (55, 'Budget Constraints', '#fddbc7'),
    (70, 'Staffing Levels', '#fdae61'),
    (85, 'Equipment Inventory', '#abd9e9')
]

for x, label, color in inputs:
    draw_box(ax, x - 5, layer_y, 10, 4, label, color, fontsize=9)

# ============================================================================
# LAYER 2: PROTECTION DEFINITION (AHP + Fuzzy)
# ============================================================================
layer_y = 76
ax.text(5, layer_y + 2.5, 'LAYER 1: PROTECTION DEFINITION',
       fontsize=10, fontweight='bold', color='blue')

# Main box
draw_box(ax, 20, layer_y, 60, 5,
        'AHP-Fuzzy Comprehensive Evaluation\n' +
        r'$P_i = \mathbf{w} \circ \mathbf{R}_i = \sum_{j=1}^{n} w_j \cdot r_{ij}$' +
        '\nSpecies Priority $\pi_s$ | Protection Gap $G_i$',
        '#e0f3f8', fontsize=9)

# Sub-components
draw_box(ax, 22, layer_y - 7, 12, 3, 'AHP\nWeighting', '#2c7bb6', fontsize=8)
draw_box(ax, 44, layer_y - 7, 12, 3, 'Fuzzy\nEvaluation', '#2c7bb6', fontsize=8)
draw_box(ax, 66, layer_y - 7, 12, 3, 'Priority\nRanking', '#2c7bb6', fontsize=8)

# Connect to inputs
for i, (x, label, color) in enumerate(inputs):
    if i % 2 == 0:
        draw_arrow(ax, x, layer_y, 35, layer_y + 5, 'gray', lw=0.8)

# ============================================================================
# LAYER 3: SPATIAL REPRESENTATION (Graph Theory)
# ============================================================================
layer_y = 60
ax.text(5, layer_y + 2.5, 'LAYER 2: SPATIAL NETWORK',
       fontsize=10, fontweight='bold', color='green')

# Main box
draw_box(ax, 20, layer_y, 60, 5,
        'Graph-Theoretic Spatial Representation\n' +
        r'$G = (V, E, W)$ | 50 Monitoring Zones | Dijkstra Shortest Path' +
        '\nAccessibility Matrix $A_{ik}$ | Response Time $T_{response}$',
        '#e6f5d0', fontsize=9)

# Sub-components
draw_box(ax, 22, layer_y - 7, 12, 3, 'Graph\nTopology', '#74c476', fontsize=8)
draw_box(ax, 44, layer_y - 7, 12, 3, 'Accessibility\nModel', '#74c476', fontsize=8)
draw_box(ax, 66, layer_y - 7, 12, 3, 'Route\nOptimization', '#74c476', fontsize=8)

# Vertical arrow
draw_arrow(ax, 50, layer_y - 2, 50, layer_y + 5, 'black', lw=2)

# ============================================================================
# LAYER 4: RESOURCE ALLOCATION (MILP Core)
# ============================================================================
layer_y = 44
ax.text(5, layer_y + 2.5, 'LAYER 3: OPTIMIZATION CORE (MILP)',
       fontsize=10, fontweight='bold', color='orange')

# Main box - larger, more prominent
draw_box(ax, 15, layer_y, 70, 6,
        'Mixed-Integer Linear Programming Formulation\n' +
        r'$\max \mathcal{P}_{weighted} - \lambda \mathcal{C}_{cost} - \gamma \mathcal{G}_{gap}$' +
        '\nDecision Variables: $\{x_{ijk}, y_{ij}, z_{ik}\}$ | Constraints: Budget, Personnel, Coverage',
        '#fee8c8', fontsize=10)

# Sub-components (wider)
draw_box(ax, 18, layer_y - 8, 18, 3, 'Ranger Allocation', '#fd8d3c', fontsize=8)
draw_box(ax, 41, layer_y - 8, 18, 3, 'UAV Deployment', '#fd8d3c', fontsize=8)
draw_box(ax, 64, layer_y - 8, 18, 3, 'Camera Network', '#fd8d3c', fontsize=8)

# Vertical arrow
draw_arrow(ax, 50, layer_y - 2, 50, layer_y + 6, 'black', lw=2)

# ============================================================================
# LAYER 5: TEMPORAL EVALUATION (DP + Queueing)
# ============================================================================
layer_y = 28
ax.text(5, layer_y + 2.5, 'LAYER 4: TEMPORAL OPERATION',
       fontsize=10, fontweight='bold', color='red')

# Main box
draw_box(ax, 20, layer_y, 60, 5,
        'Dynamic Programming + Queueing Theory\n' +
        r'$V_t(z_t) = \max_{x_t} \{R_t(z_t, x_t) + \beta \sum P(z_{t+1}|z_t, x_t)V_{t+1}\}$' +
        '\nM/M/c Queue: $W_q = L_q/\lambda$ | Staffing: $c_{min}$',
        '#fddbc7', fontsize=9)

# Sub-components
draw_box(ax, 22, layer_y - 7, 12, 3, 'Dynamic\nProgramming', '#e6550d', fontsize=8)
draw_box(ax, 44, layer_y - 7, 12, 3, 'Queueing\nModel', '#e6550d', fontsize=8)
draw_box(ax, 66, layer_y - 7, 12, 3, 'Staffing\nInference', '#e6550d', fontsize=8)

# Vertical arrow
draw_arrow(ax, 50, layer_y - 2, 50, layer_y + 5, 'black', lw=2)

# ============================================================================
# LAYER 6: UNCERTAINTY ANALYSIS (Monte Carlo)
# ============================================================================
layer_y = 12
ax.text(5, layer_y + 2.5, 'LAYER 5: ROBUSTNESS TESTING',
       fontsize=10, fontweight='bold', color='purple')

# Main box
draw_box(ax, 20, layer_y, 60, 5,
        'Monte Carlo Simulation (10,000 Trials)\n' +
        r'$\theta_i^{(k)} \sim \mathcal{N}(\theta_i, \sigma_i^2)$' +
        '\n95\% CI: [86.2\%, 94.9\%] | Sensitivity Analysis | Scenario Testing',
        '#e7d4e8', fontsize=9)

# Sub-components
draw_box(ax, 22, layer_y - 7, 12, 3, 'Parameter\nUncertainty', '#9e9ac8', fontsize=8)
draw_box(ax, 44, layer_y - 7, 12, 3, 'Scenario\nAnalysis', '#9e9ac8', fontsize=8)
draw_box(ax, 66, layer_y - 7, 12, 3, 'Confidence\nIntervals', '#9e9ac8', fontsize=8)

# Vertical arrow
draw_arrow(ax, 50, layer_y - 2, 50, layer_y + 5, 'black', lw=2)

# ============================================================================
# OUTPUT LAYER (Bottom)
# ============================================================================
layer_y = 2
ax.text(5, layer_y + 2.5, 'OUTPUT LAYER',
       fontsize=10, fontweight='bold', color='gray')

# Output boxes
outputs = [
    (10, 'Strategic\nDeployment Plan', '#74c476'),
    (30, '127 Rangers\n(3-Shift Rotation)', '#abd9e9'),
    (50, '89% Species\nProtection', '#fdae61'),
    (70, '94% Area\nCoverage', '#fddbc7'),
    (90, '81% Threat\nDetection', '#e7d4e8')
]

for x, label, color in outputs:
    draw_box(ax, x - 7, layer_y, 14, 4, label, color, fontsize=9, fontweight='bold')

# Final arrow
draw_arrow(ax, 50, layer_y - 2, 50, layer_y + 5, 'black', lw=2)

# ============================================================================
# SIDE ANNOTATIONS
# ============================================================================
# Left side - Key Methods
ax.text(2, 70, 'KEY METHODS', fontsize=9, fontweight='bold', rotation=90)
methods_text = 'AHP\nFuzzy\nGraph Theory\nMILP\nDP\nQueueing\nMote Carlo\nGame Theory\nGA Solver'
ax.text(2, 50, methods_text, fontsize=8, ha='center', va='center',
       bbox=dict(boxstyle='round,pad=0.5', facecolor='lightblue', alpha=0.5))

# Right side - Performance Metrics
ax.text(98, 70, 'METRICS', fontsize=9, fontweight='bold', rotation=90, ha='center')
metrics_text = 'Species: 96.8%\nArea: 94.3%\nEfficiency: 320 km²\nStaffing: 127\nCost: \$12.4/km²\nRobustness: ±2.4%'
ax.text(98, 50, metrics_text, fontsize=8, ha='center', va='center',
       bbox=dict(boxstyle='round,pad=0.5', facecolor='lightyellow', alpha=0.5))

# ============================================================================
# FEEDBACK LOOPS (Dashed Arrows)
# ============================================================================
# Right feedback loop (Layer 6 → Layer 3)
draw_arrow(ax, 85, 14, 85, 47, 'red', lw=1.5)
ax.text(87, 30, 'Strategy\nRefinement', fontsize=8, color='red',
       bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.8))

# Left feedback loop (Layer 6 → Layer 1)
draw_arrow(ax, 15, 14, 15, 81, 'blue', lw=1.5)
ax.text(7, 50, 'Parameter\nCalibration', fontsize=8, color='blue',
       rotation=90, ha='center',
       bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.8))

# ============================================================================
# LEGEND
# ============================================================================
legend_y = 95
legend_elements = [
    mpatches.Patch(color='#2c7bb6', label='Protection Evaluation'),
    mpatches.Patch(color='#74c476', label='Spatial Network'),
    mpatches.Patch(color='#fd8d3c', label='Optimization Core'),
    mpatches.Patch(color='#e6550d', label='Temporal Operation'),
    mpatches.Patch(color='#9e9ac8', label='Robustness Testing'),
]
ax.legend(handles=legend_elements, loc='upper center',
         bbox_to_anchor=(0.5, 1.02), ncol=5, fontsize=8,
         frameon=True, fancybox=True, shadow=False)

# Add version info
ax.text(50, 0.5, 'IMMC26601951 | Control Number: IMMC26601951 | March 2026',
       ha='center', va='bottom', fontsize=8, style='italic', color='gray')

# Save high-quality figure
plt.savefig('figures/system_structure.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("✓ Enhanced system structure diagram generated: figures/system_structure.png")
plt.close()
