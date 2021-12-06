---
title: Migration guide - ProductConfigurationStorage
description: Learn how to upgrade the ProductConfigurationStorage module to a newer version.
template: module-migration-guide-template
---

## Upgrading from version 0.1.* to version 0.2.* 

*Estimated migration time: 15 minutes*

To upgrade the ProductConfigurationStorage module from version 0.1.* to version 0.2.*, do the following:

1. Update the ProductConfigurationStorage module to version 0.2.0:

```bash
composer require spryker/product-configuration-storage:"^0.2.0" --update-with-dependencies
```
2. Generate transfer classes:

```bash
console transfer:generate
```
3. From `\Pyz\Client\ProductConfigurationStorage\ProductConfigurationStorageDependencyProvider`, remove the removed plugin stack `getProductConfigurationStoragePriceExtractorPlugins()`.
4. From `\Pyz\CLient\ProductConfiguration\ProductConfigurationDependencyProvider`, remove the plugin `ProductConfiguratorCheckSumResponsePlugin`.
5. From `\Pyz\Client\Cart\CartDependencyProvider`, remove the plugin: `ProductConfigurationCartChangeRequestExpanderPlugin` (should be replaced with `Spryker\Client\ProductConfigurationCart\Plugin\Cart\ProductConfigurationCartChangeRequestExpanderPlugin`).
6. From `\Pyz\Client\PersistentCart\PersistentCartDependencyProvider`, remove the `ProductConfigurationPersistentCartRequestExpanderPlugin` (should be replaced with `Spryker\Client\ProductConfigurationPersistentCart\Plugin\PersistentCart\ProductConfigurationPersistentCartRequestExpanderPlugin`).
7. From `\Pyz\Client\PriceProductStorage\PriceProductStorageDependencyProvider`, remove the plugin `ProductConfigurationPriceFilterExpanderPlugin` (should be replaced with `Spryker\Client\ProductConfigurationStorage\Plugin\PriceProductStorage\ProductConfigurationPriceProductFilterExpanderPlugin`).
8. From `\Pyz\Service\PriceProduct\PriceProductDependencyProvider` remove the plugins:

    - `ProductConfigurationPriceProductFilterPlugin` (should be replaced with `Spryker\Service\ProductConfiguration\Plugin\PriceProduct\ProductConfigurationPriceProductFilterPlugin`)
    - `ProductConfigurationPriceProductVolumeFilterPlugin` (should be replaced with `Spryker\Service\ProductConfiguration\Plugin\PriceProduct\ProductConfigurationVolumePriceProductFilterPlugin`)