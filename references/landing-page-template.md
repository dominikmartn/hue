# Landing Page Template

The third visual output of every design skill. Where the Bento Grid shows the language *in use* (dashboard density) and the Component Library shows it *dismantled* (specs), the Landing Page shows it *telling a story* — marketing narrative flow, editorial typography, rhythmic alternation between text and visual.

## Why a third view exists

Some brands shine at density. Others shine at restraint. A Bento Grid flatters dashboard brands; a Landing Page flatters editorial ones. Generating both means you see which register the brand lives in, and where it breaks down. A brand that looks great in the grid but stiff in a landing hero has a weakness in its display-type system. A brand that looks great editorially but cluttered in the grid has a density problem.

## What to generate

A standalone HTML file (`landing-page.html`) in the skill folder. Self-contained except for Google Fonts + icon kit CDN. All CSS inline. All token values from `design-model.yaml`.

## Structure

```
┌─────────────────────────────────────┐
│  HEADER  [logo]  [nav]      [CTA]   │
├─────────────────────────────────────┤
│                                     │
│              HERO                   │
│      Big serif headline             │
│      Supporting copy                │
│      [Primary CTA]                  │
│                                     │
│         [hero visual]               │
│                                     │
├─────────────────────────────────────┤
│                                     │
│   FEATURE 1  (text left, visual right)
│                                     │
├─────────────────────────────────────┤
│                                     │
│   FEATURE 2  (visual left, text right)
│                                     │
├─────────────────────────────────────┤
│                                     │
│   FEATURE 3  (text left, visual right)
│                                     │
├─────────────────────────────────────┤
│                                     │
│         PULL QUOTE                  │
│         (optional, center)          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         PRICING                     │
│      (1-3 cards or single tier)     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         FINAL CTA                   │
│      (large centered block)         │
│                                     │
├─────────────────────────────────────┤
│   FOOTER  [mark]  [links]   [legal] │
└─────────────────────────────────────┘
```

## Layout rules

- **Centered max-width container.** 1120px for wide content, 640-720px for text-heavy passages. Never fullscreen.
- **Vertical rhythm.** Sections separated by generous whitespace — `--space-4xl` (96px) or more between major sections. Meadow-style brands default *up* the spacing scale.
- **Hero is dominant.** The hero headline should feel 2-3× larger than any other typography on the page. Use the display token or a custom larger size if needed.
- **Feature sections alternate.** Text-left / visual-right, then swap. Prevents the eye from falling into a single column.
- **One primary color arrival per section.** The accent should appear at a key moment — CTA, highlight, current state — and NOT be spread across every element. Restraint makes the accent feel special.
- **Flex heroes need explicit inner width.** If the hero is `display: flex; align-items: center` (to vertically center content in a `100vh` section), the inner container will shrink to its intrinsic content width instead of expanding to its `max-width`. Always give the inner `.container` or `.lp-hero > div` `width: 100%` so the `max-width` takes effect. Missing this rule silently collapses a 1320px hero down to 700px.

## CSS / HTML binding

Before shipping the landing, verify every selector actually matches an element:

- If you invent a wrapper class (e.g. `.hero-content`, `.hero-grid`), update every selector that references the old name. Rules like `.hero h1` won't apply to `<section class="lp-hero">` + `<div class="hero-content"><h1>`. The h1 then renders with default browser styles and looks broken.
- Rule of thumb: grep your stylesheet class-selectors against the HTML. Every class-selector should hit at least one element. Orphan selectors are almost always the source of "why is my display font not loading?".
- After generating, open the file in a browser and inspect the hero h1's computed `font-family` and `font-size`. If it says `Inter 32px` and you expected `Cormorant Garamond 96px`, your rule didn't match — fix the selector before declaring the landing done.

## Required sections

| # | Section | Required content |
|---|---------|-----------------|
| 1 | **Header** | Brand mark (logo or wordmark), minimal nav (3-5 links), primary CTA button on the right. Sticky or static depending on brand feel. |
| 2 | **Hero** | Display-sized headline (the brand's strongest claim), 1-2 sentence supporting copy, primary CTA button, optional secondary link ("Learn more"), optional hero visual |
| 3 | **Features** (3) | Each: small eyebrow label, medium heading, body paragraph, optional list of 3-4 sub-points, visual element (icon, card mockup, illustration — whatever fits the brand). Alternate left/right layout. |
| 4 | **Pull quote** (optional) | Large centered serif quote with attribution. Use if the brand has editorial personality. Skip for pure utility brands. |
| 5 | **Pricing** (optional) | Single tier card OR 2-3 tier comparison depending on brand model. Skip if the brand is pre-pricing (early product, enterprise-only). |
| 6 | **Final CTA** | Large centered block. Big heading, short copy, primary CTA button. Often includes a softer secondary link ("No credit card required" etc.). |
| 7 | **Footer** | Brand mark, link columns (3-4 columns of 4-6 links each), bottom row with copyright and legal. Minimal, never crowded. |

## Content rules — MOST IMPORTANT

**No lorem ipsum.** Ever. Every piece of copy must be written for the brand.

Before writing any copy, answer these three questions based on the brand analysis:

1. **What does this brand actually do?** One sentence, plain language.
2. **Who is it for?** One sentence.
3. **What's the brand voice?** Warm? Clinical? Witty? Direct? Poetic? Pick 2-3 adjectives and commit.

Then write the landing copy in that voice. Examples of how brand voice shapes copy for a hypothetical productivity tool:

- **Warm + poetic** (Meadow / mymind-style): "A place for what you can't afford to forget."
- **Clinical + precise** (Linear-style): "The issue tracker you'll enjoy using."
- **Witty + direct** (Notion-style): "One workspace. Every team."
- **Confident + minimal** (Apple-style): "The new standard."

The same product with different voices produces radically different landing copy. Match the voice to the brand's observed personality — don't impose a generic marketing voice.

**Specifics over generics.** Bad: "Powerful features for modern teams." Good: "Press `cmd+k` and find a note from three years ago by remembering one word from it." Concrete > abstract. Named capabilities > vague claims.

**Length rhythm.** Hero headline: 4-10 words. Feature headings: 3-7 words. Body paragraphs: 1-3 sentences max. Don't pad — landing pages reward compression.

## Visual elements (the non-text side of features)

Since we can't use the brand's real imagery, generate visual elements that are *suggestive* rather than literal. Options:

1. **Styled mini card stack** — 2-3 overlapping cards showing abstracted product content (list rows, a tag cluster, a progress ring). Reuses the component library language.
2. **Icon + text combo** — A single large icon from the chosen fallback kit (48-64px) with supporting label underneath, in a cleanly bordered container.
3. **Color + shape composition** — Abstract geometric shapes in the brand accent + neutrals, suggesting interface without being literal. Good for content-rich brands (Tesla, Nike-style).
4. **Type-as-image** — Oversized display type as the visual element itself. Works for editorial brands where typography IS the visual language.

Pick based on brand type:
- **UI-rich brand** → mini card stacks or real component mockups
- **Content-rich brand** → type-as-image or color compositions
- **Hybrid** → single icon + text combos

Never use stock-looking photos, never fabricate logos, never pretend to be someone else's brand.

## Canvas rules

- **Body background:** `var(--background)` — pure page background, NOT a surface tint. Landing pages breathe on the base color.
- **Section backgrounds:** mostly transparent (inherit body). Use `var(--surface1)` or `var(--surface2)` for *one* or *two* sections max to create rhythm — never more.
- **Container padding:** `48-64px` horizontal on desktop, `96-160px` vertical between sections.
- **Max content width:** 1120px for wide layouts, 720px for text-centered blocks.

## Dark mode toggle

**Same floating bottom bar** as the Bento Grid and Component Library. Copy the pattern exactly. User can toggle modes and see how the landing adapts — editorial brands often have dramatically different feels in light vs. dark.

## HTML skeleton

```html
<!DOCTYPE html>
<html lang="en" data-theme="{{primary-mode}}">
<head>
  <!-- fonts, icon kit CDN -->
  <style>
    /* Primitives + semantic tokens (same as other views) */
    /* Base + layout */

    .lp-header { /* sticky/static header */ }
    .lp-hero { padding: 128px 0 96px; text-align: center; }
    .lp-hero h1 {
      font-family: 'Lora', serif;
      font-size: clamp(40px, 7vw, 72px);
      line-height: 1.05;
      letter-spacing: -0.02em;
      max-width: 800px;
      margin: 0 auto 24px;
    }
    .lp-hero p { font-size: 18px; line-height: 1.6; color: var(--text2); max-width: 560px; margin: 0 auto 40px; }

    .lp-feature {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
      padding: 96px 0;
    }
    .lp-feature.reverse .lp-feature-text { order: 2; }
    .lp-feature-eyebrow { /* small label */ }
    .lp-feature-heading { font-family: display-font; font-size: 40px; }
    .lp-feature-visual { /* the non-text side */ }

    .lp-quote { /* centered pull quote */ }
    .lp-pricing { /* tiers */ }
    .lp-cta-block { /* final CTA */ }
    .lp-footer { /* minimal footer */ }
  </style>
</head>
<body>
  <header class="lp-header">...</header>
  <main>
    <section class="lp-hero">...</section>
    <section class="lp-feature">...</section>
    <section class="lp-feature reverse">...</section>
    <section class="lp-feature">...</section>
    <section class="lp-quote">...</section>
    <section class="lp-pricing">...</section>
    <section class="lp-cta-block">...</section>
  </main>
  <footer class="lp-footer">...</footer>

  <div class="floating-bar">
    <button class="mode-btn active" data-mode="light">Light</button>
    <button class="mode-btn" data-mode="dark">Dark</button>
  </div>

  <script>/* mode toggle */</script>
</body>
</html>
```

## Hero stage integration

Every landing page MUST render the brand's **hero stage** (from `design-model.yaml` → `hero_stage`). This is not optional — it's the step where brand identity actually shows up. Read `references/hero-stage.md` for the full dial reference and rendering recipes.

The hero stage is a **composed stack**: background field + optional hero subject + relation layer between them. Not just a background.

**Rendering pipeline** (bottom to top, inside the hero section):

```
 z: 0  body background (var(--background))
 z: 1  background medium          ← .bg-{medium}
 z: 2  vignette overlay           ← if hero_stage.background.vignette != off
 z: 3  noise overlay              ← if hero_stage.background.texture == grain
 z: 4  relation layer             ← if hero_stage.relation.type in [glow, halo, emissive, reflection]
 z: 5  hero subject                ← if hero_stage.hero.subject != none
 z: 10 content (headline, copy, CTA)
```

`flat` and `shadow-only` relations skip layer 4. `shadow-only` lives as a `filter: drop-shadow(...)` on the subject itself. The entire stack sits inside `<section class="lp-hero">` as `position: relative; overflow: hidden;`. Headline content needs `position: relative; z-index: 10;`.

**Where to apply the stack:**
- **Hero section (always).** Full pipeline: background + relation + hero subject + content.
- **Final CTA block (optional).** Echo only the *background* layer — never repeat the hero subject. Reduce intensity: if hero uses `intensity: bold`, CTA uses `subtle`.
- **Feature sections (never).** Features need to be legible — keep them on `var(--background)`.

**SVG filter injection.** For `painterly`, `noise`, and `pattern` mediums, inject the `<svg>` filter definitions at the top of the `<body>` (right after the opening tag, before the header).

**Dark mode adaptation.** Every hero-stage dial adapts. Explicit re-declaration beats `filter: invert()`:

```css
[data-theme="light"] .bg-painterly   { opacity: 0.85; }
[data-theme="dark"]  .bg-painterly   { opacity: 0.50; }

[data-theme="light"] .relation-glow  { opacity: 0.60; }
[data-theme="dark"]  .relation-glow  { opacity: 0.80; }  /* glow needs more bleed on dark */

[data-theme="light"] .hero-luminous  { /* brand.500 stops */ }
[data-theme="dark"]  .hero-luminous  { /* brand.400 stops (brighter) */ }
```

**`luminous` vs `object` — different rendering rules.** These two subjects are categorically different, not just stylistically. `luminous` floats and emits light; its box-shadow is a hot outer glow and it never has a ground-contact shadow. `object` sits on an implied surface and receives light from above; it always has either a contact shadow or a vertical reflection, and its box-shadow is a dark drop below. See the *Rendering philosophies* table in `references/hero-stage.md` before rendering either one.

**Reading the YAML.** Pull all values from `design_model.yaml > hero_stage`:
- `background.medium` → which recipe from `hero-stage.md` to use (includes `sculptural` for field-is-the-hero brands)
- `background.color_palette` → hues feeding the field
- `background.light_source` → where to center radial gradients / shader `u_light_pos`
- `background.vignette`, `background.intensity`, `background.motion` → overlay knobs
- `hero.subject` → which hero recipe to render (`none` → skip layers 4+5; `luminous`/`object` → different physics rules)
- `hero.form` → geometry for `luminous` and `object` (sphere / cube / cylinder / torus / disc / ring / freeform). Ignored for `device`, `composition`, `photo-cutout`, `none`.
- `hero.placement`, `hero.scale`, `hero.tint` → positioning and color treatment
- `relation.type` + `relation.bleed` → which relation layer (if any) to render. Must respect the subject × relation compat matrix.

## Clickability — disable all anchors

**This is a mockup, not a real page.** All `<a>` elements must be click-disabled so nothing scrolls, navigates, or opens. Hover states remain intact so the design is fully visible. Add this script at the bottom of the body, alongside the mode toggle:

```js
document.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', e => e.preventDefault());
});
```

Why not `pointer-events: none`? Because that also kills hover. We want hover to work (so the user sees the interactive design), but clicks must do nothing.

## Validation before showing

- [ ] Every copy line is brand-voice, not generic marketing
- [ ] Hero headline uses the display font at a size clearly larger than anything else
- [ ] Primary CTA appears in header + hero + final CTA block (3 coherent placements)
- [ ] Feature sections alternate left/right
- [ ] Only 1-2 sections use surface tints; the rest are on `var(--background)`
- [ ] All token values trace to `design-model.yaml` — no hardcoded hex
- [ ] Icons come from the chosen fallback kit with the disclaimer acknowledged
- [ ] Round stroke caps on any progress/ring/bar elements
- [ ] Dark mode tested — editorial brands often look very different and need attention
