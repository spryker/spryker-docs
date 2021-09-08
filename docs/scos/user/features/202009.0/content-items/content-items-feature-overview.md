---
title: Content items feature overview
description: Content item is a preserved content piece that can be used in multiple pages.
originalLink: https://documentation.spryker.com/v6/docs/content-items-feature-overview
originalArticleId: 530f9cd1-1fd1-4b32-80eb-9ee5acb247ac
redirect_from:
  - /v6/docs/content-items-feature-overview
  - /v6/docs/en/content-items-feature-overview
---

The Content Items feature creates an abstraction layer for content management in the Back Office. It allows content managers to create and preserve small content pieces. Later, they are inserted into [CMS blocks](/docs/scos/dev/features/202009.0/cms/cms-feature-overview/cms-block.html) and, subsequently, into Storefront pages. Content items are rendered on Storefront using [Content Item Widget](#content-item-widget).

## Content Item
Content item is the smallest content unit in Spryker. There are four content item types shipped by default:
* Banner
* Abstract Product List
* Product Set
* File List
* Navigation

You can use each content item for different purposes. For example, the Banner content item can be used to promote a specific brand or collection. The Product Set content item can be added to the landing page to display a product set as a slider or carousel. The File List adds a link or icon to download a selected file. The Navigation content item can be used to add different types of navigation elements to different shop pages.

{% info_block infoBox %}

For use cases and exmaple of each of the content item, see [Content Item Widgets types: Reference Information](/docs/scos/user/user-guides/202009.0/back-office-user-guide/content/content-items/references/reference-information-content-item-widgets-types.html) and [Content Item Widgets templates: Reference Information.](/docs/scos/user/user-guides/202009.0/back-office-user-guide/content/content-items/references/reference-information-content-item-widgets-templates.html)

{% endinfo_block %}

A content manager can [create content items](/docs/scos/user/user-guides/202009.0/back-office-user-guide/content/content-items/creating-content-items.html) in the Back Office > **Content Management** > **Content Items** section.
A developer can do the following:
* [Import content items](/docs/scos/dev/developer-guides/202009.0/development-guide/data-import/data-importers-overview-and-implementation.html)
* [Retrieve banner content items](docs\scos\dev\glue-api-guides\202009.0\retrieving-content-items\retrieving-banner-content-items.html)
* [Retrieve abstract product list content items](docs\scos\dev\glue-api-guides\202009.0\retrieving-content-items\retrieving-abstract-product-list-content-items.md)

See [Content Items Types: Module Relations](/docs/scos/dev/features/202009.0/content-items/content-item-types-module-relations.html) for more information on each content item type and module relations.

## Content Item Widget
Content Item Widget is a Twig code piece that is used to render a content item on Storefront.

You can insert a content item widget into a CMS block or a CMS page by selecting a respective content item in the WYSIWYG editor drop-down menu:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/insert-content-item-widget.png)

In the WYSIWYG editor, the inserted content item widget will not be displayed as a code piece. Instead, you will see a block with the content item widget setting.

<details open>
    <summary>Content item widget representation - the Back Office</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/content-item-widget-the-back-office.png)

</details>

After inserting the CMS block with the cotnent item widget into a published page, the content item widget will render the content item on Storefront:

<details open>
    <summary>Content item representation - Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/content-item-storefront.png)

</details>


The schema shows how the Content items feature affects content management in Spryker:

![image](https://confluence-connect.gliffy.net/embed/image/b2c37d9d-5350-4535-b437-677bffeb18da.png?utm_medium=live&utm_source=custom)

See [Adding Content Item Widgets to Pages and Blocks](/docs/scos/user/user-guides/202009.0/back-office-user-guide/content/content-items/adding-content-items-to-cms-pages-and-blocks.html) to learn more about working with content item widgets in the WYSIWYG editor.

### Content Item Widget Template

The content item design on Storefront depends on the template you select for the content item widget in the WYSIWYG editor. There are several content item widget templates shipped by default per each content item type.

You can select a template when inserting a content item widget into a CMS block. Below, you can see the difference between the default templates for the Abstract product list content item:
* *Product Slider for store/landing pages* :
<details open>
    <summary>Content item widget template - the Back Office</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/product-slider-content-item-widget-template-the-back-office.png )

</details>

<details open>
    <summary>Content item widget template - Storefront</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/product-slider-content-item-widget-template-storefront.png )

</details>

* *Top Title*:

<details open>
    <summary>Content item widget template - the Back Office</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/top-title-content-item-widget-template-the-back-office.png )

</details>

<details open>
    <summary>Content item widget template - Storefront</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/top-title-content-item-widget-template-storefront.png )

</details>

A developer can create and customize templates. See [Adding a Template for a Content Item Widget](/docs/scos/dev/tutorials-and-howtos/202009.0/howtos/feature-howtos/cms/howto-create-cms-templates.html#adding-a-template-for-a-content-item-widget) for more details.



## Content Database Schema
CMS content is an item that can contain different content based on its type (banner, products, product set, file). Content items can be added to blocks and pages with a Twig function.

![Content Database Schema]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/content-database-schema.png )


Structure:

*     CMS Content has the following:
    *         Key - a unique content item identifier.
    *         Content type and content term to identify its content type.
    *         Came and description.
*     CMS Content Item can be toggled per Locale.
*     Localized Content Item is used to separate content by locales:
    *         fk_content is a content item identifier.
    *         fk_locale is a locale identifier.
*         Parameters are settings or data for a content item.
