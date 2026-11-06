"use client";

import { useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";

import { VIEWPORT } from "@/components/motion/tokens";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { divisionLogos } from "@/lib/division-logos";

/**
 * The Tech lockup, compiling.
 *
 * Three layers appear apart as bare outlines, the way a system looks on a
 * diagram. They fill from the bottom up and close into a stack, the ones
 * underneath giving a little under each landing, and the N is cut into the top
 * one. Then a caret types the name, a keystroke at a time, blinks twice and is
 * gone. Games bounces and Robotics runs on a rail; this one builds and ships.
 *
 * `pose(t)` is the whole animation as one pure function of time, written
 * straight to the SVG on each frame. Under reduced motion the static lockups
 * are shown instead. They are also the source of the paths below, in
 * `public/divisions/`.
 */

const VIEW = "0 0 684 198";
const GREEN = "#4AB166";

const BOTTOM = "M152.282 110.775C156.094 108.594 158 109.703 158 114.103V123.534C158 127.934 156.094 131.226 152.282 133.407L84.7178 172.127C80.9059 174.308 77.0941 174.308 73.2822 172.127L5.71777 133.407C1.90616 131.226 0.000118187 127.934 0 123.534V114.103C0.000153699 109.703 1.90611 108.594 5.71777 110.775L73.2822 149.495C77.094 151.676 80.906 151.676 84.7178 149.495L152.282 110.775Z";
const MIDDLE = "M152.282 78.7136C156.094 76.5322 158 77.6413 158 82.0417V91.4714C158 95.8719 156.094 99.1639 152.282 101.345L84.7178 140.064C80.9058 142.246 77.0942 142.246 73.2822 140.064L5.71777 101.345C1.90588 99.1639 2.49072e-05 95.8719 0 91.4714V82.0417C9.51699e-05 77.6413 1.90587 76.5322 5.71777 78.7136L73.2822 117.432C77.0941 119.614 80.9059 119.614 84.7178 117.432L152.282 78.7136Z";
const TOP = "M71.6553 24.9616C76.5519 22.1516 81.4481 22.1516 86.3447 24.9616L150.655 61.7956C155.552 64.6056 155.552 67.4162 150.655 70.2263L86.3447 107.059C81.4482 109.869 76.5518 109.869 71.6553 107.059L7.34473 70.2263C2.44832 67.4162 2.44851 64.6056 7.34473 61.7956L71.6553 24.9616Z";
const N_CUT = "M95.9658 43.197C87.1916 40.9941 76.2897 43.662 73.5615 48.985C72.1765 51.6736 73.6191 54.2684 74.3564 56.9479C75.8258 62.3344 78.0171 67.6519 79.3232 73.0534C73.4035 70.2168 68.1361 66.7893 62.6641 63.654C60.2414 62.2659 57.7449 60.2134 54.1162 59.9509C50.0771 59.6643 46.5439 61.6889 46.0537 63.8825C45.6587 65.6357 46.3328 67.5074 46.4961 69.2546C46.87 73.4579 46.8376 77.8334 48.0752 81.9704C51.8935 82.1002 56.634 81.3094 57.582 78.7565C58.098 77.3682 56.8767 71.4422 56.9082 69.3962C61.2847 71.602 65.3085 74.0949 69.4375 76.4606C71.8337 77.8336 74.2251 79.2156 76.6318 80.5886C78.0801 81.4123 79.4493 82.4202 81.4189 82.8366C86.2485 83.8596 91.3311 81.273 91.0625 78.4636C90.8676 76.4027 89.9143 74.3117 89.335 72.278C87.8234 66.964 85.9956 61.6858 84.5684 56.3718C83.9205 53.9245 81.467 49.9774 87.0811 48.8307C91.3942 47.9469 95.7073 50.3095 98.3984 51.8454C105.777 56.067 112.882 60.1441 120.145 64.3054L127.518 60.0807C121.835 56.8245 102.212 44.7604 95.9658 43.197Z";

/** The layers bottom up: how far apart they start, and when each lands. */
const LAYERS = [
  { d: BOTTOM, apart: 30, lands: 0.82 },
  { d: MIDDLE, apart: -8, lands: 1.0 },
  { d: TOP, apart: -52, lands: 1.2 },
];
const FLIGHT = 0.42;
/** How far the layers below give when one lands on them. */
const GIVE = 4;
/** Left and right of the N, for cutting it in. */
const CUT = { from: 44, to: 130 };

/**
 * Each keystroke: its letter (or letters, for the i and its dot), the right
 * edge the caret moves to, and the pause before it. The pauses are
 * uneven on purpose: nobody types like a metronome.
 */
const KEYS: { shapes: { d: string; evenodd?: boolean }[]; right: number; gap: number }[] = [
  { shapes: [{"d": "M223.509 81.4929C230.359 72.4297 236.343 62.746 243.04 53.5736C246.367 49.0071 248.963 43.9686 254.095 41.1719C264.242 35.6352 277.369 40.9097 281.535 51.5547C284.499 59.1321 283.908 93.545 283.288 103.137L270.318 103.054C269.605 90.674 270.16 78.1062 270.152 65.7001C270.147 61.1685 270.681 54.6923 265.737 52.3544C259.306 49.3086 255.564 57.1919 252.509 61.3433C245.882 70.3802 239.648 79.6925 233.1 88.795C230.59 92.2822 228.317 96.1626 225.445 99.3701C221.537 103.731 213.437 103.251 210.867 97.6702C209.818 95.3935 210.141 92.7497 210.137 90.3157C210.128 86.2648 210.141 82.2095 210.145 78.163C210.15 71.193 210.421 64.1226 209.979 57.1875C206.937 60.1678 199.234 69.9301 196.76 71.5383C192.201 74.501 187.034 71.6694 184 68.2521C189.053 61.1161 195.523 54.6967 201.394 48.1856C203.837 45.4718 206.023 42.1507 208.934 39.9046C212.58 37.086 218.547 37.0817 221.533 40.9184C224.208 44.3619 223.295 49.4965 223.295 53.5824C223.29 62.816 222.691 72.3161 223.509 81.4929Z"}], right: 283.8, gap: 0.08 },
  { shapes: [{"d": "M301.632 45.0603C316.267 33.7908 337.731 36.0415 349.521 50.3091C352.926 54.4298 355.951 59.0133 356.617 64.3382L356.786 71.6625V72.9855C356.786 76.1844 354.181 78.7724 350.982 78.7512L311.533 78.4902L311.523 66.7592L344.551 66.7054C343.541 61.5971 340.649 57.0296 336.356 53.9226C319.22 41.5258 294.663 57.8513 301.509 78.4595C302.615 81.7933 304.556 84.7639 307.021 87.2501C309.867 90.1209 313.639 92.1589 317.529 93.2077C322.805 94.6322 328.667 94.3913 334.048 93.8015C341.431 92.9931 347.408 89.9827 353.776 86.4696C350.952 108.078 322.159 109.528 306.601 101.566C297.33 96.8245 290.777 88.2043 288.713 79.1505C287.568 74.0912 287.568 68.7321 288.713 63.6729C290.311 56.6166 295.106 50.0854 301.632 45.0603Z"}], right: 356.8, gap: 0.08 },
  { shapes: [{"d": "M415.369 38.8186C419.531 38.1941 424.01 39.6192 426.829 42.8262C430.693 47.2225 437.589 71.6501 439.87 78.7205C440.784 81.5437 442.471 89.5766 444.989 90.9327C450.287 93.7775 452.062 83.8929 453.142 80.6373C456.066 71.8192 459.052 63.0267 462.05 54.2348C463.729 49.319 465.182 44.2547 467.289 39.5224L479.079 39.4789C478.349 43.9054 476.459 48.28 474.982 52.5842C472.101 60.961 469.177 69.3207 466.314 77.702C464.277 83.6538 461.87 93.9793 458.613 98.9479C453.827 106.249 443.263 107.468 436.968 101.407C432.514 97.1195 425.496 72.1783 423.193 64.8936C422.406 62.4067 420.301 54.1829 418.819 52.6046C418.369 52.1328 417.791 52.2065 417.332 51.8702C416.956 52.2939 416.366 52.309 416.03 52.881C414.793 54.9702 415.553 61.5343 415.549 64.1386C415.531 72.8825 416.605 82.2476 412.772 90.3927C400.997 115.4 364.594 109.747 361.054 80.1306V39.4405L372.266 39.4942C372.266 47.886 372.6 56.1415 372.591 64.2563C372.267 69.8564 372.315 74.7838 372.647 79.9924C373.627 95.3076 393.573 99.0136 401.599 86.7357C409.668 74.3821 394.732 41.9172 415.369 38.8186Z"}], right: 479.1, gap: 0.1 },
  { shapes: [{"d": "M497.814 103.718L485.994 103.736L485.976 38.1635H497.814V103.718Z"}, {"d": "M491.9 22.3199C495.172 22.3199 497.824 24.9723 497.824 28.2443C497.824 31.5166 495.172 34.1687 491.9 34.1687C488.628 34.1684 485.976 31.5164 485.976 28.2443C485.976 24.9725 488.628 22.3203 491.9 22.3199Z"}], right: 497.8, gap: 0.06 },
  { shapes: [{"d": "M517.448 25.0249L517.519 63.7803C519.434 61.5872 521.274 59.1892 523.62 57.3544C533.5 49.6374 539.703 49.7549 547.244 38.0662L560.764 38.2479C555.304 54.9715 541.791 57.8567 529.215 67.1558C533.704 68.1434 537.866 69.1928 541.621 72.0156C547.702 76.5907 552.302 85.4424 556.695 91.6825C559.536 95.7202 562.675 99.528 565.621 103.483C563.295 103.64 552.446 104.246 550.929 103.324C549.977 102.743 549.308 101.617 548.569 100.796C544.447 96.1943 537.383 84.3271 534.113 81.6993C529.768 78.2035 521.037 76.5121 518.257 82.8919C517.099 85.5438 517.436 88.6938 517.44 91.5162C517.444 95.4532 517.492 99.388 517.374 103.316L505.686 103.71L505.681 24.9814L517.448 25.0249Z"}], right: 565.6, gap: 0.08 },
  { shapes: [{"d": "M590.229 36.4335C609.2 36.4342 624.58 51.8136 624.581 70.7847C624.581 89.756 609.201 105.135 590.229 105.136C571.258 105.136 555.876 89.7564 555.876 70.7847C555.876 51.8133 571.258 36.4337 590.229 36.4335ZM590.229 48.4179C577.876 48.4181 567.86 58.4314 567.86 70.7847C567.86 83.1383 577.876 93.1539 590.229 93.154C602.582 93.1533 612.596 83.138 612.596 70.7847C612.596 58.4317 602.582 48.4186 590.229 48.4179Z", "evenodd": true}], right: 624.6, gap: 0.07 },
  { shapes: [{"d": "M637.581 43.553C650.363 32.3689 670.656 34.8189 679.722 49.462C684.867 57.7776 683.906 67.2647 683.906 76.6246C683.906 85.504 683.906 94.5 683.604 103.6L672.301 103.513C672.301 93.8344 672.107 83.123 672.086 73.0111C672.077 67.7455 672.851 61.9855 670.381 57.1394C664.274 45.1579 646.344 45.8876 641.312 58.419C638.331 65.8477 639.861 93.168 639.861 103.613L628.706 103.685V76.6272C628.706 59.3187 629.992 50.2102 637.581 43.553Z"}], right: 684, gap: 0.09 },
  { shapes: [{"d": "M223.25 134.277H229.5V141.277H223.25V161.177C223.25 163.641 223.844 163.99 224.02 164.105C224.64 164.514 226.075 164.878 229.5 164.878V171.878C226.176 171.878 222.735 171.641 220.168 169.95C217.156 167.965 216.25 164.714 216.25 161.177V141.277H210V134.277H216.25V123.677H223.25V134.277Z"}], right: 229.5, gap: 0.26 },
  { shapes: [{"d": "M261.3 132.477C271.469 132.477 280.437 140.438 281.144 152.268C281.201 153.231 280.858 154.176 280.197 154.878C279.536 155.579 278.615 155.977 277.65 155.977H248.99C250.569 161.29 255.478 164.878 261.9 164.878C267.235 164.877 271.227 163.567 274.857 161.233L278.643 167.122C273.873 170.188 268.565 171.877 261.9 171.878C250.559 171.878 241.45 163.746 241.45 152.177C241.45 141.203 250.409 132.477 261.3 132.477ZM261.3 139.477C255.31 139.477 250.291 143.506 248.859 148.977H273.514C271.722 142.962 266.617 139.477 261.3 139.477Z", "evenodd": true}], right: 281.2, gap: 0.08 },
  { shapes: [{"d": "M307.199 132.477C313.903 132.477 320.414 134.673 324.435 140.224L318.765 144.33C316.485 141.182 312.495 139.477 307.199 139.477C300.09 139.478 294.35 145.153 294.35 152.177C294.35 159.589 300.026 164.877 307.199 164.878C312.496 164.878 316.485 163.172 318.765 160.024L324.435 164.13C320.414 169.681 313.903 171.878 307.199 171.878C296.374 171.877 287.35 163.665 287.35 152.177C287.35 141.203 296.309 132.478 307.199 132.477Z"}], right: 324.4, gap: 0.07 },
  { shapes: [{"d": "M340.7 136.181C343.882 133.697 347.821 132.328 351.9 132.328C356.727 132.328 361.356 134.245 364.77 137.658C368.183 141.071 370.1 145.7 370.101 150.527V171.677H363.101V150.527C363.1 147.557 361.92 144.708 359.819 142.608C357.719 140.508 354.871 139.328 351.9 139.328C348.93 139.328 346.081 140.508 343.98 142.608C341.88 144.708 340.7 147.557 340.7 150.527V171.677H333.7V119.177H340.7V136.181Z"}], right: 370.1, gap: 0.09 },
];
/** Letters in "neuvikon": the keystroke after them is the line break. */
const WORD = 7;
const ROWS = [
  { y: 28, h: 78 },
  { y: 122, h: 50 },
];
const CARET = { width: 5, offset: 6, start: 172, secondLine: 201 };
const TYPE_FROM = 1.42;
const BLINK = 0.15;

const TYPED = KEYS.reduce<number[]>((at, key, i) => {
  at.push((i === 0 ? TYPE_FROM : at[i - 1]) + key.gap);
  return at;
}, []);
const TYPE_TO = TYPED[TYPED.length - 1];
const T = TYPE_TO + BLINK * 4 + 0.1;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const span = (t: number, from: number, to: number) => clamp((t - from) / (to - from));
const inOut = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

function pose(t: number) {
  const layers = LAYERS.map((layer, i) => {
    const flight = inOut(span(t, layer.lands - FLIGHT, layer.lands));
    // A dip under every layer that lands after this one.
    const give = LAYERS.slice(i + 1).reduce(
      (dip, above) => dip + GIVE * Math.sin(span(t, above.lands, above.lands + 0.24) * Math.PI),
      0,
    );
    return {
      y: layer.apart * (1 - flight) + give,
      drawn: inOut(span(t, 0.05 + i * 0.1, 0.45 + i * 0.1)),
      outline: 1 - span(t, layer.lands - 0.1, layer.lands),
      fill: span(t, layer.lands - 0.34, layer.lands - 0.12),
    };
  });

  const cut = CUT.from + (CUT.to - CUT.from) * inOut(span(t, 1.16, 1.5));

  const typed = TYPED.reduce((count, at) => (t >= at ? count + 1 : count), 0);
  const blinks = t > TYPE_TO ? Math.floor((t - TYPE_TO) / BLINK) : 0;
  const caretX =
    typed === 0
      ? CARET.start
      : typed === WORD
        ? CARET.secondLine
        : KEYS[typed - 1].right + CARET.offset;

  return {
    layers,
    cut,
    typed,
    caretX,
    caretRow: ROWS[typed < WORD ? 0 : 1],
    caretOn: t >= 1.25 && t < T - 0.1 && blinks % 2 === 0,
  };
}

export function TechLogo() {
  const svg = useRef<SVGSVGElement>(null);
  const inView = useInView(svg, VIEWPORT);
  const reduced = usePrefersReducedMotion();
  const id = useId();

  useEffect(() => {
    const root = svg.current;
    if (!root || !inView) return;
    const all = (name: string) => [...root.querySelectorAll<SVGElement>(`[data-part="${name}"]`)];
    const layers = all("layer");
    const outlines = all("outline");
    const fills = all("fill");
    const keys = all("key");
    const cover = all("cover")[0];
    const uncut = all("uncut")[0];
    const caret = all("caret")[0];

    const draw = (t: number) => {
      const p = pose(t);
      p.layers.forEach((layer, i) => {
        layers[i].setAttribute("transform", `translate(0 ${layer.y.toFixed(2)})`);
        outlines[i].setAttribute("stroke-dashoffset", (1 - layer.drawn).toFixed(4));
        outlines[i].setAttribute("opacity", layer.outline.toFixed(3));
        fills[i].setAttribute("opacity", layer.fill.toFixed(3));
      });
      cover.setAttribute("x", p.cut.toFixed(2));
      uncut.setAttribute("opacity", t >= 1.5 ? "0" : "1");
      keys.forEach((key, i) => key.setAttribute("opacity", i < p.typed ? "1" : "0"));
      caret.setAttribute("x", p.caretX.toFixed(2));
      caret.setAttribute("y", String(p.caretRow.y));
      caret.setAttribute("height", String(p.caretRow.h));
      caret.setAttribute("opacity", p.caretOn ? "1" : "0");
    };

    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const t = (now - started) / 1000;
      draw(Math.min(t, T));
      if (t < T) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced]);

  if (reduced) {
    const logo = divisionLogos.tech!;
    return (
      <>
        <Image src={logo.light} alt="" aria-hidden className="block h-auto w-full dark:hidden" />
        <Image src={logo.dark} alt="" aria-hidden className="hidden h-auto w-full dark:block" />
      </>
    );
  }

  return (
    <svg
      ref={svg}
      viewBox={VIEW}
      aria-hidden
      className="block h-auto w-full overflow-visible text-foreground"
    >
      <defs>
        <clipPath id={`${id}-cover`}>
          <rect data-part="cover" x={CUT.from} y={0} width={160} height={198} />
        </clipPath>
      </defs>

      {LAYERS.map((layer, i) => (
        <g key={layer.lands} data-part="layer" transform={`translate(0 ${layer.apart})`}>
          <g data-part="fill" opacity={0}>
            <path d={i === 2 ? `${layer.d}${N_CUT}` : layer.d} fill={GREEN} />
            {i === 2 && (
              <path
                data-part="uncut"
                d={layer.d}
                fill={GREEN}
                clipPath={`url(#${id}-cover)`}
              />
            )}
          </g>
          <path
            data-part="outline"
            d={layer.d}
            pathLength={1}
            fill="none"
            stroke={GREEN}
            strokeWidth={2.4}
            strokeLinejoin="round"
            strokeDasharray="1 1"
            strokeDashoffset={1}
          />
        </g>
      ))}

      <g fill="currentColor">
        {KEYS.map((key) => (
          <g key={key.shapes[0].d.slice(0, 24)} data-part="key" opacity={0}>
            {key.shapes.map((shape) => (
              <path
                key={shape.d.slice(0, 24)}
                d={shape.d}
                fillRule={shape.evenodd ? "evenodd" : undefined}
                clipRule={shape.evenodd ? "evenodd" : undefined}
              />
            ))}
          </g>
        ))}
      </g>

      <rect
        data-part="caret"
        x={CARET.start}
        y={ROWS[0].y}
        width={CARET.width}
        height={ROWS[0].h}
        fill={GREEN}
        opacity={0}
      />
    </svg>
  );
}
