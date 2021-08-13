---
title: PayOne - Invoice Payment
description: Integrate invoice payment through Payone into the Spryker-based shop.
originalLink: https://documentation.spryker.com/2021080/docs/payone-invoice
originalArticleId: cb82c153-b340-427c-8114-3656c07a2d47
redirect_from:
  - /2021080/docs/payone-invoice
  - /2021080/docs/en/payone-invoice
  - /docs/payone-invoice
  - /docs/en/payone-invoice
---

## Front-end Integration

To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/invoice.twig`

## State Machine Integration

Payone module provides a demo state machine for the Invoice payment method which implements Authorization flow.

To enable the demo state machine, extend the configuration with following values:

```php
<?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 PayoneConfig::PAYMENT_METHOD_INVOICE => 'PayoneInvoice',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'PayoneInvoice',
];
```

