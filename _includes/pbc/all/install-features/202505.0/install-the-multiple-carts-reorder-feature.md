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

1. Log in on the Storefront as a customer.
2. Go to the orders.
3. Select an existing order and click the reorder button.

Make sure the following applies:
* On the Storefront: 
    - A new cart has been created
    - The cart name follows the format: `Cart from order {Order reference}`
    - All available items from the original order have been added to the cart
* In the `spy_quote` database table, the newly created quote record contains the `name` field in the format: `Cart from order {Original order reference}`

{% endinfo_block %}






































