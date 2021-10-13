---
title: Heidelpay - Split-payment Marketplace
description: Integrate Split payment Marketplace through Heidelpay into the Spryker-based shop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/heidelpay-split-payment-marketplace
originalArticleId: e0030693-d054-4d2f-87d6-145f9e0a0cdb
redirect_from:
  - /v4/docs/heidelpay-split-payment-marketplace
  - /v4/docs/en/heidelpay-split-payment-marketplace
---

## Setup

The following configuration should be made after Heidelpay has been [installed](/docs/scos/dev/technology-partners/202001.0/payment-partners/heidelpay/heidelpay-installation.html) and [integrated](/docs/scos/dev/technology-partners/202001.0/payment-partners/heidelpay/scos-integration/heidelpay-configuration-for-scos.html).

## Configuration

Example:
```php
// Heidelpay Split-payment marketplace logic
$config[HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY] = true;
```

## Project Implementation

A project level should set quote items and expenses information the field Heidelpay Item Channel Id. It could be done [using cart expander plugin](/docs/scos/user/features/{{page.version}}/cart-feature-overview/cart-functionality-and-calculations/cart-functionality.html#cart-expanders).

Example:
```php
$quoteItem->setHeidelpayItemChannelId('........');
```
