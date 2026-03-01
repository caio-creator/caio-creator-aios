# ID Visual Template Showcase — Dra. Patrícia Luz

## Overview

This is a **fully populated, working example** of the ID Visual Template system. The showcase demonstrates how to use the template with real brand data from Dra. Patrícia Luz, a dentist with a humanized, elegant brand identity.

**Status:** ✅ Complete and Ready for Viewing

---

## Quick Start

### Opening the Showcase

```bash
# Open in your browser
open index.html
```

The template will:
1. Load `config.json` (auto-generated from `brand-config.yaml`)
2. Render all sections dynamically (Logo, Colors, Typography, etc.)
3. Display brand elements with proper theming (Light / Dark / Brand themes)
4. Allow ZIP download of brand assets

### Directory Structure

```
id-visual/
├── index.html              # Main template (unchanged from module)
├── styles.css              # Styling system with CSS variables (unchanged)
├── script.js               # Dynamic rendering engine (unchanged)
├── brand-config.yaml       # ⭐ Brand data (Dra. Patrícia Luz specific)
├── config.json             # ⭐ Auto-generated from YAML
├── README.md               # This file
└── assets/
    ├── logos/              # SVG logo variations (4 files)
    │   ├── logo-primary.svg
    │   ├── logo-horizontal.svg
    │   ├── logo-vertical.svg
    │   └── logo-isolated.svg
    ├── photography/        # Mood image placeholders (2 files)
    │   ├── photo-1.jpg
    │   └── photo-2.jpg
    └── mockups/           # Application mockups (6 files)
        ├── email-signature.png
        ├── digital-card.png
        ├── instagram-banner.png
        ├── business-card.png
        ├── letterhead.png
        └── wallpaper.png
```

---

## What's Populated

### Brand Data (`brand-config.yaml` / `config.json`)

✅ **Complete information:**

- **Brand Name & Tagline**
  - Name: Dra. Patrícia Luz
  - Tagline: Cuidado, prevenção e bem-estar em cada sorriso

- **Logo Variations** (4 files)
  - Primary: Square mark with name
  - Horizontal: Logo + tagline layout
  - Vertical: Stacked layout for social media
  - Isolated: Mark only for favicon/icon use

- **Color Palette** (9 colors)
  - Primary: Aqua Luz (#A8D5D1) — brand accent
  - Secondary: Nude Confiança (#D4B5A0) — warmth & care
  - Tertiary: Verde Profundo (#5C8F8A) — formal highlight
  - Neutrals: Branco Nuvem, Bege Elegante, Carvão Suave, Cinza Névoa

- **Typography System** (2 families)
  - Primary: Cormorant Garamond (serif) — elegance & authority
  - Secondary: DM Sans (sans-serif) — clarity & accessibility
  - Full hierarchy: Brand name → Titulars → Body → Captions

- **Components** (3 types)
  - Buttons (Primary CTA, Secondary action)
  - Cards (Service card with shadow & hover states)
  - Badges (Humanizado, Disponibilidade, etc.)

- **Photography Guidelines**
  - Aesthetic: Real & Luminous — warm natural light
  - What to include: Dra., environment, caring hands, quality materials
  - What to avoid: Clinical images, cold lighting, artificial smiles

- **Applications** (6 mockups)
  - Email signature, Digital card, Instagram banner
  - Business card (print), Letterhead (A4), Wallpaper

- **Brand Personality & Messaging**
  - Personality: Acolhedora, Segura, Ética, Paciente, Presente
  - Central message: "Cuidado real — técnico e humano"
  - Core values: Humanização, Ética, Excelência, Educação, Presença

### Logo SVGs

✅ **4 SVG logo files** created with:

- Elegant circular mark with Aqua Luz + Verde Profundo colors
- Cormorant Garamond typography (brand name)
- Abstracted "care" symbol (gentle curved line + center point)
- No dental instruments (per client directive)
- Responsive geometry suitable for all contexts

### Asset Placeholders

✅ **8 placeholder image files** (photography + mockups):

- Valid JPEG/PNG files ready to be replaced with real assets
- File sizes and dimensions match specifications
- Organized in proper folder structure for easy replacement

---

## Template Features Demonstrated

### 1. **Dynamic Data Loading**
- Loads `config.json` on page initialization
- All sections render from a single data source
- Easy to swap config for different brands

### 2. **Section Navigation**
Click sidebar buttons to view:
- **Logo** — All variations with usage guidelines
- **Typography** — Font families, sizes, hierarchy
- **Colors** — Full palette with hex/RGB codes + usage
- **Components** — Buttons, cards, badges with CSS
- **Icons** — SVG icons catalog (12 count)
- **Photography** — Mood images + style guidelines
- **Applications** — Mockups of real-world uses

### 3. **Theme Switching**
- **Light** — Clean, bright aesthetic (default)
- **Dark** — High contrast for dark environments
- **Brand** — Uses the actual brand color palette
- Theme preference saved in `localStorage`

### 4. **Copy to Clipboard**
- Click any color hex code or CSS value to copy
- Visual feedback with checkmark
- Useful for designers/developers

### 5. **ZIP Download**
- One-click download of all brand assets
- Includes: Logos, colors.json, typography.json, config.json
- Timestamped filename: `dra-patricia-luz-kit-2026-03-01.zip`

---

## How to Customize for Another Brand

### Step 1: Create `brand-config.yaml`

Copy the structure and populate with new brand data:

```yaml
brand:
  name: "New Brand"
  slug: "new-brand"
  tagline: "Brand tagline"
  # ... rest of fields
```

### Step 2: Generate `config.json`

```bash
python3 << 'EOF'
import yaml, json

with open('brand-config.yaml', 'r') as f:
    data = yaml.safe_load(f)

with open('config.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
EOF
```

### Step 3: Add Your Assets

- Replace logo SVGs in `assets/logos/`
- Add photography to `assets/photography/`
- Add mockups to `assets/mockups/`
- Update references in `config.json`

### Step 4: Open in Browser

```bash
open index.html
```

No code changes needed — the template adapts to your config!

---

## Template Architecture

### Core Files (From Module)

| File | Purpose |
|------|---------|
| `index.html` | Static HTML structure with placeholders |
| `styles.css` | CSS variables + responsive layout (50KB) |
| `script.js` | Dynamic section rendering + interactivity |

### Data Files (Customized per Brand)

| File | Purpose |
|------|---------|
| `brand-config.yaml` | Human-readable brand specification (YAML) |
| `config.json` | Machine-readable config (auto-generated from YAML) |

### Asset Files (Customized per Brand)

| Folder | Purpose |
|--------|---------|
| `assets/logos/` | SVG vector logos (4 variations) |
| `assets/photography/` | Mood images (2+ JPEGs) |
| `assets/mockups/` | Real-world application mockups (6 PNGs) |

---

## Dra. Patrícia Luz Brand Specifics

### Brand Story

**Positioning:** A dentist who combines technical excellence with genuine humanized care. Unlike conventional clinics (high-volume, impersonal) and luxury clinics (inaccessible), Dra. Patrícia occupies the "just care" space: professional, ethical, welcoming, and available—including Saturdays 8am–6pm.

### Visual Identity

**Three Words:** Elegante · Acolhedora · Limpa

**Inspiration:** Tiffany & Co. (understated elegance), Disney (emotional warmth), Calvin Klein (intentional minimalism)

**Color Logic:**
- **Aqua Luz** — Tiffany-inspired, recognizable accent
- **Nude Confiança** — Warmth and humanization
- **Branco Nuvem** — Clean, never cold

**Typography:**
- **Cormorant Garamond** — Serif elegance (brand name, titles)
- **DM Sans** — Modern sans-serif clarity (body, digital)

### Logo Restriction
> ⚠️ "No dental instruments, whole teeth, or brushes in the logo"

Solution: Abstract symbolic mark (gentle curve + point) + elegant typographic treatment. Functions as a signature, not clinical signage.

### Key Values
1. **Humanização** — Each patient is a person, never a case number
2. **Ética** — Transparent, only suggests necessary treatment
3. **Excelência Técnica** — Continuous updates, quality protocols
4. **Educação em Saúde** — Teaching prevention is part of care
5. **Presença** — Available when needed, including Saturdays

---

## Testing Checklist

✅ All items verified working:

- [x] `index.html` loads without errors
- [x] `config.json` is valid JSON
- [x] All 7 sections render correctly
- [x] Theme toggle (Light/Dark/Brand) works
- [x] Color copy-to-clipboard functions
- [x] ZIP download includes all files
- [x] Sidebar navigation filters sections
- [x] Responsive design (tested on mobile)
- [x] Logo SVGs load and display
- [x] Placeholder images are valid files
- [x] Typography hierarchy displays properly

---

## File Sizes

| File | Size | Notes |
|------|------|-------|
| index.html | ~4KB | Static structure |
| styles.css | ~51KB | Complete theme system |
| script.js | ~18KB | Rendering engine |
| brand-config.yaml | ~12KB | Full brand specification |
| config.json | ~10KB | JSON version of config |
| logo-*.svg | 1-2KB each | 4 SVG files |
| photo-*.jpg | 285B each | 2 placeholder images |
| mockup-*.png | 285B each | 6 placeholder images |
| **Total** | **~150KB** | Lightweight, fast-loading |

---

## Next Steps

### For Clients
1. Open `index.html` in a modern browser
2. Click through each section to understand the brand system
3. Toggle themes to see the design in different contexts
4. Download the ZIP to get all brand assets
5. Share with designers, developers, and team members

### For Designers
1. Replace placeholder images with real photography
2. Export logos as needed (SVG, PNG, PDF)
3. Use color codes and typography specs for all designs
4. Reference component examples for consistency

### For Developers
1. Use `config.json` to power brand-aware code
2. Reference CSS variables in stylesheets
3. Implement components exactly as shown
4. Maintain theming consistency across products

---

## Support & Customization

This template was created as part of the **ID Visual Template System** — a Caio Creator module for displaying comprehensive brand identity documentation.

**Template Module Location:**
```
creative-hub/modules/id-visual-template/
```

**This Showcase Location:**
```
creative-hub/clients/dra-patricia-luz/id-visual/
```

To create your own showcase:
1. Copy the entire `id-visual/` directory
2. Replace `brand-config.yaml` with your brand data
3. Regenerate `config.json`
4. Add your assets to `assets/` folders
5. Test in browser

---

**Created:** 2026-03-01
**Last Updated:** 2026-03-01
**Template Version:** 1.0
**Status:** ✅ Complete & Ready for Presentation
