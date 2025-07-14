---
title: Integrate automated SVG sprite extraction
description: Learn how to enable automated SVG sprite extraction
last_updated: May 26, 2025
template: feature-integration-guide-template
---

This guide describes how to integrated automated SVG sprite extraction for scalable icon management in Yves.

1. Update ShopUi to 1.93.1 or higher:

```bash
composer require spryker-shop/shop-ui:^1.93.1
```


2. Create the sprite file: `/frontend/assets/global/default/icons/sprite.svg`.

3. Add all symbols from `src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon-sprite/icon-sprite.twig` as SVG icons to `sprite.svg`:

**/frontend/assets/global/default/icons/sprite.svg**

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
    <!-- Put SVG icons here -->
</svg>
```

4. Add or update the icon component file:

**src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon/icon.twig**

```twig
{% raw %}
{% extends atom('icon', '@SprykerShop:ShopUi') %}

{% define data = {
    name: required,
    isSpriteGenerationEnabled: true,
} %}
{% endraw %}
```

5. Use the icon component in your Twig templates. The new approach uses a pregenerated or manually created SVG sprite. You no longer need to maintain or update `icon-sprite.twig`.
Usage example:

```twig
{% raw %}
{% include atom('icon') with {
    data: {
        name: 'search',
    },
} only %}
{% endraw %}
```


6. Optional: If your sprite is located at a different path, you can create or update the `icon.twig` component to use a custom path:

**src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon/icon.twig**

```twig
{% raw %}
{% extends atom('icon', '@SprykerShop:ShopUi') %}

{% define data = {
    name: required,
    isSpriteGenerationEnabled: true,
} %}

{% block body %}
    <use xlink:href="{{ publicPath('icons/sprite.svg#:' ~ data.name) }}"></use>
{% endblock %}
{% endraw %}
```

7. Optional: Remove `icon-sprite.twig` because it's no longer used.
























