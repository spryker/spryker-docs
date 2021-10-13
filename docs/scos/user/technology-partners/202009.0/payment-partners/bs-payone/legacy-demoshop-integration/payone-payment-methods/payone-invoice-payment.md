---
title: PayOne - Invoice Payment
description: Integrate invoice payment through Payone into the Spryker-based shop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/payone-invoice
originalArticleId: 77760ab3-b5f7-400e-89dc-0b9ab8eee646
redirect_from:
  - /v6/docs/payone-invoice
  - /v6/docs/en/payone-invoice
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

