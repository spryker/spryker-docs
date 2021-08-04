---
title: Alternative Products feature overview
originalLink: https://documentation.spryker.com/2021080/docs/alternative-products-overview
redirect_from:
  - /2021080/docs/alternative-products-overview
  - /2021080/docs/en/alternative-products-overview
---

Suggesting product alternatives is a great way to ease the user’s product finding process. Instead of browsing the product catalog, product alternatives let customers jump from one product page to the next until they find a relevant item. 

For marketplace relations, alternative products are useful because for a marketplace owner it is irrelevant from what merchant a buyer has bought a product. If a merchant does not have this product, the alternative product can be shown on the marketplace.

A Back Office user can add product alternatives for both abstract and concrete products in **Catalog** > **Products**.

The schema below illustrates relations between the alternative products:
![Database relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Alternative+Products/Alternative+Products+Feature+Overview/alternative-schema.png)

All the available alternative products are shown on the abstract product details page, if one of the following occurs:

* All the concrete products of the abstract one are in the "out of stock" status.
* All the concrete products of the abstract one are [discontinued](https://documentation.spryker.com/docs/discontinued-products-overview).

{% info_block infoBox %}
Alternative products can be attached to any product, but will be displayed only if the product becomes "out of stock" or "Discontinued".
{% endinfo_block %}

## Product replacement 
On the product details page of a product that's a product alternaive for another product, you can see a *Replacement for*. This section displayes that products to which the current product is added as an alternative.
![Replacement for](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Alternative+Products/Alternative+Products+Feature+Overview/replacement-for.png)


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/file-details-product-alternativecsv" class="mr-link">Import alternative products</a></li>
               <li><a href="https://documentation.spryker.com/docs/retrieving-alternative-products" class="mr-link">Retrieve alternative products via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-alternative-products-feature-integration" class="mr-link">Integrate the Alternative Products Glue API</a></li>               
                <li>Integrate the Alternative Products feature:</li>
                <li><a href="https://documentation.spryker.com/docs/alternative-products-feature-integration" class="mr-link">Integrate the Alternative Products feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/alternative-products-discontinued-products-feature-integration" class="mr-link">Integrate Alternative Products + Discontinued Products feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/alternative-products-product-labels-feature-integration" class="mr-link">Integrate Alternative Products + Product Labels feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/alternative-products-inventory-management-feature-integration" class="mr-link">Integrate Alternative Products + Inventory Management feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/alternative-products-wishlist-feature-integration" class="mr-link">Integrate Alternative Products + Wishlist feature</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/adding-product-alternatives" class="mr-link">Add alternatives products</a></li>
            </ul>
        </div>
    </div>
</div>
