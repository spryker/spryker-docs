## Upgrading from version 0.2.* to version 1.0.*

*Estimated migration time: 5 minutes*

`ProductConfigurationsRestApi` v1.0.0 introduces the following backward incompatible changes:

* Replaced ProductConfigurationStorageClientInterface::findProductConfigurationInstanceBySku() with ProductConfigurationStorageClientInterface::getProductConfigurationInstanceCollection().

To upgrade the `ProductConfigurationsRestApi` module from version 0.2.* to version 1.0.*, do the following:

1. Update the `ProductConfigurationsRestApi` module to version 1.0.0:

```bash
composer require "spryker/product-configurations-rest-api":"^1.0.0" --update-with-dependencies
```

2. Generate transfer classes:

```bash
console transfer:generate
```