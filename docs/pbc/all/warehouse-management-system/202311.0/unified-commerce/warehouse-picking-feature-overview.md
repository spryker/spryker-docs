---
title: Warehouse Picking feature overview
description: General overview of the Warehouse Picking feature
last_updated: Oct 3, 2023
template: concept-topic-template
---









## Example of a picklist generation strategy

The feature is shipped with an optional example of a picklist generation strategy. The default strategy generates picklists based on order shipments. Each order line is assigned to a unique picklist that contains all the necessary items to fulfill that order. Also, this strategy splits orders into several picklists based on the warehouse assigned to each order line.

You can extend this strategy or create custom strategies on the project level. Each warehouse can have it's own strategy.


## Fulfillment App OAuth authorization

Fulfillment App's early access OAuth authorization supports the Authorization Code Grant flow. The flow is customized to meet the needs of Fulfillment App.
