---
title: Release Notes - December - 2017
originalLink: https://documentation.spryker.com/v3/docs/release-notes-december-2017
redirect_from:
  - /v3/docs/release-notes-december-2017
  - /v3/docs/en/release-notes-december-2017
---

## Features
### Initial Release of Heidelpay Module
From now on, we support integration with Heidelpay payment service provider. Heidelpay covers the entire range of services connected to international electronic payment processing. It is possible to configure and use the following payment methods: Paypal (Paypal Authorize, Payal Debit), Credit Card (Visa, Mastercard, American Express), iDeal, Sofort (Online Transfer).

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [heidelpay 1.0.0](https://github.com/spryker-eco/heidelpay/releases/tag/1.0.0) | n/a | n/a |

**Documentation**
For more information on Heidelpay integration, see [Payment Integration - Heidelpay](/docs/scos/dev/technology-partners/202001.0/payment-partners/heidelpay/heidelpay).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker-eco/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker-eco/heidelpay:"^1.0.0"
```

### Arvato RSS Release 2.0.0
A new version of Arvato RSS functionality has been released. With this release, we are introducing a new `StoreOrder` functionality. Being stored in the Spryker system, the order can be sent to Risk Solution Services for verification. If the negative response is obtained, the order process can be stopped by the project. During the `StoreOrder` call, its data is being verified and order total is compared with the value sent in the `RiskCheck` request. The invoice value of the service `RiskCheck` may surpass the invoice value of `StoreOrder` by maximum 25%.

As a part of this release, we have also made some improvements. Earlier only billing address was sent to the `RiskCheck` request.  With this release, a delivery address has been added to data sent within the `RiskCheck` request as well as billing and shipping addresses can be different and can also belong to different persons. From now on, a `RiskCheck` response also includes addresses validation results.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [ArvatoRss 2.0.0](https://github.com/spryker-eco/arvato-rss/releases/tag/2.0.0) | n/a | n/a |

**Documentation**
For more information,  see the [Risk Solution Services Integration - Arvato](/docs/scos/dev/technology-partners/202001.0/payment-partners/arvato/arvato) documentation.

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker-eco/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker-eco/arvato-rss:"^2.0.0"
```

## Improvements
### Spryker Install Tool
We are introducing a new tool for easy and convenient deployment of your Spryker application. When updating your targeted environment, now you will not be overwhelmed with irrelevant exceptions or long response messages from DB migrations, import processing, etc. You can run full deployment or choose to only run it partial, like for example only database migration, clearing cache or caches, and so on.

To fully enable you with the new install tool instead of the former shell scripts, we have analyzed existing scripts and extracted those into standalone console commands. The new console commands can be used once they are added to  `ConsoleDependencProvider` in your project. To get more information about this tool, please run `vendor/bin/install`after installation.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Install 0.1.0](https://github.com/spryker/install/releases/tag/0.1.0) | n/a |

<!--**Documentation**
For documentation please see: . -->
**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/install:"^0.1.0"
```

### Discount Calculation Performance with High Number of Criterias in Discount Rule
We have encountered that when discounts have a high number of criteria in the discount rule, for example, around 100 criteria, the discount calculation was too slow because of the ruleset analysis. With this release, we have enhanced the performance by buffering "Static" results of `MetaDataProvider::getAvailableFields()`.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Discount 5.1.2](https://github.com/spryker/Discount/releases/tag/5.1.2) |

### Module Config Shared Between Layers and Between Modules
In some cases, it is needed to have a shared configuration between applications and sometimes even between modules. Previously, `ModuleConfig` only allowed sharing between layers. With this release, it is also possible to create shared configuration classes, which are shared between application layers inside module. For more information, see documentation on Module Shared Configuration.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Kernel 3.14.0](https://github.com/spryker/Kernel/releases/tag/3.14.0) | [Kernel 3.14.1](https://github.com/spryker/Kernel/releases/tag/3.14.1) |

### Catalog View Mode
With this release, we have added the option to change the number of products displayed on one page of the catalog, which makes searching for products more comfortable. Now, the user can change the display of items per page to either 24, 36 or 48 and apply the changes together with the sorting preferences.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Catalog 5.1.0](https://github.com/spryker/Catalog/releases/tag/5.1.0) | n/a |

### Preparing Console Module for Standalone Usage
Previously, the `Console` module had a dependency to the `Propel` module, which did not allow using `Console` as a standalone module in projects without DB connections. With this release, this dependency has been removed so that the `Console` module is prepared for standalone usage.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [Console 4.0.0](https://github.com/spryker/Console/releases/tag/4.0.0) | n/a | <ul><li>[EventBehavior 0.1.1](https://github.com/spryker/event-behavior/releases/tag/0.1.1)</li><li>[Kernel 3.14.2](https://github.com/spryker/Kernel/releases/tag/3.14.2)</li><li>[StepEngine 3.1.1](https://github.com/spryker/step-engine/releases/tag/3.1.1)</li></ul> |

<!--**Documentation**
For detailed migration guides see: .-->
**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/console:"^4.0.0"
```

## Bugfixes
### Moving Bundle Product from Wishlist to Cart
Previously, we had an issue when moving a bundle product from wishlist to cart. If not all items in the bundle were available, the bundle product was being moved to cart partially, yet the bundle was not being removed from wishlist. We have fixed this issue. Now, when moving bundle product from wishlist to cart it will be moved only in case if all bundle items are available. Otherwise, a respective message will  be displayed to the user.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Wishlist 4.2.2](https://github.com/spryker/Wishlist/releases/tag/4.2.2) |

### Search for Products by SKU and ID
Previously, when searching for products on the Products Relations interface in Zed Admin UI, product prices were also taken into consideration for search. This was making the search impractical and the search results quite overwhelming. This issue has been fixed now, a price has been removed from the searchable list. The products are now searchable by SKU and ID only.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductRelation 1.1.2](https://github.com/spryker/product-relation/releases/tag/1.1.2) |

### onDelete Constraint Fix
Previously, each execution of the `propel:diff`command was generating identical migration files even if nothing was changed in schema files. This was caused due to `onDelete="NO ACTION"` being the default behavior for constraints, and it was handled incorrectly by `Propel`. With this release, we have fixed this issue by removing the unneeded property.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CustomerUserConnector 1.0.2](https://github.com/spryker/customer-user-connector/releases/tag/1.0.2) |

### Duplicated Index in CmsBlock
Previously, the `CmsBlock` module provided a duplicated index for the template path column. This index has now been removed.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CmsBlock 1.4.2](https://github.com/spryker/cms-block/releases/tag/1.4.2) |

### Testify Dependencies
Previously, some `ServiceProviders` used setters to inject dependencies. Now, `ServiceProviders` get their dependencies through their Factory instead of using the setters. Testify had wrong dependencies declared, and with this those dependencies are fixed.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Application 3.7.0](https://github.com/spryker/Application/releases/tag/3.7.0) | <ul><li>[Api 0.1.3](https://github.com/spryker/Api/releases/tag/0.1.3)</li><li>[Session 3.2.1](https://github.com/spryker/Session/releases/tag/3.2.1)</li><li>[Testify 3.4.2](https://github.com/spryker/Testify/releases/tag/3.4.2)</li><li>[User 3.1.2](https://github.com/spryker/User/releases/tag/3.1.2)</li><li>[ZedRequest 3.2.1](https://github.com/spryker/zed-request/releases/tag/3.2.1)</li></ul> |

### Deactivated Labels Display in Yves Filter
Previously, when deactivating a product label in Zed, its ID was still displayed in the Catalog on Yves. This issue has now been fixed - the deactivated labels are fully removed from products.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [ProductLabel 2.3.0](https://github.com/spryker/product-label/releases/tag/2.3.0) | [ProductLabelCollector 1.1.1](https://github.com/spryker/product-label-collector/releases/tag/1.1.1) |

### Architecture Sniffer Fix
With this release, we have adjusted our Architecture Sniffer command to work with modules on project level.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Development 3.4.1](https://github.com/spryker/Development/releases/tag/3.4.1) |

### Adjustment of Symfony Constraints
Previously, we raised versions of Syfmony components to 3.x. But for some instances it could cause a BC-break and require migration effort. To prevent this, we downgraded some of Symfony components constraints to be able to get new Spryker updates. The final migration to Symfony 3.x components will be implemented in the following releases.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[SetupFrontend 1.0.1](https://github.com/spryker/setup-frontend/releases/tag/1.0.1)</li><li>[Symfony 3.1.2](https://github.com/spryker/Symfony/releases/tag/3.1.2)</li></ul> |

### Restricting Name Argument in State Machine Console Commands
State machine console commands deprecate state machine name option. Provided invalid state machine name options are validated and display info messages, but do not alter workflow. Now, the commands have an optional state machine name argument, which is validated and in case of error, terminates workflow.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [StateMachine 2.2.0](https://github.com/spryker/StateMachine/releases/tag/2.2.0) | n/a |

<!-- Documentation
For module documentation see: .
-->

### Translation Key Validation Upon Options Creation
Previously, we had an issue with option group keys. When entering an option group key, it was autocompleted with `product.option.group.name.prefix`, so a user gave one value and got a different one in the end. This issue has been fixed in this release – now, a message about the autocompleted prefix is displayed. Also, validation is now done in both cases - when a user enters an actual key or a key already with the prefix.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductOption 5.5.1](https://github.com/spryker/ProductOption/releases/tag/5.5.1) |

### Product Bundle Image Display in Cart
We had the issue when images of product bundles were not displayed in the cart list page. This issue has now been fixed – bundle product images are displayed in the cart correctly.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductBundle 3.2.4](https://github.com/spryker/product-bundle/releases/tag/3.2.4) |

### Old Test Structure Support
Currently, Spryker separates tests into Bussiness, Presentation, etc, and each module contains `codeception.yml` to support the new structure. But many projects had old test segregation (Unit\Pyz\Xyz, Functional\Pyz\Xyz). With this release support of the obsolete tests has been added.

To use a new infrastructure, please make sure you moved your `Pyz` test into `PyzTest` (eg. `Unit\Pyz\Xyz` should be moved to `Unit\PyzTest\Xyz`).

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a | <ul><li>[Application 3.8.1](https://github.com/spryker/Application/releases/tag/3.8.1)</li><li>[Kernel 3.14.3](https://github.com/spryker/Kernel/releases/tag/3.14.3)</li></ul> |

## Documentation Updates
The following content has been added to the Academy:

* [Payment Integration - Heidelpay](/docs/scos/dev/technology-partners/202001.0/payment-partners/heidelpay/heidelpay)
* [Risk Solution Services Integration - Arvato 2.0](/docs/scos/dev/technology-partners/202001.0/payment-partners/arvato/arvato-2-0)
* [Performance Guidelines](/docs/scos/dev/developer-guides/202001.0/development-guide/guidelines/performance-gui)
* [Performing Core Updates Smoothly](https://documentation.spryker.com/v4/docs/composer#core-updates)
* [CMS Blocks](/docs/scos/dev/features/202001.0/cms/cms-block/cms-block)
* [CMS Pages](/docs/scos/dev/features/202001.0/cms/cms-page/cms-page)
* [Demo Shop](/docs/scos/dev/about-spryker/202001.0/videos-and-webinars/legacy-demoshop)
* [Navigation](/docs/scos/dev/features/202001.0/navigation/navigation)
* [Product Groups](/docs/scos/dev/about-spryker/202001.0/videos-and-webinars/product-groups)
* [Product Management](https://documentation.spryker.com/v4/docs/product-management)
* [Product Sets](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/product-sets/product-sets)
* [Wishlists](/docs/scos/dev/features/201907.0/wishlist/wishlist)
 
Your feedback would be highly appreciated. Please help us understand what you need from the Spryker Academy by filling out a very short survey [here](https://docs.google.com/forms/d/1_vZg0lfqq24Qf9-fQhU50NgsEBy4eDqnDyx7gKz9Faw/edit).
