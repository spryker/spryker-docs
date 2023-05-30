---
title: Merchandising Setup
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/merchandising-setup
originalArticleId: 2e90589e-0267-458c-ac00-46550978ed76
redirect_from:
  - /2021080/docs/merchandising-setup
  - /2021080/docs/en/merchandising-setup
  - /docs/merchandising-setup
  - /docs/en/merchandising-setup
---

The **Merchandising Setup** category contains data required to manage the merchandising information in the online store. We have structured it into two main categories focusing on the following topics:

* [Product Merchandising](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/product-merchandising.html)
* [Discounts](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/discounts.html)

Within the [Product Merchandising](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/product-merchandising.html) section, you can find all information about the data imports required to manage product merchandising, which includes management of the Product Groups, Product Labels, and Product Sets.

In the [Discounts](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/discounts.html) section, you can import all data related to product discounts.

{% info_block warningBox "Import order" %}

The order in which the files are imported is *very strict*. For this reason, the data importers must be executed in the following order:

1. [Discount](/docs/pbc/all/discount-management/{{site.version}}/import-and-export-data/file-details-discount.csv.html)
2. [Discount Store](/docs/pbc/all/discount-management/{{site.version}}/import-and-export-data/file-details-discount-store.csv.html)
3. [Discount Voucher](/docs/pbc/all/discount-management/{{site.version}}/import-and-export-data/file-details-discount-voucher.csv.html)
4. [Product Group](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/file-details-product-group.csv.html)
5. [Product Relation](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-relation.csv.html)
6. [Product Review](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-review.csv.html)
7. [Product Label](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-label.csv.html)
8. [Product Set](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-set.csv.html)
9. [Product Search Attribute Map](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-search-attribute-map.csv.html)
10. [Product Search Attribute](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-search-attribute.csv.html)
11. [Discount Amount](/docs/pbc/all/discount-management/{{site.version}}/base-shop/import-and-export-data/file-details-discount-amount.csv.html)
12. [Product Discontinued](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-discontinued.csv.html)
13. [Product Alternative](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/file-details-product-alternative.csv.html)
14. [Product Quantity](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/import-and-export-data/file-details-product-quantity.csv.html)

{% endinfo_block %}
