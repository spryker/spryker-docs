---
title: Tax feature walkthrough
last_updated: Aug 20, 2021
description: "The Tax feature allows you to define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets"
template: concept-topic-template
---

The _Tax_ feature allows you to define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets.


To learn more about the feature and to find out how end users use it, see [Tax feature overview](/docs/scos/user/features/{{page.version}}/tax-feature-overview.html) for business users.


## Entity diagram

The following schemas illustrates relations between modules when Avalara is integrated into different entities:

<details><summary markdown='span'>Product and Cart entities</summary>

<div class="width-100">

![avalara+tax+product.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avalara+tax+product.png)

</div>

</details>

<details><summary markdown='span'>Calculation entity</summary>

<div class="width-100">

![avatar+tax+integration+module+dependency+graph.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avatar+Tax+Integration+module+dependency+graph.png)

</div>

</details>

<details><summary markdown='span'>Checkout entity</summary>

<div class="width-100">

![avalara+Tax+checkout.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avalara+Tax+checkout.png)

</div>

</details>

<details><summary markdown='span'>Sales order entity</summary>

<div class="width-100">

![avalara+Sales+Order+dependency.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avalara+Sales+Order+dependency.png)

</div>

</details>

<details><summary markdown='span'>Stock entity</summary>

<div class="width-100">

![avalara+Stock+context.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avalara+Stock+context.png)

</div>

</details>

## Related Developer articles

| INTEGRATION GUIDES | MIGRATION GUIDES | GLUE API GUIDES | DATA IMPORT |
|---|---|---|---|
| [Avalara Tax integration](/docs/scos/dev/feature-walkthroughs/{{page.version}}/tax-feature-walkthrough/tax-feature-walkthrough.html) | [Tax migration guide](/docs/scos/dev/module-migration-guides/migration-guide-tax.html) | [Retrieving tax sets](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-tax-sets.html) | [File details: tax.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-tax.csv.html) | |
| [Avalara Tax + Shipment feature integration](/docs/scos/dev/technology-partner-guides/{{page.version}}/taxes/avalara/integrating-avalara-tax-shipment.html) |  |  | [File details: product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html) | |
| [Avalara Tax + Product Options feature integration](/docs/scos/dev/technology-partner-guides/{{page.version}}/taxes/avalara/integrating-avalara-tax-product-options.html) |  |  | [File details: product_option.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/product-options/file-details-product-option.csv.html) | |
|  |  |  | [File details: shipment.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-shipment.csv.html) |
