---
title: Eco- Punchout Catalogs + Product Bundles Feature Integration
description: Integrate Eco- Punchout Catalogs + Product Bundles Feature into the Spryker Commerce OS.
last_updated: Nov 6, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/eco-punchout-catalogs-product-bundles-feature-integration
originalArticleId: 29647cd7-bcfa-4a0f-8ce7-5446022c3fc1
redirect_from:
  - /v6/docs/eco-punchout-catalogs-product-bundles-feature-integration
  - /v6/docs/en/eco-punchout-catalogs-product-bundles-feature-integration
  - /docs/scos/user/technology-partners/202009.0/order-management-erpoms/punchout-catalogs/eco-punchout-catalogs-product-bundles-feature-integration.html
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Product Bundles | 202009.0 |
To start feature integration, overview and install the necessary packages:


| Name | Version |
| --- | --- |
| Eco: Punchout Catalogs | 1.0.0 |

### 1) Set up Behavior
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `BundleModePunchoutCatalogSetupRequestFormExtensionPlugin` | Expands punchout catalog connection form with Bundle Mode field. | None |`SprykerEco\Zed\PunchoutCatalogs\Communication\Plugin\PunchoutCatalogs` |

**src/Pyz/Zed/PunchoutCatalogs/PunchoutCatalogsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PunchoutCatalogs;

use SprykerEco\Zed\PunchoutCatalogs\Communication\Plugin\PunchoutCatalogs\BundleModePunchoutCatalogSetupRequestFormExtensionPlugin;
use SprykerEco\Zed\PunchoutCatalogs\PunchoutCatalogsDependencyProvider as SprykerPunchoutCatalogsDependencyProvider;

class PunchoutCatalogsDependencyProvider extends SprykerPunchoutCatalogsDependencyProvider
{
    /**
     * @return \SprykerEco\Zed\PunchoutCatalogs\Dependency\Plugin\PunchoutCatalogSetupRequestFormExtensionPluginInterface[]
     */
    protected function getPunchoutCatalogSetupRequestFormExtensionPlugins(): array
    {
        return [
            new BundleModePunchoutCatalogSetupRequestFormExtensionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that, when you create new punchout catalog connection, the form contains Bundle Mode field.
{% endinfo_block %}
