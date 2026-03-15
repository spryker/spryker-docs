---
title: Manage marketplace returns
last_updated: Aug 09, 2021
description: This guide explains how to manage marketplace returns in the Back Office.
template: back-office-user-guide-template
related:
    - title: Managing marketplace orders
      link: docs/pbc/all/order-management-system/latest/marketplace/manage-in-the-back-office/manage-marketplace-orders.html
    - title: Marketplace Return Management feature overview
      link: docs/pbc/all/return-management/latest/marketplace/marketplace-return-management-feature-overview.html
---

After a [marketplace return](/docs/pbc/all/return-management/latest/marketplace/marketplace-return-management-feature-overview.html) has been created by a Back Office user or by a [shop user](/docs/pbc/all/return-management/latest/marketplace/marketplace-return-management-feature-overview.html#marketplace-return-management-on-the-storefront), it appears on the **Sales&nbsp;<span aria-label="and then">></span> Returns** page. On this page, you can manage the returns as follows:
- Set the return states.
- Print the return slip.

## Prerequisites

To start managing the marketplace returns, navigate to **Sales*&nbsp;<span aria-label="and then">></span> Returns**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Setting the marketplace return states

You can close the marketplace returns fulfilled by the merchant in the Merchant Portal.

To set and track the return statuses, you trigger the return states.

To trigger the return states:

1. On the **Returns** page, in the **Actions** column, click **View**. This takes you to the **Overview of Return: *[Return reference]***.
2. In the **Trigger all matching state section** of the **Overview of Return: *[Return reference]*** page, click the necessary state. The return state changes, and the new states that you can trigger appear. For information about the return item states and the flow, see [Marketplace return item states](#marketplace-return-item-states).

 {% info_block infoBox "Info" %}

The triggered return states are reflected in the Customer Account on the Storefront,  informing customers about the statuses of their returns.

 {% endinfo_block %}

**Tips and tricks**
<br>To trigger the return states for all the items in the return, click the states at the **Trigger all matching states** field. To trigger the return states for individual items of the return, trigger the states in the **Trigger event** column for the necessary items.

------

### Reference information: Setting the marketplace return states

This section holds reference information related to setting the marketplace return states.

#### List of Returns page

On the **Returns** page, you see the following:
- Return ID
- Return reference
- Order reference
- Returned Products (number of the sales order items that were returned)
- Return Date
- State
- Actions

By default, the last created return goes on top of the table. However, you can sort and search the list of returns.

All columns with headers having arrows in the **List of Returns** table are sortable.

##### Actions column

All the return management options that you can invoke from the **Actions** column on the **List of Returns** page are described in the following table.

| ACTION     | DESCRIPTION     |
| --------- | ------------ |
| View | Takes you to the *Overview of Return: [Return reference]* page. Here, you can find all the information about the chosen review. |
| Print Slip | Takes you to the print version of the return slip. |

#### Overview of Return: [Return Reference] page

The following table describes the attributes on the **Overview of Return: *[Return reference]*** page when you view a return.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Back+Office+user+guides/Sales/marketplace-return-back-office.png)

##### Returned items section

The returned items section displays information about the returned items.

| ATTRIBUTE    | DESCRIPTION      |
| --------------------- | ------------------------------ |
| Product     | List of all items included in the return.                    |
| Quantity    | Product quantity.                                            |
| Price       | Product price.                                               |
| Total       | Total amount paid for the item.                              |
| State       | Return state for the item.                                   |
| Trigger event     | List of the events to trigger for the return.                |
| Trigger all matching states | States that you can trigger for all items in the return at once. |

##### Marketplace return item states

You can trigger the following states for the returns on the **Overview of Returns [Return ID]** page:

| RETURN STATE    | DESCRIPTION           |
| ---------------------- | ------------------------------------- |
| close                           | Select this state when you want to close the completed return. When triggering this state, the return status is changed to *Closed*. |
| Deliver return back to customer | Select this state when you shipped the returned item back to the customer. When triggering this state, the return status is changed to *Delivered*. |
| Refund                          | Select this state if you have refunded the returned items. When triggering this state, the return status is changed to *Refunded***.** |

##### Total section

The **Total** section displays the total amount of items to be returned.

##### General information section

| ATTRIBUTE        | DESCRIPTION                       |
| --------------- | -------------------------------- |
| Order Reference  | Reference number of the order.    |
| Return Reference | Reference number of the return.   |
| Return Date      | Date when the return was created. |
| Returned Items   | Number of items to be returned.   |
| State            | State of the return.              |

##### Marketplace section

| ATTRIBUTE                 | DESCRIPTION                              |
| ---------------------- | -------------------------------------- |
| Merchant Order References | Merchant order reference number.         |
| Merchant                  | Name of the merchant that sold the item. |

##### Customer section

| ATTRIBUTE          | DESCRIPTION                |
| --------------- | ----------------------- |
| Customer reference | Reference of the customer. |
| Name               | Customer name.             |
| Email              | Customer's email address.  |

## Printing a marketplace return slip

For all returns, irrespective of their statuses, you can print the automatically generated [return slip](/docs/pbc/all/return-management/latest/marketplace/manage-in-the-back-office/manage-marketplace-returns.html#marketplace-return-item-states).

To print the return slip:
- In the **Actions** column on the **List of Returns** page, click **Print slip**.
- On the **Return Overview *[Return reference]*** page, click **Print Return Slip**.

This takes you to the page with the print version of the return slip.

For reference information about **the List of Returns** and **Return Overview *[Return reference]*** pages, on this page, see [List of Returns](#list-of-returns-page) and [Overview [Return reference](#list-of-returns-page), respectively.
