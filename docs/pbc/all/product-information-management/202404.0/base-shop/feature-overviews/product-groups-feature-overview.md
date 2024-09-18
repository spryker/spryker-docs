---
title: Product Groups feature overview
description: Product Groups feature lets product catalog managers group products by attributes.
last_updated: Jul 26, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/product-groups-feature-overview
originalArticleId: 7daa66de-975d-443b-935e-3819c2163c51
redirect_from:
  - /2021080/docs/product-groups-feature-overview
  - /2021080/docs/en/product-groups-feature-overview
  - /docs/product-groups-feature-overview
  - /docs/en/product-groups-feature-overview
  - /docs/scos/user/features/202200.0/product-groups-feature-overview.html
  - /docs/product-group
  - /docs/scos/dev/feature-walkthroughs/202200.0/product-groups-feature-walkthrough.html  
  - /docs/scos/dev/feature-walkthroughs/202311.0/product-groups-feature-walkthrough.html  
  - /docs/scos/user/features/202311.0/product-groups-feature-overview.html
  - /docs/pbc/all/product-information-management/202311.0/feature-overviews/product-groups-feature-overview.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/feature-overviews/product-groups-feature-overview.html
---

The *Product Groups* feature lets product catalog managers group products by attributes, like color or size. A typical use case is combining the same product in different colors into a product group (not to be confused with [product variant](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html)). The feature changes the way shop users interact with products by improving accessibility and navigation.

## Product Groups on the Storefront

{% info_block warningBox "Examplary content" %}

By default, there is no way to display product groups on Storefront. This section describes an exemplary implementation that you can add to your project. For more details, see [HowTo: Display product groups by color on Storefront](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/tutorials-and-howtos/howto-display-product-groups-by-color-on-the-storefront.html).

{% endinfo_block %}


On the Storefront, the product group is not displayed as a group. Instead, the behavior of all the UI elements related to the products in the group changes. It affects the product abstract card and **Product Details** page.

Product abstract card:

1. Holding the pointer over the product abstract card opens a dialog with the colors of all the products included into the group.
2. Holding the pointer over or clicking a color circle changes the abstract product image, title, rating, label, and the price.
3. Having held the pointer over the needed color, a shop user clicks on the product abstract card to be redirected to the **Product Details** page of the corresponding product.

![Product group - product abstract card](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/feature-overviews/product-groups-feature-overview.md/product-group-product-abstract-card.mp4)


**Product Details** page:

* Holding the pointer over a color circle changes the abstract product image.
* Once you stop Holding the pointer over a color circle, the image changes back to the image of the product you are viewing.
* Clicking on a color circle redirects the shop user to the page of the corresponding abstract product.


![Product group - product details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/feature-overviews/product-groups-feature-overview.md/product-group-product-details-page.mp4)

## Product Groups in the Back Office

In the Back Office, a product catalog manager can view what product group an abstract product belongs to.

Also, they can insert product groups into CMS pages using content widgets in the [WYSIWYG editor](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/content-items-feature-overview.html#content-item-widget).

## Creating product groups

Only a developer can create product groups by [importing them](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-group.csv.html) or modifying the database. Only abstract products can be added to product groups.


## Current constraints

The feature has the following functional constraints which are going to be resolved in the future:

* There is no user interface to manage product groups in the Back Office.
* Products can only be grouped by the color attribute.

## Video tutorial

Check out this video tutorial on product groups:

{% wistia r5l2kit2c1 720 480 %}


## Related Developer documents

|INSTALLATION GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS |
|---------|---------|---------|
| [Product Groups feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-groups-feature.html) | [File details: product_group.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-group.csv.html)  | [Display product groups by color on the Storefront](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/tutorials-and-howtos/howto-display-product-groups-by-color-on-the-storefront.html)  |
