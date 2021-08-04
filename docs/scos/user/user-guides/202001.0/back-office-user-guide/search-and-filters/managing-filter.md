---
title: Managing Filter Preferences
originalLink: https://documentation.spryker.com/v4/docs/managing-filter-preferences
redirect_from:
  - /v4/docs/managing-filter-preferences
  - /v4/docs/en/managing-filter-preferences
---

This article describes the procedures of creating and managing filter preferences.
***
To start working with the filter preferences, navigate to the **Search and Filters > Filter Preferences** section.
***
**Prerequisites**
Please make sure that the attribute you are going to create a filter preference for is created and assigned to a product.
***
## Creating a Filter Preference
**To create a filter preference:**
1. In the top right corner of the **Filter preferences** page, click **Create filter**.
2. On the **Create filter** page, do the following:
    1. Enter the attribute key to the respective field. The attribute key can be found in **Product Attributes > Attributes Key** of a specific attribute. 
    2. In the **Filter Type** drop-down, select either multi-select or range.
    3. Enter the translations for all locations set up in your store.
3. Click **Save**.
***
The filter is created by it will not be available for use unless you synchronize the filter preferences.

To do the synchronization, click **Synchronize filter preference** in the top right corner of the **Filter Preferences** page.
***
## Editing Filter Preferences
To edit a filter preference:
1. In the _Actions_ column of the **Filter preferences** table, click **Edit** for the filter you need to update.
2. Update the needed values.
    **Attribute key** is greyed out and is not available for modifications.
 3. Once done, click **Save**.
 4. On the **View filter** page, click **List of filters** in the top right corner.
 5. On the **Filter preferences** page, click **Synchronize filter preferences**.
***
## Viewing and Deleting Filter Preferences
 **To view a filter**, click **View** in the _Actions_ column for a specific filter.
 ***
**To delete a filter:**
 1. Click **Delete** in the _Actions_ column for a specific filter.
 **OR**
2. Click **Delete** in the top right corner of the page while viewing a filter.

***
**What's next?**
Once the filter preference is created, you can use it in the **Category Filters** section. That is done to enable specific category(s) to which the product with this attribute is assigned, to be filtered based on this specific filter.

See [Managing Category Filters](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/search-and-filters/managing-catego) to know how to set up the category filters.
