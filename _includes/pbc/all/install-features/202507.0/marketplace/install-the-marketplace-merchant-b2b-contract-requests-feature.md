
This document describes how to install Merchant Portal Merchant B2B Contract Requests feature.

## Prerequisites

Install the required features:

| NAME                             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                        |
|----------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core | 202507.0 | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |
| Merchant B2B Contract Requests   | 202507.0 | [Install the Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-b2b-contract-requests-feature.html)                    |

## 1) Install the required modules

```bash
composer require spryker-feature/marketplace-merchant-contract-requests: "202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                         | EXPECTED DIRECTORY                                           |
|------------------------------------------------|--------------------------------------------------------------|
| MerchantRelationRequestMerchantPortalGui       | vendor/spryker/merchant-relation-request-merchant-portal-gui |

{% endinfo_block %}

## 2) Set up the configuration

Add the following configuration:

| CONFIGURATION                  | SPECIFICATION                                                                                           | NAMESPACE   |
|--------------------------------|---------------------------------------------------------------------------------------------------------|-------------|
| AclConfig::getInstallerRules() | The default ACL rules that are added to the respective database table after executing `setup:init-db`.  | Pyz\Zed\Acl |

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
            'merchant-relation-request-merchant-portal-gui',
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

- The following page is available for Merchant Portal users: `https://mp.mysprykershop.com/merchant-relation-request-merchant-portal-gui/merchant-relation-requests`.
- Back Office users don't have access to `https://mp.mysprykershop.com/merchant-relation-request-merchant-portal-gui/merchant-relation-requests`.

{% endinfo_block %}

## 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| Transfer                                       | Type   | Event   | Path                                                                                 |
|------------------------------------------------|--------|---------|--------------------------------------------------------------------------------------|
| MerchantRelationRequestTableCriteria           | class  | created | src/Generated/Shared/Transfer/MerchantRelationRequestTableCriteriaTransfer           |
| MerchantRelationRequestFormActionConfiguration | class  | created | src/Generated/Shared/Transfer/MerchantRelationRequestFormActionConfigurationTransfer |

{% endinfo_block %}

## 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                         | SPECIFICATION                                                                                                | PREREQUISITES | NAMESPACE                                                                                                       |
|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------|
| IsOpenForRelationRequestOnlineProfileMerchantProfileFormExpanderPlugin         | Expands `OnlineProfileMerchantProfileForm` with the field that defines the merchant relation request allowance. |               | Spryker\Zed\MerchantRelationRequestMerchantPortalGui\Communication\Plugin\MerchantProfileMerchantPortalGui      |
| MerchantNotificationOfMerchantRelationRequestCreationMailTypeBuilderPlugin     | Builds `MailTransfer` with the data for the  merchant notification mail.                                          |               | Spryker\Zed\MerchantRelationRequestMerchantPortalGui\Communication\Plugin\Mail                                  |
| MerchantNotificationMerchantRelationRequestPostCreatePlugin                    | After a merchant relation request is created, sends a notification to the merchant.                                   |               | Spryker\Zed\MerchantRelationRequestMerchantPortalGui\Communication\Plugin\MerchantRelationRequest               |
| MerchantRelationRequestMerchantRelationshipMerchantDashboardCardExpanderPlugin | Expands the provided `MerchantDashboardCardTransfer` with merchant relation request data.                        |               | Spryker\Zed\MerchantRelationRequestMerchantPortalGui\Communication\Plugin\MerchantRelationshipMerchantPortalGui |

**src/Pyz/Zed/MerchantProfileMerchantPortalGui/MerchantProfileMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantProfileMerchantPortalGui;

use Spryker\Zed\MerchantProfileMerchantPortalGui\MerchantProfileMerchantPortalGuiDependencyProvider as SprykerMerchantProfileMerchantPortalGuiDependencyProvider;
use Spryker\Zed\MerchantRelationRequestMerchantPortalGui\Communication\Plugin\MerchantProfileMerchantPortalGui\IsOpenForRelationRequestOnlineProfileMerchantProfileFormExpanderPlugin;

class MerchantProfileMerchantPortalGuiDependencyProvider extends SprykerMerchantProfileMerchantPortalGuiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantProfileMerchantPortalGuiExtension\Dependency\Plugin\OnlineProfileMerchantProfileFormExpanderPluginInterface>
     */
    protected function getOnlineProfileMerchantProfileFormExpanderPlugins(): array
    {
        return [
            new IsOpenForRelationRequestOnlineProfileMerchantProfileFormExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Merchant Portal, go to **Merchant Profile**.
2. On the **Profile** page, click the **Online Profile** tab.
  Make sure the **Allow merchant relation requests** checkbox is displayed.

{% endinfo_block %}

**src/Pyz/Zed/MerchantRelationshipMerchantPortalGui/MerchantRelationshipMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRelationshipMerchantPortalGui;

use Spryker\Zed\MerchantRelationRequestMerchantPortalGui\Communication\Plugin\MerchantRelationshipMerchantPortalGui\MerchantRelationRequestMerchantRelationshipMerchantDashboardCardExpanderPlugin;
use Spryker\Zed\MerchantRelationshipMerchantPortalGui\MerchantRelationshipMerchantPortalGuiDependencyProvider as SprykerMerchantRelationshipMerchantPortalGuiDependencyProvider;

class MerchantRelationshipMerchantPortalGuiDependencyProvider extends SprykerMerchantRelationshipMerchantPortalGuiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantRelationshipMerchantPortalGuiExtension\Dependency\Plugin\MerchantRelationshipMerchantDashboardCardExpanderPluginInterface>
     */
    protected function getMerchantRelationshipMerchantDashboardCardExpanderPlugins(): array
    {
        return [
            new MerchantRelationRequestMerchantRelationshipMerchantDashboardCardExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

In the Merchant Portal, go to **Dashboard**. On the **Dashboard** page, make sure that in the **B2B Contracts** pane, the **Merchant Relation Requests** section and the **Manage Pending Requests** button are displayed.

{% endinfo_block %}

**src/Pyz/Zed\Mail/MailDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\MerchantRelationRequestMerchantPortalGui\Communication\Plugin\Mail\MerchantNotificationOfMerchantRelationRequestCreationMailTypeBuilderPlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface>
     */
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            new MerchantNotificationOfMerchantRelationRequestCreationMailTypeBuilderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/MerchantRelationRequest/MerchantRelationRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRelationRequest;

use Spryker\Zed\MerchantRelationRequest\MerchantRelationRequestDependencyProvider as SprykerMerchantRelationRequestDependencyProvider;
use Spryker\Zed\MerchantRelationRequestMerchantPortalGui\Communication\Plugin\MerchantRelationRequest\MerchantNotificationMerchantRelationRequestPostCreatePlugin;

class MerchantRelationRequestDependencyProvider extends SprykerMerchantRelationRequestDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantRelationRequestExtension\Dependency\Plugin\MerchantRelationRequestPostCreatePluginInterface>
     */
    protected function getMerchantRelationRequestPostCreatePlugins(): array
    {
        return [
            new MerchantNotificationMerchantRelationRequestPostCreatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, when a merchant relation request is created, the merchant receives a notification email.

{% endinfo_block %}

## 5) Configure navigation

1. Add the `MerchantRelationRequestMerchantPortalGui` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <b2b-contracts>
        <label>B2B Contracts</label>
        <title>B2B Contracts</title>
        <icon>contracts</icon>
        <pages>
            <merchant-relation-request-merchant-portal-gui>
                <label>Merchant Relation Requests</label>
                <title>Merchant Relation Requests</title>
                <bundle>merchant-relation-request-merchant-portal-gui</bundle>
                <controller>merchant-relation-requests</controller>
                <action>index</action>
            </merchant-relation-request-merchant-portal-gui>
        </pages>
    </b2b-contracts>
</config>
```

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

In the Merchant Portal, make sure the **B2B Contracts** and **Merchant Relation Requests** navigation menu items are displayed.

{% endinfo_block %}
