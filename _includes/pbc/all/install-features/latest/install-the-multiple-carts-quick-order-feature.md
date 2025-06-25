

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Multiple Carts | 202507.0 |
| Quick Add To Cart | 202507.0 |
| Spryker Core |{{page.version}} |

### 1) Set up behavior

Register the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| QuickOrderQuoteNameExpanderPlugin | Adds a default quick order name and adds it to add item request. |  | Spryker\Client\MultiCart\Plugin |

**src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PersistentCart;

use Spryker\Client\MultiCart\Plugin\QuickOrderQuoteNameExpanderPlugin;
use Spryker\Client\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
             /**
             * @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\PersistentCartChangeExpanderPluginInterface[]
             */
             protected function getChangeRequestExtendPlugins(): array
             {
                            return [
                                            new QuickOrderQuoteNameExpanderPlugin(),
             ];
     }
}
```

{% info_block warningBox "Verification" %}

If items have been added to the cart with parameter `createOrder`, a new customer cart must be created with the name "Quick order {date of creation}".

{% endinfo_block %}

## Install feature frontend

### Prerequisites

Install the following required features:

| NAME | VERSION |
| --- | --- |
| Multiple Carts | 202507.0 |
| Quick Add To Cart | 202507.0 |
| Spryker Core | 202507.0 |

### 1) Set up widgets

Register the following global widget:

| WIDGET | DESCRIPTION | NAMESPACE |
| --- | --- | --- |
| QuickOrderPageWidget | Shows a cart list in the quick order page. |  SprykerShop\Yves\MultiCartWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MultiCartWidget\Widget\QuickOrderPageWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
 /**
 * @return string[]
 */
 protected function getGlobalWidgets(): array
 {
 return [
 QuickOrderPageWidget::class,
 ];
 }
}
```

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE | TEST |
| --- | --- |
| QuickOrderPageWidget | Go to the **Quick Order** page. A shopping cart list should be added to the **Add to cart** form. |

{% endinfo_block %}
