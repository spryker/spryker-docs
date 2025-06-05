---
title: Alternative Products feature overview
description: Product alternatives is a great way to ease the user's product finding process. It lets the user jump over product pages until they find a relevant item.
last_updated: Jul 20, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/alternative-products-overview
originalArticleId: 08d3b38d-a625-4df2-9c67-b6c559a400e8
redirect_from:
  - /2021080/docs/alternative-products-overview
  - /2021080/docs/en/alternative-products-overview
  - /docs/alternative-products-overview
  - /docs/en/alternative-products-overview
  - /docs/scos/user/features/202200.0/alternative-products-feature-overview.html
  - /docs/alternative-products
  - /docs/scos/user/features/202311.0/alternative-products-feature-overview.html
  - /docs/pbc/all/product-information-management/202311.0/feature-overviews/alternative-products-feature-overview.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/feature-overviews/alternative-products-feature-overview.html
---

Suggesting product alternatives is a great way to ease the user's product finding process. Instead of browsing the product catalog, product alternatives let customers jump from one product page to the next until they find a relevant item.

For marketplace relations, alternative products are useful because for a marketplace owner it's irrelevant from what merchant a buyer has bought a product. If a merchant does not have this product, the alternative product can be shown on the marketplace.

A Back Office user can add product alternatives for both abstract and concrete products in **Catalog&nbsp;<span aria-label="and then">></span> Products**.

All the available alternative products are shown on the abstract product details page if one of the following occurs:

- All the concrete products of the abstract one are in the `out of stock` status.
- All the concrete products of the abstract one are [discontinued](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/discontinued-products-overview.html).

{% info_block infoBox %}

Alternative products can be attached to any product, but will be displayed only if the product becomes `out of stock` or `Discontinued`.

{% endinfo_block %}

## Product replacement

On the product details page of a product that's a product alternative for another product, you can see a *Replacement for*. This section displays products to which the current product is added as an alternative.

![Replacement for](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Alternative+Products/Alternative+Products+Feature+Overview/replacement-for.png)

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Add product alternatives](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/add-product-alternatives.html) |

## Related Developer documents

|INSTALLATION GUIDES  | GLUE API GUIDES  | DATA IMPORT |
|---------|---------|---------|
| [Install the Alternative Products feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-alternative-products-discontinued-products-feature.html)  | [Retrieving alternative products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-alternative-products.html)  | [File details: product_alternative.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-alternative.csv.html)  |
| [Alternative Products + Discontinued Products feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-alternative-products-discontinued-products-feature.html) |   |
| [Install the Alternative Products + Product Labels feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-alternative-products-product-labels-feature.html) |   |
| [Install the Alternative Products + Inventory Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-alternative-products-inventory-management-feature.html)   |   |
| [Install the Alternative products + Wishlist feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-alternative-products-wishlist-feature.html) |   |
| [Install the Alternative Products Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-alternative-products-glue-api.html) |   |
