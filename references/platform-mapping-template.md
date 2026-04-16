# {{skill-name}} — Platform Mapping

## 1. HTML / CSS / WEB

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family={{google-fonts-url-params}}&display=swap" rel="stylesheet">
```

### CSS Custom Properties — Primary Mode

```css
:root {
  /* Colors */
  --background: {{color-background}};
  --bg: var(--background);
  --surface1: {{color-surface1}};
  --surface2: {{color-surface2}};
  --surface3: {{color-surface3}};
  --border: {{color-border}};
  --border-visible: {{color-border-visible}};
  --text1: {{color-text1}};
  --text2: {{color-text2}};
  --text3: {{color-text3}};
  --text4: {{color-text4}};
  --accent: {{color-accent}};
  --accent-subtle: {{color-accent-subtle}};
  --success: {{color-success}};
  --success-bg: {{color-success-bg}};
  --warning: {{color-warning}};
  --warning-bg: {{color-warning-bg}};
  --error: {{color-error}};
  --error-bg: {{color-error-bg}};

  /* Fonts */
  --font-display: "{{font-display-name}}", {{font-display-fallback}};
  --font-body: "{{font-body-name}}", {{font-body-fallback}};
  --font-mono: "{{font-mono-name}}", {{font-mono-fallback}};

  /* Type Scale */
  --text-display: {{type-scale-display-size}};
  --text-heading: {{type-scale-heading-size}};
  --text-subheading: {{type-scale-subheading-size}};
  --text-body: {{type-scale-body-size}};
  --text-body-sm: {{type-scale-body-sm-size}};
  --text-caption: {{type-scale-caption-size}};
  --text-label: {{type-scale-label-size}};

  /* Spacing */
  --space-2xs: {{spacing-2xs}}px;
  --space-xs: {{spacing-xs}}px;
  --space-sm: {{spacing-sm}}px;
  --space-md: {{spacing-md}}px;
  --space-lg: {{spacing-lg}}px;
  --space-xl: {{spacing-xl}}px;
  --space-2xl: {{spacing-2xl}}px;
  --space-3xl: {{spacing-3xl}}px;
  --space-4xl: {{spacing-4xl}}px;

  /* Radii */
  --radius-cards: {{radii-cards}}px;
  --radius-buttons: {{radii-buttons}}px;
  --radius-buttons-sm: {{radii-buttons-small}}px;
  --radius-inputs: {{radii-inputs}}px;
  --radius-tags: {{radii-tags}}px;
  --radius-modals: {{radii-modals}}px;

  /* Motion */
  --ease-fast: {{motion-easing-fast}};
  --ease-medium: {{motion-easing-medium}};
  --ease-slow: {{motion-easing-slow}};
  --duration-fast: {{motion-duration-fast}};
  --duration-medium: {{motion-duration-medium}};
  --duration-slow: {{motion-duration-slow}};

  /* Shadows */
  --shadow-1: {{shadow-1-light}};
  --shadow-2: {{shadow-2-light}};
  --shadow-3: {{shadow-3-light}};
}
```

### Secondary Mode

```css
@media (prefers-color-scheme: {{secondary-mode-media-query}}) {
  :root {
    --background: {{color-background-alt}};
    --bg: var(--background);
    --surface1: {{color-surface1-alt}};
    --surface2: {{color-surface2-alt}};
    --surface3: {{color-surface3-alt}};
    --border: {{color-border-alt}};
    --border-visible: {{color-border-visible-alt}};
    --text1: {{color-text1-alt}};
    --text2: {{color-text2-alt}};
    --text3: {{color-text3-alt}};
    --text4: {{color-text4-alt}};
    --accent: {{color-accent-alt}};
    --accent-subtle: {{color-accent-subtle-alt}};
    --success: {{color-success-alt}};
    --success-bg: {{color-success-bg-alt}};
    --warning: {{color-warning-alt}};
    --warning-bg: {{color-warning-bg-alt}};
    --error: {{color-error-alt}};
    --error-bg: {{color-error-bg-alt}};
    --shadow-1: {{shadow-1-dark}};
    --shadow-2: {{shadow-2-dark}};
    --shadow-3: {{shadow-3-dark}};
  }
}

/* Class-based toggle alternative */
.{{secondary-mode-class}} {
  --background: {{color-background-alt}};
  --bg: var(--background);
  --surface1: {{color-surface1-alt}};
  --surface2: {{color-surface2-alt}};
  --surface3: {{color-surface3-alt}};
  --border: {{color-border-alt}};
  --border-visible: {{color-border-visible-alt}};
  --text1: {{color-text1-alt}};
  --text2: {{color-text2-alt}};
  --text3: {{color-text3-alt}};
  --text4: {{color-text4-alt}};
  --accent: {{color-accent-alt}};
  --accent-subtle: {{color-accent-subtle-alt}};
  --success: {{color-success-alt}};
  --success-bg: {{color-success-bg-alt}};
  --warning: {{color-warning-alt}};
  --warning-bg: {{color-warning-bg-alt}};
  --error: {{color-error-alt}};
  --error-bg: {{color-error-bg-alt}};
  --shadow-1: {{shadow-1-dark}};
  --shadow-2: {{shadow-2-dark}};
  --shadow-3: {{shadow-3-dark}};
}
```

---

## 2. SWIFTUI / iOS

### Font Registration

{{swiftui-font-registration-note}}

### Color Extension

```swift
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6: (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default: (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

extension Color {
    // Primary mode
    static let {{prefix}}Background = Color(hex: "{{color-background-hex}}")
    static let {{prefix}}Surface1 = Color(hex: "{{color-surface1-hex}}")
    static let {{prefix}}Surface2 = Color(hex: "{{color-surface2-hex}}")
    static let {{prefix}}Surface3 = Color(hex: "{{color-surface3-hex}}")
    static let {{prefix}}Border = Color(hex: "{{color-border-hex}}")
    static let {{prefix}}BorderVisible = Color(hex: "{{color-border-visible-hex}}")
    static let {{prefix}}Text1 = Color(hex: "{{color-text1-hex}}")
    static let {{prefix}}Text2 = Color(hex: "{{color-text2-hex}}")
    static let {{prefix}}Text3 = Color(hex: "{{color-text3-hex}}")
    static let {{prefix}}Text4 = Color(hex: "{{color-text4-hex}}")
    static let {{prefix}}Accent = Color(hex: "{{color-accent-hex}}")
    static let {{prefix}}AccentSubtle = Color(hex: "{{color-accent-subtle-hex}}")
    static let {{prefix}}Success = Color(hex: "{{color-success-hex}}")
    static let {{prefix}}Warning = Color(hex: "{{color-warning-hex}}")
    static let {{prefix}}Error = Color(hex: "{{color-error-hex}}")
}
```

For automatic dark/light switching, use Asset Catalog (`Colors.xcassets`) with "Any, Dark" appearances instead of hardcoded hex values. The hex extension above is for prototyping or single-mode use.

### Font Extension

```swift
extension Font {
    static func {{prefix}}Display(_ size: CGFloat, weight: Font.Weight = .{{font-display-default-swift-weight}}) -> Font {
        {{swiftui-font-display-initializer}}
    }
    static func {{prefix}}Body(_ size: CGFloat, weight: Font.Weight = .{{font-body-default-swift-weight}}) -> Font {
        {{swiftui-font-body-initializer}}
    }
    static func {{prefix}}Mono(_ size: CGFloat, weight: Font.Weight = .{{font-mono-default-swift-weight}}) -> Font {
        {{swiftui-font-mono-initializer}}
    }

    static let {{prefix}}DisplayLarge = {{prefix}}Display({{type-scale-display-size-raw}}, weight: .{{type-scale-display-swift-weight}})
    static let {{prefix}}Heading = {{prefix}}Display({{type-scale-heading-size-raw}}, weight: .{{type-scale-heading-swift-weight}})
    static let {{prefix}}Subheading = {{prefix}}Body({{type-scale-subheading-size-raw}}, weight: .{{type-scale-subheading-swift-weight}})
    static let {{prefix}}BodyText = {{prefix}}Body({{type-scale-body-size-raw}})
    static let {{prefix}}BodySmall = {{prefix}}Body({{type-scale-body-sm-size-raw}})
    static let {{prefix}}Caption = {{prefix}}Body({{type-scale-caption-size-raw}})
    static let {{prefix}}Label = {{prefix}}Body({{type-scale-label-size-raw}}, weight: .medium)
    static let {{prefix}}DataBody = {{prefix}}Mono({{type-scale-body-sm-size-raw}})
}
```

### Spacing & Radius Constants

```swift
enum {{prefix-upper}}Spacing {
    static let xxs: CGFloat = {{spacing-2xs}}
    static let xs: CGFloat = {{spacing-xs}}
    static let sm: CGFloat = {{spacing-sm}}
    static let md: CGFloat = {{spacing-md}}
    static let lg: CGFloat = {{spacing-lg}}
    static let xl: CGFloat = {{spacing-xl}}
    static let xxl: CGFloat = {{spacing-2xl}}
    static let xxxl: CGFloat = {{spacing-3xl}}
    static let xxxxl: CGFloat = {{spacing-4xl}}
}

enum {{prefix-upper}}Radius {
    static let cards: CGFloat = {{radii-cards}}
    static let cardsFeatured: CGFloat = {{radii-cards-featured}}
    static let buttons: CGFloat = {{radii-buttons}}
    static let buttonsSmall: CGFloat = {{radii-buttons-small}}
    static let inputs: CGFloat = {{radii-inputs}}
    static let tags: CGFloat = {{radii-tags}}
    static let modals: CGFloat = {{radii-modals}}
}
```

### Dark/Light Mode

Use `@Environment(\.colorScheme)` for mode detection. For production apps, define all colors in an Asset Catalog with "Any, Dark" appearances for automatic switching. The Color extension above provides single-mode hex values; swap them for Asset Catalog references in production.

---

## 3. REACT / TAILWIND

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: {
          1: "var(--surface1)",
          2: "var(--surface2)",
          3: "var(--surface3)",
        },
        border: {
          DEFAULT: "var(--border)",
          visible: "var(--border-visible)",
        },
        text: {
          1: "var(--text1)",
          2: "var(--text2)",
          3: "var(--text3)",
          4: "var(--text4)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          subtle: "var(--accent-subtle)",
        },
        success: {
          DEFAULT: "var(--success)",
          bg: "var(--success-bg)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          bg: "var(--warning-bg)",
        },
        error: {
          DEFAULT: "var(--error)",
          bg: "var(--error-bg)",
        },
      },
      fontFamily: {
        display: ["{{font-display-name}}", {{font-display-fallback-quoted}}],
        body: ["{{font-body-name}}", {{font-body-fallback-quoted}}],
        mono: ["{{font-mono-name}}", {{font-mono-fallback-quoted}}],
      },
      fontSize: {
        display: ["{{type-scale-display-size}}", { lineHeight: "{{type-scale-display-line-height}}", letterSpacing: "{{type-scale-display-letter-spacing}}" }],
        heading: ["{{type-scale-heading-size}}", { lineHeight: "{{type-scale-heading-line-height}}", letterSpacing: "{{type-scale-heading-letter-spacing}}" }],
        subheading: ["{{type-scale-subheading-size}}", { lineHeight: "{{type-scale-subheading-line-height}}", letterSpacing: "{{type-scale-subheading-letter-spacing}}" }],
        body: ["{{type-scale-body-size}}", { lineHeight: "{{type-scale-body-line-height}}", letterSpacing: "{{type-scale-body-letter-spacing}}" }],
        "body-sm": ["{{type-scale-body-sm-size}}", { lineHeight: "{{type-scale-body-sm-line-height}}", letterSpacing: "{{type-scale-body-sm-letter-spacing}}" }],
        caption: ["{{type-scale-caption-size}}", { lineHeight: "{{type-scale-caption-line-height}}", letterSpacing: "{{type-scale-caption-letter-spacing}}" }],
        label: ["{{type-scale-label-size}}", { lineHeight: "{{type-scale-label-line-height}}", letterSpacing: "{{type-scale-label-letter-spacing}}" }],
      },
      spacing: {
        "2xs": "{{spacing-2xs}}px",
        xs: "{{spacing-xs}}px",
        sm: "{{spacing-sm}}px",
        md: "{{spacing-md}}px",
        lg: "{{spacing-lg}}px",
        xl: "{{spacing-xl}}px",
        "2xl": "{{spacing-2xl}}px",
        "3xl": "{{spacing-3xl}}px",
        "4xl": "{{spacing-4xl}}px",
      },
      borderRadius: {
        cards: "{{radii-cards}}px",
        buttons: "{{radii-buttons}}px",
        "buttons-sm": "{{radii-buttons-small}}px",
        inputs: "{{radii-inputs}}px",
        tags: "{{radii-tags}}px",
        modals: "{{radii-modals}}px",
      },
      transitionTimingFunction: {
        fast: "{{motion-easing-fast}}",
        medium: "{{motion-easing-medium}}",
        slow: "{{motion-easing-slow}}",
      },
      transitionDuration: {
        fast: "{{motion-duration-fast}}",
        medium: "{{motion-duration-medium}}",
        slow: "{{motion-duration-slow}}",
      },
      boxShadow: {
        1: "{{shadow-1-light}}",
        2: "{{shadow-2-light}}",
        3: "{{shadow-3-light}}",
      },
    },
  },
  plugins: [],
};
```

### Font Loading

Load fonts via Google Fonts `<link>` tag in the HTML `<head>` (see Section 1 above) or via `@fontsource` packages:

```bash
npm install @fontsource/{{font-display-npm-package}} @fontsource/{{font-body-npm-package}} @fontsource/{{font-mono-npm-package}}
```

```js
import "@fontsource/{{font-display-npm-package}}";
import "@fontsource/{{font-body-npm-package}}";
import "@fontsource/{{font-mono-npm-package}}";
```

### CSS Variables

Include the `:root` CSS custom properties from Section 1 in your global stylesheet (`globals.css` or `index.css`). The Tailwind config references these via `var(--token-name)` for automatic dark mode support.
