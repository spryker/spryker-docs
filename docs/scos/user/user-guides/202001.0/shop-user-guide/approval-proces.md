---
title: Shop Guide - Approval Process
originalLink: https://documentation.spryker.com/v4/docs/approval-process-shop-guide
redirect_from:
  - /v4/docs/approval-process-shop-guide
  - /v4/docs/en/approval-process-shop-guide
---


On this page you can find the instructions on managing the [Approval Process](https://documentation.spryker.com/v4/docs/approval-process-feature-overview-202001).
{% info_block infoBox "Note" %}

To configure the permissions, you should have admin access to the company account.

{% endinfo_block %}

## Creating the Approver / Buyer with Limit Roles
Company Administrator can create an *Approver* role for the manager who is responsible for approving the purchase order.

*Buyer with limit* role can be used for a company user who creates and submits the request for approval.

To create an Approver / Buyer with Limit roles in the shop application, do the following:

1. Log in to your Company Account and navigate to **Roles** section.
![Roles widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/roles-on-widget.png){height="" width=""}

2. Click **+Add new role**.
![Add a new role](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/add-new-role.png){height="" width=""}

3. Enter the Role name - Approver or Buyer with Limit.
4. Click **Submit**.

## Configuring `Approve up to grand total` Permission

*Approve up to grand total* permission should be applied to the Approver role. This permission allows a user to approve or decline a cart with grand total up to the limit specified in this permission. To configure *Approve up to grand total* permission, follow the steps below:

1. In the list of Roles on the *Roles* page, click<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/edit-icon.png" class="js-content-icon">**Edit** icon beside the **Approver** role in the *Roles* section.
2. In the Permissions list, turn on the toggle beside  *Approve up to grand total*.
![Approve up to grand total](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/approve-up-to-grand-total-permission.png){height="" width=""}

3. To set the grand total limit , click<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/config-icon.png" class="js-content-icon" alt="Config icon">. Provide the amount (in cents) till which the Approver can review the requests.
![Configure a permission](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/configure-permission.png){height="" width=""}

## Configuring `Buy up to grand total` Permission

*Buy up to grand total*  permission sets a limit for the grand total of the buyer's cart. With this permission a buyer will have a Checkout button until they reach the limit. 
To configure *Buy up to grand total*, do the following:

1. In the list of Roles on the *Roles* page, click<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/edit-icon.png" class="js-content-icon" alt="Edit icon">**Edit** icon beside the **Buyer with the Limit** role in the *Roles* section.
2. In the Permissions list, turn on the toggle beside **Buy up to grand total (Requires "Send cart for approval")**
{% info_block warningBox %}
*Send cart for approval (Requires "Buy up to grand total"
{% endinfo_block %}* should also be enabled.)
![Buy up to grand total](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/buy-up-to-grand-total.png){height="" width=""}

3. To set the grand total limit , click<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/config-icon.png" alt="Config icon" class="js-content-icon">. Provide the amount (in cents) till which the Buyer is able to proceed to Checkout.
![Configure permission buy](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/configure-permission-buy.png){height="" width=""}

## Submitting a Request for Approval

A buyer can submit a quote for approval if both *Buy up to grand total* and *Send cart for approval* permissions are configured.

After completing all the steps of the Checkout, if the quote grand total exceeds the limit specified in the *Buy up to grand total* permission, the user sees the Approval Widget on the Checkout Summary page:

![Approval widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/approval-widget-2.png){height="" width=""}

To submit the approval request, do the following:

1. From the drop-down list in the Approval widget, select the required Approver.
2. Click **Send Request**.

## Reviewing the Request by an Approver

An Approver can check all the Approval requests either on the **Shopping Carts** page or on the **Shopping Cart Widget**:

![Approval request cart vs widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/approval-request-cart-vs-widget.png){height="" width=""}

To approve or decline a cart, follow the steps below:

1. Click the cart you would like to review to open the [Shopping Cart page](https://documentation.spryker.com/v4/docs/shop-guide-shopping-carts-reference-information#shopping-cart).
2. Click **Checkout** to proceed to the Checkout Summary page where the widget is located.
3. In the **Approval Request Widget** click **Approve** or **Decline**.
![Approve / Deny Widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/approve-deny-widget.png){height="" width=""}
