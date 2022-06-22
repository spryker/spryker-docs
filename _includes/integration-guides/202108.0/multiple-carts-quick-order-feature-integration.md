---
title: Multiple Carts + Quick Order feature integration
description: The Quick Order Feature allows ordering products by entering SKU and quantity on one page. The guide describes how to integrate the feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/multiple-carts-quick-order-integration
originalArticleId: 4e32040b-3ec9-458c-8122-29d29aa64e45
redirect_from:
  - /2021080/docs/multiple-carts-quick-order-integration
  - /2021080/docs/en/multiple-carts-quick-order-integration
  - /docs/multiple-carts-quick-order-integration
  - /docs/en/multiple-carts-quick-order-integration
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Multiple Carts | {{page.version}} |
| Quick Add To Cart | {{page.version}} |
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

Please overview and install the necessary features before beginning the integration step.

| NAME | VERSION |
| --- | --- |
| Multiple Carts | {{page.version}} |
| Quick Add To Cart | {{page.version}} |
| Spryker Core | {{page.version}} |

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

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets have been registered:

| MODULE | TEST |
| --- | --- |
| QuickOrderPageWidget | Go to the **Quick Order** page. A shopping cart list should be added to the **Add to cart** form. |

{% endinfo_block %}
