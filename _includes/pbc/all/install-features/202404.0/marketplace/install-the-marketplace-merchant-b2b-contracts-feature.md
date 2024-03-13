
This document describes how to install Merchant Portal Merchant B2B Contracts feature.

## Install feature core

### Prerequisites

Install the required features:

| NAME                             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                        |
|----------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core | {{page.version}} | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |
| Merchant B2B Contracts           | {{page.version}} | [Install the Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-feature.html)                            |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/marketplace-merchant-contracts: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE                                         | EXPECTED DIRECTORY                                                 |
|------------------------------------------------|--------------------------------------------------------------------|
| MerchantRelationshipMerchantPortalGui          | vendor/spryker/merchant-relationship-merchant-portal-gui           |
| MerchantRelationshipMerchantPortalGuiExtension | vendor/spryker/merchant-relationship-merchant-portal-gui-extension |

{% endinfo_block %}

### 2) Set up transfer objects

Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer                                      | Type   | Event   | Path                                                                                |
|-----------------------------------------------|--------|---------|-------------------------------------------------------------------------------------|
| MerchantRelationshipTableCriteria             | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipTableCriteriaTransfer             |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                             | SPECIFICATION                                                                                         | PREREQUISITES | NAMESPACE                                                                                |
|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------------|
| MerchantRelationshipMerchantDashboardCardPlugin                    | Adds Merchant relation card to the merchant dashboard.                                                |               | Spryker\Zed\MerchantRelationshipMerchantPortalGui\Communication\Plugin\AclMerchantPortal |

**src/Pyz/Zed/DashboardMerchantPortalGui/DashboardMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DashboardMerchantPortalGui;

use Spryker\Zed\DashboardMerchantPortalGui\DashboardMerchantPortalGuiDependencyProvider as SprykerDashboardMerchantPortalGuiDependencyProvider;
use Spryker\Zed\MerchantRelationshipMerchantPortalGui\Communication\Plugin\DashboardMerchantPortalGui\MerchantRelationshipMerchantDashboardCardPlugin;

class DashboardMerchantPortalGuiDependencyProvider extends SprykerDashboardMerchantPortalGuiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DashboardMerchantPortalGuiExtension\Dependency\Plugin\MerchantDashboardCardPluginInterface>
     */
    protected function getDashboardCardPlugins(): array
    {
        return [
            new MerchantRelationshipMerchantDashboardCardPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

In the Merchant Portal, go to **Dashboard**. On the **Dashboard** page, make sure the **B2B Contracts** pane is displayed.

{% endinfo_block %}

### 4) Configure navigation

1. Add the `MerchantRelationshipMerchantPortalGui` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <b2b-contracts>
        <label>B2B Contracts</label>
        <title>B2B Contracts</title>
        <icon>contracts</icon>
        <pages>
            <merchant-relationship-merchant-portal-gui>
                <label>Merchant Relations</label>
                <title>Merchant Relations</title>
                <bundle>merchant-relationship-merchant-portal-gui</bundle>
                <controller>merchant-relationship</controller>
                <action>index</action>
            </merchant-relationship-merchant-portal-gui>
        </pages>
    </b2b-contracts>
</config>
```

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Log in to the Merchant Portal. Make sure there are **B2B Contracts** and **Merchant Relations** navigation menu items.

{% endinfo_block %}