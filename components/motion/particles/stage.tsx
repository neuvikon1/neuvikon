"use client";

import { useEffect, useRef } from "react";

import { mulberry32, type Cloud, type Rand } from "./shapes";

/**
 * A cloud of points behind the page that changes shape as the page is
 * scrolled. The home page and every project page run on this; what differs
 * is the `Recipe`: which shapes, in what order, tied to which sections, and
 * what each one does while it is on screen.
 *
 * Every shape is held as its own position and colour attribute on the same
 * points, so a morph is one uniform moving between them in the vertex shader -
 * one draw call, nothing rebuilt while scrolling. Behaviour (embers rising, a
 * dial turning, wings beating) is the shader too, weighted by how present its
 * shape is, so it fades in and out with the morph.
 *
 * Scroll decides which shape and how far into the next; time only animates.
 * Under reduced motion time stops and the cloud steps between shapes instead
 * of flowing. three.js is imported inside the effect, so it never sits on the
 * first-load path: the page is complete without this layer.
 */

export type Mode = "none" | "rise" | "burst" | "orbit" | "wave" | "fall" | "spin" | "flow" | "flap";
const MODES: Mode[] = ["none", "rise", "burst", "orbit", "wave", "fall", "spin", "flow", "flap"];

export type StageDef = {
  build: (n: number, r: Rand) => Cloud | Promise<Cloud>;
  mode?: Mode;
  /** Point size relative to the base; a picture wants denser, larger points. */
  size?: number;
  /** Opaque, hard-edged points: a picture reads as a picture, not as dust. */
  solid?: boolean;
};

/**
 * An element id (`"media"`), a point inside one as a fraction of its height
 * (`"media@0.5"`), or a distance down the page in screens.
 */
export type Anchor = string | { screens: number };

export type Recipe = {
  seed: number;
  /** One to five shapes, in page order. */
  stages: StageDef[];
  /** Where each shape after the first is reached: one per stage after the first. */
  anchors: Anchor[];
  /** One brand colour that follows the theme, instead of the shapes' own colours. */
  tint?: boolean;
  /** Turn continuously; otherwise sway, which keeps flat shapes facing the reader. */
  spin?: boolean;
  /** Fade the cloud out once this section is on screen (it would sit behind it). */
  fadeAt?: string;
  count: { desktop: number; mobile: number };
  /** How far down the page (in screens) each morph is spread over. */
  run?: number;
};

const MAX = 5;

const VERTEX = /* glsl */ `
  attribute vec3 p1;
  attribute vec3 p2;
  attribute vec3 p3;
  attribute vec3 p4;
  attribute vec3 c0;
  attribute vec3 c1;
  attribute vec3 c2;
  attribute vec3 c3;
  attribute vec3 c4;
  attribute vec3 aDir;
  attribute float aRand;

  uniform float uMorph;
  uniform float uLast;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uModes[${MAX}];
  uniform float uSizes[${MAX}];
  uniform float uSolids[${MAX}];

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSolid;

  // How far this point has travelled from shape k-1 to shape k. Each point
  // leaves on its own beat, so a morph reads as a flock turning.
  float arrive(float k) {
    float t = clamp((uMorph - (k - 1.0)) * 1.35 - aRand * 0.35, 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec2 rotate(vec2 p, float a) {
    float c = cos(a), s = sin(a);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }

  // One shape's behaviour, at strength w (0 when that shape is not on screen).
  void behave(float mode, float w, inout vec3 pos, inout float alpha) {
    if (w < 0.001 || mode < 0.5) return;
    float t = uTime;
    if (mode < 1.5) {
      // rise: a third of the points lift off as embers and burn out.
      if (aRand > 0.68) {
        float k = fract(t * 0.16 * (0.6 + aRand) + aRand * 13.0);
        pos.y += k * 2.8 * w;
        pos.x += sin(k * 6.0 + aRand * 20.0) * 0.18 * w;
        alpha *= mix(1.0, 1.0 - k, w);
      }
    } else if (mode < 2.5) {
      // burst: the shape breathes apart along each point's own direction.
      pos += aDir * (0.5 + 0.5 * sin(t * 0.9 + aRand * 0.8)) * 0.16 * w;
    } else if (mode < 3.5) {
      // orbit: everything inside the rim circles; the rim holds still.
      float inside = 1.0 - step(1.6, length(pos.xy));
      pos.xy = rotate(pos.xy, t * 0.45 * w * inside);
    } else if (mode < 4.5) {
      // wave: a slow swell running across the shape.
      pos.y += sin(t * 1.4 + pos.x * 1.8) * 0.09 * w;
      pos.z += cos(t * 1.1 + pos.y * 1.5) * 0.14 * w;
    } else if (mode < 5.5) {
      // fall: what sits near the rim drops off it, marble by marble.
      if (length(pos.xy) > 1.15 && pos.z > -0.05) {
        float k = fract(t * 0.18 + hash(floor(pos.xy * 2.2)));
        pos.y -= k * k * 3.2 * w;
        alpha *= 1.0 - k * w;
      }
    } else if (mode < 6.5) {
      // spin: the outer dial turns round a still centre.
      if (length(pos.xy) > 1.4) pos.xy = rotate(pos.xy, t * 0.6 * w);
    } else if (mode < 7.5) {
      // flow: tickets slide along their lanes towards the terminal.
      if (aRand > 0.6 && pos.x < 1.2) pos.x = -2.1 + mod(pos.x + 2.1 + t * 0.5 * w, 3.2);
    } else {
      // flap: wings close towards the body and open again.
      float f = 0.5 + 0.5 * sin(t * 3.2);
      float wing = smoothstep(0.05, 0.4, abs(pos.x));
      pos.z += abs(pos.x) * w * f * wing * 0.5;
      pos.x *= 1.0 - w * 0.35 * f * wing;
    }
  }

  void main() {
    float s1 = arrive(1.0);
    float s2 = arrive(2.0);
    float s3 = arrive(3.0);
    float s4 = arrive(4.0);
    vec3 pos = mix(mix(mix(mix(position, p1, s1), p2, s2), p3, s3), p4, s4);
    vColor = mix(mix(mix(mix(c0, c1, s1), c2, s2), c3, s3), c4, s4);

    float w[${MAX}];
    w[0] = 1.0 - s1;
    w[1] = s1 * (1.0 - s2);
    w[2] = s2 * (1.0 - s3);
    w[3] = s3 * (1.0 - s4);
    w[4] = s4;

    float alpha = 0.6 + aRand * 0.4;
    float size = 0.0;
    float solid = 0.0;
    for (int k = 0; k < ${MAX}; k++) {
      behave(uModes[k], w[k], pos, alpha);
      size += uSizes[k] * w[k];
      solid += uSolids[k] * w[k];
    }
    alpha = mix(alpha, 1.0, solid);
    vSolid = solid;

    // Mid-flight the points lift off their path, so the cloud breathes open
    // between shapes and closes again on arrival.
    float flight = sin(3.14159 * fract(clamp(uMorph, 0.0, uLast - 0.001)));
    pos += aDir * flight * 0.35;
    pos += aDir * sin(uTime * 0.8 + aRand * 6.2831) * 0.012;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * size * uPixelRatio * mix(0.7 + aRand * 0.6, 1.0, solid) / -mv.z;
    vAlpha = alpha;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uTint;
  uniform float uUseTint;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSolid;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    // Soft dust, or for a picture a near-square tile that closes the gaps.
    float a = mix(smoothstep(0.5, 0.15, d), 1.0 - step(0.5, max(abs(gl_PointCoord.x - 0.5), abs(gl_PointCoord.y - 0.5))), vSolid);
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(vColor, uTint, uUseTint), a * vAlpha * uOpacity);
  }
`;

/** The brand green, a step deeper on white so it holds its contrast there. */
const BRAND = { light: 0x2f8f4a, dark: 0x5cc777 };

/**
 * Where the scroll is, as a stage index. Each stage is reached as its anchor
 * crosses the middle of the screen, and the morph into it runs over the screen
 * before that, so the new form is assembled by the time its heading is read.
 */
function morphTarget(tops: number[], viewport: number, scroll: number, spread: number) {
  const probe = scroll + viewport * 0.5;
  let m = 0;
  // A morph never starts before the previous stage has landed, nor before the
  // reader has scrolled at all - on a short page the first anchor can sit
  // inside the first screen, and the opening shape still deserves to be seen.
  let floor = viewport * 0.5;
  for (let k = 0; k < tops.length; k++) {
    const start = Math.max(tops[k] - viewport * spread, floor);
    const run = Math.max(1, tops[k] - start);
    if (probe <= start) break;
    m = k + Math.min(1, (probe - start) / run);
    floor = tops[k];
  }
  return m;
}

export function ParticleStage({ recipe }: { recipe: Recipe }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup = () => {};

    const small = window.matchMedia("(max-width: 1023px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const count = small.matches ? recipe.count.mobile : recipe.count.desktop;
    const stages = recipe.stages.slice(0, MAX);

    const build = async () => {
      const r = mulberry32(recipe.seed);
      const clouds: Cloud[] = [];
      for (const stage of stages) {
        try {
          clouds.push(await stage.build(count, r));
        } catch {
          // A picture that will not load: hold the previous shape instead.
          clouds.push(clouds[clouds.length - 1] ?? { pos: new Float32Array(count * 3), col: new Float32Array(count * 3) });
        }
      }
      return { clouds, r };
    };

    Promise.all([import("three"), build()]).then(([THREE, { clouds, r }]) => {
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
      } catch {
        return; // No WebGL: the page is whole without this layer.
      }
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
      camera.position.set(0, 0, 9);

      // Fewer than five stages: the last one repeats, so the chain just rests there.
      const at = (k: number) => clouds[Math.min(k, clouds.length - 1)];
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(at(0).pos, 3));
      for (let k = 1; k < MAX; k++) geometry.setAttribute(`p${k}`, new THREE.BufferAttribute(at(k).pos, 3));
      for (let k = 0; k < MAX; k++) geometry.setAttribute(`c${k}`, new THREE.BufferAttribute(at(k).col, 3));
      const dirs = new Float32Array(count * 3);
      const rands = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const v = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize();
        dirs.set([v.x, v.y, v.z], i * 3);
        rands[i] = r();
      }
      geometry.setAttribute("aDir", new THREE.BufferAttribute(dirs, 3));
      geometry.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));
      geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 5);

      const modes = Array.from({ length: MAX }, (_, k) => MODES.indexOf(stages[Math.min(k, stages.length - 1)].mode ?? "none"));
      const sizes = Array.from({ length: MAX }, (_, k) => stages[Math.min(k, stages.length - 1)].size ?? 1);
      const solids = Array.from({ length: MAX }, (_, k) => (stages[Math.min(k, stages.length - 1)].solid ? 1 : 0));

      const isDark = () => document.documentElement.classList.contains("dark");
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uMorph: { value: 0 },
          uLast: { value: Math.max(1, stages.length - 1) },
          uTime: { value: 0 },
          uSize: { value: 26 },
          uPixelRatio: { value: dpr },
          uModes: { value: modes },
          uSizes: { value: sizes },
          uSolids: { value: solids },
          uTint: { value: new THREE.Color(BRAND.light) },
          uUseTint: { value: recipe.tint ? 1 : 0 },
          uOpacity: { value: 1 },
        },
      });
      const applyTheme = () => {
        const dark = isDark();
        material.uniforms.uTint.value.set(dark ? BRAND.dark : BRAND.light);
        // A tinted glow adds on black; anything on white, and any picture, is plain ink.
        material.blending = dark && recipe.tint ? THREE.AdditiveBlending : THREE.NormalBlending;
        material.needsUpdate = true;
      };
      applyTheme();

      const group = new THREE.Group();
      group.add(new THREE.Points(geometry, material));
      scene.add(group);

      let tops: number[] = [];
      let fadeTop = Infinity;
      let viewport = window.innerHeight;
      let baseOpacity = 1;
      const measure = () => {
        const w = window.innerWidth;
        viewport = window.innerHeight;
        renderer.setSize(w, viewport, false);
        camera.aspect = w / viewport;
        camera.updateProjectionMatrix();
        const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        const visibleW = visibleH * camera.aspect;
        if (small.matches) {
          // On a phone the cloud is a backdrop, low enough never to compete with the copy.
          group.position.set(visibleW * 0.18, -visibleH * 0.12, 0);
          group.scale.setScalar(0.75);
          baseOpacity = recipe.tint ? 0.2 : 0.28;
        } else {
          // On a wide screen it takes the right third the copy leaves open.
          group.position.set(visibleW * 0.3, 0, 0);
          group.scale.setScalar(Math.min(1, visibleH / 6.6, visibleW / 13));
          baseOpacity = 0.95;
        }
        const docTop = (el: HTMLElement | null) => (el ? el.getBoundingClientRect().top + window.scrollY : Infinity);
        // The first stage lands no sooner than 0.9 screens down, so the
        // opening shape gets a moment even on a page with a short top.
        let last = viewport * 0.4;
        tops = recipe.anchors.map((a) => {
          let top: number;
          if (typeof a === "string") {
            const [id, at = "0"] = a.split("@");
            const el = document.getElementById(id);
            top = docTop(el) + (el ? el.offsetHeight * Number(at) : 0);
          } else top = a.screens * viewport;
          // Keep the stages in order and at least a third of a screen apart.
          last = Math.max(top, last + viewport * 0.35);
          return last;
        });
        fadeTop = recipe.fadeAt ? docTop(document.getElementById(recipe.fadeAt)) : Infinity;
      };
      measure();
      const resize = new ResizeObserver(measure);
      resize.observe(document.body);

      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.x = e.clientX / window.innerWidth - 0.5;
        pointer.y = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const themeWatch = new MutationObserver(applyTheme);
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      const clock = new THREE.Clock();
      let morph = morphTarget(tops, viewport, window.scrollY, recipe.run ?? 0.9);
      let spin = 0;
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        const dt = Math.min(clock.getDelta(), 0.05);
        const scroll = window.scrollY;
        const target = morphTarget(tops, viewport, scroll, recipe.run ?? 0.9);
        if (reduced.matches) {
          morph = Math.round(target);
        } else {
          morph += (target - morph) * (1 - Math.exp(-dt * 1.8)); // a flick of the wheel glides, slowly
          spin += dt;
        }
        const u = material.uniforms;
        u.uMorph.value = morph;
        u.uTime.value = reduced.matches ? 0 : clock.elapsedTime;
        // The fade starts once that section is 60% up the screen, so even a
        // short gallery shows its picture whole before the cloud goes.
        const fade = Math.min(1, Math.max(0, (scroll + viewport * 0.4 - fadeTop) / (viewport * 0.5)));
        u.uOpacity.value = baseOpacity * (1 - fade);
        group.rotation.y = recipe.spin
          ? spin * 0.1 + scroll * 0.0002 + pointer.x * 0.35
          : Math.sin(spin * 0.35) * 0.3 + pointer.x * 0.35;
        group.rotation.x = (recipe.spin ? 0.18 : 0.05) + pointer.y * 0.2;
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
  }, [recipe]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-svh w-full opacity-0 transition-opacity duration-1000 ease-house data-[ready]:opacity-100"
    />
  );
}
