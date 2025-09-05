---
title: Editing shipments
description: Learn how to edit shipments of orders in the Spryker Cloud Commerce OS Back Office
template: back-office-user-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/sales/orders/editing-shipments.html
  - /docs/scos/user/back-office-user-guides/202204.0/sales/orders/editing-shipments.html
  - /docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/edit-shipments.html
related:
  - title: Creating shipments
    link: docs/pbc/all/order-management-system/page.version/base-shop/manage-in-the-back-office/orders/create-shipments.html
  - title: Shipment feature overview
    link: docs/pbc/all/carrier-management/page.version/base-shop/shipment-feature-overview.html
---

This document describes how to edit shipments in the Back Office.

## Prerequisites

To start working with order shipments, do the following:

1. Go to **Sales&nbsp;<span aria-label="and then">></span> Orders**.
2. Next to the order you want to manage the shipment of, click **View**.
    This opens the **Order Overview** page.

Review the [reference information](#reference-information-editing-shipments) before you start, or look up the necessary information as you go through the process.

{% info_block warningBox %}

If you create or edit a shipment of an order created by a customer, the grand total paid by the customer is not affected:

- If a new shipment method is added, its price is 0.
- If the shipment method is changed, the price of the previous shipment method is displayed.

{% endinfo_block %}


## Editing shipments

1. In the **ORDER ITEMS** section, next to the shipment you want to edit, click **Edit Shipment**.
    This opens the **Create Shipment** page.
2. For **DELIVERY ADDRESS**, select a different customer's address or **New address**.
    If you selected **New address**, address fields appear. Fill out the details of the new address.  
3. Select a **SHIPMENT METHOD**.
4. Enter a **REQUESTED DELIVERY DATE**.
5. Click **Save**.
    This opens the **Order Overview** page with the success message displayed.


{% info_block warningBox %}

A shipment that does not contain any items is automatically deleted.

{% endinfo_block %}

## Reference information: Editing shipments

The following table describes the attributes you enter and select when editing billing addresses in orders.

| ATTRIBUTE | DESCRIPTION |
|---|---|
| DELIVERY ADDRESS | The address that the customer selected to deliver the items to. Also allows to add a new address. |
| SALUTATION | Customer's salutation. |
| FIRST NAME | Customer's first name. |
| MIDDLE NAME | Customer's middle name. |
| LAST NAME | Customer's last name. |
| EMAIL | Customer's email address. |
| COUNTRY | Customer's country. |
| ADDRESS 1 | Customer's address. |
| ADDRESS 2 | Additional details of the customer's address. |
| COMPANY | Customer's company. |
| CITY | Customer's city. |
| ZIP CODE | Customer's ZIP code. |
| PHONE | Customer's phone number. |
| CELL PHONE | Customer's cell phone number. |
| DESCRIPTION | A short description of this address. |
| COMMENT | A comment about this address. For example, "Only for small packages".|
| SHIPMENT METHOD | The delivery company which the customer selected to handle the items. |
| REQUESTED DELIVERY DATE | The preferred delivery date that the customer selected for this shipment. |
