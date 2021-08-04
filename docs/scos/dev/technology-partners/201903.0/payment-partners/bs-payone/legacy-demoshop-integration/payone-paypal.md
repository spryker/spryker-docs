---
title: PayOne - Paypal Payment
originalLink: https://documentation.spryker.com/v2/docs/payone-paypal
redirect_from:
  - /v2/docs/payone-paypal
  - /v2/docs/en/payone-paypal
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

