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
  - /docs/scos/user/back-office-user-guides/202204.0/content/blocks/managing-cms-blocks.html
related:
  - title: CMS Block
    link: docs/scos/user/features/page.version/cms-feature-overview/cms-blocks-overview.html
---

This document describes how to create CMS blocks in the Back Office.

{% info_block infoBox "Info" %}

If you want to manage a CMS block for [email](/docs/scos/user/features/{{page.version}}/cms-feature-overview/email-as-a-cms-block-overview.html), see [Managing content of emails via CMS blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/managing-content-of-emails-via-cms-blocks.html).

{% endinfo_block %}

## Prerequisites



Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.



## Edit a CMS block

1. Go to **Content Management&nbsp;<span aria-label="and then">></span> Blocks**.
    This opens the **Blocks** page.
2. Next to the block you want to edit, click **Edit Block**.
This opens the **Edit CMS Block** page.
3. For **STORE RELATION**, do the following:
    * Clear the checkboxes next to the stores you want to stop displaying the block in.
    * Select the stores you want to start displaying the block in.
4. Select a **TEMPLATE**.
5. Enter a **NAME**.
6. Select a **VALID FROM** date.
7. Select a **VALID TO** date.  
8. For **PRODUCTS**, do the following:
    * Next to the products you want to deassign, click **x**.
    * Enter and select products you want to assign.
9. Click **Save**.
    This refreshes the page with a success message displayed.

### Reference information: Edit a CMS block

The following table describes the attributes on the *Edit CMS Block: [Block ID]* page.

|ATTRIBUTE  | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| Store relation |  Store locale for which the block is available. | Irrelevant. |
| Template | Defines the layout of the CMS Block. | Defines the layout of the Email CMS Block.
| Name | Name of the block. | Name of the block. Should correspond to the name defined in the email template the block is assigned to. |
| Valid from and Valid to | Dates that specify how long your active block is visible on the Storefront. | Irrelevant. |
| Categories: top | Block or blocks assigned to a category page.  The block is displayed at the top of the page. | Irrelevant. |
| Categories: middle |  Block or blocks assigned to a category page. The block is displayed in the middle of the page. | Irrelevant. |
| Categories: bottom | Block or blocks assigned to a category page. The block is displayed at the bottom of the page. | Irrelevant. |
| Products | Block or blocks assigned to a product details page. | Irrelevant. |
