---
title: Quotation Process & RFQ Feature Overview
originalLink: https://documentation.spryker.com/v5/docs/quotation-process-rfq-feature-overview
redirect_from:
  - /v5/docs/quotation-process-rfq-feature-overview
  - /v5/docs/en/quotation-process-rfq-feature-overview
---

| Definition | Description |
| --- | --- |
|Buyer  |A company user who can create a Request for quote (RFQ)  |
|Sales Representative (Sales Rep)  | A person who is eligible for reviewing the submitted RFQs |
|Shipment cost | A price calculated for the shipment services. |


**Request for Quote (RFQ)** is a request that a B2B buyer sends to their suppliers stating that they would like to get a quoted price on particular products with the details about the packaging and volumes they need. 
![Request quote](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/request-quote.png){height="" width=""}

Within the Spryker Commerce OS, RFQ is represented by the ability of a Sales Representative to see the list of quotes, check and edit them, thereby change and overwrite the prices for the products, view and edit shipment cost in the RFQ for a certain buyer. In turn, a buyer is able to create an RFQ from a shopping cart, add a note to it and bid for cheaper prices, as well as define a delivery address and select a shipment method. An RFQ can also specify the timeline for delivery, a date by which the proposal should be submitted, and the history of the negotiations.
![Sales Representative and RFQ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/sales-rep-rfq.png){height="" width=""}

One of the RFQ features is a tool for creating special offers for buyers with limited validity. For example, a Sales Representative can update the prices for products in the RFQ and set the exact time until which this offer is valid, e.g, 29th of December, 2019, 11:58 PM. If the Buyer tries to proceed with this RFQ to Checkout on 29th of December, 2019 at 11:59 PM, then this RFQ will not be available.
![RFQ Validity](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/valid-till.png){height="" width=""}

## RFQ Statuses
The RFQ can have the following statuses:

* _Draft_ - the RFQ is successfully created but not sent to a Sales Representative or Customer (see RFQ Workflows to understand the RFQ process)
* _Waiting_ - the status appears after the RFQ has been sent to a Sales Representative. At this moment, the buyer can't edit the RFQ after it has been sent, but they can cancel it 
* _In Progress_ - this status appears when the Sales Representative edits the RFQ
* _Ready_ - the Buyer receives the RFQ with this status when the Sales Representative has finished editing and sent the RFQ back to a Buyer
* _Canceled_ - indicates a canceled RFQ
* _Closed_ - appears when the customer has placed the order from the RFQ

## RFQ Workflows
The process of requesting the quote includes two workflows depending on the role the user has. A workflow is defined as the sequence of steps the user can go through to complete the process successfully. These are:

* [buyer workflow](https://documentation.spryker.com/docs/en/quotation-process-rfq-feature-overview-201907#buyer-workflow)
* [sales representative workflow](https://documentation.spryker.com/docs/en/quotation-process-rfq-feature-overview-201907#sales-representative-workflow)

### Buyer Workflow
A Buyer can create a Quote Request the product prices from a Shopping Cart:
![Buyer workflow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/buyer-rfq-button.png){height="" width=""}

After submitting the request, RFQ gets to the status **Draft**. 

For the Draft RFQ, a Buyer can:

* add one or multiple delivery addresses 
* select shipment methods to quote request items
* check the version information
* edit and add/remove products
* change product quantity and update meta information

Once the Buyers are done editing the Draft RFQ, they can send it to a Sales Representative. After that, the Buyer waits until the RFQ gets processed by a Sales Representative. The status of the RFQ changes to **Waiting**. Request for Quote cannot be edited at this point. It is only possible to cancel it.

After the Sales Representative has processed the request, the Buyer gets it back with the status **Ready**. At this point, if a Buyer is satisfied with such a request, they can convert the RFQ to Cart, and after that proceed to the Checkout. When the order is placed, the RFQ receives **Closed** status.

If the buyer isn't satisfied and would like to negotiate the price further, they can **Revise** the RFQ and move it back to the **Draft** status. The RFQ obtains a new RFQ version. Schematically, the workflow is shown below:
![Buyer's Workflow](https://confluence-connect.gliffy.net/embed/image/0dedd086-45ab-494d-a2f8-04c92501a229.png?utm_medium=live&utm_source=custom){height="" width=""}

### Sales Representative Workflow
A Sales Representative can create an RFQ using two working procedures:
* via an [Agent](https://documentation.spryker.com/docs/en/agent-assist) Account
* on behalf of a company user

#### Via an Agent Account
Being logged in to an Agent account, a Sales Representative has access to the list of all the RFQs within the company. The RFQs are sorted by date and are displayed in all the statuses. A Sales Representative can revise the requests that are in the **Waiting** status. For the revising RFQ, a Sales Representative can:

* change the meta information
* add and remove the products
* change product default price and quantity
* edit shipment details including a shipment cost
* set the lifetime for a particular RFQ

RFQ Life Time restricts the buyer by date and time until which the RFQ is considered valid. If the Buyer hasn't placed the order using the RFQ with Life Time, the RFQ automatically obtains the status **Closed**.

Upon revising the RFQ, a new RFQ version is created. When the Sales Representative sends the RFQ back to the Buyer, the Buyer receives the RFQ with the status **Ready**.
{% info_block infoBox "Info" %}

A Sales Representative can quickly access the RFQs via a Quote Request Widget that displays the latest five requests for quotes that were updated except for those that are in the status Closed. You can configure the statuses for the RFQ you would like to check in the widget on the project level. In the widget, the Sales Representative can check all the basic information for the RFQs.

{% endinfo_block %}

#### On Behalf of a Company User
A Sales Representative can create an RFQ on behalf of any company user, then process it and even complete the checkout. This option is especially convenient when, for example, a company user is busy or doesn't have access to an account.

To create an RFQ on behalf of a user, see [Creating an RFQ for a Customer](https://documentation.spryker.com/docs/en/managing-rfqs-sales-rep-shop-guide#creating-an-rfq-for-a-customer)

The workflow with statuses for a Sales representative is presented in the schema below:
![Sales Rep Workflow](https://confluence-connect.gliffy.net/embed/image/0dedd086-45ab-494d-a2f8-04c92501a229.png?utm_medium=live&utm_source=custom){height="" width=""}

When a Sales Representative creates an RFQ, it has **Show the latest version to customer** checkbox empty by default. This means that the buyer cannot see the latest updated version of the RFQ (for example, with the changed prices) until the **Show the latest version to customer** checkbox is selected.  The Buyer can see the **In Progress** status for the RFQ.

## RFQ Versioning
Versioning implies management of multiple variants of the same RFQ, all of which have same general details but include the customized data (for example, prices for the same products in the different versions of the RFQ can vary). Every RFQ receives specific identifiers, such as DE--1-Y-X, where: 

* DE--1 - customer reference
* Y - number of the request of the customer
* X - version of the RFQ
![RFQ versions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/rfq-versions.png){height="" width=""}

The RFQ version is updated when:

* the RFQ is created for the 1st time (for example, the version is DE-21-8-1)
* the RFQ is revised and negotiated by the buyer
* the RFQ is revised by a Sales Representative

## Unblocking Cart (Resetting Quote Lock)
Converting the RFQ into a Shopping Cart adds a lock on it. A Sales Representative or a Buyer cannot do any changes or updates to a locked cart. When the cart is locked - the only possible option is to proceed to the checkout.

If your project has only Persistent Cart module, which means that only one Shopping cart can exist in the customer account when the Buyer clicks **Convert to Cart**, the products from the existing cart are replaced with the ones that were in the RFQ.

If your project has Persistent Cart and Multi-cart modules, converting the RFQ into a Shopping Cart creates a new locked shopping cart.

The Buyers can utilize the blocked cart irrespective of the RFQ updates by unblocking the cart. However, the modifications that have been applied during the RFQ workflow will be discarded.
![Unblocking the cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/cart-unblock.png){height="" width=""}

## Interaction of the RFQ with the Approval Process
Mixing several workflows adds complexity to the process and increase of the steps a Buyer should perform to submit the order. This can be true for projects where the [Approval Process](https://documentation.spryker.com/docs/en/approval-process-201903) and RFQ are integrated. In such a scenario, every RFQ that hits the limit will need to be approved by a manager. Let's check an example:

{% info_block infoBox "Example" %}
Example: In the project, the cart needs approval when the cart total exceeds €1000. A buyer adds the products to cart with the card total of €1500 and converts the shopping cart into the RFQ. The Sales Representative reviews the cart and updates the prices for products so that the cart total makes up €1300 and sends the RFQ back to the buyer. The buyer cannot proceed to Checkout as the cart total still exceeds the limit, so the Buyer has to send the RFQ to their Approver. If the Approver approves the cart, then the Buyer will finally be able to create the order and pay for it.
{% endinfo_block %}

## Current Constraints

* According to the current setup, Shipping cost is not included in the RFQ process and is added afterward, during the Checkout.
* Request for Quote does not work with the product bundles. 
