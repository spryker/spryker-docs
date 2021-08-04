---
title: Heidelpay - Paypal Authorize
originalLink: https://documentation.spryker.com/v2/docs/heidelpay-authorize
redirect_from:
  - /v2/docs/heidelpay-authorize
  - /v2/docs/en/heidelpay-authorize
---

### Setup

The following configuration should be made after Heidelpay has been [installed](/docs/scos/dev/technology-partners/201903.0/payment-partners/heidelpay/heidelpay-insta) and [integrated](/docs/scos/dev/technology-partners/201903.0/payment-partners/heidelpay/scos-integration/heidelpay-confi).

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

In the response Heidelpay expects an URL string which defines where customer has to be redirected. In case if customer successfully confirmed payment, it should be a link to checkout order success step, in case of failure - checkout payment failed action with error code (see `HeidelpayController::paymentFailedAction()` and [Heidelpay - Workflow for Errors](/docs/scos/dev/technology-partners/201903.0/payment-partners/heidelpay/heidelpay-error) section). Heidelpay redirects customer to the given URL and the payment process is finished. 

<b>Capture the money</b> - later on, when the item is shipped to the customer, it is time to call "capture" command of the state machine to capture the money from the customer's account. It is done in CapturePlugin of the OMS command. In the provided basic order of state machine for Paypal authorize method, the command will be executed automatically, when order is manually moved into the "shipped" state. Now the order can be considered as "paid".
