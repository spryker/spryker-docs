---
title: Content Items Overview
originalLink: https://documentation.spryker.com/v3/docs/content-items-overview
redirect_from:
  - /v3/docs/content-items-overview
  - /v3/docs/en/content-items-overview
---

The **Content Items** feature allows a Back Office user to work on the content and the content placement separately, meaning, you can easily create, handle, and later decide where to insert content in multiple pages or blocks in **Back Office**. Content items can be rendered on the webpage as a widget coupled with a template. See [Content Item Widgets](/docs/scos/dev/features/201907.0/cms/content-item-widgets/content-items-w) for more details.

{% info_block infoBox %}
Keep in mind that a **developer** works on .twig templates, content types, and the relationship between templates and content types, while a **Back Office user** creates and manages content in the Back Office, and then adds it to placeholders of pages and blocks.
{% endinfo_block %}

A Back Office user or a content manager can create a new content item, for example, a product list displaying Top Selling products, that can be later added via content item widgets to a block or a page. Content Items come in several types:

* Banner
* Abstract Product List that can also include its Product Groups
* Product Set
* File List 

{% info_block infoBox %}
See [Content Items Types: Module Relations](/docs/scos/dev/features/201907.0/cms/content-items/content-items-t
{% endinfo_block %} for more information on each type and the module relations.)

Depending on your needs, the **Banner** content item, for example, can be used for displaying a new banner to promote a specific brand or collection on the website. The **Product Set** content item can be added to a landing page and display a product set as a slider or carousel from which your customers can select a product or all products to add them to the cart with one click. Inserting a **File List** content item in any placeholder of a page or block will add a link or icon to download that file.

After the content item is created and saved, it appears on the _List of Content Items_ page. Later on, you can add it to blocks or pages via content item widgets. See [Adding Content Item Widgets to Pages and Blocks](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/content-item-widgets/adding-content-) for more details.

{% info_block infoBox %}
Spryker provides several basic types of templates for content items. However, developers can create and customize specific types of templates for their particular project. See [HowTo - Create CMS Templates](https://documentation.spryker.com/v4/docs/ht-create-cms-templates#adding-a-template-for-a-content-item-widget
{% endinfo_block %} for more details.)

In addition to creating and managing content items in the Back Office, developers can create or edit content items by [importing their data using a CSV file](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-ingestion/data-importers/data-importers-), as well as [get content items data via API](/docs/scos/dev/glue-api/201907.0/glue-api-storefront-guides/retrieving-content-item-data/retrieving-cont) by sending a GET request to the content item related endpoint. 
