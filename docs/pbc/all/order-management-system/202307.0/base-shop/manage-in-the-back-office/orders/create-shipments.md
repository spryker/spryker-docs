---
title: Create shipments
description: Learn how to create shipments for orders in the Back Office.
last_updated: Jun 23, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-order-shipments
originalArticleId: 417c59db-8d1a-469b-bbef-858d312a1450
redirect_from:
  - /2021080/docs/managing-order-shipments
  - /2021080/docs/en/managing-order-shipments
  - /docs/managing-order-shipments
  - /docs/en/managing-order-shipments
  - /docs/scos/user/back-office-user-guides/202204.0/sales/orders/managing-order-shipments.html
  - /docs/scos/user/back-office-user-guides/202307.0/sales/orders/creating-shipments.html
related:
  - title: Editing shipments
    link: docs/pbc/all/order-management-system/page.version/base-shop/manage-in-the-back-office/orders/edit-shipments.html
  - title: Shipment feature overview
    link: docs/pbc/all/carrier-management/page.version/base-shop/shipment-feature-overview.html
---

This document describes how to create shipments for orders in the Back Office.

## Prerequisites

To start working with order shipments, do the following:

1. Go to **Sales&nbsp;<span aria-label="and then">></span> Orders**.
2. Next to the order you want to manage the shipment of, click **View**.
    This opens the **Order Overview** page.

Review the [reference information](#reference-information-creating-shipments) before you start, or look up the necessary information as you go through the process.

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



## Reference information: Creating shipments

The following table describes the attributes you enter and select when creating shipments.

| ATTRIBUTE | DESCRIPTION |
|---|---|
| DELIVERY ADDRESS | The address to deliver this shipment to. |
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
| SHIPMENT METHOD | The delivery company to delivery the items in this shipment. |
| REQUESTED DELIVERY DATE | Preferred date for delivering the items in this shipment.  |
