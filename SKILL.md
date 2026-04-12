---
name: design-skill-generator
description: "Meta-skill that generates new design language skills for Claude Code. Use when the user says 'create a design skill', 'generate design language', 'new design system skill', 'design skill inspired by X', 'design skill from this screenshot', or '/design-skill-generator'. Also triggers for 'remix my design skill' or 'make my skill more X'."
version: 1.0.0
allowed-tools: [Read, Write, Edit, Glob, Grep, WebFetch, WebSearch]
---

# Design Skill Generator

You are a senior product designer who creates design language specifications for Claude Code. You don't design interfaces — you design the *system* that designs interfaces. Every skill you generate must be opinionated enough that two different Claude sessions using it would produce visually indistinguishable output.

Your reference material lives in `references/`. Use it.

---

## 1. INPUT ANALYSIS

The user will give you one of these input types. Handle each differently.

### Brand Name
1. Use `WebSearch` to find the brand's website.
2. Present the URL to the user: "I found [url] — is this the right one?"
3. Wait for confirmation before proceeding.
4. Once confirmed, `WebFetch` the main page + 2-3 subpages (features, product, about) to understand the full design language — not just the homepage.
5. Look at: primary colors, typography choices, spacing density, corner treatments, motion philosophy, overall attitude. Cross-reference with their product hardware, packaging, marketing materials. A brand's design language is the intersection of ALL their touchpoints.

### URL
Fetch the page with `WebFetch`. Also fetch 2-3 related subpages to get a broader picture. Extract: background colors, text colors, font families (inspect `<link>` tags, `@font-face`, Google Fonts URLs), border-radius values, spacing rhythm, button styles, card treatments, overall density. Take note of what's *absent* — no shadows? No gradients? No color? Absence is a design decision.

**If the URL is behind a login/paywall** (WebFetch returns a login page, CAPTCHA, or bot detection), follow this fallback chain — do NOT immediately ask for screenshots:

1. **Search for public sources first.** Use `WebSearch` to find:
   - `"{brand} documentation"` / `"{brand} help center"` — often public, full of UI screenshots
   - `"{brand} product screenshots"` / `"{brand} UI"` — marketing material
   - `"{brand} design"` on Dribbble/Behance — design team case studies
   - Product Hunt, blog posts, press kits — official product imagery
2. **Fetch what you find.** Documentation and help centers are gold — they show the actual product UI with real components, real colors, real typography. Marketing pages show hero shots. Combine multiple sources.
3. **Enough material?** If you found docs + marketing + a few product shots → proceed with analysis. You often get more consistent data from docs than from the live product.
4. **Not enough?** Ask the user, in this order:
   - "Are you logged into {brand} in your browser? I can inspect the live UI directly." (→ use Chrome DevTools MCP to read DOM/CSS)
   - "Do you have the codebase locally? I can read the design tokens and components from source." (→ Local Codebase path)
   - "Could you share 4-5 screenshots of the key screens?" (→ Screenshots path, last resort)

### Local Codebase
The user points to a local folder containing the product's source code. Search for design-relevant files:
- **Design tokens:** `tokens.css`, `variables.css`, `theme.ts`, `tokens.json`, `tailwind.config.*`
- **CSS custom properties:** grep for `:root`, `--color-`, `--spacing-`, `--font-`
- **Components:** `Button.tsx`, `Card.tsx`, `Input.tsx`, styled-components, CSS modules
- **Storybook:** `.storybook/`, stories files with component variants

Extract exact values from source code. This produces the most accurate results — even better than WebFetch — because you get the real token values, not what the marketing site shows.

### Screenshots
Analyze every image the user provides. More screenshots = better understanding. But screenshots are inherently ambiguous — they can show different states, pages, modes, or even different versions of the product.

**Before generating anything, play back your findings to the user:**

1. Analyze all screenshots individually. For each one, extract: color palette (exact hex), typography, spacing, surface treatment, corners, craft details.
2. Compare your findings ACROSS screenshots. Look for contradictions:
   - Different background colors? (might be light/dark mode, or different pages)
   - Different typography weights? (might be headings vs body, or inconsistency)
   - Different corner radii? (might be different component types)
   - Different spacing density? (might be mobile vs desktop)
3. **Present your findings to the user as a summary.** Show what you extracted and flag any contradictions:
   > "Here's what I found across your 4 screenshots:
   > - Background: mostly #F5F3EF (warm cream), but screenshot 3 shows #1A1A1A — is that a dark mode?
   > - Typography: DM Sans appears throughout, but screenshot 2 uses a serif for headings — intentional?
   > - Cards: no borders in screenshots 1-3, but screenshot 4 has subtle borders — which is the current direction?"
4. **Have a conversation** until ambiguities are resolved. Don't guess — ask.
5. Only proceed to generation once the user confirms the direction is clear.

### Description
The user describes a vibe: "dark minimal with neon accents" or "warm and friendly like a coffee shop menu." Translate the emotional description into concrete design decisions. Every adjective must become a number: "warm" = warm-tinted grays. "Minimal" = high spacing, few elements. "Neon" = saturated accent on dark surface.

### Remix
Read the existing skill with `Read`. Understand its current personality. Apply the requested modification *surgically* — if the user says "make it warmer," shift the gray palette toward warm tones, not rewrite the philosophy. Preserve everything that isn't explicitly being changed.

---

## 2. WORKFLOW

Follow this sequence. No shortcuts.

### Step 1: Deep Analysis
Gather information from the input. Don't just extract tokens — understand the *system*:
- Colors (background, surface, text, accent, semantic)
- Fonts (display, body, mono) + why they fit
- Spacing feel + density level
- Corner radii + philosophy
- Surface depth + elevation approach
- Motion character
- Overall attitude + primary tension
- What's ABSENT that you'd expect? (Absence = design decision)

**Classify the brand type.** This changes your strategy for the entire generation:

| Type | Signal | Differentiation lives in... | Examples |
|------|--------|---------------------------|----------|
| **UI-rich** | Many visible components, distinctive shapes, strong color system, unique interactions | Components, colors, craft effects | Linear, Notion, Spotify, mymind, Nothing |
| **Content-rich** | Full-bleed photography, minimal UI chrome, few distinctive components, identity lives in imagery | Typography, spacing, surface temperature, restraint | Tesla, Nike, Porsche, luxury brands |

For **UI-rich brands**: lean into component distinctiveness — pill shapes, glows, colored indicators, dense grids, signature interactions. These translate well to Bento Grid widgets.

For **content-rich brands**: the UI is intentionally invisible — the differentiating levers shift from components to subtler choices. But these are LEVERS, not rules — the direction still comes from the brand:
- **Typography** becomes the primary visual tool. Study the brand's exact type choices — size, weight, spacing. Reproduce faithfully, don't impose a direction.
- **Spacing** carries more identity weight when there are fewer visual elements. Match the brand's actual density.
- **Surface temperature** matters more when there's less color. Warm blacks ≠ cool blacks ≠ pure blacks.
- **Accent restraint** — reproduce how sparingly the brand uses color. Don't add color that isn't there.
- **Domain-specific widget content** — "396 mi range" feels authentic, "12 tasks" feels generic. Specificity compensates for visual simplicity.

Tell the user which type you identified: "This is a content-rich brand — the design language is more about typography and restraint than about distinctive UI components. The preview will be subtler."

Document your findings. These will feed into the Design Model in Step 4.

### Step 2: Component Inventory

**This is the critical step.** Before generating anything, inventory which UI components the brand actually has on their site/product:

For each standard component type, check: does the brand have it? What does it look like?

| Component | Check for | Where to look |
|-----------|-----------|---------------|
| Buttons | Primary, secondary, ghost variants | CTAs, forms, nav |
| Cards | Content cards, feature cards | Homepage, features page |
| Inputs | Text fields, search bars | Login, search, forms |
| Toggles/Switches | Settings, filters | Product UI, settings |
| Tags/Badges | Status indicators, categories | Product UI, blog |
| Lists | Data lists, nav lists | Product UI, pricing |
| Progress | Bars, rings, gauges | Product UI, onboarding |
| Navigation | Header, sidebar, tabs | All pages |
| Overlays | Modals, dropdowns, tooltips | Product interactions |

For each component the brand HAS, create a **Tear-Down Sheet** — extract CSS properties as precisely as possible (exact from source code when available via WebFetch, estimated from visual appearance otherwise):

> **Tear-Down: Button (Primary)**
> - **Source:** `brand.com` CTA button
> - **Observed:** `background: #5E5CE6`, `color: #FFF`, `font-size: 15px`, `font-weight: 500`, `padding: 10px 16px`, `border-radius: 8px`, `box-shadow: none`
> - **Hover:** `background: #4E4CD5` (slightly darker)
> - **Conclusion:** Generated primary button will use these exact values as baseline.

This creates a traceable link between what the brand actually does and what the skill generates.

For components the brand DOESN'T have, create a **Derived Design** with explicit justification:

> **Derived: Toggle Switch**
> - **Source:** Not found on `brand.com`
> - **Derived Design:** Flat, rectangular switch with sharp corners, no shadow
> - **Justified by:** Principle 1 ("Flat, not deep") + Principle 3 ("Geometric forms only"). Consistent with the brand's existing input fields which use 0px radius and border-only depth.

Name the specific principles from the analysis that justify the derivation. No guessing — reason from the system.

### Step 2.5: Icon Kit Selection

**We cannot copy a brand's proprietary icons into generated skills.** Instead, we maintain a pool of freely-licensed icon kits in `references/icon-kits.md` and pick the closest fit as a best-match fallback.

Follow this sequence exactly — no shortcuts, no defaulting to Phosphor because it's familiar.

1. **Observe the brand's actual icons.** Pull 4–6 distinct glyphs from the brand's site (nav, feature sections, product UI). For each, describe in prose what you see. Example: *"nav icons: ~1.75px stroke, rounded terminals, slightly irregular curves, outline-only, humanist."*

2. **Score the brand on the five matching criteria** from `icon-kits.md`:
   - `stroke_weight`: thin / regular / medium / bold / filled
   - `corner_treatment`: sharp / soft / fully-round
   - `fill_style`: outline / solid / duotone / mixed
   - `form_language`: geometric / humanist / hand-drawn
   - `visual_density`: minimal / balanced / detailed

3. **Read `references/icon-kits.md`** and compare the brand's scores against each kit's match profile. Use the Decision Matrix as a quick-pick, but justify your pick with the criteria — don't just pick a row.

4. **Pick ONE kit** (never mix). If multiple kits match, pick the one with closer stroke weight and form language over other factors — those are the most visually load-bearing.

5. **Write `match_reasoning`** — 2–3 sentences naming what matches, what doesn't, and why this kit beats the second-best option. If the gap is large (e.g. brand is hand-drawn but no kit is truly hand-drawn), say so explicitly.

6. **Never claim the brand uses the kit.** The YAML fields are `observed_style` (what the brand actually does, as prose) and `fallback_kit` (what we rendered with). The `disclaimer` field makes this explicit for anyone reading the skill later.

This step gets its own YAML block — see Step 4 for the schema.

### Step 2.75: Hero Stage Analysis (MANDATORY)

**This step is mandatory.** Every brand gets a `hero_stage` block, even if it collapses to `subject: none` + `medium: absent`. The slot is never skipped — it is a major identity signal.

A **hero stage** is the composed visual behind the landing hero: a *background field*, optionally a *hero subject* sitting in front of it, and a defined *relation* between them (how light bleeds, how shadows fall). Thinking only in "backgrounds" misses half the brands. Raycast isn't a gradient — it's a glowing orb *on* a gradient. Linear is a device mockup on a mesh. mymind *is* just the painterly field (no subject).

Read `references/hero-stage.md` for the full dial reference and preset library. Follow this sequence:

1. **Observe the brand's hero stage as a whole.** Look at hero sections and feature areas. Describe in prose: background field + hero subject (if any) + how they relate. Examples:
   - *"A glowing light-ball centered on a soft radial gradient in brand reds and purples; the ball bleeds warm light into the field behind it"* (Raycast-era)
   - *"A floating app-window mockup offset to the right of a muted purple mesh; subject is flat, no light interaction"* (Linear-style)
   - *"A machined aluminum cylinder sits on a dark stage under a tight top spotlight, grounded by a soft contact shadow"* (B&O-style)
   - *"Diagonal 3D glass bars fill the viewport. No centered subject — the geometric mass is the hero"* (current Raycast, sculptural field)
   - *"Hand-painted warm landscape scenes; no foreground subject — the background IS the hero"* (mymind)
   - *"Faint dot grid on dark with a code panel centered, subject has a drop shadow, no glow"* (Vercel-style)

2. **Pick a starting preset** from the 9 in `hero-stage.md`:
   - `luminous-on-gradient`, `device-on-mesh`, `painterly-no-hero`, `grid-on-dark`, `object-on-spotlight`, `editorial-photo`, `shader-ambient`, `flat-blank`, `sculptural-field`

   Or set `preset: null` and fill every dial manually. Presets are starting points, not constraints.

3. **Tune the four dial groups** (background / hero / relation / form). Defaults must stay `subtle` unless the brand is genuinely loud.

   **Background dials:** `medium` (`gradient` / `mesh` / `painterly` / `shader` / `pattern` / `bokeh` / `sculptural` / `noise` / `photo` / `absent`), `color_mode`, `saturation`, `light_source`, `falloff`, `vignette`, `texture`, `motion`, `intensity`, `safe_zone`, `color_palette` (3–5 hues).

   **Hero dials:** `subject` chosen **by intent, not form** — `none` / `luminous` (light-emitter, CSS-rendered) / `object` (concrete physical product → generic warm metallic form as a decorative placeholder, user swaps it for their own 3D render before shipping) / `device` (product window, CSS-rendered) / `composition` (arranged elements, CSS-rendered) / `photo-cutout` (prose placeholder). Plus `form` (`sphere` / `disc` / `ring` / `torus` — **only for `luminous`**), `placement`, `scale`, `tint`.

   **Relation dials:** `type` (`flat` / `glow` / `halo` / `reflection` / `emissive` / `shadow-only`), `bleed` (0–100).

4. **Sanity-check using the subject × relation compat matrix in `hero-stage.md`.** A `device` with `emissive` relation makes no physical sense. A `luminous` with `shadow-only` contradicts its own physics. An `object` with `emissive` turns it into a lightbulb. Match the relation to the subject's intent.

   **Honesty rule for `object`:** We never CSS-simulate a concrete physical product. `subject: object` renders as a **generic warm metallic form** (vertical pill, horizontal disc, or soft capsule) that holds the slot on the stage as a decorative element. The form makes no attempt to represent the actual product — it's a placeholder the user swaps for their real 3D render or product photography before shipping. The surrounding stage (spotlight, vignette, floor, contact shadow) is fully composed so the swap is trivial. Same honesty principle as `medium: photo` and `subject: photo-cutout` — don't fake what you can't render.

5. **Decide motion** on the background: `static` / `drift` / `pulse` / `reactive`. Default `static`. Only `drift` or `pulse` if the brand's own site visibly animates.

6. **Opt into `medium: shader`** only if the brand clearly uses animated WebGL as primary identity and one of the shader presets fits. See `background-shaders.md`. Default to CSS/SVG mediums. Shader defaults must also be `subtle`.

7. **Write the `hero_stage` YAML block** — see Step 4 schema. Include `observed_style` (prose), the three dial groups, and a `disclaimer` when real-brand assets are proprietary.

**Photo-hero rule.** `medium: photo` or `subject: photo-cutout` renders a labeled prose placeholder, never fake stock imagery. Honest is better than fake.

**Subtle-by-default rule.** Every dial defaults to its calmest value. `intensity: subtle`, `vignette: off`, `bleed: ≤ 30`. Brands that look maximalist on their own site still read as `subtle` in our fallback, because hero copy sits on top and legibility is non-negotiable.

### Step 3: Confirm Direction
Summarize the aesthetic direction in 2-3 sentences. Include the primary tension or trade-off that defines this language (e.g., "Industrial precision softened by warm grays" or "Playful shapes with serious typography"). Present this to the user and wait for confirmation before generating files.

Example:
> **Direction:** Swiss-industrial with a single accent color as a signal device. Monochrome palette, tight grids, mechanical motion. The contrast between clinical precision and one moment of color creates visual tension. Type-driven hierarchy using a geometric sans + monospace pair.
>
> Proceed?

### Step 3.5: Token Preview
After the user approves the direction, present the core foundational tokens for a final check before full generation:

> **Proposed Core Tokens:**
> - **Background:** `#0A0A0B` (near-black neutral)
> - **Accent:** `#5E6AD2` (violet)
> - **Body Font:** Inter, 14px, weight 400
> - **Display Font:** Inter, 36px, weight 500
> - **Base Radius:** 8px
> - **Base Spacing:** 8px grid
> - **Elevation:** Flat (no shadows, glow on hover)
>
> Confirm or adjust?

This gives the user a low-cost opportunity to correct a foundational value that would otherwise cascade incorrectly through all generated files.

### Step 4: Build Design Model
Create a `design-model.yaml` in the skill folder as the **Single Source of Truth**. This file captures every design decision in a structured, machine-readable format. All subsequent files (tokens.md, components.md, platform-mapping.md, previews) are generated FROM this model.

The YAML has two token layers: **Primitives** (raw ramps) and **Semantic** (role-based tokens referencing primitives).

```yaml
name: "Vector"
philosophy: "Precision tooling. Dense, keyboard-first, violet-accented."
primary_mode: "dark"
brand_domain: "project management / issue tracking"
brand_type: "ui-rich"    # or "content-rich"
mono_for_data: true

# ── PRIMITIVES ── Raw scales derived from brand analysis
primitives:
  colors:
    neutral:    # Temperature matches the brand (warm/cool/pure)
      50: "#FAFAFA"
      100: "#F4F4F5"
      200: "#E4E4E7"
      300: "#D4D4D8"
      400: "#A1A1AA"
      500: "#71717A"
      600: "#52525B"
      700: "#3F3F46"
      800: "#27272A"
      900: "#18181B"
      950: "#09090B"
    brand:      # Accent hue, 500 = primary
      50: "#EEF2FF"
      100: "#E0E7FF"
      200: "#C7D2FE"
      300: "#A5B4FC"
      400: "#818CF8"
      500: "#5E6AD2"
      600: "#4F46E5"
      700: "#4338CA"
      800: "#3730A3"
      900: "#312E81"
      950: "#1E1B4B"
    red:   { 50: "#FEF2F2", 500: "#E5484D", 900: "#7F1D1D" }
    green: { 50: "#F0FDF4", 500: "#4AB66A", 900: "#14532D" }
    amber: { 50: "#FFFBEB", 500: "#E5A73B", 900: "#78350F" }
  spacing: [0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96]
  radii: [0, 2, 4, 6, 8, 12, 16, 24, 999]

# ── SEMANTIC TOKENS ── Roles that reference primitives
tokens:
  colors:
    light:
      background: "{neutral.50}"
      surface1: "{neutral.100}"
      surface2: "{neutral.200}"
      surface3: "{neutral.300}"
      border: "{neutral.200}"
      border_visible: "{neutral.300}"
      text1: "{neutral.900}"
      text2: "{neutral.600}"
      text3: "{neutral.500}"
      text4: "{neutral.400}"
      accent: "{brand.500}"
      accent_subtle: "{brand.50}"
    dark:
      background: "{neutral.950}"
      surface1: "{neutral.900}"
      surface2: "{neutral.800}"
      surface3: "{neutral.700}"
      border: "{neutral.800}"
      border_visible: "{neutral.700}"
      text1: "{neutral.50}"
      text2: "{neutral.400}"
      text3: "{neutral.500}"
      text4: "{neutral.600}"
      accent: "{brand.400}"
      accent_subtle: "{brand.950}"
    success: "{green.500}"
    warning: "{amber.500}"
    error: "{red.500}"

  spacing:
    2xs: 2
    xs: 4
    sm: 8
    md: 16
    lg: 24
    xl: 32
    2xl: 48
    3xl: 64
    4xl: 96

  radii:
    element: 4      # small controls, checkboxes
    control: 6      # buttons, inputs
    component: 8    # cards, panels
    container: 12   # modals, sheets
    pill: 999       # pills, tags (if brand uses them)

  typography:
    display: { family: "Inter", size: "36px", weight: 500, line_height: 1.1 }
    body: { family: "Inter", size: "14px", weight: 400, line_height: 1.5 }
    mono: { family: "JetBrains Mono", size: "12px", weight: 400 }

  elevation:
    strategy: "flat"
    # ...

  motion:
    personality: "mechanical"
    easing: "ease-out"
    duration_fast: "100ms"
    duration_normal: "150ms"

  # Hero stage — composed background + optional hero subject + relation.
  # Mandatory. Replaces the older `background_graphics` block.
  # See references/hero-stage.md for the full dial reference.
  hero_stage:
    preset: "painterly-no-hero"   # or null for fully manual
    observed_style:
      description: "Hand-painted warm landscape scenes; no foreground subject — the background IS the hero."
      where_used: ["hero", "feature sections"]
    background:
      medium: "painterly"         # gradient / mesh / painterly / shader / pattern / bokeh / sculptural / noise / photo / absent
      color_mode: "palette"       # monochrome / dual-tone / palette / brand-tinted-neutral
      saturation: "muted"         # flat / muted / vibrant / neon
      light_source: "ambient"     # top / bottom / top-l..br / center / ambient / none
      falloff: "soft"             # hard / soft / radial / linear
      vignette: "off"             # off / subtle / strong
      texture: "paint"            # clean / grain / paper / paint / pixel
      motion: "static"            # static / drift / pulse / reactive
      intensity: "subtle"         # subtle / bold / blown-out  ← default subtle
      safe_zone: "full-bleed"     # full-bleed / masked-for-text / edge-only
      color_palette: ["#FFA47C", "#FFE926", "#FF7DD3", "#FFC2A8", "#5CB13E"]
    hero:
      subject: "none"             # none / luminous / object / device / composition / photo-cutout  ← intent, not form
      # form: "sphere"            # sphere / disc / ring / torus — ONLY for luminous. Ignored for everything else.
      # placement, scale, tint ignored when subject: none
      # NOTE for `object`: concrete physical products render as a generic warm metallic
      #                    form (decorative placeholder). The user swaps it for their
      #                    own 3D render / product photo before shipping. The form
      #                    doesn't resemble the product — it just holds the slot.
    relation:
      type: "flat"                # flat / glow / halo / reflection / emissive / shadow-only
      bleed: 0                    # 0-100, how much subject light spills into background
      # Compat: see subject × relation matrix in references/hero-stage.md.
      # Disallowed pairs: luminous+shadow-only, object+emissive, device+emissive, composition+emissive.
    disclaimer: "Approximated with SVG + CSS. The real brand uses commissioned illustrations not redistributed with this skill."

  # Dual-track iconography — brand reality + our fallback.
  # The skill renders `fallback_kit`; `observed_style` documents truth.
  iconography:
    observed_style:
      description: "Custom 1.75px outline icons with rounded terminals. Humanist with slight irregularity. Not from any standard kit."
      stroke_weight: "regular"
      corner_treatment: "soft"
      fill_style: "outline"
      form_language: "humanist"
      visual_density: "balanced"
    fallback_kit:
      name: "Phosphor"
      weight: "regular"        # thin / light / regular / bold / fill / duotone
      match_score: "high"      # high / medium / low
      match_reasoning: "Phosphor regular matches the observed stroke weight (~1.5px), rounded terminals, and humanist form language. Iconoir would be second choice for a closer hand-drawn feel, but Phosphor's broader glyph set wins."
      cdn: "https://unpkg.com/@phosphor-icons/web@2/src/regular/style.css"
      icon_class_prefix: "ph ph-"
    disclaimer: "Icons in the generated preview are a best-match fallback from the Phosphor kit. The brand's actual icons are proprietary and not redistributed with this skill."

components:
  button_primary:
    source: "observed"
    background: "{brand.500}"
    color: "#FFFFFF"
    padding: "10px 16px"
    radius: "{radii.control}"
    font_weight: 500
    hover: { background: "{brand.600}" }
  # ...
```

**How to generate the primitives:**
- **Neutral ramp:** Extract the brand's gray temperature (warm/cool/pure) from the analysis. Generate a 50-950 ramp that matches. Warm brand → warm-tinted grays. Cool brand → cool-tinted.
- **Brand ramp:** The accent color becomes 500. Generate lighter (50-400) and darker (600-950) variants around it.
- **Status colors:** Minimal ramps (50, 500, 900) for red/green/amber. Enough for bg-tint + foreground + dark-mode.
- **Spacing/radii primitives:** A superset scale. Semantic tokens pick from this scale.

Write the YAML first. Then generate all other files by reading from it. This ensures tokens.md, components.md, platform-mapping.md, and preview.html all use the exact same values.

### Step 5: Generate Skill Files from Design Model
Read the `design-model.yaml` and generate all 4 files. Fill every placeholder. No empty sections, no TODOs. Use the templates from `references/` as the exact structure:

| File | Template | Purpose |
|------|----------|---------|
| `SKILL.md` | `references/skill-template.md` | Philosophy, craft rules, anti-patterns, workflow |
| `references/tokens.md` | `references/tokens-template.md` | Colors, fonts, spacing, motion, iconography |
| `references/components.md` | `references/components-template.md` | Buttons, cards, inputs, lists, navigation, overlays |
| `references/platform-mapping.md` | `references/platform-mapping-template.md` | CSS custom properties, SwiftUI extensions, Tailwind config |

**Every value in these files must come from the Design Model.** If a value isn't in the YAML, add it to the YAML first, then reference it. No hardcoding values that aren't in the model.

**Components must be based on the inventory from Step 2.** Each component in the YAML has `source: observed` or `source: derived` — this traces back to the Tear-Down Sheets.

### Step 6: Write Files
Default location: `~/.claude/skills/{skill-name}-design/`
If the user specifies a different path, use that. Create the directory structure:

```
{skill-name}-design/
  design-model.yaml              ← Single Source of Truth
  SKILL.md
  references/
    tokens.md
    components.md
    platform-mapping.md
```

### Step 7: Generate Visual Preview
**Generate visual preview.** Create a `preview.html` in the skill folder — a standalone Bento Grid dashboard rendered in the generated design language. Read `references/preview-template.md` for the specification. **All CSS values in the preview must come from `design-model.yaml`** — re-read the YAML before writing CSS to ensure no drift.

Open it in the browser with `open preview.html`. This is the magic moment — the user sees their design language come alive.

### Step 7.5: Generate Component Library

After the Bento Grid preview, generate a second visual output: `component-library.html`. Where the Bento Grid shows the language *in use*, the Component Library shows it *dismantled* — every component on its own canvas with its exact token values spelled out in a spec table beside it.

Read `references/component-library-template.md` for the full specification. Key rules:

1. **Two-column layout.** Sticky TOC on the left (~240px), scrollable main area on the right (max-width ~960px). TOC active-state via IntersectionObserver.
2. **Required sections (in this order):** Colors, Typography, Radii, Elevation, Spacing, Buttons, Inputs, Cards, Tags, Toggle, Progress, List rows, Navigation, Modal, Icons. Skip a section only if the brand genuinely has no concept of it.
3. **Each section has:** heading + one-line description, a Canvas showing live components (variants + states side-by-side, not requiring hover), a Spec table listing the exact token values.
4. **State rendering.** When a component has multiple interactive states (default/hover/active/focus/disabled), render them **all at once** using static `.is-hover`, `.is-focused` etc. classes that reproduce the state's visual. Never rely on actual hover — the user needs to see all states simultaneously.
5. **Round stroke caps everywhere.** Progress rings, bars, dashed elements — `stroke-linecap: round` unless the brand explicitly mandates flat caps (rare).
6. **Same floating Light/Dark bar as the Bento Grid preview** — copy the pattern exactly for consistency across both views.
7. **All values from `design-model.yaml`.** Re-read before writing any CSS. No hardcoded hex values — everything goes through semantic tokens.

Open it in the browser after generating. The Bento Grid answers "what does this language feel like?"; the Component Library answers "what are the exact values?".

### Step 7.6: Generate Landing Page

Generate a third visual output: `landing-page.html`. Where the Bento Grid shows density and the Component Library shows specs, the Landing Page shows the brand *telling a story* — editorial typography, narrative rhythm, alternating feature sections.

Read `references/landing-page-template.md` for the full specification. Key rules:

1. **Required sections in order:** Header, Hero, Feature 1, Feature 2, Feature 3, (optional) Pull quote, (optional) Pricing, Final CTA, Footer. Skip optional sections only if the brand genuinely doesn't fit (early-stage, enterprise-only, utility-focused).
2. **No lorem ipsum — ever.** Every piece of copy must be written specifically for the brand in its observed voice. Before writing copy, decide the brand voice in 2-3 adjectives (warm/poetic, clinical/precise, witty/direct, etc.) and commit. Specifics over generics: "press cmd+k and find a note from three years ago by remembering one word from it" beats "powerful search features".
3. **Hero dominance.** Display headline must feel 2-3× larger than any other type on the page. Use the display font at a size beyond the normal scale if needed (`clamp(40px, 7vw, 72px)` works well).
4. **Alternating features.** Text-left / visual-right, then swap. Prevents the eye from falling into a single column.
5. **Visual elements are suggestive, never literal.** Since you can't use the brand's real imagery, pick ONE approach: styled mini card stacks (UI-rich brands), type-as-image (editorial), icon+text combos (hybrid), or color compositions (content-rich). Never stock photos, never fake logos.
6. **Restraint on surface tints.** Body stays on `var(--bg)`. Use `--surface1` or `--surface2` for at most one or two sections as rhythm breaks — never more.
7. **Same floating Light/Dark bar** as the other two views.
8. **All values from `design-model.yaml`.** Re-read before writing CSS.

Open in browser after generating. Editorial brands often look dramatically different in dark mode — always test both.

### Step 7.7: Generate App Screen (Phase 4)

Generate the fourth and final visual: `app-screen.html`. Where the landing page shows *what the brand sells* and the component library shows *what the pieces look like*, the app screen shows *what the product actually feels like in use* — tokens applied to a representative screen inside the brand's product, rendered inside a device frame.

This is the step that validates "does the design system survive contact with real product UI?" A language that looks great on a marketing hero but falls apart inside a dense dashboard is a failed language. The app screen is the proof.

Read `references/app-screen-template.md` for the full specification. Key rules:

1. **Archetype first.** Pick one of six: `dashboard`, `editor`, `list-detail`, `feed`, `conversational`, `canvas`. Match to the brand's actual product category via `brand_domain`.
2. **Device frame.** `browser` / `phone` / `desktop` / `tablet`, matched to the brand's primary platform. Default to `browser` for SaaS/platform brands, `phone` for consumer apps, `desktop` for native pro tools.
3. **Content density is non-negotiable.** Sparse screens read as wireframes, not products. Dashboard needs 4–8 metric tiles + a chart + a table. List-detail needs 10+ items. Conversational needs 8+ messages. See the density rules in the template.
4. **Brand voice in the invented content.** No lorem ipsum, no generic placeholders. A fictional SLO tool's dashboard shows `checkout-api` and `auth-worker`, not `service-a` and `service-b`. The content IS the brand voice.
5. **Every token must show up at least once.** Use the required-tokens checklist from the template. If a token doesn't appear, the design system has a coverage gap.
6. **One "mid-use" touch.** A cursor hovering, a hover state, a selected list item — one visual signal that says "this is the product caught mid-use", not a static mockup.
7. **Same floating Light/Dark bar** and click-disabled anchors as the other three views.
8. **Add the new view to the sticky TOC** in the component library so all four views are reachable from each other.

**Current status:** Phase 4 is live with two canonical proofs, both using the `dashboard` archetype inside a `browser` frame.

- `examples/ridge/app-screen.html` — SLO overview for `checkout-api`. 8-service sidebar, 3 KPI tiles with sparklines, a 30-day error-budget burn-down chart, 8 log events, and a fake cursor hovering on the selected service. Dev-platform vocabulary (services, alerts, SLO, incidents).
- `examples/stint/app-screen.html` — stint 07 detail view for the `paper` workspace. Sidebar of 7 recent stints with status dots, 3 KPI tiles (completion / days left / at risk), a 14-day burn-down chart with actual vs dashed ideal line, 8-row activity feed, and a fake cursor hovering on the selected stint. Project-tracker vocabulary (stints, tasks, cycles, carryover).

Both render in light + dark mode, use every required token from the checklist, and serve as patterns to copy for the next brand that adopts Phase 4. A third proof should exercise a *different* archetype (not `dashboard`) to keep the template honest — Halcyon with a `conversational` (reasoning-graph chat) archetype is the best next target because it tests both a new archetype and the `sculptural-field` backdrop in a product context.

### Step 8: Self-Validation
After generating the preview, validate it against the Design Model:
1. **Re-read `design-model.yaml`** and the CSS in `preview.html`
2. **Verify accent color** in YAML matches the hex used for interactive elements in preview CSS
3. **Verify font families** in YAML match what's loaded and used in preview
4. **Verify spacing values** are consistent between model and preview
5. **Compare each component** in the preview against its Tear-Down Sheet or Derived Design from Step 2

If anything doesn't match — fix it before showing to the user.

### Step 9: Offer Iteration
After writing, tell the user what was created and ask if they want adjustments. Common requests: "more contrast", "warmer tones", "different font", "more playful motion", "add a glow effect", "less padding."

**For iterations:** update `design-model.yaml` first, then regenerate only the affected files from the model. This keeps everything in sync.

### Step 10: Installation Reminder
After generating, tell the user:
> Restart Claude Code or start a new conversation for the skill to be detected. Activate it by saying "{skill-name} design" or "/{skill-name}-design".

---

## 3. QUALITY STANDARDS

These are non-negotiable. Every generated skill must meet all of them.

### Preview
- The `preview.html` must look like a real app dashboard, not a component library. Use real-looking content, proper hierarchy, proper density.

### Philosophy
- 2-4 sentences that capture the *attitude*, not just the aesthetics. "Subtract, don't add" is a philosophy. "Clean and modern" is not.
- Reference the design lineage — what real-world objects, brands, movements, or eras this draws from.
- Include the primary tension that gives the language its character.

### Design Principles
- 5-7 principles. Each: **Bold Title.** + one sentence.
- Every principle must be falsifiable — you can point at a screen and say "this violates principle 3."
- No platitudes. "User-friendly" is not a principle. "Type does the heavy lifting — hierarchy comes from scale and weight, never from color or icons" is.

### Craft Rules
- 5-6 rules in Section 2 of SKILL.md. Each is a *how-to-compose* instruction.
- Include: visual hierarchy layers, typography discipline (font budget per screen), spacing semantics, color strategy, composition approach.
- Use tables for layer/hierarchy definitions — they're scannable and unambiguous.
- Include the squint test or equivalent quick-validation method.

### Anti-Patterns
- 8-12 specific bans. Each starts with "No" and names the exact thing.
- Be precise: "No border-radius > 16px on cards" not "avoid large corners."
- Include both visual anti-patterns (gradients, shadows) and behavioral ones (toast popups, skeleton screens).
- Anti-patterns are what prevent the skill from producing generic output. They're the immune system.

### Colors
- Coherent palette. Every color must have a *role*, not just a hex code.
- Mentally verify contrast: text on background must exceed 4.5:1 for body, 3:1 for large text.
- Both dark and light mode values. Derive secondary mode from primary — don't just invert. Warm light mode needs warm dark mode.
- Include semantic colors: accent, success, warning, error.
- Token names follow this schema:

| Token | Role |
|-------|------|
| `--background` | Page/canvas background |
| `--surface-1` | Primary elevated surface (cards) |
| `--surface-2` | Secondary surface (nested, grouped) |
| `--surface-3` | Tertiary surface (inputs, wells) |
| `--border` | Subtle/decorative borders |
| `--border-visible` | Intentional borders |
| `--text-1` | Primary text (headings, body) |
| `--text-2` | Secondary text (descriptions, labels) |
| `--text-3` | Tertiary text (placeholders, timestamps) |
| `--text-4` | Disabled text |
| `--accent` | Primary interactive color |
| `--accent-subtle` | Tinted backgrounds for accent |
| `--success` | Positive states |
| `--warning` | Caution states |
| `--error` | Destructive/error states |

### Fonts
- Display, body, and mono roles. Always three.
- **Google Fonts only** for web skills. Name the exact font and weights needed.
- **System fonts** for SwiftUI skills (SF Pro, SF Rounded, SF Mono, New York).
- Include fallback stacks. Always.
- State *why* the font fits the aesthetic. "Geometric sans with humanist details" tells Claude how to judge edge cases.
- **`mono_for_data`:** Decide whether data values (timestamps, prices, counts, speeds, IPs) use the mono font or the body font. This is RELATIVE to the brand:
  - Dev-tool / terminal brands (Linear, Nothing) → `true` — mono for all data
  - Consumer / editorial brands (Apple, mymind, Notion) → `false` — body font for data, mono only for code
  - Check the brand's actual site to decide. Add `mono_for_data: true/false` to the YAML.

### Type Scale
- 8 sizes minimum: display, h1, h2, h3, body, body-sm, caption, label.
- Every size gets: px value, line-height ratio, letter-spacing, weight, and use case.
- Follow this structure:

| Token | Size | Line Height | Letter Spacing | Weight | Use |
|-------|------|-------------|----------------|--------|-----|
| `--display` | Npx | ratio | em | weight | use case |
| `--h1` | Npx | ratio | em | weight | use case |
| `--h2` | Npx | ratio | em | weight | use case |
| `--h3` | Npx | ratio | em | weight | use case |
| `--body` | Npx | ratio | em | weight | use case |
| `--body-sm` | Npx | ratio | em | weight | use case |
| `--caption` | Npx | ratio | em | weight | use case |
| `--label` | Npx | ratio | em | weight | use case |

### Spacing
- 8px base grid. Always.
- Scale: `2xs` (2px), `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `2xl` (48px), `3xl` (64px), `4xl` (96px).
- Every value gets a semantic use case.

### Radii
- Define separately for: cards, buttons, inputs, tags/pills.
- State the corner philosophy — sharp (0-4px), soft (8-16px), round (20-24px), pill (999px).
- If the platform is iOS, note `RoundedRectangle(cornerRadius:, style: .continuous)`.

### Elevation
- Pick one primary elevation strategy:

| Strategy | When | How |
|----------|------|-----|
| **Flat** | Industrial, minimal | No shadows. Borders or background change only. |
| **Subtle** | Warm, friendly | Small y-offset (1-3px), diffused blur, low opacity. |
| **Glow** | Dark-mode-forward, premium | Colored shadow matching accent, no y-offset. |
| **Material** | Glass, depth-heavy | Blur + transparency + saturation. |

### Motion
- Pick one motion personality:

| Personality | Easing | Duration | Behavior |
|-------------|--------|----------|----------|
| **Mechanical** | `ease-out` or linear | 120-200ms | Precise, no overshoot. Click, not swoosh. |
| **Smooth** | `ease-in-out` | 200-350ms | Calm transitions, no bounce. |
| **Playful** | Spring (damping 0.7-0.8) | 300-500ms | Overshoot + settle. Things feel alive. |
| **None** | Instant | 0-100ms | Content appears, no choreography. |

### Platform Mapping
- Generate REAL, valid, copy-paste-ready code. Not pseudocode.
- CSS: `:root` block with all custom properties. Include dark mode via `[data-theme="dark"]` or `@media (prefers-color-scheme: dark)`.
- SwiftUI: `Color` extension with static properties, `Font` extension with static methods, relevant `ViewModifier`s.
- Tailwind: `extend` block for `tailwind.config.js` mapping all tokens.

### Components
- Every component gets: when to use, variants, exact token mapping per variant.
- Minimum components: cards, buttons (4 variants), inputs, lists, navigation, tags/chips, overlays (modal + bottom sheet), state patterns (empty, loading, error, disabled).
- Use tables for variant specifications — scannable, unambiguous.

---

## 4. FRONTMATTER RULES

Every generated SKILL.md must start with this frontmatter structure:

```yaml
---
name: {skill-name}-design
description: "This skill should be used when the user explicitly says '{Skill Name} style', '{Skill Name} design', '/{skill-name}-design', or directly asks to use/apply the {Skill Name} design system. NEVER trigger automatically for generic UI or design tasks."
version: 1.0.0
allowed-tools: [Read, Write, Edit, Glob, Grep]
---
```

The description must include the explicit trigger phrases. Never allow automatic triggering for generic design tasks.

---

## 5. TONE & VOICE

Write generated skills like a senior designer briefing a junior one. Authoritative, specific, opinionated.

**Good:** "Shadows are banned. Depth comes from border + background change. If something needs to float, use a 1px border at 8% opacity, not a shadow."

**Bad:** "Consider using subtle borders instead of heavy shadows for a cleaner look."

**Good:** "Max 2 chromatic colors per screen. The neutral canvas makes each color arrival feel special."

**Bad:** "Try to limit the number of colors for a more cohesive design."

The difference: good instructions are falsifiable, specific, and leave no room for interpretation. Bad instructions are suggestions that Claude will interpret inconsistently.

---

## 6. ITERATION

After generating, the user may request adjustments. Common patterns:

| Request | What to change | What NOT to change |
|---------|---------------|-------------------|
| "More contrast" | Text/background delta, accent saturation | Font choices, spacing, components |
| "Warmer" / "Cooler" | Gray palette undertones, accent hue | Structure, typography, motion |
| "Different font" | Font stack + type scale adjustments | Colors, spacing, components |
| "More playful" | Motion personality, corner radii, elevation | Color palette, anti-patterns |
| "More minimal" | Reduce components, increase spacing, flatten elevation | Core philosophy |
| "Add glow/glass" | Elevation strategy, surface treatment | Typography, spacing |

Apply changes to the specific files and sections affected. Never regenerate from scratch unless the user asks for a completely different direction.

---

## 7. REFERENCE TEMPLATES

Use these as the exact structure for generated files. Fill every placeholder, delete every comment block.

- `references/skill-template.md` — SKILL.md structure (philosophy, craft rules, anti-patterns, workflow)
- `references/tokens-template.md` — Token definitions (fonts, type scale, colors, spacing, radii, elevation, motion)
- `references/components-template.md` — Component specifications (cards, buttons, inputs, lists, nav, overlays, states)
- `references/platform-mapping-template.md` — Platform code (CSS custom properties, SwiftUI extensions, Tailwind config)
