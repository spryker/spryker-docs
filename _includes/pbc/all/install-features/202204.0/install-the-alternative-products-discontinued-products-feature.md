
This document describes how to integrate Alternative Products + Discontinued Products into a Spryker project.


This document describes how to integrate the Alternative Products + Discontinued Products into a Spryker project.

## Install feature core

Follow the steps below to install the Alternative Products + Discontinued Products feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | ---| --- |
| Alternative Products | {{page.version}} | [Alternative Products feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/alternative-products-feature-integration.html) |
|  Product | {{page.version}} | [Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-feature-integration.html) 0|

### 1) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| DiscontinuedCheckAlternativeProductApplicablePlugin | Checks if product alternatives should be shown for the product. | Expects `SKU `and `idProductConcrete` to be set for `ProductViewTransfer`. | Spryker\Client\ProductDiscontinuedStorage\Plugin\ProductAlternativeStorage |
| DiscontinuedCheckAlternativeProductApplicablePlugin | Checks if product alternatives should be shown for the product. | None | Spryker\Zed\ProductDiscontinued\Communication\Plugin\ProductAlternative |

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

{% info_block infoBox "Store relation" %}

If the [Product Labels feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-labels-feature-overview.html) is integrated into your project, make sure to define store relations for *Discontinued* and *Alternatives available* product labels by re-importing [product_label_store.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/file-details-product-label-store.csv.html). Otherwise, the product labels are not displayed on the Storefront.

{% endinfo_block %}
