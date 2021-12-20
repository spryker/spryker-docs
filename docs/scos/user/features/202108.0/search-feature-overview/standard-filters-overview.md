---
title: Standard filters overview
last_updated: Jul 8, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/standard-filters-overview
originalArticleId: 0b675c4c-6163-4402-82a5-8a9198260fda
redirect_from:
  - /2021080/docs/standard-filters-overview
  - /2021080/docs/en/standard-filters-overview
  - /docs/standard-filters-overview
  - /docs/en/standard-filters-overview
---

E-commerce solutions usually offer a huge product catalog to display products and their variations. To help buyers find the products they are looking for in the catalog, we have the *Standard Filters* feature.

With Standard Filters, you can filter the products according to the specified price range, product ratings, product labels, color, material, brand etc.

![Filter Attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Standard+Filters/filter-attributes-b2c.png)

## Filter types
In Spryker Commerce OS, the following filter types exist:

* **Single-select**—allows a user to select only one filter option.
  
![Single Select](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Standard+Filters/single-select-b2c.gif)

* **Multi-select**—allows selecting several variants simultaneously.
  
![Multi Select](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Standard+Filters/multi-select-b2c.gif)

* **Range**—filters data in the dimension from the maximum and minimum value. In the current implementation of our demo shop, the range filter is applied to the abstract product prices.
  
![Range Filter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Standard+Filters/range-b2c.gif)

Products appropriate for the active filters are displayed in the results.

Filter preferences can be configured in the **Back Office > Search and Filters > Filter Preferences**. Filter options depend on the attributes configured for the products.

## Current constraints
Price Range Filter is not supported with the Merchant Relations, that is why this filter is not included in the B2B demo shop. However, in [the B2C demo shop](/docs/scos/user/intro-to-spryker/about-spryker.html#spryker-b2bb2c-demo-shops), you can still filter the products using the price range filter.

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Manage filter preferences](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/search-and-filters/managing-filter-preferences.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Search feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/search-feature-walkthrough.html) for developers.

{% endinfo_block %}
