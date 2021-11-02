---
title: PayOne - PayPal Express Checkout Payment
description: Integrate PayPal Express Checkout Payment through Payone into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payone-paypal-express-checkout-payment
originalArticleId: f21d94b3-391e-4e45-ba35-f5a29cf66e3f
redirect_from:
  - /2021080/docs/payone-paypal-express-checkout-payment
  - /2021080/docs/en/payone-paypal-express-checkout-payment
  - /docs/payone-paypal-express-checkout-payment
  - /docs/en/payone-paypal-express-checkout-payment
---

The payment using PayPal requires redirect to PayPal website. When the customer is redirected to PayPal's website, he must authorize himself and he has the option to either cancel or validate the transaction.

A concern regarding payment flows that require redirection on third party website pages is that you loose control over the customer's action (the customer can close the browser before accepting or canceling the transaction). If this is the case, PayPal sends an instant payment notification (IPN) to Payone, then Payone notifies Spryker.

## Front-end Integration

To adjust the frontend appearance, add the following templates in your theme directory:

`src/<project_name>/Yves/Cart/Theme/<custom_theme_name>/cart/parts/cart-summary.twig`

Add the following code below the checkout button or anywhere you want depending on your design:

```php
{% raw %}{{{% endraw %} render(path('payone-checkout-with-paypal-button')) {% raw %}}}{% endraw %}
```

You can also implement your own button if you want the button to be loaded without separate call to the controller, or if you want to change the design.

## Paypal Express Checkout Flow Description:

* Once you click on the "Checkout with PayPal" button, the genericpayment request is sent to Payone with `setexpresscheckout` action and success, failure and back URLs.
* In the response we receive a workorderid which is used for all other operations until the capture request and PayPal redirect URL.
* We store wordorderid to quote and redirect customer to the URL provided by Payone.
* On the PayPal page, customer has to log in and approve the intention of paying for the desired goods.
* After the customer clicks the button, he is redirected to success or failure URL, provided by the shop in the first request to Payone.
* After redirection to success action, one more genericpayment request to Payone is made with action `getexpresscheckoutdetails`.
* Payone sends us information about the customer like email and shipment data.
* User is redirected to the page(summary page as default) of standard checkout.
* After placing the order, the pre-authorization call is sent to Payone (and through it to PayPal). Workorderid is sent to Payone with this request.
* Order status becomes "pre-authorized pending" after the response with status OK is received.

## State Machine Integration

Payone module provides a demo state machine for Paypal Express Checkout payment method which implements Preauthorization/Capture flow.

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


## Configuration Parameters Description:

To understand where to go, if control over express checkout process should be handed over to the project, Payone module needs several urls to be confgured in the global config:

**PayoneConstants::PAYONE_STANDARD_CHECKOUT_ENTRY_POINT_URL** - URL, which is used when express checkout details are loaded to quote.
Normally, its an URL to summary page or to some middleware URL, where additional logic can be added before going to checkout (e.g. filling some post conditions which are required to get to summary page in Spryker step-engine).

**PayoneConstants::PAYONE_EXPRESS_CHECKOUT_FAILURE_URL** - URL where user is redirected when payone fails for some reason.

**PayoneConstants::PAYONE_EXPRESS_CHECKOUT_BACK_URL** - URL where user is redirected when he/she goes back to Paypal side.

```php
 $config[PayoneConstants::PAYONE][PayoneConstants::PAYONE_STANDARD_CHECKOUT_ENTRY_POINT_URL] = sprintf(
 '%s/checkout/paypal-express-checkout-entry-point',
 $config[ApplicationConstants::BASE_URL_YVES]
);
 <br>
$config[PayoneConstants::PAYONE][PayoneConstants::PAYONE_EXPRESS_CHECKOUT_FAILURE_URL] = sprintf(
 '%s/cart',
 $config[ApplicationConstants::BASE_URL_YVES]
);
 <br>
$config[PayoneConstants::PAYONE][PayoneConstants::PAYONE_EXPRESS_CHECKOUT_BACK_URL] = sprintf(
 '%s/cart',
 $config[ApplicationConstants::BASE_URL_YVES]
);
 <br>
```

## Extra Configuration:

To add possibility to skip standard checkout steps for guest user, customer step should be extended:
Open **Yves/Checkout/Process/Steps/CustomerStep.php** file in your project and add the following code to **postCondition** and **requireInput** methods:

```php
 public function requireInput(AbstractTransfer $quoteTransfer)
 {
 if ($this->isCustomerLoggedIn() || $quoteTransfer->getIsGuestExpressCheckout()) {
 return false;
 }

 return true;
 }
 ``````php
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
