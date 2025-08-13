---
title: Integrating the iDeal payment method for Heidelpay
description: Learn how to integrate iDeal payment through Heidelpay into the Spryker Cloud Commerce OS shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-ideal
originalArticleId: 66b61a72-36ed-450c-9b80-4495efa619cc
redirect_from:
  - /2021080/docs/heidelpay-ideal
  - /2021080/docs/en/heidelpay-ideal
  - /docs/heidelpay-ideal
  - /docs/en/heidelpay-ideal
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-ideal-payment-method-for-heidelpay.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-ideal-payment-method-for-heidelpay.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-ideal-payment-method-for-heidelpay.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-ideal-payment-method-for-heidelpay.html
related:
  - title: Heidelpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/heidelpay.html
  - title: Integrating the Easy Credit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-easy-credit-payment-method-for-heidelpay.html
  - title: Integrating Heidelpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/integrate-heidelpay.html
  - title: Integrating the Paypal Debit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-paypal-debit-payment-method-for-heidelpay.html
  - title: Integrating the Split-payment Marketplace payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-split-payment-marketplace-payment-method-for-heidelpay.html
  - title: Configuring Heidelpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/configure-heidelpay.html
  - title: Integrating the Invoice Secured B2C payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-invoice-secured-b2c-payment-method-for-heidelpay.html
  - title: Integrating the Direct Debit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-direct-debit-payment-method-for-heidelpay.html
  - title: Installing Heidelpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/install-heidelpay.html
---

## Setup

The following configuration should be made after Heidelpay has been [installed](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/install-heidelpay.html) and [integrated](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/integrate-heidelpay.html).

### Configuration

Example (for testing only):

```php
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_IDEAL] = '31HA07BC8142C5A171744B56E61281E5';
```

<sub>This value should be taken from HEIDELPAY.</sub>

### Checkout Payment Step Display

Displays payment method name with a radio button. No extra input fields are required.

### Payment Step Submitting

No extra actions needed, quote being filled with payment method selection as default.

### Summary Review and Order

 Submitting

**On "save order" event** - save Heidelpay payment per order and items, as usual.

**When state machine is initialized**, an event "send authorize request" will trigger the authorize request. In case of success, the payment system will return a redirect URL for customer, where the payment can be completed. Request and response will be fully persisted in the database (`spy_payment_heidelpay_transaction_log`).

**On "post save hook" event** we check in  transaction log table if the authorize request was sent successfully and if so, we set an external redirect response to the next step (`IdealController::authorizeAction()`) where the form will be displayed with 3 fields: bank country, bank name and account holder name. The URL obtained in the previous step will be a "form action". When customer submits the form, he will be redirected to the iDeal website to complete the payment.

**On payment confirmation**, response from iDeal is sent to the Heidelpay and Heidelpay makes an asynchronous POST request to the shop's `CONFIG_HEIDELPAY_PAYMENT_RESPONSE_URL` URL (Yves), with the result of payment (see `HeidelpayController::paymentAction()`). This is called "external response transaction", the result will be persisted in `spy_payment_heidelpay_transaction_log` as usual.

The most important data here - is the payment reference ID which can be used for further transactions like capture/cancel/etc.

In the response Heidelpay expects an URL string which defines where customer has to be redirected. In case if customer successfully confirmed payment, it should be a link to the checkout order success step, in case of the failure - checkout payment failed action with the error code (see `HeidelpayController::paymentFailedAction()` and [Heidelpay workflow for errors](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/heidelpay/heidelpay-workflow-for-errors.html) section). Heidelpay redirects customer to the given URL and the payment process is finished.

**Capture the money** - later on, when the item is shipped to the customer, it's time to call "capture" command of the state machine to capture the money from the customer's account. This is done in CapturePlugin of the OMS command. In the provided basic order state machine for iDeal authorize method, command will be executed automatically, when order is manually moved into the "shipped" state. Now order can be considered as "paid".
