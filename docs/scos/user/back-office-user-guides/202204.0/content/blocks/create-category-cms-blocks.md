---
title: Create category CMS blocks
description: Learn how to create category CMS blocks in the Back Office.
last_updated: June 2, 2022
template: back-office-user-guide-template
related:
  - title: Edit CMS blocks
    link: docs/scos/user/back-office-user-guides/page.version/content/blocks/edit-cms-blocks.html
---

This topic describes how to create category CMS blocks in the Back Office.

## Prerequisites

* [Create categories](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/creating-categories.html)

* [Create products]()

* Review the [reference information](#reference-information-create-category-cms-blocks) before you start, or look up the necessary information as you go through the process.

## Create a CMS block

1. Go to **Content&nbsp;<span aria-label="and then">></span> Blocks**.
2. On the **Overview of CMS Blocks** page, click  **Create block**.
    This opens the **Create new CMS Block** page.
3. For **STORE RELATION**, select the stores you want to the CMS block to be displayed in.
4. Select a **TEMPLATE**.
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
    This refreshes the page with a success message displayed.


## Reference information: Create category CMS blocks

| ATTRIBUTE  | DESCRIPTION: REGULAR CMS BLOCK | DESCRIPTION: EMAIL CMS BLOCK |
| --- | --- | --- |
| STORE RELATION |  Stores to display the block in. | This option does not affect email CMS blocks, so choose any. |
| TEMPLATE | Defines the layout of the CMS Block. A developer can [create more templates](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-cms-templates.html#cms-block-template). | Defines the layout of the Email CMS Block. A developer can [create more templates](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-cms-templates.html#cms-block-template). |
| NAME | You will use this name when [assigning the block to a slot in a page](/docs/scos/user/back-office-user-guides/{{page.version}}/content/slots/managing-slots.html#assigning-cms-blocks-to-slots). | The name should correspond to the name defined in the email template the block will be assigned to. |
| VALID FROM and VALID TO | Dates that inclusively specify when the block is to be visible on the Storefront. | Irrelevant. |
| PRODUCTS | Products to assign the block to. The block will be displayed on the products' details pages. | Irrelevant. |


## Reference information: Add content to the placeholders of a CMS block

The only field for editing placeholders is **CONTENT**. Depending on the template of a block, the block can have different placeholders. On the **Edit CMS Block Glossary** page, placeholders are represented by tabs. So, using the editing tools in the **CONTENT** field, you can add content per placeholder per locale. After adding the content, click **Save**. This will refresh the page with a success message displayed.

Apart from the usual editing tools, you can add content items to blocks' placeholders. To add a content item in the editor, do the following:

1. In the **CONTENT** field of the needed placeholder, place your cursor where you want to add the content item to.

2. From the **Content Item** menu button, select the content item you want to add.
    The **Insert a Content Item** window opens.
![Insert content item for blocks](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/insert-content-item-widget-block.png)

3. In the **SELECT A CONTENT ITEM** pane, select a content item to add.
4. For **Select a template**, select a template to apply to the content item.
5. Click **Insert**
    This closes the window. The widget with the information about the content item is displayed in the **CONTENT** field.

![Content item widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/example-block.png)

6. Click **Save**.
    This refreshes the page with a success message displayed. When the block is rendered on the Storefront, the widget will be rendered as the selected content item.


## Next steps

[Edit CMS blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/blocks/edit-cms-blocks.html)  
