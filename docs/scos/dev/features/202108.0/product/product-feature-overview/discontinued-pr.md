---
title: Discontinued Products overview
originalLink: https://documentation.spryker.com/2021080/docs/discontinued-products-overview
redirect_from:
  - /2021080/docs/discontinued-products-overview
  - /2021080/docs/en/discontinued-products-overview
---

If a concrete product runs out of stock, it is tagged as out of stock and cannot be added to cart:
![Discontinued PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-pdp-page.png)

Once the stock is updated with a positive number, the concrete product becomes available for purchase.

A *discontinued product* is a product which is no longer produced by its manufacturer. The discontinued product may have positive or negative stock.

When a Back Office user discountinues a product, they can define the date until which the product is displayed in the shop. Discontinued products have a certain period of time when they will still be shown on the website (active_until). This may be usefule, for example, when a product was discontinued but it's still in stock in the shop. On the define date, the product becomes inactive. 

{% info_block warningBox %}
Only [concrete products](https://documentation.spryker.com/docs/product-abstraction#abstract-and-concrete-products--variants-
{% endinfo_block %} can become discontinued.)

The schema below illustrates the relations between discontinued products, abstract and concrete products:
![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-schema.png)


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/file-details-product-discontinuedcsv" class="mr-link">Import discontinued products</a></li> 
               <li>Enable Discontinued Products:</li>
                <li><a href="https://documentation.spryker.com/docs/en/quick-order-discontinued-products-feature-integration" class="mr-link">Integrate the Quick Order + Discontinued Products feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/alternative-products-discontinued-products-feature-integration" class="mr-link">Integrate Alternative Products + Discontinued Products feature</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/discontinuing-a-product" class="mr-link">Discontinue a product</a></li>
            </ul>
        </div>
    </div>
</div>



