---
title: "Product Sets: Module relations"
description: Module relations and database schema of the Product Sets feature.
template: feature-walkthrough-template
last_updated: Jul 25, 2023
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202200.0/product-sets-feature-walkthrough/product-sets-module-relations.html
  - /docs/pbc/all/product-information-management/202307.0/install-and-upgrade/upgrade-modules/product-sets-module-relations.html
  - /docs/pbc/all/product-information-management/202307.0/base-shop/install-and-upgrade/upgrade-modules/product-sets-module-relations.html
---

The Product Set feature consists of the following modules:

| MODULE | DESCRIPTION |
| --- | --- |
| ProductSet | Manages the Product Sets feature's core functionalities, such as persisting all related data to database and reading from it. It also provides the Client functionality to list Product Sets from Search. |
| ProductSetCollector|Provides full Collector logic to export product sets to Search and Storage. |
| ProductSetGui | Provides a Back Office UI to create, list, update, delete, and reorder product sets. |

The `ProductSet` module provides a `spy_product_set` table that stores some non-localized data about Product Sets entities. Localized data is stored in the `spy_product_set_data` table. These tables, along with their related URLs and product image sets, contain all the necessary data about Product Sets entities that you can list on the Storefront or show their representing *Product details* pages.

The products in product sets and their sorting positions are stored in the `spy_product_abstract_set` table.

![Product Set Database schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Sets/product_set_db_schema.png)
