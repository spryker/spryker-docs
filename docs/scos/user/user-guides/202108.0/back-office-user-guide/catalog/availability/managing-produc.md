---
title: Managing products availability
originalLink: https://documentation.spryker.com/2021080/docs/managing-products-availability
redirect_from:
  - /2021080/docs/managing-products-availability
  - /2021080/docs/en/managing-products-availability
---

This topic describes the actions you can do in the **Availability** section of  the Back Office.

## Prerequisites 

To start working with availability, navigate to **Catalog > Availability**.

Here, inventory managers or other team members responsible for stock updates can check and edit the products' stock.

The main advantage is that you do not need to make any manual calculations. The system does all the calculations automatically, and you get the aggregated availability value. You will have a single table with a comparison of the product's stock value and the ordered value. It also calculates the bundled products stock. 

Each section contains reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.

## Checking availability 

To check the product availability:

1. In the _Actions_ column of the *Products availability list* table, click **View** next to the corresponding product item. 
This will take you to the *Product Availability* page.
2. In case of a multistore setup, in the **Store** drop-down, select the store locale to check the product's availability for each specific locale.

### Reference information: Checking availability 

This section describes attributes you see when checking availability.

#### Overview of Products Availability page

On the *Overview of Products Availability* page, you see the following: 
* The SKUs and names of the abstract products and the SKU values is a hyperlink to this product Edit page.
* The number of products in current stock and the number of reserved products (meaning ordered ones)
*  The identifier for the bundled product and for those that are **never out of stock** (Yes/No values)

#### Product Availability page

On the *Product Availability* page, you see 2 sections:
* Abstract product availability 
* Variant availability

The *Abstract product availability* section is not modifiable. It only provides overview information. As the abstract product itself does not have any stock, the Current Stock value will display the summarized value of all its variants.

Unlike *Abstract product availability*, *Variant availability* provides you with an option to edit stock. You invoke the edit stock flow from the *Actions* column. It also has the identifier of the product bundle.

Both sections contain the following info:
* The SKU and name of the abstract product/product variant
* The availability value, the number of products in current stock, and the number of reserved products (meaning ordered ones)
* The identifier for the **never out of stock** (Yes/No values)

## Editing stock

To edit the product stock:

1. On the *Product Availability* page of the product whose variant availability you would like to change, click **Edit Stock** for the corresponding variant.
2. On the *Edit Stock* page, specify the quantity for the product (for the needed warehouse, if several are set up).
3. Select **Never out of stock** if you want the product to be always available.
4. Click **Save**.

{% info_block infoBox %}

Product stock the DECIMAL(20,10) value, which means that your product stock can be 20 digits long and have a maximum of 10 digits after the comma. For example, *1234567890.0987654321*.

{% endinfo_block %}

</br>To edit the bundled product stock:

1. Navigate to the *Product Availability* page of a bundle whose bundled product variant availability you would like to change.
2. Click **View bundled products** in the *Variant availability* table.
3. In the *Bundled products* table that opens, click **Edit Stock** for the corresponding variant.
4. On the *Edit Stock* page, specify **Quantity** for the product (for the needed warehouse if several are set up).
5. Select **Never out of stock** if you want the product to be always available.
6. Click **Save**.

{% info_block warningBox "Note" %}
Please note that you are updating the product variant availability, not the bundle availability itself. To see examples of how the bundle availability is calculated, see [Availability calculation example](#availability-calculation-example
{% endinfo_block %}.)

**Tips & tricks**

You can edit stock for variants from the *Edit Concrete Product* page:
1. Navigate to the *Edit Product Abstract* using one of the following options:
    1.  **Products** > **Products** > **Edit**.
    2.  Click a hyperlinked SKU value in the **Availability** > **Product availability list** table.
2. In the *Variants* tab, click **Edit** next to the variant for which you would like to update the stock value.
3. Go to the *Price&Stock* tab.
4. Enter **Quantity** and select **Never out of stock** if you want the product to be always available.
5. Click **Save**.

{% info_block infoBox "Info" %}
Once on the *Edit Concrete Product* page, you can update any of the product details you need.
{% endinfo_block %}

### Reference information: Editing stock

The following table describes the attributes you see and enter when editing stock:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Stock Type | Name of the corresponding warehouse. The field is auto-populated and is not editable.|
| Quantity | Number of products available in the stock for a specific store and warehouse. |
| Never out of stock | Checkbox to set the product to be always available in a specific store and warehouse. Meaning even if the quantity is set to 0, the product will still be available. This option is usually used for digital items, like Gift Cards, for example.|
| Available in stores | This value is auto-populated according to your store setup and is not modifiable in UI. This just identifies for which store you define the product availability value. |

#### <a id="availability-calculation-example"></a>Availability calculation example

A good example of availability calculation is a product bundle. 
Let's say you have two products: a Smartphone and three Glass Screen Protectors for it. They are presented in the store as separate items but also included in a bundle.

This means that a customer can either buy those separately from their product details pages or buy a "smartphone+3 glass screen protectors" bundle.

Each product has its own stock and availability value if to buy separately.
But in case of a bundle, the availability is calculated based on each item's availability, taking into account their **quantity in the bundle**.

Even if each item is available on its own, but the availability does not meet the minimum quantity for a bundle (e.g., there are only two glass screen protectors, but the bundle goes with three), then all bundle is **unavailable**.
