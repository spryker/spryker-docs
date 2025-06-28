

## Install feature core

Follow the steps below to install Product group + Product rating & review feature core.

### Prerequisites

Install the required features:


| NAME | VERSION |
| --- | --- |
| Product Group | 202507.0 |
| Product Rating & Reviews | 202507.0 |


### Set up behavior

Register the following plugin:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductReviewSummaryProductViewExpanderPlugin | Expands `ProductViewTransfer` with the product review summary data (average rating). | None | SprykerShop\Yves\ProductReviewWidget\Plugin\ProductGroupWidget |


```php
<?php

namespace Pyz\Yves\ProductGroupWidget;

use SprykerShop\Yves\ProductGroupWidget\ProductGroupWidgetDependencyProvider as SprykerShopProductGroupWidgetDependencyProvider;
use SprykerShop\Yves\ProductReviewWidget\Plugin\ProductGroupWidget\ProductReviewSummaryProductViewExpanderPlugin;

class ProductGroupWidgetDependencyProvider extends SprykerShopProductGroupWidgetDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ProductGroupWidgetExtension\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new ProductReviewSummaryProductViewExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the product rating on a product abstract card changes correctly after hovering over a color selector.

{% endinfo_block %}
