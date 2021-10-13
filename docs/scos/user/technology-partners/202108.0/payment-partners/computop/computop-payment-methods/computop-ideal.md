---
title: Computop - iDeal
description: Integrate iDeal payment through Computop into the Spryker-based shop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop-ideal
originalArticleId: f5f1e562-7dc9-4b19-a7a4-471f1822c869
redirect_from:
  - /2021080/docs/computop-ideal
  - /2021080/docs/en/computop-ideal
  - /docs/computop-ideal
  - /docs/en/computop-ideal
related:
  - title: Computop - Sofort
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-sofort.html
  - title: Computop - PayPal
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-paypal.html
  - title: Computop - PayNow
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-paynow.html
  - title: Computop - Easy Credit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-easy-credit.html
  - title: Computop - Direct Debit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-direct-debit.html
  - title: Computop - Credit Card
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-credit-card.html
  - title: Computop - CRIF
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-crif.html
  - title: Computop - Paydirekt
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-paydirekt.html
---

Example State Machine:
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-ideal-flow-example.png) 

## Front-end Integration

To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/ideal.twig`

## State Machine Integration

The Computop provides a demo state machine for iDeal payment method which implements Capture flow.

To enable the demo state machine, extend the configuration with the following values:
```php
 <?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 ComputopConfig::PAYMENT_METHOD_IDEAL => 'ComputopIdeal',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopIdeal',
];
```

## iDeal Payment Flow:

1. There is a radio button on "Payment" step. After submitting the order the customer will be redirected to the Computop (Paygate form implementation). The GET consists of 3 parameters:
  - data (encrypted parameters, f.e. currency, amount, description);
  - length (length of `data` parameter);
  - merchant id (assigned by Computop);
Customer sets up all data just after the redirect to Computop.
Init action: "Capture". There are no Order and Authorization calls provided for this payment method.
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId`. On error, the customer  will be redirected to "Payment" step with the error message by default. Response data is stored in the DB.
3. Refund action is implemented in the admin panel (on manage order). On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.
