---
title: Order Amendment feature overview
description: 
last_updated: Jun 03, 2025
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/order-management-system/202505.0/base-shop/order-management-feature-overview/order-management-feature-overview.html
  - /docs/pbc/all/order-management-system/202505.0/base-shop/order-amendment-feature-overview.html
---


The *Order Amendment* feature enables customers to make changes to previously placed orders before they enter processing. Customers can adjust items, quantities, delivery details, and payment options.

Only registered customers can make changes to placed orders because guest users don't have access to order history.

A customer can change an order once it reaches a state that allows amendments. By default, customers can initiate an amendment when an order is in the `grace period started` state.

You can customize which states allow amendments in the state machine. For instructions, on customizing state machines, see [Configure OMS](https://docs.spryker.com/docs/pbc/all/order-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-order-amendment-feature#set-up-configuration).


## Order amendment flow

A customer can change their order as follows:

1. Customer clicks the **Edit Order** button
2. This adds the order's items to cart and opens the cart page
2. Customers can add, remove, or modify items in the cart
3. Checkout proceeds via the standard flow.
4. Upon confirmation, the original order is updated with the amendments.


## Cart strategies

Order amendment uses the cart functionality as an interface. When a customer initiates an amendment, the order is carried over to cart for making changes. There're two default strategies to handle this process:

- Replace: All current cart items are replaced with the items from the order the customer wants to amend
- New: A new cart is created with the items from the amended order

On the project level, you can add other strategies to process order amendment.

The following details are carried over from the order to cart:
- B2B/B2B Marketplace: Order reference
- Cart notes
- Item notes
- Comments
- Custom order reference

You can customize what details are carried over on the project level.


## Products

When a customer initiates an order amendment, the following happens to products:

- Abstract and concrete products are added to cart
- Out-of-stock, disabled, and removed products are excluded from the cart
- [Configurable products](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html) are reset, and the customer needs to configure them again


## Pricing

Prices at the time of initiating an amendment may differ from the prices used to place the order. To handle such cases, you can use one of the following default strategies:

- Current catalog prices: catalog prices at the time of initiating order amendment are applied to all items.
- Original order prices: catalog prices at the time of placing the original order are applied to all items.
- Best price: If a product's price dropped since the order had been placed, the new lower price is used; otherwise, the original prices is used.

During the order amendment process, the prices for cart items are displayed according to the strategy only on Cart and Product Details pages. On all other pages, such as Product Catalog or Search Results pages, the current prices ar displayed.

Orders created through [request for quote](/docs/pbc/all/request-for-quote/{{site.version}}/request-for-quote.html) can't be amended.

## Stock

Stock availability at the time of initiating an amendment may differ from when the original order was placed. To handle such cases, you can use the strategies described in the following sections.


### Validate amended order against current stock

If an item is deactivated, unavailable, or out of stock, it is removed from the cart. A notification is displayed to inform the user about the removal.


### Preserve original stock and availability

- Items are editable even if they're now out of stock, deactivated, or unavailable
- Quantity can be reduced or left unchanged according to the original stock and availability
- Quantity can be increased only if current stock is sufficient

For example, an item's original stock is 2. At the time of initiating amendment, the item's stock is 10. In this case, the maximum quantity in the amended order can be 12.

You can implement custom strategies on the project level.

## Gift cards and vouchers

When a customer initiates an order amendment, gift cards and one-time-use vouchers are unapplied from the order. Their balances are restored once the amendment is complete, making them available for new orders or for subsequent edits to the same order.

For better user experience, we recommend implementing a way to inform customers about gift cards and vouchers being unapplied.

## 


## Grace period

A *grace period* lets you restrict order amendments to a certain time period after an order reaches an amendable state. For example, you can allow customers to change orders for two hours. This can be useful for shops that process orders quickly but want to give their customers enough time to change orders if needed, preventing order cancellations during processing.

For instructions on configuring the grace period, see [Install the Order Amendment feature](https://docs.spryker.com/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-amendment-feature#set-up-configuration).

## Video overview

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/order-management-system/base-shop/order-amendment-feature-overview.md/Order_Amendment_Explained.mp4" type="video/mp4">
  </video>
</figure>


## Related Developer documents

| INSTALLATION GUIDES |
|---------|
| [Install the Order Amendment feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-amendment-feature.html)  |
| [Install the Multiple Carts feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-feature.html)  |
| [Install the Multiple Carts + Reorder feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-reorder-feature.html)  |
| [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-amendment-feature.html)  |
| [Install the Product Bundles + Cart feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-bundles-cart-feature.html)  |
| [Install the Reorder feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-reorder-feature.html)  |































