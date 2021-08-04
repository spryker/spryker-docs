---
title: Shared Carts feature overview
originalLink: https://documentation.spryker.com/2021080/docs/shared-carts-feature-overview
redirect_from:
  - /2021080/docs/shared-carts-feature-overview
  - /2021080/docs/en/shared-carts-feature-overview
---

*Shopping Cart* is a part of the online shop where the record of the items a buyer has ‘picked up’ from the online store is kept. The shopping cart enables consumers to select products, review what they selected, make modifications or add extra items if needed, and purchase the products.

There are two ways to access a shopping cart:
* Through a shopping cart widget in the header of the webshop.
* From Shopping Cart page in the *My Account* menu.

New items are added to the shopping cart by clicking on **Add to Cart** on the product details page.

To share a shopping cart, a user needs to click **Share cart** in the *Actions* column (on the *Shopping Cart* page, in *My Account* menu) for a cart they would like to share. See the [Shared Cart on the Storefront](#shared-cart-on-the-storefront) section.

## Permissions management for shared shopping carts
A shopping cart can be shared with the users of the current business unit. The Share cart `<SHOPPING CART NAME>` page consists of the users within the business unit to share the shopping cart with.

![Shared cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Shared+Cart+Feature+Overview/share-cart-page.png){height="" width=""}

There are 3 types of access rights that can be granted on shopping carts:

* No access
* Read-only
* Full access

### No access
_**No access**_ means that shopping cart is not shared and therefore can not be seen by a user.

{% info_block warningBox "Note" %}
 ***No access*** is applied automatically to a newly-created cart.
{% endinfo_block %}

### Read-only
The _**Read-only**_ permission allows:

**_Reading shopping cart_**. On the *Shopping cart* page, the user sees shopping cart name, access level (Read only), as well as the table of items with the following information:

* Product image
* Product name
* SKU
* Product attribute
* Product options
* Quantity
* Note
* Comments
* Custom order reference
* Price mode
* Item price
* Cart Note
* Discount
* Subtotal
* Tax
* Grand Total

{% info_block warningBox "Note" %}
With the ***Read-only*** permission, no cart actions are available to the user, except for adding comments and editing a custom order reference.
{% endinfo_block %}

### Full access
The _**Full access**_ permission allows:

1. **Reading shopping cart**: On the _Shopping cart_ page, the user sees a shopping cart name, access level (_Full access_), as well as the table of items with the following information:
    * Product image
    * Product name
    * SKU
    * Product attribute
    * Product options
    * Quantity
    * Note
    * Price mode
    * Item price
    * Cat Note
    * Discount
    * Subtotal
    * Tax
    * Grand Total

2. **Changing the quantity of items added to a cart**: On the *Shopping Cart summary* page, a user can change the item quantity for the product added to the cart.

3. **Adding products to a cart**: A user can add any products to the cart with full access.

4. **Removing products from a cart**: Having clicked on Remove, the user can remove an item from the cart. Having clicked on Clear cart, deletes all the items in the cart.

5. **Leaving notes for products in the cart**: A user can leave a note to a particular product in the cart on the *Shopping cart summary* page.

6. **Leaving notes for the cart**: A user can leave a note to a cart on the *Shopping cart summary* page.

7. **Entering voucher code**.

8. **Adding a cart to a shopping list**. A cart can be converted into shopping list on the *Shopping cart summary* page.

9. **Proceeding to the checkout**.

![Full access cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Shared+Cart+Feature+Overview/full-access-cart.png){height="" width=""}

10. **Editing shopping a cart name**: The shopping cart name can be updated on the *Shopping car*t page.

11. **Duplicating a shopping cart**: The shopping cart can be duplicated on the *Shopping cart* page.

12. **Dismissing a shared shopping cart**: Company users within one business unit can share carts. Such carts can be dissmissed if they, for example, are no longer needed.

13. **Deleting a shopping cart**: The shopping cart can be deleted on the *Shopping cart* page. Deleting a shared shopping cart also deletes it for users it has been shared with.

![Shopping Cart Actions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Shared+Cart+Feature+Overview/shopping-cart-actions.png){height="" width=""}

By default, the user who has created the cart has Owner access permission. Owner access permission allows everything that allows Full access permission and an ability to share the cart with other users.

If user does not need a cart, that has been shared with them, it is possible to remove it from their shopping carts and thus cancel sharing. To do so, the user clicks Dismiss on the *Shopping Cart* page in *Actions* next to the respective shared shopping cart. It is possible to dismiss sharing shopping carts with both Read only and Full access rights. Own shopping carts cannot be dismissed.

{% info_block errorBox "Important!" %}
If the shared cart has been dismissed individually by the user, this user will not be able to see it in case this cart is shared next time.
{% endinfo_block %}

## Current constraints
With the current functionality, the shopping cart cannot be shared outside of a [business unit](https://documentation.spryker.com/docs/business-unit-management-feature-overview) where the owner belongs.

## Shared Cart on the Storefront
<a id=shared-cart-on-the-storefront></a>
On the storefront, company users can share a cart with other users within the same business unit:

![Shopping Cart Actions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Shared+Cart+Feature+Overview/share-a-shopping-cart.gif)
</details>



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/en/sharing-company-user-carts" class="mr-link">Share company user carts via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/shared-carts-feature-integration" class="mr-link">Integrate the Shared Carts feature into your project</a></li>
            </ul>
        </div>
 <!-- col3 -->
    </div>
</div>
