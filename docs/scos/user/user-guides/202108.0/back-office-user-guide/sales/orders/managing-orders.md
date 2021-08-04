---
title: Managing orders
originalLink: https://documentation.spryker.com/2021080/docs/managing-orders
redirect_from:
  - /2021080/docs/managing-orders
  - /2021080/docs/en/managing-orders
---

This article describes how to manage orders.

You manage orders by:
* Changing statuses of an order, or in item inside the order
* Commenting on orders (comments can be viewed by other Sales team members)
* Updating internal custom order reference
***

## Prerequisites

To start managing orders, go to **Sales** > **Orders**.

The instuctions assume that there is an existing order with the *Payment pending* status.

Each section contains reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.

## Changing order statuses 

To change the status of an order:

1. In the *List of orders* table, click **View** next to the order you want to change the status of. 
You are taken to the *View Order: [Order ID]* page.
2. In the *Trigger all matching states inside this order* section, click **pay**. The page refreshes to show the message about the successful status change. In the *Trigger all matching states inside this order* section, you can see the **ship** button. 
3. Repeat step 2 until you get the desired order status.

To change the status of the items in a shipment:

1. In *List of orders*, click **View** next to the order owning the items you want to change the status of. 
You are taken to the *View Order: [Order ID]* page.
2. Scroll down to the desired shipment.
3. Select the checkbox next to the products you want to change the status of.
4. In the *Trigger all matching states of order inside this shipment* section, click **pay**.
  The page refreshes to show the message about the successful status change. In the *Trigger all matching states of order inside this shipment* section of the modified shipment, you can see the **ship** button.
5. Repeat step 4 until you get the desired shipment status.


To change the status of an item:

1. In *List of orders*, click **View** next to the order owning the items you want to change the status of. 
You are taken to the *View Order: [order ID]* page.
2. Scroll down to the desired item.
3. In the _Trigger event_ column next to the desired product, click **pay**.
The page refreshes to show the message about the successful status change. In the _Trigger event_ column next to the product, you can see the **ship** button.


**Tips & tricks**

To change the status of all the items inside a shipment at once, click **pay** in the *Trigger all matching states of order inside this shipment* section of the corresponding shipment. 

The order statuses you set here do not always have the same wording on the Storefront. For details on how you can display custom names for statuses on the Storefront, see [HowTo - Display custom names for order item states on the Storefront](https://documentation.spryker.com/2021080/docs/howto-display-custom-names-for-order-item-states-on-the-storefront).

### Reference information: Changing order statuses 

You can set different statuses for your order. The followning describes the statuses you can select:

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

Statuses flow:
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

## Creating a return

If a sales order item is[ returnable](https://documentation.spryker.com/2021080/docs/return-management-feature-overview), you can create a return for it. Keep in mind that you can create returns for both the registered and guest users. Creating a return from the Back Office is the only way for the *guest users* to return an order.

To create a return:

1. On the *View Order: [Order ID]* page, click **Return** in the top right corner. This opens the *Create Return* page.
2. On the *Create Return* page, select the items you want to return and optionally the return reason for the items.
{% info_block warningBox "Note" %}

For a [Configurable Bundle](https://documentation.spryker.com/2021080/docs/configurable-bundle-feature-overview), you can’t select to return an entire Configurable Bundle, but you can select to return separate items from it.
The [Product Bundles](https://documentation.spryker.com/2021080/docs/product-bundle), on the contrary, are handled as one product, so only the whole bundle can be returned. You can not return individual items of a Product Bundle.

{% endinfo_block %}

3. Click **Create return**. This creates the return and takes you to the *Overview of Return* *[Return reference]* page, where you can change the return states. 

{% info_block infoBox "Info" %}

You can create returns for the items that are in *Exported* or *Delivered* states only.

{% endinfo_block %}

### Reference information: Creating a return

This section describes attributes you see when creating a return.

**Orders page**

By default, the last created order goes on top of the table. However, you can sort the table by the order number, order reference, created date, customer emails, or the number of items ordered.

On the *Orders* page, you see the followning:

* Order number, reference, and the creation date.
* Customer name and email.
* Order state, the grand total of the order, and the number of items ordered.
* Actions that you can do on this page.

By default, the last created order goes on top of the table. However, you can sort and search the list of orders.

All columns with headers having arrows in the *List of Returns* table are sortable.

**Create Return page**

| SECTION | ATTRIBUTE | DESCRIPTION |
|-|-|-|
| General information |   |   |
|   | Order reference | Reference of the order the return will be created for. It takes you to the *View Order: [Order ID]* page, where you can view and manage the order. |
| Select Items to Return |   |   |
|   | Fulfilled by merchant | Name of the merchant the item belongs to. It takes you to the Edit Merchant: [Merchant ID] page, where you can view and edit information about this merchant. |
|   | Merchant Order Reference | Reference of the merchant order in the system. |
|   | Product | List of all items that will be included in the return. |
|   | Quantity | Product quantity. |
|   | Price | Product price. |
|   | Total | Total amount paid for the item. |
|   | Return policy | Return policy an item will be controlled by. |
|   | State | Return state for the item. |

## Viewing the returns for orders

If returns have been created for an order, they are displayed on the *View Order: [Order ID]* page in the *Returns* section. 

{% info_block infoBox "Info" %}

Returns of the registered and guest users have different return references. See [Returns Section](https://documentation.spryker.com/2021080/docs/orders-reference-information#returns-section) for details on the return references.

{% endinfo_block %}

To view details on a return, click **View** in the Actions column of the *Returns* table. This takes you to the *Overview of Return: [Return ID]* page. See [Managing Returns](https://documentation.spryker.com/2021080/docs/managing-returns) for information on how you can manage the returns on this page.

### Reference information: Viewing the returns for orders

**Order Overview section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Order reference | Reference number of the order.|
| Order date | Date when the order was placed. |
| Unique Product Quantity | Number of unique products in the order. |

<a id="returns-section"></a>**Returns section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Return reference | Reference number of the return.  </br>The return reference of the **registered users** contains the store, customer ID, and the number of returns made by this customer. For example, DE-35-2 means that the return was made in the DE store by a user with ID 35, and this is the 2nd return of that user.</br>The return reference of the **guest users** contains the store, G identifier of the guest return, and the number of the return in this store. For example, DE-G3 means that this is the 3rd guest return in the DE store. <section contenteditable="false" class="errorBox"><div class="content">You can filter out the guest returns on the list of returns by typing *G* in the search field.</div></section> |
| Items | Number of items in the return. |
| Remuneration total | Total remuneration. |
| Actions | Actions you can perform on the return. |


## Editing a custom order reference

To edit a custom order reference:

1. In *List of orders*, click **View** next to the order you want to update the custom order reference of.
2. In the *Custom Order Reference* section of the *View Order: [Order ID]* page, click **Edit Reference**.
![edit-custom-order-reference](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Managing+Orders/edit-custom-order-reference.png){height="" width=""}
3. Update the custom order reference.
4. Click **Save**.

**Tips & tricks**

To remove the custom order reference, clear the *Custom Order Reference* field and click **Save**.

## Claiming orders

To [claim an order](https://documentation.spryker.com/2021080/docs/reclamations-feature-overview-201903):
1. On the *Overview of Orders* page, click **Claim** next to the order you want to create a reclamation for.
2. On the *Create reclamation* page, select one or more products you want to create the reclamation for.
3. Click **Create Reclamation**.
    The page refreshes to show the success message about reclamation creation.

**Tips & tricks**

Claiming an order does not change the status of the order or the items inside the order. When a reclamation is created, a sales team member processes the order manually.

### Reference information: Claiming orders

| ATTRIBUTE | DESCRIPTION |
|-|-|
| Product | Contains information about the product: the product image, name, SKU, color. Clicking the product name takes you to the *View Product Abstract: [Product ID]* page |
| Unit Price (GROSS_MODE) | Item price without taxes. |
| Item Total |Total amount paid for the item.|
| State | Current state of the item. Clicking the state shows the state. |


## Commenting orders

To add a [comment](https://documentation.spryker.com/2021080/docs/comments-feature-overview-201907) to an order:
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

## Editing a billing address 

To edit a billing address:

1. Click **View** next to the order you want to edit the billing address of.
2. On the *View Order* page, scroll down to the **Customer** section.
3. Under the **Billing address**, click **Edit**. The *Edit Address for Order* page opens.  
![Edit billing address button](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Managing+Orders/edit-billing-information.png)

3. Make the updates and click **Save**.


### Reference information: Editing a billing address 

The followning table describes the attributes you enter and select when adding a new customer address.

| ATTRIBUTE | DESCRIPTION |
|---|---|
|Salutation</br>First Name</br>Last Name | Customer's salutation. If the other person is the point of contact for this new address, you need to populate the fields with the respective data. If the customer is the same, populate the fields with the same values.|
|Address line 1</br>Address line 2</br>Address line 3|The fields where you enter the address information except for the city, zip code, and country.|
|City</br>Zip Code</br>Country|City, zip code, and country of the customer.|
|Phone|Customer's phone number.|
|Company|Customer's company.|
|Comment|Any specific comment regarding the customer or customer address (e.g., _"This address is going to be used only if the order costs less than 900 euros."_).|
***

**Next steps**
To learn how you can manage the created returns, see [Managing returns](https://documentation.spryker.com/2021080/docs/managing-returns). 


