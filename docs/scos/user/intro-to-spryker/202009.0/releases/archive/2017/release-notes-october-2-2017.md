---
title: Release Notes - October - 2 2017
originalLink: https://documentation.spryker.com/v6/docs/release-notes-october-2-2017
redirect_from:
  - /v6/docs/release-notes-october-2-2017
  - /v6/docs/en/release-notes-october-2-2017
---

## Features
### Multi-currency for Discounts
We are currently working on full enablement of multi-store and multi-currency concepts. In consequent releases, we will be enabling every relevant functionality with multi-store and -currency step-by-step.

This release focuses on enabling multi-currency for discounts. It allows you to enter discount amount per currency and price mode (net/gross), filter discounts by currency and/or price mode. We have also introduced new money collection component for multi-currency forms.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[CartCurrencyConnector 1.0.0](https://github.com/spryker/cart-currency-connector/releases/tag/1.0.0)</li><li>[Discount 5.0.0](https://github.com/spryker/Discount/releases/tag/5.0.0)</li></ul> | <ul><li>[Calculation 4.2.0](https://github.com/spryker/Calculation/releases/tag/4.2.0)</li><li>[Cart 4.1.0](https://github.com/spryker/Cart/releases/tag/4.1.0)</li><li>[Currency 3.1.0](https://github.com/spryker/Currency/releases/tag/3.1.0)</li><li>[Kernel 3.11.0](https://github.com/spryker/Kernel/releases/tag/3.11.0)</li><li>[Money 2.2.0](https://github.com/spryker/Money/releases/tag/2.2.0)</li><li>[ProductDiscountConnector 3.2.0](https://github.com/spryker/product-discount-connector/releases/tag/3.2.0)</li><li>[ProductLabelDiscountConnector 1.2.0](https://github.com/spryker/product-label-discount-connector/releases/tag/1.2.0)</li><li>[ShipmentDiscountConnector 1.1.0](https://github.com/spryker/shipment-discount-connector/releases/tag/1.1.0)</li><li>[Store 1.1.0](https://github.com/spryker/Store/releases/tag/1.1.0)</li></ul> | <ul><li>[CustomerGroupDiscountConnector 2.0.2](https://github.com/spryker/customer-group-discount-connector/releases/tag/2.0.2)</li><li>[DiscountCalculationConnector 5.0.1](https://github.com/spryker/DiscountCalculationConnector/releases/tag/5.0.1)</li><li>[DiscountPromotion 1.0.2](https://github.com/spryker/discount-promotion/releases/tag/1.0.2)</li><li>[OmsDiscountConnector 3.0.1](https://github.com/spryker/oms-discount-connector/releases/tag/3.0.1)</li></ul> |

**Documentation**
For module documentation, see Module Guide - Discount<!--/module_guide/spryker/discount.htm)-->, Module Guide - Currency<!--/module_guide/spryker/currency.htm)-->, Module Guide - Money<!--/module_guide/spryker/money.htm)-->.
For detailed migration guides, see [Discount Module Migration Guide from Version 4. to 5](https://documentation.spryker.com/v4/docs/mg-discount#upgrading-from-version-4---to-version-5--), Migration Guide - Discount Amounts Migration Console Command.

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/cart-currency-connector:"^1.0.0" spryker/discount:"^5.0.0"
```

## Improvements
### Twig Data Access Optimization
With this release, we are introducing performance optimizations for a transfer object. The usage of transfer objects is a frequent procedure in Twig templates. Flexible Twig tries to access a property of a passed object in different ways and that slows it down. The most optimized way is to pass an array to twig (up to 10x). In order to achieve a middle level optimization (3x) for Twig calls without any changes from project side, we now apply  `ArrayAccess` to transfer object.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Kernel 3.11.1](https://github.com/spryker/Kernel/releases/tag/3.11.1) |

### Code Sniffer for Project Modules
With this release, we now allow the code sniffer to run in module specific folders on project level. It checks the existence of each application layer per module. You can run the code sniffer for a specific module using the following command: `console code:sniff:style -m MyModuleName`. You can also check out the new version of our [Code Sniffer 0.11.0](https://github.com/spryker/code-sniffer/releases/tag/0.11.0). We now have full PSR-2 support and many new powerful sniffs available.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Development 3.3.1](https://github.com/spryker/Development/releases/tag/3.3.1) | n/a |

### Architecture Sniffer for Custom Paths in Project or Vendor
With this release, the architecture sniffer supports custom paths for project and vendor folders.

**Affected Modules**

| Major | Minor| Patch |
| --- | --- | --- |
| n/a | n/a | [Development 3.3.2](https://github.com/spryker/Development/releases/tag/3.3.2) |

## Bugfixes
### Prevent Logger from Encoding All Entity Relations
In order to have a detailed DB access log during development, Spryker provides Propel model builder with a logger stack attached. In some cases, the logger stack could cause a system timeout. To prevent this, the logger stack now processes only the array presentation of Propel entities, Spryker Demoshop uses a model builder without logging by default.

In order to prevent performance issues and switch off the Propel logging in your project:

* Find the "APP_DIR/config/Shared/config_propel.php" and replace in it the Propel object builder from `Spryker\Zed\Propel\Business\Builder\ObjectBuilderWithLogger` to `Spryker\Zed\Propel\Business\Builder\ObjectBuilder.
* Regenerate` Propel models with `./vendor/bin/console propel:model:build` in command line.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Propel 3.2.1](https://github.com/spryker/Propel/releases/tag/3.2.1) |

### Synchronize URL Facade Bridges
UrlFacade offers backward compatibility over `UrlFacadeInterface::createUrl()`, `UrlFacadeInterface::hasUrl()`, and `UrlFacadeInterface::deleteUrlRedirect()` methods. Related bridges in other modules now also allow the backward compatible calls to the `UrlFacade` and thus the interface incompatibilities between Facade and Bridges were removed.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Category 4.1.2](https://github.com/spryker/Category/releases/tag/4.1.2)</li><li>[Cms 6.2.1](https://github.com/spryker/Cms/releases/tag/6.2.1)</li><li>[CmsGui 4.3.1](https://github.com/spryker/cms-gui/releases/tag/4.3.1)</li><li>[Product 5.2.2](https://github.com/spryker/Product/releases/tag/5.2.2)</li><li>[ProductSet 1.1.1](https://github.com/spryker/product-set/releases/tag/1.1.1)</li><li>[ProductSetGui 1.1.2](https://github.com/spryker/product-set-gui/releases/tag/1.1.2)</li><li>[Url 3.2.1](https://github.com/spryker/Url/releases/tag/3.2.1)</li></ul> |

### getMulti Returning Nonprefixed Keys
With one of our recent releases, in order to implement cache for getMulti, a BC breaking bug was introduced. getMulti was returning nonprefixed keys. This issue has been fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Storage 3.3.2](https://github.com/spryker/Storage/releases/tag/3.3.2) |

### Navigation Child Node Frame
In Zed Administration Interface for the Navigation UI, the child node frame height was formerly causing usability issues. In certain cases the height of the frame was too small introducing inner scrolling. This issue is fixed now by introducing a new way of height calculation.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [NavigationGui 2.0.1](https://github.com/spryker/navigation-gui/releases/tag/2.0.1) |

Your feedback would be highly appreciated. Please help us understand what you need from the Spryker Academy by filling out a very short [survey](https://docs.google.com/forms/d/1_vZg0lfqq24Qf9-fQhU50NgsEBy4eDqnDyx7gKz9Faw/edit).
