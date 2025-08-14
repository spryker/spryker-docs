  - /docs/pbc/all/order-management-system/latest/marketplace/manage-in-the-back-office/manage-main-merchant-orders.html
---
title: Managing main merchant orders
last_updated: Jul 22, 2021
description: This guide explains how to manage main merchant orders in the Back Office.
template: back-office-user-guide-template
redirect_from:
related:
  - title: Managing main merchant returns
    link: docs/pbc/all/return-management/page.version/marketplace/manage-in-the-back-office/manage-main-merchant-returns.html
  - title: Marketplace Order Management feature overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html
  - title: Main Merchant concept
    link: docs/pbc/all/merchant-management/page.version/marketplace/marketplace-merchant-feature-overview/main-merchant.html
---

*My Orders* is a dedicated page for managing the orders that customers completed from the [main merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/main-merchant.html) (Marketplace owner) within the Marketplace.

## Prerequisites

To start managing merchant orders for the [main merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/main-merchant.html), navigate to **Sales&nbsp;<span aria-label="and then">></span> My orders**.

The instructions assume that there is an existing order with the *New* status.

Each section in this article contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Viewing main merchant orders

To view the [main merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/main-merchant.html) orders, in the **List of Orders** table, click **View** next to the order you want to check.
This takes you to the **Merchant Order Overview** page.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Back+Office+user+guides/Sales/main-merchant-order-back-office.png)

### Reference information: Viewing main merchant orders

This section holds reference information related to viewing the [main merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/main-merchant.html) orders.

#### Overview of Orders page

By default, the last created order goes on top of the table. However, you can sort the table by the order number, order reference, created date, customer emails, or the number of items ordered.

On the **Overview of Orders** page, you see the following:

- Merchant order reference
- Marketplace order reference, where the merchant order belongs
- Creation date
- Customer name and email
- Order state, the grand total of the order, and the number of items ordered
- Actions that you can do on this page

By default, the last created order goes on top of the table. However, you can sort and search the **List of Orders** table.

All columns with headers having arrows in **List of Orders** are sortable.

##### Actions column

All the order management options that you can invoke from the **Actions** column in **List of Orders** are described in the following table.

| ACTION | DESCRIPTION |
| --------- | --------------- |
| View       | Takes you to the *Merchant Order Overview* page. Here, you can find all the information about the chosen order. |

#### Merchant Order Overview page

The following table describes the attributes on the **View Order *[Order ID]*** page when you *view* an order.

<table>
<thead>
  <tr>
    <th>SECTION</th>
    <th>ATTRIBUTE</th>
    <th>DESCRIPTION</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="11">Order Overview</td>
    <td></td>
    <td>Section with the general information about the order.</td>
  </tr>
  <tr>
    <td>Merchant Order reference</td>
    <td>Reference number of the merchant order.</td>
  </tr>
  <tr>
    <td>Marketplace Order Reference</td>
    <td>Reference number of the marketplace order where the merchant order belongs.</td>
  </tr>
  <tr>
    <td>Order date</td>
    <td>Date when the merchant order was placed.</td>
  </tr>
  <tr>
    <td>Totals</td>
    <td>Contains information about the order totals.</td>
  </tr>
  <tr>
    <td>Subtotal</td>
    <td>Subtotal of the order.</td>
  </tr>
  <tr>
    <td>Shipment price</td>
    <td>Total price for the shipment.</td>
  </tr>
  <tr>
    <td>Cancelled amount</td>
    <td>Canceled total.</td>
  </tr>
  <tr>
    <td>Grand Total</td>
    <td>Grand total of the order.</td>
  </tr>
  <tr>
    <td>Total taxes</td>
    <td>Total tax amount.</td>
  </tr>
  <tr>
    <td>Trigger all matching states inside this order</td>
    <td>Action button for changing the available states for all the items in the order. See <br><a href="/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-marketplace-orders.html#changing-marketplace-order-states">Changing marketplace order states</a> for details.</td>
  </tr>
  <tr>
    <td rowspan="6">Customer</td>
    <td></td>
    <td>Section with the information about the customer who has submitted the order.</td>
  </tr>
  <tr>
    <td>Reference</td>
    <td>Unique customer reference in the system. The reference is clickable and leads to the View Customer page.</td>
  </tr>
  <tr>
    <td>Name</td>
    <td>Customer's name.</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>Customer's email address.</td>
  </tr>
  <tr>
    <td>Previous orders count</td>
    <td>Number of merchant orders the customer has created for this merchant.</td>
  </tr>
  <tr>
    <td>Billing address</td>
    <td>Customer's address used for billing purposes.</td>
  </tr>
  <tr>
    <td>Merchant order items</td>
    <td></td>
    <td>Section with details about every merchant order item with its products and shipment information.</td>
  </tr>
  <tr>
    <td></td>
    <td>Shipment 1 of 1</td>
    <td>Number of shipments in the order.</td>
  </tr>
  <tr>
    <td></td>
    <td>Delivery Address</td>
    <td>Address used for delivery.</td>
  </tr>
  <tr>
    <td></td>
    <td>Delivery Method</td>
    <td>Delivery method chosen for the shipment.</td>
  </tr>
  <tr>
    <td></td>
    <td>Shipping Method</td>
    <td>Method used to ship the order.</td>
  </tr>
  <tr>
    <td></td>
    <td>Shipping Costs</td>
    <td>Price for shipping service.</td>
  </tr>
  <tr>
    <td></td>
    <td>Request delivery date</td>
    <td>Requested delivery date.</td>
  </tr>
  <tr>
    <td></td>
    <td>Trigger all matching states of order inside this shipment</td>
    <td>Action button for changing the available states for all the items in the shipment. See <br><a href="/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-main-merchant-orders.html#changing-main-merchant-order-states">Changing main merchant order states</a> for the details.</td>
  </tr>
  <tr>
    <td>Cart Notes</td>
    <td></td>
    <td>Section where the cart notes added by the customer are displayed (if any).</td>
  </tr>
  <tr>
    <td>Discounts &amp; Vouchers</td>
    <td></td>
    <td>Section with the information about discounts and vouchers applied to the order.</td>
  </tr>
</tbody>
</table>

## Changing main merchant order states

To change the state of the order items in a shipment:
1. In the **List of Orders** table, next to the order with items you want to change the state of, click **View**. This takes you to the **Merchant Order Overview** page.
2. Scroll down to the desired shipment.
3. Select the checkbox next to the products you want to change the state of.
4. In the **Trigger all matching states of order inside this shipment** section, click **the next available state**. For details about the available states, see [Reference information: Changing main merchant order states](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-main-merchant-orders.html#reference-information-changing-main-merchant-order-states).
   The page refreshes to show the message about the successful state change. In the **Trigger all matching states of order inside this shipment** section of the modified shipment, you can see the updated state.
5. Repeat step 4 until you get the desired shipment state.

### Reference information: Changing main merchant order states

You can set different states for your order by clicking the action buttons. The following table describes the triggers you can call:

| MAIN MERCHANT ORDER ITEM STATE | DESCRIPTION |
| ----------------------- | --------------------- |
| Send to distribution               | Choose this state once you receive the payment for the order from your customer. |
| Cancel                             | Choose this state to cancel the order on the customer's behalf. |
| Confirm at center                  | Choose this state when the order is confirmed at the distribution center. |
| Ship                               | Choose this state when the order is shipped to the customer. |
| Deliver                            | Choose this state when the order reached the customer.       |
| Refund                             | Choose this state in case of a refund.                       |

## Creating a shipment for the main merchant order



You can create a new shipment for the merchant orders where there is more than one merchant order item.

You can create a new shipment for one or several merchant order items. To create a new shipment:

1. In the **List of Orders** table, next to the order you want to edit the shipment of, click **View**.
2. In the **Merchant Order Items** section of the **Merchant Order Overview** page, click **Create Shipment**.
3. Fill in all the required fields.
4. Click **Save**.

### Reference information: Creating a shipment for the main merchant order

The following table describes the attributes you enter and select when creating or editing customer's shipment details.

| ATTRIBUTE  | DESCRIPTION   | REQUIRED |
| ----------------------- | ---------------- | ----------- |
| Delivery Address                 | Dropdown menu where you can select the delivery address. By default, *New Address* is selected. |              |
| Salutation   | Salutation to use when addressing the customer.  | &check; |
| First Name  | Customer's first name.  | &check; |
| Middle name  | Customer's middle name.   |   |
| Last name   | Customer's last name.   | &check; |
| Email   | Customer's email address.   | &check; |
| Country   | Drop-down menu with the list of countries to select.  | &check; |
| Address 1 | First line of the customer's address.  | &check; |
| Address 2  | Second line of the customer's address.  | &check; |
| Company  | Customer's company name.  |     |
| City   | Customer's city.  | &check;  |
| ZIP code  | ZIP code.   | &check;  |
| Phone  | Customer's phone number.  |      |
| Cell Phone  | Customer's cell phone number.   |   |
| Description   | Description of the shipping address.  |   |
| Comment   | Comment to the shipping address.  |              |
| Shipment method   | Drop-down menu with the list of all the available shipment methods in the system. You can select only one. | &check;  |
| Requested delivery date | Date by which the order should be delivered. |    |
| Order items inside this shipment | Check the order items you create or edit the shipment for.   | &check;   |

## Editing main merchant shipment

You can edit the existing details for the shipment in the Back Office. To do that:

1. In the **List of Orders** table, click **View** next to the order you want to edit the shipment of.
2. In the **Merchant Order Items** section of the **Merchant Order Overview** page, click **Edit Shipment**. This takes you to the **Edit shipment for Order: *[Order ID]*** page.
3. Update the main merchant shipment.
4. Click **Save**.

For reference information, on this page, see [Reference information: Creating a shipment for the main merchant order](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-main-merchant-orders.html#reference-information-creating-a-shipment-for-the-main-merchant-order).
