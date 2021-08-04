---
title: Release Notes - November - 1 2017
originalLink: https://documentation.spryker.com/v4/docs/release-notes-november-1-2017
redirect_from:
  - /v4/docs/release-notes-november-1-2017
  - /v4/docs/en/release-notes-november-1-2017
---

{% info_block infoBox %}
This month we released some important [security updates](/docs/scos/dev/about-spryker/202001.0/whats-new/security-update
{% endinfo_block %}.)

## Features
### Multi-currency for Shipments
We are currently working on full enablement of multi-store and multi-currency concepts. In consequent releases, we will be enabling every relevant functionality with multi-store and -currency step-by-step.

This release focuses on enabling multi-currency for shipments. It allows you to manage multi-currency prices for shipment methods. We have extracted the shipment method price data to a separate table now (`spy_shipment_method_price`) and the `default_price` field is now deprecated in the `spy_shipment_method` table. The shipment method prices in Yves are retrieved for the given store, price mode and selected currency. `CheckoutAvailableShipmentMethodsPlugin` has major impact in its result because of the multi-currency price structure.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [Shipment 6.0.0](https://github.com/spryker/Shipment/releases/tag/6.0.0) | <ul><li>[Kernel 3.13.0](https://github.com/spryker/Kernel/releases/tag/3.13.0)</li><li>[Money 2.3.0](https://github.com/spryker/Money/releases/tag/2.3.0)</li></ul> |[ShipmentDiscountConnector 1.1.1](https://github.com/spryker/shipment-discount-connector/releases/tag/1.1.1)  |

**Documentation**
For module documentation, see Shipment Module Guide<!--/module_guide/spryker/shipment.htm)-->.
For detailed migration guides, see [Shipment Module Migration Guide from Version 5. to 6](https://documentation.spryker.com/v4/docs/mg-shipment#upgrading-from-version-5---to-version-6--).
For store administration guides, see Shipment Store Administration Guide<!--/administration_interface_guide/shipment.htm)-->
For other related documentation, see [HowTo - Add New Shipment Method](/docs/scos/dev/tutorials/202001.0/howtos/ht-add-new-ship)

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/shipment:"^6.0.0"
```

### Introducing Infrastructure for Upcoming Publish & Synchronisation
This release provides the required infrastructure for Publish &amp; Synchronisation, the next generation of collectors with structured data, clear way of publishing data to Yves storages, storage tables per module, no raw SQL queries, new fast synchronisation possibility and much more. This release includes main entities events, storage and search APIs, optimised Queue module, etc.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[Event 2.0.0](https://github.com/spryker/Event/releases/tag/2.0.0)</li><li>[Queue 1.0.0](https://github.com/spryker/Queue/releases/tag/1.0.0)</li><li>[RabbitMq 1.0.0](https://github.com/spryker/rabbit-mq/releases/tag/1.0.0)</li></ul> | <ul><li>[Availability 5.2.0](https://github.com/spryker/Availability/releases/tag/5.2.0)</li><li>[Category 4.2.0](https://github.com/spryker/Category/releases/tag/4.2.0)</li><li>[Cms 6.3.0](https://github.com/spryker/Cms/releases/tag/6.3.0)</li><li>[CmsBlock 1.4.0](https://github.com/spryker/cms-block/releases/tag/1.4.0)</li><li>[Console 3.2.0](https://github.com/spryker/Console/releases/tag/3.2.0)</li><li>[EventBehavior 0.1.0](https://github.com/spryker/event-behavior/releases/tag/0.1.0)</li><li>[Glossary 3.2.0](https://github.com/spryker/Glossary/releases/tag/3.2.0)</li><li>[Kernel 3.12.0](https://github.com/spryker/Kernel/releases/tag/3.12.0)</li><li>[Navigation 2.1.0](https://github.com/spryker/Navigation/releases/tag/2.1.0)</li><li>[Price 4.3.0](https://github.com/spryker/Price/releases/tag/4.3.0)</li><li>[Product 5.3.0](https://github.com/spryker/Product/releases/tag/5.3.0)</li><li>[ProductCategory 4.4.0](https://github.com/spryker/product-category/releases/tag/4.4.0)</li><li>[ProductGroup 1.1.0](https://github.com/spryker/product-group/releases/tag/1.1.0)</li><li>[ProductImage 3.4.0](https://github.com/spryker/product-image/releases/tag/3.4.0)</li><li>[ProductLabel 2.2.0](https://github.com/spryker/product-label/releases/tag/2.2.0)</li><li>[ProductOption 5.4.0](https://github.com/spryker/product-option/releases/tag/5.4.0)</li><li>[ProductRelation 1.1.0](https://github.com/spryker/product-relation/releases/tag/1.1.0)</li><li>[ProductSearch 5.2.0](https://github.com/spryker/product-search/releases/tag/5.2.0)</li><li>[ProductSet 1.2.0](https://github.com/spryker/product-set/releases/tag/1.2.0)</li><li>[PropelOrm 1.3.0](https://github.com/spryker/propel-orm/releases/tag/1.3.0)</li><li>[Search 6.8.0](https://github.com/spryker/Search/releases/tag/6.8.0)</li><li>[Synchronization 0.1.0](https://github.com/spryker/Synchronization/releases/tag/0.1.0)</li><li>[SynchronizationBehavior 0.1.0](https://github.com/spryker/synchronization-behavior/releases/tag/0.1.0)</li><li>[Transfer 3.5.0](https://github.com/spryker/Transfer/releases/tag/3.5.0)</li><li>[Url 3.2.0](https://github.com/spryker/Url/releases/tag/3.2.0)</li><li>[UtilSanitize 2.1.0](https://github.com/spryker/util-sanitize/releases/tag/2.1.0)</li></ul> | n/a |

**Documentation**
For detailed migration guides, see [RabbitMQ Module Migration Guide from Version 0. to 1](https://documentation.spryker.com/v4/docs/mg-rabbitmq#upgrading-from-version-0---to-version-1--).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/rabbit-mq:"^1.0.0" spryker/event:"^2.0.0" spryker/event-behavior:"^0.1.0" spryker/queue:"^1.0.0" spryker/synchronization:"^0.1.0" spryker/synchronization-behavior:"^0.1.0"
```

## Improvements
### State Machine Sub-process Reuse
A sub-processes in Spryker state machine allows you to simplify workflows. Each sub-process can represent a part of your business logic. Sometimes within the business logic you might need to have same or similar sub-processes multiple times (e.g. transactional email, refund). With this release, we allow you to copy state machine sub-processes as many times as you need in a project workflow. This will allow you to reuse existing parts of a state machine schema. For more details, see [Modelling - State Machine](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/datapayload-conversion/state-machine/order-process-m).

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [StateMachine 2.1.0](https://github.com/spryker/state-machine/releases/tag/2.1.0) | n/a |

### Aggregated Reservations for Availability Updates
Previously, we had an issue when reading the number of reserved items to calculate the product availability in `Oms`. Previously, a non-aggregated function was being used to read the reservation, which had an impact on performance. To improve this, there is a new method in `Oms` module which only returns the aggregated numbers instead of running the whole calculation. The `Availability` module uses those aggregated numbers for product availability calculation.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Oms 7.2.0](https://github.com/spryker/Oms/releases/tag/7.2.0) | [Availability 5.2.1](https://github.com/spryker/Availability/releases/tag/5.2.1) |

### Dedicated Log Configuration Plugins
Previously, there was only one Log configuration which was used by Yves and Zed. It is now possible to use dedicated Log configuration plugins for each application. Handlers and Processors can now be different for the applications.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Log 3.2.0](https://github.com/spryker/Log/releases/tag/3.2.0) | [Queue 1.0.1](https://github.com/spryker/Queue/releases/tag/1.0.1) |

### Decoupling JavaScript Dependency in CMS
With this release, we have removed `Cms` and `CmsBlockGui` JavaScript hidden dependencies to `CmsContentWidget`.

If you are using `CmsContentWidget` with `Cms` and/or `CmsBlockGui`, and you want to update at least one of them, please update `CmsContentWidget` to version 1.1.1 or higher in order to avoid inconsistencies and issues in Zed Administration Interface.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Cms 6.3.1](https://github.com/spryker/Cms/releases/tag/6.3.1)</li><li>[CmsBlockGui 1.1.4](https://github.com/spryker/cms-block-gui/releases/tag/1.1.4)</li><li>[CmsContentWidget 1.1.1](https://github.com/spryker/cms-content-widget/releases/tag/1.1.1)</li></ul> |

## Bugfixes
###  SECURITY Missing Twig Variable on Zed Sales Detail View
Previously, there was a twig error in Zed order details page when displaying order items without grouping them. This was happening when `ProductBundleOrderHydratePlugin` was not enabled in the order hydration plugin stack. The issue is fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Sales 8.0.4](https://github.com/spryker/Sales/releases/tag/8.0.4) |

### Include Services in Dependency Violation Finder
Previously, dependency violation finder ignored Service files during dependency check. This issue is fixed now, service files are also checked for violation finding and their missing dependency are be highlighted.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Development 3.3.3](https://github.com/spryker/Development/releases/tag/3.3.3)</li><li>[FileSystem 1.0.2](https://github.com/spryker/file-system/releases/tag/1.0.2)</li><li>[Flysystem 1.0.1](https://github.com/spryker/Flysystem/releases/tag/1.0.1)</li><li>[FlysystemAws3v3FileSystem 1.0.1](https://github.com/spryker/flysystem-aws3v3-file-system/releases/tag/1.0.1)</li><li>[FlysystemFtpFileSystem 1.0.1](https://github.com/spryker/flysystem-ftp-file-system/releases/tag/1.0.1)</li><li>[FlysystemLocalFileSystem 1.0.1](https://github.com/spryker/flysystem-local-file-system/releases/tag/1.0.1)</li><li>[UtilDataReader 1.2.1](https://github.com/spryker/util-data-reader/releases/tag/1.2.1)</li><li>[UtilDateTime 1.0.2](https://github.com/spryker/util-date-time/releases/tag/1.0.2)</li><li>[UtilEncoding 2.0.3](https://github.com/spryker/util-encoding/releases/tag/2.0.3)</li><li>[UtilNetwork 1.1.1](https://github.com/spryker/util-network/releases/tag/1.1.1)</li><li>[UtilSanitize 2.1.1](https://github.com/spryker/util-sanitize/releases/tag/2.1.1)</li><li>[UtilText 1.2.1](https://github.com/spryker/util-text/releases/tag/1.2.1)</li></ul> |

### Multi-currency Support for Promotional Products
Since the [Multi-currency for Discounts](https://documentation.spryker.com/v4/docs/release-notes-october-2-2017#multi-currency-for-discounts) was released, we had in issue with promotional products in discounts. The price was moved from product to quoteTransfer but promotional products still read from the old `PRICE_MODE`. So when trying to read the price, there was no price found. This issue is fixed now, it's now price agnostic.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [DiscountPromotion 1.0.3](https://github.com/spryker/discount-promotion/releases/tag/1.0.3) |

### Propel SQL Insert Command Fail
Previously, `InsertSqlConsole` used a wrong path configuration. Executing this command was throwing an exception as it was not possible to load any configuration. We have now updated it to use the one that all other commands use.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Propel 3.2.2](https://github.com/spryker/Propel/releases/tag/3.2.2) |

### Calculation BC Fix
Our recent Calculation 4.2.0 release introduced a BC breaking issue in Calculation. The `DiscountAmountAggregator` was calling `$calculatedDiscountTransfer->getUnitAmount()` yet the unit amount was introduced in a successive release. This issue is fixed now to make sure the Calculation does not depend on the Discount major.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Calculation 4.2.1](https://github.com/spryker/Calculation/releases/tag/4.2.1) |

## Documentation Updates
The following content has been added to the Academy:

* [Queue Integration - Loggly](/docs/scos/dev/technology-partners/202001.0/operational-tools-monitoring-legal-etc./loggly-queue)
* [Payolution — Configuration](/docs/scos/dev/technology-partners/202001.0/payment-partners/payolution/payolution-conf)
* [Payolution — Workflow](/docs/scos/dev/technology-partners/202001.0/payment-partners/payolution/payolution-work)

Your feedback would be highly appreciated. Please help us understand what you need from the Spryker Academy by filling out a very short [survey](https://docs.google.com/forms/d/1_vZg0lfqq24Qf9-fQhU50NgsEBy4eDqnDyx7gKz9Faw/edit).
