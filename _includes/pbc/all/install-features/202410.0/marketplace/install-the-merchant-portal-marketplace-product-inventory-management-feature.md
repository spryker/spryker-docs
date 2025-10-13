
This document describes how to install the Merchant Portal - Marketplace Product + Inventory Management feature.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Product + Inventory Management feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Merchant Portal Marketplace Product | master | [Install the Merchant Portal - Marketplace Product feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-product-feature.html) |
| Marketplace Inventory Management | master | [Install the Marketplace Inventory Management feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-inventory-management-feature.html)  |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/availability-merchant-portal-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| AvailabilityMerchantPortalGui | spryker/availability-merchant-portal-gui |

{% endinfo_block %}


### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| TotalProductAvailabilityProductConcreteTableExpanderPlugin | Expands `ProductConcreteTable` with `Available stock` column data. | None | Spryker\Zed\MerchantProduct\Communication\Plugin\Product |

**src/Pyz/Zed/ProductMerchantPortalGui/ProductMerchantPortalGuiDependencyProvider.php**

```php

<?php

namespace Pyz\Zed\ProductMerchantPortalGui;

use Spryker\Zed\AvailabilityMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui\TotalProductAvailabilityProductConcreteTableExpanderPlugin;
use Spryker\Zed\ProductMerchantPortalGui\ProductMerchantPortalGuiDependencyProvider as SprykerProductMerchantPortalGuiDependencyProvider;

class ProductMerchantPortalGuiDependencyProvider extends SprykerProductMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\ProductConcreteTableExpanderPluginInterface>
     */
    protected function getProductConcreteTableExpanderPlugins(): array
    {
        return [
            new TotalProductAvailabilityProductConcreteTableExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the available stock column is displayed in the ProductConcreteTable.

{% endinfo_block %}


### 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

### 4) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```
