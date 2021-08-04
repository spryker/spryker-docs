---
title: Computop - Credit Card
originalLink: https://documentation.spryker.com/v1/docs/computop-credit-card
redirect_from:
  - /v1/docs/computop-credit-card
  - /v1/docs/en/computop-credit-card
---

Example State Machine:
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop-credit-card-flow-example.png){height="" width=""}

## Front-end Integration

To adjust the frontend appearance, provide the following templates in your theme directory:
`src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/credit_card.twig`

## State Machine Integration

The Computop provides a demo state machine for the Credit Card payment method which implements Authorization/Capture flow.

To enable the demo state machine, extend the configuration with the following values:

```php
 <?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 ComputopConfig::PAYMENT_METHOD_CREDIT_CARD => 'ComputopCreditCard',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopCreditCard',
];
```

## Credit Card Payment Flow

1. There is a radio button on "Payment" step. After submitting the order the customer will be redirected to the to Computop (Pay gate form implementation). The GET consists of 3 parameters:
  - data (encrypted parameters, e.g. currency, amount, description);
  - length (length of 'data' parameter);
  - merchant id (assigned by Computop).The customer sets up all data just after redirect to Computop.
         Init action: "Order".
2. By default, on success the customer  will be redirected to "Success" step. The response contains `payId` On error, the customer will be redirected to "Payment" step with the error message by defaul.  Response data is stored in the DB.
3. Authorization is added  right after success init action by default. Capture/Refund and Cancel actions are implemented in the admin panel (on manage order).  On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.

## Set Up Details:

For partial capturing:

1. Case: Merchant uses neither ETM nor PCN (`PseudoCardNumber`). After authorization has been done, you are able to do one capture. This can be a partial or a complete capture of the authorized amount. After the capture is performed you cannot do another capture. If it is a partial capture, the rest of the initial authorized amount is released.
2. Case: Merchant uses ETM (Extended Transactions Management). You can do partial captures as long as the as the initial amount of the authorization has not been reached or you send `FinishAuth=Y` with the last capture you like to do. (see page 83 of Computop documentation)
3. Case: Merchant uses PCN. With the authorization request you get back the PCN and other credit card parameter (Expiry Date, Brand). PCN and the other parameters can be stored.

You capture the full amount of the authorization via `capture.aspx` => Nothing else has to be done.

You capture a partial amount of the authorization => The rest of the amount forfeited. To do the next partial capture, you have to use the PCN with the `direct.aspx` (page 53  of Computop documentation) and the additional parameter VBV=NO in the request to get a new authorization. After that you proceed as described above.
