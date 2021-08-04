---
title: Reference information- Company roles
originalLink: https://documentation.spryker.com/2021080/docs/company-roles-reference-information
redirect_from:
  - /2021080/docs/company-roles-reference-information
  - /2021080/docs/en/company-roles-reference-information
---

## Company Roles Page
**Company Roles** page allows your shop owner to manage the roles for your company.

To open the **Company Roles** page, go to the header of the shop application > Name of your company > Roles.

![Roles header](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Company+Roles/roles-header.png){height="" width=""}

On the **Company Roles** page you see the following:

| Attribute | Description |
|---|---|
|  Company Account menu | Use this menu to manage your Company: Overview, Users, Business Units, Roles. |
|  Name | Name of the role. |
|  Is Default | Check mark that specifies whether the role is set the default for the newly created users. |
|  Actions | Click a respective button to either **Edit** or **Delete** a company role. |
|  + Add New Role | This button creates a new company role. See Creating a New Role for more details. |
***

## Edit Company Role Page
This page opens when you try to edit the existing company role.
![Edit a role](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Company+Roles/edit-role.png){height="" width=""}

The following table describes the permissions you can assign to a role.

| Permission | Description |
| --- | --- |
| Add company users | Allows adding company users. With this permission enabled, a user will have **Create User** button on the **Company Users** page. |
| Invite users | Allows inviting company users. With this permission enabled, a user will have **Invite Users** button on the **Company Users** page. |
| Enable / Disable company users |  Allows enabling and disabling company users. With this permission enabled, a user will be able to switch a toggle in the **Enable** column on the **Company Users** page. |
| See Company Menu | Allows access to the company menu. With this permission enabled, a user will be able to navigate to a company menu from the header of the shop interface. |
| Add item to cart | Allows adding products to cart. Without this permission, the user will get *This action is forbidden* error when trying to add the product in the cart. |
| Change item in cart | Allows changing products in the cart (changing the quantity, adding notes etc). |
| Remove item from cart | Allows deleting products from the cart. |
| Place Order |  allows placing the order. With this permission enabled, a user will have  an error when trying to submit the order. |
| Alter Cart Up to Amount | Allows changing the content of the cart (adding new products, changing the quantity of the existing products etc.) until it hits the limit specified in this permission. When the limit is reached, the buyer will not be able to change the contents of the cart and will get *This action is forbidden* error. |
|Buy up to grand total (Requires "Send cart for approval")|Sets a limit for the grand total of the cart. If the amount in the cart is bigger than the limit set in this permission, the user will not be able to proceed to checkout. Works with **Send cart for approval** permission. This permission is available after enabling the [Approval Process](https://documentation.spryker.com/docs/en/approval-process) feature. When the feature is [integrated](https://documentation.spryker.com/docs/en/approval-process-feature-integration), without this permission the company user will not be able to complete the checkout. |
|Approve up to grand total|With this permission enabled, a user can approve the the cart. See [Approval Process Feature Overview](https://documentation.spryker.com/docs/en/approval-process-feature-overview-202001) for more details.|
|Send cart for approval (Requires "Buy up to grand total")|Allows a user to send the cart for approval. Works together with Buy up to grand total permission. See [Approval Process Feature Overview](https://documentation.spryker.com/docs/en/approval-process-feature-overview-202001) for more details.|
|View Business Unit Orders|Allows searching across the orders of a business unit to which you belong.|
|View Company Orders| Allows searching across the orders of the whole company (all business units) or exact business unit belonging to that company. This permission provides extended permissions in comparison to  **View Business Unit Orders**.|


