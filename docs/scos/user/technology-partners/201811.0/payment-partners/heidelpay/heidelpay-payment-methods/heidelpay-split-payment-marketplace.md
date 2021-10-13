---
title: Heidelpay - Split-payment Marketplace
description: Integrate Split payment Marketplace through Heidelpay into the Spryker-based shop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/heidelpay-split-payment-marketplace
originalArticleId: f54601d8-ab6f-49c0-a36b-36c99494b36b
redirect_from:
  - /v1/docs/heidelpay-split-payment-marketplace
  - /v1/docs/en/heidelpay-split-payment-marketplace
related:
  - title: Heidelpay
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay.html
  - title: Heidelpay - Credit Card Secure
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-credit-card-secure.html
  - title: Heidelpay - Configuration for SCOS
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/scos-integration/heidelpay-configuration-for-scos.html
  - title: Heidelpay - Direct Debit
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-direct-debit.html
  - title: Heidelpay - Integration into the Legacy Demoshop
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-integration-into-the-legacy-demoshop.html
  - title: Heidelpay - Paypal Authorize
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-paypal-authorize.html
  - title: Heidelpay - Integration into SCOS
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/scos-integration/heidelpay-integration-into-scos.html
  - title: Heidelpay - Installation
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-installation.html
  - title: Heidelpay - Workflow for Errors
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/technical-details-and-howtos/heidelpay-workflow-for-errors.html
  - title: Heidelpay - Easy Credit
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-easy-credit.html
---

## Setup

The following configuration should be made after Heidelpay has been [installed](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-installation.html) and [integrated](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/scos-integration/heidelpay-configuration-for-scos.html).

## Configuration

Example:
```php
// Heidelpay Split-payment marketplace logic
$config[HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY] = true;
```

## Project Implementation

A project level should set quote items and expenses information the field Heidelpay Item Channel Id. It could be done [using cart expander plugin](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/cart-module-reference-information.html#cart-expanders).

Example:
```php
$quoteItem->setHeidelpayItemChannelId('........');
```
