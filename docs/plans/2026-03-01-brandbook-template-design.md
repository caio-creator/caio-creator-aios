# Brandbook One-Page Template — Design Document

**Date:** 2026-03-01
**Author:** @brand-director + @dev
**Status:** Approved

## Overview

Professional HTML/CSS one-page brandbook template for Caio Creator's Creative Hub. Complementary to the existing ID Visual Template — this focuses on narrative storytelling + brand identity presentation.

## Design Concept: "Linear meets Editorial Storytelling"

Dark-first, scroll-driven, config-driven brandbook that combines Linear's minimalist precision with editorial energy from reference brandbooks (GetShake, Juicy, BeCammo, Multversa).

## Target Users

- **Internal:** Caio Creator team (detailed version)
- **Client delivery:** Final brand manual (polished version)

## 12 Sections

1. **Hero/Capa** — Logo, tagline, decorative element
2. **Manifesto** — Drop cap + narrative text
3. **Valores & Pilares** — 3-5 value cards
4. **Tom de Voz** — We are / We are not
5. **Logo** — Preferred, variations, protection, restrictions
6. **Paleta de Cores** — Color grid with names, hex, rgb, copy
7. **Tipografia** — Headline + body fonts, weights, hierarchy
8. **Grafismos & Elementos** — Patterns, textures, graphic elements
9. **Fotografia** — Mood board + style guidelines
10. **Aplicacoes** — Contextual mockups
11. **Resumo Quick Reference** — Summary card
12. **Footer/Credits** — Caio Creator + date

## Design Tokens

- Background: #0A0A0B (near-black)
- Sidebar: #111113
- Text primary: #FAFAFA
- Text secondary: #8B8B8B
- Accent: var(--brand-primary) from config
- Border radius: 12px cards, 8px buttons
- Spacing: 8px base grid
- Font: Inter (Google Fonts)

## Tech Stack

- HTML5 semantic, single-file concept
- CSS vanilla + CSS Variables (dark-first)
- JS vanilla ES6+ (IntersectionObserver, Clipboard API)
- YAML -> JSON pipeline (Python converter)
- Zero external dependencies (except Google Fonts)

## Key Features

- Scroll-reveal animations (CSS + IntersectionObserver)
- Sidebar scrollspy (active section tracking)
- Copy-to-clipboard (colors, fonts)
- Drop cap editorial styling
- Marquee decorative text
- Responsive (desktop, tablet, mobile)
- Config-driven (all content from YAML)

## References

- GetShake Brandbook ID (sidebar + sections structure)
- Juicy Brandbook (dark theme, drop caps, editorial narrative)
- BeCammo Guia de Branding (organized grid, color naming, compact layout)
- Multversa Media Kit (split layout, marquee, premium aesthetic)
- Linear.app (minimalism, typography, spacing, transitions)
