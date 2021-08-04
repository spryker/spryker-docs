---
title: Heidelpay - Split-payment Marketplace
originalLink: https://documentation.spryker.com/v6/docs/heidelpay-split-payment-marketplace
redirect_from:
  - /v6/docs/heidelpay-split-payment-marketplace
  - /v6/docs/en/heidelpay-split-payment-marketplace
---

## Setup

The following configuration should be made after Heidelpay has been [installed](/docs/scos/dev/technology-partners/202001.0/payment-partners/heidelpay/heidelpay-insta) and [integrated](/docs/scos/dev/technology-partners/202001.0/payment-partners/heidelpay/scos-integration/heidelpay-confi).

## Configuration

Example:
```php
// Heidelpay Split-payment marketplace logic
$config[HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY] = true;
```

## Project Implementation

A project level should set quote items and expenses information the field Heidelpay Item Channel Id. It could be done [using cart expander plugin](https://documentation.spryker.com/v4/docs/cart-functionality#cart-expanders).

Example:
```php
$quoteItem->setHeidelpayItemChannelId('........');
```
