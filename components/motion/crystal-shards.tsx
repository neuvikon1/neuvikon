"use client";

import { useEffect, useRef } from "react";

/**
 * Shardbound's page with crystal shards adrift behind it - the crystals the
 * game spends on its permanent upgrades, and the "shard" in its name.
 *
 * Each shard is a real faceted solid (a stretched, slightly irregular
 * bipyramid) with flat shading, so as it turns its faces catch a slowly
 * circling light and glint one at a time. They rise very slowly and tumble,
 * kept to the margins either side of the page - measured in pixels, with a
 * shard's own reach and some clear space, so not even a tip crosses the copy
 * (on a phone, where there are no margins, they stay small and few). Each
 * margin's shards are dealt evenly down it and rise at one speed, so they
 * keep their spacing; nearer ones move further when the page is scrolled,
 * which gives the field depth.
 *
 * Under reduced motion the shards hold still as one lit frame. three.js loads
 * inside the effect, so the page never waits for this layer.
 */

const CONTENT = 1190; // the page's content width in px (--container-max)
const PAD = 24; // clear space between a shard and the screen edge or the copy
const RISE = 0.12; // world units per second every shard rises at
const MIN_MARGIN = 120; // narrower margins than this: shards over the page, few

const PALETTE = {
  dark: { shard: [0x5fd4ea, 0x4c8dff, 0x8b6cff], emissive: 0x16304a, opacity: 0.75, ambient: 0.5 },
  light: { shard: [0x7fd3e6, 0x86a8f0, 0xa796f2], emissive: 0x000000, opacity: 0.7, ambient: 1.1 },
};

export function CrystalShards() {
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
      const count = small.matches ? 10 : 30;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return; // No WebGL: the page is whole without the shards.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 20);

      /* A shard: a six-sided bipyramid, long on top, with its points nudged so
         no two faces are quite alike. */
      const top = new THREE.ConeGeometry(0.5, 2.2, 6, 1);
      top.translate(0, 1.1, 0);
      const bottom = new THREE.ConeGeometry(0.5, 0.9, 6, 1);
      bottom.rotateX(Math.PI);
      bottom.translate(0, -0.45, 0);
      const geometry = new THREE.BufferGeometry();
      const a = top.toNonIndexed().getAttribute("position").array as Float32Array;
      const b = bottom.toNonIndexed().getAttribute("position").array as Float32Array;
      const merged = new Float32Array(a.length + b.length);
      merged.set(a);
      merged.set(b, a.length);
      for (let i = 0; i < merged.length; i += 3) {
        // Same nudge for the same corner, so faces stay closed.
        const k = Math.sin(merged[i] * 12.9 + merged[i + 1] * 7.1 + merged[i + 2] * 3.3) * 0.08;
        merged[i] *= 1 + k;
        merged[i + 2] *= 1 - k;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(merged, 3));
      geometry.computeVertexNormals();
      top.dispose();
      bottom.dispose();

      const material = new THREE.MeshStandardMaterial({
        flatShading: true,
        roughness: 0.18,
        metalness: 0.1,
        transparent: true,
      });
      const mesh = new THREE.InstancedMesh(geometry, material, count);
      scene.add(mesh);

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(4, 6, 8);
      const glint = new THREE.PointLight(0xbfefff, 60, 40, 1.6);
      scene.add(ambient, key, glint);

      /* Each shard's own life: where it starts, how fast it rises and turns. */
      /* Each shard's own life: where it starts, how fast it turns. `across` is
         where it sits in its margin, 0 at the screen edge and 1 by the copy. */
      type Shard = { side: -1 | 1; across: number; y: number; z: number; scale: number; axis: InstanceType<typeof THREE.Vector3>; spin: number; phase: number };
      const perSide = Math.ceil(count / 2);
      const shards: Shard[] = Array.from({ length: count }, (_, i) => ({
        side: i % 2 === 0 ? -1 : 1,
        across: Math.random(),
        // Dealt evenly down the margin with a little jitter; the right margin
        // half a step off the left so the two never mirror each other.
        y: (Math.floor(i / 2) + 0.5 + (Math.random() - 0.5) * 0.4 + (i % 2) * 0.5) / perSide,
        z: -6 + Math.random() * 10,
        // Kept small: a near shard turning broadside on reads as a blot.
        scale: 0.12 + Math.random() * 0.16,
        axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        spin: 0.08 + Math.random() * 0.17,
        phase: Math.random() * Math.PI * 2,
      }));

      const applyTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        const p = dark ? PALETTE.dark : PALETTE.light;
        const color = new THREE.Color();
        shards.forEach((_, i) => mesh.setColorAt(i, color.set(p.shard[i % p.shard.length])));
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        material.emissive.set(p.emissive);
        material.opacity = p.opacity;
        ambient.intensity = p.ambient;
      };
      applyTheme();

      let halfW = 1;
      let halfH = 1;
      let w = 1;
      const measure = () => {
        w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        halfW = halfH * camera.aspect;
      };
      measure();
      window.addEventListener("resize", measure);
      const themeWatch = new MutationObserver(applyTheme);
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      const shardSize = (s: Shard, depth: number) => s.scale * (0.85 + depth * 0.25);

      /**
       * A shard's x in world units at its depth, worked out from pixels: its
       * place across its margin, kept its own reach plus PAD clear of the
       * screen edge and of the copy. Perspective shrinks far shards, so the
       * same pixel needs a wider world x the further back it is.
       */
      const shardX = (s: Shard, depth: number) => {
        const z = -6 + depth * 10;
        const perspective = (camera.position.z - z) / camera.position.z;
        const margin = (w - CONTENT) / 2;
        if (margin < MIN_MARGIN) return s.side * (0.36 + s.across * 0.13) * halfW * 2 * perspective;
        const pxPerUnit = w / 2 / (halfW * perspective);
        // The long tip is ~2.2 units out from the centre, at any angle.
        const reach = Math.min(shardSize(s, depth) * 2.2 * pxPerUnit, margin / 2 - PAD);
        const fromEdge = PAD + reach + s.across * Math.max(0, margin - 2 * (PAD + reach));
        const ndc = 1 - fromEdge / (w / 2);
        return s.side * ndc * halfW * perspective;
      };

      const dummy = new THREE.Object3D();
      const place = (t: number) => {
        const scroll = window.scrollY;
        shards.forEach((s, i) => {
          const depth = (s.z + 6) / 10; // 0 far, 1 near
          const span = halfH * 2 + 4;
          // Rise slowly; scrolling carries near shards further than far ones.
          const y = ((s.y * span + t * RISE + scroll * (0.002 + depth * 0.004)) % span) - span / 2;
          dummy.position.set(shardX(s, depth), y, s.z);
          dummy.quaternion.setFromAxisAngle(s.axis, s.phase + t * s.spin);
          dummy.scale.setScalar(shardSize(s, depth));
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
        // The glint light circles slowly in front of the field.
        glint.position.set(Math.cos(t * 0.25) * halfW, Math.sin(t * 0.18) * halfH, 6);
        renderer.render(scene, camera);
      };

      const clock = new THREE.Clock();
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        place(clock.getElapsedTime());
      };
      const start = () => {
        cancelAnimationFrame(frame);
        if (reduced.matches) place(12); // one still, lit frame
        else if (document.visibilityState === "visible") tick();
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
        mesh.dispose();
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
