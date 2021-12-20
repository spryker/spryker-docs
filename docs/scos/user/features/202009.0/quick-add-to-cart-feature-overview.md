---
title: Quick Add to Cart feature overview
description: On the Quick Add to Cart form in the web-shop, a customer can enter product SKU and Quantity and proceed by adding it to cart or by creating an order right away.
last_updated: Mar 24, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/quick-add-to-cart-feature-overview
originalArticleId: d680275e-6c80-4870-9df1-22359a40f91f
redirect_from:
  - /v6/docs/quick-add-to-cart-feature-overview
  - /v6/docs/en/quick-add-to-cart-feature-overview
  - /v6/docs/quick-add-to-cart
  - /v6/docs/en/quick-add-to-cart
---

The *Quick Order* feature allows placing bulk orders for wholesale and returning customers.

On the *Quick Order* page, customers can add multiple products along with the required quantities in a fast and efficient way. They can search for a specific concrete product by SKU or name with the help of Search Widget for Concrete Products. When starting to fill out the *SKU/Name* field, a drop-down list with auto-suggested appropriate items appears. A shop visitor can select the concrete product by clicking on it in the drop-down list.

{% info_block infoBox %}
Use the Tab button to automatically fill in a partially typed product name or SKU.
{% endinfo_block %}
{% info_block infoBox %}
By default, we use SKU as a product identifier for filtering the results. The identifier determines what input to validate in the *SKU/Name* field. You can configure to use more than one identifier such as EAN, GTIN, or Article number on the project level by changing the template in the `ProductSearchWidget` module and use any of the available fields for the product.
{% endinfo_block %}
To view how to create a quick order, see [Quick Order on the Storefront](#quick-order-on-the-storefront).
<!--- ![Quick Order page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/quick-order-page.png)
--->

As a shop owner, you can also integrate the Quick Order with [Measurement Units](/docs/scos/user/features/{{page.version}}/measurement-units-feature-overview.html). Thus, when the product is selected, the base measurement unit for that product appears in the "Measuring Unit" column.

{% info_block errorBox %}

The integration is possible only if the Measurement Units feature is enabled in your project.

{% endinfo_block %}

Moreover, after adding a quick order to cart, a shop owner can observe the default amount and default sales units for the product packaging unit in the cart overview.
![Quick Order packaging units](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/quick-order-packaging-units.png)

When the customer has found the products they need, they can set the quantity of each product using a scroll-down box. By default, "1" is set in the *Quantity* field. If there are any quantity restrictions applied to the product, they are taken into account: the customer can choose only the value which meets the quantity restrictions. See [Quantity Restrictions for Quick Order](#quantity-restrictions-for-quick-order) to learn more about how the quantity limitations are applied to the *Quick Order* form.

Once the products and their quantities have been selected, the order can be:

* Moved to a shopping list
* Added to a shopping cart
* Checked out

{% info_block infoBox %}

For both Moved and Added to a Shopping List options, in a drop-down list you can select one of the shopping lists to automatically add the products.

{% endinfo_block %}

It is also possible to add products to cart in bulk. To do so, the customer adds SKUs and quantities of products in the *Paste your order* form, separating SKUs and quantities by one of the following separators, depending on specific project configuration:

* Spaces
* Semicolons
* Commas
* Other separators


{% info_block warningBox %}

However, separators should be the same for all products entered in this form at a time. If products and quantities are added in the correct format and with acceptable separators, but the separators are different for different products (for example, 1234567, 2 in one case and 1234568;3 in another, an error message is shown after verification. If SKUs and format have passed the verification, the products and their quantities are automatically entered in the* SKU* and *Qty* fields of the *Quick Order* form, and the customer can either add them to cart or create the order.

{% endinfo_block %}

## Quantity restrictions for Quick Order
Quick Order quantity rules fall under limitations set by [quantity restrictions](/docs/scos/user/features/{{page.version}}/non-splittable-products-feature-overview.html). Quantity restriction values define the number of items that customers can put into the cart.

When manually filling the *SKU/Name* field, the quantity selector allows a visitor to put the valid numbers based on [quantity restrictions](/docs/scos/user/features/{{page.version}}/non-splittable-products-feature-overview.html) set for that SKU. That means, for example, if a concrete product has the minimum quantity restriction for 4 units, the interval restriction to 2 units, and the maximum quantity is 12, the shopper can put 4, 6, 8, 10, and 12 items to cart.

The *Quantity* field in the Quick Order adheres to these quantities. Therefore, if the shopper enters an invalid number into the *Quantity* field, for instance, 5, the number will automatically change to the next higher quantity set in quantity restrictions, that is 6.

## Product prices for Quick Order
To see the price, a shop visitor has to select the concrete product and set the item quantity.

The price is displayed dynamically, taking into account the quantity, currency, store, and [merchant relation](/docs/scos/user/features/{{page.version}}/merchant-b2b-contracts-feature-overview.html) dimensions, respectively. If the item has any [volume prices](/docs/scos/user/features/{{page.version}}/prices-feature-overview/prices-feature-overview.html), the price is adjusted to the correct price set for the quantity the user has selected.

## File upload form for concrete products
To save your buyers' time and help them order the products in bulk quickly, enable your customers to use the *File Upload* form. The *File Upload* form allows users to add multiple products to the *Quick Order* page by uploading data using a .csv file.

{% info_block infoBox %}

You can update the project configuration in case you need to use other file formats.

{% endinfo_block %}


After the feature is integrated<!-- link to integration guide-->, a buyer can see a box on the *Quick Order* page:

![File Upload form](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/file-upload-form.png)

Buyers can upload a CSV by choosing a file from their local system or via drag & drop. To make the process more clear, they can download a sample CSV file and add the necessary data (SKU and Qty) there:

![File Upload csv file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/file-upload-csv.png)

{% info_block infoBox %}

Make sure to populate the product data in the following format: [CONCRETE_SKU, QUANTITY].
It is possible to upload only one file at a time.

{% endinfo_block %}

By default, only concrete SKUs are validated. On successful upload, items and quantities are extracted and filled out in the quick order form fields.

In case the quantity is not valid due to [quantity restrictions](/docs/scos/user/features/{{page.version}}/non-splittable-products-feature-overview.html) setting, the quantity is changed to a valid number.

If there are already products added to the quick order list, the products from the CSV file are added to the bottom of the quick order template.

## Quick Order on the Storefront

Using the Quick Order feature on the Storefront, company users can:
* Create a new quick order.
* Add products to the quick order in bulk.
* Upload products using the upload form.
* Add a quick order o a shopping list.
* Add a quick order to a shopping cart.

The following figure shows how to perform these actions:
![create-quick-order](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/create-quick-order.gif)
