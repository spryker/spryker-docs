---
title: Adding Content Items to CMS Pages and Blocks
originalLink: https://documentation.spryker.com/v5/docs/adding-content-items-to-cms-pages-and-blocks
redirect_from:
  - /v5/docs/adding-content-items-to-cms-pages-and-blocks
  - /v5/docs/en/adding-content-items-to-cms-pages-and-blocks
---

This topic describes how to add a content item widget to a page and block using the Back Office.
To start working with the Content Item Widgets, go to the **Content Management** section.

{% info_block warningBox %}
Prior to adding a content item widget to a block or a page, make sure that the page is _active_ and _not expired_; otherwise, it will not be displayed on the website.
{% endinfo_block %}
***
## Adding Content Item Widgets to Pages
To add a content item widget to a page:

1. Navigate to the **Content Management** menu and select **Pages**.
2. In the _Actions_ column, click **Edit -> Placeholders** next to the page to which you want to add a content item widget. 
3. On the **Edit Placeholders: CMS Page [Name]** page, go to the **Placeholder** tab and place your cursor where you want to insert the content items.
4. Click the **Content Item** drop-down button in the editor pane and select the widget you want to add. 

![Content item menu page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/content-item-menu-page.png){height="" width=""}

The **Insert a Content Item** pop-up window opens.

![Insert content item window](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/insert-content-item-window.png){height="" width=""}

5. Select a content item and its template, and click **Insert**. 
{% info_block infoBox %}
Keep in mind that you can select only **one** item and **one** template at a time.
{% endinfo_block %}
This will insert a content item widget with the following details: 
![Widget UI element](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/widget-ui-element.png){height="" width=""}

* Content Item Type
* Content Item Key
* Name
* Template

{% info_block infoBox %}
Templates are project-specific and are usually created by a developer and a business person. If you are missing a Content Item Widget template, contact them and refer to [HowTo - Create a Content Item Widget template](https://documentation.spryker.com/docs/en/ht-create-cms-templates#adding-a-template-for-a-content-item-widget
{% endinfo_block %}.)

6. Click **Save**. A new content item widget will be added to the page.

{% info_block infoBox %}
You can preview the page to see how the content item widget will be displayed on the website or publish it. See  [Managing CMS Pages](https://documentation.spryker.com/docs/en/managing-cms-pages
{% endinfo_block %} to learn how to preview and publish the page.)

## Adding Content Item Widgets to Blocks
To add a content item widget to a block:

1. Navigate to the **Content Management** menu and select **Blocks**.
2. In the _Actions_ column, click **Edit Placeholder** next to the block to which you want to add a content item widget.
3. On the **Edit Block Glossary: Block ID** page, go to the **Placeholder** tab and place your cursor where you want to insert the content items.
4. Click the **Content Item** drop-down button in the editor pane and select the widget you want to add. The **Insert a Content Item** pop-up window opens.
![Insert content item for blocks](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/insert-content-item-widget-block.png){height="" width=""}

5. Select a content item and its template, and click **Insert**. This will insert the content item widget containing the following details:

{% info_block infoBox %}
Keep in mind that you can select only **one** item and **one** template at a time.
{% endinfo_block %}

![Example block](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Adding+Content+Item+Widgets+to+Pages+and+Blocks/example-block.png){height="" width=""}

* Content Item Type
* Content Item Key
* Name
* Template

6. Click **Save**. The new content item widget will be added to the block. 

{% info_block infoBox %}
You can preview how the content item widget will be displayed on the website by following the steps described in  [Managing CMS Blocks](https://documentation.spryker.com/docs/en/managing-cms-blocks
{% endinfo_block %}.)
***
**What's next?**
To know more about how to edit a content item widget, see  [Editing Content Item Widgets](https://documentation.spryker.com/docs/en/editing-content-item-widgets).

To learn more about types of content item widgets and their templates, see articles in the [References](https://documentation.spryker.com/docs/en/content-item-widgets-templates-reference-information) section.
