---
title: Heidelpay - Paypal Authorize
description: Integrate Paypal Authorize payment through Heidelpay into the Spryker-based shop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-authorize
originalArticleId: 0f062977-b318-41b1-bd9e-b14ffedf2bc6
redirect_from:
  - /2021080/docs/heidelpay-authorize
  - /2021080/docs/en/heidelpay-authorize
  - /docs/heidelpay-authorize
  - /docs/en/heidelpay-authorize
related:
  - title: Heidelpay
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay.html
  - title: Heidelpay - Credit Card Secure
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-credit-card-secure.html
  - title: Heidelpay - Configuration for SCOS
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/scos-integration/heidelpay-configuration-for-scos.html
  - title: Heidelpay - Direct Debit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-direct-debit.html
  - title: Heidelpay - Integration into the Legacy Demoshop
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-integration-into-the-legacy-demoshop.html
  - title: Heidelpay - Integration into SCOS
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/scos-integration/heidelpay-integration-into-scos.html
  - title: Heidelay - Sofort (Online Transfer)
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-sofort-online-transfer.html
  - title: Heidelpay - Installation
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-installation.html
  - title: Heidelpay - Workflow for Errors
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/technical-details-and-howtos/heidelpay-workflow-for-errors.html
  - title: Heidelpay - Split-payment Marketplace
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-split-payment-marketplace.html
---

### Setup

The following configuration should be made after Heidelpay has been [installed](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/heidelpay/heidelpay-installation.html) and [integrated](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/heidelpay/scos-integration/heidelpay-configuration-for-scos.html).

#### Configuration

Example (for testing only):
```php
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_PAYPAL] = '31HA07BC8142C5A171749A60D979B6E4';
```

<sub>This value should be taken from HEIDELPAY</sub>

#### Checkout Payment Step Display
Displays payment method name with radio button. No extra input fields are required.

#### Payment Step Submitting
No extra actions needed, quote is filled with payment method selection by default.

### Workflow
#### Summary Review and Order
**Submitting**

<b>On "save order" event</b> save Heidelpay payment per order and items, as usual.

<b>When state machine is initialized</b>, a "send authorize request" event will trigger the authorize request. In case of success, payment system will  return a redirect URL to customer, where the payment can be completed. Request and response will be fully persisted in the database (`spy_payment_heidelpay_transaction_log`). 

<b>On "post save hook" event</b>, we check in the transaction log table if the authorize request was sent successfully and if so, we set external redirect response (URL is obtained from the previous step) and redirect the customer to Paypal website, where customer confirms the payment. <br>
Below is the code sample from `HeidelpayPostSavePlugin`:
```php
/**
 * @method \SprykerEco\Zed\Heidelpay\Business\HeidelpayFacadeInterface getFacade()
 * @method \SprykerEco\Zed\Heidelpay\Business\HeidelpayBusinessFactory getFactory()
 */
class HeidelpayPostSavePlugin extends BaseAbstractPlugin implements CheckoutPostCheckPluginInterface
{
 /**
 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
 *
 * @return void
 */
 public function execute(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
 {
 $this->getFacade()->postSaveHook($quoteTransfer, $checkoutResponseTransfer);
 }
 ```

<u>On payment confirmation</u>, the response is sent to Heidelpay and Heidelpay makes an asynchronous POST request to the shop's `CONFIG_HEIDELPAY_PAYMENT_RESPONSE_URLURL` (Yves), with the result of payment (see `HeidelpayController::paymentAction()`). This is called "external response transaction", and its result will be persisted in `spy_payment_heidelpay_transaction_log` as usual.

The most important data here is the payment reference ID which can be used for further transactions like `capture/cancel/etc`.

In the response Heidelpay expects an URL string which defines where customer has to be redirected. In case if customer successfully confirmed payment, it should be a link to checkout order success step, in case of failure - checkout payment failed action with error code (see `HeidelpayController::paymentFailedAction()` and [Heidelpay - Workflow for Errors](/docs/scos/user/technology-partners/{{page.version}}/payment-partners/heidelpay/technical-details-and-howtos/heidelpay-workflow-for-errors.html) section). Heidelpay redirects customer to the given URL and the payment process is finished. 

<b>Capture the money</b> - later on, when the item is shipped to the customer, it is time to call "capture" command of the state machine to capture the money from the customer's account. It is done in CapturePlugin of the OMS command. In the provided basic order of state machine for Paypal authorize method, the command will be executed automatically, when order is manually moved into the "shipped" state. Now the order can be considered as "paid".
