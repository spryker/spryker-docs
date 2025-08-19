---
title: Integrating the installment payment method for Payolution
description: Integrate installment payment through Payolution into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payolution-installment
originalArticleId: 8859c087-cad6-43e0-8365-caf51c3423cf
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/payolution/integrating-the-installment-payment-method-for-payolution.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/payolution/integrating-the-installment-payment-method-for-payolution.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payolution/integrate-the-installment-payment-method-for-payolution.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/payolution/integrating-the-installment-payment-method-for-payolution.html
  - /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/payolution/integrate-the-installment-payment-method-for-payolution.html
related:
  - title: Installing and configuring Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/install-and-configure-payolution.html
  - title: Integrating Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-payolution.html
  - title: Payolution - Performing Requests
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-performing-requests.html
  - title: Payolution request flow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/payolution-request-flow.html
  - title: Integrating the invoice paymnet method for Payolution
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payolution/integrate-the-invoice-payment-method-for-payolution.html
---

## Installment Scenarios

### Standard Case

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-installment-standard-case.png)

### Full Refund

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-installment-fullrefund-case.png)

### Partial Refund

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-installment-partialrefund-case.png)

## Integrating Payolution Installment Payment

The In order to integrate installment payment, two simple steps are needed: setting Payolution installment payment configuration and calling the facade functions.

### Setting Payolution Installment Configuration

As installment requests use additional type of requests called Calculation Requests, two groups of configuration are defined: transaction configuration for handling the basic requests (pre-authorization, re-authorization, etc), and calculation configuration for handling calculation requests. The configuration to integrate installment payments using Payolution is:

| Key                                 | Description                                                                                                     | Required |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------|----------|
| `TRANSACTION_GATEWAY_URL`          | The gateway URL to connect with Payolution services                                                             | v        |
| `CALCULATION_GATEWAY_URL`          | The gateway URL to connect with Payolution calculation service                                                  | v        |
| `TRANSACTION_SECURITY_SENDER`      | The sender ID                                                                                                   | v        |
| `TRANSACTION_USER_LOGIN`           | The sender username                                                                                             | v        |
| `TRANSACTION_USER_PASSWORD`        | The sender password                                                                                             | v        |
| `CALCULATION_SENDER`               | The sender name for the calculation request (default is Spryker)                                                |          |
| `CALCULATION_USER_LOGIN`           | The sender username for the calculation request                                                                 | v        |
| `CALCULATION_USER_PASSWORD`        | The sender password for the calculation request                                                                 | v        |
| `TRANSACTION_MODE`                 | The mode of the transaction, either test or live                                                                | v        |
| `CALCULATION_MODE`                 | The mode of the calculation, either test or live                                                                | v        |
| `TRANSACTION_CHANNEL_PRE_CHECK`    | A Payolution channel for handling pre-check requests, if using Pre-check                                       |          |
| `TRANSACTION_CHANNEL_INSTALLMENT`  | A Payolution channel for handling installment requests except Pre-check and calculation                         | v        |
| `CALCULATION_CHANNEL`              | A Payolution channel for handling calculation requests                                                           | v        |
| `MIN_ORDER_GRAND_TOTAL_INSTALLMENT`| The minimum order grand total amount for installment payments–for example, $2.                                        | v        |
| `MAX_ORDER_GRAND_TOTAL_INSTALLMENT`| The maximum order grand total amount for installment payments–for example, $5000.                                     | v        |
| `PAYOLUTION_BCC_EMAIL_ADDRESS`     | Payolution email address to send copies of payment details                                                      |          |
