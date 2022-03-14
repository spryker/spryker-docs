---
title: Managing filter preferences
description: Use the procedure to reorder filters, specify a filter type and add translations to the filter name in the Back Office.
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

This article describes how to manage filter preferences.

## Prerequisites

1. [Create a product attribute](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html) for the filter that you are going to create.
2. Add the product attribute to a product by creating a product or by editing a product.
3. To start working with the filter preferences, go to **Merchandising** > **Filter Preferences**.


## Creating filter preferences

To create a filter preference:
1. On the **Filter Preferences** page, click **Create filter**.
2. On the **Create Filter** page, enter an **ATTRIBUTE KEY**.
3. Select a **FILTER TYPE**.   either multi-select or range.
4. Enter a **FILTER NAME** for each locale.
5. Click **Save**.
    This opens the **View Filter** page with a success message displayed.

**Tips and tricks**
- The filter is created by it will not be available for use unless you synchronize the filter preferences.
To do the synchronization, in the top right corner of the *Filter Preferences* page, click **Synchronize filter preference**
- There is no way to specify specific categories when creating filters. If, however, products within a category do not contain values for the attribute to which the filter is assigned, the filter does not appear on the Storefront. For example, if you created a category filter, it is assigned to all of the default categories.  However, it only appears for those products on the Storefront that have attributes that this category filter has.

## Editing filter preferences

To edit a filter preference:
1. Next to the filter you want to edit, click **Edit**.
2. Update any of the following:
    * Select a **FILTER TYPE**
    * Enter a **FILTER NAME** for any locale.
 3. Click **Save**.
    This opens the **View Filter** page with a success message displayed.    
 4. Click **List of filters**.
 5. On the **Filter preferences** page, to sync the changes, click **Synchronize filter preferences**.
    This refreshes the page with a success message displayed.




**Attribute key** is greyed out and is not available for modifications.


## Viewing and deleting filter preferences


 attribute key to the respective field. The attribute key can be found in **Product Attributes > Attributes Key** of a specific attribute.

 *To view a filter*, click **View** in the _Actions_ column for a specific filter.

To delete a filter:
 1. in the _Actions_ column, click **Delete**  for a specific filter.
 **OR**
2. In the top right corner of the page while viewing a filter, click **Delete**.

**What's next?**
<br>Once the filter preference is created, you can use it in the **Category Filters** section. That is done to enable specific category(s) to which the product with this attribute is assigned, to be filtered based on this specific filter.

See [Managing category filters](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/search-and-filters/managing-category-filters.html) to know how to set up the category filters.
