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
  paper: "#eef1ee",
  paperShade: "#dfe6e1",
  salt: "#f7f9f6",
  white: "#ffffff",
  ink: "#1f2d36",
  ash: "#60717d",
  line: "#bcc8c3",
  sand: "#d7ccb2",
  dune: "#bda171",
  pan: "#e7dfcf",
  corridor: "#cbb07d",
  moss: "#78896a",
  sage: "#567568",
  indigo: "#35556c",
  sky: "#79a6bf",
  water: "#487b9c",
  gold: "#bc8531",
  clay: "#a35d43",
  rust: "#8c4338",
  plum: "#6d617e",
  teal: "#2f6d75",
  safe: "#dce9dd",
  warn: "#edd7a2",
};

const meta = {
  "fig01_system_architecture.png": { tag: "OPERATING SYSTEM", accent: palette.indigo, title: "Protected-Area Operating System", subtitle: "Digital twin, controller, stress test, and governance feedback in one closed loop" },
  "fig02_etosha_grid.png": { tag: "DIGITAL TWIN", accent: palette.sage, title: "Etosha Digital Twin and Command Grid", subtitle: "The park is encoded as a corridor-aware control mesh with station geometry and mobility structure" },
  "fig03_risk_heatmap.png": { tag: "PRIORITY FIELD", accent: palette.rust, title: "Priority Field and Corridor Gradient", subtitle: "Etosha risk appears as a corridor-shaped service deficit rather than a flat hotspot cloud" },
  "fig04_risk_decomposition.png": { tag: "RISK STACK", accent: palette.gold, title: "Consequence, Exposure, and Friction", subtitle: "The priority field is decomposed into ecological consequence, access exposure, and response friction" },
  "fig05_patrol_routes.png": { tag: "DEFENDER NETWORK", accent: palette.indigo, title: "Controller-Selected Patrol Network", subtitle: "Patrol families are organized as repeatable service loops rather than nominal route sketches" },
  "fig06_allocation_dashboard.png": { tag: "CONTROL LEDGER", accent: palette.clay, title: "Control Ledger from Assets to Sectors", subtitle: "Manpower, fixed watch, and UAV effort are translated into sector-level service commitments" },
  "fig07_schedule_timeline.png": { tag: "DAILY CONTROL", accent: palette.teal, title: "Twenty-Four-Hour Control Cycle", subtitle: "Patrol departures, fixed watch, and UAV surge windows are staged as a continuous operating rhythm" },
  "fig08_simulation_results.png": { tag: "STATE TRAJECTORY", accent: palette.indigo, title: "Closed-Loop Protection Trajectory", subtitle: "Threshold crossing and stabilization matter more than a simple before-versus-after comparison" },
  "fig09_robustness_distribution.png": { tag: "TAIL RESILIENCE", accent: palette.rust, title: "Robustness Envelope and Tail Risk", subtitle: "The operating system is judged by both mean performance and low-tail protection resilience" },
  "fig10_sensitivity_panels.png": { tag: "STRESS TEST", accent: palette.gold, title: "Stress-Test Ranking of Control Levers", subtitle: "Staffing, detection, cadence, and devices are compared by their effect on the safe operating envelope" },
  "fig11_transferability_matrix.png": { tag: "TRANSFER PROTOCOL", accent: palette.plum, title: "Transfer Protocol Across Parks", subtitle: "Portable core modules are separated from the layers that require local rebuilding or retuning" },
  "fig12_station_response_map.png": { tag: "FRICTION SURFACE", accent: palette.sky, title: "Response Friction and Delay Pocket", subtitle: "Station geometry creates asymmetric service reliability across the Etosha corridor" },
  "fig13_sensor_drone_map.png": { tag: "LAYERED WATCH", accent: palette.teal, title: "Layered Sensor-UAV Watch Plan", subtitle: "Persistent fixed coverage and adaptive aerial surge are shown as complementary surveillance layers" },
  "fig14_ranger_requirement_curve.png": { tag: "STAFFING BREAKPOINT", accent: palette.sage, title: "Ranger Floor and Stability Regimes", subtitle: "The staffing curve marks the boundary between fragile, transitional, and stable protection" },
  "fig15_scenario_matrix.png": { tag: "SAFE ENVELOPE", accent: palette.clay, title: "Safe Operating Envelope", subtitle: "Iso-protection contours reveal the stability frontier in the manpower-detection plane" },
  "fig16_controller_architecture.png": { tag: "ALGORITHM STACK", accent: palette.indigo, title: "Controller Architecture and Constraint Stack", subtitle: "The allocation engine is decomposed into inputs, guard rails, optimization core, and deployable outputs" },
  "fig17_feedback_architecture.png": { tag: "FEEDBACK LOOP", accent: palette.teal, title: "Closed-Loop Simulation and Prior Update", subtitle: "Arrival generation, detection, dispatch, outcome evaluation, and posterior refresh are shown as one operating circuit" },
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
  { t: 0.00, rgb: [247, 241, 223] },
  { t: 0.25, rgb: [227, 208, 162] },
  { t: 0.50, rgb: [205, 164, 105] },
  { t: 0.75, rgb: [176, 113, 71] },
  { t: 1.00, rgb: [143, 70, 55] },
];

const responseStops = [
  { t: 0.00, rgb: [223, 233, 239] },
  { t: 0.25, rgb: [184, 207, 220] },
  { t: 0.50, rgb: [134, 170, 194] },
  { t: 0.75, rgb: [91, 132, 170] },
  { t: 1.00, rgb: [60, 92, 122] },
];

function esc(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function figNo(name) {
  const match = name.match(/fig(\d{2})/);
  return match ? `FIG. ${match[1]}` : "FIG.";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function rgbToString(rgb) {
  return `rgb(${rgb.map((value) => Math.round(value)).join(",")})`;
}

function rampColor(stops, value) {
  const v = clamp(value, 0, 1);
  if (v <= stops[0].t) return rgbToString(stops[0].rgb);
  for (let index = 1; index < stops.length; index += 1) {
    if (v <= stops[index].t) {
      const left = stops[index - 1];
      const right = stops[index];
      const local = (v - left.t) / (right.t - left.t);
      return rgbToString([
        lerp(left.rgb[0], right.rgb[0], local),
        lerp(left.rgb[1], right.rgb[1], local),
        lerp(left.rgb[2], right.rgb[2], local),
      ]);
    }
  }
  return rgbToString(stops[stops.length - 1].rgb);
}

function pathFromPoints(points, close = false) {
  return `${points.map(([x, y], index) => `${index ? "L" : "M"} ${x} ${y}`).join(" ")}${close ? " Z" : ""}`;
}

function shift(points, dx = MAP_SHIFT.x, dy = MAP_SHIFT.y) {
  return points.map(([x, y]) => [x + dx, y + dy]);
}

function cx(x) { return x + MAP_SHIFT.x; }
function cy(y) { return y + MAP_SHIFT.y; }

function linePath(points) {
  return points.map(([x, y], index) => `${index ? "L" : "M"} ${x} ${y}`).join(" ");
}

function bandPath(xs, upper, lower, sx, sy) {
  const first = `M ${sx(xs[0])} ${sy(lower[0])}`;
  const top = upper.map((value, index) => `L ${sx(xs[index])} ${sy(value)}`).join(" ");
  const bottom = lower.slice().reverse().map((value, reverseIndex) => {
    const index = xs.length - 1 - reverseIndex;
    return `L ${sx(xs[index])} ${sy(value)}`;
  }).join(" ");
  return `${first} ${top} ${bottom} Z`;
}

function gaussian(x, mu, sigma) {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z);
}

function polar(cx0, cy0, radius, degrees) {
  const angle = ((degrees - 90) * Math.PI) / 180;
  return [cx0 + radius * Math.cos(angle), cy0 + radius * Math.sin(angle)];
}

function arcBand(cx0, cy0, r0, r1, startDeg, endDeg) {
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const [x1, y1] = polar(cx0, cy0, r1, startDeg);
  const [x2, y2] = polar(cx0, cy0, r1, endDeg);
  const [x3, y3] = polar(cx0, cy0, r0, endDeg);
  const [x4, y4] = polar(cx0, cy0, r0, startDeg);
  return [`M ${x1} ${y1}`, `A ${r1} ${r1} 0 ${large} 1 ${x2} ${y2}`, `L ${x3} ${y3}`, `A ${r0} ${r0} 0 ${large} 0 ${x4} ${y4}`, "Z"].join(" ");
}

function dossierBoard(x = 58, y = 236, w = 3084, h = 1502) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${palette.salt}" stroke="${palette.line}" stroke-width="2.3" filter="url(#shadow)"/>
    <rect x="${x + 16}" y="${y + 16}" width="${w - 32}" height="${h - 32}" rx="28" fill="#f8f3ea" stroke="#dad3c4" stroke-width="1.5"/>
  `;
}

function headerRule(x, y, w, accent) {
  return `<rect x="${x}" y="${y}" width="${w}" height="7" rx="4" fill="${accent}"/><rect x="${x}" y="${y + 10}" width="${w * 0.66}" height="2" rx="1" fill="${palette.line}"/>`;
}

function tagPill(x, y, text, fill, color = palette.ink, width = null) {
  const computed = width || Math.max(176, text.length * 14 + 34);
  return `
    <rect x="${x}" y="${y}" width="${computed}" height="42" rx="21" fill="${fill}" stroke="${fill}" stroke-width="1.2"/>
    <text x="${x + computed / 2}" y="${y + 28}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="2" fill="${color}">${esc(text)}</text>
  `;
}

function panel(x, y, w, h, title, lines, opts = {}) {
  const accent = opts.accent || palette.indigo;
  const fill = opts.fill || palette.white;
  const bodyColor = opts.bodyColor || palette.ash;
  const titleSize = opts.titleSize || 34;
  const bodySize = opts.bodySize || 24;
  const lineGap = opts.lineGap || bodySize + 12;
  const radius = opts.radius || 24;
  const titleY = y + 58;
  const bodyStart = title ? y + 106 : y + 58;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/>
    <rect x="${x}" y="${y}" width="${w}" height="12" rx="${radius}" fill="${accent}" opacity="0.92"/>
    ${title ? `<text x="${x + 26}" y="${titleY}" font-family="Helvetica Neue, Arial, sans-serif" font-size="${titleSize}" font-weight="700" fill="${palette.ink}">${esc(title)}</text>` : ""}
    ${lines.map((line, index) => `<text x="${x + 26}" y="${bodyStart + index * lineGap}" font-family="Helvetica Neue, Arial, sans-serif" font-size="${bodySize}" fill="${bodyColor}">${esc(line)}</text>`).join("")}
  `;
}

function smallMetric(x, y, w, title, value, detail, accent) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="118" rx="20" fill="${palette.white}" stroke="${palette.line}" stroke-width="1.8"/>
    <rect x="${x}" y="${y}" width="${w}" height="10" rx="20" fill="${accent}"/>
    <text x="${x + 22}" y="${y + 44}" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" fill="${palette.ash}">${esc(title)}</text>
    <text x="${x + 22}" y="${y + 86}" font-family="Helvetica Neue, Arial, sans-serif" font-size="42" font-weight="700" fill="${palette.ink}">${esc(value)}</text>
    <text x="${x + w - 22}" y="${y + 86}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ash}">${esc(detail)}</text>
  `;
}

function road(points, opts = {}) {
  const shifted = shift(points);
  const d = pathFromPoints(shifted);
  return `<path d="${d}" fill="none" stroke="${opts.base || "#efe7da"}" stroke-width="${opts.baseWidth || 16}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${opts.top || "#8b7868"}" stroke-width="${opts.topWidth || 6}" stroke-linecap="round" stroke-linejoin="round" ${opts.dash ? `stroke-dasharray="${opts.dash}"` : ""}/>`;
}

function route(points, color, width = 12, dash = "") {
  const d = pathFromPoints(shift(points));
  return `<path d="${d}" fill="none" stroke="${palette.salt}" stroke-width="${width + 8}" stroke-linecap="round" stroke-linejoin="round" opacity="0.88"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
}

function drawWaterholes(opacity = 0.92) {
  return waterholes.map(([x, y]) => `<circle cx="${cx(x)}" cy="${cy(y)}" r="7" fill="${palette.water}" fill-opacity="${opacity}" stroke="${palette.salt}" stroke-width="2"/>`).join("");
}

function drawCamps(showNames = true) {
  return Object.entries(camps).map(([name, [x, y]]) => `
    <rect x="${cx(x) - 15}" y="${cy(y) - 15}" width="30" height="30" rx="8" fill="${palette.salt}" stroke="${palette.rust}" stroke-width="4"/>
    <circle cx="${cx(x)}" cy="${cy(y)}" r="5.5" fill="${palette.rust}"/>
    ${showNames ? `<rect x="${cx(x) + 22}" y="${cy(y) - 20}" width="${name.length * 18 + 28}" height="38" rx="11" fill="${palette.salt}" stroke="${palette.line}" stroke-width="1.4"/><text x="${cx(x) + 38}" y="${cy(y) + 6}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.ink}">${esc(name)}</text>` : ""}
  `).join("");
}

function drawGates(showNames = true) {
  return Object.entries(gates).map(([name, [x, y]]) => `
    <path d="M ${cx(x)} ${cy(y) - 16} L ${cx(x) + 16} ${cy(y)} L ${cx(x)} ${cy(y) + 16} L ${cx(x) - 16} ${cy(y)} Z" fill="#edf4eb" stroke="${palette.sage}" stroke-width="3.2"/>
    ${showNames ? `<text x="${cx(x) + 22}" y="${cy(y) + 7}" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ink}">${esc(name)}</text>` : ""}
  `).join("");
}

function northArrow(x = 2890, y = 332) {
  return `<g><line x1="${x}" y1="${y + 70}" x2="${x}" y2="${y}" stroke="${palette.ink}" stroke-width="4"/><path d="M ${x - 13} ${y + 24} L ${x} ${y} L ${x + 13} ${y + 24} Z" fill="${palette.ink}"/><text x="${x}" y="${y - 14}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" font-weight="700" fill="${palette.ink}">N</text></g>`;
}

function scaleBar(x = 2502, y = 1478) {
  return `<g><rect x="${x}" y="${y}" width="220" height="16" rx="3" fill="${palette.ink}"/><rect x="${x + 110}" y="${y}" width="110" height="16" fill="${palette.salt}" stroke="${palette.ink}" stroke-width="1.8"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y + 27}" stroke="${palette.ink}" stroke-width="2.4"/><line x1="${x + 110}" y1="${y}" x2="${x + 110}" y2="${y + 27}" stroke="${palette.ink}" stroke-width="2.4"/><line x1="${x + 220}" y1="${y}" x2="${x + 220}" y2="${y + 27}" stroke="${palette.ink}" stroke-width="2.4"/><text x="${x}" y="${y + 54}" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ink}">0</text><text x="${x + 99}" y="${y + 54}" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ink}">25</text><text x="${x + 203}" y="${y + 54}" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ink}">50 km</text></g>`;
}

function contourLines() {
  const lines = [
    `M ${cx(170)} ${cy(1000)} C ${cx(700)} ${cy(880)} ${cx(1500)} ${cy(910)} ${cx(2820)} ${cy(620)}`,
    `M ${cx(190)} ${cy(860)} C ${cx(780)} ${cy(760)} ${cx(1520)} ${cy(730)} ${cx(2790)} ${cy(545)}`,
    `M ${cx(250)} ${cy(680)} C ${cx(820)} ${cy(610)} ${cx(1510)} ${cy(540)} ${cx(2770)} ${cy(440)}`,
    `M ${cx(300)} ${cy(480)} C ${cx(860)} ${cy(430)} ${cx(1580)} ${cy(360)} ${cx(2720)} ${cy(330)}`,
  ];
  return lines.map((d, index) => `<path d="${d}" fill="none" stroke="${index % 2 === 0 ? "#d9cfbb" : "#e4dbc9"}" stroke-width="${index === 0 ? 5 : 3.4}" opacity="${index === 0 ? 0.55 : 0.48}" stroke-dasharray="${index % 2 === 0 ? "16 12" : "8 14"}"/>`).join("");
}

function corridorRibbon() {
  const upper = `M ${cx(200)} ${cy(820)} C ${cx(780)} ${cy(700)} ${cx(1480)} ${cy(730)} ${cx(2760)} ${cy(535)}`;
  const lower = `M ${cx(200)} ${cy(1025)} C ${cx(840)} ${cy(940)} ${cx(1540)} ${cy(895)} ${cx(2790)} ${cy(650)}`;
  return `<path d="${upper}" fill="none" stroke="${palette.corridor}" stroke-width="68" opacity="0.55" stroke-linecap="round"/><path d="${lower}" fill="none" stroke="${palette.corridor}" stroke-width="38" opacity="0.36" stroke-linecap="round"/>`;
}

function gridLabels() {
  const letters = "ABCDEFGH".split("");
  let output = "";
  const cellW = extent.w / 8;
  const cellH = extent.h / 8;
  letters.forEach((letter, index) => {
    output += `<text x="${cx(extent.x + cellW * (index + 0.5))}" y="${cy(extent.y) - 14}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" font-weight="700" fill="${palette.ash}">${letter}</text>`;
  });
  Array.from({ length: 8 }, (_, index) => index + 1).forEach((number, index) => {
    output += `<text x="${cx(extent.x) - 18}" y="${cy(extent.y + cellH * (index + 0.58))}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" font-weight="700" fill="${palette.ash}">${number}</text>`;
  });
  return output;
}

function mapField(opts = {}) {
  const showNames = opts.showNames !== false;
  const showCompass = opts.showCompass !== false;
  const showScale = opts.showScale !== false;
  const showCorridorLabel = opts.showCorridorLabel !== false;
  const showGrid = opts.showGridLabels === true;
  const park = pathFromPoints(shift(parkOutline), true);
  const pan = pathFromPoints(shift(panOutline), true);
  return `
    <rect x="88" y="242" width="3024" height="1298" rx="28" fill="#efe8db" stroke="${palette.line}" stroke-width="1.6"/>
    <path d="${park}" fill="${palette.sand}" stroke="none"/>
    <path d="${pathFromPoints(shift(veget1), true)}" fill="#cfd6be" opacity="0.88"/>
    <path d="${pathFromPoints(shift(veget2), true)}" fill="#c9d1ba" opacity="0.88"/>
    <path d="${pathFromPoints(shift(veget3), true)}" fill="#ced7c1" opacity="0.88"/>
    <path d="${pan}" fill="${palette.pan}" opacity="0.96"/>
    ${contourLines()}
    ${corridorRibbon()}
    <path d="${park}" fill="none" stroke="${palette.ink}" stroke-width="4.2"/>
    ${road(trunkRoad, { baseWidth: 16, topWidth: 6.5, top: "#826f61" })}
    ${road(panRoad, { baseWidth: 14, topWidth: 5.5, top: "#978474" })}
    ${road(northRoad, { baseWidth: 14, topWidth: 5.5, top: "#978474", dash: "14 10" })}
    ${road(westLink, { baseWidth: 14, topWidth: 5.5, top: "#978474" })}
    ${drawWaterholes()}
    ${drawCamps(showNames)}
    ${drawGates(showNames)}
    <text x="${cx(1710)}" y="${cy(428)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="42" font-weight="700" fill="#8f8675">Etosha Pan</text>
    ${showCorridorLabel ? `<text x="${cx(840)}" y="${cy(990)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" fill="${palette.ash}">southern operations corridor</text>` : ""}
    ${showGrid ? gridLabels() : ""}
    ${showCompass ? northArrow() : ""}
    ${showScale ? scaleBar() : ""}
  `;
}

function riskCellData() {
  const cells0 = [];
  const cellW = extent.w / 8;
  const cellH = extent.h / 8;
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const x = extent.x + col * cellW;
      const y = extent.y + row * cellH;
      const midX = x + cellW / 2;
      const midY = y + cellH / 2;
      const east = col / 7;
      const southCorridor = Math.exp(-Math.pow((midY - 760) / 190, 2));
      const panInfluence = Math.exp(-Math.pow((midX - 1800) / 620, 2) - Math.pow((midY - 400) / 250, 2));
      const gateInfluence = Math.exp(-Math.pow((midX - 2700) / 330, 2)) + 0.7 * Math.exp(-Math.pow((midX - 1650) / 420, 2) - Math.pow((midY - 1040) / 210, 2));
      const waterInfluence = Math.max(...waterholes.map(([wx, wy]) => Math.exp(-Math.pow((midX - wx) / 270, 2) - Math.pow((midY - wy) / 220, 2))));
      const ecology = 0.52 * waterInfluence + 0.30 * panInfluence + 0.18 * (1 - row / 7);
      const access = 0.45 * east + 0.30 * southCorridor + 0.25 * Math.min(1, gateInfluence);
      const nearestCamp = Math.min(...Object.values(camps).map(([campX, campY]) => Math.hypot(midX - campX, midY - campY)));
      const responseTime = Math.max(1.8, Math.min(6.3, 1.55 + nearestCamp / 360 + 0.75 * east));
      const delay = (responseTime - 1.8) / 4.5;
      const risk = 0.48 * ecology + 0.30 * access + 0.22 * delay;
      const dominant = [["Ecology", ecology], ["Access", access], ["Delay", delay]].sort((left, right) => right[1] - left[1])[0][0];
      cells0.push({ row, col, x, y, w: cellW, h: cellH, ecology, access, delay, responseTime, risk, dominant });
    }
  }
  const sorted = [...cells0].sort((left, right) => right.risk - left.risk);
  const cutoff = sorted[Math.floor(sorted.length * 0.25) - 1].risk;
  cells0.forEach((cell) => {
    cell.hot = cell.risk >= cutoff;
  });
  return cells0;
}

const cells = riskCellData();

function cellRect(cell, fill, opacity = 1, stroke = palette.salt, strokeOpacity = 0.7, strokeWidth = 1.4) {
  return `<rect x="${cx(cell.x)}" y="${cy(cell.y)}" width="${cell.w}" height="${cell.h}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-opacity="${strokeOpacity}" stroke-width="${strokeWidth}"/>`;
}

function meshOverlay(mode = "outline") {
  let output = "";
  cells.forEach((cell) => {
    if (mode === "outline") {
      output += cellRect(cell, "none", 1, "#efe9da", 1, 1.6);
    } else if (mode === "risk") {
      output += cellRect(cell, rampColor(riskStops, cell.risk), 0.66, palette.salt, 0.6, 1.2);
    } else if (mode === "tier") {
      const fill = cell.hot ? palette.rust : cell.risk > 0.48 ? palette.warn : "#d7e0de";
      output += cellRect(cell, fill, cell.hot ? 0.54 : 0.38, palette.salt, 0.6, 1.2);
    } else if (mode === "ecology") {
      output += cellRect(cell, rampColor([{ t: 0, rgb: [228, 239, 221] }, { t: 1, rgb: [108, 139, 104] }], cell.ecology), 0.7, palette.salt, 0.55, 1.2);
    } else if (mode === "access") {
      output += cellRect(cell, rampColor([{ t: 0, rgb: [244, 235, 213] }, { t: 1, rgb: [191, 129, 72] }], cell.access), 0.7, palette.salt, 0.55, 1.2);
    } else if (mode === "delay") {
      output += cellRect(cell, rampColor([{ t: 0, rgb: [230, 228, 241] }, { t: 1, rgb: [118, 104, 150] }], cell.delay), 0.72, palette.salt, 0.55, 1.2);
    } else if (mode === "response") {
      const value = (cell.responseTime - 1.8) / 4.5;
      output += cellRect(cell, rampColor(responseStops, value), 0.70, palette.salt, 0.55, 1.2);
    }
  });
  output += `<rect x="${cx(extent.x)}" y="${cy(extent.y)}" width="${extent.w}" height="${extent.h}" fill="none" stroke="${palette.ink}" stroke-width="2.4"/>`;
  return output;
}

function hotspotOutline() {
  return cells.filter((cell) => cell.hot).map((cell) => `<rect x="${cx(cell.x) + 8}" y="${cy(cell.y) + 8}" width="${cell.w - 16}" height="${cell.h - 16}" rx="14" fill="none" stroke="#fff5d9" stroke-width="3.2" stroke-dasharray="9 8"/>`).join("");
}

function legendRamp(x, y, w, h, title, stops, labels, horizontal = false) {
  const id = `legend_${x}_${y}_${w}_${h}`.replace(/[^\w]/g, "_");
  const defs = horizontal
    ? `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">${stops.map((stop) => `<stop offset="${stop.t * 100}%" stop-color="${rgbToString(stop.rgb)}"/>`).join("")}</linearGradient>`
    : `<linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0">${stops.map((stop) => `<stop offset="${stop.t * 100}%" stop-color="${rgbToString(stop.rgb)}"/>`).join("")}</linearGradient>`;
  const body = horizontal
    ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="url(#${id})" stroke="${palette.line}" stroke-width="1.4"/><text x="${x}" y="${y - 16}" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="700" fill="${palette.ink}">${esc(title)}</text>${labels.map((label, index) => `<text x="${x + (w * index) / (labels.length - 1)}" y="${y + h + 28}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" fill="${palette.ash}">${esc(label)}</text>`).join("")}`
    : `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" fill="url(#${id})" stroke="${palette.line}" stroke-width="1.4"/><text x="${x - 2}" y="${y - 14}" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="700" fill="${palette.ink}">${esc(title)}</text>${labels.map((label, index) => `<text x="${x + w + 18}" y="${y + h - (h * index) / (labels.length - 1) + 7}" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" fill="${palette.ash}">${esc(label)}</text>`).join("")}`;
  return { defs, body };
}

function axisFrame(x, y, w, h, xTicks, yTicks, xLabel, yLabel) {
  let output = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${palette.white}" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/>`;
  yTicks.forEach((tick) => {
    const py = y + h - 80 - tick.pos * (h - 140);
    output += `<line x1="${x + 96}" y1="${py}" x2="${x + w - 44}" y2="${py}" stroke="#d9dedf" stroke-width="1.7" stroke-dasharray="5 9"/><text x="${x + 78}" y="${py + 8}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ash}">${esc(tick.label)}</text>`;
  });
  xTicks.forEach((tick) => {
    const px = x + 96 + tick.pos * (w - 140);
    output += `<line x1="${px}" y1="${y + 50}" x2="${px}" y2="${y + h - 80}" stroke="#e2e5e6" stroke-width="1.5" stroke-dasharray="5 11"/><text x="${px}" y="${y + h - 26}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ash}">${esc(tick.label)}</text>`;
  });
  output += `<line x1="${x + 96}" y1="${y + h - 80}" x2="${x + w - 44}" y2="${y + h - 80}" stroke="${palette.ink}" stroke-width="2.6"/><line x1="${x + 96}" y1="${y + 50}" x2="${x + 96}" y2="${y + h - 80}" stroke="${palette.ink}" stroke-width="2.6"/><text x="${x + w / 2}" y="${y + h - 2}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="27" font-weight="700" fill="${palette.ink}">${esc(xLabel)}</text><text x="${x + 22}" y="${y + h / 2}" transform="rotate(-90 ${x + 22} ${y + h / 2})" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="27" font-weight="700" fill="${palette.ink}">${esc(yLabel)}</text>`;
  return output;
}

function miniMapPanel(id, x, y, w, h, title, accent, overlay, footnote) {
  const clipId = `clip_${id}`;
  const sceneX = 88;
  const sceneY = 242;
  const sceneW = 3024;
  const sceneH = 1298;
  const scale = Math.min((w - 36) / sceneW, (h - 104) / sceneH);
  const tx = x + (w - sceneW * scale) / 2 - sceneX * scale;
  const ty = y + 70 + (h - 104 - sceneH * scale) / 2 - sceneY * scale;
  return `
    <defs><clipPath id="${clipId}"><rect x="${x + 18}" y="${y + 62}" width="${w - 36}" height="${h - 114}" rx="18"/></clipPath></defs>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${palette.white}" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/>
    <rect x="${x}" y="${y}" width="${w}" height="12" rx="26" fill="${accent}"/>
    <text x="${x + 24}" y="${y + 48}" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">${esc(title)}</text>
    <g clip-path="url(#${clipId})" transform="translate(${tx} ${ty}) scale(${scale})">
      ${mapField({ showNames: false, showCompass: false, showScale: false, showCorridorLabel: false })}
      ${overlay}
    </g>
    <text x="${x + 24}" y="${y + h - 24}" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" fill="${palette.ash}">${esc(footnote)}</text>
  `;
}

function bezierConnector(x1, y1, x2, y2, width, color, opacity = 0.72) {
  const cx1 = lerp(x1, x2, 0.38);
  const cx2 = lerp(x1, x2, 0.68);
  return `<path d="M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="${opacity}"/>`;
}

function write(name, body, opts = {}) {
  const canvas = opts.canvas || { w: W, h: H };
  const current = meta[name];
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas.w} ${canvas.h}" width="${canvas.w}" height="${canvas.h}">
  <defs>
    <linearGradient id="pageBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${palette.paper}"/><stop offset="100%" stop-color="${palette.paperShade}"/></linearGradient>
    <pattern id="paperGrain" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="0.9" fill="#d8d0c0" opacity="0.28"/><circle cx="13" cy="8" r="0.7" fill="#cfc7b7" opacity="0.24"/><circle cx="9" cy="14" r="0.8" fill="#d8d0c0" opacity="0.22"/></pattern>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#8c948f" flood-opacity="0.18"/></filter>
  </defs>
  <rect x="0" y="0" width="${canvas.w}" height="${canvas.h}" fill="url(#pageBg)"/>
  <rect x="0" y="0" width="${canvas.w}" height="${canvas.h}" fill="url(#paperGrain)" opacity="0.44"/>
  <rect x="54" y="48" width="${canvas.w - 108}" height="162" rx="32" fill="${palette.salt}" stroke="${palette.line}" stroke-width="2.2" filter="url(#shadow)"/>
  ${tagPill(92, 78, current.tag, current.accent, palette.salt, 248)}
  ${tagPill(canvas.w - 286, 78, figNo(name), "#efe5cb", palette.ink, 174)}
  <text x="92" y="152" font-family="Helvetica Neue, Arial, sans-serif" font-size="60" font-weight="700" fill="${palette.ink}">${esc(current.title)}</text>
  <text x="92" y="189" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="${palette.ash}">${esc(current.subtitle)}</text>
  ${headerRule(92, 98, canvas.w - 432, current.accent)}
  ${body}
</svg>`;
  fs.writeFileSync(path.join(SRC, name.replace(".png", ".svg")), svg, "utf8");
}

function figure01() {
  const steps = [
    { x: 126, y: 390, w: 532, h: 238, color: palette.indigo, title: "1. GIS diagnosis", lines: ["Command mesh, access field, water dependence", "Outputs: interpretable planning cells and uncertainty tags"] },
    { x: 710, y: 348, w: 532, h: 280, color: palette.sage, title: "2. Risk synthesis", lines: ["Ecology pull, threat opportunity, response delay", "Outputs: hotspot quartile, corridor thesis, target cells"] },
    { x: 1294, y: 390, w: 532, h: 238, color: palette.gold, title: "3. Allocation logic", lines: ["Routes, sensors, UAV sorties, feasibility screens", "Outputs: weekly tasking package and reserve capacity"] },
    { x: 1878, y: 348, w: 532, h: 280, color: palette.teal, title: "4. Dynamic check", lines: ["30-day illegal pressure, detection chain, dispatch lag", "Outputs: PI trajectory, robustness, staffing floor"] },
    { x: 2462, y: 390, w: 532, h: 238, color: palette.plum, title: "5. Governance loop", lines: ["Review cycle, transfer rules, exceptions and updates", "Outputs: management packet for repeated deployment"] },
  ];
  let body = dossierBoard(58, 256, 3084, 1482);
  body += `<path d="M 320 808 C 720 720, 1080 700, 1560 706 C 1950 710, 2320 712, 2860 808" fill="none" stroke="#d6ccbb" stroke-width="24" stroke-linecap="round"/>`;
  steps.forEach((step, index) => {
    body += `
      <path d="M ${step.x + step.w} ${step.y + step.h / 2} C ${step.x + step.w + 28} ${step.y + step.h / 2}, ${step.x + step.w + 54} ${step.y + step.h / 2 - 4}, ${step.x + step.w + 76} ${step.y + step.h / 2}" fill="none" stroke="${index < steps.length - 1 ? "#cbbfa6" : "none"}" stroke-width="10" stroke-linecap="round"/>
      ${index < steps.length - 1 ? `<path d="M ${step.x + step.w + 66} ${step.y + step.h / 2 - 12} L ${step.x + step.w + 90} ${step.y + step.h / 2} L ${step.x + step.w + 66} ${step.y + step.h / 2 + 12} Z" fill="#cbbfa6"/>` : ""}
      <path d="M ${step.x + 18} ${step.y} H ${step.x + step.w - 40} L ${step.x + step.w} ${step.y + step.h / 2} L ${step.x + step.w - 40} ${step.y + step.h} H ${step.x + 18} Q ${step.x} ${step.y + step.h} ${step.x} ${step.y + step.h - 18} V ${step.y + 18} Q ${step.x} ${step.y} ${step.x + 18} ${step.y} Z" fill="${step.color}" fill-opacity="0.14" stroke="${step.color}" stroke-width="2.4"/>
      <text x="${step.x + 26}" y="${step.y + 58}" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" font-weight="700" fill="${palette.ink}">${esc(step.title)}</text>
      <text x="${step.x + 26}" y="${step.y + 108}" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" fill="${palette.ash}">${esc(step.lines[0])}</text>
      <text x="${step.x + 26}" y="${step.y + 144}" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" fill="${palette.ash}">${esc(step.lines[1])}</text>
      <rect x="${step.x + 26}" y="${step.y + step.h - 62}" width="${step.w - 110}" height="34" rx="17" fill="${step.color}" opacity="0.18"/>
      <text x="${step.x + 42}" y="${step.y + step.h - 39}" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" font-weight="700" fill="${step.color}">${index === 0 ? "input discipline" : index === 1 ? "priority discipline" : index === 2 ? "feasibility discipline" : index === 3 ? "robustness discipline" : "review discipline"}</text>
    `;
  });
  body += `<path d="M 2842 980 C 2980 1020, 3020 1170, 2910 1282 C 2790 1402, 2480 1460, 2120 1422" fill="none" stroke="${palette.rust}" stroke-width="5" stroke-dasharray="10 12"/><text x="2880" y="1264" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.rust}" transform="rotate(68 2880 1264)">feedback and weekly recalibration</text>`;
  body += panel(140, 1080, 906, 228, "Non-negotiable design rules", [
    "Protect decisive corridors first; do not distribute effort uniformly.",
    "Accept only plans that satisfy staff time, travel lag, and asset capacity.",
    "Let field telemetry update the next planning cycle rather than lock a static policy.",
  ], { accent: palette.indigo, bodySize: 24, lineGap: 34 });
  body += panel(1100, 1080, 864, 228, "Outputs sent to managers", [
    "priority mesh",
    "route package",
    "command dial",
    "staffing floor",
    "transfer rules",
  ], { accent: palette.gold, bodySize: 28, lineGap: 34 });
  body += panel(2020, 1080, 980, 228, "Why this figure is bespoke to the paper", [
    "The workflow mirrors the exact protection logic of this manuscript instead of citing a generic GIS or dashboard template.",
    "Every stage emits a competition-facing deliverable and a field-facing management product.",
  ], { accent: palette.plum, bodySize: 23, lineGap: 34 });
  body += smallMetric(206, 1360, 440, "weekly packet", "7-day cycle", "maps and tasking", palette.indigo);
  body += smallMetric(682, 1360, 440, "hotspot focus", "top quartile", "minimum revisit rule", palette.gold);
  body += smallMetric(1158, 1360, 440, "resource lens", "mixed assets", "patrol + sensors + UAV", palette.teal);
  body += smallMetric(1634, 1360, 440, "validation lens", "30 days", "Monte Carlo pressure", palette.rust);
  body += smallMetric(2110, 1360, 440, "governance lens", "transferable", "local priors updated", palette.plum);
  write("fig01_system_architecture.png", body);
}

function figure02() {
  const meshLegend = legendRamp(2480, 470, 260, 30, "priority reference", riskStops, ["low", "mid", "high"], true);
  let body = dossierBoard(58, 256, 3084, 1482);
  body += meshLegend.defs;
  body += mapField({ showGridLabels: true, showNames: true, showCompass: true, showScale: true, showCorridorLabel: true });
  body += meshOverlay("outline");
  body += hotspotOutline();
  body += `<path d="M ${cx(250)} ${cy(920)} C ${cx(980)} ${cy(860)} ${cx(1780)} ${cy(832)} ${cx(2770)} ${cy(610)}" fill="none" stroke="${palette.rust}" stroke-width="6" stroke-dasharray="18 10"/><text x="${cx(940)}" y="${cy(860)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.rust}">command corridor thesis</text>`;
  body += panel(136, 312, 578, 244, "Mesh design choices", [
    "64 cells are coarse enough for a management packet and fine enough for the east-south risk corridor.",
    "Camps, gates, and waterholes are all visible on the same planning surface.",
    "The figure emphasizes command anchors rather than decorative terrain.",
  ], { accent: palette.sage, bodySize: 23, lineGap: 33 });
  body += panel(2304, 1138, 734, 248, "How this map is used later", [
    "Risk scoring reads from the same cells.",
    "Allocation routes start from the same camps.",
    "Simulation response lag is computed on the same operational geometry.",
  ], { accent: palette.indigo, bodySize: 23, lineGap: 34 });
  body += meshLegend.body;
  body += tagPill(2360, 312, "A-H x 1-8 mesh", "#efe7cf", palette.ink, 226);
  body += tagPill(2360, 362, "hot quartile outlined", "#f2e0d7", palette.ink, 286);
  write("fig02_etosha_grid.png", body);
}

function figure03() {
  const riskLegend = legendRamp(2706, 458, 34, 300, "risk score", riskStops, ["low", "", "high"], false);
  const transectX = [0, 1, 2, 3, 4, 5];
  const transectY = [0.38, 0.47, 0.59, 0.67, 0.74, 0.78];
  const tx = (value) => 400 + value * 320;
  const ty = (value) => 1430 - value * 240;
  let body = dossierBoard(58, 256, 3084, 1482);
  body += riskLegend.defs;
  body += mapField({ showGridLabels: false, showNames: true, showCompass: true, showScale: true, showCorridorLabel: false });
  body += meshOverlay("risk");
  body += hotspotOutline();
  body += `<path d="M ${cx(260)} ${cy(890)} C ${cx(940)} ${cy(820)} ${cx(1640)} ${cy(786)} ${cx(2740)} ${cy(548)}" fill="none" stroke="${palette.rust}" stroke-width="8" stroke-linecap="round"/><circle cx="${cx(272)}" cy="${cy(890)}" r="9" fill="${palette.rust}"/><circle cx="${cx(2740)}" cy="${cy(548)}" r="9" fill="${palette.rust}"/><text x="${cx(290)}" y="${cy(870)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.rust}">transect A</text><text x="${cx(2690)}" y="${cy(530)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.rust}">A'</text>`;
  body += panel(2344, 322, 640, 206, "What the map is saying", [
    "Risk is not diffuse.",
    "It condenses into an east-south ridge where water, access, and lag overlap.",
    "The ridge justifies concentrated patrol recurrence.",
  ], { accent: palette.rust, bodySize: 24, lineGap: 34 });
  body += panel(190, 1198, 1960, 268, "Corridor transect A-A'", [
    "The lower strip translates the map into a west-to-east risk climb so the hotspot claim is not read only as color.",
  ], { accent: palette.gold, bodySize: 22 });
  body += `<line x1="360" y1="1430" x2="2050" y2="1430" stroke="${palette.ink}" stroke-width="2.6"/><line x1="360" y1="1188" x2="360" y2="1430" stroke="${palette.ink}" stroke-width="2.6"/>${[0.4, 0.6, 0.8].map((value) => `<text x="332" y="${ty(value) + 8}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" fill="${palette.ash}">${value.toFixed(1)}</text><line x1="360" y1="${ty(value)}" x2="2050" y2="${ty(value)}" stroke="#ddd9cf" stroke-width="1.5" stroke-dasharray="5 9"/>`).join("")}${["west gate","Olifantsrus","Okaukuejo","Halali","Namutoni","east gate"].map((label, index) => `<text x="${tx(index)}" y="1464" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="21" fill="${palette.ash}">${label}</text>`).join("")}<path d="${linePath(transectX.map((value, index) => [tx(value), ty(transectY[index])]))}" fill="none" stroke="${palette.rust}" stroke-width="7" stroke-linecap="round"/>${transectX.map((value, index) => `<circle cx="${tx(value)}" cy="${ty(transectY[index])}" r="8" fill="${palette.rust}" stroke="${palette.salt}" stroke-width="3"/>`).join("")}<text x="368" y="1170" font-family="Helvetica Neue, Arial, sans-serif" font-size="21" font-weight="700" fill="${palette.ink}">risk score along the corridor</text>`;
  body += riskLegend.body;
  write("fig03_risk_heatmap.png", body);
}

function figure04() {
  let body = dossierBoard(58, 256, 3084, 1482);
  body += miniMapPanel("eco", 122, 338, 930, 974, "Ecology pull", palette.sage, meshOverlay("ecology"), "Water dependence and biological concentration dominate the center-east band.");
  body += miniMapPanel("acc", 1135, 338, 930, 974, "Access pressure", palette.gold, meshOverlay("access"), "Road-linked opportunity thickens the same corridor from the south and east.");
  body += miniMapPanel("del", 2148, 338, 930, 974, "Delay penalty", palette.plum, meshOverlay("delay"), "Travel lag is most severe in the eastern pocket where interception is slower.");
  body += panel(132, 1348, 924, 210, "Weight structure in the composite score", [
    "Ecology 0.48",
    "Access 0.30",
    "Delay 0.22",
  ], { accent: palette.rust, bodySize: 27, lineGap: 34 });
  body += panel(1128, 1348, 950, 210, "Why these three maps are paired", [
    "The hotspot is not attributed to one cause only.",
    "The corridor persists because all three forces point to the same cells.",
  ], { accent: palette.indigo, bodySize: 24, lineGap: 34 });
  body += panel(2150, 1348, 912, 210, "Managerial reading", [
    "Cells where all three components align deserve repeated patrols, not one-time sweeps.",
    "This triptych explains the later route and sensor choices.",
  ], { accent: palette.teal, bodySize: 24, lineGap: 34 });
  write("fig04_risk_decomposition.png", body);
}

function figure05() {
  let body = dossierBoard(58, 256, 3084, 1482);
  body += mapField({ showGridLabels: false, showNames: true, showCompass: true, showScale: true, showCorridorLabel: false });
  body += route(routeFamilies.EastLoop, palette.indigo, 14);
  body += route(routeFamilies.SouthLoop, palette.clay, 12);
  body += route(routeFamilies.WestLoop, palette.sage, 11, "18 12");
  body += route(routeFamilies.PanArc, palette.plum, 10);
  body += route(routeFamilies.RapidResponse, palette.rust, 10, "12 10");
  body += `<text x="${cx(1780)}" y="${cy(804)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" font-weight="700" fill="${palette.indigo}">east loop</text><text x="${cx(990)}" y="${cy(650)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" font-weight="700" fill="${palette.clay}">south loop</text><text x="${cx(270)}" y="${cy(845)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" font-weight="700" fill="${palette.sage}">west loop</text><text x="${cx(2310)}" y="${cy(722)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" font-weight="700" fill="${palette.rust}">rapid response</text>`;
  body += panel(128, 1206, 2920, 278, "Cadence ledger", [
    "East Loop - high-frequency route, 7 patrol blocks/week, locks onto the hotspot ridge.",
    "South Loop - 5 patrol blocks/week, binds camps to the waterhole chain.",
    "West Loop - 2 patrol blocks/week, deterrence and gate linkage.",
    "Pan Arc - selective pass-through coverage where visibility is high but extraction risk is lower.",
    "Rapid Response - dispatch corridor used when the eastern pocket requires reinforcement.",
  ], { accent: palette.indigo, bodySize: 23, lineGap: 42 });
  write("fig05_patrol_routes.png", body);
}
function figure06() {
  const insetScale = 0.32;
  const sceneX = 88;
  const sceneY = 242;
  let body = dossierBoard(58, 256, 3084, 1482);
  body += panel(126, 328, 500, 176, "Asset pool", [
    "34 field rangers",
    "12 fixed devices",
    "4 UAV sorties",
  ], { accent: palette.indigo, bodySize: 30, lineGap: 34 });
  body += smallMetric(126, 560, 450, "patrol-hours", "100%", "time budget", palette.indigo);
  body += smallMetric(126, 700, 450, "device stock", "12", "persistent monitors", palette.teal);
  body += smallMetric(126, 840, 450, "UAV stock", "4", "mobile sweeps", palette.gold);
  const sectors = [
    { x: 1170, y: 468, title: "Eastern sector", accent: palette.indigo, pct: "49%", note: "primary hotspot shield" },
    { x: 1170, y: 726, title: "South-central corridor", accent: palette.clay, pct: "31%", note: "link corridor control" },
    { x: 1170, y: 984, title: "West and north reserve", accent: palette.sage, pct: "20%", note: "deterrence and fallback" },
  ];
  sectors.forEach((sector) => {
    body += `<rect x="${sector.x}" y="${sector.y}" width="520" height="172" rx="28" fill="${palette.white}" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/><rect x="${sector.x}" y="${sector.y}" width="520" height="12" rx="28" fill="${sector.accent}"/><text x="${sector.x + 26}" y="${sector.y + 58}" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" font-weight="700" fill="${palette.ink}">${esc(sector.title)}</text><text x="${sector.x + 26}" y="${sector.y + 104}" font-family="Helvetica Neue, Arial, sans-serif" font-size="52" font-weight="700" fill="${sector.accent}">${esc(sector.pct)}</text><text x="${sector.x + 192}" y="${sector.y + 104}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ash}">${esc(sector.note)}</text>`;
  });
  body += bezierConnector(576, 618, 1170, 556, 24, palette.indigo, 0.7);
  body += bezierConnector(576, 618, 1170, 814, 16, palette.indigo, 0.48);
  body += bezierConnector(576, 618, 1170, 1072, 11, palette.indigo, 0.35);
  body += bezierConnector(576, 758, 1170, 564, 14, palette.teal, 0.62);
  body += bezierConnector(576, 758, 1170, 822, 9, palette.teal, 0.52);
  body += bezierConnector(576, 898, 1170, 572, 12, palette.gold, 0.58);
  body += bezierConnector(576, 898, 1170, 830, 10, palette.gold, 0.46);
  body += bezierConnector(576, 898, 1170, 1080, 7, palette.gold, 0.32);
  body += panel(770, 1266, 980, 192, "Read this figure as a ledger, not a dashboard", [
    "The widths of the connectors encode how much of each asset family is committed to each sector.",
    "This makes the sector plan unique to the model rather than a decorative summary card.",
  ], { accent: palette.clay, bodySize: 24, lineGap: 34 });
  body += panel(1788, 1228, 1230, 230, "Inset map of final field attention", [
    "The inset shows the same corridor logic in spatial form so the ledger stays tied to geography.",
  ], { accent: palette.sage, bodySize: 24 });
  body += `<g transform="translate(${2060 - sceneX * insetScale} ${320 - sceneY * insetScale}) scale(${insetScale})">${mapField({ showNames: false, showCompass: false, showScale: false, showCorridorLabel: false })}${meshOverlay("tier")}${hotspotOutline()}</g>`;
  write("fig06_allocation_dashboard.png", body);
}

function figure07() {
  const centerX = 1210;
  const centerY = 970;
  const outer = 450;
  const body = `
    ${dossierBoard(58, 256, 3084, 1482)}
    <circle cx="${centerX}" cy="${centerY}" r="${outer + 56}" fill="#f8f3ea" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/>
    <circle cx="${centerX}" cy="${centerY}" r="${outer}" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/>
    <path d="${arcBand(centerX, centerY, 330, 430, 5, 82)}" fill="${palette.indigo}" fill-opacity="0.78"/>
    <path d="${arcBand(centerX, centerY, 330, 430, 108, 180)}" fill="${palette.clay}" fill-opacity="0.78"/>
    <path d="${arcBand(centerX, centerY, 330, 430, 206, 290)}" fill="${palette.sage}" fill-opacity="0.78"/>
    <path d="${arcBand(centerX, centerY, 220, 304, 0, 360)}" fill="${palette.teal}" fill-opacity="0.18"/>
    <path d="${arcBand(centerX, centerY, 142, 210, 44, 72)}" fill="${palette.gold}" fill-opacity="0.82"/>
    <path d="${arcBand(centerX, centerY, 142, 210, 226, 254)}" fill="${palette.gold}" fill-opacity="0.82"/>
    <path d="${arcBand(centerX, centerY, 66, 128, 300, 348)}" fill="${palette.rust}" fill-opacity="0.22"/>
    ${Array.from({ length: 24 }, (_, hour) => {
      const angle = (hour / 24) * 360;
      const [x1, y1] = polar(centerX, centerY, outer - 14, angle);
      const [x2, y2] = polar(centerX, centerY, outer + 20, angle);
      const [xt, yt] = polar(centerX, centerY, outer + 50, angle);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${hour % 6 === 0 ? palette.ink : "#bfc5c6"}" stroke-width="${hour % 6 === 0 ? 3.2 : 1.4}"/>${hour % 3 === 0 ? `<text x="${xt}" y="${yt + 7}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" fill="${palette.ash}">${hour}:00</text>` : ""}`;
    }).join("")}
    <text x="${centerX}" y="${centerY - 12}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="40" font-weight="700" fill="${palette.ink}">daily command cycle</text>
    <text x="${centerX}" y="${centerY + 28}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ash}">outer ring patrol waves - middle ring sensors - inner gold drone windows</text>
    ${panel(2020, 390, 930, 282, "Cycle logic", [
      "05:00-08:00 east loop deployment",
      "09:00-11:00 sensor watch and report review",
      "11:00-13:00 first UAV window",
      "14:00-18:00 south and west patrol rotation",
      "19:00-21:00 second UAV window and exception handling",
      "late hours kept as reserve or rapid response",
    ], { accent: palette.teal, bodySize: 24, lineGap: 34 })}
    ${panel(2020, 736, 930, 222, "Why a dial instead of a line", [
      "This figure emphasizes recurrence and overlap across the full day, which is the operational issue the simulation cares about.",
      "A straight timeline hides how patrol waves and drone windows wrap into the next day.",
    ], { accent: palette.gold, bodySize: 24, lineGap: 34 })}
    ${tagPill(2060, 1030, "patrol waves", "#dee8f0", palette.ink, 188)}
    ${tagPill(2268, 1030, "sensor watch", "#dfe9df", palette.ink, 194)}
    ${tagPill(2484, 1030, "UAV windows", "#efe3c5", palette.ink, 196)}
    ${tagPill(2704, 1030, "reserve", "#f0dfdb", palette.ink, 154)}
  `;
  write("fig07_schedule_timeline.png", body);
}

function figure08() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const optimized = days.map((day) => 0.60 + 0.145 * (1 - Math.exp(-day / 6.4)));
  const uniform = days.map((day) => 0.57 + 0.065 * (1 - Math.exp(-day / 9.5)));
  const optimizedUpper = optimized.map((value) => value + 0.025);
  const optimizedLower = optimized.map((value) => value - 0.02);
  const uniformUpper = uniform.map((value) => value + 0.015);
  const uniformLower = uniform.map((value) => value - 0.015);
  const x = 150;
  const y = 344;
  const w = 2230;
  const h = 1120;
  const sx = (day) => x + 96 + ((day - 1) / 29) * (w - 140);
  const sy = (value) => y + h - 80 - ((value - 0.52) / 0.33) * (h - 140);
  let body = dossierBoard(58, 256, 3084, 1482);
  body += axisFrame(
    x, y, w, h,
    [1, 7, 14, 21, 30].map((day) => ({ pos: (day - 1) / 29, label: `day ${day}` })),
    [0.55, 0.60, 0.65, 0.70, 0.75, 0.80].map((value) => ({ pos: (value - 0.52) / 0.33, label: value.toFixed(2) })),
    "simulation day",
    "protection index"
  );
  body += `<rect x="${x + 96}" y="${sy(0.75)}" width="${w - 140}" height="${sy(0.73) - sy(0.75)}" fill="${palette.warn}" opacity="0.18"/><line x1="${x + 96}" y1="${sy(0.75)}" x2="${x + w - 44}" y2="${sy(0.75)}" stroke="${palette.rust}" stroke-width="3" stroke-dasharray="10 10"/><path d="${bandPath(days, optimizedUpper, optimizedLower, sx, sy)}" fill="${palette.indigo}" opacity="0.16"/><path d="${bandPath(days, uniformUpper, uniformLower, sx, sy)}" fill="${palette.gold}" opacity="0.18"/><path d="${linePath(days.map((day, index) => [sx(day), sy(optimized[index])]))}" fill="none" stroke="${palette.indigo}" stroke-width="8" stroke-linecap="round"/><path d="${linePath(days.map((day, index) => [sx(day), sy(uniform[index])]))}" fill="none" stroke="${palette.clay}" stroke-width="7" stroke-linecap="round"/>${[7, 15, 30].map((day) => {
    const px = sx(day);
    const py = sy(optimized[day - 1]);
    return `<line x1="${px}" y1="${py}" x2="${px}" y2="${py - 80}" stroke="${palette.ash}" stroke-width="2"/><rect x="${px - 44}" y="${py - 132}" width="88" height="34" rx="17" fill="${palette.salt}" stroke="${palette.line}" stroke-width="1.2"/><text x="${px}" y="${py - 108}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" font-weight="700" fill="${palette.ink}">day ${day}</text>`;
  }).join("")}<text x="${sx(18)}" y="${sy(0.75) - 12}" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" font-weight="700" fill="${palette.rust}">command target = 0.75</text>`;
  body += panel(2450, 396, 546, 260, "Reading the trajectory", [
    "The optimized plan clears the command target after the first week.",
    "The uniform plan improves slightly but never enters the target band.",
    "The shaded envelopes show that the gap persists under stochastic noise.",
  ], { accent: palette.indigo, bodySize: 23, lineGap: 34 });
  body += panel(2450, 712, 546, 202, "Milestones", [
    "day 7 - target crossed",
    "day 15 - gains stabilize",
    "day 30 - plateau maintained",
  ], { accent: palette.gold, bodySize: 24, lineGap: 34 });
  body += tagPill(2470, 1000, "optimized package", "#dce5ef", palette.ink, 238);
  body += tagPill(2720, 1000, "uniform deployment", "#efe1c9", palette.ink, 242);
  write("fig08_simulation_results.png", body);
}

function figure09() {
  const values = Array.from({ length: 220 }, (_, index) => 0.48 + (index / 219) * 0.34);
  const optimized = values.map((value) => 1.3 * gaussian(value, 0.74, 0.028) + 0.4 * gaussian(value, 0.69, 0.02));
  const uniform = values.map((value) => 1.1 * gaussian(value, 0.61, 0.038) + 0.4 * gaussian(value, 0.56, 0.022));
  const maxDensity = Math.max(...optimized, ...uniform);
  const x = 220;
  const y = 408;
  const w = 2220;
  const h = 930;
  const sx = (value) => x + 110 + ((value - 0.48) / 0.34) * (w - 180);
  const ridgeY1 = y + 360;
  const ridgeY2 = y + 690;
  const scale = 200 / maxDensity;
  const ridge = (densities, baseY, color) => {
    const top = values.map((value, index) => [sx(value), baseY - densities[index] * scale]);
    const bottom = values.slice().reverse().map((value) => [sx(value), baseY]);
    return `<path d="${pathFromPoints([...top, ...bottom], true)}" fill="${color}" fill-opacity="0.22" stroke="none"/><path d="${linePath(top)}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`;
  };
  const jitterPoints = (baseY, mu, sigma, color) => Array.from({ length: 22 }, (_, index) => {
    const xValue = mu + (index - 11) * sigma * 0.17 + Math.sin(index * 1.7) * sigma * 0.08;
    const yValue = baseY + (index % 2 === 0 ? 18 : 34) + (index % 3) * 9;
    return `<circle cx="${sx(clamp(xValue, 0.49, 0.83))}" cy="${yValue}" r="5.8" fill="${color}" fill-opacity="0.72"/>`;
  }).join("");
  let body = dossierBoard(58, 256, 3084, 1482);
  body += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${palette.white}" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/><rect x="${sx(0.48)}" y="${y + 42}" width="${sx(0.60) - sx(0.48)}" height="${h - 98}" fill="#f3e2dc" opacity="0.5"/><text x="${sx(0.54)}" y="${y + 78}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="700" fill="${palette.rust}">low-performance tail</text>${[0.50, 0.60, 0.70, 0.80].map((value) => `<line x1="${sx(value)}" y1="${y + 60}" x2="${sx(value)}" y2="${y + h - 70}" stroke="#dfe4e5" stroke-width="1.5" stroke-dasharray="5 10"/><text x="${sx(value)}" y="${y + h - 28}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ash}">${value.toFixed(2)}</text>`).join("")}<text x="${x + w / 2}" y="${y + h - 2}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${palette.ink}">replication PI</text>${ridge(optimized, ridgeY1, palette.indigo)}${ridge(uniform, ridgeY2, palette.clay)}${jitterPoints(ridgeY1, 0.73, 0.06, palette.indigo)}${jitterPoints(ridgeY2, 0.60, 0.08, palette.clay)}<text x="${x + 34}" y="${ridgeY1 - 18}" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${palette.ink}">optimized package</text><text x="${x + 34}" y="${ridgeY2 - 18}" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="700" fill="${palette.ink}">uniform deployment</text>`;
  body += panel(2512, 430, 470, 238, "What matters here", [
    "The optimized ridge shifts rightward and leaves a much thinner low tail.",
    "Tail-risk reduction is visible without collapsing all replications into one mean.",
  ], { accent: palette.rust, bodySize: 23, lineGap: 34 });
  body += panel(2512, 724, 470, 210, "Tail reading", [
    "PI below 0.60 is operationally fragile.",
    "That region is common under uniform deployment and rare under optimization.",
  ], { accent: palette.indigo, bodySize: 23, lineGap: 34 });
  write("fig09_robustness_distribution.png", body);
}

function figure10() {
  const rows = [
    { label: "Ranger count", low: -0.16, high: 0.11, accent: palette.rust },
    { label: "Detection quality", low: -0.10, high: 0.08, accent: palette.gold },
    { label: "Patrol interval", low: -0.07, high: 0.05, accent: palette.indigo },
    { label: "Fixed devices", low: -0.04, high: 0.03, accent: palette.sage },
  ];
  const x = 320;
  const y = 410;
  const rowGap = 220;
  const center = 1640;
  const spanScale = 440 / 0.16;
  let body = dossierBoard(58, 256, 3084, 1482);
  body += `<rect x="160" y="334" width="2880" height="1220" rx="28" fill="${palette.white}" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/><line x1="${center}" y1="470" x2="${center}" y2="1380" stroke="${palette.ink}" stroke-width="2.4"/><text x="${center - 330}" y="420" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.ash}">worse than baseline</text><text x="${center + 330}" y="420" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.ash}">better than baseline</text>`;
  rows.forEach((row, index) => {
    const y0 = y + index * rowGap;
    body += `<circle cx="${x}" cy="${y0}" r="24" fill="${row.accent}"/><text x="${x}" y="${y0 + 8}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" font-weight="700" fill="${palette.salt}">${index + 1}</text><text x="${x + 56}" y="${y0 + 8}" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" font-weight="700" fill="${palette.ink}">${esc(row.label)}</text><line x1="${center + row.low * spanScale}" y1="${y0}" x2="${center + row.high * spanScale}" y2="${y0}" stroke="${row.accent}" stroke-width="16" stroke-linecap="round" opacity="0.82"/><circle cx="${center + row.low * spanScale}" cy="${y0}" r="11" fill="${palette.rust}"/><circle cx="${center + row.high * spanScale}" cy="${y0}" r="11" fill="${palette.indigo}"/><text x="${center + row.low * spanScale - 18}" y="${y0 + 8}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ash}">${row.low.toFixed(2)}</text><text x="${center + row.high * spanScale + 18}" y="${y0 + 8}" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ash}">+${row.high.toFixed(2)}</text>`;
  });
  body += panel(2300, 1100, 640, 260, "Interpretation", [
    "The span length is the full management swing around baseline PI.",
    "Ranger count dominates, detection quality is second, and devices remain the smallest lever.",
  ], { accent: palette.gold, bodySize: 23, lineGap: 34 });
  write("fig10_sensitivity_panels.png", body);
}
function figure11() {
  const centerX = 1370;
  const centerY = 1010;
  const spokes = [
    { label: "Zoning", angle: -90, radius: 210, level: "Direct", color: palette.sage },
    { label: "Risk logic", angle: -30, radius: 210, level: "Direct", color: palette.sage },
    { label: "Allocation", angle: 30, radius: 210, level: "Direct", color: palette.sage },
    { label: "Simulation", angle: 90, radius: 210, level: "Direct", color: palette.sage },
    { label: "Ecology layer", angle: 150, radius: 354, level: "Retune", color: palette.gold },
    { label: "Threat prior", angle: 210, radius: 508, level: "Rebuild", color: palette.rust },
  ];
  let body = dossierBoard(58, 256, 3084, 1482);
  body += `<circle cx="${centerX}" cy="${centerY}" r="520" fill="#f7f1e7" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/><circle cx="${centerX}" cy="${centerY}" r="520" fill="none" stroke="${palette.rust}" stroke-width="36" opacity="0.16"/><circle cx="${centerX}" cy="${centerY}" r="365" fill="none" stroke="${palette.gold}" stroke-width="36" opacity="0.18"/><circle cx="${centerX}" cy="${centerY}" r="210" fill="none" stroke="${palette.sage}" stroke-width="36" opacity="0.22"/><circle cx="${centerX}" cy="${centerY}" r="124" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/><text x="${centerX}" y="${centerY - 10}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="36" font-weight="700" fill="${palette.ink}">portable core</text><text x="${centerX}" y="${centerY + 28}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ash}">same architecture across parks</text>`;
  spokes.forEach((spoke) => {
    const [x2, y2] = polar(centerX, centerY, spoke.radius, spoke.angle);
    const [xt, yt] = polar(centerX, centerY, 610, spoke.angle);
    body += `<line x1="${centerX}" y1="${centerY}" x2="${x2}" y2="${y2}" stroke="${spoke.color}" stroke-width="6" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="16" fill="${spoke.color}" stroke="${palette.salt}" stroke-width="4"/><text x="${xt}" y="${yt + 8}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="27" font-weight="700" fill="${palette.ink}">${esc(spoke.label)}</text><text x="${xt}" y="${yt + 40}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="21" fill="${palette.ash}">${esc(spoke.level)}</text>`;
  });
  body += panel(2230, 420, 700, 244, "Ring meaning", [
    "Inner ring - transfers directly with the same mathematical structure.",
    "Middle ring - same structure, but local calibration is needed.",
    "Outer ring - reserve-specific priors must be rebuilt.",
  ], { accent: palette.plum, bodySize: 23, lineGap: 34 });
  body += panel(2230, 728, 700, 210, "Why a wheel", [
    "Transferability is radial rather than tabular because every module depends on the same core architecture at the center.",
    "The figure therefore avoids looking like a generic policy matrix.",
  ], { accent: palette.indigo, bodySize: 23, lineGap: 34 });
  body += tagPill(2248, 1012, "direct", "#dce8d7", palette.ink, 142);
  body += tagPill(2408, 1012, "retune", "#efe4be", palette.ink, 160);
  body += tagPill(2590, 1012, "rebuild", "#f0ddd8", palette.ink, 170);
  write("fig11_transferability_matrix.png", body);
}

function figure12() {
  const responseLegend = legendRamp(2710, 418, 30, 290, "response lag", responseStops, ["2h", "", "6h"], false);
  const slowCells = cells.filter((cell) => cell.responseTime >= 4.5);
  const eastProfile = [2.5, 2.8, 3.3, 4.1, 4.7, 5.0];
  const px = (index) => 360 + index * 240;
  const py = (value) => 1440 - ((value - 2.0) / 3.4) * 220;
  let body = dossierBoard(58, 256, 3084, 1482);
  body += responseLegend.defs;
  body += mapField({ showGridLabels: false, showNames: true, showCompass: true, showScale: true, showCorridorLabel: false });
  body += meshOverlay("response");
  body += slowCells.map((cell) => `<rect x="${cx(cell.x) + 9}" y="${cy(cell.y) + 9}" width="${cell.w - 18}" height="${cell.h - 18}" rx="13" fill="none" stroke="${palette.rust}" stroke-width="3" stroke-dasharray="8 9"/>`).join("");
  Object.values(camps).forEach(([x, y], index) => {
    const outer = 150 + index * 6;
    body += `<circle cx="${cx(x)}" cy="${cy(y)}" r="${outer}" fill="none" stroke="${palette.sky}" stroke-width="2.2" opacity="0.26"/><circle cx="${cx(x)}" cy="${cy(y)}" r="${outer * 0.63}" fill="none" stroke="${palette.sky}" stroke-width="2.2" opacity="0.18"/>`;
  });
  body += panel(2310, 330, 674, 230, "What the bands show", [
    "Reach bands approximate how station geometry shapes intercept time.",
    "The highlighted eastern cells sit outside the most comfortable response envelope.",
  ], { accent: palette.sky, bodySize: 23, lineGap: 34 });
  body += panel(180, 1200, 1940, 266, "Eastward response profile", [
    "The lower strip converts map-based reach into an explicit delay climb from west to east.",
  ], { accent: palette.rust, bodySize: 22 });
  body += `<line x1="340" y1="1440" x2="1960" y2="1440" stroke="${palette.ink}" stroke-width="2.4"/><line x1="340" y1="1204" x2="340" y2="1440" stroke="${palette.ink}" stroke-width="2.4"/>${[2.5, 3.5, 4.5, 5.5].map((value) => `<text x="312" y="${py(value) + 7}" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" fill="${palette.ash}">${value.toFixed(1)}</text><line x1="340" y1="${py(value)}" x2="1960" y2="${py(value)}" stroke="#dfe4e5" stroke-width="1.5" stroke-dasharray="5 9"/>`).join("")}${eastProfile.map((value, index) => `<circle cx="${px(index)}" cy="${py(value)}" r="8" fill="${palette.rust}" stroke="${palette.salt}" stroke-width="3"/>`).join("")}<path d="${linePath(eastProfile.map((value, index) => [px(index), py(value)]))}" fill="none" stroke="${palette.rust}" stroke-width="6" stroke-linecap="round"/>${["west","Olifantsrus","Okaukuejo","Halali","Namutoni","east gate"].map((label, index) => `<text x="${px(index)}" y="1470" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" fill="${palette.ash}">${label}</text>`).join("")}`;
  body += responseLegend.body;
  write("fig12_station_response_map.png", body);
}

function figure13() {
  let body = dossierBoard(58, 256, 3084, 1482);
  body += mapField({ showGridLabels: false, showNames: true, showCompass: true, showScale: true, showCorridorLabel: false });
  body += meshOverlay("outline");
  body += sensorSites.map(([x, y]) => `<circle cx="${cx(x)}" cy="${cy(y)}" r="88" fill="${palette.indigo}" opacity="0.11"/><circle cx="${cx(x)}" cy="${cy(y)}" r="48" fill="${palette.indigo}" opacity="0.16"/><rect x="${cx(x) - 12}" y="${cy(y) - 12}" width="24" height="24" rx="6" fill="${palette.indigo}" stroke="${palette.salt}" stroke-width="3"/>`).join("");
  body += droneSectors.map((sector, index) => `<path d="${pathFromPoints(shift(sector), true)}" fill="${index === 0 ? palette.gold : index === 1 ? palette.clay : palette.teal}" fill-opacity="0.18" stroke="${index === 0 ? palette.gold : index === 1 ? palette.clay : palette.teal}" stroke-width="4" stroke-dasharray="10 8"/>`).join("");
  body += panel(126, 316, 620, 208, "Persistent eyes", [
    "Blue squares are fixed sensors placed where hotspot persistence is strongest.",
    "Their halos indicate stable watch zones rather than full interception reach.",
  ], { accent: palette.indigo, bodySize: 23, lineGap: 34 });
  body += panel(126, 554, 620, 208, "Adaptive sweeps", [
    "Colored fans are drone sectors used where intelligence uncertainty stays high.",
    "They widen the view over the same corridor but do not replace patrol recurrence.",
  ], { accent: palette.gold, bodySize: 23, lineGap: 34 });
  body += panel(2260, 1188, 756, 240, "Layering logic", [
    "Persistent hotspots receive sensors.",
    "Ambiguous hotspot edges receive UAV sweeps.",
    "Both layers are tied back to the patrol corridor, not scattered evenly across the park.",
  ], { accent: palette.teal, bodySize: 23, lineGap: 34 });
  write("fig13_sensor_drone_map.png", body);
}

function figure14() {
  const x = 170;
  const y = 338;
  const w = 2230;
  const h = 1120;
  const rangers = Array.from({ length: 25 }, (_, index) => 22 + index);
  const values = rangers.map((ranger) => 0.56 + 0.19 / (1 + Math.exp(-(ranger - 34) / 2.8)));
  const upper = values.map((value) => Math.min(0.80, value + 0.02));
  const lower = values.map((value) => Math.max(0.54, value - 0.02));
  const sx = (ranger) => x + 96 + ((ranger - 22) / 24) * (w - 140);
  const sy = (value) => y + h - 80 - ((value - 0.52) / 0.31) * (h - 140);
  let body = dossierBoard(58, 256, 3084, 1482);
  body += axisFrame(
    x, y, w, h,
    [22, 26, 30, 34, 38, 42, 46].map((ranger) => ({ pos: (ranger - 22) / 24, label: String(ranger) })),
    [0.55, 0.60, 0.65, 0.70, 0.75, 0.80].map((value) => ({ pos: (value - 0.52) / 0.31, label: value.toFixed(2) })),
    "field rangers",
    "protection index"
  );
  body += `<rect x="${sx(22)}" y="${sy(0.70)}" width="${sx(34) - sx(22)}" height="${sy(0.52) - sy(0.70)}" fill="#f2e2dc" opacity="0.38"/><rect x="${sx(34)}" y="${sy(0.70)}" width="${sx(37) - sx(34)}" height="${sy(0.52) - sy(0.70)}" fill="#f1e9cf" opacity="0.42"/><rect x="${sx(37)}" y="${sy(0.70)}" width="${sx(46) - sx(37)}" height="${sy(0.52) - sy(0.70)}" fill="#dfe9dc" opacity="0.42"/><path d="${bandPath(rangers, upper, lower, sx, sy)}" fill="${palette.sage}" opacity="0.18"/><path d="${linePath(rangers.map((ranger, index) => [sx(ranger), sy(values[index])]))}" fill="none" stroke="${palette.sage}" stroke-width="8" stroke-linecap="round"/><line x1="${sx(34)}" y1="${sy(0.52)}" x2="${sx(34)}" y2="${sy(0.79)}" stroke="${palette.rust}" stroke-width="3" stroke-dasharray="10 10"/><line x1="${sx(22)}" y1="${sy(0.70)}" x2="${sx(46)}" y2="${sy(0.70)}" stroke="${palette.rust}" stroke-width="3" stroke-dasharray="10 10"/><text x="${sx(34) + 12}" y="${sy(0.73)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" font-weight="700" fill="${palette.rust}">minimum safe staffing = 34</text><text x="${sx(27)}" y="${sy(0.78)}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.rust}">fragile</text><text x="${sx(35.5)}" y="${sy(0.78)}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.gold}">transition</text><text x="${sx(41.5)}" y="${sy(0.78)}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.sage}">stable</text>`;
  body += panel(2460, 404, 520, 232, "Reading the regimes", [
    "Below 34, the hotspot corridor loses repeat coverage quickly.",
    "Between 34 and 37, marginal gains remain steep.",
    "Beyond 37, gains still exist but flatten into stability.",
  ], { accent: palette.sage, bodySize: 23, lineGap: 34 });
  write("fig14_ranger_requirement_curve.png", body);
}

function figure15() {
  const x = 220;
  const y = 350;
  const w = 2220;
  const h = 1110;
  const rangerMin = 24;
  const rangerMax = 44;
  const detectMin = 0.35;
  const detectMax = 0.60;
  const sx = (ranger) => x + 110 + ((ranger - rangerMin) / (rangerMax - rangerMin)) * (w - 170);
  const sy = (detect) => y + h - 82 - ((detect - detectMin) / (detectMax - detectMin)) * (h - 140);
  const detectFromPi = (ranger, pi) => clamp((pi - 0.213 - 0.0072 * ranger) / 0.62, detectMin, detectMax);
  const bandLevels = [
    { low: 0.60, high: 0.65, color: "#e9ddbf" },
    { low: 0.65, high: 0.70, color: "#d8c08f" },
    { low: 0.70, high: 0.75, color: "#caa06d" },
    { low: 0.75, high: 0.80, color: "#b77a57" },
    { low: 0.80, high: 0.84, color: "#99524a" },
  ];
  const rangerSamples = Array.from({ length: 18 }, (_, index) => rangerMin + ((rangerMax - rangerMin) * index) / 17);
  let body = dossierBoard(58, 256, 3084, 1482);
  body += axisFrame(
    x, y, w, h,
    [24, 28, 32, 36, 40, 44].map((ranger) => ({ pos: (ranger - rangerMin) / (rangerMax - rangerMin), label: String(ranger) })),
    [0.35, 0.40, 0.45, 0.50, 0.55, 0.60].map((detect) => ({ pos: (detect - detectMin) / (detectMax - detectMin), label: detect.toFixed(2) })),
    "field rangers",
    "detection baseline"
  );
  bandLevels.forEach((band) => {
    const upper = rangerSamples.map((ranger) => [sx(ranger), sy(detectFromPi(ranger, band.high))]);
    const lower = rangerSamples.slice().reverse().map((ranger) => [sx(ranger), sy(detectFromPi(ranger, band.low))]);
    body += `<path d="${pathFromPoints([...upper, ...lower], true)}" fill="${band.color}" opacity="0.92" stroke="none"/>`;
  });
  const frontier = rangerSamples.map((ranger) => [sx(ranger), sy(detectFromPi(ranger, 0.70))]);
  const safePoly = [...frontier, [sx(rangerMax), sy(detectMax)], [sx(rangerMin), sy(detectMax)]];
  body += `<path d="${pathFromPoints(safePoly, true)}" fill="${palette.safe}" opacity="0.20"/><path d="${linePath(frontier)}" fill="none" stroke="${palette.indigo}" stroke-width="6" stroke-linecap="round"/><text x="${sx(33)}" y="${sy(detectFromPi(33, 0.70)) - 14}" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="700" fill="${palette.indigo}">PI = 0.70 frontier</text>${[0.62, 0.68, 0.74, 0.80].map((value, index) => {
    const ranger = 41 - index * 4;
    const detect = detectFromPi(ranger, value);
    return `<text x="${sx(ranger)}" y="${sy(detect) - 8}" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" fill="${value >= 0.74 ? palette.salt : palette.ink}">PI ${value.toFixed(2)}</text>`;
  }).join("")}`;
  body += panel(2486, 414, 478, 238, "How to read the bands", [
    "Each diagonal band is an iso-protection zone.",
    "Moving up or right both improve PI, but the blue frontier marks the minimum safe region.",
  ], { accent: palette.clay, bodySize: 23, lineGap: 34 });
  body += panel(2486, 724, 478, 210, "Management implication", [
    "Detection gains can partly offset manpower loss, but only until the frontier is crossed.",
    "The safest operating region stays above and to the right of the line.",
  ], { accent: palette.indigo, bodySize: 23, lineGap: 34 });
  write("fig15_scenario_matrix.png", body);
}

function figure16() {
  const card = (x, y, w, h, accent, title, lines, footer = "") => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${palette.white}" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/>
    <rect x="${x}" y="${y}" width="${w}" height="12" rx="26" fill="${accent}"/>
    <text x="${x + 24}" y="${y + 54}" font-family="Helvetica Neue, Arial, sans-serif" font-size="32" font-weight="700" fill="${palette.ink}">${esc(title)}</text>
    ${lines.map((line, index) => `<text x="${x + 24}" y="${y + 102 + index * 34}" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="${palette.ash}">${esc(line)}</text>`).join("")}
    ${footer ? `<rect x="${x + 22}" y="${y + h - 54}" width="${w - 44}" height="30" rx="15" fill="${accent}" opacity="0.16"/><text x="${x + 34}" y="${y + h - 33}" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" font-weight="700" fill="${accent}">${esc(footer)}</text>` : ""}
  `;
  const arrow = (x1, y1, x2, y2, color, label = "") => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const ah = 16;
    const ax1 = x2 - ah * Math.cos(angle) + 9 * Math.sin(angle);
    const ay1 = y2 - ah * Math.sin(angle) - 9 * Math.cos(angle);
    const ax2 = x2 - ah * Math.cos(angle) - 9 * Math.sin(angle);
    const ay2 = y2 - ah * Math.sin(angle) + 9 * Math.cos(angle);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="6" stroke-linecap="round"/><path d="M ${x2} ${y2} L ${ax1} ${ay1} L ${ax2} ${ay2} Z" fill="${color}"/>${label ? `<rect x="${(x1 + x2) / 2 - 96}" y="${(y1 + y2) / 2 - 28}" width="192" height="34" rx="17" fill="${palette.salt}" stroke="${palette.line}" stroke-width="1.2"/><text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 5}" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" font-weight="700" fill="${palette.ink}">${esc(label)}</text>` : ""}`;
  };
  let body = dossierBoard(58, 256, 3084, 1482);
  body += `<rect x="118" y="320" width="840" height="1180" rx="28" fill="#f8fbfb" stroke="${palette.line}" stroke-width="2"/><rect x="1110" y="320" width="980" height="1180" rx="28" fill="#fbfaf7" stroke="${palette.line}" stroke-width="2"/><rect x="2238" y="320" width="844" height="1180" rx="28" fill="#f9f7f4" stroke="${palette.line}" stroke-width="2"/>`;
  body += `<text x="150" y="378" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">Input stack</text><text x="1144" y="378" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">Optimization core</text><text x="2272" y="378" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">Deployable outputs</text>`;
  body += card(150, 424, 774, 228, palette.sage, "Priority field", [
    "Inputs: zone features, priors, and response friction",
    "Objects: R_i, hotspot quartile, service deficit map",
  ], "state estimate");
  body += card(150, 708, 774, 228, palette.gold, "Feasible route library", [
    "Inputs: stations, roads, travel times, shift cap",
    "Objects: route set R, coverage matrix a_ir, sector matrix b_ij",
  ], "mobility envelope");
  body += card(150, 992, 774, 228, palette.clay, "Resource budgets", [
    "Inputs: ranger-hours H_R, device stock M, UAV sorties U",
    "Objects: station caps kappa_s, hotspot floor q_bar",
  ], "capacity guard");
  body += card(1144, 446, 912, 290, palette.indigo, "MILP controller", [
    "Objective: maximize weighted protection minus route burden",
    "Surrogate: linearized utility e_i replacing concave E_i",
    "Decision variables: patrol loops x_r, fixed watch y_i, UAV sorties z_j",
  ], "solve for weekly tasking package");
  body += card(1144, 794, 432, 204, palette.rust, "Constraint rail A", [
    "Ranger-hour cap",
    "Station activation cap",
  ], "feasibility");
  body += card(1624, 794, 432, 204, palette.teal, "Constraint rail B", [
    "Device and UAV inventories",
    "Hotspot service floor",
  ], "coverage discipline");
  body += card(1144, 1058, 912, 320, palette.plum, "Marginal-gain logic", [
    "The controller concentrates effort until active cells satisfy",
    "approximately equal weighted marginal value",
    "R_i exp(-eta_i) across the protected corridor",
  ], "why concentration beats uniform spread");
  body += card(2272, 446, 776, 212, palette.indigo, "Patrol package", [
    "Route activations by station and daily cadence",
    "Backbone of the corridor-defense plan",
  ], "x_r");
  body += card(2272, 714, 776, 212, palette.teal, "Persistent watch layer", [
    "Fixed devices pinned to stable hotspot cells",
    "Continuous monitoring where recurrence matters most",
  ], "y_i");
  body += card(2272, 982, 776, 212, palette.gold, "Adaptive surge layer", [
    "UAV windows assigned to uncertain or shifting sectors",
    "Flexible observation over hotspot edges and gaps",
  ], "z_j");
  body += card(2272, 1250, 776, 180, palette.sage, "Management products", [
    "Weekly tasking sheet, staffing check, and hotspot compliance report",
  ], "field-ready output");
  body += arrow(924, 538, 1144, 592, palette.sage, "state");
  body += arrow(924, 822, 1144, 660, palette.gold, "network");
  body += arrow(924, 1106, 1144, 728, palette.clay, "budgets");
  body += arrow(2056, 592, 2272, 552, palette.indigo, "route tasking");
  body += arrow(2056, 888, 2272, 820, palette.teal, "sensor siting");
  body += arrow(2056, 1170, 2272, 1088, palette.gold, "UAV sectors");
  body += `<rect x="1232" y="1406" width="736" height="42" rx="21" fill="#e6ecef"/><text x="1600" y="1434" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" font-weight="700" fill="${palette.ink}">The controller is only allowed to emit plans that are simultaneously high-value and field-feasible.</text>`;
  write("fig16_controller_architecture.png", body);
}

function figure17() {
  const ringCard = (x, y, w, h, accent, title, lines) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="${palette.white}" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/>
    <rect x="${x}" y="${y}" width="${w}" height="12" rx="24" fill="${accent}"/>
    <text x="${x + 22}" y="${y + 50}" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="${palette.ink}">${esc(title)}</text>
    ${lines.map((line, index) => `<text x="${x + 22}" y="${y + 94 + index * 32}" font-family="Helvetica Neue, Arial, sans-serif" font-size="21" fill="${palette.ash}">${esc(line)}</text>`).join("")}
  `;
  const curvedArrow = (x1, y1, cx1, cy1, cx2, cy2, x2, y2, color) => {
    const angle = Math.atan2(y2 - cy2, x2 - cx2);
    const ah = 16;
    const ax1 = x2 - ah * Math.cos(angle) + 9 * Math.sin(angle);
    const ay1 = y2 - ah * Math.sin(angle) - 9 * Math.cos(angle);
    const ax2 = x2 - ah * Math.cos(angle) - 9 * Math.sin(angle);
    const ay2 = y2 - ah * Math.sin(angle) + 9 * Math.cos(angle);
    return `<path d="M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/><path d="M ${x2} ${y2} L ${ax1} ${ay1} L ${ax2} ${ay2} Z" fill="${color}"/>`;
  };
  let body = dossierBoard(58, 256, 3084, 1482);
  body += `<circle cx="1596" cy="938" r="244" fill="#f8fbfb" stroke="${palette.line}" stroke-width="2" filter="url(#shadow)"/><circle cx="1596" cy="938" r="196" fill="#eef5f5" stroke="${palette.teal}" stroke-width="3" opacity="0.9"/><text x="1596" y="902" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="42" font-weight="700" fill="${palette.ink}">park state</text><text x="1596" y="944" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ash}">risk field R_i</text><text x="1596" y="978" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ash}">pressure prior P_i</text><text x="1596" y="1012" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="24" fill="${palette.ash}">response lag tau_i</text>`;
  body += ringCard(190, 404, 620, 218, palette.clay, "1. Arrival generator", [
    "Poisson events N_i^t with seasonal pressure multiplier Psi_t",
    "High-risk cells receive both more value and more threat arrivals",
  ]);
  body += ringCard(920, 330, 620, 218, palette.indigo, "2. Detection fusion", [
    "Asset-level misses are compounded into zone detection q_i^t",
    "Patrols, fixed watch, and UAVs enter as a joint surveillance stack",
  ]);
  body += ringCard(1660, 330, 620, 218, palette.sky, "3. Dispatch and response", [
    "Travel base + dispatch delay + terrain noise create tau_i^t",
    "Interception g_i^t falls sharply once delay crosses the threshold",
  ]);
  body += ringCard(2390, 404, 620, 218, palette.rust, "4. Outcome evaluator", [
    "Neutralization u_i^t = q_i^t g_i^t feeds weighted loss and PI",
    "The simulation measures both mean performance and tail fragility",
  ]);
  body += ringCard(2390, 1244, 620, 218, palette.plum, "5. Posterior update", [
    "Patrol pressure refreshes C_i and re-estimates the intrusion prior",
    "Yesterday's deployment changes tomorrow's risk surface",
  ]);
  body += ringCard(1660, 1320, 620, 218, palette.gold, "6. Re-optimization trigger", [
    "If PI or hotspot service falls below threshold, the controller reruns",
    "The next tasking plan is generated from the updated state",
  ]);
  body += ringCard(920, 1320, 620, 218, palette.sage, "7. Deployment reset", [
    "Routes, sensors, and UAV windows are reassigned for the next cycle",
    "The operating loop preserves adaptation instead of static patrol plans",
  ]);
  body += ringCard(190, 1244, 620, 218, palette.teal, "8. Monitoring record", [
    "Observed detections, delays, and hotspot compliance feed governance",
    "The loop remains auditable at weekly and monthly review scales",
  ]);
  body += curvedArrow(810, 514, 964, 440, 1048, 424, 920, 440, palette.clay);
  body += curvedArrow(1540, 440, 1602, 350, 1708, 350, 1660, 440, palette.indigo);
  body += curvedArrow(2280, 440, 2390, 420, 2448, 452, 2390, 514, palette.sky);
  body += curvedArrow(2700, 622, 2860, 744, 2860, 1080, 2700, 1244, palette.rust);
  body += curvedArrow(2390, 1352, 2326, 1446, 2184, 1480, 2280, 1428, palette.plum);
  body += curvedArrow(1660, 1428, 1546, 1490, 1126, 1490, 920, 1428, palette.gold);
  body += curvedArrow(920, 1428, 742, 1458, 566, 1418, 810, 1352, palette.sage);
  body += curvedArrow(190, 1244, 126, 1090, 124, 714, 190, 622, palette.teal);
  body += `<rect x="1208" y="1124" width="776" height="58" rx="29" fill="#edf3f0" stroke="${palette.line}" stroke-width="1.5"/><text x="1596" y="1161" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" font-weight="700" fill="${palette.ink}">The simulation is not an end-of-pipeline check. It is the mechanism that updates the next planning state.</text>`;
  write("fig17_feedback_architecture.png", body);
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
figure16();
figure17();

console.log("Bespoke dossier-style figures regenerated.");
