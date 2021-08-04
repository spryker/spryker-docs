---
title: Adding content items to CMS pages and blocks
originalLink: https://documentation.spryker.com/2021080/docs/adding-content-items-to-cms-pages-and-blocks
redirect_from:
  - /2021080/docs/adding-content-items-to-cms-pages-and-blocks
  - /2021080/docs/en/adding-content-items-to-cms-pages-and-blocks
---

This topic describes how to add a content item widget to a page and block using the Back Office.

## Prerequisites
To start adding content item widgets to pages, navigate to **Content** > **Pages**.

To start adding content item widgets to blocks, navigate to **Content** > **Blocks**.

{% info_block warningBox %}
Prior to adding a content item widget to a block or a page, make sure that the page is _active_ and _not expired_; otherwise, it will not be displayed on the website.
{% endinfo_block %}

## Adding content item widgets to pages
To add a content item widget to a page:

1. On the *Overview of CMS Pages* page, In the _Actions_ column, select **Edit** > **Placeholders** next to the page you want to add a content item widget to. 
3. On the *Edit Placeholders: CMS Page [Name]* page, go to the *Placeholder* tab and place your cursor where you want to insert the content items.
4. In the editor pane, select the widget you want to add from the **Content Item** drop-down list.

![Content item menu page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/content-item-menu-page.png){height="" width=""}

The *Insert a Content Item* pop-up window opens.

![Insert content item window](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/insert-content-item-window.png){height="" width=""}

5. Select a content item and its template, and click **Insert**. 
{% info_block infoBox %}
Keep in mind that you can select only *one* item and *one* template at a time.
{% endinfo_block %}
This will insert a content item widget with the following details: 
![Widget UI element](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/widget-ui-element.png){height="" width=""}

* Content Item Type
* Content Item Key
* Name
* Template

{% info_block infoBox %}
Templates are project-specific and are usually created by a developer and a business person. If you are missing a Content Item Widget template, contact them and refer to [HowTo - Create a content item widget template](https://documentation.spryker.com/docs/ht-create-cms-templates#content-item-widget-template
{% endinfo_block %}.)

6. Click **Save**. A new content item widget will be added to the page.

{% info_block infoBox %}
You can preview the page to see how the content item widget will be displayed on the website or publish it. To learn how to preview and publish the page, see  [Managing CMS pages](https://documentation.spryker.com/docs/managing-cms-pages
{% endinfo_block %} .)

## Adding content item widgets to blocks
To add a content item widget to a block:

1. On the *Overview of CMS Blocks* page, in the _Actions_ column, select **Edit Placeholder** next to the block you want to add a content item widget to.
3. On the *Edit Block Glossary: Block ID* page, go to the *Placeholder* tab and place your cursor where you want to insert the content items.
4. In the editor pane, select the widget you want to add from the **Content Item** drop-down list. The *Insert a Content Item* pop-up window opens.
![Insert content item for blocks](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/insert-content-item-widget-block.png){height="" width=""}

5. Select a content item and its template, and click **Insert**. This will insert the content item widget containing the following details:

{% info_block infoBox %}
Keep in mind that you can select only *one* item and *one* template at a time.
{% endinfo_block %}

![Example block](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/example-block.png)
* Content Item Type
* Content Item Key
* Name
* Template

6. Click **Save**. The new content item widget will be added to the block. 

{% info_block infoBox %}
You can preview how the content item widget will be displayed on the website by following the steps described in  [Managing CMS blocks](https://documentation.spryker.com/docs/managing-cms-blocks
{% endinfo_block %}.)

**What's next?**
To know more about how to edit a content item widget, see  [Editing content items in CMS pages and blocks](https://documentation.spryker.com/docs/editing-content-items-in-cms-pages-and-blocks).

To learn more about types of content item widgets and their templates, see articles in the [References](https://documentation.spryker.com/docs/content-item-widgets-templates-reference-information) section.
