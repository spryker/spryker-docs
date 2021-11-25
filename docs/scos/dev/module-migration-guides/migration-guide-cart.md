---
title: Migration guide - Cart
description: Use the guide to update versions to the newer ones of the Cart module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-cart
originalArticleId: be41d310-b875-4753-b5f5-a01b8ae6b3f8
redirect_from:
  - /2021080/docs/mg-cart
  - /2021080/docs/en/mg-cart
  - /docs/mg-cart
  - /docs/en/mg-cart
  - /v1/docs/mg-cart
  - /v1/docs/en/mg-cart
  - /v2/docs/mg-cart
  - /v2/docs/en/mg-cart
  - /v3/docs/mg-cart
  - /v3/docs/en/mg-cart
  - /v4/docs/mg-cart
  - /v4/docs/en/mg-cart
  - /v5/docs/mg-cart
  - /v5/docs/en/mg-cart
  - /v6/docs/mg-cart
  - /v6/docs/en/mg-cart
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-cart.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-cart.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-cart.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-cart.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-cart.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-cart.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-cart.html

related:
  - title: Migration guide - Quote
    link: docs/scos/dev/module-migration-guides/migration-guide-quote.html
---

## Upgrading from version 5.* to version 7.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from version 4.* to version 5.*

With the implementation of the quote storage strategies, the new version of the Cart module allows to use different behaviors for different strategies.
Since `QuoteClient::getStorageStrategy` method is used now, the Quote module's version must be 2.0.0 or higher.
`CartClientInterface::storeQuote` method is deprecated, remove it from your code and use `QuoteClientInterface::setQuote()`  instead.
`CartClientInterface::getZedStub` method is deprecated, remove it from your code and use `\Spryker\Client\ZedRequest\ZedRequestClient::addFlashMessagesFromLastZedRequest` to push stack of ZED request messages to flash messages.

All logic from CartClient has been moved to `\Spryker\Client\Cart\Plugin\SessionQuoteStorageStrategyPlugin`.
Make sure that all your local overwrites of those methods have been moved there.

<!-- Last review date: Apr 10, 2018- by Dmitriy Krainiy -->
