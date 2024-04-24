---
title: Assign and deassign filters from categories
description: Learn how to assign and deassign filters from categories in the Back Office
last_updated: Jun 16, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-category-filters
originalArticleId: abf8a3db-7cb2-4220-8d26-995c270b0ff9
redirect_from:
  - /2021080/docs/managing-category-filters
  - /2021080/docs/en/managing-category-filters
  - /docs/managing-category-filters
  - /docs/en/managing-category-filters
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/search-and-filters/managing-category-filters.html
  - /docs/pbc/all/search/202311.0/manage-in-the-back-office/category-filters/assign-and-deassign-filters-from-categories.html
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/category-filters/assign-and-deassign-filters-from-categories.html
related:
  - title: Reorder category filters
    link: docs/pbc/all/search/page.version/base-shop/manage-in-the-back-office/category-filters/reorder-category-filters.html
  - title: Category filters overview
    link: docs/pbc/all/search/page.version/base-shop/search-feature-overview/category-filters-overview.html
---

This topic describes how to assign and deassign filters from categories in the Back Office.

## Prerequisites


1. Create the category filters you want to assign. For instructions, see [Define filter preferences](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/filter-preferences/define-filter-preferences.html)
2. To start working with category filters, go to **Merchandising&nbsp;<span aria-label="and then">></span> Category Filters**.

## Assign filters to a category

1. In the **ROOT NODES LIST** pane, select the root category containing the category you want to add filters to.

2. In the **CATEGORY TREE** pane, select the category you want to add the filters to.
    This displays the **CATEGORY FILTERS FOR {Category name}** pane.

3. For **ADD FILTER**, start typing the name of a filter and select the needed filter from the suggested list.
4. Click **Add**.
    The filter appears in the **ACTIVE FILTERS** section.
5. Repeat steps 3-4 until you add all the needed filters
6. Click **Save**.
    This refreshes the page with a success message displayed. In the **CATEGORY TREE** pane, the category you've added the filters to has an *edited* icon next to it.

![Assign and deassign filters from categories](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/category-filters/assign-and-deassign-filters-from-categories.md/assign-and-deassign-filters-from-categories.png)    

## Deassign filters from categories

1. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Category Filters**.
2. In the **CATEGORY TREE** pane, select the category you want to deassign filters from.
    This displays the **CATEGORY FILTERS FOR {Category name}** pane.    
3. Deassign filters via one of the following ways:
    * Deassign all filters by clicking **Remove all**.
    * Next to the filters you want to deassign, click *Remove* <span class="inline-img">![category filter remove icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/category-filters/assign-and-deassign-filters-from-categories.md/category-filter-remove-icon.png)</span>.
![Removing a single filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/remove-single-filter.gif)    
        This moves the filters to the **INACTIVE FILTERS** section.
4. Click **Save**.    
    This refreshes the page with a success message displayed.    


**Tips and tricks**
To reassign a filter you've just deassigned, in the **INACTIVE FILTERS** pane, click *reassign* next to the needed filter.
![Add a removed filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/add-removed-filter.gif)
