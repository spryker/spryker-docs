---
title: Managing Shopping Carts
originalLink: https://documentation.spryker.com/v3/docs/shop-guide-managing-shopping-carts
redirect_from:
  - /v3/docs/shop-guide-managing-shopping-carts
  - /v3/docs/en/shop-guide-managing-shopping-carts
---

This topic describes the steps buyers can perform to manage their shopping carts.
***
## Editing a Shopping Cart

To edit a shopping cart:

1. Navigate to the **Shopping Carts** page.
2. Click  **Edit** in the *Shopping Carts List > Action* column if you want to change the cart name.
3. When the updates are done, click **Save**.
***
## Duplicating a Shopping Cart

You can copy the entire cart and its contents if you want to create one more instance of it or a similar cart. To duplicate a shopping cart:

1. Navigate to the **Shopping Carts** page.
2. Click **Duplicate** in the **Shopping Carts List > Action** column if you want to copy the cart and its contents.
{% info_block warningBox %}
By default, the cart is named **[Name of the cart that you duplicate] Copied At [Date]**. You can either change the name of the duplicated cart now or later.
{% endinfo_block %}
3. Click **Save**.
***
## Converting a Shopping Cart into a Shopping List

If you plan to purchase items in your cart repeatedly, it makes sense to convert the cart into a shopping list. This would help you to quickly find and order the products you need frequently. To convert a shopping cart into a shopping list:

1. Navigate to the **Shopping Carts** page.
2. Click **Add to List** in the **Shopping Carts List > Action** column.
3. From the drop-down list, select the existing shopping list where the cart items will be added: 
![Convert to drop-down](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Carts/Shop+Guide+-+Managing+Shopping+Carts/convert-to-dropdown.png)
or enter a name and create a new shopping list: 
![Shopping cart list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Carts/Shop+Guide+-+Managing+Shopping+Carts/cart-add-to-shopping-list.png)
4. Click **Submit**.
***
## Sharing a Shopping Cart

You can share a shopping cart with the company users within your business unit, so that they can view or even fully edit it. To share a shopping cart:

1. Navigate to the **Shopping Carts** page.
2. Click **Share** in the **Shopping Carts List > Action** column.
3. On the **Share my cart** page from the drop-down list next to the users you would like to share the cart with, select the sharing access rights: **No access, Read-only, Full Access**. See [Shared Cart Feature Overview](/docs/scos/dev/features/201907.0/shopping-cart/shared-cart/shared-cart-ove) for more details on the access rights. 
![Share a cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Carts/Shop+Guide+-+Managing+Shopping+Carts/share-cart-users.png){height="" width=""}
4. Click **Save**.
***
## Dismissing a Shared Shopping Cart

If you don't need a cart that has been shared with you, you can remove it from your shopping carts list and thus cancel sharing. To do so:

1. Navigate to the **Shopping Carts** page.
2. Click **Dismiss** in the **Shopping Carts List > Action** column.

{% info_block warningBox %}
You can dismiss only the shopping cart shared with you.
{% endinfo_block %}
***
## Deleting a Shopping Cart

To delete a shopping cart:

1. Navigate to the Shopping Carts page.
2. Click **Delete** in the **Shopping Carts List > Action** column if you want to delete the shopping cart.
3. Click **Delete**.

{% info_block warningBox %}
Deleting a shared shopping cart also deletes it for users it has been shared with.
{% endinfo_block %}
***
## Sharing a Shopping Cart via Link

### Sharing a Cart via Link with the External Users

External users are the users that do not belong to your company. To share the cart with them:

1. Navigate to the **Shopping Cart** page.
2. In the **Share Cart via Link** widget, select **External Users**. 
![External users](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Carts/Shop+Guide+-+Managing+Shopping+Carts/external+users-share-cart-link.png){height="" width=""}

3. Click **Copy** to copy the link and provide to an external user.

{% info_block infoBox %}
When the external users open the provided link, they can view the contents of your shopping cart:
{% endinfo_block %}
![Preview external users](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Carts/Shop+Guide+-+Managing+Shopping+Carts/external-users-preview.png){height="" width=""}

### Sharing a Cart via Link with the Internal Users

Internal users are the users that belong to your company account. You can share a link with the **Read-Only** or **Full Access**. To share the cart with the internal users:

1. Navigate to the **Shopping Cart** page.
2. In the **Share Cart via Link** widget, select **Internal Users**.
3. Depending on the level of access you would like to share the cart with, click **Copy** to copy the link. 
![Internal users](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Carts/Shop+Guide+-+Managing+Shopping+Carts/internal-uers-share-link.png){height="" width=""}

To learn more about the differences in the access levels, check [Shared Carts Feature Overview](/docs/scos/dev/features/201907.0/shopping-cart/shared-cart/shared-cart-ove).
