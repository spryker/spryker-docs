---
title: Alternative Products + Discontinued Products feature integration
description: This guide describes all the steps needed to be performed in order to integrate the Alternative Products + Discontinued Products features into your project.
last_updated: Apr 24, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/alternative-products-discontinued-products-feature-integration
originalArticleId: 0218d00c-f8a9-4bb4-abb3-510e46ac5628
redirect_from:
  - /v5/docs/alternative-products-discontinued-products-feature-integration
  - /v5/docs/en/alternative-products-discontinued-products-feature-integration
---

## Install Feature Core
### Prerequisites
Please review and install the necessary features before beginning the integration.

| Name | Version |
| --- | --- |
| Alternative Products | master |
| Discontinued Products | master |

### 1) Set up Behavior
Register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `DiscontinuedCheckAlternativeProductApplicablePlugin` | Checks if product alternatives should be shown for the product. | Expects `SKU `and `idProductConcrete` to be set for `ProductViewTransfer`. | `Spryker\Client\ProductDiscontinuedStorage\Plugin\ProductAlternativeStorage` |
| `DiscontinuedCheckAlternativeProductApplicablePlugin` | Checks if product alternatives should be shown for the product. | None | `Spryker\Zed\ProductDiscontinued\Communication\Plugin\ProductAlternative` |

**src/Pyz/Client/ProductAlternativeStorage/ProductAlternativeStorageDependencyProvider.php**

```php
<?php
 
namespace Pyz\Client\ProductAlternativeStorage;
 
use Spryker\Client\ProductAlternativeStorage\ProductAlternativeStorageDependencyProvider as SprykerProductAlternativeStorageDependencyProvider;
use Spryker\Client\ProductDiscontinuedStorage\Plugin\ProductAlternativeStorage\DiscontinuedCheckAlternativeProductApplicablePlugin;
 
class ProductAlternativeStorageDependencyProvider extends SprykerProductAlternativeStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\ProductAlternativeStorageExtension\Dependency\Plugin\AlternativeProductApplicablePluginInterface[]
     */
    protected function getAlternativeProductApplicableCheckPlugins(): array
    {
        return [
            new DiscontinuedCheckAlternativeProductApplicablePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductAlternative/ProductAlternativeDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\ProductAlternative;
 
use Spryker\Zed\ProductAlternative\ProductAlternativeDependencyProvider as SprykerProductAlternativeDependencyProvider;
use Spryker\Zed\ProductDiscontinued\Communication\Plugin\ProductAlternative\DiscontinuedCheckAlternativeProductApplicablePlugin;
 
class ProductAlternativeDependencyProvider extends SprykerProductAlternativeDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductAlternativeExtension\Dependency\Plugin\AlternativeProductApplicablePluginInterface[]
     */
    protected function getAlternativeProductApplicablePlugins(): array
    {
        return [
            new DiscontinuedCheckAlternativeProductApplicablePlugin(), #ProductDiscontinuedFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that you can see alternatives for products that are marked as **discontinued** on the product details page.
{% endinfo_block %}
