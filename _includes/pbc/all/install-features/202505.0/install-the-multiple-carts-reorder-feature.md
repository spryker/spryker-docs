This document describes how to install the Multiple Carts + Reorder feature.

## Prerequisites

Install the required features:

| NAME           | VERSION          |
|----------------|------------------|
| Multiple Carts | {{page.version}} |
| Reorder        | {{page.version}} |
| Spryker Core   | {{page.version}} |

## 1) Set up behavior

Register the following plugins:

| PLUGIN                                      | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                              |
|---------------------------------------------|--------------------------------------------------------------|---------------|--------------------------------------------------------|
| DefaultReorderQuoteNameCartPreReorderPlugin | Sets quote reorder name to `CartReorderTransfer.quote.name`. |           | Spryker\Zed\MultiCart\Communication\Plugin\CartReorder |

**src/Pyz/Zed/CartReorder/CartReorderDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartReorder;

use Spryker\Zed\CartReorder\CartReorderDependencyProvider as SprykerCartReorderDependencyProvider;
use Spryker\Zed\MultiCart\Communication\Plugin\CartReorder\DefaultReorderQuoteNameCartPreReorderPlugin;

class CartReorderDependencyProvider extends SprykerCartReorderDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CartReorderExtension\Dependency\Plugin\CartPreReorderPluginInterface>
     */
    protected function getCartPreReorderPlugins(): array
    {
        return [
            new DefaultReorderQuoteNameCartPreReorderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

When using the reorder feature, a new customer quote must be created with the name "Cart from order {Order reference}".

{% endinfo_block %}






































