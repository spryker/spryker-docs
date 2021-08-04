---
title: Reclamations feature overview
originalLink: https://documentation.spryker.com/v6/docs/reclamations-feature-overview
redirect_from:
  - /v6/docs/reclamations-feature-overview
  - /v6/docs/en/reclamations-feature-overview
---

Once a Back Office user has received a claim regarding an order from the customer, they can go to [Overview of Orders](https://documentation.spryker.com/docs/managing-orders#claiming-orders) in the Back Office and click **Claim** to register the claim for the order (for all items or separate items of the order).

After the reclamation has been created, it appears on the [Reclamations](https://documentation.spryker.com/docs/managing-reclamations) page under the **Sales** menu in the Back Office. Each reclamation is linked to a specific order by order ID, however, one and the same order can have more than one reclamation.

With the reclamations in place, you can find the problematic issues with orders that a shop owner has (e.g., the product is faulty or broken) and manage them.

{% info_block errorBox %}
Due to the specificity of the state machine for every project, out of the box, the “refunded” state is not reflected in OMS in any way - it is just a mark for the shop administrators signifying that the order has been refunded.
{% endinfo_block %}

The reclamations can have two states - open and closed. The closed state of a reclamation means that there is nothing to do on it anymore, therefore it can not be reopened.

## Current Constraints
A Back Office user can create a Reclamation in the Back Office as an action item for a company. The rest needs to be configured according to the project needs. 

In the Back Office in the order list, a Back Office user doesn't have the functionality to filter the orders by a business unit. All the orders within the shop system (for example, from multiple company accounts) are displayed here.
