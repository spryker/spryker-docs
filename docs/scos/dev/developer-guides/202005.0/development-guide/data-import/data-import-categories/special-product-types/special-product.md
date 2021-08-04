---
title: Special Product Types
originalLink: https://documentation.spryker.com/v5/docs/special-product-types
redirect_from:
  - /v5/docs/special-product-types
  - /v5/docs/en/special-product-types
---

**Special Product Types** contains data related the special product types information in the online store.

Within the [Product Options](https://documentation.spryker.com/docs/en/product-options) section, you will find all information about the data imports required to to manage product options in your online store.

In the [Gift Cards](https://documentation.spryker.com/docs/en/gift-cards-import) section, you will be able to import the data necessary to manage gift cards information in your online store.

{% info_block warningBox "Import order" %}

The order in which the files are imported is **very strict**. For this reason, the data importers should be executed in the following order:

1. [Product Option](https://documentation.spryker.com/docs/en/file-details-product-optioncsv)
2. [Product Option Price](https://documentation.spryker.com/docs/en/file-details-product-option-pricecsv)
3. [Gift Card Abstract Configuration](https://documentation.spryker.com/docs/en/file-details-gift-card-abstract-configurationcsv)
4. [Gift Card Concrete Configuration](https://documentation.spryker.com/docs/en/file-details-gift-card-concrete-configurationcsv)


{% endinfo_block %}
