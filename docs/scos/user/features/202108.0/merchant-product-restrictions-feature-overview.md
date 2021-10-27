---
title: Merchant Product Restrictions feature overview
description: Merchant Product Restrictions allow merchants to define the products that are available to each of their B2B customers.
last_updated: Jul 22, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/merchant-product-restrictions-feature-overview
originalArticleId: 9d02b7ac-0e20-47bf-8f5b-656279a8278d
redirect_from:
  - /2021080/docs/merchant-product-restrictions-feature-overview
  - /2021080/docs/en/merchant-product-restrictions-feature-overview
  - /docs/merchant-product-restrictions-feature-overview
  - /docs/en/merchant-product-restrictions-feature-overview
---

At its core, the _Product Restrictions_ feature allows merchants to define the products that are available to each of their B2B customers.

In terms of [Merchant concept](/docs/scos/user/features/{{page.version}}/merchant-b2b-contracts-feature-overview.html), the **merchant** is the one who sells products on a marketplace and can set prices.

Product restrictions from a merchant to a buyer give merchants [another layer](/docs/scos/user/features/{{page.version}}/customer-access-feature-overview.html) of control over the information, a customer can see in the shop application. Based on product restrictions, you can:

* Create a list of products.
* Hide the product information for the products (pricing, appearance in the search/filters), and limit access to a product details page.

Product Restriction feature works on the basis of whitelist/blacklist lists. That means that products that are added to whitelist are always shown to a customer while blacklisted products are hidden from the customer view.

To restrict the products, a Shop Administrator needs to create a product list, include the necessary products to the list and blacklist them for a specific merchant relationship. All other products will be available for that merchant relationship.

To create product lists, follow the [guideline for the Back Office](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/creating-product-lists.html).

You can check more cases of product restrictions workflow on the [Restricted Products Behavior](/docs/scos/dev/feature-walkthroughs/{{page.version}}/merchant-product-restrictions-feature-walkthrough/restricted-products-behavior.html) page.

## Current constraints

- Currently, in the situation, when a single product from the product set is blacklisted, the other items are displayed in the shop. We are going to update the logic in a way, that in case any of the items in the product set gets blacklisted, all relevant product sets containing this item will get blacklisted too.
-  The current functionality allows displaying the whole product bundle even if it contains the blacklisted customer-specific products. We are working on updating the logic so that if the bundle product includes a blacklisted item, the whole bundle is also blacklisted for a customer.

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Create product lists to set product restrictions](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/creating-product-lists.html)  |
| [Edit a product list](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/managing-product-lists.html#editing-a-product-list) |
| [Export a product list](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/managing-product-lists.html#exporting-a-product-list) |
| [Remove a product list from the system](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/managing-product-lists.html#removing-a-product-list)  |
| [Assign products to a product list](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/managing-product-lists.html#assigning-products-to-a-product-list) |
| [Remove products from a product list](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/product-lists/managing-product-lists.html#deassigning-products-form-a-product-list) |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Merchant Product Restrictions feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/merchant-product-restrictions-feature-walkthrough/merchant-product-restrictions-feature-walkthrough.html) for developers.

{% endinfo_block %}
