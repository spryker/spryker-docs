---
title: Order Management feature overview
description: Efficiently keep track of the order processing and ensure quick fulfillment. With the Order Management, you can keep your order processing running smoothly.
last_updated: Jul 7, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/order-management
originalArticleId: f9fbd2cd-af2f-4850-a07a-1cb4d8934171
redirect_from:
  - /2021080/docs/order-management
  - /2021080/docs/en/order-management
  - /docs/order-management
  - /docs/en/order-management
---

Bringing flexible shipping options in your online business may have a key impact on the purchasing decisions of your customers. The *Order Management* feature is a collection of functionalities that enable your customers to place orders easily and enable you to manage the orders effectively.

In B2B companies, it is important to control the purchases employees make and add order references to the external systems. To keep the order references in your Spryker-based shop, use *Custom Order References* that allow you to link reference used in external systems, such as an ERP, to your internal orders. For example, your company pays the products with the invoice that has a reference. To make it easier to report and track the operations in your external systems, you, as a buyer, can include this reference number into your order.

*Invoice Generation* enables you to generate and send invoices to customers after they placed an order. At the same time, you can also keep the invoices for your records by sending copy of invoices to your own email address.

With *Order Cancellation*, allow your customers to cancel orders within a defined period and avoid doing it manually on your side on the customer's behalf. For example, a customer may change their mind about the color of an item they have ordered. Instead of contacting support representatives, they can cancel the order right away and re-place it with the desired color.  

To make it easier for your customers to manage their orders and shipments, you can offer them to split a single order into multiple shipments with *Split Delivery*. For example, they might want to buy presents for the holidays and ship them to different addresses. With just the standard single delivery, they would have to place multiple orders for this. Split Delivery allows delivering order items to different shipping addresses and on different days, with different shipment methods.

B2B customers usually purchase large volumes of products selecting specific measuring and packaging units relevant for their orders. In B2B eCommerce shops, some products, for example in pallets, might contain hundreds or even thousands and millions of items. Buying such products generally results in creation of hundreds, thousands or more sales order items in the database, and this might affect the system performance. Also, the customer ends up with a huge list of products on the checkout and order overview pages, which creates a bad buying experience. *Splittable Order Items* allow you to avoid long lists of sales order items, as you can choose not to split product concretes into separate sales items upon order.

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of Custom Order Reference](/docs/scos/dev/feature-walkthroughs/{{page.version}}/order-management-feature-walkthrough/custom-order-reference-module-relations.html)   |
| [Get a general idea of Invoice Generation](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/invoice-generation-overview.html)   |
| [Get a general idea of Order Cancellation](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/order-cancellation-overview.html)   |
| [Get a general idea of Split Delivery](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/split-delivery-overview.html)   |
| [Get a general idea of Splittable Order Items](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/splittable-order-items-overview.html)   |
| [Changing the state of order items](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/changing-the-state-of-order-items.html)   |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Order Management feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/order-management-feature-walkthrough/order-management-feature-wakthrough.html) for developers.

{% endinfo_block %}
