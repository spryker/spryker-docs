---
title: Product Set
originalLink: https://documentation.spryker.com/v4/docs/product-set
redirect_from:
  - /v4/docs/product-set
  - /v4/docs/en/product-set
---

Let your customers shop for special product sets that can be manually curated based on any characteristic of the products you wish. The "Shop-the-Look" function is a prominent example of a Product Set, where you can build a collection of items based on relations or recommendations. This feature allows you to build a collection of items based on a curated collection like a stationary set for your customers’ workspace, set of clothing or accessories, or furniture for a specific room. Product Sets come with their own standalone catalog and detail pages for the shop. You can freely define an order of appearance of products within a set and on the catalog page. Also, Product Sets can be placed in CMS placeholders to place them throughout your shop. Your customers can select variants per product, add an individual product from a set and or all products from the set to the cart with one click.

Multiple products can be offered as a set so that the customer can add them to cart with a single click. Each set has it's own URL and all sets can be shown on a separate section in the catalog.

* Dedicated catalog for product sets with adjustable order of the sets by weight parameter
* Product set page with variant selector (for products with multiple variants), SEO meta data and images per set
* Place product sets in cms placeholders


## Overview
The Product Sets feature allows you to put together multiple products for the purpose of emphasizing that the set of products can be bought together. Product Sets usually have their own separate list and detail pages in the shop frontend where customers can add containing products to the cart.

This feature is supported by 3 modules:

| Module | Description |
| --- | --- |
| ProductSet | Manages the Product Set’s core functionalities such as persisting all related data to database and reading from it. It also provides Client functionality to list Product Sets from Search. |
| ProductSetCollector|Provides full Collector logic to export Product Sets to Search and Storage. |
| ProductSetGui | Provides a Zed UI to manage (create, list, update, delete and reorder) Product Sets. |

## Under the Hood
### Database Schema
The `ProductSet` module provides a `spy_product_set` table that stores some non-localized data about Product Set entities. Localized data is stored in the `spy_product_set_data` table. These tables, along with their related URLs and Product Image Sets, contain all necessary data about Product Set entities that you can list in Yves or show their representing Detail Pages.

The products that Product Sets represent are stored in the `spy_product_abstract_set` table along with their sorting position.

![Product Set Database schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Set/product_set_db_schema.png){height="" width=""}

### Current Constraints
{% info_block infoBox %}
Currently, the feature has the following functional constraints which are going to be resolved in the future.
{% endinfo_block %}

* product sets are shared across all the stores of a project
* you cannot restrict availability of a product set to a store
