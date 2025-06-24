---
title: Define search preferences
description: Learn how to define search preferences directly in the Back Office of your Spryker based projects.
last_updated: Aug 4, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-search-preferences
originalArticleId: 921675b3-7c4c-4791-ada6-637004a78c59
redirect_from:
  - /docs/scos/user/back-office-user-guides/202108.0/merchandising/search-preferences/define-search-preferences.html
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/search-and-filters/managing-search-preferences.html
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/search-preferences/define-search-preferences.html
  - /docs/pbc/all/search/202311.0/manage-in-the-back-office/define-search-preferences.html
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/search-preferences/define-search-preferences.html
related:
  - title: Edit search preferences
    link: docs/pbc/all/search/page.version/base-shop/manage-in-the-back-office/edit-search-preferences.html
  - title: Managing Category Filters
    link: docs/pbc/all/search/page.version/base-shop/manage-in-the-back-office/category-filters/assign-and-deassign-filters-from-categories.html
  - title: Managing Filter Preferences
    link: docs/pbc/all/search/page.version/base-shop/manage-in-the-back-office/filter-preferences/define-filter-preferences.html
  - title: Search feature overview
    link: docs/pbc/all/search/page.version/base-shop/search-feature-overview/search-feature-overview.html
---

This topic describes how to add product attributes to search and define search preferences.

## Prerequisites

1. If you are new to the **Search preferences** section, you might want to start with [Best practices: Promote products with search preferences](/docs/pbc/all/search/latest/base-shop/manage-in-the-back-office/best-practices-promote-products-with-search-preferences.html).

2. [Create a product attribute](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html) for the search preference that you are going to create.

3. Add the product attribute to a product by [creating a product](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) or by [editing a product](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/edit-abstract-products-and-product-bundles.html).

4. To start working with filter preferences, go to **Merchandising&nbsp;<span aria-label="and then">></span> Search Preferences**.

Review the [reference information](#reference-information-add-product-attributes-to-search-and-define-search-preferences) before you start, or look up the necessary information as you go through the process.

## Add product attributes to search and define search preferences

1. On the **Search Preferences** page, click **Add attribute to search**.
2. On the **Add Attribute to Search** page, enter an **ATTRIBUTE KEY**.
3. Select **Yes** or **No** for the following:
    - **FULL TEXT**
    - **FULL TEXT BOOSTED**
    - **SUGGESTION TERMS**
    - **COMPLETION TERMS**
4. Click **Save**.
    This opens the **Search Preferences** page with a success message displayed.
5. Optional: To start using the created search attribute, click **Synchronize search preferences**.
    This refreshes the page with a success message displayed.



## Reference information: Add product attributes to search and define search preferences

This section describes attributes you see and enter when adding product attributes to search and defining search preferences for them.

### ATTRIBUTE KEY

A [product attribute](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html) to add to search. The values of the product attribute are used to search products by. For example, you add the `color` attribute to search. One of the values of the attribute is `green`. When a customer searches for `green`, the search returns all the products with this attribute value assigned.

{% info_block warningBox "" %}

Enabling search preferences for attributes with numeric or *yes* and *no* values results in a huge list of search results because these values frequently appear in SKUs, product names, and descriptions. Additionally, in search results, SKUs, product names, and descriptions are always displayed higher.

{% endinfo_block %}

### FULL TEXT

Defines if all words in search terms are to be searched. The results that match all the words in a phrase are displayed higher than those matching parts of the phrase.

For example, **FULL TEXT** is enabled for the following attribute key-value pairs:

| Key | Value|
| - | - |
| focus_adjustment | Auto/Manual |
| flash | Manual |

With **FULL TEXT** enabled, when a customer searches for `Auto/Manual`, the products with `Auto/Manual` and `Manual` values assigned are both displayed in the results. However, the products with `Auto/Manual` are displayed on top.

### FULL TEXT BOOSTED

Defines if attribute values of an attribute are to receive a higher relevance than the same attribute values of other attributes.

For example, the *white-balance* and *light_exposure_modes* attributes have the *manual* attribute value. The *white-balance* attribute is assigned to *Canon LEGRIA HF R606*, and *light_exposure_modes* attribute is assigned to *Sony Cyber-shot DSC-W830*. You enable **FULL TEXT BOOSTED** only for *light_exposure_modes*. When a customer searches for *manual*, Sony Cyber-shot DSC-W830 appears higher in the list of results than the product with the *white-balance* attribute.
![Full text boosted](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/full-text-boosted-attribute-values.png)

If **FULL TEXT BOOSTED** is enabled for two attributes with the same value, in the search results, the order of the respective products is defined by Elasticsearch. You can improve this by  customizing its analyzers.

### SUGGESTION TERMS

Defines if alternative search terms are to be provided if a search item is misspelled. For example, the *storage_media* attribute has the *SSD* and *Flash* values. With **SUGGESTION TERMS** enabled, when a customer searches for `flashs`, the search results page contains a a suggested search term *flash*.
![Include for suggestion](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/include-for-suggestion.png)

### COMPLETION TERMS

Defines if auto-completion suggestions should appear when customers search for the values of this attribute.

For example, the *storage_media* attribute has *SSD* and *Flash* values. With  **COMPLETION TERMS** enabled, when a customer enters `fla` in the search field, the search term is autocompleted with `sh`, and there is a list of suggested terms in the search results.
![Completion terms](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/completion-terms.png)



Also, it does not make much sense to activate search preferences for attributes with the **numeric** and **Yes/No** values. As numbers may occur not only in attributes but in product SKUs, names and descriptions (which are actually ranked higher than attributes in search results), therefore the probability that a user will find what they were looking for is low, but the list of search results will be huge, and the search term will be present in multiple places.
Besides, it's very unlikely that users will be searching for an attribute with a numeric value or the Yes/No values.
