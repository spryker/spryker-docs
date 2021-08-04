---
title: Approval Process Feature Overview
originalLink: https://documentation.spryker.com/v3/docs/approval-process-feature-overview
redirect_from:
  - /v3/docs/approval-process-feature-overview
  - /v3/docs/en/approval-process-feature-overview
---

## Approval Process Concept

Definitions that are used throughout the feature:

| Definition | Description |
| --- | --- |
| Approver | A person/manager who is responsible for approving the purchase order. |
| Buyer | A person who has created and submitted the order. |

Generally speaking, *approval* is usually given when someone has a positive opinion about something.

In the B2B industry, approvals are referred to carts and items in the carts that the authorized people have to review and respond to, either approving or declining the order. The Approval Process is used to submit a cart for approval prior to order payment, allowing the responsible manager to review the order.

In the approval process you specify:

* *Buy up to grand total* permission that restricts the cart checkout when the cart grand total amount reaches the limit specified in this permission.
![Buy up to grand total permission](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Approval+Process/Approval+Process+Feature+Overview/buy-up-to-grand-total-permission.png){height="" width=""}

* *Send cart for approval* permission that allows a Buyer to send a cart for approval to their manager. Without this permission, the buyer cannot see the Request for Approval widget.
* *Approve up to grand total* permission that allows an Approver to approve the carts that do not hit the cart grand total limit specified there.
![Approve up to grand total permission](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Approval+Process/Approval+Process+Feature+Overview/approve-up-to-grand-total.png){height="" width=""}

Every approval request, in turn, can have three statuses:

* **Waiting** - The approver has been assigned, but the approval hasn't been confirmed.
* **Approved** - The cart has been approved.
* **Declined** - The cart has been rejected.

Module relations in the Approval Process feature can be represented in the following schema:
![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Approval+Process/Approval+Process+Feature+Overview/approval-process-module-relations.png){height="" width=""}

## Approval Process Workflow
The Approval Process as such introduces steps that company employees should follow to order, request for approval, and pay for products.

Here’s how approvals fit into the buying process:

1. **Submitting the Cart for Approval**

   The approval process workflow is initiated when a Buyer places an order through the company user account in the Shop Application. Instead of proceeding to the checkout, a Buyer should request approval from the appropriate Approver through the Approver Widget. Check [Shop Guide - Approval Process](https://documentation.spryker.com/v3/docs/approval-process-shop-guide#submitting-a-request-for-approval) for details on how to submit a cart for approval. After the Buyer has requested the approval, the cart gets **Waiting** status and cannot be edited.

{% info_block warningBox %}
There may be several Approvers with different Approver limit permissions created. By default, one Approver role is available after the feature has been integrated.
{% endinfo_block %}

2. **Approval or Rejection**

   After the request for approval has been sent, the Approver can check it in their Shopping Cart Widget:
![Approval request](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Approval+Process/Approval+Process+Feature+Overview/approval-request.png){height="" width=""}

   At this point, the Approver cannot alter the cart in any way (like editing it, or adding vouchers). Based on the contents of the cart, the Approver may reject or approve the Buyer's cart. If approved, the cart is submitted back to the Buyer for processing and checkout. Cart status changes to **Approved**. A Buyer cannot do any updates/changes with the cart after it has been approved, except for Checkout. If the Approver rejects the cart, the approval workflow is terminated. The cart gets the status **Declined** and cart editing is restored again. The Buyer may perform some changes with the cart (remove items, decrease the number of products) and start the approval process again or send the cart to another Approver.
   
 ## Approval Process Scenarios
Approval process workflow can be most clearly described in several common scenarios:

### Case 1. Approval Process is optional
Prerequisites:

The company has the following company users:

| Person                 | Role     | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| Company Employee       | Buyer    | Has *Buy up to grand total €500* permission and submits a Shopping Cart A with the cart total €400.*Send cart for approval* permission is enabled. |
| Manager                | Approver | Has *Approve up to grand total €600* permission.             |
| Head of the department | Approver | Has *Approve up to grand total €1000* permission.            |

The approval process is optional if the buyer submits a cart with cart total that does not exceed the amount set in Buy up to grand total permission. Thus, the buyer can either proceed directly to the checkout or send the cart for Approval to let the Approver know about the upcoming expenses, for example. In case, the Buyer decides to send the approval request, they will not be able to proceed to checkout until the request is approved.

### Case 2. Approval Process is initiated (multiple approvers)
Prerequisites:

The company has the following company users:

| Person                 | Role     | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| Company Employee       | Buyer    | Has *Buy up to grand total €500* permission and submits a Shopping Cart B with the cart total €600.*Send cart for approval* permission is enabled. |
| Manager                | Approver | Has *Approve up to grand total €600* permission.             |
| Head of the department | Approver | Has *Approve up to grand total €1000* permission.            |

Submitting the cart B triggers an approval process as the cart total exceeds the amount set in *Buy up to grand total* permission. To approve that cart, an employee requests approval from either the Manager or the Head of the department using the Approval Widget and waits until the cart gets the *Approved* status. Once the shopping cart is Approved, the employee can proceed to Checkout.

### Case 3. Approval Process is initiated (senior approver)
Prerequisites:

The company has the following company users: 

| Person                 | Role     | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| Company Employee       | Buyer    | Has *Buy up to grand total €500* permission and submits a Shopping Cart C with the cart total €900.*Send cart for approval* permission is enabled. |
| Manager                | Approver | Has *Approve up to grand total €600* permission.             |
| Head of the department | Approver | Has *Approve up to grand total €1000* permission.            |

The cart C needs approval that has to be provided by the Head of the department as the Manager's Approval limit is lower than the cart grand total. After the cart has been approved by the head of the department, a Buyer can proceed to checkout.

### Case 4. Case 2. Approval Process is not initiated
Prerequisites:

The company has the following company users:

| Person                 | Role     | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| Company Employee       | Buyer    | Has *Buy up to grand total €500* permission and submits a Shopping Cart D with the cart total €1200. Send cart for approval permission is enabled. |
| Manager                | Approver | Has *Approve up to grand total €600* permission.             |
| Head of the department | Approver | Has *Approve up to grand total €1000* permission.            |

The cart D can't be processed as the cart total is higher than any Approver permissions set for that company. In such a case the only workaround is to edit the cart (decrease the quantity of the items or remove some items from the cart), split the cart into several carts or create a new Approver role with a bigger Approve up to permission.

You can also check the lifecycle of the above four scenarios in the following schema:
![Approval process workflow schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Approval+Process/Approval+Process+Feature+Overview/approval-process-workflow-schema.png){height="" width=""}

## Cart Lock Functionality
After the cart is submitted for approval, it gets locked for both the Buyer and the Approver. This functionality prevents any changes to cart's content while it's in pending approval state.

Cart lock is fulfilled with the help of `isLocked` bool parameter that has been added to the Cart module. `IsLocked` parameter is added to `\Spryker\Zed\Quote\QuoteConfig::getQuoteFieldsAllowedForSaving()`.

When the `isLocked` parameter is set to true, then:

* items cannot be added or removed from quote;
* quote validation is not allowed;
* currency change is not available;
* discount change is not available;
* the cart cannot be shared.

{% info_block warningBox %}
The shop users are still able to add notes to cart and items in the cart.
{% endinfo_block %}

## Current Constraints
According to the current setup, Shipping cost is not included in the Approval process and is added afterward, during the Checkout.
