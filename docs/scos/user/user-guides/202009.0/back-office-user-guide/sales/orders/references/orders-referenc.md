---
title: Reference information- orders
originalLink: https://documentation.spryker.com/v6/docs/orders-reference-information
redirect_from:
  - /v6/docs/orders-reference-information
  - /v6/docs/en/orders-reference-information
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
| Claim | Takes you to the Create reclamation page, where you can [create a reclamation](https://documentation.spryker.com/docs/managing-reclamations) for the order. |

## View Order [Order ID] page

The following table describes the attributes on the View Order [Order ID] page when you *view* an order.

### Order Overview Section

| Attribute | Description |
| --- | --- |
| Order reference | Reference number of the order.|
| Order date | Date when the order was placed. |
| Unique Product Quantity | Number of uniqe products in the order. |

### Returns Section

| Attribute | Description |
| --- | --- |
| Return reference | Reference number of the return.  </br>The return reference of the **registered users** contains store, customer ID, and the number of return made by this customer. For example, DE-35-2 means that the return was made in the DE store by user with ID 35, and this is the 2nd return of that user.</br>The return reference of the **guest users** contains store, G identifier of the guest return and number of the return in this store. For example, DE-G3 means that this is the 3rd guest return in the DE store. <section contenteditable="false" class="errorBox"><div class="content">You can filter out the guest returns on the list of returns by typing *G* in the search field.</div></section> |
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
| **Pay** | Select this state once you receive the payment for the order from your customer. |
| **Cancel** | Select this state to cancel the order on the customer’s behalf. |
| **Skip Timeout** | Select this status to end the time period during which the customer can cancel the order. |
| **invoice-generate** | Select this state to generate the invoice and send it to the customer. If invoice BCC is configured for your project, the copy of the invoice will be sent to the specified email address as well. You can trigger the invoice-generate only for the whole order. Even if you selected just some of the order items, the invoice is generated for the whole order.|
| **Ship** | Select this state once the order is shipped.|
| **Stock-update** | Select this state when you update the number of available products of products in the **Products > Availability** section. |
|  **Close**| Select this state when your customer has successfully received the ordered items and is satisfied with their quality.|
| **Return** | Select this state if the customer returns you either all or several items from the order.  |
|**Refund**|Select this state in case of refund.|

Statuses flow:
* **Payment pending** - the initial order statuses.
* **Canceled** - state  of the order after it is canceled by the customer on the Storefront or by the Back Office user. 
* When you select **Pay**, the state becomes **Confirmed**.
* When you select **Skip Timeout**, the state becomes **Exported**.
* When you select **Cancel**, the state becomes **Cancelled**.
* When you select **invoice-generate**, the state becomes **Exported**.
* When you select **Ship**, the state becomes **Shipped**.
* When you select **Stock-update**, the state becomes **Delivered**.
* When you select **Close**, the state becomes closed.
* In case the customer returns the ordered items: when you select **Return**, the status becomes returned.
* In case of a return, when you select **Refund**, the status becomes refunded.

