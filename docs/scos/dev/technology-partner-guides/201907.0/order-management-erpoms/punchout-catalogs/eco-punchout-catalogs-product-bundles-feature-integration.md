---
title: Eco- Punchout Catalogs + Product Bundles Feature Integration
description: Integrate Eco- Punchout Catalogs + Product Bundles Feature into the Spryker Commerce OS.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/eco-punchout-catalogs-product-bundles-feature-integration
originalArticleId: 7194c77e-5d8c-412d-b73c-22a187c6cdd9
redirect_from:
  - /v3/docs/eco-punchout-catalogs-product-bundles-feature-integration
  - /v3/docs/en/eco-punchout-catalogs-product-bundles-feature-integration
  - /docs/scos/user/technology-partners/201907.0/order-management-erpoms/punchout-catalogs/eco-punchout-catalogs-product-bundles-feature-integration.html  
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

<details open>
<summary markdown='span'>src/Pyz/Zed/PunchoutCatalogs/PunchoutCatalogsDependencyProvider.php</summary>

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
<br>
</details>
{% info_block infoBox "Verification" %}
Make sure that, when you create new punchout catalog connection, the form contains Bundle Mode field.
{% endinfo_block %}
