---
title: Multiple Carts + Quick Order Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/multiple-carts-quick-order-integration-201903
redirect_from:
  - /v5/docs/multiple-carts-quick-order-integration-201903
  - /v5/docs/en/multiple-carts-quick-order-integration-201903
---

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Multiple Carts | master |
| Quick Add To Cart | master |
| Spryker Core |master |

### 1) Set up Behavior

Register the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `QuickOrderQuoteNameExpanderPlugin` | Adds a default quick order name and adds it to add item request. |  |  `Spryker\Client\MultiCart\Plugin` |

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

## Install Feature Frontend

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Multiple Carts | master |
| Quick Add To Cart | master |
| Spryker Core | master |

### 1) Set up Widgets

Register the following global widget:

| Widget | Description | Namespace |
| --- | --- | --- |
|  `QuickOrderPageWidget` | Shows a cart list in the quick order page. |  `SprykerShop\Yves\MultiCartWidget\Widget` |

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

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}
Make sure that the following widgets have been registered:<table><thead><tr><th>Module</th><th>Test</th></tr></thead><tbody><tr><td>`QuickOrderPageWidget`</td><td>Go to the **Quick Order** page. A shopping cart list should be added to the **Add to cart** form.</td></tr></tbody></table>
{% endinfo_block %}
