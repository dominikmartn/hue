# Background Graphics Catalog (LEGACY — see `hero-stage.md`)

> **DEPRECATED as of hero_stage v2 (2026-04-10).** This file is kept only as a reference for older design skills that were generated before the `hero_stage` model existed. **For new work, use `references/hero-stage.md`** — it unifies background + hero subject + relation into one composed model with a single set of dials, and replaces the seven-category background-only classification described below.
>
> The `background_graphics:` YAML block described here has been subsumed into `hero_stage.background` (plus `hero_stage.hero` and `hero_stage.relation` for subject composition). If you're migrating an older skill, the mapping is: old `type` → new `medium`, old `motion` → new `motion`, old `color_palette` → new `color_palette`, old `observed_style` → new `observed_style`.

---

Brands signal identity through background imagery as strongly as through typography. Some brands are defined by their painted illustrations (mymind), others by gradient meshes (Stripe), others by geometric patterns (Vercel), and some by strict color fields (Nothing). Ignoring this layer produces generic-looking previews even when the tokens are perfect.

**Why a catalog exists.** We cannot copy the brand's actual imagery — commissioned illustrations, licensed photography, proprietary SVG systems all belong to the brand. Instead, we classify the brand's background treatment into one of seven categories and generate a code-based approximation that captures the *feel* without reproducing the asset.

**Rule for Claude.** This step is **mandatory** for every design skill. Even brands with no distinctive background treatment get documented as `type: absent` — the slot is never skipped. This prevents the quiet failure of forgetting background imagery entirely.

## Two tiers

The catalog is split into two tiers by technical complexity:

| Tier | Technique | When to pick |
|------|-----------|-------------|
| **Tier 1** — default | Static CSS + SVG filters | Almost every brand. Light, accessible, no runtime cost. |
| **Tier 2** — shader presets | WebGL fragment shaders (opt-in) | Brands where motion is load-bearing identity (generative-art brands, AI startups with moving mesh, audio/music brands, premium dark-mode brands). See `background-shaders.md` for the 5 curated presets. |

Default to Tier 1. Only reach for Tier 2 when the brand's actual site clearly uses animated WebGL/Canvas imagery as a primary identity signal. Don't upgrade to Tier 2 "because it would look cooler" — if the brand is static, approximating with animation is a lie.

## Motion attribute (Tier 1)

Tier 1 treatments can have a `motion` attribute that specifies whether they drift over time:

| Motion | Behavior | Use when |
|--------|----------|----------|
| `static` | No animation. | Default for almost everything. |
| `drift` | Gradient positions animate slowly over 20-40s with CSS `@keyframes`. | Brand has subtle slow motion on their site (AI startups, modern SaaS with animated meshes). |
| `pulse` | Opacity or scale breathes over 4-8s. | Rare; used for meditation/wellness brands where the background subtly "breathes". |

```css
@keyframes bg-drift {
  0%,  100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(-2%, 1%) scale(1.02); }
  66%       { transform: translate(1%, -2%) scale(1.015); }
}
.bg-painterly.motion-drift { animation: bg-drift 32s ease-in-out infinite; }

@keyframes bg-pulse {
  0%, 100% { opacity: 0.85; }
  50%      { opacity: 0.65; }
}
.bg-mesh.motion-pulse { animation: bg-pulse 6s ease-in-out infinite; }
```

Motion is an orthogonal flag, not a new type. Any Tier 1 type can have any motion value.

---

## The Seven Types

### 1. Painterly / Illustrated

**Character.** Hand-painted or illustrated backgrounds with organic, non-geometric shapes. Colors blend softly with irregularities that look like brushwork. Often features dreamy, landscape-like compositions or botanical motifs.

**Examples.** mymind (editorial + dreamy), Obsidian (some branding), Tumblr-era editorial sites, meditation/wellness apps with commissioned artwork.

**Technical method.** SVG `feTurbulence` + `feDisplacementMap` filter applied to a stack of large blurred radial gradients. The turbulence distorts the gradients into organic shapes that read as brushwork; the blur softens the result. Use the brand's dominant palette + 1-2 secondary accent hues.

**Recipe:**

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
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 60% 50% at 20% 30%, rgba(HUE1, 0.25), transparent 60%),
    radial-gradient(ellipse 50% 45% at 80% 20%, rgba(HUE2, 0.20), transparent 65%),
    radial-gradient(ellipse 70% 55% at 60% 75%, rgba(HUE3, 0.18), transparent 60%),
    radial-gradient(ellipse 55% 50% at 30% 85%, rgba(HUE4, 0.15), transparent 60%);
  filter: url(#bg-painterly);
  opacity: 0.85;
}
```

**Tuning knobs.**
- `baseFrequency` 0.008-0.02 → lower = broader strokes, higher = finer detail
- `scale` 30-80 → larger = more distortion, more organic
- `numOctaves` 2-4 → higher = more detail per octave
- `stdDeviation` on blur 5-15 → softer edges

**Dark mode.** Halve gradient alphas (0.25 → 0.12) and shift hues toward darker variants of the ramp. The turbulence and displacement still work on dark backgrounds.

---

### 2. Gradient Mesh

**Character.** Smooth overlapping multi-hue gradients with no visible texture. Classic "Stripe era" — colorful mesh that suggests depth and vibrance without being loud. Always soft, never sharp.

**Examples.** Stripe, Linear dark mode accents, modern AI product launches, Resend, Arc browser marketing.

**Technical method.** Pure CSS — layered `radial-gradient` with `conic-gradient` for the base mesh, high `filter: blur()` for smoothness, no SVG required.

**Recipe:**

```css
.bg-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 50% 80% at 15% 20%, rgba(HUE1, 0.5), transparent 70%),
    radial-gradient(ellipse 60% 70% at 85% 30%, rgba(HUE2, 0.4), transparent 65%),
    radial-gradient(ellipse 55% 60% at 50% 80%, rgba(HUE3, 0.45), transparent 70%),
    radial-gradient(ellipse 40% 50% at 90% 90%, rgba(HUE4, 0.35), transparent 65%);
  filter: blur(60px);
  opacity: 0.9;
}
```

**Tuning knobs.**
- More gradients = richer mesh, up to ~6 before it gets muddy
- Blur 40-80px is the sweet spot — less and the edges show, more and it flattens
- Alphas 0.3-0.6 work best

**Dark mode.** Increase alphas (0.4 → 0.6) and pick brighter variants — a mesh on black needs more saturation to read.

---

### 3. Geometric Pattern

**Character.** Repeating shapes at low opacity — lines, dots, grids, hexagons, angled strokes. Reads as technical, structured, engineered. Background density is moderate — never overwhelming the foreground.

**Examples.** Vercel (dot grid), GitHub (subtle grid), technical docs sites, dev tools, enterprise SaaS.

**Technical method.** SVG `<pattern>` element with the repeating shape, applied as a background. Or CSS `background-image` with `linear-gradient` tricks for simple grids.

**Recipe (dot grid):**

```html
<svg width="0" height="0" style="position:absolute;" aria-hidden="true">
  <defs>
    <pattern id="bg-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="1.2" fill="var(--text4)" opacity="0.4" />
    </pattern>
  </defs>
</svg>
```

```css
.bg-pattern-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='12' cy='12' r='1.2' fill='%23748297' opacity='0.4'/></svg>");
}
```

**Recipe (CSS grid lines):**

```css
.bg-pattern-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, var(--border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 85%);
}
```

**Tuning knobs.**
- Pattern size 16-48px → smaller = denser, larger = sparser
- Opacity 0.3-0.6 → needs to be subtle, never dominant
- Use `mask-image` with a radial gradient to fade the pattern at the edges — prevents the "wall of dots" feeling

**Dark mode.** Patterns read better on dark backgrounds at slightly higher opacity (0.4 → 0.5).

---

### 4. Bokeh / Organic Blur

**Character.** Large, soft, blurred circular shapes positioned across the background. Suggests atmosphere, depth, warmth without any detail. Often used by wellness, premium, editorial brands.

**Examples.** Calm, Headspace, some luxury brands, editorial sites with atmospheric feel.

**Technical method.** Large `border-radius: 50%` divs positioned absolutely, with generous `filter: blur()`. Simple, no SVG needed.

**Recipe:**

```html
<div class="bg-bokeh">
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
</div>
```

```css
.bg-bokeh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}
.b1 { width: 480px; height: 480px; top: -120px; left: -80px; background: rgba(HUE1, 0.6); }
.b2 { width: 560px; height: 560px; top: 20%; right: -140px; background: rgba(HUE2, 0.5); }
.b3 { width: 400px; height: 400px; bottom: -100px; left: 30%; background: rgba(HUE3, 0.5); }
```

**Tuning knobs.**
- Blob size 300-600px → larger = more atmospheric
- Blur 60-120px → always high
- 3-5 blobs max → more gets crowded
- Position strategically: corners and edges, not center

**Dark mode.** Same technique, lift alpha slightly.

---

### 5. Noise / Grain Texture

**Character.** Subtle pixel-level noise overlay on any surface. Suggests film grain, printed paper, analog materials. Usually combined with another treatment (flat color + grain, or mesh + grain).

**Examples.** Premium editorial, music brands, magazine sites, some gaming brands.

**Technical method.** SVG `feTurbulence` at high frequency, applied as a fixed overlay at low opacity. Not a background in itself — always an *overlay* on top of another treatment.

**Recipe:**

```html
<svg width="0" height="0" style="position:absolute;" aria-hidden="true">
  <defs>
    <filter id="bg-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </defs>
</svg>
```

```css
.bg-grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: multiply;
  opacity: 0.06;
  z-index: 1;
}
.bg-grain-overlay::before {
  content: "";
  position: absolute;
  inset: -50%;
  background: white;
  filter: url(#bg-grain);
}
```

**Tuning knobs.**
- `baseFrequency` 0.7-1.2 → higher = finer grain
- `opacity` 0.03-0.10 → subtle, always barely visible
- `mix-blend-mode`: `multiply` on light backgrounds, `overlay` or `screen` on dark

**Dark mode.** Switch blend mode to `overlay` or `soft-light` and raise opacity slightly.

---

### 6. Sketchy / Hand-drawn

**Character.** Intentionally imperfect, hand-drawn lines. Rough paths, pencil-like strokes, wireframe scribbles, cross-hatching. The "whiteboard" aesthetic — Excalidraw, tldraw, Obsidian-Canvas, sketch-note tools, lo-fi writing apps.

**Examples.** Excalidraw, tldraw, Obsidian, some knowledge-tool community plugins, Figma's FigJam, writing/journaling apps with a crafted feel.

**Technical method.** SVG patterns with intentionally irregular paths. Use `<pattern>` with hand-jittered `<path d="...">` or `<line>` elements. Or repeating SVG with `filter: url(#rough)` applied via `feTurbulence` at very low frequency + displacement, to jitter otherwise-clean lines.

**Recipe (sketchy dot cluster):**

```html
<svg width="0" height="0" style="position:absolute;" aria-hidden="true">
  <defs>
    <filter id="rough-edge">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
      <feDisplacementMap in="SourceGraphic" scale="2" />
    </filter>
    <pattern id="bg-sketchy" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
      <g filter="url(#rough-edge)" stroke="var(--text3)" stroke-width="1.2" fill="none" stroke-linecap="round">
        <path d="M10,20 Q30,15 50,22 T90,18" />
        <path d="M15,60 Q40,55 65,62 T105,58" />
        <circle cx="80" cy="35" r="3" />
        <path d="M20,95 L35,95" />
      </g>
    </pattern>
  </defs>
</svg>
```

```css
.bg-sketchy {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>...</svg>");
  opacity: 0.5;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 85%);
}
```

**Tuning knobs.**
- `baseFrequency` on rough-edge filter 0.02-0.08 → higher = more jitter
- `scale` on displacement 1-4 → more = rougher
- Pattern size 80-160px → bigger = sparser marks
- Opacity 0.3-0.6 — sketchy should feel like the sketch is *behind* the content

**Dark mode.** Swap stroke color from `--text3` to `--text2` or raise opacity slightly.

**When to pick.** Brand has a whiteboard, notebook, or sketching aesthetic. Writing tools, knowledge graphs, lo-fi design tools, anything with a "handmade" personality.

---

### 7. Absent (first-class choice, not fallback)

**Character.** No background imagery at all — and the absence is *identity-tragend*, not laziness. The brand's identity lives entirely in typography, spacing, and component treatment. Solid backgrounds make the brand feel more rigorous, not less designed.

**Examples.** Nothing, Braun, Linear (light mode marketing), brutalist designs, Stripe (some pages), Apple product pages (the product is the image, the background is intentionally nothing).

**Technical method.** Just `background: var(--background);`. No filter, no gradient, no pattern. The absence IS the design.

**Recipe:**

```css
.bg-absent {
  background: var(--background);
}
```

**Critical rule:** Do NOT add decoration because the slot feels empty. `type: absent` is a *choice* — the brand explicitly rejects background imagery as a design decision. Adding a subtle gradient "just to fill the space" violates the brand.

**Difference from Flat Color Field (which doesn't exist anymore):** Earlier versions had `flat` as a type that implied "we didn't find anything special, so we put nothing." `absent` is different: it means "the brand actively chose to have nothing, and that choice is load-bearing identity." When Claude picks `absent`, it must be because the brand's own site has no background imagery, and that absence is observable and deliberate.

**Tuning knobs.** None. If you feel the urge to add something, reconsider whether this is actually an `absent` brand or whether you're forcing it.

---

### 7. Photo Hero (Cannot Reproduce)

**Character.** Full-bleed commissioned or stock photography as the dominant background element. The image IS the design.

**Examples.** Tesla (car photography), Apple (product photography), Nike (action shots), luxury brands with editorial photography.

**Technical method.** **We cannot reproduce this honestly.** Attempting to fake it with stock photos violates the "don't pretend to be someone else's brand" rule. Instead, render a labeled placeholder that is visually restful and honest about what's missing.

**Recipe:**

```html
<div class="bg-photo-placeholder">
  <div class="placeholder-label">
    <span class="label-eyebrow">Photo hero area</span>
    <span class="label-desc">{{brand description of real imagery — e.g. "Full-bleed photograph of the Model S in profile against a desert landscape"}}</span>
  </div>
</div>
```

```css
.bg-photo-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--surface2), var(--surface3));
  display: flex;
  align-items: center;
  justify-content: center;
}
.placeholder-label {
  text-align: center;
  max-width: 360px;
  padding: 32px;
  color: var(--text3);
}
.label-eyebrow {
  display: block;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.label-desc {
  display: block;
  font-size: 14px;
  font-style: italic;
  line-height: 1.5;
}
```

The placeholder is honest: it tells the viewer "a real photo goes here, and here's what it depicts." Better than a fake hero.

---

## Matching Criteria

Extract these four attributes from the brand's site during analysis:

| Attribute | Values |
|-----------|--------|
| **Density** | none / sparse / moderate / dense / full-bleed |
| **Character** | organic / geometric / photographic / textural / absent |
| **Color richness** | monochrome / duotone / multi-hue / full-photo |
| **Texture feel** | smooth / painterly / grainy / crisp / flat |

Then map to a type:

| If brand is... | Pick |
|---|---|
| organic + multi-hue + painterly | **Painterly** |
| organic + multi-hue + smooth | **Gradient Mesh** |
| organic + mono/duo + smooth | **Bokeh** |
| geometric + mono/duo + crisp | **Geometric Pattern** |
| hand-drawn + sketchy + informal | **Sketchy** |
| any + grainy (as overlay) | **Noise** (combined with base type) |
| deliberately undecorated + identity-tragend | **Absent** |
| photographic + full-bleed | **Photo Hero** (placeholder only) |
| animated + fluid motion as load-bearing identity | **→ Tier 2 shader** (see `background-shaders.md`) |

---

## Integration rules for views

Not every view uses backgrounds the same way:

| View | Where to apply |
|------|---------------|
| **Landing Page** | Hero section (primary), optionally final CTA block. Body stays on `var(--background)`. |
| **Component Library** | Nowhere. The library is documentation — backgrounds would distract from the components. |
| **Bento Grid preview** | Optionally behind the grid if the brand is strongly background-driven (e.g. mymind) — but use a subdued variant so widgets stay legible. Never on the widgets themselves. |
| **App Screen** | Depends on the specific screen being rendered. Match the brand's real product treatment. |

---

## What to write in the generated skill

The `design-model.yaml` gets a dual-track block:

```yaml
background_graphics:
  observed_style:
    description: "Prose describing what the brand actually uses — e.g. 'Hand-painted warm landscape scenes with botanical motifs and dreamy color blending'"
    type: "painterly"           # one of: painterly, mesh, pattern, bokeh, noise, flat, photo
    density: "moderate"         # none, sparse, moderate, dense, full-bleed
    character: "organic"        # organic, geometric, photographic, textural, absent
    color_richness: "multi-hue" # monochrome, duotone, multi-hue, full-photo
    texture_feel: "painterly"   # smooth, painterly, grainy, crisp, flat
    color_palette:              # dominant hues observed
      - "#FFA47C"
      - "#FFE926"
      - "#FF7DD3"
    where_used:                 # which page areas
      - "hero"
      - "feature sections"
  fallback_approach:
    method: "painterly"         # matches the catalog entry
    match_score: "high"         # high, medium, low
    match_reasoning: "Painterly type matches observed hand-painted feel. Meadow uses warm gradients + feTurbulence displacement to approximate the dreamy blending."
    css_snippet: |
      .bg-painterly { ... }
    svg_filter: |
      <filter id="bg-painterly">...</filter>
    disclaimer: "Approximated with SVG + CSS. The real brand uses commissioned illustrations that are not redistributed with this skill."
```

And `tokens.md` gets a new Section 8 with the user-facing version including a prominent disclaimer, same dual-track pattern as iconography.
