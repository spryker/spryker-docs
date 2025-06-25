This document describes how to install Merchant Portal Merchant B2B Contracts feature.

## Prerequisites

Install the required features:

| NAME                             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                        |
|----------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core | 202507.0 | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |
| Merchant B2B Contracts           | 202507.0 | [Install the Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-feature.html)                            |

## 1) Install the required modules

```bash
composer require spryker-feature/marketplace-merchant-contracts: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                         | EXPECTED DIRECTORY                                                 |
|------------------------------------------------|--------------------------------------------------------------------|
| MerchantRelationshipMerchantPortalGui          | vendor/spryker/merchant-relationship-merchant-portal-gui           |
| MerchantRelationshipMerchantPortalGuiExtension | vendor/spryker/merchant-relationship-merchant-portal-gui-extension |

{% endinfo_block %}

## 2) Set up the configuration

1. Add the following configuration:

| CONFIGURATION                  | SPECIFICATION                                                                                          | NAMESPACE   |
|--------------------------------|--------------------------------------------------------------------------------------------------------|-------------|
| AclConfig::getInstallerRules() | The default ACL rules that are added to the respective database table after executing `setup:init-db`. | Pyz\Zed\Acl |

<details>
<summary>src/Pyz/Zed/Acl/AclConfig.php</summary>

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @var string
     */
    protected const RULE_TYPE_DENY = 'deny';

    /**
     * @return array<array<string, mixed>>
     */
    public function getInstallerRules(): array
    {
        $installerRules = parent::getInstallerRules();
        $installerRules = $this->addMerchantPortalInstallerRules($installerRules);

        return $installerRules;
    }

    /**
     * @param array<array<string, mixed>> $installerRules
     *
     * @return array<array<string, mixed>>
     */
    protected function addMerchantPortalInstallerRules(array $installerRules): array
    {
        $bundleNames = [
            'merchant-relationship-merchant-portal-gui',
        ];

        foreach ($bundleNames as $bundleName) {
            $installerRules[] = [
                'bundle' => $bundleName,
                'controller' => AclConstants::VALIDATOR_WILDCARD,
                'action' => AclConstants::VALIDATOR_WILDCARD,
                'type' => static::RULE_TYPE_DENY,
                'role' => AclConstants::ROOT_ROLE,
            ];
        }
        return $installerRules;
    }
}
```

</details>

2. Execute the registered installer plugins:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

- The following page is available for Merchant Portal users: `https://mp.mysprykershop.com/merchant-relationship-merchant-portal-gui/merchant-relationship`.
- Back Office users don't have access to `https://mp.mysprykershop.com/merchant-relationship-merchant-portal-gui/merchant-relationship`.

{% endinfo_block %}

## 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| Transfer                          | Type  | Event   | Path                                                                    |
|-----------------------------------|-------|---------|-------------------------------------------------------------------------|
| MerchantRelationshipTableCriteria | class | created | src/Generated/Shared/Transfer/MerchantRelationshipTableCriteriaTransfer |

{% endinfo_block %}

## 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                          | SPECIFICATION                                          | PREREQUISITES | NAMESPACE                                                                                         |
|-------------------------------------------------|--------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------------|
| MerchantRelationshipMerchantDashboardCardPlugin | Adds the merchant relation card to the merchant dashboard. |               | Spryker\Zed\MerchantRelationshipMerchantPortalGui\Communication\Plugin\DashboardMerchantPortalGui |

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

In the Merchant Portal, go to **Dashboard**. On the **Dashboard** page, make sure the **B2B Contracts** pane is
displayed.

{% endinfo_block %}

## 5) Configure navigation

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

In the Merchant Portal, make sure **B2B Contracts** and **Merchant Relations** navigation menu items are displayed.

{% endinfo_block %}
