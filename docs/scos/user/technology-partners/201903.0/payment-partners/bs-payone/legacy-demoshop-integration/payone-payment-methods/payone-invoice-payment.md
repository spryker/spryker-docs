---
title: PayOne - Invoice Payment
description: Integrate invoice payment through Payone into the Spryker-based shop.
originalLink: https://documentation.spryker.com/v2/docs/payone-invoice
originalArticleId: 3917b613-5662-431d-82e6-36181d545145
redirect_from:
  - /v2/docs/payone-invoice
  - /v2/docs/en/payone-invoice
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

