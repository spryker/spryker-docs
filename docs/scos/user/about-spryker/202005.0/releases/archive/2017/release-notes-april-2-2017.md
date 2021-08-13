---
title: Release Notes - April - 2 2017
originalLink: https://documentation.spryker.com/v5/docs/release-notes-april-2-2017
originalArticleId: 5830c4f2-fa95-46fe-84ff-9517426dfb4c
redirect_from:
  - /v5/docs/release-notes-april-2-2017
  - /v5/docs/en/release-notes-april-2-2017
---

## Features
### Multiple Wishlists
This release introduces core functionality to support multiple wishlist handling in Yves. It is now possible to create multiple wishlists in a customer account and select which wishlist to add a product to. In the customer account’s wishlist section, users can manage existing wishlists by renaming or removing. It is also possible to see how many products are in each wishlist.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Cart 3.1.0](https://github.com/spryker/Cart/releases/tag/3.1.0)</li><li>[Wishlist 4.1.0](https://github.com/spryker/Wishlist/releases/tag/4.1.0)</li></ul> | <ul><li>[Availability 5.0.1](https://github.com/spryker/Availability/releases/tag/5.0.1)</li><li>[ProductBundle 2.0.2](https://github.com/spryker/product-bundle/releases/tag/2.0.2)</li></ul> |

**Documentation**
For module documentation, see [Wishlist](/docs/scos/dev/features/202005.0/wishlist/wishlist.html).

### Generated Directory Removal
Spryker generates certain files that are stored in configured folders (e.g. transfer-object files). With this release, we introduced a new strategy for removing cache files. Instead of removing the folders that contain the generated files, the respective commands now purge all generated contents from the folders without deleting the folders.

**Affected (Undefined variable: General.bundle/module)s**

| Major | Minor | Patch |
| --- | --- | --- |
| Setup 4.0.0 | <ul><li>Cache 3.1.0</li><li>Transfer 3.2.0</li></ul> | n/a |

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch: `composer update "spryker/*"`
* Once that is done, upgrade to the new Setup major and its dependencies: `composer require spryker/setup:"^4.0.0"`

### Beta: Data Feeds
A set of `DataFeed` modules that provide the functionality to query data and related information for export or processing. We will be using query containers to query abstract product, category, price, and availability data. Query Containers return query objects. You can use pagination, limits, add columns, query one or all when dealing with returned content.

The DataFeed modules are as follows:

* `AvailabilityDataFeed` provides an API to get a product availability information. Available filters are locale id, updated dates.
* `CategoryDataFeed` provides an API to get information about categories. Available filters are locale id, updated dates.
* `PriceDataFeed` provides an API to get information about product prices.

The `ProductAbstractDataFeed` module provides an API to get information about abstract products. Available filters are locale id, updated dates.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>AvailabilityDataFeed 0.1.0</li><li>CategoryDataFeed 0.1.0</li><li>PriceDataFeed 0.1.0</li><li>ProductAbstractDataFeed 0.1.0</li></ul> |<ul><li>AvailabilityDataFeed 0.1.1</li><li>CategoryDataFeed 0.1.1</li><li> PriceDataFeed 0.1.1</li></ul> |

<!--For Data Feed Documentation see: -->

## Improvements
### Twig Cache Warmup
Previously the command `twig:cache:warmup` was used to open paths to find templates to be used in the cache file. Current paths are stricter and use the current active theme name to find templates.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | Twig 3.1.1 |

### Zed Navigation Fix
Previously, it was not possible to override navigation definitions from the core. It is now possible to have your own navigation schema. If you override the core definitions in the project schema your definitions will be used instead of the ones from the core.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | ZedNavigation 1.0.2 |

## Bugfixes
### Tax Calculation without Shipment Information
Previously, we had a problem for tax calculation without shipment information. If you would go to the checkout without filling in the address information and then go back to the shop, add to cart action for any product it would through an exception. The reason was the missing country reference which was failing to select the correct tax rate. This issue is fixed and the country ISO code now falls backs to the default value when no address is set.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>Shipment 4.0.1</li><li>TaxProductConnector 4.0.1</li></ul> |

### Yaml Batch Iterator
`YamlBatchIterator` didn’t get migrated in the recent dependency cleanup. With this release, we added it back to the correct module.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | UtilDataReader 1.1.0 | n/a |

#### Attribute Key Validation Constraints
Previously, it was possible to create product attribute keys with any kind of letters and symbols. Now, when creating product attributes with forms, they will be validated to have only lower case letters, digits, numbers, underscores (“_”), hyphens (“-“), and colons (“:”).

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>ProductManagement 0.3.1</li><li>ProductSearch 5.0.2</li></ul> |

#### Collector Batch Fix with Big Data Sets
When exporting big data sets to Redis some data was getting lost. This was happening because batching worked with non-ordered data and random results were being returned. This issue is resolved.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | UtilDataReader 1.2.0 | Collector 5.1.2 |

#### Displaying Duplicate Products in PIM
There was an issue with displaying newly created product modules twice in the product management UI in Zed. This issue was due to a wrong product query. The issue is fixed to make sure that each module product is listed only once.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | ProductManagement 0.3.2 |

#### Identical Additional Category Parent
When a category was saved with a same “additional parent” as its “parent”, the process did not finish due to a unique URL error. Now, additional parents that are the same as the parent will be ignored.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | Category 3.1.1 |

#### Item Count in Cart with module Product
We had an issue with item count plugin for the cart when a module product was added to the cart with different options. This issue is fixed now to make sure that each module item with its given option(s) is calculated correctly into the item count. The item count plugin now returns product module count per group key instead of SKU.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | ProductBundle 2.0.1 |

#### Touch Fix for Deactivated Products
There was an issue with inactive/active products in Elasticsearch. Once an active product was deactivated, it was not removed from the search. This issue is fixed and now touch handles the deactivation correctly and removes products from Elasticsearch when inactive.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a |Product 5.1.1  |

#### Zed Breadcrumbs and Navigation Fix
There was an issue with collapsible menu items in the navigation. When a sub-menu item was selected and the user would try to navigate to the parent item through breadcrumbs, an exception was shown. With this fix, we made sure that the broken URI is removed from the breadcrumbs and if a parent item is not accessible, the user stays on the same page.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a | <ul><li>Gui 3.1.1</li><li>ZedNavigation 1.0.3</li></ul> |

#### Handling Empty Strings in Glossary Keys
Previously, we had an issue when handling empty strings. Due to a known summer note issue Zed would send pre-generated HTML to Yves (&lt;p&gt;&lt;br&gt;&lt;/p&gt;). Now, the empty strings are handled and stored correctly, and in our demoshop we display the glossary key when it holds an empty string. Knowing the glossary key helps to discover what the missing content and translations are.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>CmsGui 2.0.2</li><li>Glossary 3.0.2</li></ul> |

#### Newly Added Customer Address in Checkout
Previously, we had an issue in checkout with addresses that were newly added to a customer account. When the new address was added to a customer account, in checkout the address would not show unless it was edited. This issue is fixed now by implementing a new client method to read the customer data from Zed. Zed response for customer data now also populates shipping and billing addresses.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | Customer 4.1.0 | n/a |

#### Default Currency for the Price Form Field
Previously, the `ProductManagement` and `Shipment` modules used a fixed currency in the price form field (EUR, default value of the `MoneyType` class of Symfony). Now, product and shipment create/edit pages use the currency configured for the store. This is easily identified by the currency symbol for the price field.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>ProductManagement 0.3.3</li><li>Shipment 4.0.2</li></ul> |
