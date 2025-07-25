## Upgrading from version 0.1.* to version 1.0.*

*Estimated migration time: 10 minutes*

Version 1.0.0 of the `ProductConfigurationGui` module introduces the following backward incompatible changes: removed deprecated `ProductConfigurationTableDataExpanderPlugin`.

To upgrade the `ProductConfigurationGui` module from version 0.1.* to version 1.0.*, do the following:

1. Update the `ProductConfigurationGui` module to version 1.0.0:

```bash
composer require "spryker/product-configuration-gui":"^1.0.0" --update-with-dependencies
```

2. Remove the usage of `\Spryker\Zed\ProductConfigurationGui\Communication\Plugin\ProductManagement\ProductConfigurationTableDataExpanderPlugin`.

3. Add the new plugin to `\Pyz\Zed\ProductManagement\ProductManagementDependencyProvider::getProductTableDataBulkExpanderPlugins()`.

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductConfigurationGui\Communication\Plugin\ProductManagement\ProductConfigurationProductTableDataBulkExpanderPlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableDataBulkExpanderPluginInterface>
     */
    protected function getProductTableDataBulkExpanderPlugins(): array
    {
        return [
            new ProductConfigurationProductTableDataBulkExpanderPlugin(),
        ];
    }

```