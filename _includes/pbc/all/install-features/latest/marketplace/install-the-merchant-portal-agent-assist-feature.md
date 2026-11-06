
This document describes how to install Merchant Portal Agent Assist feature.

## Prerequisites

Install the required features:

| NAME                             | VERSION | INSTALLATION GUIDE  |
|----------------------------------| ------- | ------------------ |
| Marketplace Merchant Portal Core | {{page.release_tag}} | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/marketplace-agent-assist:"{{page.release_tag}}" spryker/agent-dashboard-merchant-portal-gui:"1.0.0" spryker/agent-security-blocker-merchant-portal-gui:"1.1.0" spryker/agent-security-merchant-portal-gui:"1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

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

1. Add the following configuration:

| CONFIGURATION                                                  | SPECIFICATION                                                                                                    | NAMESPACE                |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|--------------------------|
| AclConstants::ACL_DEFAULT_RULES                                | Default ACL rules.                                                           | Spryker\Shared\Acl       |
| AclMerchantAgentConfig::MERCHANT_AGENT_ACL_BUNDLE_ALLOWED_LIST | A collection of bundles a merchant agent has ACL access to.                                                    | Pyz\Zed\AclMerchantAgent |
| AclConfig::getInstallerRules()                                 | The default ACL rules that are added to a respective database table after executing `setup:init-db`. | Pyz\Zed\Acl              |

**config/Shared/config_default.php**

```php

use Spryker\Shared\Acl\AclConstants;
use Spryker\Shared\AgentSecurityBlockerMerchantPortal\AgentSecurityBlockerMerchantPortalConstants;

// ACL: Allow or disallow URLs for Zed Admin GUI for ALL users
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

The `AGENT_MERCHANT_PORTAL_*` settings count failed logins per IP address. To also count the login attempts of a merchant agent per account and require a CAPTCHA, select the `ip-and-account` login protection strategy. The attempts are counted in the `user` login realm, together with all other logins of the user. For the realm thresholds and the difference between the strategies, see [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-spryker-core-back-office-feature.html#configure-the-per-account-login-protection-for-users) and [Set up SecurityBlocker](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html#set-up-securityblocker).

**src/Pyz/Zed/AgentSecurityBlockerMerchantPortalGui/AgentSecurityBlockerMerchantPortalGuiConfig.php**

```php
<?php

namespace Pyz\Zed\AgentSecurityBlockerMerchantPortalGui;

use Spryker\Zed\AgentSecurityBlockerMerchantPortalGui\AgentSecurityBlockerMerchantPortalGuiConfig as SprykerAgentSecurityBlockerMerchantPortalGuiConfig;

class AgentSecurityBlockerMerchantPortalGuiConfig extends SprykerAgentSecurityBlockerMerchantPortalGuiConfig
{
    protected const string LOGIN_PROTECTION_STRATEGY = self::LOGIN_PROTECTION_STRATEGY_IP_AND_ACCOUNT;
}
```

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

</details>

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

2. Execute the registered installer plugins:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

- Make sure the page is available: `https://mp.mysprykershop.com/agent-security-merchant-portal-gui/login`.
- Enter incorrect login details for more than nine times within 900 seconds. Make sure this locks you out of the login page for 360 seconds.
- Log in as a merchant agent into the Merchant Portal. Make sure you have access to `https://mp.mysprykershop.com/agent-dashboard-merchant-portal-gui/merchant-users`.
- Make sure Back Office users don't have access to `https://mp.mysprykershop.com/agent-dashboard-merchant-portal-gui/merchant-users`.

{% endinfo_block %}

#### Optional: Add a default merchant agent user with the root role

1. Add the following configuration:

| CONFIGURATION                   | SPECIFICATION                                                              | NAMESPACE    |
|---------------------------------|----------------------------------------------------------------------------|--------------|
| UserConfig::getInstallerUsers() | The default users added to the database after executing `setup:init-db`. | Pyz\Zed\User |
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

2. Execute the registered installer plugins:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

The created Back Office user with the credentials specified in `UserConfig::getInstallerUsers()` can log into the Back Office and Merchant Portal as an agent.

{% endinfo_block %}

### Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied by checking your database:

| DATABASE ENTITY            | TYPE   | EVENT   |
|----------------------------|--------| ------- |
| spy_user.is_merchant_agent | column | created |

Make sure the following changes have been triggered in transfer objects:

| TRANSFER   | TYPE   | EVENT   | PATH   |
| ---------- | ------ | ------- | ------ |
| User.isMerchantAgent                                      | property | created | src/Generated/Shared/Transfer/User                                    |

{% endinfo_block %}

### Add translations

1. Append the glossary:

```csv
agent_security_blocker_merchant_portal_gui.error.account_blocked,"Too many login attempts. Please wait %minutes% minutes before trying again.",en_US
agent_security_blocker_merchant_portal_gui.error.account_blocked,"Zu viele Anmeldeversuche. Bitte warten Sie %minutes% Minuten, bevor Sie es erneut versuchen.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` database tables.

{% endinfo_block %}


### Set up behavior

| PLUGIN                                                                | SPECIFICATION                                                                                                           | PREREQUISITES | NAMESPACE                                                                                 |
|-----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------|
| AgentMerchantPortalSecurityBlockerConfigurationSettingsExpanderPlugin | Expands security blocker configuration settings with agent merchant portal settings.                                    |               | Spryker\Client\AgentSecurityBlockerMerchantPortal\Plugin\SecurityBlocker                  |
| ZedAgentMerchantUserSecurityPlugin                                    | Extends the security service with the AgentMerchantUser firewall.                                                       |               | Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\Security                  |
| SecurityBlockerAgentMerchantPortalEventDispatcherPlugin               | Denies access to an agent after exceeding the limit of failed merchant portal agent login attempts.                        |               | Spryker\Zed\AgentSecurityBlockerMerchantPortalGui\Communication\Plugin\EventDispatcher    |
| AgentMerchantPortalLoginFormCaptchaExpanderPlugin                     | Adds the CAPTCHA field to the Merchant Portal agent login form when the login protection requires a CAPTCHA for the account, the IP address, or the whole `user` login realm. | The CAPTCHA step-up and the Zed CAPTCHA form theme are set up. | Spryker\Zed\AgentSecurityBlockerMerchantPortalGui\Communication\Plugin\SecurityMerchantPortalGui |
| MerchantAgentAclAccessCheckerStrategyPlugin                           | Checks if the merchant agent ACL access checker strategy is applicable for a given user and rule.                     |               | Spryker\Zed\AclMerchantAgent\Communication\Plugin\Acl                                     |
| AgentMerchantUserCriteriaExpanderPlugin                               | Sets `null` for `MerchantUserCriteria.status` and `MerchantUserCriteria.merchantStatus` for Merchant agents.            |               | Spryker\Zed\AgentSecurityMerchantPortalGui\Communication\Plugin\SecurityMerchantPortalGui |
| MerchantAgentUserQueryCriteriaExpanderPlugin                          | Expands a user's table query criteria with the `isMerchantAgent` condition.                                           |               | Spryker\Zed\MerchantAgent\Communication\Plugin\User                                       |
| MerchantAgentUserFormExpanderPlugin                                   | Expands a user's form with the `is_merchant_agent` checkbox.                                                          |               | Spryker\Zed\MerchantAgentGui\Communication\Plugin\User                                    |
| MerchantAgentUserTableConfigExpanderPlugin                            | Expands a user's table with the `isMerchantAgent` column.                                                             |               | Spryker\Zed\MerchantAgentGui\Communication\Plugin\User                                    |
| MerchantAgentUserTableDataExpanderPlugin                              | Expands a user's `isMerchantAgent` table column with data.                                                            |               | Spryker\Zed\MerchantAgent\Communication\Plugin\User                                       |
| BackofficeAllowedAclGroupMerchantUserTableDataExpanderPlugin          | Sets `null` to the response data under the `assistUser` keys for users belonging to ACL groups with Back Office access. |               | Spryker\Zed\AclMerchantPortal\Communication\Plugin\AgentDashboardMerchantPortalGui        |
| MerchantUserTwigPlugin                                                | Adds the `merchantName` Twig global variable.                                                                               |               | Spryker\Zed\MerchantUser\Communication\Plugin\Twig                                        |
| MerchantUserSecurityTokenUpdateMerchantUserPostChangePlugin           | Rewrites the Symfony security token for merchant users with `MerchantUser` and without `IS_IMPERSONATOR` roles granted.     |               | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\UserMerchantPortalGui          |

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
        return [
            new AgentMerchantPortalSecurityBlockerConfigurationSettingsExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox %}

If `SecurityDependencyProvider::getSecurityPlugins()` already contains plugins, add the `ZedAgentMerchantUserSecurityPlugin` as *first* in the list.

{% endinfo_block %}
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

**src/Pyz/Zed/AgentSecurityMerchantPortalGui/AgentSecurityMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AgentSecurityMerchantPortalGui;

use Spryker\Zed\AgentSecurityBlockerMerchantPortalGui\Communication\Plugin\SecurityMerchantPortalGui\AgentMerchantPortalLoginFormCaptchaExpanderPlugin;
use Spryker\Zed\AgentSecurityMerchantPortalGui\AgentSecurityMerchantPortalGuiDependencyProvider as SprykerAgentSecurityMerchantPortalGuiDependencyProvider;

class AgentSecurityMerchantPortalGuiDependencyProvider extends SprykerAgentSecurityMerchantPortalGuiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SecurityMerchantPortalGuiExtension\Dependency\Plugin\MerchantPortalLoginFormExpanderPluginInterface>
     */
    protected function getMerchantPortalAgentLoginFormExpanderPlugins(): array
    {
        return [
            new AgentMerchantPortalLoginFormCaptchaExpanderPlugin(),
        ];
    }
}
```

If your project overrides `@AgentSecurityMerchantPortalGui/Login/index.twig`, add the CAPTCHA field before the submit button with `form_widget`, as described for the Merchant Portal login in [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html#set-up-the-merchant-portal-login-protection).

<details>
<summary>src/Pyz/Zed/User/UserDependencyProvider.php</summary>

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

</details>

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

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\MerchantUser\Communication\Plugin\Twig\MerchantUserTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new MerchantUserTwigPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/UserMerchantPortalGui/UserMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\UserMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\UserMerchantPortalGui\MerchantUserSecurityTokenUpdateMerchantUserPostChangePlugin;
use Spryker\Zed\UserMerchantPortalGui\UserMerchantPortalGuiDependencyProvider as SprykerUserMerchantPortalGuiDependencyProvider;

class UserMerchantPortalGuiDependencyProvider extends SprykerUserMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\UserMerchantPortalGuiExtension\Dependency\Plugin\MerchantUserPostChangePluginInterface>
     */
    public function getMerchantUserPostChangePlugins(): array
    {
        return [
            new MerchantUserSecurityTokenUpdateMerchantUserPostChangePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Log into the Back Office as a `root` user.
2. Go to **Users** > **Users**.
  Make sure there is an **Agent Merchant** column in the **USERS LIST** table.

3. Next to a user of your choice, click **Edit**.
    On the **Edit User** page, make sure there is a **THIS USER IS AN AGENT IN MERCHANT PORTAL** checkbox.


4. Click the **THIS USER IS AN AGENT IN MERCHANT PORTAL** checkbox.
5. Click **Update**.
  On the **Users** page, make sure the updated user has the `Agent` label in the **Agent Merchant** column.

6. Go to `https://mp.mysprykershop.com/agent-security-merchant-portal-gui/login`.
7. Log in with the login details of the user you've added the agent merchant role to.
    Make sure this opens `https://mp.mysprykershop.com/agent-dashboard-merchant-portal-gui/merchant-users` and there is a **Merchant Users** table.

- Make sure you can see and assist the users regardless of their status.
- Make sure the **Assist User** button  isn't displayed for merchant users with the **root** role.
- Make sure you can assist the users that have the **Assist User** button next to them.

{% endinfo_block %}

{% info_block warningBox "Verification" %}


1. Go to `https://mp.mysprykershop.com/agent-security-merchant-portal-gui/login`.
2. Enter a wrong password for a merchant agent three times.
    Make sure the login form shows a security check with a checkbox.
3. Complete the security check and enter a wrong password until the login is rejected with the `Too many login attempts. Please wait 6 minutes before trying again.` notification.
    Make sure a login with the correct password is rejected with the same notification for 360 seconds.

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

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Log in as an agent to the Merchant Portal. Make sure there is the **Merchant Users** navigation menu item.

{% endinfo_block %}


## Install feature frontend

For installing frontend dependencies, follow [Set up the Merchant Portal](/docs/dg/dev/frontend-development/latest/marketplace/set-up-the-merchant-portal.html).

Once everything has been installed, you can access the UI of Merchant Portal Agent Assist at `$[local_domain]/agent-security-merchant-portal-gui/login`.

## Optional: Add extra security

We highly recommend adding an extra layer of security by introducing a VPN, IP whitelisting, or additional authentication for the `https://mp.mysprykershop.com/agent-security-merchant-portal-gui/login` page.
