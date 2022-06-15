---
title: Measurement Units feature walkthrough
last_updated: Aug 13, 2021
description: The Measurement Units feature allows selling products by any unit of measure defined by in the Back Office
template: concept-topic-template
---

The _Measurement Units_ feature allows selling products by any unit of measure defined by in the Back Office.


To learn more about the feature and to find out how end users use it, see [Measurement Units feature overview](/docs/scos/user/features/{{page.version}}/measurement-units-feature-overview.html) for business users.


## Entity diagram

The following schema illustrates relations between alternative products:

<div class="width-100">

![module-relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Measurement+Units/Measurement+Units+Feature+Overview/product_units_relation.png)

* **conversion**—factor to convert a value from sales to the base unit. If it is "null" then the information is taken from the global conversions (`MeasurementUnitConverter.php` file).
* **precision**—ratio between a sales unit and a base unit. For example, a base unit is an "item", and a user selects "kg" as a sales unit.
* **is_displayed**—If true, then the value is shown on the Storefront.
* **is_default**—If true, then the unit is shown as the default unit on the Storefront.

</div>


## Related Developer articles

|INTEGRATION GUIDES | GLUE API GUIDES |
|---------|---------|
| [Product measurement unit feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-measurement-unit-feature-integration.html)  | [Retrieving measurement units](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-measurement-units.html)  |
| [Quick order + measurement units feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quick-add-to-cart-measurement-units-feature-integration.html) | [Retrieving sales units](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/concrete-products/retrieving-sales-units.html)  |
| [Glue API: Measurement units feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-measurement-units-feature-integration.html)  |   |
