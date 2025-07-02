

This document describes how to install the [Agent Assist](/docs/pbc/all/user-management/{{site.version}}/base-shop/agent-assist-feature-overview.html) feature.

## Install feature core

Follow the steps below to install the Agent Assist feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                                               |
|--------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                            |
| Product      | {{site.version}} | [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/{{site.version}}/install-and-upgrade/install-the-spryker-core-back-office-feature.html) |
| Cart         | {{site.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html)                                  |

### 1) Install the required modules

```bash
composer require spryker-feature/agent-assist:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                         | EXPECTED DIRECTORY                               |
|--------------------------------|--------------------------------------------------|
| Agent                          | vendor/spryker/agent                             |
| AgentGui                       | vendor/spryker/agent-gui                         |
| SecurityBlockerStorefrontAgent | vendor/spryker/security-blocker-storefront-agent |

{% endinfo_block %}

### 2) Set up the database schema

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database::

| DATABASE ENTITY     | TYPE   | EVENT   |
|---------------------|--------|---------|
| spy_user.is_agent   | column | created |

Make sure the following transfers have been created:

| TRANSFER                                     | TYPE  | EVENT   | PATH                                                                       |
|----------------------------------------------|-------|---------|----------------------------------------------------------------------------|
| UserTransfer                                 | class | created | src/Generated/Shared/Transfer/UserTransfer                                 |
| SessionEntityRequestTransfer                 | class | created | src/Generated/Shared/Transfer/SessionEntityRequestTransfer                 |
| SessionEntityResponseTransfer                | class | created | src/Generated/Shared/Transfer/SessionEntityResponseTransfer                |
| SecurityBlockerConfigurationSettingsTransfer | class | created | src/Generated/Shared/Transfer/SecurityBlockerConfigurationSettingsTransfer |

{% endinfo_block %}

### 3) Set up behavior

Set up the following behaviors.

#### Configure the user Zed UI for agent handling

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                        | DESCRIPTION                                                                                               | PREREQUISITES                                            | NAMESPACE                                               |
|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------|---------------------------------------------------------|
| UserAgentFormExpanderPlugin                                                   | In the Back Office, adds the **THIS USER IN AS AN AGENT** checkbox to the **Create new User** and **Edit User** pages.                                                     |                                                      | Spryker\Zed\AgentGui\Communication\Plugin               |
| UserAgentTableConfigExpanderPlugin                                            | In the Back Office, adds the **AGENT** column to the **USERS LIST** table.                                                     |                                                      | Spryker\Zed\AgentGui\Communication\Plugin               |
| UserAgentTableDataExpanderPlugin                                              | In the Back Office, in the **USERS LIST** table, fills the **AGENT** column.                                                    | Expects the **THIS USER IN AS AN AGENT** checkbox on the **Create new User** and **Edit User** pages of the Back Office. | Spryker\Zed\AgentGui\Communication\Plugin               |

<details><summary>src/Pyz/Zed/User/UserDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\AgentGui\Communication\Plugin\UserAgentFormExpanderPlugin;
use Spryker\Zed\AgentGui\Communication\Plugin\UserAgentTableConfigExpanderPlugin;
use Spryker\Zed\AgentGui\Communication\Plugin\UserAgentTableDataExpanderPlugin;
use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;

class UserDependencyProvider extends SprykerUserDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface>
     */
    protected function getUserFormExpanderPlugins(): array
    {
        return [
            new UserAgentFormExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserTableConfigExpanderPluginInterface>
     */
    protected function getUserTableConfigExpanderPlugins(): array
    {
        return [
            new UserAgentTableConfigExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserTableDataExpanderPluginInterface>
     */
    protected function getUserTableDataExpanderPlugins(): array
    {
        return [
            new UserAgentTableDataExpanderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Ensure that the following plugins have been registered:

| MODULE                             | TEST                                                                                                                                                                                                                                                                                                                                                                                           |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UserAgentFormExpanderPlugin        | 1. In the Back Office, go to **Users&nbsp;<span aria-label="and then">></span> Users**. <br>2. Next to a user, click **Edit**.  <br>3. Ensure that the **THIS USER IS AN AGENT** checkbox exists.                                                                                                                                                                                                                                      |
| UserAgentTableConfigExpanderPlugin | 1. In the Back Office, go to **Users&nbsp;<span aria-label="and then">></span> Users**. <br>2. Ensure that the **Agent** column exists.                                                                                                                                                                                                                                                                                                  |
| UserAgentTableDataExpanderPlugin   | 1. In the Back Office, go to **Users&nbsp;<span aria-label="and then">></span> Users**. <br>2. Next to a non-agent user, select **Edit**. <br>3. Select the **THIS USER IS AN AGENT** checkbox. <br>4. Click **Update**. This opens the **USERS LIST** page with the message about the successful update displayed. <br>5. Make sure that, in the **AGENT** column, next to the user you've updated, the **Agent** tag is displayed. |

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the feature frontend.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                                               |
|--------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                            |

### 1) Install the required modules

```bash
composer require spryker-feature/agent-assist:"{{site.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                 | EXPECTED DIRECTORY                           |
|------------------------|----------------------------------------------|
| AgentPage              | vendor/spryker-shop/agent-page               |
| AgentWidget            | vendor/spryker-shop/agent-widget             |
| SessionAgentValidation | vendor/spryker-shop/session-agent-validation |

{% endinfo_block %}

### 2) Set up configuration

1. By default, posting a login form (where `SecurityBlocker` makes its check and blocks agents who made too many failed login attempts) is locale-independent. So, to see error messages translated into different languages, you need to configure the locale to be added to the agent login path. To do it, update the configuration:

**src/Pyz/Yves/AgentPage/AgentPageConfig.php**

```php
<?php

namespace Pyz\Yves\AgentPage;

use SprykerShop\Yves\AgentPage\AgentPageConfig as SprykerAgentPageConfig;

class AgentPageConfig extends SprykerAgentPageConfig
{
    /**
     * @return bool
     */
    public function isLocaleInLoginCheckPath(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, when the login form for the agent is submitted, the URL it uses contains a locale code. For example, `/de/agent/login_check` is the default value for an agent.

{% endinfo_block %}

2. Add environment configuration for the agent security:

| CONFIGURATION                                                              | SPECIFICATION                                                                                                                                     | NAMESPACE                                     |
|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| SecurityBlockerStorefrontAgentConstants::AGENT_BLOCK_FOR_SECONDS           | Specifies the TTL configuration: the period for which an agent is blocked if the number of attempts was exceeded.                       | Spryker\Shared\SecurityBlockerStorefrontAgent |
| SecurityBlockerStorefrontAgentConstants::AGENT_BLOCKING_TTL                | Specifies the TTL configuration: the time period during which failed attempts are counted. | Spryker\Shared\SecurityBlockerStorefrontAgent |
| SecurityBlockerStorefrontAgentConstants::AGENT_BLOCKING_NUMBER_OF_ATTEMPTS | The number of failed login attempt to make during the `SECURITY_BLOCKER_STOREFRONT:AGENT_BLOCKING_TTL` time before the agent is blocked. | Spryker\Shared\SecurityBlockerStorefrontAgent |

**config/Shared/config_default.php**

```php
<?php
// other code

// >>> Security Blocker Storefront Agent
$config[SecurityBlockerStorefrontAgentConstants::AGENT_BLOCK_FOR_SECONDS] = 360;
$config[SecurityBlockerStorefrontAgentConstants::AGENT_BLOCKING_TTL] = 900;
$config[SecurityBlockerStorefrontAgentConstants::AGENT_BLOCKING_NUMBER_OF_ATTEMPTS] = 9;
```

### 3) Add translations

1. Append the glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
agent.authentication.failed,Authentication failed,en_US
agent.authentication.failed,Authentifizierung fehlgeschlagen,de_DE
agent.login.title,Access your account,en_US
agent.login.title,Ich bin bereits Kunde,de_DE
agent.confirm_user_selection,Confirm,en_US
agent.confirm_user_selection,Bestätigen,de_DE
agent.login.email,Email,en_US
agent.login.email,E-Mail,de_DE
agent.login.password,Password,en_US
agent.login.password,Passwort,de_DE
agent.control_bar.username,Agent: %username%,en_US
agent.control_bar.username,Agent: %username%,de_DE
agent.control_bar.customer_name,Customer: %username%,en_US
agent.control_bar.customer_name,Kunde: %username%,de_DE
agent.control_bar.logout_as_customer,End Customer Assistance,en_US
agent.control_bar.logout_as_customer,Kunden-Assistenz beenden,de_DE
agent.control_bar.logout,Logout,en_US
agent.control_bar.logout,Abmelden,de_DE
agent.autocomplete.no_results,No results found,en_US
agent.autocomplete.no_results,Keine Ergebnisse gefunden,de_DE
autocomplete.placeholder,Search,en_US
autocomplete.placeholder,Suche,de_DE
```

2. Add the glossary keys:

```bash
console data:import:glossary
```

### 4) Enable controllers

1. Register the following route provider plugins:

| PROVIDER                       | NAMESPACE                                  |
|--------------------------------|--------------------------------------------|
| AgentPageRouteProviderPlugin   | SprykerShop\Yves\AgentPage\Plugin\Router   |
| AgentWidgetRouteProviderPlugin | SprykerShop\Yves\AgentWidget\Plugin\Router |

2. Register the route provider plugins in the Yves application:

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\AgentPage\Plugin\Router\AgentPageRouteProviderPlugin;
use SprykerShop\Yves\AgentWidget\Plugin\Router\AgentWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new AgentPageRouteProviderPlugin(),
            new AgentWidgetRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

| PROVIDER                       | TEST                                                                                               |
|--------------------------------|----------------------------------------------------------------------------------------------------|
| AgentPageRouteProviderPlugin   | Make sure `https://mysprykershop.com/agent/login` is accessible.                                    |
| AgentWidgetRouteProviderPlugin | 1. Log in as an agent. <br>2. Make sure you can search by customers using the Agent control bar. |

{% endinfo_block %}

### 5) Set up behavior

Set up the following behaviors.

#### Set up the agent page security

Enable the following behaviors by registering the plugins:

| PLUGIN                                                  | DESCRIPTION                                                                                               | PREREQUISITES | NAMESPACE                                                            |
|---------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------|
| YvesAgentPageSecurityPlugin                             | Registers security firewalls, access rules, impersonate rules, login and logout handlers for agent users. |           | SprykerShop\Yves\AgentPage\Plugin\Security                           |
| AgentSecurityBlockerConfigurationSettingsExpanderPlugin | Expands security blocker configuration settings with agent settings.                                      |           | Spryker\Client\SecurityBlockerStorefrontAgent\Plugin\SecurityBlocker |

**src/Pyz/Yves/Security/SecurityDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Security;

use Spryker\Yves\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use SprykerShop\Yves\AgentPage\Plugin\Security\YvesAgentPageSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface>
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new YvesAgentPageSecurityPlugin(),
        ];
    }
}
```

**src/Pyz/Client/SecurityBlocker/SecurityBlockerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SecurityBlocker;

use Spryker\Client\SecurityBlocker\SecurityBlockerDependencyProvider as SprykerSecurityBlockerDependencyProvider;
use Spryker\Client\SecurityBlockerStorefrontAgent\Plugin\SecurityBlocker\AgentSecurityBlockerConfigurationSettingsExpanderPlugin;

class SecurityBlockerDependencyProvider extends SprykerSecurityBlockerDependencyProvider
{
    /**
     * @return list<\Spryker\Client\SecurityBlockerExtension\Dependency\Plugin\SecurityBlockerConfigurationSettingsExpanderPluginInterface>
     */
    protected function getSecurityBlockerConfigurationSettingsExpanderPlugins(): array
    {
        return [
            new AgentSecurityBlockerConfigurationSettingsExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Go to `https://mysprykershop.com/agent/login`.
2. Make sure the login form is displayed and that only a user with the agent role can log in.
3. Go to `https://mysprykershop.com/agent/overview`.
4. Ensure that only the user with the agent role can access the page.
5. Ensure that the agent can log out.

{% endinfo_block %}

#### Configure agent session validation

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                        | DESCRIPTION                                                                                               | PREREQUISITES                                            | NAMESPACE                                               |
|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------|---------------------------------------------------------|
| SaveAgentSessionSecurityPlugin                                                | Extends security builder event dispatcher with  save session agent listener.                               |                                                      | SprykerShop\Yves\SessionAgentValidation\Plugin\Security |
| ValidateAgentSessionSecurityPlugin                                            | Extends security service with agent session validator listener.                                           |                                                      | SprykerShop\Yves\SessionAgentValidation\Plugin\Security |
| SessionAgentValidationSecurityAuthenticationListenerFactoryTypeExpanderPlugin | Expands security authentication listener factory types list with the agent's session validator factory type.  |                                                      | SprykerShop\Yves\SessionAgentValidation\Plugin\Security |
| SessionRedisSessionAgentSaverPlugin                                           | Saves an agent's session data to the key-value storage (Redis or Valkey).                                                              | Session data is stored in key-value storage (Redis or Valkey).                          | Spryker\Yves\SessionRedis\Plugin\SessionAgentValidation |
| SessionRedisSessionAgentValidatorPlugin                                       | Validates an agent's session data in the key-value storage (Redis or Valkey).                                                          | Session data is stored in key-value storage (Redis or Valkey).                          | Spryker\Yves\SessionRedis\Plugin\SessionAgentValidation |
| SessionFileSessionAgentSaverPlugin                                            | Saves an agent's session data to a file.                                                                     | Session data is stored in a file.                         | Spryker\Yves\SessionFile\Plugin\SessionAgentValidation  |
| SessionFileSessionAgentValidatorPlugin                                        | Validates an agent's session data in a file.                                                                 | Session data is store in a file.                         | Spryker\Yves\SessionFile\Plugin\SessionAgentValidation  |

**src/Pyz/Yves/Security/SecurityDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Security;

use Spryker\Yves\Security\SecurityDependencyProvider as SprykerSecurityDependencyProvider;
use SprykerShop\Yves\SessionAgentValidation\Plugin\Security\SaveAgentSessionSecurityPlugin;
use SprykerShop\Yves\SessionAgentValidation\Plugin\Security\SessionAgentValidationSecurityAuthenticationListenerFactoryTypeExpanderPlugin;
use SprykerShop\Yves\SessionAgentValidation\Plugin\Security\ValidateAgentSessionSecurityPlugin;

class SecurityDependencyProvider extends SprykerSecurityDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityPluginInterface>
     */
    protected function getSecurityPlugins(): array
    {
        return [
            new ValidateAgentSessionSecurityPlugin(),
            new SaveAgentSessionSecurityPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\SecurityExtension\Dependency\Plugin\SecurityAuthenticationListenerFactoryTypeExpanderPluginInterface>
     */
    protected function getSecurityAuthenticationListenerFactoryTypeExpanderPlugins(): array
    {
        return [
            new SessionAgentValidationSecurityAuthenticationListenerFactoryTypeExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "" %}

Apply the following changes only if session data is stored in key-value storage (Redis or Valkey).

{% endinfo_block %}

**src/Pyz/Yves/SessionAgentValidation/SessionAgentValidationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\SessionAgentValidation;

use Spryker\Yves\SessionRedis\Plugin\SessionAgentValidation\SessionRedisSessionAgentSaverPlugin;
use Spryker\Yves\SessionRedis\Plugin\SessionAgentValidation\SessionRedisSessionAgentValidatorPlugin;
use SprykerShop\Yves\SessionAgentValidation\SessionAgentValidationDependencyProvider as SprykerSessionAgentValidationDependencyProvider;
use SprykerShop\Yves\SessionAgentValidationExtension\Dependency\Plugin\SessionAgentSaverPluginInterface;
use SprykerShop\Yves\SessionAgentValidationExtension\Dependency\Plugin\SessionAgentValidatorPluginInterface;

class SessionAgentValidationDependencyProvider extends SprykerSessionAgentValidationDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\SessionAgentValidationExtension\Dependency\Plugin\SessionAgentSaverPluginInterface
     */
    protected function getSessionAgentSaverPlugin(): SessionAgentSaverPluginInterface
    {
        return new SessionRedisSessionAgentSaverPlugin();
    }

    /**
     * @return \SprykerShop\Yves\SessionAgentValidationExtension\Dependency\Plugin\SessionAgentValidatorPluginInterface
     */
    protected function getSessionAgentValidatorPlugin(): SessionAgentValidatorPluginInterface
    {
        return new SessionRedisSessionAgentValidatorPlugin();
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in as an agent.
2. Make sure the following (Redis or Valkey) key exists and contains the data:
   `{% raw %}{{{% endraw %}agent_id{% raw %}}}{% endraw %}:agent:entity`
3. Change the session data to an invalid value.
Make sure the agent has been logged out.

{% endinfo_block %}

{% info_block warningBox "Warning" %}

Apply the following changes only if session data is stored in a file.

{% endinfo_block %}

**src/Pyz/Yves/SessionAgentValidation/SessionAgentValidationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\SessionAgentValidation;

use Spryker\Yves\SessionFile\Plugin\SessionAgentValidation\SessionFileSessionAgentSaverPlugin;
use Spryker\Yves\SessionFile\Plugin\SessionAgentValidation\SessionFileSessionAgentValidatorPlugin;
use SprykerShop\Yves\SessionAgentValidation\SessionAgentValidationDependencyProvider as SprykerSessionAgentValidationDependencyProvider;
use SprykerShop\Yves\SessionAgentValidationExtension\Dependency\Plugin\SessionAgentSaverPluginInterface;
use SprykerShop\Yves\SessionAgentValidationExtension\Dependency\Plugin\SessionAgentValidatorPluginInterface;

class SessionAgentValidationDependencyProvider extends SprykerSessionAgentValidationDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\SessionAgentValidationExtension\Dependency\Plugin\SessionAgentSaverPluginInterface
     */
    protected function getSessionAgentSaverPlugin(): SessionAgentSaverPluginInterface
    {
        return new SessionFileSessionAgentSaverPlugin();
    }

    /**
     * @return \SprykerShop\Yves\SessionAgentValidationExtension\Dependency\Plugin\SessionAgentValidatorPluginInterface
     */
    protected function getSessionAgentValidatorPlugin(): SessionAgentValidatorPluginInterface
    {
        return new SessionFileSessionAgentValidatorPlugin();
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in as an agent.
2. Make sure the following (Redis or Valkey) key exists and contains the data:
   `{% raw %}{{{% endraw %}agent_id{% raw %}}}{% endraw %}:agent:entity`
3. Change the session data to an invalid value.
Make sure the agent has been logged out.

{% endinfo_block %}

#### Set up audit logging

Enable the following behaviors by registering the plugins:

| PLUGIN                                                  | DESCRIPTION                                                                                               | PREREQUISITES | NAMESPACE                                                            |
|---------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------|
| AgentCurrentRequestProcessorPlugin                      | Adds agent related data from a current request to the logs data.                                        |           | SprykerShop\Yves\AgentPage\Plugin\Log                                |

**src/Pyz/Yves/Log/LogDependencyProvider.php**

```php
use Spryker\Yves\Log\LogDependencyProvider as SprykerLogDependencyProvider;
use SprykerShop\Yves\AgentPage\Plugin\Log\AgentCurrentRequestProcessorPlugin;

class LogDependencyProvider extends SprykerLogDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    protected function getAuditLogProcessorPlugins(): array
    {
        return [
            new AgentCurrentRequestProcessorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, during the user impersonation process, the agent's data is logged.

{% endinfo_block %}


### 6) Set up widgets

1. Register the following global widget:

| WIDGET                | SPECIFICATION                                      | NAMESPACE                           |
|-----------------------|----------------------------------------------------|-------------------------------------|
| AgentControlBarWidget | Enables agents to select and impersonate customers. | SprykerShop\Yves\AgentWidget\Widget |


**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\AgentWidget\Widget\AgentControlBarWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            AgentControlBarWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

3. If you have a custom layout template, place the Agent widget above the site header:

```xml
{% raw %}{%{% endraw %} widget 'AgentControlBarWidget' only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE                | TEST                                                                      |
|-----------------------|---------------------------------------------------------------------------|
| AgentControlBarWidget | Log in as an agent. The control bar widget is displayed above the site header. |

{% endinfo_block %}
