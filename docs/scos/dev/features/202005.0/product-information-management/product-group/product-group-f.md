---
title: Product Group Feature Overview
originalLink: https://documentation.spryker.com/v5/docs/product-group-feature-overview
redirect_from:
  - /v5/docs/product-group-feature-overview
  - /v5/docs/en/product-group-feature-overview
---

The Product Group feature allows product catalog managers to group products by attributes, like color or size. A typical use case is combining the same product in different colors into a product group (not to be confused with [product variant](https://documentation.spryker.com/docs/en/product-abstraction)). The feature changes the way shop users interact with products by improving accessibility and navigation. 

## Product Group on the Storefront

{% info_block warningBox "Examplary content" %}

By default, there is no way to display product groups on Storefront. This section describes an examplary implementation which you can add to your project. See [HowTo - Display Product Groups by Color on Storefront](https://documentation.spryker.com/docs/en/howto-display-product-groups-by-color-on-the-storefront) for more details.

{% endinfo_block %}


On the Storefront, the product group is not displayed as a group. Instead, the behavior of all the UI elements related to the products in the group changes. It affects product abstract card and *Product details* page.

Product abstract card:

1. Hovering over the product abstract card opens a pop-up menu with the colors of all the products included into the group. 
2. Hovering over or clicking a color circle changes the abstract product image, title, rating, label, and the price. 
3. Having hovered over the desired color, a shop user clicks on the product abstract card to be redirected to the *Product details* page of the corresponding product.

![Product group - product abstract card](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Groups/Product+Groups+Feature+Overview/product-group-product-abstract-card.gif){height="" width=""}


*Product details* page:

*     Hovering over a color circle changes the abstract product image. 
*     Once you stop hovering over a color circle, the image changes back to the image of the product you are viewing. 
*     Clicking on a color circle redirects the shop user to the page of the corresponding abstract product.


![Product group - product details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Groups/Product+Groups+Feature+Overview/product-group-product-details-page.gif){height="" width=""} 
 
## Product Group in the Back Office

In the Back Office, a product catalog manager can view what product group an abstract product belongs to. See [Viewing a Product](https://documentation.spryker.com/docs/en/managing-products#viewing-a-product) to learn more.   

Also, they can insert product groups into CMS pages via content widgets in the [WYSIWYG editor](https://documentation.spryker.com/docs/en/wysiwyg-editor).

## Creating Product Groups 

Currently, only a developer can create product groups by <!-- add link to new import page --> importing them or modifying the database. Only abstract products can be added to product groups.

 
## Current Constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future:

*     There is no user interface to manage product groups in the Back Office.
*     Products can only be grouped by the color attribute.
