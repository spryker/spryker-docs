---
title: Integrating the iDeal payment method for Computop
description: Integrate iDeal payment through Computop into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop-ideal
originalArticleId: f5f1e562-7dc9-4b19-a7a4-471f1822c869
redirect_from:
  - /2021080/docs/computop-ideal
  - /2021080/docs/en/computop-ideal
  - /docs/computop-ideal
  - /docs/en/computop-ideal
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-ideal-payment-method-for-computop.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-ideal-payment-method-for-computop.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-ideal-payment-method-for-computop.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-ideal-payment-method-for-computop.html
related:
  - title: Integrating the Sofort payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayPal payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paypal-payment-method-for-computop.html
  - title: Integrating the PayNow payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paynow-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-easy-credit-payment-method-for-computop.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-direct-debit-payment-method-for-computop.html
  - title: Computop - Credit Card
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-credit-card-payment-method-for-computop.html
  - title: Integrating the CRIF payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-crif-payment-method-for-computop.html
  - title: Integrating the Paydirekt payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paydirekt-payment-method-for-computop.html
---

Example State Machine:

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-ideal-flow-example.png)

## Front-end Integration

To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/ideal.twig`

## State Machine Integration

The Computop provides a demo state machine for iDeal payment method which implements Capture flow.

To enable the demo state machine, extend the configuration with the following values:
```php
 <?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 ComputopConfig::PAYMENT_METHOD_IDEAL => 'ComputopIdeal',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopIdeal',
];
```

## iDeal Payment Flow:

1. There is a radio button on "Payment" step. After submitting the order the customer will be redirected to the Computop (Paygate form implementation). The GET consists of 3 parameters:
  - Data (encrypted parameters, f.e. currency, amount, description)
  - Length (length of `data` parameter)
  - Merchant id (assigned by Computop)
Customer sets up all data just after the redirect to Computop.
Init action: "Capture". There are no Order and Authorization calls provided for this payment method.
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId`. On error, the customer  will be redirected to "Payment" step with the error message by default. Response data is stored in the DB.
3. Refund action is implemented in the admin panel (on manage order). On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.
