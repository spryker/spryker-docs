---
title: Quotation Process + Multiple Carts feature integration
last_updated: May 12, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/quotation-process-multiple-carts-feature-integration
originalArticleId: 968034d5-40af-4cac-925e-6a7372eadf73
redirect_from:
  - /v5/docs/quotation-process-multiple-carts-feature-integration
  - /v5/docs/en/quotation-process-multiple-carts-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Quotation Process | master |
| Multiple Carts | master |

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

