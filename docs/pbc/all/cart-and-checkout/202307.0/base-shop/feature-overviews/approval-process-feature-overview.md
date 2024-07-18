---
title: Approval Process feature overview
description: This topic provides a detailed overview of the Approval Process feature.
last_updated: June 26, 2023
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/approval-process-feature-overview
originalArticleId: 6a13ff93-6cd0-4461-afe9-6c6101991d5e
redirect_from:  
  - /docs/scos/user/features/202307.0/approval-process-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/approval-process-feature-overview.html  
  - /docs/pbc/all/cart-and-checkout/202307.0/base-shop/approval-process-feature-overview.html
---

The *Approval Process* feature lets B2B customers have multiple people contributing to the ordering process but requires the manager's approval to proceed with the checkout.

Permissions related to the approval process are configured based on the restrictions applied to a [company role](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html). Generally, the approval process is initiated when the cart total exceeds a certain amount set in the *Buy up to grand total* permissions. For example, an employee in a company may have to send their order to the manager for approval if the total order cost is above a certain amount. Only after the manager has received the request and approved the order, the employee can proceed to the checkout.

{% info_block warningBox "Approvals within a business unit" %}

Approvers can only approve orders of employees *within their own business unit*.

If an employee with a *Buy up to grand total* limit is in a business unit without any approvers, at the checkout, the employee can't see any approvers to send their order to and thus can't proceed with their order. Not even if another business unit of the same company does have an approver. And not even if that other business unit is the direct parent of the employee's business unit.

{% endinfo_block %}

When a company user requests approval for their cart, the cart gets locked, and the users can't edit it.


## Approval Process concept

{% info_block infoBox "Info" %}

Definitions that are used throughout the feature:

| DEFINITION | DESCRIPTION |
| --- | --- |
| Approver | A person or manager who is responsible for approving the purchase order. |
| Buyer | A person who has created and submitted the order. |
| Quote | An entity containing all the content of the Approval Request. |

{% endinfo_block %}

Generally speaking, approval is usually given when someone has a positive opinion about something.

In the B2B industry, approvals are referred to shopping carts and items in the carts that the authorized people have to review and respond to, either approving or declining the order. Approval Process is used to submit a cart for approval after passing the necessary steps of the checkout, allowing the responsible manager to review the order.

For the approval process, you can set specific permissions for the Approver and Buyer roles:

* The *Buy up to grand total* permission that restricts the cart checkout when the cart grand total amount reaches the limit specified in this permission.

{% info_block warningBox "Note" %}

It is mandatory to set this permission for the Buyer role if you want to use the Approval Process feature in your project.

{% endinfo_block %}

To configure this permission, use [this step-by-step instruction](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/approval-process-feature-overview.html#approval-process-on-the-storefront).

* The *Send cart for approval* permission, which lets a buyer send a cart for approval to their manager. Without this permission, a buyer cannot see the *Request for Approval* widget.

* The *Approve up to grand total* permission, which lets an approver approve the carts that do not hit the cart grand total limit specified there. To learn how to set up the permission in the Storefront, see [Configuring the Approve up to grand total permission](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/approval-process-feature-overview.html#approval-process-on-the-storefront).

Every approval request can have three statuses:
* *Waiting*—the approver has been assigned, but the approval hasn't been confirmed.
* *Approved*—the cart has been approved.
* *Declined*—the cart has been rejected.

## Approval Process workflow

Approval Process as such introduces steps that company employees must follow to order, request for approval, and pay for products.

Here’s how approvals fit into the buying process:

### 1. Submitting the request for approval

<br>The Approval Process workflow is flexible and starts when a buyer submits the request for approval through the company user account in the shop application. The approval request can be submitted after any step of the checkout, depending on the project configuration. The buyer requests approval from the appropriate approver through the Approver widget. For details about how to submit a request for approval, see [Approval Process on the Storefront](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/approval-process-feature-overview.html#approval-process-on-the-storefront). After the buyer has requested the approval, the request gets the **Waiting** status and cannot be edited.

{% info_block warningBox "Note" %}

There may be several approvers with different Approve up to grand total permissions created. By default, one Approver role is available after the feature has been [integrated](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-approval-process-feature.html).

{% endinfo_block %}

### 2. Approval or rejection

After the request for approval has been sent, the approver can check it in the Shopping Cart widget:
<!-- [update the image of the waiting approval request]-->
At this point, the approver cannot alter the quote in any way (like editing it, or adding vouchers). Based on the contents of the quote, the approver may reject or approve the buyer's request. If approved, the request is returned to the buyer for further processing, and the Approval Request status changes to **Approved**. A buyer cannot do any updates/changes with the quote after it has been approved. If the approver rejects the cart, the approval workflow is terminated. The quote gets the status **Declined** and quote editing is restored again. The buyer may perform some changes with the quote (remove items, decrease the number of products) and start the approval process again or send the cart to another approver.

Schematically, the Approval Process workflow can be defined in the following way:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Approval+Process/Approval+Process+Feature+Overview/approval-process-workflow.png)

### Approval Process scenarios

Approval process workflow can be most clearly described in several common scenarios:

#### Case 1: Approval Process is optional

Prerequisites:

The company has the following company users:

| PERSON | ROLE | DESCRIPTION |
| --- | --- | --- |
| Company Employee | Buyer | Has the *Buy up to grand total* permission set to €500 and submits quote A with the cart total €400.<br>The *Send cart for approval* permission is enabled. |
| Manager | Approver  | Has the *Approve up to grand total* permission for €600. |
| Head of the department | Approver  | Has the *Approve up to grand total* permission set to €1000. |
| Head of the department | Buyer  | Has the *Buy up to grand total* permission set to €1000.  |

The approval process is optional if the buyer submits a quote with cart total that does not exceed the amount set in the *Buy up to grand total* permission. Thus, the buyer can either finish the checkout or send the request for approval to let the approver know about the upcoming expenses, for example. If the buyer decides to send the approval request, they can't complete the checkout until the request is approved.

#### Case 2: Approval Process is initiated (multiple approvers)

Prerequisites:

The company has the following company users:

| PERSON | ROLE | DESCRIPTION |
| --- | --- | --- |
| Company Employee | Buyer | Has the *Buy up to grand total* permission set to €500 and submits quote B with the cart total €600.<br> The *Send cart for approval* permission is enabled. |
| Manager | Approver  | Has the *Approve up to grand total* permission set to €600. |
| Head of the department | Approver  | Has the *Approve up to grand total* permission set to €1000. |
| Head of the department | Buyer  | Has the *Buy up to grand total* permission set to €1000.  |

Submitting quote B triggers an approval process because the quote total exceeds the amount set in the *Buy up to grand total* permission. To approve that request, an employee asks for approval from either the manager or the head of the department using the Approval widget and waits until the quote gets the Approved status. Once the request is approved, the employee can complete the checkout.

#### Case 3:  Approval Process is initiated (senior approver)

Prerequisites:

The company has the following company users:

| PERSON | ROLE | DESCRIPTION |
| --- | --- | --- |
| Company Employee | Buyer | Has the *Buy up to grand total* €500 permission and submits quote C with the cart total €900.<br>The *Send cart for approval permission* is enabled. |
| Manager | Approver  | Has the *Approve up to grand total* permission set to €600. |
| Head of the department | Approver  | Has the *Approve up to grand total* permission set to €1000. |

Quote C needs approval that has to be provided by the head of the department because the manager's approval limit is lower than the quote grand total. After the request has been approved by the head of the department, the buyer can complete the checkout.

#### Case 4: Approval Process is not initiated

Prerequisites:

The company has the following company users:

| PERSON | ROLE | DESCRIPTION |
| --- | --- | --- |
| Company Employee | Buyer | Has the *Buy up to grand total* €500 permission and submits quote D with the cart total €1200.<br>The *Send cart for approval* permission is enabled. |
| Manager | Approver  | Has the *Approve up to grand total* permission for €600. |
| Head of the department | Approver  | Has the *Approve up to grand total* permission set to €1000. |

Quote D can't be processed because the quote total is higher than any Approver permissions set for that company. In such case, the only workaround is to edit the quote (decrease the quantity of the items or remove some items from the cart), split the cart into several carts, or create a new Approver role with a greater *Approve up to* permission.

### Quote lock functionality

After the quote is submitted for approval, it gets locked for both the buyer and the approver. This functionality prevents any changes to the quote's content while it's in the pending approval state.

Quote lock is fulfilled with the help of the `isLocked` bool parameter that has been added to the Cart module. The `IsLocked` parameter is added to `/Spryker/Zed/Quote/QuoteConfig::getQuoteFieldsAllowedForSaving()`.

When the `isLocked` parameter is set to true, then:
* Items cannot be added or removed from the quote.
* Quote validation is not allowed.
* Currency change is not available.
* Discount change is not available.
* The quote cannot be shared.

## Approval Process on the Storefront
Company users can perform the following actions using the Approval Process feature on the Storefront:

<details>
<summary markdown='span'>Create the Approver role and configure the Approve up to grand total permission</summary>

![create-and-configure-approver-role](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+%26+Process+Management/Approval+Process/Approval+Process+Feature+Overview/create-and-configure-approver-role.gif)

</details>

<details>
<summary markdown='span'>Create the Buyer with Limits role and configure the Buy up to grand total permission</summary>

![create-and-configure-buyer-with-limit-role](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Approval+Process/Approval+Process+Feature+Overview/create-and-configure-buyer-with-limit-role.gif)

</details>

<details>
<summary markdown='span'>Submit a request for approval</summary>

![submit-request-for-approval](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Approval+Process/Approval+Process+Feature+Overview/submit-request-for-approval.gif)

</details>

<details>
<summary markdown='span'>Approve the request for approval</summary>

![review-request-for-approval](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Approval+Process/Approval+Process+Feature+Overview/review-request-for-approval.gif)

</details>


## Related Developer documents

| INSTALLATION GUIDES                                                                                                                                                                                    | TUTORIALS AND HOWTOS |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| [Approval Process feature integration](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-approval-process-feature.html)                      | [HowTo: Implement customer approval process based on a generic state machine](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/tutorials-and-howtos/implement-a-customer-approval-process-based-on-a-generic-state-machine.html)  |
| [Install the Shipment + Approval Process feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-approval-process-feature.html) |   |
