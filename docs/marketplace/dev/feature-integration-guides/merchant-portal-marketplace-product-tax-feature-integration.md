---
title: Merchant Portal - Marketplace Product + Tax feature integration
last_updated: Jan 05, 2021
summary: This integration guide provides steps on how to integrate the Merchant Portal - Marketplace Product + Tax feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Merchant Portal - Marketplace Product + Tax feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
|-|-|
| Marketplace Product | dev-master |
| Tax | dev-master |

### 1) Install the required modules using Composer
Run the following commands to install the required modules:

```bash
composer require spryker/tax-merchant-portal-gui:"dev-master" --update-with-dependencies
```

***
**Verification**

Make sure that the following modules have been installed:

| Module | Expected Directory |
|-|-|
| TaxMerchantPortalGui | spryker/tax-merchant-portal-gui |

***

### 2) Set up transfer objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

***
**Verification**

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
|-|-|-|-|
| TaxSetCollection | class | Created | src/Generated/Shared/Transfer/TaxSetCollectionTransfer |
| TaxSet | class | Created | src/Generated/Shared/Transfer/TaxSetTransfer |

***

### 3) Set up behavior
Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
|-|-|-|-|
| TaxProductAbstractFormExpanderPlugin | Expands ProductAbstractForm with Tax Set field. | None | Spryker\Zed\TaxMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui |

**src\Pyz\Zed\ProductMerchantPortalGui\ProductMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductMerchantPortalGui;

use Spryker\Zed\ProductMerchantPortalGui\ProductMerchantPortalGuiDependencyProvider as SprykerProductMerchantPortalGuiDependencyProvider;
use Spryker\Zed\TaxMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui\TaxProductAbstractFormExpanderPlugin;

class ProductMerchantPortalGuiDependencyProvider extends SprykerProductMerchantPortalGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\ProductAbstractFormExpanderPluginInterface[]
     */
    protected function getProductAbstractFormExpanderPlugins(): array
    {
        return [
            new TaxProductAbstractFormExpanderPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure `ProductAbstractForm` has the `TaxSet` field.

---
