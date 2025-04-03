---
title: Company user roles and permissions overview
description: Usually employees within a company have different roles (purchasing, administration, supervision). These roles are referred to as Company Roles.
last_updated: Jul 19, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/company-user-roles-and-permissions-overview
originalArticleId: 444e741d-bc54-4eb6-9483-16c4a94b765d
redirect_from:
  - /docs/scos/user/features/202108.0/company-account-feature-overview/company-user-roles-and-permissions-overview.html
  - /docs/scos/user/features/202200.0/company-account-feature-overview/company-user-roles-and-permissions-overview.html
  - /docs/scos/user/features/202311.0/company-account-feature-overview/company-user-roles-and-permissions-overview.html
  - /docs/scos/user/features/202204.0/company-account-feature-overview/company-user-roles-and-permissions-overview.html
---

Usually, employees within a company have different roles (for example, purchasing, administration, supervision). These roles are related to company users and are referred to as **Company Roles**. A role can be default (the **is_default** option), which means that it's used for all new users automatically.

Upon initial creation of the first company user, the default role is Admin. After the Admin user has been created, they create the structure of the company and can define the default role to be used further on.

![roles.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/roles.png)

## Permissions
Each Company role contains a set of permissions in the form of **Permission** keys attributed to them.

The Permission keys define what the users are allowed to do.

{% info_block infoBox %}

For example, a user can be allowed to add products to the cart.

{% endinfo_block %}

Permissions that can be used are not limited in any way—you can create and integrate any permissions. Each of the permissions is represented as a plugin in the code.

Here is another example of the connection between company roles and permissions:

* When a user registers a company in the system, they actually create a request for a company account registration.
* After the company account has been approved, this first company user becomes the company administrator.
* Therefore, one of the roles within the company is an administrator who has all the permissions with regard to the company profile creation and management, user accounts, and user rights.

One and the same user can have several Company Roles assigned to them. It means that the same user can be a junior sales manager and team leader, which in its turn implies that this user has permissions assigned to both roles: junior sales manager and team leader.

{% info_block infoBox %}

The permissions, entitling the user with more rights, win. For example, suppose junior sales managers are allowed to place an order for up to 1000 Euro, whereas team leaders can place orders for up to 2000 Euro. If a user has both roles assigned to him, they can place orders for up to 2000 Euro, and not 1000 Euro.

Or, for example, if junior sales managers can't view specific products, but team leaders can, the users having both a junior sales manager and team leader roles can view those products.

{% endinfo_block %}

![roles-permissions.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/roles-permissions.png)

Company roles and permissions and their relation to the organizational structure can be schematically represented as follows:

![roles_structure.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/roles_structure.png)

## Permission types
Permissions can be simple and complex.
<table>
	<tr>
        <th>Permission Type</th>
        <th>Description</th>
        <th>Example</th>
	</tr>
	<tr>
        <td><b>Simple</b></td>
		<td>	Simple permissions are those that do not have any logic behind them and answer the question "Does a customer have a permission?". Simple permissions implement only `PermissionPluginInterface` (Shared).</td>
		<td>
            <p>A company user is allowed (or not allowed) to access product details page.</p>
            <img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/simple_permissions.png" alt="">
        </td>
	</tr>
	<tr>
        <td><b>Complex</b></td>
		<td>Complex permissions have some logic behind them and answer the question "Does the customer have a permission with some parameters and business logic?". Complex permissions implement ExecutablePermissionPluginInterface (Shared).</td>
		<td>
           <p> A company user is allowed (or not allowed) to place an order with grand total over 1000 Euro.</p>
            <img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/complex_permissions.png" alt="">
        </td>
	</tr>
    <tr>
        <td><b>Infrastructural</b></td>
		<td>Some permissions can't be managed in the UI, but programmatically. Infrastructural permissions implement `InfrastructuralPermissionPluginInterface` (Shared).</td>
		<td>
           <p> Read shared cart, which is managed by the Shared Carts feature.</p>
       </td>
	</tr>
</table>

{% info_block infoBox %}

Some permissions can be configured for specific roles—for example, for a junior support engineer, *allow adding no more than X items to cart*.

>Or for example, some specific products are not allowed to be viewed by anyone but Admin and top managers.

These values are referred to as *Company Role Permissions*.

{% endinfo_block %}

Permission can also be *Yves-side* and *Zed-side*.

* Yves permissions do not need to get any data from the database. They refer to key-value storage or search to check the right for actions.

{% info_block infoBox %}

For example, the permission to view a product, page, or permission to place an order, permission to place an order with grand total less than X would be Yves-side permissions.

{% endinfo_block %}

* Permissions that require some data from the database or additional business logic on top to check the rights for actions are referred to as Zed permissions.

{% info_block infoBox %}

For example, the permission to add to cart up to X [order value] is a Zed-side permission. In this case, the process of permissions check is as follows:
1. After the user clicks **Add to cart**, the request comes to Zed, and the prechecks are made following the "add to cart" request.
2. Then, the calculations are run. The calculations apply discounts per items, and then per cart (total). The logic behind this is simple: a user might have a discount for a specific item and a discount for an order starting from a specific order value. The order value is calculated taking the discount per items into account, and therefore the discount per cart is applied after all discounts per items have been calculated.
3. After the calculations have been made, the cart is saved.

{% endinfo_block %}

The permissions can't be checked at the step when the user just clicks **Add to cart** because the actual order value has not been calculated yet (prechecks have not been made yet, discounts have not been calculated). Also, the permissions check request can't be started after the cart has been updated—that would be too late, as, the cart has already been persisted. The request for the rights check is made somewhere in between—specifically, right after the discounts have been calculated. That is why the so-called "termination hooks" have been implemented deep in logic, where the permissions checks are made.

The termination hooks (plugin stack) do not allow the permissions to sneak into the business logic foundation so it remains clean from the permissions and not overwhelmed with "can" "if not; then…".

![termination_hooks.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/termination_hooks.png)

The termination hooks are performed one by one, and process termination can happen for any reason, and one of them would be the permissions.

## Company permissions on the Storefront
Every company role includes a set of permissions that can be enabled/disabled according to your needs by switching the toggle in **Enable** column:

 - **Add company users**—allows adding company users. With this permission enabled, a user has the **Create User** button on the **Company Users** page.
  - **Invite users**—allows inviting company users. With this permission enabled, a user has the **Invite Users** button on the **Company Users** page.
  - **Enable / Disable company users**—allows enabling and disabling company users. With this permission enabled, a user can switch a toggle in the **Enable** column on the **Company Users** page.
  - **See Company Menu**—allows access to the company menu. With this permission enabled, a user can navigate to a company menu from the header of the shop interface.
  - **Add item to cart**—allows adding products to the cart. Without this permission, the user gets the "This action is forbidden" error when trying to add the product to the cart.
  - **Change item in cart**—allows changing products in the cart (changing the quantity or adding notes).
  - **Remove item from cart**—allows deleting the products from the cart.
  - **Place Order**—allows placing the order. Without this permission enabled, a user gets an error when trying to submit the order. If the [Approval Process](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/approval-process-feature-overview.html) feature is integrated into your project, then **Buy up to grand total** permission is also required to place an order.
  - **Buy up to grand total (Requires "Send cart for approval")**—sets a limit for the grand total of the cart. If the amount in the cart is larger than the limit set in this permission, the user can't proceed to checkout. Works with **Send cart for approval** permission. This permission is available after enabling the [Approval Process](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/approval-process-feature-overview.html) feature.
  - **Approve up to grand total**—with this permission enabled, a user can approve the cart. For more details, see [Approval Feature Overview](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/approval-process-feature-overview.html).
  - **View Business Unit orders**—with this permission enabled, a user can see not only their own orders but also the orders of their business unit.
  - **View Company orders**—with this permission enabled, a user can see not only their own orders, orders of their business unit, but also the orders of their company.
  - **Send cart for approval (Requires "Buy up to grand total")**—lets a user send the cart for approval. Works together with Buy up to grand total permission. See [Approval Feature Overview](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/approval-process-feature-overview.html) for more details.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create company roles](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/company-roles/create-company-roles.html) |
| [Edit company roles](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/company-roles/edit-company-roles.html) |
| [Create company users](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/company-users/create-company-users.html) |
| [Edit company users](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/company-users/edit-company-users.html) |


## See next

[Business on Behalf overview](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-on-behalf-overview.html)
