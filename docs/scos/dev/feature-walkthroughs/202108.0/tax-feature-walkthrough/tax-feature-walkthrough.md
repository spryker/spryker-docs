---
title: Tax feature walkthrough
last_updated: Aug 20, 2021
description: "The Tax feature allows you to define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets"
template: concept-topic-template
---

The _Tax_ feature allows you to define taxes for the items you sell. The feature is represented by two entities: tax rates and tax sets.

<!--
To learn more about the feature and to find out how end users use it, see [Tax feature overview](https://documentation.spryker.com/docs/tax-feature-overview) for business users.
-->

## Entity diagram

The following schema illustrates relations between modules when Avalara is integrated into different entities:

<details><summary>Product and Cart entities</summary>

<div class="width-100">

![avalara+tax+product.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avalara+tax+product.png)

</div>

</details>

<details><summary>Calculation entity</summary>

<div class="width-100">

![avatar+tax+integration+module+dependency+graph.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avatar+Tax+Integration+module+dependency+graph.png)

</div>

</details>

<details><summary>Checkout entity</summary>

<div class="width-100">

![avalara+Tax+checkout.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avalara+Tax+checkout.png)

</div>

</details>

<details><summary>Sales order entity</summary>

<div class="width-100">

![avalara+Sales+Order+dependency.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avalara+Sales+Order+dependency.png)

</div>

</details>

<details><summary>Stock entity</summary>

<div class="width-100">

![avalara+Stock+context.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Tax/Reference+information%3A+Avalara+integration%E2%80%94module+relations/Avalara+Stock+context.png)

</div>

</details>

## Related Developer articles

| INTEGRATION GUIDES | MIGRATION GUIDES | GLUE API GUIDES | DATA IMPORT |
|---|---|---|---|
| Avalara Tax integration |Tax migration guide | Retrieving tax sets | File details: tax.csv | |
| Avalara Tax + Shipment feature integration |  |  | File details: product_abstract.csv | |
| Avalara Tax + Product Options feature integration |  |  | File details: product_option.csv | |
|  |  |  | File details: shipment.csv |
