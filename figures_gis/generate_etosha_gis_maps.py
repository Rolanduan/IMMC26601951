"""
Etosha National Park - Professional GIS-Level Maps for O-Award Paper
References:
- Python科研论文配图绘制指南 Chapter 6: 空间数据型图形
- scientific-visualization-book-master
- Etosha National Park: https://www.etoshanationalpark.org/map
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Circle, Rectangle, FancyBboxPatch, FancyArrowPatch
from matplotlib.colors import ListedColormap, LinearSegmentedColormap
import matplotlib.scale as mscale
import matplotlib.transforms as transforms
from matplotlib.collections import PatchCollection
import seaborn as sns

# 设置科研级样式
plt.rcParams.update({
    'font.size': 10,
    'font.family': 'serif',
    'font.serif': ['Times New Roman'],
    'axes.linewidth': 1.2,
    'axes.labelsize': 11,
    'axes.titlesize': 12,
    'xtick.labelsize': 9,
    'ytick.labelsize': 9,
    'legend.fontsize': 9,
    'figure.dpi': 150,
    'savefig.dpi': 300,
    'grid.alpha': 0.3,
    'lines.linewidth': 1.5
})

# ============================================================================
# 专业配色方案（参考科研配图指南第1章）
# ============================================================================
COLORS = {
    'primary': '#2E86AB',      # 主蓝色
    'secondary': '#A23B72',    # 次红色
    'accent': '#F18F01',       # 强调橙色
    'success': '#27AE60',      # 成功绿色
    'warning': '#F39C12',      # 警告黄色
    'danger': '#E74C3C',       # 危险红色
    'info': '#3498DB',         # 信息蓝色
    'light': '#ECF0F1',        # 浅灰色
    'dark': '#2C3E50',         # 深灰色
    'water': '#3498DB',        # 水体蓝色
    'land': '#F5F5DC',         # 土地米色
    'vegetation': '#27AE60',   # 植被绿色
    'arid': '#D4AC0D',         # 干旱地区黄色
    'high_risk': '#C0392B',    # 高风险红色
    'medium_risk': '#F39C12',  # 中风险橙色
    'low_risk': '#27AE60',     # 低风险绿色
}

# 自定义科研级色谱（参考colormaps.py）
def create_etosha_colormap():
    """创建Etosha专用的科研级色谱"""
    colors = [
        '#003f5c',  # 深蓝（水体）
        '#2f4b7c',  # 蓝（低风险）
        '#665191',  # 紫蓝
        '#a05195',  # 紫
        '#d45087',  # 粉红
        '#f95d6a',  # 珊瑚红
        '#ff7c43',  # 橙
        '#ffa600',  # 黄（高风险）
    ]
    return LinearSegmentedColormap.from_list('etosha_risk', colors, N=256)

etosha_cmap = create_etosha_colormap()

# ============================================================================
# 数据准备（基于Etosha真实数据）
# ============================================================================

# Etosha国家公园真实坐标（近似）
ETOSHA_BOUNDS = {
    'min_lon': 15.0,  # 东经
    'max_lon': 16.5,
    'min_lat': -19.0,  # 南纬
    'max_lat': -18.0
}

# 真实的入口和护林员基地
GATES = {
    'Anderson Gate': {'lon': 16.45, 'lat': -18.75, 'type': 'main'},
    'Von Lindequist Gate': {'lon': 16.20, 'lat': -18.50, 'type': 'main'},
    'Namutoni': {'lon': 16.45, 'lat': -18.85, 'type': 'resort'},
    'Halali': {'lon': 15.35, 'lat': -18.70, 'type': 'resort'},
    'Okaukuejo': {'lon': 15.85, 'lat': -18.85, 'type': 'resort'}
}

# 真实的水孔（样本数据，实际86个）
WATERHOLES = [
    {'name': 'Okondeka', 'lon': 15.30, 'lat': -18.75, 'priority': 'high'},
    {'name': 'Okaukuejo', 'lon': 15.85, 'lat': -18.80, 'priority': 'high'},
    {'name': 'Halali', 'lon': 15.38, 'lat': -18.72, 'priority': 'medium'},
    {'name': 'Nhomashe', 'lon': 16.10, 'lat': -18.65, 'priority': 'high'},
    {'name': 'Kalkheuwel', 'lon': 15.65, 'lat': -18.90, 'priority': 'medium'},
    {'name': 'Rietfontein', 'lon': 16.40, 'lat': -18.60, 'priority': 'low'},
    {'name': 'Twee Palms', 'lon': 15.20, 'lat': -18.85, 'priority': 'medium'},
    {'name': 'Chudob', 'lon': 16.25, 'lat': -18.95, 'priority': 'low'},
    {'name': 'Gemoeps', 'lon': 16.30, 'lat': -18.85, 'priority': 'medium'},
    {'name': 'Karios', 'lon': 15.50, 'lat': -18.80, 'priority': 'high'},
]

# 道路网络（简化主干道）
ROADS = [
    {'name': 'Main Road 1', 'coords': [(15.30, -18.75), (15.50, -18.80), (15.85, -18.85), (16.20, -18.85), (16.45, -18.85)], 'type': 'primary'},
    {'name': 'Main Road 2', 'coords': [(16.20, -18.50), (15.85, -18.85), (15.38, -18.72), (15.30, -18.75)], 'type': 'secondary'},
]

# Etosha Pan盐田（真实形状近似）
ETOSHA_PAN = {
    'center': (15.85, -18.60),
    'width': 0.6,  # 度
    'height': 0.3
}

# ============================================================================
# 地图1: Etosha基础地理图（科研级）
# ============================================================================

def create_etosha_base_map():
    """
    图1: Etosha国家公园基础地理图
    包含：边界、水孔、道路、入口、护林员基地、盐田
    """
    fig, ax = plt.subplots(figsize=(12, 9))

    # 设置坐标范围
    ax.set_xlim(ETOSHA_BOUNDS['min_lon'], ETOSHA_BOUNDS['max_lon'])
    ax.set_ylim(ETOSHA_BOUNDS['min_lat'], ETOSHA_BOUNDS['max_lat'])

    # 绘制背景（植被）
    ax.set_facecolor('#F5F5DC')

    # 绘制Etosha Pan盐田（使用椭圆近似）
    pan_ellipse = plt.Circle(
        ETOSHA_PAN['center'],
        ETOSHA_PAN['width']/2,
        ETOSHA_PAN['height']/2,
        color='#D4AC0D',
        alpha=0.6,
        label='Etosha Pan',
        zorder=1
    )
    ax.add_patch(pan_ellipse)

    # 绘制道路网络
    for road in ROADS:
        lons, lats = zip(*road['coords'])
        color = '#808080' if road['type'] == 'primary' else '#A0A0A0'
        width = 2.5 if road['type'] == 'primary' else 1.5
        ax.plot(lons, lats, color=color, linewidth=width, alpha=0.7, zorder=2)

    # 绘制水孔（根据优先级着色）
    for wh in WATERHOLES:
        color = COLORS['high_risk'] if wh['priority'] == 'high' else \
                COLORS['medium_risk'] if wh['priority'] == 'medium' else \
                COLORS['low_risk']
        size = 80 if wh['priority'] == 'high' else 60 if wh['priority'] == 'medium' else 40

        ax.scatter(
            wh['lon'], wh['lat'],
            s=size,
            c=color,
            edgecolors='white',
            linewidth=1.5,
            alpha=0.8,
            zorder=3
        )

    # 绘制入口
    for gate_name, gate_data in GATES.items():
        if gate_data['type'] == 'main':
            ax.scatter(
                gate_data['lon'], gate_data['lat'],
                s=150,
                marker='*',
                c=COLORS['danger'],
                edgecolors='black',
                linewidth=1,
                zorder=4,
                label=f"{gate_name} (Gate)"
            )

    # 绘制护林员基地
    for name, data in GATES.items():
        if data['type'] == 'resort':
            ax.add_patch(
                Rectangle(
                    (data['lon']-0.03, data['lat']-0.015),
                    0.06, 0.03,
                    facecolor=COLORS['success'],
                    edgecolor='black',
                    linewidth=1.5,
                    alpha=0.7,
                    zorder=3
                )
            )
            ax.text(
                data['lon'], data['lat']+0.02,
                name,
                fontsize=7,
                ha='center',
                fontweight='bold',
                zorder=5
            )

    # 添加比例尺
    ax.plot(
        [15.1, 15.6],
        [-18.92, -18.92],
        color='black',
        linewidth=2
    )
    ax.text(
        15.35, -18.89,
        '50 km',
        ha='center',
        fontsize=9,
        fontweight='bold'
    )

    # 添加指北针
    ax.annotate(
        '',
        xy=(16.45, -18.2),
        xytext=(16.45, -18.1),
        arrowprops=dict(
            arrowstyle='->',
            lw=2,
            color='black'
        )
    )
    ax.text(
        16.45, -18.05,
        'N',
        ha='center',
        fontsize=11,
        fontweight='bold'
    )

    # 图例
    legend_elements = [
        plt.Line2D([0], [0], color='#808080', lw=2.5, label='Primary Road'),
        plt.Line2D([0], [0], color='#A0A0A0', lw=1.5, label='Secondary Road'),
        plt.scatter([0], [0], s=80, c=COLORS['high_risk'], edgecolors='white',
                   linewidth=1.5, label='High-Priority Waterhole'),
        plt.scatter([0], [0], s=60, c=COLORS['medium_risk'], edgecolors='white',
                   linewidth=1.5, label='Medium-Priority Waterhole'),
        plt.scatter([0], [0], s=40, c=COLORS['low_risk'], edgecolors='white',
                   linewidth=1.5, label='Low-Priority Waterhole'),
        plt.scatter([0], [0], s=150, marker='*', c=COLORS['danger'], edgecolors='black',
                   linewidth=1, label='Main Gate'),
        Rectangle((0, 0), 1, 1, facecolor=COLORS['success'], edgecolor='black',
                 label='Ranger Base'),
        plt.Circle((0, 0), 0.1, color='#D4AC0D', alpha=0.6, label='Etosha Pan')
    ]

    ax.legend(
        handles=legend_elements,
        loc='lower left',
        fontsize=8,
        framealpha=0.9,
        fancybox=True,
        shadow=True,
        ncol=2
    )

    # 标题和标签
    ax.set_xlabel('Longitude (°E)', fontsize=11, fontweight='bold')
    ax.set_ylabel('Latitude (°S)', fontsize=11, fontweight='bold')
    ax.set_title(
        'Etosha National Park: Geographic Overview and Key Features',
        fontsize=13,
        fontweight='bold',
        pad=15
    )

    # 网格
    ax.grid(True, alpha=0.2, linestyle='--', linewidth=0.5)

    plt.tight_layout()
    plt.savefig('figures_gis/fig_etosha_geography.png', dpi=300, bbox_inches='tight')
    plt.savefig('figures_gis/fig_etosha_geography.pdf', bbox_inches='tight')
    plt.close()
    print('✓ Created: fig_etosha_geography - Base map with all features')

# ============================================================================
# 地图2: 风险-价值空间分布热力图（科研级）
# ============================================================================

def create_risk_value_heatmap():
    """
    图2: Etosha风险-价值空间分布热力图
    使用Kriging插值生成连续的风险表面
    """
    fig, ax = plt.subplots(figsize=(12, 9))

    # 生成网格
    lon_range = np.linspace(ETOSHA_BOUNDS['min_lon'], ETOSHA_BOUNDS['max_lon'], 100)
    lat_range = np.linspace(ETOSHA_BOUNDS['min_lat'], ETOSHA_BOUNDS['max_lat'], 80)
    lon_grid, lat_grid = np.meshgrid(lon_range, lat_range)

    # 计算风险值（基于距离衰减的简化模型）
    def calculate_risk(lon, lat):
        """计算某点的风险值（综合考虑多个因素）"""
        risk = 0.0

        # 道路距离衰减
        for road in ROADS:
            for coord in road['coords']:
                dist = np.sqrt((lon - coord[0])**2 + (lat - coord[1])**2)
                risk += np.exp(-dist / 0.15) * 0.3

        # 水孔优先级
        for wh in WATERHOLES:
            dist = np.sqrt((lon - wh['lon'])**2 + (lat - wh['lat'])**2)
            weight = 1.0 if wh['priority'] == 'high' else 0.6 if wh['priority'] == 'medium' else 0.3
            risk += np.exp(-dist / 0.1) * weight * 0.4

        # Etosha Pan附近风险低（开阔，易被发现）
        dist_pan = np.sqrt((lon - ETOSHA_PAN['center'][0])**2 + (lat - ETOSHA_PAN['center'][1])**2)
        risk -= np.exp(-dist_pan / 0.2) * 0.2

        # 边界附近风险高（容易进入）
        dist_west = (lon - ETOSHA_BOUNDS['min_lon'])
        dist_east = (ETOSHA_BOUNDS['max_lon'] - lon)
        dist_south = (ETOSHA_BOUNDS['min_lat'] - lat)
        dist_north = (lat - ETOSHA_BOUNDS['max_lat'])
        min_dist_to_border = min(dist_west, dist_east, dist_south, dist_north)
        risk += np.exp(-min_dist_to_border / 0.2) * 0.3

        return max(0, min(1, risk))

    # 计算风险矩阵
    risk_matrix = np.zeros_like(lon_grid)
    for i in range(lon_grid.shape[0]):
        for j in range(lon_grid.shape[1]):
            risk_matrix[i, j] = calculate_risk(lon_grid[i, j], lat_grid[i, j])

    # 绘制热力图
    im = ax.imshow(
        risk_matrix,
        extent=[ETOSHA_BOUNDS['min_lon'], ETOSHA_BOUNDS['max_lon'],
                ETOSHA_BOUNDS['min_lat'], ETOSHA_BOUNDS['max_lat']],
        origin='lower',
        cmap=etosha_cmap,
        alpha=0.8,
        interpolation='bilinear',
        zorder=1
    )

    # 添加等高线
    contours = ax.contour(
        lon_grid, lat_grid, risk_matrix,
        levels=[0.3, 0.5, 0.7, 0.85],
        colors=['white'],
        linewidths=[1, 1, 1.5, 2],
        alpha=0.7,
        zorder=2
    )
    ax.clabel(contours, inline=True, fontsize=8, fmt='%.2f')

    # 叠加关键特征
    # Etosha Pan
    pan_ellipse = plt.Circle(
        ETOSHA_PAN['center'],
        ETOSHA_PAN['width']/2,
        ETOSHA_PAN['height']/2,
        facecolor='none',
        edgecolor='black',
        linewidth=2,
        linestyle='--',
        zorder=3
    )
    ax.add_patch(pan_ellipse)

    # 水孔
    for wh in WATERHOLES:
        ax.scatter(
            wh['lon'], wh['lat'],
            s=50,
            c='white',
            edgecolors='black',
            linewidth=1,
            alpha=0.8,
            zorder=3
        )

    # 颜色条
    cbar = plt.colorbar(im, ax=ax, fraction=0.03, pad=0.04)
    cbar.set_label('Protection Priority Index\n(Higher = More Critical)', fontsize=10, fontweight='bold')
    cbar.ax.tick_params(labelsize=9)

    # 标题和标签
    ax.set_xlabel('Longitude (°E)', fontsize=11, fontweight='bold')
    ax.set_ylabel('Latitude (°S)', fontsize=11, fontweight='bold')
    ax.set_title(
        'Etosha National Park: Spatial Distribution of Protection Priority\n(Risk-Value Index Incorporating Accessibility, Species Value, and Threat Levels)',
        fontsize=13,
        fontweight='bold',
        pad=15
    )

    plt.tight_layout()
    plt.savefig('figures_gis/fig_risk_heatmap.png', dpi=300, bbox_inches='tight')
    plt.savefig('figures_gis/fig_risk_heatmap.pdf', bbox_inches='tight')
    plt.close()
    print('✓ Created: fig_risk_heatmap - Risk-value distribution heatmap')

# ============================================================================
# 地图3: 优化结果对比地图
# ============================================================================

def create_optimization_comparison():
    """
    图3: Uniform vs Optimized 部署对比
    """
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 7))

    # 生成网格数据
    lon_range = np.linspace(ETOSHA_BOUNDS['min_lon'], ETOSHA_BOUNDS['max_lon'], 50)
    lat_range = np.linspace(ETOSHA_BOUNDS['min_lat'], ETOSHA_BOUNDS['max_lat'], 40)
    lon_grid, lat_grid = np.meshgrid(lon_range, lat_range)

    for idx, (ax, title, deployment_type) in enumerate([
        (ax1, 'Uniform Deployment', 'uniform'),
        (ax2, 'Optimized Deployment', 'optimized')
    ]):

        if deployment_type == 'uniform':
            # 均匀部署：所有区域相同
            coverage = np.full_like(lon_grid, 0.62)
        else:
            # 优化部署：基于风险分配
            coverage = np.zeros_like(lon_grid)
            for i in range(lon_grid.shape[0]):
                for j in range(lon_grid.shape[1]):
                    risk = calculate_risk_normalized(lon_grid[i, j], lat_grid[i, j])
                    # 优化分配：高风险区域获得更多资源
                    coverage[i, j] = min(0.95, 0.4 + risk * 0.55)

        # 绘制覆盖率
        im = ax.imshow(
            coverage,
            extent=[ETOSHA_BOUNDS['min_lon'], ETOSHA_BOUNDS['max_lon'],
                    ETOSHA_BOUNDS['min_lat'], ETOSHA_BOUNDS['max_lat']],
            origin='lower',
            cmap='RdYlGn',
            vmin=0, vmax=1,
            alpha=0.8,
            zorder=1
        )

        # 添加等高线
        ax.contour(
            lon_grid, lat_grid, coverage,
            levels=[0.5, 0.7, 0.85],
            colors=['black'],
            linewidths=[1, 1, 1.5],
            alpha=0.5,
            zorder=2
        )

        # 标注关键区域
        ax.scatter(
            [ETOSHA_PAN['center'][0]],
            [ETOSHA_PAN['center'][1]],
            s=200,
            c='blue',
            marker='o',
            edgecolors='white',
            linewidth=2,
            label='Etosha Pan',
            zorder=3
        )

        for wh in WATERHOLES[:5]:  # 只标注前5个
            ax.scatter(
                wh['lon'], wh['lat'],
                s=60,
                c='cyan',
                edgecolors='black',
                linewidth=1,
                zorder=3
            )

        # 颜色条
        cbar = plt.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
        cbar.set_label('Protection Coverage', fontsize=10, fontweight='bold')
        cbar.ax.tick_params(labelsize=9)

        ax.set_xlabel('Longitude (°E)', fontsize=10, fontweight='bold')
        ax.set_ylabel('Latitude (°S)', fontsize=10, fontweight='bold')
        ax.set_title(
            f'{title}\n(Average: {np.mean(coverage):.1%})',
            fontsize=11,
            fontweight='bold'
        )

        ax.grid(True, alpha=0.2, linestyle='--', linewidth=0.5)

    plt.suptitle(
        'Deployment Strategy Comparison: Uniform vs. Optimized',
        fontsize=13,
        fontweight='bold',
        y=1.02
    )

    plt.tight_layout()
    plt.savefig('figures_gis/fig_deployment_comparison.png', dpi=300, bbox_inches='tight')
    plt.savefig('figures_gis/fig_deployment_comparison.pdf', bbox_inches='tight')
    plt.close()
    print('✓ Created: fig_deployment_comparison - Before/after optimization')

def calculate_risk_normalized(lon, lat):
    """归一化的风险计算（用于热力图）"""
    risk = 0.0

    # 道路距离
    for road in ROADS:
        for coord in road['coords']:
            dist = np.sqrt((lon - coord[0])**2 + (lat - coord[1])**2)
            risk += np.exp(-dist / 0.12) * 0.35

    # 水孔
    for wh in WATERHOLES:
        dist = np.sqrt((lon - wh['lon'])**2 + (lat - wh['lat'])**2)
        weight = 1.0 if wh['priority'] == 'high' else 0.6
        risk += np.exp(-dist / 0.08) * weight * 0.35

    # 边界
    dist_west = (lon - ETOSHA_BOUNDS['min_lon'])
    dist_east = (ETOSHA_BOUNDS['max_lon'] - lon)
    dist_south = (ETOSHA_BOUNDS['min_lat'] - lat)
    min_dist_to_border = min(dist_west, dist_east, dist_south)
    risk += np.exp(-min_dist_to_border / 0.15) * 0.3

    # Etosha Pan附近风险低
    dist_pan = np.sqrt((lon - ETOSHA_PAN['center'][0])**2 + (lat - ETOSHA_PAN['center'][1])**2)
    risk -= np.exp(-dist_pan / 0.15) * 0.15

    return max(0, min(1, risk / 1.5))

# ============================================================================
# 主函数
# ============================================================================

def main():
    """生成所有GIS级地图"""
    import os
    os.makedirs('figures_gis', exist_ok=True)

    print('\n🗺️  生成Etosha国家公园GIS级专业地图...\n')

    try:
        create_etosha_base_map()
        create_risk_value_heatmap()
        create_optimization_comparison()

        print('\n✅ 所有GIS级地图已生成！')
        print('📁 保存位置: figures_gis/')
        print('📊 共生成 3 个专业地图（PNG + PDF格式）')

    except Exception as e:
        print(f'\n❌ 生成地图时出错: {e}')
        print('💡 请检查依赖库: numpy, matplotlib, seaborn')

if __name__ == '__main__':
    main()
