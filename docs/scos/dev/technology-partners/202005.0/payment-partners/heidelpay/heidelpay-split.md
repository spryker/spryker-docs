---
title: Heidelpay - Split-payment Marketplace
originalLink: https://documentation.spryker.com/v5/docs/heidelpay-split-payment-marketplace
redirect_from:
  - /v5/docs/heidelpay-split-payment-marketplace
  - /v5/docs/en/heidelpay-split-payment-marketplace
---

## Setup

The following configuration should be made after Heidelpay has been [installed](https://documentation.spryker.com/docs/en/heidelpay-installation) and [integrated](https://documentation.spryker.com/docs/en/heidelpay-configuration-scos).

## Configuration

Example:
```php
// Heidelpay Split-payment marketplace logic
$config[HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY] = true;
```

## Project Implementation

A project level should set quote items and expenses information the field Heidelpay Item Channel Id. It could be done [using cart expander plugin](https://documentation.spryker.com/docs/en/cart-functionality#cart-expanders).

Example:
```php
$quoteItem->setHeidelpayItemChannelId('........');
```
