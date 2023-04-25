---
title: Execution order of data importers in Demo Shop
last_updated: Apr 12, 2023
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/execution-order-of-data-importers-in-demo-shop
originalArticleId: 976a9f67-fc56-4fb7-811e-f30a2842e5d0
redirect_from:
  - /2021080/docs/execution-order-of-data-importers-in-demo-shop
  - /2021080/docs/en/execution-order-of-data-importers-in-demo-shop
  - /docs/execution-order-of-data-importers-in-demo-shop
  - /docs/en/execution-order-of-data-importers-in-demo-shop
  - /docs/scos/dev/tutorials/201903.0/howtos/feature-howtos/howto-import-merchants-and-merchant-relations.html
---

When setting up a Spryker Demo Shop, a data content sample is imported while executing a sequence of data importers. The data importer is a PHP class that handles the data import. Each data importer uses a CSV file to load data that will then be imported into the Demo Shop databases. The importing order of the CSV files is dependent on the order in which the data importers are executed.

{% info_block infoBox "Info" %}

The order of data importers is defined in the [YML configuration file](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html).

{% endinfo_block %}

This operation has some dependencies because data importers' execution follows certain precedences. For example, you can not import Concrete products before importing abstract products because concrete products can not exist without abstracts.

The following list illustrates the order followed to run the data importers and import the commerce shop configuration setup data, product catalog data, and other content.

* Commerce
  * store
  * [currency](/docs/pbc/all/price-management/{{page.version}}/import-and-export-data/file-details-currency.csv.html)
  * [customer](/docs/pbc/all/customer-relationship-management/{{page.version}}/file-details-customer.csv.html)
  * [glossary](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-glossary.csv.html)
  * [tax](/docs/pbc/all/tax-management/{{page.version}}/import-and-export-data/import-tax-sets.html)
  * [shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/file-details-shipment.csv.html)
  * [shipment-price](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/file-details-shipment-price.csv.html)
  * [shipment-method-store](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/file-details-shipment-method-store.csv.html)
  * [sales-order-threshold](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/import-and-export-data/file-details-sales-order-threshold.csv.html)
  * stock-store
  * [payment-method](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-payment-method.csv.html)
  * [payment-method-store](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-payment-method-store.csv.html)

* [Catalog](https://docs.spryker.com/docs/pbc/all/product-information-management/202204.0/import-and-export-data/import-product-catalog-data.html)
  * [category-template](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/categories-data-import/file-details-category-template.csv.html)
  * [category](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/categories-data-import/file-details-category.csv.html)
  * [product-attribute-key](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-attribute-key.csv.html)
  * [product-management-attribute](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-management-attribute.csv.html)
  * [product-abstract](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-abstract.csv.html)
  * [product-abstract-store](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-abstract-store.csv.html)
  * [product-concrete](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-concrete.csv.html)
  * [product-image](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-image.csv.html)
  * [product-price](/docs/pbc/all/price-management/{{page.version}}/import-and-export-data/file-details-product-price.csv.html)
  * [product-price-schedule](/docs/pbc/all/price-management/{{page.version}}/import-and-export-data/file-details-product-price-schedule.csv.html)
  * [product-stock](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-data/file-details-product-stock.csv.html)

* Special Products
  * [product-option](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/product-options/file-details-product-option.csv.html)
  * [product-option-price](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/product-options/file-details-product-option-price.csv.html)

* [Gift cards](https://docs.spryker.com/docs/pbc/all/gift-cards/202212.0/import-and-export-data/import-of-gift-cards.html)
  * [gift-card-abstract-configuration](/docs/pbc/all/gift-cards/{{page.version}}/import-and-export-data/file-details-gift-card-abstract-configuration.csv.html)
  * [gift-card-concrete-configuration](/docs/pbc/all/gift-cards/{{page.version}}/import-and-export-data/file-details-gift-card-concrete-configuration.csv.html)
  * product-packaging-unit-type
  * product-packaging-unit
  * product-measurement-unit
  * product-measurement-base-unit
  * product-measurement-sales-unit
  * product-measurement-sales-unit-store
  * configurable-bundle-template
  * configurable-bundle-template-slot
  * configurable-bundle-template-image

* [Merchandising](https://docs.spryker.com/docs/scos/dev/data-import/202204.0/data-import-categories/merchandising-setup/merchandising-setup.html)
  * [discount](/docs/pbc/all/discount-management/{{page.version}}/import-and-export-data/file-details-discount.csv.html)
  * [discount-store](/docs/pbc/all/discount-management/{{page.version}}/import-and-export-data/file-details-discount-store.csv.html)
  * [discount-voucher](/docs/pbc/all/discount-management/{{page.version}}/import-and-export-data/file-details-discount-voucher.csv.html)
  * [product-group](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/file-details-product-group.csv.html)
  * [product-relation](/docs/pbc/all/product-relationship-management/{{page.version}}/file-details-product-relation.csv.html)
  * [product-review](/docs/pbc/all/ratings-reviews/{{page.version}}/import-and-export-data/file-details-product-review.csv.html)
  * [product-label](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/file-details-product-label.csv.html)
  * [product-set](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-product-set.csv.html)
  * [product-search-attribute-map](/docs/pbc/all/search/{{page.version}}/import-data/file-details-product-search-attribute-map.csv.html)
  * [product-search-attribute](/docs/pbc/all/search/{{page.version}}/import-data/file-details-product-search-attribute.csv.html)
  * [discount-amount](/docs/pbc/all/discount-management/{{page.version}}/import-and-export-data/file-details-discount-amount.csv.html)
  * [product-discontinued](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/file-details-product-discontinued.csv.html)
  * [product-alternative](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/file-details-product-alternative.csv.html)
  * [product-quantity](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/import-and-export-data/file-details-product-quantity.csv.html)
  * product-list
  * product-list-category
  * product-list-product-concrete

* Navigation
  * [navigation](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-navigation.csv.html)
  * [navigation-node](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-navigation-node.csv.html)

* Content Management
* [cms-template](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-template.csv.html)
* [cms-block](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-block.csv.html)
* [cms-block-store](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-block-store.csv.html)
* [cms-block-category-position](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-block-category-postion.csv.html)
* [cms-block-category](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-block-category.csv.html)
* [content-banner](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-content-banner.csv.html)
* [content-product-abstract-list](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-content-product-abstract-list.csv.html)
* [content-product-set](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-content-product-set.csv.html)
* [cms-page](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-page.csv.html)
* [cms-page-store](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-page-store.csv.html)
* [cms-slot-template](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-slot-template.csv.html)
* [cms-slot](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-slot.csv.html)
* [cms-slot-block](/docs/pbc/all/content-management-system/{{page.version}}/import-and-export-data/file-details-cms-slot-block.csv.html)

* B2B Company
  * company
  * company-business-unit
  * company-unit-address
  * company-unit-address-label
  * company-unit-address-label-relation
  * company-user
  * company-role
  * company-role-permission
  * company-user-role
  * company-business-unit-user
  * company-business-unit-address
  * company-user-on-behalf

* B2B Merchant
  * [merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-data/file-details-merchant.csv.html)
  * [merchant-profile](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-data/file-details-merchant-profile.csv.html)
  * [merchant-profile-address](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-data/file-details-merchant-profile-address.csv.html)
  * [merchant-product-offer](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer.csv.html)
  * [merchant-product-offer-store](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer-store.csv.html)
  * [merchant-open-hours-weekday-schedule](/docs/marketplace/dev/data-import/202204.0/file-details-merchant-open-hours-week-day-schedule.csv.html)
  * [merchant-open-hours-date-schedule](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-data/file-details-merchant-open-hours-date-schedule.csv.html)
  * [product-offer-validity](/docs/marketplace/dev/data-import/{{page.version}}/file-details-product-offer-validity.csv.html)
  * [price-product-offer](/docs/marketplace/dev/data-import/{{page.version}}/file-details-price-product-offer.csv.html)
  * [product-offer-stock](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/import-data/file-details-product-offer-stock.csv.html)
  * [merchant-stock](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-data/file-details-merchant-stock.csv.html)
  * merchant-relationship
  * merchant-relationship-sales-order-threshold
  * merchant-relationship-product-list
  * product-price-merchant-relationship

* B2B Shopping List
  * shopping-list
  * shopping-list-item
  * shopping-list-company-user
  * shopping-list-company-business-unit

* B2B Miscellaneous
  * multi-cart
  * shared-cart
  * quote-request
  * quote-request-version



