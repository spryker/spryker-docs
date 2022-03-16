---
title: Creating category filters
description: Learn how to create category filters in the Back Office.
last_updated: Aug 2, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-filter-preferences
originalArticleId: a12072b2-b53e-4cf6-8ef1-f94c08cdc6ef
redirect_from:
  - /2021080/docs/managing-filter-preferences
  - /2021080/docs/en/managing-filter-preferences
  - /docs/managing-filter-preferences
  - /docs/en/managing-filter-preferences
related:
  - title: Managing Search Preferences
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/search-and-filters/managing-search-preferences.html
---

This article describes how to create category filters.

## Prerequisites

1. [Create a product attribute](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html) for the filter that you are going to create.
2. Add the product attribute to a product by [creating a product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/abstract-products/creating-abstract-products-and-product-bundles.html) or by [editing a product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/abstract-products/editing-abstract-products.html).
3. To start working with filter preferences, go to **Merchandising** > **Filter Preferences**.


## Creating category filters

1. On the **Filter Preferences** page, click **Create filter**.
2. On the **Create Filter** page, enter an **ATTRIBUTE KEY**.
3. Select a **FILTER TYPE**.   either multi-select or range.
4. Enter a **FILTER NAME** for each locale.
5. Click **Save**.
    This opens the **View Filter** page with a success message displayed.
6. Optional: Start using the filter:
    1. Click **List of filters**.
    2. On the **Filter preferences** page, click **Synchronize filter preferences**.
       This refreshes the page with a success message displayed.


**Tips and tricks**
* There is no way to specify specific categories when creating filters. If, however, products within a category do not contain values for the attribute to which the filter is assigned, the filter does not appear on the Storefront. For example, if you created a category filter, it is assigned to all of the default categories.  However, it only appears for those products on the Storefront that have attributes that this category filter has.

## Reference information: Creating filters

| ATTRIBUTE | DESCRIPTION |
|-|-|
| ATTRIBUTE KEY | A [product attribute](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-attributes-overview.html) to filter a category by. |
| FILTER TYPE | Defines how customers select filter values. For more details, see [Filter types](/docs/scos/user/features/{{page.version}}/search-feature-overview/standard-filters-overview.html#filter-types).  |
| FILTER NAME | Name of the filter to be displayed on the Storefront. |



## Next steps

Once the filter preference is created, you can use it in the **Category Filters** section. That is done to enable specific category(s) to which the product with this attribute is assigned, to be filtered based on this specific filter.

See [Managing category filters](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/search-and-filters/managing-category-filters.html) to know how to set up the category filters.
