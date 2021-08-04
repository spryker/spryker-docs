---
title: Multiple Carts- Reorder Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/multiple-carts-reorder-feature-integration-201811
redirect_from:
  - /v1/docs/multiple-carts-reorder-feature-integration-201811
  - /v1/docs/en/multiple-carts-reorder-feature-integration-201811
---

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Multiple Carts | 2018.11.0 |
| Reorder | 2018.11.0 |
| Spryker Core | 2018.11.0 |

### 1) Set up Behavior

Register the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `ReorderPersistentCartChangeExpanderPlugin` | Adds a default reorder name and adds it to add item request. | 1 |  `Spryker\Client\MultiCart\Plugin`|

<details open>
<summary>src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php</summary>

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

{% info_block warningBox %}
When using the reorder feature, a new customer quote must be created with the name "Cart from order {Order reference}".
{% endinfo_block %}
