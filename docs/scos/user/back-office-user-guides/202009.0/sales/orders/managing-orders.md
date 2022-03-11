---
title: Managing orders
description: The guide provides instructions on how to manage orders including setting statuses for the order, claiming and commenting on orders in the Back Office.
last_updated: Sep 7, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/managing-orders
originalArticleId: a33f6851-0c08-41bd-a08c-0ccd62abf089
redirect_from:
  - /v6/docs/managing-orders
  - /v6/docs/en/managing-orders
related:
  - title: Order Management
    link: docs/scos/user/features/page.version/order-management-feature-overview/order-management-feature-overview.html
  - title: Reclamations Feature Overview
    link: docs/scos/user/features/page.version/reclamations-feature-overview.html
  - title: Return Management Feature Overview
    link: docs/scos/user/features/page.version/return-management-feature-overview/return-management-feature-overview.html
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


**Tips and tricks**
To change the status of all the items inside a shipment at once, click **pay** in the **Trigger all matching states of order inside this shipment** section of the corresponding shipment.

To learn more about order statuses, see [Orders: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/references/reference-information-orders.html).

The order statuses you set here do not always have the same wording on the Storefront. For details on how you can display custom names for statuses on the Storefront, see [HowTo - Display Custom Names for Order Item States on the Storefront](https://docs.spryker.com/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-display-custom-names-for-order-item-states-on-the-storefront.html).

## Creating Returns
If a sales order item is[ returnable](/docs/scos/user/features/{{page.version}}/return-management-feature-overview/return-management-feature-overview.html), you can create a return for it. Keep in mind, that you can create returns as for the registered, so also for the guest users. Creating a return from the Back Office is the only way for the *guest users* to return an order.

To create a return:

1. On the *View Order: [Order ID]* page, click **Return** in the top right corner. This opens the *Create Return* page.
2. On the *Create Return* page, select the items you want to return and optionally the return reason for the items.
{% info_block warningBox "Note" %}

For a [Configurable Bundle](/docs/scos/user/features/{{page.version}}/configurable-bundle-feature-overview.html), you can’t select to return an entire Configurable Bundle, but you can select to return separate items from it.
The [Product Bundles](/docs/scos/user/features/{{page.version}}/product-bundles-feature-overview.html), on the contrary, are handled as one product, so only the whole bundle can be returned. You can not return individual items of a Product Bundle.

{% endinfo_block %}

3. Click **Create return**. This creates the return and takes you to the *Overview of Return* *[Return reference]* page, where you can change the return states. See [Return Item States: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/references/reference-information-return-item-states.html) for details on the return states you can trigger.

{% info_block infoBox "Info" %}

You can create returns for the items that are in *Exported* or *Delivered* states only.

{% endinfo_block %}

## Viewing the Returns for Orders
If returns have been created for an order, they are displayed on the *View Order: [Order ID]* page in the Returns section.

{% info_block infoBox "Info" %}

Returns of the registered and guest users have different return references. See [Returns Section](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/references/reference-information-orders.html#returns-section) for details on the return references.

{% endinfo_block %}

To view details on a return, click **View** in the Actions column of the *Returns* table. This takes you to the *Overview of Return: [Return ID]* page. See [Managing Returns](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/managing-returns.html) for information on how you can manage the returns on this page.


## Editing a Custom Order Reference
**To edit a custom order reference:**

1. In the **List of orders**, click **View** next to the order you want to update the custom order reference of.
2. In the **Custom Order Reference** section of the *View Order: [Order ID]* page, click **Edit Reference**.
![edit-custom-order-reference](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Managing+Orders/edit-custom-order-reference.png)
3. Update the custom order reference.
4. Click **Save**.

**Tips and tricks**
To remove the custom order reference, clear the **Custom Order Reference** field and click **Save**.

## Claiming Orders

To [claim an order](/docs/scos/user/features/{{page.version}}/reclamations-feature-overview.html):
1. On the *Overview of Orders* page, click **Claim** next to the order you want to create a reclamation for.
2. On the *Create reclamation* page, select one or more products you want to create the reclamation for.
3. Click **Create Reclamation**.
    The page refreshes to show the success message about reclamation creation.

**Tips and tricks**
Claiming an order does not change the status of the order or the items inside the order. When a reclamation is created, a sales team member processes the order manually.

## Commenting Orders

To [comment](/docs/scos/user/features/{{page.version}}/comments-feature-overview.html) an order:
1. Click **View** next to the order you want to comment.
2. On the *View Order: [Order ID]* page, scroll down to the **Comments** section.
3. Enter the comment in the **Message** field.
4. Click **Send Message**.
The page refreshes to show the success message about comment creation. Your message is displayed in the **Comments** section.

**Tips and tricks**
* To send an email to a customer, on the *Overview of Orders* page, click the hyperlinked customer email in the _Email_ column.
* To view customer details:
    * On the *Overview of Orders* page, click the hyperlinked customer name in the *Customer Full Name* column.
    * On the *View Order* page, scroll down to the *Customer* section and click the hyperlinked **Reference**.

## Editing a Billing Address

To edit a billing address:

1. Click **View** next to the order you want to edit the billing address of.
2. On the *View Order* page, scroll down to the **Customer** section.
3. Under the **Billing address**, click **Edit**. The *Edit Address for Order* page opens.  
![Edit billing address button](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Managing+Orders/edit-billing-information.png)

3. Make the updates and click **Save**.

***
**Next Steps**

* To learn how you can manage the created returns, see [Managing Returns](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/managing-returns.html).
* See [Orders: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/references/reference-information-orders.html) to learn about the attributes used to manage orders.
