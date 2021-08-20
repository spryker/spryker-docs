---
title: Heidelpay - Split-payment Marketplace
description: Integrate Split payment Marketplace through Heidelpay into the Spryker-based shop.
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-split-payment-marketplace
originalArticleId: e418b364-ca18-4947-9dd0-a100378dd90a
redirect_from:
  - /2021080/docs/heidelpay-split-payment-marketplace
  - /2021080/docs/en/heidelpay-split-payment-marketplace
  - /docs/heidelpay-split-payment-marketplace
  - /docs/en/heidelpay-split-payment-marketplace
---

## Setup

The following configuration should be made after Heidelpay has been [installed](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/heidelpay/heidelpay-installation.html) and [integrated](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/heidelpay/scos-integration/heidelpay-configuration-for-scos.html).

## Configuration

Example:
```php
// Heidelpay Split-payment marketplace logic
$config[HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY] = true;
```

## Project Implementation

A project level should set quote items and expenses information the field Heidelpay Item Channel Id. It could be done [using cart expander plugin](/docs/scos/dev/features/{{page.version}}/cart/cart-feature-overview/cart-module-reference-information.html#cart-expanders).

Example:
```php
$quoteItem->setHeidelpayItemChannelId('........');
```
