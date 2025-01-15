---
title: Render merchant product offers on the Storefront
last_updated: Nov 05, 2021
description: Learn how to render the Merchant Product Offers on different types of Spryker Storefront pages.
template: howto-guide-template
redirect_from:
  - /docs/marketplace/dev/feature-walkthroughs/202204.0/marketplace-product-offer-feature-walkthrough/rendering-product-offers-on-the-storefront.html
---

This document explains how to render merchant product offers on the Storefront.

## Prerequisites

The [MerchantProductOfferWidget](https://github.com/spryker-shop/merchant-product-offer-widget) module is responsible for rendering product offers on the Storefront. Make sure it's installed in your project before adding the product offers to the Storefront.

## Rendering product offers on the product details page

To render the MerchantProductOfferWidget on the product details page, add it to the `product-configurator.twig` molecule at the project and vendor levels.

Project level path: `/src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig`

Vendor level path: `/vendor/spryker/spryker-shop/Bundles/ProductDetailPage/src/SprykerShop/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig`

```twig
{% raw %}
Widget code: {% widget 'MerchantProductOfferWidget' args [data.product] only %}{% endwidget %}
{% endraw %}

```
## Rendering product offers on the cart page

To render the MerchantProductOfferWidget module to the *Cart* page, add it to the `product-cart-item.twig` molecule at the vendor level:

```twig
{% raw %}
Widget code: {% widget 'ProductOfferSoldByMerchantWidget' args [data.product] only %}{% endwidget %}
{% endraw %}
```
## Rendering product offers on the checkout pages

To render the MerchantProductOfferWidget module on the checkout pages, change the *summary-item* molecule at the summary (`/vendor/spryker/spryker-shop/Bundles/CheckoutPage/src/SprykerShop/Yves/CheckoutPage/Theme/default/views/summary/summary.twig`) and shipment (`/vendor/spryker/spryker-shop/Bundles/CheckoutPage/src/SprykerShop/Yves/CheckoutPage/Theme/default/views/shipment/shipment.twig`) steps to the *summery-note* molecule with the new data parameters:

```twig
{% raw %}
{% embed molecule('summary-node', 'CheckoutPage') with {
    data: {
        node: item,
    },
....
{% endembed %}
{% endraw %}

```

{% info_block infoBox "Info" %}

Keep in mind that:

- *summary-node* already includes a new summary-product-packaging-unit-node molecule.

- *summary-product-packaging-unit-node* molecule already includes a widget with offers.

{% endinfo_block %}
