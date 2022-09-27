---
title: Create abstract product list content items
description: Learn how to create abstract product list content items in the Back Office.
last_updated: Oct 22, 2022
template: back-office-user-guide-template
---

This topic describes how to create abstract product list content items in the Back Office.

## Prerequisites

Make sure to review [reference information](#create-abstract-product-list-content-items) before you start, or look up the necessary information as you go through the process.

## Create an abstract product list content item

1. Go to **Content&nbsp;<span aria-label="and then">></span> Content Items**.
2. On the **Overview of Content Items** page, click **Add Content Item&nbsp;<span aria-label="and then">></span> Abstract Product List**.
3. On the **Create Content Item: Abstract Product List** page, enter **NAME**
4. Optional: Enter a **DESCRIPTION**.
5. In the **Add more products** section, click **Add to list** next to the products you want to add to the list.
    The products appear in the **Default** tab.
6. Optional: To reorder the added products, click **Move Up** or **Move Down** next to the needed products.  
7. Optional: Repeat steps 5-6 in one or more locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific products overwrite the default products when the Abstract Product List is rendered on a Storefront page with the [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html) selected.
* If no products are selected for a locale, the default products are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

8. Click **Save**.
  This opens the **Overview of Content Items** page with a success message displayed. The created content item is displayed in the list.

**Tips and tricks**

To clear product selection on a tab, click **Clear locale**.

## Reference information: Create an abstract product list content item

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Name for an abstract product list content item. |
| DESCRIPTION | Descriptive information on what an Abstract Product List is used for. |


### Reference information: Abstract product list content item widget

The widget allows you to add an Abstract Product List content item to any placeholders of a page or block.

**Use case example:** The widget can be used to display a list of products for a specific promoting campaign, for example, the Best Selling items, or a list of frequently used products on a page.

You can view how it looks like on the store website:

* **B2C**
Template used: Slider with product category info
![Abstract product list content item widget B2C](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+types%3A+Reference+Information/abstract-product-list-yves-b2c.png)

* **B2B**
Template used: Product Slider for store/landing pages
![Abstract product list content item widget B2B](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+types%3A+Reference+Information/apl-template-b2b.png)

### Reference information: Abstract product list content item widget templates

The following templates are used to set up an Abstract Product List content item widget:

#### Bottom title

Displays a product name under the product image. Each product contains an image, a Product Group (if it exists), a name, and a price. Clicking any of the product elements will redirect your shop visitors to the product detail page.

{% info_block warningBox "For White Label:" %}

There is a clickable **View** button under the product price.

{% endinfo_block %}

See how the **Bottom title** template looks like on Yves:

* **White Label**
![APL bottom title](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-bottom-title-white-label.png)

* **B2B Shop**
![APL bottom title B2B](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-bottom-title-b2b.png)

* **B2C Shop**
![APL bottom title B2C](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-bottom-title-b2c.png)

#### Top title

Displays a product name above the product image. Each product contains an image, a Product Group (if it exists), a name, and a price. Clicking any of the product elements will redirect your shop visitors to the product detail page.

{% info_block warningBox "For White Label:" %}

There is a clickable **View** button under the product image.

{% endinfo_block %}

See how the **Top Title** template looks like on Yves:

* **White Label**
![APL top title white label](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-top-title-white-label.png)

* **B2B Shop**
![APL top title B2B](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-top-title-b2b.png)

* **B2C Shop**
![APL top title B2C](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-top-title-b2c.png)

#### Product category info    

Displays products where each of them contains an image, a product name, a Product Group (if it exists) and a price. Clicking any of the product elements will redirect your shop visitors to the product detail page.

See how the **Product category info** template looks like on Yves:

* **B2C Shop**
![APL product category info](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-product-category-info-b2c.gif)


#### Product category info and button

Displays products where each of them contains an image, a product name, a Product Group (if it exists), a price, and a clickable **Add to Cart** button at the bottom. Clicking this button will add a product to cart. Clicking any of the product elements will redirect your shop visitors to the product detail page.

See how the **Product category info and button** template looks like on Yves:

* **B2C Shop**
![Product category info and button](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-product-category-button-b2c-new.png)

#### Product category info no product groups

Displays abstract products without their Product Groups. Each product contains a product name, a price, and an image. Clicking any of the product elements will redirect your shop visitors to the product detail page.

See how the **Product category info no Product Groups** template looks like on Yves:

* **B2C Shop**
![APL no product group](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-product-category-info-no-groups-b2c-new.png)


#### Product slider for store/landing pages

Displays products as a slider on a store or a landing page. Clicking any of the product elements will redirect your shop visitors to the product detail page.

See how the **Product Slider for store/landing pages** template looks like on Yves:

* **B2B Shop**
![APL Product slider for store landing pages](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/apl-slider-b2b.png)
