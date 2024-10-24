---
title: Integrating the PayPal payment method for Computop  
description: Integrate PayPal payment through Computop into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop-paypal
originalArticleId: 199b0408-9355-41f0-bdc9-78cb050afe0c
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paypal-payment-method-for-computop.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paypal-payment-method-for-computop.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paypal-payment-method-for-computop.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-paypal-payment-method-for-computop.html
related:
  - title: Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/computop.html
  - title: Integrating the Sofort payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayNow payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paynow-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-easy-credit-payment-method-for-computop.html
  - title: Computop API calls
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/computop-api-calls.html
  - title: Integrating the iDeal payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-ideal-payment-method-for-computop.html
  - title: Integrating the Paydirekt payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paydirekt-payment-method-for-computop.html
  - title: Computop - OMS plugins
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/computop-oms-plugins.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-direct-debit-payment-method-for-computop.html
  - title: Computop - Credit Card
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-credit-card-payment-method-for-computop.html
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
  - Data (encrypted parameters, e.g. currency, amount, description)
  - Length (length of `data` parameter)
  - Merchant id (assigned by Computop)
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId`. On error, the customer  will be redirected to "Payment" step with the error message by default. Response data is stored in the DB.
3. Authorization is added  right after success init action by default. Capture/Refund and Cancel actions are implemented in the admin panel (on manage order).  On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.
