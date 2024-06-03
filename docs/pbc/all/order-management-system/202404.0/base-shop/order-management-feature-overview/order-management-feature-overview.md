---
title: Order Management feature overview
description: Efficiently keep track of the order processing and ensure quick fulfillment. With the Order Management, you can keep your order processing running smoothly.
last_updated: Jul 7, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/order-management
originalArticleId: f9fbd2cd-af2f-4850-a07a-1cb4d8934171
redirect_from:
  - /docs/scos/user/features/202108.0/order-management-feature-overview/order-management-feature-overview.html
  - /docs/scos/user/features/202200.0/order-management-feature-overview/order-management-feature-overview.html
  - /docs/scos/user/features/202311.0/order-management-feature-overview/order-management-feature-overview.html
  - /docs/scos/user/features/202204.0/order-management-feature-overview/order-management-feature-overview.html
---

Bringing flexible shipping options to your online business may have a key impact on the purchasing decisions of your customers. The *Order Management* feature is a collection of functionalities that let your customers place orders easily and let you manage the orders effectively.

In B2B companies, it is important to control employees' purchases and add order references to the external systems. To keep the order references in your Spryker-based shop, use *Custom Order References* that let you link the reference used in external systems, such as an ERP, to your internal orders. For example, your company pays the products with an invoice that has a reference. To make it easier to report and track the operations in your external systems, you, as a buyer, can include this reference number in your order.

*Invoice Generation* lets you generate and send invoices to customers after they placed an order. At the same time, you can also keep the invoices for your records by sending a copy of the invoices to your own email address.

With *Order Cancellation*, let your customers cancel orders within a defined period and avoid doing it manually on your side on the customer's behalf. For example, a customer may change their mind about the color of an item they have ordered. Instead of contacting support representatives, they can cancel the order right away and replace it with the needed color.  

To make it easier for your customers to manage their orders and shipments, you can offer them to split a single order into multiple shipments with *Split Delivery*. For example, they might want to buy presents for the holidays and ship them to different addresses. With just the standard single delivery, they would have to place multiple orders for this. Split Delivery allows delivering order items to different shipping addresses and on different days, with different shipment methods.

B2B customers usually purchase large volumes of products selecting specific measuring and packaging units relevant to their orders. In B2B eCommerce shops, some products, for example in pallets, might contain hundreds or even thousands and millions of items. Buying such products generally results in the creation of hundreds, thousands, or more sales order items in the database, and this might affect the system's performance. Also, the customer ends up with a huge list of products on the checkout and order overview pages, which creates a bad buying experience. *Splittable Order Items* let you avoid long lists of sales order items, as you can choose not to split product concretes into separate sales items upon order.

## Related Business User documents

| OVERVIEWS | BACK OFFICE GUIDES |
|---| - |
| [Custom Order Reference](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/custom-order-reference-overview.html) | [Add and remove custom order references](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/add-and-remove-custom-order-references.html) |
| [Invoice Generation](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/invoice-generation-overview.html)  |  [Change the state of order items](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/change-the-state-of-order-items.html) | |
| [OMS (Order management system) matrix](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/oms-order-management-system-matrix.html) | [Comment orders](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/comment-orders.html) |
| [Order Cancellation](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/order-cancellation-overview.html)   | [Create returns](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/create-returns.html) |
| [Split Delivery](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/split-delivery-overview.html)   | [Create shipments](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/create-shipments.html) |
| [Splittable Order Items](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/splittable-order-items-overview.html)   | [Edit billing addresses in orders](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/edit-billing-addresses-in-orders.html) |
| | [Edit shipments](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/edit-shipments.html) |
| | [View returns of an order](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/view-returns-of-an-order.html) |


## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES| GLUE API GUIDES | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|---|
| [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) | [Split delivery migration concept](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/split-delivery-migration-concept.html) | [Retrieving orders](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/glue-api-retrieve-orders.html) | [Disable split delivery on the Storefront](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/disable-split-delivery-on-the-storefront.html) | [Sales module: reference information](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/domain-model-and-relationships/sales-module-reference-information.html) |
| [Quick Add to Cart + Non-splittable Products feature integration](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-non-splittable-products-feature.html) | [Upgrade the ManualOrderEntryGui module](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-manualorderentrygui-module.html) |  | [HowTo: Emailing invoices using BCC](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/email-invoices-using-bcc.html) | [Custom order reference- module relations](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/domain-model-and-relationships/custom-order-reference-module-relations.html) |
| [Install the Checkout Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html) |  |  |  |  |
|[ Glue API: Company Account feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html) |  |  |  |  |
| [Install the Customer Account Management Glue API](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-customer-account-management-glue-api.html) |  |  |  |  |
| [Install the Order Management Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-order-management-glue-api.html) |  |  |  |  |
| [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html) |  |  |  |  |
