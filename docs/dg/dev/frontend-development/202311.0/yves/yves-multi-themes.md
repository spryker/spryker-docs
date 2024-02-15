---
title: Yves multi-themes
description: Manage multiple themes for Yves by extending them.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/yves-multi-themes
originalArticleId: c892648b-6bdb-499c-af5a-eefa10fbb45d
redirect_from:
  - /docs/scos/dev/front-end-development/202311.0/yves/yves-multi-themes.html
  - /docs/scos/dev/front-end-development/yves/yves-multi-themes.html
related:
  - title: Multi-theme
    link: docs/dg/dev/frontend-development/page.version/yves/multi-theme.html
---

This document describes how to use and extend themes on the project level.

In a multi-theme environment, a shop can have multiple themes for the same component. On a core level, there is a default theme, which is used if no theme is provided for a component on a project level.

You can extend the default theme from the project level or from the core level.

![yves-multi-themes-diagram](https://confluence-connect.gliffy.net/embed/image/9add4ad5-cbe0-4610-82f1-b10610721b23.png?utm_medium=live&utm_source=custom)

## Extending themes

For example, to extend the `product-item-color-selector` molecule from the `ProductGroupWidget` module in a new theme:

1. Add the component files to `src/Pyz/Yves/ProductGroupWidget/Theme/{new-theme}/components/molecules/product-item-color-selector/`.

2. Optional: To make SCSS and TS extending easier, add an alias for the theme to `tsconfig.json`:

```json
"paths": {
  ...
  "ProductGroupWidgetProjectDefault/*": ["./src/Pyz/Yves/ProductGroupWidget/Theme/default/*"]
}
```

### Extending Twig

Extend Twig from the project level as follows:

```twig
{% raw %}{%{% endraw %} extends molecule('product-item-color-selector', 'ProductGroupWidget') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    new-theme
    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

Extend Twig from the core level as follows:

```twig
{% raw %}{%{% endraw %} extends molecule('product-item-color-selector', '@SprykerShop:ProductGroupWidget') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    new-theme
    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

### Extending SCSS

Extend SCSS from the project level as follows:

```scss
@import '~ProductGroupWidgetProjectDefault/components/molecules/product-item-color-selector/product-item-color-selector.scss';

@include product-group-widget-product-item-color-selector() {
    // new-theme styles
}
```

Extend SCSS from the core level as follows:

```scss
@include product-group-widget-product-item-color-selector() {
    // new-theme styles
}
```

### Extending TS

Extend TS from the project level as follows:

```ts
import ProductItemColorSelectorProjectDefault from 'ProductGroupWidgetProjectDefault/components/molecules/product-item-color-selector/product-item-color-selector';

export default class ProductItemColorSelector extends ProductItemColorSelectorProjectDefault {
    protected init(): void {
        console.log('new-theme');

        super.init();
    }
}
```

Extend TS from the core level as follows:

```ts
import ProductItemColorSelectorCore from 'ProductGroupWidget/components/molecules/product-item-color-selector/product-item-color-selector';

export default class ProductItemColorSelector extends ProductItemColorSelectorCore {
    protected init(): void {
        console.log('new-theme');

        super.init();
    }
}
```
