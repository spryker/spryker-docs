---
title: Integrate automated SVG sprite extraction
description: Learn how to enable automated SVG sprite extraction
last_updated: May 26, 2025
template: feature-integration-guide-template
---

Integrate Automated SVG Icon Sprite Extraction

This guide helps you enable automated SVG sprite extraction for scalable icon management in your Spryker Yves project.

---

1. Update `composer.json` to require the right ShopUi version

Make sure you have at least the following version:
```bash
composer require spryker-shop/shop-ui:^1.93.1
```

---

2. Create an svg sprite file at /frontend/assets/global/default/icons/sprite.svg.

3. Put your SVG icons into the `sprite.svg` file. Get all the symbols from the `src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon-sprite/icon-sprite.twig` file and put it into newly created /frontend/assets/global/default/icons/sprite.svg:

**File:**
`/frontend/assets/global/default/icons/sprite.svg`

**Content Example:**

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
    <!-- Put SVG icons here -->
</svg>
```

4. Add or Update the Icon Component Twig File

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

5. Use the icon component in your Twig templates:

The new approach uses a pre-generated or manually created SVG sprite. You no longer need to maintain or update `icon-sprite.twig`.

**Usage Example:**

The usage of the new svg sprite is still working in the same way:

```twig
{% include atom('icon') with {
    data: {
        name: 'search',
    },
} only %}```

---

6. Customizing the Sprite Path (Optional)

If your sprite is located at a different path, you can create or update an `icon.twig` component to use a custom path:

**File:**  
`src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon/icon.twig`

**Content Example:**

```twig
{% extends atom('icon', '@SprykerShop:ShopUi') %}

{% define data = {
    name: required,
    isSpriteGenerationEnabled: true,
} %}

{% block body %}
    <use xlink:href="{{ publicPath('icons/sprite.svg#:' ~ data.name) }}"></use>
{% endblock %}
```

This allows you to use a different sprite path, if needed.

---

**Notes:**
- The old `icon-sprite.twig` is no longer required and can be removed.
- Make sure your sprite file is accessible at the specified path.

