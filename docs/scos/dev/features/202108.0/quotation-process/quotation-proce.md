---
title: Quotation Process feature overview
originalLink: https://documentation.spryker.com/2021080/docs/quotation-process-feature-overview
redirect_from:
  - /2021080/docs/quotation-process-feature-overview
  - /2021080/docs/en/quotation-process-feature-overview
---

| Definition | Description |
| --- | --- |
|Buyer  |A company user who can create a Request for quote (RFQ)  |
|Sales representative (sales rep)  | A person who is eligible for reviewing the submitted RFQs |
|Shipment cost | A price calculated for the shipment services. |
**Request for Quote (RFQ)** is a request that a B2B buyer sends to their suppliers stating that they would like to get a quoted price on particular products with the details about the packaging and volumes they need. 
Within the Spryker Commerce OS, RFQ is represented by the ability of a sales representative to see the list of quotes, check and edit them, thereby change and overwrite the prices for the products, view and edit shipment cost in the RFQ for a certain buyer. In turn, a buyer is able to create an RFQ from a shopping cart, add a note to it and bid for lower prices, as well as define a delivery address and select a shipment method. An RFQ can also specify the timeline for delivery, a date by which the proposal should be submitted, and the history of the negotiations.
One of the RFQ features is a tool for creating special offers for buyers with limited validity. For example, a sales representative can update the prices for products in the RFQ and set the exact time until which this offer is valid, e.g., the 29th of December, 2019, 11:58 PM. If the buyer tries to proceed with this RFQ to checkout on the 29th of December, 2019, at 11:59 PM, then this RFQ will not be available.
![RFQ Validity](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/valid-till.png){height="" width=""}

To view how to create and mange RFQs, see [Quotation process & RFQ on the Storefront](#quotation-process-rfq-on-the-storefront).

## RFQ statuses
The RFQ can have the following statuses:

* _Draft_—the RFQ is successfully created but not sent to a sales representative or customer (see RFQ Workflows to understand the RFQ process).
* _Waiting_—the status appears after the RFQ has been sent to a sales representative. At this moment, the buyer can't edit the RFQ after it has been sent, but they can cancel it.
* _In Progress_—this status appears when the sales representative edits the RFQ.
* _Ready_—a buyer receives the RFQ with this status when the sales representative has finished editing and sent the RFQ back to the buyer.
* _Canceled_—Indicates a canceled RFQ.
* _Closed_—appears when the customer has placed the order from the RFQ.

## RFQ workflows
The process of requesting the quote includes two workflows depending on the role the user has. A workflow is defined as the sequence of steps the user can go through to complete the process successfully. These are:

* [Buyer workflow](https://documentation.spryker.com/docs/quotation-process-rfq-feature-overview-201907#buyer-workflow)
* [Sales representative workflow](https://documentation.spryker.com/docs/quotation-process-rfq-feature-overview-201907#sales-representative-workflow)

### Buyer workflow
A buyer can create a quote request the product prices from a shopping cart.

To view how to create and mange RFQs, see [Quotation process & RFQ on the Storefront](#quotation-process-rfq-on-the-storefront).

After submitting the request, RFQ gets to the status **Draft**. 

For the Draft RFQ, a buyer can:

* Add one or multiple delivery addresses. 
* Select shipment methods to quote request items.
* Check the version information.
* Edit and add/remove products.
* Change product quantity and update meta information.

Once the buyers are done editing the Draft RFQ, they can send it to a sales representative. After that, they wait until the RFQ gets processed by a sales representative. The status of the RFQ changes to **Waiting**. Request for Quote cannot be edited at this point. It is only possible to cancel it.

After the sales representative has processed the request, the buyer gets it back with the status **Ready**. At this point, if buyers are satisfied with such a request, they can convert the RFQ to the cart, and after that, proceed to checkout. When the order is placed, the RFQ receives the **Closed** status.

If they aren't satisfied and would like to negotiate the price further, they can **Revise** the RFQ and move it back to the **Draft** status. The RFQ obtains a new RFQ version. 

Schematically, the workflow is shown below:
![Buyer's Workflow](https://confluence-connect.gliffy.net/embed/image/0dedd086-45ab-494d-a2f8-04c92501a229.png?utm_medium=live&utm_source=custom){height="" width=""}

### Sales representative workflow
A sales representative can create an RFQ using two working procedures:
* Via an [agent](https://documentation.spryker.com/docs/agent-assist) account.
* On behalf of a company user.

#### Via an agent account
Being logged in to an Agent account, a sales representative has access to the list of all the RFQs within the company. The RFQs are sorted by date and are displayed in all the statuses. A sales representative can revise the requests that are in the **Waiting** status. For the revising RFQ, a sales representative can:

* Change the meta-information.
* Add and remove the products.
* Change product default price and quantity.
* Edit shipment details, including a shipment cost.
* Set the lifetime for a particular RFQ.

RFQ Life Time restricts the buyer by date and time until which the RFQ is considered valid. If the buyer hasn't placed the order using the RFQ with Life Time, the RFQ automatically obtains the status **Closed**.

Upon revising the RFQ, a new RFQ version is created. When the sales representative sends the RFQ back to the buyer, the buyer receives the RFQ with the status **Ready**.
{% info_block infoBox "Info" %}

A sales representative can quickly access the RFQs via a Quote Request Widget that displays the latest five requests for quotes that were updated except for those that are in the status Closed. You can configure the statuses for the RFQ you would like to check in the widget on the project level. In the widget, the sales representative can check all the basic information for the RFQs.

{% endinfo_block %}

#### On behalf of a company user
A sales representative can create an RFQ on behalf of any company user, then process it and even complete checkout. This option is especially convenient when, for example, a company user is busy or doesn't have access to an account.

To create an RFQ on behalf of a user, see [Creating an RFQ for a Customer](#quotation-process-rfq-on-the-storefront)

The workflow with statuses for a sales representative is presented in the schema below:
![Sales Rep Workflow](https://confluence-connect.gliffy.net/embed/image/0dedd086-45ab-494d-a2f8-04c92501a229.png?utm_medium=live&utm_source=custom){height="" width=""}

When a sales representative creates an RFQ, it has the **Show the latest version to customer** checkbox empty by default. It means that the buyer cannot see the latest updated version of the RFQ (for example, with the changed prices) until the **Show the latest version to customer** checkbox is selected.  The buyer can see the **In Progress** status for the RFQ.

## RFQ versioning
Versioning implies management of multiple variants of the same RFQ, all of which have same general details but include the customized data (for example, prices for the same products in the different versions of the RFQ can vary). Every RFQ receives specific identifiers, such as DE--1-Y-X, where: 

* DE--1—customer reference
* Y—number of the request of the customer
* X—version of the RFQ
![RFQ versions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/rfq-versions.png){height="" width=""}

The RFQ version is updated when:

* The RFQ is created for the 1st time (for example, the version is DE-21-8-1).
* The RFQ is revised and negotiated by the buyer.
* The RFQ is revised by a sales representative.

## Unblocking cart (resetting quote lock)
Converting the RFQ into a Shopping Cart adds a lock on it. A sales representative or a buyer cannot make any changes or updates to a locked cart. When the cart is locked, the only possible option is to proceed to checkout.

If your project has only the Persistent Cart module, which means that only one Shopping cart can exist in the customer account when the buyer clicks **Convert to Cart**, the products from the existing cart are replaced with the ones that were in the RFQ.

If your project has Persistent Cart and Multi-cart modules, converting the RFQ into a Shopping Cart creates a new locked shopping cart.

The buyers can utilize the blocked cart irrespective of the RFQ updates by unblocking the cart. However, the modifications that have been applied during the RFQ workflow will be discarded.
![Locked cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Quotation+process+and+RFQ/Quotation+Process+&+RFQ+Feature+Overview/locked-cart.png){height="" width=""}

## Interaction of the RFQ with the approval process
Mixing several workflows adds complexity to the process and increases the steps a buyer should perform to submit the order. This can be true for projects where the [Approval Process](https://documentation.spryker.com/docs/en/approval-process-feature-overview-202001) and RFQ are integrated. In such a scenario, every RFQ that hits the limit will need to be approved by a manager. Let's check an example:

{% info_block infoBox "Example" %}
Example: In the project, the cart needs approval when the cart total exceeds €1000. A buyer adds the products to cart with the card total of €1500 and converts the shopping cart into the RFQ. The sales representative reviews the cart and updates the prices for products so that the cart total makes up €1300 and sends the RFQ back to the buyer. The buyer cannot proceed to checkout as the cart total still exceeds the limit, so the buyer has to send the RFQ to their approver. If the approver approves the cart, then the buyer will finally be able to create the order and pay for it.
{% endinfo_block %}

## Quotation Process & RFQ on the Storefront
Company users can perform the following actions using the CommentsQuotation process & RFQ feature on the Storefront:

<details>
<summary>Create an RFQ</summary>

![create-rfq](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Quotation+process+and+RFQ/Quotation+Process+%26+RFQ+Feature+Overview/create-rfq.gif)

</details>

<details>
<summary>Add an address and shipping method to the RFQ</summary>

![add-rfq-address-and-shipping-method](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Quotation+process+and+RFQ/Quotation+Process+%26+RFQ+Feature+Overview/add-rfq-address-and-shipping-method.gif)

</details>

<details>
<summary>Edit RFQ items</summary>

![edit-rfq-items](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Quotation+process+and+RFQ/Quotation+Process+%26+RFQ+Feature+Overview/edit-rfq-items.gif)


</details>
<details><summary>Canel an RFQ or sent ab RFQ to an agent </summary>

![cancel-and-sent-rfq-to-agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Quotation+process+and+RFQ/Quotation+Process+%26+RFQ+Feature+Overview/cancel-and-sent-rfq-to-agent.gif)

</details>

<details>
<summary>Convert an RFQ to cart</summary>

![convert-rfq-to-cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Quotation+process+and+RFQ/Quotation+Process+%26+RFQ+Feature+Overview/convert-rfq-to-cart.gif)

</details>

Agents can perform the same actions (on company users' behalf) as company users. However, besides the actions mentioned above, agents can also do the following:

<details>
<summary>Revise an RFQ and send it back to the buyer</summary>

![revise-rfq-and-send-to-customer](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Quotation+process+and+RFQ/Quotation+Process+%26+RFQ+Feature+Overview/revise-rfq-and-send-to-customer.gif)

</details>

## Current constraints

* According to the current setup, shipping cost is not included in the RFQ process and is added afterward, during checkout.
* Request for Quote does not work with the product bundles. 
