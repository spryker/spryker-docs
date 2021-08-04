---
title: Agent Assist feature integration
originalLink: https://documentation.spryker.com/2021080/docs/agent-assist-feature-integration
redirect_from:
  - /2021080/docs/agent-assist-feature-integration
  - /2021080/docs/en/agent-assist-feature-integration
---

This document describes how to integrate the [Agent Assist](/upcoming-release/docs/agent-assist-feature-integration) feature into a Spryker project.

## Install feature core
Follow the steps below to install the feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:
| Name | Version | Integration guide|
| --- | --- | --- |
| Spryker Core | {% raw %}{{{% endraw %}variable.master{% raw %}}}{% endraw %} | [Spryker core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integrationn) |
| Product | {% raw %}{{{% endraw %}variable.master{% raw %}}}{% endraw %} | [Spryker Core Back Office feature integration](https://documentation.spryker.com/docs/back-office-feature-integration) |
| Cart | {% raw %}{{{% endraw %}variable.master{% raw %}}}{% endraw %}| [Customer Account Management](https://documentation.spryker.com/docs/customer-account-management-feature-integration) |

### 1) Install the required modules using composer

Run the following command to install the required modules:
```bash
composer require spryker-feature/agent-assist:"^master" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
| Agent | vendor/spryker/agent |
| AgentGui | vendor/spryker/agent-gui|

{% endinfo_block %}

### 2) Set up the database schema
Run the following commands to apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Verify the following changes by checking your database:
| Database entity | Type | Event |
| --- | --- | --- |
| spy_user.is_agent | column | created |

{% endinfo_block %}

### 3) Set up behavior
Set up the following behaviors.

#### Configure user Zed UI for agent handling 
Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
| UserAgentFormExpanderPlugin | Adds the *is an agent* checkbox to the Zed User form. | None | Spryker\Zed\AgentGui\Communication\Plugin |
| UserAgentTableConfigExpanderPlugin | Adds the *is an agent* column to the Zed Users table. | None | Spryker\Zed\AgentGui\Communication\Plugin |
| UserAgentTableDataExpanderPlugin | Fills the *is an agent* column in the Zed Users table. | Expects the *is an agent* checkbox in the Zed User form. | Spryker\Zed\AgentGui\Communication\Plugin |

**src/Pyz/Zed/User/UserDependencyProvider.php**
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
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface[]
     */
    protected function getUserFormExpanderPlugins(): array
    {
        return [
            new UserAgentFormExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserTableConfigExpanderPluginInterface[]
     */
    protected function getUserTableConfigExpanderPlugins(): array
    {
        return [
            new UserAgentTableConfigExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\UserExtension\Dependency\Plugin\UserTableDataExpanderPluginInterface[]
     */
    protected function getUserTableDataExpanderPlugins(): array
    {
        return [
            new UserAgentTableDataExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the following plugins have been registered:

| Module | Test |
| --- | --- |
| UserAgentFormExpanderPlugin | 1. In the Back Office, go to **Users** > **Users**. <br>2. Select **Edit** next to a user. <br>3. Ensure that the *This user is an agent* checkbox exists. |
| UserAgentTableConfigExpanderPlugin | 1. In the Back Office, go to **Users** > **Users**. <br>2. Ensure that the *Agent* column exists.  |
| UserAgentTableDataExpanderPlugin | 1. In the *Back Office*, go to **Users** > **Users**. <br>2. Select **Edit** next to a non-agent user. <br>3. Select the **This user is an agent** checkbox. <br>4. Select **Update**. This takes you to the *Users List* page with the message about successful update displayed. <br>5. Ensure that in the *Agent* column next to the user you've updated, the *Agent* tag is displayed. |

{% endinfo_block %}

## Install feature front end
Follow the steps below to install the feature front end.

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | master |

### 1) Install the required modules using composer
Run the following command to install the required modules:
```bash
composer require spryker-feature/agent-assist:"^master" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
| AgentPage | vendor/spryker-shop/agent-page |
| AgentWidget | vendor/spryker-shop/agent-widget |

{% endinfo_block %}

### 2) Set up configuration
By default, in Spryker, posting login form (where SecurityBlocker will make its check and block agents who made too many failed login attempts) is locale-independent. So, to be able to see error messages translated into different languages, you need to configure the locale to be added to the agent login path. You can do this by modifying the following configs:
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

Make sure that when the login form for the agent is submitted, the URL it uses contains a locale code. For example, `/de/agent/login_check` would be the default value for the agent.

{% endinfo_block %}

### 3) Add translations
Add translations as follows:

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
2. Run the following command to add the glossary keys:
```bash
console data:import:glossary
```
### 4) Enable controllers
Enable the following controllers.

#### Service provider list
Register the service provider in the Yves application:

| Provider | Namespace | Specification |
| --- | --- | --- |
| AgentPageSecurityServiceProvider | SprykerShop\Yves\AgentPage\Plugin\Provider | Registers security firewalls, access rules, impersonate rules, login and logout handlers for Agent users. |

**src/Pyz/Yves/ShopApplication/YvesBootstrap.php**
```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\AgentPage\Plugin\Provider\AgentPageSecurityServiceProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;

class YvesBootstrap extends SprykerYvesBootstrap
{
    /**
     * @return void
     */
    protected function registerServiceProviders()
    {
        $this->application->register(new AgentPageSecurityServiceProvider()); # AgentFeature
    }
}
```
{% info_block warningBox "Verification" %}

Ensure that you've registered the providers correctly:

1. Open http://mysprykershop.com/agent/secured.
2. This should redirect you to http://mysprykershop.com/agent/login.

{% endinfo_block %}

#### Controller provider list
Register the controller provider(s) in the Yves application:

| Provider | Namespace | Enabled Controller | Controller Specification |
| --- | --- | --- | --- |
| AgentPageControllerProvider | SprykerShop\Yves\AgentPage\Plugin\Provider | AgentPage\AuthController | Provides Login and Logout actions for the agent user. |
| AgentWidgetControllerProvider | SprykerShop\Yves\AgentWidget\Plugin\Provider | AgentWidget\CustomerAutocompleteController | Provides the customer autocomplete action for the agent control bar. |

**src/Pyz/Yves/ShopApplication/YvesBootstrap.php**
```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\AgentPage\Plugin\Provider\AgentPageControllerProvider;
use SprykerShop\Yves\AgentWidget\Plugin\Provider\AgentWidgetControllerProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;

class YvesBootstrap extends SprykerYvesBootstrap
{
    /**
     * @param bool|null $isSsl
     *
     * @return \SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider[]
     */
    protected function getControllerProviderStack($isSsl)
    {
        return [
            new AgentPageControllerProvider($isSsl), #AgentFeature
            new AgentWidgetControllerProvider($isSsl), #AgentFeature
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Ensure that you have registered the providers correctly:

| Provider | Test |
| --- | --- |
| AgentPageControllerProvider | Ensure that you can open https://mysprykershop.com/agent/login. |
| AgentWidgetControllerProvider | 1. Log in as an agent. <br>2. Ensure that you can search by customers using the Agent control bar. |

{% endinfo_block %}

### 5) Set up widgets
Set up widgets as follows:

1. Register the following global widget(s):

| Widget | Specification | Namespace |
| --- | --- | --- |
| AgentControlBarWidget | Allows agents to select and impersonate customers. | SprykerShop\Yves\AgentWidget\Widget |


**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**
```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\AgentWidget\Widget\AgentControlBarWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            AgentControlBarWidget::class,
        ];
    }
}
```
2.  Enable Javascript and CSS changes:
```bash
console frontend:yves:build
```
3. If you have a custom layout template, place the Agent widget above the site header:
```xml
{% raw %}{%{% endraw %} widget 'AgentControlBarWidget' only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```
{% info_block warningBox "Verification" %}

Ensure that the following widgets have been registered:

| Module | Test |
| --- | --- |
| AgentControlBarWidget | Log in as an agent. The control bar widget should appear above the site header. |

{% endinfo_block %}
