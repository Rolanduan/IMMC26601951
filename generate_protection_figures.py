import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Rectangle
import matplotlib.patches as mpatches

# Figure 1: System Structure Diagram
fig, ax = plt.subplots(1, 1, figsize=(12, 8))

ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')
ax.set_title('Conservation Operations System Structure', fontsize=14, fontweight='bold')

# System components
components = [
    (0.5, 7.5, 2.5, 1.5, 'Park\nGeography', '#FFE5E5', 'Terrain, roads, water, gates'),
    (4, 7.5, 2.5, 1.5, 'Wildlife &\nHabitats', '#E5F5FF', 'Species, ecosystems, breeding'),
    (7, 7.5, 2.5, 1.5, 'Threat\nEnvironment', '#E5FFE5', 'Poaching, fire, access'),
    (0.5, 4.5, 2.5, 1.5, 'Protection\nPriorities', '#FFF4E5', 'Species, location, threat'),
    (4, 4.5, 2.5, 1.5, 'Resource\nAssets', '#F0E5FF', 'Rangers, UAVs, cameras'),
    (7, 4.5, 2.5, 1.5, 'Deployment\nStrategy', '#E5FFF5', 'Allocation, scheduling'),
    (2, 1.5, 2.5, 1.5, 'Monitoring &\nDetection', '#FFE5F5', 'Patrols, sensors, data'),
    (5.5, 1.5, 2.5, 1.5, 'Protection\nOutcomes', '#E5FFE5', 'Coverage, safety, trends'),
]

for x, y, w, h, text, color, desc in components:
    rect = Rectangle((x, y), w, h, facecolor=color, edgecolor='black', linewidth=1.5)
    ax.add_patch(rect)
    ax.text(x + w/2, y + h/2 + 0.15, text, fontsize=9, ha='center', va='center', 
            fontweight='bold')
    ax.text(x + w/2, y + 0.3, desc, fontsize=7, ha='center', va='center', style='italic')

# Arrows showing flow
arrows = [
    (1.75, 7.5, 1.75, 6.0), (5.25, 7.5, 5.25, 6.0), (8.25, 7.5, 8.25, 6.0),
    (3.25, 4.5, 4.0, 4.5), (6.25, 4.5, 7.0, 4.5),
    (3.25, 4.5, 3.25, 3.0), (5.25, 4.5, 5.25, 3.0), (7.25, 4.5, 7.25, 3.0),
    (3.25, 1.5, 5.5, 1.5),
]

for x1, y1, x2, y2 in arrows:
    ax.annotate('', xy=(x1, y1), xytext=(x2, y2),
               arrowprops=dict(arrowstyle='->,head_width=0.3', lw=2, color='gray'))

plt.tight_layout()
plt.savefig('figures/system_structure.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("System structure diagram generated")

# Figure 2: Performance Comparison
fig, ax = plt.subplots(1, 1, figsize=(10, 6))

metrics = ['High-Priority\nSpecies', 'Critical\nArea Coverage', 
           'Threat\nDetection', 'Ranger\nEfficiency']
uniform = [62, 58, 55, 180]
strategic = [89, 94, 81, 320]

x = np.arange(len(metrics))
width = 0.35

bars1 = ax.bar(x - width/2, uniform, width, label='Uniform Coverage',
               color='#FF8C69', alpha=0.8, edgecolor='black')
bars2 = ax.bar(x + width/2, strategic, width, label='Strategic Allocation',
               color='#4ECDC4', alpha=0.8, edgecolor='black')

ax.set_ylabel('Value', fontsize=12, fontweight='bold')
ax.set_title('Uniform vs. Strategic Allocation: Performance Comparison',
             fontsize=14, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(metrics, fontsize=10)
ax.legend(loc='upper left', fontsize=10)
ax.grid(axis='y', alpha=0.3)

# Add value labels on bars
for bars in [bars1, bars2]:
    for bar in bars:
        height = bar.get_height()
        if height <= 100:
            ax.text(bar.get_x() + bar.get_width()/2., height,
                   f'{int(height)}\%', ha='center', va='bottom', fontsize=9)
        else:
            ax.text(bar.get_x() + bar.get_width()/2., height,
                   f'{int(height)}', ha='center', va='bottom', fontsize=9)

ax.set_ylim(0, max(max(strategic), 350) * 1.15)

plt.tight_layout()
plt.savefig('figures/performance_comparison.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("Performance comparison chart generated")

# Figure 3: Protection Heat Map Simulation
fig, ax = plt.subplots(1, 1, figsize=(10, 8))

# Create a simulated protection heat map
np.random.seed(42)
grid_size = 50
protection_grid = np.random.rand(grid_size, grid_size) * 0.4 + 0.5

# Add high-priority zones (water holes, critical habitats)
high_priority_zones = [(25, 25), (35, 30), (20, 35), (30, 20)]
for (cx, cy) in high_priority_zones:
    for i in range(grid_size):
        for j in range(grid_size):
            dist = np.sqrt((i - cx)**2 + (j - cy)**2)
            if dist < 8:
                protection_grid[i, j] = min(0.95, protection_grid[i, j] + 0.3 * (1 - dist/8))

im = ax.imshow(protection_grid, cmap='RdYlGn', origin='lower', 
               vmin=0.4, vmax=0.95, extent=[0, 100, 0, 100])

# Add water hole markers
for (cx, cy) in high_priority_zones:
    ax.plot(cx*2, cy*2, 'bo', markersize=8, markeredgecolor='black', markeredgewidth=1.5)
    ax.annotate('Water Hole', xy=(cx*2, cy*2), xytext=(cx*2+3, cy*2+3),
               fontsize=7, ha='center', 
               arrowprops=dict(arrowstyle='->', lw=0.8, color='black'))

# Colorbar
cbar = plt.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
cbar.set_label('Protection Level', fontsize=10, fontweight='bold')

ax.set_xlabel('Distance East (km)', fontsize=11, fontweight='bold')
ax.set_ylabel('Distance North (km)', fontsize=11, fontweight='bold')
ax.set_title('Etosha National Park: Strategic Protection Allocation Map',
             fontsize=13, fontweight='bold')

# Legend
legend_elements = [
    mpatches.Patch(color='#006400', label='High Protection (>0.85)'),
    mpatches.Patch(color='#FFFF00', label='Medium Protection (0.65-0.85)'),
    mpatches.Patch(color='#8B0000', label='Low Protection (<0.65)'),
    plt.Line2D([0], [0], marker='o', color='w', markerfacecolor='blue', 
               markersize=8, markeredgecolor='black', label='Water Holes'),
]
ax.legend(handles=legend_elements, loc='lower right', fontsize=9)

plt.tight_layout()
plt.savefig('figures/protection_heatmap.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("Protection heat map generated")
