---
title: PayOne - Prepayment
originalLink: https://documentation.spryker.com/v5/docs/payone-prepayment
redirect_from:
  - /v5/docs/payone-prepayment
  - /v5/docs/en/payone-prepayment
---

Prepayment method is a safe alternative to payments involving credit cards or debit cards (such as online banking transfer). Usually bank transfer would require manual processing to mark transaction as cancelled or completed, but the process is fully automated through the integration with the Payone platform.

The payment status is transmitted to the shop via a notification from the payment provider(Payone).

## Front-end Integration
To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/prepayment.twig`

## State Machine Integration
Payone module provides a demo state machine for Prepayment payment method which implements Preauthorization/Capture flow.

To enable the demo state machine, extend the configuration with the following values:

```php
<?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 PayoneConfig::PAYMENT_METHOD_PRE_PAYMENT => 'PayonePrePayment',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'PayonePrePayment',
];
```
