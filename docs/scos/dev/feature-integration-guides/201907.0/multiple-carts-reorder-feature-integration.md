---
title: Multiple Carts- Reorder feature integration
description: The Reorder Feature allows reordering previous orders. This guide will walk you through the process of integrating the feature into your project.
last_updated: Dec 24, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/multiple-carts-reorder-feature-integration
originalArticleId: c2c6108e-b3bf-4b9b-b6fd-62b086870878
redirect_from:
  - /v3/docs/multiple-carts-reorder-feature-integration
  - /v3/docs/en/multiple-carts-reorder-feature-integration
related:
  - title: Multiple Carts per User Feature Overview
    link: docs/scos/user/features/page.version/multiple-carts-feature-overview.html
  - title: Reorder feature overview
    link: docs/scos/user/features/page.version/reorder-feature-overview.html
---

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Multiple Carts | 201903.0 |
| Reorder | 201903.0 |
| Spryker Core | 201903.0 |

### 1) Set up Behavior
Register the following plugins:
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `ReorderPersistentCartChangeExpanderPlugin` | Adds a default reorder name and adds it to add item request. | 1 |  `Spryker\Client\MultiCart\Plugin` |

<details open>
    <summary markdown='span'>src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php</summary>

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
<br>
</details>

{% info_block warningBox "Verification" %}
When using the reorder feature, a new customer quote must be created with the name "Cart from order {Order reference}".
{% endinfo_block %}
