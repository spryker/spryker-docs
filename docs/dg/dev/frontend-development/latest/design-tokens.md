---
title: Design tokens
last_updated: April 22, 2026
description: Learn how design tokens work in Spryker, where they are configured, and how they are compiled into CSS custom properties during the frontend build.
template: concept-topic-template
---

Design tokens are the single source of truth for visual constants — colors, typography, spacing, radii, shadows, and strokes. They are defined in a JSON file using the [Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/) format and compiled into CSS custom properties (`--*`) that are available globally on `:root`.

For a visual overview of all available tokens and their values, see the [B2B Design Token Reference](https://design-system-xi-lac.vercel.app/).

## How it works

```
design-tokens.json  ──►  style-dictionary  ──►  design-tokens.css  ──►  webpack (critical CSS)
      (source)              (build step)            (generated)             (bundled)
```

1. Tokens are authored in a single JSON file.
2. During the frontend build, [Style Dictionary](https://amzn.github.io/style-dictionary/) reads the JSON and generates a CSS file with custom properties.
3. Webpack includes the generated CSS in the `critical` entry point, so all variables are available on every page.

## File locations

| File                                                              | Purpose                                                           |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `frontend/assets/global/default/design-tokens/design-tokens.json` | Source of truth. This is the only file you edit.                  |
| `frontend/libs/design-tokens.js`                                  | Build script that runs Style Dictionary.                          |
| `src/Pyz/Yves/ShopUi/Theme/{theme}/styles/design-tokens.css`      | Generated output. Do not edit — the build overwrites it on every run. |

{% info_block warningBox "Important" %}
The `.gitignore` file lists the generated `design-tokens.css` files. Only the source `design-tokens.json` stays in version control.
{% endinfo_block %}

## Token categories

The JSON file organizes tokens into six top-level groups.

### Color

Spryker splits colors into two layers:

- **Primitives** (`Color.*`) — raw palettes (`grey`, `blue`, `teal`, `green`, `forest`, `yellow`, `orange`, `red`, `purple`) with shades `25`–`950`, plus `black` and `white`. These are building blocks — avoid using them directly in components.
- **Semantic** (`Semantic Color.*`) — named by intent: `background`, `text`, `border`, `icon`, `focus`, `input`, `header`, `footer`. Each references a primitive. Use these in components.

```scss
color: var(--text-primary);
background-color: var(--background-page);
background-color: var(--background-brand-primary);
border-color: var(--border-default);
```

### Typography

Each text style generates five CSS variables: `--{style}-{scale}-family`, `-weight`, `-size`, `-line-height`, `-letter-spacing`.

| Style     | Scales                                                               |
| --------- | -------------------------------------------------------------------- |
| `heading` | `xl`, `lg`, `md`, `sm`                                               |
| `body`    | `lg`, `md`, `sm`                                                     |
| `label`   | `md`, `sm`, `md-semibold`, `sm-semibold`, `md-regular`, `sm-regular` |
| `button`  | `lg`, `md`, `sm`                                                     |
| `caption` | (single scale)                                                       |
| `price`   | `lg`, `md`, `sm`                                                     |

```scss
font-size: var(--heading-lg-size);
line-height: var(--heading-lg-line-height);
font-weight: var(--heading-lg-weight);
letter-spacing: var(--heading-lg-letter-spacing);
```

### Spacing

A scale based on a 4px grid: `0`, `2`, `4`, `6`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`.

```scss
padding: var(--scale-16);
gap: var(--scale-8);
margin-bottom: var(--scale-24);
```

### Radius

| Token           | Value | Typical use          |
| --------------- | ----- | -------------------- |
| `--radius-none` | 0     | Sharp corners        |
| `--radius-xs`   | 2px   | Subtle rounding      |
| `--radius-sm`   | 4px   | Tags, small elements |
| `--radius-md`   | 8px   | Buttons, badges      |
| `--radius-lg`   | 12px  | Cards, panels        |
| `--radius-full` | 999px | Pills, avatars       |

### Stroke

| Token           | Value |
| --------------- | ----- |
| `--stroke-none` | 0     |
| `--stroke-sm`   | 1px   |
| `--stroke-md`   | 2px   |
| `--stroke-lg`   | 4px   |

```scss
border: var(--stroke-sm) solid var(--border-default);
```

### Shadows

Each shadow scale generates `--shadows-{scale}-x`, `-y`, `-blur`, `-spread`, `-color`. Available scales: `focus`, `sm`, `md`, `lg`, `xl`.

```scss
box-shadow: var(--shadows-sm-x) var(--shadows-sm-y) var(--shadows-sm-blur) var(--shadows-sm-spread)
    var(--shadows-sm-color);
```

## Editing tokens

To change a token value (for example, the primary brand color):

1. Open `frontend/assets/global/default/design-tokens/design-tokens.json`.
2. Find the token and update its `$value`:

```json
"brand": {
    "primary": {
        "$type": "color",
        "$value": "{Color.teal.700}"
    }
}
```

3. Rebuild the frontend — the CSS file is regenerated automatically:

```bash
npm run yves
```

### Adding a new token

Add a new entry anywhere in the JSON structure. The build script flattens nested keys into a kebab-case CSS variable name. The first level of the path is stripped.

Example — adding `"10"` to the spacing scale:

```json
"Spacing": {
    "scale": {
        "10": { "$type": "dimension", "$value": "10px" }
    }
}
```

This generates `--scale-10: 10px;`.

### Token naming convention

The generated variable name follows this pattern:

```
--{path minus first segment, joined by hyphens}
```

| JSON path                     | CSS variable        |
| ----------------------------- | ------------------- |
| `Color.grey.900`              | `--grey-900`        |
| `Semantic Color.text.primary` | `--text-primary`    |
| `Typography.heading.lg.size`  | `--heading-lg-size` |
| `Spacing.scale.16`            | `--scale-16`        |
| `Radius.radius.md`            | `--radius-md`       |
