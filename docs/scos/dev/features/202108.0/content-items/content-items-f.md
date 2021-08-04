---
title: Content Items feature overview
originalLink: https://documentation.spryker.com/2021080/docs/content-items-feature-overview
redirect_from:
  - /2021080/docs/content-items-feature-overview
  - /2021080/docs/en/content-items-feature-overview
---

The Content Items feature creates an abstraction layer for content management in the Back Office. It allows content managers to create and preserve small content pieces. Later, they are inserted into [CMS blocks](https://documentation.spryker.com/docs/cms-block) and, subsequently, into Storefront pages. Content items are rendered on Storefront using [Content Item Widget](#content-item-widget). 

## Content Item
Content item is the smallest content unit in Spryker. There are four content item types shipped by default:
* Banner
* Abstract Product List
* Product Set
* File List 
* Navigation

You can use each content item for different purposes. For example, the Banner content item can be used to promote a specific brand or collection. The Product Set content item can be added to the landing page to display a product set as a slider or carousel. The File List adds a link or icon to download a selected file. The Navigation content item can be used to add different types of navigation elements to different shop pages.

{% info_block infoBox %}

For use cases and exmaple of each of the content item, see [Content Item Widgets types: Reference Information](https://documentation.spryker.com/docs/content-item-widgets-types-reference-information) and [Content Item Widgets templates: Reference Information.](https://documentation.spryker.com/docs/content-item-widgets-templates-reference-information)

{% endinfo_block %}

A content manager can [create content items](https://documentation.spryker.com/docs/creating-content-items) in the Back Office > **Content Management** > **Content Items** section. 
A developer can do the following:
* [Import content items](https://documentation.spryker.com/docs/data-importers-review-implementation)
* [Get content items data via API](https://documentation.spryker.com/docs/retrieving-content-item-data-201907)

See [Content Items Types: Module Relations](https://documentation.spryker.com/docs/content-item-types-module-relations) for more information on each content item type and module relations.

## Content Item Widget
Content Item Widget is a Twig code piece that is used to render a content item on Storefront.

You can insert a content item widget into a CMS block or a CMS page by selecting a respective content item in the WYSIWYG editor drop-down menu: 
  
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/insert-content-item-widget.png){height="" width=""}
  
In the WYSIWYG editor, the inserted content item widget will not be displayed as a code piece. Instead, you will see a block with the content item widget setting. 

<details open>
    <summary>Content item widget representation - the Back Office</summary>
    
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/content-item-widget-the-back-office.png){height="" width=""}

</details>

After inserting the CMS block with the cotnent item widget into a published page, the content item widget will render the content item on Storefront:

<details open>
    <summary>Content item representation - Storefront</summary>
    
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/content-item-storefront.png){height="" width=""}
    
</details>


The schema shows how the Content items feature affects content management in Spryker:

![image](https://confluence-connect.gliffy.net/embed/image/b2c37d9d-5350-4535-b437-677bffeb18da.png?utm_medium=live&utm_source=custom){height="" width=""}

See [Adding Content Item Widgets to Pages and Blocks](https://documentation.spryker.com/docs/adding-content-items-to-cms-pages-and-blocks) to learn more about working with content item widgets in the WYSIWYG editor.

### Content Item Widget Template

The content item design on Storefront depends on the template you select for the content item widget in the WYSIWYG editor. There are several content item widget templates shipped by default per each content item type. 

You can select a template when inserting a content item widget into a CMS block. Below, you can see the difference between the default templates for the Abstract product list content item:
* *Product Slider for store/landing pages* :
<details open>
    <summary>Content item widget template - the Back Office</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/product-slider-content-item-widget-template-the-back-office.png ){height="" width=""}

</details>

<details open>
    <summary>Content item widget template - Storefront</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/product-slider-content-item-widget-template-storefront.png ){height="" width=""}

</details>

* *Top Title*:

<details open>
    <summary>Content item widget template - the Back Office</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/top-title-content-item-widget-template-the-back-office.png ){height="" width=""}

</details>

<details open>
    <summary>Content item widget template - Storefront</summary>

![image]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/top-title-content-item-widget-template-storefront.png ){height="" width=""}

</details>

A developer can create and customize templates. See [Adding a Template for a Content Item Widget](https://documentation.spryker.com/docs/ht-create-cms-templates#adding-a-template-for-a-content-item-widget) for more details.



## Content Database Schema
CMS content is an item that can contain different content based on its type (banner, products, product set, file). Content items can be added to blocks and pages with a Twig function.

![Content Database Schema]( https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Feature+Overview/content-database-schema.png ){height="" width=""}


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



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/file-details-content-navigationcsv" class="mr-link">Import navigation content items</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-content-bannercsv" class="mr-link">Import banner content items</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-content-product-setcsv" class="mr-link">Import product set content items</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-content-product-abstract-listcsv" class="mr-link">Import abstract product list content items</a></li>
                <li><a href="https://documentation.spryker.com/docs/howto-create-a-custom-content-item" class="mr-link">Learn how to create a custom content item</a></li>
                 <li><a href="https://documentation.spryker.com/docs/retireving-abstract-product-list-content-items" class="mr-link">Retrieve abstract product list content itmes via Glue API</a></li> 
                 <li><a href="https://documentation.spryker.com/docs/retrieving-banner-content-items" class="mr-link">Retrieve banner content itmes via Glue API</a></li>
                 <li><a href="https://documentation.spryker.com/docs/glue-api-content-items-api-feature-integration" class="mr-link">Integrate the Content Items Glue API</a></li>
                 <li>Integrate the Content Items feature:</li>
                 <li><a href="https://documentation.spryker.com/docs/content-items-feature-integration" class="mr-link">Integrate the Content Items feature</a></li> 
                 <li><a href="https://documentation.spryker.com/docs/mg-contentbannergui#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the ContentBannerGui module from version 1.* to version 2.*</a></li>
                 <li><a href="https://documentation.spryker.com/docs/mg-contentbanner#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the ContentBanner module from version 1.* to version 2.*</a></li>
                 <li><a href="https://documentation.spryker.com/docs/mg-contentstorage" class="mr-link">Migrate the ContentStorage module from version 1.* to version 2.*</a></li>  
                 <li><a href="https://documentation.spryker.com/docs/mg-content#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the Content module from version 1.* to version 2.*</a></li>   
                    </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
 <li><a href="https://documentation.spryker.com/docs/creating-content-items" class="mr-link">Create a content item</a></li>
                 <li><a href="https://documentation.spryker.com/docs/editing-content-items" class="mr-link">Edit a content item</a></li>   
                <li><a href="https://documentation.spryker.com/docs/adding-content-items-to-cms-pages-and-blocks" class="mr-link">Add content items to CMS pages and blocks</a></li>   
                <li><a href="https://documentation.spryker.com/docs/editing-content-items-in-cms-pages-and-blocks" class="mr-link">Edit content items in CMS pages and blocks</a></li>   
                 
