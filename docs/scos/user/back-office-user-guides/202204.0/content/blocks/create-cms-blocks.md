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
  - /docs/scos/user/back-office-user-guides/202204.0/content/blocks/creating-cms-blocks.html
related:
  - title: Managing CMS Blocks
    link: docs/scos/user/back-office-user-guides/page.version/content/blocks/managing-cms-blocks.html
---

This topic describes how to create CMS blocks in the Back Office.

{% info_block infoBox "Info" %}

If you want to create a CMS block for [email](/docs/scos/user/features/{{page.version}}/cms-feature-overview/email-as-a-cms-block-overview.html), see [Creating an email CMS block](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/managing-content-of-emails-via-cms-blocks.html#creating-an-email-cms-block).

{% endinfo_block %}

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

## Reference information: Creating a CMS block

| ATTRIBUTE  | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| STORE RELATION |  Stores to displayed the block in. | This option does not affect email CMS blocks, so choose any. |
| TEMPLATE | Defines the layout of the CMS Block. A developer can [create more templates](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-cms-templates.html#cms-block-template). | Defines the layout of the Email CMS Block. A developer can [create more templates](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-cms-templates.html#cms-block-template). |
| NAME | You will use this name when [assigning the block to a slot in a page](/docs/scos/user/back-office-user-guides/{{page.version}}/content/slots/managing-slots.html#assigning-cms-blocks-to-slots). | The name should correspond to the name defined in the email template the block will be assigned to. |
| VALID FROM and VALID TO | Dates that inclusively specify when the block is to be visible on the Storefront. | Irrelevant. |
| PRODUCTS | Products to assign the block to. The block will be displayed on the products' details pages. | Irrelevant. |

## Next steps

<br>After a new block has been created, you can add the content if needed.

To learn more about editing a CMS block, see the [Editing CMS blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/managing-cms-blocks.html#editing-blocks).
