---
title: Computop - PayPal
originalLink: https://documentation.spryker.com/v4/docs/computop-paypal
redirect_from:
  - /v4/docs/computop-paypal
  - /v4/docs/en/computop-paypal
---

Example State Machine
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-paypal-flow-example.png){height="" width=""}

## Front-End Integration
To adjust frontend appearance, provide following templates in your theme directory:
`src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/paypal.twig`

## State Machine Integration
The Computop provides a demo state machine for PayPal payment method which implements Authorization/Capture flow.

To enable the demo state machine, extend the configuration with the following values:

```php

 ComputopConfig::PAYMENT_METHOD_PAY_PAL => 'ComputopPayPal',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopPayPal',
];
```

## PayPal Payment Flow:

1.There is a radio button on "Payment" step. After submit order customer will be redirected to the to Computop (Paygate form implementation). The GET consists of 3 parameters:
  - data (encrypted parameters, e.g. currency, amount, description);
  - length (length of `data` parameter);
  - merchant id (assigned by Computop);
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId`. On error, the customer  will be redirected to "Payment" step with the error message by default. Response data is stored in the DB.
3. Authorization is added  right after success init action by default. Capture/Refund and Cancel actions are implemented in the admin panel (on manage order).  On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.
