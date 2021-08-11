---
title: Managing product offers
description: This topic describes the actions a Merchant can do in the Offers section in the Merchant Portal.
template: back-office-user-guide-template
---

This topic describes the actions a Merchant can do in the Offers section in the Merchant Portal.

## Prerequisites

To start managing product offers, navigate to the **Merchant Portal > Offers**.

Review the reference information in this article before you start, or just look up the necessary information as you go through the process.

## Creating a product offer

To create a product offer:

1. Click **+Add Offer**.
2. On the _Create Offer_ page, in the list of concrete products, click on the necessary product you want to create an offer for, or hover over the three dots and then click **Create Offer**. The drawer opens.
3. In the _Offer status_ pane, select the **Offers is Active** check box to make the product offer visible on the Storefront. Otherwise, skip this step.
4. In the _Merchant SKU_ pane, enter an SKU.
5. In the _Stores_ pane, from the drop-down list, select stores for which the offer is available.
6. In the _Available Stock_ pane, set configure the product offer quantity:
    1. In the **QUANTITY** field, enter the quantity of the product currently available in stock.
    2. (Optional) Select **Always in Stock** to make the product offer always available in terms of stock. Otherwise, when the number of orders exceeds the number of products set in the **QUANTITY** field, the product offer becomes out-of-stock on the Storefront.
7. In the _Price_ pane, click **+Add** to set the price for your offer per store. The empty fields appear in the table below.
   1. From the **Store** drop-down list, select the store for which the price is created.
   1. From the **Currency** drop-down list, select the currency in which the price is defined.
   1. In the **NET DEFAULT** field, enter a default net price. Use the period(.) separator for decimal values.
   1. In the **GROSS DEFAULT** field, enter a default gross price. Use the period(.) separator for decimal values.
   1. (Optional) In the **NET ORIGINAL** field, enter an original net price. Use the period(.) separator for decimal values.
   1. (Optional) In the **GROSS ORIGINAL** field, enter an original gross price. Use the period(.) separator for decimal values.
8. Repeat step 7 to set the price for other stores. Otherwise, proceed to the next step.
9. In the _Validity Dates_ pane, set the dates when the offer is valid.

<div class="width-100">

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Offers/create-offers.gif)

</div>

## Editing a product offer

To edit an existing product offer:

1. On the _Offers_ page, in the list of offers, click on the necessary product offer you want to edit, or hover over the three dots and then click **Manage Offer**. The drawer opens.
2. Change the necessary fields and click **Save**.

<div class="width-100">

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Offers/edit-offers.gif)

</div>

### Reference information: Creating/editing a product offer

This section describes attributes you see when creating or editing a product offer.

**Tips & tricks**
<br>You can rearrange the columns' order, hide and show the columns by clicking the settings cogwheel next to the table.

### Create/edit offer drawer

The following table describes the attributes on the *Create/Edit offer* drawer:

| ATTRIBUTE | DESCRIPTION |
| ------------- | ------------- |
| Offer visibility | Toggle in the _Offer status_ pane that defines whether the offer appears online and is available for buyers. By default, the offer is online. |
| Merchant SKU     | Unique identifier of the merchant in their ERP.             |
| Offer Reference  | Unique ID that helps identify the product offer in the Marketplace. Offer Reference is mandatory. |
| Stores           | Defines the store where the product offer is available.      |
| Stock            | Defines the stock for the product offer.                     |
| Price            | Price for the offer per store and currency defined by the merchant. |
| Validity Dates   | Specifies the period during which the product offer is visible on the Storefront. |
