---
title: Add additional countries to checkout
description: Learn how to add additional countries to the checkout process in Spryker Cloud Commerce OS.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-add-additional-countries-to-spryker-checkout
originalArticleId: b9645f6e-965d-4f56-ad9e-2e24a879261d
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-add-additional-countries-to-spryker-checkout.html
  - /docs/pbc/all/cart-and-checkout/tutorials-and-howtos/howto-add-additional-countries-to-spryker-checkout.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/tutorials-and-howtos/howto-add-additional-countries-to-spryker-checkout.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/tutorials-and-howtos/add-additional-countries-to-checkout.html

---

This document explains how to add additional shipping countries selected by customers upon checkout.

To open up store to customers of more than the predefined counties, you must adjust the Spryker code to display more countries for selection in the Spryker checkout.

![Multiple countries in Checkout](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+Add+additional+countries+to+Spryker+checkout/checkout-multiple-countries.png)

## Prerequisites

Ensure that you have an up-to-date installation of any of the following instances:
- Spryker B2C Shop
- Spryker B2B Shop
- Spryker Suite

## Add countries to checkout

To add additional countries to the checkout, follow the steps:

1. Expand the country list by including country ISO codes directly into `config/Shared/stores.php`.

```php
// first entry is default.
    'countries' => ['DE', 'AT', 'NO', 'CH', 'ES', 'GB','AU'],
//Add the countries you would like to add to this array. For this example, "AU" (Australia) was added
```

2. Update the glossary so that the ISO country code is resolved to the real name of the country you have added.

**data/import/glossary.csv**

```json
ountries.iso.AU,Australia,en_US
countries.iso.AT,Austria,en_US
countries.iso.AT,Österreich,de_DE
countries.iso.DE,Germany,en_US
countries.iso.DE,Deutschland,de_DE
countries.iso.AT,Österreich,de_DE
countries.iso.AT,Austria,en_US
countries.iso.NO,Norway,en_US
countries.iso.NO,Norwegen,de_DE
countries.iso.CH,Switzerland,en_US
countries.iso.CH,Schweiz,de_DE
countries.iso.ES,Spain,en_US
countries.iso.ES,Spanien,de_DE
countries.iso.GB,United Kingdom,en_US
countries.iso.GB,Großbritannien,de_DE
```

{% info_block infoBox "Note "%}

We recommend defining additional tax rules when creating additional countries.

{% endinfo_block %}

After applying these changes, your buyers can select the countries configured in the checkout dialogue.
