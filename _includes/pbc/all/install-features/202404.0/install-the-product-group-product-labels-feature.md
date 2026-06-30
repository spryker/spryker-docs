

## Install feature core

Follow the steps below to install Product group + Product labels feature core.

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Product Group | {{page.version}} |
| Product Labels | {{page.version}} |


### Set up behavior

Register the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductLabelProductViewExpanderPlugin | Expands `ProductViewTransfer` with labels. | None | SprykerShop\Yves\ProductLabelWidget\Plugin\ProductGroupWidget |


```php
<?php

namespace Pyz\Yves\ProductGroupWidget;

use SprykerShop\Yves\ProductGroupWidget\ProductGroupWidgetDependencyProvider as SprykerShopProductGroupWidgetDependencyProvider;
use SprykerShop\Yves\ProductLabelWidget\Plugin\ProductGroupWidget\ProductLabelProductViewExpanderPlugin;

class ProductGroupWidgetDependencyProvider extends SprykerShopProductGroupWidgetDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ProductGroupWidgetExtension\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new ProductLabelProductViewExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the product label on a product abstract card changes correctly after hovering over a color selector.

{% endinfo_block %}
