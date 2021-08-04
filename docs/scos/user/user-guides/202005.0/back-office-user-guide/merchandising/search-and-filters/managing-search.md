---
title: Managing Search Preferences
originalLink: https://documentation.spryker.com/v5/docs/managing-search-preferences
redirect_from:
  - /v5/docs/managing-search-preferences
  - /v5/docs/en/managing-search-preferences
---

This topic describes how to manage search preferences. 
To start working with search preferences, go to **Merchandising** > **Search Settings** section.
***
## Prerequisites
When adding a search preference, the **Attribute Key** value is taken from the **Product Attributes > Specific Attribute** entity. Make sure that you are populating the field with an existing attribute key of an attribute assigned to a product; otherwise, the search result will be blank in the online store.

## Creating a New Attribute to Search

To create a new attribute to search, do the following:
1. Click **Add attribute to search** in the top right corner of the **Search Preferences** page.
2. On the **Add attribute to search** page, enter the attribute key and (optionally) specify "Yes" or "No" for search preference types.
    See [Search Preferences Types](https://documentation.spryker.com/docs/en/search-preferences-types) in the **References** section to know more about the search types.
3. Click **Save**.
4. On the **Search Preferences** page, click **Synchronize search preferences** for your changes to take effect.

This will create a new non-super attribute and register it in the system, so your customers will be able to find products with this attribute in the online store if you enable search preference types for it.

## Editing Search Preferences
To edit a search preference:
1. Find an attribute you want to change the search preferences for in the **Search Preferences** table.
2. Click **Edit** in the _Actions_ column of the attribute.
3. On the **Edit search preferences** page, you can define how the attribute will behave for search by specifying _Yes_ or _No_ for the **Full text**, **Full text boosted**, **Suggestion terms**, or **Completion terms** fields. See [Search Preferences Types](https://documentation.spryker.com/docs/en/search-preferences-types) in the **References** section to know more about the search types.
4. Once done, click **Save**.
5. On the **Search Preferences** page, click **Synchronize search preferences** for your changes to take effect.

## Deactivating Search Preferences

When you have some or all search preferences activated, you can deactivate individual search preferences, or deactivate them all in bulk.

**To deactivate individual search preferences** of an attribute, do the following:
1. Click **Edit** in the _Actions_ column for a respective attribute.
2. On the **Edit search preferences** page, set a specific search preference type to **No**.

**To deactivate all search preferences** for specific attributes at once, click **Deactivate all** in the _Actions_ column of an attribute for which you want to disable all search preferences.

