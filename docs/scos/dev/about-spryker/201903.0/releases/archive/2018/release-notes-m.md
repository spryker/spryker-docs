---
title: Release Notes - March - 2018
originalLink: https://documentation.spryker.com/v2/docs/release-notes-march-2018
redirect_from:
  - /v2/docs/release-notes-march-2018
  - /v2/docs/en/release-notes-march-2018
---

## Features
### Gift Cards
The feature we have all been waiting for has arrived - gift cards! It goes without saying that gift cards' popularity among buyers is so high that there is actually no reason not to offer them in your shop. Gift cards are not only an entry point for new customers, they are a great way to encourage sales from the existing buyers and run promotions. Gift cards are easy to buy, just like usual products, and can be accessed immediately, as they are purely virtual and do not require shipment. Gift cards can be applied as a voucher and redeemed to pay an order.
![Gift cards](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+March+-+2018/gift_card.png){height="" width=""}

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[GiftCard 1.0.0](https://github.com/spryker/gift-card/releases/tag/1.0.0)</li><li>[GiftCardBalance 1.0.0](https://github.com/spryker/gift-card-balance/releases/tag/1.0.0)</li><li>[GiftCardMailConnector 1.0.0](https://github.com/spryker/gift-card-mail-connector/releases/tag/1.0.0)</li><li>[Nopayment 4.0.0](https://github.com/spryker/nopayment/releases/tag/4.0.0)</li></ul> | <ul><li>[Checkout 4.1.0](https://github.com/spryker/checkout/releases/tag/4.1.0)</li><li>[Discount 6.1.0](https://github.com/spryker/discount/releases/tag/6.1.0)</li><li>[Payment 4.3.0](https://github.com/spryker/payment/releases/tag/4.3.0)</li><li>[ProductManagement 0.12.0](https://github.com/spryker/product-management/releases/tag/0.12.0)</li><li>[Sales 8.6.0](https://github.com/spryker/sales/releases/tag/8.6.0)</li><li>[Shipment 6.3.0](https://github.com/spryker/shipment/releases/tag/6.3.0)</li></ul> | <ul><li>[CategoryStorage 0.2.2](https://github.com/spryker/category-storage/releases/tag/0.2.2)</li><li>[ProductLabelGui 2.0.6](https://github.com/spryker/product-label-gui/releases/tag/2.0.6)</li><li>[StepEngine 3.1.4](https://github.com/spryker/step-engine/releases/tag/3.1.4)</li></ul> |

Documentation
For feature documentation see: 
Migration Guides
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/gift-card:"^1.0.0" spryker/gift-card-balance:"^1.0.0" spryker/gift-card-mail-connector:"^1.0.0" spryker/nopayment:"^4.0.0" spryker/product-management:"^0.12.0"
```

### Setting a New Password For the Administration Interface Users
Previously, the users of the Administration Interface could create passwords for new users only, i.e. from the "Create new User" page. With this release, the Administration Interface's users have been granted a new ability - from now on they can also change passwords of other Administration Interface's users on the "Edit User" page. 
![User password change](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+March+-+2018/user_password_change.png){height="" width=""}

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [User 3.2.0](https://github.com/spryker/user/releases/tag/3.2.0) | n/a |

### Multi-store Products Availability
We continue to work hard on the multi-store concept and in this release we are happy to announce one more feature that brings us even closer to its full enablement - the multi-store products availability. From now on, the products' availability can be calculated on a per-store basis. That means that if you have several shops located in different countries, you can manage stocks across the countries separately, which makes overall inventory and logistics management more efficient. The shop administrators can now select stores they want to see the availability for.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+March+-+2018/box_selection_overview_page_collapsed.png){height="" width=""}

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+March+-+2018/Store_definision_availability_details.png){height="" width=""}

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[Availability 6.0.0](https://github.com/spryker/availability/releases/tag/6.0.0)</li><li>[AvailabilityGui 3.0.0](https://github.com/spryker/availability-gui/releases/tag/3.0.0)</li><li>[Oms 8.0.0](https://github.com/spryker/oms/releases/tag/8.0.0)</li><li>[Stock 5.0.0](https://github.com/spryker/stock/releases/tag/5.0.0)</li></ul> | <ul><li>[AvailabilityCartConnector 4.1.0](https://github.com/spryker/availability-cart-connector/releases/tag/4.1.0)</li><li>[Kernel 3.18.0](https://github.com/spryker/kernel/releases/tag/3.18.0)</li><li>[ProductBundle 4.2.0](https://github.com/spryker/product-bundle/releases/tag/4.2.0)</li><li>[ProductManagement 0.13.0](https://github.com/spryker/product-management/releases/tag/0.13.0)</li><li>[Store 1.5.0](https://github.com/spryker/store/releases/tag/1.5.0)</li></ul> | <ul><li>[AvailabilityDataFeed 0.1.3](https://github.com/spryker/availability-data-feed/releases/tag/0.1.3)</li><li>[AvailabilityStorage 0.2.2](https://github.com/spryker/availability-storage/releases/tag/0.2.2)</li><li>[Braintree 0.5.8](https://github.com/spryker/braintree/releases/tag/0.5.8)</li><li>[CartVariant 1.0.4](https://github.com/spryker/cart-variant/releases/tag/1.0.4)</li><li>[Checkout 4.1.1](https://github.com/spryker/checkout/releases/tag/4.1.1)</li><li>[DiscountPromotion 1.0.10](https://github.com/spryker/discount-promotion/releases/tag/1.0.10)</li><li>[DummyPayment 2.2.3](https://github.com/spryker/dummy-payment/releases/tag/2.2.3)</li><li>[Nopayment 4.0.1](https://github.com/spryker/nopayment/releases/tag/4.0.1)</li><li>[Payolution 4.0.9](https://github.com/spryker/payolution/releases/tag/4.0.9)</li><li>[ProductAbstractDataFeed 0.2.2](https://github.com/spryker/product-abstract-data-feed/releases/tag/0.2.2)</li><li>[ProductLabelGui 2.0.7](https://github.com/spryker/product-label-gui/releases/tag/2.0.7)</li><li>[Ratepay 0.6.8](https://github.com/spryker/ratepay/releases/tag/0.6.8)</li><li>[Sales 8.6.1](https://github.com/spryker/sales/releases/tag/8.6.1)</li><li>[StockSalesConnector 3.0.1](https://github.com/spryker/stock-sales-connector/releases/tag/3.0.1)</li><li>[Wishlist 5.1.2](https://github.com/spryker/wishlist/releases/tag/5.1.2)</li></ul> |

<!--**Documentation**
For module documentation see: 
For detailed migration guides see: -->

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/availability:"^6.0.0" spryker/availability-gui:"^3.0.0" spryker/oms:"^8.0.0" spryker/product-management:"^0.13.0" spryker/stock:"^5.0.0"
```

## Improvements
### Obsolete Touch Records Cleanup
With this release, we have added an ability to enable or disable touch cleanup for deleted database entries. By activating the cleanup in `config_default.php`, the "deleted touch" records will be removed by the collectors.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Collector 6.1.1](https://github.com/spryker/collector/releases/tag/6.1.1) |

### Elasticsearch 5 Upgrade
With this release, the Spryker's search has been upgraded to use Elasticsearch 5.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[Elastica 4.0.0](https://github.com/spryker/elastica/releases/tag/4.0.0)</li><li>[ProductReview 2.0.0](https://github.com/spryker/product-review/releases/tag/2.0.0)</li><li>[Search 8.0.0](https://github.com/spryker/search/releases/tag/8.0.0)</li></ul> |[Catalog 5.3.0](https://github.com/spryker/catalog/releases/tag/5.3.0) | <ul><li>[CategoryPageSearch 0.2.3](https://github.com/spryker/category-page-search/releases/tag/0.2.3)</li><li>[CmsCollector 2.0.3](https://github.com/spryker/cms-collector/releases/tag/2.0.3)</li><li>[CmsContentWidgetProductSearchConnector 1.0.1](https://github.com/spryker/cms-content-widget-product-search-connector/releases/tag/1.0.1)</li><li>[CmsPageSearch 0.1.2](https://github.com/spryker/cms-page-search/releases/tag/0.1.2)</li><li>[Collector 6.1.4](https://github.com/spryker/collector/releases/tag/6.1.4)</li><li>[CollectorSearchConnector 1.0.3](https://github.com/spryker/collector-search-connector/releases/tag/1.0.3)</li><li>[Heartbeat 3.2.1](https://github.com/spryker/heartbeat/releases/tag/3.2.1)</li><li>[ProductCategoryFilterGui 1.1.4](https://github.com/spryker/product-category-filter-gui/releases/tag/1.1.4)</li><li>[ProductCustomerPermission 1.0.1](https://github.com/spryker/product-customer-permission/releases/tag/1.0.1)</li><li>[ProductNew 1.1.2](https://github.com/spryker/product-new/releases/tag/1.1.2)</li><li>[ProductPageSearch 0.1.3](https://github.com/spryker/product-page-search/releases/tag/0.1.3)</li><li>[ProductReviewCollector 1.0.3](https://github.com/spryker/product-review-collector/releases/tag/1.0.3)</li><li>[ProductReviewGui 1.0.3](https://github.com/spryker/product-review-gui/releases/tag/1.0.3)</li><li>[ProductReviewSearch 0.1.2](https://github.com/spryker/product-review-search/releases/tag/0.1.2)</li><li>[ProductReviewStorage 0.1.1](https://github.com/spryker/product-review-storage/releases/tag/0.1.1)</li><li>[ProductSearch 5.4.5](https://github.com/spryker/product-search/releases/tag/5.4.5)</li><li>[ProductSet 1.3.2](https://github.com/spryker/product-set/releases/tag/1.3.2)</li><li>[ProductSetCollector 1.0.3](https://github.com/spryker/product-set-collector/releases/tag/1.0.3)</li><li>[ProductSetPageSearch 0.1.2](https://github.com/spryker/product-set-page-search/releases/tag/0.1.2)</li><li>[Setup 4.0.2](https://github.com/spryker/setup/releases/tag/4.0.2)</li><li>[Synchronization 0.2.1](https://github.com/spryker/synchronization/releases/tag/0.2.1)</li></ul> |

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
composer require spryker/elastica:"^4.0.0" spryker/product-review:"^2.0.0" spryker/search:"^8.0.0" --update-with-dependencies
```

## Bugfixes
### Catalog Sorting Fix
Previously, we had an issue with catalog sorting configuration: it was built incorrectly and caused the available sorting options to be merged by the name of the field which they sorted by, but this was problematic for fields which were configured for both ascending and descending order. This issue has now been fixed.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Search 7.2.1](https://github.com/spryker/search/releases/tag/7.2.1) |

### Product Bundle Stock Calculation
Previously, we had the following issue: when a bundle product was available, and products that belong to it - not; the product stock was calculated incorrectly. The issue has been fixed in this release.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [ProductBundle 4.3.0](https://github.com/spryker/product-bundle/releases/tag/4.3.0) |  [AvailabilityGui 3.0.1](https://github.com/spryker/availability-gui/releases/tag/3.0.1) |

### Handling Incorrect IDs for CMS Block
Previously, when setting an incorrect ID in URL on the CMS Block Edit page in the Administration Interface, an exception was thrown. In this release, we have fixed that: now when an incorrect CMS block ID is specified, the user is taken to the "Overview of CMS Blocks" page and sees a normal error message informing that such an ID does not exist.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CmsBlockGui 2.0.1](https://github.com/spryker/cms-block-gui/releases/tag/2.0.1) |

### Elasticsearch Delete Records With Parent/ Child Relationship
Previously, when trying to delete a children document, Elasticsearch returned an exception. In this release, we have fixed Elasticsearch delete records with parent/ child relationship, which is specifically used in the `ProductCustomerPermission` module.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Collector 6.1.3](https://github.com/spryker/collector/releases/tag/6.1.3) |

### Data Source For Tax Rate Form Fix
Previously, there was an issue with the existing tax rates in the Administration Interface - they could not be edited. This issue has now been fixed.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Tax 5.1.7](https://github.com/spryker/tax/releases/tag/5.1.7) |

## Documentation Updates
The following content has been added to the Academy:

<!--* Feature List-->
* [Testing Concepts](/docs/scos/dev/developer-guides/201903.0/development-guide/guidelines/testing-concept)

Your feedback would be highly appreciated. Please help us understand what you need from the Spryker Academy by filling out a very short [survey](https://docs.google.com/forms/d/1_vZg0lfqq24Qf9-fQhU50NgsEBy4eDqnDyx7gKz9Faw/edit).
