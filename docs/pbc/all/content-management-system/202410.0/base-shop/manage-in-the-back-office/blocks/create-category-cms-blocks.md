---
title: Create category CMS blocks
description: Learn how to create and implement category CMS blocks in the Spryker Cloud Commerce OS Back Office.
last_updated: June 2, 2022
template: back-office-user-guide-template
related:
  - title: Edit CMS blocks
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/blocks/edit-cms-blocks.html
redirect_from:
- /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/blocks/create-category-cms-blocks.html
---

This topic describes how to create category CMS blocks in the Back Office.

## Prerequisites

* [Install category CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-category-cms-blocks.html).

* Create the categories whose pages you want to show the block on. For instructions, see [Create categories](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/categories/create-categories.html).

* Create the abstract products you want to show in the block. For instructions, see [Create abstract products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html).

* Review the [reference information](#reference-information-create-category-cms-blocks) before you start, or look up the necessary information as you go through the process.

## Create a category CMS block

1. Go to **Content&nbsp;<span aria-label="and then">></span> Blocks**.
2. On the **Overview of CMS Blocks** page, click  **Create block**.
    This opens the **Create new CMS Block** page.
3. For **STORE RELATION**, select the stores you want the CMS block to be displayed in.
4. For **TEMPLATE**, select **Category Block**.
5. Enter a **NAME**.
6. Optional: Select a **VALID FROM** date.
7. Optional: Select a **VALID TO** date.  
8. Optional: For **CATEGORIES: TOP**, enter and select one or more categories.
9. Optional: For **CATEGORIES: MIDDLE**, enter and select one or more categories.
10. Optional: For **CATEGORIES: BOTTOM**, enter and select one or more categories.
11. Optional: Enter and select one or more **PRODUCTS**.
12. Click **Save**.
    This opens the **Edit CMS Block Glossary** page with a success message displayed.
10. Optional: For **CONTENT**, add content to the block per placeholder per locale.
11. Click **Save**.
    This opens the **Edit Block Glossary** page with a success message displayed.

## Reference information: Create category CMS blocks

| ATTRIBUTE  | DESCRIPTION |
| --- | --- |
| STORE RELATION |  Stores to display the block in. |
| TEMPLATE | Defines the layout of the CMS Block. A developer can [create more templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html#cms-block-template). |
| NAME | You will use this name when [assigning the block to a slot in a page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-slots.html#assigning-cms-blocks-to-slots). |
| VALID FROM and VALID TO | Dates that inclusively specify when the block is to be visible on the Storefront. |
| CATEGORIES: TOP | The block will be displayed at the top of the pages of these categories. |
| CATEGORIES: MIDDLE | The block will be displayed in the middle of the pages of these categories. |
| CATEGORIES: BOTTOM | The block will be displayed at the bottom of the pages of these categories. |
| PRODUCTS | Products to display in the block. |


## Reference information: Add content to the placeholders of a CMS block

{% include scos/user/back-office-user-guides/content/blocks/reference-information-add-content-to-the-placeholders-of-a-cms-block.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/content/blocks/reference-information-add-content-to-the-placeholders-of-a-cms-block.md -->


## Next steps

[Edit CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/edit-cms-blocks.html)  
