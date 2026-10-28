/**
 * Point clouds for `ParticleStage`. Every builder returns exactly `n` points as
 * flat xyz positions and rgb colours (0-1, sRGB, written straight to the
 * screen), centred on the origin and about 3.6 units across, facing the camera
 * on the xy plane.
 *
 * Builders draw from the seeded `Rand` they are given, so a page shows the same
 * cloud on every visit.
 */

export type Rand = () => number;
export type Cloud = { pos: Float32Array; col: Float32Array };
type RGB = [number, number, number];

/** Deterministic PRNG (mulberry32). */
export function mulberry32(seed: number): Rand {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hex(value: string): RGB {
  const v = parseInt(value.replace("#", ""), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

const mixRGB = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/** Collects points, then fills or trims to exactly `n`. */
class Builder {
  private p: number[] = [];
  private c: number[] = [];
  constructor(private readonly n: number, private readonly r: Rand) {}

  add(x: number, y: number, z: number, color: RGB) {
    this.p.push(x, y, z);
    this.c.push(color[0], color[1], color[2]);
  }

  get size() {
    return this.p.length / 3;
  }

  /** Exactly `n` points: random picks when there are too many, jittered repeats when too few. */
  done(jitter = 0.02): Cloud {
    const have = this.size;
    const pos = new Float32Array(this.n * 3);
    const col = new Float32Array(this.n * 3);
    if (have === 0) return { pos, col };
    for (let i = 0; i < this.n; i++) {
      // Too many: an even pick. Too few: every point once, then random repeats
      // (jittered) - so a picture never loses a cell to a duplicate.
      const k = have >= this.n ? Math.floor((i / this.n) * have) : i < have ? i : Math.floor(this.r() * have);
      const j = have >= this.n || i < have ? 0 : jitter;
      pos[i * 3] = this.p[k * 3] + (this.r() - 0.5) * j;
      pos[i * 3 + 1] = this.p[k * 3 + 1] + (this.r() - 0.5) * j;
      pos[i * 3 + 2] = this.p[k * 3 + 2] + (this.r() - 0.5) * j;
      col.set([this.c[k * 3], this.c[k * 3 + 1], this.c[k * 3 + 2]], i * 3);
    }
    return { pos, col };
  }
}

/* ---------- Primitives. ---------- */

function box(b: Builder, r: Rand, cx: number, cy: number, cz: number, w: number, h: number, d: number, color: (x: number, y: number) => RGB) {
  const faces = [w * h, w * h, w * d, w * d, h * d, h * d];
  const total = faces.reduce((s, f) => s + f, 0);
  let pick = r() * total;
  let face = 0;
  while (pick > faces[face]) pick -= faces[face++];
  const u = r() - 0.5;
  const v = r() - 0.5;
  const side = face % 2 === 0 ? 0.5 : -0.5;
  let x: number, y: number, z: number;
  if (face < 2) [x, y, z] = [u * w, v * h, side * d];
  else if (face < 4) [x, y, z] = [u * w, side * h, v * d];
  else [x, y, z] = [side * w, u * h, v * d];
  b.add(cx + x, cy + y, cz + z, color(u, v));
}

function sphere(b: Builder, r: Rand, cx: number, cy: number, cz: number, rad: number, color: RGB) {
  const u = r() * 2 - 1;
  const t = r() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  b.add(cx + rad * s * Math.cos(t), cy + rad * u, cz + rad * s * Math.sin(t), color);
}

/** A flat rectangle in its own frame, rotated by `rot` about `pivot`, filled and outlined. */
function card(
  b: Builder, r: Rand,
  { cx, cy, z, w, h, rot, face, edge }: { cx: number; cy: number; z: number; w: number; h: number; rot: number; face: RGB; edge: RGB },
) {
  const onEdge = r() < 0.45;
  let x = (r() - 0.5) * w;
  let y = (r() - 0.5) * h;
  if (onEdge) {
    if (r() < 0.5) x = Math.sign(x) * w * 0.5;
    else y = Math.sign(y) * h * 0.5;
  }
  const c = Math.cos(rot);
  const s = Math.sin(rot);
  b.add(cx + x * c - y * s, cy + x * s + y * c, z, onEdge ? edge : face);
}

/* ---------- Sampling an image or a line of text. ---------- */

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function pixels(source: CanvasImageSource, w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(source, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h).data;
}

/**
 * An image as a grid of points, one per cell, coloured by the pixel under it -
 * an LED wall of the picture. `height` is the cloud's height in units for a
 * portrait image; landscape images are fitted to `height * 1.35` wide instead.
 * With `cutout`, cells close to the corner colour (an icon's background) are
 * dropped, so only the mark itself is left.
 */
export function imageCloud(img: HTMLImageElement, n: number, r: Rand, { height = 3.6, cutout = false, depth = 0.05 } = {}): Cloud {
  const aspect = img.naturalWidth / img.naturalHeight;
  // Sample more cells than points when cutting out, since some are dropped.
  const cells = cutout ? n * 2.2 : n;
  const rows = Math.floor(Math.sqrt(cells / aspect));
  const cols = Math.floor(rows * aspect);
  const data = pixels(img, cols, rows);
  // Landscape pictures are fitted to the width the cloud has, not its height.
  const worldW = aspect > 1 ? Math.min(height * 1.05, height * aspect) : height * aspect;
  const worldH = worldW / aspect;
  const bg: RGB = [data[0] / 255, data[1] / 255, data[2] / 255];
  const b = new Builder(n, r);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      if (data[i + 3] < 128) continue;
      const c: RGB = [data[i] / 255, data[i + 1] / 255, data[i + 2] / 255];
      if (cutout && Math.hypot(c[0] - bg[0], c[1] - bg[1], c[2] - bg[2]) < 0.18) continue;
      b.add((x / cols - 0.5) * worldW, (0.5 - y / rows) * worldH, (r() - 0.5) * depth, c);
    }
  }
  // An icon that is all background colour (a flat mark on a flat tile) keeps
  // the whole tile rather than vanishing.
  if (cutout && b.size < n * 0.08) return imageCloud(img, n, r, { height, cutout: false, depth });
  return b.done(worldW / cols);
}

/** A line of text as filled points, `height` units tall, in `color`. */
export function textCloud(text: string, n: number, r: Rand, color: RGB, height = 1.6): Cloud {
  const h = 120;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.font = `600 ${h}px system-ui, sans-serif`;
  const w = Math.ceil(ctx.measureText(text).width) + 20;
  canvas.width = w;
  canvas.height = h + 20;
  ctx.font = `600 ${h}px system-ui, sans-serif`;
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 10, (h + 20) / 2);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const scale = height / canvas.height;
  const b = new Builder(n, r);
  for (let tries = 0; tries < n * 30 && b.size < n; tries++) {
    const x = Math.floor(r() * canvas.width);
    const y = Math.floor(r() * canvas.height);
    if (data[(y * canvas.width + x) * 4 + 3] > 128) {
      b.add((x - canvas.width / 2) * scale, (canvas.height / 2 - y) * scale, (r() - 0.5) * 0.12, color);
    }
  }
  return b.done();
}

/** Place `cloud` at an offset and scale (in place) - for composing text into a scene. */
function addCloud(b: Builder, cloud: Cloud, count: number, dx: number, dy: number, s = 1) {
  const have = cloud.pos.length / 3;
  for (let i = 0; i < count; i++) {
    const k = i % have;
    b.add(cloud.pos[k * 3] * s + dx, cloud.pos[k * 3 + 1] * s + dy, cloud.pos[k * 3 + 2], [
      cloud.col[k * 3], cloud.col[k * 3 + 1], cloud.col[k * 3 + 2],
    ]);
  }
}

/* ---------- The home page: the studio and its three divisions. ---------- */

const BRAND: RGB = [1, 1, 1]; // tinted by the shader on the home page

export function monogram(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const h = 2.6, stem = 0.42, depth = 0.45, span = 1.9;
  for (let i = 0; i < n; i++) {
    const pick = r();
    if (pick < 0.3) box(b, r, -span / 2, 0, 0, stem, h, depth, () => BRAND);
    else if (pick < 0.6) box(b, r, span / 2, 0, 0, stem, h, depth, () => BRAND);
    else {
      const t = r();
      const across = (r() - 0.5) * stem * 1.15;
      const z = (r() - 0.5) * depth;
      b.add(-span / 2 + t * span + across * 0.5, h / 2 - t * h + across * 0.6, r() < 0.5 ? Math.sign(z) * depth * 0.5 : z, BRAND);
    }
  }
  return b.done();
}

export function die(n: number, r: Rand, color: RGB = BRAND, edgeColor: RGB = color): Cloud {
  const t = (1 + Math.sqrt(5)) / 2;
  const v = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t],
    [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(([x, y, z]) => {
    const l = Math.hypot(x, y, z) / 1.75;
    return [x / l, y / l, z / l];
  });
  const f = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4],
    [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8],
    [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  const b = new Builder(n, r);
  for (let i = 0; i < n; i++) {
    const [a, bb, c] = f[Math.floor(r() * f.length)].map((k) => v[k]);
    let u = r(), w = r();
    if (u + w > 1) [u, w] = [1 - u, 1 - w];
    const edge = r() < 0.4;
    if (edge) w = 0;
    b.add(
      a[0] + u * (bb[0] - a[0]) + w * (c[0] - a[0]),
      a[1] + u * (bb[1] - a[1]) + w * (c[1] - a[1]),
      a[2] + u * (bb[2] - a[2]) + w * (c[2] - a[2]),
      edge ? edgeColor : color,
    );
  }
  return b.done();
}

export function lattice(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const k = 4, size = 2.6, cell = size / (k - 1);
  for (let i = 0; i < n; i++) {
    const a = Math.floor(r() * k) * cell - size / 2;
    const c = Math.floor(r() * k) * cell - size / 2;
    if (r() < 0.25) {
      const d = Math.floor(r() * k) * cell - size / 2;
      const j = () => (r() - 0.5) * 0.09;
      b.add(a + j(), c + j(), d + j(), BRAND);
      continue;
    }
    const along = (r() - 0.5) * size;
    const axis = Math.floor(r() * 3);
    if (axis === 0) b.add(along, a, c, BRAND);
    else if (axis === 1) b.add(a, along, c, BRAND);
    else b.add(a, c, along, BRAND);
  }
  return b.done();
}

export function gear(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const teeth = 12, inner = 1.15, outer = 1.5, tip = 1.82, depth = 0.5;
  for (let i = 0; i < n; i++) {
    const pick = r();
    const z = (r() - 0.5) * depth;
    const ang = r() * Math.PI * 2;
    if (pick < 0.55) {
      const phase = ((ang / (Math.PI * 2)) * teeth) % 1;
      const rad = inner + r() * ((phase > 0.15 && phase < 0.55 ? tip : outer) - inner);
      b.add(Math.cos(ang) * rad, Math.sin(ang) * rad, r() < 0.6 ? Math.sign(z) * depth * 0.5 : z, BRAND);
    } else if (pick < 0.75) {
      const rad = 0.3 + r() * 0.15;
      b.add(Math.cos(ang) * rad, Math.sin(ang) * rad, z * 1.4, BRAND);
    } else {
      const a = (Math.floor(r() * 5) / 5) * Math.PI * 2 + (r() - 0.5) * 0.12;
      const rad = 0.45 + r() * (inner - 0.45);
      b.add(Math.cos(a) * rad, Math.sin(a) * rad, z * 0.6, BRAND);
    }
  }
  return b.done();
}

export function ring(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  for (let i = 0; i < n; i++) {
    const ang = r() * Math.PI * 2;
    const rad = 1.35 + Math.floor(r() * 3) * 0.32 + (r() - 0.5) * 0.06;
    b.add(Math.cos(ang) * rad, (r() - 0.5) * 0.08, Math.sin(ang) * rad, BRAND);
  }
  return b.done();
}

/* ---------- One scene per app. Behaviour is applied in the shader (see `Mode`). ---------- */

/** Kor ve Kül - a hearth: crossed logs, a flame, and embers that rise (mode `rise`). */
export function hearth(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const ember = hex("#ffb347"), core = hex("#ffe08a"), deep = hex("#d9381e"), wood = hex("#5a3220"), char = hex("#2a1a14");
  for (let i = 0; i < n; i++) {
    const pick = r();
    if (pick < 0.22) {
      // Two logs, crossed, lying under the flame.
      const t = (r() - 0.5) * 2.6;
      const ang = r() * Math.PI * 2;
      const tilt = r() < 0.5 ? 0.42 : -0.42;
      const rad = 0.17;
      const x = t * Math.cos(tilt), y = -1.15 + t * Math.sin(tilt) * 0.25;
      b.add(x, y + Math.sin(ang) * rad, Math.cos(ang) * rad, mixRGB(wood, char, r()));
    } else {
      // The flame: a teardrop, widest low, hottest at the core.
      const h = Math.pow(r(), 0.8);
      const width = 0.95 * Math.sin(Math.PI * Math.min(1, h * 1.08 + 0.05)) * (1 - h * 0.55);
      const ang = r() * Math.PI * 2;
      const rad = width * Math.sqrt(r());
      const lick = Math.sin(h * 9 + ang) * 0.06;
      const heat = Math.min(1, rad / Math.max(width, 0.01) * 0.7 + h * 0.6);
      const color = heat < 0.45 ? mixRGB(core, ember, heat / 0.45) : mixRGB(ember, deep, (heat - 0.45) / 0.55);
      b.add(Math.cos(ang) * rad + lick, -1.0 + h * 2.7, Math.sin(ang) * rad * 0.6, color);
    }
  }
  return b.done();
}

/** Shardbound - a crystal cluster that breaks apart and draws back together (mode `burst`). */
export function crystal(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const shards = [
    { x: 0, y: 0.1, h: 3.0, w: 0.62, tilt: 0 },
    { x: -0.75, y: -0.45, h: 1.7, w: 0.42, tilt: 0.45 },
    { x: 0.78, y: -0.4, h: 1.9, w: 0.45, tilt: -0.4 },
    { x: -0.35, y: -0.85, h: 1.0, w: 0.3, tilt: 0.9 },
    { x: 0.42, y: -0.9, h: 1.1, w: 0.3, tilt: -0.95 },
  ];
  const light = hex("#5fd4ea"), mid = hex("#2b8fd6"), violet = hex("#5b3cc4");
  for (let i = 0; i < n; i++) {
    const s = shards[Math.min(shards.length - 1, Math.floor(Math.pow(r(), 1.4) * shards.length))];
    // A hexagonal bipyramid: six faces up, six down, edges heavier.
    const up = r() < 0.72;
    const t = r();
    const side = Math.floor(r() * 6);
    const a0 = (side / 6) * Math.PI * 2, a1 = ((side + 1) / 6) * Math.PI * 2;
    const k = r() < 0.35 ? 0 : r();
    const ex = Math.cos(a0) * (1 - k) + Math.cos(a1) * k, ez = Math.sin(a0) * (1 - k) + Math.sin(a1) * k;
    const radius = s.w * (1 - t);
    const ly = up ? t * s.h * 0.62 : -t * s.h * 0.38;
    const lx = ex * radius, lz = ez * radius;
    const c = Math.cos(s.tilt), sn = Math.sin(s.tilt);
    const color = mixRGB(mixRGB(light, mid, t), violet, Math.max(0, -ly) * 0.6 + (k === 0 ? 0 : 0.15));
    b.add(s.x + lx * c - ly * sn, s.y + lx * sn + ly * c, lz, color);
  }
  return b.done();
}

/** PushBump - an arena with four players' balls circling inside it (mode `orbit`). */
export function arena(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const rim = hex("#c9d4e5");
  const players = [hex("#ff5d5d"), hex("#4da3ff"), hex("#ffd23f"), hex("#4fd18b")];
  const balls = [[-0.7, 0.55], [0.75, 0.35], [-0.25, -0.75], [0.55, -0.6]];
  for (let i = 0; i < n; i++) {
    if (r() < 0.4) {
      const ang = r() * Math.PI * 2;
      const rad = 1.75 + (r() - 0.5) * 0.08;
      b.add(Math.cos(ang) * rad, Math.sin(ang) * rad, (r() - 0.5) * 0.18, rim);
    } else {
      const k = Math.floor(r() * 4);
      sphere(b, r, balls[k][0], balls[k][1], 0, 0.36, players[k]);
    }
  }
  return b.done();
}

/** Neu-Pummel Party - eight phones round a table and confetti over it (mode `burst`). */
export function party(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const confetti = ["#ff5d8f", "#ffd23f", "#4da3ff", "#4fd18b", "#b06bff"].map(hex);
  const screen = hex("#2b2f3a"), frame = hex("#e8ecf3");
  for (let i = 0; i < n; i++) {
    if (r() < 0.55) {
      const k = Math.floor(r() * 8);
      const a = (k / 8) * Math.PI * 2;
      card(b, r, { cx: Math.cos(a) * 1.6, cy: Math.sin(a) * 1.6, z: 0, w: 0.38, h: 0.7, rot: a - Math.PI / 2, face: screen, edge: frame });
    } else {
      const a = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * 0.95;
      b.add(Math.cos(a) * rad, Math.sin(a) * rad, (r() - 0.5) * 0.9, confetti[Math.floor(r() * confetti.length)]);
    }
  }
  return b.done();
}

/** UnderCard - a hand fanned out, the low card lifted out of it (mode `wave`). */
export function hand(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const paper = hex("#24324a"), ink = hex("#c9d3e3"), red = hex("#e0393e");
  const count = 5;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(r() * count);
    const rot = (k - (count - 1) / 2) * 0.36;
    const low = k === 1;
    const px = Math.sin(-rot) * 2.3, py = Math.cos(rot) * 2.3 - 2.6 + (low ? 0.5 : 0);
    if (r() < 0.12) {
      // The pip in the middle of each card.
      const a = r() * Math.PI * 2, rad = Math.sqrt(r()) * 0.16;
      b.add(px + Math.cos(a) * rad, py + Math.sin(a) * rad, k * 0.05 + 0.01, k % 2 ? red : hex("#f4efe6"));
    } else {
      card(b, r, { cx: px, cy: py, z: k * 0.12, w: 0.95, h: 1.4, rot, face: paper, edge: low ? red : ink });
    }
  }
  return b.done();
}

/** EdgeOut - a round board; the marbles nearest the rim drop off it (mode `fall`). */
export function board(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const wood = hex("#d9a066"), rim = hex("#8a5a2e"), mine = hex("#e85d4a"), theirs = hex("#2d3a4a");
  for (let i = 0; i < n; i++) {
    const pick = r();
    if (pick < 0.5) {
      const a = r() * Math.PI * 2, rad = Math.sqrt(r()) * 1.7;
      b.add(Math.cos(a) * rad, Math.sin(a) * rad, -0.12, rad > 1.6 ? rim : wood);
    } else {
      // Marbles on a hex pattern; a few sit right at the edge.
      const ring_ = Math.floor(r() * 3);
      const slots = Math.max(1, ring_ * 6);
      const slot = Math.floor(r() * slots);
      const a = (slot / slots) * Math.PI * 2;
      const rad = ring_ * 0.62;
      sphere(b, r, Math.cos(a) * rad, Math.sin(a) * rad, 0.12, 0.2, (ring_ + slot) % 2 ? mine : theirs);
    }
  }
  return b.done();
}

/** GuessFast - a dial turning round a question mark (mode `spin`). */
export function dial(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const green = hex("#4fbf6b"), yellow = hex("#f2c94c"), grey = hex("#9aa3ad");
  const mark = textCloud("?", Math.floor(n * 0.4), r, green, 2.1);
  addCloud(b, mark, Math.floor(n * 0.4), 0.05, -0.05);
  for (let i = b.size; i < n; i++) {
    const tick = Math.floor(r() * 10);
    const a = (tick / 10) * Math.PI * 2 + (r() - 0.5) * 0.12;
    const rad = 1.55 + r() * 0.3;
    b.add(Math.cos(a) * rad, Math.sin(a) * rad, 0, tick === 0 ? green : tick % 3 === 0 ? yellow : grey);
  }
  return b.done();
}

/** WordDeck - a stacked deck, the top card showing a word (mode `wave`). */
export function deck(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const paper = hex("#eef3ff"), blue = hex("#3b6cf6"), edge = hex("#9db4ff");
  const word = textCloud("Aa", Math.floor(n * 0.22), r, blue, 0.9);
  addCloud(b, word, Math.floor(n * 0.22), 0.25, 0.25);
  for (let i = b.size; i < n; i++) {
    const k = Math.floor(Math.pow(r(), 0.7) * 4);
    const off = (3 - k) * 0.16;
    card(b, r, { cx: off - 0.24, cy: -off + 0.24, z: -0.1 * (3 - k), w: 2.1, h: 2.8, rot: -0.04 * (3 - k), face: paper, edge: k === 3 ? blue : edge });
  }
  return b.done();
}

/** Neu-Source - tickets on three lanes, packets flowing into a terminal (mode `flow`). */
export function board3(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const lane = hex("#3a3f5c"), ticket = hex("#a78bfa"), done_ = hex("#34d399"), term = hex("#4b5563");
  const prompt = textCloud(">_", Math.floor(n * 0.15), r, term, 0.8);
  addCloud(b, prompt, Math.floor(n * 0.15), 1.65, 0);
  for (let i = b.size; i < n; i++) {
    const k = Math.floor(r() * 3);
    const y = 0.9 - k * 0.9;
    const pick = r();
    if (pick < 0.3) b.add(-2.1 + r() * 3.2, y - 0.32, 0, lane);
    else {
      const slot = Math.floor(r() * 3);
      card(b, r, { cx: -1.6 + slot * 0.95, cy: y, z: 0, w: 0.75, h: 0.48, rot: 0, face: k === 2 ? done_ : ticket, edge: term });
    }
  }
  return b.done();
}

/** Eclosion - a butterfly opening its wings (mode `flap`). */
export function butterfly(n: number, r: Rand): Cloud {
  const b = new Builder(n, r);
  const inner = hex("#ffb86b"), outer = hex("#8b5cf6"), body = hex("#3b2a4a");
  for (let i = 0; i < n; i++) {
    if (r() < 0.08) {
      b.add((r() - 0.5) * 0.08, -0.9 + r() * 1.8, (r() - 0.5) * 0.08, body);
      continue;
    }
    // The butterfly curve; filled by scaling each boundary point inwards.
    const t = r() * Math.PI * 2;
    const rr = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
    const fill = Math.sqrt(r());
    const x = Math.sin(t) * rr * fill * 0.42;
    const y = Math.cos(t) * rr * fill * 0.42 - 0.3;
    b.add(x, y, (r() - 0.5) * 0.05, mixRGB(inner, outer, Math.min(1, fill * 1.15)));
  }
  return b.done();
}
