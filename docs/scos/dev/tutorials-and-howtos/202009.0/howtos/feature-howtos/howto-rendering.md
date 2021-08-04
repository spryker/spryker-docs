---
title: HowTo -  Render Configurable Bundle Templates in the Storefront
originalLink: https://documentation.spryker.com/v6/docs/howto-rendering-configurable-bundles-in-the-storefront
redirect_from:
  - /v6/docs/howto-rendering-configurable-bundles-in-the-storefront
  - /v6/docs/en/howto-rendering-configurable-bundles-in-the-storefront
---

The configurable bundle functionality is implemented by 3 widgets:

* `QuoteConfiguredBundleWidget`
* `SalesConfiguredBundleWidget`
* `ConfiguredBundleNoteWidget`

By adding these widgets to respective templates, you can render the Configurable Bundle Templates in the Storefront. Specifically, in the Cart, Checkout Summary, Order Details, and Quote Request pages. This article provides details on how to do that.

## Rendering Configurable Bundle Templates on the Cart Page
To render a `configured bundle` product on the cart page, call `QuoteConfiguredBundleWidget`  in the cart page template (`CartPage/Theme/default/templates/page-layout-cart/page-layout-cart.twig`).

**Code example that renders configured bundle product on the cart page**

```twig
{% raw %}{%{% endraw %} widget 'QuoteConfiguredBundleWidget' args [data.cart] with {
    data: {
        isEditable: data.isQuoteEditable,
    },
} only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

To add comments to a `configured bundle` product, set up the `ConfiguredBundleNoteWidget` module for your project.  `ConfiguredBundleNoteWidget` will be called automatically in the `configured-bundle` molecule of the `QuoteConfiguredBundleWidget` module.

**Code example that renders ConfiguredBundleNoteWidget**

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

## Rendering Configurable Bundle Templates on the Checkout Summary Page
## 
To render the  `configured bundle` product on the Checkout Summary page, call `QuoteConfiguredBundleWidget`  in the checkout summary page template (`CheckoutPage/Theme/default/views/summary/summary.twig`).

**Code example that renders configured bundle product on the Checkout page, Summary step**

```twig
{% raw %}{%{% endraw %} widget 'QuoteConfiguredBundleWidget' args [data.cart, shipmentGroup.items] with {
    data: {
        isEditable: false,
        isQuantityVisible: false,
    },
} only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

If you set up `ConfiguredBundleNoteWidget` for your product, it will be called automatically in the `configured-bundle` molecule of the `QuoteConfiguredBundleWidget` (the same example as for the cart page). It is impossible to edit or remove comments for the configured bundle product on the checkout summary step. The customer can read comments which are editable on the cart page only.

## Rendering Configurable Bundle Templates on the Order Details Page 

To render the `configured bundle` product on the order details page, call `SalesConfiguredBundleWidget`  in the `order-detail-table` (`CustomerPage/Theme/default/components/molecules/order-detail-table/order-detail-table.twig`) molecule of the `CustomerReorderWidget`.

**Code example which renders configured bundle product in the Order Detail page**

```twig
{% raw %}{%{% endraw %} widget 'OrderConfiguredBundleWidget' args [data.order, shipmentGroup.items] only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

If you set up the `ConfiguredBundleNoteWidget` for your product, molecule `readonly-bundled-note` of the widget will be called automatically inside the `ordered-configured-bundle` (`SalesConfigurableBundleWidget/Theme/default/components/molecules/ordered-configured-bundle/ordered-configured-bundle.twig`) molecule of the `SalesConfiguredBundleWidget`.
It’s not possible to edit or remove comments for the ordered configured bundle product at the order details step too. The customer can only read comments which are editable on the cart page only. Example:

```twig
{% raw %}{%{% endraw %} include molecule('readonly-bundled-note', 'ConfigurableBundleNoteWidget') ignore missing with {
    data: {
        bundle: data.bundle,
    },
} only {% raw %}%}{% endraw %}
```

## Rendering Configurable Bundle Templates on the Quote Request Pages
Rendering `configured bundle` products on the Quote Request pages is implemented by calling `QuoteConfiguredBundleWidget` inside the *view* of a special quote request page.

**Code example which renders configured bundle product on the Quote Request page**

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
