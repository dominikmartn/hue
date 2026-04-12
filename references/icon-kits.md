# Icon Kit Catalog

Curated pool of freely-licensed icon kits that can be loaded via CDN. Every generated design skill picks ONE kit from this catalog as a best-match fallback for the brand's actual icons.

**Why a catalog exists.** We cannot copy a brand's proprietary icons into generated skills. Instead, we analyze the brand's visual icon style, then match it to the closest kit in this pool. The generated skill explicitly documents this as a fallback — never as the brand's real icons.

**Rule for Claude.** You must pick exactly ONE kit per skill. Do not mix kits in a single preview. If the brand's style doesn't match any kit perfectly, pick the least-wrong one and document the gap in `match_reasoning`.

---

## Matching Criteria

For each brand, extract these five attributes from the brand's actual icons (fetched during analysis). Then compare against the kits below to find the best fit.

| Attribute | Values |
|-----------|--------|
| **Stroke weight** | thin (≤1px) / regular (1.5–1.75px) / medium (2px) / bold (2.5–3px) / filled (no stroke) |
| **Corner treatment** | sharp (0px terminals) / soft (2–3px rounded) / fully-round |
| **Fill style** | outline only / solid / duotone / mixed |
| **Form language** | strict-geometric (perfect circles, grid-aligned) / humanist (slight irregularity, organic) / hand-drawn (intentional wobble) |
| **Visual density** | minimal (few lines, clear negative space) / balanced / detailed (many strokes, rich interior) |

---

## Kits

### 1. Phosphor

**Character.** Six weights, humanist, friendly. Phosphor is the most versatile kit in the pool — the `regular` weight reads warm and approachable, `thin` feels delicate and editorial, `bold` becomes punchy, `duotone` adds a second-color tint without going full multi-color. All weights share the same underlying geometry.

**Weights available.** thin (1px) · light (1.25px) · regular (1.5px) · bold (2px) · fill (filled) · duotone (two-tone)

**Match profile.**
- stroke_weight: thin / regular / bold / filled (pick weight based on brand)
- corner_treatment: soft (rounded terminals throughout)
- fill_style: outline / solid / duotone (pick based on brand)
- form_language: humanist
- visual_density: balanced

**Pick when.** The brand's icons feel friendly, warm, or consumer-facing. Works for editorial tools, consumer apps, note-takers, reading apps. The six weights make this the safe default when the brand is humanist — just pick the weight that matches.

**CDN (per weight).**
```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2/src/regular/style.css">
<!-- Swap "regular" for: thin, light, bold, fill, duotone -->
<i class="ph ph-heart"></i>
```

**Don't pick when.** The brand is strictly geometric with perfect-circle construction, or explicitly corporate / data-dense (→ use Lucide or Tabler instead).

---

### 2. Lucide

**Character.** Single weight (2px stroke), 24×24 grid, geometric-clean. Lucide is the Feather fork that became the modern default for clean product UIs — Shadcn uses it, Vercel uses it. Rounded line caps but straight geometry; no humanist warmth but no coldness either.

**Weights available.** One (2px stroke, rounded caps, 24px grid)

**Match profile.**
- stroke_weight: medium (2px)
- corner_treatment: soft (rounded caps, not fully rounded terminals)
- fill_style: outline only
- form_language: geometric
- visual_density: minimal to balanced

**Pick when.** The brand is clean, modern, product-focused without being corporate. Classic fit for dev tools, SaaS dashboards, Shadcn-based projects, Vercel-adjacent stacks.

**CDN.**
```html
<link rel="stylesheet" href="https://unpkg.com/lucide-static@latest/font/lucide.css">
<i class="icon icon-heart"></i>
```

**Don't pick when.** The brand needs multiple weights for hierarchy, or is explicitly warm/humanist (→ Phosphor), or explicitly dense/technical (→ Tabler).

---

### 3. Tabler Icons

**Character.** 1.5px stroke, highly consistent, 4500+ icons. The densest CDN-friendly kit in the pool. Icons have a slight technical feel without being cold — useful when you need obscure glyphs that Lucide doesn't cover.

**Weights available.** Two (outline 1.5px, filled)

**Match profile.**
- stroke_weight: regular (1.5px)
- corner_treatment: soft
- fill_style: outline / filled
- form_language: geometric with mild humanist touches
- visual_density: balanced to detailed

**Pick when.** The brand needs breadth — admin dashboards, data tools, analytics UIs, or anything where you'll need icons for specific concepts (charts, diagrams, obscure objects) that smaller kits miss.

**CDN.**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">
<i class="ti ti-heart"></i>
```

**Don't pick when.** The brand is minimal and small-kit-friendly (→ Lucide), or warm/editorial (→ Phosphor, Iconoir).

---

### 4. Iconoir

**Character.** 2px stroke, very slight hand-drawn quality, 24×24 grid. Iconoir is the closest thing in the pool to a "sketchy" or "editorial" feel — icons have tiny irregularities that give them warmth and personality without being cutesy.

**Weights available.** One (2px stroke outline)

**Match profile.**
- stroke_weight: medium (2px)
- corner_treatment: soft
- fill_style: outline
- form_language: humanist to hand-drawn
- visual_density: balanced

**Pick when.** The brand has a hand-crafted, editorial, or artisanal feel. Good for knowledge tools, indie editorial, journal apps, anything that wants to feel personal rather than manufactured.

**CDN.**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css">
<i class="iconoir-heart"></i>
```

**Don't pick when.** The brand is strictly geometric or corporate (→ Lucide, Heroicons).

---

### 5. Material Symbols

**Character.** Google's system icon set. Three style variants (outlined / rounded / sharp), four weight axes, a fill axis. The Android-adjacent default — friendly in `rounded`, neutral in `outlined`, technical in `sharp`. Variable font, so one file carries every style.

**Weights available.** Three styles × four weights × fill on/off = 24+ variants via one variable font

**Match profile.**
- stroke_weight: variable (100–700)
- corner_treatment: sharp / soft / fully-round (pick variant)
- fill_style: outline / filled (fill axis)
- form_language: geometric
- visual_density: balanced to detailed

**Pick when.** The brand has Android/Material lineage, or you explicitly want the "system icon" feel. Also useful as a last-resort fallback because the sheer variant count almost always gets you close to any brand.

**CDN.**
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
<!-- Swap "Rounded" for "Outlined" or "Sharp" -->
<span class="material-symbols-rounded">favorite</span>
```

**Don't pick when.** The brand is explicitly anti-Google / anti-Material (most dev tools, most editorial brands) — Material Symbols will make the preview look like a Google product.

---

### 6. Heroicons

**Character.** Tailwind team's official set. Two styles (outline 1.5px, solid). Corporate-neutral — no personality, but never looks wrong. Fewer icons than Phosphor or Tabler but covers most common needs.

**Weights available.** Two (outline 1.5px, solid)

**Match profile.**
- stroke_weight: regular (1.5px)
- corner_treatment: soft
- fill_style: outline / solid
- form_language: geometric
- visual_density: minimal

**Pick when.** The brand is corporate, SaaS, or Tailwind-based and doesn't have a distinctive icon language of its own. Safe fallback when nothing else fits and the brand is generic-professional.

**Usage.** Heroicons ships as SVG — no webfont CDN. In generated previews, use inline SVG from `https://heroicons.com/` or the jsDelivr SVG path:
```html
<!-- Copy SVG from heroicons.com per icon -->
<svg class="h-5 w-5"><!-- path data --></svg>
```

For preview simplicity, **prefer a font-based kit** unless the brand specifically calls for the Heroicons look.

**Don't pick when.** The brand has any distinctive icon personality — Heroicons will flatten it into generic-SaaS.

---

## Decision Matrix

Quick-pick guide. Use the matching criteria from the brand analysis, then find the closest cell.

| Brand character | Best kit | Fallback |
|-----------------|----------|----------|
| Warm, editorial, consumer | Phosphor regular | Iconoir |
| Warm with hand-drawn feel | Iconoir | Phosphor thin |
| Clean dev tool, modern SaaS | Lucide | Heroicons |
| Dense dashboard, data-heavy | Tabler | Lucide |
| Bold, graphic, punchy | Phosphor bold/fill | Tabler filled |
| Delicate, premium, editorial | Phosphor thin | Iconoir |
| Android-adjacent, rounded-friendly | Material Symbols Rounded | Phosphor regular |
| Corporate generic SaaS | Heroicons | Lucide |
| Strictly geometric / architectural | Lucide | Material Symbols Sharp |
| Duotone, playful, illustrative | Phosphor duotone | (no fallback — pick Phosphor) |

---

## What to write in the generated skill

When Claude picks a kit, the skill's `design-model.yaml` gets these fields (not the old flat `library: "..."`):

```yaml
iconography:
  observed_style:                  # prose — what the brand actually does
    description: "Hand-drawn, slightly wobbly 2px outline icons with rounded terminals. Custom set, not from any standard kit. Small details like a heart icon with slightly asymmetric lobes."
    stroke_weight: "regular (~1.75px)"
    corner_treatment: "soft"
    fill_style: "outline"
    form_language: "hand-drawn"
    visual_density: "minimal"
  fallback_kit:                    # the kit we actually use in the preview
    name: "Iconoir"
    weight: "default (2px)"
    match_score: "high"
    match_reasoning: "Iconoir is the only kit in the pool with intentional hand-drawn irregularity. Stroke weight (2px) is slightly heavier than observed (~1.75px), but the humanist personality matches. Phosphor thin would be second choice but too delicate."
    cdn: "https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css"
    icon_class_prefix: "iconoir-"
  disclaimer: "Icons in the generated preview are a best-match fallback from the Iconoir kit. The brand's actual icons are proprietary and not redistributed."
```

And the skill's `tokens.md` Section 7 gets a user-facing version of this with the disclaimer prominent.
