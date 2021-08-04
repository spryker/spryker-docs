---
title: Special product types import category
originalLink: https://documentation.spryker.com/2021080/docs/special-product-types-import-category
redirect_from:
  - /2021080/docs/special-product-types-import-category
  - /2021080/docs/en/special-product-types-import-category
---

The *Special product types* import category contains the data related the special product types information in the online store.

In the [Product Options](/docs/scos/dev/features/202005.0/product-information-management/product-options/product-options) section, you will find all information about the data imports required to to manage product options in your online store.

In the [Gift Cards](/docs/scos/dev/developer-guides/202005.0/development-guide/data-import/data-import-categories/special-product-types/gift-cards/gift-cards-impo) section, you will be able to import the data necessary to manage gift cards information in your online store.

In the [Configurable Product data import](https://documentation.spryker.com/upcoming-release/docs/configurable-product-data-import) section, you will find the details of the file for importing the configuration of [configurable products](https://documentation.spryker.com/2021080/docs/configurable-product).

{% info_block warningBox "Import order" %}

The order in which the files are imported is *very strict*. Execute the following data importers in the provided order:

1. [Product Option](/docs/scos/dev/developer-guides/202005.0/development-guide/data-import/data-import-categories/special-product-types/product-options/file-details-pr)
2. [Product Option Price](/docs/scos/dev/developer-guides/202005.0/development-guide/data-import/data-import-categories/special-product-types/product-options/file-details-pr)
3. [Gift Card Abstract Configuration](/docs/scos/dev/developer-guides/202005.0/development-guide/data-import/data-import-categories/special-product-types/gift-cards/file-details-gi)
4. [Gift Card Concrete Configuration](/docs/scos/dev/developer-guides/202005.0/development-guide/data-import/data-import-categories/special-product-types/gift-cards/file-details-gi)


{% endinfo_block %}
