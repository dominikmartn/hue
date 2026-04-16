# Component Library Template

The second visual output of every design skill (after the Bento Grid preview). Where the Bento Grid shows the design language *in use*, the Component Library shows it *dismantled* — every component on its own canvas with its exact token values spelled out beside it.

## What to generate

A standalone HTML file (`component-library.html`) in the skill folder. Self-contained, no external dependencies except Google Fonts and the chosen icon kit's CDN. All CSS inline via `<style>` tag. All token values must come from `design-model.yaml` — re-read the YAML before writing CSS to ensure consistency.

## Format: Sticky TOC + Canvas Sections

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────┐  ┌─────────────────────────────────────┐ │
│  │          │  │  ## Section name                    │ │
│  │  STICKY  │  │  one-line description               │ │
│  │   TOC    │  │                                     │ │
│  │          │  │  ┌─────────────────────────────────┐│ │
│  │ Section1 │  │  │                                 ││ │
│  │ Section2 │  │  │     CANVAS (live components)    ││ │
│  │ Section3 │  │  │                                 ││ │
│  │ ...      │  │  └─────────────────────────────────┘│ │
│  │          │  │                                     │ │
│  │          │  │  Spec table                         │ │
│  │          │  │  ┌─────────────────────────────────┐│ │
│  │          │  │  │ Token       │ Value             ││ │
│  │          │  │  │ ────────────┼─────────────────  ││ │
│  │          │  │  │ background  │ {surface1} #...   ││ │
│  │          │  │  └─────────────────────────────────┘│ │
│  │          │  └─────────────────────────────────────┘ │
│  │          │                                          │
│  │          │  ## Next section...                      │
│  └──────────┘                                          │
└─────────────────────────────────────────────────────────┘
```

### Layout rules

- **Two-column layout:** sticky TOC on the left (~240px), main scroll area on the right (flex: 1).
- **TOC structure:** Category headers (bold, uppercase, 11px) as tab switches + indented sub-links for deep-linking to components within the active tab.
- **Tab-panel navigation:** Each category is a `<section>` with `display: none` by default. Active category gets `display: block`. Clicking a category header switches tabs. Clicking a sub-link switches to that category's tab AND scrolls to the component.
- **Main area:** `overflow-y: auto`, padding 48px.
- **Components within a category:** Separated by `.cl-component-group` (margin-bottom 64px) with h3 header, one-line description, canvas, and spec table.
- **Never fullscreen** the main area. Max-width ~960px keeps spec tables readable.

### Sections to include

The component library is organized into 7 category tabs. Each category is a tab-panel (`display:none` by default, active category visible). Within each category, components are separated by `.cl-component-group` wrappers with `id` attributes for TOC deep-linking.

#### Foundations (6)

| # | Section | What's in the canvas | Spec table |
|---|---------|---------------------|------------|
| 1 | Colors | Primitive ramps + semantic grid | Token, Primitive, Hex, Role |
| 2 | Typography | Live type scale samples | Token, Font, Size, Weight, LH |
| 3 | Radii | Shapes at each radius | Token, Value, Use |
| 4 | Elevation | Cards at shadow levels 1-3 | Level, Value, Use |
| 5 | Spacing | Scale bars | Token, Value, Use |
| 6 | Iconography | 12 icons at 3 sizes | Kit, Weight, CDN |

#### Actions (5)

| # | Section | Variants | States |
|---|---------|----------|--------|
| 7 | Button | primary/secondary/ghost/destructive x sm/md/lg | default, hover, focus, active, disabled, loading |
| 8 | Icon Button | primary/secondary/ghost x sm/md/lg | default, hover, focus, disabled |
| 9 | Toggle Button | on/off | default, hover, focus, disabled |
| 10 | Segmented Control | 3-4 segments | default, selected, hover, disabled |
| 11 | Dropdown Menu | items, dividers, sub-menu | default, hover, focus, disabled, checked |

#### Inputs (9)

| # | Section | Variants | States |
|---|---------|----------|--------|
| 12 | Text Input | default, icon, clear | default, hover, focus, filled, disabled, readonly, error, success |
| 13 | Textarea | default | default, focus, disabled, error |
| 14 | Select | single | default, open, hover, focus, disabled, error |
| 15 | Checkbox | standalone, group | unchecked, checked, indeterminate, hover, focus, disabled |
| 16 | Radio Group | vertical | unselected, selected, hover, focus, disabled |
| 17 | Switch | with label | off, on, hover, focus, disabled-off, disabled-on |
| 18 | Slider | single, range | default, hover, active, focus, disabled |
| 19 | Date Picker | inline calendar | default, today, selected, range, disabled |
| 20 | Combobox | searchable | default, open, filtering, empty |

#### Data Display (6)

| # | Section | Variants | States |
|---|---------|----------|--------|
| 21 | Card | default, image, interactive | default, hover, focus, selected |
| 22 | Avatar | image, initials, icon x sm/md/lg | default, group |
| 23 | Badge | neutral/info/success/warning/error | stateless |
| 24 | Tag | neutral, colored, removable | default, hover, disabled |
| 25 | Data Table | sortable, selectable | default, hover, selected, sort-active |
| 26 | Skeleton | text, circle, card, row | loading (shimmer) |

#### Navigation (5)

| # | Section | Variants | States |
|---|---------|----------|--------|
| 27 | Tabs | underline, pill | active, inactive, hover, focus, disabled |
| 28 | Breadcrumb | with separator | default, hover, current |
| 29 | Pagination | numbered + prev/next | current, default, hover, disabled |
| 30 | Nav Menu | horizontal | active, default, hover, focus |
| 31 | Link | inline, standalone | default, hover, focus, active, visited |

#### Feedback (5)

| # | Section | Variants | States |
|---|---------|----------|--------|
| 32 | Alert | info/success/warning/error | default, dismissible |
| 33 | Toast | info/success/warning/error | visible, with action |
| 34 | Progress | determinate, indeterminate, ring | 0-100%, animated |
| 35 | Spinner | sm/md/lg | spinning |
| 36 | Empty State | icon + desc + action | -- |

#### Overlays (4)

| # | Section | Variants | States |
|---|---------|----------|--------|
| 37 | Modal | default, alert | open with backdrop |
| 38 | Popover | with arrow | open, positioned |
| 39 | Tooltip | top/right/bottom/left | visible |
| 40 | Accordion | single-expand | collapsed, expanded, hover, focus, disabled |

### Canvas rules

- **Canvas background:** `var(--surface1)` OR `var(--background)` — whichever contrasts best with the components inside. If a component IS a surface1 card, use a darker or lighter canvas.
- **Canvas padding:** `32-48px` depending on component size.
- **Canvas border-radius:** match the brand's component radius (`--radius-component`).
- **Canvas border:** `1px solid var(--border)` — subtle, just enough to delimit the work area.
- **Component spacing inside canvas:** use flex with generous gap — align variants in a row, states in a sub-row below, consistent across sections.
- **Labels:** tiny label text above each variant (e.g. "Default", "Hover", "Focused") in `var(--text3)` at label-size, uppercase, letter-spaced. Do not confuse this with Meadow's own `--label` token — this is meta-labeling for the spec itself.

### Spec table rules

- **Two or four columns max.** Keep them scannable.
- **Consistent column names:** `Property | Value` for component specs, `Token | Primitive | Hex | Role` for foundation tables.
- **Font:** monospace for the Value column when the brand's `mono_for_metrics` is `true` (hex codes, CSS values, and other technical identifiers are metrics-adjacent). When `mono_for_metrics` is `false`, use the body font but slightly smaller. Code snippets in spec tables always use mono when `mono_for_code` is `true`.
- **Border/background:** tables sit outside canvases, directly on the page background. No borders except a thin `--border` between rows.
- **Reference tokens by name, not just hex:** "`var(--accent)` `#FF5924`" is better than just `#FF5924` — shows the token path.

### State rendering

When a component has multiple interactive states, render them **side-by-side** in the same canvas, each with a label. Don't rely on hover to trigger state changes — the user needs to see all states at once.

**Pseudo-state classes.** Use regular CSS classes (`.is-hover`, `.is-active`, `.is-focused`, `.is-disabled`) that apply the visual of that state without needing interaction. Example:

```css
.button.is-hover {
  box-shadow: var(--shadow-accent-hover);
  /* same as real :hover but static */
}
```

### CSS pitfalls — avoid these in every generated library

**1. Button element reset.** Every `<button>` in the library (tabs, pagination, nav items, segmented controls, toggle buttons) MUST have `background: transparent; border: none;` in its base CSS class. Browsers apply a default white/gray background to `<button>` elements that breaks dark mode. Always reset.

**2. Never use `accent-subtle` for hover/highlight backgrounds.** `accent-subtle` maps to deep brand colors in dark mode (e.g. `#07162F`) and very light tints in light mode — the result looks broken in both cases for interactive states. Use neutral surface tokens instead:
- **Hover backgrounds**: `var(--surface1)` or `var(--surface2)`
- **Selected/active backgrounds**: `var(--surface2)`
- **Focus rings**: `box-shadow: 0 0 0 3px var(--accent-subtle)` is fine (subtle tint on a ring works)
- **Semantic coloring** (badges, alerts, tags): `accent-subtle` is fine here because these are semantic, not interactive

**3. Absolutely positioned icons need vertical centering.** Any icon/button inside an input field (`position: absolute`) needs `top: 50%; transform: translateY(-50%)` — not just `right: 12px`. Without it the icon drifts to the top of the input.

**4. Consistent border-radius on repeated elements.** DatePicker day cells, dropdown items, pagination buttons — ALL instances must have border-radius, not just the active/selected one. Apply radius to the base class, not conditionally.

**5. Slider thumb centering.** The track is typically 4px tall, the thumb 16px. The thumb needs `top: 50%; transform: translateY(-50%)` relative to the track. When adding hover/active transforms (scale), compose them: `transform: translateY(-50%) scale(1.15)`.

**6. Checkbox/radio checkmarks.** Never use Unicode characters (`\2713`, `\2014`) for check/dash marks — they render differently across fonts and look ugly. Use CSS-only shapes:
- Checkmark: `::after` with `width: 10px; height: 5px; border-left: 2px solid #fff; border-bottom: 2px solid #fff; transform: rotate(-45deg);`
- Dash (indeterminate): `::after` with `width: 8px; height: 2px; background: #fff;`

**7. CSS class names must match HTML.** Don't define `.card-img` in CSS and then use `.card-image` in HTML. Pick one name and use it everywhere. Validate by grepping: every class used in HTML must have a matching CSS rule.

**8. `div` inputs need flex centering.** When using `<div class="cl-input">` (for Select/Combobox mockups) instead of `<input>`, the div needs explicit `display: flex; align-items: center; height: 40px;` — unlike `<input>` which vertically centers text natively.

**9. Status label consistency — same label, same variant, ALWAYS.** When a data table, list, or repeated component shows multiple rows with the same status label (e.g., five rows all labeled `Active`), every one of those rows MUST use the same badge variant (`cl-badge--success`, etc.). Don't vary badge colors across rows of the same label for "visual interest" — it reads as a bug to anyone looking at the table. The rule applies across the entire library: if `Active` is `--success` in the Data Table example, it must also be `--success` in the Badge example, the Tag example, the User List example, and any other component that surfaces the same label.

✅ **Right** — five rows, label `Active` everywhere, all `cl-badge--success`:
```html
<tr><td>Sarah</td><td><span class="cl-badge cl-badge--success">Active</span></td><td>Engineer</td></tr>
<tr><td>Marcus</td><td><span class="cl-badge cl-badge--success">Active</span></td><td>Designer</td></tr>
<tr><td>Aiko</td><td><span class="cl-badge cl-badge--warning">Away</span></td><td>PM</td></tr>
<tr><td>David</td><td><span class="cl-badge cl-badge--neutral">Offline</span></td><td>Engineer</td></tr>
<tr><td>Elena</td><td><span class="cl-badge cl-badge--error">Suspended</span></td><td>Admin</td></tr>
```

❌ **Wrong** — same `Active` label, different colors per row:
```html
<tr><td>Sarah</td><td><span class="cl-badge cl-badge--success">Active</span></td><td>Admin</td></tr>
<tr><td>Marcus</td><td><span class="cl-badge cl-badge--info">Active</span></td><td>Editor</td></tr>
```

Vary STATUS labels (`Active`, `Away`, `Offline`, `Suspended`), not the colors of the same label. Don't use badge color to encode role, plan tier, or any other secondary dimension that already has its own column. One label, one color, library-wide.

**Same rule for tags, alerts, toasts, segmented controls, and any pill-shaped status indicator.** Lock the label-to-variant mapping in your head before writing the first row, then keep it consistent across every component group in the library.

**10. Pill / badge box discipline.** Status pills look broken when their padding is asymmetric. Three specific traps:

- **Vertical asymmetry from inherited `line-height`.** Body text typically has `line-height: 1.5`. A pill that inherits this gets a line-box ~16–18px tall around its 11–13px text, and the baseline sits in the bottom third of the box → visually the text floats up and "padding-bottom" looks bigger than padding-top. **Every pill MUST set `line-height: 1` explicitly.**
- **Right-heavy padding from icon slots that aren't there.** Don't write `padding: 4px 14px 4px 8px` to "leave room for an optional icon" if the icon isn't rendered. Use the symmetric pair `padding: 4px 10px` (or whatever values), then if you actually add an icon, give it its own `gap` via `display: inline-flex; gap: 4px`.
- **Trailing whitespace in text nodes.** `<span>Active </span>` (with a trailing space) renders the space as visible width on the right side of the pill. Always write `<span>Active</span>` with no trailing space.

✅ **Right** — symmetric padding, locked line-height, no trailing space:
```css
.cl-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;       /* shorthand pair, never 4-value */
  line-height: 1;          /* override body's 1.5 inheritance */
  font-size: 11px;
  border-radius: var(--r-pill);
  white-space: nowrap;
}
```
```html
<span class="cl-badge cl-badge--success">Active</span>
```

❌ **Wrong** — line-height inherits, padding asymmetric, trailing space:
```css
.cl-badge {
  padding: 4px 14px 6px 8px;  /* four values, both axes asymmetric */
  font-size: 11px;
  /* line-height not set → inherits body 1.5 → text floats up */
  border-radius: var(--r-pill);
}
```
```html
<span class="cl-badge cl-badge--success">Active </span>  <!-- trailing space -->
```

**Same rule for tags, chips, segmented control segments, toggle pills, and any rounded label.** When in doubt: `display: inline-flex; align-items: center; line-height: 1; padding: Vpx Hpx;` and verify by inspecting the rendered box in a browser — if the text is not visually centered both horizontally and vertically, one of the three traps is hitting.

### Status colors

Every component library needs status colors for alerts, badges, toasts, and input validation. Derive them from the brand's palette:

- **info**: use the brand's accent color
- **success**: derive a green that harmonizes with the accent (if brand has no green, use a muted green)
- **warning**: derive an amber/yellow
- **error**: derive a warm red

For each status, define two tokens: a foreground (text/icon color) and a background (tinted surface for alert/badge fills). Dark and light modes need separate values -- dark uses deeper/darker bg tints, light uses lighter/pastel bg tints.

### Dark/Light mode toggle

**Same floating bottom bar as the Bento Grid preview** — copy the pattern exactly for consistency. User can toggle modes and see how the entire component library adapts.

### Required script

One small `<script>` at the end for:
1. Dark/light mode toggle (same as preview.html)
2. Category tab switching (click category header → show that section, hide others)
3. Sub-item deep-linking (click sub-link → switch to category tab + scroll to component)
4. Scroll-tracking — active TOC link follows scroll position. Listen to `scroll` on `.cl-main`, iterate `.cl-component-group` elements, find the one closest to scroll top, highlight matching TOC link. Use `{ passive: true }` on the scroll listener.
5. Disable all non-TOC anchor clicks (mockup protection)

Keep the script under 80 lines. No frameworks, no dependencies.

## HTML Skeleton

```html
<!DOCTYPE html>
<html lang="en" data-theme="{{primary-mode}}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{skill-name}} — Component Library</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family={{google-fonts-query}}" rel="stylesheet">
  <link rel="stylesheet" href="{{icon-kit-cdn}}">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    /* ── Primitives ── */
    :root {
      /* neutral ramp, brand ramp, status, decorative — from design-model.yaml */
    }

    /* ── Light / Dark ── */
    [data-theme="light"] { /* semantic tokens → primitives */ }
    [data-theme="dark"]  { /* semantic tokens → primitives */ }

    /* ── Base ── */
    html, body {
      font-family: '{{body-font}}', sans-serif;
      background: var(--background);
      color: var(--text1);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Layout ── */
    .cl-shell {
      display: flex;
      min-height: 100vh;
    }
    .cl-toc {
      width: 240px;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      padding: 48px 24px;
      border-right: 1px solid var(--border);
    }
    .cl-toc h1 {
      font-family: '{{display-font}}', serif;
      font-size: 20px;
      margin-bottom: 24px;
    }
    .cl-toc nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .cl-toc-category {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text3);
      padding: 12px 0 4px;
      cursor: pointer;
      user-select: none;
    }
    .cl-toc-category.active { color: var(--text1); }
    .cl-toc-sub {
      font-size: 13px;
      color: var(--text2);
      text-decoration: none;
      padding: 3px 0 3px 12px;
      transition: color 200ms;
      display: block;
    }
    .cl-toc-sub:hover,
    .cl-toc-sub.active { color: var(--text1); }

    .cl-main {
      flex: 1;
      padding: 48px;
      max-width: 960px;
      overflow-y: auto;
    }

    /* ── Tab panels ── */
    .cl-category-panel { display: none; }
    .cl-category-panel.active { display: block; }

    .cl-component-group {
      margin-bottom: 64px;
      scroll-margin-top: 48px;
    }
    .cl-component-group h3 {
      font-family: '{{display-font}}', serif;
      font-size: 28px;
      margin-bottom: 6px;
    }
    .cl-component-group > p {
      font-size: 14px;
      color: var(--text2);
      margin-bottom: 24px;
    }

    .cl-canvas {
      background: var(--surface1);
      border: 1px solid var(--border);
      border-radius: var(--radius-component);
      padding: 48px;
      margin-bottom: 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      align-items: flex-start;
    }
    .cl-variant {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .cl-variant-label {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text3);
    }

    .cl-spec-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .cl-spec-table th,
    .cl-spec-table td {
      text-align: left;
      padding: 10px 0;
      border-bottom: 1px solid var(--border);
    }
    .cl-spec-table th {
      font-weight: 500;
      color: var(--text3);
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.08em;
    }
    .cl-spec-table td {
      color: var(--text2);
    }
    .cl-spec-table .col-value {
      color: var(--text1);
      font-family: ui-monospace, 'SF Mono', 'Menlo', monospace;
      font-size: 12px;
    }

    /* ── Floating bar (same as preview.html) ── */
    .floating-bar { /* ... */ }

    /* ── Component-specific styles go below ── */
  </style>
</head>
<body>
  <div class="cl-shell">
    <aside class="cl-toc">
      <h1>{{skill-name}}</h1>
      <nav>
        <!-- Category: Foundations -->
        <div class="cl-toc-category active" data-cat="foundations">Foundations</div>
        <a class="cl-toc-sub" href="#colors" data-cat="foundations">Colors</a>
        <a class="cl-toc-sub" href="#typography" data-cat="foundations">Typography</a>
        <a class="cl-toc-sub" href="#radii" data-cat="foundations">Radii</a>
        <a class="cl-toc-sub" href="#elevation" data-cat="foundations">Elevation</a>
        <a class="cl-toc-sub" href="#spacing" data-cat="foundations">Spacing</a>
        <a class="cl-toc-sub" href="#iconography" data-cat="foundations">Iconography</a>

        <!-- Category: Actions -->
        <div class="cl-toc-category" data-cat="actions">Actions</div>
        <a class="cl-toc-sub" href="#button" data-cat="actions">Button</a>
        <a class="cl-toc-sub" href="#icon-button" data-cat="actions">Icon Button</a>
        <a class="cl-toc-sub" href="#toggle-button" data-cat="actions">Toggle Button</a>
        <a class="cl-toc-sub" href="#segmented-control" data-cat="actions">Segmented Control</a>
        <a class="cl-toc-sub" href="#dropdown-menu" data-cat="actions">Dropdown Menu</a>

        <!-- Category: Inputs -->
        <div class="cl-toc-category" data-cat="inputs">Inputs</div>
        <a class="cl-toc-sub" href="#text-input" data-cat="inputs">Text Input</a>
        <a class="cl-toc-sub" href="#textarea" data-cat="inputs">Textarea</a>
        <a class="cl-toc-sub" href="#select" data-cat="inputs">Select</a>
        <a class="cl-toc-sub" href="#checkbox" data-cat="inputs">Checkbox</a>
        <a class="cl-toc-sub" href="#radio-group" data-cat="inputs">Radio Group</a>
        <a class="cl-toc-sub" href="#switch" data-cat="inputs">Switch</a>
        <a class="cl-toc-sub" href="#slider" data-cat="inputs">Slider</a>
        <a class="cl-toc-sub" href="#date-picker" data-cat="inputs">Date Picker</a>
        <a class="cl-toc-sub" href="#combobox" data-cat="inputs">Combobox</a>

        <!-- Category: Data Display -->
        <div class="cl-toc-category" data-cat="data-display">Data Display</div>
        <a class="cl-toc-sub" href="#card" data-cat="data-display">Card</a>
        <a class="cl-toc-sub" href="#avatar" data-cat="data-display">Avatar</a>
        <a class="cl-toc-sub" href="#badge" data-cat="data-display">Badge</a>
        <a class="cl-toc-sub" href="#tag" data-cat="data-display">Tag</a>
        <a class="cl-toc-sub" href="#data-table" data-cat="data-display">Data Table</a>
        <a class="cl-toc-sub" href="#skeleton" data-cat="data-display">Skeleton</a>

        <!-- Category: Navigation -->
        <div class="cl-toc-category" data-cat="navigation">Navigation</div>
        <a class="cl-toc-sub" href="#tabs" data-cat="navigation">Tabs</a>
        <a class="cl-toc-sub" href="#breadcrumb" data-cat="navigation">Breadcrumb</a>
        <a class="cl-toc-sub" href="#pagination" data-cat="navigation">Pagination</a>
        <a class="cl-toc-sub" href="#nav-menu" data-cat="navigation">Nav Menu</a>
        <a class="cl-toc-sub" href="#link" data-cat="navigation">Link</a>

        <!-- Category: Feedback -->
        <div class="cl-toc-category" data-cat="feedback">Feedback</div>
        <a class="cl-toc-sub" href="#alert" data-cat="feedback">Alert</a>
        <a class="cl-toc-sub" href="#toast" data-cat="feedback">Toast</a>
        <a class="cl-toc-sub" href="#progress" data-cat="feedback">Progress</a>
        <a class="cl-toc-sub" href="#spinner" data-cat="feedback">Spinner</a>
        <a class="cl-toc-sub" href="#empty-state" data-cat="feedback">Empty State</a>

        <!-- Category: Overlays -->
        <div class="cl-toc-category" data-cat="overlays">Overlays</div>
        <a class="cl-toc-sub" href="#modal" data-cat="overlays">Modal</a>
        <a class="cl-toc-sub" href="#popover" data-cat="overlays">Popover</a>
        <a class="cl-toc-sub" href="#tooltip" data-cat="overlays">Tooltip</a>
        <a class="cl-toc-sub" href="#accordion" data-cat="overlays">Accordion</a>
      </nav>
    </aside>

    <main class="cl-main">
      <!-- ── Foundations ── -->
      <section id="cat-foundations" class="cl-category-panel active">
        <div id="colors" class="cl-component-group">
          <h3>Colors</h3>
          <p>Primitive ramps and semantic token grid.</p>
          <div class="cl-canvas"><!-- swatches --></div>
          <table class="cl-spec-table"><!-- Token, Primitive, Hex, Role --></table>
        </div>
        <!-- ... typography, radii, elevation, spacing, iconography groups ... -->
      </section>

      <!-- ── Actions ── -->
      <section id="cat-actions" class="cl-category-panel">
        <div id="button" class="cl-component-group">
          <h3>Button</h3>
          <p>Primary, secondary, ghost, and destructive variants at three sizes.</p>
          <div class="cl-canvas"><!-- variants x states --></div>
          <table class="cl-spec-table"><!-- spec rows --></table>
        </div>
        <!-- ... icon-button, toggle-button, segmented-control, dropdown-menu groups ... -->
      </section>

      <!-- ── Inputs ── -->
      <section id="cat-inputs" class="cl-category-panel">
        <!-- text-input, textarea, select, checkbox, radio-group, switch, slider, date-picker, combobox -->
      </section>

      <!-- ── Data Display ── -->
      <section id="cat-data-display" class="cl-category-panel">
        <!-- card, avatar, badge, tag, data-table, skeleton -->
      </section>

      <!-- ── Navigation ── -->
      <section id="cat-navigation" class="cl-category-panel">
        <!-- tabs, breadcrumb, pagination, nav-menu, link -->
      </section>

      <!-- ── Feedback ── -->
      <section id="cat-feedback" class="cl-category-panel">
        <!-- alert, toast, progress, spinner, empty-state -->
      </section>

      <!-- ── Overlays ── -->
      <section id="cat-overlays" class="cl-category-panel">
        <!-- modal, popover, tooltip, accordion -->
      </section>
    </main>
  </div>

  <div class="floating-bar">
    <button class="mode-btn" data-mode="light"><i class="ph ph-sun"></i> Light</button>
    <button class="mode-btn" data-mode="dark"><i class="ph ph-moon"></i> Dark</button>
  </div>

  <script>
    // 1. Dark/light mode toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.documentElement.dataset.theme = btn.dataset.mode;
      });
    });

    // 2. Category tab switching
    function switchCategory(cat) {
      document.querySelectorAll('.cl-category-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.cl-toc-category').forEach(h => h.classList.remove('active'));
      const panel = document.getElementById('cat-' + cat);
      const header = document.querySelector(`.cl-toc-category[data-cat="${cat}"]`);
      if (panel) panel.classList.add('active');
      if (header) header.classList.add('active');
    }

    document.querySelectorAll('.cl-toc-category').forEach(h => {
      h.addEventListener('click', () => switchCategory(h.dataset.cat));
    });

    // 3. Sub-item deep-linking (switch tab + scroll)
    document.querySelectorAll('.cl-toc-sub').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        switchCategory(a.dataset.cat);
        const target = document.querySelector(a.getAttribute('href'));
        if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }));
      });
    });

    // 4. Scroll-tracking: highlight active TOC link on scroll
    const mainEl = document.querySelector('.cl-main');
    const groups = document.querySelectorAll('.cl-component-group');
    const tocSubs = document.querySelectorAll('.cl-toc-sub');
    mainEl.addEventListener('scroll', () => {
      let activeId = null;
      groups.forEach(g => { if (g.offsetTop - 80 <= mainEl.scrollTop) activeId = g.id; });
      if (activeId) tocSubs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + activeId));
    }, { passive: true });

    // 5. Disable all non-TOC anchor clicks (mockup protection)
    document.querySelectorAll('a').forEach(a => {
      if (a.closest('.cl-toc')) return;
      a.addEventListener('click', e => e.preventDefault());
    });
  </script>
</body>
</html>
```

## Round-cap requirement

Every stroke-based element in the Component Library (progress rings, progress bars, dashed borders, icon arcs) **must** use `stroke-linecap="round"` or the equivalent (rounded edges on CSS bars, half-circles at ends). Never use flat/butt caps unless the brand explicitly mandates them (rare — only the most clinical/industrial brands). For warm, humanist, or editorial brands, flat caps read as a bug.

## Clickability — disable non-TOC anchors

**This is a mockup, not a real page.** All `<a>` elements must be click-disabled EXCEPT the TOC anchors, which need to scroll to their section targets. Hover states remain intact.

```js
document.querySelectorAll('a').forEach(a => {
  if (a.closest('.cl-toc')) return;  // TOC keeps in-page scrolling
  a.addEventListener('click', e => e.preventDefault());
});
```

## Validation before showing

Before calling the Component Library complete, re-read `design-model.yaml` and check every section against it:

- [ ] Every semantic token referenced in the library exists in the YAML
- [ ] All hex values in the spec tables match the YAML
- [ ] Button radius matches `radii.control`, card radius matches `radii.component`, pill matches `radii.pill`
- [ ] Shadows match observed values
- [ ] Typography sizes and weights match the type scale exactly
- [ ] Icon kit matches `iconography.fallback_kit.name`
- [ ] Dark mode values are present and derived coherently
- [ ] No hardcoded hex values anywhere — all values trace to `var(--…)` tokens
