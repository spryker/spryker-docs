---
title: Product Bundles + Return Management feature integration
description: This guide provides step-by-step instructions on integrating Product Bundles + Return Management feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-bundles-return-management-feature-integration
originalArticleId: 96f9c6c2-df79-4d9c-b057-e96077e78e77
redirect_from:
  - /2021080/docs/product-bundles-return-management-feature-integration
  - /2021080/docs/en/product-bundles-return-management-feature-integration
  - /docs/product-bundles-return-management-feature-integration
  - /docs/en/product-bundles-return-management-feature-integration
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

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
