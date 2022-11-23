## Upgrading from version 0.2.* to version 1.0.*

*Estimated migration time: 5 minutes*

Version 1.0.0 of the`ProductConfigurationsRestApi` module introduces the following backward incompatible changes: replaced `ProductConfigurationStorageClientInterface::findProductConfigurationInstanceBySku()` with `ProductConfigurationStorageClientInterface::getProductConfigurationInstanceCollection()`.

To upgrade the `ProductConfigurationsRestApi` module from version 0.2.* to version 1.0.*, do the following:

1. Update the `ProductConfigurationsRestApi` module to version 1.0.0:

```bash
composer require "spryker/product-configurations-rest-api":"^1.0.0" --update-with-dependencies
```

2. Generate transfer classes:

```bash
console transfer:generate
```

## Upgrading from version 0.1.* to version 0.2.*

*Estimated migration time: 5 minutes*

To upgrade the `ProductConfigurationsRestApi` module from version 0.1.* to version 0.2.*, do the following:

1. Update the `ProductConfigurationsRestApi` module to version 0.2.0:

```bash
composer require spryker/product-configurations-rest-api:"^0.2.0" --update-with-dependencies
```

2. From `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider`, replace the removed plugin stacks with the new ones:
    - `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider::getCartItemProductConfigurationMapperPlugins()` must be replaced with `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider::getProductConfigurationPriceMapperPlugins()`.
    - `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider::getRestCartItemProductConfigurationMapperPlugins()` must be replaced with `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider::getRestProductConfigurationPriceMapperPlugins()`.
