---
title: Tutorial - Checkout - Legacy Demoshop
originalLink: https://documentation.spryker.com/v1/docs/tutorial-checkout-legacy-demoshop
redirect_from:
  - /v1/docs/tutorial-checkout-legacy-demoshop
  - /v1/docs/en/tutorial-checkout-legacy-demoshop
---

## Challenge Description
Integrate an additional step into the checkout process; a Voucher step where a customer enters a voucher code and gets a discount. Add the Voucher step after the Payment one.

To explore further before starting, you can read about the [Checkout](https://documentation.spryker.com/v1/docs/checkout-steps-201903) and the [StepEngine](/docs/scos/dev/features/201811.0/order-management/step-engine) modules.

**Bonus challenge:**

* Add a new shipment plugin to make a shipment method unavailable if the amount of the order is less than 50.00€.
* Add a new shipment plugin to set shipping cost to 1.00€ if the amount of the order is more than 50.00€.
* Add a new shipment plugin to set the estimated delivery time to 1 day if the amount of the order is more than 50.00€.

## Challenge Solving Highlights
To add an additional step to the checkout process, follow the steps described below:

### 1. Add the Voucher Step

* Let’s get the step running first, then add the execution and the calculation of the discount.
* Before adding the step, you need to define the route for the step. Go to the `CheckoutControllerProvider` under `src/Pyz/Yves/Checkout/Plugin/Provider` and add the route for the step.
* Next, go to `src/Pyz/Yves/Checkout/Process/Steps` and create the step class. Call it `VoucherStep`. Don’t forget to extend the `AbstractBaseStep` to inherit all the necessary functionality.
* Add the new step to `StepFactory` under `src/Pyz/Yves/Checkout/Process`.
* Create a controller action in `src/Pyz/Yves/Checkout/Controller/CheckoutController` and call it `voucherAction`. You can return any string for now, just to make sure that the step works correctly. We will get back to this action once we build the form in the next step.
* The step is now created; go to Demoshop, add any product to the cart and go to checkout. The Voucher step should be working now.

### 2. Add the Voucher Form
Spryker uses Symfony forms as a foundation to build and handle forms. One of the main concepts in Symfony forms is binding form fields with data objects. This helps in setting and getting different data fields directly from/to the form. Spryker uses transfer objects as DTOs, you can directly bind them to your forms. Let’s build the form and get the customers input for the voucher.

* Create a form type in `src/Pyz/Yves/Checkout/Form/Steps/`. Call it `VoucherForm`.
* Add an input field to the form for the voucher code.
* Add the voucher form to the `FormFactory` under `src/Pyz/Yves/Checkout/Form/`. You can follow the other steps as an example to do so.
* Create the form twig template under `src/Pyz/Yves/Checkout/Theme/default/checkout/`. Call it voucher. Add the form to the template and add a submit button to it.
* The form is done, let’s bind it now to the transfer object. Go to `src/Pyz/Shared` and create the directories `Checkout/Transfer` so that a path looks like this `src/Pyz/Shared/Checkout/Transfer`. Create the transfer object schema and call it Quote. The Quote transfer is the main transfer object which is used in the checkout. Now, add the voucher field with `type="string"` inside the transfer schema.
* From the command line run `vendor/bin/console transfer:generate` to generate a new transfer object.
* To finish the binding, add the property `property_path` to the voucher field inside the voucher form.
* Back to the controller, modify the voucher action in order to return the form instead of the string.
* The step has a form now and receives the voucher code value from the customer. Go to Demoshop and try it out.

### 3. Add the Step Execution
Finally, let’s apply the voucher discount.

* Implement the `execute()` method in the `VoucherStep` in order to calculate a new grand total after applying the discount.
* Generate some voucher codes from Zed UI. Go to the [Discount](http://zed.de.demoshop.local/discount/index/list) back-end page, create a new discount and generate some voucher codes. To apply the voucher discount you added, deactivate all the exclusive discounts. For more details on how the Discount module works, see Module Guide - Discount.<!-- (https://documentation.spryker.com/module_guide/spryker/discount.htm).-->

The challenge is done and ready for testing! Go to the Demoshop, add any product to cart, go the checkout and enter any of the available voucher codes. You should receive a discount on your order.

## Bonus Challenge
To add a new shipment availability plugin:

1. Add a new availability plugin inside the `Pyz/Zed/Shipment/Communication/Plugin/` folder that implements `ShipmentMethodAvailabilityPluginInterface`.
2. Make the plugin is available through the `ShipmentDependencyProvider`.
3. Enable the availability plugin for one of the shipment methods.

To add a new shipment price plugin:

1. Add a new price plugin inside the `Pyz/Zed/Shipment/Communication/Plugin/` folder that implements `ShipmentMethodPricePluginInterface`.
2. Make the plugin available through the `ShipmentDependencyProvider`.
3. Enable the price plugin for one of the shipment methods.

To add a new shipment delivery time plugin:

1. Add a new delivery time plugin inside the `Pyz/Zed/Shipment/Communication/Plugin/` folder that implements `ShipmentMethodDeliveryTimePluginInterface`.
2. Make the plugin is available through the `ShipmentDependencyProvider`.
3. Enable the delivery time plugin for one of the shipment methods.
