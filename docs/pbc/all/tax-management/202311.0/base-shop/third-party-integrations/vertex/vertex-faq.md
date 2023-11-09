---
title: Vertex FAQ
description: FAQ about Vertex 
template: concept-topic-template
---

**What is a Product Class Code for Vertex, and how can we use it?**
The Product Class Code is used to represent groups or categories of products or services with identical taxability. By default, Spryker Product SKU is sent as `LineItems[].product.value` and `LineItems.lineItemId. Keep in mind that the Vertex App doesn't create any Vertex Tax Categories.

**How should we use Item Flexible Fields? Should it contain some Product Class Code? Should we provide some class codes for order expenses as well?**
​Item Flexible Fields are optional fields provided by a project. They are needed for customization of tax calculation. Flexible Fields are supported by the Vertex app, and whether or not to use them is a business decision.
