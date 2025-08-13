---
title: Shared Carts feature overview
description: In B2B world shopping carts can be created and used by different individuals. A shopping cart can be shared with the users of the current business unit.
last_updated: Aug 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/shared-carts-feature-overview
originalArticleId: 85a7c630-a6ef-465f-80fd-176d1c5e0937
redirect_from:
  - /docs/scos/user/features/202311.0/shared-carts-feature-overview.html  
  - /docs/scos/dev/feature-walkthroughs/202311.0/shared-carts-feature-walkthrough.html
  - /docs/pbc/all/cart-and-checkout/shared-carts-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/shared-carts-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/feature-overviews/shared-carts-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/shared-carts-feature-overview.html

---

*Shopping Cart* is a part of the online shop where the record of the items a buyer has "picked up" from the online store is kept. The shopping cart lets customers select products, review what they selected, make modifications or add extra items if needed, and purchase the products.

There are two ways to access a shopping cart:
- Through a shopping cart widget in the header of the web shop.
- From the **Shopping Cart** page, in the **My Account** menu.

New items are added to the shopping cart by clicking on **Add to Cart** on the product details page.

To share a shopping cart, a user needs to click **Share cart** in the **Actions** column (on the **Shopping Cart** page, in the **My Account** menu) for a cart they want to share—see the [Shared Cart on the Storefront](#shared-cart-on-the-storefront) section.

## Permissions management for shared shopping carts

A shopping cart can be shared with the users of the current business unit. The **Share Cart `<SHOPPING CART NAME>`** page consists of the users within the business unit to share the shopping cart with.

![Shared cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Shared+Cart+Feature+Overview/share-cart-page.png)

There are three types of access rights that can be granted on shopping carts:
- No access
- Read only
- Full access

### No access

*No access* means that the shopping cart is not shared and therefore can not be seen by a user.

{% info_block warningBox "Note" %}

 *No access** is applied automatically to a newly-created cart.

{% endinfo_block %}

### Read-only

The *Read-only* permission allows:

*Reading shopping cart*. On the **Shopping Cart** page, the user sees the shopping cart name, access level (Read only), as well as the table of items with the following information:

- Product image
- Product name
- SKU
- Product attribute
- Product options
- Quantity
- Note
- Comments
- Custom order reference
- Price mode
- Item price
- Cart Note
- Discount
- Subtotal
- Tax
- Grand Total

{% info_block warningBox "Note" %}

With the *Read-only* permission, no cart actions are available to the user.

{% endinfo_block %}

### Full access

The *Full access* permission allows the following:

- *Reading shopping cart*: On the **Shopping cart** page, the user sees a shopping cart name, access level (*Full access*), as well as the table of items with the following information:
  - Product image
  - Product name
  - SKU
  - Product attribute
  - Product options
  - Quantity
  - Note
  - Price mode
  - Item price
  - Cat Note
  - Discount
  - Subtotal
  - Tax
  - Grand Total

- *Changing the quantity of items added to a cart*. On the **Shopping Cart summary** page, a user can change the item quantity for the product added to the cart.

- *Adding products to a cart*. A user can add any products to the cart with full access.

- *Removing products from a cart*. By clicking on Remove, the user can remove an item from the cart. By clicking on Clear cart, the user deletes all the items in the cart.

- *Leaving notes for products in the cart*. A user can leave a note to a particular product in the cart on the **Shopping cart summary** page.

- *Leaving notes for the cart*. A user can leave a note to a cart on the **Shopping cart summary** page.

- *Entering voucher code*.

- *Adding a cart to a shopping list*. A cart can be converted into a shopping list on the **Shopping cart summary** page.

- *Proceeding to the checkout*.

![Full access cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Shared+Cart+Feature+Overview/full-access-cart.png)

- *Editing shopping a cart name*. The shopping cart name can be updated on the **Shopping Cart** page.

- *Duplicating a shopping cart*. The shopping cart can be duplicated on the **Shopping Cart** page.

- *Dismissing a shared shopping cart*. Company users within one business unit can share carts. Such carts can be dismissed if they are no longer needed.

- *Deleting a shopping cart*. The shopping cart can be deleted on the **Shopping Cart** page. Deleting a shared shopping cart also deletes it for users it has been shared with.

![Shopping Cart Actions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Shared+Cart+Feature+Overview/shopping-cart-actions.png)

By default, the user who has created the cart has Owner access permission. Owner access permission allows everything that allows Full access permission and grants the ability to share the cart with other users.

If a user does not need a cart that has been shared with them, they can remove it from their shopping carts and thus cancel sharing. To do so, on the **Shopping Cart** page, in **Actions** next to the respective shared shopping cart, the user clicks **Dismiss**. They can dismiss sharing shopping carts with both *Read only* and *Full access* rights. Own shopping carts cannot be dismissed.

{% info_block errorBox "Important!" %}

If the shared cart has been dismissed individually by a user, this user can't see it if this cart is shared next time.

{% endinfo_block %}

## Current constraints

With the current functionality, the shopping cart cannot be shared outside of the [business unit](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/company-account-feature-overview/business-units-overview.html) to which the owner belongs to.

## Shared Cart on the Storefront

<a id=shared-cart-on-the-storefront></a>

On the storefront, company users can share a cart with other users within the same business unit:

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/cart-and-checkout/base-shop/feature-overviews/shared-carts-feature-overview.md/share-a-shopping-cart.mp4" type="video/mp4">
  </video>
</figure>  


## Related Developer documents

|INSTALLATION GUIDES  | GLUE API GUIDES  |
|---------|---------|
|[Install the Shared Carts feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shared-carts-feature.html) | [Share company user carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-share-company-user-carts.html)  |
| [Install the Shared Carts Glue API](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-shared-carts-glue-api.html) | [Retrieve cart permission groups](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-retrieve-cart-permission-groups.html) |
| | [Manage shared company user carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-manage-shared-company-user-carts.html) |
