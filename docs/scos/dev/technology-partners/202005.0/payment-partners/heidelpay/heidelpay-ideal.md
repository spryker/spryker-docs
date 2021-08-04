---
title: Heidelpay - iDeal
originalLink: https://documentation.spryker.com/v5/docs/heidelpay-ideal
redirect_from:
  - /v5/docs/heidelpay-ideal
  - /v5/docs/en/heidelpay-ideal
---

### Setup

The following configuration should be made after Heidelpay has been [installed](https://documentation.spryker.com/docs/en/heidelpay-installation) and [integrated](https://documentation.spryker.com/docs/en/heidelpay-integration-scos).

#### Configuration

Example (for testing only):
```php
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_IDEAL] = '31HA07BC8142C5A171744B56E61281E5';
```
<sub>This value should be taken from HEIDELPAY.</sub>

#### Checkout Payment Step Display

Displays payment method name with a radio button. No extra input fields are required.

#### Payment Step Submitting

No extra actions needed, quote being filled with payment method selection as default.

#### Summary Review and Order
 Submitting

<u>On "save order" event</u> - save Heidelpay payment per order and items, as usual.

<b>When state machine is initialized</b>, an event "send authorize request" will trigger the authorize request. In case of success, the payment system will return a redirect URL for customer, where the payment can be completed. Request and response will be fully persisted in the database (`spy_payment_heidelpay_transaction_log`). 

<u>On "post save hook" event</u> we check in  transaction log table if the authorize request was sent successfully and if so, we set an external redirect response to the next step (`IdealController::authorizeAction()`) where the form will be displayed with 3 fields: bank country, bank name and account holder name. The URL obtained in the previous step will be a "form action". When customer submits the form, he will be redirected to the iDeal website to complete the payment. 

<u>On payment confirmation</u>, response from iDeal is sent to the Heidelpay and Heidelpay makes an asynchronous POST request to the shop's `CONFIG_HEIDELPAY_PAYMENT_RESPONSE_URL` URL (Yves), with the result of payment (see `HeidelpayController::paymentAction()`). This is called "external response transaction", the result will be persisted in `spy_payment_heidelpay_transaction_log` as usual.

 The most important data here - is the payment reference ID which can be used for further transactions like capture/cancel/etc. 

In the response Heidelpay expects an URL string which defines where customer has to be redirected. In case if customer successfully confirmed payment, it should be a link to the checkout order success step, in case of the failure - checkout payment failed action with the error code (see `HeidelpayController::paymentFailedAction()` and [Heidelpay - Workflow for Errors](https://documentation.spryker.com/docs/en/heidelpay-error-workflow) section). Heidelpay redirects customer to the given URL and the payment process is finished. 

<u>Capture the money</u> - later on, when the item is shipped to the customer, it is time to call "capture" command of the state machine to capture the money from the customer's account. This is done in CapturePlugin of the OMS command. In the provided basic order state machine for iDeal authorize method, command will be executed automatically, when order is manually moved into the "shipped" state. Now order can be considered as "paid".
