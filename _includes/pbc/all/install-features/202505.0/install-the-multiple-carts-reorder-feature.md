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

To verify the `DefaultReorderQuoteNameCartPreReorderPlugin` functionality:

1. Log in to the customer account in the Storefront
2. Navigate to the Orders section in My Account
3. Select an existing order and click the "Reorder" button
4. Verify the following:
    - A new quote (cart) has been created automatically
    - The new cart name follows the format "Cart from order {Order reference}"
    - All available items from the original order are added to the cart
5. Additionally, verify in the database:
    - Check the `spy_quote` table
    - Find the newly created quote record for this customer
    - Confirm the `name` field contains "Cart from order {Original order reference}"

{% endinfo_block %}






































