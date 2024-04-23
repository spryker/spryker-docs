---
title: Payolution request flow
description: This article describes the request flow for Payolution.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payolution-workflow
originalArticleId: 5b1cfc2a-7960-4d1c-96e5-1243473d3d50
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/payolution/payolution-request-flow.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payolution/payolution-request-flow.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/payolution/payolution-request-flow.html
related:
  - title: Integrating the invoice paymnet method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-invoice-payment-method-for-payolution.html
  - title: Integrating the installment payment method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-installment-payment-method-for-payolution.html
  - title: Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution.html
  - title: Installing and configuring Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/install-and-configure-payolution.html
  - title: Payolution - Performing Requests
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-performing-requests.html
---

Both [invoice](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payolution/integrate-the-invoice-payment-method-for-payolution.html) and [installment](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payolution/integrate-the-installment-payment-method-for-payolution.html) payment methods utilize the same request flow. It basically consists of the following requests:
* Calculation (for instalment only): to calculate the instalment amounts, dues, and durations.
* Pre-check (optional): to check the user information in order to make sure that all the needed information is correct before doing the actual pre-authorization.
* Pre-authorize: to perform a payment risk check which is a mandatory step before every payment. The payment is basically considered accepted when it is authorized.
* Re-authorize: to update an existing authorization if necessary.
* Revert: to cancel the authorization step which basically cancels the payment before capturing.
* Capture: to capture the payment and receive money from the buyer.
* Refund: to refund the buyer when returning products.

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-workflow.png)  

See Payolution - [Performing Requests](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payolution/payolution-performing-requests.html) for detailed information on the requests.
