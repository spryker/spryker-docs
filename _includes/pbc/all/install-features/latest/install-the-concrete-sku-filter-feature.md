This document describes how to install the [Concrete SKU product filter feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/concrete-sku-product-filter-feature-overview.html).

## 1) Install the required modules

```bash
composer require spryker/product-management:^0.19.48 --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                             |
|------------------------------|------------------------------------------------|
| ProductModule                | vendor/spryker/product-management              |

{% endinfo_block %}

## 2) Enable the feature in the config

Extend the `isConcreteSkuSearchInProductTableEnabled` method in the `ProductManagementConfig` class at the project level and return `true`:

**src/Pyz/Zed/ProductManagement/ProductManagementConfig.php**

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

declare(strict_types = 1);

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductManagement\ProductManagementConfig as SprykerProductManagementConfig;

class ProductManagementConfig extends SprykerProductManagementConfig
{
    /**
     * @return bool
     */
    public function isConcreteSkuSearchInProductTableEnabled(): bool
    {
        return true;
    }
}
```
