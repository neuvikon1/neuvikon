"use client";

import { useEffect, useRef } from "react";

/**
 * Sparks rising behind the Kor ve Kül page, as if the page sat over the game's
 * hearth. Sparse on purpose - the copy stays on a clean ground and the sparks
 * live in the margins and gaps around it.
 *
 * Every spark is one point whose whole life is computed in the vertex shader
 * from time: it rises from below the screen, sways, cools from yellow through
 * orange to red and burns out before the top. Nothing is updated per spark on
 * the CPU. A few large, faint ones sit out of focus for depth. Scrolling
 * drags the field a little, so it feels like the page moves through the air.
 *
 * Under reduced motion the sparks hold still as one frame. three.js loads
 * inside the effect, so the page never waits for this layer.
 */

const VERTEX = /* glsl */ `
  attribute vec4 aSeed; // x position (0-1), phase, speed, size

  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uView;
  uniform float uPixelRatio;

  varying float vLife;
  varying float vBlur;

  void main() {
    float travel = uView.y + 120.0;
    float speed = 30.0 + aSeed.z * 70.0;
    // 0 at the bottom edge, 1 at the top: where this spark is in its life.
    float life = fract(aSeed.y + (uTime * speed + uScroll * 0.35) / travel);
    float y = -uView.y * 0.5 - 60.0 + life * travel;
    float x = (aSeed.x - 0.5) * uView.x
      + sin(uTime * (0.6 + aSeed.w) + aSeed.y * 40.0) * (14.0 + aSeed.z * 22.0) * life;

    vBlur = step(0.86, aSeed.w);
    vLife = life;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, 0.0, 1.0);
    float size = mix(3.0 + aSeed.w * 4.0, 16.0 + aSeed.w * 12.0, vBlur);
    gl_PointSize = size * (1.0 - life * 0.55) * uPixelRatio;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uHot;
  uniform vec3 uWarm;
  uniform vec3 uCool;
  uniform float uStrength;

  varying float vLife;
  varying float vBlur;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float edge = mix(0.12, 0.0, vBlur);
    float a = smoothstep(0.5, edge, d);
    if (a < 0.01) discard;
    vec3 color = vLife < 0.4 ? mix(uHot, uWarm, vLife / 0.4) : mix(uWarm, uCool, (vLife - 0.4) / 0.6);
    // Fades in off the bottom edge, burns out before the top.
    float fade = smoothstep(0.0, 0.08, vLife) * (1.0 - smoothstep(0.55, 0.95, vLife));
    gl_FragColor = vec4(color, a * fade * mix(1.0, 0.22, vBlur) * uStrength);
  }
`;

/** On black the sparks glow; on white they are drawn a step deeper to hold contrast. */
const PALETTES = {
  // Kor ve Kül's hearth: yellow cooling through orange to red.
  fire: {
    dark: { hot: 0xffe08a, warm: 0xff8a2a, cool: 0xc4361c, strength: 0.95 },
    light: { hot: 0xf59f00, warm: 0xe8590c, cool: 0xb02a14, strength: 0.9 },
  },
  // Eclosion's violet flame: pale lilac cooling through violet to deep purple.
  violet: {
    dark: { hot: 0xf3d6ff, warm: 0xb46cff, cool: 0x5b21b6, strength: 0.95 },
    light: { hot: 0xc084fc, warm: 0x9333ea, cool: 0x581c87, strength: 0.85 },
  },
};

export function EmberField({ palette = "fire", density = 1 }: { palette?: keyof typeof PALETTES; density?: number }) {
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
      const count = Math.round((small.matches ? 140 : 320) * density);

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
      } catch {
        return; // No WebGL: the page is whole without the sparks.
      }
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

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
          uHot: { value: new THREE.Color() },
          uWarm: { value: new THREE.Color() },
          uCool: { value: new THREE.Color() },
          uStrength: { value: 1 },
        },
      });
      scene.add(new THREE.Points(geometry, material));

      const render = () => renderer.render(scene, camera);

      const applyTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        const p = dark ? PALETTES[palette].dark : PALETTES[palette].light;
        material.uniforms.uHot.value.set(p.hot);
        material.uniforms.uWarm.value.set(p.warm);
        material.uniforms.uCool.value.set(p.cool);
        material.uniforms.uStrength.value = p.strength;
        // A glow adds light on black; on white there is no brighter pixel to add.
        material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        material.needsUpdate = true;
        render();
      };

      const measure = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.left = -w / 2;
        camera.right = w / 2;
        camera.top = h / 2;
        camera.bottom = -h / 2;
        camera.updateProjectionMatrix();
        material.uniforms.uView.value.set(w, h);
        render();
      };
      applyTheme();
      measure();
      window.addEventListener("resize", measure);
      const themeWatch = new MutationObserver(applyTheme);
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      const clock = new THREE.Clock();
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        material.uniforms.uTime.value = clock.getElapsedTime();
        material.uniforms.uScroll.value = window.scrollY;
        render();
      };
      const start = () => {
        cancelAnimationFrame(frame);
        // Reduced motion: one still frame, mid-flight, and nothing after it.
        if (reduced.matches) {
          material.uniforms.uTime.value = 40;
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
  }, [palette, density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-svh w-full opacity-0 transition-opacity duration-1000 ease-house data-[ready]:opacity-100"
    />
  );
}
