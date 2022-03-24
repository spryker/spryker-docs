---
title: Marketplace Product Options feature walkthrough
description: Marketplace Product Options lets merchants create their product option groups and values.
template: feature-walkthrough-template
---

The *Marketplace Product Options* feature lets merchants create their product option groups and values. Currently, you can [import product options](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-option-group.csv.html) where you specify the merchant reference.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Product Options feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-options-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Product Options* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/d8882366-b2dd-4d6c-b401-01db47a00481.png?utm_medium=live&utm_source=custom)

| NAME | DESCRIPTION |
| --- | --- |
| [MerchantProductOption](https://github.com/spryker/merchant-product-option) | Provides merchant product option main business logic and persistence. |
| [MerchantProductOptionDataImport](https://github.com/spryker/merchant-product-option-data-import) | Provides data import functionality for merchant product options. |
| [MerchantProductOptionStorage](https://github.com/spryker/merchant-product-option-storage) | Provides publish and sync functionality for merchant product options. |
| [MerchantProductOptionGui](https://github.com/spryker/merchant-product-option-gui) | Provides backoffice UI for merchant product options management. |
| [ProductOption](https://github.com/spryker/product-option) | Provides additional layer of optional items that can be sold with the actual product. |
| [ProductOptionStorage](https://github.com/spryker/product-option-storage) | Provides publish and sync functionality for product options. |
| [Shop.ProductOptionWidget](https://github.com/spryker-shop/product-option-widget) | Provides widgets for displaying product options. |

## Domain model

The following schema illustrates the Marketplace Product Options domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/90a0e5bc-a0d9-4cb2-a215-c5d08a786115.png?utm_medium=live&utm_source=custom)

## Related Developer articles

| INTEGRATION GUIDES | DATA IMPORT |
| ---- | --- |
| [Marketplace Product Options feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-option-feature-integration.html) | [File details: merchant product option group](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-option-group.csv.html) |
