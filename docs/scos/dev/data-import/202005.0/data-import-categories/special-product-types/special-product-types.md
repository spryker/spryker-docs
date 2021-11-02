---
title: Special Product Types
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/special-product-types
originalArticleId: d118a354-3763-4cdb-8d10-7205cf31e147
redirect_from:
  - /v5/docs/special-product-types
  - /v5/docs/en/special-product-types
---

**Special Product Types** contains data related the special product types information in the online store.

Within the [Product Options](/docs/scos/user/features/{{page.version}}/product-options-feature-overview.html) section, you will find all information about the data imports required to to manage product options in your online store.

In the [Gift Cards](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/gift-cards.html) section, you will be able to import the data necessary to manage gift cards information in your online store.

{% info_block warningBox "Import order" %}

The order in which the files are imported is **very strict**. For this reason, the data importers should be executed in the following order:

1. [Product Option](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html)
2. [Product Option Price](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/product-options/file-details-product-option-price.csv.html)
3. [Gift Card Abstract Configuration](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/file-details-gift-card-abstract-configuration.csv.html)
4. [Gift Card Concrete Configuration](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/file-details-gift-card-concrete-configuration.csv.html)


{% endinfo_block %}
