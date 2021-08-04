---
title: Execution Order of Data Importers in Demo Shop
originalLink: https://documentation.spryker.com/2021080/docs/execution-order-of-data-importers-in-demo-shop
redirect_from:
  - /2021080/docs/execution-order-of-data-importers-in-demo-shop
  - /2021080/docs/en/execution-order-of-data-importers-in-demo-shop
---

When setting up a Spryker’s Demo Shop, data content sample is imported while executing a sequence of data importers. The data importer is a PHP class which handles the data import. Each data importer uses a .csv file to load data that will then be imported into the Demo Dhop database(s). The importing order of the .csv files is dependent on the order the data importers are executed. 

{% info_block infoBox "Info" %}

The order of data importers is defined in the [.yml configuration file](https://documentation.spryker.com/docs/importing-data).

{% endinfo_block %}

This operation has some dependencies, as data importers execution follows certain precedences. For example, you can not import Concrete products before importing the Abstract products, as Concrete products can not exists without Abstracts.

The list below illustrates the order followed to run the data importers, and import the: Commerce shop configuration setup data, product catalog data, and other content.

**1. [Commerce Setup](https://documentation.spryker.com/docs/commerce-setup) data import**

  1. store
  2. currency
  3. customer
  4. glossary
  5. tax
  6. shipment
  7. shipment-price
  8. shipment-method-store
  9. sales-order-threshold
  10. stock-store
  11. payment-method
  12. payment-method-store

**2. Catalog Setup data import - Catalog Setup category includes sub-categories: Categories, Products, Pricing, Stocks**

  1. category-template
  2. category
  3. product-attribute-key
  4. product-management-attribute
  5. product-abstract
  6. product-abstract-store
  7. product-concrete
  8. product-image
  9. product-price
  10. product-price-schedule
  11. product-stock


**3. Special Product Types Setup import - Special Product Types category includes sub-categories: Product Options, Measurements, Product Bundles, Gift Cards**

  1. product-option
  2. product-option-price
  3. gift-card-abstract-configuration
  4. gift-card-concrete-configuration
  5. product-packaging-unit-type
  6. product-packaging-unit
  7. product-measurement-unit
  8. product-measurement-base-unit
  9. product-measurement-sales-unit
  10. product-measurement-sales-unit-store
  11. configurable-bundle-template
  12. configurable-bundle-template-slot
  13. configurable-bundle-template-image


**4. Merchandising Setup import**

  1. discount
  2. discount-store
  3. discount-voucher
  4. product-group
  5. product-relation
  6. product-review
  7. product-label
  8. product-set
  9. product-search-attribute-map
  10. product-search-attribute
  11. discount-amount
  12. product-discontinued
  13. product-alternative
  14. product-quantity
  15. product-list
  16. product-list-category
  17. product-list-product-concrete

**5. Navigation Setup import**

  1. navigation
  2. navigation-node

**6. Content Management Setup import**

  1. cms-template
  2. cms-block
  3. cms-block-store
  4. cms-block-category-position
  5. cms-block-category
  6. content-banner
  7. content-product-abstract-list
  8. content-product-set
  9. cms-page
  10. cms-page-store
  11. cms-slot-template
  12. cms-slot
  13. cms-slot-block

**7. Miscellaneous Setup import**

  1. comment
  2. mime-type

**8. B2B data import**

*  **B2B Company**

 1. company
  2. company-business-unit
  3. company-unit-address
  4. company-unit-address-label
  5. company-unit-address-label-relation
  6. company-user
  7. company-role
  8. company-role-permission
  9. company-user-role
  10. company-business-unit-user
  11. company-business-unit-address
  12. company-user-on-behalf

*  **B2B Merchant**

  1. merchant
  2. merchant-profile
  3. merchant-profile-address
  4. merchant-product-offer
  5. merchant-product-offer-store
  6. merchant-opening-hours-weekday-schedule
  7. merchant-opening-hours-date-schedule
  8. product-offer-validity
  9. price-product-offer
  10. product-offer-stock
  11. merchant-stock
  12. merchant-relationship
  13. merchant-relationship-sales-order-threshold
  14. merchant-relationship-product-list
  15. product-price-merchant-relationship

* **B2B Shopping List**

  1. shopping-list
  2. shopping-list-item
  3. shopping-list-company-user
  4. shopping-list-company-business-unit

* **B2B Miscellaneous**

  1. multi-cart
  2. shared-cart
  3. quote-request
  4. quote-request-version
