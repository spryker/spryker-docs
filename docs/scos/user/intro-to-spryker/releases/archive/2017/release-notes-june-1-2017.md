---
title: Release Notes - June - 1 2017
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-june-1-2017
originalArticleId: c2b7b777-77ef-484c-9805-516b329c3f92
redirect_from:
  - /2021080/docs/release-notes-june-1-2017
  - /2021080/docs/en/release-notes-june-1-2017
  - /docs/release-notes-june-1-2017
  - /docs/en/release-notes-june-1-2017
---

## Improvements
### Session Service Provider Enhancement
Previously, Yves and Zed` SessionServiceProvider` contained a switch statement to determine which `SessionHandler` should be used. The switch is a violation of the open-close principle and therefore we refactored the current `SessionServiceProvider` for both applications. Now, the `SessionServiceProvider` is able to get the options for `$application['session.storage.options']` and the handler for `$application['session.storage.handler']` from a new `SessionStorage` class which is accessible via the factory. In addition, options are now properly retrieved from the `SessionConfig` classes. Now, you can add your own `SessionHandlerInterfaces` easier and in a more clean way.

**Affected modules**

| MAJOR | MINOR | PATCH |
| --- | --- | --- |
| n/a |  [Session 3.2.0](https://github.com/spryker/Session/releases/tag/3.2.0) | [Testify 3.2.4](https://github.com/spryker/Testify/releases/tag/3.2.4) |

### Autoload Entry for BC
The autoload entry for deprecated Testify\Module\Environment Codeception Helper was missing. We have now added it again to the `composer.json` file.

**Affected (Undefined variable: General.Bundle/Module)s**

| MAJOR | MINOR | PATCH |
| --- | --- | --- |
| n/a | n/a | [Testify 3.2.5](https://github.com/spryker/Testify/releases/tag/3.2.5) |

### Combining Product Images
With these changes, we introduce a common way to combine images related to a product. The `ImageSet` is the key subject of image inheritance. We take  `ImageSet` from the next layer if it does not exist on the current one. The nested logic is as follows: Abstract Default &gt; Abstract Localized &gt; Concrete Default &gt; Concrete Localized.

To get all benefits of this fix, you should arrange your collectors to use facade methods instead of raw-queries in your product collectors: `ProductImageFacade::getCombinedAbstractImageSets` for abstract product collector (`ProductAbstractCollector`) and `ProductImageFacade::getCombinedConcreteImageSets` for concrete product collector (`ProductConcreteCollector`).

This release is backward compatible, so if you have your own image collector functionality, you can keep it.

**Affected modules**

| MAJOR | MINOR | PATCH |
| --- | --- | --- |
| n/a | <ul><li>[ProductImage 3.2.0](https://github.com/spryker/product-image/releases/tag/3.2.0)</li><li>[ProductManagement 0.5.0](https://github.com/spryker/product-management/releases/tag/0.5.0)</li></ul> | n/a |

### GetConfig for DependencyProvider
Previously, it was not possible to get the config of the module inside of the `DependencyProvider`. You can now use `getConfig()` in your `DependencyProvider` to get the bundle Config class.

**Affected modules**

| MAJOR | MINOR | PATCH |
| --- | --- | --- |
| n/a |  [Kernel 3.3.0](https://github.com/spryker/Kernel/releases/tag/3.3.0)| n/a |

### Moving Glob to Finder
For performance reasons, we have moved `glob()` from `ZedNavigationConfig` to `ZedNavigationSchemaFinder`. This will avoid having `glob()` called on every request. We have also enabled Zed path cache for Twig by default.

**Affected modules**

| MAJOR | MINOR | PATCH |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Twig 3.1.3](https://github.com/spryker/Twig/releases/tag/3.1.3)</li><li>[ZedNavigation 1.0.6](https://github.com/spryker/zed-navigation/releases/tag/1.0.6)</li></ul> |

## Bugfixes
### Category Touch Logic
Touch handling for categories didn’t cover certain use-cases when categories were moved around in the category tree. We had issues when adding/updating/deleting category node parents. Parent category nodes were not being touched, so they were not being updated about the changes in their children nodes. Old parent category nodes were not being touched, so they were not being notified about their children nodes. Products assigned to categories that are under a modified category sub-tree were also not being touched.

We have now extended the touch handling to touch the entire tree branch from the root to the leaf for a modified category. Former parent nodes will also get touched along with related products in these tree branches.

**Affected modules**

| MAJOR | MINOR | PATCH |
| --- | --- | --- |
| n/a | <ul><li>[Category 3.2.0](https://github.com/spryker/Category/releases/tag/3.2.0)</li><li>[ProductCategory 4.2.0](https://github.com/spryker/product-category/releases/tag/4.2.0)</li></ul> | n/a |

### On Demand Formater for Querying Voucher Discounts
We had an issue with multiple vouchers coming from the same pool. Propel’s `ObjectFormatter` was overwriting the virtual columns in `DiscountQueryContainer::queryDiscountsBySpecifiedVouchers()` results. This issue is fixed now. We added `OnDemandFormatter` Propel formatter for discount voucher query in order to properly hydrate voucher discounts when codes were coming from same pool.

**Affected modules**

| MAJOR | MINOR | PATCH |
| --- | --- | --- |
| n/a | n/a | [Discount 4.0.2](https://github.com/spryker/Discount/releases/tag/4.0.2) |

### Incorrect Prices for Currencies with No Minor Units
There was an error because of conversion from int to `dec` and dec to `int`. The field type money made no proper use of divisor and scale attributes to handle currencies with and without minor units properly. When a price value was edited with a currency without minor units (e.g. Yen) then the conversion was wrong (e.g. 300 YEN was converted to 30000 YEN). This issue is resolved now.

**Affected modules**

| MAJOR | MINOR | PATCH |
| --- | --- | --- |
| n/a | [Currency 2.1.0](https://github.com/spryker/Currency/releases/tag/2.1.0) | <ul><li>[ProductManagement 0.6.0](https://github.com/spryker/product-management/releases/tag/0.6.0)</li><li>[ProductManagement 0.6.1](https://github.com/spryker/product-management/releases/tag/0.6.1)</li></ul> |
