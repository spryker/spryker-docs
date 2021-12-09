---
title: Migration guide - PriceCartConnector
description: Use the guide to learn how to update the PriceCartConnector module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-price-cart-connector
originalArticleId: 2755d789-693c-4f7c-8488-7935e1c455d2
redirect_from:
  - /2021080/docs/mg-price-cart-connector
  - /2021080/docs/en/mg-price-cart-connector
  - /docs/mg-price-cart-connector
  - /docs/en/mg-price-cart-connector
  - /v1/docs/mg-price-cart-connector
  - /v1/docs/en/mg-price-cart-connector
  - /v2/docs/mg-price-cart-connector
  - /v2/docs/en/mg-price-cart-connector
  - /v3/docs/mg-price-cart-connector
  - /v3/docs/en/mg-price-cart-connector
  - /v4/docs/mg-price-cart-connector
  - /v4/docs/en/mg-price-cart-connector
  - /v5/docs/mg-price-cart-connector
  - /v5/docs/en/mg-price-cart-connector
  - /v6/docs/mg-price-cart-connector
  - /v6/docs/en/mg-price-cart-connector
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-pricecartconnector.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-pricecartconnector.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-pricecartconnector.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-pricecartconnector.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-pricecartconnector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-pricecartconnector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-pricecartconnector.html
related:
  - title: Migration guide - Price
    link: docs/scos/dev/module-migration-guides/migration-guide-price.html
  - title: Migration guide - MultiCurrency
    link: docs/scos/dev/module-migration-guides/migration-guide-multi-currency.html
---

## Upgrading from Version 4.* to Version 6.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}


## Upgrading from Version 3.* to Version 4.*

In version 4 we have added support for multi-currency. First of all make sure you have [migrated the Price module](/docs/scos/dev/module-migration-guides/migration-guide-price.html).
We have changed the way the default price type is assigned, it's not coming from the new price module, also the price will be assigned based on the current price mode, currency, type combination.

<!-- Last review date: Nov 23, 2017 by Aurimas Ličkus -->
