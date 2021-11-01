---
title: Special product types import category
last_updated: Jun 17, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/special-product-types-import-category
originalArticleId: 4e6f56a9-fcfb-47be-88b0-9022ee227a06
redirect_from:
  - /2021080/docs/special-product-types-import-category
  - /2021080/docs/en/special-product-types-import-category
  - /docs/special-product-types-import-category
  - /docs/en/special-product-types-import-category
---

The *Special product types* import category contains the data related the special product types information in the online store.

In the [Product Options](/docs/scos/user/features/{{page.version}}/product-options-feature-overview.html) section, you will find all information about the data imports required to to manage product options in your online store.

In the [Gift Cards](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/gift-cards.html) section, you will be able to import the data necessary to manage gift cards information in your online store.

In the [Configurable Product data import](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/configurable-product-import-category/configurable-product-data-import.html) section, you will find the details of the file for importing the configuration of [configurable products](/docs/scos/user/features/{{page.version}}/configurable-product-feature-overview.html).

{% info_block warningBox "Import order" %}

The order in which the files are imported is *very strict*. Execute the following data importers in the provided order:

1. [Product Option](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html)
2. [Product Option Price](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/product-options/file-details-product-option-price.csv.html)
3. [Gift Card Abstract Configuration](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/file-details-gift-card-abstract-configuration.csv.html)
4. [Gift Card Concrete Configuration](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/file-details-gift-card-concrete-configuration.csv.html)


{% endinfo_block %}
