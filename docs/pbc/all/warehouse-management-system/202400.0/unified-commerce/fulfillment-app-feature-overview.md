---
title: Unified Commerce feature overview
description: Learn about the features of the Unified Commerce Fulfillment App.
last_updated: May 9, 2023
template: Which Template to use for this?
originalLink: How do I get the Original Link?
originalArticleId:
---
Fulfillment App supports store associates (warehouse users) in the picking process. There's also an Offline Mode available for the Fulfillment App to enable picking items without an internet connection.


## Warehouse user

A *warehouse user* is a person that works in one or more warehouses to fulfill orders. 

To create a warehouse user, select the *"IS WAREHOUSE USER"* checkbox under a user's option when creating or modifying one in the Back Office. To learn more about managing warehouse users in Back Office, see [Managing users](/docs/pbc/all/user-management/{{page.version}}/manage-in-the-back-office/manage-users/create-users.html).
You can assign warehouses by selecting `Assign Warehouses`. By assigning a warehouse, you give the user the necessary access so they can fulfill order items in that specific warehouse.
blob:https://spryker.atlassian.net/ea1cb604-6126-4a3b-a9d0-b4bcd84b2367#media-blob-url=true&id=a24dda2e-6334-42fb-90c9-3bf59fcb9f0b&collection=&contextId=364968&height=436&width=1209&alt=
{% info_block infoBox "Info" %}
Warehouse users can only log in into the Fulfillment App but lose access to the Back Office.
{% endinfo_block %}
For additional information on the process, you can look at the (Warehouse Users Integration Guide)[https://docs.spryker.com/docs/pbc/all/back-office/{{page.version}}/install-spryker-core-back-office-warehouse-user-management-feature) and (BAPI coverage)[https://docs.spryker.com/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-spryker-core-back-office-feature.html].


## Allocating a warehouse
{% info_block infoBox "Info" %}
The default warehouse allocation strategy can be replaced on the project level with a custom strategy.
{% endinfo_block %}
By default, if a buyer orders several items of the same SKU, the requested item’s stock is checked in all of the store's warehouses. Based on the item's availability, the warehouses are sorted in descending order from highest amount to lowest.
If the requested quantity of the item is available in the first warehouse, which is the one holding the biggest stock of the item, this warehouse is by default assigned to fulfill the order.
{% info_block infoBox "Info" %}
The warehouse with the never out of stock item quantity is always assigned to the item.
{% endinfo_block %}
If a warehouse’s stock is insufficient to fulfill the order item, the next warehouse is added to the order to fulfill the remaining quantity of the item.
For more information on this process, you can look at the (Warehouse Allocation Integration guide)[https://github.com/spryker/spryker-docs/blob/825525ae94ad70ba39598c59f3947bbd0c04f364/_includes/pbc/all/install-features/{{page.version}}/install-the-inventory-management-feature.md].
{% info_block warningBox "Warning" %}
Warehouse Allocation is different from the reservation process, meaning items are not reserved when they are allocated to a warehouse. For now, responsibility for warehouse reservation lies in the warehouse management system used by the customer. The default strategy has been implemented only to demonstrate how warehouse allocation can be implemented and used in the fulfillment process.
{% endinfo_block %}
## Generating a Picklist
A warehouse picklist is a document that contains a list of items to be picked from the shelves or racks in order to fulfill a specific order. It includes information such as the product name, product image, and the quantity of each item that needs to be picked. The picklist serves as a guide for the warehouse user who is responsible for gathering the items and preparing them for shipment or storage. By following the information on the picklist, you can efficiently and accurately fulfill the order. The information within will also allow you to quickly restock inventory as required.
Picking is semi-automated. It follows these steps:
1) The customer places an order.
2) A warehouse is allocated to the order.
3) The picklist is generated.
4) The picklist is self-assigned by a warehouse user logged in into Fulfillment App.
5) Items are marked either as Picked or Not Found.
6) Picking is finished.
7) Order line items states are updated to reflect the picking being finished.
8) The items are by default shipped.
The picklist generation strategy allows warehouses to configure how picklists are generated based on the fulfillment requirements of the order. A custom picklist generation strategy can be implemented on a project level per individual warehouse. The default picklist generation strategy includes the ability to generate picklists by order, where each order line is assigned to a unique picklist that contains all the items needed to fulfill that order.
Additionally, an order can be split by shipment into multiple picklists. For example, if an order contains items that need to be shipped to multiple locations, the order can be split by shipment into two picklists so that you can easily identify which items belong to each shipment.
Overall, the picklist generation strategy provides flexibility and customization to warehouses in terms of generating picklists that best suit their order fulfillment needs, increasing efficiency, and reducing errors in the picking process.
For further information, see the **Picklist** (integration guide)[https://docs.spryker.com/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-warehouse-picking-feature.html#install-feature-core].
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
