---
title: Managing category filters
originalLink: https://documentation.spryker.com/2021080/docs/managing-category-filters
redirect_from:
  - /2021080/docs/managing-category-filters
  - /2021080/docs/en/managing-category-filters
---

This topic describes how to manage category filters.
***

## Prerequisites
To start working with category filters, go to **Merchandising** > **Category Filters**.
To set up a category filter, you need to have a filter preference setup in the *Merchandising* > *Filter Preferences* section.
{% info_block errorBox "Note" %}
Before adding a filter to the category, make sure that the product (with an attribute with a specific attribute key for which a filter preference exists
{% endinfo_block %} is assigned to this specific category. Otherwise, the filter will not bring any results once selected in the online store.)

## Adding a filter to a category

This procedure shows how to customize filter behavior by adding filters to a category.

To add a filter to a category:
1. Select the root category from the *Root nodes list* table.
The *Category tree*  section is populated by the nodes nested under the selected root category.
2. Select a category to overwrite the default global settings.
To find a specific category, start entering its name in the *Search* field, and the results will be automatically highlighted in *Category tree*.
3. After selecting a category, the *Category Filters for [Category name]* frame opens to show the current configuration.
![Adding a filter to a category](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/add-filter-to-category.png)
    
    Categories in the category tree view that have manually defined filter settings are marked with a pencil icon next to their name. 
![Category tree view](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/category-tree-view.png){height="" width=""}
    
4. Start typing the name of the existing filter in the *Add filter* field. As you type, the autocompleted drop-down appears, so you can select a filter there.
5. After selecting the filter, click **Add**. The filter appears in the *Active filters* list.
6. Once done, click **Save**.

**Tips & tricks**
Clicking **Reset to global settings** in *Category Filters for [Category name]* removes the customized filter settings.
![Reset to global settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/reset-to-global-settings.png)


## Reordering filters

To reorder filters, In *Active filters*, drag and drop them to the necessary place.
![Reordering filters](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/reordering-filters.gif)


## Removing a filter

You can remove either all filters from the active filters at once or just single filters.
1. To remove all filters, in *Active filters*, click **Remove all**.
   ![Removing a filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/removing-filter.png)
2. To remove single filters, click the **basket** icon next to the filter you want to remove. 
3. Once done, click **Save**.
    The removed filters are moved to the **Inactive filters** list.
![Removing a single filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/remove-single-filter.gif)

**Tips & tricks**
To add the removed filters again, click on the **green plus** sign next to the filters you want to add back from *Inactive filters*.
![Add a removed filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Managing+Category+Filters/add-removed-filter.gif)

