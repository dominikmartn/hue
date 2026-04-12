# Hero Stage

Brands don't just have backgrounds — they have **hero stages**. A hero stage is the composed visual behind the first impression: a background layer, optionally a hero subject sitting in front of it, and a defined relation between the two (how light bleeds, how shadows fall, whether the subject glows or is absorbed by the field).

Thinking only in "backgrounds" misses half the brands. Raycast isn't a gradient — it's an orb glowing against a gradient. Linear isn't a mesh — it's a device mockup floating on a mesh. mymind *is* just a painterly background, and that absence of a hero subject is itself a deliberate decision.

This file replaces the older `background-graphics.md` and unifies background + hero subject + relation into one composed model with a single set of dials.

## Two-layer model

Every hero stage is:

```
  ┌─ hero subject (optional) ─┐
  │                           │
  │    ← relation layer →     │   glow / halo / reflection / emissive / shadow / flat
  │                           │
  └─ background field ────────┘
```

When `hero.subject: none`, the stage collapses to just a background — that is a first-class choice (mymind, editorial brands). When `hero.subject` is present, the relation layer is what makes it feel native to the stage vs. pasted on top.

## Preset library

Presets are named combinations of dials. A brand picks a preset as the starting point and tunes individual dials from there. Nine presets cover the current space:

| Preset | Background | Hero | Relation | Use for |
|---|---|---|---|---|
| `luminous-on-gradient` | gradient, center-light, vibrant, intensity bold | luminous, center, balanced, gradient-from-palette | glow, bleed 60 | AI, dev tools, launchers, single light-object focus |
| `device-on-mesh` | mesh, off-center light, muted, intensity subtle | device, off-center-right, balanced | flat | SaaS, issue trackers, product tours |
| `painterly-no-hero` | painterly, ambient light, muted, intensity subtle | none | — | Editorial, knowledge, collecting, wellness |
| `grid-on-dark` | pattern (dot or line grid), corner light, flat sat | device or composition, center, balanced | shadow-only | Developer platforms, infra, docs |
| `object-on-spotlight` | gradient, top-light, muted, intensity bold | object, center, dominant, metallic (default form: `cylinder` / `cube` / `freeform` — **not** sphere) | shadow-only + optional reflection | Premium physical hardware, audio, industrial |
| `editorial-photo` | photo (placeholder), full-bleed | none or photo-cutout | flat | Lifestyle, hardware, fashion |
| `shader-ambient` | shader, drift, subtle defaults | none or luminous, center, accent | glow, bleed 30 | Generative, audio, AI, creative tools |
| `flat-blank` | absent or brand-tinted-neutral, ambient | composition, center, accent | flat | Writing tools, docs, minimal SaaS |
| `sculptural-field` | sculptural (glass-bars / crystal-cluster / geometric-drift), center light, vibrant | none | — | Launchers, developer AI, creative tools — when the field itself is the hero |

Preset names are labels, not constraints — every field can be overridden per brand.

## Background layer — dials

The background is a flat or animated field behind everything. These are the dials:

| Dial | Values | Effect |
|---|---|---|
| `medium` | `gradient` / `mesh` / `painterly` / `shader` / `pattern` / `bokeh` / `sculptural` / `noise` / `photo` / `absent` | Rendering technique |
| `color_mode` | `monochrome` / `dual-tone` / `palette` / `brand-tinted-neutral` | Hue strategy |
| `saturation` | `flat` / `muted` / `vibrant` / `neon` | Chroma intensity |
| `light_source` | `top` / `bottom` / `top-left` / `top-right` / `bottom-left` / `bottom-right` / `center` / `ambient` / `none` | Where the implied light originates |
| `falloff` | `hard` / `soft` / `radial` / `linear` | How light fades |
| `vignette` | `off` / `subtle` / `strong` | Darkened edges |
| `texture` | `clean` / `grain` / `paper` / `paint` / `pixel` | Surface feel |
| `motion` | `static` / `drift` / `pulse` / `reactive` | Animation |
| `intensity` | `subtle` / `bold` / `blown-out` | Overall presence |
| `safe_zone` | `full-bleed` / `masked-for-text` / `edge-only` | Where content can live legibly |
| `color_palette` | `[#hex, #hex, ...]` | 3–5 hues feeding the field |

**Defaults are always subtle.** `intensity: bold` or `blown-out` is opt-in, not the starting point. Brands that look bold on their own site still read as `subtle` in our rendering 80 percent of the time, because the hero copy sits on top and legibility is non-negotiable.

### Medium recipes

#### `gradient` — simple single gradient, directional or radial

```css
.bg-gradient {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 80% 60% at 50% 50%,
    rgba(HUE1, 0.55), rgba(HUE2, 0.20) 60%, transparent 85%);
}
```

Light source controls the center position. Falloff `radial` uses ellipse; `linear` swaps to `linear-gradient(180deg, ...)`. Subtlety controlled by outer alpha and size.

#### `mesh` — multi-hue overlapping blurred gradients (classic Stripe era)

```css
.bg-mesh {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 50% 80% at 15% 20%, rgba(HUE1, 0.5), transparent 70%),
    radial-gradient(ellipse 60% 70% at 85% 30%, rgba(HUE2, 0.4), transparent 65%),
    radial-gradient(ellipse 55% 60% at 50% 80%, rgba(HUE3, 0.45), transparent 70%),
    radial-gradient(ellipse 40% 50% at 90% 90%, rgba(HUE4, 0.35), transparent 65%);
  filter: blur(60px);
  opacity: 0.9;
}
```

More hues = richer mesh; 4–6 is the sweet spot. Blur 40–80 px. Vignette overlay darkens edges when `vignette: subtle|strong`.

#### `painterly` — feTurbulence + displaced gradients (mymind vibe)

```html
<svg width="0" height="0" style="position:absolute;" aria-hidden="true">
  <defs>
    <filter id="bg-painterly" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="5" />
      <feDisplacementMap in="SourceGraphic" scale="60" />
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>
</svg>
```

```css
.bg-painterly {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 60% 50% at 20% 30%, rgba(HUE1, 0.25), transparent 60%),
    radial-gradient(ellipse 50% 45% at 80% 20%, rgba(HUE2, 0.20), transparent 65%),
    radial-gradient(ellipse 70% 55% at 60% 75%, rgba(HUE3, 0.18), transparent 60%),
    radial-gradient(ellipse 55% 50% at 30% 85%, rgba(HUE4, 0.15), transparent 60%);
  filter: url(#bg-painterly);
  opacity: 0.85;
}
```

`baseFrequency` 0.008–0.02 for stroke width; `scale` 30–80 for distortion; blur 5–15.

#### `pattern` — dot grid, line grid, hex

```css
.bg-pattern-dots {
  position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='12' cy='12' r='1.2' fill='%23748297' opacity='0.4'/></svg>");
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 85%);
}
```

Pattern size 16–48 px. Always apply a radial `mask-image` to fade edges — prevents "wall of dots".

#### `bokeh` — large blurred circular blobs

```html
<div class="bg-bokeh">
  <div class="blob" style="width:480px;height:480px;top:-120px;left:-80px;background:rgba(HUE1,0.6)"></div>
  <div class="blob" style="width:560px;height:560px;top:20%;right:-140px;background:rgba(HUE2,0.5)"></div>
  <div class="blob" style="width:400px;height:400px;bottom:-100px;left:30%;background:rgba(HUE3,0.5)"></div>
</div>
```

```css
.bg-bokeh { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; }
```

3–5 blobs, 300–600 px, blur 60–120 px. Position on corners and edges, not center.

#### `sculptural` — 3D-rendered geometric mass as the entire field

A sculptural medium fills the viewport with angular, translucent, 3D-looking forms stacked in perspective. There is no discrete hero subject — the mass *is* the hero. Use for Raycast-style launches, developer-AI, creative tools where the field itself is the identity. Always pair with `subject: none`.

Three recipes:

**`glass-bars` — diagonal translucent slabs** (Raycast energy)

```html
<div class="bg-sculptural bg-glass-bars">
  <div class="bar b1"></div>
  <div class="bar b2"></div>
  <div class="bar b3"></div>
  <div class="bar b4"></div>
  <div class="bar b5"></div>
</div>
```

```css
.bg-sculptural { position: absolute; inset: 0; pointer-events: none; overflow: hidden;
  perspective: 1400px; perspective-origin: 50% 40%; }
.bg-glass-bars .bar {
  position: absolute; left: 50%; top: 50%;
  width: 180px; height: 140vmax;
  border-radius: 28px;
  transform-origin: center;
  background: linear-gradient(180deg,
    rgba(HUE_TOP, 0.55) 0%,
    rgba(HUE_MID, 0.35) 50%,
    rgba(HUE_BOTTOM, 0.20) 100%);
  border: 1px solid rgba(HUE_EDGE, 0.45);
  box-shadow:
    0 0 120px rgba(HUE_GLOW, 0.35),
    inset 0 60px 120px rgba(255, 255, 255, 0.10),
    inset 0 -60px 120px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
}
.bg-glass-bars .b1 { transform: translate(-50%, -50%) rotateZ(-22deg) translateX(-360px) rotateY(18deg); opacity: 0.85; }
.bg-glass-bars .b2 { transform: translate(-50%, -50%) rotateZ(-22deg) translateX(-120px) rotateY(12deg); opacity: 0.95; }
.bg-glass-bars .b3 { transform: translate(-50%, -50%) rotateZ(-22deg) translateX(120px)  rotateY(6deg); }
.bg-glass-bars .b4 { transform: translate(-50%, -50%) rotateZ(-22deg) translateX(360px)  rotateY(0deg); opacity: 0.85; }
.bg-glass-bars .b5 { transform: translate(-50%, -50%) rotateZ(-22deg) translateX(560px)  rotateY(-6deg); opacity: 0.65; }
```

The shared `rotateZ` gives the whole stack its diagonal axis; the per-bar `translateX` + `rotateY` spreads them through depth. Tune bar width 140–220px, count 4–6, rotation -28°..-16°.

**`crystal-cluster` — angular gem-like shards**

```html
<div class="bg-sculptural bg-crystal">
  <div class="shard s1"></div>
  <div class="shard s2"></div>
  <div class="shard s3"></div>
  <div class="shard s4"></div>
</div>
```

```css
.bg-crystal .shard {
  position: absolute;
  width: 520px; height: 520px;
  clip-path: polygon(50% 0%, 100% 30%, 82% 100%, 18% 100%, 0% 30%);
  background: linear-gradient(135deg,
    rgba(HUE_LIGHT, 0.60),
    rgba(HUE_MID, 0.30) 55%,
    rgba(HUE_DEEP, 0.15));
  filter: blur(0.5px) drop-shadow(0 40px 80px rgba(HUE_GLOW, 0.35));
  mix-blend-mode: screen;
}
.bg-crystal .s1 { top: -10%; left: 18%; transform: rotate(-12deg) scale(1.1); }
.bg-crystal .s2 { top:  15%; left: 48%; transform: rotate(8deg)   scale(0.9); }
.bg-crystal .s3 { top:  30%; left: -5%; transform: rotate(24deg)  scale(0.8); }
.bg-crystal .s4 { top:  10%; left: 72%; transform: rotate(-18deg) scale(1.0); }
```

Overlapping faceted shards on `mix-blend-mode: screen` for additive light. 3–5 shards total.

**`geometric-drift` — floating rectangular planes**

```css
.bg-geometric .plane {
  position: absolute; border-radius: 20px;
  background: linear-gradient(140deg, rgba(HUE_A, 0.45), rgba(HUE_B, 0.20));
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 50px 120px rgba(HUE_SHADOW, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(8px);
}
```

Thin floating planes at varied scales and rotations, spread across the viewport. Reads like drifting billboards. Use 4–8 planes.

**Rules for all sculptural recipes:**
- No centered subject — the sculptural mass occupies the geometric center.
- Vignette often `subtle` to frame the mass against the page edges.
- Hero copy MUST sit on top with its own backdrop (dark scrim) or offset to a calm corner. Sculptural fields are dense and compete with text.
- Pair with `subject: none` and `relation.type: flat`.

#### `shader` — WebGL fragment shader (opt-in, Tier 2)

See `background-shaders.md` for the shader presets and runtime. A shader-medium background still obeys the `hero_stage` dials — `light_source`, `vignette`, `intensity`, and `motion` all map to shader uniforms. **Defaults must be subtle.** The shader runs at base intensity and is tuned upward only when the brand explicitly wants maximalist energy.

#### `noise` — overlay, combines with another medium

```css
.bg-grain-overlay {
  position: fixed; inset: 0; pointer-events: none;
  mix-blend-mode: multiply; opacity: 0.06;
}
.bg-grain-overlay::before {
  content: ""; position: absolute; inset: -50%;
  background: white; filter: url(#bg-grain);
}
```

Noise is never a base — it's a texture layer stacked on top of another medium when `texture: grain`.

#### `photo` — cannot reproduce; render labeled placeholder

Honest placeholder, not a fake stock photo. The placeholder describes in prose what the real image depicts.

```css
.bg-photo-placeholder {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--surface2), var(--surface3));
  display: flex; align-items: center; justify-content: center;
}
.placeholder-label {
  max-width: 360px; text-align: center; padding: 32px; color: var(--text3);
}
```

#### `absent` — no background field at all

`background: var(--bg);`. The absence is load-bearing identity. Do NOT decorate "because it feels empty". Nothing, Braun, brutalist.

### Light source, vignette, intensity — cross-cutting

These three dials apply on top of whichever medium is picked:

- **`light_source`** positions the brightest point of the background. For `gradient`/`mesh`/`painterly`, it sets the center of the dominant ellipse. For `shader`, it sets `u_light_pos`. Default `ambient` means no directional source.
- **`vignette`** darkens the outer edges of the stage via a radial overlay: `box-shadow: inset 0 0 200px rgba(0,0,0,0.3)` for `subtle`, doubled for `strong`. Off by default.
- **`intensity`** is a multiplier on all alphas and saturations. `subtle` = base values; `bold` = × 1.4; `blown-out` = × 1.8. Never start above `subtle`.

### Safe zone

`safe_zone` declares where the hero copy can safely sit without legibility risk:

- `full-bleed` — content fine anywhere; field is already calm
- `masked-for-text` — a central rectangle is dimmed beneath the headline via a masking gradient
- `edge-only` — the field is active only near the edges; the center is left blank for content

## Hero layer — dials

When a brand has a hero subject (a light-ball, a product window, a physical object, a composition), `hero.subject` is set and these dials apply:

| Dial | Values | Effect |
|---|---|---|
| `subject` | `none` / `luminous` / `object` / `device` / `composition` / `photo-cutout` | **What the subject IS, by intent.** Light-emitting abstract (`luminous`, CSS-renderable), physical matter (`object`, renders as a generic warm metallic form as a decorative placeholder — the user swaps it for their own 3D render or product shot before shipping), a product window (`device`, CSS-renderable), an arrangement of icons/illustrations (`composition`, CSS-renderable), a placeholder for a real photo (`photo-cutout`). |
| `form` | `sphere` / `disc` / `ring` / `torus` | **Geometry for `luminous` only.** Light has no natural shape; pick the silhouette that fits the brand. Ignored for every other subject — including `object`, because we never CSS-render concrete products. |
| `placement` | `center` / `off-center-left` / `off-center-right` / `bottom` / `top-corner-l` / `top-corner-r` | Where it sits in the hero box |
| `scale` | `dominant` / `balanced` / `accent` | How big relative to the hero text |
| `tint` | `brand` / `neutral` / `gradient-from-palette` / `metallic` | Color treatment |

When `subject: none`, the others are ignored.

### Subject taxonomy — by intent, not form

Subjects are categorized by **what the subject physically IS**, independent of geometry. The split also determines whether the subject is CSS-renderable or renders as an honest placeholder:

| Subject | What it is | CSS-rendered? | Physics |
|---|---|---|---|
| `luminous` | A light-emitting abstract object (orb, light-ball, plasma bloom). Has no physical mass. | ✅ CSS-renderable — light has no real-world form we're faking. | No gravity. Floats. No ground contact. Light comes from inside. |
| `object` | A concrete physical product — speaker, camera, watch, sculpture, industrial form, anything with mass that a real brand actually makes. | ❌ **Renders as a generic warm metallic form** (decorative placeholder: vertical pill, horizontal disc, or soft capsule). The form holds the slot on the stage but makes no attempt to represent the actual product. Users swap it for their own 3D render or product photography before shipping. CSS simulations of concrete products always lose to the real asset, so we don't try. | Gravity. Sits on an implied surface. Top-lit. Ground contact shadow + optional vertical reflection. These physics rules guide *how the user composes the stage around their inserted asset.* |
| `device` | A rectangular product window (app mockup, dashboard frame). | ✅ CSS-renderable — devices are always abstracted as a generic window, never a specific hardware model. | Floats or sits; mostly treated as flat UI. |
| `composition` | An arrangement of smaller elements (illustration scene, icon stack, bundle of cards). Merges the old `illustration` + `icon-stack`. | ✅ CSS-renderable — built from the chosen icon kit primitives. | Flat, 2D. No physics. |
| `photo-cutout` | Stand-in for a real photographic subject. | ❌ Renders as a labeled prose placeholder. Same honesty rule as `medium: photo`. | n/a |
| `none` | No subject. The background is the hero. | ✅ nothing to render | n/a |

**The rule is simple:** if it's abstract, we render it honestly. If it's a real product or a real photograph, we placeholder it honestly. No half-built CSS simulations of concrete hardware.

### Rendering philosophies — how the stage reacts to each subject

`luminous` and `object` stages are composed by completely different rules. For `luminous`, the rules tell us how to render the CSS. For `object`, the rules tell the user *how to compose the stage around their inserted product asset* — the same physics, applied to a placeholder.

|  | `luminous` (CSS-rendered) | `object` (placeholder + composed stage) |
|---|---|---|
| Gravity | No. Floats. | Yes. The user's asset must read as sitting on an implied surface. |
| Ground interaction | None | Contact shadow or vertical reflection — always something. The placeholder shows exactly where these live. |
| Light direction | Inside-out (emits) | Outside-in, top spotlight. Stage gradient + vignette come from the top. |
| Typical relations | `glow` / `emissive` / `halo` | `shadow-only` / `reflection` / `flat` |
| Stage palette | Hot center, cool rim | Dark canvas with a warm/brand-tinted spotlight pool |
| Tint default | `gradient-from-palette` | `metallic` or `neutral` (guides the stage tint; the inserted asset carries its own material) |
| `form` dial | Used — `sphere` / `disc` / `ring` / `torus` | Ignored — the placeholder is always a rectangular reservation frame |

**Rule of thumb:** if the subject is light itself, it's `luminous` and we render it. If it's a physical product the brand actually makes and sells, it's `object` and we placeholder it. The decision drives everything else about the stage.

### Subject × relation compat matrix

Not every subject pairs with every relation. Respect physics:

| | `flat` | `glow` | `halo` | `emissive` | `reflection` | `shadow-only` |
|---|---|---|---|---|---|---|
| `luminous` | weak (pasted-on) | ✅ default | ✅ | ✅ | ❌ (light has no floor) | ❌ (contradicts emission) |
| `object` | ok | ❌ (objects don't emit) | weak | ❌ | ✅ | ✅ default |
| `device` | ✅ default | ok | weak | ❌ | ✅ (Apple-style) | ✅ |
| `composition` | ✅ default | ok | ❌ | ❌ | ❌ | ✅ |
| `photo-cutout` | ✅ default | ok | ok | ❌ | ✅ | ✅ |
| `none` | ✅ (relation ignored) | — | — | — | — | — |

✅ = canonical pairing. ok = allowed but not default. weak = technically works but reads as pasted-on or contradictory. ❌ = disallowed — the recipe does not render this combination. Authors MUST pick a ✅ or `ok` cell.

### Subject recipes

#### `luminous` — a light-emitting abstract body

Default geometry is `sphere`, but `form` can be swapped to `disc` / `ring` / `torus` if the brand has a more specific identity. Luminous objects emit from the inside, float, and cast no ground shadow. The box-shadow is a hot outer glow, not a drop shadow.

```html
<div class="hero-luminous" data-form="sphere"></div>
```

```css
.hero-luminous {
  width: 280px; height: 280px;
  background: radial-gradient(circle at 35% 30%,
    rgba(HUE_HIGHLIGHT, 1) 0%,
    rgba(HUE_MID, 0.95) 35%,
    rgba(HUE_DEEP, 0.9) 70%,
    rgba(HUE_DEEPEST, 1) 100%);
  box-shadow:
    0 0 160px rgba(HUE_MID, 0.55),           /* outer glow — not a drop shadow */
    inset -20px -30px 60px rgba(0, 0, 0, 0.25),
    inset 20px 20px 60px rgba(255, 255, 255, 0.15);
}
.hero-luminous[data-form="sphere"] { border-radius: 50%; }
.hero-luminous[data-form="disc"]   { border-radius: 50%; transform: scaleY(0.28); }
.hero-luminous[data-form="ring"]   { border-radius: 50%; mask: radial-gradient(circle, transparent 48%, #000 50%); }
.hero-luminous[data-form="torus"]  { border-radius: 50%; mask: radial-gradient(circle, transparent 34%, #000 36% 66%, transparent 68%); }
```

Size by `scale`: `dominant` 320–400px, `balanced` 240–280, `accent` 160–200. Tint picks the gradient stops — `brand` uses brand-ramp (100/400/700/900), `gradient-from-palette` walks the background `color_palette`.

**Do NOT give a luminous object a ground-contact shadow or a floor reflection.** Light has no floor.

#### `object` — a concrete physical product (generic placeholder form)

**We do not CSS-render specific physical products.** A speaker, a camera, a watch, a pair of headphones, a sculpture, a piece of hardware — any physical product that a real brand actually makes and sells — is too specific to approximate with gradients and box-shadows. Every attempt at photorealism produces something that looks like a prop, not a product.

The solution is not a labeled placeholder frame (too bare, reads as unfinished work) and not a failed photorealistic simulation (reads as cheap cosplay). The right answer is a **generic warm metallic form** — a decorative shape that holds the slot on the stage, looks intentional, and makes **no attempt to represent the actual product**. The user replaces this form with their real 3D render or product photography before shipping. Until then, the page is fully shippable — the form is part of the design language, not a hole waiting to be filled.

```html
<div class="hero-object">
  <div class="obj-form"></div>
  <div class="obj-contact-shadow"></div>
  <div class="obj-reflection-zone"></div>
</div>
```

```css
.hero-object {
  position: relative;
  width: 180px;
  aspect-ratio: 9 / 16;
  margin: 0 auto;
  z-index: 5;
}

/* Warm metallic vertical pill — top-lit, soft wrap light, deep shadow
   at the base. Uses the brand's object palette. */
.obj-form {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(180deg,
    HUE_SPEC 0%,
    HUE_HIGHLIGHT 18%,
    HUE_MID 52%,
    HUE_DEEP 86%,
    HUE_EDGE 100%);
  box-shadow:
    inset 0 30px 60px rgba(255, 255, 255, 0.18),
    inset 0 -60px 120px rgba(0, 0, 0, 0.70),
    inset -14px 0 30px rgba(0, 0, 0, 0.50),
    inset  14px 0 30px rgba(0, 0, 0, 0.50),
    0 0 60px rgba(HUE_HIGHLIGHT, 0.12);
}
.obj-form::before {
  content: "";
  position: absolute;
  top: 8%; left: 22%; right: 22%;
  height: 18%;
  background: radial-gradient(ellipse at 50% 30%,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.15) 45%,
    transparent 75%);
  filter: blur(4px);
  border-radius: 50%;
}

/* Ground interaction lives below the form, not on it. Contact shadow
   + reflection zone are part of the stage, so the user's replacement
   render inherits them automatically when they swap the .obj-form. */
.obj-contact-shadow {
  position: absolute;
  left: -35%; right: -35%;
  bottom: -6px; height: 70px;
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 35%,
    rgba(0, 0, 0, 0.60) 0%,
    rgba(0, 0, 0, 0.30) 30%,
    rgba(0, 0, 0, 0.12) 60%,
    transparent 94%);
  filter: blur(12px);
}
.obj-reflection-zone {
  position: absolute;
  left: 0; right: 0; top: 100%;
  height: 100px;
  background: linear-gradient(180deg,
    rgba(HUE_HIGHLIGHT, 0.12) 0%,
    transparent 75%);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,0.65), transparent 80%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.65), transparent 80%);
}
```

**The `.obj-form` is a placeholder — it holds the slot, nothing more.** Concrete rules:

- The form must look intentional, not broken. Soft gradients, inset light wrap, clean silhouette.
- The form must **not resemble** the actual product. It's decorative, not descriptive. A pill for a cylinder product, a pill for a camera, a pill for a speaker — the form doesn't change.
- The palette comes from the brand's object colors (`HUE_SPEC` / `HUE_HIGHLIGHT` / `HUE_MID` / `HUE_DEEP` / `HUE_EDGE`), which means it picks up brand temperature automatically.
- Shape variants that all work: **vertical pill** (default, fits most brands), **horizontal disc** (for brands where "wide and flat" reads better), **soft capsule at an angle** (for more playful brands). Pick based on `tint` and stage aspect; never based on the actual product shape.
- `form` dial is ignored for `object`. The form is always the generic decorative shape.
- Contact shadow and reflection zone sit below the form and are inherited by the replacement asset. This teaches the physics of the stage even when the real asset isn't there yet.
- Document in the generated `design-model.yaml` disclaimer that the form is a placeholder and should be swapped for the real asset before shipping.

#### `device` — abstracted product window

```html
<div class="hero-device">
  <div class="device-bar"><span></span><span></span><span></span></div>
  <div class="device-content">
    <div class="device-row"></div>
    <div class="device-row short"></div>
    <div class="device-row"></div>
  </div>
</div>
```

```css
.hero-device {
  width: 560px; aspect-ratio: 16/10;
  background: var(--surface1);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15), 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
```

No real UI chrome — abstracted list rows and color blocks suggest a product without copying a specific one. `form` is ignored.

#### `composition` — arranged scene of smaller elements

Merges the old `illustration` and `icon-stack`. Three forms:

**`icon-stack` composition** — 3 overlapping rounded-rect cards, each containing a single icon from the chosen icon kit:

```html
<div class="hero-composition" data-layout="icon-stack">
  <div class="card c1"><i class="ph ph-cube"></i></div>
  <div class="card c2"><i class="ph ph-sparkle"></i></div>
  <div class="card c3"><i class="ph ph-lightning"></i></div>
</div>
```

**`scene` composition** — 3–5 icon-kit primitives arranged as a small scene (e.g. a document + arrow + folder). Pure SVG.

**`bundle` composition** — a cluster of smaller feature-cards floating behind one dominant element. Good for "one product with many capabilities".

Pick the layout in YAML with `hero.form` (reused as a sub-type selector for `composition`). If omitted, defaults to `icon-stack`.

#### `photo-cutout` — placeholder

Cannot reproduce a real cutout image. Render as a labeled prose placeholder — same rule as the background `photo` medium.

## Relation layer — dials

The relation is what ties the subject to the background. Without it, a hero subject looks pasted on. Two dials:

| Dial | Values | Effect |
|---|---|---|
| `type` | `flat` / `glow` / `halo` / `reflection` / `emissive` / `shadow-only` | How subject and background interact |
| `bleed` | `0–100` | How much subject-light spills into background |

### Relation types

#### `flat` — no interaction

Subject sits on top with normal z-index. Maybe a subtle drop shadow. The background does not react. Used when the subject is physically separate from the stage (Linear device on mesh).

#### `glow` — background-side halo behind the subject

```css
.relation-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 50%,
    rgba(HUE_SUBJECT, 0.6) 0%,
    rgba(HUE_SUBJECT, 0.2) calc(15% + BLEED * 0.4%),
    transparent calc(35% + BLEED * 0.5%));
  filter: blur(40px);
  mix-blend-mode: screen;
}
```

The glow sits *behind* the subject but in front of the background. `bleed` controls radius and alpha. Raycast uses this heavily.

#### `halo` — sharp concentric ring at subject edge

```css
.relation-halo {
  position: absolute;
  width: calc(var(--subject-size) * 1.2);
  height: calc(var(--subject-size) * 1.2);
  border-radius: 50%;
  border: 1px solid rgba(HUE_SUBJECT, 0.5);
  box-shadow: 0 0 0 calc(BLEED * 0.3px) rgba(HUE_SUBJECT, 0.12);
}
```

A ring of light at the subject's silhouette. Thinner and sharper than `glow`.

#### `reflection` — vertical mirror fading below

```css
.relation-reflection {
  position: absolute;
  top: 100%; left: 0; width: 100%; height: 50%;
  background-image: inherit; /* mirrors subject */
  transform: scaleY(-1);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 60%);
}
```

Classic Apple-style floor reflection. Rarely combined with other relations.

#### `emissive` — subject emits light into background

The subject's own tint literally bleeds into the background via `mix-blend-mode: screen` or `color-dodge` on a layer above the background but below the subject. `bleed` controls the radius of the emitted zone. Use for hot, glowing, bright products (launches).

#### `shadow-only` — drop shadow below, no light

```css
.relation-shadow-only {
  filter: drop-shadow(0 40px 60px rgba(0, 0, 0, 0.25));
}
```

Dev-tool-ish. Subject is grounded, background does not react. Vercel, GitHub, docs sites.

## Rendering pipeline

The hero stage is a stack of layers, bottom to top:

```
 z: 0  body background (var(--bg))
 z: 1  background medium           ← .bg-{medium}
 z: 2  vignette overlay (if on)    ← .hero-vignette
 z: 3  noise overlay (if on)       ← .bg-grain-overlay
 z: 4  relation layer (if glow/emissive/halo/reflection) ← .relation-*
 z: 5  hero subject                ← .hero-{subject}
 z: 10 content (headline, copy, CTA)
```

`flat` and `shadow-only` relations skip layer 4. `shadow-only` lives as a filter on the subject itself. `noise` overlays are global, not hero-local.

The entire stack lives inside the hero section as `position: relative; overflow: hidden`. Headline content gets `position: relative; z-index: 10` so it sits above the stage.

## Dual-track YAML schema

Same pattern as `iconography`: observed vs. renderable.

```yaml
hero_stage:
  preset: "luminous-on-gradient"  # starting point, or null for fully manual
  observed_style:
    description: "Centered glowing light-ball over a soft radial gradient in brand colors. The ball has specular highlights and bleeds warm light into the field behind it."
    where_used: ["hero", "final cta"]
    notes: "Real site uses a custom WebGL rendering with subtle noise on the sphere surface; we approximate with CSS radial-gradients."
  background:
    medium: "gradient"
    color_mode: "palette"
    saturation: "vibrant"
    light_source: "center"
    falloff: "radial"
    vignette: "subtle"
    texture: "clean"
    motion: "static"
    intensity: "subtle"
    safe_zone: "full-bleed"
    color_palette: ["#FF5E3A", "#FF2D55", "#5E2BFF", "#0A0A0F"]
  hero:
    subject: "luminous"           # intent: light-emitting abstract body
    form: "sphere"                # sphere/cube/cylinder/torus/disc/ring/freeform — luminous defaults to sphere
    placement: "center"
    scale: "balanced"
    tint: "gradient-from-palette"
  relation:
    type: "glow"
    bleed: 60
  disclaimer: "Approximated with CSS + SVG. Real hero uses commissioned or WebGL-rendered assets not redistributed with this skill."
```

For a physical `object` brand (hero renders as a generic warm metallic form; user swaps it for their own 3D render before shipping):

```yaml
hero_stage:
  preset: "object-on-spotlight"
  observed_style:
    description: "A turned aluminium cylinder sits on a dark stage under a tight top spotlight. A soft contact shadow grounds it. The field behind is almost black."
    # Documentation only — the description does NOT render on the page.
    # The hero slot holds a generic warm metallic form until the user swaps it.
  background:
    medium: "gradient"
    color_mode: "brand-tinted-neutral"
    saturation: "muted"
    light_source: "top"           # critical: top, not center — the stage is lit from above
    falloff: "radial"
    vignette: "strong"
    texture: "clean"
    motion: "static"
    intensity: "bold"             # hardware launches are the rare bold exception
    safe_zone: "edge-only"
    color_palette: ["#060608", "#0E0F13", "#3B270C", "#8F6B2A", "#F0D18C"]
  hero:
    subject: "object"             # intent: concrete physical product → placeholder
    # form: ignored for object. Placeholder is always a rectangular reservation.
    placement: "center"
    scale: "dominant"             # frame size on the stage
    tint: "metallic"              # guides stage color temperature, not the placeholder itself
  relation:
    type: "shadow-only"           # canonical pairing for object in the compat matrix
    bleed: 0
  disclaimer: "Hero subject renders as a generic warm metallic form (decorative placeholder). Replace the form with the brand's real 3D render or product photography before shipping. Stage composition (spotlight, vignette, floor highlight, contact shadow) is finished and production-ready."
```

For a sculptural-field brand (no subject):

```yaml
hero_stage:
  preset: "sculptural-field"
  observed_style:
    description: "A diagonal stack of translucent 3D glass bars fills the viewport. No centered subject — the geometric mass is the hero."
  background:
    medium: "sculptural"
    color_mode: "palette"
    saturation: "vibrant"
    light_source: "center"
    falloff: "radial"
    vignette: "subtle"
    texture: "clean"
    motion: "static"
    intensity: "bold"
    safe_zone: "masked-for-text"
    color_palette: ["#0A1028", "#1C2A5E", "#3C5BC2", "#8FB4FF", "#CFE0FF"]
  hero:
    subject: "none"
  relation:
    type: "flat"
    bleed: 0
```

For brands with no hero subject:

```yaml
hero_stage:
  preset: "painterly-no-hero"
  observed_style:
    description: "Hand-painted warm landscape scenes; no foreground subject — the background IS the hero."
  background:
    medium: "painterly"
    color_mode: "palette"
    saturation: "muted"
    light_source: "ambient"
    falloff: "soft"
    vignette: "off"
    texture: "paint"
    motion: "static"
    intensity: "subtle"
    safe_zone: "full-bleed"
    color_palette: ["#FFA47C", "#FFE926", "#FF7DD3", "#FFC2A8", "#5CB13E"]
  hero:
    subject: "none"
  relation:
    type: "flat"
    bleed: 0
```

## Dark mode

Every dial adapts:

- Background alphas: multiply by 0.6 for light-to-dark transitions, or double-track (separate values).
- Light source color shifts toward cooler / brighter variants in dark mode.
- Vignette typically stays or softens in dark mode (the page is already dark).
- Hero `luminous` tints shift toward the `brand.400` variant in dark mode (brighter, less saturated). Hero `object` keeps its metallic/neutral treatment but gets a brighter top specular to compensate for the darker floor.
- Glow relations often need MORE bleed in dark mode to read.

The generated landing page `[data-theme="dark"]` overrides should explicitly re-declare the altered values rather than relying on `filter: invert()`.

## Integration per view

| View | Applies hero stage? |
|---|---|
| **Landing page** | **Always**, in the hero section. Optionally echoed behind the final CTA for background-driven brands. Features stay on `var(--bg)`. |
| **Component library** | Never. Documentation must be legible. |
| **Bento grid preview** | Only the background layer, at reduced intensity (`intensity: subtle` forced). Never the hero subject. |
| **App screen** | Depends on the screen being rendered; match the brand's real product treatment. |

## Authoring checklist

When filling `hero_stage` in a new brand's `design-model.yaml`:

- [ ] `preset` picked from the 9 options (or explicitly `null`)
- [ ] `observed_style.description` is prose, honest, naming real-site behavior
- [ ] `background.medium` set (including `sculptural` for field-is-the-hero brands, or `absent` if the brand genuinely uses nothing)
- [ ] `background.color_palette` has 3–5 hues from the brand palette
- [ ] `background.intensity` starts at `subtle` unless there's a real reason
- [ ] `hero.subject` picked **by intent, not by form**. `luminous` = light-emitter (CSS-rendered), `object` = physical matter (generic warm metallic form, decorative placeholder), `device` = product window, `composition` = arranged elements, `photo-cutout` = prose placeholder.
- [ ] `hero.form` set only when `subject: luminous`. Choose `sphere` / `disc` / `ring` / `torus`. Ignored for every other subject.
- [ ] For `subject: object`, `observed_style.description` documents the intended product asset. It is NOT rendered on the page — it's context for whoever later swaps in the real asset.
- [ ] `relation.type` sits in a ✅ or `ok` cell of the subject × relation compat matrix. No `emissive` on an `object`, no `shadow-only` on a `luminous`.
- [ ] Sculptural-medium brands use `subject: none` + `relation.type: flat`.
- [ ] `disclaimer` field set — for `object`, it must explicitly say "hero subject renders as a decorative placeholder form; replace with final product asset before shipping."
- [ ] Both light and dark mode thought through
