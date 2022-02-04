---
title: Integrating the Split-payment Marketplace payment method for Heidelpay
description: Integrate Split payment Marketplace through Heidelpay into the Spryker-based shop.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/heidelpay-split-payment-marketplace
originalArticleId: d995f0cf-1f78-41d1-a08a-05a85dbbb32f
redirect_from:
  - /v3/docs/heidelpay-split-payment-marketplace
  - /v3/docs/en/heidelpay-split-payment-marketplace
related:
  - title: Heidelpay
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay.html
  - title: Integrating the Credit Card Secure payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-credit-card-secure-payment-method-for-heidelpay.html
  - title: Configuring Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/configuring-heidelpay.html
  - title: Integrating the Direct Debit payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-direct-debit-payment-method-for-heidelpay.html
  - title: Integrating Heidelpay into the Legacy Demoshop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-heidelpay-into-the-legacy-demoshop.html
  - title: Integrating the Paypal Authorize payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-paypal-authorize-payment-method-for-heidelpay.html
  - title: Integrating Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-heidelpay.html
  - title: Installing Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/installing-heidelpay.html
  - title: Heidelpay workflow for errors
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/heidelpay-workflow-for-errors.html
  - title: Integrating the Easy Credit payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-easy-credit-payment-method-for-heidelpay.html
---

## Setup

The following configuration should be made after Heidelpay has been [installed](/docs/scos/user/technology-partners/201907.0/payment-partners/heidelpay/installing-heidelpay.html) and [integrated](/docs/scos/user/technology-partners/201907.0/payment-partners/heidelpay/configuring-heidelpay.html).

## Configuration

Example:
```php
// Heidelpay Split-payment marketplace logic
$config[HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY] = true;
```

## Project Implementation

A project level should set quote items and expenses information the field Heidelpay Item Channel Id. It could be done [using cart expander plugin](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/cart-functionality.html#cart-expanders).

Example:
```php
$quoteItem->setHeidelpayItemChannelId('........');
```
