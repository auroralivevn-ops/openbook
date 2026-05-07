# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Production build → dist/
npm run lint     # ESLint on all JS/JSX files
npm run preview  # Preview the production build
```

## Architecture

Single-page React 19 application built with Vite. Currently a landing page — no router, no global state management, no data fetching layer.

```
src/
  main.jsx      # Entry: React 19 StrictMode render
  App.jsx       # Root component
  index.css     # Global styles + Tailwind directives (@tailwind base/components/utilities)
  App.css       # Component-level styles and animations
  assets/       # SVGs and images
```

## Styling

The project uses **Tailwind CSS** as the primary styling tool, extended with a custom design system ("Book Hồng Hà") in `tailwind.config.js`:

**Custom color palette (prefix `hh-`):**
- `hh-red` / `hh-red-dark` / `hh-red-light` — primary brand (#C8102E)
- `hh-yellow` / `hh-yellow-light` / `hh-yellow-warm` — warm accent (#F5B700)
- `hh-blue` / `hh-blue-light` — secondary (#1B4D7C)
- `hh-green` / `hh-green-light` — CTA (#2D8659)
- `hh-brown` / `hh-brown-light` — earthy (#8B5E3C)
- `hh-cream` — background (#FFF8EC)

**Custom utilities:**
- `text-shadow-soft` / `text-shadow-strong` — text shadows
- `scrollbar-hide` — cross-browser scrollbar hiding
- `bg-sunrise` — brand gradient (135deg, dark red → orange)
- `bg-gold-glow` — radial glow gradient
- `bg-green-cta` — button gradient

**Custom animations:** `animate-float` (3s vertical loop), `animate-glow` (2s opacity pulse)

**Font:** Be Vietnam Pro (Google Fonts), fallback system-ui.

Use Tailwind utilities for layout/spacing; use `App.css` only for complex animations or positioning that Tailwind can't handle cleanly. CSS custom variables for theme colors are defined in `App.css`.

## ESLint

Flat config format (ESLint v10+). Enforces React Hooks rules and React Refresh compatibility. The `dist/` directory is ignored.
