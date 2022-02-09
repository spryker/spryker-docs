---
title: Computop API calls
description: This article provides details on the API structure of the Computop module in the Spryker Commerce OS.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/computop-api-details
originalArticleId: 624fa56e-71eb-4e95-ae24-3d43f827ca2d
redirect_from:
  - /v3/docs/computop-api-details
  - /v3/docs/en/computop-api-details
related:
  - title: Computop
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop.html
  - title: Integrating the Sofort payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayPal payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paypal-payment-method-for-computop.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-direct-debit-payment-method-for-computop.html
  - title: Integrating the iDeal payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-ideal-payment-method-for-computop.html
  - title: Integrating the Сredit Сard payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-credit-card-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-easy-credit-payment-method-for-computop.html
  - title: Integrating the Paydirekt payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paydirekt-payment-method-for-computop.html
  - title: Integrating the CRIF payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-crif-payment-method-for-computop.html
---

## Authorization Call:

* Authorize money.
* There is no partial authorization. Please make one API call to make authorization for all items in the order.
* It is not possible to Authorize a higher amount than in the ORDER.

## Inquire Call:

Status inquiries within Paygate give detailed information about the amounts that are actually authorized, captured or credited. Especially before executing reversals via the interface reverse.aspx it is recommended to check the transaction status with inquire.aspx because Reverse.aspx re-verses not only authorizations but ALWAYS THE LAST TRANSACTION STEP.

## Reverse Call:

* Reverse.aspx does not only reverse authorizations, but also any LAST TRANSACTION STAGE! If the last transaction was a capture, Reverse.aspx initiates the reverse, e.g. a credit. Therefore, the utmost caution is urged. Use it at your own risk. We recommend checking the transaction status with Inquire.aspx before using Reverse.aspx.
* Use it just after "Inquire" call if it returns the previous action as "Authorization".

## Capture Call:

* Capture money.
* Shipment price is captured with the first capture request.
* Please contact the helpdesk, if you want to capture amounts < 100 (the smallest currency unit).
* It is not possible to capture a higher amount than in the ORDER or Auth.

## Refund Call:

* Refund money.
* The merchant has the chance to refund more money to the customer than captured.
* Shipment price will be refunded with the last possible refund request. If You do not need to refund shipment price:
    - Create `Pyz\Zed\Computop\ComputopConfig`.
    - Extend it from original `SprykerEco\Zed\Computop\ComputopConfig`.
    - Update `isRefundShipmentPriceEnabled` method (set up "false").
