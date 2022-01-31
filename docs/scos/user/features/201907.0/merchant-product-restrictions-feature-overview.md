---
title: Merchant Product Restrictions feature overview
description: Product Restrictions allow merchants to define the products that are available to each of their B2B customers.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/product-restrictions-from-merchant-to-buyer-overview
originalArticleId: 58d9a8b1-c779-4c78-8067-19082226205c
redirect_from:
  - /v3/docs/product-restrictions-from-merchant-to-buyer-overview
  - /v3/docs/en/product-restrictions-from-merchant-to-buyer-overview
  - /v3/docs/product-restrictions-from-merchant-to-buyer
  - /v3/docs/en/product-restrictions-from-merchant-to-buyer
---

At its core, Product Restrictions allow merchants to define the products that are available to each of their B2B customers.

In terms of [Merchant concept](/docs/scos/user/features/{{page.version}}/merchant-b2b-contracts-feature-overview.html), the **merchant** is the one who sells products on a marketplace and can set prices.

The diagram below shows product restrictions relations within the Merchant concept:

![product-restrictions-model.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Product+Restrictions+from+Merchant+to+Buyer/Product+Restrictions+from+Merchant+to+Buyer+Overview/product-restrictions-model.png) 

Product Restrictions from Merchant to Buyer give merchants [another layer](/docs/scos/user/features/{{page.version}}/customer-access-feature-overview.html) of control over the information, a customer can see in the shop application. Based on product restrictions, you can:

* create a list of products;
* hide the product information for the products (pricing, appearance in the search/filters), and limit access to a product details page.

Product Restriction feature works on the basis of whitelist/blacklist lists. That means that products that are added to whitelist are always shown to a customer while blacklisted products are hidden from the customer view.

To restrict the products, a Shop Administrator needs to create a product list, include the necessary products to the list and blacklist them for a specific merchant relationship. All other products will be available for that merchant relationship.

To create product lists, follow the [guideline for the Back Office](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/creating-product-lists.html).

You can check more cases of product restrictions workflow on the [Restricted Products Behavior](/docs/scos/dev/feature-walkthroughs/{{page.version}}/merchant-product-restrictions-feature-walkthrough/restricted-products-behavior.html) page.

## Current Constraints
- Currently, in the situation, when a single product from the product set is blacklisted, the other items are displayed in the shop. We are going to update the logic in a way, that in case any of the items in the product set gets blacklisted, all relevant product sets containing this item will get blacklisted too.
-  The current functionality allows displaying the whole product bundle even if it contains the blacklisted customer-specific products. We are working on updating the logic so that if the bundle product includes a blacklisted item, the whole bundle is also blacklisted for a customer.
