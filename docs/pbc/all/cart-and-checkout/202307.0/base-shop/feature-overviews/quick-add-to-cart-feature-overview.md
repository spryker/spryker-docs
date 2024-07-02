---
title: Quick Add to Cart feature overview
description: On the Quick Add to Cart form in the web-shop, a customer can enter product SKU and Quantity and proceed by adding it to cart or by creating an order right away.
last_updated: Aug 19, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/quick-add-to-cart-feature-overview
originalArticleId: 9608a908-5dc9-49dc-bcc4-a24066c0bf76
redirect_from:
  - /docs/scos/user/features/202200.0/quick-add-to-cart-feature-overview.html
  - /docs/scos/user/features/202307.0/quick-add-to-cart-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/quick-add-to-cart-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202307.0/base-shop/quick-add-to-cart-feature-overview.html
---

Regular buyers, and especially B2B wholesale customers, often know what exactly they want to order from the shop by product SKU and product name. The *Quick Add to Cart* feature lets your customers find and buy products in just a few clicks. Instead of going to each product page individually, they can go to the **Quick Add to Cart** page, accessible directly from the header, and quickly order items by typing the product's SKU and its quantity in respective fields. At the same time, if some specific [quantity restrictions](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/non-splittable-products-feature-overview.html) apply to products, they will also be taken into account when ordering through the **Quick Add to Cart** page. The **Quick Add to Cart** form can also be used to add items to [shopping lists](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html). Also, if a customer has a list of products to be ordered, for example in a CSV file or other, the ordering process becomes even faster. The customer can bulk add SKUs and put quantities next to them in a single field. With this being done, the customer either adds the items to the cart or proceeds directly to checkout.

The *Quick Add to Cart* feature lets wholesale and returning customers place bulk orders.

On the **Quick Order** page, customers can add multiple products along with the required quantities in a fast and efficient way. They can search for a specific concrete product by SKU or name with the help of the search widget for concrete products. When starting to fill out the **SKU/Name** field, a drop-down list with auto-suggested appropriate items appears. A shop visitor can select the concrete product by clicking on it in the drop-down list.

{% info_block infoBox %}

Use the Tab button to automatically fill in a partially typed product name or SKU.

{% endinfo_block %}

{% info_block infoBox %}

By default, we use SKU as a product identifier for filtering the results. The identifier determines what input to validate in the **SKU/Name** field. You can configure to use more than one identifier such as EAN, GTIN, or article number on the project level by changing the template in the `ProductSearchWidget` module and then use any of the available fields for the product.

{% endinfo_block %}

To view how to create a quick order, see [Quick Order on the Storefront](#quick-order-on-the-storefront).
<!--- ![Quick Order page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/quick-order-page.png)
--->

As a shop owner, you can also integrate the Quick Order with [Measurement Units](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/measurement-units-feature-overview.html). Thus, when the product is selected, the base measurement unit for that product appears in the "Measuring Unit" column.

{% info_block errorBox %}

The integration is possible only if the Measurement Units feature is enabled in your project.

{% endinfo_block %}

Moreover, after adding a quick order to the cart, a shop owner can observe the default amount and default sales units for the product packaging unit in the cart overview.
![Quick Order packaging units](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/quick-order-packaging-units.png)

When the customer has found the products they need, they can set the quantity of each product using a scroll-down box. By default, "1" is set in the **Quantity** field. If there are any quantity restrictions applied to the product, they are taken into account: the customer can choose only the value which meets the quantity restrictions. To learn more about how the quantity limitations are applied to the **Quick Order** form, see [Quantity Restrictions for Quick add to cart](#quantity-restrictions-for-quick-add-to-cart).

Once the products and their quantities have been selected, the order can be:

* Moved to a shopping list
* Added to a shopping cart
* Checked out

{% info_block infoBox %}

For both Moved and Added to a Shopping List options, in a drop-down list, you can select one of the shopping lists to automatically add the products.

{% endinfo_block %}

It is also possible to add products to the cart in bulk. To do so, the customer adds SKUs and quantities of products in the **Paste your order** form, separating SKUs and quantities by one of the following separators, depending on the specific project configuration:

* Spaces
* Semicolons
* Commas
* Other separators


{% info_block warningBox %}

However, separators must be the same for all products entered in this form at a time. If products and quantities are added in the correct format and with acceptable separators, but the separators are different for different products—for example, 1234567, 2 in one case and 1234568; 3 in another, an error message is shown after verification. If SKUs and format have passed the verification, then the products and their quantities are automatically entered in the **SKU** and **Qty** fields of the **Quick Order** form, and the customer can either add them to the cart or create the order.

{% endinfo_block %}

## Quantity restrictions for Quick Add to Cart

Quick Add to Cart quantity rules fall under limitations set by [quantity restrictions](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/non-splittable-products-feature-overview.html). Quantity restriction values define the number of items that customers can put into the cart.

When manually filling the **SKU/Name* field, the quantity selector allows a visitor to put the valid numbers based on [quantity restrictions](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/non-splittable-products-feature-overview.html) set for that SKU. That means, for example, if a concrete product has a minimum quantity restriction of 4 units, the interval restriction of 2 units, and the maximum quantity is 12, the shopper can put 4, 6, 8, 10, and 12 items to cart.

The **Quantity** field in the **Quick Order** adheres to these quantities. Therefore, if the shopper enters an invalid number into the **Quantity** field, for example, 5, the number will automatically change to the next higher quantity set in quantity restrictions, that is, 6.

## Product prices for Quick Order

To see the price, a shop visitor has to select the concrete product and set the item quantity.

The price is displayed dynamically, taking into account the quantity, currency, store, and [merchant relation](/docs/pbc/all/merchant-management/{{site.version}}/base-shop/merchant-b2b-contracts-and-contract-requests-feature-overview.html) dimensions, respectively. If the item has any [volume prices](/docs/pbc/all/price-management/{{site.version}}/base-shop/prices-feature-overview/volume-prices-overview.html), the price is adjusted to the correct price set for the quantity the user has selected.

## File upload form for concrete products

To save your buyers' time and help them order the products in bulk quickly, let your customers use the **File Upload** form. The **File Upload** form lets users add multiple products to the **Quick Order** page by uploading data using a CSV file.

{% info_block infoBox %}

You can update the project configuration in case you need to use other file formats.

{% endinfo_block %}


After the feature is integrated<!-- link to integration guide-->, a buyer can see a box on the **Quick Order** page:

![File Upload form](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/file-upload-form.png)

Buyers can upload a CSV file by choosing a file from their local system or by drag & drop. To make the process clearer, they can download a sample CSV file and add the necessary data (SKU and Qty) there:

![File Upload a CSV file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/file-upload-csv.png)

{% info_block infoBox %}

Make sure to populate the product data in the following format: [CONCRETE_SKU, QUANTITY].
You can upload only one file at a time.

{% endinfo_block %}

By default, only concrete SKUs are validated. On successful upload, items and quantities are extracted and filled out in the quick order form fields.

In case the quantity is not valid due to [quantity restrictions](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/non-splittable-products-feature-overview.html) setting, the quantity is changed to a valid number.

If there are already products added to the quick order list, the products from the CSV file are added to the bottom of the quick order template.

## Quick Order on the Storefront

Using the Quick Order feature on the Storefront, company users can do the following:
* Create a new quick order.
* Add products to the quick order in bulk.
* Upload products using the upload form.
* Add a quick order o a shopping list.
* Add a quick order to a shopping cart.

The following figure shows how to perform these actions:
![create-quick-order](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Quick+Order/Quick+Order+Feature+Overview/create-quick-order.gif)

## Related Developer documents

| INSTALLATION GUIDES  | UPGRADE GUIDES |
|---|---|
| [Install the Quick Add to Cart feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-feature.html) | [Upgrade the ProductPackagingUnitStorage module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunitstorage-module.html) |
| [Install the Quick Add to Cart + Shopping Lists feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-shopping-lists-feature.html) | [ProductPageSearch migration guide](/docs/pbc/all/search/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpagesearch-module.html) |
| [Install the Quick Add to Cart + Discontinued Products feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-discontinued-products-feature.html) | [QuickOrderPage migration guide](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-quickorderpage-module.html) |
| [Install the Quick Add to Cart + Measurement Units feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-measurement-units-feature.html) |  |
| [Install the Quick Add to Cart + Non-splittable Products feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-non-splittable-products-feature.html) |  |
| [Install the Quick Add to Cart + Packaging Units feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-packaging-units-feature.html) |  |
