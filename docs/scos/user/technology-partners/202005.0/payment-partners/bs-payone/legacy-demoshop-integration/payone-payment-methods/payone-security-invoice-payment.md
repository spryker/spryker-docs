---
title: PayOne - Security Invoice Payment
description: Integrate security invoice payment through Payone into the Spryker-based shop.
last_updated: Apr 3, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/payone-security-invoice
originalArticleId: 54af1e13-13e6-441a-a1b8-c5daffb95f27
redirect_from:
  - /v5/docs/payone-security-invoice
  - /v5/docs/en/payone-security-invoice
  - /docs/scos/user/technology-partners/202005.0/payment-partners/bs-payone/legacy-demoshop-integration/payone-security-invoice-payment.html
related:
  - title: PayOne - Authorization and Preauthorization Capture Flows
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-authorization-and-preauthorization-capture-flows.html
  - title: PayOne - Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-invoice-payment.html
  - title: PayOne - Cash on Delivery
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/scos-integration/payone-cash-on-delivery.html
  - title: PayOne - Prepayment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-prepayment.html
  - title: PayOne - Direct Debit Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-direct-debit-payment.html
  - title: PayOne - Online Transfer Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-online-transfer-payment.html
---

## Front-End Integration

To adjust the frontend appearance, provide the following templates in your theme directory: `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/security_invoice.twig`

## State Machine Integration

Payone module provides a demo state machine for the Security Invoice payment method which implements Authorization flow.
To enable the demo state machine, extend the configuration with following values:

```php
<?php
 $config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 PayoneConfig::PAYMENT_METHOD_SECURITY_INVOICE => 'PayoneSecurityInvoice',
 ];
 $config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'PayoneSecurityInvoice',
 ];
 ```
