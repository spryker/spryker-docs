---
title: Computop - OMS plugins
description: This article contains information on the state machine commands and conditions for the Computop module in the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop-oms-details
originalArticleId: 24fc01dc-bae5-4689-a6bb-c93a26e07dba
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/computop/computop-oms-plugins.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/computop/computop-oms-plugins.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/computop/computop-oms-plugins.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/computop/computop-oms-plugins.html
related:
  - title: Computop
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/computop.html
  - title: Integrating the Sofort payment method for Computop
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayPal payment method for Computop
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paypal-payment-method-for-computop.html
  - title: Integrating the PayNow payment method for Computop
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paynow-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-easy-credit-payment-method-for-computop.html
  - title: Computop API calls
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/computop-api-calls.html
  - title: Integrating the iDeal payment method for Computop
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-ideal-payment-method-for-computop.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-direct-debit-payment-method-for-computop.html
  - title: Integrating the Credit Card payment method for Computop
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-credit-card-payment-method-for-computop.html
  - title: Integrating the CRIF payment method for Computop
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-crif-payment-method-for-computop.html
---

The following plugins are used for performing calls to Paygate during OMS operation.

## Authorize Plugin

Makes an Authorize call to Computop.

## Cancel Plugin

Follow these steps to cancel the item in the order in case all the items or the last possible one got canceled:

1. Inquire a call to Computop.
2. Reverse a call to Computop in case Inquire returned "Authorization" was the last action.
3. Change the status of the current item in our DB in case the Inquire call returned that "Authorization" was not the last action. No API calls are needed.
4. If there is any item that is not canceled yet, change the status of the current item in our DB. No API calls are needed. There is no API call to change the order in Computop.

## Capture Plugin

Makes a Capture call to Computop.

## Refund Plugin

Makes a Refund call to Computop.
