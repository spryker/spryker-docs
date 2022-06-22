---
title: Quotation Process + Multiple Carts feature integration
description: The guide describes how to install the Quotation Process and Multiple Carts features in your project.
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/quotation-process-multiple-carts-feature-integration
originalArticleId: af15aaa5-f925-4664-b148-4cdc93aef935
redirect_from:
  - /v3/docs/quotation-process-multiple-carts-feature-integration
  - /v3/docs/en/quotation-process-multiple-carts-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Quotation Process | 201907.0 |
| Multiple Carts | 201907.0 |

### 1) Set up Behavior
Register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MultiCartQuotePersistPlugin` | Creates a new active customer cart. | None | `Spryker\Client\MultiCart\Plugin\PersistentCart` |

<details open>
<summary markdown='span'>src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php</summary>

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
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that when you converting quote request with status "Ready" to cart, new cart created instead of replacing the existing one.
{% endinfo_block %}

