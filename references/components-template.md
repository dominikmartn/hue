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
- Background: `--accent-subtle`
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

---

## 9. TOGGLE / SWITCH

### Specs

| Property | Value |
|----------|-------|
| Track width | {{toggle-track-width}}px |
| Track height | {{toggle-track-height}}px |
| Track radius | {{toggle-track-radius}}px |
| Thumb size | {{toggle-thumb-size}}px |
| Thumb radius | {{toggle-thumb-radius}}px |
| Thumb offset (from edge) | {{toggle-thumb-offset}}px |
| Label position | {{toggle-label-position}} |
| Label gap | {{toggle-label-gap}}px |
| Label font | `{{font-body-name}}`, `--body`, `--text1` |

### States

| State | Track Background | Thumb |
|-------|-----------------|-------|
| **Off (default)** | `{{toggle-track-off-bg}}` | `{{toggle-thumb-off}}` |
| **On** | `{{toggle-track-on-bg}}` | `{{toggle-thumb-on}}` |
| **Hover** | {{toggle-state-hover}} | — |
| **Disabled** | Opacity 0.4, no interaction | — |
| **Focus** | {{toggle-state-focus}} | — |

---

## 10. CHECKBOX

### Specs

| Property | Value |
|----------|-------|
| Size | {{checkbox-size}}px |
| Border (unchecked) | {{checkbox-border}} |
| Radius | {{checkbox-radius}}px |
| Checked fill | `{{checkbox-checked-bg}}` |
| Checkmark color | `{{checkbox-checkmark-color}}` |
| Checkmark stroke | {{checkbox-checkmark-stroke}}px |
| Label gap | {{checkbox-label-gap}}px |
| Label font | `{{font-body-name}}`, `--body`, `--text1` |

### Variants

| Variant | Treatment |
|---------|-----------|
| Unchecked | {{checkbox-border}}, transparent fill |
| Checked | `{{checkbox-checked-bg}}` fill, `{{checkbox-checkmark-color}}` checkmark |
| Indeterminate | `{{checkbox-checked-bg}}` fill, horizontal dash in `{{checkbox-checkmark-color}}` |

### States

| State | Treatment |
|-------|-----------|
| **Default** | {{checkbox-border}} |
| **Hover** | {{checkbox-state-hover}} |
| **Active** | {{checkbox-state-active}} |
| **Disabled** | Opacity 0.4, no interaction |
| **Focus** | {{checkbox-state-focus}} |

---

## 11. RADIO

### Specs

| Property | Value |
|----------|-------|
| Size | {{radio-size}}px |
| Border | {{radio-border}} |
| Radius | 50% (circle) |
| Selected indicator | {{radio-indicator-size}}px dot in `{{radio-indicator-color}}` |
| Selected border | {{radio-selected-border}} |
| Label gap | {{radio-label-gap}}px |
| Label font | `{{font-body-name}}`, `--body`, `--text1` |

### States

| State | Treatment |
|-------|-----------|
| **Default** | {{radio-border}}, transparent fill |
| **Selected** | {{radio-selected-border}}, inner dot `{{radio-indicator-color}}` |
| **Hover** | {{radio-state-hover}} |
| **Disabled** | Opacity 0.4, no interaction |
| **Focus** | {{radio-state-focus}} |

---

## 12. SLIDER / RANGE

### Specs

| Property | Value |
|----------|-------|
| Track height | {{slider-track-height}}px |
| Track radius | {{slider-track-radius}}px |
| Track background (unfilled) | `{{slider-track-bg}}` |
| Track background (filled) | `{{slider-track-filled-bg}}` |
| Thumb width | {{slider-thumb-width}}px |
| Thumb height | {{slider-thumb-height}}px |
| Thumb radius | {{slider-thumb-radius}}px |
| Thumb background | `{{slider-thumb-bg}}` |
| Thumb border | {{slider-thumb-border}} |
| Step marks | {{slider-step-marks}} |
| Value label | {{slider-value-label}} |

### States

| State | Treatment |
|-------|-----------|
| **Default** | As specced |
| **Hover** | {{slider-state-hover}} |
| **Active / Dragging** | {{slider-state-active}} |
| **Disabled** | Opacity 0.4, no interaction |
| **Focus** | {{slider-state-focus}} |

---

## 13. SELECT / DROPDOWN TRIGGER

### Specs

| Property | Value |
|----------|-------|
| Height | {{input-height}}px (inherits from Inputs) |
| Background | `{{input-bg}}` |
| Border | {{input-border-default}} |
| Radius | {{radii-inputs}}px |
| Padding | {{input-padding-v}}px {{input-padding-h}}px |
| Font | `{{font-body-name}}`, `--body`, `--text1` |
| Placeholder color | `--text3` |
| Chevron icon | {{select-chevron-icon}} |
| Chevron color | `--text3` |
| Chevron size | {{select-chevron-size}}px |

### States

| State | Treatment |
|-------|-----------|
| **Default** | {{input-border-default}}, chevron pointing down |
| **Hover** | {{select-state-hover}} |
| **Open** | {{input-border-focus}}, chevron rotated 180deg. Dropdown menu per Overlays > Dropdown |
| **Disabled** | Opacity 0.4, no interaction |
| **Focus** | {{input-border-focus}}. {{input-focus-extra}} |
| **Error** | {{input-border-error}} |

---

## 14. TEXTAREA

Inherits all styling from **Inputs > Text Field** with these overrides:

| Property | Value |
|----------|-------|
| Min height | {{textarea-min-height}}px |
| Resize behavior | {{textarea-resize}} |
| Line height | {{textarea-line-height}} |
| Padding | {{textarea-padding}}px |
| Character count position | {{textarea-char-count-position}} |
| Character count font | `{{font-body-name}}`, `--caption`, `--text3` |

### States

Same as Inputs (default, focus, error, disabled).

---

## 15. DATA TABLE

### Header Row

| Property | Value |
|----------|-------|
| Height | {{table-header-height}}px |
| Background | `{{table-header-bg}}` |
| Font | `{{font-body-name}}`, `--caption`, {{table-header-font-weight}}, `--text2` |
| Text transform | {{table-header-text-transform}} |
| Cell padding | {{table-cell-padding-v}}px {{table-cell-padding-h}}px |
| Sort indicator | {{table-sort-indicator}} |
| Border bottom | {{table-header-border}} |

### Body Row

| Property | Value |
|----------|-------|
| Height | {{table-row-height}}px |
| Font | `{{font-body-name}}`, `--body`, `--text1` |
| Cell padding | {{table-cell-padding-v}}px {{table-cell-padding-h}}px |
| Row divider | {{table-row-divider}} |
| Column alignment | {{table-column-alignment}} |

### Row States

| State | Treatment |
|-------|-----------|
| **Default** | Transparent background |
| **Hover** | {{table-row-hover}} |
| **Selected** | {{table-row-selected}} |
| **Striped (optional)** | {{table-row-striped}} |

---

## 16. TABS

### Specs

| Property | Value |
|----------|-------|
| Bar height | {{tabs-bar-height}}px |
| Tab padding | {{tabs-tab-padding-v}}px {{tabs-tab-padding-h}}px |
| Font | `{{font-body-name}}`, `--body-sm`, {{tabs-font-weight}} |
| Gap between tabs | {{tabs-gap}}px |
| Active indicator | {{tabs-active-indicator}} |
| Bar border | {{tabs-bar-border}} |
| Transition | {{tabs-transition}} |

### States

| State | Treatment |
|-------|-----------|
| **Active** | {{tabs-active-text}}, {{tabs-active-indicator}} |
| **Inactive** | {{tabs-inactive-text}} |
| **Hover** | {{tabs-hover}} |
| **Disabled** | Opacity 0.4, no interaction |
| **Focus** | {{tabs-focus}} |

---

## 17. BREADCRUMB

### Specs

| Property | Value |
|----------|-------|
| Font | `{{font-body-name}}`, `--body-sm` |
| Link color | `--text2` |
| Link hover | {{breadcrumb-link-hover}} |
| Separator glyph | {{breadcrumb-separator}} |
| Separator color | `--text3` |
| Separator spacing | {{breadcrumb-separator-spacing}}px each side |
| Current page | {{breadcrumb-current-page}} |

---

## 18. AVATAR

### Sizes

| Size | Dimensions | Font (initials) |
|------|-----------|-----------------|
| Small | {{avatar-size-sm}}px | `--caption` |
| Medium | {{avatar-size-md}}px | `--body-sm` |
| Large | {{avatar-size-lg}}px | `--body` |

### Specs

| Property | Value |
|----------|-------|
| Border radius | {{avatar-radius}} |
| Fallback background | `{{avatar-fallback-bg}}` |
| Fallback text color | `{{avatar-fallback-text}}` |
| Fallback font weight | {{avatar-fallback-font-weight}} |
| Border | {{avatar-border}} |
| Status dot size | {{avatar-status-dot-size}}px |
| Status dot position | {{avatar-status-dot-position}} |
| Status dot border | {{avatar-status-dot-border}} |

### Status Dot Colors

| Status | Color |
|--------|-------|
| Online | `--success` |
| Away | `--warning` |
| Offline | `--text3` |
| Busy | `--error` |

---

## 19. BADGE / STATUS DOT

### Specs

| Property | Value |
|----------|-------|
| Height | {{badge-height}}px |
| Min width | {{badge-min-width}}px |
| Padding | {{badge-padding-v}}px {{badge-padding-h}}px |
| Radius | {{badge-radius}}px |
| Font | `{{font-body-name}}`, `--caption`, {{badge-font-weight}} |
| Position relative to parent | {{badge-position}} |

### Semantic Variants

| Variant | Background | Text |
|---------|-----------|------|
| Neutral | `{{badge-neutral-bg}}` | `{{badge-neutral-text}}` |
| Success | `--success-bg` | `--success` |
| Warning | `--warning-bg` | `--warning` |
| Error | `--error-bg` | `--error` |
| Info | `{{badge-info-bg}}` | `{{badge-info-text}}` |

### Status Dot (icon-only)
- Size: {{badge-dot-size}}px
- Same semantic color mapping, no text
- Border: {{badge-dot-border}}

---

## 20. TOOLTIP

### Specs

| Property | Value |
|----------|-------|
| Background | `{{tooltip-bg}}` |
| Text color | `{{tooltip-text}}` |
| Font | `{{font-body-name}}`, `--caption` |
| Radius | {{tooltip-radius}}px |
| Padding | {{tooltip-padding-v}}px {{tooltip-padding-h}}px |
| Max width | {{tooltip-max-width}}px |
| Arrow | {{tooltip-arrow}} |
| Delay (show) | {{tooltip-delay-show}}ms |
| Delay (hide) | {{tooltip-delay-hide}}ms |
| Placement | {{tooltip-placement}} |
| Shadow | {{tooltip-shadow}} |

---

## 21. ALERT / BANNER

### Specs

| Property | Value |
|----------|-------|
| Radius | {{alert-radius}}px |
| Padding | {{alert-padding}}px |
| Icon size | {{alert-icon-size}}px |
| Icon gap | {{alert-icon-gap}}px |
| Font (title) | `{{font-body-name}}`, `--body-sm`, {{alert-title-font-weight}} |
| Font (description) | `{{font-body-name}}`, `--body-sm`, `--text2` |
| Dismiss button | {{alert-dismiss}} |
| Layout | {{alert-layout}} |

### Semantic Variants

| Variant | Background | Border | Icon color | Text color |
|---------|-----------|--------|-----------|------------|
| Info | `{{alert-info-bg}}` | {{alert-info-border}} | `{{alert-info-icon}}` | `--text1` |
| Success | `--success-bg` | {{alert-success-border}} | `--success` | `--text1` |
| Warning | `--warning-bg` | {{alert-warning-border}} | `--warning` | `--text1` |
| Error | `--error-bg` | {{alert-error-border}} | `--error` | `--text1` |

---

## 22. TOAST / NOTIFICATION

### Specs

| Property | Value |
|----------|-------|
| Position | {{toast-position}} |
| Max width | {{toast-max-width}}px |
| Background | `{{toast-bg}}` |
| Text color | `{{toast-text}}` |
| Radius | {{toast-radius}}px |
| Padding | {{toast-padding}}px |
| Shadow | {{toast-shadow}} |
| Font | `{{font-body-name}}`, `--body-sm` |
| Auto-dismiss | {{toast-auto-dismiss}}ms |
| Animation | {{toast-animation}} |
| Dismiss button | {{toast-dismiss}} |
| Max stack | {{toast-max-stack}} |

### Semantic Variants

| Variant | Accent / Icon color |
|---------|-------------------|
| Neutral | `--text2` |
| Success | `--success` |
| Warning | `--warning` |
| Error | `--error` |

---

## 23. PROGRESS BAR

### Specs

| Property | Value |
|----------|-------|
| Height | {{progress-height}}px |
| Track radius | {{progress-radius}}px |
| Track background | `{{progress-track-bg}}` |
| Fill color | `{{progress-fill-color}}` |
| Fill radius | {{progress-radius}}px |
| Label position | {{progress-label-position}} |
| Label font | `{{font-body-name}}`, `--caption`, `--text2` |
| Indeterminate animation | {{progress-indeterminate-animation}} |

### Semantic Fill Colors

| Variant | Fill |
|---------|------|
| Default | `--accent` |
| Success | `--success` |
| Warning | `--warning` |
| Error | `--error` |

---

## 24. SPINNER

### Specs

| Property | Value |
|----------|-------|
| Size (small) | {{spinner-size-sm}}px |
| Size (medium) | {{spinner-size-md}}px |
| Size (large) | {{spinner-size-lg}}px |
| Stroke width | {{spinner-stroke-width}}px |
| Color | `{{spinner-color}}` |
| Track color | `{{spinner-track-color}}` |
| Animation | {{spinner-animation}} |

---

## 25. SKELETON

### Specs

| Property | Value |
|----------|-------|
| Background | `{{skeleton-bg}}` |
| Shimmer color | `{{skeleton-shimmer}}` |
| Radius | Match target component radius |
| Animation | {{skeleton-animation}} |
| Animation duration | {{skeleton-animation-duration}}ms |

### Common Shapes

| Shape | Dimensions | Radius |
|-------|-----------|--------|
| Text line | 100% x {{skeleton-text-height}}px | {{skeleton-text-radius}}px |
| Heading | 60% x {{skeleton-heading-height}}px | {{skeleton-text-radius}}px |
| Circle (avatar) | {{avatar-size-md}}px | 50% |
| Rectangle (card) | 100% x {{skeleton-card-height}}px | {{radii-cards}}px |
| Thumbnail | {{skeleton-thumb-size}}px | {{skeleton-thumb-radius}}px |

---

## 26. ACCORDION

### Specs

| Property | Value |
|----------|-------|
| Header height | {{accordion-header-height}}px |
| Header padding | {{accordion-header-padding-v}}px {{accordion-header-padding-h}}px |
| Header font | `{{font-body-name}}`, `--body`, {{accordion-header-font-weight}}, `--text1` |
| Chevron size | {{accordion-chevron-size}}px |
| Chevron color | `--text3` |
| Chevron rotation (open) | 180deg |
| Content padding | {{accordion-content-padding}}px |
| Content font | `{{font-body-name}}`, `--body`, `--text2` |
| Divider | {{accordion-divider}} |
| Background | {{accordion-bg}} |
| Radius | {{accordion-radius}}px |

### States

| State | Treatment |
|-------|-----------|
| **Closed** | Chevron pointing down, content hidden |
| **Open** | Chevron rotated 180deg, content visible |
| **Hover** | {{accordion-state-hover}} |
| **Disabled** | Opacity 0.4, no interaction |
| **Focus** | {{accordion-state-focus}} |
