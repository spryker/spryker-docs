---
title: Integrating the Paypal Debit payment method for Heidelpay
description: Integrate Paypal debit workflow payment through Heidelpay into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-paypal-debit
originalArticleId: c13ad379-3ad5-477f-bcec-8b0f00d3572a
redirect_from:
  - /2021080/docs/heidelpay-paypal-debit
  - /2021080/docs/en/heidelpay-paypal-debit
  - /docs/heidelpay-paypal-debit
  - /docs/en/heidelpay-paypal-debit
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-paypal-debit-payment-method-for-heidelpay.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-paypal-debit-payment-method-for-heidelpay.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-paypal-debit-payment-method-for-heidelpay.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-paypal-debit-payment-method-for-heidelpay.html
related:
  - title: Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/heidelpay.html
  - title: Integrating the Credit Card Secure payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-credit-card-secure-payment-method-for-heidelpay.html
  - title: Configuring Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/configure-heidelpay.html
  - title: Integrating the Paypal Authorize payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-paypal-authorize-payment-method-for-heidelpay.html
  - title: Integrating Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-heidelpay.html
  - title: Heidelay - Sofort (Online Transfer)
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-sofort-payment-method-for-heidelpay.html
  - title: Integrating the Direct Debit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-direct-debit-payment-method-for-heidelpay.html
  - title: Installing Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/install-heidelpay.html
  - title: Heidelpay workflow for errors
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/heidelpay-workflow-for-errors.html
---

## Setup

The following configuration should be made after Heidelpay has been [installed](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/heidelpay/install-heidelpay.html) and [integrated](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/heidelpay/integrate-heidelpay.html).

### Configuration

Example (for testing only):

```php
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_PAYPAL] = '31HA07BC8142C5A171749A60D979B6E4';
```

<sub>This value should be taken from HEIDELPAY</sub>

### Checkout Payment Step Display

Displays payment method name with radio button. No extra input fields are required.

### Payment step submit

No extra actions needed, quote being filled with payment method selection as default.

## Workflow

### Summary Review and Order Submitting

**On "save order" event** - save Heidelpay payment per order and items, as usual.

**When state machine is initialized**, an event "send debit request" will trigger debit request. In case of success, payment system will return a redirect url for customer, where the payment can be completed. Request and response will be fully persisted in the database (`spy_payment_heidelpay_transaction_log`).

**On "post save hook" event**, we check in transaction log table if the debit request was sent successfully and if so, we set external redirect response (URL is obtained from the previous step) and redirect customer to the Paypal website where the customer confirms the payment.

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

**On payment confirmation** response is sent to the Heidelpay and Heidelpay makes an asynchronous POST request to the shop's `CONFIG_HEIDELPAY_PAYMENT_RESPONSE_URL` URL (Yves), with the result of payment (see `HeidelpayController::paymentAction()` ). This is called "external response transaction", the result will be persisted in `spy_payment_heidelpay_transaction_log` as usual.

 The most important data here is the payment reference ID which can be used for further transactions like capture/cancel/etc.

In the response Heidelpay expects an URL string which shows where customer has to be redirected. In case  if customer successfully confirmed payment, there should be a link to checkout order success step, in case of failure - checkout payment failed action with error code (see`HeidelpayController::paymentFailedAction()` and [Heidelpay workflow for errors](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/heidelpay/heidelpay-workflow-for-errors.html) section). Heidelpay redirects customer to the given URL and payment process is finished.

Now the order can be considered as "paid".
