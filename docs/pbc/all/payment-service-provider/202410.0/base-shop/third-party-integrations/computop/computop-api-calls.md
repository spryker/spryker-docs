---
title: Computop API calls
description: This article provides details on the API structure of the Computop module in the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop-api-details
originalArticleId: 40f89caf-03ea-43b6-975d-364f30c29f52
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/computop/computop-api-calls.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/computop/computop-api-calls.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/computop/computop-api-calls.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/computop/computop-api-calls.html
related:
  - title: Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/computop.html
  - title: Integrating the Sofort payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayPal payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paypal-payment-method-for-computop.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-direct-debit-payment-method-for-computop.html
  - title: Integrating the iDeal payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-ideal-payment-method-for-computop.html
  - title: Integrating the Credit Card payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-credit-card-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-easy-credit-payment-method-for-computop.html
  - title: Integrating the Paydirekt payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paydirekt-payment-method-for-computop.html
  - title: Integrating the CRIF payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-crif-payment-method-for-computop.html
---

## Authorization Call

* Authorize money.
* There is no partial authorization. Please make one API call to make authorization for all items in the order.
* It is not possible to Authorize a higher amount than in the ORDER.

## Inquire Call

Status inquiries within Paygate give detailed information about the amounts that are actually authorized, captured or credited. Especially before executing reversals via the interface reverse.aspx it's recommended to check the transaction status with inquire.aspx because Reverse.aspx re-verses not only authorizations but ALWAYS THE LAST TRANSACTION STEP.

## Reverse Call

* Reverse.aspx does not only reverse authorizations, but also any last transaction stage. If the last transaction was a capture, `Reverse.aspx` initiates the reverse–for example, a credit. Therefore, the utmost caution is urged. Use it at your own risk. We recommend checking the transaction status with Inquire.aspx before using Reverse.aspx.
* Use it just after "Inquire" call if it returns the previous action as "Authorization".

## Capture Call

* Capture money.
* Shipment price is captured with the first capture request.
* Please contact the helpdesk, if you want to capture amounts < 100 (the smallest currency unit).
* It is not possible to capture a higher amount than in the ORDER or Auth.

## Refund Call

* Refund money.
* The merchant has the chance to refund more money to the customer than captured.
* Shipment price will be refunded with the last possible refund request. If You do not need to refund shipment price:
  * Create `Pyz\Zed\Computop\ComputopConfig`.
  * Extend it from original `SprykerEco\Zed\Computop\ComputopConfig`.
  * Update `isRefundShipmentPriceEnabled` method (set up "false").
