---
title: "Measurement Units feature: Module relations"
last_updated: Aug 13, 2021
description: The Measurement Units feature lets you sell products by any unit of measure defined by in the Back Office
template: concept-topic-template
redirect_from:
- /docs/pbc/all/product-information-management/202204.0/base-shop/domain-model-and-relationships/measurement-units-feature-module-relations.html
---

The following schema illustrates relations between alternative products:

<div class="width-100">

![module-relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Packaging+%26+Measurement+Units/Measurement+Units/Measurement+Units+Feature+Overview/product_units_relation.png)

* *conversion*—factor to convert a value from sales to the base unit. If it's *null*, the information is taken from the global conversions (the `MeasurementUnitConverter.php` file).
* *precision*—the ratio between a sales unit and a base unit. For example, a base unit is an *item*, and a user selects *kg* as a sales unit.
* `is_displayed`—if true, then the value is shown on the Storefront.
* `is_default`—if true, then the unit is shown as the default unit on the Storefront.

</div>
