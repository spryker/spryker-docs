---
title: Release Notes - February - 1 2018
originalLink: https://documentation.spryker.com/v5/docs/release-notes-february-2018
redirect_from:
  - /v5/docs/release-notes-february-2018
  - /v5/docs/en/release-notes-february-2018
---

{% info_block warningBox %}
Please note that we do not have [Toran Proxy](https://toranproxy.com/
{% endinfo_block %} anymore, it has been shut down completely. Please use [Packagist](https://packagist.org/) from now on.)

## Features
### Product Search Widget
Previously, we had only product list widgets for which the products were selected based on their SKUs, whereas the selection was static and did not take product availabilities into account. In this release, we are introducing a new Product Search widget which makes it possible for a shop administrator to define rules for the widget by building an Elasticsearch query where the administrator specifies what data should be included in the product search result. This makes the product selection with the Product Search widget dynamic and fully customizable.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [CmsContentWidgetProductSearchConnector 1.0.0](https://github.com/spryker/cms-content-widget-product-search-connector/releases/tag/1.0.0) | [Search 7.2.0](https://github.com/spryker/search/releases/tag/7.2.0) | n/a |

<!-- Documentation
For module documentation see: .-->
**Migration Guides**

To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```
* Once that is done, upgrade to the new module major and its dependencies:

```bash
composer require spryker/cms-content-widget-product-search-connector:"^1.0.0"
```

### Multi-Store Product Abstract
With this release, we are introducing a new feature which allows managing product abstracts across stores. Now, a shop administrator can configure the abstract product appearance per store in the Administration Interface through a store toggle element available for each product abstract. The store toggle element controls the availability of the corresponding product abstract and related product concretes in specific store(s). Customers would be able to see only those abstract products (and their concrete products) which are associated with the store(s) defined by the shop administrator.
![Multi-store product abstract](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+February+-+1+2018/store_relation_abstract.png){height="" width=""}

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[Collector 6.0.0](https://github.com/spryker/collector/releases/tag/6.0.0)</li><li>[Product 6.0.0](https://github.com/spryker/product/releases/tag/6.0.0)</li><li>[Touch 4.0.0](https://github.com/spryker/touch/releases/tag/4.0.0)</li></ul> | <ul><li>[ProductManagement 0.10.0](https://github.com/spryker/product-management/releases/tag/0.10.0)</li><li>[Store 1.3.0](https://github.com/spryker/store/releases/tag/1.3.0)</li></ul> | <ul><li> [Availability 5.4.2](https://github.com/spryker/availability/releases/tag/5.4.2)</li><li>[AvailabilityDataFeed 0.1.2](https://github.com/spryker/availability-data-feed/releases/tag/0.1.2)</li><li>[AvailabilityGui 2.0.6](https://github.com/spryker/availability-gui/releases/tag/2.0.6)</li><li>[AvailabilityStorage 0.2.1](https://github.com/spryker/availability-storage/releases/tag/0.2.1)</li><li>[CartVariant 1.0.3](https://github.com/spryker/cart-variant/releases/tag/1.0.3)</li><li>[Category 4.3.1](https://github.com/spryker/category/releases/tag/4.3.1)</li><li>[CategoryPageSearch 0.2.1](https://github.com/spryker/category-page-search/releases/tag/0.2.1)</li><li>[CategoryStorage 0.2.1](https://github.com/spryker/category-storage/releases/tag/0.2.1)</li><li>[Cms 6.4.1](https://github.com/spryker/cms/releases/tag/6.4.1)</li><li>[CmsBlock 1.5.1](https://github.com/spryker/cms-block/releases/tag/1.5.1)</li><li>[CmsBlockCategoryConnector 2.1.1](https://github.com/spryker/cms-block-category-connector/releases/tag/2.1.1)</li><li>[CmsBlockCollector 1.1.2](https://github.com/spryker/cms-block-collector/releases/tag/1.1.2)</li><li>[CmsBlockProductConnector 1.1.1](https://github.com/spryker/cms-block-product-connector/releases/tag/1.1.1)</li><li>[CmsCollector 2.0.2](https://github.com/spryker/cms-collector/releases/tag/2.0.2)</li><li>[CmsContentWidgetProductConnector 1.0.2](https://github.com/spryker/cms-content-widget-product-connector/releases/tag/1.0.2)</li><li>[CmsContentWidgetProductSetConnector 1.0.3](https://github.com/spryker/cms-content-widget-product-set-connector/releases/tag/1.0.3)</li><li>[CollectorSearchConnector 1.0.2](https://github.com/spryker/collector-search-connector/releases/tag/1.0.2)</li><li>[CollectorStorageConnector 1.0.3](https://github.com/spryker/collector-storage-connector/releases/tag/1.0.3)</li><li>[DataImport 1.2.1](https://github.com/spryker/data-import/releases/tag/1.2.1)</li><li>[DiscountPromotion 1.0.5](https://github.com/spryker/discount-promotion/releases/tag/1.0.5)</li><li>[Glossary 3.3.1](https://github.com/spryker/glossary/releases/tag/3.3.1)</li><li>[Navigation 2.2.1](https://github.com/spryker/navigation/releases/tag/2.2.1)</li><li>[NavigationCollector 1.0.4](https://github.com/spryker/navigation-collector/releases/tag/1.0.4)</li><li>[PriceProduct 1.1.1](https://github.com/spryker/price-product/releases/tag/1.1.1)</li><li>[PriceProductStorage 0.1.1](https://github.com/spryker/price-product-storage/releases/tag/0.1.1)</li><li>[ProductAbstractDataFeed 0.2.1](https://github.com/spryker/product-abstract-data-feed/releases/tag/0.2.1)</li><li>[ProductApi 0.1.2](https://github.com/spryker/product-api/releases/tag/0.1.2)</li><li>[ProductAttribute 1.0.1](https://github.com/spryker/product-attribute/releases/tag/1.0.1)</li><li>[ProductAttributeGui 1.0.5](https://github.com/spryker/product-attribute-gui/releases/tag/1.0.5)</li><li>[ProductBundle 4.1.1](https://github.com/spryker/product-bundle/releases/tag/4.1.1)</li><li>[ProductCartConnector 4.2.1](https://github.com/spryker/product-cart-connector/releases/tag/4.2.1)</li><li>[ProductCategory 4.5.1](https://github.com/spryker/product-category/releases/tag/4.5.1)</li><li>[ProductCategoryFilter 1.1.1](https://github.com/spryker/product-category-filter/releases/tag/1.1.1)</li><li>[ProductCategoryFilterCollector 1.0.1](https://github.com/spryker/product-category-filter-collector/releases/tag/1.0.1)</li><li>[ProductCategoryFilterGui 1.0.2](https://github.com/spryker/product-category-filter-gui/releases/tag/1.0.2)</li><li>[ProductCategoryStorage 0.1.1](https://github.com/spryker/product-category-storage/releases/tag/0.1.1)</li><li>[ProductDiscountConnector 3.2.1](https://github.com/spryker/product-discount-connector/releases/tag/3.2.1)</li><li>[ProductGroup 1.2.1](https://github.com/spryker/product-group/releases/tag/1.2.1)</li><li>[ProductGroupCollector 1.0.1](https://github.com/spryker/product-group-collector/releases/tag/1.0.1)</li><li>[ProductGroupStorage 0.1.1](https://github.com/spryker/product-group-storage/releases/tag/0.1.1)</li><li>[ProductImage 3.5.1](https://github.com/spryker/product-image/releases/tag/3.5.1)</li><li>[ProductImageStorage 0.1.2](https://github.com/spryker/product-image-storage/releases/tag/0.1.2)</li><li>[ProductLabel 2.4.1](https://github.com/spryker/product-label/releases/tag/2.4.1)</li><li>[ProductLabelCollector 1.1.2](https://github.com/spryker/product-label-collector/releases/tag/1.1.2)</li><li>[ProductLabelGui 2.0.3](https://github.com/spryker/product-label-gui/releases/tag/2.0.3)</li><li>[ProductLabelStorage 0.1.1](https://github.com/spryker/product-label-storage/releases/tag/0.1.1)</li><li>[ProductNew 1.1.1](https://github.com/spryker/product-new/releases/tag/1.1.1)</li><li>[ProductOption 6.1.2](https://github.com/spryker/product-option/releases/tag/6.1.2)</li><li>[ProductOptionStorage 0.1.1](https://github.com/spryker/product-option-storage/releases/tag/0.1.1)</li><li>[ProductPageSearch 0.1.2](https://github.com/spryker/product-page-search/releases/tag/0.1.2)</li><li>[ProductRelation 2.1.1](https://github.com/spryker/product-relation/releases/tag/2.1.1)</li><li>[ProductRelationCollector 2.0.2](https://github.com/spryker/product-relation-collector/releases/tag/2.0.2)</li><li>[ProductRelationStorage 0.1.1](https://github.com/spryker/product-relation-storage/releases/tag/0.1.1)</li><li>[ProductReview 1.1.1](https://github.com/spryker/product-review/releases/tag/1.1.1)</li><li>[ProductReviewCollector 1.0.2](https://github.com/spryker/product-review-collector/releases/tag/1.0.2)</li><li>[ProductReviewGui 1.0.2](https://github.com/spryker/product-review-gui/releases/tag/1.0.2)</li><li>[ProductSearch 5.4.2](https://github.com/spryker/product-search/releases/tag/5.4.2)</li><li>[ProductSearchConfigStorage 0.1.1](https://github.com/spryker/product-search-config-storage/releases/tag/0.1.1)</li><li>[ProductSet 1.3.1](https://github.com/spryker/product-set/releases/tag/1.3.1)</li><li>[ProductSetCollector 1.0.2](https://github.com/spryker/product-set-collector/releases/tag/1.0.2)</li><li>[ProductSetGui 2.0.1](https://github.com/spryker/product-set-gui/releases/tag/2.0.1)</li><li>[ProductStorage 0.1.1](https://github.com/spryker/product-storage/releases/tag/0.1.1)</li><li>[PropelQueryBuilder 0.3.1](https://github.com/spryker/propel-query-builder/releases/tag/0.3.1)</li><li>[Ratepay 0.6.7](https://github.com/spryker/ratepay/releases/tag/0.6.7)</li><li>[SalesProductConnector 1.1.1](https://github.com/spryker/sales-product-connector/releases/tag/1.1.1)</li><li>[Stock 4.0.7](https://github.com/spryker/stock/releases/tag/4.0.7)</li><li>[TaxProductConnector 4.0.4](https://github.com/spryker/tax-product-connector/releases/tag/4.0.4)</li><li>[Url 3.3.1](https://github.com/spryker/url/releases/tag/3.3.1)</li><li>[Wishlist 5.1.1](https://github.com/spryker/wishlist/releases/tag/5.1.1)</li></ul> |

<!--Documentation
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
composer require spryker/collector:"^6.0.0" spryker/product:"^6.0.0" spryker/product-management:"^0.10.0" spryker/touch:"^4.0.0"
```

## Improvements
### Multiple Mappings Per Single Import
Previously, it was not possible to import multiple mappings for index with one request. In this release, the search mapping installer has been changed to import all mappings when the index has not yet been created, which makes it possible to use features like parent / child relationship.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[Collector 6.1.0](https://github.com/spryker/collector/releases/tag/6.1.0)</li><li>[Search 7.1.0](https://github.com/spryker/search/releases/tag/7.1.0)</li></ul> | n/a |

### Fixing Compatibility Issues In All FormTypes
Previously, some Spryker forms used a deprecated code from Symfony. With this change, we have made sure all forms are not using the code deprecated in Symfony Form 2.8. Mainly, the string representation of types has been replaced with FQCN, for example $builder-&gt;add('foo', 'text') has been replaced with $builder-&gt;add('foo', TextType::class). We have also removed all constructors from the forms as `FormFactory` no longer accepts instances of form types. All forms now extend Spryker's `AbstractType` to get access to `getFactory()`, `getFacade()`, `getConfig()` and `getQueryContainer()`. If your forms have a constructor, please remove it and access what you need from inside the forms from now on.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | <ul><li>[Acl 3.0.6](https://github.com/spryker/acl/releases/tag/3.0.6)</li><li>[Application 3.8.5](https://github.com/spryker/application/releases/tag/3.8.5)</li><li>[Auth 3.0.1](https://github.com/spryker/auth/releases/tag/3.0.1)</li><li>[AvailabilityGui 2.0.7](https://github.com/spryker/availability-gui/releases/tag/2.0.7)</li><li>[Category 4.3.2](https://github.com/spryker/category/releases/tag/4.3.2)</li><li>[Cms 6.4.2](https://github.com/spryker/cms/releases/tag/6.4.2)</li><li>[CmsBlockCategoryConnector 2.1.2](https://github.com/spryker/cms-block-category-connector/releases/tag/2.1.2)</li><li>[CmsBlockGui 1.1.8](https://github.com/spryker/cms-block-gui/releases/tag/1.1.8)</li><li>[CmsBlockProductConnector 1.1.2](https://github.com/spryker/cms-block-product-connector/releases/tag/1.1.2)</li><li>[CmsContentWidget 1.2.1](https://github.com/spryker/cms-content-widget/releases/tag/1.2.1)</li><li>[CmsGui 4.3.5](https://github.com/spryker/cms-gui/releases/tag/4.3.5)</li><li>[Currency 3.2.1](https://github.com/spryker/currency/releases/tag/3.2.1)</li><li>[Customer 7.4.1](https://github.com/spryker/customer/releases/tag/7.4.1)</li><li>[CustomerGroup 2.2.5](https://github.com/spryker/customer-group/releases/tag/2.2.5)</li><li>[CustomerUserConnectorGui 1.0.2](https://github.com/spryker/customer-user-connector-gui/releases/tag/1.0.2)</li><li>[Development 3.6.2](https://github.com/spryker/development/releases/tag/3.6.2)</li><li>[Discount 5.2.2](https://github.com/spryker/discount/releases/tag/5.2.2)</li><li>[DiscountPromotion 1.0.6](https://github.com/spryker/discount-promotion/releases/tag/1.0.6)</li><li>[DummyPayment 2.2.2](https://github.com/spryker/dummy-payment/releases/tag/2.2.2)</li><li>[Glossary 3.3.2](https://github.com/spryker/glossary/releases/tag/3.3.2)</li><li>[Gui 3.13.1](https://github.com/spryker/gui/releases/tag/3.13.1)</li><li>[Money 2.4.1](https://github.com/spryker/money/releases/tag/2.4.1)</li><li>[NavigationGui 2.1.1](https://github.com/spryker/navigation-gui/releases/tag/2.1.1)</li><li>[ProductAttributeGui 1.0.6](https://github.com/spryker/product-attribute-gui/releases/tag/1.0.6)</li><li>[ProductCategory 4.5.2](https://github.com/spryker/product-category/releases/tag/4.5.2)</li><li>[ProductCategoryFilterGui 1.1.1](https://github.com/spryker/product-category-filter-gui/releases/tag/1.1.1)</li><li>[ProductLabelGui 2.0.4](https://github.com/spryker/product-label-gui/releases/tag/2.0.4)</li><li>[ProductManagement 0.10.1](https://github.com/spryker/product-management/releases/tag/0.10.1)</li><li>[ProductOption 6.1.3](https://github.com/spryker/product-option/releases/tag/6.1.3)</li><li>[ProductRelation 2.1.2](https://github.com/spryker/product-relation/releases/tag/2.1.2)</li><li>[ProductSearch 5.4.3](https://github.com/spryker/product-search/releases/tag/5.4.3)</li><li>[ProductSetGui 2.0.2](https://github.com/spryker/product-set-gui/releases/tag/2.0.2)</li><li>[Sales 8.5.1](https://github.com/spryker/sales/releases/tag/8.5.1)</li><li>[SalesSplit 3.0.4](https://github.com/spryker/sales-split/releases/tag/3.0.4)</li><li>[Session 3.2.2](https://github.com/spryker/session/releases/tag/3.2.2)</li><li>[Shipment 6.2.1](https://github.com/spryker/shipment/releases/tag/6.2.1)</li><li>[StepEngine 3.1.2](https://github.com/spryker/step-engine/releases/tag/3.1.2)</li><li>[Symfony 3.1.3](https://github.com/spryker/symfony/releases/tag/3.1.3)</li><li>[Tax 5.1.5](https://github.com/spryker/tax/releases/tag/5.1.5)</li><li>[Twig 3.3.1](https://github.com/spryker/twig/releases/tag/3.3.1)</li><li>[User 3.1.4](https://github.com/spryker/user/releases/tag/3.1.4)</li></ul> |

### New Fields on Customer Account Page
In certain cases, a shop owner might need to know more specific information about clients, like, for example, their phone number, date of birth, locale or company they are working for. With this release, we have added Phone, Date of Birth, Company and Locale fields to "Create" and "Edit" pages in the Customers section in the Administrator Interface, which allows keeping record of the necessary customer data.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Customer 7.3.0](https://github.com/spryker/Customer/releases/tag/7.3.0) | n/a |

## Bugfixes
### Product Editing
Previously, when trying to save a product in the Edit mode, an error happened, since a wrong `QueryContainer` was used. This has been fixed, the product is saved fine now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductManagement 0.10.2](https://github.com/spryker/product-management/releases/tag/0.10.2) |

### Filter Names
Previously, we had an issue with filter names in the Administration Interface. This issue has been fixed, the filter names are correct now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|n/a | <ul><li>[ProductCategoryFilter 1.2.0](https://github.com/spryker/product-category-filter/releases/tag/1.2.0)</li><li>[ProductCategoryFilterGui 1.1.0](https://github.com/spryker/product-category-filter-gui/releases/tag/1.1.0)</li></ul> | n/a |

### Code Propagation Fix For Correct CI Results
Previously, we had an issue with the `CodeSniffer` console: it was not outputting an error code when a CS issue was found. This has now been resolved.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Development 3.6.1](https://github.com/spryker/development/releases/tag/3.6.1) |

### Adding Missing Attributes to Product Module
Previously, when updating the product module to spryker/product 5.4.0, the `AttributeLoader::getCombinedAbstractAttributeKeys()` method returned an array with not all the attributes. This issue has now been fixed so that all attributes that were there before the package update, are retrieved after the update as well.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Product 5.4.2](https://github.com/spryker/Product/releases/tag/5.4.2) |

### Images Display in Administration Interface
Previously, when opening a product page in the "View" or "Edit" modes in the Administration Interface, images with URLs were not displayed.  This issue has been solved with this release - all product images are displayed correctly in the "View" and "Edit" modes now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [ProductManagement 0.9.3](https://github.com/spryker/product-management/releases/tag/0.9.3) |

### Arvato RSS Fixes
Previously, we had several issues with Arvato RSS: 

* from time to time an error, related to empty AddressValidationResponse field, occurred on Yves;
* communication token was not processed when executing RSS-check in checkout and getting a valid response from RSS Arvato;
* `StoreOrderRequestMapper` was mapping `idCustomer` instead of `customerReference`;
* when executing a risk check and getting a correct address back, the additional address field was missing in the response transfer;
* even if a delivery address was equal to billing addresses, the delivery address was sent with the request as well.

All these issues have been fixed in this release.

## Documentation Updates
The following content has been added to the Academy:

* Spryker Dockerized Demoshop on Windows<!-- link -->
 
Your feedback would be highly appreciated. Please help us understand what you need from the Spryker Academy by filling out a very short [survey] https://docs.google.com/forms/d/1_vZg0lfqq24Qf9-fQhU50NgsEBy4eDqnDyx7gKz9Faw/edit).
