---
title: Packaging Units feature overview
originalLink: https://documentation.spryker.com/2021080/docs/packaging-units-feature-overview
redirect_from:
  - /2021080/docs/packaging-units-feature-overview
  - /2021080/docs/en/packaging-units-feature-overview
---

{% info_block infoBox "Terminology used throughout the article" %}
<table><thead><tr><td><b>Definition</b></td><td><b>Description</b></td></tr></thead><tbody><tr><td>Packaging unit</td><td>Unit of measure that that is used to pack product items into one packaged product.</td></tr><tr><td>Leading product</td><td>Product of a packaging unit that shares its stock to another product.</td></tr><tr><td>Non-leading product</td><td>Product with which stock is shared.</td></tr><tr><td>Product packaging unit group</td><td>Group of products in a packaging unit that has a leading product.</td></tr><tr><td>Quantity</td><td>Number of times a product/package is added in the cart.</td></tr><tr><td>Amount</td><td>Stock unit included in the packaged product.</td></tr><tr><tr><td>Base unit</td><td>Basic unit of measure for a product, relative to which all conversions are made.</td></tr><tr><td>Sales unit</td><td>Alternate unit of measure used besides the default base unit.</td></tr><tr><td>Sales order</td><td>Placed order.</td></tr><tr><td>Sales order item</td><td>Ordered product included in a sales order.</td></tr><tr><td>Sales unit amount</td><td>Amount of items in a sales unit.</td></tr></tbody></table>
{% endinfo_block %}

The Packaging Unit feature introduces a **packaging unit** that is a unit of measure used as packaging for a product. It allows including the amount of stock into a product a customer wants to buy. A shop owner can sell the same product in different packaging units, for example, apples can be sold as an "Item", a "Bag" of apples or a "Pallet" of apples. The "bag", "pallet", "box" etc. are referred to as *packaging unit types*. 

Each packaging unit is defined on an abstract product level and is represented by one product variant, for example:

| Abstract Product | Concrete Product / Variant | Packaging Unit |
| --- | --- | --- |
| Apple | "An apple" | Item |
| Apple | "Bag of apples" | Bag |
| Apple | "Pallet of apples" | Palett |

## Leading Products
The **leading product** represents the relation between two concrete products and holds the availability. The measurement unit, defined on an abstract product level, is the stock unit for all the concrete products of the abstract product. A group of products in a packaging unit, that has a leading product, is called a **product packaging unit group**. Each packaging unit includes a certain amount of products by default (default amount). The shop owner can choose whether the packaging unit, for example, a bag, has a separate stock or shares stock with the contained item. In our example, the different product variants have their own SKUs and prices, but they represent the same physical product in the warehouse. To share the information about availability among these variants, we use the concept of a **leading product**. 

However, leading products are not always relevant. Packaging units that represent a package of items which quantity can not be changed, do not need a leading product. In this case, the availability of the packaged items themselves, not individual items in the package, matters. Such packaged products actually behave like normal abstract products for which customers might have a possibility to select applicable sales units (see Measurement Units per Product <!-- add a link--> to learn about product sales units).

Basically, when a packaging unit does not use the leading product, it means that the stock is not shared.

{% info_block infoBox "Info" %}
For example, if there is a leading product in the product abstract with 3 packagings, where 1 of the packages "has no lead product", it means that the 2 other packages actually consume the same product when you buy them. But the 3rd packaging (which does not use the leading product
{% endinfo_block %} is completely independent from a stock perspective, it only depends on its own stock.)

To reflect the availability of a leading product for a packaging unit and to define which concrete product SKU is the leading one, the `lead_product_sku` attribute is used.

The shop owner can define various sales units for the packaging units. For example, for a chocolate bar, the base unit could be set to item, and the sales units could be box, packet or gift box with variable or fixed amount of chocolate bars in them.

![Packaging Unit](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/sales-units-dropdown.png){height="" width=""}

Read on to learn about the product packaging unit amount options.

## Product Packaging Unit Amount
A packaging unit usually contains multiple items of a product. For instance, a "Bag of apples" can contain 10, 20, 40... apples. This information is called the **amount** of a packaging unit. 

The packaging unit amount can be:

| Packaging Unit Amount | Description |
| --- | --- |
| Default (default_amount) | Default amount of items that a customer can buy. <br>For example, a customer can buy 40 apples. </br>Also, this value is used for calculating a price when the custom amount is provided. The Amount field in the online shop is pre-filled with a value set in `default_amount`.|
| Variable (is_variable=true) | Customer can buy any number of that item (respecting the amount restrictions). In case of a variable amount the price is adjusted by the formula: (Price) * (Customer Input) / (Default Amount). |
| Fixed (is_variable=false) | Customer can buy a pre-determined, fixed amount of items. When is_variable is set to "false", all amount_* values are set as NULL. When the amount is non-variable the customer can still see the default amount, but can not change it.</br>However, if a product has a sales unit set for it, the customer is able to select a different sales unit for the amount, which will adjust the displayed amount according to that sales unit.</br> See Measurement Units per Product <!-- link -->to learn about product sales units. |
| Interval amount (amount_interval) | Interval of amounts that a customer can buy. </br>For instance, you can buy only 40, 80, 120, ... but not 45. </br>The interval is shifted by the minimum value (e.g: minimum = 5, interval = 3; valid values: 5, 8, 11, ...). Only relevant if is_variable=true.</br>If the amount is set as variable, by default, the interval amount is set to 1. |
| Minimum amount (amount_minimum) | Minimum amount that a customer can buy. </br> For instance, you cannot buy less than 1 apple. </br>Only relevant if is_variable=true. If the amount is set as variable, by default, the minimum amount equals the interval amount.|
| Maximum amount (amount_maximum) | Maximum amount that a customer can buy.</br>For instance, you cannot buy more than 10 apples.</br>Only relevant if is_variable=true. |

The schema below shows relations between products, packaging units, their types, and amounts:

![Database relations scheme](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/database-relation-scheme.png){height="" width=""}

All packaging units having leading products, have a base unit of measure and can also have various sales units reflecting the amount of items in the packaging units.

{% info_block infoBox "Info" %}
For example, a packaging unit "bag" can be set to have "item" as a base unit and can also have "kg" and "g" as sales units (see Measurement Units per Product <!-- link--> to learn about base and sales units for products
{% endinfo_block %}.)

The amount of items contained in a sales unit is referred to as **sales unit amount**. If a customer chooses a sales unit amount, which is in between 2 available amounts (due to amount restriction settings), a higher or lower amount should be selected.

{% info_block infoBox "Info" %}
If there is no lower/higher amount available, the customer is suggested to buy just a higher/lower amount respectively.
{% endinfo_block %}

When the very same item is added to the cart with a different amount of sales units or with the same amount but a different sales unit, the item appears in the cart in the form of separate items.

{% info_block infoBox "Info" %}
Meaning it will be one sales order containing multiple order items.
{% endinfo_block %}

## Stock Calculation and Definition
In Spryker Commerce OS, customers can buy a product defined by the following elements:

* Quantity that means the number of times a customer adds the product to cart
* Amount (only for packaged products) that means how many items the packaged product contains

The stock will then be calculated as follows: 
*Reserved stock = Quantity x Amount*

The Quantity value will always be an integer. It is used to split the ordered products into **sales order items**.

For example, a customer wants to purchase 3 smartphones. In terms of Spryker OS, 1 smartphone is bought 3 times. In the Back Office, you'll see the order split into 3 sales order items: sales order item #1 with 1 smartphone, sales order item #2 with 1 smartphone, and sales order item #3 with 1 smartphone. This allows you to refund each smartphone separately.

### Products with a decimal value in the stock
The shop owner can also define stock in a decimal value, for example, 2.5, 5.65, 0.75, etc. 

For example, you define your stock as 'kilogram' and have in stock 400.50 kg salmons. Each salmon weighs 2.5 kg. A customer wants to buy 10 salmons. If you consider each salmon to be a usual concrete product in your system, you will end up with a wrongly calculated stock. Since according to the formula, the customer buys 1 (amount) salmon 10 (quantity) times, which equals 10. To define a proper relation between your stock and what your customers can purchase, you need to use the Packaging Unit feature, which will convert salmons into packages: 1 salmon = 2.5 kg = 1 package. So, when your customer buys 10 salmons, you get the correct calculation: Quantity (10 packages) multiplied by Amount (2.5) equals 25 kg of stock. 

## Packaging Units Scenarios
**Case 1. Products are sold as a package containing some fixed amount of stock.**

In this example, we sell Atlantic salmon as a package containing **37.44** kg of fish and set a price per kilogram. 37,44 is the default value for the **Amount** field. Here your customer can change only quantity but cannot select the **Amount** value, because **Amount** is not a variable in this case.

Thus, when the customer wants to buy 3 packages of fish, it means that they buy 3 packages with 37,44 kg per package.

![case 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+&+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/case1.png){height="" width=""}

To calculate stock, Quantity is multiplied by Amount (the default value). The resulting value will be subtracted from the current stock. 

**Case 2. Products are sold in measurement units, the amount of stock is variable.**

In this example, we sell potatoes as kilograms and, thus, set a price per kilogram. Potatoes are sold as a package containing 1 kg (the default value for the **Amount** field). However, a customer can select how much potatoes they want to buy per package because **Amount** has been defined as a variable. In our example, the customer decided to buy 2 packages with 2.5 kg per each. 
![Case2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+&+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/case2.png){height="" width=""}

**Case 3. Products are sold with shared stock enabled.**

In this example, we can sell VGA cables as items (ring) and meters (as long as you want). The price has been set per meter. We define that VGA cables share their stock with **VGA cables as long as you want**. It means that the leading product for VGA cable has been set to the **VGA cable as long as you want** product packaging type. 

If a customer selects **Ring**, they can set only quantity (in our example, 3) because **Amount** has not been specified as a variable. 

![Case3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+&+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/case3.png){height="" width=""}

After the customer places the order, in the Back Office, we see the following:

* Availability for the leading product (**VGA cables as long as you want**) decreased by 4.5 (amount of reserved products)
* Availablity for the non-leading product (**VGA cables**) decreased by 3 (quantity of reserved products).
Then, the customer decided to select the **As long as you want** packaging unit type. In this case, they can set quantity and specify how many meters or centimeters of cables there will be in the packaging unit amount. This is possible because **Amount** is a variable for this packaging unit type. 

![Case3-1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+&+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/case3-1.png){height="" width=""}

In our example, the customer set the **meter** for a sales unit, selected **3.5** - for the **Amount** field and **2** - for the **Quantity** field. The default value for **"As long as you want"** is set to **0.5**.

Once the order has been placed, we can navigate to the Back Office and see the following:

* Availability for the leading product (**VGA cables as long as you want**) decreased by 11.5 (amount of reserved products)
* Availablity for the non-leading product (**VGA cables**) didn't change from the previous time.
The figure below shows how these items and packaging units appear in the cart.

![Cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Packaging+Units/Packaging+Units+Feature+Overview/cart-with-items.png){height="" width=""}

In our example, the following conditions are met:

* We put different packaging units into the cart.
* The products have different sales units.
* The amount has different sales units. 
* There are products with a fixed and a variable amount of stock.

## Current Constraints
* In the Spryker Commerce OS, you cannot define packaging units for products in the Back Office. Currently, they are imported to the database manually. See HowTo - Import Packaging Unit Types <!-- link -->for more details.
* We strive to shift all business logic to our backend, however, with Packaging Units, calculations are performed on Yves.
* On the shopping cart as well as the shopping list page, products do not have a drop-down to change the packaging units. You can select a packaging unit on the product details page only.
* A shopper cannot reorder the items with the selected packaging units as they are not added automatically. They should be added manually on the product details page.
* In the Quick Order form and search widget, the products use the default packaging units that cannot be changed. Flexible packaging units are not supported on the **Quick Order** page.

{% info_block infoBox "Example:" %}
You have a product in your shop - a pen. And there exists a packaging unit for a pen - a box with a minimum amount of 5 items in it up to the maximum amount of 50 pens available. Every shopper can define the necessary amount of pens that will be included in the box and order several such boxes. But on the Quick Order page, if the customer adds a pen with the packaging unit 'box', the box consisting of minimum 5 items will be added by default.
{% endinfo_block %}


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                   <li><a href="https://documentation.spryker.com/docs/howto-import-packaging-units" class="mr-link">Import packaging units</a></li>
                   <li><a href="https://documentation.spryker.com/docs/product-packaging-unit-feature-integration" class="mr-link">Integrate the Packaging Units feature into your project</a></li>
                 <li><a href="https://documentation.spryker.com/docs/decimal-stock-concept" class="mr-link">Enable the decimal stock</a></li> 
                <li><a href="https://documentation.spryker.com/docs/ht-integrate-and-use-precise-decimal-numbers" class="mr-link">Learn how to integrate and use precise decimal numbers</a></li>
                            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/howto-import-packaging-units" class="mr-link">Import Packaging Unit Types</a></li>
            </ul>
        </div>
    </div>
</div>
