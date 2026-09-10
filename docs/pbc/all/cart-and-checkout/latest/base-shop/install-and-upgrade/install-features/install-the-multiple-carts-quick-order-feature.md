---
title: Install the Multiple Carts + Quick Order feature
description: The Quick Order Feature allows ordering products by entering SKU and quantity on one page. The guide describes how to integrate the feature into your project.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/multiple-carts-quick-order-integration
originalArticleId: 4e32040b-3ec9-458c-8122-29d29aa64e45
redirect_from:
  - /2021080/docs/multiple-carts-quick-order-integration
  - /2021080/docs/en/multiple-carts-quick-order-integration
  - /docs/multiple-carts-quick-order-integration
  - /docs/en/multiple-carts-quick-order-integration
  - /docs/scos/dev/feature-integration-guides/202200.0/multiple-carts-quick-order-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202311.0/multiple-carts-quick-order-feature-integration.html  
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-quick-order-feature.html
---

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Multiple Carts | {{page.release_tag}} |
| Quick Add To Cart | {{page.release_tag}} |
| Spryker Core | {{page.release_tag}} |

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
| Multiple Carts | {{page.release_tag}} |
| Quick Add To Cart | {{page.release_tag}} |
| Spryker Core | {{page.release_tag}} |

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
