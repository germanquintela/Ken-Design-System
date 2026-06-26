# Ken — Design System

Ken is an **LLM-safe design system** built with **StyleX**: it recreates Ramp's identity and **re-themes per brand** (Ramp / Span / Canals) by remapping tokens, without touching a single component. It ships as a **Geist-style docs site** (vercel.com/geist) and includes an **AI builder** that generates UI from the DS components and lets you copy the code.

**pnpm monorepo:**
- `ken/` — the **`@ken/react`** package: `components/` (~36 comps) + `theme/` (tokens) + `recipes/`. The DS library, consumed as *source* (`workspace:*` + `transpilePackages`).
- `ai/` — **`@ken/ai`**: the AI builder engine (`catalog/` · `prompt/` · `spec/` · `stream/`).
- `playground/` — the **Next.js** (App Router) app that surfaces everything: docs site + playground + AI builder.
- **Storybook** is Ken's isolated workbench (`pnpm storybook`, port 6006; one co-located `*.stories.tsx` per component).

Typography: **Lausanne** (Ramp's custom face; **Inter** as the open fallback) is loaded by the app via `next/font/local` and exposed as a CSS var; Ken's token only references that var (framework-agnostic contract).

---

## Stack

- **Next.js** App Router — collapses the AI builder backend into API routes (no separate project) and is natural for Geist-style docs.
- **StyleX** via **`@stylexswc/nextjs-plugin`** (SWC compiler). ⚠️ The `@stylexjs/postcss-plugin` alone is NOT enough: `defineVars` must be compiled or it throws `Unexpected 'stylex.defineVars' call at runtime`. Import tokens **directly from the `.stylex.ts`**, never from the `index.ts` barrel.
- **Base UI** (`@base-ui-components/react`) — the headless primitive under EVERY component (a11y/focus/keyboard for free).
- **Lucide** — icons (re-styled to Ramp).
- **Biome** — format + lint (`pnpm check` / `lint` / `format`).
- Dev: `pnpm dev` (delegates to `playground`).

---

## The thesis: LLM-safe (Orbit) + StyleX as gatekeeper

1. **Decisions, not values.** Tokens encode the *why* (`backgroundSurface`, `textPrimary`), not the hex. Nobody uses a loose gray.
2. **CI as contract.** "Docs are a suggestion, CI is a contract." **Biome** + `tsc` make compliance non-negotiable.
3. **No escape hatches.** No raw `<div>`: everything goes through a polymorphic, typed `<Box as=… />` where autocomplete only shows valid tokens.
4. **The type system is the API.** Tokens are typed TS modules (`*.stylex.ts`) that compile to CSS custom properties. No `tailwind.config`, no runtime getters — `space`/`color` only accept defined keys.

> **Light-mode only by decision** — tokens hold flat values, no `light-dark()`.

---

## Tokens — `ken/theme/`

Two layers (primitive → semantic) + foundations.

```
ken/theme/
  core/palette.stylex.ts    PRIVATE primitives (obsidian, charcoal, limestone…). A component NEVER imports these.
  tokens/                   SEMANTIC — the public API (the "why")
    color.stylex.ts           backgroundPage/Surface, textPrimary/Body, borderDefault, accent… (flat values)
    typography.stylex.ts      fontSans/Mono, fontSize*, fontWeight*, lineHeight*, tracking*
    space.stylex.ts           space1..N (multiples of 4, no loose px)
    radius · elevation · motion · zIndex · avatarTint
  foundations/              CROSS-CONTROL recipes (used by many components)
    focusRing · iconSize (+ ControlSize sm/md/lg union) · field (text-control shell) · overlay (menus/selects) · breakpoint
  index.ts                  re-exports ONLY semantics + foundations (NEVER core/)
```

**Rules:** a component never touches `core/` or a raw hex/px — only semantic tokens and foundations. If a token is missing to express the design, **add it to the token layer** (not inline).

**Re-theming:** since these are CSS custom properties underneath, you re-theme per brand by remapping tokens (or overriding the CSS vars at runtime for the playground's custom mode) — **without touching a component**. That's the strategic value for Ramp / Span / Canals.

---

## Where styling lives

- **Component family** → `ken/recipes/<x>Recipe.ts` (e.g. `buttonRecipe.ts` → Button/LinkButton/IconButton).
- **Cross-control** (any control uses it) → `ken/theme/foundations/*`.
- **Single component** → co-located `<Component>.styles.ts`.
- Heuristic: family → `recipes/`; any control → `foundations/`; just one → co-located. **Rule of second use:** don't abstract on the first.
- ⚠️ StyleX merges **last-wins per key** → keep each color property in ONE owner, with its `default`/`:hover`/`:disabled` together (otherwise a later pseudo wipes the default → black border, etc.).

---

## Component playbook

1. **Headless base: always Base UI.** Even when it looks trivial (yes, even Button). Strip `className`/`render` from the public API and pour `stylex.props(...)` onto the primitive. `'use client'` at the top (Base UI is client). Gotchas (seen on Button): `Button.Props` is a native|non-native union (`Extract<…, { nativeButton?: true }>`); cast `ref as Ref<HTMLElement>`; keep the native `disabled` so the recipe's `:disabled` fires.
2. **Semantic tokens only**, everything a multiple of 4. Documented one-off exceptions: control heights / the odd decorative effect.
3. **States & interaction.** Hover/active **always** guarded with `:not(:disabled)`. Motion (Emil's skill): hover/color → `ease` ~200ms; press → `scale(0.97)` on `:active` ~140ms; **explicit** properties (never `transition: all`); everything < 300ms. Tints → `color-mix(in srgb, <token> N%, transparent)`.
4. **Stories = workbench.** A co-located `<Component>.stories.tsx`, CSF3 (`satisfies Meta`, `tags: ['autodocs']`): Playground (controls) + one story per axis.
5. **Exports.** Re-export the component + its types from `<Component>/index.ts` **and** from `ken/index.ts`.
6. **Gate (always).** Before a component is "done", both `tsc --noEmit -p ken/tsconfig.json` and `pnpm build-storybook` must pass (the build compiles StyleX via Babel and validates the stories).
7. **From Figma to Ken: decisions, not values.** The Figma may come off-grid / in another typeface. Map each value to a semantic token, don't copy the hex/px. Flag the judgment calls (sizing, missing tokens, unspecified hovers) to the user before coding.

---

## Playground (`playground/`)

- **Geist-style docs site** — Foundations + one page per component, with live preview + snippet + machine-readable `.md` version (append `.md` to the URL). They explain the **why**, not just the what. The app shell (Sidebar/Topbar) is also the site's chrome.
- **AI builder** (`@ken/ai`) — a chat that, from a prompt, generates UI with the DS components and lets you copy the code.
- App convention: `src/containers/` = one container per page; `src/components/` = screen compositions.
