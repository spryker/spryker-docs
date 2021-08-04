---
title: Heidelpay - Paypal Debit Workflow
originalLink: https://documentation.spryker.com/v5/docs/heidelpay-paypal-debit
redirect_from:
  - /v5/docs/heidelpay-paypal-debit
  - /v5/docs/en/heidelpay-paypal-debit
---

### Setup

The following configuration should be made after Heidelpay has been [installed](https://documentation.spryker.com/docs/en/heidelpay-installation) and [integrated](https://documentation.spryker.com/docs/en/heidelpay-integration-scos).

#### Configuration

Example (for testing only):

```php
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_PAYPAL] = '31HA07BC8142C5A171749A60D979B6E4';
```
<sub>This value should be taken from HEIDELPAY</sub>

#### Checkout Payment Step Display

Displays payment method name with radio button. No extra input fields are required.

#### Payment step submit

No extra actions needed, quote being filled with payment method selection as default.

### Workflow

#### Summary Review and Order Submit

<u>On "save order" event</u> - save Heidelpay payment
    per order and items, as usual.

<u>When state machine is initialized</u>, an event "send debit request" will trigger debit request. In case of success, payment system will return a redirect url for customer, where the payment can be completed. Request and response will be fully persisted in the database (`spy_payment_heidelpay_transaction_log`). 

<u>On "post save hook" event</u>, we check in transaction log table if the debit request was sent successfully and if so, we set external redirect response (URL is obtained from the previous step) and redirect customer to the Paypal website where the customer confirms the payment. <br>
Below is the code sample from `HeidelpayPostSavePlugin`:
```php/**
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
}
```
<u>On payment confirmation</u> response is sent to the Heidelpay and Heidelpay makes an asynchronous POST request to the shop's `CONFIG_HEIDELPAY_PAYMENT_RESPONSE_URL`
    URL (Yves), with the result of payment (see `HeidelpayController::paymentAction()` ). This is called "external response transaction", the result will be persisted in `spy_payment_heidelpay_transaction_log` as usual.

 The most important data here is the payment reference ID which can be used for further transactions like capture/cancel/etc. 

In the response Heidelpay expects an URL string which shows where customer has to be redirected. In case  if customer successfully confirmed payment, there should be a link to checkout order success step, in case of failure - checkout payment failed action with error code (see`HeidelpayController::paymentFailedAction()` and [Heidelpay - Workflow for Errors](https://documentation.spryker.com/docs/en/heidelpay-error-workflow) section). Heidelpay redirects customer to the given URL and payment process is finished. 

Now the order can be considered as "paid".
