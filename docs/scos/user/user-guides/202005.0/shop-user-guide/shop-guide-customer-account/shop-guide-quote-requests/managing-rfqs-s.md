---
title: Shop Guide - Managing Requests for Quotes for a Sales Representative
originalLink: https://documentation.spryker.com/v5/docs/managing-rfqs-sales-rep-shop-guide
redirect_from:
  - /v5/docs/managing-rfqs-sales-rep-shop-guide
  - /v5/docs/en/managing-rfqs-sales-rep-shop-guide
---

This topic describes the procedure for managing the RFQs from the perspective of the Sales Representative.

{% info_block infoBox %}
To be able to perform the tasks, you need to be logged into an Agent Account. Try using our [test agent account](http://www.b2b.demo-spryker.com/agent/login
{% endinfo_block %}, the username is `admin@spryker.com`, password is `change123`.)

A Sales Representative can manage the RFQs with the In Progress status by:

* Viewing the RFQs for the company.
* Creating RFQs for buyers.
* Editing the items in the RFQ.
* Suggesting prices by editing them directly in the RFQs.
* Editing prices per shipment cost.
* Editing a delivery address and a shipment method.

***
## Viewing the RFQs

To view the RFQs created both by yourself as a Sales Representative or by Buyers, hover over the **Quote Request Widget** in the header. In the **Quote Request Widget**, the latest 5 RFQs are shown by default. To view all the RFQs, click **View all requests**.
![Quote request widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/quote-request-widget.png){height="" width=""}
***
## Creating an RFQ for a Buyer

A Sales Representative can create an RFQ for a customer if for some reason the customer can not do it. Also, a Sales Representative can create a price suggestion for a customer on their own initiative, without the customer's request.

To create an RFQ for a Buyer:

1. In the header, hover over the **Quote Requests Widget** and click **Create new Quote Request**.
2. On the **Create Quote Request** page in the **Select customer**: field, start entering the Buyer's name for whom the Quote Request is being created.
3. From the drop-down list of suggestions, select the necessary Buyer and click **Save**.
4. To keep the changes, click **Save**. The quote request will be updated and the **Edit Quote Request** page opens.
5. To add items to the RFQ, click **Edit Items**, and then use one of the following options:
    * In the **Quick add to Cart** widget, enter a SKU or a name of the concrete product and its quantity, and click **Add to Cart**.
    * From the catalog, select the product, choose the options and quantity, and click **Add to Cart**.
    * On the **Quick Order** page, enter a SKU or a name of the concrete product and its quantity, and click **Add to Cart**. For more information on Quick Order, see [Shop Guide - Quick Order](https://documentation.spryker.com/docs/en/quick-order-shop-guide).
    * On the **Shopping list** page, click the shopping list, select the checkboxes for the items you want to add from the shopping list, and click **Add to Cart**. For more information on Quick Order, see [Shop Guide - Shopping Lists](https://documentation.spryker.com/docs/en/shopping-lists-shop-guide).
6. In the **Quote Request** widget on top of the page, do the following:
    * click **Save** to keep the changes.
    * click **Save and Back to Edit** to keep the changes and return to the **Edit Quote Request** page.
    * click **Cancel** to discard the changes you’ve added.
![quote-request-agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/quote-request-agent.png){height="" width=""}

**Tips & Tricks**

On the **Edit Quote Request** page, you can update the following information:

* Enter a **purchase order number**.
* Add the **notes**.
* Select a due date in the **Do not ship later than** field.
* Add a date, until the RFQ expires, to the** Valid Till** field. 
* Select **Show the latest version to customer** checkbox if you want to allow the Buyer to see the updates you have done in the RFQ.
***
## Editing Items in an RFQ

You can also edit items in an RFQ. 

To edit items in the RFQ:

1. On the Edit Quote Request page, click Edit Items. You can change the item quantity, remove the existing products from the RFQ or add the products from the catalog.
    {% info_block infoBox "Info" %}

   Keep in mind that measurement units cannot be updated. You can only add a new product with different measurement units.
    
{% endinfo_block %}

2. To keep the changes, click **Save and Back to Edit** in the **Quote Request** widget.
![Edit items agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/edit-items-agent.png){height="" width=""}

**Tips & Tricks**

When changing the item quantity, enter the new value and click the **Refresh** icon.
![change-quantity](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/change-quantity.png){height="" width=""}
***
## Adding Delivery Information
To add the delivery address and shipment method:

1. On the **Edit Quote Request** page, in the *Addresses* section, click **Add Address**.
2. On the **Address** page, select a delivery address using one of the following options from the **Select a delivery address** drop-down and populate the fields:
    * **Define new address** to add the delivery address for the whole RFQ. This will open the form to populate the fields with the necessary information.
    * Select one of the existing addresses
    * **Deliver to multiple addresses** to assign a delivery addresses per RFQ item. See [Shop Guide - Address Step](https://documentation.spryker.com/docs/en/address-step-shop-guide-201911) for more information on delivery address options.

3. In the *Billing Address* section, select the necessary address or add a new one. 
    {% info_block infoBox "Info" %}

    To use the delivery address for the billing address, select the **Billing same as shipping** checkbox.
    
{% endinfo_block %}

4. To proceed to the **Shipment** step, click **Next**.
5. On the **Shipment** page, select the shipment method and click **Next**. This will save the changes. 
6. To add the changes to the Quote Request, click **Save and Back to Edit**. This will redirect you to the **Edit Quote Request** page. 

**Tips & Tricks**

On the **Address** and **Shipment** pages:

* (for the Shipment step only) If you want to return to the *Address* step, click **Back**.
* If you want to discard the changes, click **Cancel** in the Quote Request widget on top of the page. This will redirect you to the **Edit Quote Request** page without saving the added information.
![quote-request-edit-cancel](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/quote-request-edit-cancel.png){height="" width=""}
***
## Updating Delivery Information
You can update the delivery address or select another shipment method for the Quote Request. To do this, on the **Edit Quote Request** page, click **Edit address** or **Edit shipment method** respectively. Then, follow the steps from the *Adding Delivery Information* section.
{% info_block infoBox "Info" %}

Once the new delivery address is specified, the previously added shipment method is removed.

{% endinfo_block %}
***
## Editing a Shipment Price in the RFQ
You can update a shipment price for the item in the RFQ with the *In Progress* status only.

To edit a shipment price in the RFQ:

1. On top of the page, hover over **Quote Requests** and select the quote request for which you want to update the shipment price.
2. On the **View Quote Request** page, click **Edit**. The **Edit Quote Request** page opens.
3. Next to the shipment price, clear the **Use default price checkbox** for the item you want to update the price. The old shipment price becomes strikeout and an empty field for entering a new price is displayed.
    ![editing-shipment-price](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/editing-shipment-price.png){height="" width=""}
    
 4. Set the new shipment price and click **Save**. The updated information is saved, and the grand total is re-calculated.
{% info_block infoBox "Info" %}

If you change the shipment method, the previously entered shipment price will be removed and the Use default price checkbox will be selected by default.

{% endinfo_block %}
***
## Revising the RFQs and Sending to Buyers
{% info_block infoBox "Info" %}

RFQ version number changes upon each revision. Check [RFQ Versioning](https://documentation.spryker.com/docs/en/quotation-process-rfq-feature-overview-201907#rfq-versioning) to learn about the version change process.

{% endinfo_block %}
To respond to Buyers' Quote Requests and suggest them special prices, you need to revise the Quote Requests and send them to customers. You can revise the Quote Requests only in the *Draft*, *Waiting*, *In Progress*, and *Ready* statuses.

To revise a Quote Request:

1. On the **Quote Request** page, click **Revise** for the Quote with the *Draft* or *Waiting* status. See *Changing the Price for Products* for the detailed information on how to edit prices while revising a Quote Request.

{% info_block infoBox %}
Once you clicked Revise, the quote's status changes to* In Progress*. The Buyer also sees the quote status change on the **Customer Account -> Quote Request** page.
{% endinfo_block %}

If the Quote Request's status is *In Progress*, click **Edit**. 
Now you can:
a. *(Optional)* Update the RFQ details by:
 * Entering a **Purchase order number**.
 * Adding the **Notes**.
* Selecting a due date in the **Do not ship later than** field.
* Selecting the **Show the latest version to customer** checkbox to allow the Buyer to see the updates you have done in the RFQ.
* Adding a date until which the RFQ expires in the **Valid Till** field.
![Create RFQ agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/create-rfq-agent.png){height="" width=""}

b. *(Optional)* Change the prices for products in the RFQ and offer your customers a special price. To do that, clear **Use Default Prices** checkbox next to the product for which you want to update the price.
![Change a price for RFQ agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/change-price-rfq-agent.png){height="" width=""}

2. After the Quote Request has been revised, you can either **Save** it or **Send to Customer**.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/rfq-revise-agent.png)
Clicking **Save** means that the RFQ has been saved, however, the Buyer will not see these changes. The **Save** option is useful when you have not finished revising the RFQ yet and want to get back to it later.

Once you have finished revising the RFQ, you need to send it to the Buyer, so they can see your suggestion.

{% info_block infoBox %}
Clicking **Send to Customer** changes the quote's status to Ready. The customer can either convert the ready Quote Request to cart or request an even better price.
{% endinfo_block %}
