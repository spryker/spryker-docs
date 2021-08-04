---
title: Product Groups feature overview
originalLink: https://documentation.spryker.com/2021080/docs/product-groups-feature-overview
redirect_from:
  - /2021080/docs/product-groups-feature-overview
  - /2021080/docs/en/product-groups-feature-overview
---

The *Product Groups* feature allows product catalog managers to group products by attributes, like color or size. A typical use case is combining the same product in different colors into a product group (not to be confused with [product variant](https://documentation.spryker.com/docs/product-abstraction)). The feature changes the way shop users interact with products by improving accessibility and navigation. 

## Product groups on the Storefront

{% info_block warningBox "Examplary content" %}

By default, there is no way to display product groups on Storefront. This section describes an examplary implementation which you can add to your project. See [HowTo - Display Product Groups by Color on Storefront](https://documentation.spryker.com/docs/howto-display-product-groups-by-color-on-the-storefront) for more details.

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
 
## Product groups in the Back Office

In the Back Office, a product catalog manager can view what product group an abstract product belongs to. See [Viewing a Product](https://documentation.spryker.com/docs/managing-products#viewing-a-product) to learn more.   

Also, they can insert product groups into CMS pages via content widgets in the [WYSIWYG editor](https://documentation.spryker.com/docs/wysiwyg-editor).

## Creating product groups 

Currently, only a developer can create product groups by [importing them](https://documentation.spryker.com/docs/file-details-product-groupcsv) or modifying the database. Only abstract products can be added to product groups.



 
## Current constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future:

*     There is no user interface to manage product groups in the Back Office.
*     Products can only be grouped by the color attribute.

## Video tutorial

Check out this video tutorial on product groups:
<iframe src="https://spryker.wistia.com/medias/r5l2kit2c1" title="Product Group" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="720" height="480"></iframe>


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
   <li><a href="https://documentation.spryker.com/docs/product-groups-feature-integration" class="mr-link">Integrate the Product Groups feature into your project</a></li> 
   <li><a href="https://documentation.spryker.com/docs/file-details-product-groupcsv" class="mr-link">Import product groups</a></li> 
   <li><a href="https://documentation.spryker.com/docs/howto-display-product-groups-by-color-on-the-storefront" class="mr-link">Display product groups by color on the Storefront</a></li> 
            </ul>
        </div>
 <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                                <li><a href="https://documentation.spryker.com/docs/managing-products#viewing-a-product" class="mr-link">Check what product group a product belongs to by viewing a product</a></li>
            </ul>
        </div>
           </div>  
     </div>
     

