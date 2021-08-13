---
title: Release Notes - April - 1 2017
originalLink: https://documentation.spryker.com/v4/docs/release-notes-april-1-2017
originalArticleId: db76418e-d857-4702-a2bc-ab3528d6bfa3
redirect_from:
  - /v4/docs/release-notes-april-1-2017
  - /v4/docs/en/release-notes-april-1-2017
---

<!--
used to be: http://spryker.github.io/release/2017/april-1/
-->

## Features
### Product Relations
With this release, we introduce product relations feature. This feature can be used in many different ways. Some of the anticipated (and most common for e-commerce shops) use cases are displaying similar products, up-selling of products, etc.

The solution comes with a Zed UI where product relations can be defined manually using condition rules. An out-of-the-box solution showcases this feature in the demoshop in two different ways.

On a product detail page, we have related products for the given product. In the cart, we demonstrate up-selling. If for any item in the cart there are applicable products for up-sell, those will be displayed.

**Affected modules**


| Major | Minor | Patch |
| --- | --- | --- |
| [ProductRelation 1.0.0](https://github.com/spryker/product-relation/releases/tag/1.0.0) | n/a | [ProductRelation 1.0.1](https://github.com/spryker/ProductRelation/releases/tag/1.0.1)|
| [ProductRelationCollector 1.0.0](https://github.com/spryker/product-relation-collector/releases/tag/1.0.0) | n/a | [ProductRelation 1.0.2](https://github.com/spryker/product-relation/releases/tag/1.0.2) |

**Documentation**
For module documentation, see [Product Relation](/docs/scos/dev/features/202001.0/product-information-management/product-relations/product-relations.html). For integration guides see: [Product Relations Feature Integration](https://documentation.spryker.com/v4/docs/product-relation-integration).

### Event Module
This release introduces the `Event` module. It implements the Observer pattern where you can add extension points(events) in your code and allow other modules to listen and react to those events. Asynchronous event handling is supported.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [Event 1.0.0](https://github.com/spryker/Event/releases/tag/1.0.0) | <ul><li>[Category 3.1.0](https://github.com/spryker/Category/releases/tag/3.1.0)</li><li>[Product 5.1.0](https://github.com/spryker/Product/releases/tag/5.1.0)</li><li> [ProductCategory 4.1.0](https://github.com/spryker/product-category/releases/tag/4.1.0)</li></ul> | [Event 1.0.1](https://github.com/spryker/Event/releases/tag/1.0.1) |

**Documentation**
For module documentation, see [Event](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/event/event.html).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```
* Once that is done, upgrade to the new CMS major and its dependencies:

```bash
composer require spryker/event:"^1.0.0" spryker/product-relation:"^1.0.0" spryker/product-relation-collector:"^1.0.0"
```

### Beta: Propel Query Builder
This module can be used to generate advanced conditional queries based on user input. Samples for usage can be found in feature product relations. We use it in our administrative backend for defining rule application and scope/conditions. The Propel query criteria it generates is based on [jQuery QueryBuilder](http://querybuilder.js.org/).

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | PropelQueryBuilder 0.1.1 | n/a |

## Improvements
### Enable 3rd Party Integrations
With this release, we enabled 3rd party integrations for the core. It’s now possible to create packages which can be installed along with `spryker/*` modules into the vendor directory.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a |[Twig 3.1.0](https://github.com/spryker/Twig/releases/tag/3.1.0)  | <ul><li>[Application 3.1.1](https://github.com/spryker/Application/releases/tag/3.1.1)</li><li>[Development 3.1.1](https://github.com/spryker/Development/releases/tag/3.1.1)</li><li>[Glossary 3.0.1](https://github.com/spryker/Glossary/releases/tag/3.0.1)</li><li>[Propel 3.0.1](https://github.com/spryker/Propel/releases/tag/3.0.1)</li><li>[Testify 3.0.2](https://github.com/spryker/Testify/releases/tag/3.0.2)</li><li>[Transfer 3.1.1](https://github.com/spryker/Transfer/releases/tag/3.1.1)</li><li>[ZedNavigation 1.0.1](https://github.com/spryker/zed-navigation/releases/tag/1.0.1)</li></ul> |

## Bugfixes
### Customer Salutation in Order
Previously on checkout the salutation column was not populated in   `spy_sales_order`. This issue is fixed now. We have modified the `hydrateSalesOrderCustomer()` so that it stores all applicable customer data to the order.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Sales 5.1.0](https://github.com/spryker/Sales/releases/tag/5.1.0) |[Sales 5.1.1](https://github.com/spryker/Sales/releases/tag/5.1.1)  |

### Kernel Resolver Fix
Resolving classes for store specific modules didn’t work as expected. Classes that did not get overridden in the store specific module would not get resolved to the non-store specific module classes. The class resolvers have been changed to fix this issue to properly resolve classes.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Kernel 3.1.1](https://github.com/spryker/Kernel/releases/tag/3.1.1) |

### Processing Multiple Items in StateMachine
Previously, we had an issue in state machine transaction handling. If any item in collection was failing to process, an exception was thrown. That was a problem because when state machine executes commands where external calls are made, it was not possible to guarantee atomic operation. This issue is solved now. If a single sales item fails then the item process will be rolled back for that single item, not the entire collection.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a | <ul><li>[Oms 6.0.1](https://github.com/spryker/Oms/releases/tag/6.0.1)</li><li>[StateMachine 2.0.1](https://github.com/spryker/state-machine/releases/tag/2.0.1)</li></ul> |

### Inconsistent Log Files Path
Previously, we had an inconsistency problem among different logger path builder implementations. Most modules had `Store::getInstance()->getStoreName()` for store specific logs path key, but some modules had `Store::getInstance()->getCurrentLocale()`. With the default demoshop setup, this was not an issue because we have store names same like locale codes (DE, AT, etc.). However, as soon as the store name varies from the locale code, this logic was not working anymore. We have fixed this inconsistency in log files path by replacing `getCurrentLocale()` with `getStoreName()`.

**Affected modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Application 3.1.2](https://github.com/spryker/Application/releases/tag/3.1.2)</li><li>[ZedRequest 3.0.2](https://github.com/spryker/ZedRequest/releases/tag/3.0.2)</li></ul> |

### UtilEncoding Fix for Custom Options
The JSON encoding did not properly consider custom options. If you supplied your own encoding options, those were ignored. They now get passed through as expected, and you can, for example, set up:

```php
<?php
$options = Json::DEFAULT_OPTIONS | JSON_PRETTY_PRINT;

return $this->service->encodeJson($value, $options);
```
to allow more human-readable output for development mode.

| Major | Minor | Patch |
| --- | --- | --- |
|  n/a| n/a | [UtilEncoding 2.0.1](https://github.com/spryker/util-encoding/releases/tag/2.0.1) |
**Affected modules**

