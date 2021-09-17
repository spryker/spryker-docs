---
title: Reclamations Feature Overview
description: With the reclamations in place, you can do three things- create a new connected order, return money paid for the order, or close the reclamation.
originalLink: https://documentation.spryker.com/v2/docs/reclamations-feature-overview
originalArticleId: 0fd5002a-60f3-4b3c-b0bc-935444e6704a
redirect_from:
  - /v2/docs/reclamations-feature-overview
  - /v2/docs/en/reclamations-feature-overview
---

Once a Back Office user has received a claim regarding an order from the customer, they can go to [Overview of Orders](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/sales/orders/managing-orders.html#claiming-orders) in the Back Office and click **Claim** to register the claim for the order (for all items or separate items of the order).

After the reclamation has been created, it appears on the [Reclamations](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/sales/reclamations/managing-reclamations.html) page under the **Sales** menu in the Back Office. Each reclamation is linked to a specific order by order ID, however, one and the same order can have more than one reclamation.

With the reclamations in place, you can find the problematic issues with orders that a shop owner has (e.g., the product is faulty or broken) and manage them.

{% info_block errorBox %}
Due to the specificity of the state machine for every project, out of the box, the “refunded” state is not reflected in OMS in any way - it is just a mark for the shop administrators signifying that the order has been refunded.
{% endinfo_block %}

The reclamations can have two states - open and closed. The closed state of a reclamation means that there is nothing to do on it anymore, therefore it can not be reopened.

## Current Constraints
A Back Office user can create a Reclamation in the Back Office as an action item for a company. The rest needs to be configured according to the project needs. 

In the Back Office in the order list, a Back Office user doesn't have the functionality to filter the orders by a business unit. All the orders within the shop system (for example, from multiple company accounts) are displayed here.

<!-- once published, add a link
* [Creating and handling reclamations for orders in the Back Office](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/sales/orders/managing-orders.html#claiming-orders) -->

<!-- Last review date: Feb 13, 2019 by Oksana Karasyova -->
