---
title: Payolution - Workflow
description: This article describes the request flow for Payolution.
last_updated: Jan 26, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/payolution-workflow
originalArticleId: f2860a87-e64e-4786-890f-8ea480c78fe8
redirect_from:
  - /v5/docs/payolution-workflow
  - /v5/docs/en/payolution-workflow
related:
  - title: Payolution - Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/payolution/payolution-payment-methods/payolution-invoice-payment.html
  - title: Payolution - Installment Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/payolution/payolution-payment-methods/payolution-installment-payment.html
  - title: Payolution
    link: docs/scos/user/technology-partners/page.version/payment-partners/payolution/payolution.html
  - title: Payolution - Configuration
    link: docs/scos/user/technology-partners/page.version/payment-partners/payolution/payolution-installation-and-configuration.html
  - title: Payolution - Performing Requests
    link: docs/scos/user/technology-partners/page.version/payment-partners/payolution/technical-details-and-howtos/payolution-performing-requests.html
---

Both [invoice](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/payolution/payolution-provided-payment-methods/payolution-invoice-payment.html) and [installment](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/payolution/payolution-provided-payment-methods/payolution-installment-payment.html) payemnt methods utilize the same request flow. It basically consists of the following requests:

* Calculation (for installment only): to calculate the installment amounts, dues, and durations.
* Pre-check (optional): to check the user information in order to make sure that all the needed information is correct before doing the actual pre-authorization.
* Pre-authorize: to perform a payment risk check which is a mandatory step before every payment. The payment is basically considered accepted when it is authorized.
* Re-authorize: to update an existing authorization if necessary.
* Revert: to cancel the authorization step which basically cancels the payment before capturing.
* Capture: to capture the payment and receive money from the buyer.
* Refund: to refund the buyer when returning products.

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-workflow.png)  

See Payolution - [Performing Requests](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/payolution/payolution-performing-requests.html) for detailed information on the requests.
