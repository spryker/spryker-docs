---
title: Check availability of products
description: Learn how to edit stock of products in the Back Office.
last_updated: June 3, 2022
template: back-office-user-guide-template
---


## Edit stock of a product variant


1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Availability**.
2. Next to the abstract product owning the product variant you want to edit the stock of, click **View**.
    This opens the **Product Availability** page.
3. Next to the product variant you want to edit the stock of, click **Edit Stock**.
4. On the **Edit Stock** page, enter **QUANTITY** per needed **STOCK TYPE**.
5. For **NEVER OUT OF STOCK** per **STOCK TYPE**, do the following:
      * To make the product available regardless of its stock, select the checkbox.
      * To make the product available only if its stock is more than 0, clear the checkbox.
6. Click **Save**.
    This refreshes the page with a success message displayed.


{% info_block infoBox %}

Product stock the DECIMAL(20,10) value, which means that your product stock can be 20 digits long and have a maximum of 10 digits after the decimal separator. For example, *1234567890.0987654321*.

{% endinfo_block %}

## Edit stock of a product variant in a product bundle

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Availability**.
2. Next to the product bundle owning the product variant you want to edit the stock of, click **View**.
    This opens the **Product Availability** page.
3. In the **VARIANT AVAILABILITY** pane, next to the needed product bundle, click **View bundled products**.
    This opens the **BUNDLED PRODUCTS**.
4. Next to the product variant you want to edit the stock of, click **Edit Stock**.
5. On the **Edit Stock** page, enter **QUANTITY** per needed **STOCK TYPE**.
6. For **NEVER OUT OF STOCK** per **STOCK TYPE**, do the following:
      * To make the product available regardless of its stock, select the checkbox.
      * To make the product available only if its stock is more than 0, clear the checkbox.
7. Click **Save**.
    This refreshes the page with a success message displayed.


{% info_block warningBox "Note" %}

Please note that you are updating the product variant availability, not the bundle availability itself. To see examples of how the bundle availability is calculated, see [Availability calculation example](#availability-calculation-example).

{% endinfo_block %}


### Reference information: Edit stock of products and product bundles

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| STOCK TYPE | Name of the warehouse the stock is located in. |
| QUANTITY | Number of products available in stock per warehouse. |
| NEVER OUT OF STOCK | Defines if the product is available regardless of its stock per warehouse. Meaning even if the quantity is set to 0, the product will still be available. This option is usually used for digital items, like Gift Cards, for example.|
| Available in stores | This value is auto-populated according to your store setup and is not modifiable in UI. This just identifies for which store you define the product availability value. |

#### <a name="availability-calculation-example"></a>Availability calculation example

A good example of availability calculation is a product bundle.
Let's say you have two products: a Smartphone and three Glass Screen Protectors for it. They are presented in the store as separate items but also included in a bundle.

This means that a customer can either buy those separately from their product details pages or buy a "smartphone+3 glass screen protectors" bundle.

Each product has its own stock and availability value if to buy separately.
But in case of a bundle, the availability is calculated based on each item's availability, taking into account their **quantity in the bundle**.

Even if each item is available on its own, but the availability does not meet the minimum quantity for a bundle (e.g., there are only two glass screen protectors, but the bundle goes with three), then all bundle is **unavailable**.
