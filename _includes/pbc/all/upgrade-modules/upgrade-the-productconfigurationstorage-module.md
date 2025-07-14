## Upgrading from version 0.2.* to version 1.0.*

*Estimated migration time: 5 minutes*

Version 1.0.0 of the `ProductConfigurationStorage` module introduces the following backward incompatible changes:

- Removed `ProductConfigurationStorageClientInterface::findProductConfigurationInstanceBySku()`.
- Removed `ProductConfigurationStorageClientInterface::findProductConfigurationInstancesIndexedBySku()`.
- Added `ProductConfigurationStorageClientInterface::getProductConfigurationInstanceCollection()`.
- Impacted `ProductConfigurationPublisherTriggerPlugin with facade changes`.

To upgrade the `ProductConfigurationStorage` module from version 0.2.* to version 1.0.*, do the following:

1. Update the `ProductConfigurationStorage` module to version 1.0.0:

```bash
composer require "spryker/product-configuration-storage":"^1.0.0" --update-with-dependencies
```

2. Generate transfers:

```bash
console transfer:generate
```

## Upgrading from version 0.1.* to version 0.2.*

*Estimated migration time: 15 minutes*

To upgrade the `ProductConfigurationStorage` module from version 0.1.* to version 0.2.*, do the following:

1. Update the `ProductConfigurationStorage` module to version 0.2.0:

```bash
composer require spryker/product-configuration-storage:"^0.2.0" --update-with-dependencies
```

2. Generate transfer classes:

```bash
console transfer:generate
```

3. From `\Pyz\Client\ProductConfigurationStorage\ProductConfigurationStorageDependencyProvider`, remove the removed plugin stack `getProductConfigurationStoragePriceExtractorPlugins()`.

4. From `\Pyz\CLient\ProductConfiguration\ProductConfigurationDependencyProvider`, remove the plugin `ProductConfiguratorCheckSumResponsePlugin`.

5. From `\Pyz\Client\Cart\CartDependencyProvider`, remove the plugin: `ProductConfigurationCartChangeRequestExpanderPlugin` (must be replaced with `Spryker\Client\ProductConfigurationCart\Plugin\Cart\ProductConfigurationCartChangeRequestExpanderPlugin`).

6. From `\Pyz\Client\PersistentCart\PersistentCartDependencyProvider`, remove the `ProductConfigurationPersistentCartRequestExpanderPlugin` (must be replaced with `Spryker\Client\ProductConfigurationPersistentCart\Plugin\PersistentCart\ProductConfigurationPersistentCartRequestExpanderPlugin`).

7. From `\Pyz\Client\PriceProductStorage\PriceProductStorageDependencyProvider`, remove the plugin `ProductConfigurationPriceFilterExpanderPlugin` (must be replaced with `Spryker\Client\ProductConfigurationStorage\Plugin\PriceProductStorage\ProductConfigurationPriceProductFilterExpanderPlugin`).

8. From `\Pyz\Service\PriceProduct\PriceProductDependencyProvider` remove thefollowing plugins:

    - `ProductConfigurationPriceProductFilterPlugin` (must be replaced with `Spryker\Service\ProductConfiguration\Plugin\PriceProduct\ProductConfigurationPriceProductFilterPlugin`)
    - `ProductConfigurationPriceProductVolumeFilterPlugin` (must be replaced with `Spryker\Service\ProductConfiguration\Plugin\PriceProduct\ProductConfigurationVolumePriceProductFilterPlugin`)
