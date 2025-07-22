---
title: "Fulfillment App: Fulfill orders"
description: Learn how you can fulfill orders in the Spryker Fulfillment App within your unified commerce store.
last_updated: Nov 3, 2023
template: back-office-user-guide-template
---

This document describes how to prepare an order for shipping by collecting order items using the Fulfillment App.

## Prerequisites

Log into the Fulfillment App. The login details should be provided by your Back Office administrator. A Back Office user can create or convert an existing Back Office user into a warehouse user. For instructions, see [Create users](/docs/pbc/all/user-management/202311.0/base-shop/manage-in-the-back-office/manage-users/create-users.html) or [Edit users](/docs/pbc/all/user-management/202311.0/base-shop/manage-in-the-back-office/manage-users/edit-users.html).


## Fulfill an order

1. In the Fulfillment App, next to the warehouse you want to fulfill an order in, click **Select**.
2. On the **PICK LISTS** page, next to the order you want to fulfill, click **Start picking**.
![picklists](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/warehouse-management-system/unified-commerce/fulfillment-app-feature-overview.md/picklists.png)
3. Based on the description of an item in the picklist, find and collect it in the warehouse.
![items description](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/warehouse-management-system/unified-commerce/fulfillment-app-fulfill-orders.md/fullfilment-app-item-description.jpg)
4. Based on whether you found the item, do one of the following next to its card in the Fulfillment App:
- If you've collected the item, select or enter the number of items you've collected and click **✓ Done**.
- If the item wasn't found, select or enter `0` and click **✓ Done**.g
5. In the dialog that appears, to confirm you've collected the item, click **Confirm**.
   This moves the item from the **Not Picked** tab to either the **Picked** or the **Not Found** tab. You can double-check the results by opening those tabs.
6. Repeat steps 3-5 until you process all the items by collecting or marking them as not found.
7. To finish picking, click **Finish picking**.
  This opens the **PICK LISTS** page. The picklist you've processed is no longer displayed.
