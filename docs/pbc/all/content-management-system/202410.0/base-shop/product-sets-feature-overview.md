---
title: Product Sets feature overview
description: An overview of the Spryker product sets feature, allowing you to create a set of products to showcase to your customers.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/product-sets-feature-overview
originalArticleId: 7bc42ccb-f76c-400f-9372-251104ce0b77
redirect_from:
  - /docs/scos/user/features/202108.0/product-sets-feature-overview.html
  - /docs/scos/user/features/202200.0/product-sets-feature-overview.html
  - /docs/scos/user/features/202311.0/product-sets-feature-overview.html
  - /docs/pbc/all/content-management-system/202311.0/product-sets-feature-overview.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/product-sets-feature-overview.html

---

The *Product Sets* feature lets you create and sell collections of products. For example, you can create a stationary workspace set, a set of clothing or accessories, or furniture for a specific room. The "Shop-the-Look" function is a common example of a product set, where you can build a collection of items based on relations or recommendations.

![product-set-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Sets/product-set-on-the-storefront.png)

When browsing a product set, a Storefront user can select variants per product in a set, add an individual or all products from the set to cart.

![product-set-actions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Sets/product-set-actions.png)

A Back Office user can define the following:
- The order of products in a set displayed on the Storefront.
- The order of products sets displayed on the Storefront. It's relevant if you have multiple product sets on the same page.
- The unique product set URL.

A Back Office user can add product sets to any page by [creating a product set content item](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-banner-content-items.html) and [adding it to CMS pages and blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/add-content-items-to-cms-blocks.html).


For more details about product sets, watch the video:

{% wistia 9co7uw35a9 720 480 %}

### Current constraints

The feature has the following functional constraints which are going to be resolved in the future:
- Product sets are shared across all the stores of a project.
- You cannot restrict availability of a product set to a store.


## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of the Product Sets feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/product-sets-feature-overview.html) |
| [Create product sets](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/product-sets/create-product-sets.html) |
| [Manage product sets](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/product-sets/edit-product-sets.html) |

## Related Developer documents

|INSTALLATION GUIDES | DATA IMPORT |
|---------|---------|
| [Product Sets feature integration](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-sets-feature.html)  | [File details: product_set.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-set.csv.html) |
