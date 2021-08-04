---
title: Category Management Feature Overview
originalLink: https://documentation.spryker.com/v5/docs/category-management-feature-overview
redirect_from:
  - /v5/docs/category-management-feature-overview
  - /v5/docs/en/category-management-feature-overview
---

The Category Management feature serves a double purpose. On the one hand, it allows shop administrators to structure their products into a logical system where each product belongs to a category or a set of interrelated categories. On the other hand, this enables customers to easily navigate the front end and locate desired products quickly.

A category is a set of products which share a common attribute and, therefore, can be united logically. Categories are managed in the **Back Office > Category** section. 
![gui-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/gui-category.png){height="" width=""}

## Parent and Child Categories
When there is a big number of products in a shop, it's essential to build a category tree to structure product catalog and enable customers to easily locate exactly what they want. This can be done with the help of **parent** and **child** categories.

In hierarchical terms, a **parent category** is the one, that apart from having products assigned to it, has other categories assigned to it too.

A **child category**, is the one that is assigned to another category. The latter is considered a parent category for the earlier child one.

Products, belonging to a child category which is assigned to a parent one, belong to the parent category too.

In the front end, in comparison to parent category names, child category names are indented so that they can be identified.

The screenshot below shows that the parent category "Cameras & camholders" has the "Digital Cameras", "Camcorders", "Actioncams", and "Dashcams" child categories assigned to it. The "Cameras & camholders" category does not have a parent category.

![parent-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/parent-category.png)

In the screenshot below, the "Tablets" child category is assigned to "Computers" parent category. The "Tablets" category does not have any child categories assigned to it.

![child-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/child-category.png){height="" width=""}

You can assign new child categories to a parent one in the **Back Office > Category** section using the **Add category to this node** action. For more details, see [Creating Categories](https://documentation.spryker.com/docs/en/creating-categories).

![add-new-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/add-new-category.png){height="" width=""}

Existing child categories are assigned to a parent one in a different way from the **Back Office > Category section > Edit Category** page.

![add-existing-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/add-existing-category.png){height="" width=""}

You can assign a category to several parent ones using the **Additional Parents** form.

For example, the "Smart watches" category is assigned to the "Product Bundles" and "Smart Wearables" categories (see the screenshot below).

![multiple-parents.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/multiple-parents.png){height="" width=""}

The order of child categories shown in the category tree in the front end can be manually resorted in the **Back Office > Category** section using the **Re-sort child categories** action. For more information, see [Managing Categories](https://documentation.spryker.com/docs/en/managing-categories).

## Category Templates
In the front end, a category can be represented by different templates which are used in different scenarios. In the back end, category template is specified in the **Back Office > Category section > Edit Category page > General information** tab. For more details on category template assignment, see [Creating Categories](https://documentation.spryker.com/docs/en/creating-categories).

### Catalog
{% info_block infoBox %}
If not specified otherwise, upon category creation, the catalog Category template is selected by default.
{% endinfo_block %}

For example, the "Fujitsu ESPRIMO E420", "Lenovo ThinkStation P900", and "Fujitsu CELSIUS M740" products are assigned to the "PCs & Workstations" category with the Catalog template (see the screenshot below).

![catalog.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/catalog.png){height="" width=""}

### Catalog + CMS Block
This category template allows you to show the products that are assigned to this category and one or more CMS blocks.

The screenshot below illustrates how the same category displays assigned products and a CMS block with the Catalog + CMS block template.

![catalog-cms-block.png](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/catalog-cms-block.png){height="" width=""}

### CMS Block
There might be situations when you wouldn't need to show any products, but one or more CMS blocks instead. This template does just that.

The screenshot below illustrates how the same category displays a CMS block.

![cms-block.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/catalog-cms-block.png){height="" width=""}

### Sub Categories Grid
This category template shows the child categories assigned to this category apart from showing them in the category tree. It makes it easier to navigate product catalog when there are more than two hierarchy levels.

For example, the "Computers" category displays the "Notebooks", "PCs & Workstations", and "Tablets" child categories assigned to it using the Sub Categories grid template (see the screenshot below).

![sub-categories-grid.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/sub-categories-grid.png){height="" width=""}

The images, which are shown in the front end when the sub categories grid category template is chosen, are added in the **Back Office > Category section> Edit Category page > Image** tab. For more details, see [Creating Categories](https://documentation.spryker.com/docs/en/creating-categories).

## Current Constraints
Currently, the Category Management feature has the following functional constraints which are going to be resolved in the future:

* Categories are shared across all the stores of a project
*  You cannot restrict availability of a category to a store
* A category page is accessible via the same URL across all the stores
* Category URLs are locale dependent
* Category URLs are available in all the stores that share the same locales
