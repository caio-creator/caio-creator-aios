# Brandbook — Caio Creator

## Overview

This is a **fully populated, working example** of the Brandbook Template system. It demonstrates how to use the template with real brand data from Caio Creator — a creative studio focused on intentional design and strategic storytelling.

**Status:** ✅ Complete and Ready for Viewing

---

## Quick Start

### Opening the Brandbook

```bash
# Open in your browser
open index.html
```

The template will:
1. Load `config.json` (auto-generated from `brand-config.yaml`)
2. Render all 12 sections dynamically
3. Display brand narrative, values, and identity system
4. Apply Caio Creator's color scheme and typography

### Directory Structure

```
brandbook/
├── index.html              # Template structure (12 sections)
├── styles.css              # Styling system (unchanged from module)
├── script.js               # Dynamic rendering engine (unchanged)
├── brand-config.yaml       # 🔴 Caio Creator brand data (YAML source)
├── config.json             # 🔴 Auto-generated from YAML
├── README.md               # This file
├── QUICKSTART.md           # Setup instructions for new brands
└── assets/
    ├── logos/              # Logo variations
    │   ├── logo-primary.svg
    │   ├── logo-horizontal.svg
    │   ├── logo-vertical.svg
    │   └── logo-icon.svg
    ├── patterns/           # Graphic patterns
    │   ├── pattern-geometric.svg
    │   └── texture-subtle.svg
    ├── photography/        # Mood board images
    │   ├── mood-creative-01.jpg
    │   └── mood-creative-02.jpg
    └── mockups/            # Application examples
        ├── businesscard.png
        ├── email-signature.png
        ├── instagram-post.png
        ├── website-header.png
        └── presentation-slide.png
```

---

## What's Populated

### Brand Data (`brand-config.yaml` / `config.json`)

✅ **Complete information:**

#### Brand Identity
- **Name:** Caio Creator
- **Tagline:** "Conteúdo com critério. Design com propósito."
- **Essence:** Intentional creativity, strategic design, authentic partnership

#### Manifesto
Deep narrative about Caio Creator's design philosophy:
> "Criatividade Intencional" — every project is an opportunity to create something that truly matters. Strategy meets aesthetic sensitivity.

#### Values (4 Core Pillars)
1. **🎯 Intencionalidade** — Purpose-driven decisions
2. **🔍 Visão Crítica** — Critical evaluation of trends
3. **🤝 Parceria Autêntica** — Genuine collaboration
4. **⚡ Excelência em Execução** — Quality delivery

#### Voice & Tone
- **We are:** Direct, accessible, strategic, technical but humanized
- **We are not:** Corporate, generic, impersonal, stuck in the past
- **Examples:** How Caio Creator communicates in different contexts (social, presentations, client communication)

#### Logo System (4 Variations)
- **Primary:** Full logo with name
- **Horizontal:** Landscape layout
- **Vertical:** Stacked layout for social media
- **Icon:** Mark only for avatars/favicon

#### Color Palette (9 Colors)
- **Primary:** Criação Azul (#2563EB) — Trust, knowledge, innovation
- **Primary Dark:** Criação Escuro (#1E40AF) — Depth & contrast
- **Secondary:** Energia Laranja (#F97316) — Energy & creativity
- **Secondary Light:** Energia Claro (#FED7AA) — Soft highlights
- **Neutrals:** Preto Profundo, Cinza Escuro, Cinza Médio, Branco Puro — Full spectrum

#### Typography System
- **Headline Font:** Inter Bold / Extra Bold (700, 900 weights)
  - Sizes: 64px, 48px, 36px, 28px, 24px, 20px
  - Modern, geometric, highly readable

- **Body Font:** Inter Regular / Medium (400, 500, 600 weights)
  - Sizes: 18px, 16px, 14px, 13px, 12px
  - Excellent readability at any size

#### Graphic Elements
- **Pattern Principal:** Geometric pattern for backgrounds
- **Texture Subtle:** Noise texture for digital depth

#### Photography Style
- **Philosophy:** Authentic, intentional, connected
- **Characteristics:** Natural lighting, clean composition, real people/moments, palette-aligned
- **Mood Board:** 2 example photos showing the aesthetic

#### Applications (5 Real-World Uses)
1. **Business Card** — Vertical layout, blue background
2. **Email Signature** — Horizontal, minimal, professional
3. **Instagram Post** — Square format, content-focused
4. **Website Header** — Clean, navigation-integrated
5. **Presentation Slide** — Title + content layouts

#### Quick Reference Summary
Essential brand elements at a glance:
- Primary color, secondary color, fonts, tone, concept, year

---

## Key Features

✅ **Sidebar Navigation** — Smooth scrollspy between sections
✅ **Scroll Animations** — Fade-in reveals as you scroll
✅ **Copy-to-Clipboard** — One-click hex/RGB copying
✅ **Responsive Design** — Desktop, tablet, mobile optimized
✅ **Dark Theme** — Professional dark-first aesthetic
✅ **Zero Dependencies** — Pure HTML/CSS/JS + Google Fonts

---

## How to Modify This Example

To update Caio Creator's brand data:

1. **Edit brand-config.yaml**
   ```yaml
   brand:
     name: Updated Name
     tagline: Updated tagline
   ```

2. **Regenerate config.json**
   ```bash
   python3 yaml-to-json.py brand-config.yaml config.json
   ```

3. **Replace assets/**
   - New logos in `assets/logos/`
   - New patterns in `assets/patterns/`
   - New photos in `assets/photography/`
   - New mockups in `assets/mockups/`

4. **Refresh browser**
   ```bash
   open index.html  # or press Cmd+Shift+R to clear cache
   ```

---

## Creating Your Own Brandbook

To create a brandbook for a different client:

```bash
# 1. Copy this directory
cp -r creative-hub/clients/caio-creator/brandbook \
      creative-hub/clients/{your-slug}/brandbook

# 2. Edit brand-config.yaml with your data
# 3. Generate config.json
python3 yaml-to-json.py brand-config.yaml config.json

# 4. Replace assets/
# 5. Open in browser
open index.html
```

See the main module [README.md](../../modules/brandbook-template/README.md) for complete documentation.

---

## File Ownership

| File | Purpose | Mutable? |
|------|---------|----------|
| `index.html` | Module template | ❌ NO (reuse) |
| `styles.css` | Module styling | ❌ NO (reuse) |
| `script.js` | Module renderer | ❌ NO (reuse) |
| `yaml-to-json.py` | Module converter | ❌ NO (reuse) |
| `brand-config.yaml` | Caio Creator data | ✅ YES |
| `config.json` | Generated from YAML | ✅ YES (auto) |
| `assets/` | Caio Creator logos/images | ✅ YES |
| `README.md` | This file | ✅ YES (document) |

---

## Troubleshooting

**Q: Images not loading?**
- Check that all image files exist in `assets/`
- Verify paths match in `brand-config.yaml`

**Q: Styles look wrong?**
- Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check that `styles.css` loaded (DevTools → Network tab)

**Q: Python converter not found?**
- Ensure Python 3.6+ is installed: `python3 --version`
- Run from the brandbook directory: `cd creative-hub/clients/caio-creator/brandbook/`

---

## Next Steps

1. ✅ View the brandbook in browser
2. 📋 Iterate on data in `brand-config.yaml`
3. 🖼️ Replace assets with final versions
4. 📤 Share with team or client
5. 📦 Archive or deploy final version

---

## Version Info

| Item | Value |
|------|-------|
| Brandbook Module | v1.0 |
| Example Client | Caio Creator |
| Created | 2026-03-01 |
| Status | Production Ready |

---

**Built with craft and intention. Part of Creative Hub, Caio Creator's AI-Orchestrated System.** 🎨

For module documentation, see: [Module README](../../modules/brandbook-template/README.md)
