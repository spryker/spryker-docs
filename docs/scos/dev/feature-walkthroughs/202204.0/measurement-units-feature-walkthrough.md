---
title: Measurement Units feature walkthrough
last_updated: Aug 13, 2021
description: The Measurement Units feature lets you sell products by any unit of measure defined by in the Back Office
template: concept-topic-template
---

The _Measurement Units_ feature lets you sell products by any unit of measure defined by in the Back Office.


To learn more about the feature and to find out how end users use it, see [Measurement Units feature overview](/docs/scos/user/features/{{page.version}}/measurement-units-feature-overview.html) for business users.


## Entity diagram

The following schema illustrates relations between alternative products:

<div class="width-100">

![module-relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Measurement+Units/Measurement+Units+Feature+Overview/product_units_relation.png)

* *conversion*—factor to convert a value from sales to the base unit. If it is *null*, the information is taken from the global conversions (the `MeasurementUnitConverter.php` file).
* *precision*—the ratio between a sales unit and a base unit. For example, a base unit is an *item*, and a user selects *kg* as a sales unit.
* `is_displayed`—if true, then the value is shown on the Storefront.
* `is_default`—if true, then the unit is shown as the default unit on the Storefront.

</div>


## Related Developer articles

|INSTALLATION GUIDES | GLUE API GUIDES |
|---------|---------|
| [Product measurement unit feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/measurement-units-feature-integration.html)  | [Retrieving measurement units](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-measurement-units.html)  |
| [Quick order + measurement units feature integration](/docs/pbc/all/cart-and-checkout/{{site.version}}/install-and-upgrade/install-features/install-the-quick-add-to-cart-measurement-units-feature.html) | [Retrieving sales units](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/concrete-products/retrieving-sales-units.html)  |
| [Glue API: Measurement units feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-measurement-units-feature-integration.html)  |   |
