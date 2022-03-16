---
title: Managing search preferences
description: Use the procedure to customize search by product attributes and specify search preference types in the online shop.
last_updated: Aug 4, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-search-preferences
originalArticleId: 921675b3-7c4c-4791-ada6-637004a78c59
redirect_from:
  - /2021080/docs/managing-search-preferences
  - /2021080/docs/en/managing-search-preferences
  - /docs/managing-search-preferences
  - /docs/en/managing-search-preferences
related:
  - title: Managing Category Filters
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/search-and-filters/managing-category-filters.html
  - title: Managing Filter Preferences
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/search-and-filters/managing-filter-preferences.html
---

This topic describes how to manage search preferences.

## Prerequisites

1. [Create a product attribute](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html) for the search preference that you are going to create.
2. Add the product attribute to a product by [creating a product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/abstract-products/creating-abstract-products-and-product-bundles.html) or by [editing a product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/abstract-products/editing-abstract-products.html).
3. To start working with filter preferences, go to **Merchandising** > **Search Preferences**.

Review the [reference information]() before you start, or look up the necessary information as you go through the process.

## Creating search attributes

To create a new attribute to search, do the following:
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


This creates a new non-super attribute and registers it in the system, so your customers will be able to find products with this attribute in the online store if you enable search preference types for it.



## Reference information

This section describes attributes you see and enter when creating  new attributes to search and editing search preferences.

There is a set of search preferences' types that you can specify for your attribute key. All of those types possess different features.

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

For example, the _storage_media_ attribute has *SSD* and *Flash* values. With  **COMPLETION TERMS** enabled, when a customer enters `fla` in the search field, the search term will be autocompleted with "_sh_," and there will be a list of suggested terms in the search results flyout:
![Completion terms](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/completion-terms.png)

####

Enabling search preferences for a big number of attributes will result in a huge list of search results. We recommend enabling search preferences only for the attributes that you really want your customers to find.

For example, There is a new device in your shop which is popular on the market for its video recording properties. You know that users are very interested in a device with such property and they might search for products by it.<br>Suppose, you have created the _video_recording_ attribute in your shop with the values **Geotagging** and **Autofocus**.<br>However, suppose there are other attributes having the same values.<br>Since you want to advertise the specific new device more, it would make sense for you to disable, or at least to restrict the number of active search preference types for all other attributes with **Geotagging** and **Autofocus** values and enable an individual (or even all) search preference types for the _video_recording_.<br>This way you will make the _video_recording_ product attribute searchable and therefore the products with this attribute will stand out in the search results when your customers search by attributes.

{% endinfo_block %}

Also, it does not make much sense to activate search preferences for attributes with the **numeric** and **Yes/No** values. As numbers may occur not only in attributes but in product SKUs, names and descriptions (which are actually ranked higher than attributes in search results), therefore the probability that a user will find what they were looking for is low, but the list of search results will be huge, and the search term will be present in multiple places.
Besides, it is very unlikely that users will be searching for an attribute with a numeric value or the Yes/No values.

### Synchronize search preferences

After adding or updating all necessary attributes, you need to apply the changes by clicking **Synchronize search preferences**. This triggers an action that searches for all products that have those attributes and were modified since the last synchronization and touches them. This means that next time, the search collector execution will update the necessary products, so they can be found by performing a full text search.

{% info_block infoBox "Synchronization" %}

Depending on the size of your database, the synchronization can be slow sometimes. Make sure that you don't trigger it often if it's not necessary.

{% endinfo_block %}

To have your search collector collect all the dynamic product attributes, make sure you also followed the steps described in the Dynamic product attribute mapping section.

### Current constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future.

* Search preference attributes are shared across all the stores in a project.
* You cannot define a search preference for a single store.

## Deactivating search preferences

When you have some or all search preferences activated, you can deactivate individual search preferences, or deactivate them all in bulk.

To deactivate individual search preferences of an attribute, do the following:
1. Click **Edit** in the _Actions_ column for a respective attribute.
2. On the *Edit search preferences* page, set a specific search preference type to **No**.

To deactivate all search preferences for specific attributes at once,  in the _Actions_ column of an attribute for which you want to disable all search preferences, click **Deactivate all**.
