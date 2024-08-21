---
title: Warehouse User Management feature overview
description: General overview of the Warehouse User Management feature
last_updated: Nov 23, 2023
template: concept-topic-template
related:
  - title: Fulfillment App overview
    link: docs/pbc/all/warehouse-management-system/page.version/unified-commerce/fulfillment-app-overview.html
  - title: Install the Warehouse User Management feature
    link: docs/pbc/all/warehouse-management-system/page.version/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html
---

The *Warehouse User Management* feature enables [Fulfillment App](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/fulfillment-app-overview.html) by providing all the functionalities for creating and managing warehouse users.


## Warehouse user and warehouse assignment

Back Office users can create warehouse users and assign warehouses to them.

## Warehouse Glue API resources

Using the `warehouse-tokens` Backend Glue API, warehouse users can log in to fulfill orders. This feature provides only the authorization capability.

Using the `warehouse-user-assignments` Backend Glue API, Back Office users can assign and deassign warehouses from warehouse users.
