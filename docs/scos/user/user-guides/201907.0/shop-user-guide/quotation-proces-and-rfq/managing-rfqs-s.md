---
title: Shop Guide - Managing Requests for Quotes for a Sales Representative
originalLink: https://documentation.spryker.com/v3/docs/managing-rfqs-sales-rep-shop-guide
redirect_from:
  - /v3/docs/managing-rfqs-sales-rep-shop-guide
  - /v3/docs/en/managing-rfqs-sales-rep-shop-guide
---

This topic describes the procedure for managing the RFQs from the perspective of the Sales Representative.

{% info_block infoBox %}
To be able to perform the tasks, you need to be logged into an Agent Account. Try using our [test agent account](http://www.b2b.demo-spryker.com/agent/login
{% endinfo_block %}, the username is `admin@spryker.com`, password is `change123`.)

A Sales Representative can manage the RFQs by:

* Viewing the RFQs for the company.
* Editing the items in the RFQ.
* Suggesting prices by editing them directly in the RFQs.
* Creating RFQs for customers.
***
## Viewing the RFQs

To view the RFQs created both by yourself as a Sales Representative or by customers, hover over the **Quote Request Widget** in the header. In the **Quote Request Widget**, 5 last RFQs are shown. To view all the RFQs, click **View all requests** in the **Quote Request Widget**.
![Quote request widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/quote-request-widget.png){height="" width=""}
***
## Editing Items in an RFQ

You, as a Sales Representative, can also edit items in an RFQ. 

To edit items in an RFQ:

1. On the **Quote Request** page, click **Edit**.
2. On the **Edit RFQ** page, click **Edit Items**.
![Edit items agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/edit-items-agent1.png){height="" width=""}

 You can change the item quantity, measurement units, remove the existing products from the RFQ or add the products from the catalog.
3. Click **Save and Back to Edit** in **Quote Request Widget** after you have finished. The changes will be saved to an RFQ.
![Edit items agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/edit-items-agent.png){height="" width=""}
***
## Revising the RFQs and Sending to Customers

To respond to customers' Quote Requests and suggest them special prices, you need to revise the Quote Requests and send them to customers. To revise a Quote Request:

1. On the **Quote Request** page, click **Revise**, if the Quote is in the *Draft* or *Waiting* status. See *Changing the Price for Products* for the detailed information on how to edit prices while revising a Quote Request.

{% info_block infoBox %}
Once you clicked **Revise**, the quote's status changes to In Progress. The customer also sees the quote status change in the **Customer Account -> Quote Request** page. 
{% endinfo_block %}

If the Quote Request's status is *In Progress*, click **Edit**. 
Now you can:
a. *(Optional)* Update the RFQ details by:
* Selecting **Show the latest version to customer** check box to allow the Buyer to see the updates you have done in the RFQ.
* Entering a **Purchase order number**.
* Selecting a due date in **Do not ship later than** field.
* Adding the **Notes**.
* Adding a date until which the RFQ is right in **Valid Till** field.
![Create RFQ agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/create-rfq-agent.png){height="" width=""}

{% info_block warningBox %}
If you check the **Show latest version to customer** checkbox, the customer will see the updates you did after the RFQ is sent back.
{% endinfo_block %}

b. *(Optional)* Change the prices for products in the RFQ and offer your customers a special price. To do that, untick **Use Default Prices** check box next to the product the price of which you want to update.
![Change a price for RFQ agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/change-price-rfq-agent.png){height="" width=""}

2. After the Quote Request has been revised, you can either **Save** it or **Send to Customer**.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/rfq-revise-agent.png)
If you save the RFQ, it will just be saved with the changes you made, the customer will not see the changes. The **Save** option is useful when you have not finished revising the RFQ yet and want to get back to it later. Once you have finished revising the RFQ, you need to send it to the customer, so they can see your suggestion. 

{% info_block infoBox %}
Clicking **Send to Customer** changes the quote's status to Ready. The customer can either convert the ready Quote Request to cart or request an even better price.
{% endinfo_block %}
***
## Creating an RFQ for a Customer

A Sales Representative can create an RFQ for a customer if for some reason the customer can not do it. Also, a Sales Representative can create a price suggestion for a customer on their own initiative, without the customer's request.

To create an RFQ for a customer:

1. Hover over the **Quote Request Widget** in the header.
2. Click **Create new Quote Request**.
3. On the **Create Quote Request** page, start entering the customer's name for whom the Quote Request is being created.
![Create Quote Request](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/create-RFQ-for-customer-select.png){height="" width=""}

4. From the drop-down list of suggestions, select the necessary customer.
5. Click **Save**.
6. *(Optional)* Edit the Request for Quote. Click **Edit** to:
  - Select **Show the latest version to customer** check box to allow the Buyer to see the updates you have done in the RFQ.
  - Enter a **Purchase order number**.
  - Select a due date in **Do not ship later than** field.
  - Add the **Notes**.
  - Add a date until which the RFQ is right in **Valid Till** field
![Create RFQ agent](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Sales+Representative/create-rfq-agent.png){height="" width=""}

If the **Show the latest version** to customer checkbox is not selected, the company user will not be able to access the RFQ in their account.
  - Add products to the RFQ by clicking **Edit Items** on the **Edit** page.

<!-- Last review date: Jul 09, 2019 -->
