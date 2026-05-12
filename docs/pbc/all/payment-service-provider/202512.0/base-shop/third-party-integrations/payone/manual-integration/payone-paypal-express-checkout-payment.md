---
title: PayOne - PayPal Express Checkout payment
description: Integrate PayPal Express Checkout payment through Payone into the Spryker-based shop.
last_updated: Jun 29, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payone-paypal-express-checkout-scos
originalArticleId: 77d504fd-b731-4eb8-86a0-5435630900f8
redirect_from:
  - /docs/scos/user/technology-partners/202311.0/payment-partners/bs-payone/scos-integration/payone-paypal-express-checkout-payment.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/manual-integration/payone-paypal-express-checkout-payment.html
---

The payment using PayPal requires a redirect to the PayPal website. When customers are redirected to PayPal's website, they have to authorize and after that either cancel or validate the transaction.

A concern regarding payment flows that require redirection to third-party website pages is that you lose control over the customer's action (the customer can close the browser before accepting or canceling the transaction). If this is the case, PayPal sends an instant payment notification (IPN) to Payone, then Payone notifies Spryker.

## Front-End integration

To adjust the frontend appearance, add the following templates in your theme directory:

`src/<project_name>/Yves/CartPage/Theme/default/components/molecules/cart-summary/cart-summary.twig`
Add the following code below the checkout button or anywhere you want, depending on your design:

```bash
{% raw %}{{{% endraw %} render(path('payone-checkout-with-paypal-button')) {% raw %}}}{% endraw %}
```

You can also implement your own button if you want the button to be loaded without a separate call to the controller or if you want to change the design.

## Paypal Express Checkout flow description

- Once you click the **Checkout with PayPal** button, the genericpayment request is sent to Payone with `setexpresscheckout` action and success, failure and back URLs.
- In the response we receive a workorderid which is used for all other operations until the capture request and PayPal redirect URL.
- We store workorerid to quote and redirect customer to the URL provided by Payone.
- On the *PayPal* page, customer has to log in and approve the intention of paying for the desired goods.
- After clicking the button, the customer is redirected to the success or failure URL, provided by the shop in the first request to Payone.
- After redirection to success action, one more generic payment request to Payone is made with action `getexpresscheckoutdetails`.
- Payone sends us information about the customer, like email and shipment data.
- The user is redirected to the page(summary page as default) of standard checkout.
- After placing the order, the pre-authorization call is sent to Payone (and through it to PayPal). Workorderid is sent to Payone with this request.
- Order status becomes "pre-authorized pending" after the response with status OK is received.

## State machine integration

Payone module provides a demo state machine for the Paypal Express Checkout payment method, which implements Preauthorization/Capture flow.

To enable the demo state machine, extend the configuration with the following values:

```php
<?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 PayoneConfig::PAYMENT_METHOD_PAYPAL_EXPRESS_CHECKOUT => 'PayonePaypalExpressCheckout',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'PayonePaypalExpressCheckout',
];
 ```

{% info_block infoBox "Note" %}

You can find all needed configuration parameters in `config.dist.php` file inside Payone module.

{% endinfo_block %}

## Configuration parameters description

To understand where to go, if control over express checkout process should be handed over to the project,
Payone module needs several URLs to be configured in the global config:

`PayoneConstants::PAYONE_STANDARD_CHECKOUT_ENTRY_POINT_URL`—URL, which is used when express checkout details are loaded to quote.
Normally, it's an URL to a summary page or to some middleware URL, where additional logic can be added before going to checkout–for example, filling some postconditions required to get to the summary page in Spryker step-engine.

`PayoneConstants::PAYONE_EXPRESS_CHECKOUT_FAILURE_URL`—URL where a user is redirected when payone fails for some reason.

`PayoneConstants::PAYONE_EXPRESS_CHECKOUT_BACK_URL`—URL where users are redirected when they go back to Paypal side.

```php
 $config[PayoneConstants::PAYONE][PayoneConstants::PAYONE_STANDARD_CHECKOUT_ENTRY_POINT_URL] = sprintf(
 '%s/checkout/paypal-express-checkout-entry-point',
 $config[ApplicationConstants::BASE_URL_YVES]
);

$config[PayoneConstants::PAYONE][PayoneConstants::PAYONE_EXPRESS_CHECKOUT_FAILURE_URL] = sprintf(
 '%s/cart',
 $config[ApplicationConstants::BASE_URL_YVES]
);

$config[PayoneConstants::PAYONE][PayoneConstants::PAYONE_EXPRESS_CHECKOUT_BACK_URL] = sprintf(
 '%s/cart',
 $config[ApplicationConstants::BASE_URL_YVES]
);

```

## Extra configuration

To add a possibility to skip standard checkout steps for a guest customer, the customer step should be extended:
Open `Yves/CheckoutPage/Process/Steps/CustomerStep.php` file in your project and add the following code to the `postCondition` and `requireInput` methods:

```php
 public function requireInput(AbstractTransfer $quoteTransfer)
 {
 if ($this->isCustomerLoggedIn() || $quoteTransfer->getIsGuestExpressCheckout()) {
 return false;
 }

 return true;
 }
 ```

 ```php
 public function postCondition(AbstractTransfer $quoteTransfer)
 {
 if ($this->isCustomerInQuote($quoteTransfer) === false) {
 return false;
 }

 if ($quoteTransfer->getIsGuestExpressCheckout()) {
 return true;
 }

 if ($this->isGuestCustomerSelected($quoteTransfer)) {
 if ($this->isCustomerLoggedIn()) {
 // override guest user with logged in user
 return false;
 }

 return true;
 }
 ...
 }
 ```
