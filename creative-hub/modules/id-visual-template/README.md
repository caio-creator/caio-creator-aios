# ID Visual One-Page Template

Enterprise-grade HTML template for brand identity presentations.

## Quick Start

### 1. Copy template to your client folder

```bash
cp -r modules/id-visual-template/ clients/my-client/id-visual/
cd clients/my-client/id-visual/
```

### 2. Create brand configuration

```bash
cp ../../../modules/id-visual-template/example-config.yaml brand-config.yaml
# Edit brand-config.yaml with your client data
```

### 3. Convert YAML to JSON

```bash
python ../../../modules/id-visual-template/yaml-to-json.py brand-config.yaml
```

### 4. Add assets

Create assets folder structure:
- assets/logo-*.svg
- assets/photography/
- assets/mockups/

### 5. Open in browser

```bash
open index.html
# or use local server
python -m http.server 8000
```

## Features

✨ **Interactive Dashboard**
- Theme toggle (Dark/Light/Brand)
- Copy-to-clipboard for colors, specs, code
- Download ZIP with all assets
- Responsive design (mobile, tablet, desktop)
- Sidebar search/filter

📊 **7 Comprehensive Sections**
1. Logo — Variations and downloads
2. Typography — Fonts, weights, sizes
3. Palette — Colors with hex/RGB
4. Components — UI elements with code
5. Icons — Icon grid with copy
6. Photography — Mood board + guidelines
7. Applications — Final mockups

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Performance

- Zero build step
- ~15KB JS + ~10KB CSS
- No frameworks
- Loads config.json asynchronously

## Troubleshooting

**Config not loading?**
- Check config.json exists
- Use `python -m http.server` instead of file://
- Check browser console for errors

**Images not showing?**
- Verify asset paths in brand-config.yaml
- Use relative paths (assets/logo.svg)

**ZIP download fails?**
- Check browser console
- Ensure all asset files exist

---

Created with Caio Creator Hub
