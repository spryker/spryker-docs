---
title: Merchant Product Restrictions feature overview
originalLink: https://documentation.spryker.com/2021080/docs/merchant-product-restrictions-feature-overview
redirect_from:
  - /2021080/docs/merchant-product-restrictions-feature-overview
  - /2021080/docs/en/merchant-product-restrictions-feature-overview
---

At its core, Product Restrictions allow merchants to define the products that are available to each of their B2B customers.

In terms of [Merchant concept](https://documentation.spryker.com/docs/merchants-and-merchant-relations-overview), the **merchant** is the one who sells products on a marketplace and can set prices.

The diagram below shows product restrictions relations within the Merchant concept:

![product-restrictions-model.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Product+Restrictions+from+Merchant+to+Buyer/Product+Restrictions+from+Merchant+to+Buyer+Overview/product-restrictions-model.png){height="" width=""}

Product Restrictions from Merchant to Buyer give merchants [another layer](https://documentation.spryker.com/docs/hide-content-from-logged-out-users) of control over the information, a customer can see in the shop application. Based on product restrictions, you can:

* create a list of products;
* hide the product information for the products (pricing, appearance in the search/filters), and limit access to a product details page.

Product Restriction feature works on the basis of whitelist/blacklist lists. That means that products that are added to whitelist are always shown to a customer while blacklisted products are hidden from the customer view.

To restrict the products, a Shop Administrator needs to create a product list, include the necessary products to the list and blacklist them for a specific merchant relationship. All other products will be available for that merchant relationship.

To create product lists, follow the [guideline for the Back Office](https://documentation.spryker.com/docs/creating-a-product-list).

You can check more cases of product restrictions workflow on the [Restricted Products Behavior](https://documentation.spryker.com/docs/restricted-products-behavior) page.

## Current Constraints
- Currently, in the situation, when a single product from the product set is blacklisted, the other items are displayed in the shop. We are going to update the logic in a way, that in case any of the items in the product set gets blacklisted, all relevant product sets containing this item will get blacklisted too.
-  The current functionality allows displaying the whole product bundle even if it contains the blacklisted customer-specific products. We are working on updating the logic so that if the bundle product includes a blacklisted item, the whole bundle is also blacklisted for a customer.



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/restricted-products-behavior" class="mr-link">Check out the use cases of the restricted products behavior</a></li>
                <li>Integrate the Merchant Product Restrictions:</li>
                <li><a href="https://documentation.spryker.com/docs/merchant-product-restrictions-feature-integration" class="mr-link">Integrate the Merchant Product Restrictions feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/merchant-feature-integration" class="mr-link">Integrate the Merchant feature</a></li>  
            </ul>
        </div>
         <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/creating-a-product-list" class="mr-link">Create a product list to set product restrictions</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-product-lists#editing-a-product-list" class="mr-link">Edit a product list</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-product-lists#exporting-a-product-list" class="mr-link">Export a product list</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-product-lists#removing-a-product-list" class="mr-link">Remove a product list from the system</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-product-lists#removing-products-form-a-product-list" class="mr-link">Remove products from a product list</a></li>
            </ul>
        </div>
        

