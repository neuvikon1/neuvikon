"use client";

import { useEffect, useRef } from "react";

/**
 * The home page's one authored moment: a cloud of points behind the page that
 * becomes each division as it is scrolled to.
 *
 * The signature's N opens the page, then the cloud folds into a twenty-sided
 * die for Games, a lattice for Tech and a gear for Robotics, and opens out
 * into a ring for the studio below. Every shape is held as its own position
 * attribute on the same points, so a morph is one uniform moving between them
 * in the vertex shader: one draw call, nothing rebuilt while scrolling.
 *
 * Scroll decides *which* shape and *how far* into the next one; time only
 * turns it. Under reduced motion the turn stops and the cloud steps between
 * shapes instead of flowing - the page still says which division you are in.
 *
 * three.js is imported inside the effect, so it never sits on the first-load
 * path: the page is complete without this layer, and it fades in once ready.
 */

/** Section anchors, in page order, and the shape each one wakes. */
const ANCHORS = ["games", "tech", "robotics", "studio"] as const;

const VERTEX = /* glsl */ `
  attribute vec3 p1;
  attribute vec3 p2;
  attribute vec3 p3;
  attribute vec3 p4;
  attribute vec3 aDir;
  attribute float aRand;

  uniform float uMorph;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vAlpha;

  // How far this point has travelled from shape k-1 to shape k. Each point
  // leaves on its own beat (aRand), so a morph reads as a flock turning
  // rather than a rigid body sliding.
  float step_(float k) {
    float t = clamp((uMorph - (k - 1.0)) * 1.35 - aRand * 0.35, 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }

  void main() {
    float s1 = step_(1.0);
    float s2 = step_(2.0);
    float s3 = step_(3.0);
    float s4 = step_(4.0);
    vec3 pos = mix(mix(mix(mix(position, p1, s1), p2, s2), p3, s3), p4, s4);

    // Mid-flight the points lift off their path, so the cloud breathes open
    // between shapes and closes again on arrival.
    float flight = sin(3.14159 * fract(clamp(uMorph, 0.0, 3.999)));
    pos += aDir * flight * 0.35;
    // A slow shimmer at rest, small enough to keep every edge readable.
    pos += aDir * sin(uTime * 0.8 + aRand * 6.2831) * 0.015;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.6 + aRand * 0.8) / -mv.z;
    vAlpha = 0.55 + aRand * 0.45;
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

/** A point on the surface of an axis-aligned box, weighted by face area. */
function onBox(r: Rand, cx: number, cy: number, w: number, h: number, d: number, out: number[]) {
  const faces = [w * h, w * h, w * d, w * d, h * d, h * d];
  const total = faces.reduce((s, f) => s + f, 0);
  let pick = r() * total;
  let face = 0;
  while (pick > faces[face]) pick -= faces[face++];
  const u = r() - 0.5;
  const v = r() - 0.5;
  const side = face % 2 === 0 ? 0.5 : -0.5;
  if (face < 2) out.push(cx + u * w, cy + v * h, side * d);
  else if (face < 4) out.push(cx + u * w, cy + side * h, v * d);
  else out.push(cx + side * w, cy + u * h, v * d);
}

/** The signature's N, as three slabs: two stems and the diagonal between them. */
function monogram(count: number, r: Rand) {
  const out: number[] = [];
  const h = 2.6;
  const stem = 0.42;
  const depth = 0.45;
  const span = 1.9;
  for (let i = 0; i < count; i++) {
    const pick = r();
    if (pick < 0.3) onBox(r, -span / 2, 0, stem, h, depth, out);
    else if (pick < 0.6) onBox(r, span / 2, 0, stem, h, depth, out);
    else {
      // The diagonal: a box sheared from the top of the left stem to the
      // foot of the right one.
      const t = r();
      const x = -span / 2 + t * span;
      const y = h / 2 - t * h;
      const across = (r() - 0.5) * stem * 1.15;
      const z = (r() - 0.5) * depth;
      const edge = r() < 0.5;
      out.push(x + across * 0.5, y + across * 0.6, edge ? Math.sign(z) * depth * 0.5 : z);
    }
  }
  return out;
}

/** A d20: points on the faces of an icosahedron, with its edges drawn heavier. */
function die(count: number, r: Rand) {
  const t = (1 + Math.sqrt(5)) / 2;
  const v = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(([x, y, z]) => {
    const l = Math.hypot(x, y, z) / 1.75;
    return [x / l, y / l, z / l];
  });
  const f = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const [a, b, c] = f[Math.floor(r() * f.length)].map((k) => v[k]);
    let u = r();
    let w = r();
    if (u + w > 1) {
      u = 1 - u;
      w = 1 - w;
    }
    // Two in five points ride an edge, which is what makes it read as a die.
    if (r() < 0.4) {
      w = 0;
    }
    out.push(
      a[0] + u * (b[0] - a[0]) + w * (c[0] - a[0]),
      a[1] + u * (b[1] - a[1]) + w * (c[1] - a[1]),
      a[2] + u * (b[2] - a[2]) + w * (c[2] - a[2]),
    );
  }
  return out;
}

/** A 4x4x4 lattice of edges with a node at every crossing - data, wired. */
function lattice(count: number, r: Rand) {
  const out: number[] = [];
  const n = 4;
  const size = 2.6;
  const cell = size / (n - 1);
  for (let i = 0; i < count; i++) {
    const a = Math.floor(r() * n) * cell - size / 2;
    const b = Math.floor(r() * n) * cell - size / 2;
    if (r() < 0.25) {
      // Nodes: a tight knot of points at a crossing.
      const c = Math.floor(r() * n) * cell - size / 2;
      const j = () => (r() - 0.5) * 0.09;
      out.push(a + j(), b + j(), c + j());
      continue;
    }
    const along = (r() - 0.5) * size;
    const axis = Math.floor(r() * 3);
    if (axis === 0) out.push(along, a, b);
    else if (axis === 1) out.push(a, along, b);
    else out.push(a, b, along);
  }
  return out;
}

/** A twelve-tooth gear with a hub and spokes. */
function gear(count: number, r: Rand) {
  const out: number[] = [];
  const teeth = 12;
  const inner = 1.15;
  const outer = 1.5;
  const tip = 1.82;
  const depth = 0.5;
  for (let i = 0; i < count; i++) {
    const pick = r();
    const z = (r() - 0.5) * depth;
    if (pick < 0.55) {
      // The rim and its teeth, profile and faces.
      const ang = r() * Math.PI * 2;
      const phase = ((ang / (Math.PI * 2)) * teeth) % 1;
      const onTooth = phase > 0.15 && phase < 0.55;
      const rad = inner + r() * ((onTooth ? tip : outer) - inner);
      const face = r() < 0.6;
      out.push(Math.cos(ang) * rad, Math.sin(ang) * rad, face ? Math.sign(z) * depth * 0.5 : z);
    } else if (pick < 0.75) {
      // Hub.
      const ang = r() * Math.PI * 2;
      const rad = 0.3 + r() * 0.15;
      out.push(Math.cos(ang) * rad, Math.sin(ang) * rad, z * 1.4);
    } else {
      // Five spokes.
      const spoke = Math.floor(r() * 5);
      const ang = (spoke / 5) * Math.PI * 2 + (r() - 0.5) * 0.12;
      const rad = 0.45 + r() * (inner - 0.45);
      out.push(Math.cos(ang) * rad, Math.sin(ang) * rad, z * 0.6);
    }
  }
  return out;
}

/** A tilted orbit, the three divisions' paths opened out into one ring. */
function ring(count: number, r: Rand) {
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const ang = r() * Math.PI * 2;
    const band = Math.floor(r() * 3);
    const rad = 1.35 + band * 0.32 + (r() - 0.5) * 0.06;
    const lift = (r() - 0.5) * 0.08;
    out.push(Math.cos(ang) * rad, lift, Math.sin(ang) * rad);
  }
  return out;
}

/* ---------- Scroll to morph. ---------- */

/**
 * Where the scroll is, as a shape index. A section's shape holds for the whole
 * of that section; the change into the next one happens only at the boundary,
 * while the next section's top edge rises through the screen, and is complete
 * by the time its heading is read.
 */
function morphTarget(tops: number[], viewport: number, scroll: number) {
  let m = 0;
  for (let k = 0; k < tops.length; k++) {
    // Where the section's top edge is on screen, 0 = top, 1 = bottom.
    const edge = (tops[k] - scroll) / viewport;
    // The change runs while that edge climbs from 80% to 30% of the screen;
    // either side of it the shape holds, for the whole of its section.
    const t = Math.min(1, Math.max(0, (0.8 - edge) / 0.5));
    if (t === 0) break;
    m = k + t;
  }
  return m;
}

/** The brand green, a step deeper on white so it holds its contrast there. */
const COLOR = { light: 0x2f8f4a, dark: 0x5cc777 };

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
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(monogram(count, r), 3));
      geometry.setAttribute("p1", new THREE.Float32BufferAttribute(die(count, r), 3));
      geometry.setAttribute("p2", new THREE.Float32BufferAttribute(lattice(count, r), 3));
      geometry.setAttribute("p3", new THREE.Float32BufferAttribute(gear(count, r), 3));
      geometry.setAttribute("p4", new THREE.Float32BufferAttribute(ring(count, r), 3));
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
      let tops: number[] = [];
      let viewport = window.innerHeight;
      const measure = () => {
        const w = window.innerWidth;
        viewport = window.innerHeight;
        renderer.setSize(w, viewport, false);
        camera.aspect = w / viewport;
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
          // sized so the widest shape (the gear's teeth) stays clear of it.
          group.position.set(visibleW * 0.3, 0, 0);
          group.scale.setScalar(Math.min(1, visibleH / 6.6, visibleW / 13));
          material.uniforms.uOpacity.value = 0.95;
        }
        tops = ANCHORS.map((id) => {
          const el = document.getElementById(id);
          return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
        });
      };
      measure();
      const resize = new ResizeObserver(measure);
      resize.observe(document.body);

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
      let morph = morphTarget(tops, viewport, window.scrollY);
      let spin = 0;
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        const dt = Math.min(clock.getDelta(), 0.05);
        const target = morphTarget(tops, viewport, window.scrollY);
        if (reduced.matches) {
          morph = Math.round(target);
        } else {
          // Damped, so a flick of the wheel glides rather than jumps.
          morph += (target - morph) * (1 - Math.exp(-dt * 1.8));
          spin += dt * 0.1;
        }
        material.uniforms.uMorph.value = morph;
        material.uniforms.uTime.value = reduced.matches ? 0 : clock.elapsedTime;
        group.rotation.y = spin + window.scrollY * 0.0002 + pointer.x * 0.35;
        group.rotation.x = 0.18 + pointer.y * 0.2;
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
      className="pointer-events-none fixed inset-0 -z-10 h-svh w-full opacity-0 transition-opacity duration-1000 ease-house data-[ready]:opacity-100"
    />
  );
}
