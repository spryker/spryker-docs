---
title: Content Items feature overview
description: Content item is a preserved content piece that can be used in multiple pages.
last_updated: Jul 21, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/content-items-feature-overview
originalArticleId: beb3bad2-d08d-42b7-9474-9dedfecae781
redirect_from:
  - /2021080/docs/content-items-feature-overview
  - /2021080/docs/en/content-items-feature-overview
  - /docs/content-items-feature-overview
  - /docs/en/content-items-feature-overview
  - /docs/scos/user/features/201811.0/content-items-feature-overview.html
  - /docs/scos/user/features/201903.0/content-items-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202307.0/content-items-feature-walkthrough/content-items-feature-walkthrough.html
  - /docs/scos/user/features/202307.0/content-items-feature-overview.html
  - /docs/pbc/all/content-management-system/202307.0/content-items-feature-overview.html
---

The *Content Items* feature creates an abstraction layer for content management in the Back Office. It lets content managers create and preserve small content pieces. Later, they are inserted into [CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html) and, subsequently, into Storefront pages. Content items are rendered on Storefront using [Content Item Widget](#content-item-widget).

## Content item

A *content item* is the smallest content unit in Spryker. There are four content item types shipped by default:
* Banner
* Abstract Product List
* Product Set
* File List
* Navigation

You can use each content item for different purposes. For example, A *Banner content item* can be used to promote a specific brand or collection. A *Product Set content* item can be added to the landing page to display a product set as a slider or carousel. The File List adds a link or icon to download a selected file. The Navigation content item can be used to add different types of navigation elements to different shop pages.

A content manager can [create content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-banner-content-items.html) in the Back Office&nbsp;<span aria-label="and then">></span> **Content Management&nbsp;<span aria-label="and then">></span> Content Items** section.
A developer can do the following:
* [Import content items](/docs/dg/dev/data-import/{{page.version}}/data-importers-implementation.html)
* [Retrieve banner content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-banner-content-items.html)
* [Retrieve abstract product list content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-list-content-items.html)

For more information about each content item type and module relations, see [Content Items feature overview](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/content-items-feature-overview.html).

## Content Item Widget

*Content Item Widget* is a Twig code piece that is used to render a content item on Storefront.

You can insert a content item widget into a CMS block or a CMS page by selecting a respective content item in the WYSIWYG editor drop-down menu:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/insert-content-item-widget.png)

In the WYSIWYG editor, the inserted content item widget will not be displayed as a code piece. Instead, you will see a block with the content item widget setting.

<details open>
    <summary markdown='span'>Content item widget representation—the Back Office</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/content-item-widget-the-back-office.png)

</details>

After inserting the CMS block with the content item widget into a published page, the content item widget will render the content item on Storefront:

<details open>
    <summary markdown='span'>Content item representation—Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/content-item-storefront.png)

</details>


The schema shows how the Content items feature affects content management in Spryker:

![image](https://confluence-connect.gliffy.net/embed/image/b2c37d9d-5350-4535-b437-677bffeb18da.png?utm_medium=live&utm_source=custom)

To learn more about working with content item widgets in the WYSIWYG editor, see [Add content items to CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/add-content-items-to-cms-blocks.html).

### Content Item Widget Template

The content item design on Storefront depends on the template you select for the content item widget in the WYSIWYG editor. There are several content item widget templates shipped by default per each content item type.

You can select a template when inserting a content item widget into a CMS block. Below, you can see the difference between the default templates for the Abstract product list content item:
* *Product Slider for store/landing pages*:

<details open><summary markdown='span'>Content item widget template—the Back Office</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/product-slider-content-item-widget-template-the-back-office.png )

</details>

<details open><summary markdown='span'>Content item widget template—Storefront</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/product-slider-content-item-widget-template-storefront.png )

</details>

* *Top Title*:

<details open>
    <summary markdown='span'>Content item widget template—the Back Office</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/top-title-content-item-widget-template-the-back-office.png )

</details>

<details open>
    <summary markdown='span'>Content item widget template—Storefront</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/top-title-content-item-widget-template-storefront.png )

</details>

A developer can create and customize templates. For more details, see [Adding a Template for a Content Item Widget](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html#content-item-widget-template).

## Content Database Schema
CMS content is an item that can contain different content based on its type (banner, products, product set, file). Content items can be added to blocks and pages with a Twig function.

![Content Database Schema]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/content-database-schema.png )


Structure:

* CMS Content has the following:
  - Key—a unique content item identifier.
  - Content type and content term to identify its content type.
  - Came and description.
* CMS Content Item can be toggled per Locale.
* Localized Content Item is used to separate content by locales:
  - fk_content is a content item identifier.
  - fk_locale is a locale identifier.
* Parameters are settings or data for a content item.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create abstract product list content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-abstract-product-list-content-items.html) |
| [Create banner content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-banner-content-items.html)   |
| [Create file list content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-file-list-content-items.html) |
| [Create navigation content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-navigation-content-items.html) |
| [Create product set content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-product-set-content-items.html)     |
|  [Edit content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/edit-content-items.html)  |
|  [Add content items to CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/add-content-items-to-cms-blocks.html)  |
|  [Add content items to CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/add-content-items-to-cms-pages.html)   |

## Related Developer documents

| INSTALLATION GUIDES  | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|---|---|
| [Install the Content Items feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-content-items-feature.html) |  [ContentBanner migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentbanner-module.html) | [Retrieve abstract product list content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-list-content-items.html) | [File details: content_banner.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-banner.csv.html) | [HowTo: Create a custom content item](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-a-custom-content-item.html) | [Content item types: module relations](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/domain-model-and-relationships/content-item-types-module-relations.html)  |  |
| [Glue API: Content items API feature integration](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-content-items-glue-api.html) | [Content migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-content-module.html) | [Retrieve banner content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-banner-content-items.html) | [File details: content_navigation.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-navigation.csv.html) |  |  |
|  | [ContentBannerGui migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentbannergui-module.html) |  | [File details: content_product_abstract_list.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-abstract-list.csv.html) |  |  |
|  | [ContentStorage migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentstorage-module.html) |  | [File details: content_product_set.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-set.csv.html) |  |  |
