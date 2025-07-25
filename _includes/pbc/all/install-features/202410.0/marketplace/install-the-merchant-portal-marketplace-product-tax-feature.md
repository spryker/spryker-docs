
This document describes how to install the Merchant Portal - Marketplace Product + Tax feature.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Product + Tax feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Marketplace Product | {{page.version}} | [Install the Marketplace Product feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html) |
| Marketplace Merchant Portal Core | {{page.version}}  | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |
| Tax | {{page.version}} | [Install the Tax feature](https://github.com/spryker-feature/tax) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/tax-merchant-portal-gui:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| TaxMerchantPortalGui | spryker/tax-merchant-portal-gui |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
|-|-|-|-|
| TaxSetCollection | class | Created | src/Generated/Shared/Transfer/TaxSetCollectionTransfer |
| TaxSet | class | Created | src/Generated/Shared/Transfer/TaxSetTransfer |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| TaxProductAbstractFormExpanderPlugin | Expands `ProductAbstractForm` with the *Tax Set* field. |  | Spryker\Zed\TaxMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui |

**src\Pyz\Zed\ProductMerchantPortalGui\ProductMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductMerchantPortalGui;

use Spryker\Zed\ProductMerchantPortalGui\ProductMerchantPortalGuiDependencyProvider as SprykerProductMerchantPortalGuiDependencyProvider;
use Spryker\Zed\TaxMerchantPortalGui\Communication\Plugin\ProductMerchantPortalGui\TaxProductAbstractFormExpanderPlugin;

class ProductMerchantPortalGuiDependencyProvider extends SprykerProductMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductMerchantPortalGuiExtension\Dependency\Plugin\ProductAbstractFormExpanderPluginInterface>
     */
    protected function getProductAbstractFormExpanderPlugins(): array
    {
        return [
            new TaxProductAbstractFormExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure `ProductAbstractForm` has the `TaxSet` field.

{% endinfo_block %}
