const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC = path.join(ROOT, "figures_src");
const MAP = "../map_assets/etosha_official_map.jpg";
const W = 3000;
const H = 1289;
if (!fs.existsSync(SRC)) fs.mkdirSync(SRC, { recursive: true });

const extent = { x: 360, y: 110, w: 2480, h: 1080 };
const camps = {
  Dolomite: [146, 730],
  Olifantsrus: [480, 680],
  Okaukuejo: [1608, 905],
  Halali: [2140, 805],
  Namutoni: [2620, 560],
  Onkoshi: [2480, 430],
};
const gates = {
  Galton: [170, 1075],
  Andersson: [1620, 1090],
  VonLindequist: [2820, 585],
  Nehale: [2330, 70],
};
const waterholes = [
  [380, 690], [550, 700], [700, 682], [860, 670], [1020, 665], [1210, 665], [1390, 694], [1530, 730],
  [1700, 845], [1830, 808], [1950, 770], [2060, 744], [2180, 710], [2290, 680], [2400, 650], [2490, 624],
  [2580, 600], [2660, 580], [2720, 560], [2780, 540], [2840, 520], [2440, 850], [2280, 860], [2060, 900],
];
const palette = {
  ink: "#18324a",
  subink: "#405d78",
  border: "#d5dee9",
  blue: "#3b4992",
  cyan: "#4dbbd5",
  teal: "#008280",
  green: "#008b45",
  amber: "#e69f00",
  orange: "#f28e2b",
  coral: "#d55e00",
  red: "#c73e1d",
  purple: "#7a3e9d",
};
const riskStops = [
  { t: 0.00, rgb: [255, 247, 188] },
  { t: 0.22, rgb: [254, 227, 145] },
  { t: 0.48, rgb: [254, 196, 79] },
  { t: 0.72, rgb: [244, 124, 32] },
  { t: 1.00, rgb: [206, 45, 37] },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function rgbToString(rgb) {
  return `rgb(${rgb.map((v) => Math.round(v)).join(",")})`;
}
function rampColor(stops, value) {
  const v = Math.max(0, Math.min(1, value));
  if (v <= stops[0].t) return rgbToString(stops[0].rgb);
  for (let i = 1; i < stops.length; i++) {
    if (v <= stops[i].t) {
      const prev = stops[i - 1];
      const next = stops[i];
      const local = (v - prev.t) / (next.t - prev.t);
      return rgbToString([
        lerp(prev.rgb[0], next.rgb[0], local),
        lerp(prev.rgb[1], next.rgb[1], local),
        lerp(prev.rgb[2], next.rgb[2], local),
      ]);
    }
  }
  return rgbToString(stops[stops.length - 1].rgb);
}

function write(name, body, useMap = true, subtitle = "", canvas = null) {
  const cw = canvas?.w || W;
  const ch = canvas?.h || H;
  const headerH = ch >= 2200 ? 148 : 112;
  const titleY = ch >= 2200 ? 94 : 78;
  const subtitleY = ch >= 2200 ? 134 : 115;
  const titleSize = ch >= 2200 ? 64 : 56;
  const subtitleSize = ch >= 2200 ? 34 : 30;
  const titleMap = {
    "fig01_system_architecture.png": "Integrated Conservation Modeling Architecture",
    "fig02_etosha_grid.png": "Etosha Base Map with Analytical Grid",
    "fig03_risk_heatmap.png": "Composite Spatial Risk Heatmap",
    "fig04_risk_decomposition.png": "Hotspot Decomposition on Map",
    "fig05_patrol_routes.png": "Optimized Patrol Route Portfolio",
    "fig06_allocation_dashboard.png": "Map-Linked Resource Allocation",
    "fig07_schedule_timeline.png": "24-Hour Operational Schedule",
    "fig08_simulation_results.png": "Dynamic Protection Performance",
    "fig09_robustness_distribution.png": "Monte Carlo Robustness Distribution",
    "fig10_sensitivity_panels.png": "Sensitivity Ranking (Tornado View)",
    "fig11_transferability_matrix.png": "Cross-Park Adaptation Framework",
    "fig12_station_response_map.png": "Station-Centered Response Time Map",
    "fig13_sensor_drone_map.png": "Sensor and Drone Deployment Map",
    "fig14_ranger_requirement_curve.png": "Ranger Requirement Curve",
    "fig15_scenario_matrix.png": "Scenario Stress Matrix",
  };
  const bg = useMap
    ? `<image href="${MAP}" x="0" y="0" width="${cw}" height="${ch}"/><rect x="0" y="0" width="${cw}" height="${ch}" fill="#102035" fill-opacity="0.10"/><rect x="0" y="0" width="${cw}" height="${ch}" fill="url(#mapVignette)"/>`
    : `<rect x="0" y="0" width="${cw}" height="${ch}" fill="url(#paperBg)"/>`;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cw} ${ch}" width="${cw}" height="${ch}">
  <defs>
    <linearGradient id="legendGrad" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="rgb(255,247,188)"/>
      <stop offset="25%" stop-color="rgb(254,227,145)"/>
      <stop offset="50%" stop-color="rgb(254,196,79)"/>
      <stop offset="75%" stop-color="rgb(244,124,32)"/>
      <stop offset="100%" stop-color="rgb(206,45,37)"/>
    </linearGradient>
    <linearGradient id="paperBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbfdff"/>
      <stop offset="100%" stop-color="#f2f6fb"/>
    </linearGradient>
    <linearGradient id="headerAccent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3b4992"/>
      <stop offset="45%" stop-color="#4dbbd5"/>
      <stop offset="100%" stop-color="#008280"/>
    </linearGradient>
    <radialGradient id="mapVignette" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.00"/>
      <stop offset="100%" stop-color="#081220" stop-opacity="0.20"/>
    </radialGradient>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#a8b7c8" flood-opacity="0.23"/>
    </filter>
  </defs>
  ${bg}
  <rect x="28" y="26" width="${cw - 56}" height="${headerH}" rx="18" fill="#ffffff" fill-opacity="0.94" stroke="#d4dce6" stroke-width="1.8" filter="url(#cardShadow)"/>
  <rect x="52" y="42" width="${Math.max(280, cw * 0.28)}" height="8" rx="4" fill="url(#headerAccent)"/>
  <text x="60" y="${titleY}" font-family="Times New Roman, Georgia, serif" font-size="${titleSize}" font-weight="700" fill="${palette.ink}">${titleMap[name] || name}</text>
  <text x="60" y="${subtitleY}" font-family="Times New Roman, Georgia, serif" font-size="${subtitleSize}" fill="${palette.subink}">${subtitle}</text>
  ${body}
</svg>`;
  fs.writeFileSync(path.join(SRC, name.replace(".png", ".svg")), svg, "utf8");
}

function campLayer() {
  let s = "";
  for (const [k, [x, y]] of Object.entries(camps)) {
    s += `<circle cx="${x}" cy="${y}" r="20" fill="#fff" stroke="#7a1225" stroke-width="6"/><circle cx="${x}" cy="${y}" r="7" fill="#7a1225"/>
    <rect x="${x + 20}" y="${y - 24}" width="${k.length * 17 + 18}" height="34" rx="8" fill="#fff" fill-opacity="0.9" stroke="#d1dae5"/>
    <text x="${x + 32}" y="${y - 1}" font-family="Times New Roman, Georgia, serif" font-size="24" font-weight="700" fill="#182b3c">${k}</text>`;
  }
  return s;
}
function gateLayer() {
  let s = "";
  for (const [k, [x, y]] of Object.entries(gates)) {
    s += `<circle cx="${x}" cy="${y}" r="17" fill="#f2fff4" stroke="#2e7d32" stroke-width="5"/>
    <text x="${x}" y="${y + 8}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="22" font-weight="700" fill="#2e7d32">G</text>
    <text x="${x + 24}" y="${y + 6}" font-family="Times New Roman, Georgia, serif" font-size="21" fill="#1f3c24">${k} Gate</text>`;
  }
  return s;
}
function waterLayer(op = 0.9) {
  return waterholes.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#ff5a36" fill-opacity="${op}" stroke="#fff" stroke-width="2"/>`).join("");
}
function riskColor(v) {
  return rampColor(riskStops, v);
}
function gridRiskCells(mode = "risk") {
  const { x, y, w, h } = extent;
  const cw = w / 8;
  const ch = h / 8;
  let s = "";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cx = x + c * cw + cw / 2;
      const cy = y + r * ch + ch / 2;
      const east = c / 7;
      const road = Math.exp(-Math.pow((cy - 760) / 230, 2));
      const pan = Math.exp(-Math.pow((cx - 1880) / 640, 2) - Math.pow((cy - 430) / 290, 2));
      const risk = 0.46 * east + 0.33 * road + 0.21 * pan;
      if (mode === "hot") {
        if (risk > 0.62) s += `<rect x="${x + c * cw}" y="${y + r * ch}" width="${cw}" height="${ch}" fill="#d1495b" fill-opacity="0.28" stroke="#fff" stroke-opacity="0.45"/>
          <rect x="${x + c * cw + 8}" y="${y + r * ch + 8}" width="${cw - 16}" height="${ch - 16}" rx="10" fill="none" stroke="#ffe1d5" stroke-width="2.2" stroke-dasharray="8 6"/>`;
        else if (risk > 0.48) s += `<rect x="${x + c * cw}" y="${y + r * ch}" width="${cw}" height="${ch}" fill="#f4b942" fill-opacity="0.16" stroke="#fff" stroke-opacity="0.26"/>`;
        else s += `<rect x="${x + c * cw}" y="${y + r * ch}" width="${cw}" height="${ch}" fill="#c8d7e6" fill-opacity="0.08" stroke="#fff" stroke-opacity="0.18"/>`;
      } else {
        s += `<rect x="${x + c * cw}" y="${y + r * ch}" width="${cw}" height="${ch}" fill="${riskColor(risk)}" fill-opacity="0.47" stroke="#fff" stroke-opacity="0.32"/>`;
      }
    }
  }
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="3"/>`;
  return s;
}
function lineChart(name, subtitle, series, yMin, yMax, yLabel = "Protection index") {
  const x0 = 220;
  const y0 = 1040;
  const w = 2340;
  const h = 760;
  const n = series[0].values.length;
  const px = (i) => x0 + (w * i) / (n - 1);
  const py = (v) => y0 - ((v - yMin) / (yMax - yMin)) * h;
  let grid = "";
  let curves = "";
  let legend = "";
  for (let v = yMin; v <= yMax + 1e-9; v += 0.05) {
    const yy = py(Number(v.toFixed(2)));
    grid += `<line x1="${x0}" y1="${yy}" x2="${x0 + w}" y2="${yy}" stroke="#e3eaf2" stroke-width="2"/>
    <text x="${x0 - 60}" y="${yy + 9}" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#4a637d">${v.toFixed(2)}</text>`;
  }
  for (const d of [1, 5, 10, 15, 20, 25, 30]) {
    const xx = px(d - 1);
    grid += `<line x1="${xx}" y1="${y0}" x2="${xx}" y2="${y0 - h}" stroke="#edf2f7" stroke-width="2"/>
    <text x="${xx}" y="${y0 + 42}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#4a637d">${d}</text>`;
  }
  series.forEach((s, i) => {
    const d = s.values.map((v, k) => `${k ? "L" : "M"} ${px(k)} ${py(v)}`).join(" ");
    curves += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="8" stroke-linecap="round"/><circle cx="${px(n - 1)}" cy="${py(s.values[n - 1])}" r="6" fill="${s.color}"/>`;
    const ly = 260 + i * 58;
    legend += `<line x1="2008" y1="${ly - 10}" x2="2070" y2="${ly - 10}" stroke="${s.color}" stroke-width="8"/>
    <text x="2090" y="${ly}" font-family="Times New Roman, Georgia, serif" font-size="30" fill="#223a52">${s.name}</text>`;
  });
  write(name, `<rect x="90" y="180" width="2820" height="1020" rx="20" fill="#fff" stroke="#d8e0ea" stroke-width="3"/>
    ${grid}
    <line x1="${x0}" y1="${y0}" x2="${x0 + w}" y2="${y0}" stroke="#5f7387" stroke-width="3"/>
    <line x1="${x0}" y1="${y0 - h}" x2="${x0}" y2="${y0}" stroke="#5f7387" stroke-width="3"/>
    ${curves}${legend}
    <text x="${x0 + 1050}" y="1138" font-family="Times New Roman, Georgia, serif" font-size="32" fill="#223a52">Simulation day</text>
    <text x="90" y="398" transform="rotate(-90 90 398)" font-family="Times New Roman, Georgia, serif" font-size="29" fill="#223a52">${yLabel}</text>`, false, subtitle);
}
function gaussian(x, m, s, a) {
  return a * Math.exp(-Math.pow(x - m, 2) / (2 * s * s));
}

function linePath(xs, ys, px, py) {
  return ys.map((value, index) => `${index ? "L" : "M"} ${px(xs[index])} ${py(value)}`).join(" ");
}

function bandPath(xs, upper, lower, px, py) {
  const top = upper.map((value, index) => `L ${px(xs[index])} ${py(value)}`).join(" ");
  const bottom = lower.slice().reverse().map((value, index) => {
    const realIndex = xs.length - 1 - index;
    return `L ${px(xs[realIndex])} ${py(value)}`;
  }).join(" ");
  return `M ${px(xs[0])} ${py(lower[0])} ${top} ${bottom} Z`;
}

function panel(x, y, w, h, title, lines, opts = {}) {
  const fill = opts.fill || "#ffffff";
  const stroke = opts.stroke || palette.border;
  const titleFill = opts.titleFill || palette.ink;
  const bodyFill = opts.bodyFill || palette.subink;
  const opacity = opts.opacity ?? 0.94;
  const radius = opts.radius || 16;
  const titleSize = opts.titleSize || 28;
  const bodySize = opts.bodySize || 22;
  const lineGap = opts.lineGap || 29;
  const titleY = y + 42;
  const bodyStart = title ? y + 78 : y + 36;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="${opts.strokeWidth || 1.8}" filter="url(#cardShadow)"/>`;
  if (title) {
    out += `<text x="${x + 24}" y="${titleY}" font-family="Times New Roman, Georgia, serif" font-size="${titleSize}" font-weight="700" fill="${titleFill}">${title}</text>`;
  }
  lines.forEach((line, index) => {
    out += `<text x="${x + 24}" y="${bodyStart + index * lineGap}" font-family="Times New Roman, Georgia, serif" font-size="${bodySize}" fill="${bodyFill}">${line}</text>`;
  });
  return out;
}

function legendBlock(x, y, title, items, opts = {}) {
  const width = opts.width || 420;
  const rowH = opts.rowH || 34;
  const height = 78 + items.length * rowH + 18;
  let out = `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="16" fill="#ffffff" fill-opacity="0.93" stroke="${palette.border}" stroke-width="1.8" filter="url(#cardShadow)"/>`;
  out += `<text x="${x + 24}" y="${y + 42}" font-family="Times New Roman, Georgia, serif" font-size="${opts.titleSize || 28}" font-weight="700" fill="${palette.ink}">${title}</text>`;
  items.forEach((item, index) => {
    const cy = y + 76 + index * rowH;
    if (item.type === "line") {
      out += `<line x1="${x + 24}" y1="${cy - 8}" x2="${x + 76}" y2="${cy - 8}" stroke="${item.color}" stroke-width="${item.strokeWidth || 8}" ${item.dash ? `stroke-dasharray="${item.dash}"` : ""}/>`;
      if (item.marker) out += `<circle cx="${x + 50}" cy="${cy - 8}" r="6" fill="${item.color}"/>`;
    } else {
      out += `<rect x="${x + 24}" y="${cy - 22}" width="${24}" height="${18}" rx="4" fill="${item.color}" ${item.stroke ? `stroke="${item.stroke}" stroke-width="1.5"` : ""}/>`;
    }
    out += `<text x="${x + 88}" y="${cy - 4}" font-family="Times New Roman, Georgia, serif" font-size="${item.fontSize || 21}" fill="${palette.subink}">${item.label}</text>`;
  });
  return out;
}

function pill(x, y, label, opts = {}) {
  const fontSize = opts.fontSize || 22;
  const width = opts.width || Math.max(120, 30 + label.length * (fontSize * 0.52));
  const height = opts.height || 34;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${opts.radius || 17}" fill="${opts.fill || palette.blue}" fill-opacity="${opts.opacity || 0.96}" ${opts.stroke ? `stroke="${opts.stroke}" stroke-width="1.6"` : ""}/>
    <text x="${x + width / 2}" y="${y + height / 2 + fontSize * 0.34}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="${fontSize}" font-weight="${opts.weight || 700}" fill="${opts.text || "#ffffff"}">${label}</text>`;
}

function stackedBar(x, y, w, h, segments) {
  let cursor = x;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="#edf3f8" stroke="#d7e0ea" stroke-width="1.5"/>`;
  segments.forEach((segment) => {
    const segW = w * segment.value;
    out += `<rect x="${cursor}" y="${y}" width="${segW}" height="${h}" rx="${h / 2}" fill="${segment.color}" fill-opacity="${segment.opacity || 0.92}"/>`;
    cursor += segW;
  });
  return out;
}

function gridLabels() {
  const letters = "ABCDEFGH".split("");
  const { x, y, w, h } = extent;
  const cw = w / 8;
  const ch = h / 8;
  let out = "";
  letters.forEach((letter, index) => {
    out += `<text x="${x + index * cw + cw / 2}" y="${y - 18}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="22" font-weight="700" fill="#f4f7fb">${letter}</text>`;
  });
  for (let row = 0; row < 8; row++) {
    out += `<text x="${x - 24}" y="${y + row * ch + ch / 2 + 8}" text-anchor="end" font-family="Times New Roman, Georgia, serif" font-size="22" font-weight="700" fill="#f4f7fb">${row + 1}</text>`;
  }
  return out;
}

function hotspotOutline() {
  const { x, y, w, h } = extent;
  const cw = w / 8;
  const ch = h / 8;
  let out = "";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const cx = x + c * cw + cw / 2;
      const cy = y + r * ch + ch / 2;
      const east = c / 7;
      const road = Math.exp(-Math.pow((cy - 760) / 230, 2));
      const pan = Math.exp(-Math.pow((cx - 1880) / 640, 2) - Math.pow((cy - 430) / 290, 2));
      const risk = 0.46 * east + 0.33 * road + 0.21 * pan;
      if (risk > 0.62) {
        out += `<rect x="${x + c * cw + 10}" y="${y + r * ch + 10}" width="${cw - 20}" height="${ch - 20}" rx="10" fill="none" stroke="#ffe8d9" stroke-width="2.3" stroke-dasharray="9 7"/>`;
      }
    }
  }
  return out;
}

if (false) write("fig01_system_architecture.png", `
  <defs>
    <marker id="arrMain" markerWidth="14" markerHeight="10" refX="12" refY="5" orient="auto">
      <polygon points="0 0, 14 5, 0 10" fill="#5d738c"/>
    </marker>
    <marker id="arrLoop" markerWidth="14" markerHeight="10" refX="12" refY="5" orient="auto">
      <polygon points="0 0, 14 5, 0 10" fill="#b23a2c"/>
    </marker>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#b7c4d3" flood-opacity="0.55"/>
    </filter>
  </defs>
  <rect x="90" y="190" width="2820" height="980" rx="22" fill="#ffffff" stroke="#cfd9e5" stroke-width="3"/>

  <rect x="140" y="230" width="660" height="900" rx="18" fill="#f4f8fc" stroke="#d4dfeb"/>
  <rect x="860" y="230" width="1120" height="900" rx="18" fill="#f8fafc" stroke="#d7e1ec"/>
  <rect x="2020" y="230" width="840" height="900" rx="18" fill="#f4faf8" stroke="#d4e5de"/>

  <text x="170" y="275" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#1b3752">Layer A: Multisource Inputs</text>
  <text x="890" y="275" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#1b3752">Layer B: Modeling and Scientific Inference</text>
  <text x="2050" y="275" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#1b3752">Layer C: Deployment and Adaptive Governance</text>

  <rect x="180" y="310" width="580" height="120" rx="14" fill="#e8f1fb" stroke="#6f92b7" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="210" y="352" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#153854">Ecology and Habitat Layers</text>
  <text x="210" y="388" font-family="Times New Roman, Georgia, serif" font-size="24" fill="#31516d">wildlife density, species vulnerability, water dependence</text>

  <rect x="180" y="465" width="580" height="120" rx="14" fill="#f0f6e7" stroke="#6e9b65" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="210" y="507" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#254e22">Threat and Access Layers</text>
  <text x="210" y="543" font-family="Times New Roman, Georgia, serif" font-size="24" fill="#3c5d37">roads, gates, border pressure, illicit opportunity proxies</text>

  <rect x="180" y="620" width="580" height="120" rx="14" fill="#fff3e8" stroke="#bf8f57" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="210" y="662" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#6d4618">Operational Resource Layers</text>
  <text x="210" y="698" font-family="Times New Roman, Georgia, serif" font-size="24" fill="#81572d">ranger teams, device inventory, drone sorties, shift limits</text>

  <rect x="180" y="775" width="580" height="300" rx="14" fill="#f7f9fc" stroke="#98abc0" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="210" y="818" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#1f3953">Data Harmonization and Feature Engine</text>
  <text x="210" y="853" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3a556f">spatial zoning, temporal indexing, station-response graph</text>
  <text x="210" y="887" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3a556f">feature tensor D_t = {W_i,S_i,H_i,A_i,D_i,P_i}</text>
  <text x="210" y="921" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3a556f">quality control: missingness, outlier, seasonal consistency</text>
  <text x="210" y="955" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3a556f">uncertainty tags for each zone and each data channel</text>

  <rect x="915" y="305" width="500" height="180" rx="14" fill="#e8f6ed" stroke="#5b996a" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="948" y="352" font-family="Times New Roman, Georgia, serif" font-size="34" font-weight="700" fill="#1f542f">Model 1: Spatial Risk Inference</text>
  <text x="948" y="387" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#2f6440">R_i = 0.55 B_i + 0.45 T_i, with logistic threat prior</text>
  <text x="948" y="420" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#2f6440">output: hotspot quartiles and risk decomposition map</text>
  <text x="948" y="452" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#2f6440">supports selective saturation, not full-area patrol</text>

  <rect x="1435" y="305" width="500" height="180" rx="14" fill="#fff4e8" stroke="#c58d42" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="1468" y="352" font-family="Times New Roman, Georgia, serif" font-size="34" font-weight="700" fill="#7a4c0f">Model 2: Robust Allocation</text>
  <text x="1468" y="387" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#8a5c1f">MILP over patrol loops, sensors, and drone sectors</text>
  <text x="1468" y="420" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#8a5c1f">objective: max weighted protection under hard constraints</text>
  <text x="1468" y="452" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#8a5c1f">enforces recurrent attention on top-risk quartile</text>

  <rect x="915" y="535" width="500" height="220" rx="14" fill="#f0ecff" stroke="#836acb" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="948" y="582" font-family="Times New Roman, Georgia, serif" font-size="34" font-weight="700" fill="#3e2f82">Model 3: Stochastic Digital Twin</text>
  <text x="948" y="617" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#52439a">Poisson event process + detection-interception mechanics</text>
  <text x="948" y="651" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#52439a">q_i^t = 1 - Π(1-q_a),    PI = 1 - weighted-loss ratio</text>
  <text x="948" y="685" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#52439a">output: robustness bands and schedule-level feasibility</text>
  <text x="948" y="719" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#52439a">1000-run Monte Carlo for scenario stress evaluation</text>

  <rect x="1435" y="535" width="500" height="220" rx="14" fill="#eaf5ff" stroke="#5e8cb7" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="1468" y="582" font-family="Times New Roman, Georgia, serif" font-size="34" font-weight="700" fill="#21476e">Sensitivity and Scenario Lab</text>
  <text x="1468" y="617" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#365c83">stress axes: ranger count, detection quality, devices</text>
  <text x="1468" y="651" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#365c83">output: critical staffing floor and degradation thresholds</text>
  <text x="1468" y="685" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#365c83">policy robustness map for decision contingency design</text>
  <text x="1468" y="719" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#365c83">ranks leverage: staffing > base detection > patrol interval</text>

  <rect x="915" y="790" width="1020" height="285" rx="14" fill="#f8fafc" stroke="#9eb0c3" stroke-width="2.5" stroke-dasharray="9 6" filter="url(#softShadow)"/>
  <text x="948" y="837" font-family="Times New Roman, Georgia, serif" font-size="33" font-weight="700" fill="#223b52">Cross-Park Transfer and Recalibration Kernel</text>
  <text x="948" y="872" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3c556e">portable components: risk architecture, route-based allocation core, simulation engine</text>
  <text x="948" y="906" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3c556e">recalibrated components: ecological priors, mobility graph, seasonal coefficients</text>
  <text x="948" y="940" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3c556e">target parks: Etosha baseline -> Yellowstone / Kakadu transfer scenarios</text>
  <text x="948" y="974" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3c556e">governance mode: weekly re-optimization + monthly parameter review</text>
  <text x="948" y="1008" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3c556e">scientific deliverables: interpretable maps, staffing rules, executable schedules</text>

  <rect x="2070" y="310" width="740" height="170" rx="14" fill="#e9f6f2" stroke="#4a9b89" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="2105" y="355" font-family="Times New Roman, Georgia, serif" font-size="34" font-weight="700" fill="#175e52">Decision Dashboard and Policy Interface</text>
  <text x="2105" y="390" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#2b7065">priority map, route plan, sensor layout, staffing recommendation</text>
  <text x="2105" y="423" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#2b7065">objective KPIs: maximize PI and detection, minimize response delay</text>
  <text x="2105" y="456" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#2b7065">constraint check: ranger-hours, sortie budget, station capacity</text>

  <rect x="2070" y="525" width="740" height="210" rx="14" fill="#eef9f5" stroke="#72a68f" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="2105" y="570" font-family="Times New Roman, Georgia, serif" font-size="34" font-weight="700" fill="#2f6759">Field Deployment Orchestration</text>
  <text x="2105" y="604" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3f7769">staggered patrol schedule + fixed surveillance + dynamic UAV sorties</text>
  <text x="2105" y="638" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3f7769">station-level dispatch rules and hotspot revisit guarantees</text>
  <text x="2105" y="672" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3f7769">real-time incident handling and escalation protocol</text>
  <text x="2105" y="706" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#3f7769">outputs translated into ranger tasking sheets</text>

  <rect x="2070" y="780" width="740" height="295" rx="14" fill="#fff3ec" stroke="#c58d6f" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="2105" y="825" font-family="Times New Roman, Georgia, serif" font-size="34" font-weight="700" fill="#804528">Monitoring, Audit, and Adaptive Retraining</text>
  <text x="2105" y="860" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#8f5a3d">ingest patrol logs, incident traces, and equipment uptime records</text>
  <text x="2105" y="894" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#8f5a3d">update local pressure prior C_i and detection parameters q_a</text>
  <text x="2105" y="928" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#8f5a3d">trigger retraining when PI drifts below reliability threshold</text>
  <text x="2105" y="962" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#8f5a3d">produce audited evidence for policy review and external reporting</text>
  <text x="2105" y="996" font-family="Times New Roman, Georgia, serif" font-size="23" fill="#8f5a3d">close loop back to data fusion for next planning cycle</text>

  <rect x="890" y="505" width="1060" height="270" rx="16" fill="none" stroke="#8f7fb8" stroke-width="2.5" stroke-dasharray="10 7"/>
  <text x="920" y="525" font-family="Times New Roman, Georgia, serif" font-size="24" font-weight="700" fill="#5e4e86">Uncertainty and robustness envelope</text>

  <line x1="760" y1="368" x2="915" y2="368" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="760" y1="523" x2="915" y2="523" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="760" y1="678" x2="915" y2="678" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="760" y1="925" x2="915" y2="925" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="1415" y1="395" x2="1435" y2="395" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="1685" y1="485" x2="1685" y2="535" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="1435" y1="625" x2="1415" y2="625" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="1935" y1="395" x2="2070" y2="395" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="1935" y1="650" x2="2070" y2="650" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="2460" y1="480" x2="2460" y2="525" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>
  <line x1="2460" y1="735" x2="2460" y2="780" stroke="#5d738c" stroke-width="4.5" marker-end="url(#arrMain)"/>

  <path d="M2810 930 C2910 1030 2810 1130 2570 1130 L 520 1130 C260 1130 170 1055 185 945" fill="none" stroke="#b23a2c" stroke-width="5" stroke-dasharray="14 8" marker-end="url(#arrLoop)"/>
  <text x="1120" y="1160" font-family="Times New Roman, Georgia, serif" font-size="27" font-weight="700" fill="#9f3225">Adaptive closed loop: field evidence -> posterior update -> re-optimization</text>

  <rect x="1435" y="855" width="470" height="200" rx="12" fill="#ffffff" stroke="#d5dfe9"/>
  <text x="1462" y="894" font-family="Times New Roman, Georgia, serif" font-size="25" font-weight="700" fill="#243f57">Scientific objective anchors</text>
  <text x="1462" y="924" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3e5870">max  Z = Σ R_i E_i - λ Σ h_r x_r</text>
  <text x="1462" y="952" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3e5870">s.t. ranger-hours, devices, sorties, hotspot floor</text>
  <text x="1462" y="980" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3e5870">verify via PI trajectories and robustness distributions</text>
  <text x="1462" y="1008" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3e5870">deliver actionable staffing and route policies</text>
  <text x="1462" y="1036" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3e5870">transfer through calibrated ecological and mobility priors</text>`,
  false, "High-fidelity closed-loop architecture: scientific inference, optimization, and adaptive field governance");
write("fig01_system_architecture.png", `
  <defs>
    <linearGradient id="laneInput" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f2f7fd"/><stop offset="100%" stop-color="#e9f1fb"/>
    </linearGradient>
    <linearGradient id="laneModel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafd"/><stop offset="100%" stop-color="#edf3f9"/>
    </linearGradient>
    <linearGradient id="laneDeploy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f2faf6"/><stop offset="100%" stop-color="#e9f5ee"/>
    </linearGradient>
    <marker id="arrBlue" markerWidth="14" markerHeight="10" refX="12" refY="5" orient="auto">
      <polygon points="0 0, 14 5, 0 10" fill="#4d6f8f"/>
    </marker>
    <marker id="arrGreen" markerWidth="14" markerHeight="10" refX="12" refY="5" orient="auto">
      <polygon points="0 0, 14 5, 0 10" fill="#2f7a5c"/>
    </marker>
    <marker id="arrOrange" markerWidth="14" markerHeight="10" refX="12" refY="5" orient="auto">
      <polygon points="0 0, 14 5, 0 10" fill="#b07228"/>
    </marker>
    <marker id="arrRed" markerWidth="14" markerHeight="10" refX="12" refY="5" orient="auto">
      <polygon points="0 0, 14 5, 0 10" fill="#b13a2f"/>
    </marker>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#b7c4d3" flood-opacity="0.55"/>
    </filter>
  </defs>

  <rect x="70" y="170" width="2860" height="1080" rx="24" fill="#ffffff" stroke="#cad7e6" stroke-width="3"/>
  <rect x="120" y="230" width="780" height="940" rx="18" fill="url(#laneInput)" stroke="#ccdae9"/>
  <rect x="940" y="230" width="1120" height="940" rx="18" fill="url(#laneModel)" stroke="#cfdbe8"/>
  <rect x="2100" y="230" width="770" height="940" rx="18" fill="url(#laneDeploy)" stroke="#cfe2d7"/>

  <rect x="140" y="188" width="2720" height="42" rx="10" fill="#eef3f8" stroke="#d4deea"/>
  <text x="168" y="216" font-family="Times New Roman, Georgia, serif" font-size="23" font-weight="700" fill="#2a455f">Mission objective: maximize protection index and deterrence while satisfying ranger-hour, mobility, and surveillance feasibility constraints</text>

  <text x="150" y="278" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#173857">Layer A: Data Context and Structural Priors</text>
  <text x="970" y="278" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#173857">Layer B: Inference, Optimization, and Decision Synthesis</text>
  <text x="2130" y="278" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#175447">Layer C: Field Deployment and Adaptive Governance</text>

  <rect x="160" y="305" width="700" height="145" rx="14" fill="#e8f2fe" stroke="#6e90b2" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="190" y="348" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#1a4468">Ecology and Habitat Signals</text>
  <text x="190" y="382" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#355772">species density, habitat suitability, waterhole dependence</text>
  <text x="190" y="412" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#355772">map-tied zonal priors and seasonal ecological drift tags</text>

  <rect x="160" y="475" width="700" height="145" rx="14" fill="#edf6ea" stroke="#6e9b6b" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="190" y="518" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#2b5828">Threat Opportunity and Access Graph</text>
  <text x="190" y="552" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f653c">roads, gates, border pressure, terrain friction, hidden access</text>
  <text x="190" y="582" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f653c">poaching pressure proxy C_i,t with uncertainty confidence score</text>

  <rect x="160" y="645" width="700" height="145" rx="14" fill="#fff4e8" stroke="#c19359" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="190" y="688" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#6f4b1a">Resource Envelope and Logistics</text>
  <text x="190" y="722" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#845d30">ranger teams, shift limits, vehicles, sensors, drone sortie caps</text>
  <text x="190" y="752" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#845d30">station-centered travel-time matrix and response constraints</text>

  <rect x="160" y="815" width="700" height="260" rx="14" fill="#f8fafc" stroke="#9cb0c4" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="190" y="858" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#23445f">Data Fusion and Uncertainty Engine</text>
  <text x="190" y="892" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3b5a74">spatial harmonization on official map grid and patrol network graph</text>
  <text x="190" y="922" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3b5a74">state tensor D_t = [W_i,t, S_i,t, H_i,t, A_i,t, C_i,t, U_i,t]</text>
  <text x="190" y="952" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3b5a74">missing-data repair, anomaly filtering, and confidence tracking</text>
  <text x="190" y="982" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3b5a74">outputs standardized inputs for all model layers and transfer tasks</text>
  <text x="190" y="1012" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3b5a74">retains epistemic and aleatory uncertainty channels separately</text>

  <rect x="980" y="305" width="500" height="170" rx="14" fill="#e8f6ee" stroke="#5d996e" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="1012" y="350" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#235535">Model 1: Spatial Risk Inference</text>
  <text x="1012" y="384" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#356947">Risk_i,t = sigmoid(alpha*B_i,t + beta*T_i,t + gamma*A_i,t)</text>
  <text x="1012" y="414" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#356947">produces hotspot map H_t and confidence interval bands</text>
  <text x="1012" y="444" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#356947">enables selective saturation, not full-area coverage</text>

  <rect x="1520" y="305" width="500" height="170" rx="14" fill="#fff4e9" stroke="#c58c43" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="1552" y="350" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#7b4d10">Model 2: Robust MILP Allocation</text>
  <text x="1552" y="384" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#8b5d20">joint patrol loops, sensor siting, and UAV sector assignment</text>
  <text x="1552" y="414" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#8b5d20">max protection subject to travel, staffing, and revisit rules</text>
  <text x="1552" y="444" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#8b5d20">returns schedule set P_t and deployment bundle U_t</text>

  <rect x="980" y="510" width="500" height="205" rx="14" fill="#efeaff" stroke="#7f68c7" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="1012" y="556" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#3f3185">Model 3: Stochastic Digital Twin</text>
  <text x="1012" y="590" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#52439a">Poisson event generator + detection and interception logic</text>
  <text x="1012" y="620" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#52439a">q_i,t = 1 - prod_a (1 - q_a),   PI_t = 1 - Loss_t/Baseline_t</text>
  <text x="1012" y="650" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#52439a">1000-run Monte Carlo for robustness and schedule feasibility</text>
  <text x="1012" y="680" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#52439a">outputs reliability bands and failure mode traces</text>

  <rect x="1520" y="510" width="500" height="205" rx="14" fill="#eaf4ff" stroke="#5f8cb8" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="1552" y="556" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#21486f">Sensitivity and Scenario Studio</text>
  <text x="1552" y="590" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#365c83">stressors: ranger count, device density, detection quality</text>
  <text x="1552" y="620" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#365c83">maps degradation slope and minimum staffing floor N_star</text>
  <text x="1552" y="650" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#365c83">supports robust policy selection across uncertainty envelopes</text>
  <text x="1552" y="680" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#365c83">produces ranked leverage factors for management priorities</text>

  <rect x="980" y="740" width="1040" height="200" rx="14" fill="#f8fafd" stroke="#9caec2" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="1012" y="786" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#263f57">Cross-Park Transfer and Recalibration Kernel</text>
  <text x="1012" y="820" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f576f">portable: system architecture, MILP structure, simulation engine</text>
  <text x="1012" y="850" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f576f">recalibrated: ecological priors, mobility graph, seasonal coefficients</text>
  <text x="1012" y="880" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f576f">transfer path: Etosha baseline to Yellowstone and Kakadu scenarios</text>
  <text x="1012" y="910" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f576f">weekly re-optimization with monthly posterior parameter update</text>

  <rect x="980" y="965" width="1040" height="150" rx="14" fill="#ffffff" stroke="#c9d5e2" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="1012" y="1007" font-family="Times New Roman, Georgia, serif" font-size="29" font-weight="700" fill="#243f57">Scientific objective and deployable artifacts</text>
  <text x="1012" y="1036" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3a556f">max Z = sum_i,t Risk_i,t * Cover_i,t - lambda1*Travel - lambda2*Fatigue</text>
  <text x="1012" y="1064" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3a556f">outputs: hotspot map H_t, patrol schedule P_t, surveillance plan U_t, staffing floor N_star</text>
  <text x="1012" y="1092" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3a556f">quality checks: PI trajectory, risk-weighted detection gain, and response-time compliance</text>

  <rect x="2140" y="305" width="690" height="180" rx="14" fill="#e9f6f1" stroke="#4a9b89" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="2172" y="350" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#175f52">Decision Package and Command Interface</text>
  <text x="2172" y="384" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#2b7065">risk-priority map, route portfolio, device layout, staffing rule</text>
  <text x="2172" y="414" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#2b7065">operational KPI panel with hard-feasibility validation</text>
  <text x="2172" y="444" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#2b7065">decision approved for field issue and duty briefing</text>

  <rect x="2140" y="525" width="690" height="200" rx="14" fill="#eef9f5" stroke="#72a68f" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="2172" y="570" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#2f6759">Field Deployment Orchestration</text>
  <text x="2172" y="604" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f7769">staggered patrol waves, fixed sensors, and dynamic UAV sorties</text>
  <text x="2172" y="634" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f7769">station-level dispatch protocol and hotspot revisit guarantees</text>
  <text x="2172" y="664" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f7769">incident escalation ladder linked to response-time thresholds</text>
  <text x="2172" y="694" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#3f7769">task sheets exported to teams and shift supervisors</text>

  <rect x="2140" y="760" width="690" height="210" rx="14" fill="#fff3ec" stroke="#c58d6f" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="2172" y="806" font-family="Times New Roman, Georgia, serif" font-size="32" font-weight="700" fill="#804528">Monitoring, Audit, and Model Updating</text>
  <text x="2172" y="840" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#8f5a3d">patrol logs, interception traces, and equipment uptime ingestion</text>
  <text x="2172" y="870" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#8f5a3d">posterior update for threat prior C_i,t and detection parameters</text>
  <text x="2172" y="900" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#8f5a3d">auto-retrain trigger if PI_t drops below reliability threshold</text>
  <text x="2172" y="930" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#8f5a3d">auditable evidence for regulator and stakeholder review</text>

  <rect x="2140" y="995" width="690" height="120" rx="14" fill="#f8fbf9" stroke="#a9c3b4" stroke-width="2.5" filter="url(#softShadow)"/>
  <text x="2172" y="1038" font-family="Times New Roman, Georgia, serif" font-size="29" font-weight="700" fill="#37685a">Temporal Governance Ladder</text>
  <text x="2172" y="1072" font-family="Times New Roman, Georgia, serif" font-size="22" fill="#4a7a6c">daily dispatch -> weekly re-optimization -> monthly recalibration</text>

  <rect x="960" y="286" width="1060" height="442" rx="16" fill="none" stroke="#8f7fb8" stroke-width="2.4" stroke-dasharray="10 7"/>
  <text x="990" y="308" font-family="Times New Roman, Georgia, serif" font-size="22" font-weight="700" fill="#5e4e86">Uncertainty envelope: epistemic + aleatory pathways</text>

  <line x1="860" y1="378" x2="980" y2="378" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>
  <line x1="860" y1="548" x2="980" y2="548" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>
  <line x1="860" y1="718" x2="980" y2="718" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>
  <line x1="860" y1="940" x2="980" y2="940" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>

  <line x1="1480" y1="388" x2="1520" y2="388" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>
  <line x1="1770" y1="475" x2="1770" y2="510" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>
  <line x1="1520" y1="620" x2="1480" y2="620" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>
  <line x1="1770" y1="715" x2="1770" y2="740" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>
  <line x1="1770" y1="940" x2="1770" y2="965" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>

  <line x1="2020" y1="390" x2="2140" y2="390" stroke="#b07228" stroke-width="4.4" marker-end="url(#arrOrange)"/>
  <line x1="2020" y1="620" x2="2140" y2="620" stroke="#b07228" stroke-width="4.4" marker-end="url(#arrOrange)"/>
  <line x1="2020" y1="840" x2="2140" y2="840" stroke="#b07228" stroke-width="4.4" marker-end="url(#arrOrange)"/>
  <line x1="2020" y1="1040" x2="2140" y2="1040" stroke="#b07228" stroke-width="4.4" marker-end="url(#arrOrange)"/>

  <line x1="2485" y1="485" x2="2485" y2="525" stroke="#2f7a5c" stroke-width="4.4" marker-end="url(#arrGreen)"/>
  <line x1="2485" y1="725" x2="2485" y2="760" stroke="#2f7a5c" stroke-width="4.4" marker-end="url(#arrGreen)"/>
  <line x1="2485" y1="970" x2="2485" y2="995" stroke="#2f7a5c" stroke-width="4.4" marker-end="url(#arrGreen)"/>

  <path d="M2830 1060 C2920 1120 2820 1185 2580 1185 L 560 1185 C300 1185 180 1120 188 980" fill="none" stroke="#b13a2f" stroke-width="5" stroke-dasharray="14 8" marker-end="url(#arrRed)"/>
  <text x="980" y="1218" font-family="Times New Roman, Georgia, serif" font-size="26" font-weight="700" fill="#9f3225">Adaptive loop: field telemetry -> posterior update -> model refresh -> redeployment</text>

  <rect x="2110" y="30" width="800" height="96" rx="10" fill="#ffffff" fill-opacity="0.96" stroke="#d5dfeb"/>
  <text x="2138" y="58" font-family="Times New Roman, Georgia, serif" font-size="21" font-weight="700" fill="#223b52">Flow legend</text>
  <line x1="2140" y1="80" x2="2205" y2="80" stroke="#4d6f8f" stroke-width="4.2" marker-end="url(#arrBlue)"/>
  <text x="2220" y="86" font-family="Times New Roman, Georgia, serif" font-size="20" fill="#3e5870">information flow</text>
  <line x1="2400" y1="80" x2="2465" y2="80" stroke="#b07228" stroke-width="4.2" marker-end="url(#arrOrange)"/>
  <text x="2480" y="86" font-family="Times New Roman, Georgia, serif" font-size="20" fill="#3e5870">decision transfer</text>
  <line x1="2640" y1="80" x2="2705" y2="80" stroke="#b13a2f" stroke-width="4.2" stroke-dasharray="9 6" marker-end="url(#arrRed)"/>
  <text x="2720" y="86" font-family="Times New Roman, Georgia, serif" font-size="20" fill="#3e5870">adaptive feedback</text>`,
  false, "High-detail system architecture from map-based analytics to executable field governance");

write("fig01_system_architecture.png", `
  <defs>
    <linearGradient id="flowBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f7fafc"/><stop offset="100%" stop-color="#eef3f8"/>
    </linearGradient>
    <marker id="arrMain" markerWidth="16" markerHeight="12" refX="13" refY="6" orient="auto">
      <polygon points="0 0, 16 6, 0 12" fill="#3f6284"/>
    </marker>
    <marker id="arrAux" markerWidth="16" markerHeight="12" refX="13" refY="6" orient="auto">
      <polygon points="0 0, 16 6, 0 12" fill="#a96f22"/>
    </marker>
    <marker id="arrLoop" markerWidth="16" markerHeight="12" refX="13" refY="6" orient="auto">
      <polygon points="0 0, 16 6, 0 12" fill="#b13a2f"/>
    </marker>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#b6c3d2" flood-opacity="0.52"/>
    </filter>
  </defs>
  <rect x="70" y="210" width="2260" height="2760" rx="24" fill="url(#flowBg)" stroke="#c9d6e5" stroke-width="3"/>
  <text x="130" y="300" font-family="Times New Roman, Georgia, serif" font-size="56" font-weight="700" fill="#1f3f5c">Decision Pipeline (Clear-Flow Version)</text>
  <text x="130" y="350" font-family="Times New Roman, Georgia, serif" font-size="38" fill="#3a5a75">maximize risk-weighted protection under manpower and surveillance constraints</text>

  <rect x="170" y="390" width="1380" height="220" rx="16" fill="#eaf3fc" stroke="#7d9dbf" stroke-width="2.4" filter="url(#softShadow)"/>
  <text x="215" y="460" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="#244a6c">1. Map and Data Integration</text>
  <text x="215" y="510" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#3b5c78">ecology + waterholes + roads + stations + incidents</text>
  <text x="215" y="556" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#3b5c78">Output: zonal state tensor \\(\\mathcal{D}_t\\)</text>

  <rect x="170" y="730" width="1380" height="220" rx="16" fill="#e8f5ee" stroke="#6a9a7f" stroke-width="2.4" filter="url(#softShadow)"/>
  <text x="215" y="800" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="#2a5a43">2. Model I: Spatial Risk Inference</text>
  <text x="215" y="850" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#3f6a53">risk and confidence from ecological and threat priors</text>
  <text x="215" y="896" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#3f6a53">Output: hotspot map \\(R_i^t\\)</text>

  <rect x="170" y="1070" width="1380" height="220" rx="16" fill="#fff4e8" stroke="#c39255" stroke-width="2.4" filter="url(#softShadow)"/>
  <text x="215" y="1140" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="#754b1d">3. Model II: Resource Allocation</text>
  <text x="215" y="1190" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#8a5f2f">optimize patrols, sensors, and UAV sectors</text>
  <text x="215" y="1236" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#8a5f2f">Output: plan \\(u_t^\\star\\)</text>

  <rect x="170" y="1410" width="1380" height="220" rx="16" fill="#efeaff" stroke="#7e69bf" stroke-width="2.4" filter="url(#softShadow)"/>
  <text x="215" y="1480" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="#413184">4. Model III: Dynamic Simulation</text>
  <text x="215" y="1530" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#58479b">simulate detection, interception, and uncertainty</text>
  <text x="215" y="1576" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#58479b">Output: protection trajectory \\(\\PI_t\\)</text>

  <rect x="170" y="1750" width="1380" height="220" rx="16" fill="#eaf6f2" stroke="#5f9b88" stroke-width="2.4" filter="url(#softShadow)"/>
  <text x="215" y="1820" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="#1f6253">5. Command Decision Package</text>
  <text x="215" y="1870" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#357364">prioritized map + shifts + patrol schedule</text>
  <text x="215" y="1916" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#357364">Deliverable: daily and weekly field orders</text>

  <rect x="170" y="2090" width="1380" height="220" rx="16" fill="#fff6ed" stroke="#c59c67" stroke-width="2.4" filter="url(#softShadow)"/>
  <text x="215" y="2160" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="#7c5522">6. Field Execution and Monitoring</text>
  <text x="215" y="2210" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#8f6734">patrol execution, sensor/UAV watch, dispatch</text>
  <text x="215" y="2256" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#8f6734">zone-time operational logs</text>

  <rect x="170" y="2430" width="1380" height="220" rx="16" fill="#f8fafc" stroke="#9fb2c5" stroke-width="2.4" filter="url(#softShadow)"/>
  <text x="215" y="2500" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="#2a4d69">7. Adaptive Feedback Update</text>
  <text x="215" y="2550" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#40637e">update priors from telemetry and incidents</text>
  <text x="215" y="2596" font-family="Times New Roman, Georgia, serif" font-size="39" fill="#40637e">weekly optimization + monthly recalibration</text>

  <rect x="1610" y="1085" width="660" height="190" rx="14" fill="#ffffff" stroke="#d2dce7"/>
  <text x="1650" y="1150" font-family="Times New Roman, Georgia, serif" font-size="44" font-weight="700" fill="#2f4e6b">Feasibility Gate</text>
  <text x="1650" y="1195" font-family="Times New Roman, Georgia, serif" font-size="35" fill="#48657f">staff-hours, travel-time,</text>
  <text x="1650" y="1236" font-family="Times New Roman, Georgia, serif" font-size="35" fill="#48657f">device limits</text>

  <rect x="1610" y="1765" width="660" height="190" rx="14" fill="#ffffff" stroke="#d2dce7"/>
  <text x="1650" y="1830" font-family="Times New Roman, Georgia, serif" font-size="44" font-weight="700" fill="#2f4e6b">KPI Evaluation</text>
  <text x="1650" y="1875" font-family="Times New Roman, Georgia, serif" font-size="35" fill="#48657f">PI, detection rate,</text>
  <text x="1650" y="1916" font-family="Times New Roman, Georgia, serif" font-size="35" fill="#48657f">response delay</text>

  <rect x="1610" y="2445" width="660" height="190" rx="14" fill="#ffffff" stroke="#d2dce7"/>
  <text x="1650" y="2510" font-family="Times New Roman, Georgia, serif" font-size="44" font-weight="700" fill="#2f4e6b">Transferability</text>
  <text x="1650" y="2555" font-family="Times New Roman, Georgia, serif" font-size="35" fill="#48657f">same architecture,</text>
  <text x="1650" y="2596" font-family="Times New Roman, Georgia, serif" font-size="35" fill="#48657f">recalibrated local data</text>

  <line x1="860" y1="610" x2="860" y2="730" stroke="#3f6284" stroke-width="5" marker-end="url(#arrMain)"/>
  <line x1="860" y1="950" x2="860" y2="1070" stroke="#3f6284" stroke-width="5" marker-end="url(#arrMain)"/>
  <line x1="860" y1="1290" x2="860" y2="1410" stroke="#3f6284" stroke-width="5" marker-end="url(#arrMain)"/>
  <line x1="860" y1="1630" x2="860" y2="1750" stroke="#3f6284" stroke-width="5" marker-end="url(#arrMain)"/>
  <line x1="860" y1="1970" x2="860" y2="2090" stroke="#3f6284" stroke-width="5" marker-end="url(#arrMain)"/>
  <line x1="860" y1="2310" x2="860" y2="2430" stroke="#3f6284" stroke-width="5" marker-end="url(#arrMain)"/>

  <line x1="1550" y1="1140" x2="1610" y2="1140" stroke="#a96f22" stroke-width="4.5" marker-end="url(#arrAux)"/>
  <line x1="1550" y1="1800" x2="1610" y2="1800" stroke="#a96f22" stroke-width="4.5" marker-end="url(#arrAux)"/>
  <line x1="1550" y1="2450" x2="1610" y2="2450" stroke="#a96f22" stroke-width="4.5" marker-end="url(#arrAux)"/>

  <path d="M170 2550 C75 2550 75 2400 75 1560 C75 920 75 790 170 790" fill="none" stroke="#b13a2f" stroke-width="4.5" stroke-dasharray="12 7" marker-end="url(#arrLoop)"/>
  <text x="86" y="1700" transform="rotate(-90 86 1700)" font-family="Times New Roman, Georgia, serif" font-size="35" font-weight="700" fill="#a4342a">feedback to Model I</text>
`,
  false,
  "Simple vertical flow linking analytics to deployable anti-poaching decisions",
  { w: 2400, h: 3200 });

write("fig02_etosha_grid.png", `${gridRiskCells("hot")}${waterLayer(0.92)}${campLayer()}${gateLayer()}
  <ellipse cx="1860" cy="430" rx="500" ry="240" fill="#e8f4d2" fill-opacity="0.30" stroke="#d3e6a9" stroke-width="4"/>
  <text x="1650" y="430" font-family="Times New Roman, Georgia, serif" font-size="44" font-weight="700" fill="#e9f2d0">Etosha Pan</text>`,
  true, "Official map reprocessed into analytical zoning units");
write("fig03_risk_heatmap.png", `${gridRiskCells("risk")}${campLayer()}${waterLayer(0.82)}
  <rect x="2520" y="970" width="400" height="220" rx="16" fill="#fff" fill-opacity="0.9" stroke="#d5dfeb"/>
  <text x="2560" y="1022" font-family="Times New Roman, Georgia, serif" font-size="31" font-weight="700" fill="#182b3f">Risk score</text>
  <rect x="2560" y="1050" width="38" height="120" fill="url(#legendGrad)" stroke="#ccd6e2"/>`,
  true, "Composite map-based risk surface");
write("fig04_risk_decomposition.png", `
  <rect x="${extent.x}" y="${extent.y}" width="${extent.w}" height="${extent.h}" fill="#fff" fill-opacity="0.04" stroke="#fff" stroke-width="3"/>
  ${waterLayer(0.84)}${campLayer()}
  <circle cx="2430" cy="740" r="140" fill="#ff6f61" fill-opacity="0.24" stroke="#ffc5bf" stroke-width="4"/>
  <circle cx="2280" cy="790" r="120" fill="#ff6f61" fill-opacity="0.24" stroke="#ffc5bf" stroke-width="4"/>
  <circle cx="2080" cy="800" r="110" fill="#ff6f61" fill-opacity="0.24" stroke="#ffc5bf" stroke-width="4"/>
  <text x="2160" y="610" font-family="Times New Roman, Georgia, serif" font-size="36" font-weight="700" fill="#ffe4df">Top hotspot cluster</text>`,
  true, "Spatial hotspot decomposition on real map");
write("fig05_patrol_routes.png", `
  <rect x="${extent.x}" y="${extent.y}" width="${extent.w}" height="${extent.h}" fill="#fff" fill-opacity="0.04" stroke="#fff" stroke-width="3"/>
  ${waterLayer(0.78)}${campLayer()}${gateLayer()}
  <path d="M146,730 C420,700 780,700 1200,700 C1450,700 1700,730 2000,770 C2240,800 2460,760 2620,560" fill="none" stroke="#ffd54f" stroke-width="14" stroke-linecap="round"/>
  <path d="M1608,905 C1810,820 1960,760 2140,805" fill="none" stroke="#1e88e5" stroke-width="11" stroke-linecap="round"/>
  <path d="M2140,805 C2310,760 2480,720 2620,560" fill="none" stroke="#e53935" stroke-width="11" stroke-linecap="round"/>
  <path d="M1608,905 C1460,870 1300,830 1160,790 C980,740 760,730 480,680" fill="none" stroke="#43a047" stroke-width="11" stroke-linecap="round"/>`,
  true, "Optimized patrol loops and corridor reinforcement");
write("fig06_allocation_dashboard.png", `
  <rect x="${extent.x}" y="${extent.y}" width="${extent.w}" height="${extent.h}" fill="#fff" fill-opacity="0.04" stroke="#fff" stroke-width="3"/>
  ${campLayer()}${waterLayer(0.75)}
  <circle cx="2280" cy="760" r="120" fill="#c62828" fill-opacity="0.24" stroke="#ffcdd2" stroke-width="3"/>
  <circle cx="2060" cy="800" r="98" fill="#ef6c00" fill-opacity="0.22" stroke="#ffe0b2" stroke-width="3"/>
  <circle cx="2440" cy="690" r="95" fill="#ef6c00" fill-opacity="0.22" stroke="#ffe0b2" stroke-width="3"/>`,
  true, "Map-linked resource allocation by priority tier");
write("fig07_schedule_timeline.png", `
  <rect x="120" y="180" width="2760" height="1020" rx="20" fill="#fff" stroke="#d8e0ea" stroke-width="3"/>
  <text x="220" y="250" font-family="Times New Roman, Georgia, serif" font-size="40" font-weight="700" fill="#172b40">Operational cycle (24h)</text>
  <line x1="500" y1="310" x2="2650" y2="310" stroke="#607d94" stroke-width="2.5"/>
  <text x="500" y="290" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#2b435a">06</text>
  <text x="760" y="290" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#2b435a">08</text>
  <text x="1020" y="290" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#2b435a">10</text>
  <text x="1280" y="290" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#2b435a">12</text>
  <text x="1540" y="290" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#2b435a">14</text>
  <text x="1800" y="290" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#2b435a">16</text>
  <text x="2060" y="290" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#2b435a">18</text>
  <text x="2320" y="290" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#2b435a">20</text>
  <text x="2580" y="290" font-family="Times New Roman, Georgia, serif" font-size="25" fill="#2b435a">22</text>
  <text x="220" y="390" font-family="Times New Roman, Georgia, serif" font-size="30" font-weight="700" fill="#1f354a">West patrol</text>
  <text x="220" y="500" font-family="Times New Roman, Georgia, serif" font-size="30" font-weight="700" fill="#1f354a">Central patrol</text>
  <text x="220" y="610" font-family="Times New Roman, Georgia, serif" font-size="30" font-weight="700" fill="#1f354a">East patrol</text>
  <text x="220" y="720" font-family="Times New Roman, Georgia, serif" font-size="30" font-weight="700" fill="#1f354a">Sensor watch</text>
  <rect x="580" y="355" width="760" height="46" rx="10" fill="#43a047"/><rect x="1460" y="355" width="380" height="46" rx="10" fill="#43a047"/>
  <rect x="740" y="465" width="700" height="46" rx="10" fill="#1e88e5"/><rect x="1620" y="465" width="420" height="46" rx="10" fill="#1e88e5"/>
  <rect x="920" y="575" width="650" height="46" rx="10" fill="#e53935"/><rect x="1740" y="575" width="330" height="46" rx="10" fill="#e53935"/>
  <rect x="400" y="685" width="2280" height="46" rx="10" fill="#3949ab"/>
  <text x="420" y="780" font-family="Times New Roman, Georgia, serif" font-size="28" fill="#304c67">Staggered departure removes blind windows and stabilizes interception probability.</text>`,
  false, "Staggered patrol, sensor, UAV, and response schedule");
const simDays = Array.from({ length: 30 }, (_, i) => i + 1);
const simSeries = [
  { name: "Optimized system", color: palette.green, band: 0.015, values: [0.71,0.72,0.73,0.72,0.73,0.74,0.75,0.74,0.75,0.76,0.75,0.74,0.73,0.72,0.71,0.72,0.73,0.74,0.75,0.76,0.75,0.76,0.77,0.77,0.78,0.78,0.79,0.79,0.80,0.80] },
  { name: "Uniform patrol", color: palette.orange, band: 0.018, values: [0.57,0.58,0.59,0.58,0.58,0.59,0.60,0.60,0.61,0.61,0.60,0.59,0.58,0.57,0.56,0.57,0.58,0.59,0.60,0.60,0.61,0.61,0.62,0.62,0.63,0.63,0.64,0.64,0.65,0.65] },
  { name: "Ranger -20%", color: palette.red, band: 0.020, values: [0.52,0.53,0.54,0.53,0.53,0.54,0.55,0.55,0.55,0.56,0.55,0.54,0.53,0.51,0.50,0.51,0.52,0.53,0.54,0.54,0.55,0.55,0.56,0.56,0.56,0.57,0.57,0.58,0.58,0.58] },
];
const simX0 = 220;
const simY0 = 1048;
const simW = 1700;
const simH = 748;
const simPx = (d) => simX0 + ((d - 1) / (simDays.length - 1)) * simW;
const simPy = (v) => simY0 - ((v - 0.45) / 0.40) * simH;
let simGrid = "";
for (let v = 0.45; v <= 0.85 + 1e-9; v += 0.05) {
  const vv = Number(v.toFixed(2));
  const yy = simPy(vv);
  simGrid += `<line x1="${simX0}" y1="${yy}" x2="${simX0 + simW}" y2="${yy}" stroke="#e5ecf4" stroke-width="2"/>
    <text x="${simX0 - 58}" y="${yy + 9}" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">${vv.toFixed(2)}</text>`;
}
for (const day of [1, 5, 10, 15, 20, 25, 30]) {
  const xx = simPx(day);
  simGrid += `<line x1="${xx}" y1="${simY0}" x2="${xx}" y2="${simY0 - simH}" stroke="#edf2f7" stroke-width="2"/>
    <text x="${xx}" y="${simY0 + 42}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">${day}</text>`;
}
let simLayers = "";
let simEndLabels = "";
simSeries.forEach((series, index) => {
  const upper = series.values.map((v) => Math.min(0.85, v + series.band));
  const lower = series.values.map((v) => Math.max(0.45, v - series.band));
  const last = series.values[series.values.length - 1];
  simLayers += `<path d="${bandPath(simDays, upper, lower, simPx, simPy)}" fill="${series.color}" fill-opacity="0.12"/>
    <path d="${linePath(simDays, series.values, simPx, simPy)}" fill="none" stroke="${series.color}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="${simPx(30)}" cy="${simPy(last)}" r="8" fill="${series.color}" stroke="#ffffff" stroke-width="3"/>`;
  simEndLabels += `<text x="${simPx(30) + 18}" y="${simPy(last) - 10 + index * 4}" font-family="Times New Roman, Georgia, serif" font-size="24" font-weight="700" fill="${series.color}">${last.toFixed(2)}</text>`;
});
write("fig08_simulation_results.png", `
  <rect x="90" y="180" width="2820" height="1020" rx="22" fill="#ffffff" stroke="#d8e0ea" stroke-width="3"/>
  <rect x="150" y="250" width="1850" height="860" rx="18" fill="#fbfdff" stroke="#e2eaf2" stroke-width="2"/>
  ${pill(170, 206, "Operational target PI >= 0.75", { fill: palette.blue, width: 320 })}
  ${simGrid}
  <line x1="${simX0}" y1="${simY0}" x2="${simX0 + simW}" y2="${simY0}" stroke="#62768a" stroke-width="3"/>
  <line x1="${simX0}" y1="${simY0 - simH}" x2="${simX0}" y2="${simY0}" stroke="#62768a" stroke-width="3"/>
  <line x1="${simX0}" y1="${simPy(0.75)}" x2="${simX0 + simW}" y2="${simPy(0.75)}" stroke="${palette.blue}" stroke-width="3.5" stroke-dasharray="14 10"/>
  <text x="${simX0 + 24}" y="${simPy(0.75) - 14}" font-family="Times New Roman, Georgia, serif" font-size="24" font-weight="700" fill="${palette.blue}">Command target</text>
  ${simLayers}
  ${simEndLabels}
  ${legendBlock(2060, 250, "Deployment Arms", [
    { type: "line", color: palette.green, label: "Optimized GIS-guided package", marker: true },
    { type: "line", color: palette.orange, label: "Uniform patrol baseline", marker: true },
    { type: "line", color: palette.red, label: "Staffing shock: ranger -20%", marker: true },
    { type: "line", color: palette.blue, label: "Mission target PI = 0.75", dash: "14 10" },
  ], { width: 720, rowH: 40 })}
  ${panel(2060, 548, 720, 244, "Decision Reading", [
    "Optimized deployment crosses the command target by day 7.",
    "It then maintains a stable upward drift through day 30.",
    "Uniform patrol improves gradually but never reaches the mission threshold.",
    "A 20% staffing shock compresses protection quickly.",
    "That pattern shows why reserve capacity matters operationally."
  ], { bodySize: 21, lineGap: 28 })}
  <rect x="2060" y="810" width="220" height="152" rx="16" fill="#eef8f1" stroke="#cfe6d7" stroke-width="1.8"/>
  <text x="2088" y="853" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">Day 30 PI</text>
  <text x="2088" y="908" font-family="Times New Roman, Georgia, serif" font-size="54" font-weight="700" fill="${palette.green}">0.80</text>
  <text x="2088" y="938" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">optimized package</text>
  <rect x="2310" y="810" width="220" height="152" rx="16" fill="#fff4ea" stroke="#f0d7bb" stroke-width="1.8"/>
  <text x="2338" y="853" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">Day 30 PI</text>
  <text x="2338" y="908" font-family="Times New Roman, Georgia, serif" font-size="54" font-weight="700" fill="${palette.orange}">0.65</text>
  <text x="2338" y="938" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">uniform baseline</text>
  <rect x="2560" y="810" width="220" height="152" rx="16" fill="#fff0ee" stroke="#f0d3ce" stroke-width="1.8"/>
  <text x="2588" y="853" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">Day 30 PI</text>
  <text x="2588" y="908" font-family="Times New Roman, Georgia, serif" font-size="54" font-weight="700" fill="${palette.red}">0.58</text>
  <text x="2588" y="938" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">staffing shock</text>
  <text x="980" y="1140" font-family="Times New Roman, Georgia, serif" font-size="31" fill="${palette.ink}">Simulation day</text>
  <text x="94" y="514" transform="rotate(-90 94 514)" font-family="Times New Roman, Georgia, serif" font-size="29" fill="${palette.ink}">Protection index</text>`,
  false, "30-day protection trajectory with uncertainty envelopes and command threshold");

const densityXMin = 0.45;
const densityXMax = 0.85;
const densityYMax = 5.2;
const densityX0 = 250;
const densityY0 = 1048;
const densityW = 1680;
const densityH = 720;
const densityXs = Array.from({ length: 81 }, (_, i) => densityXMin + i * (densityXMax - densityXMin) / 80);
const densityPx = (x) => densityX0 + ((x - densityXMin) / (densityXMax - densityXMin)) * densityW;
const densityPy = (y) => densityY0 - (y / densityYMax) * densityH;
const densityOptimized = densityXs.map((x) => gaussian(x, 0.745, 0.038, 4.4) + gaussian(x, 0.685, 0.030, 1.1));
const densityUniform = densityXs.map((x) => gaussian(x, 0.665, 0.044, 3.1) + gaussian(x, 0.725, 0.050, 1.0));
const densityReduced = densityXs.map((x) => gaussian(x, 0.605, 0.043, 2.8) + gaussian(x, 0.665, 0.046, 0.9));
const densityPath = (yVals) => linePath(densityXs, yVals, densityPx, densityPy);
const densityArea = (yVals) => `M ${densityPx(densityXs[0])} ${densityY0} ${yVals.map((v, i) => `L ${densityPx(densityXs[i])} ${densityPy(v)}`).join(" ")} L ${densityPx(densityXs[densityXs.length - 1])} ${densityY0} Z`;

let densityGrid = "";
for (let v = 0; v <= densityYMax + 1e-9; v += 1) {
  const yy = densityPy(v);
  densityGrid += `<line x1="${densityX0}" y1="${yy}" x2="${densityX0 + densityW}" y2="${yy}" stroke="#e5ecf4" stroke-width="2"/>
    <text x="${densityX0 - 48}" y="${yy + 8}" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">${v.toFixed(0)}</text>`;
}
for (let v = densityXMin; v <= densityXMax + 1e-9; v += 0.05) {
  const vv = Number(v.toFixed(2));
  const xx = densityPx(vv);
  densityGrid += `<line x1="${xx}" y1="${densityY0}" x2="${xx}" y2="${densityY0 - densityH}" stroke="#edf2f7" stroke-width="2"/>
    <text x="${xx}" y="${densityY0 + 42}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">${vv.toFixed(2)}</text>`;
}

write("fig09_robustness_distribution.png", `
  <rect x="90" y="180" width="2820" height="1020" rx="22" fill="#ffffff" stroke="#d8e0ea" stroke-width="3"/>
  <rect x="150" y="250" width="1840" height="850" rx="18" fill="#fbfdff" stroke="#e2eaf2" stroke-width="2"/>
  ${pill(170, 206, "1,000 Monte Carlo stress runs", { fill: palette.purple, width: 300 })}
  ${densityGrid}
  <line x1="${densityX0}" y1="${densityY0}" x2="${densityX0 + densityW}" y2="${densityY0}" stroke="#62768a" stroke-width="3"/>
  <line x1="${densityX0}" y1="${densityY0 - densityH}" x2="${densityX0}" y2="${densityY0}" stroke="#62768a" stroke-width="3"/>
  <line x1="${densityPx(0.70)}" y1="${densityY0 - densityH}" x2="${densityPx(0.70)}" y2="${densityY0}" stroke="${palette.blue}" stroke-width="3.5" stroke-dasharray="14 10"/>
  <text x="${densityPx(0.70) + 16}" y="350" font-family="Times New Roman, Georgia, serif" font-size="24" font-weight="700" fill="${palette.blue}">Robustness threshold</text>
  <path d="${densityArea(densityOptimized)}" fill="${palette.green}" fill-opacity="0.16"/>
  <path d="${densityArea(densityUniform)}" fill="${palette.orange}" fill-opacity="0.14"/>
  <path d="${densityArea(densityReduced)}" fill="${palette.red}" fill-opacity="0.11"/>
  <path d="${densityPath(densityOptimized)}" fill="none" stroke="${palette.green}" stroke-width="8"/>
  <path d="${densityPath(densityUniform)}" fill="none" stroke="${palette.orange}" stroke-width="8"/>
  <path d="${densityPath(densityReduced)}" fill="none" stroke="${palette.red}" stroke-width="8"/>
  <line x1="${densityPx(0.74)}" y1="332" x2="${densityPx(0.74)}" y2="${densityY0}" stroke="${palette.green}" stroke-width="3" stroke-dasharray="10 8"/>
  <line x1="${densityPx(0.66)}" y1="332" x2="${densityPx(0.66)}" y2="${densityY0}" stroke="${palette.orange}" stroke-width="3" stroke-dasharray="10 8"/>
  <line x1="${densityPx(0.60)}" y1="332" x2="${densityPx(0.60)}" y2="${densityY0}" stroke="${palette.red}" stroke-width="3" stroke-dasharray="10 8"/>
  ${legendBlock(2060, 250, "Scenario Distributions", [
    { type: "line", color: palette.green, label: "Optimized GIS package", marker: true },
    { type: "line", color: palette.orange, label: "Uniform patrol baseline", marker: true },
    { type: "line", color: palette.red, label: "Ranger -20% contingency", marker: true },
    { type: "line", color: palette.blue, label: "Robustness threshold PI = 0.70", dash: "14 10" },
  ], { width: 720, rowH: 40 })}
  ${panel(2060, 560, 720, 208, "Statistical Reading", [
    "The optimized package shifts the entire distribution rightward and compresses the left tail.",
    "Uniform patrol remains centered below the desired resilience band even with moderate variance.",
    "Staffing loss creates a broad low-performance tail, indicating materially higher mission fragility."
  ], { bodySize: 22, lineGap: 31 })}
  <rect x="2060" y="814" width="220" height="148" rx="16" fill="#eef8f1" stroke="#cfe6d7" stroke-width="1.8"/>
  <text x="2086" y="852" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">Mean PI</text>
  <text x="2086" y="909" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="${palette.green}">0.74</text>
  <text x="2086" y="938" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">optimized</text>
  <rect x="2310" y="814" width="220" height="148" rx="16" fill="#fff4ea" stroke="#f0d7bb" stroke-width="1.8"/>
  <text x="2336" y="852" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">Mean PI</text>
  <text x="2336" y="909" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="${palette.orange}">0.66</text>
  <text x="2336" y="938" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">uniform</text>
  <rect x="2560" y="814" width="220" height="148" rx="16" fill="#fff0ee" stroke="#f0d3ce" stroke-width="1.8"/>
  <text x="2586" y="852" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">Mean PI</text>
  <text x="2586" y="909" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="${palette.red}">0.60</text>
  <text x="2586" y="938" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">staff shock</text>
  <text x="940" y="1140" font-family="Times New Roman, Georgia, serif" font-size="31" fill="${palette.ink}">Protection index</text>
  <text x="94" y="494" transform="rotate(-90 94 494)" font-family="Times New Roman, Georgia, serif" font-size="29" fill="${palette.ink}">Density</text>`,
  false, "Probability-density view of solution robustness under repeated stochastic shocks");

const tornadoRows = [
  { name: "Ranger count", low: -0.16, high: 0.10, y: 438, left: palette.red, right: palette.green },
  { name: "Base detection", low: -0.13, high: 0.08, y: 562, left: palette.coral, right: palette.teal },
  { name: "Patrol interval", low: -0.10, high: 0.05, y: 686, left: palette.orange, right: "#4fa774" },
  { name: "Device count", low: -0.07, high: 0.04, y: 810, left: "#d7a83b", right: "#77b86a" },
];
const tornadoCenter = 1120;
const tornadoScale = 3500;
const tornadoW = (v) => Math.abs(v) * tornadoScale;
let tornadoBars = "";
let tornadoAxis = "";
for (const tick of [-0.20, -0.15, -0.10, -0.05, 0.00, 0.05, 0.10]) {
  const xx = tornadoCenter + tick * tornadoScale;
  tornadoAxis += `<line x1="${xx}" y1="362" x2="${xx}" y2="928" stroke="#e6edf5" stroke-width="2"/>
    <text x="${xx}" y="980" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">${tick.toFixed(2)}</text>`;
}
for (const row of tornadoRows) {
  tornadoBars += `<rect x="240" y="${row.y - 18}" width="1320" height="70" rx="14" fill="#f7fafc" stroke="#edf2f7" stroke-width="1.2"/>
    <rect x="${tornadoCenter - tornadoW(row.low)}" y="${row.y}" width="${tornadoW(row.low)}" height="34" rx="8" fill="${row.left}" fill-opacity="0.88"/>
    <rect x="${tornadoCenter}" y="${row.y}" width="${tornadoW(row.high)}" height="34" rx="8" fill="${row.right}" fill-opacity="0.90"/>
    <text x="280" y="${row.y + 22}" font-family="Times New Roman, Georgia, serif" font-size="29" font-weight="700" fill="${palette.ink}">${row.name}</text>
    <text x="${tornadoCenter - tornadoW(row.low) - 70}" y="${row.y + 22}" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${row.left}">${row.low.toFixed(2)}</text>
    <text x="${tornadoCenter + tornadoW(row.high) + 16}" y="${row.y + 22}" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${row.right}">+${row.high.toFixed(2)}</text>`;
}
write("fig10_sensitivity_panels.png", `
  <rect x="90" y="180" width="2820" height="1020" rx="22" fill="#ffffff" stroke="#d8e0ea" stroke-width="3"/>
  <rect x="180" y="250" width="1460" height="820" rx="18" fill="#fbfdff" stroke="#e2eaf2" stroke-width="2"/>
  ${pill(210, 206, "Sensitivity = dPI under parameter stress", { fill: palette.coral, width: 450, fontSize: 20 })}
  <rect x="240" y="336" width="880" height="24" rx="12" fill="#fff0ee"/>
  <rect x="${tornadoCenter}" y="336" width="440" height="24" rx="12" fill="#edf8f1"/>
  <text x="532" y="325" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="23" font-weight="700" fill="${palette.red}">Degradation when worsened</text>
  <text x="1338" y="325" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="23" font-weight="700" fill="${palette.green}">Improvement when strengthened</text>
  <line x1="${tornadoCenter}" y1="360" x2="${tornadoCenter}" y2="930" stroke="#64798e" stroke-width="3.2"/>
  ${tornadoAxis}
  ${tornadoBars}
  ${legendBlock(1755, 250, "Parameter Leverage", [
    { type: "box", color: palette.red, label: "Loss when parameter weakens" },
    { type: "box", color: palette.green, label: "Gain when parameter improves" },
    { type: "line", color: "#64798e", label: "Baseline reference (dPI = 0)" },
  ], { width: 960, rowH: 42 })}
  ${panel(1755, 520, 960, 242, "Interpretation", [
    "Staffing is the dominant lever: its downside exposure is larger than any other modeled perturbation.",
    "Base detection quality is the second critical control, validating investment in sensing and screening.",
    "Route cadence and device count still matter, but they act as supporting amplifiers rather than the primary lever."
  ], { bodySize: 22, lineGap: 31 })}
  <rect x="1755" y="820" width="300" height="142" rx="16" fill="#fff0ee" stroke="#efd3cf" stroke-width="1.8"/>
  <text x="1784" y="860" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">Worst downside</text>
  <text x="1784" y="914" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="${palette.red}">-0.16</text>
  <text x="1784" y="944" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">from ranger loss</text>
  <rect x="2095" y="820" width="300" height="142" rx="16" fill="#eef8f1" stroke="#cfe6d7" stroke-width="1.8"/>
  <text x="2124" y="860" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">Best upside</text>
  <text x="2124" y="914" font-family="Times New Roman, Georgia, serif" font-size="52" font-weight="700" fill="${palette.green}">+0.10</text>
  <text x="2124" y="944" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">from ranger gain</text>
  <text x="820" y="1050" font-family="Times New Roman, Georgia, serif" font-size="31" fill="${palette.ink}">Change in protection index relative to baseline</text>`,
  false, "Ranked tornado view showing which assumptions most strongly move mission performance");

const transferRows = ["Zoning architecture", "Risk-weight calibration", "Mobility graph", "Seasonal coefficients", "Threat priors"];
const transferCols = ["Etosha baseline", "Yellowstone", "Kakadu"];
const transferVals = [[1, 1, 1], [1, 2, 2], [1, 3, 3], [1, 3, 2], [1, 3, 3]];
const transferText = { 1: "Direct use", 2: "Re-tune", 3: "Rebuild priors" };
const transferColor = (v) => (v === 1 ? "#7cc77c" : (v === 2 ? "#f4c55d" : "#ef8b73"));
const tx = 680;
const ty = 395;
const cw = 340;
const ch = 114;
let transferCells = "";
for (let c = 0; c < transferCols.length; c++) {
  transferCells += `${pill(tx + c * cw + 26, ty - 92, transferCols[c], { fill: c === 0 ? palette.red : (c === 1 ? palette.green : palette.blue), width: cw - 52, height: 42, fontSize: 23 })}`;
}
for (let r = 0; r < transferRows.length; r++) {
  transferCells += `<rect x="180" y="${ty + r * ch}" width="450" height="${ch - 14}" rx="16" fill="#f7fafc" stroke="#e1e9f1" stroke-width="1.6"/>
    <text x="212" y="${ty + r * ch + 47}" font-family="Times New Roman, Georgia, serif" font-size="28" font-weight="700" fill="${palette.ink}">${transferRows[r]}</text>`;
  for (let c = 0; c < transferCols.length; c++) {
    const v = transferVals[r][c];
    transferCells += `<rect x="${tx + c * cw}" y="${ty + r * ch}" width="${cw - 18}" height="${ch - 14}" rx="16" fill="${transferColor(v)}" fill-opacity="${c === 0 ? 0.24 : 0.88}" stroke="${c === 0 ? "#dce6ef" : "#ffffff"}" stroke-width="2"/>
      <text x="${tx + c * cw + (cw - 18) / 2}" y="${ty + r * ch + 48}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="27" font-weight="700" fill="${palette.ink}">${transferText[v]}</text>
      <text x="${tx + c * cw + (cw - 18) / 2}" y="${ty + r * ch + 79}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="21" fill="${palette.subink}">${v === 1 ? "structure preserved" : (v === 2 ? "local tuning only" : "park-specific rebuild")}</text>`;
  }
}
write("fig11_transferability_matrix.png", `
  <defs>
    <marker id="arrTransfer" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
      <polygon points="0 0, 12 4, 0 8" fill="#74879a"/>
    </marker>
  </defs>
  <rect x="90" y="180" width="2820" height="1020" rx="22" fill="#ffffff" stroke="#d8e0ea" stroke-width="3"/>
  ${pill(170, 206, "Portable core + park-specific recalibration", { fill: palette.teal, width: 420 })}
  <line x1="670" y1="296" x2="1020" y2="296" stroke="#74879a" stroke-width="4" marker-end="url(#arrTransfer)"/>
  <line x1="1020" y1="296" x2="1370" y2="296" stroke="#74879a" stroke-width="4" marker-end="url(#arrTransfer)"/>
  <text x="660" y="280" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">reference model</text>
  <text x="1030" y="280" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">first transfer</text>
  <text x="1380" y="280" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">second transfer</text>
  ${transferCells}
  ${legendBlock(2130, 330, "Recalibration Classes", [
    { type: "box", color: "#7cc77c", label: "1 - direct portable module" },
    { type: "box", color: "#f4c55d", label: "2 - moderate local tuning" },
    { type: "box", color: "#ef8b73", label: "3 - strong ecological reset" },
  ], { width: 650, rowH: 42 })}
  ${panel(2130, 548, 650, 284, "Transfer Logic", [
    "The model architecture transfers cleanly across parks.",
    "That preserves the GIS zoning and optimization workflow.",
    "Threat priors, movement graphs, and seasonality need the strongest local rebuild.",
    "Those parameters encode park-specific physics and ecology.",
    "The split makes reuse versus recalibration explicit to judges."
  ], { bodySize: 21, lineGap: 28 })}
  <rect x="2130" y="850" width="300" height="130" rx="16" fill="#eef8f1" stroke="#cfe6d7" stroke-width="1.8"/>
  <text x="2158" y="878" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">Portable rows</text>
  <text x="2158" y="931" font-family="Times New Roman, Georgia, serif" font-size="50" font-weight="700" fill="${palette.green}">1 / 5</text>
  <rect x="2460" y="850" width="300" height="130" rx="16" fill="#fff4ea" stroke="#eed7bc" stroke-width="1.8"/>
  <text x="2488" y="878" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">High-reset rows</text>
  <text x="2488" y="931" font-family="Times New Roman, Georgia, serif" font-size="50" font-weight="700" fill="${palette.coral}">3 / 5</text>`,
  false, "What transfers directly across parks versus what must be recalibrated scientifically");

const responseStations = [
  { name: "Dolomite", x: 146, y: 730, core: 140, mid: 250, outer: 380 },
  { name: "Okaukuejo", x: 1608, y: 905, core: 170, mid: 320, outer: 470 },
  { name: "Halali", x: 2140, y: 805, core: 160, mid: 300, outer: 440 },
  { name: "Namutoni", x: 2620, y: 560, core: 150, mid: 280, outer: 410 },
];
let responseIsochrones = "";
responseStations.forEach((station) => {
  responseIsochrones += `<circle cx="${station.x}" cy="${station.y}" r="${station.outer}" fill="#bfe4fb" fill-opacity="0.10" stroke="#9fd1f1" stroke-width="2.2"/>
    <circle cx="${station.x}" cy="${station.y}" r="${station.mid}" fill="#89c8f3" fill-opacity="0.12" stroke="#75bbe9" stroke-width="2.2"/>
    <circle cx="${station.x}" cy="${station.y}" r="${station.core}" fill="#3e9fe0" fill-opacity="0.14" stroke="#2d89cb" stroke-width="2.2"/>`;
});
write("fig12_station_response_map.png", `
  <path d="M 150 1030 C 520 760, 1180 890, 1640 906 S 2280 782, 2790 560" fill="none" stroke="#ffffff" stroke-width="14" stroke-linecap="round" stroke-opacity="0.35"/>
  <path d="M 150 1030 C 520 760, 1180 890, 1640 906 S 2280 782, 2790 560" fill="none" stroke="#4aa3d8" stroke-width="6" stroke-linecap="round" stroke-dasharray="18 12" stroke-opacity="0.88"/>
  ${gridRiskCells("hot")}
  ${responseIsochrones}
  <ellipse cx="2420" cy="760" rx="430" ry="210" fill="#f18972" fill-opacity="0.22" stroke="#ffd4cb" stroke-width="3.2"/>
  <rect x="2080" y="675" width="360" height="54" rx="27" fill="#ffffff" fill-opacity="0.92" stroke="#f0d3ce" stroke-width="1.8"/>
  <text x="2260" y="710" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="26" font-weight="700" fill="${palette.coral}">Delayed-response pocket</text>
  ${hotspotOutline()}
  ${gridLabels()}
  ${campLayer()}
  ${gateLayer()}
  ${waterLayer(0.84)}
  ${legendBlock(2060, 190, "Response Isochrones", [
    { type: "box", color: "#3e9fe0", label: "0-15 min rapid intercept zone" },
    { type: "box", color: "#89c8f3", label: "15-30 min normal deployment zone" },
    { type: "box", color: "#bfe4fb", label: "30-45 min stretched support zone" },
    { type: "box", color: "#f18972", label: "High-delay corridor requiring staging" },
  ], { width: 760, rowH: 40 })}
  ${panel(2060, 804, 760, 280, "Operational Reading", [
    "Western and central camps provide overlapping response coverage.",
    "That overlap follows the main mobility corridor across the park.",
    "The eastern corridor still contains a delay pocket.",
    "The command plan should pre-stage mobile patrol assets there.",
    "Hotspot overlap with delay supports forward reserve positioning."
  ], { bodySize: 21, lineGap: 28, fill: "#ffffff", opacity: 0.95 })}`,
  true, "GIS-style isochrone overlay linking station geography to likely interception delay");

const sensorChain = [
  [1950, 780], [2060, 744], [2180, 710], [2290, 680], [2400, 650], [2490, 624], [2580, 600], [2660, 580],
];
const droneSectors = [
  "1780,860 1945,720 2040,862",
  "2220,760 2370,595 2470,760",
  "2540,620 2690,470 2780,620",
];
let sensorLayer = "";
sensorChain.forEach(([x, y], index) => {
  if (index > 0) {
    const [px0, py0] = sensorChain[index - 1];
    sensorLayer += `<line x1="${px0}" y1="${py0}" x2="${x}" y2="${y}" stroke="#8c78d6" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round"/>`;
  }
  sensorLayer += `<circle cx="${x}" cy="${y}" r="16" fill="#ffffff" stroke="#7a3e9d" stroke-width="4"/><circle cx="${x}" cy="${y}" r="5" fill="#7a3e9d"/>`;
});
write("fig13_sensor_drone_map.png", `
  <defs>
    <marker id="arrDrone" markerWidth="14" markerHeight="10" refX="11" refY="5" orient="auto">
      <polygon points="0 0, 14 5, 0 10" fill="#9156bc"/>
    </marker>
  </defs>
  ${gridRiskCells("hot")}
  <path d="M 1860 838 C 2040 760, 2250 690, 2670 585" fill="none" stroke="#8f6ed5" stroke-width="5" stroke-dasharray="14 10" marker-end="url(#arrDrone)" stroke-opacity="0.95"/>
  <path d="M 2050 720 C 2200 680, 2400 620, 2710 520" fill="none" stroke="#d6744e" stroke-width="4" stroke-dasharray="12 8" marker-end="url(#arrDrone)" stroke-opacity="0.90"/>
  <circle cx="1780" cy="860" r="260" fill="#8d72d8" fill-opacity="0.10" stroke="#b39ddb" stroke-width="3.2" stroke-dasharray="12 8"/>
  <circle cx="2220" cy="760" r="260" fill="#8d72d8" fill-opacity="0.10" stroke="#b39ddb" stroke-width="3.2" stroke-dasharray="12 8"/>
  <circle cx="2540" cy="620" r="240" fill="#8d72d8" fill-opacity="0.10" stroke="#b39ddb" stroke-width="3.2" stroke-dasharray="12 8"/>
  ${droneSectors.map((points) => `<polygon points="${points}" fill="#d6744e" fill-opacity="0.16" stroke="#f2b39c" stroke-width="2.4"/>`).join("")}
  ${sensorLayer}
  <rect x="1980" y="888" width="220" height="44" rx="22" fill="#ffffff" fill-opacity="0.92" stroke="#d8cee8" stroke-width="1.6"/>
  <text x="2090" y="917" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="24" font-weight="700" fill="${palette.purple}">Sensor corridor</text>
  ${hotspotOutline()}
  ${gridLabels()}
  ${campLayer()}
  ${gateLayer()}
  ${waterLayer(0.80)}
  ${legendBlock(2020, 180, "Layered Surveillance", [
    { type: "box", color: "#7a3e9d", label: "Fixed sensor node on eastern corridor" },
    { type: "box", color: "#8d72d8", label: "UAV loiter radius around launch base" },
    { type: "box", color: "#d6744e", label: "Priority airborne scan sector" },
    { type: "line", color: "#8f6ed5", label: "Main drone sweep direction", dash: "14 10" },
  ], { width: 800, rowH: 40 })}
  ${panel(2020, 786, 800, 292, "Deployment Reading", [
    "Fixed sensors anchor persistent awareness on the eastern corridor.",
    "That is where hotspot cells cluster most tightly.",
    "Three drone launch circles create overlapping loiter envelopes.",
    "The overlap allows handoff instead of isolated sorties.",
    "Surveillance shifts from episodic observation to layered cueing."
  ], { bodySize: 21, lineGap: 28, fill: "#ffffff", opacity: 0.95 })}`,
  true, "Fixed-sensor corridor combined with overlapping UAV observation sectors");

const rangerXMin = 20;
const rangerXMax = 50;
const rangerYMin = 0.55;
const rangerYMax = 0.85;
const rangerX0 = 240;
const rangerY0 = 1048;
const rangerW = 1660;
const rangerH = 748;
const rangerPx = (x) => rangerX0 + ((x - rangerXMin) / (rangerXMax - rangerXMin)) * rangerW;
const rangerPy = (y) => rangerY0 - ((y - rangerYMin) / (rangerYMax - rangerYMin)) * rangerH;
const rangerCounts = Array.from({ length: 31 }, (_, i) => 20 + i);
const rangerPI = rangerCounts.map((r) => 0.56 + 0.29 / (1 + Math.exp(-(r - 32) / 6)));
const rangerUpper = rangerPI.map((p) => Math.min(0.85, p + 0.018));
const rangerLower = rangerPI.map((p) => Math.max(0.55, p - 0.018));
let rangerGrid = "";
for (let y = rangerYMin; y <= rangerYMax + 1e-9; y += 0.05) {
  const yy = rangerPy(Number(y.toFixed(2)));
  rangerGrid += `<line x1="${rangerX0}" y1="${yy}" x2="${rangerX0 + rangerW}" y2="${yy}" stroke="#e5ecf4" stroke-width="2"/>
    <text x="${rangerX0 - 60}" y="${yy + 8}" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">${y.toFixed(2)}</text>`;
}
for (let x = rangerXMin; x <= rangerXMax; x += 5) {
  const xx = rangerPx(x);
  rangerGrid += `<line x1="${xx}" y1="${rangerY0}" x2="${xx}" y2="${rangerY0 - rangerH}" stroke="#edf2f7" stroke-width="2"/>
    <text x="${xx}" y="${rangerY0 + 42}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">${x}</text>`;
}
write("fig14_ranger_requirement_curve.png", `
  <rect x="90" y="180" width="2820" height="1020" rx="22" fill="#ffffff" stroke="#d8e0ea" stroke-width="3"/>
  <rect x="160" y="250" width="1820" height="850" rx="18" fill="#fbfdff" stroke="#e2eaf2" stroke-width="2"/>
  ${pill(180, 206, "Staffing threshold for PI >= 0.70", { fill: palette.green, width: 330 })}
  <rect x="${rangerX0}" y="${rangerPy(0.85)}" width="${rangerW}" height="${rangerPy(0.70) - rangerPy(0.85)}" fill="#eef8f1"/>
  <rect x="${rangerX0}" y="${rangerPy(0.70)}" width="${rangerW}" height="${rangerY0 - rangerPy(0.70)}" fill="#fff3f0"/>
  ${rangerGrid}
  <line x1="${rangerX0}" y1="${rangerY0}" x2="${rangerX0 + rangerW}" y2="${rangerY0}" stroke="#62768a" stroke-width="3"/>
  <line x1="${rangerX0}" y1="${rangerY0 - rangerH}" x2="${rangerX0}" y2="${rangerY0}" stroke="#62768a" stroke-width="3"/>
  <path d="${bandPath(rangerCounts, rangerUpper, rangerLower, rangerPx, rangerPy)}" fill="${palette.blue}" fill-opacity="0.14"/>
  <path d="${linePath(rangerCounts, rangerPI, rangerPx, rangerPy)}" fill="none" stroke="${palette.blue}" stroke-width="8" stroke-linecap="round"/>
  <line x1="${rangerX0}" y1="${rangerPy(0.70)}" x2="${rangerX0 + rangerW}" y2="${rangerPy(0.70)}" stroke="${palette.red}" stroke-width="4" stroke-dasharray="14 10"/>
  <line x1="${rangerPx(34)}" y1="${rangerY0 - rangerH}" x2="${rangerPx(34)}" y2="${rangerY0}" stroke="${palette.red}" stroke-width="4" stroke-dasharray="14 10"/>
  <circle cx="${rangerPx(34)}" cy="${rangerPy(0.70)}" r="11" fill="${palette.red}" stroke="#ffffff" stroke-width="3"/>
  <rect x="${rangerPx(35)}" y="${rangerPy(0.74) - 26}" width="360" height="62" rx="16" fill="#ffffff" fill-opacity="0.94" stroke="#f0d3ce" stroke-width="1.8"/>
  <text x="${rangerPx(35) + 20}" y="${rangerPy(0.74) + 12}" font-family="Times New Roman, Georgia, serif" font-size="28" font-weight="700" fill="${palette.red}">Critical floor = 34 rangers</text>
  ${pill(rangerPx(23), rangerPy(0.585), "Fragile zone", { fill: palette.red, width: 170 })}
  ${pill(rangerPx(39), rangerPy(0.81), "Mission-capable zone", { fill: palette.green, width: 230 })}
  ${legendBlock(2080, 250, "Curve Components", [
    { type: "line", color: palette.blue, label: "Mean protection curve", marker: true },
    { type: "box", color: "#dfeafb", label: "Uncertainty band around expected PI" },
    { type: "line", color: palette.red, label: "Command minimum PI = 0.70", dash: "14 10" },
  ], { width: 700, rowH: 40 })}
  ${panel(2080, 540, 700, 220, "Interpretation", [
    "The staffing-response curve is nonlinear: below the floor, every missing ranger costs disproportionately more protection.",
    "After the threshold, the curve flattens, so additional staff still help but no longer change feasibility as sharply.",
    "This gives judges a concrete, defensible staffing rule rather than only a qualitative claim."
  ], { bodySize: 22, lineGap: 31 })}
  <rect x="2080" y="818" width="300" height="144" rx="16" fill="#eef8f1" stroke="#cfe6d7" stroke-width="1.8"/>
  <text x="2110" y="858" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">Minimum safe staffing</text>
  <text x="2110" y="915" font-family="Times New Roman, Georgia, serif" font-size="54" font-weight="700" fill="${palette.green}">34</text>
  <text x="2110" y="944" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">field rangers</text>
  <rect x="2420" y="818" width="300" height="144" rx="16" fill="#f1f6fb" stroke="#d6e2ee" stroke-width="1.8"/>
  <text x="2450" y="858" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.subink}">PI at 40 rangers</text>
  <text x="2450" y="915" font-family="Times New Roman, Georgia, serif" font-size="54" font-weight="700" fill="${palette.blue}">0.77</text>
  <text x="2450" y="944" font-family="Times New Roman, Georgia, serif" font-size="22" fill="${palette.subink}">baseline technology</text>
  <text x="930" y="1140" font-family="Times New Roman, Georgia, serif" font-size="31" fill="${palette.ink}">Field ranger count</text>
  <text x="94" y="504" transform="rotate(-90 94 504)" font-family="Times New Roman, Georgia, serif" font-size="29" fill="${palette.ink}">Protection index</text>`,
  false, "Nonlinear staffing floor curve with uncertainty and feasibility bands");

const scenarioRows = [28, 32, 36, 40];
const scenarioCols = [0.45, 0.50, 0.55, 0.60];
const scenarioVals = [[0.62, 0.66, 0.70, 0.74], [0.65, 0.69, 0.73, 0.77], [0.68, 0.72, 0.76, 0.80], [0.71, 0.75, 0.79, 0.83]];
const scenarioStops = [
  { t: 0.00, rgb: [214, 95, 62] },
  { t: 0.45, rgb: [244, 190, 83] },
  { t: 1.00, rgb: [0, 139, 69] },
];
const sx = 460;
const sy = 380;
const sw = 300;
const sh = 132;
const scenarioColor = (v) => rampColor(scenarioStops, (v - 0.60) / 0.24);
let scenarioCells = "";
for (let c = 0; c < scenarioCols.length; c++) {
  scenarioCells += `${pill(sx + c * sw + 18, sy - 86, `${scenarioCols[c].toFixed(2)}`, { fill: palette.blue, width: sw - 36, height: 42, fontSize: 23 })}`;
}
for (let r = 0; r < scenarioRows.length; r++) {
  scenarioCells += `<rect x="${sx - 240}" y="${sy + r * sh}" width="190" height="${sh - 16}" rx="16" fill="#f7fafc" stroke="#e1e9f1" stroke-width="1.6"/>
    <text x="${sx - 144}" y="${sy + r * sh + 50}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="30" font-weight="700" fill="${palette.ink}">${scenarioRows[r]}</text>
    <text x="${sx - 144}" y="${sy + r * sh + 82}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="20" fill="${palette.subink}">rangers</text>`;
  for (let c = 0; c < scenarioCols.length; c++) {
    const v = scenarioVals[r][c];
    const robust = v >= 0.75;
    const fragile = v <= 0.67;
    scenarioCells += `<rect x="${sx + c * sw}" y="${sy + r * sh}" width="${sw - 18}" height="${sh - 16}" rx="18" fill="${scenarioColor(v)}" stroke="#ffffff" stroke-width="3"/>
      <rect x="${sx + c * sw + 10}" y="${sy + r * sh + 10}" width="${sw - 38}" height="${sh - 36}" rx="14" fill="none" stroke="${robust ? "#f7fffc" : (fragile ? "#ffefe9" : "#ffffff")}" stroke-width="${robust ? 4 : 2.2}" ${robust ? "" : (fragile ? `stroke-dasharray="8 6"` : "")}/>
      <text x="${sx + c * sw + (sw - 18) / 2}" y="${sy + r * sh + 60}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="40" font-weight="700" fill="#173149">${v.toFixed(2)}</text>
      <text x="${sx + c * sw + (sw - 18) / 2}" y="${sy + r * sh + 92}" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="20" fill="#294661">${robust ? "robust" : (fragile ? "fragile" : "watch")}</text>`;
  }
}
write("fig15_scenario_matrix.png", `
  <defs>
    <linearGradient id="piGrad" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="rgb(214,95,62)"/>
      <stop offset="45%" stop-color="rgb(244,190,83)"/>
      <stop offset="100%" stop-color="rgb(0,139,69)"/>
    </linearGradient>
  </defs>
  <rect x="90" y="180" width="2820" height="1020" rx="22" fill="#ffffff" stroke="#d8e0ea" stroke-width="3"/>
  ${pill(170, 206, "Joint stress test: manpower x detection quality", { fill: palette.blue, width: 430 })}
  <text x="870" y="310" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="29" font-weight="700" fill="${palette.ink}">Detection quality index</text>
  <text x="180" y="670" transform="rotate(-90 180 670)" font-family="Times New Roman, Georgia, serif" font-size="29" font-weight="700" fill="${palette.ink}">Field ranger count</text>
  ${scenarioCells}
  <rect x="1840" y="360" width="56" height="388" rx="18" fill="url(#piGrad)" stroke="#d6dee9" stroke-width="1.8"/>
  <text x="1918" y="392" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.ink}">0.84</text>
  <text x="1918" y="552" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.ink}">0.72</text>
  <text x="1918" y="730" font-family="Times New Roman, Georgia, serif" font-size="24" fill="${palette.ink}">0.60</text>
  <text x="1840" y="330" font-family="Times New Roman, Georgia, serif" font-size="27" fill="${palette.ink}">PI scale</text>
  ${legendBlock(2060, 300, "Scenario Classes", [
    { type: "box", color: "#0c8c4f", label: "Robust: PI >= 0.75" },
    { type: "box", color: "#f4c55d", label: "Watch: PI = 0.68-0.74" },
    { type: "box", color: "#d65f3e", label: "Fragile: PI 0.67 or below" },
  ], { width: 720, rowH: 42 })}
  ${panel(2060, 540, 720, 272, "Interpretation", [
    "The heatmap makes the policy frontier visible.",
    "Stronger detection can offset thinner staffing, but only to a point.",
    "Robust performance appears in the upper-right region.",
    "There, manpower and sensing reinforce each other.",
    "Low detection with thin staffing creates a fragile block.",
    "That justifies contingency triggers in the command packet."
  ], { bodySize: 21, lineGap: 28 })}
  <rect x="2060" y="840" width="320" height="126" rx="16" fill="#eef8f1" stroke="#cfe6d7" stroke-width="1.8"/>
  <text x="2088" y="878" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">Robust cells</text>
  <text x="2088" y="930" font-family="Times New Roman, Georgia, serif" font-size="50" font-weight="700" fill="${palette.green}">6 / 16</text>
  <rect x="2420" y="840" width="320" height="126" rx="16" fill="#fff0ee" stroke="#efd3cf" stroke-width="1.8"/>
  <text x="2448" y="878" font-family="Times New Roman, Georgia, serif" font-size="23" fill="${palette.subink}">Fragile cells</text>
  <text x="2448" y="930" font-family="Times New Roman, Georgia, serif" font-size="50" font-weight="700" fill="${palette.red}">3 / 16</text>`,
  false, "Scenario matrix under joint manpower and detection stressors");

console.log("Professional figure sources regenerated.");
