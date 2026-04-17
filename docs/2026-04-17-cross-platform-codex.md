# Hue Cross-Platform (Claude Code + Codex) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Hue skill discoverable and functional on both Claude Code and OpenAI Codex from a single repo, including cross-platform output for generated skills.

**Architecture:** Single `SKILL.md` with a Platform Tools mapping table. Body uses capability-language at action points. Generated skills (via `skill-template.md`) emit cross-platform frontmatter. README documents both install paths.

**Tech Stack:** Markdown, YAML frontmatter

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `SKILL.md` | Modify | Add platform tools table, update ~10 tool-specific lines to capability language, update description + output paths + install reminder |
| `references/skill-template.md` | Modify | Cross-platform frontmatter for generated skills |
| `README.md` | Modify | Dual install instructions (Claude Code + Codex) |

No new files. No changes to `references/` templates (tokens, components, platform-mapping, etc.) or `examples/`.

---

### Task 1: SKILL.md — Frontmatter + Description

**Files:**
- Modify: `SKILL.md:1-11`

- [ ] **Step 1: Update frontmatter description**

Change line 3 from:
```yaml
description: "Meta-skill that generates new design language skills for Claude Code. Use when the user says..."
```
to:
```yaml
description: "Meta-skill that generates new design language skills. Works on Claude Code and Codex. Use when the user says 'create a design skill', 'generate design language', 'new design system skill', 'design skill inspired by X', 'design skill from this screenshot', '/hue', or 'use hue'. Also triggers for 'remix my design skill' or 'make my skill more X'."
```

- [ ] **Step 2: Update intro paragraph**

Change line 10 from:
```
You are a senior product designer who creates design language specifications for Claude Code.
```
to:
```
You are a senior product designer who creates design language specifications for AI coding assistants (Claude Code, Codex, and compatible tools).
```

- [ ] **Step 3: Verify frontmatter is valid YAML**

Run: `ruby -ryaml -e "YAML.load_file('SKILL.md'.tap{|f| puts File.read(f).split('---')[1]})" 2>&1 || echo "check manually"`

Note: `allowed-tools` stays — Claude Code needs it, Codex ignores it (tested on codex-cli 0.121.0).

---

### Task 2: SKILL.md — Platform Tools Table

**Files:**
- Modify: `SKILL.md:13` (insert after "Your reference material lives in `references/`. Use it.")

- [ ] **Step 1: Insert the Platform Tools section**

After line 13 (`Your reference material lives in \`references/\`. Use it.`), before the `---` separator, insert:

```markdown

## Platform Tools

This skill runs on multiple AI coding assistants. Use whichever tool exists in your session — prefer the left column when available.

| Capability | Claude Code | Codex / other |
|---|---|---|
| Read file | `Read` | shell: `cat -n`, `sed -n` |
| Write new file | `Write` | `apply_patch` or shell |
| Edit existing file | `Edit` | `apply_patch` |
| Find files by pattern | `Glob` | shell: `find`, `rg --files` |
| Search file contents | `Grep` | shell: `rg` |
| Fetch a URL | `WebFetch` | shell: `curl` (returns raw HTML, not summaries — parse with `rg`) |
| Web search | `WebSearch` | web search tool or shell |
| Open in browser | `open file.html` | `open file.html` (macOS) or print the absolute path for the user |
| Browser DevTools | `mcp__chrome-devtools__*` | MCP if configured, else skip — fall back to URL fetch |

When this skill says "fetch the URL", "search the web", or "read the file", use whatever tool from this table is available. Don't fail because a specific tool name doesn't exist — use the equivalent.
```

---

### Task 3: SKILL.md — Brand Name Input (Lines 22-27)

**Files:**
- Modify: `SKILL.md:22-27`

- [ ] **Step 1: Update Brand Name instructions to capability language**

Replace lines 22-27:
```markdown
### Brand Name
1. Use `WebSearch` to find the brand's website.
2. Present the URL to the user: "I found [url] — is this the right one?"
3. Wait for confirmation before proceeding.
4. Once confirmed, `WebFetch` the main page + 2-3 subpages (features, product, about) to understand the full design language — not just the homepage.
5. Look at: primary colors, typography choices, spacing density, corner treatments, motion philosophy, overall attitude. Cross-reference with their product hardware, packaging, marketing materials. A brand's design language is the intersection of ALL their touchpoints.
```

with:
```markdown
### Brand Name
1. Search the web for the brand's website.
2. Present the URL to the user: "I found [url] — is this the right one?"
3. Wait for confirmation before proceeding.
4. Once confirmed, fetch the main page + 2-3 subpages (features, product, about) to understand the full design language — not just the homepage.
5. Look at: primary colors, typography choices, spacing density, corner treatments, motion philosophy, overall attitude. Cross-reference with their product hardware, packaging, marketing materials. A brand's design language is the intersection of ALL their touchpoints.
```

---

### Task 4: SKILL.md — URL Analysis Fallback Chain (Lines 29-53)

**Files:**
- Modify: `SKILL.md:29-53`

- [ ] **Step 1: Update URL section header to include curl fallback tier**

Replace lines 29-31:
```markdown
### URL

**Preferred: Use Chrome DevTools MCP when available.** WebFetch returns paraphrased summaries that hallucinate values (border-radius, accent colors, background treatments). If Chrome DevTools MCP tools (`mcp__chrome-devtools__*`) are available in this session, always use them for URL analysis. If they are NOT available, fall back to WebFetch but explicitly flag reduced confidence in the output:
```

with:
```markdown
### URL

**Preferred: Use Chrome DevTools MCP when available.** Text-only URL fetching (WebFetch or curl) returns paraphrased or raw HTML that can miss computed values (border-radius, accent colors, background treatments). If Chrome DevTools MCP tools (`mcp__chrome-devtools__*`) are available in this session, always use them for URL analysis. If they are NOT available, fall back to WebFetch or curl but explicitly flag reduced confidence in the output:
```

- [ ] **Step 2: Update the WebFetch fallback section title and first line**

Replace line 48-50:
```markdown
**When only WebFetch is available:**

1. **`WebFetch` the main page + 2–3 subpages** (features, product, about). WebFetch returns text summaries, not computed styles — treat all extracted values as approximate.
```

with:
```markdown
**When only URL fetching is available (WebFetch or curl):**

1. **Fetch the main page + 2–3 subpages** (features, product, about). Text-based fetching returns summaries or raw HTML, not computed styles — treat all extracted values as approximate. If using curl, pipe through `rg` to extract CSS custom properties, hex colors, font-family declarations, and border-radius values.
```

- [ ] **Step 3: Update cross-reference line**

Replace line 51:
```markdown
2. **Cross-reference with `WebSearch`** for additional brand screenshots, design case studies, or press kits to compensate for WebFetch's shallow extraction.
```

with:
```markdown
2. **Cross-reference with a web search** for additional brand screenshots, design case studies, or press kits to compensate for text-based fetching's shallow extraction.
```

---

### Task 5: SKILL.md — Remix Input + Search References (Line 107, 63)

**Files:**
- Modify: `SKILL.md:107`
- Modify: `SKILL.md:63`

- [ ] **Step 1: Update Remix line**

Replace line 107:
```markdown
Read the existing skill with `Read`. Understand its current personality.
```

with:
```markdown
Read the existing skill files. Understand its current personality.
```

- [ ] **Step 2: Update login fallback search line**

Replace line 63:
```markdown
1. **Search for public sources first.** Use `WebSearch` to find:
```

with:
```markdown
1. **Search for public sources first.** Search the web to find:
```

---

### Task 6: SKILL.md — Output Path + Open Browser + Install Reminder

**Files:**
- Modify: `SKILL.md:503-514`
- Modify: `SKILL.md:517`
- Modify: `SKILL.md:535`
- Modify: `SKILL.md:609-611`

- [ ] **Step 1: Update default output path**

Replace lines 503-504:
```markdown
Default location: `~/.claude/skills/{skill-name}-design/`
If the user specifies a different path, use that. Create the directory structure:
```

with:
```markdown
Default location depends on the platform:
- **Claude Code:** `~/.claude/skills/{skill-name}-design/`
- **Codex:** `~/.agents/skills/{skill-name}-design/`
- If the user specifies a different path, use that.

Create the directory structure:
```

- [ ] **Step 2: Update "open in browser" lines**

Replace line 517:
```markdown
Open it in the browser with `open preview.html`. This is the magic moment — the user sees their design language come alive.
```

with:
```markdown
Open the preview in a browser (macOS: `open preview.html`, or provide the absolute path). This is the magic moment — the user sees their design language come alive.
```

Replace line 535 (similar pattern):
```markdown
Open it in the browser after generating.
```

with:
```markdown
Open it in a browser after generating.
```

(This one is already generic enough — "open it in the browser" doesn't reference a specific tool. Keep as-is if already generic.)

- [ ] **Step 3: Update installation reminder**

Replace lines 609-611:
```markdown
### Phase 16: Installation Reminder
After generating, tell the user:
> Restart Claude Code or start a new conversation for the skill to be detected. Activate it by saying "{skill-name} design" or "/{skill-name}-design".
```

with:
```markdown
### Phase 16: Installation Reminder
After generating, tell the user:
> Restart your AI coding assistant (Claude Code, Codex, etc.) or start a new conversation for the skill to be detected. Activate it by saying "{skill-name} design" or "/{skill-name}-design".
```

---

### Task 7: SKILL.md — Generated Skill Frontmatter (Lines 750-761)

**Files:**
- Modify: `SKILL.md:750-761`

- [ ] **Step 1: Update the frontmatter rules section**

Replace lines 750-761:
```markdown
## 4. FRONTMATTER RULES

Every generated SKILL.md must start with this frontmatter structure:

\```yaml
---
name: {skill-name}-design
description: "This skill should be used when the user explicitly says '{Skill Name} style', '{Skill Name} design', '/{skill-name}-design', or directly asks to use/apply the {Skill Name} design system. NEVER trigger automatically for generic UI or design tasks."
version: 1.0.0
allowed-tools: [Read, Write, Edit, Glob, Grep]
---
\```

The description must include the explicit trigger phrases. Never allow automatic triggering for generic design tasks.
```

with:
```markdown
## 4. FRONTMATTER RULES

Every generated SKILL.md must start with this frontmatter structure:

\```yaml
---
name: {skill-name}-design
description: "This skill should be used when the user explicitly says '{Skill Name} style', '{Skill Name} design', '/{skill-name}-design', or directly asks to use/apply the {Skill Name} design system. NEVER trigger automatically for generic UI or design tasks."
version: 1.0.0
allowed-tools: [Read, Write, Edit, Glob, Grep]
---
\```

The description must include the explicit trigger phrases. Never allow automatic triggering for generic design tasks.

**Cross-platform note:** `allowed-tools` is a Claude Code field. Codex ignores it but tolerates its presence. Both platforms use `name` and `description` for skill discovery. Keep all fields for maximum compatibility.
```

---

### Task 8: references/skill-template.md — Cross-Platform Note

**Files:**
- Modify: `references/skill-template.md:1-6`

- [ ] **Step 1: Add cross-platform comment to template frontmatter**

Replace lines 1-6:
```yaml
---
name: {{skill-name}}
description: Design language skill — apply the {{skill-name}} design system to all UI work in this project
version: 1.0.0
allowed-tools: [Read, Write, Edit, Glob, Grep]
---
```

with:
```yaml
---
name: {{skill-name}}
description: "This skill should be used when the user explicitly says '{{Skill Name}} style', '{{Skill Name}} design', '/{{skill-name}}-design', or directly asks to use/apply the {{Skill Name}} design system. NEVER trigger automatically for generic UI or design tasks."
version: 1.0.0
allowed-tools: [Read, Write, Edit, Glob, Grep]
# ^ allowed-tools is Claude Code specific. Codex ignores it but tolerates its presence.
---
```

Note: This also fixes a drift between `skill-template.md` (generic description) and `SKILL.md:757` (explicit trigger description). The template should match the frontmatter rules.

---

### Task 9: README.md — Dual Install + Cross-Platform Framing

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README with cross-platform install and framing**

Replace the full README content with:

```markdown
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
```

---

### Task 10: Verify + Commit

- [ ] **Step 1: Validate YAML in all modified files**

Run:
```bash
cd ~/.claude/skills/hue
# Check SKILL.md frontmatter parses
ruby -ryaml -e "content = File.read('SKILL.md'); fm = content.split('---')[1]; YAML.safe_load(fm); puts 'SKILL.md frontmatter OK'"
# Check skill-template frontmatter has no broken YAML
ruby -ryaml -e "content = File.read('references/skill-template.md'); fm = content.split('---')[1]; YAML.safe_load(fm); puts 'skill-template OK'"
```

Expected: Both print OK.

- [ ] **Step 2: Grep for remaining hardcoded Claude-only references in SKILL.md**

Run:
```bash
rg -n "Use \`WebSearch\`|Use \`WebFetch\`|Use \`Read\`|Restart Claude Code" SKILL.md
```

Expected: Zero matches. Any hits = missed conversion.

- [ ] **Step 3: Grep for remaining hardcoded paths**

Run:
```bash
rg -n "~/.claude/skills/" SKILL.md | grep -v "Default location"
```

Expected: Zero matches outside the default-location block (which now shows both paths).

- [ ] **Step 4: Commit**

```bash
git add SKILL.md references/skill-template.md README.md docs/
git commit -m "make hue cross-platform: claude code + codex from single repo

Add platform tools mapping table, convert tool-specific instructions to
capability language, update generated skill frontmatter rules, dual
install paths in README.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```
