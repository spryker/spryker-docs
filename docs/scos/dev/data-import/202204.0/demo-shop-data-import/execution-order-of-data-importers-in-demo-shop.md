---
title: Execution order of data importers in Demo Shop
last_updated: Jun 16, 2021
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

When setting up a Spryker's Demo Shop, a data content sample is imported while executing a sequence of data importers. A data importer is a PHP class that handles the data import. Each data importer uses a CSV file to load data that is then imported into the Demo Shop databases. The importing order of the CSV files depends on the order data importers are executed.

{% info_block infoBox "Info" %}

The order of data importers is defined in the [YML configuration file](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html).

{% endinfo_block %}

This operation has some dependencies, as data the importer execution follows certain precedences. For example, you can not import concrete products before importing abstract products, because concrete products can not exist without abstract ones.

The following list illustrates the order followed to run the data importers, and import the commerce shop's configuration setup data, product catalog data, and other content.

1. [Commerce Setup](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/commerce-setup.html) data import

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

2. [Catalog Setup](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-product-catalog-data.html) data import - Catalog Setup category includes sub-categories: Categories, Products, Pricing, Stocks

  13. category-template
  14. category
  15. product-attribute-key
  16. product-management-attribute
  17. product-abstract
  18. product-abstract-store
  19. product-concrete
  20. product-image
  21. product-price
  22. product-price-schedule
  23. product-stock


3. [Merchandising Setup](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/merchandising-setup.html) data import

  37. discount
  38. discount-store
  39. discount-voucher
  40. product-group
  41. product-relation
  42. product-review
  43. product-label
  44. product-set
  45. product-search-attribute-map
  46. product-search-attribute
  47. discount-amount
  48. product-discontinued
  49. product-alternative
  50. product-quantity
  51. product-list
  52. product-list-category
  53. product-list-product-concrete

4. [Navigation Setup](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/navigation-setup.html) data import

  54. navigation
  55. navigation-node

5. [Content Management Setup](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/content-management.html) data import

  56. cms-template
  57. cms-block
  58. cms-block-store
  59. cms-block-category-position
  60. cms-block-category
  61. content-banner
  62. content-product-abstract-list
  63. content-product-set
  64. cms-page
  65. cms-page-store
  66. cms-slot-template
  67. cms-slot
  68. cms-slot-block

**6. B2B data import**

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
