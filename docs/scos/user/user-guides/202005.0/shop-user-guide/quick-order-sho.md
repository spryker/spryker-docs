---
title: Shop Guide - Quick Order
originalLink: https://documentation.spryker.com/v5/docs/quick-order-shop-guide
redirect_from:
  - /v5/docs/quick-order-shop-guide
  - /v5/docs/en/quick-order-shop-guide
---


Quick Order page allows your customers to quickly find and buy products in just a few clicks. Use this page to create orders quickly and efficiently.

To open Quick Order Page, go to the header of the shop application → **Quick Order**.

![Quick order widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shop+Guide+-+Quick+Order/quick-order-widget.png){height="" width=""}

Here you can:

* Create a Quick Order
* Add Quick Order using Paste Your Order window
* Add products using Upload concrete products form
* Add Quick Order to Shopping List
* Add Quick Order to Shopping Cart
***
## Graphic User Interface

{% info_block infoBox %}
Hover your mouse over the numbers to view their description.
{% endinfo_block %}
<div class="mapster-container">
            <img class="mapster-image" src="https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shop+Guide+-+Quick+Order/quick-order-ui.png" usemap="#Map" data-mapster-config="" />
<map class="mapster-map" name="Map" id="Map">
                <area alt="" id="id1" href="#" shape="rect" coords="101,117,141,157" data-static-state="false" data-key="id1" data-tool-tip="Use this field to search for specific products. Start typing Product Name or SKU and you will see a drop-down box with the suggested product SKU or name combination." />
                <area alt="" id="id2" href="#" shape="rect" coords="267,67,307,108" data-static-state="false" data-key="id2" data-tool-tip="A base unit used for purchasing." />
                <area alt="" id="id3" href="#" shape="rect" coords="374,75,414,115" data-static-state="false" data-key="id3" data-tool-tip="Field to edit the number of items to be purchased." />
                <area alt="" id="id4" href="#" shape="rect" coords="528,74,569,114" data-static-state="false" data-key="id4" data-tool-tip="Price that is dynamically calculated depending on the number of items." />
                <area alt="" id="id5" href="#" shape="rect" coords="655,112,696,152" data-static-state="false" data-key="id5" data-tool-tip="Removes line." />
                <area alt="" id="id6" href="#" shape="rect" coords="141,596,181,637" data-static-state="false" data-key="id6" data-tool-tip="Adds more input fields to order." />
                <area alt="" id="id7" href="#" shape="rect" coords="369,644,409,685" data-static-state="false" data-key="id7" data-tool-tip="Adds items to cart." />
                <area alt="" id="id8" href="#" shape="rect" coords="369,698,410,737" data-static-state="false" data-key="id8" data-tool-tip="Creates a new order. In the B2B demo shop, this icon is hidden by default." />
                <area alt="" id="id9" href="#" shape="rect" coords="369,751,410,791" data-static-state="false" data-key="id9" data-tool-tip="Adds the items to a shopping list." />
                <area alt="" id="id10" href="#" shape="rect" coords="371,810,411,850" data-static-state="false" data-key="id10" data-tool-tip="Name of the shopping list items will be added to. You can select any existing shopping list from the drop-down list." />
                <area alt="" id="id11" href="#" shape="rect" coords="719,600,757,641" data-static-state="false" data-key="id11" data-tool-tip="Clears quick order page." />
                <area alt="" id="id12" href="#" shape="rect" coords="904,100,945,140" data-static-state="false" data-key="id12" data-tool-tip="The field where you can paste existing order details. To paste an order, enter item # and quantity separated by spaces, semicolons or commas." />
                <area alt="" id="id13" href="#" shape="rect" coords="905,334,945,375" data-static-state="false" data-key="id13" data-tool-tip="This widget allows shopper to upload an order using a CSV file." />
            </map>
        </div>
        
{% info_block warningBox %}
You can configure a drop-down list with available carts on project level. By default, this box is hidden.
{% endinfo_block %}

{% info_block infoBox %}
The **Add to Shopping List** button is only available for the authorized users.
{% endinfo_block %}
***
## Creating a New Quick Order

To **create a new quick order**, do the following:

1. On the **Quick Order** page, populate all required information: enter the product SKU or Item Name and the required Quantity.

{% info_block warningBox %}
Keep in mind, that if quantity restrictions apply to the product, they will be reflected here as well. See Quantity Restrictions for Quick Order to learn more about how the quantity limitations are applied to the Quick Order form.
{% endinfo_block %}
2. Click **Create Order**.
***
## Adding the Products to the Quick Order Form in Bulk

You can bulk add the products by using **Paste your Order** window. To do so:

1. Prefill the field according to your project settings.
2. Click **Verify**.
3. The available products will be listed in the Quick Order form.

{% info_block warningBox %}
By default, [SKU, Qty] format is used for filling the form in Spryker B2B Demo Shop.
{% endinfo_block %}

![Add articles section](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shop+Guide+-+Quick+Order/quick-order-add-articles.png)
***
## Uploading Products Using Upload Form

{% info_block warningBox %}
This option is only available if you installed File Upload Concrete Products feature.
{% endinfo_block %}

To upload the products using the upload form, do the following:

1. Browse a .csv file by clicking **Browse File** area:
![Browse file](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shop+Guide+-+Quick+Order/upload-your-order-browse-file.png) 

{% info_block infoBox %}
You can download a file template by clicking **Click here to download a csv template**:![Download a .csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shop+Guide+-+Quick+Order/upload-your-order-download-template.png
{% endinfo_block %})

2. Click **Upload** to add the items to quick order page.
***
## Adding a Quick Order to a Shopping List

To add a quick order to a shopping list, do the following:

1. On the **Quick Order** page, populate all the required information: enter the product SKU or product name and the required quantity.
2. Select the required Shopping List in the drop-down list, if necessary.
![Select the required Shopping List](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shop+Guide+-+Quick+Order/select-list-quick-order.png){height="" width=""}
3. Click **Add to Shopping List**.

## Adding a Quick Order to a Shopping Cart

To add a quick order to a shopping cart, do the following:

1. On the **Quick Order** page, populate all required information: enter the product SKU or item name and the required quantity.
2. Click **Add to Shopping Cart**.
***
**What's next?**
* [Go to Checkout](https://documentation.spryker.com/docs/en/checkout-shop-guide-201911)
