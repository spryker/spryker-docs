---
title: Integrate automated SVG sprite extraction
description: Learn how to enable automated SVG sprite extraction
last_updated: May 26, 2025
template: feature-integration-guide-template
---

## Integrate Automated SVG Icon Sprite Extraction

This guide helps you enable automated SVG sprite extraction for scalable icon management in your Spryker Yves project.

---

### 1. Update `composer.json` to require the right ShopUi version

Make sure you have at least the following version:
```bash
composer require spryker-shop/shop-ui:^1.93.1
```

---

### 2. Add or Update the Icon Sprite Twig File

**File:**  
`src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon-sprite/icon-sprite.twig`

**Content:**
```twig
...
{% define data = {
    isSpriteGenerationEnabled: true,
} %}
...
```

> This file should contain all your SVG `<symbol>` definitions, wrapped in `{% apply spaceless %} ... {% endapply %}`.

_Example structure:_
```twig
{% apply spaceless %}
  <symbol id="icon-example" viewBox="0 0 24 24">
    <!-- SVG content -->
  </symbol>
  {# Add more <symbol> elements here #}
{% endapply %}
```
_Update or add your individual symbols as needed._

---

### 3. Add or Update the Icon Component Twig File

**File:**  
`src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon/icon.twig`

**Content:**
```twig
{% extends atom('icon', '@SprykerShop:ShopUi') %}

{% define data = {
    name: required,
    isSpriteGenerationEnabled: true,
} %}
```

---

### 4. Add the Icon Sprite Extractor Script

**File:**  
`frontend/libs/icon-sprite-extractor.js`

**Content:**
```js
const fs = require('fs').promises;
const path = require('path');
const { existsSync } = require('fs');

/**
 * Extracts SVG sprites from the first available Twig file and saves them to the target location
 * @param {Object} options Configuration options
 * @param {string|string[]} options.sourcePath Path or paths to the source Twig file(s)
 * @param {string} options.targetPath Path where the SVG file should be saved
 * @returns {Promise<void>}
 */
const extractIconSprites = async ({ sourcePath, targetPath }) => {
    try {
        console.info('Extracting icon sprites...');

        const sourcePaths = Array.isArray(sourcePath) ? sourcePath : [sourcePath];
        let twigContent = null;
        let usedPath = null;

        for (const path of sourcePaths) {
            if (existsSync(path)) {
                twigContent = await fs.readFile(path, 'utf8');
                usedPath = path;
                console.info(`Using icon sprite from: ${path}`);
                break;
            }
        }

        if (!twigContent) {
            throw new Error('None of the provided icon sprite paths exist');
        }

        const spacelessRegex = /{% apply spaceless %}([\s\S]*?)(?:{% endapply %}|$)/;
        const match = twigContent.match(spacelessRegex);

        if (!match || !match[1]) {
            throw new Error(`Could not find content within spaceless block in the Twig file: ${usedPath}`);
        }

        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
${match[1]}
</svg>`;

        const targetDir = path.dirname(targetPath);
        await fs.mkdir(targetDir, { recursive: true });

        await fs.writeFile(targetPath, svgContent, 'utf8');

        console.info('Icon sprites successfully extracted to', targetPath);
    } catch (error) {
        console.error('Error extracting icon sprites:', error.message);
    }
};

module.exports = extractIconSprites;
```

---

### 5. Update Frontend Settings

**File:**  
`frontend/settings.js`

**Add the following inside your `globalSettings` paths:**
```js
    iconSprite: {
        sources: [
            './src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon-sprite/icon-sprite.twig',
            './vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/atoms/icon-sprite/icon-sprite.twig',
        ],
        target: './frontend/assets/global/default/icons/sprite.svg',
    },
```
**And inside `getAppSettingsByTheme`:**
```js
    iconSprite: globalSettings.paths.iconSprite,
```

---

### 6. Update the Frontend Build Config

**File:**  
`frontend/configs/development.js`

**Add or update:**
```js
let isExtractIconSpritesEnabled = false;
let extractIconSprites = null;

try {
    extractIconSprites = require('../libs/icon-sprite-extractor');
    isExtractIconSpritesEnabled = true;
} catch (e) {
    console.info('Icon sprite extraction is disabled.');
}

const getConfiguration = async (appSettings) => {
    // ...existing code...

    if (isExtractIconSpritesEnabled) {
        try {
            await extractIconSprites({
                sourcePath: appSettings.paths.iconSprite.sources.map((src) => join(process.cwd(), src)),
                targetPath: join(process.cwd(), appSettings.paths.iconSprite.target),
            });
        } catch (error) {
            console.error('Error extracting icon sprites:', error);
        }
    }

    // ...rest of your function...
};
```

---

### 7. Update `.gitignore`

Add this line to avoid committing the generated sprite:

```
/frontend/assets/global/default/icons/sprite.svg
```

---

### 8. Rebuild the Frontend

Run:
```bash
console frontend:project:install-dependencies
console frontend:yves:build -e production
```

### 9. Rebuild twig cache
```bash
console t:c:w
```

---

**You’re all set!**  
The system now automatically extracts SVG symbols from your Twig file and generates a sprite for use in the frontend. Icons can be managed simply by editing `icon-sprite.twig` and running the build.