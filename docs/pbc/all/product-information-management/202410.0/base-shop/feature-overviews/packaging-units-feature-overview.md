---
title: Packaging Units feature overview
description: Unit of measure that is used as packaging for a product is referred to as packaging unit and a shop can sell the same product in different packaging units.
last_updated: Jul 23, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/packaging-units-feature-overview
originalArticleId: b3cef9d8-452a-4d29-8258-4e91ee51e6bd
redirect_from:
  - /2021080/docs/packaging-units-feature-overview
  - /2021080/docs/en/packaging-units-feature-overview
  - /docs/packaging-units-feature-overview
  - /docs/en/packaging-units-feature-overview
  - /docs/scos/user/features/202200.0/packaging-units-feature-overview.html
  - /docs/scos/user/features/202311.0/packaging-units-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202200.0/packaging-units-feature-walkthrough.html  
  - /docs/scos/dev/feature-walkthroughs/202311.0/packaging-units-feature-walkthrough.html
  - /docs/packaging-units-overview
  - /docs/pbc/all/product-information-management/202311.0/feature-overviews/packaging-units-feature-overview.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/feature-overviews/packaging-units-feature-overview.html
---

{% info_block infoBox "Terminology used throughout the article" %}

| DEFINITION | DESCRIPTION |
|---|---|
| Packaging unit | Unit of measure that that is used to pack product items into one packaged product. |
| Leading product | Product of a packaging unit that shares its stock to another product. |
| Non-leading product | Product with which stock is shared. |
| Product packaging unit group | Group of products in a packaging unit that has a leading product. |
| Quantity | Number of times a product/package is added in the cart. |
| Amount | Stock unit included in the packaged product. |
| Base unit | Basic unit of measure for a product, relative to which all conversions are made. |
| Sales unit | Alternate unit of measure used besides the default base unit. |
| Sales order | Placed order. |
| Sales order item | Ordered product included in a sales order. |
| Sales unit amount | Amount of items in a sales unit. |

{% endinfo_block %}

The *Packaging Unit* feature introduces a *packaging unit* that is a unit of measure used as packaging for a product. It allows including the amount of stock in a product a customer wants to buy. A shop owner can sell the same product in different packaging units—for example, apples can be sold as an "Item", a "Bag", or "Pallet" of apples. The "bag", "pallet", and "box" are referred to as *packaging unit types*.

Each packaging unit is defined on an abstract product level and is represented by one product variant—for example:

| ABSTRACT PRODUCT | CONCRETE PRODUCT / VARIANT | PACKAGING UNIT |
| --- | --- | --- |
| Apple | "An apple" | Item |
| Apple | "Bag of apples" | Bag |
| Apple | "Pallet of apples" | Palett |

## Leading products

The *leading product* represents the relation between two concrete products and holds the availability. The *measurement unit*, defined on an abstract product level, is the stock unit for all the concrete products of the abstract product. A group of products in a packaging unit, that has a leading product, is called a *product packaging unit group*. Each packaging unit includes a certain amount of products by default (default amount). A shop owner can choose whether the packaging unit—for example, a bag, has a separate stock or shares stock with the contained item. In our example, the different product variants have their own SKUs and prices, but they represent the same physical product in the warehouse. To share the information about availability among these variants, we use the concept of a *leading product*.

However, leading products are not always relevant. Packaging units that represent a package of items whose quantity can not be changed, do not need a leading product. In this case, the availability of the packaged items themselves, not individual items in the package, matters. Such packaged products actually behave like normal abstract products for which customers might have a possibility to select applicable sales units see [Measurement Units](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/measurement-units-feature-overview.html) to learn about product sales units).
Basically, when a packaging unit does not use the leading product, it means that the stock is not shared.

{% info_block infoBox "Info" %}

For example, if there is a leading product in the product abstract with three packagings, where one of the packages *has no lead product*, it means that the two other packages actually consume the same product when you buy them. But the third packaging, which does not use the leading product, is completely independent of a stock perspective, it only depends on its own stock.

{% endinfo_block %}

To reflect the availability of a leading product for a packaging unit and to define which concrete product SKU is the leading one, the `lead_product_sku` attribute is used.

The shop owner can define various sales units for the packaging units. For example, for a chocolate bar, the base unit could be set to *item*, and the sales units could be a *box*, *packet*, or *gift box* with a variable or fixed amount of chocolate bars in them.

![Packaging Unit](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/sales-units-dropdown.png)

Read on to learn about the product packaging unit amount options.

## Product packaging unit amount

A packaging unit usually contains multiple items of a product. For example, a "Bag of apples" can contain 10, 20, or 40 apples. This information is called the *amount* of a packaging unit.

The packaging unit amount can be:

| PACKAGING UNIT AMOUNT | DESCRIPTION |
| --- | --- |
| Default (default_amount) | Default amount of items that a customer can buy. <br>For example, a customer can buy 40 apples. <br>Also, this value is used for calculating a price when the custom amount is provided. The Amount field in the online shop is prefilled with a value set in `default_amount`.|
| Variable (is_variable=true) | Customer can buy any number of that item (respecting the amount restrictions). In case of a variable amount the price is adjusted by the formula: (Price) * (Customer Input) / (Default Amount). |
| Fixed (is_variable=false) | Customer can buy a predetermined, fixed amount of items. When `is_variable` is set to `false`, all amount_* values are set as NULL. When the amount is non-variable, the customer can still see the default amount but can not change it.<br>However, if a product has a sales unit set for it, the customer can select a different sales unit for the amount, which adjusts the displayed amount according to that sales unit.<br> See [Measurement Units feature overview](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/measurement-units-feature-overview.html) to learn about product sales units. |
| Interval amount (amount_interval) | Interval of amounts that a customer can buy. <br>For example, you can buy only 40, 80, and 120 but not 45. <br>The interval is shifted by the minimum value (for example, minimum = 5, interval = 3; valid values: 5, 8, 11). Only relevant if is_variable=true.<br>If the amount is set as variable, by default, the interval amount is set to 1. |
| Minimum amount (amount_minimum) | Minimum amount that a customer can buy. <br> For example, you cannot buy less than 1 apple. <br>Only relevant if is_variable=true. If the amount is set as variable, by default, the minimum amount equals the interval amount.|
| Maximum amount (amount_maximum) | Maximum amount that a customer can buy.<br>For example, you cannot buy more than 10 apples.<br>Only relevant if is_variable=true. |

The following schema shows relations between products, packaging units, their types, and amounts:

![Database relations scheme](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/database-relation-scheme.png)

All packaging units having leading products have a base unit of measure and can also have various sales units reflecting the number of items in the packaging units.

{% info_block infoBox "Info" %}

For example, a packaging unit "bag" can be set to have "item" as a base unit and can also have "kg" and "g" as sales units (see [Measurement Units feature overview](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/measurement-units-feature-overview.html) to learn about base and sales units for products).

{% endinfo_block %}

The amount of items contained in a sales unit is referred to as *sales unit amount*. If a customer chooses a sales unit amount, which is in between two available amounts (because of amount restriction settings), a higher or lower amount must be selected.

{% info_block infoBox "Info" %}

If there is no lower/higher amount available, the customer is suggested to buy just a higher/lower amount respectively.

{% endinfo_block %}

When the very same item is added to the cart with a different amount of sales units or with the same amount but a different sales unit, the item appears in the cart in the form of separate items.

{% info_block infoBox "Info" %}

Meaning it will be one sales order containing multiple order items.

{% endinfo_block %}

## Stock calculation and definition

In Spryker Commerce OS, customers can buy a product defined by the following elements:
* Quantity. The number of times a customer adds the product to cart.
* Amount (only for packaged products). How many items the packaged product contains.

The stock will then be calculated as follows:
*Reserved stock = Quantity x Amount*

The Quantity value will always be an integer. It is used to split the ordered products into *sales order items*.

For example, a customer wants to purchase 3 mobile phones. In terms of Spryker OS, 1 mobile phone is bought 3 times. In the Back Office, you'll see the order split into 3 sales order items: sales order item #1 with 1 mobile phone, sales order item #2 with 1 mobile phone, and sales order item #3 with 1 mobile phone. This lets you refund each mobile phone separately.

### Products with a decimal value in the stock

The shop owner can also define stock in a decimal value—for example, 2.5, 5.65, 0.75.

For example, you define your stock as *kilogram* and have in stock 400.50 kg salmons. Each salmon weighs 2.5 kg. A customer wants to buy 10 salmons. If you consider each salmon to be a usual concrete product in your system, you will end up with a wrongly calculated stock. Since according to the formula, the customer buys 1 (amount) salmon 10 (quantity) times, which equals 10. To define a proper relation between your stock and what your customers can purchase, you need to use the Packaging Unit feature, which will convert salmons into packages: 1 salmon = 2.5 kg = 1 package. So, when your customer buys 10 salmons, you get the correct calculation: Quantity (10 packages) multiplied by Amount (2.5) equals 25 kg of stock.

## Packaging Units scenarios

This section shows the scenarios of when the Packaging Units feature can be used.

### Case 1. Products are sold as a package containing some fixed amount of stock

In this example, we sell Atlantic salmon as a package containing **37.44** kg of fish and set a price per kilogram. 37,44 is the default value for the **Amount** field. Here your customer can change only quantity but cannot select the **Amount** value, because **Amount** is not a variable in this case.

Thus, when the customer wants to buy 3 packages of fish, it means that they buy 3 packages with 37,44 kg per package.

![case 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+&+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/case1.png)

To calculate stock, Quantity is multiplied by Amount (the default value). The resulting value will be subtracted from the current stock.

### Case 2. Products are sold in measurement units, the amount of stock is variable

In this example, we sell potatoes as kilograms and, thus, set a price per kilogram. Potatoes are sold as a package containing 1 kg (the default value for the **Amount** field). However, a customer can select how much potatoes they want to buy per package because **Amount** has been defined as a variable. In our example, the customer decided to buy 2 packages with 2.5 kg per each.
![Case2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+&+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/case2.png)

### Case 3. Products are sold with shared stock enabled

In this example, we can sell VGA cables as items (ring) and meters (as long as you want). The price has been set per meter. We define that VGA cables share their stock with **VGA cables as long as you want**. It means that the leading product for VGA cable has been set to the **VGA cable as long as you want** product packaging type.

If a customer selects **Ring**, they can set only quantity (in our example, 3) because **Amount** has not been specified as a variable.

![Case3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+&+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/case3.png)

After the customer places the order, in the Back Office, we see the following:

* Availability for the leading product (**VGA cables as long as you want**) decreased by 4.5 (amount of reserved products)
* Availablity for the non-leading product (**VGA cables**) decreased by 3 (quantity of reserved products).
Then, the customer decided to select the **As long as you want** packaging unit type. In this case, they can set quantity and specify how many meters or centimeters of cables there will be in the packaging unit amount. This is possible because **Amount** is a variable for this packaging unit type.

![Case3-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+&+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/case3-1.png)

In our example, the customer set the **meter** for a sales unit, selected **3.5** for the **Amount** field and **2** for the **Quantity** field. The default value for **"As long as you want"** is set to **0.5**.

Once the order has been placed, we can navigate to the Back Office and see the following:

* Availability for the leading product (**VGA cables as long as you want**) decreased by 11.5 (amount of reserved products)
* Availability for the non-leading product (**VGA cables**) didn't change from the previous time.
The following figure shows how these items and packaging units appear in the cart.

![Cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/cart-with-items.png)

In our example, the following conditions are met:

* We put different packaging units into the cart.
* The products have different sales units.
* The amount has different sales units.
* There are products with a fixed and a variable amount of stock.

## Current constraints

* In the Spryker Commerce OS, you cannot define packaging units for products in the Back Office. They are imported to the database manually. See [HowTo: Import Packaging Units](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/file-details-product-packaging-unit.csv.html) for more details.
* We strive to shift all business logic to our backend, however, with Packaging Units, calculations are performed on Yves.
* On the shopping cart as well as the shopping list page, products do not have a drop-down to change the packaging units. You can select a packaging unit on the product details page only.
* A shopper cannot reorder the items with the selected packaging units as they are not added automatically. They must be added manually on the product details page.
* In the Quick Order form and search widget, the products use the default packaging units that cannot be changed. Flexible packaging units are not supported on the **Quick Order** page.

{% info_block infoBox "Example:" %}

You have a product in your shop—a pen. And there exists a packaging unit for a pen—a box with a minimum amount of 5 items in it up to the maximum amount of 50 pens available. Every shopper can define the necessary amount of pens that will be included in the box and order several such boxes. But on the **Quick Order** page, if the customer adds a pen with the packaging unit **box**, the box consisting of minimum 5 items will be added by default.

{% endinfo_block %}

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES | DATA IMPORT  | TUTORIALS AND HOWTOS |
|---------|---------|---------|----|
| [Install the Product Packaging Unit feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-packaging-units-feature.html)  | [Decimal Stock migration concept](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/decimal-stock-migration-concept.html)  |   [product_packaging_unit_type.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-packaging-unit-type.csv.html)         |[HowTo: Integrate and use precise decimal numbers](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/tutorials-and-howtos/howto-integrate-and-use-precise-decimal-numbers.html)   |
|   |   |  [product_packaging_unit.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/file-details-product-packaging-unit.csv.html) | |
