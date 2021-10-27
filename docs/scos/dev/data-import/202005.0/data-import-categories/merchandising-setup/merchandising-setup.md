---
title: Merchandising Setup
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/merchandising-setup
originalArticleId: 3e1e0a19-a73f-4709-9930-742579a13f92
redirect_from:
  - /v5/docs/merchandising-setup
  - /v5/docs/en/merchandising-setup
---

The **Merchandising Setup** category contains data required to manage the merchandising information in the online store. We have structured it into two main categories focusing on the following topics:

* [Product Merchandising](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/product-merchandising.html)
* [ Discounts](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/discounts.html)

Within the [Product Merchandising](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/product-merchandising.html) section, you will find all information about the data imports required to manage product merchandising, which includes management of the Product Groups, Product Labels, Product Sets, etc.

In the [ Discounts](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/discounts.html) section, you will be able to import all data related to product discounts.

{% info_block warningBox "Import order" %}

The order in which the files are imported is **very strict**. For this reason, the data importers should be executed in the following order:

1. [Discount](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount.csv.html)
2. [Discount Store](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-store.csv.html)
3. [Discount Voucher](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-voucher.csv.html)
4. [Product Group](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-group.csv.html)
5. [Product Relation](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-relation.csv.html)
6. [Product Review](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-review.csv.html)
7. [Product Label](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-label.csv.html)
8. [Product Set](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-set.csv.html)
9. [Product Search Attribute Map](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-search-attribute-map.csv.html)
10. [Product Search Attribute](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-search-attribute.csv.html)
1. [Discount Amount](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-amount.csv.html)
2. [Product Discontinued](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-discontinued.csv.html)
3. [Product Alternative](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-alternative.csv.html)
4. [Product Quantity](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-quantity.csv.html)


{% endinfo_block %}
