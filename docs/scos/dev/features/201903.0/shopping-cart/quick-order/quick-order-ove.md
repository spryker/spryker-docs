---
title: Quick Order Feature Overview
originalLink: https://documentation.spryker.com/v2/docs/quick-order-overview
redirect_from:
  - /v2/docs/quick-order-overview
  - /v2/docs/en/quick-order-overview
---

Quick Order feature is an excellent solution for placing bulk orders for wholesale and returning customers.

On the Quick Order page, customers can add multiple products along with the required quantities in a fast and efficient way. They can search for a specific, concrete product by SKU or name with the help of Search Widget for Concrete Products. When starting to fill out the SKU/Name field, a drop-down list with auto-suggested appropriate items appears. A shop visitor can select the concrete product by clicking on it in the drop-down list.

{% info_block infoBox %}
Use the Tab button to automatically fill in a partially typed product name or SKU.
{% endinfo_block %}
{% info_block infoBox %}
By default, we use SKU as a product identifier for filtering the results. The identifier determines what input to validate in the SKU / Name field. You can configure to use more than one identifier such as EAN, GTIN or Article number on project level by changing the template in `ProductSearchWidget` module and use any of the available fields for the product.
{% endinfo_block %}

![Quick Order page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/quick-order-page.png){height="" width=""}

As a shop owner, you can also integrate the Quick Order with [Measurement Units](/docs/scos/dev/features/201903.0/packaging-and-measurement-units/measurement-units/measurement-uni). Thus, when the product is selected, the base measurement unit for that product appears in the "Measuring Unit" column.

{% info_block errorBox %}
The integration is possible only if the Measurement Units feature is enabled in your project.
{% endinfo_block %}
Moreover, after adding the Quick Order to cart, a shop owner can observe the default amount and default sales units for the product packaging unit in cart overview.
![Quick Order packaging units](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/quick-order-packaging-units.png){height="" width=""}

When the customer has found the products they need, they can set the quantity of each product using a scroll-down box. By default, "1" is set in the Quantity field. If there are any quantity restrictions applied to the product, they are taken into account: the customer can choose only the value which meets the quantity restrictions. See [Quantity Restrictions for Quick Order](https://documentation.spryker.com/v2/docs/quick-order-overview-201903#quantity-restrictions-for-quick-order) to learn more about how the quantity limitations are applied to the Quick Order form.

Once the products and their quantities have been selected, the order can be:

* Moved to a Shopping List
* Added to a Shopping Cart
* Checked out

{% info_block infoBox %}
For both Moved and Added to a Shopping List options, in a drop-down list you can select one of the shopping lists to automatically add the products.
{% endinfo_block %}
It is also possible to add products to cart in bulk. To do so, the customer adds SKUs and quantities of products in the Paste your order form, separating SKUs and quantities by one of the following separators, depending on specific project configuration:

* spaces
* semicolons
* commas
* other separator


{% info_block warningBox %}
However separators should be the same for all products entered in this form at a time. If products and quantities are added in correct format and with acceptable separators, but the separators are different for different products (for example, 1234567, 2 in one case and 1234568;3 in another
{% endinfo_block %}, an error message is shown after verification. If SKUs and format have passed the verification, the products, and their quantities are automatically entered in SKU and Qty fields of Quick Order form and the customer can either add them to cart or create the order.)

The module relations can be schematically represented in the following diagram:

![Module relations schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/quick-add-to-cart-2-modules.png){height="" width=""}

## Quantity Restrictions for Quick Order
Quick Order quantity rules fall under limitations set by [quantity restrictions](/docs/scos/dev/features/201903.0/product-management/product-quantity-restrictions/product-quantit). Quantity restriction values define the number of items that customer can put into the cart.

When manually filling an SKU/Name field, the quantity selector allows a visitor to put the valid numbers based on [quantity restrictions](/docs/scos/dev/features/201903.0/product-management/product-quantity-restrictions/product-quantit) set for that SKU. That means, for example, if a concrete product has the minimum quantity restriction for 4 units, the interval restriction to 2 units, and the maximum quantity is 12, the shopper can put 4, 6, 8, 10, and 12 items to cart.

The Quantity field in the Quick Order adheres to these quantities. Therefore, if the shopper enters an invalid number into Quantity field, for instance, 5, the number will automatically change to the next higher quantity set in quantity restrictions, that is 6.

## Product Prices for Quick Order
To be able to see the price, a shop visitor has to select the concrete product and set the item quantity.

The price is displayed dynamically taking into account the quantity, currency, store and [merchant relation](/docs/scos/dev/features/201903.0/company-account-management/merchants-and-merchant-relations/merchants-and-m) dimensions respectively. If the item has any [volume prices](/docs/scos/dev/features/201903.0/price/volume-prices/volume-prices), the price is adjusted to the correct price set for the quantity the user has selected.

## File Upload Form for Concrete Products
To save your buyers' time and help them order the products in bulk quickly, enable your customers to use the File Upload form. The File Upload form allows users to add multiple products to the Quick Order page by uploading data using CSV formatted file.

{% info_block infoBox %}
You can update the project configuration in case you need to use other file formats.
{% endinfo_block %}


After the feature is integrated <!-- link to integration guide-->, a buyer can see a box on the Quick Order page:

![File Upload form](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/file-upload-form.png){height="" width=""}

A shopper can upload a CSV by choosing a file from their local system or via drag & drop. To make the process more clear, a buyer can download a sample CSV file and add the necessary data (SKU and Qty) there:

![File Upload csv file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/file-upload-csv.png){height="" width=""}

{% info_block infoBox %}
Make sure to populate the product data in the following format: [CONCRETE_SKU, QUANTITY]
It is possible to upload only one file at a time.
{% endinfo_block %}
By default, only concrete SKUs are validated. On successful upload, items and quantities are extracted and filled out in the quick order form fields.

In case the quantity is not valid due to [quantity restrictions](/docs/scos/dev/features/201903.0/product-management/product-quantity-restrictions/product-quantit) setting, the quantity is changed to a valid number.

If there are already products added to to the quick order list, the products from the CSV file are added to the bottom of the quick order template.

Module relations are represented in the following schema:

![Module relations schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/file-upload-form-module-schema.png){height="" width=""}

<!-- Last review date: Nov 7, 2018-- by Helen Kravchenko -->
