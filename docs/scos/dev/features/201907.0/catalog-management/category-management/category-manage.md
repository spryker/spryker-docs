---
title: Category Management Feature Overview
originalLink: https://documentation.spryker.com/v3/docs/category-management-feature-overview
redirect_from:
  - /v3/docs/category-management-feature-overview
  - /v3/docs/en/category-management-feature-overview
---

The Category management feature serves a double purpose. On one hand, it allows shop administrators to structure their products into a logical system where each product belongs to a category or a set of interrelated categories. On the other hand, this enables customers to easily navigate the front end and locate desired products quickly.

A category is a set of products which share a common attribute and, therefore, can be united logically. Categories are managed in the **Back Office > Category** section. 
![gui-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/gui-category.png){height="" width=""}

## Parent and Child Categories
When there is a big number of products in a shop, it's essential to build a category tree to structure product catalog and enable customers to easily locate exactly what they want. This can be done with the help of **parent** and **child** categories.

In hierarchical terms, a **parent category** is the one, that apart from having products assigned to it, has other categories assigned to it too.

A **child category**, is the one that is assigned to another category. The latter is considered a parent category for the earlier child one.

{% info_block infoBox %}
Products, belonging to a child category which is assigned to a parent one, belong to the parent category too.
{% endinfo_block %}

In the front end, in comparison to parent category names, child category names are protruded so that they can be identified.

{% info_block infoBox %}
Parent category "Cameras & camholders" has "Digital Cameras", "Camcorders", "Actioncams" and "Dashcams" child categories assigned to it. The "Cameras & camholders" category does not have a parent category.
{% endinfo_block %})

![parent-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/parent-category.png)

{% info_block infoBox %}
"Tablets" child category is assigned to "Computers" parent category. The "Tablets" category does not have any child categories assigned to it.
{% endinfo_block %}

![child-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/child-category.png){height="" width=""}

You can assign new child categories to a parent one in the **Back Office > Category** section using the **Add category to this node** action. For more details, see [Creating Categories](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/category/creating-catego).

![add-new-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/add-new-category.png){height="" width=""}

Existing child categories are assigned to a parent one in a different way from the **Back Office > Category section > Edit Category** page.

![add-existing-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/add-existing-category.png){height="" width=""}

You can assign a category to several parent ones using the **Additional Parents** form.

{% info_block infoBox %}
"Smart watches" category is assigned to "Product Bundles" and "Smart Wearables" categories.
{% endinfo_block %}

![multiple-parents.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/multiple-parents.png){height="" width=""}

The order of child categories shown in the category tree in the front end can be manually resorted in the **Back Office > Category** section using the **Re-sort child categories** action. For more information, see [Managing Categories](/docs/scos/dev/user-guides/201907.0/back-office-user-guide/category/managing-catego).

## Category Templates
In the front end, a category can be represented by different templates which are used in different scenarios. In the back end, category template is specified in the **Back Office > Category section > Edit Category page > General information** tab. For more details on category template assignment, see [Creating Categories](/docs/scos/dev/user-guides/201907.0/back-office-user-guide/category/creating-catego).

### Catalog
{% info_block infoBox %}
If not specified otherwise, upon category creation, catalog category template is selected by default.
{% endinfo_block %}

{% info_block infoBox %}
"Fujitsu ESPRIMO E420", "Lenovo ThinkStation P900" and "Fujitsu CELSIUS M740" products are assigned to "PCs & Workstations" category with the Catalog template.
{% endinfo_block %}

![catalog.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/catalog.png){height="" width=""}

### Catalog + CMS Block
This category template allows you to show the products that are assigned to this category and one or more CMS blocks.

{% info_block infoBox %}
The same category displays assigned products and a CMS block with the Catalog + CMS block template.
{% endinfo_block %}

![catalog-cms-block.png](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/catalog-cms-block.png){height="" width=""}

### CMS Block
There might be situations where you wouldn't need to show any products, but one or more CMS blocks instead. This template does just that.
{% info_block infoBox %}
The same category displays a CMS block.
{% endinfo_block %}

![cms-block.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/catalog-cms-block.png){height="" width=""}

### Sub Categories Grid
This category template shows the child categories assigned to this category apart from showing them in the category tree. It makes it easier to navigate product catalog when there are more than two hierarchy levels.

{% info_block infoBox %}
"Computers" category displays "Notebooks", "PCs & Workstations" and "Tablets" child categories assigned to it using the Sub Categories grid template.
{% endinfo_block %}

![sub-categories-grid.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/sub-categories-grid.png){height="" width=""}

The images, which are shown in the front end when the sub categories grid category template is chosen, are added in the **Back Office > Category section> Edit Category page > Image** tab. For more details, see [Creating Categories](/docs/scos/dev/user-guides/201907.0/back-office-user-guide/category/creating-catego).

## Current Constraints
{% info_block infoBox %}
Currently, the feature has the following functional constraints which are going to be resolved in the future.
{% endinfo_block %}

* categories are shared across all the stores of a project
*  you can not restrict availability of a category to a store
* a category page is accessible via the same URL across all the stores
* category URLs are locale dependent
* category URLs are available in all the stores that share the same locales
