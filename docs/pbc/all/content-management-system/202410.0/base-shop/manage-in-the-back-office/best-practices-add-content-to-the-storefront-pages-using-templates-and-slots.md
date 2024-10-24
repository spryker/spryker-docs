---
title: "Best practices: Add content to the Storefront pages using templates and slots"
description: Templates with slots allows managing all the Storefront content in the Back Office.
last_updated: Jul 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/adding-content-to-storefront-pages-using-templates-slots-best-practices
originalArticleId: 48b5c164-eb28-4c1a-b33c-66d613203bfa
redirect_from:
  - /2021080/docs/adding-content-to-storefront-pages-using-templates-slots-best-practices
  - /2021080/docs/en/adding-content-to-storefront-pages-using-templates-slots-best-practices
  - /docs/adding-content-to-storefront-pages-using-templates-slots-best-practices
  - /docs/en/adding-content-to-storefront-pages-using-templates-slots-best-practices
  - /docs/scos/user/back-office-user-guides/202311.0/content/adding-content-to-storefront-pages-using-templates-and-slots-best-practices.html
  - /docs/pbc/all/content-management-system/202311.0/manage-in-the-back-office/best-practices-add-content-to-the-storefront-pages-using-templates-and-slots.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/best-practices-add-content-to-the-storefront-pages-using-templates-and-slots.html
related:
  - title: Managing Slots
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/manage-slots.html
  - title: Templates & Slots feature overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/templates-and-slots-overview.html
---

This topic describes how to add content to Storefront pages using templates with slots. To start working with templates with slots, go to **Content Management&nbsp;<span aria-label="and then">></span> Slots**.

Let’s say you have *Sticky Notes* and *Writing Materials* categories, and you want to cross-promote them. You set the following tasks:

* All the products belonging to the *Sticky Notes* category should display a content block with a link to the *Writing Materials* category and a content block with featured products.
* All the products belonging to the *Writing Materials* category should display a content block with a link to the *Writing Materials* category and a content block with top sellers.

To do that, you need to create content items, insert them into CMS blocks, assign CMS blocks to slots and select the pages the CMS blocks will be displayed on.

{% info_block infoBox "Examplary content" %}

All the content used in this guide is shipped by default in our [B2B Demo Shop](/docs/about/all/b2b-suite.html) and [B2C Demo Shop](/docs/about/all/b2c-suite.html).

{% endinfo_block %}

Follow the steps below to add the content.

## Create content items

[Content item](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html) is the smallest content unit in Spryker. By creating a content item, you preserve a small content piece that can be used later in multiple pages.

Create the following content items:

* Abstract product list of top sellers—*Best Selling Products*
* Abstract product list of featured products—*Featured Products*

See [Creating content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-banner-content-items.html) for more details.

If the content item types shipped by default are not sufficient for your project needs, new ones can be created by a developer. See [HowTo - Create a Content Item](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-a-custom-content-item.html) for more details.

## Create CMS blocks

[CMS block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html) serves as the actual content that you insert into Storefront pages.

Follow the steps to create the CMS blocks with the needed content:

1. Create the following CMS blocks:
    * Top selling products reference - *Homepage Top sellers Products*
    * Featured products reference - *Homepage Featured Products*
    * Writing materials reference - *Category Banner-2*
    * Sticky notes reference - *Category Banner-3*

See [Create CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html) for more details.

{% info_block warningBox "Activation" %}

Make sure to activate the CMS blocks. Only active CMS blocks are rendered on Storefront pages.

{% endinfo_block %}

2. Insert the *Best Selling Products* content item into the *Homepage Top sellers Products* CMS block, and apply the *Product Slider for store/landing pages* template.
3. Insert the *Featured Products* content item into the *Homepage Featured Products* CMS block and apply the Product Slider for store/landing pages template.
4. Configure the *Category Banner-2* CMS block as follows:
    * **Title**—“Writing Materials”.
    * **Content**—“Stock up on the perfect pens, pencils, and markers for every member of your team”.
    * **Link**—`/en/stationery/writing-materials`.
    * **ImageURL**—`/assets/DE/default/images/category-banner-image-2@2x.jpg`.
5. Configure the *Category Banner-3* CMS block as follows:
    * Title—“Post-Its”.
    * Content—“Organize and prioritize yourself or your team using our great selection of Post-Its”.
    * Link—`/en/stationery/paper/sticky-notes`.
    * ImageURL—`/assets/DE/default/images/category-banner-image-3@2x.jpg`.

See [Editing placeholders](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/edit-placeholders-in-cms-blocks.html) to learn about inserting content into CMS blocks.


## Select a template with slots

[Template with slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html) defines the layout of slots on the Storefront pages you add the CMS blocks to.

Follow the steps to select a template with slots:

1. Go to **Content Management&nbsp;<span aria-label="and then">></span> Slots**.
2. In **List of Templates**, select the *Product* template with slots.
    This template with slots is assigned to all the product pages. By selecting it, you select to work with all the product pages at once.

If the templates with slots shipped by default are not sufficient for your project needs, new ones can be created by a developer. See [Template with Slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html#template-with-slots) for more details.

## Select a slot

[Slot](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html#slot) defines the Storefront page space you add the CMS blocks to.

In the **List of Slots for "Product" Template**, select the *Bottom* slot. This slot is located at the bottom of product pages. By selecting it, you select to work with this Storefront page space in all the product pages.

If the slots shipped by default are not sufficient for your project needs, new ones can be created by a developer. See [Correlation](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html#correlation) for more details.

## Assign CMS blocks

By assigning the CMS blocks to the *Bottom* slot, you add their content to this page space on all the product pages.

In the drop-down menu of the **List of Blocks for "Bottom" Slot**, do the following to assign the CMS blocks to the slot:

1. Select one of the created CMS blocks.

{% info_block infoBox "Filter the CMS block list" %}

In the drop-down menu, start typing a CMS block name to filter the list.

{% endinfo_block %}

2. Click **+Add**.
3. Repeat the previous steps for all the created CMS blocks to assign them to the slot.
4. Click **Save**.

## Select pages

By selecting pages, you define on which particular pages the content of each assigned CMS block is displayed.

For the *Category Banner-2* and *Homepage Featured Products* CMS blocks to be displayed only on the *Sticky Notes* product pages, follow the steps below:

1. In **List of Blocks for "Bottom" Slot**, select the *Category Banner-2* CMS block.
2. Select the **Specific Product Pages** radio button.
3. In **Products pages per Category**, select the *Sticky Notes* category.

{% info_block infoBox "Filter the category list" %}

In the drop-down menu, start typing a category name to filter the list.

{% endinfo_block %}

4. Repeat the previous steps for the *Homepage Featured Products* CMS block.

For the *Category Banner-2* and *Homepage Top sellers Products* CMS blocks to be displayed only on the *Writing Materials* product pages, follow the steps below:
1. In the *List of Blocks for "Bottom" Slot*, select the **Category Banner-2** CMS block.
2. Select the **Specific Product Pages** radio button.
3. In **Products pages per Category**, select the *Writing Materials* category.
4. Repeat the previous steps for the *Homepage Top sellers Products* CMS block.
5. Click **Save**.

## Define the order of CMS blocks

By defining the vertical order of CMS blocks in the **List of Blocks for "Bottom" Slot**, you define the actual vertical order the CMS blocks displayed on the corresponding Storefront pages.

When you add a CMS block to a slot, it always goes on top of the list. You can change the position of the CMS block by clicking **Move up** and **Move down** next to it. These actions swap the CMS block with the one above or below it correspondingly.

When defining the order of CMS blocks in a slot that is located in many pages, take into account that each CMS block is displayed in different pages. So, when moving a CMS block, its position on the selected pages changes only in relation to the CMS blocks that are also displayed there. The position of the other CMS blocks are irrelevant.

In our case, with all the CMS blocks assigned to a single slot, the correct order is as follows:
* The *Category Banner-2* and *Category Banner-3* CMS blocks are on top.
* *Homepage Top sellers Products* and *Homepage Featured Products* CMS blocks are below them.


| WRITING MATERIALS PRODUCT PAGES| STICKY NOTES PRODUCT PAGES|
| --- | --- |
| *Homepage Featured Products* | *Homepage Top sellers Products* |
| *Category Banner-3* | *Category Banner-2* |

To achieve that, make sure to fulfill the following:

* For the *Writing Materials* product pages, the *Homepage Featured products* CMS block is located above the *Category Banner-3* CMS block in the **List of Blocks for "Bottom" Slot**. Other CMS blocks can be disregarded as they are not displayed on the *Writing Materials* product pages.  Any of the following order variants will work:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Slots/Adding+Content+to+Storefront+Pages+Using+Templates+%26+Slots/cms-block-order-in-slot-1.png)

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Slots/Adding+Content+to+Storefront+Pages+Using+Templates+%26+Slots/cms-block-order-in-slot-2.png)

* For the *Sticky Notes* category pages, the *Homepage Top sellers* CMS block is located above the *Category Banner-2* CMS block in the **List of Blocks for "Bottom" Slot**. Other CMS blocks can be disregarded as they are not displayed in the *Sticky Notes* product pages.  Any of the order variants above will work.

{% info_block warningBox "Saving changes" %}

Make sure to save the changes by clicking **Save**.

{% endinfo_block %}
