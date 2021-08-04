---
title: Coremedia with Templates & Slots
originalLink: https://documentation.spryker.com/v5/docs/coremedia-with-templates-slots
redirect_from:
  - /v5/docs/coremedia-with-templates-slots
  - /v5/docs/en/coremedia-with-templates-slots
---

## General Information
{% info_block infoBox %}
This document describes how the Templates & Slots feature works with the CoreMedia technology partner. Make sure to check out the [Templates & Slots Feature Overview](https://documentation.spryker.com/docs/en/templates-slots-feature-overview 
{% endinfo_block %} that provides basic information about the feature before you proceed.)

The Templates & Slots feature enables content managers to embed the content created in the CoreMedia CMS editor into any Storefront page.  In the Back Office, a content manager can embed the content into any Storefront page. The embedded content is rendered by the [Slot Widget](https://documentation.spryker.com/docs/en/templates-slots-feature-overview#slot-widget). 

Slot is the space in a page into which the content created in the CoreMedia CMS editor will be placed. There is a number of slots shipped by default with the Templates & Slots feature. All of them are configured to fetch content from [CMS blocks](https://documentation.spryker.com/docs/en/cms-block). If you want to use them, re-import the slot list <!-- link to https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1010237647/WIP+Data+Importers+CMS-2467 --> specifying CoreMedia as their content provider. All the new slots that you import should have CoreMedia as it's content provider too.

When CoreMedia is set as the slot content provider:

* slots embed content created in the CoreMedia CMS editor;
* CoreMedia fetches the catalog (information about products categories in Spryker) from your project via Spryker Glue API;
* Slot Widget fetches content from CoreMedia via CoreMedia API;
* the content is fetched from CoreMedia in the form of HTML code ready for rendering on Storefront by the Slot Widget.
* templates with slots are managed in the **Back Office > Slots** section.

The schema below shows how content is managed with the help of templates with slots when CoreMedia is the content provider:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Content+Management/CoreMedia/Coremedia+with+Templates+%26+Slots/coremedia-flow.png){height="" width=""}

## Slot Widget
Slot widget is used to fetch the content created in the CoreMedia CMS editor and render it in specified Storefront pages. Content is fetched in the form of HTML code ready to be rendered in the Storefront. Slot widget is used by inserting it into a template which is applied to a page subsequently.

A CoreMedia slot widget template looks as follows:

```json
{% raw %}{%{% endraw %} cms_slot "cms-slot-key" autofilled ['autofilledProperty', 'autofilledProperty'] required ['requiredProperty'] with {
    requiredProperty: 'requiredProperty.value',
    additionalProperty: 'additionalProperty.value'
} {% raw %}%}{% endraw %}
```

### Spryker Catalog
When creating content in CoreMedia editor, you have access to the store catalog data via Glue API and the content manger can include the store catalog data into pages when creating content. The catalog contains the data related to products and categories - name, price, images, description, availability, category assignment, category ID etc. When content with included catalog data is saved, the catalog data is not saved on CoreMedia server. Instead, when rendering content on the Storefront, slot widget fetches information about the catalog data which needs to be rendered together with the content created in CoreMedia. Based on the information about catalog data received, slot widget fetches the store catalog data locally and renders it together with the content created in CoreMedia.

### Properties
To support CoreMedia the following additional slot widget properties are introduced:

* view
* placement

In the CoreMedia editor, page content is divided into placements. The placement property is used to specify the placement the content of which you want to fetch. If no placement is specified, the slot widget fetches the content of all page placements.

The view  property is used by slot widget to fetch metadata from CoreMedia.

{% info_block infoBox "Info" %}
For the `store` and `locale` properties to work correctly, make sure to set up mapping between store and locale names in your project and CoreMedia admin panel as described in this guide. <!-- link to https://spryker.atlassian.net/wiki/spaces/DOCS/pages/997458340/WIP+CMS+Slot+With+CoreMedia+Content+Integration+-+ongoing -->
{% endinfo_block %}

### Content Slot Widgets
**Category Pages**
To fetch content created for a category page, you can use the categoryID property. Find an example of a generic slot widget for category pages below.

```json
{% raw %}{%{% endraw %} cms_slot "slt1" autofilled ['store', 'locale'] required ['categoryId'] with {
    categoryId: data.category,id_category,
    placement: 'placement1'
} {% raw %}%}{% endraw %}
```

**Product Details Pages**
To fetch content created for a product details page, you can use the productID property. Find an example of a generic slot widget for product details pages below.

```json
{% raw %}{%{% endraw %} cms_slot "slt5" autofilled ['store', 'locale'] required ['productId', 'placement'] with {
    productId: data.product.getIdProductAbstract,
    placement: 'product-detail'
} {% raw %}%}{% endraw %}
```

**CMS Pages**
To fetch content created for a CMS page, you can use the pageID property. Unlike category and product details pages, there is only one slot widget in a template used to fetch all the content of a page. The placement property is not used in templates for CMS pages. Find an example of a generic slot widget for CMS pages below.

```json
{% raw %}{%{% endraw %} cms_slot "content" autofilled ['store', 'locale'] required ['pageId'] with {
    pageId: app.request.pathinfo
} {% raw %}%}{% endraw %}
```

{% info_block errorBox "Note" %}
Currently, fetching the list of CMS pages from your project is not supported. To map CMS pages with the pages created in CoreMedia, make sure that CMS page URLs correspond to the **External URL Path** values in the **Navigation** tab of the corresponding pages in CoreMedia panel.
{% endinfo_block %}

### Meta Data Slot Widgets
To fetch metadata from Coremedia for any page type, use the view additional property. All the other properties should remain intact depending on the page type. You can find examples of the slot widgets for all page types below.

**Category**

```json
{% raw %}{%{% endraw %} cms_slot "slt1" autofilled ['store', 'locale'] required ['categoryId', 'view'] with {
    categoryId: data.category.id_category,
    view: 'metadata'
} {% raw %}%}{% endraw %}
```

**Product details page**

```json
{% raw %}{%{% endraw %} cms_slot "slt1" autofilled ['store', 'locale'] required ['productId', 'view'] with {
    productId: data.product.getIdProductAbstract,
    view: 'metadata'
} {% raw %}%}{% endraw %}
```

**CMS Page**

```json
{% raw %}{%{% endraw %} cms_slot "slt1" autofilled ['store', 'locale'] required ['pageId', 'view'] with {
    pageId: data.category.id_category,
    view: 'metadata'
} {% raw %}%}{% endraw %}
```

<!-- add to related articles:
See also:

Templates & Slots Feature Overview
Managing slots
-->
