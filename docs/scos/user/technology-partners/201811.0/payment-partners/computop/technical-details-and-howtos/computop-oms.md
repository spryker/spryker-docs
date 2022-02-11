---
title: Computop - OMS plugins
description: This article contains information on the state machine commands and conditions for the Computop module in the Spryker Commerce OS.
last_updated: Oct 23, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/computop-oms-details
originalArticleId: 22ab5611-d105-455b-9afa-30c7610ed3bb
redirect_from:
  - /v1/docs/computop-oms-details
  - /v1/docs/en/computop-oms-details
related:
  - title: Computop
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop.html
  - title: Integrating the Sofort payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayPal payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paypal-payment-method-for-computop.html
  - title: Integrating the PayNow payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paynow-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-easy-credit-payment-method-for-computop.html
  - title: Computop API calls
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/computop-api-calls.html
  - title: Integrating the iDeal payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-ideal-payment-method-for-computop.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-direct-debit-payment-method-for-computop.html
  - title: Computop - Credit Card
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-credit-card-payment-method-for-computop.html
  - title: Integrating the CRIF payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-crif-payment-method-for-computop.html
---

The following plugins are used for performing calls to Paygate during OMS operation.

## Authorize Plugin:
Makes an Authorize call to Computop.

## Cancel Plugin:
Follow these steps to cancel the item in the order in case all the items or the last possible one got canceled:

1. Inquire a call to Computop.
2. Reverse a call to Computop in case Inquire returned "Authorization" was the last action.
3. Change the status of the current item in our DB in case the Inquire call returned that "Authorization" was not the last action. No API calls are needed.
4. If there is any item that is not canceled yet:
  - Change the status of the current item in our DB. No API calls are needed. There is no API call to change the order in Computop.

## Capture Plugin:
Makes a Capture call to Computop.

## Refund Plugin:
Makes a Refund call to Computop.
