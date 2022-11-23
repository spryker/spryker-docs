## Upgrading from version 0.1.* to version 1.0.*

*Estimated migration time: 5 minutes*

Version 1.0.0 of the`ProductConfigurationShoppingList` module introduces the following backward incompatible changes:

* Replaced `ProductConfigurationStorageClientInterface::findProductConfigurationInstanceBySku()` with `ProductConfigurationStorageClientInterface::getProductConfigurationInstanceCollection()`.
* Replaced `ProductConfigurationStorageClientInterface::findProductConfigurationInstancesIndexedBySku()` with `ProductConfigurationStorageClientInterface::getProductConfigurationInstanceCollection()`.

To upgrade the `ProductConfigurationShoppingList` module from version 0.1.* to version 1.0.*, do the following:

1. Update the `ProductConfigurationShoppingList` module to version 1.0.0:

```bash
composer require "spryker/product-configuration-shopping-list":"^1.0.0" --update-with-dependencies
```

2. Generate transfers:

```bash
console transfer:generate
```