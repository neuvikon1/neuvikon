"use client";

import { useEffect, useRef } from "react";

/**
 * Shardbound's page as a dungeon corridor: a torch burning at each side of
 * the screen and dust hanging in the air between them.
 *
 * The torches are two soft glows on the screen edges, one high on the left and
 * one low on the right, whose brightness flickers on a few out-of-step waves -
 * the irregular breathing of a real flame rather than a pulse. The dust is a
 * field of motes drifting slowly through that light: each one is lit by its
 * distance to the torches, so motes passing near a flame catch it and glow
 * warm while the rest stay faint. Both share one flicker, so the dust brightens
 * and dims with the fire it is lit by.
 *
 * Under reduced motion the flames hold steady and the dust hangs still.
 * three.js loads inside the effect, so the page never waits for this layer.
 */

const VERTEX = /* glsl */ `
  attribute vec4 aSeed; // x (0-1), y (0-1), phase, size

  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uView;
  uniform float uPixelRatio;
  uniform vec2 uTorchA;
  uniform vec2 uTorchB;
  uniform vec2 uFlicker;
  uniform float uReach;

  varying float vLight;
  varying float vBlur;

  void main() {
    float t = uTime;
    float ph = aSeed.z * 6.2831;
    // A slow drift right and down, wandering on two out-of-step waves; the
    // field wraps at the screen edges so it never thins out.
    float x = aSeed.x * uView.x + t * 5.0 + sin(t * 0.13 + ph) * 46.0;
    float y = aSeed.y * uView.y - t * 2.5 + cos(t * 0.09 + ph * 1.7) * 32.0 + uScroll * 0.12;
    x = mod(x, uView.x + 40.0) - 20.0;
    y = mod(y, uView.y + 40.0) - 20.0;
    vec2 p = vec2(x, y);

    float a = exp(-pow(distance(p, uTorchA) / uReach, 2.0)) * uFlicker.x;
    float b = exp(-pow(distance(p, uTorchB) / uReach, 2.0)) * uFlicker.y;
    vLight = clamp(a + b, 0.0, 1.0);

    vBlur = step(0.92, aSeed.w);
    // Screen pixels to clip space, y down.
    gl_Position = vec4(p.x / uView.x * 2.0 - 1.0, 1.0 - p.y / uView.y * 2.0, 0.0, 1.0);
    float size = mix(1.5 + aSeed.w * 2.5, 10.0 + aSeed.w * 8.0, vBlur);
    gl_PointSize = size * (0.8 + vLight * 0.5) * uPixelRatio;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uDust;
  uniform vec3 uWarm;
  uniform float uBase;

  varying float vLight;
  varying float vBlur;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, mix(0.1, 0.0, vBlur), d);
    if (a < 0.01) discard;
    vec3 color = mix(uDust, uWarm, vLight);
    float alpha = (uBase + vLight * 0.75) * mix(1.0, 0.25, vBlur);
    gl_FragColor = vec4(color, a * alpha);
  }
`;

/** Torch and dust colours per theme: a glow on black, a warm stain on white. */
const PALETTE = {
  dark: { dust: 0x8c8f99, warm: 0xffb45c, base: 0.22, glow: "rgba(255, 150, 60, 0.30)", glowCore: "rgba(255, 190, 110, 0.20)" },
  light: { dust: 0x9a8f80, warm: 0xd9731a, base: 0.32, glow: "rgba(230, 130, 40, 0.16)", glowCore: "rgba(240, 160, 70, 0.12)" },
};

/** Where each torch hangs, as a fraction of the screen: left-high, right-low. */
const TORCHES = [
  { x: 0, y: 0.32 },
  { x: 1, y: 0.68 },
];

/** A flame's brightness at time t: three out-of-step waves, 0.7-1. */
function flicker(t: number, seed: number) {
  const n = Math.sin(t * 11.3 + seed) + Math.sin(t * 6.7 + seed * 2.1) * 0.7 + Math.sin(t * 23.9 + seed * 3.7) * 0.3;
  return 0.85 + (n / 2) * 0.15;
}

export function TorchDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup = () => {};

    const isDark = () => document.documentElement.classList.contains("dark");
    const paintGlows = () => {
      const p = isDark() ? PALETTE.dark : PALETTE.light;
      glowRefs.current.forEach((el) => {
        if (el) el.style.background = `radial-gradient(closest-side, ${p.glowCore}, ${p.glow} 35%, transparent)`;
      });
    };
    paintGlows();

    import("three").then((THREE) => {
      if (disposed) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const small = window.matchMedia("(max-width: 1023px)");
      const count = small.matches ? 130 : 280;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
      } catch {
        return; // No WebGL: the torches still burn; only the dust is missing.
      }
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      const scene = new THREE.Scene();
      const camera = new THREE.Camera();

      const seeds = new Float32Array(count * 4);
      for (let i = 0; i < count; i++) seeds.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
      geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uView: { value: new THREE.Vector2(1, 1) },
          uPixelRatio: { value: dpr },
          uTorchA: { value: new THREE.Vector2() },
          uTorchB: { value: new THREE.Vector2() },
          uFlicker: { value: new THREE.Vector2(1, 1) },
          uReach: { value: 300 },
          uDust: { value: new THREE.Color() },
          uWarm: { value: new THREE.Color() },
          uBase: { value: 0.25 },
        },
      });
      scene.add(new THREE.Points(geometry, material));
      const render = () => renderer.render(scene, camera);

      const applyTheme = () => {
        const dark = isDark();
        const p = dark ? PALETTE.dark : PALETTE.light;
        material.uniforms.uDust.value.set(p.dust);
        material.uniforms.uWarm.value.set(p.warm);
        material.uniforms.uBase.value = p.base;
        material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        material.needsUpdate = true;
        paintGlows();
        render();
      };

      const measure = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        material.uniforms.uView.value.set(w, h);
        material.uniforms.uTorchA.value.set(TORCHES[0].x * w, TORCHES[0].y * h);
        material.uniforms.uTorchB.value.set(TORCHES[1].x * w, TORCHES[1].y * h);
        material.uniforms.uReach.value = Math.max(220, Math.min(w, h) * 0.42);
        render();
      };
      applyTheme();
      measure();
      window.addEventListener("resize", measure);
      const themeWatch = new MutationObserver(applyTheme);
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      const setFlicker = (t: number) => {
        const a = flicker(t, 0.4);
        const b = flicker(t, 2.9);
        material.uniforms.uFlicker.value.set(a, b);
        const glows = glowRefs.current;
        if (glows[0]) glows[0].style.opacity = String(a);
        if (glows[1]) glows[1].style.opacity = String(b);
      };

      const clock = new THREE.Clock();
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();
        material.uniforms.uTime.value = t;
        material.uniforms.uScroll.value = window.scrollY;
        setFlicker(t);
        render();
      };
      const start = () => {
        cancelAnimationFrame(frame);
        if (reduced.matches) {
          // A steady flame and still dust: one frame, and nothing after it.
          material.uniforms.uTime.value = 30;
          material.uniforms.uFlicker.value.set(0.9, 0.9);
          glowRefs.current.forEach((el) => el && (el.style.opacity = "0.9"));
          render();
        } else if (document.visibilityState === "visible") tick();
      };
      document.addEventListener("visibilitychange", start);
      reduced.addEventListener("change", start);
      start();
      canvas.dataset.ready = "";

      cleanup = () => {
        cancelAnimationFrame(frame);
        document.removeEventListener("visibilitychange", start);
        reduced.removeEventListener("change", start);
        window.removeEventListener("resize", measure);
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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {TORCHES.map((torch, i) => (
        <div
          key={i}
          ref={(el) => {
            glowRefs.current[i] = el;
          }}
          className="absolute size-[90vmin] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${torch.x * 100}%`, top: `${torch.y * 100}%` }}
        />
      ))}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 ease-house data-[ready]:opacity-100"
      />
    </div>
  );
}
