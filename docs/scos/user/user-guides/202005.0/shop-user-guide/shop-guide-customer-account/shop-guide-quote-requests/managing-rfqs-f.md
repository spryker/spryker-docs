---
title: Shop Guide - Managing Requests for Quotes for a Buyer
originalLink: https://documentation.spryker.com/v5/docs/managing-rfqs-for-buyer-shop-guide
redirect_from:
  - /v5/docs/managing-rfqs-for-buyer-shop-guide
  - /v5/docs/en/managing-rfqs-for-buyer-shop-guide
---

This topic describes the procedure for managing the Request for Quotes (RFQs) from the Buyer perspective:

* How to edit the RFQs and their items.
* How to add and update a delivery address and a shipment method.
* How to send an RFQ to a Sales Representative, accept the new prices or negotiate a better price than suggested.
* How to cancel the RFQs.

You can start managing quote requests on the **Edit Quote Request** page. To navigate to this page, use one of the following options:

* On the **Cart** page, create an RFQ from the **Cart** page. See [Creating an RFQ](https://documentation.spryker.com/docs/en/creating-rfq-shop-guide) for more information. Then, on the **Quote Request** page, click **Edit**.
* In the **Customer Account > Quote Requests** section, in the *Actions* column, click the **View** icon for the quote request in the *Dr*aft status you want to edit. Then, on the **View Quote Request** page, click **Edit**.

See [RFQ: Reference Information](https://documentation.spryker.com/docs/en/rfq-reference-information-shop-guide) for details on components the Quote Request page consists of.
***
## Adding Delivery Information
Once you created a Quote Request, you can set a delivery address and select a shipment method.

To add a delivery address and a shipment method:

1. On the** View Quote Request** page, click **Edit**.

2. On the **Edit Quote Request** page, click **Add address**. This will redirect you to the **Address** page where you can select one of the following options and populate the fields:
    * **Define new address** to add the delivery address for the whole order. This will open the form to populate the fields with the necessary information.
    * Select one of the existing addresses.
    * Deliver to multiple addresses to set a delivery address per item. See [Shop Guide - Delivery Address](https://documentation.spryker.com/docs/en/address-step-shop-guide-201911) for more information.

3. In the Billing Address section, select the necessary address or add a new one.
{% info_block infoBox "Info" %}

If you want to use the shipping address for the billing address as well, select the **Billing same as shipping** checkbox. 

{% endinfo_block %}

4. To proceed to the **Shipment** page, click **Next**. 
{% info_block infoBox "Info" %}

On the **Edit Quote Request** page, clicking **Add shipment method** should redirect you to the **Shipment** page. However, if the delivery address has not been specified before, the **Address** page will open to first add the delivery address and then shipment method. 

{% endinfo_block %}
5. Select the shipment method and the delivery date (if needed), and click **Save**. The Quote Request will be updated successfully and redirect you to the **Edit Quote Request** page.

**Tips & Tricks**
You can add a delivery address and a shipment method during the checkout prior to creating a Quote Request. To do this, follow the instructions in the [Address](https://documentation.spryker.com/docs/en/address-step-shop-guide-201911) and [Shipment](https://documentation.spryker.com/docs/en/shipment-step-shop-guide-201911) steps. Once done, the changes will be saved. To proceed with the quote request, click **Back to Cart**.
___

## Editing an RFQ
You can update the RFQ information, including a delivery address and a shipment method for the RFQs with the *Draft* status.

To update the quote request information, on the **Edit Quote Request** page, change the purchase order number, the due date, and notes.

### Editing the Items in the RFQ
To edit the items:

1. On the **Edit Quote Request** page, click **Edit Items**.
You can change the item quantity, remove the existing products from the RFQ or add the products.
Keep in mind that measurement units cannot be updated. You can only add a new product with different measurement units.

{% info_block infoBox "Info" %}

Keep in mind that measurement units cannot be updated. You can only add a new product with different measurement units.

{% endinfo_block %}

2. To add products to the quote request, use one of the following options:
    * On the **Cart** page in the **Quick add to Cart** widget, enter a SKU or a name of the concrete product and its quantity, and click **Add to Cart**.
![quick-add-to-cart-widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Buyer/quick-add-to-cart-widget.png){height="" width=""}
    * From the catalog, select the product, choose the options and quantity, and click **Add to Cart**.
    * On the **Quick Order** page, enter a SKU or a name of the concrete product and its quantity, and click **Add to Cart**. For more information on Quick Order, see [Shop Guide - Quick Order](https://documentation.spryker.com/docs/en/quick-order-shop-guide).
    * On the **Shopping list** page, click the shopping list, select the checkboxes for the items you want to add from the shopping list, and click **Add to Cart**. For more information on Quick Order, see [Shop Guide - Shopping Lists](https://documentation.spryker.com/docs/en/shopping-lists-shop-guide).

3.  To keep changes, click **Save and Back to Edit**. The Quote Request will be updated.

**Tips & Tricks**
If you want to update the item quantity, enter the value in the Quantity field and click the **Refresh** icon.

![change-quantity-in-cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Buyer/change-quantity-in-cart.png){height="" width=""}
___

### Updating Delivery Information
To edit a delivery address and a shipment method:

1. On the **Edit Quote Request** page, click **Edit address** for the *Addresses* section and **Edit shipment method** for the *Shipment method* section. This will redirect you to the **Address** and **Shipment** pages respectively.

{% info_block infoBox "Info" %}

If the delivery address hasn’t been defined yet, the Address step will open first. Thus, you’ll need to add the delivery address and then proceed with updating the shipment method.

{% endinfo_block %}
![update-delivery-information](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/RFQ/Shop+Guide+-+Managing+Requests+for+Quotes+for+a+Buyer/update-delivery-information.png){height="" width=""}

2. On the **Address** page, select the new delivery and billing addresses. See [Shop Guide - Delivery Address](https://documentation.spryker.com/docs/en/address-step-shop-guide-201911) for more information on the options you have in the **Select a delivery address** field.

3. To proceed to the **Shipment** tab, click **Next**.

{% info_block infoBox "Info" %}

Once the delivery address is defined, the previously added shipment method is removed.

{% endinfo_block %}

4. On the **Shipment** page, select the shipment method and delivery date (if needed), and click **Save**. This will save the changes and add them to the quote.

**Tips & Tricks**

On the **Address** and **Shipment** pages:

* If you want to discard the changes, click **Cancel** or **Back to Quote** (on top of the page). This will redirect you to the **Edit Quote Request** page and the updated delivery address and shipment method will not be saved. 
* (for the Shipment page only) If you want to return to the **Address** page, click **Back** at the bottom of the page. 

On the **Edit Quote Request** page, you can return to the **View Quote Request** page by clicking **Back to View**.
___

## Sending an RFQ to a Sales Representative
To request a lower price for a cart after you created an RFQ, send the RFQ to a Sales Representative:

* On the **Edit Quote Request** page: Click **Send to Agent**. 
* In the **Customer Account -> Quote Requests** section: Click the **View** icon for the quote request and on the Quote Request page, click **Send to Agent**. 

This will send the Quote Request to a Sales Representative for further processing. Once the Sales Representative has started reviewing your RFQ, the RFQ’s status will change to Waiting.

To check the RFQ's status, navigate to the **Customer Account -> Quote Requests** section.

See [Buyer Workflow](https://documentation.spryker.com/docs/en/quotation-process-rfq-feature-overview-201907#buyer-workflow) for more information on quote request statuses and workflow.
___

## Processing a Ready RFQ
Once a Sales Representative has prepared a price suggestion and sent it to you, your RFQ will acquire the Ready status on **Quote Request** page. You can either accept the suggestion by converting the request to cart, or you can request an even better price.

To convert an RFQ to cart, on the **View Quote Request** page for the RFQ that is in the Ready status, click **Convert to Cart**.

After that, you can continue to [Checkout](https://documentation.spryker.com/docs/en/checkout-shop-guide-201911).

To request an even better price, **revise** the RFQ.
{% info_block warningBox "Note" %}

RFQ version number changes upon each revision. Check RFQ Versioning to learn about the version change process.

{% endinfo_block %}
___
## Revising the RFQ
To request an even better price for an RFQ with the Ready status, revise the RFQ:

1. On the **View Quote Request** page, click **Revise**.
2. On the **Edit Quote Request** page, follow the steps in Editing an RFQ. < -- link -->

{% info_block warningBox "Note" %}

RFQ version number changes upon each revision. Check RFQ Versioning to learn about the version change process.

{% endinfo_block %}
___
## Canceling an RFQ
An RFQ can be canceled in the statuses: Draft, Waiting, and Ready. 

To cancel the RFQ, on the **View Quote Request** page, click **Cancel**. The canceled RFQ will acquire the *Canceled* status and will be displayed on the **Customer Account > Quote Request** page with the *Canceled* status.

