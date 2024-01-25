
This document describes how to install Merchant Portal Agent Assist feature.

## Install feature core

Follow the steps below to install the Merchant Portal Agent Assist feature core.

### Prerequisites

Install the required features:

| NAME                             | VERSION | INSTALLATION GUIDE  |
|----------------------------------| ------- | ------------------ |
| Marketplace Merchant Portal Core | {{page.version}}  | [Merchant Portal Core feature integration](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/merchant-portal-agent-assist:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                   | EXPECTED DIRECTORY                                           |
|------------------------------------------|--------------------------------------------------------------|
| AclMerchantAgent                         | vendor/spryker/acl-merchant-agent                            |
| AgentDashboardMerchantPortalGui          | vendor/spryker/agent-dashboard-merchant-portal-gui           |
| AgentDashboardMerchantPortalGuiExtension | vendor/spryker/agent-dashboard-merchant-portal-gui-extension |
| AgentSecurityBlockerMerchantPortal       | vendor/spryker/agent-security-blocker-merchant-portal        |
| AgentSecurityBlockerMerchantPortalGui    | vendor/spryker/agent-security-blocker-merchant-portal-gui    |
| AgentSecurityMerchantPortalGui           | vendor/spryker/agent-security-merchant-portal-gui            |
| MerchantAgent                            | vendor/spryker/merchant-agent                                |
| MerchantAgentGui                         | vendor/spryker/merchant-agent-gui                            |

{% endinfo_block %}

### Set up the configuration

Add the following configuration:

| CONFIGURATION                                                  | SPECIFICATION                                                                                                    | NAMESPACE                |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|--------------------------|
| AclConstants::ACL_DEFAULT_RULES                                | Default ACL rules working out of the box.                                                                        | Spryker\Shared\Acl       |
| AclMerchantAgentConfig::MERCHANT_AGENT_ACL_BUNDLE_ALLOWED_LIST | Collection of bundles which merchant agent has ACL access to.                                                    | Pyz\Zed\AclMerchantAgent |
| AclConfig::getInstallerRules()                                 | Default ACL rules added to the corresponding ACL rules DB table after executing `setup:init-db` console command. | Pyz\Zed\Acl              |

**config/Shared/config_default.php**

```php

use Spryker\Shared\Acl\AclConstants;
use Spryker\Shared\AgentSecurityBlockerMerchantPortal\AgentSecurityBlockerMerchantPortalConstants;

// ACL: Allow or disallow of urls for Zed Admin GUI for ALL users
$config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'agent-security-merchant-portal-gui',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
];

// >>> Security Blocker MerchantPortal agent
$config[AgentSecurityBlockerMerchantPortalConstants::AGENT_MERCHANT_PORTAL_BLOCK_FOR_SECONDS] = 360;
$config[AgentSecurityBlockerMerchantPortalConstants::AGENT_MERCHANT_PORTAL_BLOCKING_TTL] = 900;
$config[AgentSecurityBlockerMerchantPortalConstants::AGENT_MERCHANT_PORTAL_BLOCKING_NUMBER_OF_ATTEMPTS] = 9;

```

**src/Pyz/Zed/Acl/AclConfig.php**

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
            'agent-dashboard-merchant-portal-gui',
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

**src/Pyz/Zed/AclMerchantAgent/AclMerchantAgentConfig.php**

```php
<?php

namespace Pyz\Zed\AclMerchantAgent;

use Spryker\Zed\AclMerchantAgent\AclMerchantAgentConfig as SprykerAclMerchantAgentConfig;

class AclMerchantAgentConfig extends SprykerAclMerchantAgentConfig
{
    /**
     * @var list<string>
     */
    protected const MERCHANT_AGENT_ACL_BUNDLE_ALLOWED_LIST = [
        'agent-dashboard-merchant-portal-gui',
    ];
}
```

Run the following console command to execute registered installer plugins:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

After finishing the entire integration, ensure the following:
* You have access to the `mp.mysprykershop.com/agent-security-merchant-portal-gui/login` page.
* Try to enter not correct login/password more then 9 times during the 900 seconds and make sure you cannot access the
  `mp.mysprykershop.com/agent-security-merchant-portal-gui/login` page for 360 seconds.
* Log in as a Merchant agent and make sure you have access to 'mp.mysprykershop.com/agent-dashboard-merchant-portal-gui/merchant-users' page.
* Make sure that Back-office users don't have access to 'mp.mysprykershop.com/agent-dashboard-merchant-portal-gui/merchant-users' page.

{% endinfo_block %}

#### If you want to add a default `Merchant agent` user with `root` role:

Add the following configuration:

| CONFIGURATION                   | SPECIFICATION                                                              | NAMESPACE    |
|---------------------------------|----------------------------------------------------------------------------|--------------|
| UserConfig::getInstallerUsers() | Default users added to DB after executing `setup:init-db` console command. | Pyz\Zed\User |
| AclConfig::getInstallerUsers()  | Default ACL groups for users.                                              | Pyz\Zed\Acl  |

**src/Pyz/Zed/User/UserConfig.php**

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\User\UserConfig as SprykerUserConfig;

class UserConfig extends SprykerUserConfig
{
    /**
     * @return array<array<string, mixed>>
     */
    public function getInstallerUsers(): array
    {
        return [
                // Example data
                [
                    'firstName' => 'Agent',
                    'lastName' => 'Merchant',
                    'password' => 'change123',
                    'username' => 'agent-merchant@spryker.com',
                    'isMerchantAgent' => 1,
                    'localeName' => 'en_US',
                ],
            ];
        }
}
```

**src/Pyz/Zed/Acl/AclConfig.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @return array<string, array<string, mixed>>
     */
    public function getInstallerUsers(): array
    {
        return [
            'agent-merchant@spryker.com' => [
                'group' => AclConstants::ROOT_GROUP,
            ],
        ];
    }
}
```

Run the following console command to execute registered installer plugins:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

After finishing the entire integration, ensure the following:
* You have a new Back-office user with the credentials specified in `UserConfig::getInstallerUsers()` which can login 
to both Back-office and to Merchant Portal as Agent.

{% endinfo_block %}

### Set up database schema and transfer objects


1. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

**Verification**

Make sure the following changes have been applied by checking your database:

| DATABASE ENTITY            | TYPE   | EVENT   |
|----------------------------|--------| ------- |
| spy_user.is_merchant_agent | column | created |

Make sure the following changes have been triggered in transfer objects:

| TRANSFER   | TYPE   | EVENT   | PATH   |
| ---------- | ------ | ------- | ------ |
| User.isMerchantAgent                                      | property | created | src/Generated/Shared/Transfer/User                                    |

### Add translations

Add translations as follows:

1. Append glossary for the feature:

```
agent_security_blocker_merchant_portal_gui.error.account_blocked,"Too many log in attempts from your address. Please wait %minutes% minutes before trying again.",en_US
agent_security_blocker_merchant_portal_gui.error.account_blocked,"Warten Sie bitte %minutes% Minuten, bevor Sie es erneut versuchen.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

**Verification**

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}


### Set up behavior

| PLUGIN                                                                | SPECIFICATION                                                                                                         | PREREQUISITES | NAMESPACE                                                                                 |
|-----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------|
| AgentMerchantPortalSecurityBlockerConfigurationSettingsExpanderPlugin | Expands security blocker configuration settings with agent merchant portal settings.                                  |               | Spryker\Client\AgentSecurityBlockerMerchantPortal\Plugin\SecurityBlocker                  |
| ZedAgentMerchantUserSecurityPlugin                                    | Extends security service with AgentMerchantUser firewall.                                                             |               | Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\Security                  |
| SecurityBlockerAgentMerchantPortalEventDispatcherPlugin               | Denies agent access in case of exceeding the failed merchant portal agent login attempts limit.                       |               | Spryker\Zed\AgentSecurityBlockerMerchantPortalGui\Communication\Plugin\EventDispatcher    |
| MerchantAgentAclAccessCheckerStrategyPlugin                           | Checks if the merchant agent ACL access checker strategy is applicable for the given user and rule.                   |               | Spryker\Zed\AclMerchantAgent\Communication\Plugin\Acl                                     |
| AgentMerchantUserCriteriaExpanderPlugin                               | Sets `null` to `MerchantUserCriteria.status` and `MerchantUserCriteria.merchantStatus` for Merchant agents.           |               | Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\SecurityMerchantPortalGui |
| MerchantAgentUserQueryCriteriaExpanderPlugin                          | Expands the user's table query criteria with the `isMerchantAgent` condition.                                         |               | Spryker\Zed\MerchantAgent\Communication\Plugin\User                                       |
| MerchantAgentUserFormExpanderPlugin                                   | Expands the user's form with the `is_merchant_agent` checkbox.                                                        |               | Spryker\Zed\MerchantAgentGui\Communication\Plugin\User                                    |
| MerchantAgentUserTableConfigExpanderPlugin                            | Expands the user's table with the `isMerchantAgent` column.                                                           |               | Spryker\Zed\MerchantAgentGui\Communication\Plugin\User                                    |
| MerchantAgentUserTableDataExpanderPlugin                              | Expands the user's table `isMerchantAgent` column with data.                                                          |               | Spryker\Zed\MerchantAgent\Communication\Plugin\User                                       |
| BackofficeAllowedAclGroupMerchantUserTableDataExpanderPlugin          | Sets null to the response data under the `assistUser` keys for users belonging to ACL groups with Back-office access. |               | Spryker\Zed\AclMerchantPortal\Communication\Plugin\AgentDashboardMerchantPortalGui        |

**src/Pyz/Client/SecurityBlocker/SecurityBlockerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SecurityBlocker;

use Spryker\Client\AgentSecurityBlockerMerchantPortal\Plugin\SecurityBlocker\AgentMerchantPortalSecurityBlockerConfigurationSettingsExpanderPlugin;
use Spryker\Client\SecurityBlocker\SecurityBlockerDependencyProvider as SprykerSecurityBlockerDependencyProvider;

/**
 * @method \Spryker\Client\SecurityBlocker\SecurityBlockerConfig getConfig()
 */
class SecurityBlockerDependencyProvider extends SprykerSecurityBlockerDependencyProvider
{
    /**
     * @return list<\Spryker\Client\SecurityBlockerExtension\Dependency\Plugin\SecurityBlockerConfigurationSettingsExpanderPluginInterface>
     */
    protected function getSecurityBlockerConfigurationSettingsExpanderPlugins(): array
    {
        return 
            new AgentMerchantPortalSecurityBlockerConfigurationSettingsExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Security/SecurityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Security;

use Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\Security\ZedAgentMerchantUserSecurityPlugin;
use Spryker\Zed\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface>
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new ZedAgentMerchantUserSecurityPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\AgentSecurityBlockerMerchantPortalGui\Communication\Plugin\EventDispatcher\SecurityBlockerAgentMerchantPortalEventDispatcherPlugin;
use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new SecurityBlockerAgentMerchantPortalEventDispatcherPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Acl/AclDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Zed\Acl\AclDependencyProvider as SprykerAclDependencyProvider;
use Spryker\Zed\AclMerchantAgent\Communication\Plugin\Acl\MerchantAgentAclAccessCheckerStrategyPlugin;

class AclDependencyProvider extends SprykerAclDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AclExtension\Dependency\Plugin\AclAccessCheckerStrategyPluginInterface>
     */
    protected function getAclAccessCheckerStrategyPlugins(): array
    {
        return [
            new MerchantAgentAclAccessCheckerStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\SecurityMerchantPortalGui\AgentMerchantUserCriteriaExpanderPlugin;
use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiDependencyProvider as SprykerSecurityMerchantPortalGuiDependencyProvider;

class SecurityMerchantPortalGuiDependencyProvider extends SprykerSecurityMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SecurityMerchantPortalGuiExtension\Dependency\Plugin\MerchantUserCriteriaExpanderPluginInterface>
     */
    protected function getMerchantUserCriteriaExpanderPlugins(): array
    {
        return [
            new AgentMerchantUserCriteriaExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/User/UserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\MerchantAgent\Communication\Plugin\User\MerchantAgentUserQueryCriteriaExpanderPlugin;
use Spryker\Zed\MerchantAgentGui\Communication\Plugin\User\MerchantAgentUserFormExpanderPlugin;
use Spryker\Zed\MerchantAgentGui\Communication\Plugin\User\MerchantAgentUserTableConfigExpanderPlugin;
use Spryker\Zed\MerchantAgentGui\Communication\Plugin\User\MerchantAgentUserTableDataExpanderPlugin;
use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;

class UserDependencyProvider extends SprykerUserDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface>
     */
    protected function getUserFormExpanderPlugins(): array
    {
        return [
            new MerchantAgentUserFormExpanderPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\UserExtension\Dependency\Plugin\UserTableConfigExpanderPluginInterface>
     */
    protected function getUserTableConfigExpanderPlugins(): array
    {
        return [
            new MerchantAgentUserTableConfigExpanderPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\UserExtension\Dependency\Plugin\UserTableDataExpanderPluginInterface>
     */
    protected function getUserTableDataExpanderPlugins(): array
    {
        return [
            new MerchantAgentUserTableDataExpanderPlugin(),
        ];
    }
    
     /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserQueryCriteriaExpanderPluginInterface>
     */
    protected function getUserQueryCriteriaExpanderPlugins(): array
    {
        return [
            new MerchantAgentUserQueryCriteriaExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/AgentDashboardMerchantPortalGui/AgentDashboardMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AgentDashboardMerchantPortalGui;

use Spryker\Zed\AclMerchantPortal\Communication\Plugin\AgentDashboardMerchantPortalGui\BackofficeAllowedAclGroupMerchantUserTableDataExpanderPlugin;
use Spryker\Zed\AgentDashboardMerchantPortalGui\AgentDashboardMerchantPortalGuiDependencyProvider as SprykerAgentDashboardMerchantPortalGuiDependencyProvider;

class AgentDashboardMerchantPortalGuiDependencyProvider extends SprykerAgentDashboardMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AgentDashboardMerchantPortalGuiExtension\Dependency\Plugin\MerchantUserTableDataExpanderPluginInterface>
     */
    protected function getMerchantUserTableDataExpanderPlugins(): array
    {
        return [
            new BackofficeAllowedAclGroupMerchantUserTableDataExpanderPlugin(),
        ];
    }
}
```

**Verification**

{% info_block warningBox "Verification" %}

* Log in to Back-office as `root` user, go to `backoffice.mysprykershop.com/user` page and make sure you can see a new `Agent Merchant` column in the `Users list` table.
* Click on `Edit` and make sure you can see the new `THIS USER IS AN AGENT IN MERCHANT PORTAL` role.
* Make sure that users with this role assigned have `Agent` label in the `Users list` table.

* Go to `mp.mysprykershop.com/agent-security-merchant-portal-gui/login` page and make sure the users with `Agent Merchant`
role can login.
* After logging in make sure you are on the `mp.mysprykershop.com/agent-dashboard-merchant-portal-gui/merchant-users` page
and you can see the `Merchant Users` table.
* Make sure you can see and assist the users without dependency on their status.
* Make sure you don't see `Assist User` button for merchant users which have `root` tole.
* Make sure you can assist the users which have `Assist User` button in the table.

* Go to `mp.mysprykershop.com/agent-security-merchant-portal-gui/login` page and try to enter not correct login/password 
more then 9 times during the 900 seconds and make sure you cannot access the 
`mp.mysprykershop.com/agent-security-merchant-portal-gui/login` page for 360 seconds.

{% endinfo_block %}
 
### Configure navigation

1. Add the `AgentDashboardMerchantPortalGui` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <agent-dashboard-merchant-portal-gui>
        <label>Merchant Users</label>
        <title>Merchant Users</title>
        <icon>user-group</icon>
        <bundle>agent-dashboard-merchant-portal-gui</bundle>
        <controller>merchant-users</controller>
        <action>index</action>
    </agent-dashboard-merchant-portal-gui>
</config>
```

2. Execute the following command:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

* Login as an Agent to Merchant Portal and make sure `Merchant Users` section is presented in the navigation.

{% endinfo_block %}

{% info_block infoBox %}

We highly recommend adding an extra layer of security by introducing a VPN, IP whitelisting, or additional authentication for mp.mysprykershop.com/agent-security-merchant-portal-gui/login page.
This ensures that only authorized users can log in as an Agent to Merchant Portal.

{% endinfo_block %}