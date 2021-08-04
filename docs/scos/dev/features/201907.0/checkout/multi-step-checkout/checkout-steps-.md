---
title: Checkout Steps
originalLink: https://documentation.spryker.com/v3/docs/checkout-steps-201903
redirect_from:
  - /v3/docs/checkout-steps-201903
  - /v3/docs/en/checkout-steps-201903
---

The checkout process consists of the following steps:

* Entry step (cart creation)
* Customer step
* Address step
* Shipment step
* Payment step
* Summary step
* Place order stop
* Success step

![Quote_transfer_lifetime.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Checkout/Multi-Step+Checkout/Checkout+Steps/quote-transfer-lifetime.png){height="" width=""}

Read on to learn more on each step.

## Entry Step
The entry step redirects the customer to correct step based on QuoteTransfer state. This step requires `input = false`, so it won’t be rendered.

## Customer Step
The customer step provides three forms:

* login
* register
* register as a guest

This step is responsible for filling `CustomerTransfer` with corresponding data. The authentication logic is left to customer module, this step is only delegating calls to (and from) customer module and mapping data with forms.

## Address Step
The address step is the step where customer fills billing and shipping addresses in `QuoteTransfer::billingAddress` and `QuoteTransfer::shippingAddress` respectively. This step lets the returning customers select one of the existing addresses or create a new one. New address will be created only if "Save new address to address book" checkbox is checked. Otherwise, it is saved in Order, but won't be stored in the database. This allows customer to skip new address saving if they want to. New and guest customers can only create a new address. If a new address is selected, it’s only created when order is placed and `OrderCustomerSavePlugin` plugin is enabled.

## Shipment Step
Get shipment method information and store it into the quote. This step requires additional configuration because different shipment providers and different ways forms should be handled for each.

### Form Handling
`ShipmentForm` uses subforms and each subform is implemented as a plugin that implements `CheckoutSubFormInterface` and is provided in `CheckoutFactory::createShipmentMethodsSubForms()`. The main form uses quote transfer as data store. Data for shipment is stored under `QuoteTransfer::shipment` as a `ShipmentTransfer` object.

`ShipmentTransfer` contains:

### Data Handling
Data handling happens after a valid form is being submitted during the `ShipmentStep`; step receives plugins that implement `CheckoutStepHandlerPluginInterface` and provided in `CheckoutFactory::createShipmentPlugins()`. When `execute()` method is called on `ShipmentStep` then the plugin that is identified by the `ShipmentTransfer::shipmentSelection` string is selected and method `CheckoutStepHandlerPluginInterface::addToQuote()` is called to update `QuoteTransfer` with payment data. From this part, the data handling is left to concrete `CheckoutStepHandler`.

The approach of implementing shipment and payment handlers and forms are the same PaymentStep.

* shipmentSelection (string) — the name of the form for the selected shipment.
* carrier (ShipmentCarrierTransfer) — includes information on the shipment carrier.
* method (ShipmentMethodTransfer) — contains information about the shipment method that is currently selected.

## Payment Step
Get payment information and store it into quote for later processing when state machine is triggered.

Payment step has similar structure and data handling mechanics as the shipment step does.

### Form Handling
`PaymentForm` uses subforms. Each subform is implemented as a plugin that implements `CheckoutSubFormPluginInterface` and is provided in the `CheckoutFactory::createPaymentMethodSubForms()`. Main form uses `QuoteTransfer` as a data store. Data for payment is stored under `QuoteTransfer::payment` as a `PaymentTransfer` object.

Main form has radio buttons, where the customer can select from the available payment methods. Choices are built from the subform name. Each provided subform corresponds to a radio input.

When the form is created, it requires the property path to be provided so that it knows how to map its subform to `QuoteTransfer`. see property_path. Property path is built out of few parts of `PaymentTransfer::payment` and subform provides `getPropertyPath()` that returns a string; this string should return the property that exists under `PaymentTransfer`.

`PaymentTransfer` includes:

* paymentProvider (string) — payment provider name (Paypal, Payolution etc..).
* paymentMethod (string) — payment method (credit card, invoice).
* paymentSelection (string) — subform name that is currently selected.

### Data handling
Data handling happens after a valid form is submitted during the `PaymentStep`. The step receives plugins that implement `CheckoutStepHandlerPluginInterface` and that are provided in the `CheckoutFactory::createPaymentPlugins()`. When `execute()` method is called on `PaymentStep`, the plugin that is identified by `PaymentTransfer::paymentSelection` string is selected and the `CheckoutStepHandlerPluginInterface::addToQuote()` is called to update `QuoteTransfer` with the payment data. From this part, all population or data handling is left to concrete `CheckoutStepHandler`.

{% info_block infoBox %}
A new payment method `Paypal` must be added.<ol><li>The first step would be to add the new property to `PaymentTransfer` and call it paypal. This property will use `PaypalTransfer` and it will contain the data we need to map the details from the form.</li><li>Next, create/use Paypal module to add the step plugin.</li><li>In the Paypal module add the following plugins:<ul><li>Create `PaypalCheckoutSubForm` implementing `CheckoutSubFormPluginInterface` that returns a subform that implements `SubFormInterface`</li><li>Create `PaypalHandler` implementing `CheckoutStepHandlerPluginInterface` that should populate `QuoteTransfer:payment:paypal` with `PaypalTransfer`</li></ul></li></ol>After creation you need to add the plugins to the checkout process.<br><ol><li>To do this you need to create a `CheckoutDependencyInjector` inside your module and configure it to be used by the `Checkout` module. From there you can inject the needed forms and handler.</li><li>Add your form to the `CheckoutSubFormPluginCollection` by extending the given `CheckoutDependencyProvider::PAYMENT_SUB_FORMS`</li><li>Your handler needs to be added to the `CheckoutStepHandlerPluginCollection` by extending the given `CheckoutDependencyProvider::PAYMENT_METHOD_HANDLER`</li></ol>After this, you should see the new payment selection with subform rendered below.
{% endinfo_block %}

## Summary Step
Display order information about the item to be placed, details and order totals.

## Place Order Step
Place order into the system. This step requires `input = false`. This step makes Zed HTTP request which sends `QuoteTransfer`. In this step, all order saving is happening.

## Success Page
When the success page is executed, `QuoteTransfer` is cleared. Also, customer session is marked as dirty so that with the next request it would reload with the updated data (new customer address).

### Checkout Step Interface
```php
 #
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
 
 
 ### Step with External Redirect Interface
 ```php
  #
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

## Current Constraints
Currently, the feature has the following functional constraints which are going to be resolved in the future.

* all the stores inside a project share a single checkout with the same steps

<!-- Last review date: Jan 18, 2019_ by Vitaliy Kirichenko, Oksana Karasyova -->
