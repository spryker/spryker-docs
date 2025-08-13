---
title: Vertex FAQ
description: FAQ about Vertex 
template: concept-topic-template
redirect_from:
last_updated: Nov 17, 2023
---

**What is a Product Class Code for Vertex, and how can we use it?**

The Product Class Code is used to represent groups or categories of products or services with identical taxability. By default, Spryker Product SKU is sent as `LineItems[].product.value` and `LineItems.lineItemId. Keep in mind that the Vertex App doesn't create any Vertex Tax Categories.


**How should we use Item Flexible Fields? Should it contain some Product Class Code? Should we provide some class codes for order expenses as well?**

​Item Flexible Fields are optional fields provided by a project. They are needed for customization of tax calculation. Flexible Fields are supported by the Vertex app, and whether or not to use them is a business decision.


**How will stock address information be used in the Marketplace? Does it calculate freight tax for shipment?**

We do not support freight shipment in terms of big packaging support, but if it's about just calculating taxes for shipping price, yes, it's supported.


**Could you share more information about sending invoices to Vertex through the OMS feature?**

The Spryker OMS transition command has to be used as an execution point to send a full order with all existing and custom fields provided by the project. The results will be visible in the Invoice Tax Details report.

