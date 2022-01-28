---
title: Content Items feature overview
description: The feature allows working on the content and the content placement separately, meaning, you can easily create and later decide where to insert content
last_updated: Dec 23, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/content-items-overview
originalArticleId: ba7b6561-21c9-43bb-9d45-425f5e908f5f
redirect_from:
  - /v3/docs/content-items-overview
  - /v3/docs/en/content-items-overview
  - /v3/docs/content-items
  - /v3/docs/en/content-items
  - /v3/docs/content-item-widgets-201907
  - /v3/docs/en/content-item-widgets-201907
  - /v3/docs/content-items-widgets-overview
  - /v3/docs/en/content-items-widgets-overview

---

The **Content Items** feature allows a Back Office user to work on the content and the content placement separately, meaning, you can easily create, handle, and later decide where to insert content in multiple pages or blocks in **Back Office**. Content items can be rendered on the webpage as a widget coupled with a template. See [Content Item Widgets](/docs/scos/user/features/{{page.version}}/cms-feature-overview/content-item-widgets/content-items-widgets-overview.html) for more details.

{% info_block infoBox %}
Keep in mind that a **developer** works on .twig templates, content types, and the relationship between templates and content types, while a **Back Office user** creates and manages content in the Back Office, and then adds it to placeholders of pages and blocks.
{% endinfo_block %}

A Back Office user or a content manager can create a new content item, for example, a product list displaying Top Selling products, that can be later added via content item widgets to a block or a page. Content Items come in several types:

* Banner
* Abstract Product List that can also include its Product Groups
* Product Set
* File List

{% info_block infoBox %}
See [Content Items Types: Module Relations](/docs/scos/user/features/{{page.version}}/content-items-types-module-relations.html
{% endinfo_block %} for more information on each type and the module relations.)

Depending on your needs, the **Banner** content item, for example, can be used for displaying a new banner to promote a specific brand or collection on the website. The **Product Set** content item can be added to a landing page and display a product set as a slider or carousel from which your customers can select a product or all products to add them to the cart with one click. Inserting a **File List** content item in any placeholder of a page or block will add a link or icon to download that file.

After the content item is created and saved, it appears on the _List of Content Items_ page. Later on, you can add it to blocks or pages via content item widgets. See [Adding Content Item Widgets to Pages and Blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content-management/content-item-widgets/adding-content-item-widgets-to-pages-and-blocks.html) for more details.

{% info_block infoBox %}
Spryker provides several basic types of templates for content items. However, developers can create and customize specific types of templates for their particular project. See [HowTo - Create CMS Templates](/docs/scos/dev/tutorials/{{page.version}}/howtos/feature-howtos/cms/howto-create-cms-templates.html#adding-a-template-for-a-content-item-widget
{% endinfo_block %} for more details.)

In addition to creating and managing content items in the Back Office, developers can create or edit content items by [importing their data using a CSV file](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/data-importers/data-importers-overview-and-implementation.html), as well as [get content items data via API](/docs/scos/dev/glue-api/201907.0/retrieving-content-item-data/retrieving-content-item-data.html) by sending a GET request to the content item related endpoint.

## Content Item widgets

The **Content Items Widgets** allow Back Office users to display content on the store website by inserting content items in any placeholders of blocks and pages in the WYSIWYG editor. The widgets include the following content item types: [Banner, Product Set, File, and Abstract Product List that can also contain its Product Groups](/docs/scos/user/back-office-user-guides/{{page.version}}/content-management/content-items/content-items.html).

{% info_block infoBox %}
See [Content Item Widgets types: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/content-management/content-item-widgets/references/content-item-widgets-types-reference-information.html
{% endinfo_block %} to learn more about the types of content item widgets and examples of their usage.)

A Back Office user can add content to the storefront and enrich the page using the content items widget with its templates.

{% info_block warningBox %}
Prior to proceeding with content items widgets, make sure that they have been enabled for your project <!-- link to IG-->.
{% endinfo_block %}

You can work with widgets on the **Edit Placeholders** page of the **Pages** or **Blocks** menu. See [Adding Content Items Widgets to Pages and Blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content-management/content-item-widgets/adding-content-item-widgets-to-pages-and-blocks.html) for more details.

![Content items widgets](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items+Widgets+Overview/content-item-menu-page.png)

Additionally, you can make some changes to the widget, such as:

* To edit the content item widget.
* To edit the content item.
* To delete the content item widget.

{% info_block warningBox %}
Keep in mind that starting with the version **201907.0**, the **content widget** menu button has been disabled in the WYSIWYG editor. However, a developer can enable this button on a project level. See [HowTo - Enable the CMS content widgets button in the WYSIWYG editor](/docs/scos/dev/tutorials/201907.0/howtos/feature-howtos/cms/howto-enable-cms-content-widgets-button-in-the-wysiwyg-editor.html
{% endinfo_block %} for more details.)
