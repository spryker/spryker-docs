---
title: Product feature walkthrough
last_updated: Aug 19, 2021
description: The Product feature allows creating products, manage their characteristics and settings.
template: concept-topic-template
---

The _Product_ feature allows creating products, manage their characteristics and settings.



To learn more about the feature and to find out how end users use it, see [Product](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html) for business users.


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
| [Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-feature-integration.html) | [ProductValidity migration guide](/docs/scos/dev/module-migration-guides/migration-guide-productvalidity.html) | [Retrieving abstract products](/docs/marketplace/dev/glue-api-guides/{{page.version}}/abstract-products/retrieving-abstract-products.html) | [File details: product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html) |
| [Quick Add to Cart + Discontinued Products feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quick-add-to-cart-discontinued-products-feature-integration.html) |  | [Retrieving concrete products](/docs/marketplace/dev/glue-api-guides/{{page.version}}/concrete-products/retrieving-concrete-products.html) | [File details: product_abstract_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract-store.csv.html) |
| [Alternative Products + Discontinued Products feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/alternative-products-discontinued-products-feature-integration.html) |  | [Retrieving product attributes](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/retrieving-product-attributes.html) | [File details: product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html) |
| [Glue API: Products feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html) |  | [Retrieving image sets of abstract products](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-image-sets-of-abstract-products.html) | [File details: product_attribute_key.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-attribute-key.csv.html) |
| [Glue API: Product Image Sets feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-image-sets-feature-integration.html) |  | [Retrieving image sets of concrete products](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/concrete-products/retrieving-image-sets-of-concrete-products.html) | [File details: product_management_attribute.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-management-attribute.csv.html) |
| [Category Image feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/category-image-feature-integration.html) |  |  | [File details: product_discontinued.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-discontinued.csv.html) |
| [Product + Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-cart-feature-integration.html) |  |  |  |
