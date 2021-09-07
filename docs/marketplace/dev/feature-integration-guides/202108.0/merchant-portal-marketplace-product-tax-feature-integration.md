---
title: Merchant Portal - Marketplace Product + Tax feature integration
last_updated: Jan 05, 2021
description: This integration guide provides steps on how to integrate the Merchant Portal - Marketplace Product + Tax feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Product + Tax feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Product + Tax feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Product | {{page.version}} | [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html) |
| Tax | {{page.version}} | [Tax feature integration](https://github.com/spryker-feature/tax)

### 1) Install the required modules using Composer

Install the required modules:

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

Make sure that the following changes have been applied in transfer objects:

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

{% info_block warningBox "Verification" %}

Make sure `ProductAbstractForm` has the `TaxSet` field.

{% endinfo_block %}
