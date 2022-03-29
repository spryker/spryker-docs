---
title: Product Sets feature walkthrough
last_updated: Aug 19, 2021
description: The Product Sets feature allows creating and selling collections of products
template: concept-topic-template
---

The _Product Sets_ feature allows creating and selling collections of products.


To learn more about the feature and to find out how end users use it, see [Product Sets feature overview](/docs/scos/user/features/{{page.version}}/product-sets-feature-overview.html) for business users.


## Entity diagram

The Product Sets feature consists of the following modules:

| MODULE | DESCRIPTION |
| --- | --- |
| ProductSet | Manages the Product Sets feature's core functionalities, such as persisting all related data to database and reading from it. It also provides the Client functionality to list Product Sets from Search. |
| ProductSetCollector | Provides full Collector logic to export product sets to Search and Storage. |
| ProductSetGui | Provides a Back Office UI to create, list, update, delete, and reorder product sets. |

The `ProductSet` module provides a `spy_product_set` table that stores some non-localized data about Product Sets entities. Localized data is stored in the `spy_product_set_data` table. These tables, along with their related URLs and product image sets, contain all the necessary data about Product Sets entities that you can list on the Storefront or show their representing *Product details* pages.

The products in product sets and their sorting positions are stored in the `spy_product_abstract_set` table.

<div class="width-100">

![Product Set Database schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Sets/product_set_db_schema.png)

</div>


## Related Developer articles

|INTEGRATION GUIDES | 
|---------|
| [Product Sets feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-set-feature-integration.html)  
