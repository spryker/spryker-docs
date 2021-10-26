---
title: PayOne - Paypal Payment
description: Integrate Paypal payment through Payone into the Spryker-based shop.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/payone-paypal
originalArticleId: 90b887a8-c11c-422a-b26d-b874a29d5d24
redirect_from:
  - /v2/docs/payone-paypal
  - /v2/docs/en/payone-paypal
related:
  - title: PayOne - Prepayment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-prepayment.html
  - title: PayOne - Authorization and Preauthorization Capture Flows
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-authorization-and-preauthorization-capture-flows.html
  - title: PayOne - Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-invoice-payment.html
  - title: PayOne - Cash on Delivery
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/scos-integration/payone-cash-on-delivery.html
  - title: PayOne - Direct Debit Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-direct-debit-payment.html
  - title: PayOne - Security Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-security-invoice-payment.html
---

The payment using PayPal requires a redirect to PayPal website. When the customer is redirected to PayPal's website, he must authorize himself and he has the option to either cancel or validate the transaction.

A concern regarding payment flows that require redirection on third party website pages is that you loose control over the customers action ( the customer can close the browser before accepting or canceling the transaction). If this is the case, PayPal sends an instant payment notification (IPN) to Payone, then Payone notifies Spryker.

## Front-end Integration
To adjust the frontend appearance, provide the following templates in your theme directory: `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/e_wallet.twig`

PayPal Payment Integration with Payone:

1.a `preAuthorize` command is submitted which leads to a redirect to PayPal webpage
2. redirect to PayPal webpage:
3.  if browser is closed, a notification is sent to PayPal state machine
4.  after the customer chooses to accept or to cancel the transaction, a redirect is done back to the shop; the redirect URL indicates the option selected by the user ( accept/cancel transaction)
5. a `captureCommand` is submitted if the customer has accepted the transaction on PayPals website.

## State Machine Integration
Payone module provides a demo state machine for E-Wallet payment method which implements Preauthorization/Capture flow.

To enable the demo state machine, extend the configuration with following values:

```php
<?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 PayoneConfig::PAYMENT_METHOD_E_WALLET => 'PayoneEWallet',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'PayoneEWallet',
];
```

