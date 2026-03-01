# ID Visual Template — Quick Start Guide

## Open the Showcase

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Serve locally
python3 -m http.server 8000
# Then visit: http://localhost:8000/
```

## What You'll See

A complete brand identity system for **Dra. Patrícia Luz** including:

- **Logo** — 4 variations (primary, horizontal, vertical, isolated)
- **Colors** — 7-color palette with hex codes & usage guidelines
- **Typography** — Cormorant Garamond + DM Sans with hierarchy
- **Components** — Buttons, cards, badges (copy CSS code)
- **Photography** — Mood guidelines (what to include/avoid)
- **Applications** — 6 mockup examples (email, social, print)
- **Icons** — 12-icon system

## Navigate Using Sidebar

Click the icons to jump to sections:
- 🎯 Logo
- ✍️ Typography
- 🎨 Colors
- ⚙️ Components
- ⭐ Icons
- 📸 Photography
- 📱 Applications

## Switch Themes

- **Light** — Clean, bright design
- **Dark** — High contrast, evening-friendly
- **Brand** — Uses Dra. Patrícia's actual colors

Your choice is saved automatically.

## Copy Colors

Click any hex code (e.g., `#A8D5D1`) to copy to clipboard.
Useful for designers & developers.

## Download Assets

Click **📥 Download ZIP** to get all:
- SVG logos
- color.json
- typography.json
- Full config.json

## Brand at a Glance

| Aspect | Details |
|--------|---------|
| **Name** | Dra. Patrícia Luz |
| **Tagline** | Cuidado, prevenção e bem-estar em cada sorriso |
| **Primary Color** | Aqua Luz (#A8D5D1) |
| **Primary Font** | Cormorant Garamond (serif, elegant) |
| **Secondary Font** | DM Sans (sans-serif, modern) |
| **Personality** | Elegante · Acolhedora · Limpa |
| **Key Value** | Humanized dental care with technical excellence |

## Customize for Your Brand

1. Edit `brand-config.yaml` with your brand data
2. Run: `python3 -m yaml.load < brand-config.yaml | python3 -m json.tool > config.json`
3. Add your logos to `assets/logos/`
4. Add photos to `assets/photography/`
5. Add mockups to `assets/mockups/`
6. Open `index.html` — done!

No code changes needed. The template adapts automatically.

## Learn More

- **Full Guide:** `README.md` (comprehensive documentation)
- **Implementation Details:** `/docs/examples/ID-VISUAL-TEMPLATE-SHOWCASE.md`
- **Brand Guidelines:** `/brand-guidelines/` (positioning, visual-brief, etc.)

---

**Created:** 2026-03-01 | **Status:** Ready to Use | **Browser:** Chrome, Firefox, Safari, Edge
