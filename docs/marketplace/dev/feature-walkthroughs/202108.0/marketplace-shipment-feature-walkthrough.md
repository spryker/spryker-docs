---
title: Marketplace Shipment feature walkthrough
description: Merchants are product and service sellers in the Marketplace.
template: feature-walkthrough-template
---

<!--- Feature summary. Short and precise explanation of what the feature brings in terms of functionality.
-->
With the *Marketplace Shipment* feature, the [marketplace orders](/docs/marketplace/dev/feature-walkthroughs/{{ page.version }}/marketplace-order-management-feature-walkthrough.html) are split into several shipments based on the merchants from which the items were bought. Merchants can see only shipments with products and offers that belong to them.

<!--- Feel free to drop the following part if the User doc is not yet published-->
{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Shipment feature overview](/docs/marketplace/user/features/{{ page.version }}/marketplace-shipment-feature-overview.html) for business users.
{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/448f4d60-ebdb-4380-bfc9-21b6c49ddf3f.png?utm_medium=live&utm_source=confluence)
<!--
Diagram content:
    -The module dependency graph SHOULD contain all the modules that are specified in the feature  (don't confuse with the module in the epic)
    - The module dependency graph MAY contain other module that might be useful or required to show
Diagram styles:
    - The diagram SHOULD be drown with the same style as the example in this doc
    - Use the same distance between boxes, the same colors, the same size of the boxes
Table content:
    - The table that goes after diagram SHOULD contain all the modules that are present on the diagram
    - The table should provide the role each module plays in this feature
-->
| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| CheckoutPage | Adjusted `\SprykerShop\Yves\CheckoutPage\Process\StepFactory::createStepEngine()` to take as optional parameter stack of plugins which implement `CheckoutPageStepEnginePreRenderPluginInterface`. |
| CheckoutPageExtension | introduced `CheckoutPageStepEnginePreRenderPluginInterface` extends `StepEnginePreRenderPluginInterface`. |
| StepEngine | injected stack of plugins that implement `CheckoutPageStepEnginePreRenderPluginInterface` and executed before getTemplateVariables() method. |
| StepEngineExtension | introduced `StepEnginePreRenderPluginInterface`.    |
| MerchantShipment | implemented `CheckoutPageStepEnginePreRenderPluginInterface` in `MerchantShipment` module where you go through quote items and set `ItemTransfer.ShipmentTransfer.merchantReference` = `ItemTransfer.merchantReference`.   |


## Domain model
<!--
- Domain model SHOULD contain all the entities that were adjusted or introduced by the feature.
- All the new connections SHOULD also be shown and highlighted properly 
- Make sure to follow the same style as in the example
-->
![Domain Model](https://confluence-connect.gliffy.net/embed/image/bc12cbec-87e4-4913-9885-e1986df6f464.png?utm_medium=live&utm_source=confluence)

## Related Developer articles
<!-- Usually filled by a technical writer. You can omit this part -->

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Marketplace Shipment feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-feature-integration.html) | [Retrieving an order](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/retrieving-marketplace-orders.html#retrieve-an-order) |
| [Marketplace Shipment + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-cart-feature-integration.html) |  |
| [Marketplace Shipment + Customer feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-customer-feature-integration.html) |   |
| [Marketplace Shipment + Checkout feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-checkout-feature-integration.html) |  |
|    |    |    |    |
