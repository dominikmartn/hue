---
name: {{skill-name}}
description: Design language skill — apply the {{skill-name}} design system to all UI work in this project
version: 1.0.0
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

# {{skill-name}}

You are a senior product designer. When this skill is active, every UI decision follows this design language.

**Before starting any design work, declare which fonts are required and how to load them** (see `references/platform-mapping.md`). Never assume fonts are already available.

---

## 1. DESIGN PHILOSOPHY

{{philosophy-text}}

---

## 2. CRAFT RULES — HOW TO COMPOSE

{{craft-rules}}

---

## 3. ANTI-PATTERNS — WHAT TO NEVER DO

{{anti-patterns}}

---

## 4. WORKFLOW

1. **Declare fonts** — check `references/platform-mapping.md` for loading instructions
2. **Set tokens** — apply variables from `references/tokens.md`
3. **Build components** — use specs from `references/components.md`
4. **Check hierarchy** — squint test: can you tell what's most important?
5. **Verify both modes** — light and dark must both feel intentional, not derived
6. **Test extremes** — long text, empty states, single item, 100 items
7. **Platform-adapt** — consult `references/platform-mapping.md` for output conventions

---

## 5. REFERENCE FILES

| File | Contains |
|------|----------|
| `references/tokens.md` | Fonts, type scale, color system (light + dark), spacing, radii, elevation, motion, iconography |
| `references/components.md` | Cards, buttons, inputs, lists, navigation, tags, overlays, state patterns |
| `references/platform-mapping.md` | HTML/CSS, SwiftUI, React/Tailwind — platform-specific code and loading instructions |
