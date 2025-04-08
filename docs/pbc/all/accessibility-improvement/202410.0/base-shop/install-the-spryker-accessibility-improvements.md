---
title: Install accessibility improvements
description: Learn how install accessibility improvements.
last_updated: March 31, 2025
template: feature-integration-guide-template
---

Keyboard accessibility improvements include the following changes:

- Enhanced Accessibility: Made several interface elements more accessible. You can now navigate more logically using the Tab key, and screen readers provide better descriptions of elements.
- Keyboard-Friendly Search: Improved the way keyboard users can interact with the product search suggestions.
- Better Visual Clarity: Adjusted the color scheme across the site to ensure text stands out better from its background, making it easier for everyone to read.

To install Yves keyboard accessibility improvements, take the following steps:

1. Update necessary modules with the following command:
```bash
  composer update spryker-shop/shop-ui
```

2. Generate translation cache for Yves:
- Add glossary keys for the new accessibility improvements.

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
   
- Run the following command to import the glossary:
```bash
  console data:import glossary
```

3. Enable user scalable option in the project:
    - Set `viewportUserScaleable` variable at `src/Pyz/Yves/ShopUi/Theme/default/templates/page-blank/page-blank.twig`. Possible values are `yes` or `no`. The default value is `no`.

<!-- {% raw %} -->
```twig
    {% block template %}
        ...
        {% set viewportUserScaleable = 'yes' %}

        {{ parent() }}
    {% endblock %}
 ```
<!-- {% endraw %} -->

4. Pass `navigationId` into the `header` organism from `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig` to enable `skip-link`. 

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

5. Build Javascript and CSS changes:

```bash
  console frontend:project:install-dependencies
  console frontend:yves:build -e production
```