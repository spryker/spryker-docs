---
title: Checkout Process Review and Implementation
description: This article provides an overview of the checkout process and how it is implemented in Spryker.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/checkout-process-review-and-implementation
originalArticleId: 884e9981-3300-483c-b178-ff0370d89179
redirect_from:
  - /2021080/docs/checkout-process-review-and-implementation
  - /2021080/docs/en/checkout-process-review-and-implementation
  - /docs/checkout-process-review-and-implementation
  - /docs/en/checkout-process-review-and-implementation
  - /v6/docs/checkout-process-review-and-implementation
  - /v6/docs/en/checkout-process-review-and-implementation
  - /v5/docs/checkout-process-review-and-implementation
  - /v5/docs/en/checkout-process-review-and-implementation
  - /v4/docs/checkout-process-review-and-implementation
  - /v4/docs/en/checkout-process-review-and-implementation
  - /v2/docs/checkout-process-review-and-implementation
  - /v2/docs/en/checkout-process-review-and-implementation
---

### Checkout process

To use checkout in Yves, first, you need to configure it correctly and provide dependencies. Each step can have a form, a controller action, the implementation of the step logic and Twig template to render the HTML.
* Forms—current step form collection.
* Controller action—the action that is called when the step is being triggered.
* Step—a class that implements the StepInterface and handles the data passed through the form.
* Twig template—template where the form is rendered.

Each form in the Checkout uses `QuoteTransfer` for data storage. When the data is being submitted, it’s automatically mapped by the Symfony form component to `QuoteTransfer`. If the form is valid, the updated `QuoteTransfer` is passed to `Step::execute()` method where you can modify it further or apply custom logic. Also, there is Symfony Request object passed if additional/manual data mapping is required.

There are a few factories provided for checkout dependency wiring:
* `FormFactory`—creates form collections for each step.
* `StepFactory`—creates the steps together with their dependencies and plugins.
* `CheckoutFactory`—where the StepProcess is created for all steps.

We have a step process which contains the list of the steps created. The `CheckoutProcess::process(Request, FormCollectionHandlerInterface)` process method accepts a Request which is currently submitted and a `FormCollectionHandlerInterface` implementation that contains the list of forms that are used in the current step. If there are multiple forms that are used, `FormCollectionHandler` selects the right one when the request is being performed.

In most cases, forms need external data to work with. For example, Checkout Address step uses data provider to retrieve all stored customer addresses and company business unit addresses, if the customer is a company user.

Another example—the Checkout Payment step. It uses data provider to retrieve all available payment providers, that are being rendered on the page.

Using a data provider is the only way to pass any external data to the form and step page, that can be accessed, processed and later saved into the `QuoteTransfer`.

Each data provider is passed when `FormCollection` is created. Then, when the handle method is being called, FormCollection handler creates all form types and passes the data from data providers to them.

### Checkout quote transfer lifetime

![Quote_transfer_lifetime.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Checkout/Multi-Step+Checkout/Checkout+Process/quote-transfer-lifetime.png)

When a process is being called on `StepProcess`, it tries to get the current valid step by walking through the step stack and calling the `postCondition()` for each, starting from the first in the stack. If `postCondition()` is being called on `StepProcess`, it tries to get the current valid step by walking through the step stack and calling the `postCondition()` for each, starting from the first in the stack. If `postCondition()` failed, then this step is used for later processing. After that, the view variables with `QuoteTransfer` and form are passed to Twig, and the HTML is rendered.

#### Post condition

Post condition is an essential part of the step Processing. It indicates if a step has all the data that it needs and if its requirements are satisfied. It’s not possible to access the next step from the stack if previous step post conditions are not met, but it’s possible to navigate to any step where post conditions are satisfied (`return true`).

Post conditions are called twice per step processing:
* To find the current step or if we can access the current step.
* After `execute()`, to make sure the step was completed and that we can continue to the next step.

#### Post condition error route

Inside your step, you can set a post condition error route. If you need to redirect to another error route than the one specified during the step construction.

### How the quote transfer is mapped inside forms

Symfony forms provide a mechanism to store data into objects without needing manual mapping. It’s called [Data transformers](https://symfony.com/doc/current/form/data_transformers.html). There are a few important things to make this work. Because we are passing the entire `QuoteTransfer`, the form handler does not know which fields you are trying to use. Symfony provides a few ways to handle this situation:
* Using [property_path](https://symfony.com/doc/current/reference/forms/types/form.html#property-path) configuration directive. It uses the full path to object property you are about to map form into, for example, `payment.paypal` maps your form to `QuoteTransfer:payment:paypal`; this works when the property is not on the same level and when you are using subforms.
* Using the main form that includes subforms. Each subform has to be configured with the `data_class` option that is the FQCN of transfer object you are about to use. This works when the property is in the top level.

### Checkout form submission

On form submission, the same processing starts with the difference that if form submit is detected, then the validation is called:
* If the form is invalid, then the view is rendered with validation errors.
* If form data is valid, then `execute()` is called on the step that executes the step related logic.

E.g., add the address to `QuoteTransfer` or get payment details from Zed, call external service etc.

It’s up to you to decide what to do in each execute method. It’s essential that after `execute()` runs, the updated returned `QuoteTransfer` should satisfy the `postCondition()` so that the `StepProcess` can take another step from the stack.

#### Required input

Normally each step requires an input from the customer. However, there are cases when there is no need to render a form or a view, but some processing is still required (e.g., `PlaceOrderStep`, `EntryStep`). Each step should provide the implementation of the `requireInput()` method. `StepProcess` calls this method and reacts accordingly. Again if `requireInput()` is false, then after running `execute()` the `postConditions` should be satisfied.

#### Precondition and escape route

Preconditions are called before each step; this is a check to indicate that step can’t be processed in a usual way.

E.g., the cart is empty. If the `preCondition()` returns false, the customer is redirected to the escapeRoute provided when configuring the step.

#### External redirect URL

Sometimes it’s needed to redirect the customer to an external URL (outside application). The step should implement `StepWithExternalRedirectInterface::getExternalRedirectUrl()` which returns the URL to redirect customer after `execute()` is ran.

{% info_block errorBox %}

Each step must implement StepInterface.

{% endinfo_block %}

![Step_flow.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Checkout/Multi-Step+Checkout/Checkout+Process/step-flow.png)

### Placing the order

After the customer clicks the submit button during the `SummaryStep`, the `PlaceOrderStep` is started. This step takes the `QuoteTransfer` and starts the checkout workflow to store the order into the system. Zed Checkout module contains some plugins where you can add additional behavior, check preconditions, save or execute post condition check.

#### Plugins

Zed's Checkout module contains four types of plugins to extend the behavior on placing an order. Any plugin has access to `QuoteTransfer` that is supposed to be read-only and `CheckoutResponseTransfer` data object that can be modified.

* `PreCondition`—is for checking if the order satisfies predefined constraints (e.g., if the quantity of items is still available).
* `OrderSavers`—is for saving the order, each plugin is responsible for collecting certain parts of the order (sales module saves items, discount module saves discounts, product option module saves options etc.). Each `OrderSaver` plugin is wrapped into a single transaction; if an exception is being thrown, the transaction is rolled back.
* `CheckPostConditions`—is for checking conditions after saving, last time to react if something did not happen by the plan. It’s called after state machine execution.
* `PostSaveHook`—is called after order placement, sets the success flag to false, if redirect should be headed to an error page afterward.

#### Checkout response transfer

* `isSuccess` (bool)—indicates if the checkout process was successful.
* errors (CheckoutErrorTransfer)—list of errors that occurred during execution of the plugins.
* `isExternalRedirect` (bool)—specifies if the redirect, after the successful order placement is external.
* `redirectUrl` (string)—URL to redirect customer after the order was placed successfully.
* `saveOrder` (`SaveOrderTransfer`)—stores ids of the items that OrderSaver plugins have saved.

#### Checkout error transfer

* `errorCode` (int)—numeric error code. The checkout error codes are listed below.
* message (string)—error message.

#### Checkout error codes

* 4001—customer email already used.
* 4002—product unavailable.
* 4003—cart amount does not match.
* 5000—unknown error.

#### Save order transfer

* `idSalesOrder` (int)—ID of the current saved order.
* `orderReference` (string)—an auto-generated ID of the order.
* `orderItems` (`ItemTransfer`)—saved order items.

There are already some plugins implemented with each of those types:

#### Precondition plugins

* `CustomerPreConditionCheckerPlugin`—checks if the email of the customer is already used.
* `ProductsAvailableCheckoutPreConditionPlugin`—check if the items contained in the cart are in stock.

#### Postcondition plugins

* `OrderCustomerSavePlugin`—save/create a customer in the database if the customer is new or the ID is not set (guest customer is ignored).
* `SalesOrderSaverPlugin`—saves order information, creates sales_order and sales_order_item tables.
* `ProductOptionOrderSaverPlugin`—saves product options to thr sales_product_item table.
* `DiscountOrderSavePlugin`—saves order discounts to the sales_discounts table.
* `OrderShipmentSavePlugin`—saves order shipment information to the sales_expense table.
* `SalesPaymentCheckoutDoSaveOrderPlugin`—saves order payments to the spy_sales_payment table.

#### Pre save condition plugin

`SalesOrderExpanderPlugin`—expands items by quantity and recalculate quote.

#### State machine

A state machine is triggered in the `CheckoutWorkflow` class from the Checkout module; the execution starts after pre-condition and order saver plugins store no errors into `CheckoutResponseTransfer`.

The state machine trigger needs a name in order to be executed. The name is set by `SalesOrderSaverPlugin` in the Sales module. Each project has to implement `SalesConfig::determineProcessForOrderItem()` method, which should return the state machine name for the selected order item. E.g., Payolution payment would return PayolutionPayment01.

<!-- _Last review date: Jan 18, 2019_ by Vitaliy Kirichenko, Oksana Karasyova -->
