---
title: Release Notes - January - 2018
originalLink: https://documentation.spryker.com/v5/docs/release-notes-january-2018
redirect_from:
  - /v5/docs/release-notes-january-2018
  - /v5/docs/en/release-notes-january-2018
---

{% info_block warningBox %}
Please note, that we do not have [Toran Proxy](https://toranproxy.com/
{% endinfo_block %} anymore. We recommend to download all Spryker modules from public [Packagist](https://packagist.org/) from now on.)

## Features
### Multi-Currency Product Options
With this release, we are introducing a new functionality which enables shop owners to manage prices in the shop per currency and price mode (net/gross) for products, bundle products, product option, and shipment methods. A shop administrator can provide prices for the gross and net price mode per currency through the Administration Interface.

Shop visitors in their turn can select a currency/price mode using a switcher on Yves and all prices in the shop will be at once displayed according to the selection. The customer can than place orders using the selected currency.
![Multi-currency product options in Zed](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+January+-+2018/multicurrency_zed.png){height="" width=""}

![Multi-currency product options in Yves](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+January+-+2018/multicurrency_yves.png){height="" width=""}

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[CatalogPriceProductConnector 1.0.0](https://github.com/spryker/CatalogPriceProductConnector/releases/tag/1.0.0)</li><li>[Price 5.0.0](https://github.com/spryker/Price/releases/tag/5.0.0)</li><li>[PriceCartConnector 4.0.0](https://github.com/spryker/price-cart-connector/releases/tag/4.0.0)</li><li>[PriceProduct 1.0.0](https://github.com/spryker/price-product/releases/tag/1.0.0)</li><li>[ProductBundle 4.0.0](https://github.com/spryker/ProductBundle/releases/tag/4.0.0)</li><li>[ProductLabelGui 2.0.0](https://github.com/spryker/product-label-gui/releases/tag/2.0.0)</li><li>[ProductOption 6.0.0](https://github.com/spryker/product-option/releases/tag/6.0.0)</li><li>[ProductOptionCartConnector 5.0.0](https://github.com/spryker/product-option-cart-connector/releases/tag/5.0.0)</li><li>[ProductRelation 2.0.0](https://github.com/spryker/product-relation/releases/tag/2.0.0)</li><li>[ProductRelationCollector 2.0.0](https://github.com/spryker/product-relation-collector/releases/tag/2.0.0)</li><li>[ProductSetGui 2.0.0](https://github.com/spryker/product-set-gui/releases/tag/2.0.0)</li><li>[Search 7.0.0](https://github.com/spryker/Search/releases/tag/7.0.0)</li><li>[ShipmentCartConnector 1.0.0](https://github.com/spryker/shipment-cart-connector/releases/tag/1.0.0)</li><li>[Wishlist 5.0.0](https://github.com/spryker/Wishlist/releases/tag/5.0.0)</li></ul> | <ul><li> [Cart 4.2.0](https://github.com/spryker/Cart/releases/tag/4.2.0)</li><li>[Currency 3.2.0](https://github.com/spryker/Currency/releases/tag/3.2.0)</li><li>[Kernel 3.15.0](https://github.com/spryker/Kernel/releases/tag/3.15.0)</li><li>[Messenger 3.1.0](https://github.com/spryker/Messenger/releases/tag/3.1.0)</li><li>[Money 2.4.0](https://github.com/spryker/Money/releases/tag/2.4.0)</li><li>[PriceDataFeed 0.2.0](https://github.com/spryker/price-data-feed/releases/tag/0.2.0)</li><li>[ProductManagement 0.9.0](https://github.com/spryker/ProductManagement/releases/tag/0.9.0)</li><li>[Shipment 6.2.0](https://github.com/spryker/Shipment/releases/tag/6.2.0)</li><li>[Store 1.2.0](https://github.com/spryker/Store/releases/tag/1.2.0)</li></ul> | <ul><li>[AvailabilityGui 2.0.5](https://github.com/spryker/AvailabilityGui/releases/tag/2.0.5)</li><li>[CartCurrencyConnector 1.0.1](https://github.com/spryker/CartCurrencyConnector/releases/tag/1.0.1)</li><li>[Catalog 5.1.1](https://github.com/spryker/Catalog/releases/tag/5.1.1)</li><li>[CmsCollector 2.0.1](https://github.com/spryker/CmsCollector/releases/tag/2.0.1)</li><li>[CmsContentWidgetProductSetConnector 1.0.1](https://github.com/spryker/cms-content-widget-product-set-connector/releases/tag/1.0.1)</li><li>[Collector 5.5.2](https://github.com/spryker/Collector/releases/tag/5.5.2)</li><li>[CollectorSearchConnector 1.0.1](https://github.com/spryker/CollectorSearchConnector/releases/tag/1.0.1)</li><li>[ProductCategoryFilterGui 1.0.1](https://github.com/spryker/ProductCategoryFilterGui/releases/tag/1.0.1)</li><li>[ProductReview 1.0.1](https://github.com/spryker/product-review/releases/tag/1.0.1)</li><li>[ProductReviewCollector 1.0.1](https://github.com/spryker/product-review-collector/releases/tag/1.0.1)</li><li>[ProductSearch 5.3.1](https://github.com/spryker/ProductSearch/releases/tag/5.3.1)</li><li>[ProductSet 1.2.2](https://github.com/spryker/product-set/releases/tag/1.2.2)</li><li>[ProductSetCollector 1.0.1](https://github.com/spryker/ProductSetCollector/releases/tag/1.0.1)</li><li>[Setup 4.0.1](https://github.com/spryker/Setup/releases/tag/4.0.1)</li><li>[Synchronization 0.1.1](https://github.com/spryker/Synchronization/releases/tag/0.1.1)</li></ul> |

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```
* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/catalog-price-product-connector:"^1.0.0" spryker/price:"^5.0.0" spryker/price-cart-connector:"^4.0.0" spryker/price-data-feed:"^0.2.0" spryker/price-product:"^1.0.0" spryker/product-bundle:"^4.0.0" spryker/product-label-gui:"^2.0.0" spryker/product-management:"^0.9.0" spryker/product-option:"^6.0.0" spryker/product-option-cart-connector:"^5.0.0" spryker/product-relation:"^2.0.0" spryker/product-relation-collector:"^2.0.0" spryker/product-set-gui:"^2.0.0" spryker/search:"^7.0.0" spryker/shipment-cart-connector:"^1.0.0" spryker/wishlist:"^5.0.0"
```

### Category Filters
Finding products quickly and efficiently on Yves is critical to many customers. This is pretty easy if a category is relatively small. However, in case of larger categories, if customers have to scroll through a long list of filters, that might negatively influence their user experience and even their buying behavior.

With this release, we are introducing a new category filters functionality which gives you full control over filters appearing on the catalog page in Yves per category. The filters available in the catalog page in Yves per category are definable in Zed Administration Interface. It is possible either to apply general filter settings or to do specific settings by re-ordering, adding and removing filters manually. 
![Category filters](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+January+-+2018/Category+Filters.gif){height="" width=""}

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[ProductCategoryFilter 1.0.0](https://github.com/spryker/product-category-filter/releases/tag/1.0.0)</li><li>[ProductCategoryFilterCollector 1.0.0](https://github.com/spryker/product-category-filter-collector/releases/tag/1.0.0)</li><li>[ProductCategoryFilterGui 1.0.0](https://github.com/spryker/ProductCategoryFilterGui/releases/tag/1.0.0)</li></ul> | <ul><li>[Product 5.4.0](https://github.com/spryker/Product/releases/tag/5.4.0)</li><li>[ProductSearch 5.3.0](https://github.com/spryker/product-search/releases/tag/5.3.0)</li><li>[Search 6.10.0](https://github.com/spryker/Search/releases/tag/6.10.0)</li></ul> | n/a |

<!--Documentation
For module documentation see: 
For store administration guides see:-->
**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```
* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/product-category-filter:"^1.0.0" spryker/product-category-filter-collector:"^1.0.0" spryker/product-category-filter-gui:"^1.0.0"
```

### Adding Multiple Products to Cart
Customers often prefer to add multiple products to the cart at once rather than editing the quantity of products in the cart.

With this release, we have added a possibility to add more than one item to the cart directly from the product details page. Now, a customer simply selects the desired quantity of items on the product details page and moves all these items to cart with just one click. This simplifies the process of shopping for customers and improves their shopping experience.
![Adding multiple products to cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+January+-+2018/multiple_quantity.png){height="" width=""}

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Availability 5.3.0](https://github.com/spryker/Availability/releases/tag/5.3.0) | n/a |

## Improvements
### Use of Logger Plugin by Log Module
Previously, the Processors for Logging were implemented in the Application Module. Those are now moved to the modules where they belong to. All processors now follow the same interface to be usable as Plugins inside the different applications.

For an end user the logging functionality result doesn't change. The logs can still be found on their place as before.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Log 3.4.0](https://github.com/spryker/Log/releases/tag/3.4.0)</li><li>[Propel 3.5.0](https://github.com/spryker/Propel/releases/tag/3.5.0)</li></ul> | [Application 3.8.3](https://github.com/spryker/Application/releases/tag/3.8.3) |

### Fixing a Misleading Name in Sales Query Container
Previously, a method with a misleading name was used in `SalesOrderQueryContainerInterface`.  This has been now fixed so that the fix optimizes the code without affecting the functionality of the order management features.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a |  [Sales 8.4.0](https://github.com/spryker/Sales/releases/tag/8.4.0) | n/a |

### Order Placement Process Refactoring
As a part of this release, we have cleaned up the order placment process to make it more efficient. This implementation implies improvement of the code and does not affect the order placement process for shop users.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|[Checkout 4.0.0](https://github.com/spryker/Checkout/releases/tag/4.0.0)  | <ul><li>[Customer 7.2.0](https://github.com/spryker/Customer/releases/tag/7.2.0)</li><li>[Discount 5.2.0](https://github.com/spryker/Discount/releases/tag/5.2.0)</li><li>[Payment 4.2.0](https://github.com/spryker/Payment/releases/tag/4.2.0)</li><li>[ProductBundle 3.3.0](https://github.com/spryker/product-bundle/releases/tag/3.3.0)</li><li>[ProductOption 5.6.0](https://github.com/spryker/product-option/releases/tag/5.6.0)</li><li>[Sales 8.3.0](https://github.com/spryker/Sales/releases/tag/8.3.0)</li><li>[SalesProductConnector 1.1.0](https://github.com/spryker/sales-product-connector/releases/tag/1.1.0)</li><li>[Shipment 6.1.0](https://github.com/spryker/Shipment/releases/tag/6.1.0)</li></ul> | <ul><li>[Availability 5.2.2](https://github.com/spryker/Availability/releases/tag/5.2.2)</li><li>[Braintree 0.5.7](https://github.com/spryker/Braintree/releases/tag/0.5.7)</li><li>[Calculation 4.2.2](https://github.com/spryker/Calculation/releases/tag/4.2.2)</li><li>[DummyPayment 2.1.4](https://github.com/spryker/dummy-payment/releases/tag/2.1.4)</li><li>[Oms 7.3.1](https://github.com/spryker/Oms/releases/tag/7.3.1)</li><li>[Payolution 4.0.7](https://github.com/spryker/Payolution/releases/tag/4.0.7)</li><li>[Ratepay 0.6.6](https://github.com/spryker/Ratepay/releases/tag/0.6.6)</li></ul> |

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```
* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/checkout:"^4.0.0"
```

### Changing the Table Column Type From the Project Code
Previously, it wasn't possible to change attributes of table columns in the database e.g. from `type="VARCHAR"` to `type="LONGVARCHAR"`. If some of such changes were made, a user got an exception. Now, we have made it possible to change the values of attributes inside the schema files.

We have also added a new validation tool to ensure that no accidental attribute value change can happen. This validation can be done by running `propel:schema:validate` console command.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Propel 3.4.0](https://github.com/spryker/Propel/releases/tag/3.4.0) | [ProductRelation 1.1.3](https://github.com/spryker/product-relation/releases/tag/1.1.3) |

### Configuring SSL Verification in Zed Request Client
Previously, the Client configuration for Zed requests was hardcoded which made it highly difficult to use an environment-specific configuration.
Now, `ZedRequestConfig` contains a method to get the configuration for the Client used in `ZedRequest`. It merges default configuration with the one each environment can provide, so it can be changed for each environment independently.

The third argument of `ZedRequestClientInterface::call()` now also accepts an array instead of an integer which allows configuring specific requests.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [ZedRequest 3.3.0](https://github.com/spryker/zed-request/releases/tag/3.3.0) | n/a |

## Bugfixes
### Issue with Deleting a Customer from a Customer Group
Previously, an exception was thrown when trying to delete a customer account assigned to a customer group. This issue has been fixed in this release.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CustomerGroup 2.2.4](https://github.com/spryker/CustomerGroup/releases/tag/2.2.4) |

### SKU Is Taken for ID Upon Discount Promotion Availability Check
Previously, when checking availability of promotional products, the product SKU provided in discount details, was regarded by the system as the product ID, which led to exception in Yves and the availability could be calculated incorrectly. 

This problem has now been fixed. The SKUs and IDs are no more mixed up upon promotional product availability checks. No errors occur when adding promotional products to cart.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [DiscountPromotion 1.0.4](https://github.com/spryker/discount-promotion/releases/tag/1.0.4) |

### Queue Worker Failure Without Verbosity Option
Previously, when the `queue-worker` command was running without verbosity flag (`-v/vv/vvv` options), it failed. This issue has now been fixed by performing class property cleanup. 

Running `queue-worker` is now possible both in normal and verbosity modes.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Queue 1.0.2](https://github.com/spryker/Queue/releases/tag/1.0.2) |

### Success Messages for Portlets
We are trying to make our Administration Interface generic and follow the conventions in naming elements, showing messages and structuring pages. 

Zed administration panel provides a wide list of notification messages during the working process. Some of these messages were not following these conventions and have now been adjusted. 

This release also includes fix for the Product Attribute module. We had an interface issue, which could cause sending wrong attribute translation data, so when a shop administrator was trying to create a product attribute and clicked on the Save button when adding translations, an error occurred in Zed. Now, this problem has been fixed and adding product attributes is done without errors.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Acl 3.0.5](https://github.com/spryker/Acl/releases/tag/3.0.5)</li><li>[Cms 6.3.4](https://github.com/spryker/Cms/releases/tag/6.3.4)</li><li>[CmsBlockGui 1.1.6](https://github.com/spryker/cms-block-gui/releases/tag/1.1.6)</li><li>[CmsGui 4.3.3](https://github.com/spryker/cms-gui/releases/tag/4.3.3)</li><li>[Customer 7.1.1](https://github.com/spryker/Customer/releases/tag/7.1.1)</li><li>[CustomerGroup 2.2.3](https://github.com/spryker/customer-group/releases/tag/2.2.3)</li><li>[Glossary 3.2.2](https://github.com/spryker/Glossary/releases/tag/3.2.2)</li><li>[ProductAttributeGui 1.0.4](https://github.com/spryker/product-attribute-gui/releases/tag/1.0.4)</li><li>[ProductSearch 5.2.2](https://github.com/spryker/product-search/releases/tag/5.2.2)</li><li>[Shipment 6.0.3](https://github.com/spryker/Shipment/releases/tag/6.0.3)</li><li>[User 3.1.3](https://github.com/spryker/User/releases/tag/3.1.3)</li></ul> |

### Backward Compatibility Support
The `Checkout` module provides plugin hooks in order to implement a dependency inversion pattern. After the last checkout major release, it lost backward compatibility with satellite modules.

In this release, we return support of old interfaces in order to keep full BC with satellite modules.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Checkout 4.0.1](https://github.com/spryker/Checkout/releases/tag/4.0.1)</li><li>[Sales 8.4.1](https://github.com/spryker/Sales/releases/tag/8.4.1)</li></ul> |

### Native Datepicker in Firefox Browser
Previously, we had an issue with the native datepicker in the Firefox browser: when picking a date on any form with a datepicker in Zed (for example, "Valid from", "Valid to" fields on the Discount page), the browser native datepicker was displayed besides the jquery datepicker. This issue has been fixed - one one datepicker is shown now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Gui 3.13.0](https://github.com/spryker/Gui/releases/tag/3.13.0)</li><li>[NavigationGui 2.1.0](https://github.com/spryker/NavigationGui/releases/tag/2.1.0)</li></ul> | <ul><li>[CmsBlockGui 1.1.7](https://github.com/spryker/cms-block-gui/releases/tag/1.1.7)</li><li>[CmsGui 4.3.4](https://github.com/spryker/CmsGui/releases/tag/4.3.4)</li><li>[Discount 5.2.1](https://github.com/spryker/Discount/releases/tag/5.2.1)</li><li>[ProductLabelGui 2.0.2](https://github.com/spryker/product-label-gui/releases/tag/2.0.2)</li><li>[ProductManagement 0.9.2](https://github.com/spryker/product-management/releases/tag/0.9.2)</li></ul> |

### Visibility Adjustments For  Factory Methods Extended On Project Level
After Log minor 3.4.0, a project could get unexpected behavior if methods were extended on a project level. With this release, we return full BC for the `Log` module.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Log 3.4.1](https://github.com/spryker/Log/releases/tag/3.4.1) |

## Documentation Updates
The following content has been added to the Academy:

* [Coding Best Practices](https://documentation.spryker.com/docs/en/coding-best-practices)

Your feedback would be highly appreciated. Please help us understand what you need from the Spryker Academy by filling out a very short [survey](https://docs.google.com/forms/d/1_vZg0lfqq24Qf9-fQhU50NgsEBy4eDqnDyx7gKz9Faw/edit).
