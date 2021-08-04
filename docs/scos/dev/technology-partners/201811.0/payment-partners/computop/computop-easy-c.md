---
title: Computop - Easy Credit
originalLink: https://documentation.spryker.com/v1/docs/computop-easy-credit
redirect_from:
  - /v1/docs/computop-easy-credit
  - /v1/docs/en/computop-easy-credit
---

Example State Machine
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-easy-credit-flow-example.png){height="" width=""}

## Front-end Integration
To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/easy_credit.twig`

## State Machine Integration
The Computop provides a demo state machine for Easy Credit payment method which implements Authorization/Capture flow.

To enable the demo state machine, extend the configuration with the following values:

```php
 <?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 ComputopConfig::PAYMENT_METHOD_EASY_CREDIT => 'ComputopEasyCredit',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopEasyCredit',
];
```

## Easy Credit Payment Flow:

1.
      There is a radio button on "Payment" step.
      After submitting the order the customer will be redirected to the Computop (Paygate form implementation).
      The GET consists of 3 parameters:
  - data (encrypted parameters, e.g. currency, amount, description);
  - length (length of 'data' parameter);
  - merchant id (assigned by Computop);
        Customer sets up all data just after the redirect to Computop.
        Init action: "Order".
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId`. On error, the customer  will be redirected to "Payment" step with the error message by default. Response data is stored in the DB.
3. Status call is added right after the success init action. On requests, Spryker will use <`payId` parameter stored in the DB to identify a payment. Response data is stored in the DB.
4. Authorization is added by default right after place order. Capture/Refund and Cancel actions are implemented in the admin panel (on manage order). On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.
