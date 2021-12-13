---
title: Shop Guide - Approval Process
description: Use the procedures to create the approve/buyer with limit roles, set up permissions to the approver and buyer role in the storefront.
last_updated: Nov 22, 2019
template: howto-guide-template
originalLink: https://documentation.spryker.com/v2/docs/approval-process-shop-guide
originalArticleId: 298ce5be-1570-4b5a-8677-e6a914bb8768
redirect_from:
  - /v2/docs/approval-process-shop-guide
  - /v2/docs/en/approval-process-shop-guide
---


On this page you can find the instructions on managing the [Approval Process]/docs/scos/user/features/{{page.version}}/approval-process-feature-overview.html).

## Creating the Approver / Buyer with Limit Roles

To create an Approver / Buyer with Limit roles in the shop application, do the following:

1. Log in to your Company Account and navigate to **Roles** section.
![Roles widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/roles-on-widget.png)

2. Click **+Add new role**.
![Add a new role](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/add-new-role.png)

3. Enter the Role name - Approver or Buyer with Limit.
4. Click **Submit**.

## Configuring Approve up to grand total Permission

*Approve up to grand total* permission should be applied to the Approver role. This permission allows a user to approve or decline a cart with grand total up to the limit specified in this permission. To configure *Approve up to grand total* permission, follow the steps below:

1. In the list of Roles on the *Roles* page, click![Edit icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/edit-icon.png) **Edit** icon beside the **Approver** role in the *Roles* section.
2. In the Permissions list, turn on the toggle beside  *Approve up to grand total*.
![Approve up to grand total](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/approve-up-to-grand-total-permission.png)

3. To set the grand total limit , click![Config icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/config-icon.png). You need to provide the amount (in cents) till which the Approver can review the requests.
![Configure a permission](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/configure-permission.png)

## Configuring Buy up to grand total Permission

*Buy up to grand total*  permission sets a limit for the grand total of the buyer's cart. With this permission a buyer will have a Checkout button until they reach the limit.
To configure *Buy up to grand total*, do the following:

1. In the list of Roles on the *Roles* page, click![Edit icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/edit-icon.png)**Edit** icon beside the **Buyer with the Limit** role in the *Roles* section.
2. In the Permissions list, turn on the toggle beside *Buy up to grand total (Requires "Send cart for approval")
{% info_block warningBox %}
*Send cart for approval (Requires "Buy up to grand total"
{% endinfo_block %}* should also be enabled.)
![Buy up to grand total](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/buy-up-to-grand-total.png)

3. To set the grand total limit , click![Config icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/config-icon.png). You need to provide the amount (in cents) till which the Buyer is able to proceed to Checkout.
![Configure permission buy](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/configure-permission-buy.png)

## Submitting a Request for Approval

A buyer can submit a cart for approval if the both *Buy up to grand total* and *Send cart for approval* permissions are configured.

When the cart grand total exceeds the limit specified in the *Buy up to grand total* permission, the user sees the Approval Widget:

![Approval widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/approval-widget.png)

To submit the approval request, do the following:

1. From the drop-down list in the Approval widget, select the required Approver.
2. Click **Send Request**.

## Reviewing the Request by an Approver

An Approver can check all the requests either on the Shopping Carts page or on the Shopping Cart Widget:

![Approval request cart vs widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/approval-request-cart-vs-widget.png)

To approve or decline a cart, follow the steps below:

1. Click the cart you would like to review.
2. In the Approval Request Widget click **Approve** or **Decline**.

![Approve or decline cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Approval+Process/approve-decline-cart.png)

<!-- Last review date: Apr 02, 2019*-->
