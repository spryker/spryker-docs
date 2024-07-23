---
title: Create standalone modules
description: How to develop a Spryker module
last_updated: Jun 7, 2024
template: howto-guide-template
---

This document describes how to create standalone modules.

## Enable a custom namespace

To enable a custom namespace, adjust **config/Shared/config_default.php**:

```php
$config[KernelConstants::CORE_NAMESPACES] = [ 'YourCompanyName', 'SprykerShop', 'SprykerEco', 'Spryker', 'SprykerSdk', ];
```


## Extend Spryker functionality from a module

You can extend Spryker functionality from a module using one of the following options:

* Introduce an extension point in an existing module. For an example, see [How to use a plugin from another module](docs/dg/dev/backend-development/plugins/plugins.html#how-to-use-a-plugin-from-another-module).
* Use an existing extension point in a module. For instructions, see [Extend functionality using an existing extension point](#Extend-functionality using-an-existing-extension-point).

### Extend functionality using an existing extension point

1. Extend the product table with a **Categories** column that shows the list of categories, which a product is added to. For this, use the following extension points in the existing modules:
  - [ProductTableConfigurationExpanderPluginInterface](https://github.com/spryker/product-management-extension/blob/master/src/Spryker/Zed/ProductManagementExtension/Dependency/Plugin/ProductTableConfigurationExpanderPluginInterface.php): to extend table headers with **Categories** column.
  - [ProductTableDataBulkExpanderPluginInterface](https://github.com/spryker/product-management-extension/blob/master/src/Spryker/Zed/ProductManagementExtension/Dependency/Plugin/ProductTableDataBulkExpanderPluginInterface.php): to extend table content with the corresponding column

2. Create a module:
```shell
vendor/bin/spryker-dev-console dev:module:create your-company-name.product-category
```

{% info_block warningBox "Verification" %}
Make sure the `vendor/your-company-name/product-category` folder with module data has been created.
{% endinfo_block %}



3. Create a plugin that to extend the product table the with a **Categories** column:

<details>
  <summary>vendor/your-company-name/product-category/src/YourCompanyName/Zed/ProductCategory/Communication/Plugin/ProductManagement/ProductCategoryProductTableConfigurationExpanderPlugin.php</summary>

```php

<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace YourCompanyName\Zed\ProductCategory\Communication\Plugin\ProductManagement;

use Spryker\Zed\Gui\Communication\Table\TableConfiguration;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableConfigurationExpanderPluginInterface;

class ProductCategoryProductTableConfigurationExpanderPlugin extends AbstractPlugin implements ProductTableConfigurationExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Expands `ProductTable` configuration with categories column.
     *
     * @param \Spryker\Zed\Gui\Communication\Table\TableConfiguration $config
     *
     * @return \Spryker\Zed\Gui\Communication\Table\TableConfiguration
     */
    public function expandTableConfiguration(TableConfiguration $config): TableConfiguration
    {
         // Let's insert `Categories` column right after the first column header (product ID)
        $headers = $config->getHeader();
        $firstColumnHeader = array_shift($headers);
        array_unshift($headers, 'Categories');
        array_unshift($headers, $firstColumnHeader);

        $config->setHeader($headers);

        return $config;
    }
}

```

</details>

2. Wire the plugin in the `\Pyz\Zed\ProductManagement\ProductManagementDependencyProvider::getProductTableConfigurationExpanderPlugins()` method.

{% info_block warningBox "Verification" %}
In the Back Office, go to **Catalog**>**Products**. Make sure the **Categories** column is displayed in the table.
{% endinfo_block %}

3. Create a plugin to provide data for the **Categories** column:

<details>
  <summary>vendor/your-company-name/product-category/src/YourCompanyName/Zed/ProductCategory/Communication/Plugin/ProductManagement/ProductCategoryProductTableDataBulkExpanderPlugin.php</summary>

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace YourCompanyName\Zed\ProductCategory\Communication\Plugin\ProductManagement;

use Generated\Shared\Transfer\ProductCategoryConditionsTransfer;
use Generated\Shared\Transfer\ProductCategoryCriteriaTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableDataBulkExpanderPluginInterface;

class ProductCategoryProductTableDataBulkExpanderPlugin extends AbstractPlugin implements ProductTableDataBulkExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Expands product table items with abstract product approval status.
     *
     * @param array<array<string, mixed>> $items
     * @param array<array<string, mixed>> $productData
     *
     * @return array<array<string, mixed>>
     */
    public function expandTableData(array $items, array $productData): array
    {
        // The code below is code sample that just works. (Learn how to make it fancy in https://docs.spryker.com/docs/dg/dev/architecture/architectural-convention.html)
        $productAbstractIds = array_map(function ($item){
            return $item['id_product_abstract'];
        }, $items);

        $productCategoryCollection = $this->getFacade()
            ->getProductCategoryCollection(
                (new ProductCategoryCriteriaTransfer())
                    ->setProductCategoryConditions(
                        (new ProductCategoryConditionsTransfer())
                            ->setProductAbstractIds($productAbstractIds)
                    )
            );

        foreach ($items as $key => $item) {
            $productCategoryNames = [];

            foreach ($productCategoryCollection->getProductCategories() as $productCategory) {
                if ($productCategory->getFkProductAbstract() !== $item['id_product_abstract']) {
                    continue;
                }

                $productCategoryNames[] = $productCategory->getCategory()->getName();
            }

            $items[$key]['categories'] = implode(', ', $productCategoryNames);
        }

        return $items;
    }
}

```

</details>

4. Wire the plugin in the `\Pyz\Zed\ProductManagement\ProductManagementDependencyProvider::getProductTableDataBulkExpanderPlugins()` method.


{% info_block warningBox "Verification" %}
In the Back Office, go to **Catalog**>**Products**. Make sure relevant data is displayed in **Categories** column.
{% endinfo_block %}


Your module is created.

## Next step

[Ensuring quality in standalone modules](/docs/dg/dev/developing-standalone-modules/ensuring-quality-in-standalone-modules.html)
