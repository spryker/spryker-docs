---
title: Managing order shipments
description: The guide provides steps on how to view and update delivery address, shipment method and delivery dates for the shipment, create a shipment in the Back Office.
last_updated: Jun 23, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-order-shipments
originalArticleId: 417c59db-8d1a-469b-bbef-858d312a1450
redirect_from:
  - /2021080/docs/managing-order-shipments
  - /2021080/docs/en/managing-order-shipments
  - /docs/managing-order-shipments
  - /docs/en/managing-order-shipments
related:
  - title: Managing Orders
    link: docs/scos/user/back-office-user-guides/page.version/sales/orders/managing-orders.html
  - title: Split Delivery Overview
    link: docs/scos/user/features/page.version/order-management-feature-overview/split-delivery-overview.html
---

This document describes how to manage shipments.

## Prerequisites

To start working with order shipments, do the following.
1. Go to **Sales** > **Orders**.
2. Next to the order you want to manage the shipment of, click **View**.
    This opens the **Order Overview** page.


{% info_block warningBox %}

If you create or edit a shipment of an order created by a customer, the grand total paid by the customer is not affected:
* If a new shipment method is added, its price is 0.
* If the shipment method is changed, the price of the previous shipment method is displayed.

{% endinfo_block %}

## Creating shipments

If you have more than one item in an order, you can create a new shipment as follows:

1. In the **ORDER ITEMS** section, click **Create Shipment**.
    This opens the **Create Shipment** page.
2. For **DELIVERY ADDRESS**, select an existing customer's address or **New address**.
    If you selected **New address**, address fields appear. Fill out the details of the new address.  
3. Select a **SHIPMENT METHOD**.
4. Optional: Enter a **REQUESTED DELIVERY DATE**.
5. Select one or more **ORDER ITEMS INSIDE THIS SHIPMENT**.
6. Click **Save**.
    This opens the **Order Overview** page with the success message displayed. The new shipment is displayed in the **ORDER ITEMS** section.
