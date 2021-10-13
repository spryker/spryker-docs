---
title: Payolution - Workflow
description: This article describes the request flow for Payolution.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/payolution-workflow
originalArticleId: 6ee05271-0bbd-4704-944b-6e4b97c515cf
redirect_from:
  - /v3/docs/payolution-workflow
  - /v3/docs/en/payolution-workflow
related:
  - title: Payolution - Invoice Payment
    link: docs/scos/user/technology-partners/201811.0/payment-partners/payolution/payolution-payment-methods/payolution-invoice-payment.html
  - title: Payolution - Installment Payment
    link: docs/scos/user/technology-partners/201811.0/payment-partners/payolution/payolution-payment-methods/payolution-installment-payment.html
  - title: Payolution
    link: docs/scos/user/technology-partners/201811.0/payment-partners/payolution/payolution.html
  - title: Payolution - Configuration
    link: docs/scos/user/technology-partners/201811.0/payment-partners/payolution/payolution-installation-and-configuration.html
  - title: Payolution - Performing Requests
    link: docs/scos/user/technology-partners/201811.0/payment-partners/payolution/technical-details-and-howtos/payolution-performing-requests.html
---

Both invoice and installment utilize the same request flow. It basically consists of the following requests:

* Calculation (for installment only): to calculate the installment amounts, dues, and durations.
* Pre-check (optional): to check the user information in order to make sure that all the needed information is correct before doing the actual pre-authorization.
* Pre-authorize: to perform a payment risk check which is a mandatory step before every payment. The payment is basically considered accepted when it is authorized.
* Re-authorize: to update an existing authorization if necessary.
* Revert: to cancel the authorization step which basically cancels the payment before capturing.
* Capture: to capture the payment and receive money from the buyer.
* Refund: to refund the buyer when returning products.

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-workflow.png)  
