## Editing stock


1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Availability**.
2. Next to the abstract product owning the product variant you want to edit the stock of, click **View**.
    This opens the **Product Availability** page.
3. Next to the product variant you want to edit the stock of, click **Edit Stock**.

4. On the **Edit Stock** page, enter **QUANTITY** per **STOCK TYPE**.
5. For **NEVER OUT OF STOCK** per **STOCK TYPE**, do the following:
      * To make the product available regardless of its stock, select the checkbox.
      * To make the product available only if its stock is more than 0, clear the checkbox.
6. Click **Save**.
      



3. Select **Never out of stock** if you want the product to be always available.
4. Click **Save**.

{% info_block infoBox %}

Product stock the DECIMAL(20,10) value, which means that your product stock can be 20 digits long and have a maximum of 10 digits after the decimal separator. For example, *1234567890.0987654321*.

{% endinfo_block %}

To edit the bundled product stock:

1. Navigate to the *Product Availability* page of a bundle whose bundled product variant availability you would like to change.
2. Click **View bundled products** in the *Variant availability* table.
3. In the *Bundled products* table that opens, click **Edit Stock** for the corresponding variant.
4. On the *Edit Stock* page, specify **Quantity** for the product (for the needed warehouse if several are set up).
5. Select **Never out of stock** if you want the product to be always available.
6. Click **Save**.

{% info_block warningBox "Note" %}

Please note that you are updating the product variant availability, not the bundle availability itself. To see examples of how the bundle availability is calculated, see [Availability calculation example](#availability-calculation-example).

{% endinfo_block %}

**Tips and tricks**
<br>You can edit stock for variants from the *Edit Concrete Product* page:
1. Navigate to the *Edit Product Abstract* using one of the following options:
    1.  **Products&nbsp;<span aria-label="and then">></span> Products&nbsp;<span aria-label="and then">></span> Edit**.
    2.  Click a hyperlinked SKU value in the **Availability&nbsp;<span aria-label="and then">></span> Product availability list** table.
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

#### <a name="availability-calculation-example"></a>Availability calculation example

A good example of availability calculation is a product bundle.
Let's say you have two products: a Smartphone and three Glass Screen Protectors for it. They are presented in the store as separate items but also included in a bundle.

This means that a customer can either buy those separately from their product details pages or buy a "smartphone+3 glass screen protectors" bundle.

Each product has its own stock and availability value if to buy separately.
But in case of a bundle, the availability is calculated based on each item's availability, taking into account their **quantity in the bundle**.

Even if each item is available on its own, but the availability does not meet the minimum quantity for a bundle (e.g., there are only two glass screen protectors, but the bundle goes with three), then all bundle is **unavailable**.
