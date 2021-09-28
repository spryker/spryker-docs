---
title: Discontinued product overview
description: Discontinued products are shown during a certain period of time after the manufacturer or a distributor announces that the product is no longer produced.
originalLink: https://documentation.spryker.com/v6/docs/discontinued-product-overview
originalArticleId: aadff485-b78f-40e5-b4b8-f2525b0953d1
redirect_from:
  - /v6/docs/discontinued-product-overview
  - /v6/docs/en/discontinued-product-overview
---

If a concrete product runs out of stock, it is tagged as out of stock and cannot be added to cart:
![Discontinued PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-pdp-page.png)

Once the stock is updated with a positive number, the concrete product becomes available for purchase.

A *discontinued product* is a product which is no longer produced by its manufacturer. The discontinued product may have positive or negative stock.

When a Back Office user discountinues a product, they can define the date until which the product is displayed in the shop. Discontinued products have a certain period of time when they will still be shown on the website (active_until). This may be usefule, for example, when a product was discontinued but it's still in stock in the shop. On the define date, the product becomes inactive.

{% info_block warningBox %}

Only [concrete products](docs\scos\user\features\202009.0\product\product-feature-overview\product-overview.md#abstract-and-concrete-products-variants) can become discontinued.

{% endinfo_block %}

The schema below illustrates the relations between discontinued products, abstract and concrete products:
![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-schema.png)


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="docs\scos\dev\migration-and-integration\202108.0\feature-integration-guides\quick-add-to-cart-discontinued-products-feature-integration.md" class="mr-link">Integrate the Quick Order + Discontinued Products into your project</a></li>
                <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\alternative-products-discontinued-products-feature-integration.md" class="mr-link">Integrate Alternative Products + Discontinued Products into your project</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="docs\scos\user\user-guides\202009.0\back-office-user-guide\catalog\products\managing-products\discontinuing-a-product.md" class="mr-link">Discontinue a product</a></li>
            </ul>
        </div>
    </div>
</div>
