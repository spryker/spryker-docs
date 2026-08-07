---
title: Install the Product Bundles + Return Management feature
description: This guide provides step-by-step instructions on integrating Product Bundles + Return Management feature into your project.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-bundles-return-management-feature-integration
originalArticleId: 96f9c6c2-df79-4d9c-b057-e96077e78e77
redirect_from:
  - /2021080/docs/product-bundles-return-management-feature-integration
  - /2021080/docs/en/product-bundles-return-management-feature-integration
  - /docs/product-bundles-return-management-feature-integration
  - /docs/en/product-bundles-return-management-feature-integration
  - /docs/scos/dev/feature-integration-guides/202311.0/product-bundles-return-management-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202204.0/return-management-feature-integration.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/install-features/install-the-product-bundles-return-management-feature.html
---
## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Product Bundles | {{page.release_tag}} |
| Return Management | {{page.release_tag}} |
| Spryker Core | {{page.release_tag}} |

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
