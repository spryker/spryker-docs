## Upgrading from version 0.1.* to version 1.0.*

*Estimated migration time: 5 minutes*

Version 1.0.0 of the`ProductConfigurationPersistentCart` module introduces the following backward incompatible changes:

* Replaced `ProductConfigurationStorageClientInterface::findProductConfigurationInstancesIndexedBySku()` with `ProductConfigurationStorageClientInterface::getProductConfigurationInstanceCollection()`

To upgrade the `ProductConfigurationPersistentCart` module from version 0.1.* to version 1.0.*, do the following:

1. Update the `ProductConfigurationPersistentCart` module to version 1.0.0:

```bash
composer require "spryker/product-configuration-persistent-cart":"^1.0.0" --update-with-dependencies
```

2. Generate transfer classes:

```bash
console transfer:generate
```