---
title: Computop - iDeal
originalLink: https://documentation.spryker.com/v5/docs/computop-ideal
redirect_from:
  - /v5/docs/computop-ideal
  - /v5/docs/en/computop-ideal
---

Example State Machine:
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-ideal-flow-example.png){height="" width=""}

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
