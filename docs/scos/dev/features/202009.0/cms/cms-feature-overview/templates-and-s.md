---
title: Templates and slots
originalLink: https://documentation.spryker.com/v6/docs/templates-and-slots
redirect_from:
  - /v6/docs/templates-and-slots
  - /v6/docs/en/templates-and-slots
---

Templates slots enables content managers to effectively and coherently interact with content using a dedicated template in Spryker - a template with slots. In the Back Office, a content manager has access to all the Storefront pages and can easily embed content into them. The embedded content is rendered by the [Slot Widget](#slot-widget). 

{% info_block infoBox %}

Templates and slots is a complex funcitonality which works in conjunction with other functionalities. To use it effectively, make sure you get familiar with the functionalities in the order they are presented:
* [CMS Page](https://documentation.spryker.com/docs/cms-page)
* [CMS Block](https://documentation.spryker.com/docs/cms-block)
* [Content Items](https://documentation.spryker.com/docs/content-items) 
* [WYSIWYG Editor](https://documentation.spryker.com/docs/wysiwyg-editor)

{% endinfo_block %}


## General Information

Managing content with the help of templates with slots involves four separate entities:

  * Template
  * Slot
  * CMS Block
  * Content Item

The following Storefront page breakdown shows the arrangement of the entities.

![image](https://confluence-connect.gliffy.net/embed/image/a7cad21d-e586-4c8f-92d5-9095071e3e8d.png?utm_medium=live&utm_source=custom){height="" width=""}

## Template
Template is a [Twig](https://twig.symfony.com/) file that, when applied to a page, defines its design and layout. Template with slots is a template that defines the layout of slots across a page and has at least one slot assigned.

<details open>
    <summary>Template representation - Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/storefront-+template.png){height="" width=""}

</details>
    


The following templates with slots are shipped with the CMS feature:

* Home page template
* Category page template
* Product details page template
* CMS page template

A content manager can [manage templates with slots](https://documentation.spryker.com/docs/managing-slots) in the Back Office > **Content Management** > **Slots** section.
<details open>
    <summary>Template representation - the Back Office</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/back-office-template.png){height="" width=""}


</details>

See [HowTo - Create CMS Templates](https://documentation.spryker.com/docs/ht-create-cms-templates) to learn about creation of CMS templates.



## Slot
Slot is a configurable space for content in a template. Unlike template that is an actual file, the slot exists only as an entry in database. To embed content into a slot, a slot widget is inserted into the template file to which the slot is assigned. The slot widget position in regards to the rest of the code in the template defines the position of the slot in the page.

<details open>
    <summary>Slot representation - Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/storefront-slot.png){height="" width=""}


</details>

Each template with slots shipped by default has a number of slots. A developer can change the position of an existing slot by changing the position of the corresponding slot widget in the template.

By importing a [slot list](#slot-list), a developer can do the following:

*     Add more slots to existing templates.
*     Delete slots.
*     Define slot configurations.

A content manager can [manage slots](https://documentation.spryker.com/docs/managing-slots) in the Back Office > **Content Management** > **Slots** section.

<details open>
    <summary>Slot representation - the Back Office</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/back-office-slot.png){height="" width=""}


</details>

## CMS Block

[CMS block](https://documentation.spryker.com/docs/cms-block), from the perspective of the tempates and slots, is a piece of content that is inserted into a slot. When a CMS block is inserted into a slot, it's content is displayed on the Storefront page space belonging to the slot.  The position of CMS blocks on a page can be defined by a content manager in the Back Office. 

<details open>
    <summary> CMS block representation - Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/storefront-cms-block.png){height="" width=""}


</details>

A content manager can [manage CMS blocks](https://documentation.spryker.com/docs/managing-slots) in the Back Office > **Content Management** > **Slots** section.
 


<details open>
    <summary> CMS block representation - the Back Office</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/back-office-cms-block.png){height="" width=""}


</details>


CMS Block is a separate entity with a dedicated section in the Back Office. See [Managing CMS Blocks](https://documentation.spryker.com/docs/managing-cms-blocks) to learn what a content manager can do with CMS blocks in the Back Office > **Content Management** > **Blocks** section.


## Content Item

[Content Item](https://documentation.spryker.com/docs/content-items-feature-overview) is the smallest content unit in Spryker that is used in the WISIWYG editor when creating content for CMS blocks. When a CMS block is inserted into a slot, all the content items of the CMS block are displayed on the Storefront page space of the slot.

<details open>
    <summary> Content item representation - Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/storefront-content-item.png){height="" width=""}


</details>

From the perspective of templates and slots, a content item always comes as a part of CMS block. That's why there is no place to manage it in the **Slots** section. 
See [Content Items](https://documentation.spryker.com/docs/content-items) to learn what a content manager can do with content items in the Back Office > **Content Management** > **Content Items** section.

### Applying Templates with Slots
The template with slots can be applied to any page. Even though a content manager can manage all page types in the Back Office, they can only apply templates with slots to the following:

* Category pages in the Back Office > **Category > Create category** section. See [Creating Categories](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/category/creating-catego) for more information.
* CMS pages in the Back Office > **Pages > Create new CMS page** section. See [Creating a CMS Page](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/category/creating-catego) for more information.

A developer can apply templates with slots to all the other page types.

## Correlation
The correlation between templates and slots is defined by importing template and slot lists into database. Learn how to [import these lists](https://documentation.spryker.com/docs/data-importers-review-implementation).

Using the information from the imported lists, the Slot Widget can understand which slots are assigned to a template, and from where to fetch content for each slot.

{% info_block infoBox %}
Without correlation defined correctly, Slot Widget may fail to render embedded content correctly.
{% endinfo_block %}

When the lists are imported, the following applies:

* The information defined in them is reflected and can be managed in the Back Office > **Content Management > Slots**.
* By managing this information, a content manager adds content to Storefront.

### Template list
The template list contains the following information:

| Property | Description | Example values |
| --- | --- | --- |
| ID | Numeric identifier of template. | 3 |
| template path | Path to the Twig file template in a project. | `@ShopUI/templates/page-layout-main/page-layout-main.twig` |
| name | Alphabetical template identifier. It will be shown in the Back Office. | "Home Page" |
| description | Template description. It will be shown in the Back Office. | "The layout of Slots in the Home Page, always below Store Header including Navigation, and above Store Footer." |

Note the following:
* If a template has only inactive slots, it is still considered a template with slots. Therefore, it will be shown in the Slots section.
* If a template is on an imported template list, but does not have a slot, it's not considered a template with slots. Therefore, it will not be displayed in the Slots section.

### Slot list
The slot list contains the following information:

| Property | Description | Example values |
| --- | --- | --- |
| ID | Numeric identifier of slot. | 5 |
| template path | Path to the template to which the slot is assigned. | `@ShopUI/templates/page-layout-main/page-layout-main.twig` |
| slot key | Unique identifier of the slot that is used by slot widget when rendering the content of this slot. | slt-11 |
| content provider | Defines the source of content of this slot. | SprykerCmsSlotBlock |
| name | Alphabetical identifier of the slot. It will be shown in the Back Office. | "Header Top" |
| description | Description of the slot. It will be shown in the Back Office. | "A content area in the Header section, that is below the logo and search section and above main navigation" |
| status | Defines whether the slot is active or not where "0" stands for "inactive" and "1" stands for "active". If a slot is inactive, it is not rendered in the Storefront by the slot widget. | 1 |

## Content Providers
A content provider is a source from where Slot Widget fetches content to embed into slots and, subsequently, render it in the Storefront.  With templates and slots, you can use slots to embed the content created in your Spryker project or CMS editors of technology partners (e.g. [CoreMedia](https://documentation.spryker.com/docs/coremedia), [E-spirit](https://documentation.spryker.com/docs/e-spirit), [Styla](https://documentation.spryker.com/docs/styla), [Magnolia](https://documentation.spryker.com/docs/magnolia-cms)).

With templates and slots, the following applies:

* Spryker CMS Blocks is the content provider for all the slots.
* Slots embed content from [CMS Blocks](https://documentation.spryker.com/docs/cms-block).
* Content for CMS blocks is created in the [WYSIWYG Editor](https://documentation.spryker.com/docs/wysiwyg-editor#wysiwyg-editor).
* Templates with slots are managed in the Back Office > **Slots** section.

The schema below shows how content is managed with the help of templates with slots:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/templates-and-slots.png){height="" width=""}

## Visibility Conditions
When the content manager assigns a CMS block to a slot, it is displayed in all the pages to which the template with the slot is applied.  To narrow down the number of pages to a desired selection, the content manager can define visibility conditions for each CMS block assigned to a slot. Visibility conditions are defined by selecting particular pages in which the content of a CMS block will be displayed. When visibility conditions are defined, the slot widget checks if the CMS block should be rendered in an opened page and either renders or skips it.

Page identifiers used to define visibility conditions depend on the page type to which a template with slots is applied. You can check identifiers for each page type in the table below.

| Page Type/Identifier | Product ID | Category ID | CMS page ID |
| --- | --- | --- | --- |
| Home/Cart/Order Confirmation etc | - | - | - |
| Product details page | v | v | - |
| Category page | - | v | - |
| CMS page | - | - | v |



{% info_block infoBox "Product details page" %}
For product details page type, you can use the Product ID or Category ID identifiers. Category ID is a collective identifier. By selecting a category, the content manager selects all the products that are [assigned to the category](https://documentation.spryker.com/docs/assigning-products-to-categories
{% endinfo_block %}.)

To meet your project requirements, you can extend the visibility conditions functionality by adding more conditions, like Customer ID, Customer Group ID or Navigation Nodes. See [HowTo - Create Visibility Conditions for CMS Blocks](https://documentation.spryker.com/docs/howto-create-a-visibility-condition-for-cms-blocks) to learn more.


A content manager can define visibility conditions by [selecting pages](https://documentation.spryker.com/docs/managing-slots#selecting-pages) in the Back Office > **Content Management > Slots** section.

A developer can [import visibility conditions](https://documentation.spryker.com/docs/data-importers-review-implementation). 

## Slot Widget
Slot widget is used to fetch content from a content provider and render it in specified pages. Content is fetched in the form of HTML code ready to be rendered in the Storefront. With the help of slot widgets, you can fetch and render content from the following content providers:

* [CoreMedia](https://documentation.spryker.com/docs/coremedia)
* [Spryker CMS Blocks](#spryker-cms-blocks)


### Slot Widget Configuration
Slot widget is used by inserting it into a template which is applied to a page subsequently.

A slot widget template looks as follows:

```twig
{% raw %}{%{% endraw %} cms_slot 'cms-slot-key' with {
    Property: 'Property.value',
} {% raw %}%}{% endraw %}
```

### Properties
Properties are used by slot widgets to identify for which entity content is being fetched. At the same time, all the content that is meant to be fetched by a slot widget can be identified using the same properties on the side of the content provider. When a slot widget make a request to fetch content from a content provider, It passes the property values and fetches what the content provider returns to render it in the specified page. You can find the list of exemplary properties with descriptions in the table:

| Property | Specification |
| --- | --- |
| Slot key | Unique slot identifier. Using this identifier, slot widget fetches all the information about slot from storage. |
| Store name | Store name from which content is fetched. |
| Locale | Store locale for which content is fetched. |
| Category ID | Numeric identifier of the category page for which content is fetched. |
| Product ID | Numeric identifier of the product details page for which content is fetched. |
| CMS page ID | Numeric identifier of the CMS page for which content is fetched. |

You can add other properties to meet your project or external content provider requirements.

#### Property Types
Properties can be either `required` or `autofilled`. If a property is of the required type, it is entered manually and slot widget does not render the content if one of the required values is not filled. If a property is of the autofilled type, when sending a request to fetch content, slot widget fills this value based on the page opened on storefront and fetches the corresponding content. For example, if you wanted a slot widget to fill `locale` and `store` values automatically, it would look as follows:

```twig
{% raw %}{%{% endraw %} cms_slot "cms-slot-key" autofilled ['locale', 'store'] required ['requiredProperty'] with {
    requiredProperty: 'requiredProperty.value',
    additionalProperty: 'additionalProperty.value'
} {% raw %}%}{% endraw %}
```

{% info_block infoBox %}
If there is no content to provide on the side of the content provider based on the specified properties, the slot widget renders a blank space in the Storefront.
{% endinfo_block %}

#### Contextual Variables
To avoid entering particular identifies of Spryker entities as property values, you can use contextual variables. When such a property is used, slot widget identifies the property value depending on the page opened on the Storefront and fetches the corresponding content. You can find several examples of contextual variables below.

| Property | Property value example |
| --- | --- |
| `idCategory` | `data.category`,`id_category` |
| `idProductAbstract` | `data.product.idProductAbstract` |
| `idCmsPage` | `data.idCmsPage` |

### Correlation
Using the slot key property, slot widget retrieves slot information from storage and interprets its attributes in the following way.

| Attribute | Relevance | Description |
| --- | --- | --- |
| template path | relevant | Defines the template for which CMS block(s) are fetched. |
| slot key | relevant | Identifies the slot for slot widget. |
| content provider | relevant | Defines the content provider from which content is fetched. |
| name | irrelevant | N/A |
| description | irrelevant | N/A |
| status | relevant | Defines if the content fetched for this slot should be rendered on the Storefront. |

### Spryker CMS Blocks

This section describes how Slot Widget works with the Spryker CMS Blocks content provider.

{% info_block infoBox %}


* By default, names are used as unique identifiers of CMS blocks while Slot Widget requires keys. To enable Slot Widget to work with CMS blocks, [upgrade](https://documentation.spryker.com/docs/mg-cms-block#upgrading-from-version-2---to-version-3--) the `CMSBlock` module in your project for CMS Blocks to have keys.


{% endinfo_block %}

WIth the Spryker CMS Blocks content provider, a slot widget template looks as follows:
```twig
{% raw %}{%{% endraw %} cms_slot "cms-slot-key" with {
    Property: 'Property.value',
} {% raw %}%}{% endraw %}
```

#### Category Pages

To fetch content created for a category page, you can use the `categoryID` property. Find an example of a generic slot widget for category pages below.

```twig
{% raw %}{%{% endraw %} cms_slot 'slt-5' with {
    idCategory: data.categoryId,
} {% raw %}%}{% endraw %}
```

#### Product Details Pages
To fetch content created for a product details page, you can use the `productID` property. Find an example of a generic slot widget for product details pages below.

```twig
{% raw %}{%{% endraw %} cms_slot 'slt-7' with {
    idProductAbstract: data.product.idProductAbstract,
} {% raw %}%}{% endraw %}
```

#### CMS Pages
To fetch content created for a CMS page, you can use the `pageID` property. Find an example of a generic slot widget for CMS pages below.

```twig
{% raw %}{%{% endraw %} cms_slot 'slt-8' with {
    idCmsPage: data.idCmsPage,
} {% raw %}%}{% endraw %}
```

#### Home Page
Unlike category, product details and CMS pages, the home page does not require any properties since there is usually only one home page in a project. Find an example of a generic slot widget for the home page below.

```twig
{% raw %}{%{% endraw %} cms_slot 'slt-2' {% raw %}%}{% endraw %}
```

## Database Schema - Templates with Slots and CMS Blocks Content Provider
You can find the database schema for templates, slots and the SprykerCMS content provider below:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/template-slot-cms-blocks-content-provider.png){height="" width=""}

**Structure:**

* CMS Slot has the following:
    * Key - a unique slot identifier.
    * Content provider name.
    * Slot name and description (that describes slot position).
    * Slot status (active or inactive).
* CMS Slot Template has the following:
    * Unique path to a Twig file.
    * Template name and description (that describes the template content).
    * List of slots in the template.
* CMS Slot Block has:
    * CMS Block, CMS Slot and CMS Slot Template references.
    * Conditions data (that is used to define the pages in which a CMS Block is displayed).
    * Position (that defines the order of assigned CMS blocks).

## Current Constraints

{% info_block infoBox %}
Currently, the functionality has the following functional constraints which are going to be resolved in the future.
{% endinfo_block %}

* The Back Office sections related to the CMS pages do not provide any relevant information about templates and slots. 


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                                                <li><a href="https://documentation.spryker.com/docs/coremedia-with-templates-slots" class="mr-link">Learn about the CoreMedia technology partner integration</a></li>
                                <li><a href="https://documentation.spryker.com/docs/cms-feature-integration-guide " class="mr-link">Enable templates and slots in your project by integrating the CMS feature</a></li>
                                <li><a href="https://documentation.spryker.com/docs/howto-create-a-visibility-condition-for-cms-blocks" class="mr-link">Learn how to create a visibility condition</a></li>                
                <li><a href="https://documentation.spryker.com/docs/mg-cms-block#upgrading-from-version-2---to-version-3--" class="mr-link">Migrate the CmsBlock module from version 2.* to version 3.*</a></li>
                                <li><a href="https://documentation.spryker.com/docs/migration-guide-cmsblockstorage#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the CmsBlockStorage module from version 1.* to version 2.*</a></li>
                                                <li><a href="https://documentation.spryker.com/docs/migration-guide-cmsblockwidget#upgrading-from-version-1---to-version-2--">Migrate the CmsBlockWidget module from version 1.* to version 2.*</a></li>
            </ul>
        </div>
      <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title">Back Office User</li>
                                <li><a href="https://documentation.spryker.com/docs/coremedia-with-templates-slots" class="mr-link">Learn about the CoreMedia technology partner integration</a></li>
                                <li><a href="https://documentation.spryker.com/docs/adding-content-to-storefront-pages-using-templates-slots" class="mr-link">Add content to Storefront using templates and slots</a></li>
                                <li><a href="https://documentation.spryker.com/docs/managing-slots" class="mr-link">Manage slots</a></li>
            </ul>
        </div>  
</div>
</div>
            </ul>
        </div>  
</div>
</div>

## See next

* [Email as a CMS block](https://documentation.spryker.com/docs/email-as-a-cms-block)
