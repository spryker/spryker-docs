---
title: Computop - Paydirekt
description: Integrate Paydirekt payment through Computop into the Spryker-based shop.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/computop-paydirekt
originalArticleId: f8fa1336-ba92-49c5-b544-fcdd567bb943
redirect_from:
  - /v6/docs/computop-paydirekt
  - /v6/docs/en/computop-paydirekt
related:
  - title: Computop
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/computop.html
  - title: Computop - Sofort
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/computop-payment-methods/computop-sofort.html
  - title: Computop - PayPal
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/computop-payment-methods/computop-paypal.html
  - title: Computop - PayNow
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/computop-payment-methods/computop-paynow.html
  - title: Computop - Easy Credit
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/computop-payment-methods/computop-easy-credit.html
  - title: Computop - API
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/technical-details-and-howtos/computop-api.html
  - title: Computop - iDeal
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/computop-payment-methods/computop-ideal.html
  - title: Computop - OMS
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/technical-details-and-howtos/computop-oms.html
  - title: Computop - Direct Debit
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/computop-payment-methods/computop-direct-debit.html
  - title: Computop - Credit Card
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop/computop-payment-methods/computop-credit-card.html
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
