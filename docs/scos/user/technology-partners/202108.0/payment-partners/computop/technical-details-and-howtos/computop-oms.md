---
title: Computop - OMS
description: This article contains information on the state machine commands and conditions for the Computop module in the Spryker Commerce OS.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop-oms-details
originalArticleId: 24fc01dc-bae5-4689-a6bb-c93a26e07dba
redirect_from:
  - /2021080/docs/computop-oms-details
  - /2021080/docs/en/computop-oms-details
  - /docs/computop-oms-details
  - /docs/en/computop-oms-details
related:
  - title: Computop
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop.html
  - title: Computop - Sofort
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-sofort.html
  - title: Computop - PayPal
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-paypal.html
  - title: Computop - PayNow
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-paynow.html
  - title: Computop - Easy Credit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-easy-credit.html
  - title: Computop - API
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/technical-details-and-howtos/computop-api.html
  - title: Computop - iDeal
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-ideal.html
  - title: Computop - Direct Debit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-direct-debit.html
  - title: Computop - Credit Card
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-credit-card.html
  - title: Computop - CRIF
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-crif.html
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
