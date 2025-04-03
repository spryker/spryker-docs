---
title: Edit search preferences
description: Learn how to edit search preferences directly in the Back Office for your Spryker based projects.
template: back-office-user-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/search-preferences/edit-search-preferences.html
  - /docs/pbc/all/search/202311.0/manage-in-the-back-office/edit-search-preferences.html
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/search-preferences/edit-search-preferences.html
related:
  - title: Define search preferences
    link: docs/pbc/all/search/page.version/base-shop/manage-in-the-back-office/define-search-preferences.html
  - title: Search feature overview
    link: docs/pbc/all/search/page.version/base-shop/search-feature-overview/search-feature-overview.html
---

This document describes how to edit search preferences for product attributes in the Back Office.

## Prerequisites

1. If you are new to the **Search preferences** section, you might want to start with [Best practices: Promote products with search preferences](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-promote-products-with-search-preferences.html).

2. To start working with filter preferences, go to **Merchandising&nbsp;<span aria-label="and then">></span> Search Preferences**.

Review the [reference information](#reference-information-edit-search-preferences-for-product-attributes) before you start, or look up the necessary information as you go through the process.

## Edit search preferences for product attributes

1. Next to the attribute you want to edit the search preferences for, click **Edit**.
2. On the **Edit search preferences** page, select **Yes** or **No** for the following:
    * **FULL TEXT**
    * **FULL TEXT BOOSTED**
    * **SUGGESTION TERMS**
    * **COMPLETION TERMS**
3. Click **Save**.
This opens the **Search Preferences** page with a success message displayed.
4. Optional: To apply the changes, click **Synchronize search preferences**.
    This refreshes the page with a success message displayed.

## Reference information: Edit search preferences for product attributes

This section describes attributes you see and enter when editing search preferences for product attributes.

### ATTRIBUTE KEY

A [product attribute](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html) to which the search preferences are assigned. The values of the product attribute are used to search products by. For example, the `color` attribute is added to search. One of the values of the attribute is `green`. When a customer searches for `green`, the search returns all the products with this attribute value assigned.

### FULL TEXT

Defines if all words in search terms are searched. The results that match all the words in a phrase are displayed higher than those matching parts of the phrase.

For example, **FULL TEXT** is enabled for the following attribute key-value pairs:

| KEY | VALUE|
| - | - |
| focus_adjustment | Auto/Manual |
| flash | Manual |

When a customer searches for `Auto/Manual`, the products with `Auto/Manual` and `Manual` values assigned are both displayed in the results. However, the products with `Auto/Manual` are displayed on top.

### FULL TEXT BOOSTED

Defines if attribute values of an attribute receive a higher relevance than the same attribute values of other attributes.

For example, the *white-balance* and *light_exposure_modes* attributes have the *manual* attribute value. The *white-balance* attribute is assigned to *Canon LEGRIA HF R606*, and *light_exposure_modes* attribute is assigned to *Sony Cyber-shot DSC-W830*. You enable **FULL TEXT BOOSTED** only for *light_exposure_modes*. When a customer searches for *manual*, Sony Cyber-shot DSC-W830 appears higher in the list of results than the product with the *white-balance* attribute.
![Full text boosted](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/full-text-boosted-attribute-values.png)

If **FULL TEXT BOOSTED** is enabled for two attributes with the same value, in the search results, the order of the respective products is defined by Elasticsearch. You can improve this by  customizing its analyzers.

### SUGGESTION TERMS

Defines if alternative search terms are provided if a search item is misspelled. For example, the *storage_media* attribute has the *SSD* and *Flash* values. With **SUGGESTION TERMS** enabled, when a customer searches for `flashs`, the search results page contains a a suggested search term _flash_.
![Include for suggestion](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/include-for-suggestion.png)

### COMPLETION TERMS

Defines if auto-completion suggestions appear when customers search for the values of this attribute.

For example, the _storage_media_ attribute has *SSD* and *Flash* values. With  **COMPLETION TERMS** enabled, when a customer enters `fla` in the search field, the search term is autocompleted with `sh`, and there is a list of suggested terms in the search results.
![Completion terms](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/completion-terms.png)
