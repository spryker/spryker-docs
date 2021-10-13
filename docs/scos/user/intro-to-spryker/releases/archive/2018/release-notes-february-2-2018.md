---
title: Release Notes - February - 2 2018
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-february-2-2018
originalArticleId: 148ecbbb-4c1b-47b6-8d0f-59085912f147
redirect_from:
  - /2021080/docs/release-notes-february-2-2018
  - /2021080/docs/en/release-notes-february-2-2018
  - /docs/release-notes-february-2-2018
  - /docs/en/release-notes-february-2-2018
---

## Features
### CMS Blocks Per Store
We continue progressing towards full enablement of the multi-store concept. With this release, we are introducing a new multi-store CMS Blocks feature. It enables you to manage CMS blocks display per stores through a store toggle element on CMS Block management pages in the Administration Interface. To define which store(s) a CMS block should be visible in, just select the respective store(s) under "Store relation".
![CMS blocks per store](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+February+-+2+2018/cms_block_store_relation.png) 

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[CmsBlock 2.0.0](https://github.com/spryker/cms-block/releases/tag/2.0.0)</li><li>[CmsBlockCollector 2.0.0](https://github.com/spryker/cms-block-collector/releases/tag/2.0.0)</li><li>[CmsBlockGui 2.0.](https://github.com/spryker/cms-block-gui/releases/tag/2.0.0)</li></ul> | n/a | <ul><li>[CmsBlockCategoryConnector 2.1.4](https://github.com/spryker/cms-block-category-connector/releases/tag/2.1.4)</li><li>[CmsBlockCategoryStorage 0.1.2](https://github.com/spryker/cms-block-category-storage/releases/tag/0.1.2)</li><li>[CmsBlockProductConnector 1.1.3](https://github.com/spryker/cms-block-product-connector/releases/tag/1.1.3)</li><li>[CmsBlockProductStorage 0.1.2](https://github.com/spryker/cms-block-product-storage/releases/tag/0.1.2)</li><li>[CmsBlockStorage 0.1.3](https://github.com/spryker/cms-block-storage/releases/tag/0.1.3)</li><li>[ProductManagement 0.11.3](https://github.com/spryker/product-management/releases/tag/0.11.3)</li></ul> |

<!-- Documentation
For module documentation see: 
For detailed migration guides see:
For store administration guide see:-->

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/cms-block:"^2.0.0" spryker/cms-block-collector:"^2.0.0" spryker/cms-block-gui:"^2.0.0"
```

### Discounts Per Store
As a part of the multi-store concept, the Discount per Store feature has been implemented in this release. It allows managing discounts per stores, which enables a shop owner to deliver an even better shopping experience for customers by creating targeted offers with discounts for specific countries.
![Discounts per store](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+February+-+2+2018/discount_multistore.png) 

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|[Discount 6.0.0](https://github.com/spryker/discount/releases/tag/6.0.0) | <ul><li>[Quote 1.2.0](https://github.com/spryker/quote/releases/tag/1.2.0)</li><li>[Store 1.4.0](https://github.com/spryker/store/releases/tag/1.4.0)</li></ul> | <ul><li>[CustomerGroupDiscountConnector 2.0.3](https://github.com/spryker/customer-group-discount-connector/releases/tag/2.0.3)</li><li>[DiscountCalculationConnector 5.0.2](https://github.com/spryker/discount-calculation-connector/releases/tag/5.0.2)</li><li>[DiscountPromotion 1.0.8](https://github.com/spryker/discount-promotion/releases/tag/1.0.8)</li><li>[OmsDiscountConnector 3.0.2](https://github.com/spryker/oms-discount-connector/releases/tag/3.0.2)</li><li>[ProductDiscountConnector 3.2.2](https://github.com/spryker/product-discount-connector/releases/tag/3.2.2)</li><li>[ProductLabelDiscountConnector 1.2.1](https://github.com/spryker/product-label-discount-connector/releases/tag/1.2.1)</li><li>[ShipmentDiscountConnector 1.1.2](https://github.com/spryker/shipment-discount-connector/releases/tag/1.1.2)</li></ul> |

<!--Documentation
For detailed migration guides see:-->

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/discount:"^6.0.0"
```

### Time To Live For Products
With this release, we are introducing a new feature that enables the shop administrator to set validity dates for products. With the Time To Live (TTL) For Products feature, you can easily define from and till when your product(s) will be visible and available for purchase by your customers without having to manage the inventory manually. This feature is extremely useful if you sell products with an expiry date, seasonal products or products that are valid for a certain period of time (e.g. tickets), or if for promotional reasons, you temporally sell some products within a limited time frame, or if you want to start selling some products (e.g. a collection) from a specific date and/or time. The product validity time can be set to up-to-the minute accuracy.
![Time to live for products](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+February+-+2+2018/ttl.png) 

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [ProductValidity 1.0.0](https://github.com/spryker/product-validity/releases/tag/1.0.0) | [ProductManagement 0.11.0](https://github.com/spryker/product-management/releases/tag/0.11.0) |  [ProductLabelGui 2.0.5](https://github.com/spryker/product-label-gui/releases/tag/2.0.5)|

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```
* Once that is done, upgrade to the new module major and its dependencies:
```bash
composer require spryker/product-management:"^0.11.0" spryker/product-validity:"^1.0.0"
```

## Improvements
### Configurable Cookie Path
Previously, it was not possible to configure the `cookie_path` for the session cookie. From now on, you will have more flexibility in deciding how to set-up your store, as we have added a configuration option to define the cookie path for Yves and Zed so it can be configured according to the project's needs.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Session 3.2.4](https://github.com/spryker/session/releases/tag/3.2.4) |

### Full Compatibility To Symfony 2.8 And Then 3.0
We continue making Spryker components compatible with new versions of Symfony. With Symfony Form v4, it is mandatory to check if a form was submitted before `isValid()` is called. In preparation for updating of all the components to v4, we have added such a check to all controllers.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Auth 3.0.2](https://github.com/spryker/auth/releases/tag/3.0.2)</li><li>[AvailabilityGui 2.0.8](https://github.com/spryker/availability-gui/releases/tag/2.0.8)</li><li>[Category 4.3.3](https://github.com/spryker/category/releases/tag/4.3.3)</li><li>[Cms 6.4.3](https://github.com/spryker/cms/releases/tag/6.4.3)</li><li>[CmsBlockCategoryConnector 2.1.3](https://github.com/spryker/cms-block-category-connector/releases/tag/2.1.3)</li><li>[CmsBlockGui 1.1.9](https://github.com/spryker/cms-block-gui/releases/tag/1.1.9)</li><li>[CmsGui 4.3.6](https://github.com/spryker/cms-gui/releases/tag/4.3.6)</li><li>[Customer 7.4.3](https://github.com/spryker/customer/releases/tag/7.4.3)</li><li>[CustomerGroup 2.2.6](https://github.com/spryker/customer-group/releases/tag/2.2.6)</li><li>[Development 3.6.3](https://github.com/spryker/development/releases/tag/3.6.3)</li><li>[Discount 5.2.3](https://github.com/spryker/discount/releases/tag/5.2.3)</li><li>[Glossary 3.3.3](https://github.com/spryker/glossary/releases/tag/3.3.3)</li><li>[NavigationGui 2.1.2](https://github.com/spryker/navigation-gui/releases/tag/2.1.2)</li><li>[ProductCategory 4.5.3](https://github.com/spryker/product-category/releases/tag/4.5.3)</li><li>[ProductCategoryFilterGui 1.1.2](https://github.com/spryker/product-category-filter-gui/releases/tag/1.1.2)</li><li>[ProductManagement 0.11.2](https://github.com/spryker/product-management/releases/tag/0.11.2)</li><li>[ProductOption 6.1.4](https://github.com/spryker/product-option/releases/tag/6.1.4)</li><li>[ProductRelation 2.1.3](https://github.com/spryker/product-relation/releases/tag/2.1.3)</li><li>[ProductSearch 5.4.4](https://github.com/spryker/product-search/releases/tag/5.4.4)</li><li>[ProductSetGui 2.0.3](https://github.com/spryker/product-set-gui/releases/tag/2.0.3)</li><li>[Sales 8.5.3](https://github.com/spryker/sales/releases/tag/8.5.3)</li><li>[SalesSplit 3.0.5](https://github.com/spryker/sales-split/releases/tag/3.0.5)</li><li>[Shipment 6.2.2](https://github.com/spryker/shipment/releases/tag/6.2.2)</li><li>[StepEngine 3.1.3](https://github.com/spryker/step-engine/releases/tag/3.1.3)</li><li>[Store 1.3.2](https://github.com/spryker/store/releases/tag/1.3.2)</li><li>[Symfony 3.1.4](https://github.com/spryker/symfony/releases/tag/3.1.4)</li><li>[Tax 5.1.6](https://github.com/spryker/tax/releases/tag/5.1.6)</li><li>[User 3.1.5](https://github.com/spryker/user/releases/tag/3.1.5)</li></ul> |

### Compatibility To PHP 7.2
With this release, we have made Spryker OS compatible with PHP 7.2.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Customer 7.4.2](https://github.com/spryker/customer/releases/tag/7.4.2)</li><li>[Money 2.4.2](https://github.com/spryker/money/releases/tag/2.4.2)</li><li>[ProductManagement 0.11.1](https://github.com/spryker/product-management/releases/tag/0.11.1)</li><li>[PropelOrm 1.5.1](https://github.com/spryker/propel-orm/releases/tag/1.5.1)</li><li>[Store 1.3.1](https://github.com/spryker/store/releases/tag/1.3.1)</li><li>[Testify 3.4.3](https://github.com/spryker/testify/releases/tag/3.4.3)</li><li>[UtilSanitize 2.1.2](https://github.com/spryker/util-sanitize/releases/tag/2.1.2)</li></ul> |


## Bugfixes
### User Role Saving Without Changes
Previously, when trying to save a user role without making any changes to it in the Administration Interface, an error message is displayed. This has been fixed now - when saving a user role without changing it, nothing happens.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Acl 3.0.7](https://github.com/spryker/acl/releases/tag/3.0.7) |

### Error Message For Empty Mandatory Fields For CMS Page
Previously, we had the following issue: when trying to save a CMS page with empty mandatory fields for example, for DE translations (collapsed by default) in the Administration Interface, nothing happened - no error was shown. This issue has been fixed in this release - if mandatory fields, which are collapsed by default, are not filled out, they are expanded and highlighted.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CmsGui 4.3.7](https://github.com/spryker/cms-gui/releases/tag/4.3.7) |

### Mail Text Layout Fix
Previously, there was an issue with mail text layout - when sending an email in plain text, unnecessary spaces broke the layout. This has now been fixed - the spaces that caused the issue have been removed from the text layout.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Mail 4.0.2](https://github.com/spryker/mail/releases/tag/4.0.2) |

### PropelOrm Issue With DateTimes
Earlier, we had an issue when saving users in the Administration Interface without making any changes: unchanged entities were still marked as modified. This was caused by the fact that all entities used different time formatting for DateTimes. When `toArray()` of an entity was used, DateTime was formatted with -&gt;format('c') but the setter always used -&gt;format('Y-m-d H:i:s.u'). This led to always changed entities. This issue is fixed now.
Please make sure you are not using any project implementation that relies on the count of changed rows in such a scenario.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [PropelOrm 1.5.2](https://github.com/spryker/propel-orm/releases/tag/1.5.2) |

### Filters And Category Tree On Yves
Previously, we had an issue with filters and category tree display on Yves: when a category was accessed from the top navigation, the categories and filters section was not displayed. This issue has now been fixed.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductCategoryFilter 1.2.1](https://github.com/spryker/product-category-filter/releases/tag/1.2.1) |

### Editing Customer Details
Earlier, there was an issue with saving customer details twice: after editing a customer, saving the data and then trying to edit and save the same customer again without making any changes, an error occurred. This issue has been fixed in this release.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Customer 7.5.1](https://github.com/spryker/customer/releases/tag/7.5.1) |

### Adding a New Filter To a Category
Previously, we had an issue when trying to add an existing attribute key to a category filter - the filter was not added. This has been fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a  | n/a | [ProductCategoryFilterGui 1.1.3](https://github.com/spryker/product-category-filter-gui/releases/tag/1.1.3) |

### Clickable Name For a Deleted Customer Account
There was an issue with the customer name of a deleted account: it was used to be clickable on the Order details page. This has now been fixed: if a customer account has been deleted, the customer name is not clickable.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a |[Sales 8.5.2](https://github.com/spryker/sales/releases/tag/8.5.2) |

### Discount For Promotional Products
Previously, we had the following issue: when adding promotional products with several variants to cart and applying a discount, the discount was lost if the variant of the promotional product was changed. This has been fixed: after changing variants of the promotional products, the discount is preserved.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [DiscountPromotion 1.0.7](https://github.com/spryker/discount-promotion/releases/tag/1.0.7) |

<!-- ## Documentation Updates
The following content has been added to the Academy:-->
 
Your feedback would be highly appreciated. Please help us understand what you need from the Spryker Academy by filling out a very short [survey](https://docs.google.com/forms/d/1_vZg0lfqq24Qf9-fQhU50NgsEBy4eDqnDyx7gKz9Faw/edit).
