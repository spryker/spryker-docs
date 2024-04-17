---
title: "HowTo: Render Configurable Bundle Templates on the Storefront"
description: In this document, we provide you with the instructions on how to render Configurable Bundle Templates in Spryker Storefront on the Cart, Checkout Summary, Order details, and Quote Request pages.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-rendering-configurable-bundles-in-the-storefront
originalArticleId: 76baed14-c6f4-49df-a4e9-3aadc13cc3a6
redirect_from:
  - /2021080/docs/howto-rendering-configurable-bundles-in-the-storefront
  - /2021080/docs/en/howto-rendering-configurable-bundles-in-the-storefront
  - /docs/howto-rendering-configurable-bundles-in-the-storefront
  - /docs/en/howto-rendering-configurable-bundles-in-the-storefront
  - /v6/docs/howto-rendering-configurable-bundles-in-the-storefront
  - /v6/docs/en/howto-rendering-configurable-bundles-in-the-storefront      
  - /v5/docs/howto-rendering-configurable-bundles-in-the-storefront
  - /v5/docs/en/howto-rendering-configurable-bundles-in-the-storefront
  - /v4/docs/howto-rendering-configurable-bundles-in-the-storefront
  - /v4/docs/en/howto-rendering-configurable-bundles-in-the-storefront
  - /docs/pbc/all/product-information-management/202204.0/base-shop/tutorials-and-howtos/howto-render-configurable-bundle-templates-in-the-storefront.html
---

The configurable bundle functionality is implemented by 3 widgets:

* `QuoteConfiguredBundleWidget`
* `SalesConfiguredBundleWidget`
* `ConfiguredBundleNoteWidget`

By adding these widgets to respective templates, you can render the Configurable Bundle Templates on the Storefront, on the Cart, Checkout Summary, Order Details, and Quote Request pages specifically. This document provides information about how to do that.

## Render configurable bundle templates on the cart page

1, In the cart page template (`CartPage/Theme/default/templates/page-layout-cart/page-layout-cart.twig`), call `QuoteConfiguredBundleWidget`.

**Code example that renders configured bundle product on the cart page**

```twig
{% raw %}{%{% endraw %} widget 'QuoteConfiguredBundleWidget' args [data.cart] with {
    data: {
        isEditable: data.isQuoteEditable,
    },
} only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

2. To add comments to a configured bundle product, set up the `ConfiguredBundleNoteWidget` module for your project. In the `configured-bundle` molecule of the `QuoteConfiguredBundleWidget` module, `ConfiguredBundleNoteWidget` is called automatically.

**Code example that renders `ConfiguredBundleNoteWidget`**:

```twig
{% raw %}{%{% endraw %} if data.isEditable {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} block editableConfigurableBundleNote {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} widget 'ConfiguredBundleNoteWidget' args [data.bundle, data.quote] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} block notEditableConfigurableBundleNote {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include molecule('readonly-bundled-note', 'ConfigurableBundleNoteWidget') ignore missing with {
            data: {
                bundle: data.bundle,
            },
        } only {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

## Render configurable bundle templates on the checkout summary page

In the checkout summary page template (`CheckoutPage/Theme/default/views/summary/summary.twig`), call `QuoteConfiguredBundleWidget`.

**Code example that renders configured bundle product on the checkout page, summary step**

```twig
{% raw %}{%{% endraw %} widget 'QuoteConfiguredBundleWidget' args [data.cart, shipmentGroup.items] with {
    data: {
        isEditable: false,
        isQuantityVisible: false,
    },
} only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

When you set up `ConfiguredBundleNoteWidget` for your product, it is called automatically in the `configured-bundle` molecule of the `QuoteConfiguredBundleWidget` (the same example as for the cart page). It is impossible to edit or remove comments for the configured bundle product on the checkout summary step. The customer can read comments which are editable on the cart page only.

## Render configurable bundle templates on the order details page

To render the  configured bundle product on the order details page, in the `order-detail-table` (`CustomerPage/Theme/default/components/molecules/order-detail-table/order-detail-table.twig`) molecule of the `CustomerReorderWidget`, call `SalesConfiguredBundleWidget`

**Code example which renders configured bundle product in the order details page**

```twig
{% raw %}{%{% endraw %} widget 'OrderConfiguredBundleWidget' args [data.order, shipmentGroup.items] only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

If you set up the `ConfiguredBundleNoteWidget` for your product, thr molecule `readonly-bundled-note` of the widget is called automatically inside the `ordered-configured-bundle` (`SalesConfigurableBundleWidget/Theme/default/components/molecules/ordered-configured-bundle/ordered-configured-bundle.twig`) molecule of the `SalesConfiguredBundleWidget`.

Customers can't edit or remove comments for the ordered configured bundle product at the order details step too. They can read comments which are editable on the **Cart** page only. Example:

```twig
{% raw %}{%{% endraw %} include molecule('readonly-bundled-note', 'ConfigurableBundleNoteWidget') ignore missing with {
    data: {
        bundle: data.bundle,
    },
} only {% raw %}%}{% endraw %}
```

## Render configurable bundle templates on the quote request pages

To Render configured bundle products on the Quote Request pages, inside the *view* of a special quote request page., call `QuoteConfiguredBundleWidget`.

**Code example which renders configured bundle product on the quote request page**

```twig
{% raw %}{%{% endraw %} widget 'QuoteConfiguredBundleWidget' args [quote] with {
    data: {
        isEditable: false,
    },
} only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

1. To render the Configured bundle on the `Quote Request Create` page, paste this code inside the `QuoteRequestPage/Theme/default/views/quote-request-create/quote-request-create.twig` view.
2. To render the Configured bundle on the `Quote Request Details` page, paste this code inside the `QuoteRequestPage/Theme/default/views/quote-request-details/quote-request-details.twig` view.
3. To render the Configured bundle in the `Quote Request Edit` page, paste this code inside the `QuoteRequestPage/Theme/default/views/quote-request-edit/quote-request-edit.twig` view.
