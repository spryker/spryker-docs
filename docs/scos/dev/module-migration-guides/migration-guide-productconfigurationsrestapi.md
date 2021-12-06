---
title: Migration guide - ProductConfigurationsRestApi
description: Learn how to upgrade the ProductConfigurationsRestApi module to a newer version.
template: module-migration-guide-template
---

## Upgrading from version 0.1.* to version 0.2.* 

*Estimated migration time: 5 minutes*

To upgrade the ProductConfigurationsRestApi module from version 0.1.* to version 0.2.*, do the following:

1. Update the ProductConfigurationsRestApi module to version 0.2.0:
   
```bash
composer require spryker/product-configurations-rest-api:"^0.2.0" --update-with-dependencies
```
2. From `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider`, replace the removed plugin stacks with the new ones:
    - `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider::getCartItemProductConfigurationMapperPlugins()` should be replaced with `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider::getProductConfigurationPriceMapperPlugins()`.
    - `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider::getRestCartItemProductConfigurationMapperPlugins()` should be replaced with `\Pyz\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider::getRestProductConfigurationPriceMapperPlugins()`.