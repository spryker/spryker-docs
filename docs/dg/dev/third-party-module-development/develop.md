---
title: How to develop a Spryker module
description: How to develop a Spryker module
last_updated: Jun 7, 2024
template: howto-guide-template

---

### Spryker architectural conventions

https://docs.spryker.com/docs/dg/dev/architecture/architectural-convention.html needs to be followed in the development process.
-  Use the samples that marked as *Module Development*.


### How you can extend Spryker functionality from your module:
**Option 1.** Introduce an extension point in existing Spryker module, use it. (See complete example here https://docs.spryker.com/docs/dg/dev/backend-development/plugins/plugins.html#how-to-use-a-plugin-from-another-module)

**Option 2.** Adding a controller, example for project-level implementation can be found here https://docs.spryker.com/docs/dg/dev/backend-development/extend-spryker/create-modules.html#display-a-random-salutation-message, core implementation will be the same but with different namespaces.

**Option 3.** Use the existing Spryker module extension point.

**a.** Example of existing extension point usage.
Were we'll extend product table with an additional column **Categories** where will show the list of categories where the product is present.
For this we'll use two extension points in the existing Spryker modules 
- One to extend table headers with **Categories** column [ProductTableConfigurationExpanderPluginInterface](https://github.com/spryker/product-management-extension/blob/master/src/Spryker/Zed/ProductManagementExtension/Dependency/Plugin/ProductTableConfigurationExpanderPluginInterface.php)
- And another to extend table content with the corresponding column [ProductTableDataBulkExpanderPluginInterface](https://github.com/spryker/product-management-extension/blob/master/src/Spryker/Zed/ProductManagementExtension/Dependency/Plugin/ProductTableDataBulkExpanderPluginInterface.php)

a. Create a module **console dev:module:create your-company-name.product-category**. 

{% info_block infoBox %}
   Make sure that `vendor/your-company-name/product-category` folder with module data is created.
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
     * @api
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
use Spryker\Zed\ProductCategory\Business\ProductCategoryFacade;
use Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableDataBulkExpanderPluginInterface;

class ProductCategoryProductTableDataBulkExpanderPlugin extends AbstractPlugin implements ProductTableDataBulkExpanderPluginInterface
{
    /**
     * {@inheritDoc}
     * - Expands product table items with abstract product approval status.
     *
     * @api
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

        $productCategoryCollection = (new ProductCategoryFacade())
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

{% info_block infoBox %}
Validate that on http://backoffice.de.spryker.local/product-management page you can see categories column with assigned categories.
{% endinfo_block %}

**Congratulations! You've created your first Spryker module.**
