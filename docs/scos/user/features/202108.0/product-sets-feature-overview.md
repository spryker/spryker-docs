---
title: Product Sets feature overview
description: Learn about the modules that build up the Product Set feature
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/product-sets-feature-overview
originalArticleId: 7bc42ccb-f76c-400f-9372-251104ce0b77
redirect_from:
  - /2021080/docs/product-sets-feature-overview
  - /2021080/docs/en/product-sets-feature-overview
  - /docs/product-sets-feature-overview
  - /docs/en/product-sets-feature-overview
  - /2021080/docs/product-set
  - /2021080/docs/en/product-set
  - /docs/product-set
  - /docs/en/product-set
---

The *Product Sets* feature allows you to create and sell collections of products. For example, you can create a stationary workspace set, a set of clothing or accessories, or furniture for a specific room. The "Shop-the-Look" function is a common example of a product set, where you can build a collection of items based on relations or recommendations.

![product-set-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Sets/product-set-on-the-storefront.png)

When browsing a product set, a Storefront user can select variants per product in a set, add an individual or all products from the set to cart.

![product-set-actions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Sets/product-set-actions.png)

A Back Office user can define the following:
* The order of products in a set displayed on the Storefront.
* The order of products sets displayed on the Storefront. It's relevant if you have multiple product sets on the same page.
* The unique product set URL.

A Back Office user can add a product sets to any page by [creating a product set content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html) and [adding it to CMS pages and blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/adding-content-items-to-cms-pages-and-blocks.html).


For more details on product sets, check the video:

{% wistia 9co7uw35a9 720 480 %}

### Current constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future:
* Product sets are shared across all the stores of a project.
* You cannot restrict availability of a product set to a store.


## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of the Product Sets feature](/docs/scos/user/features/{{page.version}}/product-sets-feature-overview.html) |
| [Create product sets](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-sets/creating-product-sets.html) |
| [Manage product sets](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-sets/managing-product-sets.html) |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Product Sets feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-sets-feature-walkthrough/product-sets-feature-walkthrough.html) for developers.

{% endinfo_block %}
