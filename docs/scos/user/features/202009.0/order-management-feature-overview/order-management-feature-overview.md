---
title: Order Management feature overview
description: Efficiently keep track of the order processing and ensure quick fulfillment. With the Order Management, you can keep your order processing running smoothly.
last_updated: Jun 15, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/order-management
originalArticleId: 07686e01-28c2-468d-b5c1-adaacb89e3d0
redirect_from:
  - /v6/docs/order-management
  - /v6/docs/en/order-management
---

Bringing flexible shipping options in your online business may have a key impact on the purchasing decisions of your customers. The *Order Management* feature is a collection of functionalities that enable your customers to place orders easily and enable you to manage the orders effectively. 

In B2B companies, it is important to control the purchases employees make and add order references to the external systems. To keep the order references in your Spryker-based shop, use *Custom Order References* that allow you to link reference used in external systems, such as an ERP, to your internal orders. For example, your company pays the products with the invoice that has a reference. To make it easier to report and track the operations in your external systems, you, as a buyer, can include this reference number into your order.

*Invoice Generation* enables you to generate and send invoices to customers after they placed an order. At the same time, you can also keep the invoices for your records by sending copy of invoices to your own email address.

With *Order Cancellation*, allow your customers to cancel orders within a defined period and avoid doing it manually on your side on the customer's behalf. For example, a customer may change their mind about the color of an item they have ordered. Instead of contacting support representatives, they can cancel the order right away and re-place it with the desired color.  

To make it easier for your customers to manage their orders and shipments, you can offer them to split a single order into multiple shipments with *Split Delivery*. For example, they might want to buy presents for the holidays and ship them to different addresses. With just the standard single delivery, they would have to place multiple orders for this. Split Delivery allows delivering order items to different shipping addresses and on different days, with different shipment methods.

B2B customers usually purchase large volumes of products selecting specific measuring and packaging units relevant for their orders. In B2B eCommerce shops, some products, for example in pallets, might contain hundreds or even thousands and millions of items. Buying such products generally results in creation of hundreds, thousands or more sales order items in the database, and this might affect the system performance. Also, the customer ends up with a huge list of products on the checkout and order overview pages, which creates a bad buying experience. *Splittable Order Items* allow you to avoid long lists of sales order items, as you can choose not to split product concretes into separate sales items upon order.