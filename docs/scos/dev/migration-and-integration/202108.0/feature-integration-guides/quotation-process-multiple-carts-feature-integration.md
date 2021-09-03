---
title: Quotation Process + Multiple Carts feature integration
originalLink: https://documentation.spryker.com/2021080/docs/quotation-process-multiple-carts-feature-integration
originalArticleId: 21c3cf23-8dae-4a61-b89f-b2e668fa4c50
redirect_from:
  - /2021080/docs/quotation-process-multiple-carts-feature-integration
  - /2021080/docs/en/quotation-process-multiple-carts-feature-integration
  - /docs/quotation-process-multiple-carts-feature-integration
  - /docs/en/quotation-process-multiple-carts-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Quotation Process | 202009.0 |
| Multiple Carts | 202009.0 |

### 1) Set up Behavior
Register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MultiCartQuotePersistPlugin` | Creates a new active customer cart. | None | `Spryker\Client\MultiCart\Plugin\PersistentCart` |

**src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PersistentCart;

use Spryker\Client\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;
use Spryker\Client\PersistentCartExtension\Dependency\Plugin\QuotePersistPluginInterface;
use Spryker\Client\MultiCart\Plugin\PersistentCart\MultiCartQuotePersistPlugin;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
    /**
     * @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\QuotePersistPluginInterface
     */
    protected function getQuotePersistPlugin(): QuotePersistPluginInterface
    {
        return new MultiCartQuotePersistPlugin();
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that when you converting quote request with status "Ready" to cart, new cart created instead of replacing the existing one.
{% endinfo_block %}
