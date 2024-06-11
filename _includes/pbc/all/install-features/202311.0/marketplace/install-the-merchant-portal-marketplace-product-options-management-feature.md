

This document describes how to install the Merchant Portal — Marketplace Product Options Management.

## Install feature core

Follow the steps below to install the Merchant Portal — Marketplace Product Options Management core.

### Prerequisites

To start integration, integrate the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Marketplace Product Options| {{page.version}} | [Marketplace Product Options feature integration](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-options-feature.html) |
| Merchant Portal Marketplace Order Management | {{page.version}} | [Install the Merchant Portal Marketplace Order Management feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-order-management-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-option-merchant-portal-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOptionMerchantPortalGui | vendor/spryker/product-option-merchant-portal-gui |

{% endinfo_block %}

### 2) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| ProductOptionMerchantOrderItemTableExpanderPlugin | Expands `MerchantOrderItemTable` with Product options column settings and data. | None | \Spryker\Zed\ProductOptionMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui |

**src/Pyz/Zed/SalesMerchantPortalGui/SalesMerchantPortalGuiDependencyProvider.php**

```php

<?php

namespace Pyz\Zed\SalesMerchantPortalGui;

use Spryker\Zed\ProductOptionMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui\ProductOptionMerchantOrderItemTableExpanderPlugin;
use Spryker\Zed\SalesMerchantPortalGui\SalesMerchantPortalGuiDependencyProvider as SprykerSalesMerchantPortalGuiDependencyProvider;

class SalesMerchantPortalGuiDependencyProvider extends SprykerSalesMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\ProductConcreteTableExpanderPluginInterface>
     */
    protected function getProductConcreteTableExpanderPlugins(): array
    {
        return [
            new ProductOptionMerchantOrderItemTableExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the order item table has product option column settings and displays the correct data in the `http://mp.mysprykershop.com/sales-merchant-portal-gui/item-list`

{% endinfo_block %}
