---
title: Quick Order from the Catalog Page overview
description: The Quick Order from the Catalog Page Feature allows Buyers to add products with one product variant to cart directly from the Category page.
originalLink: https://documentation.spryker.com/2021080/docs/quick-order-from-the-catalog-page-overview
originalArticleId: a931a32d-1f7d-4177-b99c-1146e26b885e
redirect_from:
  - /2021080/docs/quick-order-from-the-catalog-page-overview
  - /2021080/docs/en/quick-order-from-the-catalog-page-overview
  - /docs/quick-order-from-the-catalog-page-overview
  - /docs/en/quick-order-from-the-catalog-page-overview
---

Buyers can add simple products with one product variant to cart directly from the Category page by clicking the **Add to cart** icon on the product card. 
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Quick+Order+from+the+Catalog+Page/Quick+Order+from+the+Catalog+Page+Feature+Overview/quick-order-from-catalog.png){height="" width=""}

For the **Add to cart** icon to be active for the product on the Catalog page, the following criteria should be met: 

* The product should be abstract with only one variant.
* The product should be available.
* The product should not have [attributes](https://documentation.spryker.com/2021080/docs/attributes).
* The product should not have [measurement](https://documentation.spryker.com/2021080/docs/measurement-units) or [packaging units](https://documentation.spryker.com/2021080/docs/packaging-units).

Product belonging to a [product group](/docs/scos/dev/features/{{page.version}}/product/product-feature-overview/products-overview.html) can also be added to cart from the Category page. However, like with regular products, a product from the product group should have no more than one variant, and be available. 

If a product has [options](/docs/scos/dev/features/{{page.version}}/product-options/product-options.html), it can be added to cart from the Category page, but it will be added without any options.



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li>Enable quick order from the catalog page in your project:
                    <ul>
<li><a href="https://documentation.spryker.com/docs/cart-feature-integration" class="mr-link">Integrate the Cart  feature</a></li>
                    <li><a href="https://documentation.spryker.com/docs/product-bundles-cart-feature-integration" class="mr-link">Integrate the Product Bundles + Cart feature</a></li>
                    <li><a href="https://documentation.spryker.com/docs/inventory-management-feature-integration" class="mr-link">Integrate the Inventory Management feature</a></li>
                    <li><a href="https://documentation.spryker.com/docs/product-feature-integration" class="mr-link">Integrate the Product feature</a></li>
                    <li><a href="https://documentation.spryker.com/docs/product-measurement-unit-feature-integration" class="mr-link">Integrate the Product Measurement feature</a></li>
                       <li><a href="https://documentation.spryker.com/docs/en/product-packaging-unit-feature-integration" class="mr-link">Integrate the Product Packaging Unit feature</a></li>
                    </ul>
                </li> 
            </ul>
        </div>
        <!-- col2 -->
      
</div>
