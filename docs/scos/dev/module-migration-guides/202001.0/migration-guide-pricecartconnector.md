---
title: Migration Guide - PriceCartConnector
description: Use the guide to learn how to update the PriceCartConnector module.
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/mg-price-cart-connector
originalArticleId: 1719240c-e6f3-4e0b-a126-c962e6fc0ec5
redirect_from:
  - /v4/docs/mg-price-cart-connector
  - /v4/docs/en/mg-price-cart-connector
---

## Upgrading from Version 4.* to Version 6.0.0

{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.
{% endinfo_block %}

## Upgrading from Version 3.* to Version 4.*
In version 4 we have added support for multi-currency. First of all make sure you have [migrated the Price module](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-price.html). 
We have changed the way the default price type is assigned, it's not coming from the new price module, also the price will be assigned based on the current price mode, currency, type combination. 

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
