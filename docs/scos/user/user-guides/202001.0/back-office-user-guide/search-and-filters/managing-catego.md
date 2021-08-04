---
title: Managing Category Filters
originalLink: https://documentation.spryker.com/v4/docs/managing-category-filters
redirect_from:
  - /v4/docs/managing-category-filters
  - /v4/docs/en/managing-category-filters
---

This topic describes the procedure of setting up category filters.
***
To start setting up the category filters, navigate to the **Search and Filters > Category Filters** section.
***
**Prerequisites**
To set up a category filter, you need to have a filter preference setup in the **Search and Filters > Filter Preferences** section.
{% info_block errorBox "Note" %}
Before adding a filter to the category, make sure that the product (with an attribute with a specific attribute key for which a filter preference exists is assigned to this specific category. Otherwise, the filter will not bring any results once selected in the online store.
{% endinfo_block %}
***
On the **Overview of Category Filters** page, you see the **Root nodes list**, **Category tree**, and 
**Category Filters for** sections. You select the root in the **Root nodes list** by clicking on it and the **Category tree** section is updated to show the categories in the node.

To manage the category filters, you click on a specific category and the **Category Filters for** section appears displaying the active filters that are already assigned to a category and the **Add filter** field.
***
## Adding a Filter to a Category
This procedure will show you how to customize filter behavior by adding the filters to category.

**To add a filter to the category:**
1. Select the root category from the Root nodes list table.
    The Category tree will be populated by the nodes nested under the selected root category.
2. Choose a category for which you would like to overwrite the default global settings.
    To find a specific category, start entering its name in the **Search** field and the results will be automatically highlighted in the category tree.
3. After selecting a category, the **Category Filters for [Category name]** frame opens to show the current configuration.
![Adding a filter to a category](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/add-filter-to-category.png){height="" width=""}
    
    Categories in the category tree view that have manually defined filter settings are marked with a pencil icon next to their name. 
![Category tree view](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/category-tree-view.png){height="" width=""}
    
4. Start typing the name of the existing filter in the **Add filter** field. As you type, the autocompleted drop-down will appear so you can select a filter there.
5. After selecting the filter, click **Add**. The filter will appear in the **Active filters** list.
6. Once done, click **Save**.
***
**Tips & Tricks**
Clicking **Reset to global settings** in **Category Filters for [Category name]** will remove the customized filter settings.
![Reset to global settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/reset-to-global-settings.png){height="" width=""}

***
## Reordering Filters

**To reorder filters**, just drag and drop them to the necessary place.
![Reordering filters](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/reordering-filters.gif){height="" width=""}

***
## Removing a Filter

It is possible to remove either all filters from the active filters at once or just single filters.
1. **To remove all filters** > Click **Remove all**.
   ![Removing a filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/removing-filter.png){height="" width=""}
2. **To remove single filters** > Click a **basket** icon at the filter you want to remove. Once done, click **Save**.
    The removed filters will be moved to the **Inactive filters** list.
![Removing a single filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/remove-single-filter.gif){height="" width=""}

***
**Tips & Tricks**
To add the removed filters again, click on the **green plus sign** at the filters you want to add back from Inactive filters.
![Add a removed filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/add-removed-filter.gif){height="300" width=""}
