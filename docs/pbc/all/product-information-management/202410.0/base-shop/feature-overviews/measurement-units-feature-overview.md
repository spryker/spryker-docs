---
title: Measurement Units feature overview
description: The Measurement Units feature lets you sell products by any unit of measure defined by a shop administrator.
last_updated: Aug 13, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/measurement-units-feature-overview
originalArticleId: c997afab-ce1d-4a05-a627-b6511d74ec86
redirect_from:
  - /2021080/docs/measurement-units-feature-overview
  - /2021080/docs/en/measurement-units-feature-overview
  - /docs/measurement-units-feature-overview
  - /docs/en/measurement-units-feature-overview
  - /docs/scos/user/features/202200.0/measurement-units-feature-overview.html
  - /docs/scos/user/features/202311.0/measurement-units-feature-overview.html
  - /docs/pbc/all/product-information-management/202311.0/feature-overviews/measurement-units-feature-overview.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/feature-overviews/measurement-units-feature-overview.html
---

The *Measurement Units* feature lets you sell products by any unit of measure defined by the shop administrator. For example, apples can be offered in "Item" or "Kilogram", cables can be offered in "Centimeter", "Meter" or "Feet". To support alternate units of measure, there must be a base unit value relative to which all the internal conversions and calculations will be made. Such value is referred to as a base unit. The base unit's assigned to abstract products, and by default, it's "item"; however, it can be changed to any other unit.

Besides the base unit, the shop owner can define *sales units*—alternate units of measure in which items will be offered in the shop. Sales units are assigned to concrete products, but if sales units are not defined, the *base unit* is used as a default sales unit. If there are several sales units and no default sales unit's defined, then the first unit to show will be the first in alphabetical order.

The sales units are displayed on the product details page. You can define the sales units in the Administration Interface but choose not to display them on the webshop. Actually, sales units are only shown on the website but then immediately converted into the base unit, as internally, the system only works with the base units.

Sales units can be configured per store. That is, they have a store relation.

{% info_block infoBox %}

For example, you might have bought a quintal of apples, but want to use kilograms as the base unit, and you choose to offer the apples in "Items", "Kilograms", and "Pounds" in one of your stores. In this case, kilograms is both base and sales unit. Therefore, this unit of measure will be used to manage stock and make all the internal calculations. "Items" and "Pounds" in this example will be the sales units applicable to the respective store.

{% endinfo_block %}

The shop owner can define if the conversion factor between base and sales units should be displayed on the webshop. If it's set to `true`, then:

| EXAMPLE | DISPLAY VALUE | PRODUCT DETAILS PAGE |
| --- | --- | --- |
| The base unit's meter and the sales unit's feet | "**1 meter=3,048 feet**" is displayed under the drop-down field with measuring units on product details page | ![Quantity](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Measurement+Units/Measurement+Units+Feature+Overview/quantity.png)|

On the cart page, the user sees quantity both in the base unit and sales unit.

| EXAMPLE | DISPLAY VALUE | CART PAGE |
| --- | --- | --- |
| Suppose if base unit of cables is meters and the user selects to buy 12.19 feet of cable | Both, the quantity **4** and **12.19** feet are displayed on the cart page.<br>12.19 (sales unit) = 4 (base unit) |![Quantity on the cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Measurement+Units/Measurement+Units+Feature+Overview/quantity_cart.png)|

If a user puts one and the same product in different sales units, they will be shown as two different items in the cart.

Let's take an example to better understand the feature. Suppose, 1 apple (1=factor) weights 0,1 kg, then the ratio will be 10 (1kg = 10 apples). If the precision is 100, the user can specify a number as 0.40 Kg (which will be 4 apples). Likewise, if, in this case, the user selects "kg" and precision is set to "1", its quantity in sales units on the cart page will be "0", as precision 1 implies that no digits are shown after the decimal sign. Actually,

*(Base Unit Value) = (User Input Sales Unit Value) * Precision / Factor*

There can be two types of conversions in the system:

* *Global conversions*—are defined in the code already (like from cm to meter).
* *Product-specific conversions*—are defined per product (like from one meter of cable to its weight).

If a global unit conversion exists between the base and sales unit, then factor and precision fields are optional. If no global unit conversion exists between the base and sales unit, then factor and precision fields are mandatory. If precision is "null", then the information is taken from the product measurement unit's default_precision (default value is 1).

| CORE LEVEL| PROJECT LEVEL |
| --- | --- |
| All the standard conversion ratios are defined in `Bundles/UtilMeasurementUnitConversion/src/Spryker/Service/UtilMeasurementUnitConversion/Model/MeasurementUnitConverter.php`. | Conversion, precision, as well as is_displayed and is_default parameters can be defined in `spy_product_measrument_sales_unit table`. <br> Name of the measurement unit and some other data are stored to the `sales_order_item`.<br> |

## Current constraints

- In the Spryker Commerce OS, you cannot define measurement units for products. They are imported into the database manually.
- We strive to shift all business logic to our backend; however, with Measurements Units, a part of the calculations (for example, quantity restrictions) are performed on Yves.
- On the shopping cart as well as the shopping list page, products do not have a dropdown to change the measurement units. You can select a measurement unit on the product details page only.
- A shopper cannot reorder items with the selected measurement units as they are not added automatically. They must be added manually on the product details page.
- In the [Quick Order](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/quick-add-to-cart-feature-overview.html) form and [Search](/docs/pbc/all/search/{{page.version}}/base-shop/search-feature-overview/search-feature-overview.html), the products use the default measurement units that cannot be changed.

## Related Developer documents

|INSTALLATION GUIDES | GLUE API GUIDES |
|---------|---------|
| [Product measurement unit feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-measurement-units-feature.html)  | [Retrieve measurement units](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-measurement-units.html)  |
| [Install the Measurement units + Quick Add to Cart feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-measurement-units-quick-add-to-cart-feature.html) | [Retrieving sales units](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-sales-units.html)  |
| [Glue API: Measurement units feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html)  |   |
