---
title: Integrating the Split-payment Marketplace payment method for Heidelpay
description: Integrate Split payment Marketplace through Heidelpay into the Spryker-based shop.
last_updated: Dec 26, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/heidelpay-split-payment-marketplace
originalArticleId: e0030693-d054-4d2f-87d6-145f9e0a0cdb
redirect_from:
  - /v4/docs/heidelpay-split-payment-marketplace
  - /v4/docs/en/heidelpay-split-payment-marketplace
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

The following configuration should be made after Heidelpay has been [installed](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/heidelpay/installing-heidelpay.html) and [integrated](/docs/scos/dev/technology-partner-guides/{{page.version}}/payment-partners/heidelpay/integrating-heidelpay.html).

## Configuration

Example:
```php
// Heidelpay Split-payment marketplace logic
$config[HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY] = true;
```

## Project Implementation

A project level should set quote items and expenses information the field Heidelpay Item Channel Id. It could be done using cart expander plugin.

Example:
```php
$quoteItem->setHeidelpayItemChannelId('........');
```
