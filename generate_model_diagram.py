import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Rectangle
import matplotlib.patches as mpatches

# Figure 2: Model Structure Diagram
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))

# Left: Model Hierarchy
ax1.set_xlim(0, 10)
ax1.set_ylim(0, 10)
ax1.axis('off')
ax1.set_title('Model Hierarchy', fontsize=14, fontweight='bold')

# Model boxes
models = [
    (1, 7, 8, 1.5, 'Model I\nDeterministic\nCVRP', '#FFE5E5'),
    (1, 4.5, 8, 1.5, 'Model II\nChance-Constrained\nSVRP', '#E5F5FF'),
    (1, 2, 8, 1.5, 'Model III\nTwo-Stage\nStochastic', '#E5FFE5'),
]

for x, y, w, h, text, color in models:
    rect = Rectangle((x, y), w, h, facecolor=color, edgecolor='black', linewidth=1.5)
    ax1.add_patch(rect)
    ax1.text(x + w/2, y + h/2, text, fontsize=9, ha='center', va='center', fontweight='bold')

# Arrows
ax1.annotate('', xy=(5, 7.75), xytext=(5, 5.75),
            arrowprops=dict(arrowstyle='->', lw=2, color='blue'))
ax1.annotate('', xy=(5, 4.25), xytext=(5, 2.25),
            arrowprops=dict(arrowstyle='->', lw=2, color='green'))

# Right: Mathematical Framework
ax2.set_xlim(0, 10)
ax2.set_ylim(0, 10)
ax2.axis('off')
ax2.set_title('Mathematical Framework', fontsize=14, fontweight='bold')

framework = [
    (0.5, 8, 2, 1.2, 'Data Layer', '#FFF4E5'),
    (3.5, 8, 2, 1.2, 'Probability\nModeling', '#FFE5F5'),
    (6.5, 8, 2, 1.2, 'Optimization\nModel', '#E5F5FF'),
    (0.5, 5, 4, 1.2, 'System\nModel', '#E5FFE5'),
    (5.5, 5, 4, 1.2, 'Decision\nVariables', '#F0E5FF'),
    (0.5, 2, 3, 1.2, 'Solution\nAlgorithm', '#FFF4E5'),
    (4.5, 2, 3, 1.2, 'Performance\nEvaluation', '#E5FFF5'),
]

for x, y, w, h, text, color in framework:
    rect = Rectangle((x, y), w, h, facecolor=color, edgecolor='black', linewidth=1.5)
    ax2.add_patch(rect)
    ax2.text(x + w/2, y + h/2, text, fontsize=8, ha='center', va='center', fontweight='bold')

# Arrows showing flow
arrows2 = [(2.5, 8.6, 3.5, 8.6), (5.5, 8.6, 6.5, 8.6),
           (2.5, 5.6, 5.5, 5.6), (4.5, 5.6, 6.5, 5.6),
           (1.5, 2.6, 4.5, 2.6), (7.5, 2.6, 4.5, 2.6)]

for x1, y1, x2, y2 in arrows2:
    ax2.annotate('', xy=(x1, y1), xytext=(x2, y2),
               arrowprops=dict(arrowstyle='->,head_width=0.3', lw=1.5, color='gray'))

plt.tight_layout()
plt.savefig('figures/model_structure.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("Model structure diagram generated")
