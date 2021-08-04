---
title: HowTo - Add additional countries to Spryker checkout
originalLink: https://documentation.spryker.com/v6/docs/howto-add-additional-countries-to-spryker-checkout
redirect_from:
  - /v6/docs/howto-add-additional-countries-to-spryker-checkout
  - /v6/docs/en/howto-add-additional-countries-to-spryker-checkout
---

This HowTo explains how to add additional shipping countries selected by the end users upon checkout.

Customers that want to open up their store to buyers of more than the predefined counties need to make adjustments to the Spryker code to display more countries for selection in the Spryker checkout.

![Multiple countries in Checkout](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+Add+additional+countries+to+Spryker+checkout/checkout-multiple-countries.png){height="" width=""}

## Prerequisites
Ensure that you have an up-to-date installation of any of the following instances:

* Spryker B2C Show
* Spryker B2B Shop
* Spryker Suite

## Adding countries to checkout
To add additional countries to the checkout, follow the steps:

1. Expand the country list by including country ISO codes directly into `config/Shared/stores.php`.

```php
// first entry is default.
    'countries' => ['DE', 'AT', 'NO', 'CH', 'ES', 'GB','AU'],
//Add the countries you would like to add to this array. For this example "AU" (Australia) was added
```
2. Update the glossary so that the ISO country code is resolved to the real name of the country you added.

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
{% info_block warningBox "Attention!" %}


It will make sense to define additional tax rules when creating additional countries.

{% endinfo_block %}


After these changes are performed, your buyers will be able to select the countries configured in the checkout dialogue.
