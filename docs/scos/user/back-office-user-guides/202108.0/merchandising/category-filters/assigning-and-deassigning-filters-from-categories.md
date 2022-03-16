---
title: Assigning and deassigning filters from categories
description: Learn how to assign filters to categories in the Back Office
last_updated: Jun 16, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-category-filters
originalArticleId: abf8a3db-7cb2-4220-8d26-995c270b0ff9
redirect_from:
  - /2021080/docs/managing-category-filters
  - /2021080/docs/en/managing-category-filters
  - /docs/managing-category-filters
  - /docs/en/managing-category-filters
  - /docs/scos/user/back-office-user-guides/202108.0/merchandising/search-and-filters/managing-category-filters.html
related:
  - title: Managing Search Preferences
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/search-and-filters/managing-search-preferences.html
  - title: Managing Filter Preferences
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/search-and-filters/managing-filter-preferences.html
---

This topic describes how to assign and deassign filters from categories in the Back Office.

## Prerequisites

To start working with category filters, go to **Merchandising** > **Category Filters**.
To set up a category filter, you need to have a filter preference setup in the *Merchandising* > *Filter Preferences* section.

{% info_block errorBox "Note" %}

Before adding a filter to the category, make sure that the product (with an attribute with a specific attribute key for which a filter preference exists) is assigned to this specific category. Otherwise, the filter will not bring any results once selected in the online store.

{% endinfo_block %}

## Assigning filters to categories

This procedure shows how to customize filter behavior by adding filters to a category.

To add a filter to a category:
1. In the **ROOT NODES LIST** pane, select the root category containing the category you want to add a filter to.

2. In the **CATEGORY TREE** pane, select the category you want to add the filter to.
    This displays the **CATEGORY FILTERS FOR {Category name}** pane.

3. For **ADD FILTER**, start typing the name of an existing filter and select the needed filter from the suggested list.
4. Click **Add**.
    The filter appears in the **ACTIVE FILTERS** section.
5. Repeat steps 3-4 until you add all the needed filters
6. Click **Save**.
    This refreshes the page with a success message displayed.

**Tips and tricks**
<br>Clicking **Reset to global settings** in *Category Filters for [Category name]* removes the customized filter settings.
![Reset to global settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/reset-to-global-settings.png)

Categories in the category tree view that have manually defined filter settings are marked with a pencil icon next to their name.

## Deassigning filters from categories

1. Go to **Merchandising** > **Category Filters**.
2. In the **CATEGORY TREE** pane, select the category you want to deassign filters from.
    This displays the **CATEGORY FILTERS FOR {Category name}** pane.    
3. Deassign filters via one of the following ways:
    * Deassign all filters by clicking **Remove all**.
    * Next to the filters you want to deassign, click *Remove*
        This moves the filters to the **INACTIVE FILTERS** sections.
4. Click **Save**.    
    This refreshes the page with a success message displayed.    


![Removing a single filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/remove-single-filter.gif)

**Tips and tricks**
<br>To add the removed filters again, click on the **green plus** sign next to the filters you want to add back from *Inactive filters*.
![Add a removed filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/add-removed-filter.gif)
