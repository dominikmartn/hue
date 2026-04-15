# hue

an open-source claude code skill that learns any brand from a url, name, or screenshot and turns it into a complete design system. install it once, and every component claude builds after that matches your brand.

see it in action: **[hueapp.io](https://hueapp.io)**

## what you get

a full design language as a claude code skill — color tokens, typography, spacing, components, light + dark mode, hero stage recipes, icon kit selection. opinionated enough that two different claude sessions using the generated skill produce visually consistent output.

## install

```
git clone https://github.com/dominikmartn/hue ~/.claude/skills/hue
```

then in any claude code session say something like:

- "make a design skill from cursor.com"
- "create a design language inspired by raycast"
- "generate a hue skill from this screenshot"

claude picks up the trigger and walks through the analysis.

## examples

eight fictional brands live in `examples/` showing the kind of output hue produces:

| brand | character |
|---|---|
| auris | premium audio, monochrome dark |
| drift | hot pink fashion commerce |
| halcyon | cool teal sculptural glass |
| orivion | luminous red-violet glow |
| ridge | slate emerald dev platform |
| solvent | warm amber generative shader |
| stint | muted violet productivity |
| thrive | sage green wellness, light mode |

each has a `design-model.yaml`, a `landing-page.html`, and (for ridge and stint) an `app-screen.html`. open them in a browser to see the full system rendered.

## license

MIT. fork it, remix it, build your own.
