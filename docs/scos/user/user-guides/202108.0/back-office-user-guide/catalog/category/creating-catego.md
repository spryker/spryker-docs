---
title: Creating categories
originalLink: https://documentation.spryker.com/2021080/docs/creating-categories
redirect_from:
  - /2021080/docs/creating-categories
  - /2021080/docs/en/creating-categories
---

This topic describes how to create categories.

## Prerequisites

To start creating categories, go to **Catalog** > **Categories**

Review the reference information before you start, or just look up the necessary information as you go through the process.


## Createing a category

To create a category, take the following steps:
1. On the *Category* page, in the top right corner, click **Create category** to open the *Create category* page.
2. In the *Settings* tab, enter and select the attributes for your category.
3. Click **Next** at the bottom of the page, or select the *Images* tab next to *Settings*.
4. In the *Images* tab, add an image to the category:
    1. Click **Add image set**.
    2. Enter the attributes of your image set.
    :::(Info)
    Keep in mind that small images are used when subcategories on the parent category page are displayed as a list, while the large images are used when subcategories are displayed as a grid.
    :::
5. To assign several images or image sets, click **Add image** or **Add image set** respectively, and enter URLs.
    :::(Info)
    Even though you can add several image sets and several images to an image set, out of the box, there is no place in the back end and front end where several image sets or images can be displayed for a category. However, if you still do that, the following logic applies:
    * When adding several image sets, the image set going first or having the name "default" is applied to the category.
    * When adding several images to the image set that is active for the category, the image with the lowest Sort Order field value is applied to the category. If there are several images with the same value, the image which has been added first is applied. The lowest possible value is "0".
    :::
6. Click **Save**.


### Reference information: Createing a category

This section holds reference information related to the category creation process.

#### Category page

On the *Category* page, you see the following:

* Category key, category name, and the parent category to which a specific one is assigned.
* Identifiers for active, visible, and searchable.
* Template type.
* Stores the category is assigned to.
* Actions that you can do in a specific category.

**Settings tab**

| ATTRIBUTE | DESCRIPTION |
|-|-|
| Category key | Value is used to automatically assign products and CMS blocks to your category through the import. |
| Parent | Drop-down list with categories under which your category is displayed in the hierarchical tree. It means that the category being edited is nested under the selected category. Only one value can be selected. |
| Additional Parents | Drop-down list with categories under which your category is located in addition to the parent category. You can select several values. |
| Stores | Stores the given category is assigned to.  |
| Template | Drop-down list with templates that define the look of your category on the Storefront. Ffor details about templates, see Category page template types). |
| Active | Defines if the category is in the active state and is visible on the Storefront. |
| Visible in the category tree | Defines if the category is shown in the menu on the Storefront. |
| Allow to search for this category | Defines if the category is available in search results. |
| Translations | Contains meta details, which are meant to improve search ranking in the search engines. |
| Translations: Name | Name that serves as an ID for the back end. The name that is displayed to the customer on the shop website and is rendered with the help of the category key. |
| Translations: Meta Title | Title that describes the category.  Meta information that is not displayed on the website to the customer but is located in the HTML code of the category page. |
| Translations: Meta Description | Description of the category. Meta information that is not displayed on the website to the customer but is located in the HTML code of the category page. |
| Translations: Meta Keywords | Keywords that are suitable for the category. |

If the CMS-related template is selected, the following additional attributes appear:

| ATTRIBUTE | DESCRIPTION |
|-|-|
| CMS Blocks: top | Defines a CMS Block for a top position. Several values can be selected. |
| CMS Blocks: middle | Defines a CMS Block for a middle position. Several values can be selected. |
| CMS Blocks: bottom | Defines a CMS Block for a bottom position. Several values can be selected. |

**Images tab**

| ATTRIBUTE | DESCRIPTION |
|-|-|
| Image Set Name | Defines the name of the image set, e.g., Default. |
| Small Image URL | URL of the small version of the image. |
| Large Image URL | URL of the large version of the image. |
| Sort Order | Numeric identifier of the image in the order of other images of an image set. This defines the order in which the images are shown in the back end and front end. The order starts from "0". |

#### <a id="category-page-template-types"></a>Category page template types
When you create or update categories, you select a template according to which your category (and products assigned to it ) is going to be displayed in your online store.

The following templates are used to set up your category look:

**Catalog (default)**

Select this template to display all product pages linked to the selected category. The product pages include the general product description, a price, an image, and a clickable **View** button that redirects you to the product details page.

<details><summary>The Catalog(default) template on the Storefront</summary>

![Catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category%3A+Reference+Information/Catalog.gif)

</details>

**Catalog+Slots**
Select this template to show all product pages assigned to the selected category and a CMS Block. Depending on your design requirements, you need to set a specific CMS block and specify where it should be displayed: top, middle, or bottom.

<details><summary>The Catalog+CMS Block template on the Storefront</summary>

![Catalog + Slots](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category%3A+Reference+Information/Catalog%2BCms+Block.gif)

</details>

The category is in the catalog, and two CMS blocks are now displayed on the page: *Tackle Your To-Do's and Build a Space That Spurs Creativity* in the example).

**Sub Category grid**
Select the *Sub Category grid* template to create a multilevel category structure. Here you can assign an image to each subcategory.

<details><summary>The Sub Category grid template on the Storefront</summary>

![Sub Category grid](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category:+Reference+Information/sub+category.gif)

</details>

**A template with slots**


:::(Info)
To use a template with slots, make sure the [Templates and slots](https://documentation.spryker.com/docs/cms-feature-integration-guide) feature is integrated into your project.
:::

Select such a template to have slots for this category page. Slots can embed content from CMS Blocks and technology partner integrations. See [Templates and slots](https://documentation.spryker.com/docs/templates-slots-feature-overview) for more details.

**Tips & tricks**

When you already know the exact parent category under which the category that you create is going to be nested, you can click **Add categoryto this node** for a specific parent category. This redirects you to the *Create category* page where you can perform the steps described above. The only difference is that the *Parent* field is auto-populated with the needed value.

The same products can be assigned to multiple categories.

## Next іteps

[Assign product to categories](https://documentation.spryker.com/2021080/docs/assigning-products-to-categories)
