---
title: Quick order from the catalog page overview
description: The Quick Order from the Catalog Page Feature allows Buyers to add products with one product variant to cart directly from the Category page.
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
* The product should not have [attributes](docs\scos\user\features\202009.0\product\product-feature-overview\product-attribute-overview.md).
* The product should not have [measurement](/docs/scos/dev/features/202009.0/measurement-units/measurement-units.html) or [packaging units](/docs/scos/dev/features/202009.0/packaging-units/packaging-units.html).

Product belonging to a [product group](https://documentation.spryker.com/v6/docs/products-overview) can also be added to cart from the Category page. However, like with regular products, a product from the product group should have no more than one variant, and be available.

If a product has [options](/docs/scos/dev/features/202009.0/product-options/product-options.html), it can be added to cart from the Category page, but it will be added without any options.



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li>Enable quick order from the catalog page in your project:
                    <ul>
                    <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\cart-feature-integration.md" class="mr-link">Integrate the Cart  feature</a></li>
                    <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\product-bundles-cart-feature-integration.md" class="mr-link">Integrate the Product Bundles + Cart feature</a></li>
                    <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\inventory-management-feature-integration.md" class="mr-link">Integrate the Inventory Management feature</a></li>
                    <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\product-feature-integration.md" class="mr-link">Integrate the Product feature</a></li>
                    <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\product-measurement-unit-feature-integration.md" class="mr-link">Integrate the Product Measurement feature</a></li>
                       <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\product-packaging-unit-feature-integration.md" class="mr-link">Integrate the Product Packaging Unit feature</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- col2 -->

</div>
