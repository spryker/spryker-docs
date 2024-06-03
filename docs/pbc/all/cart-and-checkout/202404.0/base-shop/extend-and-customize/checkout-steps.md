---
title: Checkout steps
description: This topic provides information about all checkout steps available for the customers.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/checkout-steps
originalArticleId: aaea28ee-4c66-4e4d-8a2f-e74a6ead5e6b
redirect_from:
  - /2021080/docs/checkout-steps
  - /2021080/docs/en/checkout-steps
  - /docs/checkout-steps
  - /docs/en/checkout-steps
  - /v6/docs/checkout-steps
  - /v6/docs/en/checkout-steps
  - /v5/docs/checkout-steps
  - /v5/docs/en/checkout-steps
  - /v4/docs/checkout-steps
  - /v4/docs/en/checkout-steps
  - /v2/docs/checkout-steps
  - /v2/docs/en/checkout-steps
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/checkout/checkout-steps.html
  - /docs/pbc/all/cart-and-checkout/extend-and-customize/checkout-steps.html
  - /docs/pbc/all/cart-and-checkout/202311.0/extend-and-customize/checkout-steps.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/extend-and-customize/checkout-steps.html  
related:
  - title: Multi-Step Checkout
    link: docs/scos/user/features/page.version/checkout-feature-overview/multi-step-checkout-overview.html
  - title: Checkout process review and implementation
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/extend-and-customize/checkout-process-review-and-implementation.html
---

The checkout process consists of the following steps:

* Entry step (cart creation)
* Customer step
* Address step
* Shipment step
* Payment step
* Summary step
* Place order step
* Success step

![Quote_transfer_lifetime.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Checkout/Multi-Step+Checkout/Checkout+Steps/quote-transfer-lifetime.png)

Read on to learn more on each step.

## Entry step
The entry step redirects the customer to the correct step based on the `QuoteTransfer` state. This step requires `input = false`, so it is not rendered.

## Customer step
The customer step provides three forms:
* Login
* Register
* Checkout as a guest

This step is responsible for filling `CustomerTransfer` with corresponding data. The authentication logic is left to the customer module, this step only delegates calls to and from the customer module and mapping data with forms.

## Address step
The address step is the step where the customer fills billing and shipping addresses in `QuoteTransfer::billingAddress` and `QuoteTransfer::shippingAddress`, respectively. This step lets the returning customers select one of the existing addresses or create a new one. A new address will be created only if the **Save new address to address book** checkbox is selected. Otherwise, it is saved in the order but is not stored in the database. This allows a customer to skip the new address saving if they want to. New and guest customers can only create a new address. If a new address is selected, it's only created when the order is placed, and the `OrderCustomerSavePlugin` plugin is enabled.

## Shipment step
Get shipment method information and store it in the quote. This step requires additional configuration because different shipment providers and different ways forms must be handled for each.

### Form handling
`ShipmentForm` uses subforms and each subform is implemented as a plugin that implements `CheckoutSubFormInterface` and is provided in `CheckoutFactory::createShipmentMethodsSubForms()`. The main form uses quote transfer as a data store. Shipment data is stored under `QuoteTransfer::shipment` as a `ShipmentTransfer` object.

`ShipmentTransfer` contains:

### Data handling
Data handling happens after a valid form is submitted during `ShipmentStep`; the step receives plugins that implement `CheckoutStepHandlerPluginInterface` and are provided in `CheckoutFactory::createShipmentPlugins()`. When `execute()` is called on `ShipmentStep` then the plugin identified by the `ShipmentTransfer::shipmentSelection` string is selected and the method `CheckoutStepHandlerPluginInterface::addToQuote()` is called to update `QuoteTransfer` with payment data. From this part, the data handling is left to concrete `CheckoutStepHandler`.

The approach to implementing shipment and payment handlers and forms is the same `PaymentStep`.

* `shipmentSelection` (string)—the name of the form for the selected shipment.
* carrier (`ShipmentCarrierTransfer`)—includes information on the shipment carrier.
* method (`ShipmentMethodTransfer`)—contains information about the shipment method that is currently selected.

## Payment step
Get payment information and store it into a quote for later processing when a state machine is triggered.

The Payment step has a similar structure and data handling mechanics as the shipment step does.

### Form handling
`PaymentForm` uses subforms. Each subform is implemented as a plugin that implements `CheckoutSubFormPluginInterface` and is provided in `CheckoutFactory::createPaymentMethodSubForms()`. The main form uses `QuoteTransfer` as a data store. Data for payment is stored under `QuoteTransfer::payment` as a `PaymentTransfer` object.

The main form has radio buttons, which the customer can select from the available payment methods. Choices are built from the subform name. Each provided subform corresponds to radio input.

When the form is created, it requires the property path to be provided so that it knows how to map its subform to `QuoteTransfer`—see `property_path`. The property path is built out of a few parts of `PaymentTransfer::payment` and the subform provides `getPropertyPath()` that returns a string; this string must return the property that exists under `PaymentTransfer`.

`PaymentTransfer` includes the following:
* `paymentProvider` (string)—The payment provider's name (Paypal or Payolution).
* `paymentMethod` (string)—The payment method (credit card or invoice).
* `paymentSelection` (string)—The subform name that is currently selected.

### Data handling
Data handling happens after a valid form is submitted during `PaymentStep`. The step receives plugins that implement `CheckoutStepHandlerPluginInterface` and that are provided in the `CheckoutFactory::createPaymentPlugins()`. When `execute()` method is called on `PaymentStep`, the plugin that is identified by `PaymentTransfer::paymentSelection` string is selected and the `CheckoutStepHandlerPluginInterface::addToQuote()` is called to update `QuoteTransfer` with the payment data. From this part, all population or data handling is left to concrete `CheckoutStepHandler`.

{% info_block infoBox %}

Add a new payment method, `Paypal`:
1. Add the new property to `PaymentTransfer` and call it `Paypal`. This property uses `PaypalTransfer` and contains the data for mapping the details from the form.
2. Create or use the `Paypal` module to add the step plugin.
3. In the Paypal module, add the following plugins:
   * Create `PaypalCheckoutSubForm` implementing `CheckoutSubFormPluginInterface` that returns a subform that implements `SubFormInterface`.
   * Create `PaypalHandler` implementing `CheckoutStepHandlerPluginInterface` that populates `QuoteTransfer:payment:paypal` with `PaypalTransfer`.

After creation, you need to add the plugins to the checkout process:
1. Create a `CheckoutDependencyInjector` inside your module and configure it to be used by the `Checkout` module. From there, you can inject the required forms and handler.
2. Add your form to the `CheckoutSubFormPluginCollection` by extending the given `CheckoutDependencyProvider::PAYMENT_SUB_FORMS`.
3. Add your handler to `CheckoutStepHandlerPluginCollection` by extending the given `CheckoutDependencyProvider::PAYMENT_METHOD_HANDLER`.

After this, you can see the new payment selection with the subform rendered below.

{% endinfo_block %}

## Summary step
Display order information about the item to be placed, details, and order totals.

## Place order step
Place the order into the system. This step requires `input = false`. This step makes a Zed HTTP request, which sends `QuoteTransfer`. In this step, all order saving is happening.

## Success page
When the success page is executed, `QuoteTransfer` is cleared. The customer's session is also marked as dirty so that with the next request, it reloads with the updated data (new customer address).

### Checkout step interface
```php
  <?php
  interface StepInterface
  {
	/**
	 * Requirements for this step, return true when satisfied.
	 *
	 * @param QuoteTransfer $quoteTransfer
	 *
	 * @return bool
	 */
	public function preCondition(QuoteTransfer $quoteTransfer);
	/**
	 * Require input, should we render view with form or just skip step after calling execute.
	 *
	 * @return bool
	 */
	public function requireInput();
	/**
	 * Execute step logic, happens after form submit if provided, gets QuoteTransfer filled by data from form.
	 *
	 * @param Request $request
	 * @param QuoteTransfer $quoteTransfer
	 *
	 * @return QuoteTransfer
	 */
	public function execute(Request $request, QuoteTransfer $quoteTransfer);
	/**
	 * Conditions that should be met for this step to be marked as completed. returns true when satisfied.
	 *
	 * @param QuoteTransfer $quoteTransfer
	 *
	 * @return bool
	 */
	public function postCondition(QuoteTransfer $quoteTransfer);
	/**
	 * Current step route.
	 *
	 * @return string
	 */
	public function getStepRoute();
	/**
	 * Escape route when preConditions are not satisfied user will be redirected to provided route.
	 *
	 * @return string
	*/
	public function getEscapeRoute();
 }
 ```


 ### Step with external redirect interface
 ```php
  <?php
	interface StepWithExternalRedirectInterface extends StepInterface
	{
		/**
		 * Return external redirect url, when redirect occurs not within same application. Used after execute.
		 *
		 * @return string
		 */
		public function getExternalRedirectUrl();
	}
```

## Current constraints
All the stores inside a project share a single checkout with the same steps.
