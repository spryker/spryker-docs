---
title: Product feature walkthrough
last_updated: Aug 19, 2021
description: The Product feature allows creating products, manage their characteristics and settings.
template: concept-topic-template
---

The _Product_ feature allows creating products, manage their characteristics and settings.


<!--
To learn more about the feature and to find out how end users use it, see [Product](https://documentation.spryker.com/docs/product) for business users.
-->

## Entity diagram

The following diagram shows the relations between abstract products and product variants on the Storefront:

<div class="width-100">

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Abstraction/product-abstraction.png)

</div>

The schema below illustrates the relations between discontinued products, abstract and concrete products:

<div class="width-100">

![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-schema.png)

</div>


The following schema  represents module relations of the _Quick Order_ page:

<div class="width-100">

![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/module-relations.png)

</div>

## Related Developer articles

| INTEGRATION GUIDES | MIGRATION GUIDES | GLUE API GUIDES | DATA IMPORT |
|---|---|---|---|
| Product feature integration | ProductValidity migration guide | Retrieving abstract products | File details: product_abstract.csv |
| Quick Add to Cart + Discontinued Products feature integration |  | Retrieving concrete products | File details: product_abstract_store.csv |
| Alternative Products + Discontinued Products feature integration |  | Retrieving product attributes | File details: product_concrete.csv |
| Glue API: Products feature integration |  | Retrieving image sets of abstract products | File details: product_attribute_key.csv |
| Glue API: Product Image Sets feature integration |  | Retrieving image sets of concrete products | File details: product_management_attribute.csv |
| Category Image feature integration |  |  | File details: product_discontinued.csv |
| Product + Cart feature integration |  |  |  |
