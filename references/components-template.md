# {{skill-name}} — Components

## 1. BUTTONS

### Variants

| Variant | Background | Text | Border | Radius | Height |
|---------|-----------|------|--------|--------|--------|
| Primary | `{{btn-primary-bg}}` | `{{btn-primary-text}}` | {{btn-primary-border}} | {{radii-buttons}}px | {{btn-height}}px |
| Secondary | `{{btn-secondary-bg}}` | `{{btn-secondary-text}}` | {{btn-secondary-border}} | {{radii-buttons}}px | {{btn-height}}px |
| Ghost | transparent | `{{btn-ghost-text}}` | none | {{radii-buttons}}px | {{btn-ghost-height}}px |
| Destructive | `{{btn-destructive-bg}}` | `{{btn-destructive-text}}` | {{btn-destructive-border}} | {{radii-buttons}}px | {{btn-height}}px |

### Specs

| Property | Value |
|----------|-------|
| Height (large) | {{btn-height}}px |
| Height (small) | {{btn-height-small}}px |
| Padding (large) | {{btn-padding-v}}px {{btn-padding-h}}px |
| Padding (small) | {{btn-padding-v-small}}px {{btn-padding-h-small}}px |
| Font | `{{font-body-name}}` {{btn-font-weight}}, {{btn-font-size}} |
| Min touch target | 44px |

### States

| State | Change |
|-------|--------|
| **Hover** | {{btn-state-hover}} |
| **Active / Pressed** | {{btn-state-active}} |
| **Disabled** | {{btn-state-disabled}} |
| **Focus** | {{btn-state-focus}} |

---

## 2. CARDS / SURFACES

### Standard Card
- Background: `--surface1`
- Border: {{border-cards}}
- Radius: {{radii-cards}}px {{corner-style-note-short}}
- Padding: {{card-padding}}px
- Shadow: {{shadow-1-light}} (light) / {{shadow-1-dark}} (dark)

### Featured Card
- Background: `--surface1` + {{card-featured-treatment}}
- Radius: {{radii-cards-featured}}px
- Shadow: {{shadow-2-light}} (light) / {{shadow-2-dark}} (dark)

### Compact Card
- Radius: {{radii-cards-compact}}px
- Padding: {{card-padding-compact}}px
- Same background and border as standard

### Content Layout
- Title: `--subheading`, `--text1`
- Description: `--body-sm`, `--text2`
- Metadata: `--caption`, `--text3`
- Internal spacing between elements: `--space-sm`
- Press state: {{card-press-state}}

---

## 3. INPUTS

### Text Field

| Property | Value |
|----------|-------|
| Height | {{input-height}}px |
| Background | `{{input-bg}}` |
| Border (default) | {{input-border-default}} |
| Border (focus) | {{input-border-focus}} |
| Border (error) | {{input-border-error}} |
| Radius | {{radii-inputs}}px |
| Padding | {{input-padding-v}}px {{input-padding-h}}px |
| Font | `{{font-body-name}}`, `--body` |
| Placeholder color | `--text3` |

### Label
- Position: above field, {{input-label-gap}}px gap
- Font: `{{font-body-name}}`, `--body-sm`, `--text2`

### States

| State | Treatment |
|-------|-----------|
| **Default** | {{input-border-default}} |
| **Focus** | {{input-border-focus}}. {{input-focus-extra}} |
| **Error** | {{input-border-error}}. Error text below in `--error`, `--caption` |
| **Disabled** | Opacity 0.4, no interaction |

### Multiline
- Same styling as text field, min-height 100px, auto-grows

---

## 4. LISTS / DATA ROWS

### Standard Row

| Property | Value |
|----------|-------|
| Min height | {{list-row-height}}px |
| Padding | {{list-row-padding-v}}px {{list-row-padding-h}}px |
| Divider | {{list-divider}} |
| Label font | `{{font-body-name}}`, `--body`, `--text1` |
| Value font | {{list-value-font}} |
| Accessory | {{list-accessory}} |

### Interaction States

| State | Treatment |
|-------|-----------|
| **Default** | Transparent background |
| **Pressed** | {{list-row-pressed}} |
| **Selected** | {{list-row-selected}} |

### Data Row (Label + Value)
- Left: label in `--text2`
- Right: value in `--text1`, {{list-data-value-font}}
- Unit/suffix: `--caption`, `--text3`, adjacent to value

---

## 5. NAVIGATION / TAB BAR

### Tab Bar

| Property | Value |
|----------|-------|
| Height | {{nav-tab-height}}px + safe area |
| Background | `{{nav-tab-bg}}` |
| Border | {{nav-tab-border}} |
| Font | `{{font-body-name}}`, `--caption` |

### Tab States

| State | Treatment |
|-------|-----------|
| **Active** | {{nav-tab-active}} |
| **Inactive** | {{nav-tab-inactive}} |
| **Hover** | {{nav-tab-hover}} |

### Navigation Bar
- Title: `--heading`, `--text1`
- Back button: {{nav-back-button}}
- Background: {{nav-bar-bg}}

---

## 6. TAGS / CHIPS

| Property | Value |
|----------|-------|
| Height | {{tag-height}}px |
| Padding | {{tag-padding-v}}px {{tag-padding-h}}px |
| Radius | {{radii-tags}}px |
| Font | `{{font-body-name}}`, `--caption`, {{tag-font-weight}} |
| Background | `{{tag-bg}}` |
| Text color | `{{tag-text}}` |
| Border | {{border-tags}} |

### Selected State
- Background: `--accent-bg`
- Text: `--accent`
- Border: {{tag-selected-border}}

### Status Variants
Use status colors for semantic tags: `--success-bg` + `--success`, `--warning-bg` + `--warning`, `--error-bg` + `--error`.

---

## 7. OVERLAYS

### Modal / Dialog

| Property | Value |
|----------|-------|
| Background | `--surface1` |
| Radius | {{radii-modals}}px |
| Shadow | {{shadow-3-light}} (light) / {{shadow-3-dark}} (dark) |
| Backdrop | {{overlay-backdrop}} |
| Max width | {{overlay-modal-max-width}}px |
| Padding | {{overlay-modal-padding}}px |
| Close button | {{overlay-close-button}} |

### Bottom Sheet

| Property | Value |
|----------|-------|
| Background | `--surface1` |
| Top radius | {{radii-modals}}px |
| Handle | {{sheet-handle}} |
| Backdrop | {{overlay-backdrop}} |
| Dismiss | drag-to-dismiss |

### Dropdown / Popover

| Property | Value |
|----------|-------|
| Background | `--surface1` |
| Radius | {{radii-dropdown}}px |
| Shadow | {{shadow-2-light}} (light) / {{shadow-2-dark}} (dark) |
| Border | {{border-dropdown}} |
| Item height | {{dropdown-item-height}}px |
| Selected indicator | {{dropdown-selected}} |

---

## 8. STATE PATTERNS

### Empty State
- Layout: centered, generous top padding ({{empty-state-top-padding}}px+)
- Icon/Illustration: {{empty-state-icon}}
- Headline: `--subheading`, `--text2`
- Description: `--body`, `--text3`, max 2 lines
- CTA: primary button, {{empty-state-cta-gap}}px below description

### Loading
- Inline: {{loading-inline}}
- Full screen: {{loading-fullscreen}}
- Content appearance: {{loading-content-transition}}

### Error
- Inline (field): `--error` text in `--caption` below element
- Screen-level: {{error-screen-level}}
- Tone: {{error-tone}}

### Disabled
- Opacity 0.4, no interaction, maintains layout
- Borders fade to `--border` default
- No hover/focus states
