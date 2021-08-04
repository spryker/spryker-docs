---
title: PayOne - Credit Card Payment
originalLink: https://documentation.spryker.com/v6/docs/payone-credit-card
redirect_from:
  - /v6/docs/payone-credit-card
  - /v6/docs/en/payone-credit-card
---

{% info_block infoBox "PCI Compliance" %}
Because of PCI compliance reasons, credit card data is communicated to the third party through AJAX calls (sensitive information stays at the browser side
{% endinfo_block %}.)

## PCI Compliance

The Payment Card Industry Data Security Standard ( PCI DSS ) is a set of rules with the intention to ensure that credit card information is processed, stored and transmitted in a secure environment.

The PCI standard applies to companies or organizations that enable making payments using credit cards.

The PCI compliance standard means that any merchant that offers credit card payments or is storing credit card information in the system is mandatory to pass a PCI certification. Processing and storing credit card data in the database involves a serious risk of financial fraud.

In order to meet the requirements of PCI DSS compliance (Compliance) for card payments, this module provides a Hosted iFrame solution. This solution enables you not only to integrate all relevant fields for card data in your checkout process, but also to be fully compliant  with PCI DSS standards. Using this solution qualifies for providing proof of PCI DSS Compliance via SAQ A (Self Assessment Questionnaire A) questionnaire. Please find more information [here](https://pci.payone.de/content/faq).

## Front-end Integration

Run `antelope build yves` after you include the javascript file for credit card check inside the payment step template (e.g. `src/<project_name>/Yves/Checkout/Theme/<custom_theme_name>/checkout/payment.twig`)

```php
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
 <script src="/assets/default/js/spryker-yves-payone-main.js"></script>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
To adjust frontend appearance, provide following templates in your theme directory:

* `src/<project_name>/Yves/Payone/Theme/<custom_theme_name>/credit_card.twig`

## State Machine Integration

The Payone module provides a demo state machine for Credit Card payment method which implements Pre-Authorization/Capture flow. It's also possible to implement Authorization flow using corresponding command.

To enable the demo state machine, extend the configuration with the following values:

```php
<?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 PayoneConfig::PAYMENT_METHOD_CREDIT_CARD => 'PayoneCreditCard',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'PayoneCreditCard',
];
```

## Credit Card Payment Flow:

1. A credit card check request is submitted to Payone ( through an AJAX call) The request sent to Payone is encrypted and it contains a secret key configured in the merchant account. The response contains a pseudo credit card pan: a token used to uniquely identify this transaction on third party side, on further communications. The pseudo credit card pan is stored in the database.
2. A checkout request is made to Spryker; depending if it's a 3d secure credit card or a regular credit card, Spryker will manage to submit the payment on third party side and update the payment status. On authorizing or capturing requests, Spryker will use the pseudo credit card pan stored in the database as an identification token.

## System Interaction

The diagram shows the interaction between the browser, Zed and Payone. We recommend using the creditcardcheck (1) AJAX call from the browser to Payone directly. If the credit card data is valid, Payone will return a credit card pseudo pan. This number must be used with all subsequent Payone interactions as a reference. Optionally the pseudo pan can be stored with an AJAX request into the session (2). When it comes to checkout (3) a state machine must be started. The state machine can either use an authorize call to obtain the money directly or use a preauthorize call (3.1) that blocks the money. If 3d-secure is enabled a redirect message must be handled. At the given time (when package is ready for shipment e.g.) the preauthorized money can be captured.
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/BS+Payone/payone-system-interaction.png){height="" width=""}

Credit card Check is an AJAX request from the browser to Payone directly. Before sending the credit card data, it is encrypted with asymmetric encryption algorithm. If the credit card is valid, a Pseudocreditcardpan is returned. This will be used for all subsequent interactions with Payone. The advantage is that a PCI compliance may not be needed.
