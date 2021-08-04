---
title: Managing categories
originalLink: https://documentation.spryker.com/2021080/docs/managing-categories
redirect_from:
  - /2021080/docs/managing-categories
  - /2021080/docs/en/managing-categories
---

This topic describes how to manage categories:

* How to define an order according to which the products are going to be displayed.
* How to view, edit, and delete categories.

## Prerequisites

To start managing categories, go to **Catalog** > **Category**.

Each section contains reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.

## Ordering products in categories

You can adjust the order in which products under the category are displayed on the Storefront.
To define the order of displaying products, set the numbers under which each product is to be displayed on the page.

For example, you have ten products assigned to your category. For five of them, there is a seasonal discount applied. So you need those to be at the top of the list.

To change the order of products:

1. In the *Categories* table, for a specific category, select **Assign Products** from the *Actions* drop-down list. You are taken to the Assign products to category page.
2. Scroll down to the *Products in this category* tab.
3. In the *Order* column, set numbers 1-5 for specific products that define the order of products in the category. For example, if you have 5 products, set the numbers from 1 to 5.
:::(Info)
In case you have several products with the identical order number value, the ordering will be performed based on the product name attribute. The product with 0 in the Order column will be displayed at the bottom
:::
4. Click **Save**.

### Reference information: Ordering products in categories

The following table describes the attributes from the *Products in this category* tab.

For the description of all other attributes on the Assign products to category page, see [Assigning products to categories](https://documentation.spryker.com/2021080/docs/assigning-products-to-categories).

| TAB | ATTRIBUTE | DESCRIPTION |
|-|-|-|
| Products in this category |   | Stores products assigned to the category. |
|   | ID | ID of a product assigned to the category. |
|   | SKU | SKU of a product assigned to the category. |
|   | Name | Name of a product assigned to the category. |
|   | Order | Defines the order in which the products are shown on the Storefront. The order starts from "1". |
|   | Selected | Clear checkboxes next to products you want to remove from the given category.  They will be added to the Products to be deassigned table of the Products to be assigned tab.  |

## Editing a category

To edit a category:

1. In the *Categories* table, select **Edit** from the *Actions* drop-down list. 
You are taken to the *Edit category* page.
2. Update the needed values.
3. Click **Save**.

### Reference information: Editing a category

The following tables describe the attributes from the *Edit category* page.

**Settings tab**

| ATTRIBUTE | DESCRIPTION |
|-|-|
| Category key | Value is used to automatically assign products and CMS blocks to your category through the import. |
| Parent | Drop-down list with categories under which your category is displayed in the hierarchical tree. It means that the category being edited is nested under the selected category. Only one value can be selected. |
| Additional Parents | Drop-down list with categories under which your category is located in addition to the parent category. You can select several values. |
| Stores | Stores the given category is assigned to.  |
| Template | Drop-down list with templates that define the look of your category on the Storefront. For details about templates, see Category page template types). |
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

#### Category page template types
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

<details><summary>The Sub Category grid on the Storefront</summary>

![Sub Category grid](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Category/Category:+Reference+Information/sub+category.gif)

</details>

**A template with slots**
:::(Info)
To use a template with slots, make sure the [Templates and slots](https://documentation.spryker.com/docs/cms-feature-integration-guide) feature is integrated into your project.
:::

Select such a template to have slots for this category page. Slots can embed content from CMS Blocks and technology partner integrations. See [Templates and slots](https://documentation.spryker.com/docs/templates-slots-feature-overview) for more details.

## Deleting a category

To delete a category:

 1. In the *Actions* drop-down, select **Delete** next to a specific category. 
You are taken to the *Delete category [Category name]* page.
On *Delete category [Category name]*, you see detailed information about everything that will be de-assigned, moved, or deleted along with that category.
2. Select the checkbox next to **Yes, I am sure** to confirm your awareness and click **Delete**.
    :::(Info) 
    Products assigned to a deleted category are de-assigned and remain in the system. If the same products are assigned to other categories, they stay assigned to those.
    :::
    
:::(Info) 
Child categories of the deleted category are assigned to its parent categories.
:::

**Tips & tricks**
If your category contains any nested categories, you can re-sort them by a simple drag-and-drop action:
1. To get to *Re-sort View*, for a specific category on the table view page, click *Re-sort child categories*.
2. Once in **Re-sort View**, you can drag and drop categories.
3. Once you see the correct order, click **Save**.
