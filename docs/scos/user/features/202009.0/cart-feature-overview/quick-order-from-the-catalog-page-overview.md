---
title: Quick order from the catalog page overview
description: The Quick Order from the Catalog Page Feature allows Buyers to add products with one product variant to cart directly from the Category page.
last_updated: Jun 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/quick-order-from-the-catalog-page-overview
originalArticleId: 69b0475b-9f16-4b21-b9e3-c753d6d6d91c
redirect_from:
  - /v6/docs/quick-order-from-the-catalog-page-overview
  - /v6/docs/en/quick-order-from-the-catalog-page-overview
---

Buyers can add simple products with one product variant to cart directly from the Category page by clicking the **Add to cart** icon on the product card.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Quick+Order+from+the+Catalog+Page/Quick+Order+from+the+Catalog+Page+Feature+Overview/quick-order-from-catalog.png)

For the **Add to cart** icon to be active for the product on the Catalog page, the following criteria should be met:

* The product should be abstract with only one variant.
* The product should be available.
* The product should not have [attributes](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-attributes-overview.html).
* The product should not have [measurement](/docs/scos/user/features/{{page.version}}/measurement-units-feature-overview.html) or [packaging units](/docs/scos/user/features/{{page.version}}/packaging-units-feature-overview.html).

Product belonging to a [product group](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html) can also be added to cart from the Category page. However, like with regular products, a product from the product group should have no more than one variant, and be available.

If a product has [options](/docs/scos/user/features/{{page.version}}/product-options-feature-overview.html), it can be added to cart from the Category page, but it will be added without any options.
