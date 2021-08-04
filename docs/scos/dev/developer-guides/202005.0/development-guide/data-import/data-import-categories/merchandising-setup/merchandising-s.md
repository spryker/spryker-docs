---
title: Merchandising Setup
originalLink: https://documentation.spryker.com/v5/docs/merchandising-setup
redirect_from:
  - /v5/docs/merchandising-setup
  - /v5/docs/en/merchandising-setup
---

The **Merchandising Setup** category contains data required to manage the merchandising information in the online store. We have structured it into two main categories focusing on the following topics:

* [Product Merchandising](https://documentation.spryker.com/docs/en/product-merchandising)
* [ Discounts](https://documentation.spryker.com/docs/en/discounts)

Within the [Product Merchandising](https://documentation.spryker.com/docs/en/product-merchandising) section, you will find all information about the data imports required to manage product merchandising, which includes management of the Product Groups, Product Labels, Product Sets, etc.

In the [ Discounts](https://documentation.spryker.com/docs/en/discounts) section, you will be able to import all data related to product discounts.

{% info_block warningBox "Import order" %}

The order in which the files are imported is **very strict**. For this reason, the data importers should be executed in the following order:

1. [Discount](https://documentation.spryker.com/docs/en/file-details-discountcsv)
2. [Discount Store](https://documentation.spryker.com/docs/en/file-details-discount-storecsv)
3. [Discount Voucher](https://documentation.spryker.com/docs/en/file-details-discount-vouchercsv)
4. [Product Group](https://documentation.spryker.com/docs/en/file-details-product-groupcsv)
5. [Product Relation](https://documentation.spryker.com/docs/en/file-details-product-relationcsv)
6. [Product Review](https://documentation.spryker.com/docs/en/file-details-product-reviewcsv)
7. [Product Label](https://documentation.spryker.com/docs/en/file-details-product-labelcsv)
8. [Product Set](https://documentation.spryker.com/docs/en/file-details-product-setcsv)
9. [Product Search Attribute Map](https://documentation.spryker.com/docs/en/file-details-product-search-attribute-mapcsv)
10. [Product Search Attribute](https://documentation.spryker.com/docs/en/file-details-product-search-attributecsv)
1. [Discount Amount](https://documentation.spryker.com/docs/en/file-details-discount-amountcsv)
2. [Product Discontinued](https://documentation.spryker.com/docs/en/file-details-product-discontinuedcsv)
3. [Product Alternative](https://documentation.spryker.com/docs/en/file-details-product-alternativecsv)
4. [Product Quantity](https://documentation.spryker.com/docs/en/file-details-product-quantitycsv)


{% endinfo_block %}
