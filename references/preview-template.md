# Preview Template

After generating the 4 markdown files for a design skill, ALWAYS generate a `preview.html` file and open it in the browser.

## What to generate

A standalone HTML file (`preview.html`) in the skill folder. Self-contained, no external dependencies except Google Fonts and icon libraries. All CSS inline via `<style>` tag.

**All token values (colors, fonts, spacing, radii, etc.) must come from `design-model.yaml`.** Re-read the YAML before writing CSS to ensure consistency.

## Format: Bento Grid Dashboard

The preview is a **Bento Grid** — a grid of widget cards. NOT a full app layout (no sidebar navigation, no content areas, no app chrome, no full-page document layouts). Think: a personal dashboard with ~10 data widgets.

### Grid structure
- CSS Grid, 4 columns, ~4 rows
- **Max-width 1120px, centered** (`max-width: 1120px; margin: 0 auto;`). Never fullscreen — widgets look empty and content floats when stretched across wide monitors.
- Body padding: 24-32px, `min-height: 100vh` (NOT `height: 100vh` with `overflow: hidden`)
- **Use explicit row heights**, not `repeat(4, 1fr)`. Example: `grid-template-rows: 160px 220px 180px auto;`. Calculate: card padding (48px top+bottom) + label (16px + 16px margin) + content must fit. A row with 3 stacked buttons needs ~220px. A row with 2 rows of pills needs ~180px.
- Gap between cards matches the design language's density

### Widget types (~10 total)
Choose widgets that feel authentic to the brand's domain:

**Data widgets:** Clock/time, metrics (big number + label), progress (gauge/bar/ring), sparkline chart, segmented bar
**List widgets:** Activity feed, recent items, status list, task list
**Control widgets:** Quick actions, toggles/settings, shortcuts
**Status widgets:** Tags/badges, connection status, deployment status, battery/health

Widget selection is RELATIVE to the brand:
- A music brand → now playing, playlist, audio levels
- A dev tool brand → sprint progress, build status, deployments
- A productivity brand → tasks, calendar, focus time
- A system brand → battery, storage, network, settings

**For content-rich brands** (Tesla, Nike, luxury — where the identity is in photography/restraint, not UI components):
The differentiating levers shift from components to typography, spacing, and surface. But HOW they manifest is still relative to the brand — there are no universal rules here either. Analyze:
- **Typography** becomes the primary visual tool. Study the brand's exact type scale, weight usage, and letter-spacing — then reproduce it faithfully. The specifics vary per brand.
- **Spacing** carries more identity weight. Match the brand's exact density — whether that's generous or tight.
- **Surface temperature** matters more when there's less color. Warm blacks ≠ cool blacks ≠ pure blacks.
- **Accent restraint** — check how sparingly the brand uses color. Some content brands have zero chromatic accent. Reproduce that restraint.
- **Domain-specific content** — "396 mi range" feels more authentic than "12 tasks". The more specific the widget content, the less generic the result.
- **Widget count/spanning** — consider whether fewer, bigger widgets match the brand's sense of space.

### Required: Token Key Widget
One widget in the grid must be a **Token Key** — a visual reference card that shows:
- A row of color swatches for the core palette (background, surface, text, accent, success, warning, error)
- A mini type scale rendering ("Aa Display", "Aa Body", "Aa Mono")
- The spacing unit visualization (small squares at the base spacing size)

This makes the preview self-documenting. When someone sees it, they immediately understand the token system.

### Required: Dark/Light Mode Toggle
The preview.html must include both light and dark mode CSS, and a **floating bottom bar** to switch between them. This bar is independent of the grid — it floats above the UI.

- Define both modes using `[data-theme="light"]` and `[data-theme="dark"]` selectors on `<html>`
- Set the brand's primary mode as default

**Floating Bar implementation (copy this exactly):**

```html
<!-- After the grid closing </div>, before </body> -->
<div class="floating-bar">
  <button class="mode-btn" data-mode="light" aria-label="Light mode">
    <i class="ph ph-sun"></i> Light
  </button>
  <button class="mode-btn" data-mode="dark" aria-label="Dark mode">
    <i class="ph ph-moon"></i> Dark
  </button>
</div>
```

```css
.floating-bar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  background: var(--surface1);
  border: 1.5px solid var(--border);
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12);
  transition: background 500ms ease, border-color 500ms ease;
}
.mode-btn {
  height: 32px;
  border-radius: 999px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  font-family: var(--font-body, sans-serif);
  font-size: 12px;
  font-weight: 500;
  color: var(--text3);
  transition: background 200ms ease, color 200ms ease;
  outline: none;
}
.mode-btn:hover { color: var(--text1); }
.mode-btn.active {
  background: var(--surface3);
  color: var(--text1);
}
.mode-btn i { font-size: 14px; }
```

```javascript
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.documentElement.dataset.theme = btn.dataset.mode;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
// Set initial active state
document.querySelector(`.mode-btn[data-mode="${document.documentElement.dataset.theme}"]`)?.classList.add('active');
```

Both modes must use values from the `design-model.yaml` — the light/dark tokens defined there. This lets the user instantly validate both modes.

## The Relativity Principle

**Everything about the preview is relative to the brand.** There are NO universal hard rules for visual design. Every decision — typography, spacing, density, effects, icons, content amount — must be justified by asking: "Does the ACTUAL brand do this? How much of it?"

### Typography
- **Label font:** Use whatever the brand uses. Terminal-brand → mono is fine. Clean-brand → sans is fine. Don't copy patterns between brands.
- **Text-transform:** Match the brand. Some use uppercase labels, some don't.
- **Weights:** Match the brand's actual weight distribution.
- **Data values font:** Check `mono_for_code` and `mono_for_metrics` in the YAML. Use mono font for data values (prices, counts, timestamps, percentages, IDs) only when `mono_for_metrics` is `true`. Code snippets, file paths, and shell commands use mono when `mono_for_code` is `true`. Many brands set `mono_for_code: true` but `mono_for_metrics: false` — their pricing stays in the sans while code blocks use mono. This is one of the most visible brand-differentiating decisions in the preview.

### Craft & Visual Effects
The brand's signature craft must be present and PROPORTIONAL:
- **Glows, gradients, blur, textures, borders, shadows** — apply what the brand actually uses, in the amount the brand uses it.
- A brand known for polish → lots of craft details.
- A brand known for restraint → almost none.
- The amount matters as much as the type.

### Spacing, Density & Content
- **How many items in a list?** As many as look good at the brand's density level. Dense brands can have 8 items. Airy brands might need only 3. Whatever fills the card beautifully without overflow.
- **Card padding:** Symmetric. The exact amount depends on the brand's spaciousness.
- **List item alignment:** Items should align with their label — no accidental indentation.

### Surface Treatment
Relative to the brand:
- **Borders, shadows, card backgrounds** — apply what the brand does. No universal rules.

### Color Temperature
Match the EXACT temperature:
- Warm brands → warm-tinted everything
- Cool brands → neutral or cool
- Neutral brands → pure neutral

## Icons

Use a real icon library that matches the brand's aesthetic. Include via CDN `<link>` tag. Choose from:

| Library | CDN | Best for |
|---------|-----|----------|
| Lucide | `https://unpkg.com/lucide-static/font/lucide.css` | Clean, modern brands (Linear, Notion, Perplexity) |
| Phosphor | `https://unpkg.com/@phosphor-icons/web@2/src/regular/style.css` | Friendly, rounded brands (mymind, Claude) |
| SF Symbols-style (via Lucide) | Same as Lucide | System/Apple-like brands |
| Tabler Icons | `https://unpkg.com/@tabler/icons-webfont/dist/tabler-icons.min.css` | Versatile, works everywhere |

Pick the library that fits the brand's icon style. Use `<i class="icon-name"></i>` elements. If a brand uses emoji as icons (like Notion), use emoji instead of an icon library.

Fallback: If icon libraries cause rendering issues, use colored circles with single letters (like iOS Settings icons) or emoji.

## Technical Gotchas (CSS Bugs to Avoid)

These are technical CSS issues, not design rules:
- `flex: 1` on elements without `min-height: 0` or `min-width: 0` can cause overflow in grid cells
- `overflow: hidden` on `.card` prevents content bleed
- `min-width: 0` and `min-height: 0` on grid children prevent implicit sizing issues
- Stacked bar chart segments need explicit heights, not just percentages of a flex container
- `conic-gradient` is more reliable than SVG circles for ring gauges, but SVG is fine if you test it
- **Bar charts:** Never use `height: N%` on a flex child — percentages don't resolve in flex containers. Instead use `position: absolute; bottom: 0; height: N%` inside a `position: relative` parent with explicit dimensions. Give bar tracks a fixed width (24-32px), not `flex: 1` of a wide column.
- **Grid row sizing:** `repeat(4, 1fr)` distributes height evenly but causes clipping when content varies. Use explicit heights per row based on tallest widget content. Last row can be `auto`.

## Quality Bar

The preview must look like a Dribbble-quality dashboard designed by the brand's actual design team.

### Self-check before writing
1. Is this a Bento Grid, NOT an app layout?
2. Does every widget have enough space — nothing cramped, nothing overflowing?
3. Are all grid cells filled — no empty gaps?
4. Does every design choice come from the brand, not from another brand?
5. Is the brand's signature craft present and proportional?
6. Would the brand's design team approve?

## Clickability — disable all anchors

**This is a mockup, not a real page.** If the Bento Grid contains any `<a>` elements (nav links, widget item links, etc.), they must all be click-disabled. Hover states remain intact.

```js
document.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', e => e.preventDefault());
});
```

Add this script alongside the existing mode-toggle script at the end of the body.

## After generating

1. Write `preview.html` to the skill folder
2. Run: `open preview.html` (macOS) to show it in the browser
3. Tell the user: "Preview opened in your browser. The design skill is ready."
