---
title: Company user roles and permissions
originalLink: https://documentation.spryker.com/v6/docs/company-user-roles-and-permissions
redirect_from:
  - /v6/docs/company-user-roles-and-permissions
  - /v6/docs/en/company-user-roles-and-permissions
---




Usually employees within a company have different roles (e.g. purchasing, administration, supervision, etc.). These roles are related to Company Users and are referred to as **Company Roles**. A role can be default (“is_default” flag), which means that it is used for all new users automatically.

Upon initial creation of the first Company User, the default role is Admin. After the Admin user has been created, he/she creates the structure of the company and can define the default role to be used further on.

![roles.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/roles.png){height="" width=""}

## Permissions
Each Company role contains a set of permissions in the form of **Permission** keys attributed to them.

The Permission keys define what the users are allowed to do.

{% info_block infoBox %}
For example, a user can be allowed to add products to cart.
{% endinfo_block %}
Permissions that can be used are not limited in any way - you can create and integrate any permissions. Each of the permissions is represented as a plugin in the code.

Here is another example of the connection between company roles and permissions:

* When a user registers a Company in the system, he/she actually creates a request for Company account registration.
* After the Company account has been approved, this first Company User becomes the Company administrator.
* Therefore, one of the roles within the Company will be Administrator who will have all the permissions with regard to creation and management of company profile, user accounts and user rights.

One and the same user can have several Company Roles assigned to them. It means that the same user can be Junior Sales Manager and Team Leader, which in its turn implies that this user has permissions assigned to both roles: Junior Sales Manager and Team Leader. Here it should be noted that the permissions, entitling the user with more rights, win.

{% info_block infoBox %}
For example, suppose Junior Sales Managers are allowed to place an order for up to 1000 Euro, whereas Team Leaders can place orders for up to 2000 Euro. If a user has both roles assigned to him, he/she will be allowed to place orders for up to 2000 Euro, and not 1000 Euro.<br>Or, for example, if Junior Sales Managers are not allowed to view specific products, but Team Leaders can, the users having both Junior Sales Manager and Team Leader roles will be allowed to view those products.
{% endinfo_block %}

![roles-permissions.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/roles-permissions.png){height="" width=""}

Company roles and permissions and their relation to the organizational structure can be schematically represented as follows:

![roles_structure.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/roles_structure.png){height="" width=""}

## Permission types
Permissions can be simple and complex.
<table>
	<th>Permission Type</th>
	<th>Description</th>
	<th>Example</th>
	<tr>
        <td><b>Simple</b></td>
		<td>	Simple permissions are those that do not have any logic behind them and answer the question “Does the customer have a permission?”. Simple permissions implement only PermissionPluginInterface (Shared).</td>
		<td>
            <p>A Company User is allowed (or not allowed) to access product details page.</p>
          

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/simple_permissions.png){height="" width=""}


</td>
	</tr>
	<tr>
        <td><b>Complex</b></td>
		<td>Complex permissions have some logic behind them and answer the question “Does the customer have a permission with some parameters and business logic?”. Complex permissions implement ExecutablePermissionPluginInterface (Shared).</td>
		<td>
           <p> A Company User is allowed (or not allowed) to place an order with grand total over 1000 Euro.</p>
       
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/complex_permissions.png)
        </td>
	</tr>
    <tr>
        <td><b>Infrastructural</b></td>
		<td>Some permissions should not be managed in the UI, but programatically. Infrastructural permissions implement InfrastructuralPermissionPluginInterface (Shared).</td>
		<td>
           <p> Read shared cart, which is managed by the Shared Carts feature.</p>
       </td>
	</tr>
</table>

{% info_block infoBox %}
Some of the Permissions can be configured for specific roles, for example, “allow adding no more than X items to cart” for junior support engineer.<br>Or for example, some specific products are not allowed to be viewed by anyone, but Admin and Top Managers.<br>These values are referred to as **Company Role Permissions**.
{% endinfo_block %}

Permission can also be **Yves-side** and **Zed-side**.

* **Yves permissions** do not need to get any data from the database. They refer to key-value storage, or to search to check the right for actions.
{% info_block infoBox %}
For example, the permission to view a product, a page, or permission to place an order, permission to place an order with grand total less X, would be Yves-side permissions.
{% endinfo_block %}

* Permissions that require some data from the database or some additional business-logic on top to check the rights for actions, are referred to as **Zed permissions**.

{% info_block infoBox %}
For example, the permission to add to cart up to X [order value] would be the Zed-side permission. In this case the process of permissions check would be as follows:<ul><li>After the user clicked **Add to cart**, the request comes to Zed and the pre-checks are made following the “add to cart” request.</li><li>After that, the calculations are run. The calculations apply discounts per item, and then per cart (total
{% endinfo_block %}.<br>The logic behind this is simple: a user might have a discount for a specific item, and a discount for order starting from a specific order value. The order value would be calculated taken the discount per items into account, and therefore the discount per cart would be applied after all discounts per items have been calculated.</li><li>After the calculations have been made, the cart is saved.</li></ul>)

Obviously, the permissions can not be checked at the step when user just clicks **Add to cart**, because actual order value has not been calculated yet (pre-checks have not been made yet, discounts have not been calculated). Also, the permissions check request can not be started after the cart has been updated - that would be too late, as, the cart has already been persisted. The request for rights check is made somewhere in between - specifically, right after the discounts have been calculated. That is why the so-called “termination hooks” have been implemented deep in logic, where the permissions checks are made.

The termination hooks (plugin stack) do not allow the permissions sneak into the business logic foundation so it will remain clean from the permissions and not overwhelmed with “can” “if not; then…” etc.

![termination_hooks.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+User+Permissions/Company+Roles+and+Permissions+Feature+Overview/termination_hooks.png){height="" width=""}

The termination hooks are performed one by one, and process termination can happen for any reason, and one of them would be the permissions.

## Company permissions in the Storefront
Every company role includes a set of permissions that can be enabled/disabled according to your needs by switching the toggle in *Enable* column:

 - **Add company users** - allows adding company users. With this permission enabled, a user will have Create User button on the Company Users page.
  - **Invite users** - allows inviting company users. With this permission enabled, a user will have Invite Users button on the Company Users page.
  - **Enable / Disable company users** - allows enabling and disabling company users. With this permission enabled, a user will be able to switch a toggle in the Enable column on the Company Users page.
  - **See Company Menu** - allows access to the company menu. With this permission enabled, a user will be able to navigate to a company menu from the header of the shop interface.
  - **Add item to cart** - allows adding products to cart. Without this permission, the user will get This action is forbidden error when trying to add the product in the cart.
  - **Change item in cart** - allows changing products in the cart (changing the quantity, adding notes etc).
  - **Remove item from cart** - allows deleting the products from the cart.
  - **Place Order** - allows placing the order. Without this permission enabled, a user will have error when trying to submit the order. If the [Approval Process](https://documentation.spryker.com/docs/approval-process-feature-overview) feature is integrated into your project, then **Buy up to grand total** permission is also required in order to be able to place an order.
  - **Buy up to grand total (Requires "Send cart for approval")** - sets a limit for the grand total of the cart. If the amount in the cart is bigger than the limit set in this permission, the user will not be able to proceed to checkout. Works with **Send cart for approval** permission. This permission is available after enabling the [Approval Process](https://documentation.spryker.com/docs/approval-process-feature-overview) feature.
  - **Approve up to grand total** - with this permission enabled, a user can approve the the cart. See [Approval Feature Overview](https://documentation.spryker.com/docs/approval-process-feature-overview) for more details.
  - **View Business Unit orders** - with this permission enabled, a user can see not only their own orders, but also the orders of their business unit.
  - **View Company orders** - with this permission enabled, a user can see not only their own orders, orders of their business unit, but also the orders of their comapny.
  - **Send cart for approval (Requires "Buy up to grand total")** - allows a user to send the cart for approval. Works together with Buy up to grand total permission. See [Approval Feature Overview](https://documentation.spryker.com/docs/approval-process-feature-overview) for more details.

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/mg-companyuser#upgrading-from-version-1-0-0-to-version-2-0-0" class="mr-link">Migrate the CompanyUser module from version 1.* to version 2.*</a></li>
                <li><a href="https://documentation.spryker.com/docs/logging-in-as-a-company-user" class="mr-link">Authenticate as company user via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/retrieving-company-users" class="mr-link">Retrieve information about company users via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/en/retrieving-company-roles" class="mr-link">Retrieve information about company roles via Glue API</a></li>
              </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office user</li>
                <li><a href="https://documentation.spryker.com/docs/managing-company-users" class="mr-link">Manage company users</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-company-roles" class="mr-link">Manage company roles</a></li>
            </ul>
        </div>
        </div>
</div>
