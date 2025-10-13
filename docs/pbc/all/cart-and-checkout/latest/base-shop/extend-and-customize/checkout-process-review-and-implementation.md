---
title: Checkout process review and implementation
description: This document provides an overview of the checkout process and how it's implemented in Spryker.
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
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/checkout/checkout-process-review-and-implementation.html
  - /docs/pbc/all/cart-and-checkout/extend-and-customize/checkout-process-review-and-implementation.html
  - /docs/pbc/all/cart-and-checkout/202311.0/extend-and-customize/checkout-process-review-and-implementation.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/extend-and-customize/checkout-process-review-and-implementation.html
related:
  - title: Checkout steps
    link: docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/checkout/checkout-steps.html
---

## Checkout process

To use the checkout in Yves, you need to configure it correctly and provide dependencies. Each step can have a form, a controller action, the implementation of the step logic, and a Twig template to render the HTML.

- *Forms*—current step form collection.
- *Controller action*—the action that is called when the step is triggered.
- *Step*—a class that implements the StepInterface and handles the data passed through the form.
- *Twig template*—template where the form is rendered.

Each form in the checkout uses `QuoteTransfer` for data storage. When the data is submitted, it's automatically mapped by the Symfony form component to `QuoteTransfer`. If the form is valid, the updated `QuoteTransfer` is passed to the `Step::execute()` method, where you can modify it further or apply custom logic. There is also a Symfony Request object passed if additional or manual data mapping is required.

There are a few factories provided for checkout dependency wiring:

- `FormFactory`—creates form collections for each step.
- `StepFactory`—creates the steps together with their dependencies and plugins.
- `CheckoutFactory`—where the StepProcess is created for all steps.

We have a step process that contains the list of the steps created. The `CheckoutProcess::process(Request, FormCollectionHandlerInterface)` process method accepts `Request`, which is currently submitted, and the `FormCollectionHandlerInterface` implementation that contains the list of forms that are used in the current step. If multiple forms are used, `FormCollectionHandler` selects the right one when the request is performed.

In most cases, forms need external data to work with. For example, the Checkout Address step uses a data provider to retrieve all stored customer addresses and company business unit addresses if a customer is a company user.

Another example is the Checkout Payment step. It uses a data provider to retrieve all available payment providers that are being rendered on the page.

Using a data provider is the only way to pass any external data to the form and step page that can be accessed, processed, and later saved into `QuoteTransfer`.

Each data provider is passed when `FormCollection` is created. When the handle method is called, the `FormCollection` handler creates all form types and passes the data from data providers to them.

## Checkout quote transfer lifetime

![Quote_transfer_lifetime.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Checkout/Multi-Step+Checkout/Checkout+Process/quote-transfer-lifetime.png)

When a process or `postCondition()` is called on `StepProcess`, it tries to get the current valid step by walking through the stack of steps and calling `postCondition()` for each, starting from the first in the stack. If `postCondition()` fails, then this step is used for later processing. After that, the view variables with `QuoteTransfer` and form are passed to Twig, and the HTML is rendered.

### Postcondition

*Postcondition* is an essential part of the Processing step. It indicates if a step has all the data that it needs and if its requirements are satisfied. You can't access the next step from the stack if the previous step's postconditions are not met, but you can navigate to any step where postconditions are satisfied (`return true`).

Postconditions are called twice per step processing:
- To find the current step or if we can access the current step.
- After `execute()`, to make sure the step was completed and that we can continue to the next step.

### Postcondition error route

Inside your step, you can set a postcondition error route if you need to redirect to another error route than the one specified during the step construction.

## How the quote transfer is mapped inside forms

Symfony forms provide a mechanism to store data into objects without needing manual mapping. It's called [Data transformers](https://symfony.com/doc/current/form/data_transformers.html). There are a few important conditions required to make this work. Because you are passing the entire `QuoteTransfer`, the form handler does not know which fields you are trying to use. Symfony provides a few ways to handle this situation:
- Using [property_path](https://symfony.com/doc/current/reference/forms/types/form.html#property-path) configuration directive. It uses the full path to object property you are about to map form into—for example, `payment.paypal` maps your form to `QuoteTransfer:payment:paypal`; this works when the property is not on the same level and when you are using subforms.
- Using the main form that includes subforms. Each subform has to be configured with the `data_class` option, which is the FQCN of the transfer object you are about to use. This works when the property is on the top level.

## Checkout form submission

On form submission, the same processing starts with the difference that if form submit's detected, then the validation is called:
- If the form is invalid, then the view is rendered with validation errors.
- If form data is valid, then `execute()` is called on the step that executes the step-related logic.

For example, add the address to `QuoteTransfer` or get payment details from Zed, and call an external service.

You decide what to do in each `execute()` method. It's essential that after `execute()` runs, the updated returned `QuoteTransfer` must satisfy `postCondition()` so that `StepProcess` can take another step from the stack.

### Required input

Normally each step requires input from the customer. However, there are cases when there is no need to render a form or a view, but some processing is still required, that is, `PlaceOrderStep` and `EntryStep`. Each step provides the implementation of the `requireInput()` method. `StepProcess` calls this method and reacts accordingly. If `requireInput()` is false, after running `execute()`, `postConditions` must be satisfied.

### Precondition and escape route

Preconditions are called before each step; this is a check to indicate that the step can't be processed in a usual way.

For example, the cart is empty. If `preCondition()` returns false, the customer is redirected to `escapeRoute` provided when configuring the step.

### External redirect URL

Sometimes it's required to redirect the customer to an external URL (outside application). The step must implement `StepWithExternalRedirectInterface::getExternalRedirectUrl()`, which returns the URL to redirect customer after `execute()` is ran.

{% info_block errorBox %}

Each step must implement `StepInterface`.

{% endinfo_block %}

![Step_flow.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Checkout/Multi-Step+Checkout/Checkout+Process/step-flow.png)

## Placing the order

After the customer clicks the submit button during `SummaryStep`, `PlaceOrderStep` is started. This step takes `QuoteTransfer` and starts the checkout workflow to store the order in the system. Zed's Checkout module contains some plugins where you can add additional behavior, check preconditions, and save or execute postcondition checks.

### Plugins

Zed's Checkout module contains four types of plugins to extend the behavior on placing an order. Any plugin has access to `QuoteTransfer` that is supposed to be read-only and `CheckoutResponseTransfer` data object that can be modified.

- `PreCondition`—is for checking if the order satisfies predefined constraints—for example, if the quantity of items is still available.
- `OrderSavers`—is for saving the order. Each plugin is responsible for collecting certain parts of the order (sales module saves items, discount module saves discounts, product option module saves options). Each `OrderSaver` plugin is wrapped into a single transaction; if an exception is thrown, the transaction is rolled back.
- `CheckPostConditions`—is for checking conditions after saving, the last time to react if something did not happen according to plan. It's called after the state machine execution.
- `PostSaveHook`—is called after order placement, and sets the success flag to false, if redirect must be headed to an error page afterward.

### Checkout response transfer

- `isSuccess` (boolean)—indicates if the checkout process was successful.
- errors (`CheckoutErrorTransfer`)—list of errors that occurred during the execution of the plugins.
- `isExternalRedirect` (boolean)—specifies if the redirect, after the successful order placement is external.
- `redirectUrl` (string)—URL to redirect customer after the order was placed successfully.
- `saveOrder` (`SaveOrderTransfer`)—stores ids of the items that OrderSaver plugins have saved.

### Checkout error transfer

- `errorCode` (int)—numeric error code. The checkout error codes are listed in the following section [Checkout error codes](#checkout-error-codes).
- `message` (string)—error message.

### Checkout error codes

- `4001`—customer email already used.
- `4002`—product unavailable.
- `4003`—cart amount does not match.
- `5000`—unknown error.

### Save order transfer

- `idSalesOrder` (int)—The unique ID of the current saved order.
- `orderReference` (string)—An auto-generated unique ID of the order.
- `orderItems` (`ItemTransfer`)—The saved order items.

There are already some plugins implemented with each of those types:

### Precondition plugins

- `CustomerPreConditionCheckerPlugin`—checks if the email of the customer is already used.
- `ProductsAvailableCheckoutPreConditionPlugin`—check if the items contained in the cart are in stock.

### Postcondition plugins

- `OrderCustomerSavePlugin`—saves or creates a customer in the database if the customer is new or the ID is not set (guest customers are ignored).
- `SalesOrderSaverPlugin`—saves order information and creates `sales_order` and `sales_order_item` tables.
- `ProductOptionOrderSaverPlugin`—saves product options to the `sales_product_item` table.
- `DiscountOrderSavePlugin`—saves order discounts to the `sales_discounts` table.
- `OrderShipmentSavePlugin`—saves order shipment information to the `sales_expense` table.
- `SalesPaymentCheckoutDoSaveOrderPlugin`—saves order payments to the `spy_sales_payment` table.

### Pre-save condition plugin

`SalesOrderExpanderPlugin`—expands items by quantity and recalculate quote.

### State machine

A state machine is triggered in the `CheckoutWorkflow` class from the Checkout module; the execution starts after precondition and order saver plugins store no errors into `CheckoutResponseTransfer`.

The state machine trigger needs a name in order to be executed. The name is set by `SalesOrderSaverPlugin` in the Sales module. Each project has to implement the `SalesConfig::determineProcessForOrderItem()` method, which should return the state machine name for the selected order item. That is, Payolution payment would return `PayolutionPayment01`.
