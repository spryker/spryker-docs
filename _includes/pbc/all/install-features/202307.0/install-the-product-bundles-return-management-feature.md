

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Product Bundles | {{page.version}} |
| Return Management | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Set up behavior

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductBundleReturnCreateFormHandlerPlugin | Expands `ReturnCreateForm` data with product bundles subforms. Handles form submit. | None | Spryker\Zed\ProductBundle\Communication\Plugin\SalesReturnGui |

**src/Pyz/Zed/SalesReturnGui/SalesReturnGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesReturnGui;

use Spryker\Zed\ProductBundle\Communication\Plugin\SalesReturnGui\ProductBundleReturnCreateFormHandlerPlugin;
use Spryker\Zed\SalesReturnGui\SalesReturnGuiDependencyProvider as SprykerSalesReturnGuiDependencyProvider;

class SalesReturnGuiDependencyProvider extends SprykerSalesReturnGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesReturnGuiExtension\Dependency\Plugin\ReturnCreateFormHandlerPluginInterface[]
     */
    protected function getReturnCreateFormHandlerPlugins(): array
    {
        return [
            new ProductBundleReturnCreateFormHandlerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that on return creation page in the Back Office UI, you are able to create returns for orders which have product bundles.

{% endinfo_block %}
