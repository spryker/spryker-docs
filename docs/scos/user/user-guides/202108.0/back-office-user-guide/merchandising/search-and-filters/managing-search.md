---
title: Managing search preferences
originalLink: https://documentation.spryker.com/2021080/docs/managing-search-preferences
redirect_from:
  - /2021080/docs/managing-search-preferences
  - /2021080/docs/en/managing-search-preferences
---

This topic describes how to manage search preferences. 

## Prerequisites

To start working with search preferences, go to **Merchandising** > **Search Settings** section.

Review the reference information before you start, or just look up the necessary information as you go through the process.

When adding a search preference, the **Attribute Key** value is taken from the **Product Attributes > Specific Attribute** entity. Make sure that you are populating the field with an existing attribute key of an attribute assigned to a product; otherwise, the search result will be blank in the online store.

## Creating new attributes to search

To create a new attribute to search, do the following:
1.  In the top right corner of the *Search Preferences* page, click **Add attribute to search**.
2. On the *Add attribute to search* page, enter the attribute key and (optionally) specify "Yes" or "No" for search preference types.
3. Click **Save**.
4. On the *Search Preferences* page, click **Synchronize search preferences** for your changes to take effect.

This creates a new non-super attribute and registers it in the system, so your customers will be able to find products with this attribute in the online store if you enable search preference types for it.

## Editing search preferences

To edit a search preference:
1. In the *Search Preferences* table, find an attribute you want to change the search preferences for.
2. In the _Actions_ column of the attribute, click **Edit** .
3. On the *Edit search preferences* page, you can define how the attribute will behave for search by specifying _Yes_ or _No_ for the **Full text**, **Full text boosted**, **Suggestion terms**, or **Completion terms** fields.
4. Click **Save**.
5. On the *Search Preferences* page, click **Synchronize search preferences** for your changes to take effect.

## Reference information

This section describes attributes you see and enter when creating  new attributes to search and editing search preferences.

There is a set of search preferences' types that you can specify for your attribute key. All of those types possess different features. 

### Full text

Full text implies that, if set to **Yes**, the attributes will be included for full-text search. It means that a user will be able to find products when they search for a text which is present in the value of a searchable attribute.

**Example** 
The _focus_adjustment_ attribute key has the following values: 
* Auto
* Auto/Manual

If **Include for full text** is set to Yes for this attribute, then, when typing any of the values of this attribute in the **Search** field of the online store, all words will be searched, and the full phrase will have a higher weight than separate words from it. Meaning, if **Auto/Manual** is typed, the results having **Auto/Manual** value for the Focus Adjustment attribute will be displayed first in the search results flyout:
![Full text](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/full-text.png)

### Full text boosted

Full text boosted implies that, if set to **Yes**, the attributes will be included for full text boosted. It means that the attribute values of these specific attributes will receive a higher relevance than other attributes having the same values.

**Example**
The _alarm_clock_ and _waterproof_ attributes both have **Yes** and **No** attribute values, but: 
* _alarm_clock_ has the **Include for full-text search** value set to **Yes**
*  _waterproof_ has **Include for full text boosted** set to **Yes**

In this case, when typing **Yes** in the **Search** field on the web-shop, the products that have the **Waterproof** attributes with the "**yes**" value will appear higher in the list of results than products with Alarm clock attributes with the same value.
![Full text boosted](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/full-text-boosted.png)

{% info_block infoBox "Info" %}
If several attributes having the same values have been included for full text boosted, they all will appear in the search results. Their order is provided by Elasticsearch and can be further improved by customizing its analyzers.
{% endinfo_block %}

### Suggestion terms

Suggestion terms implies that, if set to **Yes**, the attributes will be included for a suggestion. This search preferences type implements the "_did you mean_" search functionality which provides alternative suggestions when a user may have misspelled a search term.

**Example**
The _storage_media_ attribute has the **SSD** and **Flash** values. If **Include for suggestion** has been set to **Yes**, then when a user types _flashs_ in the **Search** field, the search results page will contain a box with suggested search term "_flash_".
![Include for suggestion](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/include-for-suggestion.png)

And vise versa, if you don't include an attribute for the suggestion, when a user searches by its values and misspells them, there will be no result for the user's search.
![Do not include for suggestion](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/do-not-include-for-suggestion.png)

### Completion terms

Completion terms implies that, if set to **Yes**, the attributes will be included for completion. It means that typing a word in the search field brings up predictions, which makes it easy to finish entering the search form.

**Example**
The _storage_media_ attribute has **SSD** and **Flash** values. If **Include for completion** has been set to **Yes**, then when user types "_fla_" in the search field, the search term will be autocompleted with "_sh_," and there will be a list of suggested terms in the search results flyout:
![Completion terms](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Search+and+Filters/Search+Preferences+Types/completion-terms.png)

**Tips & tricks**
When you first decide on activating search preference types for attributes, keep in mind, that enabling all of them is **highly unrecommended**, as this will result in a huge list of search results.
Instead of this, you might want to consider enabling search preference types for only those attributes that you really want your users to find while searching, or the attributes that refer to products you want to appear in the search results above all.
{% info_block infoBox "Example" %}
There is a new device in your shop which is popular on the market for its video recording properties. You know that users are very interested in a device with such property and they might search for products by it.</br>Suppose, you have created the _video_recording_ attribute in your shop with the values **Geotaging** and **Autofocus**.</br>However, suppose there are other attributes having the same values.</br>Since you want to advertise the specific new device more, it would make sense for you to disable, or at least to restrict the number of active search preference types for all other attributes with **Geotagging** and **Autofocus** values and enable an individual (or even all
{% endinfo_block %} search preference types for the _video_recording_.</br>This way you will make the _video_recording_ product attribute searchable and therefore the products with this attribute will stand out in the search results when your customers search by attributes.)

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

