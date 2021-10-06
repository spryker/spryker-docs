---
title: Release Notes - July - 1 2017
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-july-1-2017
originalArticleId: 82f4ce3a-c450-47b0-86c0-5d297815473c
redirect_from:
  - /2021080/docs/release-notes-july-1-2017
  - /2021080/docs/en/release-notes-july-1-2017
  - /docs/release-notes-july-1-2017
  - /docs/en/release-notes-july-1-2017
---

## Features
### Selecting Product Variant in the Cart
With this release we are bringing the variant selection functionality to the cart. Your shop user can now modify the selected variant right in the cart which will then, if available, replace the current item in the cart with the newly selected one (e.g. changing the size of a t-shirt or storage capacity of a smartphone).

![Selecting Product Variant in the cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+July+-+1+2017/RN_selecting_product_variant_in_the_cart.gif)

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[CartVariant 1.0.0](https://github.com/spryker/cart-variant/releases/tag/1.0.0)</li><li>[ProductImageCartConnector 1.0.0](https://github.com/spryker/product-image-cart-connector/releases/tag/1.0.0)</li></ul> | n/a | n/a |

**Documentation**
For integration guides, see [Cart Integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/cart-integration.html).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```
composer require spryker/cart-variant:"^1.0.0" spryker/product-image-cart-connector:"^1.0.0"
```

### Improvements and New Features for CMS Blocks
With this release, we are introducing a CMS block as a completely decoupled module from CMS pages. Before the CMS blocks were stored with pages with the difference that a block did not have page-related properties (e.g. URL, page meta information).  With this decoupling we bring more flexibility to block and page maintenance, we also bring architecture flexibility which will allow you to create connections to other objects (e.g. Customer Group (show a block only for a specific group), Country (show a block for products from a specific country), etc.).
In addition, we are introducing a set of new features for CMS blocks:

* **Valid from-to dates**: Now, you can easily define for how long a block should be in the shop frontend.

* **Own templating**: A block template can now be different from page templates. In addition, the template is not any more on a locale level.

* **Status**: You can now globally activate or deactivate a given block. Before this was on locale level, with this update the activation/deactivation is on a  block level. If the block is not active, than it’s not active for all locales

* **Multi-locale content for placeholders**: Each placeholder in the block has locale specific content (for as many locales as you have), management of which is now consolidated in one UI.

* **Category and product blocks**: In Admin UI, you can now also assign categories and product to a given block, which will imply that the block shows up for these categories and products in the shop frontend. Yet you can still also continue using blocks as static ones by simply placing them in your page  template.

![Category and Product blocks](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+July+-+1+2017/RN_improvement_and_new_features_for_cms_blocks.gif)

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[Cms 6.0.0](https://github.com/spryker/Cms/releases/tag/6.0.0)</li><li>[CmsBlock 1.0.0](https://github.com/spryker/cms-block/releases/tag/1.0.0)</li><li>[CmsBlockCategoryConnector 1.0.0](https://github.com/spryker/cms-block-category-connector/releases/tag/1.0.0)</li><li>[CmsBlockCollector 1.0.0](https://github.com/spryker/cms-block-collector/releases/tag/1.0.0)</li><li>[CmsBlockGui 1.0.0](https://github.com/spryker/CmsBlockGui/releases/tag/1.0.0)</li><li>[CmsBlockProductConnector 1.0.0](https://github.com/spryker/cms-block-product-connector/releases/tag/1.0.0)</li><li>[CmsGui 4.0.0](https://github.com/spryker/cms-gui/releases/tag/4.0.0)</li></ul> | <ul><li>[Product 5.2.0](https://github.com/spryker/Product/releases/tag/5.2.0)</li><li>[ProductManagement 0.7.0](https://github.com/spryker/product-management/releases/tag/0.7.0)</li><li>[Twig 3.2.0](https://github.com/spryker/Twig/releases/tag/3.2.0)</li></ul> | <ul><li>[CmsCollector 1.0.1](https://github.com/spryker/cms-collector/releases/tag/1.0.1)</li><li>[CmsUserConnector 1.0.1](https://github.com/spryker/cms-user-connector/releases/tag/1.0.1)</li><li>[Glossary 3.1.4](https://github.com/spryker/Glossary/releases/tag/3.1.4)</li><li>[NavigationGui 1.0.3](https://github.com/spryker/navigation-gui/releases/tag/1.0.3)</li><li>[ProductRelationCollector 1.1.1](https://github.com/spryker/product-relation-collector/releases/tag/1.1.1)</li></ul> |

**Documentation**
For relevant documentation, see [CMS Block](/docs/scos/user/features/{{site.version}}/cms-feature-overview/cms-blocks-overview.html).

For detailed migration guides, see [CMS Migration Guide](/docs/scos/dev/migration-and-integration/{{site.version}}/module-migration-guides/migration-guide-cms.html), [CMS Block Migration Console](/docs/scos/dev/migration-and-integration/{{site.version}}/module-migration-guides/migration-guide-cms.html-block-category-connector-console)

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/cms:"^6.0.0" spryker/cms-block:"^1.0.0" spryker/cms-block-category-connector:"^1.0.0" spryker/cms-block-collector:"^1.0.0" spryker/cms-block-gui:"^1.0.0" spryker/cms-block-product-connector:"^1.0.0" spryker/cms-gui:"^4.0.0" spryker/product-management:"^0.7.0"
```

### FileSystem Filemanager
FileSystem module provides abstraction for a file system. It uses the same interface to access different types of file systems, regardless of their location or protocol. To do the heavy lifting, it uses the FileSystem module which integrates `thephpleague/flysystem` vendor package.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[FileSystem 1.0.0](https://github.com/spryker/file-system/releases/tag/1.0.0)</li><li>[Flysystem 1.0.0](https://github.com/spryker/Flysystem/releases/tag/1.0.0)</li><li>[FlysystemAws3v3FileSystem 1.0.0](https://github.com/spryker/flysystem-aws3v3-file-system/releases/tag/1.0.0)</li><li>[FlysystemFtpFileSystem 1.0.0](https://github.com/spryker/FlysystemFtpFileSystem/releases/tag/1.0.0)</li><li>[FlysystemLocalFileSystem 1.0.0](https://github.com/spryker/flysystem-local-file-system/releases/tag/1.0.0)</li></ul> | [Kernel 3.5.0](https://github.com/spryker/Kernel/releases/tag/3.5.0) | n/a |

**Documentation**
For relevant documentation, see File System File Manager Module Guide <!-- link -->, Flysystem Module Guide<!-- liknk-->.

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/file-system:"^1.0.0" spryker/flysystem:"^1.0.0" spryker/flysystem-aws3v3-file-system:"^1.0.0" spryker/flysystem-ftp-file-system:"^1.0.0" spryker/flysystem-local-file-system:"^1.0.0"
```

### On Sale Products
We've enhanced the management of products with multiple price types. You can now import and manage from PIM multiple prices of a product. Those prices are also exported to Elasticsearch. For inspiration, you can check our demoshop use case implementation for products on sale: if a product has both original and default price, then the original price is strikethrough and the default price is the current sales price for the product. In Yves we have also introduced a filtered catalog for `/outlet` where a user can browse through all products that are currently on sale.

![On sale products](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+July+-+1+2017/RN_on_sale_products.gif)

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  |<ul><li>[Price 4.2.0](https://github.com/spryker/Price/releases/tag/4.2.0)</li><li>[ProductRelationCollector 1.2.0](https://github.com/spryker/product-relation-collector/releases/tag/1.2.0)</li></ul>  | [ProductManagement 0.7.2](https://github.com/spryker/product-management/releases/tag/0.7.2) |

### Discount Rules Based On Product Labels
With this release, we are now introducing a new connector module to handle discount rules based on product labels. This feature will allow you to define discount calculation and condition rules based on existing product labels.

![Discount rules](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+July+-+1+2017/RN_discount_rules_based_on_product_labels.gif)

**Affected Module**

| Major | Minor | Patch |
| --- | --- | --- |
| [ProductLabelDiscountConnector 1.0.0](https://github.com/spryker/product-label-discount-connector/releases/tag/1.0.0) | <ul><li>[Discount 4.2.0](https://github.com/spryker/Discount/releases/tag/4.2.0)</li><li>[ProductLabel 1.1.0](https://github.com/spryker/product-label/releases/tag/1.1.0)</li></ul> | [Discount 4.2.1](https://github.com/spryker/Discount/releases/tag/4.2.1) |

**Documentation**
For relevant documentation, see [Product Label Module Guide](https://documentation.spryker.com/2021080/docs/product-label), [Discount Module Guide](/docs/scos/user/features/{{site.version}}promotions-discounts-feature-overview.html)

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major:

```bash
composer require spryker/product-label-discount-connector:"^1.0.0"
```

### Multiple Payment Methods for One Sales Order
Previously, our schema allowed only one payment per sales-order. However, there is a certain use case where it should be possible to calculate and save multiple payment methods for a given order (e.g. order with gift cards). With this release, we enable multiple payment methods per checkout. We also make sure that payment information is persisted with store reference when order is placed. New payment hydration plugins will allow you to extend the order transfer with payment related data.
**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [Payment 4.0.0](https://github.com/spryker/Payment/releases/tag/4.0.0) | n/a | <ul><li>[Braintree 0.5.3](https://github.com/spryker/Braintree/releases/tag/0.5.3)</li><li>[DummyPayment 2.0.3](https://github.com/spryker/dummy-payment/releases/tag/2.0.3)</li><li>[Payolution 4.0.3](https://github.com/spryker/Payolution/releases/tag/4.0.3)</li><li>[Ratepay 0.6.1](https://github.com/spryker/Ratepay/releases/tag/0.6.1)</li><li>[Transfer 3.3.2](https://github.com/spryker/transfer/releases/tag/3.3.2)</li></ul> |

**Documentation**
For module documentation, see [Payment Module Guide](https://documentation.spryker.com/2021080/docs/payments)
For detailed migration guides, see [Payment Migration Guide](/docs/scos/dev/migration-and-integration/{{site.version}}/module-migration-guides/migration-guide-payment.html)

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*
```

* Once that is done, upgrade to the new module major:

```bash
composer require spryker/payment:"^4.0.0"
```

### CMS Content Widgets
With CMS content widgets, we are bringing more power to CMS pages and blocks. Now, you can conveniently include products, product groups and products sets in placeholders of CMS pages and blocks. For each of those you can also define multiple templates. So, for example, a product widget can be applicable with different templates depending on your use cases in Yves, and when including the widget in the CMS placeholder you can define which template should be used for the widget. You can also extend this solution to provide your custom widgets, for example, to include CMS blocks in placeholders of CMS pages, etc.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[CmsContentWidget 1.0.0](https://github.com/spryker/cms-content-widget/releases/tag/1.0.0)</li><li>[CmsContentWidgetProductConnector 1.0.0](https://github.com/spryker/CmsContentWidgetProductConnector/releases/tag/1.0.0)</li><li>[CmsContentWidgetProductGroupConnector 1.0.0](https://github.com/spryker/cms-content-widget-product-group-connector/releases/tag/1.0.0)</li><li>[CmsContentWidgetProductSetConnector 1.0.0](https://github.com/spryker/cms-content-widget-product-set-connector/releases/tag/1.0.0)</li></ul> | <ul><li>[Cms 6.1.0](https://github.com/spryker/Cms/releases/tag/6.1.0)</li><li>[CmsBlock 1.1.0](https://github.com/spryker/cms-block/releases/tag/1.1.0)</li><li>[CmsBlockCollector 1.1.0](https://github.com/spryker/cms-block-collector/releases/tag/1.1.0)</li><li>[CmsBlockGui 1.1.0](https://github.com/spryker/cms-block-gui/releases/tag/1.1.0)</li><li>[CmsCollector 1.2.0](https://github.com/spryker/cms-collector/releases/tag/1.2.0)</li><li>[CmsGui 4.1.0](https://github.com/spryker/cms-gui/releases/tag/4.1.0)</li><li>[ProductSet 1.1.0](https://github.com/spryker/product-set/releases/tag/1.1.0)</li></ul> | n/a |

**Documentation**
For module documentation, see CMSWidget Module Guide <!--add a link-->.

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/cms-content-widget:"^1.0.0" spryker/cms-content-widget-product-connector:"^1.0.0" spryker/cms-content-widget-product-group-connector:"^1.0.0" spryker/cms-content-widget-product-set-connector:"^1.0.0"
```

## Improvements
### Validation for Attributes
Super attribute values cannot be random, as the variant matrix depends on those values. Hence before using the values to create product variants those values have to be predefined. With this adjustment, we added validation check to make sure that super attributes always use predefined values.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductManagement 0.7.1](https://github.com/spryker/product-management/releases/tag/0.7.1) |

### Customer Address Country Options
We've reduced the selectable options of countries for customer addresses in Zed UI to match with store configuration.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Customer 6.0.3](https://github.com/spryker/Customer/releases/tag/6.0.3) |

### Configuration for CMS Placeholders
To make placeholder management clear and easy, the configuration for CMS placeholders is now moved to module configuration. This way the config for Business and Communication layers will be the same. Additionally, we now also support dots in placeholder names by default.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Cms 6.0.3](https://github.com/spryker/Cms/releases/tag/6.0.3)</li><li>[CmsBlockGui 1.0.2](https://github.com/spryker/cms-block-gui/releases/tag/1.0.2)</li><li>[CmsGui 4.0.1](https://github.com/spryker/cms-gui/releases/tag/4.0.1)</li></ul> |

### Subscribe to Newsletter Without Customer Account
Previously, adding `ignorableTransactions` to NewRelic required overwriting  `NewRelicFactory` to pass in an array with ignorable transaction route names. This can now be done in an easier manner by extending  `NewRelicConfig` on project side and returning an array with ignorable transaction route names from `NewRelicConfig:: getIgnorableTransactionRouteNames()`.

To achieve that, newsletter/subscription and other sub-requests are only visible as a master request in `NewRelic`. You will need to remove your `NewRelic` module in project and use Spryker's `NewRelicRequestTransactionServiceProvider` as `ServiceProvider` instead of the former `NewRelicServiceProvider`. `NewRelicRequestTransactionServiceProvider` from core takes care that only master requests are sent to `NewRelic`.

In addition, the `Newsletter` module had a bug when a customer tried to unsubscribe from a newsletter given that this customer had subscribed before creating the account. The bug is now fixed by an additional lookup for subscription by email.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [NewRelic 3.1.0](https://github.com/spryker/new-relic/releases/tag/3.1.0) | [Newsletter 4.1.3](https://github.com/spryker/Newsletter/releases/tag/4.1.3) |

### Enabled Open Range Queries for Filters
Previously, open-ended range queries for integer and price facet filters were not possible. For example, when the user tried to apply an open-ended range filter then both minimum and maximum were set to the same values which provided empty result at the end. With this release, we enable open-ended range queries.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Search 6.3.0](https://github.com/spryker/Search/releases/tag/6.3.0) | n/a |

### Stock Management
Previously, the `ProductManagement` module didn't show all stock types in View and Edit in Zed, only the initially imported ones for the given product were listed. This release provides an ability to set view and manage stock for all existing stock types. In addition,previously it was not possible to manage Never out of stock flag for products via the Availability UI. This issues is also fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[AvailabilityGui 2.0.2](https://github.com/spryker/availability-gui/releases/tag/2.0.2)</li><li>[Stock 4.0.3](https://github.com/spryker/Stock/releases/tag/4.0.3)</li></ul> |

### Interface for Subscription Handler
We had a strong coupling to one of the business model classes without an interface. To allow you to extend the logic, we now introduced an interface in between.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Newsletter 4.1.4](https://github.com/spryker/Newsletter/releases/tag/4.1.4) |

### Discount Filter
We have added a new filter plugin extension point to the `Discount` module. This allows you to filter discountable items after discount collectors run. It is executed for each discount.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Discount 4.3.0](https://github.com/spryker/Discount/releases/tag/4.3.0)</li><li>[ProductDiscountConnector 3.1.0](https://github.com/spryker/product-discount-connector/releases/tag/3.1.0)</li><li>[ProductLabelDiscountConnector 1.1.0](https://github.com/spryker/product-label-discount-connector/releases/tag/1.1.0)</li></ul> | n/a |

### Beta: HTTP OPTIONS Pre-flight Request Support
Some REST clients need an HTTP OPTIONS pre-flight request prior to the actual request. This is now supported and configurable per resource. In addition, we have also added CORS headers.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Api 0.1.1](https://github.com/spryker/Api/releases/tag/0.1.1) |

## Bugfixes
### Allow Entering the Same State Twice in StateMachine
Previously, StateMachine didn't allow entering the same state twice. This was especially the case when StateMachine had a loop in it. If you would process StateMachine item till the loop point, then attempt to return to the previous state, the transition would fail with an exception. This issue is fixed now. We've modified StateUpdater logic to compare last history item state with destination state.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [StateMachine 2.0.2](https://github.com/spryker/state-machine/releases/tag/2.0.2) |

### Missing Transfer Property in ProductOptionCartConnector
We had a missing transfer property (`ProductOptionTransfer::unitNetPrice`) which was resulting in an exception. This issue is fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductOptionCartConnector 4.1.1](https://github.com/spryker/product-option-cart-connector/releases/tag/4.1.1) |

### Order Products Inside Category
Zed provides a way to position abstract products on category catalog pages. Previously, those positions were not being evaluated by the search, which was resulting in an arbitrary order of products in the catalog. With this release, we introduce a new query expander that provides the missing behaviour.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Search 6.1.0](https://github.com/spryker/Search/releases/tag/6.1.0) | n/a |

### MySQL Error When Managing Navigation Items
There was an issue with managing navigation nodes, for example when typing a category name to trigger autosuggestion; the autosuggestion was not working and an MySQL error was occurring. This issue is fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [NavigationGui 1.0.2](https://github.com/spryker/navigation-gui/releases/tag/1.0.2) |

### Legacy Config Key Check
Previously, it was not possible to change `ErrorRenderer` from `WebExceptionErrorRenderer` to `WebHtmlErrorRenderer` due to a bug in  `ErrorHandlerFactory`. `ErrorRenderer` can now be changed with the `ErrorHandlerConstants::ERROR_RENDERER` config option.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ErrorHandler 2.1.1](https://github.com/spryker/error-handler/releases/tag/2.1.1) |

### Constraints for AddressForm Fields
Previously, due to missing validation in `AddressForm` in Zed customer address management, when a user would enter a string longer than the character limit of the field an exception was thrown. We added validation messages to all `AddressForm` fields. This will now ensure that the length of the fields sent to the database will not be longer than the one configured.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Customer 6.0.2](https://github.com/spryker/Customer/releases/tag/6.0.2) |

### CMS Block Template Path
We had a bug in the CMS Block template path, because of which only templates from an obsolete folder (Cms) were visible in Zed Admin backend. Because of this, a Zed user was able to use only imported templates. This issue is fixed, now you can also see new added templates in the list.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CmsBlockGui 1.0.1](https://github.com/spryker/cms-block-gui/releases/tag/1.0.1) |

### Removing Previous Glossary Records
A `CmsBlock` template change action had a bug, which did not allow  removing the previous glossary records and change template. This issue is fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CmsBlock 1.0.2](https://github.com/spryker/cms-block/releases/tag/1.0.2) |

### Duplicate CMS Page Entries in Touch Table
After full setup, the touch table was containing the same item twice for CMS pages. Our touch logic was inserting two events into a touch table to delete and update, even if you only ‘edit’ an item. However, this was necessary because the key in Redis would be different. For this reason, we made sure that the old Redis entries with old keys were deleted, and new ones were inserted. To fix this we disabled key change touch for CMS pages.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Cms 6.0.2](https://github.com/spryker/Cms/releases/tag/6.0.2) |

### Drop Timestamps
We had a bug in dropping timestamps from storage. Previously, it was not possible to delete timestamps. After "Drop Timestamps" action, the "Number of entries" count was the same as it has been before. This issue is fixed now, we now use the storage key for deleting the timestamps instead of index.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Collector 5.1.4](https://github.com/spryker/Collector/releases/tag/5.1.4)</li><li>[CollectorStorageConnector 1.0.1](https://github.com/spryker/collector-storage-connector/releases/tag/1.0.1)</li></ul> |

### Category Key Constraint
When adding or updating a category with an already used `category_key` there was an exception thrown. This is now fixed and there will be a validation message displayed instead.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Category 3.2.2](https://github.com/spryker/Category/releases/tag/3.2.2) |

### Thousand Separator for Discount Value
The `Discount` module had an issue with a discount amount storage. It was not able to recognise a thousand separator and was reducing the value by 100 on each save action. This issue is fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Discount 4.2.2](https://github.com/spryker/Discount/releases/tag/4.2.2) |

### Incorrect Stock Hydration
There was an issue when `ProductFacade` was trying to save concrete products with fully hydrated transfer with stock data. This release will fix the wrong stock hydration in `ProductTransfer`.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[ProductManagement 0.7.3](https://github.com/spryker/product-management/releases/tag/0.7.3)</li><li>[Stock 4.0.4](https://github.com/spryker/Stock/releases/tag/4.0.4)</li></ul> |
