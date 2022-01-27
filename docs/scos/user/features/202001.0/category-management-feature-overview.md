---
title: Category Management feature overview
description: The feature allows keeping your product catalog organized and comprehensible for the customers who can easily navigate the storefront and search products quicker
last_updated: Mar 26, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/category-management-feature-overview
originalArticleId: 095932ee-1388-4b58-bb8d-6092831a1856
redirect_from:
  - /v4/docs/category-management-feature-overview
  - /v4/docs/en/category-management-feature-overview
  - /v4/docs/category-management
  - /v4/docs/en/category-management
  - /v4/docs/catalog-management
  - /v4/docs/en/catalog-management
  - /v4/docs/category-pages
  - /v4/docs/en/category-pages
  - /v4/docs/define-category-hierarchy
  - /v4/docs/en/define-category-hierarchy
  - /v4/docs/product-catalog-management
  - /v4/docs/en/product-catalog-management
  - /v4/docs/product-to-category-association
  - /v4/docs/en/product-to-category-association
---

A category is a set of products that share a common attribute and, therefore, can be united logically. The *Category Management* feature allows Back Office users to structure products into a logical system where each product belongs to a category or set of interrelated categories. You can [assign categories to all or individual stores](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/assigning-products-to-categories.html) from the Back Office or [import stores for categories](). For details on how a Back Office user can group products under categories, see [Assigning products to categories](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/assigning-products-to-categories.html).

## Root, parent, and child categories

The product catalog is structured in a category tree, which consists of root, parent, and child categories.

A *root category* is a base category that stands on top of the category hierarchy. Product and child categories are assigned to root categories, but root categories can not be assigned to anything. Also, a store can only be linked to one root category tree, while a root category tree can be linked to multiple stores. 

A parent category is a category that has products and other categories assigned to it. Categories, assigned to parent categories are referred to as child categories. Products belonging to a child category that is assigned to a parent one belong to the parent category too. You can assign child categories to parent ones via the Back Office or by importing the categories. For information on how to create child categories for the parent categories, see [Creating categories](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/assigning-products-to-categories.html) and [Managing categories](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/creating-categories.html).

On the Storefront, in comparison to parent category names, child category names are indented so that they can be identified.

In the image below, the Cameras & Camcorders parent category has the Digital Cameras, Camcorders, Actioncams, and Dashcams child categories. Cameras & Camcorders is a root category, so it cannot have a parent one.

![parent-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/parent-category.png)


## Category templates

A Back Office user defines the visual representation of a category on the Storefront by assigning a template to the category. For information on how to do that, see [Creating categories](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/creating-categories.html).


## Category filters

Through category filters, you can locale items better and add customizable category filters to the catalog pages on the Storefront. They also allow you to add, rearrange, and define filters for any given parameter in the category tree, such as price or brand. For details on how a Back Office user can add and manage category filters, see Managing category filters.

### Filter preferences

The default filter functionality includes s*tandard filters* and *dynamic filters and facers*.

#### Standard filters

On the Storefront, the standard filters allow buyers to narrow down the search results by filtering products according to the specified price range, product ratings, product labels, color, material, brand, etc. For more details about standard filters, see [Standard filters](/docs/scos/user/features/{{page.version}}/search-feature-overview/standard-filters-overview.html).

#### Dynamic filters and facets

Compared to standard filters, dynamic filters and facets allow creating more advanced filter options. For example, you can customize facet filters for any product attribute: the design, quantity of filters, or order criteria by which filters are displayed on the Storefront. For more details on how to configure the filter preferences in the Back Office, see [Managing filter preferences](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/search-and-filters/managing-filter-preferences.html).

## Video tutorial
Check out this video on managing categories:

{% wistia g3l3c7xt93 960 720 %}

## Current constraints

Currently, the Category Management feature has the following functional constraints, which are going to be resolved in the future:

* A category page is accessible via the same URL across all the stores. If the category is not available in the given store, the URL will lead to a 404.
* Root categories cannot be created in the Back Office. They are imported through CSV files.

* A store can only be linked to one root category tree, but in the future, a store will be able to have multiple root category trees.
* Category URLs are locale-dependent.
* Category URLs are available in all the stores that share the same locales.
* Price Range Filter is not supported with merchant relations. That is why this filter is not included in the [B2B demo shop](/docs/scos/user/intro-to-spryker/b2b-suite.html). However, in the [B2C demo shop](/docs/scos/user/intro-to-spryker/b2c-suite.html), you can still filter the products using the price range filter.

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Create a category](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/creating-categories.html) |
| [Assign products to categories](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/assigning-products-to-categories.html) |
| [Manage categories](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/category/managing-categories.html) |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Category management feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/category-management-feature-walkthrough.html) for developers.

{% endinfo_block %}
