---
title: Integrating the PayPal payment method for Computop
description: Integrate PayPal payment through Computop into the Spryker-based shop.
last_updated: Oct 23, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/computop-paypal
originalArticleId: 3e851502-7c39-4380-b10a-7b287b580e65
redirect_from:
  - /v1/docs/computop-paypal
  - /v1/docs/en/computop-paypal
related:
  - title: Computop
    link: docs/scos/user/technology-partners/page.version/payment-partners/computop.html
  - title: Integrating the Sofort payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayNow payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paynow-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-easy-credit-payment-method-for-computop.html
  - title: Computop API calls
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/computop-api-calls.html
  - title: Integrating the iDeal payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-ideal-payment-method-for-computop.html
  - title: Integrating the Paydirekt payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paydirekt-payment-method-for-computop.html
  - title: Computop - OMS plugins
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/computop-oms-plugins.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-direct-debit-payment-method-for-computop.html
  - title: Computop - Credit Card
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-credit-card-payment-method-for-computop.html
---

Example State Machine
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-paypal-flow-example.png) 

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
