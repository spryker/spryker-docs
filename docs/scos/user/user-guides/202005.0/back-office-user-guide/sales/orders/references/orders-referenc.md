---
title: Orders- Reference Information
originalLink: https://documentation.spryker.com/v5/docs/orders-reference-information
redirect_from:
  - /v5/docs/orders-reference-information
  - /v5/docs/en/orders-reference-information
---

This topic contains the reference for working with orders in **Sales** > **Orders**.
***

## Orders Page
By default, the last created order goes on top of the table. However, you can sort the table by the order number, order reference, created date, customer emails, or the number of items ordered.

On the **Orders** page, you see the following:
* Order number, reference, and the creation date
* Customer name and email
* Order state, the grand total of the order, and the number of items ordered
* Actions that you can do on this page

By default, the last created order goes on top of the table. However, you can sort and search the list of orders.

All columns with headers having arrows in the List of Returns table are sortable.

### Actions Column

All the order management options that you can invoke from the *Actions* column on the *List of orders page* are described in the following table.


| Action | Description |
| --- | --- |
| View | Takes you to the *View Order: [Return ID]* page. Here, you can find all the information about the chosen order. |
| Claim | Takes you to the Create reclamation page, where you can [create a reclamation](https://documentation.spryker.com/docs/en/managing-reclamations) for the order. |

## View Order [Order ID] page

The following table describes the attributes on the View Order [Order ID] page when you *view* an order.

### Order Overview Section

| Attribute | Description |
| --- | --- |
| Order refernce | Reference number of the order. |
| Order date | Date when the order was placed. |
| Unique Product Quantity | Number of uniqe products in the order. |

### Returns Section

| Attribute | Description |
| --- | --- |
| Return reference | Reference number of the return. |
| Items | Number of items in the return. |
| Remuneration total | Total remuneration. |
| Actions | Actions you can perform on the return. |

## Edit Address for Order: [Order ID]
The following table describes the attributes you enter and select when adding a new customer address.
|Attribute|Description|
|---|---|
|**Salutation**</br>**First Name**</br>**Last Name**|Customer's salutation. If the other person is the point of contact for this new address, you need to populate the fields with the respective data. If the customer is the same, populate the fields with the same values.|
|**Address line 1**</br>**Address line 2**</br>**Address line 3**|The fields where you enter the address information except for the city, zip code, and country.|
|**City**</br>**Zip Code**</br>**Country**|City, zip code, and country of the customer.|
|**Phone**|Customer's phone number.|
|**Company**|Customer's company.|
|**Comment**|Any specific comment regarding the customer or customer address (e.g. _"This address is going to be used only if the order costs less than 900 euros."_).|

## Order Statuses
You can set different statuses for your order. The following describes the statuses you can select:

| Order Status| Description |
| --- | --- |
| **Pay** | Select this status once you receive the payment for the order from your customer. |
| **Cancel** | Select this status to cancel the order on the customer’s behalf. |
| **Skip Timeout** | Select this status to end the time period during which the customer can cancel the order. |
| **Ship** | Select this status once the order is shipped.|
| **Stock-update** | Select this status when you update the number of available products of products in the **Products > Availability** section. |
|  **Close**| Select this status when your customer has successfully received the ordered items and is satisfied with their quality.|
| **Return** | Select this status if the customer returns you either all or several items from the order.  |
|**Refund**|Select this status in case of refund.|

Statuses flow:
* **Payment pending** - the initial order statuses.
* **Cancelled** - status of the order after it is cancelled by the customer on the Storefront or by the Back Office user. 
* When you select **Pay**, the status becomes **Confirmed**.
* When you select **Skip Timeout**, the status becomes **Exported**.
* When you select **Cancel**, the status becomes **Cancelled**.
* When you select **Ship**, the status becomes shipped.
* When you select **Stock-update**, the status becomes delivered.
* When you select **Close**, the status becomes closed.
* In case the customer returns the ordered items: when you select **Return**, the status becomes returned.
* In case of a return, when you select **Refund**, the status becomes refunded.

