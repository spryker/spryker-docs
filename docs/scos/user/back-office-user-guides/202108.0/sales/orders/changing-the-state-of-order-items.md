---
title: Changing the state of order items
description: The guide provides instructions on how to manage orders including setting statuses for the order, claiming and commenting on orders in the Back Office.
last_updated: Aug 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-orders
originalArticleId: 6d125a8a-63ca-4ddc-bb74-1526aa1fe44b
redirect_from:
  - /2021080/docs/managing-orders
  - /2021080/docs/en/managing-orders
  - /docs/managing-orders
  - /docs/en/managing-orders
related:
  - title: Order Management
    link: docs/scos/user/features/page.version/order-management-feature-overview/order-management-feature-overview.html
  - title: Reclamations Feature Overview
    link: docs/scos/user/features/page.version/reclamations-feature-overview.html
  - title: Return Management Feature Overview
    link: docs/scos/user/features/page.version/return-management-feature-overview/return-management-feature-overview.html
---

This article describes how to change the state of order items.

## Prerequisites

To start managing orders, go to **Sales** > **Orders**.

The instructions assume that there is an existing order with the **Payment pending** status.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Changing the state of all the items in an order

1. On the **Orders** page, click **View** next to the order containing the items you want to change the state of.
    This opens the **Order Overview** page.
2. In the **TRIGGER ALL MATCHING STATES INSIDE THIS ORDER** pane, click **Pay**.

    The page refreshes with the success message displayed. You can check the new state of the items in the order in the **ORDER ITEMS** pane.  
3. Repeat step 2 until the items are in the needed state.

## Changing the state of items in a shipment

1. On the **Orders** page, click **View** next to the order containing the shipment you want to change the state of.
    This opens the **Order Overview** page.    
2. In the **ORDER ITEMS** pane, in the desired shipment, select the checkboxes next to the products you want to change the state of. If you want to change the state of all the items in the shipment, don't select any checkboxes.
3. In the **TRIGGER ALL MATCHING STATES OF ORDER INSIDE THIS SHIPMENT** pane, click **Pay**.
    The page refreshes with the success message displayed.
4. Repeat step 2-3 until you get the needed  status.


## Changing the state of an item

1. On the **Orders** page, click **View** next to the order containing the item you want to change the state of.
    This opens the **Order Overview** page.
2. In the **ORDER ITEMS** pane, next to the needed item, click **Pay**.
    The page refreshes with the success message displayed.
3. Repeat step 2 until you get the needed order state.         

### Reference information: Changing the state of order items

You can set different statuses for your order. The following table describes the statuses you can select:

| ORDER STATUS | DESCRIPTION |
| --- | --- |
| Pay | Select this state once you receive the payment for the order from your customer. |
| Cancel | Select this state to cancel the order on the customer’s behalf. |
| Skip Timeout | Select this status to end the time period during which the customer can cancel the order. |
| invoice-generate | Select this state to generate the invoice and send it to the customer. If invoice BCC is configured for your project, the copy of the invoice will be sent to the specified email address as well. You can trigger the invoice-generate only for the whole order. Even if you selected just some of the order items, the invoice is generated for the whole order.|
| Ship | Select this state once the order is shipped.|
| Stock-update | Select this state when you update the number of available products of products in **Products** > **Availability**. |
|  Close| Select this state when your customer has successfully received the ordered items and is satisfied with their quality.|
| Return | Select this state if the customer returns you either all or several items from the order.  |
| Refund | Select this state in case of a refund.|

States flow:
* **Payment pending**—the initial order statuses.
* **Canceled**—state  of the order after it is canceled by the customer on the Storefront or by the Back Office user.
* When you select **Pay**, the state becomes **Confirmed**.
* When you select **Skip Timeout**, the state becomes **Exported**.
* When you select **Cancel**, the state becomes **Cancelled**.
* When you select **invoice-generate**, the state becomes **Exported**.
* When you select **Ship**, the state becomes **Shipped**.
* When you select **Stock-update**, the state becomes **Delivered**.
* When you select **Close**, the state becomes closed.
* In case the customer returns the ordered items: when you select **Return**, the status becomes returned.
* In case of a return, when you select **Refund**, the status becomes refunded.

### State names

The order statuses you set here do not always have the same wording on the Storefront. For details on how you can display custom names for statuses on the Storefront, see [HowTo - Display custom names for order item states on the Storefront](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-display-custom-names-for-order-item-states-on-the-storefront.html).





## Viewing the returns for orders

If returns have been created for an order, they are displayed on the *View Order: [Order ID]* page in the *Returns* section.

{% info_block infoBox "Info" %}

Returns of the registered and guest users have different return references. See [Returns Section](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/managing-orders.html#returns-section) for details on the return references.

{% endinfo_block %}

To view details on a return, click **View** in the Actions column of the *Returns* table. This takes you to the *Overview of Return: [Return ID]* page. See [Managing Returns](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/managing-returns.html) for information on how you can manage the returns on this page.

### Reference information: Viewing the returns for orders

This section describes the attributes you see when viewing the returns for orders.

#### Order Overview section

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Order reference | Reference number of the order.|
| Order date | Date when the order was placed. |
| Unique Product Quantity | Number of unique products in the order. |

#### Returns section
<a name="returns-section"></a>

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Return reference | Reference number of the return.  <br>The return reference of the **registered users** contains the store, customer ID, and the number of returns made by this customer. For example, DE-35-2 means that the return was made in the DE store by a user with ID 35, and this is the 2nd return of that user.<br>The return reference of the **guest users** contains the store, G identifier of the guest return, and the number of the return in this store. For example, DE-G3 means that this is the 3rd guest return in the DE store. <section contenteditable="false" class="errorBox"><div class="content">You can filter out the guest returns on the list of returns by typing *G* in the search field.</div></section> |
| Items | Number of items in the return. |
| Remuneration total | Total remuneration. |
| Actions | Actions you can perform on the return. |

## Editing custom order references

To edit a custom order reference:

1. In *List of orders*, click **View** next to the order you want to update the custom order reference of.
2. In the *Custom Order Reference* section of the *View Order: [Order ID]* page, click **Edit Reference**.
![edit-custom-order-reference](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Managing+Orders/edit-custom-order-reference.png)
3. Update the custom order reference.
4. Click **Save**.

**Tips & tricks**
<br>To remove the custom order reference, clear the *Custom Order Reference* field and click **Save**.

## Claiming orders

To [claim an order](/docs/scos/user/features/{{page.version}}/reclamations-feature-overview.html):
1. On the *Overview of Orders* page, click **Claim** next to the order you want to create a reclamation for.
2. On the *Create reclamation* page, select one or more products you want to create the reclamation for.
3. Click **Create Reclamation**.
    The page refreshes to show the success message about reclamation creation.

**Tips & tricks**
<br>Claiming an order does not change the status of the order or the items inside the order. When a reclamation is created, a sales team member processes the order manually.

### Reference information: Claiming orders

| ATTRIBUTE | DESCRIPTION |
|-|-|
| Product | Contains information about the product: the product image, name, SKU, color. Clicking the product name takes you to the *View Product Abstract: [Product ID]* page |
| Unit Price (GROSS_MODE) | Item price without taxes. |
| Item Total |Total amount paid for the item.|
| State | Current state of the item. Clicking the state shows the state. |


## Commenting orders

To add a [comment](/docs/scos/user/features/{{page.version}}/comments-feature-overview.html) to an order:
1. Click **View** next to the order you want to comment.
2. On the *View Order: [Order ID]* page, scroll down to the *Comments* section.
3. Enter the comment in the *Message* field.
4. Click **Send Message**.
The page refreshes to show the success message about comment creation. Your message is displayed in the *Comments* section.

**Tips & tricks**

* To send an email to a customer, on the *Overview of Orders* page, click the hyperlinked customer email in the _Email_ column.
* To view customer details:
    * On the *Overview of Orders* page, click the hyperlinked customer name in the *Customer Full Name* column.
    * On the *View Order* page, scroll down to the *Customer* section and click the hyperlinked **Reference**.

## Editing billing addresses

To edit a billing address:
1. Click **View** next to the order you want to edit the billing address of.
2. On the *View Order* page, scroll down to the **Customer** section.
3. Under the **Billing address**, click **Edit**. The *Edit Address for Order* page opens.  
![Edit billing address button](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Managing+Orders/edit-billing-information.png)

3. Make the updates and click **Save**.

### Reference information: Editing billing addresses

The following table describes the attributes you enter and select when adding a new customer address.

| ATTRIBUTE | DESCRIPTION |
|---|---|
|Salutation<br>First Name<br>Last Name | Customer's salutation. If the other person is the point of contact for this new address, you need to populate the fields with the respective data. If the customer is the same, populate the fields with the same values.|
|Address line 1<br>Address line 2<br>Address line 3|The fields where you enter the address information except for the city, zip code, and country.|
|City<br>Zip Code<br>Country|City, zip code, and country of the customer.|
|Phone|Customer's phone number.|
|Company|Customer's company.|
|Comment|Any specific comment regarding the customer or customer address (e.g., _"This address is going to be used only if the order costs less than 900 euros."_).|


**Next steps**
To learn how you can manage the created returns, see [Managing returns](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/managing-returns.html).
