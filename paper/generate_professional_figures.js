const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC = path.join(ROOT, "figures_src");
if (!fs.existsSync(SRC)) fs.mkdirSync(SRC, { recursive: true });

const W = 3200;
const H = 1800;
const MAP_SHIFT = { x: 110, y: 255 };
const REF = { w: 3000, h: 1289 };
const extent = { x: 360, y: 110, w: 2480, h: 1080 };

const palette = {
  paper: "#faf7f0",
  paperShade: "#f1ece1",
  ink: "#243240",
  muted: "#6a7682",
  frame: "#cfd6dc",
  grid: "#d7dbdf",
  blue: "#3f678e",
  green: "#5f805d",
  amber: "#b77735",
  red: "#9f473b",
  purple: "#7a6a92",
  teal: "#3e7f83",
  gold: "#c6a151",
  land: "#e4ead9",
  land2: "#d7dfca",
  pan: "#e7e1d3",
  water: "#4f7ea7",
  road: "#7b6c60",
  route: "#2f557d",
  route2: "#a5652e",
  route3: "#5e7a4f",
  hotspot: "#8e2f2f",
  highlight: "#ece1c5",
  white: "#ffffff",
};

const titleMap = {
  "fig01_system_architecture.png": "Layered Conservation Decision Architecture",
  "fig02_etosha_grid.png": "Analytical Atlas of Etosha Management Zones",
  "fig03_risk_heatmap.png": "Risk Surface on Stylized Etosha Atlas",
  "fig04_risk_decomposition.png": "Hotspot Decomposition by Dominant Driver",
  "fig05_patrol_routes.png": "Route Portfolio on Atlas Base Map",
  "fig06_allocation_dashboard.png": "Allocation Summary Panels with Spatial Context",
  "fig07_schedule_timeline.png": "Twenty-Four-Hour Command Schedule",
  "fig08_simulation_results.png": "Protection Trajectories with Confidence Bands",
  "fig09_robustness_distribution.png": "Robustness Distribution under Strategy Stress",
  "fig10_sensitivity_panels.png": "Nature-Style Tornado Sensitivity Ranking",
  "fig11_transferability_matrix.png": "Cross-Park Transferability Matrix",
  "fig12_station_response_map.png": "Response-Time Atlas by Ranger Station",
  "fig13_sensor_drone_map.png": "Sensor and Drone Surveillance Atlas",
  "fig14_ranger_requirement_curve.png": "Minimum Ranger Requirement Curve",
  "fig15_scenario_matrix.png": "Scenario Frontier over Staffing and Detection",
};

const subtitleMap = {
  "fig01_system_architecture.png": "Layered command logic from GIS diagnosis to field governance",
  "fig02_etosha_grid.png": "Vector atlas reconstructed from Etosha feature geometry",
  "fig03_risk_heatmap.png": "Risk atlas highlighting the eastern-southern hotspot corridor",
  "fig04_risk_decomposition.png": "Ecological value, access opportunity, and delay separated on one base map",
  "fig05_patrol_routes.png": "Patrol families redrawn as scholarly map overlays with route legends",
  "fig06_allocation_dashboard.png": "Spatial plan paired with patrol-hour, hotspot-tier, and reserve summaries",
  "fig07_schedule_timeline.png": "Compact publication-grade operational rhythm diagram",
  "fig08_simulation_results.png": "Confidence envelopes and threshold lines in an academic plotting style",
  "fig09_robustness_distribution.png": "Kernel-style performance densities with restrained color treatment",
  "fig10_sensitivity_panels.png": "Centered tornado bars styled after classical manuscript graphics",
  "fig11_transferability_matrix.png": "Portable modules versus local recalibration in journal-table form",
  "fig12_station_response_map.png": "Delay pockets highlighted through atlas shading and contour annotations",
  "fig13_sensor_drone_map.png": "Monitoring stack shown with a calmer map grammar and cleaner legend",
  "fig14_ranger_requirement_curve.png": "Staffing threshold and safe region with subdued axis treatment",
  "fig15_scenario_matrix.png": "Feasible operating frontier in a manuscript heatmap convention",
};

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

const parkOutline = [
  [175, 245], [420, 165], [980, 145], [1560, 155], [2160, 182], [2690, 214], [2872, 290],
  [2890, 540], [2860, 930], [2720, 1095], [2210, 1134], [1390, 1160], [720, 1148], [318, 1082], [180, 875], [145, 520],
];

const panOutline = [
  [1100, 310], [1310, 240], [1600, 205], [1945, 225], [2230, 300], [2360, 395], [2280, 520],
  [1970, 565], [1590, 548], [1305, 495], [1130, 410],
];

const veget1 = [[210, 520], [490, 420], [860, 390], [1100, 460], [980, 610], [620, 660], [310, 630]];
const veget2 = [[760, 870], [1140, 800], [1540, 770], [1760, 900], [1510, 1055], [1050, 1015], [820, 940]];
const veget3 = [[2010, 650], [2320, 560], [2720, 520], [2810, 730], [2510, 910], [2140, 860], [1990, 760]];

const trunkRoad = [
  [170, 1075], [250, 930], [480, 680], [760, 675], [1030, 668], [1390, 692], [1608, 905], [1820, 820],
  [2140, 805], [2365, 695], [2620, 560], [2820, 585],
];

const panRoad = [
  [330, 770], [580, 720], [860, 675], [1180, 655], [1490, 670], [1770, 725], [2070, 708], [2360, 665], [2675, 565],
];

const northRoad = [
  [2330, 70], [2380, 185], [2480, 430], [2620, 560],
];

const westLink = [
  [170, 1075], [165, 880], [146, 730],
];

const routeFamilies = {
  EastLoop: [[1608, 905], [1830, 808], [2140, 805], [2400, 650], [2620, 560], [2490, 624], [2280, 860], [2060, 900], [1608, 905]],
  SouthLoop: [[480, 680], [700, 682], [1020, 665], [1390, 694], [1608, 905], [1210, 665], [860, 670], [480, 680]],
  WestLoop: [[170, 1075], [146, 730], [380, 690], [550, 700], [480, 680], [250, 930], [170, 1075]],
  PanArc: [[700, 682], [1020, 665], [1390, 694], [1830, 808], [2180, 710], [2490, 624]],
  RapidResponse: [[1608, 905], [2140, 805], [2620, 560]],
};

const sensorSites = [
  [1530, 730], [1700, 845], [1830, 808], [2060, 744], [2290, 680], [2490, 624], [2440, 850], [2060, 900],
];

const droneSectors = [
  [[1900, 640], [2250, 560], [2420, 760], [2040, 820]],
  [[2220, 520], [2590, 450], [2730, 650], [2360, 700]],
  [[2030, 820], [2335, 760], [2470, 955], [2145, 995]],
];

const riskStops = [
  { t: 0.00, rgb: [245, 242, 223] },
  { t: 0.25, rgb: [229, 214, 173] },
  { t: 0.50, rgb: [203, 166, 99] },
  { t: 0.75, rgb: [171, 104, 63] },
  { t: 1.00, rgb: [128, 50, 47] },
];

const responseStops = [
  { t: 0.00, rgb: [229, 239, 247] },
  { t: 0.25, rgb: [187, 212, 230] },
  { t: 0.50, rgb: [127, 169, 201] },
  { t: 0.75, rgb: [85, 126, 170] },
  { t: 1.00, rgb: [50, 85, 125] },
];

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function figNo(name) {
  const m = name.match(/fig(\d{2})/);
  return m ? `FIG. ${m[1]}` : "FIG.";
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function rgbToString(rgb) {
  return `rgb(${rgb.map((v) => Math.round(v)).join(",")})`;
}

function rampColor(stops, value) {
  const v = Math.max(0, Math.min(1, value));
  if (v <= stops[0].t) return rgbToString(stops[0].rgb);
  for (let i = 1; i < stops.length; i += 1) {
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

function pathFromPoints(points, close = false) {
  return `${points.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ")}${close ? " Z" : ""}`;
}

function shift(points, dx = MAP_SHIFT.x, dy = MAP_SHIFT.y) {
  return points.map(([x, y]) => [x + dx, y + dy]);
}

function cx(x) {
  return x + MAP_SHIFT.x;
}

function cy(y) {
  return y + MAP_SHIFT.y;
}

function card(x, y, w, h, title, lines, opts = {}) {
  const fill = opts.fill || palette.white;
  const stroke = opts.stroke || palette.frame;
  const titleColor = opts.titleColor || palette.ink;
  const bodyColor = opts.bodyColor || palette.muted;
  const bodySize = opts.bodySize || 34;
  const titleSize = opts.titleSize || 42;
  const lineGap = opts.lineGap || bodySize + 10;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${opts.radius || 22}" fill="${fill}" stroke="${stroke}" stroke-width="${opts.strokeWidth || 2.2}" filter="url(#shadow)"/>`;
  if (title) {
    out += `<text x="${x + 34}" y="${y + 56}" font-family="Helvetica Neue, Arial, sans-serif" font-size="${titleSize}" font-weight="700" fill="${titleColor}">${esc(title)}</text>`;
  }
  lines.forEach((line, i) => {
    out += `<text x="${x + 34}" y="${y + (title ? 108 : 58) + i * lineGap}" font-family="Helvetica Neue, Arial, sans-serif" font-size="${bodySize}" fill="${bodyColor}">${esc(line)}</text>`;
  });
  return out;
}

function pill(x, y, text, fill, color = palette.ink) {
  const width = Math.max(128, text.length * 18 + 36);
  return `<rect x="${x}" y="${y}" width="${width}" height="48" rx="24" fill="${fill}" stroke="${fill}" stroke-width="1.5"/>
    <text x="${x + width / 2}" y="${y + 32}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${color}">${esc(text)}</text>`;
}

function road(points, opts = {}) {
  const pts = shift(points);
  const d = pathFromPoints(pts);
  return `<path d="${d}" fill="none" stroke="${opts.base || "#eee8df"}" stroke-width="${opts.baseWidth || 18}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="${opts.top || palette.road}" stroke-width="${opts.topWidth || 8}" stroke-linecap="round" stroke-linejoin="round" ${opts.dash ? `stroke-dasharray="${opts.dash}"` : ""}/>`;
}

function route(points, color, width = 13, dash = "") {
  return `<path d="${pathFromPoints(shift(points))}" fill="none" stroke="#ffffff" stroke-width="${width + 8}" stroke-linecap="round" stroke-linejoin="round" opacity="0.88"/>
    <path d="${pathFromPoints(shift(points))}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
}

function drawCamps() {
  return Object.entries(camps).map(([name, [x, y]]) => `
    <circle cx="${cx(x)}" cy="${cy(y)}" r="20" fill="${palette.white}" stroke="${palette.hotspot}" stroke-width="5"/>
    <circle cx="${cx(x)}" cy="${cy(y)}" r="7" fill="${palette.hotspot}"/>
    <rect x="${cx(x) + 24}" y="${cy(y) - 25}" width="${name.length * 19 + 26}" height="42" rx="12" fill="${palette.white}" fill-opacity="0.96" stroke="${palette.frame}" stroke-width="1.5"/>
    <text x="${cx(x) + 38}" y="${cy(y) + 4}" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" font-weight="700" fill="${palette.ink}">${esc(name)}</text>
  `).join("");
}

function drawGates() {
  return Object.entries(gates).map(([name, [x, y]]) => `
    <circle cx="${cx(x)}" cy="${cy(y)}" r="17" fill="#eef5ec" stroke="${palette.green}" stroke-width="4.5"/>
    <text x="${cx(x)}" y="${cy(y) + 8}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="21" font-weight="700" fill="${palette.green}">G</text>
    <text x="${cx(x) + 22}" y="${cy(y) + 7}" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" fill="${palette.ink}">${esc(name)}</text>
  `).join("");
}

function drawWaterholes(opacity = 0.95) {
  return waterholes.map(([x, y]) => `
    <circle cx="${cx(x)}" cy="${cy(y)}" r="8" fill="${palette.water}" fill-opacity="${opacity}" stroke="${palette.white}" stroke-width="2.4"/>
  `).join("");
}

function northArrow(x = 2850, y = 310) {
  return `<g>
    <line x1="${x}" y1="${y + 72}" x2="${x}" y2="${y}" stroke="${palette.ink}" stroke-width="5"/>
    <path d="M ${x - 14} ${y + 24} L ${x} ${y} L ${x + 14} ${y + 24} Z" fill="${palette.ink}"/>
    <text x="${x}" y="${y - 16}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${palette.ink}">N</text>
  </g>`;
}

function scaleBar(x = 2490, y = 1485) {
  return `<g>
    <rect x="${x}" y="${y}" width="220" height="18" rx="3" fill="${palette.ink}"/>
    <rect x="${x + 110}" y="${y}" width="110" height="18" rx="0" fill="${palette.white}" stroke="${palette.ink}" stroke-width="2"/>
    <line x1="${x}" y1="${y}" x2="${x}" y2="${y + 30}" stroke="${palette.ink}" stroke-width="3"/>
    <line x1="${x + 110}" y1="${y}" x2="${x + 110}" y2="${y + 30}" stroke="${palette.ink}" stroke-width="3"/>
    <line x1="${x + 220}" y1="${y}" x2="${x + 220}" y2="${y + 30}" stroke="${palette.ink}" stroke-width="3"/>
    <text x="${x}" y="${y + 62}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ink}">0</text>
    <text x="${x + 97}" y="${y + 62}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ink}">25</text>
    <text x="${x + 205}" y="${y + 62}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ink}">50 km</text>
  </g>`;
}

function parkBase() {
  const park = pathFromPoints(shift(parkOutline), true);
  const pan = pathFromPoints(shift(panOutline), true);
  return `
    <rect x="84" y="218" width="3032" height="1332" rx="26" fill="${palette.white}" stroke="${palette.frame}" stroke-width="2.4" filter="url(#shadow)"/>
    <rect x="102" y="236" width="2996" height="1296" rx="20" fill="${palette.paperShade}"/>
    <g clip-path="url(#parkClip)">
      <rect x="${MAP_SHIFT.x}" y="${MAP_SHIFT.y}" width="${REF.w}" height="${REF.h}" fill="#ecf0e4"/>
      <path d="${park}" fill="${palette.land}" stroke="none"/>
      <path d="${pathFromPoints(shift(veget1), true)}" fill="${palette.land2}" opacity="0.9"/>
      <path d="${pathFromPoints(shift(veget2), true)}" fill="${palette.land2}" opacity="0.85"/>
      <path d="${pathFromPoints(shift(veget3), true)}" fill="${palette.land2}" opacity="0.9"/>
      <path d="${pan}" fill="${palette.pan}" opacity="0.98"/>
      <path d="M ${cx(240)} ${cy(1010)} C ${cx(980)} ${cy(940)} ${cx(1600)} ${cy(905)} ${cx(2810)} ${cy(590)}" fill="none" stroke="#dbd1bb" stroke-width="40" stroke-linecap="round" opacity="0.82"/>
      <path d="M ${cx(220)} ${cy(790)} C ${cx(980)} ${cy(650)} ${cx(1840)} ${cy(720)} ${cx(2730)} ${cy(560)}" fill="none" stroke="#e9dfcb" stroke-width="24" stroke-linecap="round" opacity="0.9"/>
    </g>
    <path d="${park}" fill="none" stroke="${palette.ink}" stroke-width="5"/>
    ${road(trunkRoad)}
    ${road(panRoad, { baseWidth: 14, topWidth: 6, base: "#f2ebdf", top: "#98877a" })}
    ${road(northRoad, { baseWidth: 14, topWidth: 6, base: "#f2ebdf", top: "#98877a", dash: "18 10" })}
    ${road(westLink, { baseWidth: 14, topWidth: 6, base: "#f2ebdf", top: "#98877a" })}
    ${drawWaterholes()}
    ${drawCamps()}
    ${drawGates()}
    <text x="${cx(1720)}" y="${cy(420)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="42" font-weight="700" fill="#8f8777" opacity="0.9">Etosha Pan</text>
    <text x="${cx(820)}" y="${cy(980)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" fill="${palette.muted}">Southern patrol corridor</text>
    ${northArrow()}
    ${scaleBar()}
  `;
}

function riskCellData() {
  const cells = [];
  const cw = extent.w / 8;
  const ch = extent.h / 8;
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const x = extent.x + c * cw;
      const y = extent.y + r * ch;
      const midX = x + cw / 2;
      const midY = y + ch / 2;
      const east = c / 7;
      const southCorridor = Math.exp(-Math.pow((midY - 760) / 190, 2));
      const panInfluence = Math.exp(-Math.pow((midX - 1800) / 620, 2) - Math.pow((midY - 400) / 250, 2));
      const gateInfluence = Math.exp(-Math.pow((midX - 2700) / 330, 2)) + 0.7 * Math.exp(-Math.pow((midX - 1650) / 420, 2) - Math.pow((midY - 1040) / 210, 2));
      const waterInfluence = Math.max(...waterholes.map(([wx, wy]) => Math.exp(-Math.pow((midX - wx) / 270, 2) - Math.pow((midY - wy) / 220, 2))));
      const ecology = 0.52 * waterInfluence + 0.30 * panInfluence + 0.18 * (1 - r / 7);
      const access = 0.45 * east + 0.30 * southCorridor + 0.25 * Math.min(1, gateInfluence);
      const nearestCamp = Math.min(...Object.values(camps).map(([cx0, cy0]) => Math.hypot(midX - cx0, midY - cy0)));
      const responseTime = Math.max(1.8, Math.min(6.3, 1.55 + nearestCamp / 360 + 0.75 * east));
      const delay = (responseTime - 1.8) / 4.5;
      const risk = 0.48 * ecology + 0.30 * access + 0.22 * delay;
      const dominant = [
        ["Ecology", ecology],
        ["Access", access],
        ["Delay", delay],
      ].sort((a, b) => b[1] - a[1])[0][0];
      cells.push({ r, c, x, y, w: cw, h: ch, ecology, access, delay, responseTime, risk, dominant });
    }
  }
  const sorted = [...cells].sort((a, b) => b.risk - a.risk);
  const q = sorted[Math.floor(sorted.length * 0.25) - 1].risk;
  cells.forEach((cell) => {
    cell.hot = cell.risk >= q;
  });
  return cells;
}

const cells = riskCellData();

function cellRect(cell, fill, opacity = 1, stroke = palette.white, strokeOpacity = 0.75, strokeWidth = 1.8) {
  return `<rect x="${cx(cell.x)}" y="${cy(cell.y)}" width="${cell.w}" height="${cell.h}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-opacity="${strokeOpacity}" stroke-width="${strokeWidth}"/>`;
}

function gridOverlay(mode = "outline") {
  let out = "";
  cells.forEach((cell) => {
    if (mode === "outline") {
      out += cellRect(cell, "none", 1, palette.grid, 1, 1.8);
    } else if (mode === "risk") {
      out += cellRect(cell, rampColor(riskStops, cell.risk), 0.68, palette.white, 0.55, 1.5);
    } else if (mode === "tier") {
      const fill = cell.hot ? "#b35e49" : cell.risk > 0.48 ? "#d9c08a" : "#dce5e7";
      out += cellRect(cell, fill, cell.hot ? 0.58 : 0.42, palette.white, 0.65, 1.4);
    } else if (mode === "dominant") {
      const fill = cell.dominant === "Ecology" ? "#98b58d" : cell.dominant === "Access" ? "#d4a36c" : "#a59ac6";
      out += cellRect(cell, fill, cell.hot ? 0.60 : 0.34, palette.white, 0.65, 1.4);
    } else if (mode === "response") {
      const value = (cell.responseTime - 1.8) / 4.5;
      out += cellRect(cell, rampColor(responseStops, value), 0.70, palette.white, 0.55, 1.4);
    }
  });
  out += `<rect x="${cx(extent.x)}" y="${cy(extent.y)}" width="${extent.w}" height="${extent.h}" fill="none" stroke="${palette.ink}" stroke-width="3"/>`;
  const letters = "ABCDEFGH".split("");
  letters.forEach((letter, i) => {
    out += `<text x="${cx(extent.x + i * extent.w / 8 + extent.w / 16)}" y="${cy(extent.y - 18)}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.muted}">${letter}</text>`;
    out += `<text x="${cx(extent.x - 24)}" y="${cy(extent.y + i * extent.h / 8 + extent.h / 16 + 8)}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.muted}">${i + 1}</text>`;
  });
  return out;
}

function hotspotOutline() {
  return cells.filter((cell) => cell.hot).map((cell) => `
    <rect x="${cx(cell.x) + 8}" y="${cy(cell.y) + 8}" width="${cell.w - 16}" height="${cell.h - 16}" rx="12" fill="none" stroke="#fff6de" stroke-width="3.8" stroke-dasharray="10 8"/>
  `).join("");
}

function legendGradient(x, y, h, title, stops, labels) {
  const id = `grad_${x}_${y}`.replace(/[^\w]/g, "_");
  const defs = `
    <linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0">
      ${stops.map((s) => `<stop offset="${s.t * 100}%" stop-color="${rgbToString(s.rgb)}"/>`).join("")}
    </linearGradient>
  `;
  const labelStep = h / (labels.length - 1);
  return {
    defs,
    body: `
      <rect x="${x}" y="${y}" width="30" height="${h}" rx="15" fill="url(#${id})" stroke="${palette.frame}" stroke-width="1.5"/>
      <text x="${x - 4}" y="${y - 14}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.ink}">${esc(title)}</text>
      ${labels.map((label, i) => `
        <text x="${x + 48}" y="${y + h - i * labelStep + 8}" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.muted}">${esc(label)}</text>
      `).join("")}
    `,
  };
}

function linePath(points) {
  return points.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
}

function bandPath(xs, upper, lower, sx, sy) {
  const first = `M ${sx(xs[0])} ${sy(lower[0])}`;
  const top = upper.map((v, i) => `L ${sx(xs[i])} ${sy(v)}`).join(" ");
  const bottom = lower.slice().reverse().map((v, idx) => {
    const i = xs.length - 1 - idx;
    return `L ${sx(xs[i])} ${sy(v)}`;
  }).join(" ");
  return `${first} ${top} ${bottom} Z`;
}

function axisBox(x, y, w, h, xTicks, yTicks, xLabel, yLabel) {
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${palette.white}" stroke="${palette.frame}" stroke-width="2.2" filter="url(#shadow)"/>`;
  yTicks.forEach((tick) => {
    const py = y + h - tick.pos * h;
    out += `<line x1="${x + 100}" y1="${py}" x2="${x + w - 50}" y2="${py}" stroke="${palette.grid}" stroke-width="2" stroke-dasharray="6 10"/>
      <text x="${x + 76}" y="${py + 9}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="25" fill="${palette.muted}">${esc(tick.label)}</text>`;
  });
  xTicks.forEach((tick) => {
    const px = x + 100 + tick.pos * (w - 150);
    out += `<line x1="${px}" y1="${y + 70}" x2="${px}" y2="${y + h - 70}" stroke="${palette.grid}" stroke-width="1.6" stroke-dasharray="6 12"/>
      <text x="${px}" y="${y + h - 24}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="25" fill="${palette.muted}">${esc(tick.label)}</text>`;
  });
  out += `<line x1="${x + 100}" y1="${y + h - 70}" x2="${x + w - 50}" y2="${y + h - 70}" stroke="${palette.ink}" stroke-width="3"/>
    <line x1="${x + 100}" y1="${y + 70}" x2="${x + 100}" y2="${y + h - 70}" stroke="${palette.ink}" stroke-width="3"/>
    <text x="${x + w / 2}" y="${y + h - 5}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${palette.ink}">${esc(xLabel)}</text>
    <text x="${x + 24}" y="${y + h / 2}" transform="rotate(-90 ${x + 24} ${y + h / 2})" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${palette.ink}">${esc(yLabel)}</text>`;
  return out;
}

function plotLegend(x, y, entries) {
  return `<g>
    ${entries.map((entry, i) => `
      <line x1="${x}" y1="${y + i * 44}" x2="${x + 54}" y2="${y + i * 44}" stroke="${entry.color}" stroke-width="8" stroke-linecap="round"/>
      <text x="${x + 72}" y="${y + i * 44 + 8}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ink}">${esc(entry.label)}</text>
    `).join("")}
  </g>`;
}

function write(name, body, opts = {}) {
  const canvas = opts.canvas || { w: W, h: H };
  const title = opts.title || titleMap[name] || name;
  const subtitle = opts.subtitle || subtitleMap[name] || "";
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas.w} ${canvas.h}" width="${canvas.w}" height="${canvas.h}">
  <defs>
    <linearGradient id="paperBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.paper}"/>
      <stop offset="100%" stop-color="${palette.paperShade}"/>
    </linearGradient>
    <linearGradient id="headerRule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${palette.blue}"/>
      <stop offset="35%" stop-color="${palette.green}"/>
      <stop offset="68%" stop-color="${palette.amber}"/>
      <stop offset="100%" stop-color="${palette.red}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#a6afb7" flood-opacity="0.20"/>
    </filter>
    <clipPath id="parkClip" clipPathUnits="userSpaceOnUse">
      <path d="${pathFromPoints(shift(parkOutline), true)}"/>
    </clipPath>
  </defs>
  <rect x="0" y="0" width="${canvas.w}" height="${canvas.h}" fill="url(#paperBg)"/>
  <rect x="68" y="54" width="${canvas.w - 136}" height="144" rx="28" fill="${palette.white}" stroke="${palette.frame}" stroke-width="2" filter="url(#shadow)"/>
  <rect x="98" y="86" width="${canvas.w - 196}" height="10" rx="5" fill="url(#headerRule)"/>
  ${pill(canvas.w - 258, 104, figNo(name), palette.highlight)}
  <text x="104" y="145" font-family="Helvetica Neue, Arial, sans-serif" font-size="56" font-weight="700" fill="${palette.ink}">${esc(title)}</text>
  <text x="104" y="184" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" fill="${palette.muted}">${esc(subtitle)}</text>
  ${body}
</svg>`;
  fs.writeFileSync(path.join(SRC, name.replace(".png", ".svg")), svg, "utf8");
}

function figure01() {
  const canvas = { w: 3200, h: 2150 };
  const layer = (y, fill, title, boxes, footer) => `
    <rect x="220" y="${y}" width="2760" height="248" rx="28" fill="${fill}" stroke="${palette.frame}" stroke-width="2"/>
    <text x="260" y="${y + 56}" font-family="Helvetica Neue, Arial, sans-serif" font-size="38" font-weight="700" fill="${palette.ink}">${esc(title)}</text>
    ${boxes.map((box, i) => `
      <rect x="${350 + i * 840}" y="${y + 82}" width="620" height="104" rx="18" fill="${palette.white}" stroke="${palette.frame}" stroke-width="2"/>
      <text x="${660 + i * 840}" y="${y + 128}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="31" font-weight="700" fill="${palette.ink}">${esc(box[0])}</text>
      <text x="${660 + i * 840}" y="${y + 168}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.muted}">${esc(box[1])}</text>
    `).join("")}
    <text x="260" y="${y + 220}" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="${palette.muted}">${esc(footer)}</text>
  `;

  const body = `
    <rect x="150" y="255" width="2900" height="1780" rx="32" fill="${palette.white}" stroke="${palette.frame}" stroke-width="2.4" filter="url(#shadow)"/>
    ${layer(320, "#e8eef6", "Layer 1 · GIS Foundation", [["Atlas zoning", "vector park base + 8×8 command grid"], ["Feature engineering", "water, access, threat, travel proxies"], ["Uncertainty tags", "season drift and data confidence"]], "Output: harmonized planning cells with interpretable spatial attributes")}
    ${layer(615, "#e6efe3", "Layer 2 · Spatial Risk Inference", [["Ecological value", "wildlife and water dependence"], ["Threat opportunity", "road-linked poaching exposure"], ["Delay penalty", "response feasibility by station"]], "Output: hotspot quartiles, dominant drivers, and map-based priority surfaces")}
    ${layer(910, "#f3ead8", "Layer 3 · Allocation and Scheduling", [["Route library", "patrol loops from camps and roads"], ["Mixed assets", "fixed sensors + drone windows"], ["Feasibility screen", "hours, shifts, and revisit constraints"]], "Output: deployable patrol portfolio and command schedule")}
    ${layer(1205, "#f0e4e1", "Layer 4 · Dynamic Evaluation", [["Monte Carlo pressure", "illegal entries over 30 days"], ["Detection and dispatch", "signal to interception chain"], ["Staffing floor", "safe operating threshold"]], "Output: PI trajectories, robustness bands, and minimum ranger requirement")}
    ${layer(1500, "#ebe6f3", "Layer 5 · Transfer and Governance", [["Weekly command packet", "maps, routes, and exceptions"], ["Cross-park matrix", "portable core versus local retuning"], ["Review cycle", "feedback to the GIS prior layer"]], "Output: executable management package and transfer rules")}
    <path d="M 1600 568 L 1600 610 M 1600 863 L 1600 905 M 1600 1158 L 1600 1200 M 1600 1453 L 1600 1495" stroke="${palette.ink}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 1600 605 L 1588 587 L 1612 587 Z M 1600 900 L 1588 882 L 1612 882 Z M 1600 1195 L 1588 1177 L 1612 1177 Z M 1600 1490 L 1588 1472 L 1612 1472 Z" fill="${palette.ink}"/>
    <path d="M 2880 1620 C 2950 1620 3000 1380 3000 1110" fill="none" stroke="${palette.muted}" stroke-width="4" stroke-dasharray="14 12"/>
    <path d="M 3000 1110 L 2980 1124 L 2986 1098 Z" fill="${palette.muted}"/>
    <text x="3020" y="1380" transform="rotate(90 3020 1380)" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.muted}">rolling feedback and recalibration</text>
    ${card(232, 1788, 980, 170, "Style Shift", [
      "Inspired by the old TikZ framework figure rather than a web dashboard",
      "Layer colors, arrows, and outputs are now publication-oriented",
    ], { fill: "#f8f6ef", bodySize: 24, titleSize: 30, lineGap: 34 })}
    ${card(1320, 1788, 780, 170, "Decision Rule", [
      "Protect decisive corridors, not the whole park uniformly",
      "Keep GIS diagnosis, allocation, and simulation in one loop",
    ], { fill: "#f8f6ef", bodySize: 24, titleSize: 30, lineGap: 34 })}
    ${card(2140, 1788, 820, 170, "Deliverables", [
      "hotspot atlas · route plan · staffing floor · transfer matrix",
      "all tied back to the same command architecture",
    ], { fill: "#f8f6ef", bodySize: 24, titleSize: 30, lineGap: 34 })}
  `;
  write("fig01_system_architecture.png", body, { canvas });
}

function figure02() {
  const body = `
    ${parkBase()}
    ${gridOverlay("outline")}
    ${hotspotOutline()}
    ${card(2360, 330, 630, 285, "Atlas Legend", [
      "Blue points: waterholes anchoring dry-season wildlife concentration",
      "Red-ring points: ranger camps and command anchors",
      "Green gates: main access points into the park system",
      "A–H × 1–8 grid: analytical planning cells for subsequent models",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
    ${card(2360, 1230, 630, 220, "Grid Design", [
      "64 planning zones · corridor-aware resolution",
      "Map style changed to a vector atlas derived from official geometry",
      "Purpose: cleaner analytical reading before model overlays",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
  `;
  write("fig02_etosha_grid.png", body);
}

function figure03() {
  const riskLegend = legendGradient(2580, 386, 380, "Risk score", riskStops, ["High", "", "", "", "Low"]);
  const body = `
    ${riskLegend.defs}
    ${parkBase()}
    ${gridOverlay("risk")}
    ${hotspotOutline()}
    ${card(2360, 330, 630, 230, "Risk Reading", [
      "Muted heat colors replace the previous bright dashboard palette",
      "Highest-risk cluster remains on the eastern–southern corridor",
      "Map base stays visible, so geography is readable under the model",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
    ${card(2360, 1110, 630, 250, "Top Quartile", [
      "57% of biological value lies in 25% of area",
      "Access + water + delay create the decisive corridor",
      "Western interior remains lower intensity under the baseline prior",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
    ${riskLegend.body}
  `;
  write("fig03_risk_heatmap.png", body);
}

function figure04() {
  const body = `
    ${parkBase()}
    ${gridOverlay("dominant")}
    ${hotspotOutline()}
    ${card(225, 1310, 780, 168, "Ecological concentration", [
      "Green cells are driven mainly by wildlife value and water dependence",
      "These cells require persistent attention even when access is modest",
    ], { fill: "#f7fbf3", bodySize: 24, titleSize: 32, lineGap: 34, stroke: "#d7e2d2" })}
    ${card(1120, 1310, 780, 168, "Access opportunity", [
      "Amber cells are shaped most by roads, gates, and easy approach paths",
      "These corridors carry the strongest displacement and deterrence logic",
    ], { fill: "#fbf6ef", bodySize: 24, titleSize: 32, lineGap: 34, stroke: "#e4d8c2" })}
    ${card(2015, 1310, 780, 168, "Response delay", [
      "Purple cells reflect slower interception from current station geometry",
      "Delay matters most in the eastern pocket where travel distances compound risk",
    ], { fill: "#f6f3fb", bodySize: 24, titleSize: 32, lineGap: 34, stroke: "#dbd3ea" })}
    ${pill(310, 1220, "Ecology", "#dce7d5")}
    ${pill(1205, 1220, "Access", "#e7d2b3")}
    ${pill(2100, 1220, "Delay", "#ded7ee")}
  `;
  write("fig04_risk_decomposition.png", body);
}

function figure05() {
  const body = `
    ${parkBase()}
    ${route(routeFamilies.EastLoop, palette.route, 14)}
    ${route(routeFamilies.SouthLoop, palette.route2, 12)}
    ${route(routeFamilies.WestLoop, palette.route3, 11, "22 12")}
    ${route(routeFamilies.PanArc, palette.purple, 10)}
    ${route(routeFamilies.RapidResponse, palette.red, 10, "16 10")}
    ${card(2325, 330, 670, 345, "Route Portfolio", [
      "East Loop: repeated coverage of the highest-risk corridor",
      "South Loop: reconnects camps with the main waterhole chain",
      "West Loop: low-frequency deterrence and gate linkage",
      "Rapid Response: direct corridor for dispatch reinforcement",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 38 })}
    ${plotLegend(2395, 740, [
      { color: palette.route, label: "East Loop" },
      { color: palette.route2, label: "South Loop" },
      { color: palette.route3, label: "West Loop" },
      { color: palette.purple, label: "Pan Arc" },
      { color: palette.red, label: "Rapid Response" },
    ])}
    ${card(2325, 1108, 670, 250, "Style Change", [
      "Routes are no longer embedded in a dashboard card layout",
      "The map now reads like an atlas plate with a route legend",
      "This is closer to the old manuscript’s diagram language",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
  `;
  write("fig05_patrol_routes.png", body);
}

function figure06() {
  const tierBars = [
    ["Eastern corridor patrol hours", 0.49, palette.blue],
    ["Southern-central patrol hours", 0.31, palette.green],
    ["West+north reserve hours", 0.20, palette.amber],
  ];
  let bars = "";
  tierBars.forEach(([label, value, color], i) => {
    const y = 510 + i * 95;
    bars += `<text x="2240" y="${y - 12}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ink}">${esc(label)}</text>
      <rect x="2240" y="${y}" width="620" height="24" rx="12" fill="#edf1f4"/>
      <rect x="2240" y="${y}" width="${620 * value}" height="24" rx="12" fill="${color}"/>
      <text x="2880" y="${y + 20}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.ink}">${Math.round(value * 100)}%</text>`;
  });

  const body = `
    ${parkBase()}
    ${gridOverlay("tier")}
    ${hotspotOutline()}
    ${card(2200, 330, 760, 130, "Allocation Logic", [
      "Map cells are shaded by final field attention tier after optimization",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34 })}
    ${card(2200, 470, 760, 345, "Patrol-hour split", [], { fill: "#fcfbf7", titleSize: 34 })}
    ${bars}
    ${card(2200, 850, 760, 220, "Monitoring mix", [
      "Fixed devices: 8 high-risk, 3 medium-risk, 1 reserve",
      "Drone sorties: 2 east, 1 south-central, 1 adaptive reserve",
      "Reserve hours retained for weather and incident shocks",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
    ${card(2200, 1095, 760, 230, "Managerial reading", [
      "Eastern patrol weight, hotspot devices, and reserve hours stay visible together",
      "The panel ties numerical balance back to the same spatial plan",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
  `;
  write("fig06_allocation_dashboard.png", body);
}

function figure07() {
  const x0 = 240;
  const y0 = 350;
  const w = 2700;
  const h = 1120;
  const lanes = [
    ["East corridor patrol", palette.blue, [[0, 3.5], [7, 10.5], [15, 19.5]]],
    ["South corridor patrol", palette.green, [[4, 7.5], [12, 15.5], [20, 23]]],
    ["Rapid response reserve", palette.red, [[0, 24]]],
    ["Drone windows", palette.amber, [[6, 8], [16, 18]]],
    ["Control-room sync", palette.purple, [[5.5, 6], [13.5, 14], [21.5, 22]]],
  ];
  const laneH = 150;
  const px = (hr) => x0 + 170 + (hr / 24) * (w - 260);
  let grid = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="24" fill="${palette.white}" stroke="${palette.frame}" stroke-width="2.4" filter="url(#shadow)"/>`;
  for (let hr = 0; hr <= 24; hr += 2) {
    const x = px(hr);
    grid += `<line x1="${x}" y1="${y0 + 110}" x2="${x}" y2="${y0 + h - 80}" stroke="${palette.grid}" stroke-width="2" stroke-dasharray="6 12"/>
      <text x="${x}" y="${y0 + 72}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="${palette.muted}">${String(hr).padStart(2, "0")}:00</text>`;
  }
  const bodyBars = lanes.map((lane, i) => {
    const y = y0 + 135 + i * 185;
    let out = `<text x="${x0 + 34}" y="${y + 48}" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${palette.ink}">${esc(lane[0])}</text>
      <rect x="${x0 + 300}" y="${y}" width="${w - 390}" height="${laneH}" rx="22" fill="#f4f6f7"/>`;
    lane[2].forEach(([a, b]) => {
      out += `<rect x="${px(a)}" y="${y + 20}" width="${px(b) - px(a)}" height="${laneH - 40}" rx="18" fill="${lane[1]}" opacity="${lane[0] === "Rapid response reserve" ? 0.28 : 0.86}"/>`;
    });
    return out;
  }).join("");
  const notes = card(2280, 1510, 690, 170, "Schedule Rationale", [
    "Patrol waves are staggered to preserve detection continuity",
    "Reserve time is explicit instead of hidden in staffing averages",
  ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 });
  write("fig07_schedule_timeline.png", `${grid}${bodyBars}${notes}`);
}

function figure08() {
  const x = 180;
  const y = 330;
  const w = 2860;
  const h = 1180;
  const xs = Array.from({ length: 30 }, (_, i) => i + 1);
  const optimized = xs.map((d) => 0.58 + 0.18 * (1 - Math.exp(-d / 5.3)));
  const optimizedUpper = optimized.map((v) => Math.min(0.83, v + 0.026));
  const optimizedLower = optimized.map((v) => Math.max(0.54, v - 0.026));
  const uniform = xs.map((d) => 0.55 + 0.08 * (1 - Math.exp(-d / 8.2)));
  const uniformUpper = uniform.map((v) => v + 0.018);
  const uniformLower = uniform.map((v) => v - 0.018);
  const sx = (d) => x + 100 + ((d - 1) / 29) * (w - 160);
  const sy = (v) => y + h - 90 - ((v - 0.50) / 0.35) * (h - 190);
  const axis = axisBox(x, y, w, h,
    [1, 5, 10, 15, 20, 25, 30].map((d) => ({ pos: (d - 1) / 29, label: String(d) })),
    [0.50, 0.60, 0.70, 0.80].map((v) => ({ pos: (v - 0.50) / 0.35, label: v.toFixed(2) })),
    "Simulation day",
    "Protection index"
  );
  const body = `
    ${axis}
    <path d="${bandPath(xs, optimizedUpper, optimizedLower, sx, sy)}" fill="${palette.blue}" opacity="0.16"/>
    <path d="${bandPath(xs, uniformUpper, uniformLower, sx, sy)}" fill="${palette.amber}" opacity="0.16"/>
    <path d="${linePath(xs.map((d, i) => [sx(d), sy(optimized[i])]))}" fill="none" stroke="${palette.blue}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${linePath(xs.map((d, i) => [sx(d), sy(uniform[i])]))}" fill="none" stroke="${palette.amber}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="${sx(1)}" y1="${sy(0.75)}" x2="${sx(30)}" y2="${sy(0.75)}" stroke="${palette.red}" stroke-width="4" stroke-dasharray="14 12"/>
    <text x="${sx(24)}" y="${sy(0.75) - 18}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.red}">command target = 0.75</text>
    ${plotLegend(2220, 470, [
      { color: palette.blue, label: "Optimized package" },
      { color: palette.amber, label: "Uniform deployment" },
    ])}
    ${card(2170, 350, 710, 100, "Reading", [
      "Bands show uncertainty envelopes, not just mean paths",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34 })}
  `;
  write("fig08_simulation_results.png", body);
}

function figure09() {
  const x = 180;
  const y = 330;
  const w = 2860;
  const h = 1140;
  const xs = Array.from({ length: 140 }, (_, i) => 0.48 + i * 0.003);
  const gaussian = (xv, m, s, a) => a * Math.exp(-Math.pow(xv - m, 2) / (2 * s * s));
  const optimized = xs.map((v) => gaussian(v, 0.742, 0.030, 4.2) + gaussian(v, 0.695, 0.020, 0.9));
  const uniform = xs.map((v) => gaussian(v, 0.626, 0.036, 3.5) + gaussian(v, 0.692, 0.024, 0.7));
  const reduced = xs.map((v) => gaussian(v, 0.583, 0.032, 2.8) + gaussian(v, 0.645, 0.022, 0.8));
  const yMax = Math.max(...optimized) * 1.15;
  const sx = (v) => x + 100 + ((v - 0.48) / 0.42) * (w - 160);
  const sy = (v) => y + h - 90 - (v / yMax) * (h - 170);
  const axis = axisBox(x, y, w, h,
    [0.50, 0.60, 0.70, 0.80, 0.90].map((v) => ({ pos: (v - 0.48) / 0.42, label: v.toFixed(2) })),
    [0, yMax * 0.25, yMax * 0.50, yMax * 0.75, yMax].map((v) => ({ pos: v / yMax, label: v === 0 ? "0" : v.toFixed(1) })),
    "Protection index",
    "Density"
  );
  const area = (ys, color) => `
    <path d="M ${sx(xs[0])} ${sy(0)} ${ys.map((v, i) => `L ${sx(xs[i])} ${sy(v)}`).join(" ")} L ${sx(xs[xs.length - 1])} ${sy(0)} Z" fill="${color}" opacity="0.16"/>
    <path d="${linePath(xs.map((v, i) => [sx(v), sy(ys[i])]))}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>`;
  const body = `
    ${axis}
    ${area(optimized, palette.blue)}
    ${area(uniform, palette.amber)}
    ${area(reduced, palette.red)}
    ${plotLegend(2150, 425, [
      { color: palette.blue, label: "Optimized package" },
      { color: palette.amber, label: "Uniform deployment" },
      { color: palette.red, label: "Reduced staffing stress" },
    ])}
    ${card(2125, 330, 760, 90, "Distribution shift", [
      "The whole optimized density moves right and thins its low-performance tail",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34 })}
  `;
  write("fig09_robustness_distribution.png", body);
}

function figure10() {
  const body = `
    <rect x="170" y="300" width="2860" height="1220" rx="24" fill="${palette.white}" stroke="${palette.frame}" stroke-width="2.2" filter="url(#shadow)"/>
    <text x="520" y="410" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${palette.muted}">Lower than baseline</text>
    <text x="2430" y="410" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${palette.muted}" text-anchor="end">Higher than baseline</text>
    <line x1="1600" y1="430" x2="1600" y2="1415" stroke="${palette.ink}" stroke-width="3"/>
    ${[
      ["Ranger count", 0.16, 0.11],
      ["Detection quality", 0.10, 0.08],
      ["Patrol interval", 0.07, 0.05],
      ["Fixed devices", 0.04, 0.03],
    ].map(([label, left, right], i) => {
      const y = 560 + i * 210;
      return `
        <text x="640" y="${y + 14}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" font-weight="700" fill="${palette.ink}">${esc(label)}</text>
        <rect x="${1600 - left * 2100}" y="${y - 34}" width="${left * 2100}" height="68" rx="18" fill="${palette.red}" opacity="0.82"/>
        <rect x="1600" y="${y - 34}" width="${right * 2100}" height="68" rx="18" fill="${palette.blue}" opacity="0.82"/>
        <text x="${1600 - left * 2100 - 16}" y="${y + 10}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.muted}">-${left.toFixed(2)}</text>
        <text x="${1600 + right * 2100 + 16}" y="${y + 10}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.muted}">+${right.toFixed(2)}</text>
      `;
    }).join("")}
    ${card(2250, 1170, 640, 220, "Interpretation", [
      "Bar lengths show change in PI under low/high perturbation",
      "The ordering reproduces the main management sensitivity hierarchy",
      "The visual language now matches classical tornado charts",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
  `;
  write("fig10_sensitivity_panels.png", body);
}

function figure11() {
  const rows = [
    ["GIS zoning architecture", "Direct", "Only cell size and park boundary need retuning"],
    ["Risk formula structure", "Direct", "Weights are re-estimated from local ecology and access"],
    ["Route allocation core", "Retune", "Road/river/trail networks must be rebuilt"],
    ["Simulation engine", "Retune", "Detection, delay, and sortie assumptions are local"],
    ["Threat prior", "Rebuild", "Needs local intelligence, incident, and species data"],
  ];
  const statusColor = { Direct: "#dce8d9", Retune: "#ece1c8", Rebuild: "#ead8d8" };
  let table = `<rect x="190" y="330" width="2820" height="1120" rx="24" fill="${palette.white}" stroke="${palette.frame}" stroke-width="2.2" filter="url(#shadow)"/>
    <rect x="220" y="380" width="760" height="86" fill="#eef2f5"/><rect x="980" y="380" width="420" height="86" fill="#eef2f5"/><rect x="1400" y="380" width="1580" height="86" fill="#eef2f5"/>
    <text x="258" y="434" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">Module</text>
    <text x="1018" y="434" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">Status</text>
    <text x="1438" y="434" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">Transfer rule</text>`;
  rows.forEach((row, i) => {
    const y = 466 + i * 172;
    table += `
      <rect x="220" y="${y}" width="760" height="148" fill="${i % 2 ? "#fbfbf8" : "#f6f8fa"}"/>
      <rect x="980" y="${y}" width="420" height="148" fill="${statusColor[row[1]]}"/>
      <rect x="1400" y="${y}" width="1580" height="148" fill="${i % 2 ? "#fbfbf8" : "#f6f8fa"}"/>
      <text x="258" y="${y + 60}" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">${esc(row[0])}</text>
      <text x="1190" y="${y + 82}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">${esc(row[1])}</text>
      <text x="1438" y="${y + 58}" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="${palette.muted}">${esc(row[2])}</text>
    `;
  });
  table += `${pill(2260, 1405, "Direct", "#dce8d9")}${pill(2440, 1405, "Retune", "#ece1c8")}${pill(2650, 1405, "Rebuild", "#ead8d8")}`;
  write("fig11_transferability_matrix.png", table);
}

function figure12() {
  const responseLegend = legendGradient(2580, 386, 380, "Delay", responseStops, ["6h+", "", "", "", "2h"]);
  const slowCells = cells.filter((cell) => cell.responseTime >= 4.5);
  const body = `
    ${responseLegend.defs}
    ${parkBase()}
    ${gridOverlay("response")}
    ${slowCells.map((cell) => `<rect x="${cx(cell.x) + 8}" y="${cy(cell.y) + 8}" width="${cell.w - 16}" height="${cell.h - 16}" rx="12" fill="none" stroke="${palette.red}" stroke-width="3.8"/>`).join("")}
    ${card(2360, 330, 630, 250, "Response reading", [
      "Blue cells indicate faster interception from existing stations",
      "The eastern pocket crosses the 4.5-hour concern threshold",
      "This is the spatial reason delay remains part of the risk score",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
    ${card(2360, 1110, 630, 250, "Map redesign", [
      "Delay is shown through atlas shading, not dashboard isochrone widgets",
      "The same grid is now visually consistent with the risk and allocation maps",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
    ${responseLegend.body}
  `;
  write("fig12_station_response_map.png", body);
}

function figure13() {
  const body = `
    ${parkBase()}
    ${gridOverlay("outline")}
    ${droneSectors.map((sector) => `<path d="${pathFromPoints(shift(sector), true)}" fill="${palette.amber}" fill-opacity="0.18" stroke="${palette.amber}" stroke-width="4" stroke-dasharray="10 8"/>`).join("")}
    ${sensorSites.map(([x, y]) => `
      <rect x="${cx(x) - 12}" y="${cy(y) - 12}" width="24" height="24" rx="5" fill="${palette.blue}" stroke="${palette.white}" stroke-width="3"/>
      <circle cx="${cx(x)}" cy="${cy(y)}" r="70" fill="none" stroke="${palette.blue}" stroke-width="2.2" opacity="0.22"/>
    `).join("")}
    ${card(2290, 330, 700, 250, "Monitoring stack", [
      "Blue squares: fixed sensors placed on persistent hotspots",
      "Amber polygons: drone sectors used for uncertainty reduction",
      "Map styling is calmer so coverage geometry is easier to read",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
    ${plotLegend(2365, 690, [
      { color: palette.blue, label: "Fixed sensors" },
      { color: palette.amber, label: "Drone sectors" },
    ])}
    ${card(2290, 1100, 700, 250, "Deployment logic", [
      "Sensors stay where hotspots persist across weeks",
      "Drones sweep sectors with stronger intelligence uncertainty",
      "Both are layered onto the same corridor-focused atlas base",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34, lineGap: 34 })}
  `;
  write("fig13_sensor_drone_map.png", body);
}

function figure14() {
  const x = 180;
  const y = 320;
  const w = 2860;
  const h = 1150;
  const rangers = Array.from({ length: 25 }, (_, i) => 22 + i);
  const values = rangers.map((r) => 0.54 + 0.22 / (1 + Math.exp(-(r - 33.5) / 2.7)));
  const upper = values.map((v) => Math.min(0.81, v + 0.02));
  const lower = values.map((v) => Math.max(0.52, v - 0.02));
  const sx = (r) => x + 100 + ((r - 22) / 24) * (w - 160);
  const sy = (v) => y + h - 90 - ((v - 0.50) / 0.35) * (h - 170);
  const axis = axisBox(x, y, w, h,
    [22, 26, 30, 34, 38, 42, 46].map((r) => ({ pos: (r - 22) / 24, label: String(r) })),
    [0.50, 0.60, 0.70, 0.80].map((v) => ({ pos: (v - 0.50) / 0.35, label: v.toFixed(2) })),
    "Field rangers",
    "Protection index"
  );
  const body = `
    ${axis}
    <path d="${bandPath(rangers, upper, lower, sx, sy)}" fill="${palette.green}" opacity="0.18"/>
    <path d="${linePath(rangers.map((r, i) => [sx(r), sy(values[i])]))}" fill="none" stroke="${palette.green}" stroke-width="9" stroke-linecap="round"/>
    <line x1="${sx(34)}" y1="${sy(0.50)}" x2="${sx(34)}" y2="${sy(0.80)}" stroke="${palette.red}" stroke-width="4" stroke-dasharray="14 12"/>
    <line x1="${sx(22)}" y1="${sy(0.70)}" x2="${sx(46)}" y2="${sy(0.70)}" stroke="${palette.red}" stroke-width="4" stroke-dasharray="14 12"/>
    <rect x="${sx(34)}" y="${sy(0.70)}" width="${sx(46) - sx(34)}" height="${sy(0.50) - sy(0.70)}" fill="${palette.green}" opacity="0.08"/>
    <text x="${sx(34) + 16}" y="${sy(0.73)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.red}">minimum safe staffing ≈ 34</text>
    ${card(2140, 360, 760, 140, "Threshold interpretation", [
      "Safe region begins once both the 34-ranger floor and PI ≥ 0.70 are met",
    ], { fill: "#fcfbf7", bodySize: 24, titleSize: 34 })}
  `;
  write("fig14_ranger_requirement_curve.png", body);
}

function figure15() {
  const x = 260;
  const y = 320;
  const w = 2500;
  const h = 1180;
  const rangerLevels = [24, 28, 32, 36, 40, 44];
  const detectLevels = [0.35, 0.40, 0.45, 0.50, 0.55, 0.60];
  const pi = (r, d) => Math.max(0.52, Math.min(0.84, 0.43 + 0.0072 * r + 0.62 * (d - 0.35)));
  const cellW = w / rangerLevels.length;
  const cellH = h / detectLevels.length;
  const sx = (i) => x + i * cellW;
  const sy = (j) => y + j * cellH;
  let heat = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="${palette.white}" stroke="${palette.frame}" stroke-width="2.2" filter="url(#shadow)"/>`;
  detectLevels.forEach((d, j) => {
    rangerLevels.forEach((r, i) => {
      const value = (pi(r, d) - 0.52) / 0.32;
      heat += `<rect x="${sx(i)}" y="${sy(detectLevels.length - 1 - j)}" width="${cellW}" height="${cellH}" fill="${rampColor(riskStops, value)}" fill-opacity="0.84" stroke="${palette.white}" stroke-width="2.2"/>`;
      heat += `<text x="${sx(i) + cellW / 2}" y="${sy(detectLevels.length - 1 - j) + cellH / 2 + 10}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${value > 0.58 ? "#fff9ed" : palette.ink}">${pi(r, d).toFixed(2)}</text>`;
    });
  });
  rangerLevels.forEach((r, i) => {
    heat += `<text x="${sx(i) + cellW / 2}" y="${y + h + 46}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="${palette.ink}">${r}</text>`;
  });
  detectLevels.forEach((d, j) => {
    heat += `<text x="${x - 28}" y="${sy(detectLevels.length - 1 - j) + cellH / 2 + 10}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="${palette.ink}">${d.toFixed(2)}</text>`;
  });
  heat += `
    <text x="${x + w / 2}" y="${y + h + 92}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">Field rangers</text>
    <text x="${x - 130}" y="${y + h / 2}" transform="rotate(-90 ${x - 130} ${y + h / 2})" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">Detection baseline</text>
    <rect x="${sx(2)}" y="${sy(2)}" width="${cellW * 4}" height="${cellH * 3}" fill="none" stroke="${palette.blue}" stroke-width="5" stroke-dasharray="18 12"/>
  `;
  const legend = legendGradient(2880, 430, 420, "PI", riskStops, ["0.84", "", "", "", "0.52"]);
  const body = `
    ${legend.defs}
    ${heat}
    ${card(2840, 330, 280, 84, "Robust region", ["PI ≥ 0.70"], { fill: "#fcfbf7", bodySize: 24, titleSize: 28 })}
    ${card(2820, 930, 320, 260, "Interpretation", [
      "Cells inside the dashed box remain inside the safe operating region",
      "This matrix replaces the older dashboard-style stress panel with a manuscript heatmap",
    ], { fill: "#fcfbf7", bodySize: 22, titleSize: 32, lineGap: 32 })}
    ${legend.body}
  `;
  write("fig15_scenario_matrix.png", body);
}

function cleanGeneratedSvgs() {
  const replacements = [
    [/Layer 1[^<]*GIS Foundation/g, "Layer 1: GIS Foundation"],
    [/Layer 2[^<]*Spatial Risk Inference/g, "Layer 2: Spatial Risk Inference"],
    [/Layer 3[^<]*Allocation and Scheduling/g, "Layer 3: Allocation and Scheduling"],
    [/Layer 4[^<]*Dynamic Evaluation/g, "Layer 4: Dynamic Evaluation"],
    [/Layer 5[^<]*Transfer and Governance/g, "Layer 5: Transfer and Governance"],
    [/vector park base \+ 8[^<]* command grid/g, "vector park base + 8x8 command grid"],
    [/Style Shift/g, "Command logic"],
    [/Inspired by the old TikZ framework figure rather than a web dashboard/g, "Each layer adds one management decision before handing outputs downward"],
    [/Layer colors, arrows, and outputs are now publication-oriented/g, "Maps, schedules, staffing, and transfer rules remain inside one framework"],
    [/hotspot atlas[^<]*transfer matrix/g, "hotspot atlas, route plan, staffing floor, and transfer matrix"],
    [/<text x="2394" y="540"[^>]*>[^<]*grid: analytical planning cells for subsequent models<\/text>/g, '<text x="2394" y="540" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="#6a7682">A-H x 1-8 grid: analytical planning cells for subsequent models</text>'],
    [/64 planning zones[^<]*corridor-aware resolution/g, "64 planning zones with corridor-aware resolution"],
    [/Map style changed to a vector atlas derived from official geometry/g, "Command anchors, access points, and waterholes share one base map"],
    [/Purpose: cleaner analytical reading before model overlays/g, "The same grid supports risk, allocation, and simulation layers"],
    [/Muted heat colors replace the previous bright dashboard palette/g, "Highest values cluster on the eastern-southern corridor"],
    [/Highest-risk cluster remains on the eastern[^<]*corridor/g, "Muted color steps preserve geographic context under the overlay"],
    [/Map base stays visible, so geography is readable under the model/g, "The hotspot remains interpretable relative to roads and camps"],
    [/Style Change/g, "Route Logic"],
    [/Routes are no longer embedded in a dashboard card layout/g, "East and south loops receive the most recurrent patrol pressure"],
    [/The map now reads like an atlas plate with a route legend/g, "Rapid-response links shorten reinforcement time to hotspot cells"],
    [/This is closer to the old manuscript[^<]*/g, "The legend separates persistent loops from dispatch corridors"],
    [/Map redesign/g, "Operational implication"],
    [/Delay is shown through atlas shading, not dashboard isochrone widgets/g, "Delay shading marks the cells least reachable within the response target"],
    [/The same grid is now visually consistent with the risk and allocation maps/g, "These cells need added patrol recurrence or sensor support"],
    [/minimum safe staffing[^<]*/g, "minimum safe staffing >= 34"],
    [/Safe region begins once both the 34-ranger floor and PI[^<]*/g, "Safe region begins once both the 34-ranger floor and PI >= 0.70 are met"],
    [/PI [^<]*0\.70/g, "PI >= 0.70"],
    [/This matrix replaces the older dashboard-style stress panel with a manuscript heatmap/g, "Joint staffing and detection shortfalls push the system outside that box"],
  ];

  fs.readdirSync(SRC)
    .filter((file) => file.endsWith(".svg"))
    .forEach((file) => {
      const target = path.join(SRC, file);
      let content = fs.readFileSync(target, "utf8");
      replacements.forEach(([pattern, replacement]) => {
        content = content.replace(pattern, replacement);
      });
      fs.writeFileSync(target, content);
    });
}

figure01();
figure02();
figure03();
figure04();
figure05();
figure06();
figure07();
figure08();
figure09();
figure10();
figure11();
figure12();
figure13();
figure14();
figure15();
cleanGeneratedSvgs();

console.log("Atlas-style publication figures regenerated.");
