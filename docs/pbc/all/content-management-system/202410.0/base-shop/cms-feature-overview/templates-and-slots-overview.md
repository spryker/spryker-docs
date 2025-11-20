---
title: Templates and Slots overview
description: Templates with slots is a powerful way to manage the content of your shop.
last_updated: Jul 22, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/templates-and-slots-overview
originalArticleId: d9a2e5ab-33c9-4d63-ac38-8b86c0a17f97
redirect_from:
  - /2021080/docs/templates-and-slots-overview
  - /2021080/docs/en/templates-and-slots-overview
  - /docs/templates-and-slots-overview
  - /docs/en/templates-and-slots-overview
  - /docs/scos/user/features/202311.0/cms-feature-overview/templates-and-slots-overview.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/cms-feature-overview/templates-and-slots-overview.html

---

*Templates and Slots* lets content managers effectively and coherently interact with content using a dedicated template in Spryker—a template with slots. In the Back Office, a content manager has access to all the Storefront pages and can easily embed content into them. The embedded content is rendered by the [Slot Widget](#slot-widget).

{% info_block infoBox %}

Templates and slots is a complex functionality that works in conjunction with other functionalities. To use it effectively, make sure you get familiar with the functionalities in the order they are presented:
- [CMS Page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-pages-overview.html)
- [CMS Block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html)
- [Content Items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html)

{% endinfo_block %}


## General Information

Managing content with the help of templates with slots involves four separate entities:
- Template
- Slot
- CMS Block
- Content Item

The following Storefront page breakdown shows the arrangement of the entities.

![image](https://confluence-connect.gliffy.net/embed/image/a7cad21d-e586-4c8f-92d5-9095071e3e8d.png?utm_medium=live&utm_source=custom)

## Template

Template is a [Twig](https://twig.symfony.com/) file that, when applied to a page, defines its design and layout. Template with slots is a template that defines the layout of slots across a page and has at least one slot assigned.

<details><summary>Template representation—Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/storefront-+template.png)

</details>

The following templates with slots are shipped with the CMS feature:
- Home page template
- Category page template
- Product details page template
- CMS page template

A content manager can [manage templates with slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-slots.html) in the Back Office, in **Content Management&nbsp;<span aria-label="and then">></span> Slots**.
<details><summary>Template representation—the Back Office</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/back-office-template.png)


</details>

To learn about the creation of CMS templates, see [HowTo: Create CMS templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html).



## Slot

*Slot* is a configurable space for content in a template. Unlike a template that is an actual file, a slot exists only as an entry in the database. To embed content into a slot, a slot widget is inserted into the template file to which the slot is assigned. The slot widget position in regard to the rest of the code in the template defines the position of the slot in the page.

<details><summary>Slot representation—Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/storefront-slot.png)


</details>

Each template with slots shipped by default has a number of slots. A developer can change the position of an existing slot by changing the position of the corresponding slot widget in the template.

By importing a [slot list](#slot-list), a developer can do the following:
- Add more slots to existing templates.
- Delete slots.
- Define slot configurations.

A content manager can [manage slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-slots.html) in the Back Office, in **Content Management&nbsp;<span aria-label="and then">></span> Slots**.

<details><summary>Slot representation—the Back Office</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/back-office-slot.png)


</details>

## CMS block

[CMS block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html), from the perspective of the templates and slots, is a piece of content that is inserted into a slot. When a CMS block is inserted into a slot, its content is displayed on the Storefront page space belonging to the slot. The position of CMS blocks on a page can be defined by a content manager in the Back Office.

<details><summary> CMS block representation—Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/storefront-cms-block.png)


</details>

A content manager can [manage CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-slots.html) in the Back Office, in **Content Management&nbsp;<span aria-label="and then">></span> Slots**.


<details><summary> CMS block representation—the Back Office</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/back-office-cms-block.png)


</details>


CMS Block is a separate entity with a dedicated section in the Back Office. To learn what a content manager can do with CMS blocks in the Back Office, in **Content Management&nbsp;<span aria-label="and then">></span> Blocks** section, see [Creating CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html).


## Content item

[Content Item](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html) is the smallest content unit in Spryker that is used in the WYSIWYG editor when creating content for CMS blocks. When a CMS block is inserted into a slot, all the content items of the CMS block are displayed on the Storefront page space of the slot.

<details><summary>Content item representation—Storefront</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/storefront-content-item.png)

</details>

From the perspective of templates and slots, a content item always comes as a part of the CMS block. That's why there is no place to manage it in the **Slots** section.
To learn what a content manager can do with content items in the Back Office&nbsp;<span aria-label="and then">></span> **Content Management&nbsp;<span aria-label="and then">></span> Content Items** section, see [Content Items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html).

### <a name="applying-templates-with-slots"></a>Applying templates with slots

A template with slots can be applied to any page. Even though a content manager can manage all page types in the Back Office, they can only apply templates with slots to the following:

- Category pages in the Back Office&nbsp;<span aria-label="and then">></span> **Category&nbsp;<span aria-label="and then">></span> Create category** section. For more information, see [Create categories](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/categories/create-categories.html).
- CMS pages in the Back Office&nbsp;<span aria-label="and then">></span> **Pages&nbsp;<span aria-label="and then">></span> Create new CMS page** section. For more information, see [Creating a CMS Page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/create-cms-pages.html).

A developer can apply templates with slots to all the other page types.

## Correlation

The correlation between templates and slots is defined by importing template and slot lists into the database. Learn how to [import these lists](/docs/dg/dev/data-import/{{page.version}}/data-importers-implementation.html).

Using the information from the imported lists, the Slot Widget can understand which slots are assigned to a template, and from where to fetch content for each slot.

{% info_block infoBox %}

Without correlation defined correctly, Slot Widget may fail to render embedded content correctly.

{% endinfo_block %}

When the lists are imported, the following applies:

- The information defined in them is reflected and can be managed in the Back Office&nbsp;<span aria-label="and then">></span> **Content Management&nbsp;<span aria-label="and then">></span> Slots**.
- By managing this information, a content manager adds content to Storefront.

### Template list

The template list contains the following information:

| PROPERTY | DESCRIPTION | EXAMPLE VALUES |
| --- | --- | --- |
| ID | Numeric identifier of template. | 3 |
| template path | Path to the Twig file template in a project. | `@ShopUI/templates/page-layout-main/page-layout-main.twig` |
| name | Alphabetical template identifier. It is shown in the Back Office. | "Home Page" |
| description | Template description. It is shown in the Back Office. | "The layout of Slots in the Home Page, always below Store Header including Navigation, and above Store Footer." |

Note the following:
- If a template has only inactive slots, it's still considered a template with slots. Therefore, it's shown in the **Slots** section.
- If a template is on an imported template list but does not have a slot, it's not considered a template with slots. Therefore, it's not displayed in the **Slots** section.

### Slot list

The slot list contains the following information:

| PROPERTY | DESCRIPTION | EXAMPLE VALUES |
| --- | --- | --- |
| ID | Numeric identifier of slot. | 5 |
| template path | Path to the template to which the slot is assigned. | `@ShopUI/templates/page-layout-main/page-layout-main.twig` |
| slot key | Unique identifier of the slot that is used by slot widget when rendering the content of this slot. | slt-11 |
| content provider | Defines the source of content of this slot. | SprykerCmsSlotBlock |
| name | Alphabetical identifier of the slot. It is shown in the Back Office. | "Header Top" |
| description | Description of the slot. It is shown in the Back Office. | "A content area in the Header section, that is below the logo and search section and above main navigation" |
| status | Defines whether the slot is active or not where "0" stands for "inactive" and "1" stands for "active". If a slot is inactive, it's not rendered in the Storefront by the slot widget. | 1 |

## Content providers

A content provider is a source from which Slot Widget fetches content to embed into slots and, subsequently, render it in the Storefront. With templates and slots, you can use slots to embed the content created in your Spryker project or CMS editors of technology partners (for example, [CoreMedia](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/third-party-integrations/coremedia.html), [E-spirit](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/third-party-integrations/e-spirit.html), [Styla](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/third-party-integrations/styla.html), [Magnolia](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/third-party-integrations/magnolia.html)).

With templates and slots, the following applies:

- Spryker CMS Blocks is the content provider for all the slots.
- Slots embed content from [CMS Blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html).
- Content for CMS blocks is created in the WYSIWYG Editor.
- Templates with slots are managed in the Back Office&nbsp;<span aria-label="and then">></span> **Slots** section.

The following schema shows how content is managed with the help of templates with slots:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/templates-and-slots.png)

## Visibility conditions

When the content manager assigns a CMS block to a slot, it's displayed on all the pages to which the template with the slot is applied. To narrow down the number of pages to a needed selection, the content manager can define visibility conditions for each CMS block assigned to a slot. Visibility conditions are defined by selecting particular pages in which the content of a CMS block will be displayed. When visibility conditions are defined, the slot widget checks if the CMS block must be rendered in an opened page or not. Then, it either renders or skips it.

Page identifiers used to define visibility conditions depend on the page type to which a template with slots is applied. You can check identifiers for each page type in the following table.

| PAGE TYPE/IDENTIFIER | PRODUCT ID | CATEGORY ID | CMS PAGE ID |
| --- | --- | --- | --- |
| Home/Cart/Order Confirmation  | - | - | - |
| Product details page | &check; | &check; | - |
| Category page | - | &check; | - |
| CMS page | - | - | &check; |



{% info_block infoBox "Product details page" %}

For product details page type, you can use the Product ID or Category ID identifiers. Category ID is a collective identifier. By selecting a category, the content manager selects all the products that are [assigned to the category](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/categories/assign-products-to-categories.html).

{% endinfo_block %}

To meet your project requirements, you can extend the visibility conditions functionality by adding more conditions, like Customer ID, Customer Group ID, or Navigation Nodes. To learn more, see [HowTo: Create Visibility Conditions for CMS Blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-a-visibility-condition-for-cms-blocks.html).


A content manager can define visibility conditions by [selecting pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-slots.html#selecting-pages) in the Back Office, in **Content Management&nbsp;<span aria-label="and then">></span> Slots**.

A developer can [import visibility conditions](/docs/dg/dev/data-import/{{page.version}}/data-importers-implementation.html).

## Slot widget

Slot widget is used to fetch content from a content provider and render it on specified pages. Content is fetched in the form of HTML code ready to be rendered in the Storefront. With the help of slot widgets, you can fetch and render content from the following content providers:

- [CoreMedia](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/third-party-integrations/coremedia.html)
- [Spryker CMS Blocks](#spryker-cms-blocks)


### Slot widget configuration

Slot widget is used by inserting it into a template which is applied to a page subsequently.

A slot widget template looks as follows:

```twig
{% raw %}{%{% endraw %} cms_slot 'cms-slot-key' with {
    Property: 'Property.value',
} {% raw %}%}{% endraw %}
```

### Properties

Properties are used by slot widgets to identify for which entity content is being fetched. At the same time, all the content that is meant to be fetched by a slot widget can be identified using the same properties on the side of the content provider. When a slot widget makes a request to fetch content from a content provider, it passes the property values and fetches what the content provider returns to render it on the specified page. You can find the list of exemplary properties with descriptions in the table:

| PROPERTY | SPECIFICATION |
| --- | --- |
| Slot key | Unique slot identifier. Using this identifier, slot widget fetches all the information about slot from storage. |
| Store name | Store name from which content is fetched. |
| Locale | Store locale for which content is fetched. |
| Category ID | Numeric identifier of the category page for which content is fetched. |
| Product ID | Numeric identifier of the product details page for which content is fetched. |
| CMS page ID | Numeric identifier of the CMS page for which content is fetched. |

You can add other properties to meet your project or external content provider requirements.

#### Property Types

Properties can be either `required` or `autofilled`. If a property is of the required type, it's entered manually and the slot widget does not render the content if one of the required values is not filled. If a property is of the auto-filled type, when sending a request to fetch content, the slot widget fills this value based on the page opened on the Storefront and fetches the corresponding content. For example, if you want a slot widget to fill `locale` and `store` values automatically, it looks as follows:

```twig
{% raw %}{%{% endraw %} cms_slot "cms-slot-key" autofilled ['locale', 'store'] required ['requiredProperty'] with {
    requiredProperty: 'requiredProperty.value',
    additionalProperty: 'additionalProperty.value'
} {% raw %}%}{% endraw %}
```

{% info_block infoBox %}

If there is no content to provide on the side of the content provider based on the specified properties, the slot widget renders a blank space in the Storefront.

{% endinfo_block %}

#### Contextual variables

To avoid entering particular identifies of Spryker entities as property values, you can use contextual variables. When such a property is used, the slot widget identifies the property value depending on the page opened on the Storefront and fetches the corresponding content. The following example shows contextual variables.

| PROPERTY | PROPERTY VA;UE EXAMPLE |
| --- | --- |
| `idCategory` | `data.category`,`id_category` |
| `idProductAbstract` | `data.product.idProductAbstract` |
| `idCmsPage` | `data.idCmsPage` |

### Correlation

Using the slot key property, the slot widget retrieves slot information from storage and interprets its attributes in the following way.

| ATTRIBUTE | RELEVANCE | DESCRIPTION |
| --- | --- | --- |
| template path | relevant | Defines the template for which CMS blocks are fetched. |
| slot key | relevant | Identifies the slot for slot widget. |
| content provider | relevant | Defines the content provider from which content is fetched. |
| name | irrelevant | N/A |
| description | irrelevant | N/A |
| status | relevant | Defines if the content fetched for this slot must be rendered on the Storefront. |

### Spryker CMS blocks

This section describes how Slot Widget works with the Spryker CMS Blocks content provider.

{% info_block infoBox %}


- By default, names are used as unique identifiers of CMS blocks while Slot Widget requires keys. To enable Slot Widget to work with CMS blocks, [upgrade](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblock-module.html#upgrading-from-version-2-to-version-3) the `CMSBlock` module in your project for CMS Blocks to have keys.


{% endinfo_block %}

With the Spryker CMS Blocks content provider, a slot widget template looks as follows:

```twig
{% raw %}{%{% endraw %} cms_slot "cms-slot-key" with {
    Property: 'Property.value',
} {% raw %}%}{% endraw %}
```

#### Category pages

To fetch content created for a category page, you can use the `categoryID` property. The following example shows a generic slot widget for category pages.

```twig
{% raw %}{%{% endraw %} cms_slot 'slt-5' with {
    idCategory: data.categoryId,
} {% raw %}%}{% endraw %}
```

#### Product details pages

To fetch content created for a product details page, you can use the `productID` property. The following example shows a generic slot widget for product details pages.

```twig
{% raw %}{%{% endraw %} cms_slot 'slt-7' with {
    idProductAbstract: data.product.idProductAbstract,
} {% raw %}%}{% endraw %}
```

#### CMS pages

To fetch content created for a CMS page, you can use the `pageID` property. Find an example of a generic slot widget for CMS pages below.

```twig
{% raw %}{%{% endraw %} cms_slot 'slt-8' with {
    idCmsPage: data.idCmsPage,
} {% raw %}%}{% endraw %}
```

#### Home page

Unlike category, product details, and CMS pages, the home page does not require any properties since there is usually only one home page in a project. The following example is a generic slot widget for the home page.

```twig
{% raw %}{%{% endraw %} cms_slot 'slt-2' {% raw %}%}{% endraw %}
```

## Database schema—templates with slots and CMS blocks content provider

The following image shows the database schema for templates, slots, and the Spryker CMS content provider:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Templates+%26+Slots/Templates+%26+Slots+Feature+Overview/template-slot-cms-blocks-content-provider.png)

**Structure:**

- CMS Slot has the following:
  - Key—a unique slot identifier.
  - Content provider name.
  - Slot name and description (that describes slot position).
  - Slot status (active or inactive).
- CMS Slot Template has the following:
  - Unique path to a Twig file.
  - Template name and description (that describes the template content).
  - List of slots in the template.
- CMS Slot Block has:
  - CMS Block, CMS Slot, and CMS Slot Template references.
  - Conditions data (that is used to define the pages in which a CMS Block is displayed).
  - Position (that defines the order of assigned CMS blocks).

## Current constraints

{% info_block infoBox %}

The functionality has the following functional constraints which are going to be resolved in the future.

{% endinfo_block %}

- The Back Office sections related to the CMS pages do not provide any relevant information about templates and slots.

## Related Business User documents

|BACK OFFICE USER GUIDES| THIRD-PARTY INTEGRATIONS |
| - | - |
| [Add content to the Storefront using templates and slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-add-content-to-the-storefront-pages-using-templates-and-slots.html) |  [Learn about the CoreMedia technology partner integration](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/third-party-integrations/coremedia.html)  |
| [Manage slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-slots.html)   | |



## See next

- [Email as a CMS block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/email-as-a-cms-block-overview.html)
