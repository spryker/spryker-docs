---
title: Eco- Punchout Catalogs + Product Bundles Feature Integration
description: Integrate Eco- Punchout Catalogs + Product Bundles Feature into the Spryker Commerce OS.
last_updated: Apr 15, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/eco-punchout-catalogs-product-bundles-feature-integration
originalArticleId: e85dfa32-c141-495e-b19a-e0b2a6b7612e
redirect_from:
  - /v5/docs/eco-punchout-catalogs-product-bundles-feature-integration
  - /v5/docs/en/eco-punchout-catalogs-product-bundles-feature-integration
  - /docs/scos/user/technology-partners/202005.0/order-management-erpoms/punchout-catalogs/eco-punchout-catalogs-product-bundles-feature-integration.html
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Product Bundles | {{page.version}} |
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
