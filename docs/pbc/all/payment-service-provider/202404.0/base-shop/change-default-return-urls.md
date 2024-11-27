---
title: Change the default return URLs for payments
description: Learn how to change the default return URLs to be used by third-party payment service providers
last_updated: Nov. 27, 2024
template: howto-guide-template
---

Payment methods are configured to redirect the customer to a specific URL after the payment process is completed, has failed, or was cancelled. This document provides information on how to change the default return URLs for payments.

## Change the default return URLs

Some 3rd party integrations only use a return URL while others can also use a failure and/or cancel URL. The ForeignPayment class is responsible to send the expected return URLs to the Payment App which are then used if applicable.

To change the default return URLs, you can  use the following methods:

- `\Spryker\Zed\Payment\PaymentConfig::getSuccessRoute()`
- `\Spryker\Zed\Payment\PaymentConfig::getCancelRoute()`
- `\Spryker\Zed\Payment\PaymentConfig::getCheckoutSummaryPageRoute()`
