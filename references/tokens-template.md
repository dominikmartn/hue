# {{skill-name}} — Tokens

## 0. PRIMITIVES

Raw scales derived from the brand. These are the building blocks — semantic tokens reference them.

### Color Ramps

**Neutral** ({{neutral-temperature}})

| Step | Hex | Use |
|------|-----|-----|
| 50 | `{{neutral-50}}` | Lightest background |
| 100 | `{{neutral-100}}` | Light surfaces |
| 200 | `{{neutral-200}}` | Borders, dividers (light) |
| 300 | `{{neutral-300}}` | Strong borders (light) |
| 400 | `{{neutral-400}}` | Placeholder text |
| 500 | `{{neutral-500}}` | Muted text |
| 600 | `{{neutral-600}}` | Secondary text |
| 700 | `{{neutral-700}}` | Strong borders (dark) |
| 800 | `{{neutral-800}}` | Dark surfaces |
| 900 | `{{neutral-900}}` | Darkest surface |
| 950 | `{{neutral-950}}` | Near-black background |

**Brand** ({{brand-hue-name}})

| Step | Hex |
|------|-----|
| 50 | `{{brand-50}}` |
| 100 | `{{brand-100}}` |
| 200 | `{{brand-200}}` |
| 300 | `{{brand-300}}` |
| 400 | `{{brand-400}}` |
| 500 | `{{brand-500}}` — primary accent |
| 600 | `{{brand-600}}` |
| 700 | `{{brand-700}}` |
| 800 | `{{brand-800}}` |
| 900 | `{{brand-900}}` |
| 950 | `{{brand-950}}` |

**Status Colors**

| Color | 50 (bg tint) | 500 (foreground) | 900 (dark tint) |
|-------|-------------|-----------------|-----------------|
| Red | `{{red-50}}` | `{{red-500}}` | `{{red-900}}` |
| Green | `{{green-50}}` | `{{green-500}}` | `{{green-900}}` |
| Amber | `{{amber-50}}` | `{{amber-500}}` | `{{amber-900}}` |

### Spacing Primitives

`{{spacing-primitives-list}}`

### Radii Primitives

`{{radii-primitives-list}}`

---

## 1. TYPOGRAPHY

### Font Stack

| Role | Font | Fallback | Weight | Use |
|------|------|----------|--------|-----|
| **Display** | `"{{font-display-name}}"` | `{{font-display-fallback}}` | {{font-display-weight}} | Screen titles, hero numbers |
| **Body / UI** | `"{{font-body-name}}"` | `{{font-body-fallback}}` | {{font-body-weight}} | Body text, descriptions, UI labels |
| **Mono / Code** | `"{{font-mono-name}}"` | `{{font-mono-fallback}}` | {{font-mono-weight}} | Code snippets, technical identifiers |

### Mono Font Rules

**`mono_for_code`: {{mono-for-code}}** · **`mono_for_metrics`: {{mono-for-metrics}}**

{{mono-for-code-rationale}}

- **`mono_for_code: true`:** Use the mono font for code blocks, file paths, shell commands, and inline technical tokens (variable names, CSS properties, API endpoints). Almost every brand with a mono font sets this to `true`.
- **`mono_for_code: false`:** Even code snippets use the body font. Rare — only the most editorial/typographic brands.
- **`mono_for_metrics: true`:** Use the mono font for pricing, counts, timestamps, percentages, ID strings, IP addresses, speeds, file sizes. Common for dev-tool and terminal-aesthetic brands (Linear, Nothing) where data is part of the visual identity.
- **`mono_for_metrics: false`:** Use the body font for all numeric/data values. Mono is reserved for code only. Common for consumer and editorial brands (Apple, mymind, Notion). Many brands use mono for code but NOT for metrics — e.g. Cursor uses mono inside IDE screenshots, but `$20` pricing stays in the sans.

{{font-rationale}}

### Type Scale

| Token | Size | Line Height | Letter Spacing | Weight | Use |
|-------|------|-------------|----------------|--------|-----|
| `--display` | {{type-scale-display-size}} | {{type-scale-display-line-height}} | {{type-scale-display-letter-spacing}} | {{type-scale-display-weight}} | Hero numbers, screen titles |
| `--heading` | {{type-scale-heading-size}} | {{type-scale-heading-line-height}} | {{type-scale-heading-letter-spacing}} | {{type-scale-heading-weight}} | Section headings |
| `--subheading` | {{type-scale-subheading-size}} | {{type-scale-subheading-line-height}} | {{type-scale-subheading-letter-spacing}} | {{type-scale-subheading-weight}} | Subsection titles, card titles |
| `--body` | {{type-scale-body-size}} | {{type-scale-body-line-height}} | {{type-scale-body-letter-spacing}} | {{type-scale-body-weight}} | Body text, descriptions |
| `--body-sm` | {{type-scale-body-sm-size}} | {{type-scale-body-sm-line-height}} | {{type-scale-body-sm-letter-spacing}} | {{type-scale-body-sm-weight}} | Secondary text, notes |
| `--caption` | {{type-scale-caption-size}} | {{type-scale-caption-line-height}} | {{type-scale-caption-letter-spacing}} | {{type-scale-caption-weight}} | Timestamps, footnotes |
| `--label` | {{type-scale-label-size}} | {{type-scale-label-line-height}} | {{type-scale-label-letter-spacing}} | {{type-scale-label-weight}} | Micro-labels, metadata |

### Typographic Rules

{{typographic-rules}}

---

## 2. COLOR SYSTEM (Semantic Tokens)

Semantic tokens reference the primitives above. Components use semantic tokens, never primitives directly.

### Primary Mode ({{primary-mode-name}})

| Token | Primitive | Hex | Role |
|-------|-----------|-----|------|
| `--background` | `{neutral.{{bg-light-step}}}` | `{{color-background}}` | Page background |
| `--bg` | — | `var(--background)` | Shorthand alias for `--background` |
| `--surface1` | `{neutral.{{s1-light-step}}}` | `{{color-surface1}}` | Cards, elevated containers |
| `--surface2` | `{neutral.{{s2-light-step}}}` | `{{color-surface2}}` | Secondary cards, grouped backgrounds |
| `--surface3` | `{neutral.{{s3-light-step}}}` | `{{color-surface3}}` | Tertiary surfaces, inset areas |
| `--border` | `{neutral.{{border-light-step}}}` | `{{color-border}}` | Subtle dividers, card edges |
| `--border-visible` | `{neutral.{{border-visible-light-step}}}` | `{{color-border-visible}}` | Stronger borders — inputs, active controls |
| `--text1` | `{neutral.{{t1-light-step}}}` | `{{color-text1}}` | Primary text — headings, body |
| `--text2` | `{neutral.{{t2-light-step}}}` | `{{color-text2}}` | Secondary text — descriptions, labels |
| `--text3` | `{neutral.{{t3-light-step}}}` | `{{color-text3}}` | Tertiary text — placeholders, timestamps |
| `--text4` | `{neutral.{{t4-light-step}}}` | `{{color-text4}}` | Disabled text, ghost elements |
| `--accent` | `{brand.{{accent-light-step}}}` | `{{color-accent}}` | Primary accent — interactive elements, CTAs |
| `--accent-subtle` | `{brand.{{accent-subtle-light-step}}}` | `{{color-accent-subtle}}` | Tinted backgrounds for accent |
| `--success` | `{green.500}` | `{{color-success}}` | Confirmed, completed, positive |
| `--warning` | `{amber.500}` | `{{color-warning}}` | Caution, pending, approaching limit |
| `--error` | `{red.500}` | `{{color-error}}` | Destructive, overdue, critical |

### Secondary Mode ({{secondary-mode-name}})

| Token | Primitive | Hex | Role |
|-------|-----------|-----|------|
| `--background` | `{neutral.{{bg-dark-step}}}` | `{{color-background-alt}}` | Page background |
| `--surface1` | `{neutral.{{s1-dark-step}}}` | `{{color-surface1-alt}}` | Cards, elevated containers |
| `--surface2` | `{neutral.{{s2-dark-step}}}` | `{{color-surface2-alt}}` | Secondary cards, grouped backgrounds |
| `--surface3` | `{neutral.{{s3-dark-step}}}` | `{{color-surface3-alt}}` | Tertiary surfaces, inset areas |
| `--border` | `{neutral.{{border-dark-step}}}` | `{{color-border-alt}}` | Subtle dividers, card edges |
| `--border-visible` | `{neutral.{{border-visible-dark-step}}}` | `{{color-border-visible-alt}}` | Stronger borders — inputs, active controls |
| `--text1` | `{neutral.{{t1-dark-step}}}` | `{{color-text1-alt}}` | Primary text |
| `--text2` | `{neutral.{{t2-dark-step}}}` | `{{color-text2-alt}}` | Secondary text |
| `--text3` | `{neutral.{{t3-dark-step}}}` | `{{color-text3-alt}}` | Tertiary text |
| `--text4` | `{neutral.{{t4-dark-step}}}` | `{{color-text4-alt}}` | Disabled text |
| `--accent` | `{brand.{{accent-dark-step}}}` | `{{color-accent-alt}}` | Primary accent |
| `--accent-subtle` | `{brand.{{accent-subtle-dark-step}}}` | `{{color-accent-subtle-alt}}` | Tinted backgrounds for accent |
| `--success` | `{green.500}` | `{{color-success-alt}}` | Positive states |
| `--warning` | `{{color-warning-alt}}` | Caution states |
| `--error` | `{{color-error-alt}}` | Negative states |

### Accent & Status Tints

| Token | Primary | Secondary | Usage |
|-------|---------|-----------|-------|
| `--accent-subtle` | `{{color-accent-subtle}}` | `{{color-accent-subtle-alt}}` | Tinted backgrounds for accent elements |
| `--success-bg` | `{{color-success-bg}}` | `{{color-success-bg-alt}}` | Success tinted backgrounds |
| `--warning-bg` | `{{color-warning-bg}}` | `{{color-warning-bg-alt}}` | Warning tinted backgrounds |
| `--error-bg` | `{{color-error-bg}}` | `{{color-error-bg-alt}}` | Error tinted backgrounds |

### Color Usage Rules

{{color-usage-rules}}

---

## 3. SPACING

### Scale ({{spacing-base}}px base)

| Token | Value | Use |
|-------|-------|-----|
| `--space-2xs` | {{spacing-2xs}}px | Optical adjustments only |
| `--space-xs` | {{spacing-xs}}px | Icon-to-label gaps, tight padding |
| `--space-sm` | {{spacing-sm}}px | Component internal padding |
| `--space-md` | {{spacing-md}}px | Standard padding, element gaps |
| `--space-lg` | {{spacing-lg}}px | Card padding, section item gaps |
| `--space-xl` | {{spacing-xl}}px | Section spacing, generous padding |
| `--space-2xl` | {{spacing-2xl}}px | Major section breaks |
| `--space-3xl` | {{spacing-3xl}}px | Screen section divisions |
| `--space-4xl` | {{spacing-4xl}}px | Hero breathing room |

---

## 4. BORDERS & RADII

### Radii Scale (Semantic → Primitive)

| Token | Value | Primitive | Use |
|-------|-------|-----------|-----|
| `--radius-element` | {{radii-element}}px | `{radii[{{radii-element-idx}}]}` | Small controls, checkboxes, icons |
| `--radius-control` | {{radii-control}}px | `{radii[{{radii-control-idx}}]}` | Buttons, inputs, toggles |
| `--radius-component` | {{radii-component}}px | `{radii[{{radii-component-idx}}]}` | Cards, panels, list items |
| `--radius-container` | {{radii-container}}px | `{radii[{{radii-container-idx}}]}` | Modals, sheets, popovers |
| `--radius-pill` | {{radii-pill}}px | `{radii[{{radii-pill-idx}}]}` | Pills, tags (if brand uses them) |

### Border Treatment

| Element | Border |
|---------|--------|
| Cards / Surfaces | {{border-cards}} |
| Buttons | {{border-buttons}} |
| Inputs | {{border-inputs}} |
| Tags / Chips | {{border-tags}} |
| Modals / Sheets | {{border-modals}} |

{{corner-style-note}}

---

## 5. ELEVATION & SHADOWS

| Level | Light Mode | Dark Mode | Use |
|-------|-----------|----------|-----|
| **0** | None | None | Flat, inline elements |
| **1** | `{{shadow-1-light}}` | `{{shadow-1-dark}}` | Standard cards, containers |
| **2** | `{{shadow-2-light}}` | `{{shadow-2-dark}}` | Floating cards, menus, popovers |
| **3** | `{{shadow-3-light}}` | `{{shadow-3-dark}}` | Modals, sheets, dialogs |

{{elevation-notes}}

---

## 6. MOTION & INTERACTION

### Personality

{{motion-personality}}

### Timing

| Type | Duration | Easing | Use |
|------|----------|--------|-----|
| **Micro** | {{motion-duration-fast}} | `{{motion-easing-fast}}` | Button press, toggle, color change |
| **Standard** | {{motion-duration-medium}} | `{{motion-easing-medium}}` | Card expand, content transitions |
| **Emphasis** | {{motion-duration-slow}} | `{{motion-easing-slow}}` | Sheet present, navigation, page transitions |

### Interaction States

{{interaction-states}}

---

## 7. ICONOGRAPHY

> **⚠ Fallback disclosure.** The icons rendered in the generated preview come from a freely-licensed kit selected as the closest match to the brand's actual icons. They are **not** the brand's real glyphs — the brand's icon set is proprietary and not redistributed with this skill. If you need the authentic look, swap these out with licensed assets.

### Observed style (the brand's actual icons)

| Attribute | Value |
|-----------|-------|
| Description | {{icon-observed-description}} |
| Stroke weight | {{icon-observed-stroke}} |
| Corner treatment | {{icon-observed-corner}} |
| Fill style | {{icon-observed-fill}} |
| Form language | {{icon-observed-form}} |
| Visual density | {{icon-observed-density}} |

### Fallback kit (what the preview actually renders)

- **Kit:** {{icon-fallback-name}}
- **Weight / variant:** {{icon-fallback-weight}}
- **Match score:** {{icon-fallback-score}}
- **Why this kit:** {{icon-fallback-reasoning}}
- **CDN:** `{{icon-fallback-cdn}}`
- **Usage:** `{{icon-fallback-usage}}`

### Sizes

| Context | Size |
|---------|------|
| Inline with body text | {{icon-size-inline}} |
| Buttons | {{icon-size-button}} |
| Navigation | {{icon-size-nav}} |

### Color rule

{{icon-color-rule}}

### Don't

- {{icon-never}}
- Never claim these are the brand's real icons — they are a best-match fallback.
