---
title: Fulfillment App feature overview
description:
last_updated: Oct 3, 2023
template: Which Template to use for this?
---

The *Fulfillment App* feature streamlines the process of fulfilling orders by introducing the Fulfillment App and the warehouse user.


## Warehouse user

A *warehouse user* is a person that works in one or more warehouses to fulfill orders. They are a regular Back Office user. However, instead of having access to the Back Office, they have access to the fulfillment app.

In the Back Office, to create a warehouse user, you need to select a respective option when [creating](/docs/pbc/all/user-management/202400.0/base-shop/manage-in-the-back-office/manage-users/create-users.html) or [editing](/docs/pbc/all/user-management/202400.0/base-shop/manage-in-the-back-office/manage-users/edit-users.html) a regular user.



You can assign warehouses by selecting `Assign Warehouses`. By assigning a warehouse, you give the user the necessary access so they can fulfill order items in that specific warehouse.
blob:https://spryker.atlassian.net/ea1cb604-6126-4a3b-a9d0-b4bcd84b2367#media-blob-url=true&id=a24dda2e-6334-42fb-90c9-3bf59fcb9f0b&collection=&contextId=364968&height=436&width=1209&alt=


## Allocating a warehouse

By default, when a customer orders several items of the same SKU, the requested item’s stock is checked in all of the store's warehouses. The warehouses are sorted in the descending order of how much stock of the item they are holding. The warehouse holding the biggest stock of the item is assigned to the order.

{% info_block infoBox "Never out of stock" %}
The warehouse holding the never out of stock item quantity is considered to be holding the biggest stock.
{% endinfo_block %}

In some cases, the ordered quantity might not be available in the warehouse holding the biggest stock of the item. Then, the warehouse fulfills the order partially. The remaining quantity is fulfilled by the the warehouse holding the next biggest stock of the item. For example, the customer orders 100 tablets. The store's warehouses hold the following stock:

| WAREHOUSE | STOCK|
|-|-|
| 2 | 65 |
| 3 | 40 |
| 1 | 13 |

In this case, warehouse 2 provides 65 tables by emptying out its stock completely. Warehouse 3 provides the remaining 35 tablets with 5 tablets left in stock.


{% info_block warningBox "Item reservation" %}
Warehouse allocation shouldn't be confused with the reservation process, meaning items are not reserved when they are allocated to a warehouse. The warehouse management system is responsible for warehouse reservation. The default strategy is designed to show how warehouse allocation can be implemented and used in the fulfillment process.
{% endinfo_block %}


## Generating warehouse picklists

A *warehouse picklist* is a document that contains a list of items to be picked from the shelves or racks in order to fulfill an order. It includes the following  information:
* Product name
* Product image
* Quantity to be picked

Based on the picklist, the warehouse user gathers and prepares the items for shipping.

The information within will also allow you to quickly restock inventory as required.

Picking is semi-automated and follows the steps:
1. The customer places an order.
2. A warehouse is allocated to the order.
3. The picklist is generated.
4. In the Fulfillment App, a warehouse user assigns the picklist to themselves.
5. The user marks the items as picked or not found.
6. Picking is finished.
7. Order items states are updated to reflect the picking being finished.
8. The items are shipped.

### Picklist generation strategies



The picklist generation strategies let you configure how picklists are generated based on the fulfillment requirements of orders per warehouse. On the project level, each warehouse can have its own strategy.

The default picklist generation strategy is designed to generate picklists by order, where each order line is assigned to a unique picklist that contains all the items needed to fulfill that order.

Additionally, an order can be split by shipment into multiple picklists. If an order contains items that need to be shipped to multiple locations, the order is split into two picklists. This helps the warehouse user ship items more efficiently.



You can also import warehouse strategies by following the (relevant guide)[https://docs.spryker.com/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-warehouse-picking-feature.html#import-warehouse-picking-list-strategies].

## Picking using the Fulfillment App

Follow the guide below to learn how to pick order items using our Fulfillment App.
The Fulfillment App allows warehouse users to start the picking process for a picklist, and easily mark items in the picklist as picked or not found. Once the picking process is complete the state in the State Machine is updated to Picking Finished. To set up State Machine configuration, go (here)[https://docs.spryker.com/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-push-notification-feature.html#set-up-configuration]. This feature improves inventory accuracy and reduces the likelihood of incorrect orders being shipped to customers.
A subprocess for DummyPayment01 below describes in detail the state transition for the sales order line item:
blob:https://spryker.atlassian.net/b2217778-7e66-429f-9722-9fc81dd8f994#media-blob-url=true&id=1fdc71f1-23d7-4873-815f-12f2521637cb&contextId=364968&collection=
The detailed process is available in this format:
blob:https://spryker.atlassian.net/9b5c9218-65b1-4356-9126-0dcdb1390423#media-blob-url=true&id=fdcecf2b-c6d3-4aaa-b618-cf62fe1be370&contextId=364968&collection=
1) Open the `Picklist` section of the App, and tap `Start Picking` on the picklist you wish to fulfill.
blob:https://spryker.atlassian.net/5299c618-423e-4a67-9d9a-a55867b83276#media-blob-url=true&id=45f1ceb8-39a5-4d4d-8760-7fcbf15ac400&collection=&contextId=364968&height=1440&width=720&alt=
2) Select the correct amount of items for the picklist from the warehouse; make sure they are all accounted for and taken care of.
blob:https://spryker.atlassian.net/4421fc84-c2b4-49ef-a44f-5de35ea6f7c4#media-blob-url=true&id=1b730e39-be9e-45a1-82cd-c4503df91194&collection=&contextId=364968&width=490&height=589&alt=
3) Once you've picked all the items, there should be no items under `Not Picked`. Click `Finish Picking` to conclude the picking process.
blob:https://spryker.atlassian.net/a8d6e343-fc9a-4691-9494-e7bd9ff8c589#media-blob-url=true&id=46e0b172-f86a-42a5-986e-8efe99239b4d&collection=&contextId=364968&width=483&height=655&alt=
On a project level, the state machine can be updated to include cancellation flow for items that were not found during the picking process.
## Offline Mode for the Fulfillment App
The Fulfillment App supports push notifications. This feature allows warehouse users to automatically receive new picklists to their devices without a need for a manual refresh of the application.
Additionally, picking tasks can be performed offline and synchronized with the main application once you appear online.
Having an offline mode for a Fulfilment App in the warehouse provides several benefits, including:
* Improved productivity. In areas with poor or no network connectivity, you can continue using the app offline, without interruption, to complete your tasks. This reduces downtime and increases productivity.
* Greater flexibility. you can use the app offline in areas where there is limited network coverage, such as large warehouses. This enhances operational flexibility and enables work to continue uninterrupted in various environments.
* Reduced costs. The offline mode minimizes the reliance on expensive network hardware.
For further information, see the (**Push Notifications** integration guide)[https://docs.spryker.com/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-push-notification-feature.html].
## Known limitations
* Supported products must be a Product. They cannot be Bundles or Configurable Products.
* Partial picking of non-splittable order items is not supported.
* Business logic for picking of bundle products is not supported, but if all concretes of the bundle product are picked, it will be successfully processed by State Machine.
* No visualization of configurable bundles in Fulfillment App is currently possible, but picking of items in bundles is.
* Picking of random weight products is not currently available.





## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Assign and deassign warehouses from warehouse users](/docs/pbc/all/warehouse-management-system/202400.0/unified-commerce/assign-and-deassign-warehouses-from-warehouse-users.html)  |
| [Edit discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/edit-discounts.html)  |

## Related Developer articles

| INSTALLATION GUIDES  | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS |
|---|---|---|---|---|
