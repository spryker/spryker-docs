---
title: Category Management feature overview
originalLink: https://documentation.spryker.com/2021080/docs/category-management-feature-overview
redirect_from:
  - /2021080/docs/category-management-feature-overview
  - /2021080/docs/en/category-management-feature-overview
---

A category is a set of products that share a common attribute and, therefore, can be united logically. The *Category Management* feature allows Back Office users to structure products into a logical system where each product belongs to a category or set of interrelated categories. You can [assign categories to all or individual stores](https://documentation.spryker.com/docs/assigning-products-to-categories) from the Back Office or [import stores for categories](). For details on how a Back Office user can group products under categories, see [Assigning products to categories](https://documentation.spryker.com/docs/assigning-products-to-categories).

## Root, parent, and child categories

The product catalog is structured in a category tree, which consists of root, parent, and child categories. 

A *root category* is a base category that stands on top of the category hierarchy. Product and child categories are assigned to root categories, but root categories can not be assigned to anything. Also, a store can only be linked to one root category tree, while a root category tree can be linked to multiple stores. Root categories are added through [data import](https://documentation.spryker.com/docs/file-details-categorycsv) and cannot be created in the Back Office, unlike other categories, which can be added in both ways.

A parent category is a category that has products and other categories assigned to it. Categories, assigned to parent categories are referred to as child categories. Products belonging to a child category that is assigned to a parent one belong to the parent category too. You can assign child categories to parent ones via the Back Office or by importing the categories. For information on how to create child categories for the parent categories, see [Creating categories](https://documentation.spryker.com/docs/assigning-products-to-categories) and [Managing categories](https://documentation.spryker.com/docs/creating-categories). For information on how to import the child categories, see [File details: category.csv](https://documentation.spryker.com/docs/file-details-categorycsv). 

On the Storefront, in comparison to parent category names, child category names are indented so that they can be identified.

In the image below, the Cameras & Camcorders parent category has the Digital Cameras, Camcorders, Actioncams, and Dashcams child categories. Cameras & Camcorders is a root category, so it cannot have a parent one.

![parent-category.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Catalog+Management/Category+Management/Category+Management+Feature+Overview/parent-category.png)


## Category templates

A Back Office user defines the visual representation of a category on the Storefront by assigning a template to the category. For information on how to do that, see [Creating categories](https://documentation.spryker.com/docs/creating-categories).

For more information about types of category templates, see [Category page template types](https://documentation.spryker.com/docs/creating-categories#category-page-template-types).

## Category filters

Through category filters, you can locale items better and add customizable category filters to the catalog pages on the Storefront. They also allow you to add, rearrange, and define filters for any given parameter in the category tree, such as price or brand. For details on how a Back Office user can add and manage category filters, see Managing category filters.

### Filter preferences

The default filter functionality includes s*tandard filters* and *dynamic filters and facers*.

#### Standard filters

On the Storefront, the standard filters allow buyers to narrow down the search results by filtering products according to the specified price range, product ratings, product labels, color, material, brand, etc. For more details about standard filters, see [Standard filters](https://documentation.spryker.com/docs/standard-filters).

#### Dynamic filters and facets

Compared to standard filters, dynamic filters and facets allow creating more advanced filter options. For example, you can customize facet filters for any product attribute: the design, quantity of filters, or order criteria by which filters are displayed on the Storefront. For more details on how to configure the filter preferences in the Back Office, see [Managing filter preferences](https://documentation.spryker.com/docs/managing-filter-preferences).

## Video tutorial
Check out this video on managing categories:
<iframe src="https://fast.wistia.net/embed/iframe/g3l3c7xt93" title="Category Management" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="720" height="480"></iframe>

## Current constraints

Currently, the Category Management feature has the following functional constraints, which are going to be resolved in the future:

* A category page is accessible via the same URL across all the stores. If the category is not available in the given store, the URL will lead to a 404.
* Root categories cannot be created in the Back Office. They are imported through CSV files.

* A store can only be linked to one root category tree, but in the future, a store will be able to have multiple root category trees.
* Category URLs are locale-dependent.
* Category URLs are available in all the stores that share the same locales.
* Price Range Filter is not supported with merchant relations. That is why this filter is not included in the [B2B demo shop](https://documentation.spryker.com/docs/b2b-suite%). However, in the [B2C demo shop](https://documentation.spryker.com/docs/en/b2c-suite), you can still filter the products using the price range filter.




## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/ht-manage-a-big-number-of-categories" class="mr-link">Manage a big number of categories</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-categorycsv" class="mr-link">Import categories</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-category-templatecsv" class="mr-link">Import category templates</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-category-storecsv" class="mr-link">Import store relations for categories</a></li>
                <li><a href="https://documentation.spryker.com/docs/retrieving-category-trees" class="mr-link">Retrieve category trees via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/retrieving-category-nodes" class="mr-link">Retrieve category nodes via Glue API</a></li>          
                <li><a href="https://documentation.spryker.com/docs/glue-api-category-management-feature-integration" class="mr-link">Integrate  Category Management Glue API</a></li>
                 <li>Integrate the Category Management feature:</li>
                <li><a href="https://documentation.spryker.com/docs/category-management-feature-integration" class="mr-link">Integrate the Category Management feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/product-category-feature-integration" class="mr-link">Integrate the Product + Category Management feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/cms-category-management-feature-integration" class="mr-link">Integrate the CMS + Category Management feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/cms-category-management-feature-integration" class="mr-link">Integrate the Catalog + Category Management feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/migration-guide-categorygui" class="mr-link">Migrate the CategoryGui module from version 1* to version 2*</a></li>
                 <li><a href="https://documentation.spryker.com/docs/migration-guide-category#upgrading-from-version-3---to-version-4--" class="mr-link">Migrate the Category module from version 3* to version 4*</a></li>
                <li><a href="https://documentation.spryker.com/docs/migration-guide-category#upgrading-from-version-4---to-5--" class="mr-link">Migrate the Category module from version 4* to version 5*</a></li>
                <li><a href="https://documentation.spryker.com/docs/migration-guide-categorypagesearch" class="mr-link">Migrate the CategoryPageSearch module from version 1* to version 2*</a></li>
                <li><a href="https://documentation.spryker.com/docs/migration-guide-categorystorage" class="mr-link">Migrate the CategoryStorage module from version 1* to version 2*</a></li>
                <li><a href="https://documentation.spryker.com/docs/migration-guide-productcategorystorage" class="mr-link">Migrate the ProductCategoryStorage module from version 1* to version 2*</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/creating-categories" class="mr-link">Create a category</a></li>
                 <li><a href="https://documentation.spryker.com/docs/assigning-products-to-categories" class="mr-link">Assign products to categories</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-categories" class="mr-link">Manage categories</a></li>
            </ul>
        </div>
    </div>
</div>
