---
title: Migration Guide - Cart
description: Use the guide to update versions to the newer ones of the Cart module.
originalLink: https://documentation.spryker.com/2021080/docs/mg-cart
originalArticleId: be41d310-b875-4753-b5f5-a01b8ae6b3f8
redirect_from:
  - /2021080/docs/mg-cart
  - /2021080/docs/en/mg-cart
  - /docs/mg-cart
  - /docs/en/mg-cart
---

## Upgrading from Version 5.* to Version 7.0.0

{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)

## Upgrading from Version 4.* to Version 5.*

With the implementation of the quote storage strategies, the new version of the Cart module allows to use different behaviors for different strategies.
Since `QuoteClient::getStorageStrategy` method is used now, the Quote module's version must be 2.0.0 or higher.
`CartClientInterface::storeQuote` method is deprecated, remove it from your code and use `QuoteClientInterface::setQuote()`  instead.
`CartClientInterface::getZedStub` method is deprecated, remove it from your code and use `\Spryker\Client\ZedRequest\ZedRequestClient::addFlashMessagesFromLastZedRequest` to push stack of ZED request messages to flash messages.

All logic from CartClient has been moved to `\Spryker\Client\Cart\Plugin\SessionQuoteStorageStrategyPlugin`.
Make sure that all your local overwrites of those methods have been moved there.

<!-- Last review date: Apr 10, 2018- by Dmitriy Krainiy -->
