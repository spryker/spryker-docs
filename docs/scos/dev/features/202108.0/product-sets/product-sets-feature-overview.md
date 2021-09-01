---
title: Product Sets feature overview
description: Learn about the modules that build up the Product Set feature
originalLink: https://documentation.spryker.com/2021080/docs/product-sets-feature-overview
originalArticleId: 7bc42ccb-f76c-400f-9372-251104ce0b77
redirect_from:
  - /2021080/docs/product-sets-feature-overview
  - /2021080/docs/en/product-sets-feature-overview
  - /docs/product-sets-feature-overview
  - /docs/en/product-sets-feature-overview
---

The *Product Sets* feature allows you to create and sell collections of products. For example, you can create a stationary workspace set, a set of clothing or accessories, or furniture for a specific room.

![product-set-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Sets/product-set-on-the-storefront.png)

When browsing a product set, a Storefront user can select variants per product in a set, add an individual or all products from the set to cart.

![product-set-actions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Sets/product-set-actions.png)


A Back Office user can define the following:
* The order of products in a set displayed on the Storefront.
* The order of products sets displayed on the Storefront. It's relevant if you have multiple product sets on the same page.
* The unique product set URL.


A Back Office user can add a product sets to any page by [creating a product set content item](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/content/content-items/creating-content-items.html) and [adding it to CMS pages and blocks](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/content/content-items/adding-content-items-to-cms-pages-and-blocks.html).


For more details on product sets, check the video:
<iframe src="https://spryker.wistia.com/medias/9co7uw35a9" title="Product Set" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="720" height="480"></iframe>



### Current constraints
Currently, the feature has the following functional constraints which are going to be resolved in the future:

* Product sets are shared across all the stores of a project.
* You cannot restrict availability of a product set to a store.
