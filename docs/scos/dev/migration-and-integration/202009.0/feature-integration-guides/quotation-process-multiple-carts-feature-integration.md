---
title: Quotation process + multiple carts feature integration
originalLink: https://documentation.spryker.com/v6/docs/quotation-process-multiple-carts-feature-integration
redirect_from:
  - /v6/docs/quotation-process-multiple-carts-feature-integration
  - /v6/docs/en/quotation-process-multiple-carts-feature-integration
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

