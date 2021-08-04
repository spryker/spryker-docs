---
title: Computop - Sofort
originalLink: https://documentation.spryker.com/v2/docs/computop-sofort
redirect_from:
  - /v2/docs/computop-sofort
  - /v2/docs/en/computop-sofort
---

Example State Machine:
![Click Me](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/computop-sofort-flow-example.png){height="" width=""}

## Front-End Integration
To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/sofort.twig`

## State Machine Integration
The Computop provides a demo state machine for Sofort payment method which implements Capture flow.

To enable the demo state machine, extend the configuration with the following values:
```php
 <?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 ComputopConfig::PAYMENT_METHOD_SOFORT => 'ComputopSofort',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopSofort',
];
```

## Sofort Payment Flow:

1. There is a radio button on "Payment" step. After submitting the order the customer will be redirected to the Computop (Paygate form implementation). The GET consists of 3 parameters:
  - data (encrypted parameters, e.g. currency, amount, description);
  - length (length of 'data' parameter);
  - merchant id (assigned by Computop);
Customer sets up all data just after the redirect to Computop.
Init action: "Capture". There are no Order and Authorization calls provided for this payment method.
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId`. On error, the customer  will be redirected to "Payment" step with the error message by default. Response data is stored in the DB.
3. Capture/Refund and Cancel actions are implemented in the admin panel (on manage order). On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.

## Set Up Details:
Important for a live MID is:

1. Merchant must have a bank account at the Sofort Bank.
2. The contract with Sofort must be extended specifically for credits.
3. The credit function must be configured in the Sofort project, as well as in the Computop (on the MID).

**See also:**

* [Get a general idea about Computop](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop)
* [Learn about Computop API](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-api-de)
* [Get acquainted with Computop OMS functioning](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-oms-de)
* [Configure Credit Card payment method for Computop](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-credit)
* [Configure Computop CRIF](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-crif)
* [Configure Direct Debit payment method for Computop](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-direct)
* [Configure Easy Credit payment method for Computop](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-easy-c)
* [Configure iDeal payment method for Computop](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-ideal)
* [Configure Paydirekt payment method for Computop](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-paydir)
* [Configure PayNow payment method for Computop](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-paynow)
* [Configure PayPal payment method for Computop](/docs/scos/dev/technology-partners/201903.0/payment-partners/computop/computop-paypal)
