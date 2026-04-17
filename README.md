# hue

an open-source skill that learns any brand from a url, name, or screenshot and turns it into a complete design system. works on claude code and codex. install it once, and every component your ai assistant builds after that matches your brand.

see it in action: **[hueapp.io](https://hueapp.io)**

## what you get

a full design language as an ai coding skill — color tokens, typography, spacing, components, light + dark mode, hero stage recipes, icon kit selection. opinionated enough that two different sessions using the generated skill produce visually consistent output.

## install

### claude code

```
git clone https://github.com/dominikmartn/hue ~/.claude/skills/hue
```

### codex

```
git clone https://github.com/dominikmartn/hue ~/.agents/skills/hue
```

alternative codex path (cli installer compatible):
```
git clone https://github.com/dominikmartn/hue "${CODEX_HOME:-$HOME/.codex}/skills/hue"
```

then in any session say something like:

- "make a design skill from cursor.com"
- "create a design language inspired by raycast"
- "generate a hue skill from this screenshot"

the assistant picks up the trigger and walks through the analysis.

## examples

seventeen brands live in `examples/` showing the range of output hue produces. sixteen are fictional one-shots, one is real (meadow ↦ the mymind-design skill).

| brand | character |
|---|---|
| atlas | ivory engineering, classical maritime charts |
| auris | premium audio, monochrome dark |
| drift | hot pink fashion commerce |
| fizz | y2k pop photo-sharing, candy chrome |
| halcyon | cool teal sculptural glass |
| kiln | dark fired earth, molten terracotta |
| ledger | newsprint editorial, financial broadsheet |
| meadow | warm cream editorial (real, from mymind-design) |
| orivion | luminous red-violet glow |
| oxide | brutalist mono compute protocol |
| prism | cyberpunk holographic shader engine |
| relay | swiss transit, departure board precision |
| ridge | slate emerald dev platform |
| solvent | warm amber generative shader |
| stint | muted violet productivity |
| thrive | sage green wellness, light mode |
| velvet | noir editorial fragrance house |

each has a `design-model.yaml` + `landing-page.html`. ridge and stint also ship an `app-screen.html`. halcyon ships a full `component-library.html`. open them in a browser to see the system rendered.

## license

MIT. fork it, remix it, build your own.
