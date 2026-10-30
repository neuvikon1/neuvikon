"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's mark: a cloud of points that gathers into the signature's N.
 *
 * The page opens on the points scattered across the right of the hero; the
 * first stretch of scroll pulls them together into the N, and from there the
 * N holds its shape and leaves with the hero like any other content - the
 * canvas lives inside the hero, so nothing follows the reader further down.
 * Both states are held as position attributes on the same points, so the
 * gathering is one uniform moving between them in the vertex shader.
 *
 * Scroll decides *how far* the N has gathered; time only turns it. Under
 * reduced motion there is no gathering: the N is simply there.
 *
 * three.js is imported inside the effect, so it never sits on the first-load
 * path: the hero is complete without this layer, and it fades in once ready.
 */

const VERTEX = /* glsl */ `
  attribute vec3 p1;
  attribute vec3 aDir;
  attribute float aRand;

  uniform float uMorph;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vAlpha;

  void main() {
    // Each point leaves on its own beat (aRand), so the gathering reads as a
    // flock settling rather than a rigid body sliding.
    float t = clamp(uMorph * 1.35 - aRand * 0.35, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 pos = mix(position, p1, t);

    // Mid-flight the points lift off their path, so the cloud breathes on its
    // way in and closes on arrival.
    pos += aDir * sin(3.14159 * t) * 0.35;
    // A slow drift while scattered, settling to a shimmer small enough to keep
    // every edge of the N readable.
    // Each point wanders on its own beat and axis, so the scattered field
    // never moves as one sheet - in the screen's plane only while scattered,
    // so the field stays flat until it has gathered.
    float ph = aRand * 6.2831;
    vec3 wander = vec3(
      sin(uTime * (0.3 + aRand * 0.5) + ph),
      cos(uTime * (0.25 + aDir.x * 0.2) + ph * 1.7),
      sin(uTime * 0.4 + ph * 2.3)
    );
    wander.z *= t;
    pos += mix(wander * 0.22, aDir * sin(uTime * 0.8 + ph) * 0.015, t);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.6 + aRand * 0.8) / -mv.z;
    // Scattered, only a few in three points show, so the field reads as a
    // loose handful of motes; the rest fade in as the N gathers.
    float shown = mix(step(fract(aRand * 7.31), 0.35), 1.0, t);
    // Fade out towards the top and bottom of the canvas, so the cloud dissolves
    // into the hero's edges rather than being cut off by them.
    float edge = smoothstep(1.0, 0.7, abs(gl_Position.y / gl_Position.w));
    vAlpha = (0.55 + aRand * 0.45) * shown * edge;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.15, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
  }
`;

/* ---------- Shapes. Each returns `count` points as a flat xyz array. ---------- */

type Rand = () => number;

/** Deterministic, so the cloud is the same shape on every visit. */
function mulberry32(seed: number): Rand {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The signature's N, exactly as drawn in the brand file (Figma "n-green"):
 * one continuous wave-stroke, kept here as its SVG path so the mark in the
 * cloud is the mark everywhere else.
 */
const MARK_PATH =
  "M89.9569 94.6093C104.097 75.8538 116.451 55.8141 130.275 36.8326C137.142 27.3825 142.502 16.9557 153.096 11.1681C174.04 -0.289573 201.139 10.6255 209.738 32.6546C215.857 48.3355 214.638 119.55 213.357 139.4L186.583 139.228C185.113 113.609 186.259 87.6008 186.241 61.9273C186.232 52.5496 187.332 39.1476 177.127 34.3095C163.853 28.0064 156.128 44.3203 149.821 52.9113C136.141 71.6125 123.273 90.8835 109.755 109.72C104.575 116.937 99.883 124.967 93.9544 131.605C85.8872 140.63 69.1661 139.635 63.8601 128.087C61.6944 123.376 62.3622 117.904 62.3532 112.867C62.3351 104.484 62.3622 96.0923 62.3712 87.7184C62.3802 73.2946 62.9397 58.6627 62.0283 44.3113C55.7478 50.4787 39.8479 70.6811 34.7404 74.009C25.3286 80.1402 14.6625 74.2803 8.4 67.2085C18.8315 52.441 32.1867 39.1567 44.3056 25.6824C49.3499 20.0666 53.8618 13.1938 59.8716 8.54559C67.3974 2.71275 79.7149 2.70371 85.8781 10.6436C91.4007 17.7696 89.5147 28.3953 89.5147 36.8506C89.5057 55.9588 88.2694 75.6186 89.9569 94.6093Z";

/** An absolute M/L/C path, flattened to one closed polygon. */
function flatten(d: string) {
  const tok = d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) ?? [];
  const poly: [number, number][] = [];
  let i = 0;
  let cmd = "";
  const num = () => parseFloat(tok[i++]);
  while (i < tok.length) {
    if (/[MLCZ]/i.test(tok[i])) cmd = tok[i++].toUpperCase();
    if (cmd === "Z") break;
    if (cmd === "C") {
      const [x0, y0] = poly[poly.length - 1];
      const c = [num(), num(), num(), num(), num(), num()];
      for (let k = 1; k <= 12; k++) {
        const t = k / 12;
        const u = 1 - t;
        const a = u * u * u, b = 3 * u * u * t, e = 3 * u * t * t, f = t * t * t;
        poly.push([a * x0 + b * c[0] + e * c[2] + f * c[4], a * y0 + b * c[1] + e * c[3] + f * c[5]]);
      }
    } else poly.push([num(), num()]);
  }
  return poly;
}

function inside(poly: [number, number][], x: number, y: number) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/**
 * The mark as a solid slab: the brand outline, extruded. Most points lie on
 * its front and back faces, filling the stroke; the rest run along its edge
 * at every depth, which is what keeps the outline crisp as it turns.
 */
function monogram(count: number, r: Rand) {
  const poly = flatten(MARK_PATH);
  const xs = poly.map((p) => p[0]);
  const ys = poly.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  // 2.6 units tall, centred, y up.
  const k = 2.6 / (y1 - y0);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const depth = 0.45;
  // Cumulative edge lengths, for picking a point evenly along the outline.
  const lens = [0];
  for (let i = 1; i <= poly.length; i++) {
    const [ax, ay] = poly[i - 1];
    const [bx, by] = poly[i % poly.length];
    lens.push(lens[i - 1] + Math.hypot(bx - ax, by - ay));
  }
  const total = lens[lens.length - 1];
  const out: number[] = [];
  for (let n = 0; n < count; n++) {
    let x: number, y: number, z: number;
    if (r() < 0.3) {
      const at = r() * total;
      let i = 1;
      while (lens[i] < at) i++;
      const t = (at - lens[i - 1]) / (lens[i] - lens[i - 1]);
      const [ax, ay] = poly[i - 1];
      const [bx, by] = poly[i % poly.length];
      x = ax + (bx - ax) * t;
      y = ay + (by - ay) * t;
      z = (r() - 0.5) * depth;
    } else {
      do {
        x = x0 + r() * (x1 - x0);
        y = y0 + r() * (y1 - y0);
      } while (!inside(poly, x, y));
      z = (r() < 0.5 ? -0.5 : 0.5) * depth;
    }
    out.push((x - cx) * k, (cy - y) * k, z);
  }
  return out;
}

/**
 * The points before they gather: a soft, irregular nebula rather than a box.
 * Each point is thrown out from the centre at a random angle, and how far it
 * can go depends on that angle through a few lobes of different frequency -
 * so the outline swells and pinches with no corners - and falls off softly,
 * thinning towards the edge instead of stopping at it. It is flat - the
 * scattered field moves only in the plane of the screen, and the turning
 * starts once it has become the N (see the loop). It is sized to
 * reach the hero's top and bottom; the shader fades the points out as they
 * near those edges, so the canvas never cuts it along a hard straight line.
 */
function scatter(count: number, r: Rand) {
  const out: number[] = [];
  // [frequency, amplitude, phase]. The phases are chosen, not drawn: picked so
  // the outline never pinches in on the side facing the copy (the whole left,
  // upper and lower), where a dent reads as a bite out of the cloud.
  const lobes = [
    [2, 0.16, 1.35],
    [3, 0.12, 1.32],
    [5, 0.06, 4.29],
  ];
  for (let i = 0; i < count; i++) {
    const ang = r() * Math.PI * 2;
    const reach = lobes.reduce((k, [f, amp, ph]) => k + amp * Math.sin(f * ang + ph), 1);
    // Mostly near the middle, a few far out: a soft edge, not a rim.
    const rad = Math.pow(r(), 0.75) * 3 * reach;
    const curl = (r() - 0.5) * 0.5;
    out.push(
      Math.cos(ang + curl) * rad * 1.2,
      Math.sin(ang + curl) * rad * 0.85,
      0,
    );
  }
  return out;
}

/* ---------- Scroll to gather. ---------- */

/**
 * How far the N has gathered, 0 scattered to 1 whole. The hero is held in
 * place for 70% of a screen of scroll (see `Hero`); the N is whole by 55%, so
 * it rests complete for a moment before the hero moves on.
 */
function gatherTarget(viewport: number, scroll: number) {
  return Math.min(1, Math.max(0, scroll / (viewport * 0.55)));
}

/** The mark's green from the brand file, the same on either theme. */
const COLOR = { light: 0x4ab166, dark: 0x4ab166 };

export function ScrollScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const small = window.matchMedia("(max-width: 1023px)");
      const count = small.matches ? 4200 : 8000;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
      } catch {
        // No WebGL: the page is whole without this layer.
        return;
      }
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
      camera.position.set(0, 0, 9);

      const r = mulberry32(20260128);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(scatter(count, r), 3));
      geometry.setAttribute("p1", new THREE.Float32BufferAttribute(monogram(count, r), 3));
      const dirs = new Float32Array(count * 3);
      const rands = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const v = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize();
        dirs.set([v.x, v.y, v.z], i * 3);
        rands[i] = r();
      }
      geometry.setAttribute("aDir", new THREE.BufferAttribute(dirs, 3));
      geometry.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));
      // The shapes overlap the origin; one generous sphere keeps culling off them.
      geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 4);

      const isDark = () => document.documentElement.classList.contains("dark");
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uMorph: { value: 0 },
          uTime: { value: 0 },
          uSize: { value: 26 },
          uPixelRatio: { value: dpr },
          uColor: { value: new THREE.Color(isDark() ? COLOR.dark : COLOR.light) },
          uOpacity: { value: 1 },
        },
      });
      const applyTheme = () => {
        const dark = isDark();
        material.uniforms.uColor.value.set(dark ? COLOR.dark : COLOR.light);
        // Additive light on black, plain ink on white: a glow cannot brighten white.
        material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        material.needsUpdate = true;
      };
      applyTheme();

      const points = new THREE.Points(geometry, material);
      const group = new THREE.Group();
      group.add(points);
      scene.add(group);

      /* Layout: where the cloud sits, and how loud it is. */
      // The canvas fills the hero, not the window, so it is sized from itself;
      // the gathering is still paced by the window's height.
      let viewport = window.innerHeight;
      const measure = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        viewport = window.innerHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        const visibleW = visibleH * camera.aspect;
        if (small.matches) {
          // On a phone the cloud is a backdrop: centred, smaller, quieter.
          // Low enough that it never competes with the copy over it.
          group.position.set(visibleW * 0.18, -visibleH * 0.12, 0);
          group.scale.setScalar(0.75);
          material.uniforms.uOpacity.value = 0.2;
        } else {
          // On a wide screen it takes the right third the copy leaves open,
          // sized so the scattered cloud stays clear of it.
          group.position.set(visibleW * 0.3, 0, 0);
          group.scale.setScalar(Math.min(1, visibleH / 6.6, visibleW / 13));
          material.uniforms.uOpacity.value = 0.95;
        }
      };
      measure();
      const resize = new ResizeObserver(measure);
      resize.observe(canvas);

      // Once the hero has scrolled away there is nothing to draw.
      let onScreen = true;
      const seen = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
      });
      seen.observe(canvas);

      /* Pointer: a few degrees of parallax, desktop only. */
      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.x = e.clientX / window.innerWidth - 0.5;
        pointer.y = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const themeWatch = new MutationObserver(applyTheme);
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      /* Loop. */
      const clock = new THREE.Clock();
      let morph = reduced.matches ? 1 : gatherTarget(viewport, window.scrollY);
      let spin = 0;
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        const dt = Math.min(clock.getDelta(), 0.05);
        if (!onScreen) return;
        const target = gatherTarget(viewport, window.scrollY);
        if (reduced.matches) {
          morph = 1;
        } else {
          // Damped, so a flick of the wheel glides rather than jumps.
          morph += (target - morph) * (1 - Math.exp(-dt * 1.8));
        }
        // How fully the N has formed: 0 until it is nearly whole, 1 once it is.
        const formed = Math.min(1, Math.max(0, (morph - 0.85) / 0.15));
        // The turning only runs on the finished N; scrolled back into a
        // scattered field it starts over from facing the reader.
        if (formed === 0) spin = 0;
        else if (!reduced.matches) spin += dt * 0.2 * formed;
        material.uniforms.uMorph.value = morph;
        material.uniforms.uTime.value = reduced.matches ? 0 : clock.elapsedTime;
        // Scattered, the field lies flat on the screen - no turn, no tilt, no
        // parallax; the N, once whole, turns and follows the pointer.
        group.rotation.y = (spin + pointer.x * 0.35) * formed;
        group.rotation.x = (0.18 + pointer.y * 0.2) * formed;
        renderer.render(scene, camera);
      };

      const onVisibility = () => {
        cancelAnimationFrame(frame);
        if (document.visibilityState === "visible") {
          clock.getDelta();
          tick();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      tick();
      canvas.dataset.ready = "";

      cleanup = () => {
        cancelAnimationFrame(frame);
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onPointer);
        resize.disconnect();
        seen.disconnect();
        themeWatch.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 size-full opacity-0 transition-opacity duration-1000 ease-house data-[ready]:opacity-100"
    />
  );
}
