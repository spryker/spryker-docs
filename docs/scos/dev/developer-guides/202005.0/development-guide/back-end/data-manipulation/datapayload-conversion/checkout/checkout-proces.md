---
title: Checkout Process Review and Implementation
originalLink: https://documentation.spryker.com/v5/docs/checkout-process-review-and-implementation
redirect_from:
  - /v5/docs/checkout-process-review-and-implementation
  - /v5/docs/en/checkout-process-review-and-implementation
---

### Checkout Process
To use checkout in Yves, first, you need to configure it correctly and provide dependencies. Each step can have a form, a controller action, the implementation of the step logic and Twig template to render the HTML.

* Forms - current step form collection.
* Controller action - the action that is called when the step is being triggered
* Step - a class that implements the StepInterface and handles the data passed through the form.
* Twig template - template where the form is rendered.

Each form in the Checkout uses `QuoteTransfer` for data storage. When the data is being submitted, it’s automatically mapped by the Symfony form component to `QuoteTransfer`. If the form is valid, the updated `QuoteTransfer` is passed to `Step::execute()` method where you can modify it further or apply custom logic. Also, there is Symfony Request object passed if additional/manual data mapping is required.

There are a few factories provided for checkout dependency wiring:

* FormFactory - creates form collections for each step.
* StepFactory - creates the steps together with their dependencies and plugins.
* CheckoutFactory - where the StepProcess is created for all steps.

We have a step process which contains the list of the steps created. The `CheckoutProcess::process(Request, FormCollectionHandlerInterface)` process method accepts a Request which is currently submitted and a `FormCollectionHandlerInterface` implementation that contains the list of forms that are used in the current step. If there are multiple forms that are used, `FormCollectionHandler` selects the right one when the request is being performed.

In most cases, forms need external data to work with. For example, Checkout Address step uses data provider to retrieve all stored customer addresses and company business unit addresses, if the customer is a company user.

Another example - Checkout Payment step. It uses data provider to retrieve all available payment providers, that are being rendered on the page.

Using a data provider is the only way to pass any external data to the form and step page, that can be accessed, processed and later saved into the `QuoteTransfer`.

Each data provider is passed when `FormCollection` is created. Then, when the handle method is being called, FormCollection handler creates all form types and passes the data from data providers to them.

### Checkout Quote Transfer Lifetime
![Quote_transfer_lifetime.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Checkout/Multi-Step+Checkout/Checkout+Process/quote-transfer-lifetime.png){height="" width=""}

When a process is being called on `StepProcess`, it tries to get the current valid step by walking through the step stack and calling the `postCondition()` for each, starting from the first in the stack. If `postCondition()` is being called on `StepProcess`, it tries to get the current valid step by walking through the step stack and calling the `postCondition()` for each, starting from the first in the stack. If `postCondition()` failed, then this step is used for later processing. After that, the view variables with `QuoteTransfer` and form are passed to Twig, and the HTML is rendered.

#### Post Condition
Post condition is an essential part of the step Processing. It indicates if a step has all the data that it needs and if its requirements are satisfied. It’s not possible to access the next step from the stack if previous step post conditions are not met, but it’s possible to navigate to any step where post conditions are satisfied (`return true`).

Post conditions are called twice per step processing:

* To find the current step or if we can access the current step.
* After `execute()`, to make sure the step was completed and that we can continue to the next step.

#### Post Condition Error Route
Inside your step, you can set a post condition error route. If you need to redirect to another error route than the one specified during the step construction.

### How the Quote Transfer is Mapped Inside Forms
Symfony forms provide a mechanism to store data into objects without needing manual mapping. It’s called [Data transformers](https://symfony.com/doc/current/form/data_transformers.html). There are a few important things to make this work. Because we are passing the entire `QuoteTransfer`, the form handler does not know which fields you are trying to use. Symfony provides a few ways to handle this situation:

* using [property_path](https://symfony.com/doc/current/reference/forms/types/form.html#property-path) configuration directive
It uses the full path to object property you are about to map form into, for example, `payment.paypal` maps your form to `QuoteTransfer:payment:paypal`; this works when the property is not on the same level and when you are using subforms.
* using the main form that includes subforms. Each subform has to be configured with the `data_class` option that is the FQCN of transfer object you are about to use. This works when the property is in the top level.

### Checkout Form Submission
On form submission, the same processing starts with the difference that if form submit is detected, then the validation is called:

* if the form is invalid, then the view is rendered with validation errors
* if form data is valid, then `execute()` is called on the step that executes the step related logic.

E.g., add the address to `QuoteTransfer` or get payment details from Zed, call external service etc.

It’s up to you to decide what to do in each execute method. It’s essential that after `execute()` runs, the updated returned `QuoteTransfer` should satisfy the `postCondition()` so that the `StepProcess` can take another step from the stack.

#### Required Input
Normally each step requires an input from the customer. However, there are cases when there is no need to render a form or a view, but some processing is still required (e.g., `PlaceOrderStep`, `EntryStep`). Each step should provide the implementation of the requireInput() method. `StepProcess` calls this method and reacts accordingly. Again if `requireInput()` is false, then after running `execute()` the `postConditions` should be satisfied.

#### Precondition and Escape Route
Preconditions are called before each step; this is a check to indicate that step can’t be processed in a usual way.

E.g., the cart is empty. If the `preCondition()` returns false, the customer is redirected to the escapeRoute provided when configuring the step.

#### External Redirect URL
Sometimes it’s needed to redirect the customer to an external URL (outside application). The step should implement `StepWithExternalRedirectInterface::getExternalRedirectUrl()` which returns the URL to redirect customer after `execute()` is ran.

{% info_block errorBox %}
Each step must implement StepInterface.
{% endinfo_block %}
![Step_flow.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Checkout/Multi-Step+Checkout/Checkout+Process/step-flow.png){height="" width=""}

### Placing the Order
After the customer clicks the submit button during the `SummaryStep`, the `PlaceOrderStep` is started. This step takes the `QuoteTransfer` and starts the checkout workflow to store the order into the system. Zed Checkout module contains some plugins where you can add additional behavior, check preconditions, save or execute post condition check.

#### Plugins
Zed's Checkout module contains four types of plugins to extend the behavior on placing an order. Any plugin has access to `QuoteTransfer` that is supposed to be read-only and `CheckoutResponseTransfer` data object that can be modified.

* PreCondition — is for checking if the order satisfies predefined constraints (e.g., if the quantity of items is still available).
* OrderSavers — is for saving the order, each plugin is responsible for collecting certain parts of the order (sales module saves items, discount module saves discounts, product option module saves options etc.). Each `OrderSaver` plugin is wrapped into a single transaction; if an exception is being thrown, the transaction is rolled back.
* CheckPostConditions — is for checking conditions after saving, last time to react if something did not happen by the plan. It’s called after state machine execution.
* PostSaveHook — is called after order placement, sets the success flag to false, if redirect should be headed to an error page afterward.

#### Checkout Response Transfer

* isSuccess (bool) — indicates if the checkout process was successful.
* errors (CheckoutErrorTransfer) — list of errors that occurred during execution of the plugins.
* isExternalRedirect (bool) — specifies if the redirect, after the successful order placement is external.
* redirectUrl (string) — URL to redirect customer after the order was placed successfully.
* saveOrder (SaveOrderTransfer) — stores ids of the items that OrderSaver plugins have saved.

#### Checkout Error Transfer

* errorCode (int) — numeric error code. The checkout error codes are listed below.
* message (string) — error message.

#### Checkout Error Codes

* 4001 — customer email already used.
* 4002 — product unavailable.
* 4003 — cart amount does not match.
* 5000 — unknown error.

#### Save Order Transfer

* idSalesOrder (int) — ID of the current saved order.
* orderReference (string) — an auto-generated ID of the order.
* orderItems (ItemTransfer) — saved order items.

There are already some plugins implemented with each of those types:

#### Precondition Plugins

* CustomerPreConditionCheckerPlugin — Checks if the email of the customer is already used.
* ProductsAvailableCheckoutPreConditionPlugin — Check if the items contained in the cart are in stock.

#### Postcondition Plugins

* OrderCustomerSavePlugin — save/create a customer in the database if the customer is new or the ID is not set (guest customer is ignored).
* SalesOrderSaverPlugin — saves order information, creates sales_order and sales_order_item table.
* ProductOptionOrderSaverPlugin — saves product options to sales_product_item table.
* DiscountOrderSavePlugin — save order discounts to the sales_discounts table.
* OrderShipmentSavePlugin — saves order shipment information to sales_expense table.

#### Pre Save Condition Plugin

* SalesOrderExpanderPlugin — expands items by quantity and recalculate quote.

#### State Machine
A state machine is triggered in the `CheckoutWorkflow` class from the Checkout module; the execution starts after pre-condition and order saver plugins store no errors into CheckoutResponseTransfer.

The state machine trigger needs a name in order to be executed. The name is set by `SalesOrderSaverPlugin` in the Sales module. Each project has to implement `SalesConfig::determineProcessForOrderItem()` method, which should return the state machine name for the selected order item. E.g., Payolution payment would return PayolutionPayment01.

<!-- _Last review date: Jan 18, 2019_ by Vitaliy Kirichenko, Oksana Karasyova -->
