---
title: Integrating the Installment payment method for RatePay
description: Integrate installment payment through Ratepay into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-installment
originalArticleId: 3fe65872-d5b3-4c95-8757-6ae7ee0b2d87
redirect_from:
  - /docs/scos/user/technology-partners/202311.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-installment-payment-method-for-ratepay.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-installment-payment-method-for-ratepay
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-installment-payment-method-for-ratepay.html
  - /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-installment-payment-method-for-ratepay.html
related:
  - title: RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-payment-workflow.html
  - title: RatePay facade methods
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-facade-methods.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/disable-address-updates-from-the-backend-application-for-ratepay.html
  - title: Integrating the Invoice payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-invoice-payment-method-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Prepayment payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-prepayment-payment-method-for-ratepay.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-state-machine-commands-and-conditions.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-direct-debit-payment-method-for-ratepay.html
---

The shop must implement the Calculation Request operation to calculate an example installment plan and show it to the customer. Some input parameters for the calculation are passed from the shop–for example, the shopping basket total. Others are stored in the merchant's RatePAY profile held by the Gateway–for example, the allowed interest rate range. The merchant's profile parameters can be retrieved by the Configuration Request operation.

## Workflow Scenarios

### Payment Flow

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-installment-payment-flow.png)

### Cancellation Flow

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-installment-cancellation-flow.png)

### Partial Cancellation Flow

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-installment-partial-cancellation-flow.png)

### Refund Flow

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-installment-refund-flow.png)

## Integrating RatePAY Installment Payment

In order to integrate installment payment, two simple steps are needed: set RatePAY installment payment configuration and call the facade functions.

### Set RatePAY Installment Configuration

The installment requests use two additional types of requests called Configuration and Calculation Requests.

Three groups of configuration are defined:
- transaction configuration for handling the basic requests (init-payment, payment-request, etc)
- installment configuration for handling configuration
- calculation for handling calculation requests.

The configuration to integrate Installment payment method using RatePAY is:
- `PROFILE_ID`: merchant's login (required).
- `SECURITY_CODE`: merchant's password (required).
- `SHOP_ID`: shop identifier (required).
- `SYSTEM_ID`: system identifier (required).
- `CLIENT_VERSION`: client system version.
- `CLIENT_NAME`: client name.
- `RATEPAY_REQUEST_VERSION`: request version.
- R `ATEPAY_REQUEST_XMLNS_URN`: request XMLNS urn.
- `MODE`: the mode of the transaction, either test or live (required).
- `API_TEST_URL`: test mode API url.
- `API_LIVE_URL`: live mode API url.
- `DEBIT_PAY_TYPES`: debit pay types, can be DIRECT-DEBIT or BANK-TRANSFER.
- `INSTALLMENT_CALCULATION_TYPES`: installment calculator types, can be by time or by date.

You can copy over configs to your config from the RatePAY module's `config.dist.php` file.

### Perform Requests

In order to perform the needed requests, you can easily use the implemented state machine commands and conditions. The [RatePAY State Machine Commands and Conditions](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/ratepay/ratepay-state-machine-commands-and-conditions.html) section gives a summary of them. You can also use the facade methods directly which, however, are invoked by the state machine.
