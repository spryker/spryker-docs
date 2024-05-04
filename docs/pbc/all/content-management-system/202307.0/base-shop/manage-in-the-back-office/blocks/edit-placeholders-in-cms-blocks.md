---
title: Edit placeholders in CMS blocks
description: Learn how to edit placeholders in CMS blocks in the Back Office.
last_updated: May 11, 2022
template: back-office-user-guide-template
related:
  - title: CMS blocks overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-blocks-overview.html
---

This document describes how to edit placeholders in CMS blocks in the Back Office.

## Prerequisites

* Optional: If you want to add content items to a block, [create content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-banner-content-items.html).
* Review the [reference information](#reference-information-edit-placeholders-in-a-cms-block) before you start or look up the necessary information as you go through the process.


## Edit placeholders of a CMS block

1. Go to **Content&nbsp;<span aria-label="and then">></span> Blocks**.
    This opens the **Blocks** page.
2. Next to the block you want to edit the placeholders of, click **Edit Placeholder**.
    This opens the **Edit CMS Block Glossary** page on the **Title** tab.
3. Add **CONTENT** to the needed locales and placeholders.  
4. Click **Save**.
    This refreshes the page with a success message displayed.

## Reference information: Edit placeholders in a CMS block

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
