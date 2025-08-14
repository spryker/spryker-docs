---
title: "Merchant Category feature: Domain model"
last_updated: Apr 23, 2021
description: Learn about Spryker Marketplace Merchant categories allows grouping merchants by categories within your Spryker B2B Project.
template: concept-topic-template
redirect_from:
  - /docs/marketplace/dev/feature-walkthroughs/202311.0/merchant-category-feature-walkthrough.html
  - /docs/pbc/all/merchant-management/latest/marketplace/domain-model-and-relationships/merchant-category-feature-domain-model.html
---

The *Merchant Category* feature allows splitting merchants into various categories in order to extend business logic of the project.

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/19aac040-a607-4a20-8edf-a81473e293e9.png?utm_medium=live&utm_source=custom)

| MODULE     | DESCRIPTION |
|---|---|
| [Category](https://github.com/spryker/category) | Helps you build a product organisation structure. Categories are modelled in an hierarchical structure, a tree.  |
| [MerchantCategory](https://github.com/spryker/merchant-category) | Provides a connection between category and merchant entities. |
| [MerchantCategoryDataImport](https://github.com/spryker/merchant-category-data-import) | Imports relations between categories and merchants from CSV file. |
| [MerchantCategorySearch](https://github.com/spryker/merchant-category-search) | Provides plugins to extend `MerchantSearch` with categories. |

## Domain model

![Domain Model](https://confluence-connect.gliffy.net/embed/image/2f9ddeb3-aefe-4511-b1d0-7936a7935c6a.png?utm_medium=live&utm_source=custom)
