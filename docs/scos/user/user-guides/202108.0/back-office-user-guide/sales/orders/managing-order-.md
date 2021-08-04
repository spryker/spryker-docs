---
title: Managing order shipments
originalLink: https://documentation.spryker.com/2021080/docs/managing-order-shipments
redirect_from:
  - /2021080/docs/managing-order-shipments
  - /2021080/docs/en/managing-order-shipments
---

This topic describes how to manage shipments.


To start working with order shipments, go to **Sales** > **Orders** and click **View** for a specific order in the *Actions* column. The *View Order: [Order ID]* page opens. On the page, scroll down to the *Order Items* section.

You can manage order shipments by:
* Viewing and updating a delivery address, shipment method, and delivery date for each shipment
* Viewing product item information included in the shipment
* Setting statuses for each item in the shipment
* Creating a new shipment out of the existing ones
* Moving items between shipments

{% info_block warningBox %}

If you create or edit a shipment of an order created by a customer, the grand total paid by the customer is not affected:

* If a new shipment method is added, its price is 0.
* If the shipment method is changed, the price of the previous shipment method is displayed.

{% endinfo_block %}

***
## Creating a new shipment for an order

To create a new shipment for the order:
1. Scroll down to the *Order Items* section and click **Create Shipment**.

![Create shipment button](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Managing+Order+Shipments/create-shipment-btn.png){height="" width=""}

2. On the *New Shipment for Order* page, populate the required fields marked with *.
3. In the *Order items inside this shipment* section, select the order items you want to be delivered in this shipment. 
4. To keep the changes, click **Save**. This will take you to the *View Order: [Order ID]* page, where you can see the new order shipment.

**Tips & tricks**
Clicking **Back to Order** in the top right corner of the page prior to saving the changes will discard all the changes and take you to the *View Order: [Order ID]* page.

## Editing shipment details

To edit shipment details:
1. Scroll down to the *Order Items* section and click **Edit Shipment** for the necessary shipment.
2. On the *Edit Shipment for Order: [Shipment Sequence Number]* page, you can:
    * Edit a delivery address and a shipment method (without any impact on the order totals). To do this, click a respective field and select the shipment item from the drop-down menu.
    * Define a delivery date. To do this, click the *Respective delivery date* field and select the date you want your shipment to be delivered.
    * Move items from the other order shipments to the current one. To do this, scroll down to the *Order items inside this shipment* section and select the checkbox for the necessary order item. By default, order items included in the current shipment are disabled.
    {% info_block warningBox %}
The shipment is automatically deleted if it doesn't contain any items.
{% endinfo_block %}
3. Once done, click **Save** to keep the changes. This will take you to the *View Order: [Order ID]* page with the following message: '*Shipment has been successfully edited'*.

**Tips & tricks**
Clicking **Back to Order** in the top right corner of the page can trigger different actions:
* Selecting this option prior to saving the changes will discard all the changes and then take you to the *List of Orders* page.
* Selecting this option after the changes have been saved will redirect you to the *List of Orders* page.


## Viewing status history of an order item

To view an order item status history:
1. Scroll down to the *Order Items* section.
2. In the *Shipment # > State* column, click **Show history** for the specific item whose shipment history you want to view. This will show the order statuses along with the dates the order item has been processed.
3. To hide this information, click **Hide history**.
 

