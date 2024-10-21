---
title: Create CMS blocks
description: Learn how to create CMS blocks in the Back Office.
last_updated: May 11, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-cms-block
originalArticleId: 6ff82722-c1ed-4fd5-b57e-402c7af92a70
redirect_from:
  - /2021080/docs/creating-cms-block
  - /2021080/docs/en/creating-cms-block
  - /docs/creating-cms-block
  - /docs/en/creating-cms-block
  - /docs/scos/user/back-office-user-guides/202200.0/content/blocks/creating-cms-blocks.html
  - /docs/scos/user/back-office-user-guides/202311.0/content/blocks/creating-cms-blocks.html
  - /docs/scos/user/back-office-user-guides/202311.0/content/blocks/view-cms-blocks.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html
related:
  - title: Edit CMS blocks
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/blocks/edit-cms-blocks.html
  - title: CMS blocks overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-blocks-overview.html
---

This topic describes how to create CMS blocks in the Back Office.

## Prerequisites

Review the [reference information](#reference-information-create-a-cms-block) before you start, or look up the necessary information as you go through the process.

## Create a CMS block

1. Go to **Content&nbsp;<span aria-label="and then">></span> Blocks**.
2. On the **Overview of CMS Blocks** page, click  **Create block**.
    This opens the **Create new CMS Block** page.
3. For **STORE RELATION**, select the stores you want to the CMS block to be displayed in.
4. Select a **TEMPLATE**.
5. Enter a **NAME**.
6. Optional: Select a **VALID FROM** date.
7. Optional: Select a **VALID TO** date.
8. Enter and select **PRODUCTS**.
9. Click **Save**.
    This opens the **Edit CMS Block Glossary** page with a success message displayed.
10. Optional: For **CONTENT**, add content to the block per placeholder per locale.
11. Click **Save**.
    This refreshes the page with a success message displayed.


## Reference information: Create a CMS block

| ATTRIBUTE  | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| STORE RELATION |  Stores to displayed the block in. | This option does not affect email CMS blocks, so choose any. |
| TEMPLATE | Defines the layout of the CMS Block. A developer can [create more templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html#cms-block-template). | Defines the layout of the Email CMS Block. A developer can [create more templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html#cms-block-template). |
| NAME | You will use this name when [assigning the block to a slot in a page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-slots.html#assigning-cms-blocks-to-slots). | The name should correspond to the name defined in the email template the block will be assigned to. |
| VALID FROM and VALID TO | Dates that inclusively specify when the block is to be visible on the Storefront. | Irrelevant. |
| PRODUCTS | Products to assign the block to. The block will be displayed on the products' details pages. | Irrelevant. |


## Reference information: Add content to the placeholders of a CMS block

{% include scos/user/back-office-user-guides/content/blocks/reference-information-add-content-to-the-placeholders-of-a-cms-block.md %} <!-- To edit, see /_includes/scos/user/back-office-user-guides/content/blocks/reference-information-add-content-to-the-placeholders-of-a-cms-block.md -->


## Next steps

[Edit CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/edit-cms-blocks.html)  
