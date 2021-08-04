---
title: Measurement units feature overview
originalLink: https://documentation.spryker.com/v6/docs/measurement-units-feature-overview
redirect_from:
  - /v6/docs/measurement-units-feature-overview
  - /v6/docs/en/measurement-units-feature-overview
---

The *Measurement Units* feature allows selling products by any unit of measure defined by the shop administrator. For example, apples can be offered in "Item" or "Kilogram", cables can be offered in "Centimeter", "Meter" or "Feet" etc. To support alternate units of measure, there must be a base unit value, relative to which all the internal conversions and calculations will be made. Such value is referred to as base unit. The base unit is assigned to abstract products and by default it is "item", however it can be changed to any other unit.

Besides the base unit, the shop owner can define **sales units** - alternate units of measure in which items will be offered in the shop. Sales units are assigned to concrete products, but if sales units are not defined, the **base unit** is used as a default sales unit. If there are several sales units and no default sales unit is defined, then the first unit to show will be the first in the alphabetical order.

The sales units are displayed on product details page. It is also possible to define the sales units in the Administration Interface, but choose not to display them in the web shop. Actually, sales units are only shown on the website, but then immediately converted into the base unit, as internally the system only works with the base units.

Sales units can be configured per store, that is, they have a store relation.

{% info_block infoBox %}
For example, you might have bought a quintal of apples, but want to use kilograms as the base unit, and you choose to offer the apples in "Items", "Kilograms" and "Pounds" in one of your stores. In this case, kilograms is both base and sales unit. Therefore, this unit of measure will be used to manage stock and make all the internal calculations. "Items" and "Pounds" in this example will be the sales units applicable to the respective store.
{% endinfo_block %}

The shop owner can define if conversion factor between base and sales units should be displayed in the web shop. If it is set to "true", then:

| Example | Display Value | Product Details Page |
| --- | --- | --- |
| The base unit is meter and the sales unit is feet | "**1 meter=3,048 feet**" is displayed under the drop-down field with measuring units on product details page | ![Quantity](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Measurement+Units/Measurement+Units+Feature+Overview/quantity.png){height="" width=""}|

On the cart page, the user sees quantity both in base unit and sales unit.

| Example | Display Value | Cart Page |
| --- | --- | --- |
| Suppose if base unit of cables is meters and the user selects to buy 12.19 feet of cable | Both, the quantity **4** and **12.19** feet are displayed on the cart page.<br>12.19 (sales unit) = 4 (base unit) |![Quantity on the cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Measurement+Units/Measurement+Units+Feature+Overview/quantity_cart.png){height="" width=""}|

If user puts one and the same product in different sales units, they will be shown as two different items in the cart.

The schema below illustrates relations between products and measurement units, where:

* **conversion** - factor to convert a value from sales to base unit. If it is "null" then the information is taken from the global conversions (`MeasurementUnitConverter.php` file).
* **precision** - ratio between a sales unit and a base unit. For example, a base unit is "item", and user selects "kg" as a sales unit.
* **is_displayed** - If true, then the value is shown in shop.
* **is_default** - If true then the unit is shown as default unit in shop.
![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Measurement+Units/Measurement+Units+Feature+Overview/product_units_relation.png){height="" width=""}

Let's take an example to better understand the feature. Suppose, 1 apple (1=factor) weights 0,1 Kg, then ratio will be 10 (1kg = 10 apples). If the precision is 100, the user can specify a number as 0.40 Kg (which will be 4 apples). Likewise, if in this case the user selects kg and precision is set to "1", it's quantity in sales units on the cart page will be "0", as precision 1 implies that no digits are shown after the decimal sign. Actually,

`(Base Unit Value) = (User Input Sales Unit Value) * Precision / Factor`

There can be two types of conversions in the system:

* **Global conversions** - are defined in the code already (like from cm to meter).
* **Product-specific conversions** - are defined per product (like from 1 meter of cable to its weight).


If a global unit conversion exists between the base and sales unit, then factor and precision fields are optional. If no global unit conversion exists between the base and sales unit then factor and precision fields are mandatory. If precision is "null", then the information is taken from the product measurement unit's default_precision (default value is 1).

| Core Level | Project Level |
| --- | --- |
| All the standard conversion ratios are defined in `Bundles/UtilMeasurementUnitConversion/src/Spryker/Service/UtilMeasurementUnitConversion/Model/MeasurementUnitConverter.php`. | Conversion, precision, as well as is_displayed and is_default parameters can be defined in `spy_product_measrument_sales_unit table`. <br> Name of the measurement unit and some other data are stored to the `sales_order_item`.<br> |

## Current constraints
- In the Spryker Commerce OS you cannot define measurement units for products. Currently, they are imported into the database manually. 
- We strive to shift all business logic to our backend, however, with Measurements Units, a part of the calculations (e.g. quantity restrictions) are performed on Yves.
- On the shopping cart as well as the shopping list page, products do not have a dropdown to change the measurement units. You can select a measurement unit on the product details page only.
- A shopper cannot reorder the items with the selected measurement units as they are not added automatically. They should be added manually on the product details page.
- In the [Quick Order](https://documentation.spryker.com/docs/quick-order-201903) form and [search widget](https://documentation.spryker.com/docs/search-widget-for-concrete-products-201903), the products use the default measurement units that cannot be changed.


