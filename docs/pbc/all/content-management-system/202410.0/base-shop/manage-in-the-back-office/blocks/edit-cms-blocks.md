---
title: Edit CMS blocks
description: The guide provides procedures on how to view, update, activate and deactivate CMS blocks in the editor from the Back Office.
last_updated: May 12, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-cms-blocks
originalArticleId: 797e2d78-86eb-454d-afa1-481ee80ae7af
redirect_from:
  - /2021080/docs/managing-cms-blocks
  - /2021080/docs/en/managing-cms-blocks
  - /docs/managing-cms-blocks
  - /docs/en/managing-cms-blocks
  - /docs/scos/user/back-office-user-guides/202311.0/content/blocks/managing-cms-blocks.html
  - /docs/scos/user/back-office-user-guides/202200.0/content/blocks/managing-cms-blocks.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/blocks/edit-cms-blocks.html
  - /docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/blocks/edit-cms-blocks.html
related:
  - title: CMS blocks overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-blocks-overview.html
---

This document describes how to edit CMS blocks in the Back Office.

## Prerequisites

Review the [reference information](#reference-information-edit-a-cms-block) before you start, or look up the necessary information as you go through the process.

## Edit a CMS block

1. Go to **Content Management&nbsp;<span aria-label="and then">></span> Blocks**.
    This opens the **Blocks** page.
2. Next to the block you want to edit, click **Edit Block**.
This opens the **Edit CMS Block** page.
3. For **STORE RELATION**, do the following:
    - Clear the checkboxes next to the stores you want to stop displaying the block in.
    - Select the stores you want to start displaying the block in.
4. Select a **TEMPLATE**.
5. Enter a **NAME**.
6. Select a **VALID FROM** date.
7. Select a **VALID TO** date.  
8. For **PRODUCTS**, do the following:
    - Next to the products you want to deassign, click **x**.
    - Enter and select products you want to assign.
9. Click **Save**.
    This refreshes the page with a success message displayed.
10. Email blocks: If you've updated the **NAME**, pass it to your development team to update the name of the respective [email template](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/email-as-a-cms-block-overview.html).

## Reference information: Edit a CMS block

| ATTRIBUTE  | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| STORE RELATION | Stores in which the block is displayed. | Irrelevant. |
| TEMPLATE | Defines the layout of the block. A developer can [create more templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html#cms-block-template). | Defines the layout of the email block. A developer can [create more templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html#cms-block-template). |
| NAME | The name is used when [assigning the block to a slot in a page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-slots.html#assigning-cms-blocks-to-slots). | The name should correspond to the name defined in the email template the block will be assigned to. |
| VALID FROM and VALID TO | Dates that inclusively specify when the block is visible on the Storefront. | Irrelevant. |
| PRODUCTS | Products to which the block is assigned. The block is displayed on the products' details pages. | Irrelevant. |
