---
title: Multiple Carts + Reorder feature integration
description: The Reorder Feature allows reordering previous orders. This guide will walk you through the process of integrating the feature into your project.
last_updated: Apr 30, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/multiple-carts-reorder-feature-integration
originalArticleId: 2954b8f8-b1bd-410a-bb61-5f28585ef2c6
redirect_from:
  - /v5/docs/multiple-carts-reorder-feature-integration
  - /v5/docs/en/multiple-carts-reorder-feature-integration
---

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Multiple Carts | {{page.version}} |
| Reorder | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Set up Behavior
Register the following plugins:
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `ReorderPersistentCartChangeExpanderPlugin` | Adds a default reorder name and adds it to add item request. | 1 |  `Spryker\Client\MultiCart\Plugin` |

**src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PersistentCart;

use Spryker\Client\MultiCart\Plugin\ReorderPersistentCartChangeExpanderPlugin;
use Spryker\Client\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
 /**
 * @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\PersistentCartChangeExpanderPluginInterface[]
 */
 protected function getChangeRequestExtendPlugins(): array
 {
 return [
 new ReorderPersistentCartChangeExpanderPlugin(),
 ];
 }
}
```

{% info_block warningBox "Verification" %}
When using the reorder feature, a new customer quote must be created with the name "Cart from order {Order reference}".
{% endinfo_block %}
