# Design System Documentation

Storybook-powered documentation for the design system components.

## Getting Started

### Installation

```bash
npm install
```

### Development

Run Storybook in development mode on port 6006:

```bash
npm run dev
```

### Build

Build the static Storybook site:

```bash
npm run build
```

### Preview

Preview the built Storybook:

```bash
npm run preview
```

## Structure

- `.storybook/` - Storybook configuration
  - `main.ts` - Main Storybook configuration
  - `preview.ts` - Global preview settings
- `stories/` - Component stories (MDX and TypeScript Story Format)

## Features

- React component documentation
- MDX support for rich documentation
- Accessibility checks with addon-a11y
- Interaction testing
- Auto-generated docs from JSDoc comments

## Dependencies

- React 18.2+
- Storybook 8.0+
- TypeScript 5.0+
