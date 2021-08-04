---
title: Quotation Process & RFQ Feature Overview
originalLink: https://documentation.spryker.com/v3/docs/quotation-process-rfq-feature-overview
redirect_from:
  - /v3/docs/quotation-process-rfq-feature-overview
  - /v3/docs/en/quotation-process-rfq-feature-overview
---

<section contenteditable="false" class="infoBox"><div class="content">

| Definition | Description |
| --- | --- |
|Buyer  |A company user who can create a Request for quote (RFQ)  |
|Sales Representative (Sales Rep)  | A person who is eligible for reviewing the submitted RfQs |
</div></section>

**Request for Quote (RFQ)** is a request that a B2B buyer sends to their suppliers stating that they would like to get a quoted price on particular products with the details about the packaging and volumes they need. 
![Request quote](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/request-quote.png){height="" width=""}

Within the Spryker Commerce OS, RFQ is represented by the ability of a Sales Representative to see the list of quotes, check and edit them, thereby change and overwrite the prices for the products in the RFQ for a certain buyer. In turn, a buyer is able to create an RFQ from a shopping cart, add a note to it and bid for cheaper prices. An RFQ can also specify the timeline for delivery, a date by which the proposal should be submitted, and history of the negotiations.
![Sales Representative and RFQ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/sales-rep-rfq.png){height="" width=""}

One of the RFQ features is a tool for creating special offers for buyers with limited validity. For example, a Sales Representative can update the prices for products in the RFQ and set the exact time until which this offer is valid, e.g, 29th of December, 2019, 11:58 PM. If the Buyer tries to proceed with this RFQ to Checkout on 29th of December, 2019 at 11:59 PM, then this RFQ will not be available.
![RFQ Validity](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/valid-till.png){height="" width=""}

## RFQ Statuses
The RFQ can have the following statuses:

* _Draft_ - the RFQ is successfully created but not sent to a Sales Representative or Customer (see RFQ Workflows to understand the RFQ process)
* _Waiting_ - the status appears after the RFQ has been sent to a Sales Representative. At this moment, the buyer can't edit the RFQ after it has been sent, but they can cancel it. 
* _In Progress_ - this status appears when the Sales Representative edits the RFQ
* _Ready_ - the Buyer receives the RFQ with this status when the Sales Representative has finished editing and sent the RFQ back to a Buyer
* _Canceled_ - indicates a canceled RFQ
* _Closed_ - appears when the customer has placed the order from the RFQ

## RFQ Workflows
The process of requesting the quote includes two workflows depending on the role the user has. A workflow is defined as the sequence of steps the user can go through to complete the process successfully. These are:

* [buyer workflow](https://documentation.spryker.com/v3/docs/quotation-process-rfq-feature-overview-201907#buyer-workflow)
* [sales representative workflow](https://documentation.spryker.com/v3/docs/quotation-process-rfq-feature-overview-201907#sales-representative-workflow)

### Buyer Workflow
A Buyer can create a Quote Request the product prices from a Shopping Cart:
![Buyer workflow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/buyer-rfq-button.png){height="" width=""}

After filling the metadata fields and submitting the request, RFQ gets to the status **Draft** where the buyer can also check the version information, edit the add/remove products, change their quantity, update meta information and once done, send the RFQ to a Sales Representative. After that, the Buyer waits until the RFQ gets processed by a Sales Representative. The status of the RFQ changes to **Waiting**. Request for Quote cannot be edited at this point. It is only possible to cancel it.

After the Sales Representative has processed the request, the Buyer gets it back with the status **Ready**. At this point, if a Buyer is satisfied with such a request, then they can convert the RFQ to Cart, and after that proceed to the Checkout. When the order is placed, the RFQ receives **Closed** status.

If the buyer isn't satisfied and would like to negotiate the price further, they can **Revise** the RFQ and move it back to the **Draft** status. The RFQ obtains a new RFQ version. Schematically, the workflow is shown below:
![Schema of workflow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/Buyer+Workflow.png){height="" width=""}

### Sales Representative Workflow
A Sales Representative can create an RFQ using two working procedures:
* via an [Agent](/docs/scos/dev/features/201907.0/company-account-management/agent-assist/agent-assist) Account
* on behalf of a company user

#### Via an Agent Account
Being logged in to an Agent account, a Sales Representative has access to the list of all the RFQs within the company. The RFQs are sorted by date and are displayed in all the statuses. A Sales Representative can revise the requests that are in the **Waiting** status. Revising implies changing the meta information, adding/removing the products, changing their default price and quantity and setting the life time for a particular RFQ. RFQ Life Time restricts the buyer by date and time until the RFQ is considered valid. If the Buyer hasn't placed the order using the RFQ with Life Time, the RFQ automatically obtains the status **Closed**.

Upon revising the RFQ, a new RFQ version is created. When the Sales Representative sends the RFQ back to the customer, a Buyer receives the RFQ with status **Ready**.

#### On Behalf of a Company User
A Sales Representative can create an RFQ on behalf of any company user. This option is especially convenient when, for example, a company user is busy or doesn't have access to an account and a Sales Representative is able to create an RFQ for a certain user, process it and fully complete the checkout.

To create an RFQ on behalf of a user, see the [Creating an RFQ for a Customer](https://documentation.spryker.com/v3/docs/managing-rfqs-sales-rep-shop-guide#creating-an-rfq-for-a-customer) section in *Shop Guide - Managing Requests for Quote for a Sales Representative*.

The workflow with statuses for a Sales Representative is presented in the schema below:
![Workflow for Sales Reps](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/sales-rep-workflow.png){height="" width=""}

When a Sales Representative creates an RFQ, it has the **Show the latest version to customer** checkbox empty by default. This means, that the buyer cannot see the latest updated version of the RFQ (for example, with the changed prices). When the **Show the latest version to customer** checkbox is selected, the updates that have been made by a Sales Representative are available to the Buyer right here. The Buyer can see the **In Progress** status for the RFQ.

### Quote Request Widget for an Agent Account
Agent account has a Quote Request Widget. The Widget displays the latest five requests for quotes that were updated except for those that are in the status Closed. You can configure the statuses for the RFQ you would like to check in the widget on the project level. In the widget, a Sales Representative can check the following information:

* RFQ reference (DE-1-1-1 etc)
* Company name
* BU name
* Company user name
* Total
* Number of Items
* Status
![Agent widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/agent-widget-rfq.png){height="" width=""}

### RFQ Versioning
Versioning implies management of multiple variants of the same RFQ, all of which have same general details but include the customized data (for example, prices for the same products in the different versions of the RFQ can vary). Every RFQ receives specific identifiers, such as DE--1-Y-X, where: 

* DE--1 - customer reference
* Y - number of the request of the customer
* X - version of the RFQ
![RFQ versions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/rfq-versions.png){height="" width=""}

The RFQ version is updated when:

* the RFQ is created for the 1st time (for example, the version is DE-21-8-1)
* the RFQ is revised and negotiated by the buyer
* the RFQ is revised by a Sales Representative

### Cart Unblock Functionality (Reset Quote Lock)
Converting the RFQ into a Shopping Cart adds a lock on it. A Sales Representative or a Buyer cannot do any changes or updates to a locked cart. When the cart is locked - the only possible option is to proceed to the checkout.

If your project has only Persistent Cart module, which means that only one Shopping cart can exist in the customer account when the Buyer clicks **Convert to Cart**, the products from the existing cart are replaced with the ones that were in the RFQ.

If your project has Persistent Cart and Multi-cart modules, converting the RFQ into a Shopping Cart creates a new locked shopping cart.

To let users utilize the cart irrespective of the RFQ updates, Cart Unblock functionality has been implemented.
![Unblocking the cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/cart-unblock.png){height="" width=""}

A Buyer can unblock a locked cart, however, the modifications that have been applied during the RFQ workflow will be discarded.

### Interaction of the RFQ with the Approval Process
Mixing several workflows adds complexity to the process and increase of the steps a Buyer should perform to submit the order. This can be true for projects where the [Approval Process](https://documentation.spryker.com/v2/docs/approval-process-201903) and RFQ are integrated. In such a scenario, every RFQ that hits the limit will need to be approved by a manager. Let's check an example:

{% info_block infoBox "Example" %}
Example: In the project, the cart needs approval when the cart total exceeds €1000. A buyer adds the products to cart with the card total of €1500 and converts the shopping cart into the RFQ. The Sales Representative reviews the cart and updates the prices for products so that the cart total makes up €1500 and sends the RFQ back to the buyer. The buyer cannot proceed to Checkout as the cart total still exceeds the limit, so the Buyer has to send the RFQ to their Approver. If the Approver approves the cart, then the Buyer will finally be able to create the order and pay for it.
{% endinfo_block %}

Module relations for the RFQ feature are schematically represented in the schema below:
![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/request-for-quote-module-diagram.png){height="" width=""}

### Current Constraints

* According to the current setup, Shipping cost is not included in the RFQ process and is added afterward, during the Checkout.
* Request for Quote version 2.0.0 - does not support bundles
