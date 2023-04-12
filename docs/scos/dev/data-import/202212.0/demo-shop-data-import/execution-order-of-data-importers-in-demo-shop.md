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
  * currency
  * customer
  * glossary
  * tax
  * shipment
  * shipment-price
  * shipment-method-store
  * sales-order-threshold
  * stock-store
  * payment-method
  * payment-method-store

* Catalog
  * category-template
  * category
  * product-attribute-key
  * product-management-attribute
  * product-abstract
  * product-abstract-store
  * product-concrete
  * product-image
  * product-price
  * product-price-schedule
  * product-stock

* Special Products
  * product-option
  * product-option-price
  * gift-card-abstract-configuration
  * gift-card-concrete-configuration
  * product-packaging-unit-type
  * product-packaging-unit
  * product-measurement-unit
  * product-measurement-base-unit
  * product-measurement-sales-unit
  * product-measurement-sales-unit-store
  * configurable-bundle-template
  * configurable-bundle-template-slot
  * configurable-bundle-template-image

* Merchandising
  * discount
  * discount-store
  * discount-voucher
  * product-group
  * product-relation
  * product-review
  * product-label
  * product-set
  * product-search-attribute-map
  * product-search-attribute
  * discount-amount
  * product-discontinued
  * product-alternative
  * product-quantity
  * product-list
  * product-list-category
  * product-list-product-concrete

* Navigation
  * navigation
  * navigation-node

* Content Management
* cms-template
* cms-block
* cms-block-store
* cms-block-category-position
* cms-block-category
* content-banner
* content-product-abstract-list
* content-product-set
* cms-page
* cms-page-store
* cms-slot-template
* cms-slot
* cms-slot-block

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
  * merchant
  * merchant-profile
  * merchant-profile-address
  * merchant-product-offer
  * merchant-product-offer-store
  * merchant-opening-hours-weekday-schedule
  * merchant-opening-hours-date-schedule
  * product-offer-validity
  * price-product-offer
  * product-offer-stock
  * merchant-stock
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



