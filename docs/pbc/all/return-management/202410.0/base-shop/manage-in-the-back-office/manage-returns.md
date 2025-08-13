---
title: Manage returns
description: Learn how to efficiently manage customer product returns by direclty using the Back Office in your Spryker based projects.
last_updated: Jun 23, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-returns
originalArticleId: 52e17a39-524b-49a9-8add-40103a721653
redirect_from:
  - /2021080/docs/managing-returns
  - /2021080/docs/en/managing-returns
  - /docs/managing-returns
  - /docs/en/managing-returns
  - /docs/pbc/all/return-management/202311.0/manage-in-the-back-office/manage-returns.html
  - /docs/pbc/all/return-management/202204.0/base-shop/manage-in-the-back-office/manage-returns.html
related:
  - title: Creating returns
    link: docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/create-returns.html
  - title: Viewing returns of an order
    link: docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-returns-of-an-order.html
  - title: Changing the state of order items in returns
    link: docs/pbc/all/return-management/latest/base-shop/manage-in-the-back-office/change-the-state-of-order-items-in-returns.html
  - title: Return Management feature overview
    link: docs/pbc/all/return-management/latest/return-management.html
---

This document describes how to manage returns in the Back Office. To learn how Back Office user create returns, see [Creating returns](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/create-returns.html). To learn how customers create returns, see [Return Management on the Storefront](/docs/pbc/all/return-management/{{page.version}}/base-shop/return-management-feature-overview.html#return-management-on-the-storefront).

## Prerequisites

To start managing returns, go to **Sales&nbsp;<span aria-label="and then">></span> Returns**.

## Viewing returns

On the **Returns** page, next to the return you want to view, click **View**.

## Printing return slips


Next to the return you want to generate a [return slip](/docs/pbc/all/return-management/{{page.version}}/base-shop/return-management-feature-overview.html#return-slip) for, click **Print Slip**.
    This opens the page with an auto-generated slip.

## Reference information: Managing returns


The following table describes the attributes you see when viewing a return.

**RETURNED ITEMS section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Product | List of all items included in the return. |
| Quantity | Product quantity. |
| Price | Product price. |
| Price | Total amount paid for the item. |
| State | State for the item. |
| Trigger event | Changes the state of return items. |
| Trigger all matching states | If no items are selected, changes the state of all the items in the return. If one or more items are selected, changes the state of the selected items. |

**TOTAL section**

The *Total* section displays the total amount of items to be returned and the total sum to be refunded.

**GENERAL INFORMATION section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Order Reference | Unique identifier of the order a reference was created for. |
| Return Reference | Unique identifier of a return. |
| Return Date | Date when the return was created. |
| State | State of the return. |

**CUSTOMER section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Customer reference | Unique identifier of the customer a return was created for. |
| Name | Name of the customer a return was created for. |
| Email | Email address of the customer a return was created for. |
