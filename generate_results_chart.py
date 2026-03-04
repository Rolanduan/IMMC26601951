import matplotlib.pyplot as plt
import numpy as np

# Figure 3: Results Comparison
fig, ax = plt.subplots(1, 1, figsize=(10, 6))

metrics = ['Delivery\nTime (hrs)', 'On-Time\nRate (%)', 'Reliability', 'Cost\n($)']
deterministic = [47.3, 67, 0.67, 2340]
stochastic = [36.5, 89, 0.89, 2120]

x = np.arange(len(metrics))
width = 0.35

bars1 = ax.bar(x - width/2, deterministic, width, label='Deterministic',
               color='#FF6B6B', alpha=0.8, edgecolor='black')
bars2 = ax.bar(x + width/2, stochastic, width, label='Stochastic Model',
               color='#4ECDC4', alpha=0.8, edgecolor='black')

ax.set_ylabel('Value', fontsize=12, fontweight='bold')
ax.set_title('Deterministic vs. Stochastic Model Comparison',
             fontsize=14, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(metrics, fontsize=10)
ax.legend(loc='upper right', fontsize=10)
ax.grid(axis='y', alpha=0.3)

# Add value labels on bars
for bars in [bars1, bars2]:
    for bar in bars:
        height = bar.get_height()
        if isinstance(height, (int, float)):
            ax.text(bar.get_x() + bar.get_width()/2., height,
                   f'{height:.1f}', ha='center', va='bottom', fontsize=9)
        else:
            ax.text(bar.get_x() + bar.get_width()/2., height,
                   f'{height}', ha='center', va='bottom', fontsize=9)

ax.set_ylim(0, max(max(deterministic), max(stochastic)) * 1.15)

plt.tight_layout()
plt.savefig('figures/results_comparison.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("Results comparison chart generated")
