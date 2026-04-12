# Background Shader Catalog (Tier 2)

Five curated WebGL fragment-shader presets for brands where animated imagery is load-bearing identity. Opt-in only — most brands are served by Tier 1 (static CSS+SVG). Pick a Tier 2 shader when the brand's actual site uses animated, fluid, or generative visuals as a primary signal.

**Rule for Claude.** Only reach for Tier 2 when:
1. The observed brand clearly uses animated/WebGL imagery as a primary identity signal (not decoration)
2. The brand would look diminished without motion
3. One of the 5 presets below is a close enough fit — don't custom-build

If the brand uses animated imagery that doesn't fit any preset, fall back to Tier 1 `mesh` with `motion: drift` and document the gap.

---

## The Runtime

All 5 shaders share the same minimal WebGL runtime — a fullscreen quad with a fragment shader, animated via `requestAnimationFrame`. Copy this runtime once per generated skill, then swap the fragment shader body.

**Subtle-by-default.** Every shader accepts five **dials** as float uniforms (`u_speed`, `u_intensity`, `u_contrast`, `u_vignette`, `u_base`) so brands can modulate the shader without editing GLSL. Defaults produce a calm, text-legible background — the kind of subtle most brands actually want. Dial up only when the brand is genuinely maximalist. See the *Dials* section below for the defaults and override pattern.

```html
<canvas id="bg-shader" class="bg-shader-canvas"></canvas>
```

```css
.bg-shader-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
```

```js
(function mountShader(canvasId, fragmentShader, uniforms) {
  const canvas = document.getElementById(canvasId);
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true });
  if (!gl) return;  // graceful fallback — no WebGL, no shader

  const vs = `
    attribute vec2 a_pos;
    varying vec2 v_uv;
    void main() { v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  const vsObj = compile(gl.VERTEX_SHADER, vs);
  const fsObj = compile(gl.FRAGMENT_SHADER, 'precision mediump float;\n' + fragmentShader);
  if (!vsObj || !fsObj) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vsObj);
  gl.attachShader(prog, fsObj);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes  = gl.getUniformLocation(prog, 'u_resolution');
  const uC1   = gl.getUniformLocation(prog, 'u_color1');
  const uC2   = gl.getUniformLocation(prog, 'u_color2');
  const uC3   = gl.getUniformLocation(prog, 'u_color3');
  // Dials — all five have subtle defaults. Brands override per skill.
  const uSpeed     = gl.getUniformLocation(prog, 'u_speed');
  const uIntensity = gl.getUniformLocation(prog, 'u_intensity');
  const uContrast  = gl.getUniformLocation(prog, 'u_contrast');
  const uVignette  = gl.getUniformLocation(prog, 'u_vignette');
  const uBase      = gl.getUniformLocation(prog, 'u_base');

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  const start = performance.now();
  function frame() {
    const t = (performance.now() - start) / 1000;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uniforms.color1) gl.uniform3fv(uC1, uniforms.color1);
    if (uniforms.color2) gl.uniform3fv(uC2, uniforms.color2);
    if (uniforms.color3) gl.uniform3fv(uC3, uniforms.color3);
    // Dials — any omitted value falls back to the subtle default.
    gl.uniform1f(uSpeed,     uniforms.speed     ?? 1.0);
    gl.uniform1f(uIntensity, uniforms.intensity ?? 0.50);
    gl.uniform1f(uContrast,  uniforms.contrast  ?? 0.70);
    gl.uniform1f(uVignette,  uniforms.vignette  ?? 0.35);
    gl.uniform1f(uBase,      uniforms.base      ?? 0.05);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(frame);
  }
  frame();
})('bg-shader', FRAGMENT_SHADER_SOURCE, {
  color1: [1.0, 0.35, 0.14],   // --accent, rgb 0-1
  color2: [0.4, 0.3, 0.9],
  color3: [0.95, 0.7, 0.4],
  // dials (omit any for subtle defaults)
  speed:     1.0,
  intensity: 0.50,
  contrast:  0.70,
  vignette:  0.35,
  base:      0.05,
});
```

~50 lines of actual WebGL, zero dependencies. Handles DPR, resize, graceful fallback on no-WebGL, and the five dials.

---

## Dials — subtle by default

Every shader exposes five float uniforms that brands can override per skill. Defaults are tuned for a **calm, text-legible background**. Dial up only when the brand genuinely is maximalist.

| Dial | Default | Range | What it does |
|---|---|---|---|
| `u_speed`     | `1.0`  | `0.0 – 2.0` | Animation speed multiplier. `0.5` is a slow, meditative drift. `1.0` is the preset's intended motion. `2.0` is nervy. |
| `u_intensity` | `0.50` | `0.0 – 1.0` | How strongly the computed color shows through versus the dark base. `0.0` = pure base (shader invisible). `0.5` = subtle wash. `1.0` = full-strength maximalist. |
| `u_contrast`  | `0.70` | `0.0 – 1.0` | Contrast between the palette stops. `0.0` blends everything toward a flat average — completely calm. `1.0` preserves the preset's natural palette contrast. |
| `u_vignette`  | `0.35` | `0.0 – 0.8` | Edge darkening strength. `0.0` = no vignette. `0.35` = subtle frame. `0.8` = heavy cinema. |
| `u_base`      | `0.05` | `0.0 – 0.15` | Dark floor level the shader never dips below. `0.0` = pure black. `0.05` = near-black with a hint of warmth. `0.15` = grayscale fog. |

**The rule.** When a brand's real site uses a shader that looks loud, the *first* move is to copy the preset at defaults — which is subtle. Only tune up if the brand explicitly reads maximalist. This is the opposite of the old "run the shader at 100% and darken with CSS overlays" pattern, which was a band-aid.

### GLSL helper — `applyDials()`

Every preset ends with a single call to `applyDials(col)` that mixes the computed color toward `u_base` by `u_intensity`, flattens contrast, and applies a radial vignette. Prepend this snippet to every fragment shader (it only depends on the five dial uniforms):

```glsl
uniform float u_speed;
uniform float u_intensity;
uniform float u_contrast;
uniform float u_vignette;
uniform float u_base;

vec3 applyDials(vec3 col, vec2 uv, vec3 palAvg) {
  // 1. Flatten contrast toward the palette average
  col = mix(palAvg, col, u_contrast);
  // 2. Mix toward the dark base by (1 - intensity) — this is the big one
  col = mix(vec3(u_base), col, u_intensity);
  // 3. Radial vignette — darkens toward edges
  float d = length(uv - 0.5);
  float vig = 1.0 - smoothstep(0.3, 0.95, d) * u_vignette;
  return col * vig;
}
```

Each preset's `main()` computes the raw `col` as before, then ends with:

```glsl
  vec3 palAvg = (u_color1 + u_color2 + u_color3) / 3.0;
  gl_FragColor = vec4(applyDials(col, v_uv, palAvg), 1.0);
```

The old opaque `vec4(col, 0.85)` output pattern is replaced by this dialed version. No more CSS opacity hacks on top.

---

## Preset 1 — `liquid-flow`

**Character.** Warped radial gradients displaced by a noise field, flowing slowly. Reads as liquid mercury or smooth fluid mesh. The "Linear dark mode / AI startup" look.

**Pick when.** Brand is AI/dev-tool adjacent, dark-mode-forward, premium SaaS, or has any kind of flowing gradient mesh on their real site.

```glsl
uniform float u_time;
uniform vec2  u_resolution;
uniform vec3  u_color1;
uniform vec3  u_color2;
uniform vec3  u_color3;
varying vec2  v_uv;

// Simplex noise (Ashima, MIT)
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = v_uv;
  float t = u_time * u_speed * 0.08;

  // two-octave displacement field
  vec2 warp = vec2(
    snoise(uv * 2.0 + vec2(t, 0.0)),
    snoise(uv * 2.0 + vec2(0.0, t * 1.3))
  ) * 0.25;
  uv += warp;

  // three overlapping radial gradients, warped
  float d1 = distance(uv, vec2(0.3 + sin(t*1.7)*0.1, 0.4));
  float d2 = distance(uv, vec2(0.7 + cos(t*1.3)*0.1, 0.6));
  float d3 = distance(uv, vec2(0.5, 0.2 + sin(t*0.9)*0.1));

  vec3 col = mix(u_color1, u_color2, smoothstep(0.0, 0.5, d1));
  col = mix(col, u_color3, smoothstep(0.0, 0.4, d2) * 0.6);
  col = mix(col, u_color1 * 1.1, smoothstep(0.0, 0.6, d3) * 0.4);

  vec3 palAvg = (u_color1 + u_color2 + u_color3) / 3.0;
  gl_FragColor = vec4(applyDials(col, v_uv, palAvg), 1.0);
}
```

---

## Preset 2 — `noise-field`

**Character.** Pure abstract animated simplex noise, colored by a 2-3 color gradient. Reads as atmospheric, generative, introspective. Less structure than liquid-flow, more ambient.

**Pick when.** Brand is generative art, music, meditation, or anything abstract/atmospheric.

```glsl
uniform float u_time;
uniform vec2  u_resolution;
uniform vec3  u_color1;
uniform vec3  u_color2;
uniform vec3  u_color3;
varying vec2  v_uv;

// (same snoise function as liquid-flow — reuse)
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) { /* ... same as above ... */ }

void main() {
  vec2 uv = v_uv * 2.5;
  float t = u_time * u_speed * 0.12;

  // multi-octave fractal noise
  float n = 0.0;
  n += snoise(uv + vec2(t, 0.0))      * 0.5;
  n += snoise(uv * 2.0 + vec2(0.0, t*1.3)) * 0.25;
  n += snoise(uv * 4.0 + vec2(t*0.7, -t)) * 0.125;
  n = n * 0.5 + 0.5;  // normalize to 0-1

  // tri-color blend driven by noise
  vec3 col = mix(u_color1, u_color2, smoothstep(0.3, 0.7, n));
  col = mix(col, u_color3, smoothstep(0.6, 0.9, n));

  vec3 palAvg = (u_color1 + u_color2 + u_color3) / 3.0;
  gl_FragColor = vec4(applyDials(col, v_uv, palAvg), 1.0);
}
```

---

## Preset 3 — `wave-mesh`

**Character.** Sinusoidal wave bands moving horizontally. Reads as audio waveforms or ocean currents.

**Pick when.** Brand is audio/music (Spotify-style), water/ocean themed, audio-reactive UI, or has horizontal-flow aesthetics.

```glsl
uniform float u_time;
uniform vec2  u_resolution;
uniform vec3  u_color1;
uniform vec3  u_color2;
uniform vec3  u_color3;
varying vec2  v_uv;

void main() {
  vec2 uv = v_uv;
  float t = u_time * u_speed * 0.5;

  // 3 overlapping sine waves at different frequencies
  float w1 = sin(uv.x * 6.0 + t)         * 0.15 + 0.5;
  float w2 = sin(uv.x * 10.0 - t * 1.4)  * 0.10 + 0.5;
  float w3 = sin(uv.x * 14.0 + t * 0.7)  * 0.08 + 0.5;

  // each wave produces a soft band at its y-position
  float b1 = smoothstep(0.08, 0.0, abs(uv.y - w1));
  float b2 = smoothstep(0.06, 0.0, abs(uv.y - w2));
  float b3 = smoothstep(0.05, 0.0, abs(uv.y - w3));

  vec3 col = u_color1 * 0.1;
  col += u_color1 * b1 * 0.8;
  col += u_color2 * b2 * 0.7;
  col += u_color3 * b3 * 0.6;

  vec3 palAvg = (u_color1 + u_color2 + u_color3) / 3.0;
  gl_FragColor = vec4(applyDials(col, v_uv, palAvg), 1.0);
}
```

---

## Preset 4 — `aurora`

**Character.** Large vertical color bands shifting slowly across the canvas, like northern lights. Reads as premium, cinematic, night-themed.

**Pick when.** Brand is premium dark-mode-forward, luxury tech, travel/photography, night-mode products, meditation-adjacent.

```glsl
uniform float u_time;
uniform vec2  u_resolution;
uniform vec3  u_color1;
uniform vec3  u_color2;
uniform vec3  u_color3;
varying vec2  v_uv;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) { /* ... same ... */ }

void main() {
  vec2 uv = v_uv;
  float t = u_time * u_speed * 0.08;

  // vertical bands driven by 1D noise over x
  float n1 = snoise(vec2(uv.x * 1.5, t))       * 0.5 + 0.5;
  float n2 = snoise(vec2(uv.x * 2.0 + 5.0, t * 1.2)) * 0.5 + 0.5;
  float n3 = snoise(vec2(uv.x * 2.5 + 9.0, t * 0.8)) * 0.5 + 0.5;

  // band intensities decay vertically from the noise-driven peak
  float band1 = smoothstep(0.35, 0.0, abs(uv.y - n1));
  float band2 = smoothstep(0.40, 0.0, abs(uv.y - n2 * 0.8));
  float band3 = smoothstep(0.30, 0.0, abs(uv.y - n3 * 0.9));

  // aurora's hard-coded dark base is now provided by applyDials via u_base
  vec3 col = vec3(0.0);
  col += u_color1 * band1 * 0.8;
  col += u_color2 * band2 * 0.7;
  col += u_color3 * band3 * 0.6;

  vec3 palAvg = (u_color1 + u_color2 + u_color3) / 3.0;
  gl_FragColor = vec4(applyDials(col, v_uv, palAvg), 1.0);
}
```

---

## Preset 5 — `particles`

**Character.** Point cloud of small glowing particles drifting in a subtle flow field. Reads as generative, technical, "data-as-art".

**Pick when.** Brand is generative art, dev tools with a particle/data-viz aesthetic, AI/ML visualization products, or anything where "individual points" is the metaphor.

```glsl
uniform float u_time;
uniform vec2  u_resolution;
uniform vec3  u_color1;
uniform vec3  u_color2;
uniform vec3  u_color3;
varying vec2  v_uv;

// Hash function for pseudo-random point positions
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 uv = v_uv;
  float t = u_time * u_speed * 0.1;

  vec3 col = vec3(0.0);

  // 40 particles distributed on a hash grid, drifting slowly
  for (int i = 0; i < 40; i++) {
    float fi = float(i);
    vec2 seed = vec2(fi * 0.73, fi * 1.31);
    vec2 base = vec2(hash(seed), hash(seed + 1.0));
    vec2 drift = vec2(
      sin(t + fi * 0.5) * 0.05,
      cos(t * 0.7 + fi * 0.3) * 0.04
    );
    vec2 pos = base + drift;

    float d = distance(uv, pos);
    float glow = 0.008 / (d * d + 0.0005);

    // alternate between 3 colors by particle index
    vec3 c = (mod(fi, 3.0) < 1.0) ? u_color1
           : (mod(fi, 3.0) < 2.0) ? u_color2
           : u_color3;

    col += c * glow * 0.3;
  }

  vec3 palAvg = (u_color1 + u_color2 + u_color3) / 3.0;
  gl_FragColor = vec4(applyDials(col, v_uv, palAvg), 1.0);
}
```

---

## Color uniforms

All 5 shaders accept 3 `vec3` color uniforms (`u_color1`, `u_color2`, `u_color3`). Map brand colors to shader uniforms like this:

| Brand → Shader |
|---|
| `--accent` → `u_color1` |
| Secondary decorative or brand hue → `u_color2` |
| Tertiary or warm highlight → `u_color3` |

Convert hex to rgb 0-1 float tuples:

```js
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}
```

---

## YAML schema for Tier 2

When Claude picks a Tier 2 shader, the shader block nests inside `hero_stage.background` (replacing the old `background_graphics` block that `hero-stage.md` superseded):

```yaml
hero_stage:
  preset: "shader-ambient"          # the shader-specific preset
  observed_style:
    description: "Fluid animated mesh with slowly drifting purple-blue gradients"
    where_used: ["hero", "final cta"]
  background:
    medium: "shader"                # one of the 10 background mediums
    color_mode: "palette"
    saturation: "muted"             # irrelevant for shader, documented for consistency
    light_source: "center"
    vignette: "subtle"
    intensity: "subtle"
    motion: "drift"                 # shaders always animate; this documents the feel
    color_palette: ["#5E6AD2", "#8B5CF6", "#EC4899"]
    # Shader-specific sub-block:
    shader:
      preset: "liquid-flow"         # liquid-flow / noise-field / wave-mesh / aurora / particles
      match_score: "high"
      match_reasoning: "Liquid-flow shader matches the observed fluid mesh character and continuous motion."
      color_uniforms:
        u_color1: "{brand.500}"
        u_color2: "{brand.300}"
        u_color3: "{accent-tertiary}"
      # Dials — omit to get subtle defaults (speed 1.0, intensity 0.5, contrast 0.7,
      # vignette 0.35, base 0.05). Only override when the brand is genuinely
      # maximalist. Tuning up is opt-in, not the starting point.
      dials:
        speed:     1.0    # 0.0 – 2.0 — animation speed multiplier
        intensity: 0.50   # 0.0 – 1.0 — how strongly the shader shows through
        contrast:  0.70   # 0.0 – 1.0 — palette contrast (0 = flat average)
        vignette:  0.35   # 0.0 – 0.8 — edge darkening
        base:      0.05   # 0.0 – 0.15 — dark floor level
  hero:
    subject: "none"                 # shader-ambient typically pairs with subject: none
  relation:
    type: "flat"
    bleed: 0
  disclaimer: "Approximated with a curated WebGL fragment shader preset at subtle defaults. The real brand uses custom shader code or assets not redistributed with this skill."
```

---

## Performance notes

- All shaders use `precision mediump float;` — fine on mobile, no need for highp
- Cap device pixel ratio at 2 — `Math.min(dpr, 2)` — to avoid melting phones
- Particles shader has the highest cost (40 iterations per pixel × ~2M pixels) — still runs 60fps on modern devices but test on old hardware
- All shaders gracefully fallback if `getContext('webgl')` returns null — the canvas simply stays transparent, and whatever CSS background is behind it shows through. Use `var(--surface1)` on the parent as a fallback layer.

## Integration with the landing page

Same as Tier 1: place the canvas inside the hero with `position: absolute; inset: 0; z-index: 0;`, put the hero content at `z-index: 1 or 2`. Add the `mountShader` IIFE at the bottom of `<body>` alongside the mode-toggle script. Include the fragment shader source as a JS string.
