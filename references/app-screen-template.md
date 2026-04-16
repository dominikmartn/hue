# App Screen Template

The third and final view the skill generates. Landing page shows *what the brand sells*. Component library shows *what the pieces look like*. App screen shows *what the product actually feels like in use* — the tokens applied to a representative screen inside the brand's product, rendered inside a device frame.

This is the view that validates "does the design system survive contact with real product UI?" A design language that looks great on a marketing hero but falls apart inside a dense dashboard is a failed language. The app screen is the proof.

## What it's NOT

- Not a second landing page. No marketing copy, no CTAs pointing at signup, no hero headline.
- Not a component library. Pieces appear *composed into a real flow*, not isolated on a gray canvas.
- Not a full interactive prototype. It's a single screen, a frozen snapshot of the product mid-use, with enough density to look like real software.
- Not a specific brand's UI. Everything is invented in the brand's voice but the product shown is an abstract stand-in, never a copy of a real tool.

## Device frame — the wrapper

Every app screen renders inside a device chrome that tells the reader "this is a product, not a marketing page." Pick the frame from the brand's primary platform.

| Frame | When to use | Chrome |
|---|---|---|
| `browser` | Web-first products (dashboards, SaaS, admin panels) | Window title bar with traffic-light dots, tab strip, URL bar with the brand's fictional domain, viewport below |
| `phone` | Mobile-first products (social, messaging, consumer apps) | Rounded device shell, status bar (time, cellular, battery), Dynamic Island or notch, home indicator at the bottom |
| `desktop` | Native desktop apps (IDEs, pro tools, system utilities) | macOS-style window with traffic lights but no URL bar — a native app chrome, not a browser |
| `tablet` | Drawing, reading, content consumption apps | iPad-style landscape shell, top status bar, thin bezels |

**Default rule.** If `brand_domain` mentions web, SaaS, dashboard, admin, devtools, or platform → `browser`. If it mentions mobile, social, messaging, wellness, consumer → `phone`. If it's a native pro tool (editor, IDE, design tool) → `desktop`. Otherwise fall through to `browser`.

The frame is documented in `design-model.yaml` as:

```yaml
app_screen:
  frame: "browser"         # browser / phone / desktop / tablet
  frame_params:
    url: "app.stint.co/cycles"   # for browser only — fictional domain
    title: "Stint — Current cycle"
```

## Archetypes — what gets rendered inside the frame

Six archetypes cover the space of product UI. Pick the one that matches what the brand's real product most resembles — based on `brand_domain` and observed screenshots if available.

### 1. `dashboard` — data-heavy overview

For observability, analytics, infrastructure, financial, SLO, admin tools. Dense metric tiles, charts, timelines, status indicators. Usually monospace-heavy.

**Structure.** Top bar (brand + global nav + environment selector + user menu) → Left sidebar (grouped resource list with counts) → Main canvas (row of KPI metrics on top, chart or timeline in the middle, a table or log stream below).

**Good for.** Ridge, Stint (cycles view), any observability/data tool.

### 2. `editor` — content creation canvas

For docs, notes, code editors, design tools. A focused content surface with minimal chrome, a floating toolbar or left rail of structure (outline, layers, files), optional right rail for properties.

**Structure.** Thin top bar (file name + save state + share) → Left rail (outline / file tree / layers) → Center canvas (the document being edited) → Optional right rail (properties / comments / AI assist).

**Good for.** Meadow (collecting canvas), Notion-adjacent brands, code IDEs, design tools, long-form writing apps.

### 3. `list-detail` — records with a selected item

For email, issue trackers, CRMs, task managers, inboxes. A list of records on the left, the currently selected record's detail on the right.

**Structure.** Top bar (brand + primary actions + search) → Left list (scrollable record list with unread/status indicators) → Main detail (the selected record fully expanded: header, body, metadata, action buttons, activity log).

**Good for.** Linear-style issue trackers, Gmail-adjacent mail clients, any CRM or inbox.

### 4. `feed` — scrolling timeline of items

For social, media consumption, music/video, news. A centered column of cards or rows, each representing an item, with a persistent left nav and optional right rail.

**Structure.** Top bar (brand + search + profile) → Left nav (sections like Home, Explore, Library) → Center feed (cards, each with media, title, metadata, actions) → Optional right rail (suggested items, trending, activity).

**Good for.** Spotify-adjacent music apps, Twitter-style social, media libraries.

### 5. `conversational` — chat or messaging surface

For chat apps, AI assistants, Slack-adjacent tools, support inboxes. A thread of messages in the center, a compose area at the bottom, optionally a channel/conversation list on the left.

**Structure.** Top bar (current thread name + participants + actions) → Left list (conversations / channels / contacts) → Main thread (alternating message bubbles scrolling up to the top, timestamps, reactions) → Compose area at the bottom (input + send button + attach).

**Good for.** Halcyon (if we ever show its "asking the graph a question" flow), Slack-adjacent tools, Claude-style AI chat, support consoles.

### 6. `canvas` — spatial / freeform arrangement

For infinite canvases, mood boards, knowledge gardens, design tools. A large viewport with items placed spatially, minimal chrome, zoom/pan controls.

**Structure.** Thin top bar (tools + view controls + share) → Main canvas (items scattered: cards, images, notes, connections between them) → Optional bottom bar (zoom, mini-map).

**Good for.** mymind / Meadow, Figma-adjacent tools, knowledge mapping, brainstorming apps.

## The rendering pipeline

```
 z: 0  page background (var(--background))
 z: 1  device frame chrome (browser window / phone shell / desktop bars)
 z: 2  archetype layout (sidebar, topbar, main, etc.)
 z: 3  content inside the archetype (cards, rows, metrics, messages, etc.)
 z: 4  cursor indicator (optional — a fake cursor hovering on a button, sells the "live" feel)
```

Everything below `z: 4` is composed. `z: 4` is a single visual touch — a cursor or a highlighted hover state — that tells the reader "this isn't a static screenshot, this is *mid-use*." Optional but adds a lot.

## Content density — the critical call

The #1 mistake generating an app screen is **under-density**. Real product UI is dense. A half-empty dashboard reads as a wireframe, not a product.

**Rules for density.**
- `dashboard`: 4–8 metric tiles, at least one chart with ~20 data points, a table or log list with 8+ rows.
- `editor`: enough content to fill the canvas — a page of prose, or 30+ lines of code, or a full design frame with multiple elements. Never an empty canvas.
- `list-detail`: 10+ items in the list, the selected detail full of real content (paragraphs, metadata rows, activity timeline).
- `feed`: 4+ fully filled cards.
- `conversational`: 8+ messages in the thread, alternating sender.
- `canvas`: 10+ items placed.

Invent content in the brand's voice. Ridge's dashboard shows `checkout-api` and `auth-worker` — services that could exist. A fictional Notion-alike's editor shows a document about onboarding, not lorem ipsum. The content IS the brand's voice applied to the product.

## Tokens — they must all show up

The component library view already proves every token exists. The app screen proves every token survives composition. At minimum, the app screen must use:

- All 4 text levels (`text1`, `text2`, `text3`, `text4`)
- All 3 surface levels (`surface1`, `surface2`, `surface3`)
- At least 2 border levels (`border`, `border_visible`)
- `accent` on at least one active/selected element
- At least one of each: pill, button, input, icon from the chosen kit
- Both `body` and `mono` typography families (even if mono is just for timestamps)
- At least one radius variant from the radii scale
- At least one elevation (shadow) if the brand has elevation

If a token isn't used, the design language doesn't actually cover that token's use case, which is valuable to learn here — not in production.

## YAML schema

```yaml
app_screen:
  # Pick one — this is MANDATORY when generating the skill
  archetype: "dashboard"        # dashboard / editor / list-detail / feed / conversational / canvas
  frame: "browser"              # browser / phone / desktop / tablet
  frame_params:
    url: "app.ridge.dev/checkout-api"   # browser only
    title: "Ridge — checkout-api"
  content_seed: |
    The SLO overview for checkout-api. Left sidebar lists services with 99.xx
    success rates. Main canvas shows three KPI tiles (p99 latency, error rate,
    budget left) above a 30-day error-budget chart approaching but not crossing
    the SLO line. A log stream below shows recent deploys and alerts.
  required_tokens_checklist:     # sanity check — list the tokens the screen uses
    - "text1, text2, text3, text4"
    - "surface1, surface2, surface3, border, border_visible"
    - "accent, accent_subtle"
    - "mono for timestamps and identifiers"
    - "radii.component, radii.element, radii.pill"
```

## Integration with SKILL.md

A new phase sits after `Phase 12: Generate Landing Page`:

**Phase 13: Generate App Screen.**

1. Read `app_screen` block from `design-model.yaml`.
2. Pick the archetype template from this file.
3. Pick the frame chrome.
4. Fill the archetype with brand-voice content at the required density.
5. Apply all tokens from the design model.
6. Write `app-screen.html` in the skill folder alongside `landing-page.html` and `component-library.html`.
7. Add the file to Phase 11's sticky TOC navigation so all three views are reachable from each other.

Generated `app-screen.html` follows the same conventions as the other views:
- Floating bottom Light/Dark toggle bar
- Click-disabled anchors
- Round stroke caps on icons
- Brand fonts loaded from Google Fonts
- Phosphor (or the chosen kit) icons via CDN

## Dark mode

Every archetype and every frame adapts to dark mode. The device chrome shifts (browser window chrome goes to dark slate, phone status bar gets a dark background), the archetype layout inherits the tokens, content keeps its meaning. Same explicit-override pattern as the landing page — no `filter: invert()`.

## Quality checklist

Before shipping a generated `app-screen.html`:

- [ ] Archetype chosen matches the brand's real product category
- [ ] Frame matches the brand's primary platform
- [ ] Content density meets the rules above (no sparse wireframes)
- [ ] Every required token appears at least once
- [ ] Brand voice is in the invented content — no lorem ipsum
- [ ] Both light and dark mode render correctly
- [ ] At least one "mid-use" touch (cursor, hover state, selected item)
- [ ] Screen reads as "a real product, caught mid-use" not "a component library in disguise"
- [ ] File is click-disabled and has the standard theme toggle
