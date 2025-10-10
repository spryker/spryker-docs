---
title: View returns of an order
description: Learn how to view returns of an order in the Spryker Cloud Commerce OS Back Office
template: back-office-user-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/sales/orders/viewing-returns-of-an-order.html
  - /docs/scos/user/back-office-user-guides/202204.0/sales/orders/viewing-returns-of-an-order.html
  - /docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-returns-of-an-order.html
related:
  - title: Creating returns
    link: docs/pbc/all/order-management-system/page.version/base-shop/manage-in-the-back-office/orders/create-returns.html
  - title: Return Management feature overview
    link: docs/pbc/all/return-management/page.version/return-management.html
---

This document describes how to view returns of an order in the Back Office.

## Prerequisites

To start working with orders, go to **Sales&nbsp;<span aria-label="and then">></span> Orders**.

Review the [reference information](#reference-information-viewing-returns-of-an-order) before you start, or look up the necessary information as you go through the process.

## Viewing returns of an order

1. On the **Orders** page, next to the order you want to view the returns of, click **View**.
    This opens the **Order Overview** page.
2. In the **RETURNS** pane, next to the return you want to view, click **View**.
    This opens the **Overview of Return: [Return ID]** page. To learn what you can do with returns, see [Managing returns](/docs/pbc/all/return-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-returns.html).

## Reference information: Viewing returns of an order

This section describes the attributes you see when viewing returns of orders.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Return reference | Reference number of the return.  <br>The return reference of the **registered users** contains the store, customer ID, and the number of returns made by this customer. For example, DE-35-2 means that the return was made in the DE store by a user with ID 35, and this is the second return of that user.<br>The return reference of the **guest users** contains the store, G identifier of the guest return, and the number of the return in this store. For example, DE-G3 means that this is the third guest return in the DE store. <section contenteditable="false" class="errorBox"><div class="content">You can filter out the guest returns on the list of returns by typing *G* in the search field.</div></section> |
| Items | Number of items in the return. |
| Remuneration total | Total remuneration. |
