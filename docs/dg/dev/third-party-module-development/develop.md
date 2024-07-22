---
title: How to develop a Third-Party Spryker module
description: How to develop a Spryker module
last_updated: Jun 7, 2024
template: howto-guide-template
related:
  - title: Go to the Next Step.
    link: docs/dg/dev/third-party-module-development/ensure-quality.html
---

## Architectural conventions

Follow the [architectural conventions](/docs/dg/dev/architecture/architectural-convention.html) tagged with *Module Development*.

## Enable a custom namespace

To enable a custom namespace, adjust **config/Shared/config_default.php**:

```php
$config[KernelConstants::CORE_NAMESPACES] = [ 'YourCompanyName', 'SprykerShop', 'SprykerEco', 'Spryker', 'SprykerSdk', ];
```


## Extend Spryker functionality from a module

**Option 1.** Introduce an extension point in an existing module. For an example, see [How to use a plugin from another module](docs/dg/dev/backend-development/plugins/plugins.html#how-to-use-a-plugin-from-another-module).
**Option 2.** Use an existing extension point in a module.

**a.** Example of existing extension point usage.

Extend the product table with an **Categories** column that shows the list of categories, which a product is added to.

For this, use the following extension points in the existing modules:
- [ProductTableConfigurationExpanderPluginInterface](https://github.com/spryker/product-management-extension/blob/master/src/Spryker/Zed/ProductManagementExtension/Dependency/Plugin/ProductTableConfigurationExpanderPluginInterface.php): to extend table headers with **Categories** column.
- [ProductTableDataBulkExpanderPluginInterface](https://github.com/spryker/product-management-extension/blob/master/src/Spryker/Zed/ProductManagementExtension/Dependency/Plugin/ProductTableDataBulkExpanderPluginInterface.php): to extend table content with the corresponding column

Create a module:
```shell
vendor/bin/spryker-dev-console dev:module:create your-company-name.product-category
```

{% info_block warningBox "Verification" %}
Make sure the `vendor/your-company-name/product-category` folder with module data has been created.
{% endinfo_block %}

**b.** Create a plugin that will extend product table headers with **Categories** column

File Path: vendor/your-company-name/product-category/src/YourCompanyName/Zed/ProductCategory/Communication/Plugin/ProductManagement/ProductCategoryProductTableConfigurationExpanderPlugin.php

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

Wire the plugin in `\Pyz\Zed\ProductManagement\ProductManagementDependencyProvider::getProductTableConfigurationExpanderPlugins()` method.

{% info_block infoBox %}
    Validate that on http://backoffice.de.spryker.local/product-management page you can see categories column in the table header.
{% endinfo_block %}

**c.** Create a plugin that will provide data for the **Categories** column


File Path: vendor/your-company-name/product-category/src/YourCompanyName/Zed/ProductCategory/Communication/Plugin/ProductManagement/ProductCategoryProductTableDataBulkExpanderPlugin.php

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

Wire the plugin in `\Pyz\Zed\ProductManagement\ProductManagementDependencyProvider::getProductTableDataBulkExpanderPlugins()` method.


{% info_block infoBox %}
Validate that on http://backoffice.de.spryker.local/product-management page you can see categories column with assigned categories.
{% endinfo_block %}

**Congratulations! You've created your first Spryker module.**
