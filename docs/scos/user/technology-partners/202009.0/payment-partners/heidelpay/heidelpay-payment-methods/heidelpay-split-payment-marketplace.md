---
title: Heidelpay - Split-payment Marketplace
description: Integrate Split payment Marketplace through Heidelpay into the Spryker-based shop.
originalLink: https://documentation.spryker.com/v6/docs/heidelpay-split-payment-marketplace
originalArticleId: 2b1bcd17-d95c-41a3-a764-a0e1191434cd
redirect_from:
  - /v6/docs/heidelpay-split-payment-marketplace
  - /v6/docs/en/heidelpay-split-payment-marketplace
---

## Setup

The following configuration should be made after Heidelpay has been [installed](/docs/scos/dev/technology-partners/202009.0/payment-partners/heidelpay/heidelpay-installation.html) and [integrated](/docs/scos/dev/technology-partners/202009.0/payment-partners/heidelpay/scos-integration/heidelpay-configuration-for-scos.html).

## Configuration

Example:
```php
// Heidelpay Split-payment marketplace logic
$config[HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY] = true;
```

## Project Implementation

A project level should set quote items and expenses information the field Heidelpay Item Channel Id. It could be done [using cart expander plugin](/docs/scos/user/features/{{page.version}}/cart-feature-overview/cart-module-reference-information.html#cart-expanders).

Example:
```php
$quoteItem->setHeidelpayItemChannelId('........');
```
