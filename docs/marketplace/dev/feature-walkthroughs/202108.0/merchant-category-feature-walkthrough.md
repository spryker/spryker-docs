---
title: Merchant Category feature walkthrough
last_updated: Apr 23, 2021
description: Merchant categories allows grouping merchants by categories.
template: feature-walkthrough-template
---

The *Merchant Category* feature allows splitting merchants into various categories in order to extend business logic of the project.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Merchant Category feature overview](/docs/marketplace/user/features/{{page.version}}/merchant-category-feature-overview.html) for business users.

{% endinfo_block %}

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


## Related Developer articles

| INTEGRATION GUIDES | DATA IMPORT |
|---|---|
| [Merchant Category feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-category-feature-integration.html)    |[File details: merchant_category.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-category.csv.html)  |
| [Glue API: Merchant Category integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/merchant-category-feature-integration.html) |  |  
