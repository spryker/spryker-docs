---
title: Define filter preferences
description: Learn how to create category filters and define preferences in the Back Office
last_updated: Aug 2, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-filter-preferences
originalArticleId: a12072b2-b53e-4cf6-8ef1-f94c08cdc6ef
redirect_from:
  - /2021080/docs/managing-filter-preferences
  - /2021080/docs/en/managing-filter-preferences
  - /docs/managing-filter-preferences
  - /docs/en/managing-filter-preferences
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/search-and-filters/managing-filter-preferences.html
  - /docs/pbc/all/search/202311.0/manage-in-the-back-office/filter-preferences/define-filter-preferences.html
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/filter-preferences/define-filter-preferences.html
related:
  - title: Standard filters overview
    link: docs/pbc/all/search/latest/base-shop/search-feature-overview/standard-filters-overview.html
---

This document describes how to create filters and define preferences for them in the Back Office.

## Prerequisites

1. [Create a product attribute](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html) for the filter that you are going to create.
2. [Assign the product attribute to a product variant](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/assign-product-attributes-to-product-variants.html) or [assign the product attribute to an abstract product](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/assign-product-attributes-to-abstract-products-and-product-bundles.html).
3. To start working with category filter, go to **Merchandising&nbsp;<span aria-label="and then">></span> Filter Preferences**.

Review the [reference information](#reference-information-create-a-category-filter-and-define-its-filter-preferences) before you start, or look up the necessary information as you go through the process.

## Create a category filter and define its filter preferences

1. On the **Filter Preferences** page, click **Create filter**.
2. On the **Create Filter** page, enter an **ATTRIBUTE KEY**.
3. Select a **FILTER TYPE**.
4. Enter a **FILTER NAME** for each locale.
5. Click **Save**.
    This opens the **View Filter** page with a success message displayed.
6. Optional: Sync the filter preferences of the category filter you've created with the other filters:
    1. Click **List of filters**.
    2. On the **Filter preferences** page, click **Synchronize filter preferences**.
       This refreshes the page with a success message displayed.

## Reference information: Create a category filter and define its filter preferences

| ATTRIBUTE | DESCRIPTION |
|-|-|
| ATTRIBUTE KEY | A [product attribute](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html) the values of which will be used to filter products. |
| FILTER TYPE | Defines how customers select filter values. For more details, see [Filter types](/docs/pbc/all/search/latest/base-shop/search-feature-overview/standard-filters-overview.html#filter-types).  |
| FILTER NAME | Name of the filter to be displayed on the Storefront. |



## Next steps

- [Reorder filter preferences](/docs/pbc/all/search/latest/base-shop/manage-in-the-back-office/filter-preferences/reorder-filter-preferences.html)
- [Assign and dessign filters from categories](/docs/pbc/all/search/latest/base-shop/manage-in-the-back-office/category-filters/assign-and-deassign-filters-from-categories.html)
