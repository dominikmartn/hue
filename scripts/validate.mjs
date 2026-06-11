#!/usr/bin/env node
// hue — validation gate for generated design skills (SKILL.md Phase 14).
//
// Usage: node scripts/validate.mjs <path-to-generated-skill-folder>
//
// Zero runtime dependencies. The only external touch is `npx --yes js-yaml`
// for strict YAML syntax checking — skipped gracefully when npx is missing.
//
// Checks:
//   1. yaml-parse    design-model.yaml parses as valid YAML
//   2. css-orphans   every CSS class-selector matches at least one element
//   3. css-vars      every var(--x) usage has a --x definition in the same file
//   4. placeholders  no {{...}}, TODO, FIXME, lorem ipsum in output files
//   5. em-dash       no em-dashes in visible HTML text or tokens.md / SKILL.md
//   6. frontmatter   generated SKILL.md: name == folder, "NEVER trigger automatically"
//   7. contrast      WCAG contrast of text1/text2 on background, both modes
//   8. fonts         AI-default display fonts (WARN only — observed_style may justify)
//
// Exit code 1 if at least one ERROR, otherwise 0.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, basename, resolve, relative, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

const HTML_VIEWS = ['landing-page.html', 'component-library.html', 'preview.html', 'app-screen.html'];
const BANNED_DISPLAY_FONTS = [
  'space grotesk', 'playfair display', 'fraunces', 'instrument serif',
  'dm serif display', 'dm serif text', 'dm serif', 'inter',
];
const FONT_WARN_TEXT = 'AI-default font as display face — justified only if the actual brand uses it';

// ---------------------------------------------------------------- findings

const findings = [];
const add = (level, check, file, detail) => findings.push({ level, check, file, detail });

// ---------------------------------------------------------------- helpers

const read = (file) => readFileSync(file, 'utf8');

function walkOutputFiles(dir) {
  const exts = new Set(['.html', '.md', '.yaml', '.yml', '.css', '.js']);
  const out = [];
  const visit = (d) => {
    for (const entry of readdirSync(d)) {
      if (entry.startsWith('.') || entry === 'node_modules') continue;
      const p = join(d, entry);
      const st = statSync(p);
      if (st.isDirectory()) visit(p);
      else if (exts.has(extname(entry))) out.push(p);
    }
  };
  visit(dir);
  return out;
}

function getStyleBlocks(html) {
  const blocks = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html))) blocks.push(m[1]);
  return blocks;
}

function stripCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

// Remove @keyframes / @font-face blocks (balanced braces) so keyframe names
// and percentage steps are never treated as selectors.
function removeAtBlocks(css) {
  const re = /@(?:-webkit-|-moz-|-o-)?(?:keyframes|font-face)\b/;
  let m;
  while ((m = css.match(re))) {
    const start = m.index;
    const open = css.indexOf('{', start);
    if (open === -1) return css.slice(0, start);
    let depth = 1;
    let i = open + 1;
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') depth--;
      i++;
    }
    css = css.slice(0, start) + css.slice(i);
  }
  return css;
}

// ---------------------------------------------------------------- 1. yaml-parse

function checkYamlParse(dir) {
  const file = join(dir, 'design-model.yaml');
  if (!existsSync(file)) {
    add('WARN', 'yaml-parse', 'design-model.yaml', 'file not found — every generated skill must ship a design model');
    return;
  }
  const r = spawnSync('npx', ['--yes', 'js-yaml', file], { encoding: 'utf8' });
  if (r.error) {
    add('SKIP', 'yaml-parse', 'design-model.yaml', `npx unavailable (${r.error.code ?? r.error.message}) — YAML syntax check skipped`);
    return;
  }
  if (r.status !== 0) {
    const msg = (r.stderr || r.stdout || '').trim().split('\n')[0] || `js-yaml exit ${r.status}`;
    add('ERROR', 'yaml-parse', 'design-model.yaml', msg);
  }
}

// ---------------------------------------------------------------- 2. css-orphans

function collectUsedClasses(html) {
  const used = new Set();
  let m;
  // class="..." anywhere — markup, SVG, and class attributes inside JS template strings
  const attrRe = /class\s*=\s*(?:"([^"]*)"|'([^']*)'|\\"([^"\\]*)\\")/gi;
  while ((m = attrRe.exec(html))) {
    for (const c of (m[1] ?? m[2] ?? m[3] ?? '').split(/\s+/)) if (c) used.add(c);
  }
  // classes assigned from JS (classList.add('x'), el.className = 'x y', dataset toggles)
  const scriptRe = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  while ((m = scriptRe.exec(html))) {
    const litRe = /(['"`])((?:\\.|(?!\1)[^\\])*)\1/g;
    let lm;
    while ((lm = litRe.exec(m[1]))) {
      for (const tok of lm[2].split(/\s+/)) {
        if (/^[A-Za-z][\w-]*$/.test(tok)) used.add(tok);
      }
    }
  }
  return used;
}

function extractClassSelectors(css) {
  const out = [];
  const re = /([^{}]+)\{/g;
  let m;
  while ((m = re.exec(css))) {
    const group = m[1].trim();
    if (!group || group.startsWith('@')) continue; // @media/@supports preludes
    for (let part of group.split(',')) {
      part = part.trim();
      if (!part || part.startsWith('@') || part === 'from' || part === 'to' || /%\s*$/.test(part)) continue;
      let cleaned = part.replace(/\[[^\]]*\]/g, '');             // attribute selectors
      cleaned = cleaned.replace(/::?[a-zA-Z-]+(\([^)]*\))?/g, ''); // pseudo-classes/-elements incl. args
      const cre = /\.([A-Za-z0-9_-]+)/g;
      let cm;
      while ((cm = cre.exec(cleaned))) out.push({ selector: part, cls: cm[1] });
    }
  }
  return out;
}

function checkCssOrphans(file, html) {
  const used = collectUsedClasses(html);
  const css = removeAtBlocks(stripCssComments(getStyleBlocks(html).join('\n')));
  const reported = new Set();
  for (const { selector, cls } of extractClassSelectors(css)) {
    if (used.has(cls) || reported.has(cls)) continue;
    reported.add(cls);
    add('ERROR', 'css-orphans', file, `selector "${selector}" — class ".${cls}" not found in markup`);
  }
}

// ---------------------------------------------------------------- 3. css-vars

function checkCssVars(file, content) {
  const defined = new Set();
  let m;
  const defRe = /(--[A-Za-z0-9_-]+)\s*:/g;
  while ((m = defRe.exec(content))) defined.add(m[1]);
  const propRe = /setProperty\(\s*['"`](--[A-Za-z0-9_-]+)/g;
  while ((m = propRe.exec(content))) defined.add(m[1]);

  const missing = new Map();
  const useRe = /var\(\s*(--[A-Za-z0-9_-]+)/g;
  while ((m = useRe.exec(content))) {
    if (!defined.has(m[1])) missing.set(m[1], (missing.get(m[1]) || 0) + 1);
  }
  for (const [name, count] of missing) {
    add('ERROR', 'css-vars', file, `var(${name}) used ${count}x but never defined in this file`);
  }
}

// ---------------------------------------------------------------- 4. placeholders

function checkPlaceholders(dir, files) {
  const patterns = [
    { re: /\{\{[^{}]*\}\}/, label: 'unresolved {{placeholder}}' },
    { re: /\bTODO\b/, label: 'TODO marker' },
    { re: /\bFIXME\b/, label: 'FIXME marker' },
    { re: /lorem ipsum/i, label: 'lorem ipsum' },
  ];
  for (const file of files) {
    const content = read(file);
    const rel = relative(dir, file);
    for (const { re, label } of patterns) {
      const m = content.match(re);
      if (!m) continue;
      const line = content.slice(0, m.index).split('\n').length;
      const count = (content.match(new RegExp(re.source, re.flags.includes('i') ? 'gi' : 'g')) || []).length;
      add('ERROR', 'placeholders', rel, `${label} (${count}x, first at line ${line}): ${snippet(content, m.index)}`);
    }
  }
}

function snippet(content, index, span = 40) {
  const raw = content.slice(Math.max(0, index - span / 2), index + span);
  return '"…' + raw.replace(/\s+/g, ' ').trim() + '…"';
}

// ---------------------------------------------------------------- 5. em-dash

function visibleHtmlText(html) {
  let s = html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  return s.replace(/&mdash;/gi, '—').replace(/&#8212;/g, '—').replace(/&#x2014;/gi, '—');
}

function checkEmDashes(dir) {
  for (const view of HTML_VIEWS) {
    const file = join(dir, view);
    if (!existsSync(file)) continue;
    const text = visibleHtmlText(read(file));
    const count = (text.match(/—/g) || []).length;
    if (count > 0) {
      const idx = text.indexOf('—');
      add('ERROR', 'em-dash', view, `${count} em-dash(es) in visible text (hard rule: never ship em-dashes): ${snippet(text, idx, 60)}`);
    }
  }
  const mdTargets = ['SKILL.md', 'tokens.md', join('references', 'tokens.md')];
  for (const target of mdTargets) {
    const file = join(dir, target);
    if (!existsSync(file)) continue;
    const content = read(file);
    const count = (content.match(/—/g) || []).length;
    if (count > 0) {
      const idx = content.indexOf('—');
      add('ERROR', 'em-dash', target, `${count} em-dash(es) (hard rule: never ship em-dashes): ${snippet(content, idx, 60)}`);
    }
  }
}

// ---------------------------------------------------------------- 6. frontmatter

function checkFrontmatter(dir) {
  const file = join(dir, 'SKILL.md');
  if (!existsSync(file)) {
    add('SKIP', 'frontmatter', 'SKILL.md', 'no generated SKILL.md in this folder — check skipped (expected for examples/)');
    return;
  }
  const content = read(file);
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) {
    add('ERROR', 'frontmatter', 'SKILL.md', 'missing YAML frontmatter block');
    return;
  }
  const folder = basename(resolve(dir));
  const nameM = fm[1].match(/^name:\s*(.+)$/m);
  if (!nameM) {
    add('ERROR', 'frontmatter', 'SKILL.md', 'missing "name:" field');
  } else {
    const name = nameM[1].trim().replace(/^["']|["']$/g, '');
    if (name !== folder) {
      add('ERROR', 'frontmatter', 'SKILL.md', `name "${name}" must equal the folder name "${folder}"`);
    }
  }
  if (!/NEVER trigger automatically/.test(fm[1])) {
    add('ERROR', 'frontmatter', 'SKILL.md', 'description must contain the literal "NEVER trigger automatically"');
  }
}

// ---------------------------------------------------------------- 7. contrast

// Minimal indentation-based YAML walk. Only scalar string values and flow maps
// are captured — enough to resolve "{neutral.900}" refs against primitives.
function parseSimpleYaml(text) {
  const root = {};
  const stack = [{ indent: -1, node: root }];
  for (const raw of text.split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#') || raw.trim().startsWith('-')) continue;
    const m = raw.match(/^(\s*)([A-Za-z0-9_][\w.-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    const indent = m[1].length;
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].node;
    let val = m[3].replace(/\s+#[^"']*$/, '').trim();
    if (val.startsWith('#')) val = ''; // unquoted # = YAML comment, value is empty
    if (val === '') {
      const obj = {};
      parent[m[2]] = obj;
      stack.push({ indent, node: obj });
    } else if (val.startsWith('{') && val.includes(':')) {
      // flow mapping: { 50: "#FEF2F2", 500: "#E5484D" }
      const obj = {};
      const fre = /([\w.-]+)\s*:\s*("[^"]*"|'[^']*'|[^,}]+)/g;
      let fm;
      while ((fm = fre.exec(val))) obj[fm[1]] = fm[2].trim().replace(/^["']|["']$/g, '');
      parent[m[2]] = obj;
    } else {
      parent[m[2]] = val.replace(/^["']|["']$/g, '');
    }
  }
  return root;
}

function resolveColor(val, prims) {
  if (val == null) return null;
  if (typeof val !== 'string') return null;
  const ref = val.match(/^\{([\w.-]+)\}$/);
  if (ref) {
    let node = prims;
    for (const seg of ref[1].split('.')) {
      if (node == null || typeof node !== 'object') return null;
      node = node[seg];
    }
    val = typeof node === 'string' ? node : null;
    if (val == null) return null;
  }
  const hex = val.match(/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?(?:[0-9a-fA-F]{2})?\b/);
  return hex ? hex[0] : null;
}

function luminance(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  c = c.slice(0, 6);
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(c.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function checkContrast(dir) {
  const file = join(dir, 'design-model.yaml');
  if (!existsSync(file)) {
    add('SKIP', 'contrast', 'design-model.yaml', 'no design model — contrast check skipped');
    return;
  }
  const model = parseSimpleYaml(read(file));
  const prims = model?.primitives?.colors;
  const modes = model?.tokens?.colors;
  if (!modes || typeof modes !== 'object') {
    add('WARN', 'contrast', 'design-model.yaml', 'tokens.colors not found — contrast check skipped');
    return;
  }
  let checkedAny = false;
  for (const mode of ['light', 'dark']) {
    const colors = modes[mode];
    if (!colors || typeof colors !== 'object') continue;
    const bg = resolveColor(colors.background, prims);
    if (!bg) {
      add('WARN', 'contrast', 'design-model.yaml', `${mode}.background missing or not resolvable to a hex value — mode skipped`);
      continue;
    }
    const pairs = [
      { key: 'text1', min: 4.5, level: 'ERROR', label: 'body-text minimum 4.5:1' },
      { key: 'text2', min: 3.0, level: 'WARN', label: 'secondary/large-text minimum 3:1' },
    ];
    for (const { key, min, level, label } of pairs) {
      const fg = resolveColor(colors[key], prims);
      if (!fg) {
        add('WARN', 'contrast', 'design-model.yaml', `${mode}.${key} missing or not resolvable to a hex value — pair skipped`);
        continue;
      }
      checkedAny = true;
      const r = contrastRatio(fg, bg);
      if (r < min) {
        add(level, 'contrast', 'design-model.yaml', `${mode}: ${key} ${fg} on background ${bg} = ${r.toFixed(2)}:1 — below ${label}`);
      }
    }
  }
  if (!checkedAny) {
    add('WARN', 'contrast', 'design-model.yaml', 'no resolvable text/background pairs found under tokens.colors.light/dark');
  }
}

// ---------------------------------------------------------------- 8. fonts

function firstFamily(value) {
  if (!value) return null;
  let v = value.trim();
  if (v.startsWith('var(')) return null; // handled by caller via def lookup
  return v.split(',')[0].trim().replace(/^["']|["']$/g, '').toLowerCase();
}

function checkFonts(dir) {
  // a) the design model's display/heading font token
  const yamlFile = join(dir, 'design-model.yaml');
  if (existsSync(yamlFile)) {
    const model = parseSimpleYaml(read(yamlFile));
    for (const role of ['display', 'heading']) {
      const fam = model?.tokens?.typography?.[role]?.family;
      const first = firstFamily(typeof fam === 'string' ? fam : null);
      if (first && BANNED_DISPLAY_FONTS.includes(first)) {
        add('WARN', 'fonts', 'design-model.yaml', `tokens.typography.${role}.family is "${fam}" — ${FONT_WARN_TEXT}`);
      }
    }
  }
  // b) h1 / display-styled rules in each HTML view
  for (const view of HTML_VIEWS) {
    const file = join(dir, view);
    if (!existsSync(file)) continue;
    const css = stripCssComments(getStyleBlocks(read(file)).join('\n'));
    const defs = {};
    let m;
    const defRe = /(--[\w-]+)\s*:\s*([^;}]+)[;}]/g;
    while ((m = defRe.exec(css))) defs[m[1]] = m[2].trim();
    const flagged = new Set();
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    while ((m = ruleRe.exec(css))) {
      const selector = m[1].trim();
      if (selector.startsWith('@')) continue;
      if (!/(^|[^\w-])h1([^\w-]|$)/.test(selector) && !/display/i.test(selector)) continue;
      const fontM = m[2].match(/font-family\s*:\s*([^;]+)/);
      if (!fontM) continue;
      let value = fontM[1].trim();
      // resolve one level of var(--x) indirection (e.g. var(--font-display))
      const varM = value.match(/^var\(\s*(--[\w-]+)/);
      if (varM && defs[varM[1]]) value = defs[varM[1]];
      const first = firstFamily(value);
      if (first && BANNED_DISPLAY_FONTS.includes(first) && !flagged.has(first)) {
        flagged.add(first);
        add('WARN', 'fonts', view, `"${selector}" uses "${first}" as first family — ${FONT_WARN_TEXT}`);
      }
    }
  }
}

// ---------------------------------------------------------------- main

function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node scripts/validate.mjs <path-to-generated-skill-folder>');
    process.exit(2);
  }
  const dir = resolve(arg);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    console.error(`Not a directory: ${dir}`);
    process.exit(2);
  }

  checkYamlParse(dir);

  const presentViews = HTML_VIEWS.filter((v) => existsSync(join(dir, v)));
  if (presentViews.length === 0) {
    add('WARN', 'css-orphans', '(folder)', 'no HTML views found (landing-page / component-library / preview / app-screen) — nothing to check');
  }
  for (const view of presentViews) {
    const html = read(join(dir, view));
    checkCssOrphans(view, html);
    checkCssVars(view, html);
  }

  checkPlaceholders(dir, walkOutputFiles(dir));
  checkEmDashes(dir);
  checkFrontmatter(dir);
  checkContrast(dir);
  checkFonts(dir);

  // ---- report
  console.log(`hue validate — ${dir}\n`);
  if (findings.length === 0) {
    console.log('No findings.');
  }
  for (const f of findings) {
    console.log(`[${f.level}] ${f.check} — ${f.file} — ${f.detail}`);
  }
  const errors = findings.filter((f) => f.level === 'ERROR').length;
  const warns = findings.filter((f) => f.level === 'WARN').length;
  const skips = findings.filter((f) => f.level === 'SKIP').length;
  console.log(`\nSummary: ${errors} error(s), ${warns} warning(s), ${skips} skipped — ${errors > 0 ? 'FAIL' : 'PASS'}`);
  process.exit(errors > 0 ? 1 : 0);
}

main();
