---
title: Release Notes - September - 2 2017
originalLink: https://documentation.spryker.com/v1/docs/release-notes-september-2-2017
redirect_from:
  - /v1/docs/release-notes-september-2-2017
  - /v1/docs/en/release-notes-september-2-2017
---

## Features
### Discount Promotion Products
For marketing reasons you, a shop owner, might sometimes give away free or discounted products. This can happen depending on the cart content or via a redeemed voucher code. With this release, we are introducing discount promotions fully integrated with our discount engine. Now, you can easily give away free perks, for example, when the cart value reaches a certain threshold. Or, for example, when a customer buys a certain product you can give away a complimentary product for free or with a reduced price. Some of the most common use cases for this feature are "buy one, get one for free", "buy product X, get product Y for free", "buy 10 of product X and get 1 of product X for free". All this is now possible with our discount promotions. 
![Discount promotion products](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+September+-+2+2017/RN_discount_promotion_products.gif){height="" width=""}

![Discount promotion products in Zed](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+September+-+2+2017/RN_discount_promotion_products_zed.gif){height="" width=""}

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [DiscountPromotion 1.0.0](https://github.com/spryker/discount-promotion/releases/tag/1.0.0) | [Discount 4.5.0](https://github.com/spryker/Discount/releases/tag/4.5.0) | <ul><li>[Availability 5.0.3](https://github.com/spryker/Availability/releases/tag/5.0.3)</li><li>[DiscountPromotion 1.0.1](https://github.com/spryker/discount-promotion/releases/tag/1.0.1)</li></ul> |
    
**Documentation**
For module documentation, see [Discount Module Guide](/docs/scos/dev/features/201811.0/promotions-and-discounts/discount/discount), Extending the Discount Module, [Discount Promotions](/docs/scos/dev/features/201811.0/promotions-and-discounts/promotions-disc).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/discount-promotion:"^1.0.0"
```

### Product Reviews and Ratings
With this release, we are introducing product reviews and ratings. Reviews are a powerful marketing tool for your online store. There are various reasons why you might want to have this feature. Customer created content generates considerable amount of sales uplift by influencing your buyers decision making. A positive feedback from another buyer builds trust and increases the chances for the sale. In addition, product reviews can also positively affect your site’s organic search ranking in search engines, as this content increases the amount of overall unique content. The product review feature allows you to submit product reviews and ratings in the shop application. We also ship this feature with a dedicated Zed Admin UI which allows a store manager to review submitted content, approve, reject, or delete reviews. The approved reviews, ratings, and assembled data can be displayed on demand in your shop for the products as well as those can be used for catalog filtering and/or sorting. With this feature, we have also introduced an improvement to the search engine. Now, the search is capable of storing and reading data divided into different types and indexes. In addition, data tables are now capable of using additional data in presentation than defined in their headers.
![Discount ratings](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+September+-+2+2017/RN_product_reviews_and_ratings.gif){height="" width=""}

![Discount ratings in Zed](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+September+-+2+2017/RN_product_reviews_and_ratings_zed.gif){height="" width=""}

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[ProductReview 1.0.0](https://github.com/spryker/product-review/releases/tag/1.0.0)</li><li>[ProductReviewCollector 1.0.0](https://github.com/spryker/product-review-collector/releases/tag/1.0.0)</li><li>[ProductReviewGui 1.0.0](https://github.com/spryker/product-review-gui/releases/tag/1.0.0)</li></ul> | <ul><li>[Collector 5.5.0](https://github.com/spryker/Collector/releases/tag/5.5.0)</li><li>[Gui 3.9.0](https://github.com/spryker/Gui/releases/tag/3.9.0)</li></ul> | n/a |

**Documentation**
For documentation, see [Under the Hood - Product Reviews](https://documentation.spryker.com/v1/docs/product-review-under-the-hood), Product Reviews Feature Configuration, [Filter and Sort by Average Rating](/docs/scos/dev/features/201811.0/product-management/product-review-)

For feature integration, see [Feature Integration - Product Reviews](/docs/scos/dev/migration-and-integration/201811.0/feature-integration-guides/product-review-).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/product-review:"^1.0.0" spryker/product-review-collector:"^1.0.0" spryker/product-review-gui:"^1.0.0"
```

### Multi Currency Infrastructure
We are currently working on full enablement of multi-store and multi-currency concepts. With this release, we introduce infrastructure to support those feature. In consequent releases, we will be step-by-step enabling every relevant functionality with multi-store and -currency. 

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|<ul><li>[Currency 3.0.0](https://github.com/spryker/Currency/releases/tag/3.0.0)</li><li>[Store 1.0.0](https://github.com/spryker/Store/releases/tag/1.0.0)</li></ul> | <ul><li>[Kernel 3.7.0](https://github.com/spryker/Kernel/releases/tag/3.7.0)</li><li>[Money 2.1.0](https://github.com/spryker/Money/releases/tag/2.1.0)</li><li>[ZedRequest 3.2.0](https://github.com/spryker/zed-request/releases/tag/3.2.0)</li></ul> | <ul><li>[Braintree 0.5.5](https://github.com/spryker/Braintree/releases/tag/0.5.5)</li><li>[ProductManagement 0.8.2](https://github.com/spryker/product-management/releases/tag/0.8.2)</li><li>[Kernel 3.7.2](https://github.com/spryker/Kernel/releases/tag/3.7.2)</li></ul> |

**Documentation**
For detailed migration guides, see [Currency Module Migration Guide from Version 2. to 3](https://documentation.spryker.com/v1/docs/mg-currency#upgrading-from-version-2---to-version-3--).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/currency:"^3.0.0" spryker/store:"^1.0.0"
```

### Propel Migration Check Console Command
We have added a new `console propel:migration:check` 

The `MigrationCheckConsole` command to get a unified output for Propel's status command. This check can be used, for example, to find out if a maintenance page needs to be shown during deployment or not. Scripts can check for the return code 0 (all good) vs. 2 (migration needed).

The command is auto-added to `ConsoleDependencyProvider` when pulling this new minor.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Propel 3.2.0](https://github.com/spryker/Propel/releases/tag/3.2.0) | n/a |

### Config Profiler
We have added a new WebProfiler Panel which shows all used Spryker configurations. To enable ConfigProfiler, you need to add it to your `ConsoleDependencyProvider` and enable it in your required environments by setting `$config[ConfigConstants::ENABLE_WEB_PROFILER]` to `true`.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Config 3.1.0](https://github.com/spryker/Config/releases/tag/3.1.0) | [Twig 3.2.2](https://github.com/spryker/Twig/releases/tag/3.2.2) |

## Improvements
### Product Availability Retrieval Enhancement
This release adds a new method to Availability Client which returns the product availability or null when it does not exist in Storage. The "getter" method of Availability Client now throws a custom exception instead of the generic one.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Availability 5.1.0](https://github.com/spryker/Availability/releases/tag/5.1.0) | n/a |

### Touch Aware Data Importers to Touch Inactive
Previously, it was only possible to add touch items active during  `DataImport`. With this change, it is now possible to also touch inactive and deleted.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [DataImport 1.2.0](https://github.com/spryker/data-import/releases/tag/1.2.0) | n/a |

### Validator Updates for Transfers
We have adjusted `TransferValidator` to take new simple array definitions into account. This  also unifies normal array type to "array", "[]" issues a warning. Please run `console transfer:validate` in their CI to assert if only valid transfer definitions are added.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[CmsBlockCategoryConnector 2.0.4](https://github.com/spryker/cms-block-category-connector/releases/tag/2.0.4)</li><li>[CmsBlockProductConnector 1.0.3](https://github.com/spryker/CmsBlockProductConnector/releases/tag/1.0.3)</li><li>[ProductOptionCartConnector 4.1.2](https://github.com/spryker/product-option-cart-connector/releases/tag/4.1.2)</li><li>[Ratepay 0.6.3](https://github.com/spryker/Ratepay/releases/tag/0.6.3)</li><li>[Transfer 3.3.5](https://github.com/spryker/Transfer/releases/tag/3.3.5)</li></ul> |

### Navigation Redis Entry Optimization
The Redis entry for Main Navigation contained unneeded data for all navigation nodes, causing a big Redis entry. In a production environment, this Redis entry would take more time to fetch especially in a distributed setup as the latency would be even higher. This improvement cleans up the Navigation entry in Redis from all the unneeded data and improves the performance for loading the navigation.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [NavigationCollector 1.0.2](https://github.com/spryker/navigation-collector/releases/tag/1.0.2) |

### Kernel Class Resolver Performance
Previously, each call to `canResolve()` was building a possible class name and checking if that class exists. With this improvement, we added a cache that stores the already resolved class names to make sure that the entire resolving roundtrip is not done over and over again.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Kernel 3.6.0](https://github.com/spryker/Kernel/releases/tag/3.6.0)</li><li>[Testify 3.3.0](https://github.com/spryker/Testify/releases/tag/3.3.0)</li></ul> | n/a |

### Missing Index for Stock Table
The Concrete product collector has been slow because of a missing index. A missing index has been added now to increase the performance.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Stock 4.0.6](https://github.com/spryker/Stock/releases/tag/4.0.6) |

### Price Check Query Performance
To improve price check query performance, we have removed the count to make a query faster.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a | n/a | [Price 4.2.2](https://github.com/spryker/Price/releases/tag/4.2.2) |

### Output Execution Time for Importers
With this release, we are introducing output time taken in `data:import` commands. The time in milliseconds has been added to `DataImporterReportTransfer`.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [DataImport 1.1.0](https://github.com/spryker/data-import/releases/tag/1.1.0) | n/a |

### Mget Cache
`StorageClient` implements an internal cache mechanism for a "get" method: all "get" requests will be combined in one initial "get" and a single "multiGet". Previously, it was missing for direct "multiGet" call. With this release, "get" and "multiGet" will use the same cache bag and mechanism.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Storage 3.3.0](https://github.com/spryker/Storage/releases/tag/3.3.0) | n/a |

## Bugfixes
### Allow Null in Setter for Array Properties
Previously, for a property with type `array`, it was not possible to reset it with `null` anymore. This update will restore this deprecated but formerly working behavior as a part of a regression fix. Please migrate your code to use a true `[]` for resetting.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Transfer 3.3.6](https://github.com/spryker/Transfer/releases/tag/3.3.6) |

### Work with Missing Translations
Previously, the "translation key exists" check considered all translation keys regardless of the selected locale, but "translation retrieval" retrieved translations from the current locale only. This was causing an error in case if the translation existed in the non-current locale. We have fixed this issue now. The translate methods now work on the selected locale's translation key set.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a |  [Glossary 3.1.8](https://github.com/spryker/Glossary/releases/tag/3.1.8)|

### Image Set Name Validation
Previously, when something wrong was entered in the image set key, the search collector was failing with an error. We have fixed this issue now. The image set name is validated before saving.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductSetGui 1.1.1](https://github.com/spryker/product-set-gui/releases/tag/1.1.1) |

### Default Behavior for Propel Adjustments Command
By default in projects, a command for Propel adjustments for PostgreSQL was running for project and all Spryker modules. Now, by default we run it only for project schema files.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Propel 3.1.0](https://github.com/spryker/Propel/releases/tag/3.1.0) | n/a |

### Dependency Injector Resolver
The previous release broke `DependencyInjectorResolver`. This release is to fix that issue.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Kernel 3.7.1](https://github.com/spryker/Kernel/releases/tag/3.7.1) |
