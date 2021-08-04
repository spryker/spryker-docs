---
title: Approval Process Feature Overview
originalLink: https://documentation.spryker.com/v4/docs/approval-process-feature-overview
redirect_from:
  - /v4/docs/approval-process-feature-overview
  - /v4/docs/en/approval-process-feature-overview
---

## Approval Process Concept

{% info_block infoBox "Info" %}

Definitions that are used throughout the feature:

| Definition | Description |
| --- | --- |
| Approver | A person/manager who is responsible for approving the purchase order. |
| Buyer | A person who has created and submitted the order. |
| Quote | An entity containing all the content of the Approval Request. |

{% endinfo_block %}

Generally speaking, approval is usually given when someone has a positive opinion about something.)

In the B2B industry, approvals are referred to shopping carts and items in the carts that the authorized people have to review and respond to, either approving or declining the order. The Approval Process is used to submit a cart for approval after passing the necessary steps of the Checkout, allowing the responsible manager to review the order. 

For the approval process, you can set specific permissions for the Approver and Buyer roles:

* *Buy up to grand total* permission that restricts the cart checkout when the cart grand total amount reaches the limit specified in this permission. It is mandatory if you want to use the Approval Process feature. To configure this permission, use [this step-by-step instruction](https://documentation.spryker.com/v4/docs/approval-process-shop-guide#configuring-buy-up-to-grand-total-permission){target="_blank"}.

* *Send cart for approval* permission that allows a Buyer to send a cart for approval to their manager. Without this permission, the buyer cannot see the Request for Approval widget.

* *Approve up to grand total* permission that allows an Approver to approve the carts that do not hit the cart grand total limit specified there. See [Configuring Approve up to grand total Permission](https://documentation.spryker.com/v4/docs/approval-process-shop-guide#configuring-approve-up-to-grand-total-permission) to learn how to set up the permission in the Storefront.

Every approval request, in turn, can have three statuses:

* **Waiting** - The approver has been assigned, but the approval hasn't been confirmed.
* **Approved** - The cart has been approved.
* **Declined** - The cart has been rejected.

Module relations in the Approval Process feature can be represented in the following schema:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Approval+Process/Approval+Process+Feature+Overview/approval-process-schema.png){height="" width=""}

## Approval Process Workflow
The Approval Process as such introduces steps that company employees should follow to order, request for approval, and pay for products. 

Here’s how approvals fit into the buying process:

**1. Submitting the Request for Approval**
The approval process workflow is flexible and starts when a Buyer submits the request for approval through the company user account in the Shop Application. The approval request can be submitted after any step of the checkout depending on the project configuration. A Buyer requests approval from the appropriate Approver through the Approver Widget. Check Shop Guide - Submit a cart for approval <!-- link--> for details on how to submit a request for approval. After the Buyer has requested the approval, the request gets the **Waiting** status and cannot be edited.

{% info_block warningBox "Note" %}
There may be several Approvers with different Approve up to grand total permissions created. By default, one Approver role is available after the feature has been integrated. <!-- link -->
{% endinfo_block %}

**2. Approval or Rejection**
After the request for approval has been sent, the Approver can check it in their Shopping Cart Widget:
<!-- [update the image of the waiting approval request]-->
At this point, the Approver cannot alter the quote in any way (like editing it, or adding vouchers). Based on the contents of the quote, the Approver may reject or approve the Buyer's request. If approved, the request is returned to the Buyer for further processing. Approval Request status changes to **Approved**. A Buyer cannot do any updates/changes with the quote after it has been approved. If the Approver rejects the cart, the approval workflow is terminated. The quote gets the status **Declined** and quote editing is restored again. The Buyer may perform some changes with the quote (remove items, decrease the number of products) and start the approval process again or send the cart to another Approver.

Schematically, the Approval Process workflow can be defined in the following way:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Approval+Process/Approval+Process+Feature+Overview/approval-process-workflow.png){height="" width=""}

### Approval Process Scenarios
Approval process workflow can be most clearly described in several common scenarios:

**Case 1. Approval Process is optional**

Prerequisites:

The company has the following company users:

| Person | Role | Description |
| --- | --- | --- |
| Company Employee | Buyer | Has *Buy up to grand total* €500 permission and submits a quote A with the cart total €400.</br>*Send cart for approval* permission is enabled. |
| Manager | Approver  | Has *Approve up to grand total* permission for €600. |
| Head of the department | Approver  | Has *Approve up to grand total* permission for €1000. |
| Head of the department | Buyer  | Has *Buy up to grand total* €1000 permission.  |

The approval process is optional if the buyer submits a quote with cart total that does not exceed the amount set in Buy up to grand total permission. Thus, the buyer can either finish the checkout or send the request for Approval to let the Approver know about the upcoming expenses, for example. In case, the Buyer decides to send the approval request, they will not be able to complete the checkout until the request is approved.

**Case 2. Approval Process is initiated (multiple approvers)**

Prerequisites:

The company has the following company users:

| Person | Role | Description |
| --- | --- | --- |
| Company Employee | Buyer | Has *Buy up to grand total* €500 permission and submits a quote B with the cart total €600.</br>*Send cart for approval* permission is enabled. |
| Manager | Approver  | Has *Approve up to grand total* permission for €600. |
| Head of the department | Approver  | Has *Approve up to grand total* permission for €1000. |
| Head of the department | Buyer  | Has *Buy up to grand total* €1000 permission.  |

Submitting the quote B triggers an approval process as the quote total exceeds the amount set in Buy up to grand total permission. To approve that request, an employee asks approval from either the Manager or the Head of the department using the Approval Widget and waits until the quote gets the "Approved" status. Once the request is Approved, the employee can complete the Checkout. 

**Case 3.  Approval Process is initiated (senior approver)**

Prerequisites:

The company has the following company users:

| Person | Role | Description |
| --- | --- | --- |
| Company Employee | Buyer | Has *Buy up to grand total* €500 permission and submits a quote C with the cart total €900.</br>*Send cart for approval permission* is enabled. |
| Manager | Approver  | Has *Approve up to grand total* permission for €600. |
| Head of the department | Approver  | Has *Approve up to grand total* permission for €1000. |

The quote C needs approval that has to be provided by the Head of the department as the Manager's Approval limit is lower than the quote grand total. After the request has been approved by the head of the department, a Buyer can complete the checkout.

**Case 4. Case 2. Approval Process is not initiated**

 Prerequisites:

The company has the following company users:

| Person | Role | Description |
| --- | --- | --- |
| Company Employee | Buyer | Has *Buy up to grand total* €500 permission and submits a quote D with the cart total €1200.</br>*Send cart for approval permission* is enabled. |
| Manager | Approver  | Has *Approve up to grand total* permission for €600. |
| Head of the department | Approver  | Has *Approve up to grand total* permission for €1000. |

The quote D can't be processed as the quote total is higher than any Approver permissions set for that company. In such a case the only workaround is to edit the quote (decrease the quantity of the items or remove some items from the cart), split the cart into several carts or create a new Approver role with a bigger Approve up to permission.

### Quote Lock Functionality
After the quote is submitted for approval, it gets locked for both the Buyer and the Approver. This functionality prevents any changes to quote's content while it's in pending approval state.

Quote lock is fulfilled with the help of `isLocked` bool parameter that has been added to the Cart module. `IsLocked` parameter is added to `\Spryker\Zed\Quote\QuoteConfig::getQuoteFieldsAllowedForSaving()`.

When the isLocked parameter is set to true, then:

* items cannot be added or removed from quote;
* quote validation is not allowed;
* currency change is not available;
* discount change is not available;
* the quote cannot be shared.
