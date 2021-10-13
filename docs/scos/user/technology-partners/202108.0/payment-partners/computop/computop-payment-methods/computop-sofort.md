---
title: Computop - Sofort
description: Integrate Sofort payment through Computop into the Spryker-based shop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop-sofort
originalArticleId: 0d22997c-4a0c-4a8d-8031-e705869d05b8
redirect_from:
  - /2021080/docs/computop-sofort
  - /2021080/docs/en/computop-sofort
  - /docs/computop-sofort
  - /docs/en/computop-sofort
related:
  - title: Computop
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop.html
  - title: Computop - PayNow
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-paynow.html
  - title: Computop - Easy Credit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-easy-credit.html
  - title: Computop - API
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/technical-details-and-howtos/computop-api.html
  - title: Computop - iDeal
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-ideal.html
  - title: Computop - Paydirekt
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-paydirekt.html
  - title: Computop - OMS
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/technical-details-and-howtos/computop-oms.html
  - title: Computop - Direct Debit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-direct-debit.html
  - title: Computop - Credit Card
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-credit-card.html
  - title: Computop - CRIF
    link: docs/scos/user/technology-partners/201811.0/payment-partners/computop/computop-payment-methods/computop-crif.html
---

Example State Machine:
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-sofort-flow-example.png) 

## Front-End Integration
To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/sofort.twig`

## State Machine Integration
The Computop provides a demo state machine for Sofort payment method which implements Capture flow.

To enable the demo state machine, extend the configuration with the following values:

```php
 <?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 ComputopConfig::PAYMENT_METHOD_SOFORT => 'ComputopSofort',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopSofort',
];
```

## Sofort Payment Flow

1. There is a radio button on "Payment" step. After submitting the order the customer will be redirected to the Computop (Paygate form implementation). The GET consists of 3 parameters:
  - data (encrypted parameters, e.g. currency, amount, description);
  - length (length of `data` parameter);
  - merchant id (assigned by Computop);
Customer sets up all data just after the redirect to Computop.
Init action: "Capture". There are no Order and Authorization calls provided for this payment method.
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId`. On error, the customer  will be redirected to "Payment" step with the error message by default. Response data is stored in the DB.
3. Capture/Refund and Cancel actions are implemented in the admin panel (on manage order). On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.

## Set Up Details
Important for a live MID is:

1. Merchant must have a bank account at the Sofort Bank.
2. The contract with Sofort must be extended specifically for credits.
3. The credit function must be configured in the Sofort project, as well as in the Computop (on the MID).
