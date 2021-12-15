---
title: Eco- Punchout Catalogs + Product Bundles Feature Integration
description: Integrate Eco- Punchout Catalogs + Product Bundles Feature into the Spryker Commerce OS.
last_updated: Mar 5, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/eco-punchout-catalogs-product-bundles-feature-integration
originalArticleId: 1d5d5e64-47f0-45df-b094-b04b869577d3
redirect_from:
  - /v4/docs/eco-punchout-catalogs-product-bundles-feature-integration
  - /v4/docs/en/eco-punchout-catalogs-product-bundles-feature-integration
  - /docs/scos/user/technology-partners/202001.0/order-management-erpoms/punchout-catalogs/eco-punchout-catalogs-product-bundles-feature-integration.html
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Product Bundles | 201907.0 |
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

{% info_block infoBox "Verification" %}
Make sure that, when you create new punchout catalog connection, the form contains Bundle Mode field.
{% endinfo_block %}
