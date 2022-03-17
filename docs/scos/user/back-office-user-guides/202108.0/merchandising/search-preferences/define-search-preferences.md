---
title: Define search preferences
description: Learn how to define search preferences in the Back Office
last_updated: Aug 4, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-search-preferences
originalArticleId: 921675b3-7c4c-4791-ada6-637004a78c59
redirect_from:
  - /2021080/docs/managing-search-preferences
  - /2021080/docs/en/managing-search-preferences
  - /docs/managing-search-preferences
  - /docs/en/managing-search-preferences
  - /docs/scos/user/back-office-user-guides/202108.0/merchandising/search-and-filters/managing-search-preferences.html
related:
  - title: Managing Category Filters
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/search-and-filters/managing-category-filters.html
  - title: Managing Filter Preferences
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/search-and-filters/managing-filter-preferences.html
---

This topic describes how to add product attributes to search and define search preferences.

## Prerequisites

1. [Create a product attribute](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html) for the search preference that you are going to create.
2. Add the product attribute to a product by [creating a product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/abstract-products/creating-abstract-products-and-product-bundles.html) or by [editing a product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/abstract-products/editing-abstract-products.html).
3. To start working with filter preferences, go to **Merchandising** > **Search Preferences**.

Review the [reference information]() before you start, or look up the necessary information as you go through the process.

## Add product attributes to search and define search preferences

1. On the **Search Preferences** page, click **Add attribute to search**.
2. On the **Add Attribute to Search** page, enter an **ATTRIBUTE KEY**.
3. Select **Yes** or **No** for the following:
    * **FULL TEXT**
    * **FULL TEXT BOOSTED**
    * **SUGGESTION TERMS**
    * **COMPLETION TERMS**
4. Click **Save**.
    This opens the **Search Preferences** page with a success message displayed.
5. Optional: To start using the created search attribute, click **Synchronize search preferences**.
    This refreshes the page with a success message displayed.



## Reference information: Add product attributes to search and define search preferences

This section describes attributes you see and enter when creating adding product attributes to search.

### ATTRIBUTE KEY

A product attribute to add to search. The values of the product attribute are used to search products by. For example, you add the `color` attribute to search. One of the values of the attribute is `green`. When a customer searches for `green`, the search returns all the products with this attribute value assigned.

### FULL TEXT

Defines if an attribute is to be included for full-text search. Customers will be able to find products when they search for a text which is present in the value of a searchable attribute.

**Example**
The _focus_adjustment_ attribute key has the following values:
* Auto
* Auto/Manual

With **FULL TEXT** enabled, when a customer enters a full name of the attribute's value, all words are searched, and the full phrase has a higher weight than separate words from it. Meaning, if they search for *Auto* or *Manual*, the results containing *Auto* or *Manual* for the Focus Adjustment attribute are displayed first in the search results flyout:
![Full text](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/full-text.png)

### FULL TEXT BOOSTED

Defines if attribute values of an attribute are to receive a higher relevance than the same attribute values of other attributes.

For example, the *white-balance* and *light_exposure_modes* attributes have the *manual* attribute value. The *white-balance* attribute is assigned to *Canon LEGRIA HF R606*, and *light_exposure_modes* attribute is assigned to *Sony Cyber-shot DSC-W830*. You enable **FULL TEXT BOOSTED** only for *light_exposure_modes*. When a customer searches for *manual*, Sony Cyber-shot DSC-W830 appears higher in the list of results than the product with the *white-balance* attribute.
![Full text boosted](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/full-text-boosted-attribute-values.png)

It can also happen that **FULL TEXT BOOSTED** is enabled for two attributes with the same value. In this case, in the search results, the order of the respective products is defined by Elasticsearch. You can improve this by  customizing its analyzers.

### SUGGESTION TERMS

Defines if alternative search terms are to be provided if a search item is misspelled. For example, the *storage_media* attribute has the *SSD* and *Flash* values. With **SUGGESTION TERMS** enabled, when a customer searches for `flashs`, the search results page contains a a suggested search term _flash_.
![Include for suggestion](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/include-for-suggestion.png)

### COMPLETION TERMS

Defines if auto-completion suggestions should appear when customers search for the values of this attribute.

For example, the _storage_media_ attribute has *SSD* and *Flash* values. With  **COMPLETION TERMS** enabled, when a customer enters `fla` in the search field, the search term is autocompleted with `sh`, and there is a list of suggested terms in the search results.
![Completion terms](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/completion-terms.png)
