import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

fig, ax = plt.subplots(1, 1, figsize=(14, 10))
ax.set_xlim(0, 14)
ax.set_ylim(0, 10)
ax.axis('off')

# Title
ax.text(7, 9.5, 'Humanitarian Delivery System Structure',
        fontsize=16, fontweight='bold', ha='center')

# System Components
components = [
    # (x, y, width, height, text, color)
    (0.5, 7, 2.5, 1.5, 'Supply Sources\n(Vaccines, Medicine)', '#FFE5E5'),
    (4.5, 7, 2.5, 1.5, 'Warehouses\n(Central + Local)', '#E5F5FF'),
    (8.5, 7, 2.5, 1.5, 'Distribution\nNetwork', '#E5FFE5'),
    (0.5, 4.5, 3, 1.5, 'Road Network\n(Stochastic Travel Times)', '#FFF4E5'),
    (4.5, 4.5, 3, 1.5, 'Vehicle Fleet\n(Limited Capacity)', '#F0E5FF'),
    (8.5, 4.5, 3, 1.5, 'Demand Points\n(Health Centers)', '#E5FFF5'),
    (2.5, 2, 3, 1.5, 'Routing\nDecisions', '#FFE5F5'),
    (6.5, 2, 3, 1.5, 'Delivery\nExecution', '#E5F5FF'),
    (10.5, 2, 3, 1.5, 'System\nPerformance', '#E5FFE5'),
]

for x, y, w, h, text, color in components:
    box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.1",
                          edgecolor='black', facecolor=color, linewidth=1.5)
    ax.add_patch(box)
    ax.text(x + w/2, y + h/2, text, fontsize=9, ha='center', va='center',
            fontweight='bold')

# Arrows showing flows
arrows = [
    (3, 7.75, 4.5, 7.75),  # Supply to Warehouse
    (7, 7.75, 8.5, 7.75),  # Warehouse to Network
    (2, 5.25, 4.5, 5.25),  # Road to Fleet
    (6, 5.25, 8.5, 5.25),  # Fleet to Demand
    (3.5, 4.5, 3, 3),      # Routing to Delivery
    (5.5, 4.5, 6.5, 3),     # Routing to Delivery
    (7.5, 4.5, 10.5, 3),    # Delivery to Performance
    (4, 2.75, 10.5, 2.75),  # All to Performance
]

for x1, y1, x2, y2 in arrows:
    arrow = FancyArrowPatch((x1, y1), (x2, y2), arrowstyle='->,head_length=8,head_width=5',
                           mutation_scale=1.5, color='black', linewidth=1.5)
    ax.add_patch(arrow)

# Uncertainty annotation
ax.text(7, 0.8, 'Key Uncertainty: Stochastic Travel Times (floods, conflicts, terrain)',
        fontsize=10, style='italic', ha='center', color='red')

ax.text(7, 0.4, 'Decision: Balance Efficiency vs. Reliability',
        fontsize=10, style='italic', ha='center', color='blue')

plt.tight_layout()
plt.savefig('figures/system_structure.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("System structure diagram generated: figures/system_structure.png")
