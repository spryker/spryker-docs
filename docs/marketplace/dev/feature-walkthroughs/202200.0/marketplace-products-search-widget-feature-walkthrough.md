---
title: Marketplace Products Search Widget feature walkthrough
description: Marketplace Products Search Widget feature adds Merchant context to quick order page.
template: feature-walkthrough-template
---

The *Marketplace Products Search Widget* feature adds a merchant context to Products Search Widget by providing additional plugins and widgets for Quick Order Page, which provides support product offers and merchant products due to add them to cart or to order.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Products Search Widget* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/9c1ca47c-0a5e-4727-a602-65873f92d571.png?utm_medium=live&utm_source=confluence)

| MODULE                                                                                                    | DESCRIPTION                                                                            |
|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| [MerchantProductOfferWidgetExtension](https://github.com/spryker/merchant-product-offer-widget-extension) | This module provides nterfaces for extension of the MerchantProductOfferWidget module. |
| [MerchantSearchWidget](https://github.com/spryker/merchant-search-widget)                                 | This module provides a new widget which renders a merchants filter.                    |
| [ProductSearchWidgetExtension](https://github.com/spryker/product-search-widget-extension)                | This module provides for extension of the ProductSearchWidget module.                  |

## Related Developer articles

| INTEGRATION GUIDES                                                                                                                                                                    | DATA IMPORT |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| [Marketplace Product Search Widget feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-search-widget-feature-integration.html) |             |
