---
title: Alternative Products feature overview
description: Product alternatives is a great way to ease the user’s product finding process. It lets the user jump over product pages until they find a relevant item.
originalLink: https://documentation.spryker.com/2021080/docs/alternative-products-overview
originalArticleId: 08d3b38d-a625-4df2-9c67-b6c559a400e8
redirect_from:
  - /2021080/docs/alternative-products-overview
  - /2021080/docs/en/alternative-products-overview
  - /docs/alternative-products-overview
  - /docs/en/alternative-products-overview
---

Suggesting product alternatives is a great way to ease the user’s product finding process. Instead of browsing the product catalog, product alternatives let customers jump from one product page to the next until they find a relevant item.

For marketplace relations, alternative products are useful because for a marketplace owner it is irrelevant from what merchant a buyer has bought a product. If a merchant does not have this product, the alternative product can be shown on the marketplace.

A Back Office user can add product alternatives for both abstract and concrete products in **Catalog** > **Products**.

The schema below illustrates relations between the alternative products:
![Database relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Alternative+Products/Alternative+Products+Feature+Overview/alternative-schema.png)

All the available alternative products are shown on the abstract product details page, if one of the following occurs:

* All the concrete products of the abstract one are in the "out of stock" status.
* All the concrete products of the abstract one are [discontinued](/docs/scos/dev/features/{{page.version}}/product/product-feature-overview/discontinued-products-overview.html).

{% info_block infoBox %}
Alternative products can be attached to any product, but will be displayed only if the product becomes "out of stock" or "Discontinued".
{% endinfo_block %}

## Product replacement

On the product details page of a product that's a product alternaive for another product, you can see a *Replacement for*. This section displayes that products to which the current product is added as an alternative.
![Replacement for](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Alternative+Products/Alternative+Products+Feature+Overview/replacement-for.png)

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Add product alternatives](docs\scos\user\user-guides\202108.0\back-office-user-guide\catalog\products\managing-products\adding-product-alternatives.md) |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Alternative Products feature walkthrough](docs\scos\dev\feature-walkthroughs\202108.0\alternative-products-feature-walkthrough.md) for developers.

{% endinfo_block %}
