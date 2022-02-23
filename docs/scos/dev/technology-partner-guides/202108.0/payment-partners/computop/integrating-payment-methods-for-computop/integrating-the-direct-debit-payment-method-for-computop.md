---
title: Integrating the Direct Debit payment method for Computop
description: Integrate direct debit payment through Computop into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop-direct-debit
originalArticleId: 4fc82f9b-f9fb-4608-9f1c-59f42cf54619
redirect_from:
  - /2021080/docs/computop-direct-debit
  - /2021080/docs/en/computop-direct-debit
  - /docs/computop-direct-debit
  - /docs/en/computop-direct-debit
related:
  - title: Integrating the Sofort payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayPal payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paypal-payment-method-for-computop.html
  - title: Integrating the PayNow payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paynow-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-easy-credit-payment-method-for-computop.html
  - title: Computop API calls
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/computop-api-calls.html
  - title: Computop
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop.html
  - title: Integrating the iDeal payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-ideal-payment-method-for-computop.html
  - title: Computop - Credit Card
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-credit-card-payment-method-for-computop.html
  - title: Integrating the CRIF payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-crif-payment-method-for-computop.html
  - title: Integrating the Paydirekt payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paydirekt-payment-method-for-computop.html
---

 Example State Machine:

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-direct-debit-flow-example.png)

## Front-end Integration

To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/direct_debit.twig`

## State Machine Integration

The Computop provides a demo state machine for Direct Debit payment method which implements Authorization/Capture flow.

To enable the demo state machine, extend the configuration with the following values:
```php
 <?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 ComputopConfig::PAYMENT_METHOD_DIRECT_DEBIT => 'ComputopDirectDebit',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopDirectDebit',
];
```

## Direct Debit Payment Flow:

1. There is a radio button on "Payment" step. After submitting the order the customer will be redirected to the Computop (Paygate form implementation). The GET consists of 3 parameters:
  - Data (encrypted parameters, e.g. currency, amount, description)
  - Length (length of 'data' parameter)
  - Merchant id (assigned by Computop)
Customer sets up all data just after the redirect to Computop.  Init action: "Authorization". There is no Order call provided for this payment method. But Authorization call is working as Order call - without holding money. There is no call for holding money for this payment method.
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId`. On error, the customer  will be redirected to "Payment" step with the error message by default. Response data is stored in the DB.
3. Capture/Refund and Cancel actions are implemented in the admin panel (on manage order). On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.

## Set Up Details:

For partial refunds:
1. Partial refunds are possible for direct debit transactions.
2. But please note, that you can not test it in test mode.
3. If you want to test it, you have to say it afterwards to Computop help desk, so that they can prepare the transaction.
