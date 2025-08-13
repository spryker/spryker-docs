---
title: Fulfillment App overview
description: Fulfillment App streamlines the process of fulfilling orders, learn all you need to know about the Spryker Fulfilment app for your Unified Commerce Store.
last_updated: Oct 3, 2023
template: concept-topic-template
redirect_from:
---

*Fulfillment App* streamlines the process of fulfilling orders.


## Warehouse user

A *warehouse user* is a person that works in one or more warehouses to fulfill orders. They are a regular Back Office user. However, they don't have access to the Back Office. Instead, they are using Fulfillment App.

In the Back Office, to create a warehouse user, you need to select a respective option when [creating](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/create-users.html) or [editing](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/edit-users.html) a regular Back Office user.

To give a warehouse user access to fulfilling orders in a warehouse, you need to assign the warehouse to them. For instructions on how to do that, see [Assign and deassign warehouses from warehouse users](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/assign-and-deassign-warehouses-from-warehouse-users.html).

## Fulfillment App

Fulfillment App is an app used by warehouse users to fulfill orders. When a customer places an order, it's assigned to a warehouse that can fulfill the order. In the assigned warehouse, a warehouse user uses the Fulfillment App to gather and ship the order items.

![Picklists](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/warehouse-management-system/unified-commerce/fulfillment-app-feature-overview.md/picklists.png)

## Warehouse assignment

By default, when a customer orders several items of the same SKU, the requested item's stock is checked in all of the store's warehouses. The warehouses are sorted in the descending order of how much stock of the item they are holding. The warehouse holding the biggest stock of the item is assigned to the order. The warehouse holding the never-out-of-stock item quantity is considered to be holding the biggest stock.

In some cases, the ordered quantity might not be available in the warehouse holding the biggest stock of the item. Then, the warehouse fulfills the order partially. The remaining quantity is fulfilled by the the warehouse holding the next biggest stock of the item. For example, the customer orders 100 tablets. The store's warehouses hold the following stock:

| WAREHOUSE | STOCK |
|-|-|
| 2 | 65 |
| 3 | 40 |
| 1 | 13 |

In this case, warehouse 2 provides 65 tables by emptying out its stock completely. Warehouse 3 provides the remaining 35 tablets with 5 tablets left in stock.

{% info_block warningBox "Item reservation" %}
Warehouse allocation shouldn't be confused with the reservation process, meaning items are not reserved when they are allocated to a warehouse. The warehouse management system is responsible for warehouse reservation. The default strategy is designed to show how warehouse allocation can be implemented and used in the fulfillment process.
{% endinfo_block %}


## Warehouse picklists

A *warehouse picklist* is a document available in Fulfillment App that contains a list of items to be picked and shipped to fulfill and order. It includes the following information:

- Product name
- Product image
- Quantity to be picked

Based on a picklist, the warehouse user gathers and prepares the items for shipping.

![picklist items](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/warehouse-management-system/unified-commerce/fulfillment-app-feature-overview.md/picklist-items.png)

### Picklist generation strategies

A *picklist generation strategy* defines how picklists are generated based on the fulfillment requirements of orders per warehouse. On the project level, each warehouse can have its own strategy.

The default picklist generation strategy is designed to generate picklists by order, where each order line is assigned to a unique picklist that contains all the items needed to fulfill the order.

Also, an order can be split into multiple picklists by shipments. If an order contains items that need to be shipped to multiple locations, the order is split into two picklists. This helps the warehouse user ship items more efficiently.

The default generation strategy is an example of how it can work. A developer can implement the generation strategies to match your project's requirements.

## The picking process

Picking is semi-automated and follows the steps:

1. The customer places an order.
2. A warehouse is assigned to the order.
3. The picklist is generated.
4. In the Fulfillment App, a warehouse user assigns the picklist to themselves.
5. The warehouse user marks the items as picked or not found.
6. Picking is finished.
7. Order items states are updated to reflect the picking being finished.
8. The picked items are shipped.

## Fulfillment App state machine

The Warehouse Picking feature is shipped with exemplary picking subprocesses for the state machine. You can check them in the Back Office&nbsp;<span aria-label="and then">></span>**Administration**&nbsp;<span aria-label="and then">></span>**OMS**.

| Demo Shop | Subprocess |
| - | - |
| B2C |  DummyPayment01 |
| B2C Marketplace | MarketplacePayment01 |

## Push notifications

Fulfillment App supports push notifications. This lets warehouse users receive new picklists without having to refresh the application.

## Offline mode

To reduce costs and improve flexibility, Fulfillment App support offline mode. Warehouse users can perform picking tasks even without internet connectivity. Any changes performed in offline mode are synchronized when they get online. This is relevant for warehouses in remote areas or big warehouses that do not have full network coverage.

The offline mode is enabled by the [Push Notification](/docs/pbc/all/miscellaneous/{{page.version}}/push-notification-feature-overview.html) feature.

## Current constraints

- Supports only concrete products. Doesn't support bundles and configurable products.
- Doesn't support partial picking of non-splittable order items. If a customer orders an item with quantity 1, a warehouse user can either pick 1 full item or not pick at all.
- Doesn't support the business logic for picking of bundle products. However, if all concrete products of a bundle product are picked, it can be processed by the State Machine.
- Visualization of configurable bundles in Fulfillment App is not implemented, but picking of individual items in bundles is possible.
- Picking of random-weight products is not available.



## Related Business User documents

|BACK OFFICE GUIDES| FULFILLMENT APP GUIDES |
| - | - |
| [Assign and deassign warehouses from warehouse users](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/assign-and-deassign-warehouses-from-warehouse-users.html)  |  [Fulfill orders](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/fulfillment-app-fulfill-orders.html) |
| [Create users](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/create-users.html)  | |
| [Edit users](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/edit-users.html)  | |

## Related Developer documents

| INSTALLATION GUIDES  | GLUE API GUIDES |
| - | - |
| [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html) | [Retrieve picklists](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-picklists/glue-api-retrieve-picklists.html) |
| [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html) | [Start picking](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-picklists/glue-api-start-picking.html) |
| [Install the Push Notification feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-push-notification-feature.html) | [Retrieve picklists](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-picklists/glue-api-retrieve-picklists.html) |
| [Install the Warehouse picking + Product feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-product-feature.html) | [Create warehouse user assignments](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-warehouse-user-assignments/glue-api-create-warehouse-user-assignments.html) |
| [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html) | [Retrieve warehouse user assignments](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-warehouse-user-assignments/glue-api-retrieve-warehouse-user-assignments.html) |
| | [Update warehouse user assignments](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-warehouse-user-assignments/glue-api-update-warehouse-user-assignments.html) |
| | [Delete warehouse user assignments](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-warehouse-user-assignments/glue-api-delete-warehouse-user-assignments.html) |
