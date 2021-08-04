---
title: Managing orders
originalLink: https://documentation.spryker.com/v6/docs/managing-orders
redirect_from:
  - /v6/docs/managing-orders
  - /v6/docs/en/managing-orders
---

This article describes how to manage orders.
To start managing orders, go to **Sales > Orders**.

You manage orders by:
* changing statuses of an order, or in item inside the order
* commenting on orders (comments can be viewed by other Sales team members)
* updating internal custom order reference
***

## Prerequisites
The instuctions assume that there is an existing order with the *Payment pending* status.

## Changing Order Statuses 

**To change the status of an order:**
1. In the **List of orders**, click **View** next to the order you want to change the status of. 
You are taken to the *View Order: [order ID]* page.
2. In the **Trigger all matching states** section, click **pay**.
    The page refreshes to show the message about successful status change. In the **Trigger all matching states** section, you can see the *ship* button. 
3. Repeat step 2 until you get the desired order status.


**To change the status of the items in a shipment:**
1. In the **List of orders**, click **View** next to the order owing the items you want to change the status of. 
You are taken to the *View Order: [order ID]* page.
2. Scroll down to the desired shipment.
3. Select the checkbox next to the products you want to change the status of.
4. In the **Trigger all matching states of order inside this shipment** section, click **pay**.
  The page refreshes to show the message about successful status change. In the **Trigger all matching states of order inside this shipment** section of the modified shipment, you can see the *ship* button.
5. Repeat step 4 until you get the desired shipment status.


**To change the status of an item:**
1. In the **List of orders**, click **View** next to the order owing the items you want to change the status of. 
You are taken to the *View Order: [order ID]* page.
2. Scroll down to the desired item.
3. In the _Trigger event_ column next to the desired product, click **pay**.
The page refreshes to show the message about successful status change. In the _Trigger event_ column next to the product, you can see the *ship* button.


**Tips & Tricks**
To change the status of all the items inside a shipment at once, click **pay** in the **Trigger all matching states of order inside this shipment** section of the corresponding shipment. 

To learn more about order statuses, see [Orders: Reference Information](https://documentation.spryker.com/docs/orders-reference-information).

The order statuses you set here do not always have the same wording on the Storefront. For details on how you can display custom names for statuses on the Storefront, see [HowTo - Display Custom Names for Order Item States on the Storefront](https://documentation.spryker.com/docs/howto-display-custom-names-for-order-item-states-on-the-storefront).

## Creating a Return
If a sales order item is[ returnable](https://documentation.spryker.com/docs/return-management-feature-overview), you can create a return for it. Keep in mind, that you can create returns as for the registered, so also for the guest users. Creating a return from the Back Office is the only way for the *guest users* to return an order.

To create a return:

1. On the *View Order: [Order ID]* page, click **Return** in the top right corner. This opens the *Create Return* page.
2. On the *Create Return* page, select the items you want to return and optionally the return reason for the items.
{% info_block warningBox "Note" %}

For a [Configurable Bundle](https://documentation.spryker.com/docs/configurable-bundle-feature-overview), you can’t select to return an entire Configurable Bundle, but you can select to return separate items from it.
The [Product Bundles](https://documentation.spryker.com/docs/product-bundle), on the contrary, are handled as one product, so only the whole bundle can be returned. You can not return individual items of a Product Bundle.

{% endinfo_block %}

3. Click **Create return**. This creates the return and takes you to the *Overview of Return* *[Return reference]* page, where you can change the return states. See [Return Item States: Reference Information](https://documentation.spryker.com/docs/return-item-states-reference-information) for details on the return states you can trigger.

{% info_block infoBox "Info" %}

You can create returns for the items that are in *Exported* or *Delivered* states only.

{% endinfo_block %}

## Viewing the Returns for Orders
If returns have been created for an order, they are displayed on the *View Order: [Order ID]* page in the Returns section. 

{% info_block infoBox "Info" %}

Returns of the registered and guest users have different return references. See [Returns Section](https://documentation.spryker.com/docs/orders-reference-information#returns-section) for details on the return references.

{% endinfo_block %}

To view details on a return, click **View** in the Actions column of the *Returns* table. This takes you to the *Overview of Return: [Return ID]* page. See [Managing Returns](https://documentation.spryker.com/docs/managing-returns) for information on how you can manage the returns on this page.


## Editing a Custom Order Reference
**To edit a custom order reference:**

1. In the **List of orders**, click **View** next to the order you want to update the custom order reference of.
2. In the **Custom Order Reference** section of the *View Order: [Order ID]* page, click **Edit Reference**.
![edit-custom-order-reference](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Managing+Orders/edit-custom-order-reference.png){height="" width=""}
3. Update the custom order reference.
4. Click **Save**.

**Tips & Tricks**
To remove the custom order reference, clear the **Custom Order Reference** field and click **Save**.

## Claiming Orders

To [claim an order](https://documentation.spryker.com/docs/reclamations-feature-overview-201903):
1. On the *Overview of Orders* page, click **Claim** next to the order you want to create a reclamation for.
2. On the *Create reclamation* page, select one or more products you want to create the reclamation for.
3. Click **Create Reclamation**.
    The page refreshes to show the success message about reclamation creation.

**Tips & Tricks**
Claiming an order does not change the status of the order or the items inside the order. When a reclamation is created, a sales team member processes the order manually.

## Commenting Orders

To [comment](https://documentation.spryker.com/docs/comments-feature-overview-201907) an order:
1. Click **View** next to the order you want to comment.
2. On the *View Order: [Order ID]* page, scroll down to the **Comments** section.
3. Enter the comment in the **Message** field.
4. Click **Send Message**.
The page refreshes to show the success message about comment creation. Your message is displayed in the **Comments** section.

**Tips & Tricks**
* To send an email to a customer, on the *Overview of Orders* page, click the hyperlinked customer email in the _Email_ column.
* To view customer details:
    * On the *Overview of Orders* page, click the hyperlinked customer name in the *Customer Full Name* column. 
    * On the *View Order* page, scroll down to the *Customer* section and click the hyperlinked **Reference**. 

## Editing a Billing Address 

To edit a billing address:

1. Click **View** next to the order you want to edit the billing address of.
2. On the *View Order* page, scroll down to the **Customer** section.
3. Under the **Billing address**, click **Edit**. The *Edit Address for Order* page opens.  
![Edit billing address button](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Managing+Orders/edit-billing-information.png){height="" width=""}

3. Make the updates and click **Save**.

***
**Next Steps**

* To learn how you can manage the created returns, see [Managing Returns](https://documentation.spryker.com/docs/managing-returns). 
* See [Orders: Reference Information](https://documentation.spryker.com/docs/orders-reference-information) to learn about the attributes used to manage orders.

