# Brandbook Template — Quick Start Guide

Get a branded brandbook live in **5 minutes**.

---

## 1. Copy Template (1 min)

```bash
cp -r creative-hub/modules/brandbook-template \
      creative-hub/clients/{your-slug}/brandbook
cd creative-hub/clients/{your-slug}/brandbook
```

Replace `{your-slug}` with your client folder (e.g., `caio-creator`, `getshake`, etc.)

---

## 2. Update Brand Data (2 min)

Edit `brand-config.yaml` with your client's information:

```yaml
brand:
  name: Your Brand Name
  tagline: Your brand tagline
  logo: assets/logo-primary.svg
  year: 2026

manifesto:
  title: Your Brand Story
  text: |
    Write your brand narrative here.
    This will be displayed with drop cap styling.

values:
  - icon: 🎯
    title: Value 1
    description: Description of what this value means
  - icon: 🔥
    title: Value 2
    description: Description of what this value means
```

Full schema in the main [README.md](README.md).

---

## 3. Generate JSON (1 min)

```bash
python3 yaml-to-json.py brand-config.yaml config.json
```

This converts your YAML to JSON that the template loads.

---

## 4. Add Assets (1 min)

Replace files in `assets/`:

```
assets/
├── logo-primary.svg        # Your main logo
├── logo-horizontal.svg     # Horizontal variant
├── logo-vertical.svg       # Vertical/stacked variant
├── logo-mono.svg           # Monochrome version
├── pattern-01.svg          # Graphic pattern
├── pattern-02.svg          # Secondary pattern
├── photo-01.jpg            # Mood image 1
└── photo-02.jpg            # Mood image 2
```

All paths reference from `config.json`.

---

## 5. View in Browser (1 min)

```bash
open index.html
```

That's it! Your brandbook is live.

---

## What You'll See

✅ Sidebar with scrollspy navigation
✅ Hero section with logo and tagline
✅ Animated scroll reveals
✅ All 12 sections populated from your data
✅ Copy-to-clipboard for colors, fonts
✅ Responsive mobile layout
✅ Dark theme optimized for readability

---

## Common Customizations

### Change Brand Color

Edit `styles.css`:

```css
:root {
  --brand-primary: #YOUR_HEX_HERE;
}
```

### Add More Values/Examples

Edit `brand-config.yaml`:

```yaml
values:
  - icon: 🎯
    title: Value 1
    description: Desc 1
  - icon: 🔥
    title: Value 2
    description: Desc 2
  - icon: 🤝
    title: Value 3
    description: Desc 3
```

Then regenerate: `python3 yaml-to-json.py brand-config.yaml config.json`

### Update Color Palette

In `brand-config.yaml`:

```yaml
colors:
  primary:
    - name: Primary Brand
      hex: '#6366F1'
      rgb: '99, 102, 241'
  secondary:
    - name: Accent
      hex: '#F59E0B'
      rgb: '245, 158, 11'
  neutral:
    - name: Dark Gray
      hex: '#27272A'
      rgb: '39, 39, 42'
```

---

## File Organization

Only these files need updating per-client:

| File | Mutable? | Notes |
|------|----------|-------|
| `brand-config.yaml` | ✅ YES | Your brand data |
| `config.json` | ✅ YES (auto-generated) | Regenerate after YAML changes |
| `assets/` | ✅ YES | Replace with client logos/images |
| `index.html` | ❌ NO | Module template, reuse as-is |
| `styles.css` | ❌ NO | Module styling, reuse as-is |
| `script.js` | ❌ NO | Module renderer, reuse as-is |
| `yaml-to-json.py` | ❌ NO | Module converter, reuse as-is |

---

## Deployment

### Local Testing
```bash
open index.html
```

### GitHub Pages (if needed)
```bash
# All files are static — just push and enable Pages
git add creative-hub/clients/{your-slug}/brandbook/
git commit -m "feat: add brandbook for {your-slug}"
git push
```

---

## Troubleshooting

**Q: Images not loading?**
- Check that `assets/` files match paths in `config.json`
- Ensure image files exist in correct folder

**Q: JSON syntax error?**
- Run validator: `python3 -m json.tool config.json`
- Check for trailing commas in YAML → JSON conversion

**Q: Styles look wrong?**
- Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check that `styles.css` loaded (DevTools → Network tab)

**Q: Python converter not found?**
- Ensure Python 3.6+ installed: `python3 --version`
- Run from the brandbook directory: `cd creative-hub/clients/{slug}/brandbook/`

---

## Next Steps

1. ✅ Your brandbook is live
2. 📋 Share with client for feedback
3. 🔄 Update data iteratively in `brand-config.yaml`
4. 📦 Export or archive final version

---

**Need help?** Check the full [README.md](README.md) for complete documentation.

Happy branding! 🎨
