"use client";
// Animated prism-light background: soft diagonal light streaks with rainbow
// fringes drifting over the deep purple (tone="dark", opaque) or over a light
// section's own background (tone="light", transparent canvas with white
// cores, pastel fringes and a faint lavender shade beside each beam). One small
// WebGL fragment shader, rendered at half resolution (the look is blurry by
// design). Pauses off-screen and in background tabs; draws a single still
// frame for prefers-reduced-motion. Without WebGL the section keeps its
// plain --deep background. The light is dimmed under up to three elements
// marked `data-prism-calm="<strength 0-1>"` so the text over it stays easy
// to read.
import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 res;
uniform float t;
uniform float tilt;  // streak slope (negative = falling to the right)
uniform float gain;  // overall brightness
uniform float feather; // canvas px the dimming eases out over
uniform float lightTone; // 1 = light section (transparent output)
uniform vec4 calmBox[3]; // text areas to dim, canvas px (x0, y0, x1, y1)
uniform float calmK[3];  // how much to dim each one

const vec3 BASE = vec3(0.106, 0.098, 0.212); // --deep #1B1936
const vec3 CORE = vec3(0.86, 0.83, 1.0);     // lilac-white light

vec3 spectrum(float h){
  return 0.5 + 0.5 * cos(6.28318 * (h + vec3(0.0, 0.33, 0.67)));
}

// One streak: a soft band along a gently curving line with a rainbow fringe
// on its leading edge. c = offset of the line, w = width, k = brightness.
// accumulated per pixel by streak(): dark-tone colour, and for the light tone
// the white, rainbow and shade weights composited separately in main()
vec3 gLight; float gWhite; vec3 gRain; float gRainA; float gShade;

void streak(vec2 p, float c, float w, float k, float seed){
  vec2 dir = normalize(vec2(1.0, tilt));
  vec2 nrm = vec2(-dir.y, dir.x);
  float along = dot(p, dir);
  float bend = 0.10 * sin(along * 1.6 + t * 0.21 + seed)
             + 0.05 * sin(along * 3.1 - t * 0.17 + seed * 2.3);
  float d = dot(p, nrm) - c - bend;
  d = mod(d + 1.0, 2.0) - 1.0; // repeat the set down tall sections
  float ww = w * (0.75 + 0.35 * sin(along * 1.3 + seed * 1.7 + t * 0.13));
  // brightness varies along the length so streaks fade in and out
  float glow = 0.55 + 0.45 * smoothstep(-0.2, 0.9, sin(along * 1.1 + seed * 3.0 - t * 0.19));
  float core = exp(-d * d / (ww * ww));
  float halo = exp(-d * d / (9.0 * ww * ww));
  float fe = (d - ww * 1.0) / (ww * 0.55);
  float fringe = exp(-fe * fe);
  vec3 rainbow = mix(spectrum(clamp(0.5 + 0.5 * fe, 0.0, 1.0) * 0.82 + 0.02), vec3(1.0), 0.12);
  float se = (d + ww * 1.1) / (ww * 0.9);
  float m = glow * k;
  gLight += (CORE * (core * 0.56 + halo * 0.12) + rainbow * fringe * 0.85) * m;
  gWhite += (core * 0.8 + halo * 0.15) * m;
  gRain += rainbow * fringe * m;
  gRainA += fringe * m;
  gShade += exp(-se * se) * m;
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * res) / (res.x > res.y ? min(res.y, res.x * 0.5) : res.x * 1.5);
  gLight = vec3(0.0); gWhite = 0.0; gRain = vec3(0.0); gRainA = 0.0; gShade = 0.0;
  streak(p,  0.40 + 0.04 * sin(t * 0.11),        0.13, 1.00, 0.0);
  streak(p,  0.12 + 0.05 * sin(t * 0.09 + 1.0),  0.07, 0.55, 2.1);
  streak(p, -0.30 + 0.05 * sin(t * 0.10 + 2.0),  0.15, 0.90, 4.3);
  streak(p, -0.58 + 0.04 * sin(t * 0.08 + 3.0),  0.08, 0.65, 5.9);
  // dim the light under the copy, easing out around each box
  vec2 fc = gl_FragCoord.xy;
  float dim = 1.0;
  // on phones the copy spans the full width, so dim less there
  float calmScale = res.y > res.x ? 0.5 : 1.0;
  for (int i = 0; i < 3; i++) {
    vec2 o = max(max(calmBox[i].xy - fc, fc - calmBox[i].zw), 0.0);
    dim = min(dim, 1.0 - calmK[i] * calmScale * (1.0 - smoothstep(0.0, feather, length(o))));
  }
  if (lightTone > 0.5) {
    // premultiplied layers, back to front: lavender shade, rainbow, white
    float s = 0.55 * gain * dim;
    float aS = 0.35 * (1.0 - exp(-gShade * s));
    float aR = 1.0 - exp(-gRainA * s * 0.9);
    float aW = 1.0 - exp(-gWhite * s);
    vec3 rcol = gRain / max(gRainA, 1e-4);
    vec4 acc = vec4(vec3(0.78, 0.75, 0.95) * aS, aS);
    acc = vec4(rcol * aR, aR) + acc * (1.0 - aR);
    acc = vec4(vec3(aW), aW) + acc * (1.0 - aW);
    gl_FragColor = acc;
    return;
  }
  // soft cap so overlapping streaks never blow out
  vec3 l = gLight * 0.62 * gain * dim;
  vec3 col = BASE + 0.7 * (1.0 - exp(-l / 0.7));
  gl_FragColor = vec4(col, 1.0);
}
`;

const SCALE = 0.5; // canvas renders at half the CSS size

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

type Props = {
  tilt?: number; // streak slope; vary per section so they don't look copied
  phase?: number; // seconds into the motion to start from
  gain?: number; // brightness, 1 = homepage hero
  feather?: number; // CSS px the text dimming fades out over
  tone?: "dark" | "light"; // light = transparent over a light section's bg
};

export default function PrismBackground({ tilt = 0.42, phase = 40, gain = 1, feather = 90, tone = "dark" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: tone === "light", powerPreference: "low-power" });
    if (!gl) return;
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "res");
    const uT = gl.getUniformLocation(prog, "t");
    gl.uniform1f(gl.getUniformLocation(prog, "tilt"), tilt);
    gl.uniform1f(gl.getUniformLocation(prog, "gain"), gain);
    gl.uniform1f(gl.getUniformLocation(prog, "feather"), feather * SCALE);
    gl.uniform1f(gl.getUniformLocation(prog, "lightTone"), tone === "light" ? 1 : 0);
    const uCalm = gl.getUniformLocation(prog, "calmBox");
    const uCalmK = gl.getUniformLocation(prog, "calmK");
    const calmEls = Array.from(canvas.parentElement?.querySelectorAll<HTMLElement>("[data-prism-calm]") ?? []).slice(0, 3);
    const calmK = new Float32Array(3);
    calmEls.forEach((el, i) => (calmK[i] = Number(el.dataset.prismCalm) || 0.7));

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now() - phase * 1000; // start mid-motion, not at t=0
    let raf = 0;
    let onScreen = true;

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    // calm boxes in GL canvas pixels (origin bottom-left); unused slots
    // sit off-canvas
    const calm = new Float32Array(12).fill(-1e4);
    const measure = () => {
      const c = canvas.getBoundingClientRect();
      const h = c.height * SCALE;
      calmEls.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        calm.set([
          (r.left - c.left) * SCALE,
          h - (r.bottom - c.top) * SCALE,
          (r.right - c.left) * SCALE,
          h - (r.top - c.top) * SCALE,
        ], i * 4);
      });
    };
    const draw = (now: number) => {
      resize();
      gl.uniform4fv(uCalm, calm);
      gl.uniform1fv(uCalmK, calmK);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.classList.add("is-on");
    };
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      cancelAnimationFrame(raf);
      if (still) draw(start + phase * 1000);
      else if (onScreen && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) play();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : play());
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => {
      measure();
      if (still) play();
    });
    ro.observe(canvas);
    calmEls.forEach((el) => ro.observe(el));
    measure();
    play();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [tilt, phase, gain, feather, tone]);

  return <canvas ref={ref} className="prism-bg" aria-hidden="true" />;
}
