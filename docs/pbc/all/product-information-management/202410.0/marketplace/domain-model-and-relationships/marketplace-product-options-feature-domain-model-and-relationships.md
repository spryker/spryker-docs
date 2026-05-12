---
title: "Marketplace Product Options feature: Domain model and relationships"
description: Marketplace Product Options lets merchants create their product option groups and values.
template: feature-walkthrough-template
redirect_from:
last_updated: Nov 21, 2023
---

The *Marketplace Product Options* feature lets merchants create their product option groups and values. Currently, you can [import product options](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-option-group.csv.html) where you specify the merchant reference.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Product Options* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/d8882366-b2dd-4d6c-b401-01db47a00481.png?utm_medium=live&utm_source=custom)

| NAME | DESCRIPTION |
| --- | --- |
| [MerchantProductOption](https://github.com/spryker/merchant-product-option) | Provides merchant product option main business logic and persistence. |
| [MerchantProductOptionDataImport](https://github.com/spryker/merchant-product-option-data-import) | Provides data import functionality for merchant product options. |
| [MerchantProductOptionStorage](https://github.com/spryker/merchant-product-option-storage) | Provides publish and sync functionality for merchant product options. |
| [MerchantProductOptionGui](https://github.com/spryker/merchant-product-option-gui) | Provides Back Office UI for merchant product options management. |
| [ProductOption](https://github.com/spryker/product-option) | Provides additional layer of optional items that can be sold with the actual product. |
| [ProductOptionStorage](https://github.com/spryker/product-option-storage) | Provides publish and sync functionality for product options. |
| [Shop.ProductOptionWidget](https://github.com/spryker-shop/product-option-widget) | Provides widgets for displaying product options. |

## Domain model

The following schema illustrates the Marketplace Product Options domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/90a0e5bc-a0d9-4cb2-a215-c5d08a786115.png?utm_medium=live&utm_source=custom)

                                                                                                                                                      |
