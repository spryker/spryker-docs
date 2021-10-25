---
title: Order Management feature walkthrough
last_updated: Aug 18, 2021
description: The Order Management feature adds a collection of functionalities that allow you to see the quantity of the order items, their status, and how long they exist.
template: concept-topic-template
---

The _Order Management_ feature adds a collection of functionalities that allow you to see the quantity of the order items, their status, and how long they exist. Also, you can view details per status and order page.


To learn more about the feature and to find out how end users use it, see [Order Management](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/order-management-feature-overview.html) for business users.


## Entity diagram

The following schema illustrates the module relations of the Custom Order Reference feature:

<div class="width-100">

![custom-order-reference-module-relations](https://confluence-connect.gliffy.net/embed/image/48319fea-1661-457f-9b4f-b8029dea8e70.png?utm_medium=live&utm_source=custom)

</div>

The following scheme illustrates relations between **Shipment**, **ShipmentGui**, and **Sales** modules:

<div class="width-100">

![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Split+Delivery/split-delivery-module-relations.png)

</div>

## Related Developer articles

| INTEGRATION GUIDES | MIGRATION GUIDES | GLUE API GUIDES | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|---|
| [Custom Order Reference feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/custom-order-reference-feature-integration.html) | [Split delivery migration concept](/docs/scos/dev/migration-concepts/split-delivery-migration-concept.html) | [Retrieving orders](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-orders.html) | [HowTo - Disable split delivery in Yves interface](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-disable-split-delivery-in-yves-interface.html) | [Sales module: reference information](/docs/scos/dev/feature-walkthroughs/{{page.version}}/order-management-feature-walkthrough/sales-module-reference-information.html) |
| [Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/order-management-feature-integration.html) |  |  | [HowTo - Emailing invoices using BCC](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-emailing-invoices-using-bcc.html) | [Custom order reference- module relations](/docs/scos/dev/feature-walkthroughs/{{page.version}}/order-management-feature-walkthrough/custom-order-reference-module-relations.html) |
| [Quick Order + Non-splittable Products feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quick-add-to-cart-non-splittable-products-feature-integration.html) |  |  |  |  |
| [Glue API: Checkout feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-checkout-feature-integration.html) |  |  |  |  |
|[ Glue API: Company Account feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html) |  |  |  |  |
| [Glue API: Customer Account Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-customer-account-management-feature-integration.html) |  |  |  |  |
| [Glue API: Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-order-management-feature-integration.html) |  |  |  |  |
| [Glue API: Shipment feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-shipment-feature-integration.html) |  |  |  |  |
