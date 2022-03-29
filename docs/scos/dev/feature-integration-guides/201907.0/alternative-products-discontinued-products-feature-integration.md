---
title: Alternative Products + Discontinued Products feature integration
description: This guide describes all the steps needed to be performed in order to integrate the Alternative Products + Discontinued Products features into your project.
last_updated: Dec 24, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/alternative-products-discontinued-products-feature-integration
originalArticleId: 3c84dc13-161f-48be-9351-770ed2bd1085
redirect_from:
  - /v3/docs/alternative-products-discontinued-products-feature-integration
  - /v3/docs/en/alternative-products-discontinued-products-feature-integration
---

## Install Feature Core
### Prerequisites
Please review and install the necessary features before beginning the integration.

| Name | Version |
| --- | --- |
| Alternative Products | 201903.0 |
| Discontinued Products | 201903.0 |

### 1) Set up Behavior
Register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `DiscontinuedCheckAlternativeProductApplicablePlugin` | Checks if product alternatives should be shown for the product. | Expects `SKU `and `idProductConcrete` to be set for `ProductViewTransfer`. | `Spryker\Client\ProductDiscontinuedStorage\Plugin\ProductAlternativeStorage` |
| `DiscontinuedCheckAlternativeProductApplicablePlugin` | Checks if product alternatives should be shown for the product. | None | `Spryker\Zed\ProductDiscontinued\Communication\Plugin\ProductAlternative` |

<details open>
<summary markdown='span'>src/Pyz/Client/ProductAlternativeStorage/ProductAlternativeStorageDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/ProductAlternative/ProductAlternativeDependencyProvider.php</summary>

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
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that you can see alternatives for products that are marked as **discontinued** on the product details page.
{% endinfo_block %}
