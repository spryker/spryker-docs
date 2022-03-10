---
title: Integrating the Paydirekt payment method for Computop
description: Integrate Paydirekt payment through Computop into the Spryker-based shop.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/computop-paydirekt
originalArticleId: 2cf9ee5a-677c-41f0-b2b4-f488fbaed171
redirect_from:
  - /v2/docs/computop-paydirekt
  - /v2/docs/en/computop-paydirekt
related:
  - title: Computop
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop.html
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
  - title: Integrating the iDeal payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-ideal-payment-method-for-computop.html
  - title: Computop - OMS plugins
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/computop-oms-plugins.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-direct-debit-payment-method-for-computop.html
  - title: Integrating the Сredit Сard payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-credit-card-payment-method-for-computop.html
---

Example State Machine:
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-paydirekt-flow-example.png) 

## Front-end Integration
To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/paydirekt.twig`

## State Machine Integration
The Computop provides a demo state machine for Paydirekt payment method which implements Authorization/Capture flow.

To enable the demo state machine, extend the configuration with the following values:

```php
 <?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 ComputopConfig::PAYMENT_METHOD_PAYDIREKT => 'ComputopPaydirekt',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopPaydirekt',
];
```

## Paydirekt Payment Flow

1. There is a radio button on "Payment" step.
 After submitting the order the customer will be redirected to the Computop (Paygate form implementation). The GET consists of 3 parameters:
  - data (encrypted parameters, e.g. currency, amount, description);
  - length (length of 'data' parameter);
  - merchant id (assigned by Computop);
Customer sets up all data just after the redirect to Computop.
Init action: "Authorization". There is no Order call provided for this payment method.
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId`. On error, the customer  will be redirected to "Payment" step with the error message by default. Response data is stored in the DB.
3. Capture/Refund and Cancel actions are implemented in the admin panel (on manage order). On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.

## Set Up Details

 Credits are possible up to 200% of the captured amount if such setup is enabled for the merchant and that payment method within Paygate by Computop helpdesk.
