---
title: Integrating the Invoice payment method for RatePay
description: Learn how to integrate invoice payment through Ratepay into the Spryker-based project.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-invoice
originalArticleId: a9b40611-e42e-4529-918d-3fab9774f420
redirect_from:
  - /docs/scos/user/technology-partners/202311.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-invoice-payment-method-for-ratepay.html
  - /docs/scos/user/technology-partners/202311.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-invoice-payment-method-for-ratepay.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-invoice-payment-method-for-ratepay.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-invoice-payment-method-for-ratepay.html
related:
  - title: RatePay facade methods
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-facade-methods.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/disable-address-updates-from-the-backend-application-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Prepayment payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-prepayment-payment-method-for-ratepay.html
  - title: RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-payment-workflow.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-state-machine-commands-and-conditions.html
  - title: Integrating the Installment payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-installment-payment-method-for-ratepay.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-direct-debit-payment-method-for-ratepay.html
---

## Payment Flow Scenario

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-installment-payment-flow.png)

## Cancellation Flow Scenario

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-invoice-cancellation-flow.png)

## Partial Cancellation Flow Scenario

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-invoice-partial-cancellation-flow.png)

## Refund Flow Scenario

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-invoice-refund-flow.png)


## Integrating RatePAY Invoice Payment

To integrate invoice payment, you need to: RatePAY invoice payment configuration and call the facade functions.

## Setting RatePAY Invoice Configuration

The configuration to integrate invoice payments using RatePAY is:

* `PROFILE_ID`: merchant's login (required).

* `SECURITY_CODE`: merchant's password (required).

* `SHOP_ID`: shop identifier (required).

* `SYSTEM_ID`: system identifier (required).

* `CLIENT_VERSION`: client system version.

* `CLIENT_NAME`: client name.

* `RATEPAY_REQUEST_VERSION`: request version.

* `RATEPAY_REQUEST_XMLNS_URN`: request XMLNS urn.

* `MODE`: the mode of the transaction, either test or live (required).

* `API_TEST_URL`: test mode API url.

* `API_LIVE_URL`: live mode API url.

## Perform Requests

To perform the needed requests,  use the [RatePAY State Machine Commands and Conditions](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/ratepay/ratepay-state-machine-commands-and-conditions.html) . You can also use the `facademethods`directly which, however, are invoked by the state machine.
