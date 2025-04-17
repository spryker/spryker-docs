---
title: Accessibility improvements
description: Learn how install accessibility improvements.
last_updated: March 31, 2025
template: feature-integration-guide-template
---

Accessibility improvements include the following changes:

- Enhanced accessibility: Improved interface navigation with better **Tab** key logic and more accurate screen reader descriptions for UI elements.
- Keyboard-friendly search: Users can now interact with search suggestions using the keyboard.
- Better visual clarity: Adjusted the color scheme so text stands out better from its background, making it easier to read.

To install Yves keyboard accessibility improvements, take the following steps:

1. Update the required modules:
```bash
  composer require spryker-shop/shop-ui:^1.84.0
```

2. Add the glossary keys:

| Key                                         | Translation (de_DE)                                | Translation (en_US)                                |
|---------------------------------------------|---------------------------------------------------|---------------------------------------------------|
| global.skip-to-navigation                   | Zur Navigation springen                           | Skip to navigation                                |
| global.skip-to-products                     | Zu den Produkten springen                         | Skip to products                                  |
| global.skip-to-content                      | Zum Inhalt springen                               | Skip to content                                   |
| global.search.hint                          | Suchhinweis                                       | Search hint                                       |
| product_group_widget.product.view.in.color  | Produkt ansehen in %color%                        | View product in %color%                           |
| product_review_widget.product_review.summary.mark | %mark% Sterne                                 | %mark% stars                                      |
| price_widget.aria_label.price_mode.switcher | Preismodus auswählen                              | Select price mode                                 |
| currency_widget.aria_label.currency.switcher | Währung auswählen                                 | Select currency                                   |
| language_switcher_widget.aria_label.language.switcher | Sprache auswählen                           | Select language                                   |
| store_widget.aria_label.store.switcher      | Shop auswählen                                    | Select store                                      |
| shop_ui.aria_label.suggest_search.hint      | Produkte suchen                                   | Search for products                               |
| shop_ui.aria_label.counter.input            | Zähler Eingabe, geben Sie eine Zahl ein           | Counter input, enter a number                     |
| product_review_widget.aria_label.current.rating | Aktuelle Bewertung ist %s%                    | Current rating is %s%                             |
| product_bundle_widget.aria_label.view.details | Details für %productName% anzeigen             | View details for %productName%                    |
| customer_reorder_widget.aria_label.check.product.to.reorder | Überprüfen Sie das Produkt %productName%, um es erneut zu bestellen | Check the product %productName% to reorder |

3. Generate translation cache for Yves:





4. Import the glossary:
```bash
  console data:import glossary
```

4. To enable users to adjust scaling, update the `viewportUserScaleable` variable. This variable controls the `user-scalable` attribute in the viewport meta tag: `<meta name="viewport" content="..., user-scalable=no">`.

**src/Pyz/Yves/ShopUi/Theme/default/templates/page-blank/page-blank.twig**
<!-- {% raw %} -->
```twig
    {% block template %}
        ...
        {% set viewportUserScaleable = 'yes' %}

        {{ parent() }}
    {% endblock %}
 ```
<!-- {% endraw %} -->

5. To enable `skip-link`, pass `navigationId` into the `header` organism from `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig`:

<!-- {% raw %} -->
```twig
    {% embed organism('header') with {
        data: {
            ...
        },
        attributes: {
            navigationId: navigationId,
        },
    }  only %}
        ...
    {% endembed %}
```
<!-- {% endraw %} -->

6. Build Javascript and CSS changes:

```bash
  console frontend:project:install-dependencies
  console frontend:yves:build -e production
```

## Next step

This document describes how to install the core of this functionality. The integration also requires frontend changes. For an examp