---
title: Merchant Category feature walkthrough
last_updated: Apr 23, 2021
description: Merchant categories allows grouping merchants by categories.
template: concept-topic-template
---

The *Merchant Category* feature allows splitting merchants into various categories in order to extend business logic of the project.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Merchant Category feature overview](/docs/marketplace/user/features/{{page.version}}/merchant-category-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/19aac040-a607-4a20-8edf-a81473e293e9.png?utm_medium=live&utm_source=custom)
<!--
Diagram content:
    -The module dependency graph SHOULD contain all the modules that are specified in the feature  (don't confuse with the module in the epic)
    - The module dependency graph MAY contain other module that might be useful or required to show
Diagram styles:
    - The diagram SHOULD be drown with the same style as the example in this doc
    - Use the same distance between boxes, the same colors, the same size of the boxes
Table content:
    - The table that goes after diagram SHOULD contain all the modules that are present on the diagram
    - The table should provide the role each module plays in this feature
-->
| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [Category](https://github.com/spryker/category) | The Category module helps you to build a product organisation structure. Categories are modelled in an hierarchical structure, a tree.  |
| [MerchantCategory](https://github.com/spryker/merchant-category) | This module provides a connection between category and merchant entities. |
| [MerchantCategoryDataImport](https://github.com/spryker/merchant-category-data-import) | This module imports relations between categories and merchants from .csv file. |
| [MerchantCategorySearch](https://github.com/spryker/merchant-category-search) | Provides plugins to extend MerchantSearch with categories. |

## Domain model
<!--
- Domain model SHOULD contain all the entities that were adjusted or introduced by the feature.
- All the new connections SHOULD also be shown and highlighted properly 
- Make sure to follow the same style as in the example
-->
![Domain Model](https://confluence-connect.gliffy.net/embed/image/2f9ddeb3-aefe-4511-b1d0-7936a7935c6a.png?utm_medium=live&utm_source=custom)


## Related Developer articles


|INTEGRATION GUIDES  |DATA IMPORT  |
|---------|---------|
| [Merchant Category feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-category-feature-integration.html)    |[File details: merchant_category.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-category.csv.html)  |
| [Glue API: Merchant Category integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/merchant-category-feature-integration.html) |  |  
