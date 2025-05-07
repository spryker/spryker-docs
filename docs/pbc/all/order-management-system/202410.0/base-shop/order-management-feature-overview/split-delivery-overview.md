---
title: Split Delivery overview
description: The feature lets you deliver order items to different shipping addresses and on different days, with different shipment methods.
last_updated: Aug 18, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/split-delivery-overview
originalArticleId: 0d0d041f-19c0-44e7-968e-30fd35ae62dd
redirect_from:
  - /2021080/docs/split-delivery-overview
  - /2021080/docs/en/split-delivery-overview
  - /docs/split-delivery-overview
  - /docs/en/split-delivery-overview
  - /docs/scos/user/features/202311.0/order-management-feature-overview/split-delivery-overview.html
  - /docs/scos/user/features/202204.0/order-management-feature-overview/split-delivery-overview.html
---

*Split Delivery* enables the same order as *shipments* to multiple delivery addresses, or on different dates, or with different shipment methods. A *shipment* is a set of two or more products combined by the same delivery address.

Each shipment defines:

* Delivery address
* Shipment method
* Delivery date requested from a customer

In the Storefront, Split Delivery lets you, as a customer, set different delivery addresses for the order items, specify the date when you want the items to be delivered, and select shipment methods per each shipment.

In the Back Office, the Split Delivery lets you, as a Back Office user, view, update, and create multiple shipments for an order that had originally one delivery address.

## Split Delivery on the Storefront

{% info_block warningBox %}

Keep in mind that Split Delivery works *only* if there are several product items in one order.

{% endinfo_block %}

In the *Address* checkout step, the **Define to multiple addresses** drop-down option lets you assign a delivery address per cart item.

Then, in the *Shipment* checkout step, you can see the products grouped by the same delivery address. The number of shipments equals the number of the same delivery addresses. For each shipment, you can select a delivery date (optional) and a shipment method.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Checkout/Shop+Guide+-+Summary+Step/summary-step-new.png)

For more details about how to add multiple delivery addresses to order items in the Storefront, see [Multi-step checkout](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/checkout-feature-overview/multi-step-checkout-overview.html).

## Split Delivery in the Back Office

In the Back Office, the shipments are displayed on the **View Order: *[Order ID]*** page, in the **Order Items** section.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Split+Delivery/Split+Delivery+Feature+Overview/shipments-zed.png)

Here you can perform the following actions on shipments:

* Create a new shipment for the whole order.
* Modify a delivery address, a shipment method (without any impact on order totals), and a delivery date.
* Move items between shipments.
* Change the state of each item or all items per shipment.

For more details about how to create and manage shipments in the Back Office, see [Creating shipments](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/create-shipments.html).

## Constraints

### Gift card compatibility

The Split Delivery is not compatible with the Gift Cards feature. If you want to buy a Gift card, only *one* delivery address can be selected for the whole order.

### Limitation for payment service providers

Most of payment service providers (PSP) support a single delivery address for a given order, while Split Delivery lets your customers add multiple shipments to the same order. In this case, you need to modify the configuration of the online store to let your customers deliver order items to different addresses. For information about how to do that, see [HowTo: Disable Split Delivery in Yves Interface](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/disable-split-delivery-on-the-storefront.html).

<!--
### Product bundles
With Split Delivery, Product Bundles items can be shipped to different delivery addresses. However, if a product bundle is a part of the order and you don't want it to be split and delivered to different delivery addresses, you need to configure the implementation of the Checkout process on your project level.
-->

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create shipments](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/create-shipments.html) |
| [Editing shipments](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/edit-shipments.html) |
