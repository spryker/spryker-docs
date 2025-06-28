

This document describes how to install the Customer Account Management + Agent Assist feature.

## Install feature core

Follow the steps below to install the Customer Account Management + Agent Assist feature core.

### Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME                        | VERSION          | INSTALLATION GUIDE                                                                                                                                                  |
|-----------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Customer Account ManagemenT | 202507.0 | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |
| Agent Assist                | 202507.0 | [Install the Agent Assist feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature.html)                               |

### 1) Install the required modules

```bash
composer require spryker/oauth-agent-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following module has been installed:

| MODULE              | EXPECTED DIRECTORY                   |
|---------------------|--------------------------------------|
| OauthAgentConnector | vendor/spryker/oauth-agent-connector |

{% endinfo_block %}

### 2) Set up configuration

Activate the following plugin:

| PLUGIN                         | SPECIFICATION                         | PREREQUISITES | NAMESPACE                                                      |
|--------------------------------|---------------------------------------|---------------|----------------------------------------------------------------|
| AgentOauthScopeInstallerPlugin | Installs agent-specific OAuth scopes. | None          | Spryker\Zed\OauthAgentConnector\Communication\Plugin\Installer |


**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\OauthAgentConnector\Communication\Plugin\Installer\AgentOauthScopeInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
     */
    public function getInstallerPlugins()
    {
        return [
            new AgentOauthScopeInstallerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that `console setup:init-db` installs agent-specific scopes configured in `OauthAgentConnectorConfig::getAgentScopes()`.

{% endinfo_block %}

### 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have been applied in the transfer objects:

| TRANSFER                            | TYPE     | EVENT   | PATH                                                              |
|-------------------------------------|----------|---------|-------------------------------------------------------------------|
| CustomerIdentifierTransfer.idAgent  | property | created | src/Generated/Shared/Transfer/CustomerIdentifierTransfer          |
| OauthScopeTransfer                  | class    | created | src/Generated/Shared/Transfer/OauthScopeTransfer                  |
| OauthUserTransfer                   | class    | created | src/Generated/Shared/Transfer/OauthUserTransfer                   |
| OauthClientTransfer                 | class    | created | src/Generated/Shared/Transfer/OauthClientTransfer                 |
| OauthScopeRequestTransfer           | class    | created | src/Generated/Shared/Transfer/OauthScopeRequestTransfer           |
| FindAgentResponseTransfer           | class    | created | src/Generated/Shared/Transfer/FindAgentResponseTransfer           |
| OauthGrantTypeConfigurationTransfer | class    | created | src/Generated/Shared/Transfer/OauthGrantTypeConfigurationTransfer |
| UserTransfer                        | class    | created | src/Generated/Shared/Transfer/UserTransfer                        |

{% endinfo_block %}

### 4) Set up behavior

Activate the following plugins:

| PLUGIN                                                     | SPECIFICATION                                                                                                       | PREREQUISITES | NAMESPACE                                                        |
|------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------|
| AgentOauthUserProviderPlugin                               | Authenticates an agent, reads the agent's data and provides it for the access token.                                      | None          | Spryker\Zed\OauthAgentConnector\Communication\Plugin\Oauth       |
| AgentOauthScopeProviderPlugin                              | Provides the agent scopes.                                                                                          | None          | Spryker\Zed\OauthAgentConnector\Communication\Plugin\Oauth       |
| AgentCredentialsOauthGrantTypeConfigurationProviderPlugin  | Provides configuration of the`agent_credentials` grant type.                                                        | None          | Spryker\Zed\OauthAgentConnector\Communication\Plugin\Oauth       |
| UpdateAgentSessionAfterCustomerAuthenticationSuccessPlugin | Updates agent's session data in storage if access is granted and an agent is logged in.                             | None          | SprykerShop\Yves\SessionAgentValidation\Plugin\CustomerPage      |
| CustomerUpdateSessionPostImpersonationPlugin               | Updates customer's session data in storage if a given customer is valid after the session impersonation is started. | None          | SprykerShop\Yves\SessionCustomerValidationPage\Plugin\AgentPage  |
| UpdateAgentTokenAfterCustomerAuthenticationSuccessPlugin   | Updates agent token after customer authentication success.                                                          | None          | SprykerShop\Yves\AgentPage\Plugin\Security                       |

<details><summary>src/Pyz/Zed/Oauth/OauthDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthAgentConnector\Communication\Plugin\Oauth\AgentCredentialsOauthGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\OauthAgentConnector\Communication\Plugin\Oauth\AgentOauthScopeProviderPlugin;
use Spryker\Zed\OauthAgentConnector\Communication\Plugin\Oauth\AgentOauthUserProviderPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface[]
     */
    protected function getUserProviderPlugins(): array
    {
        return [
            new AgentOauthUserProviderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface[]
     */
    protected function getScopeProviderPlugins(): array
    {
        return [
            new AgentOauthScopeProviderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthGrantTypeConfigurationProviderPluginInterface[]
     */
    protected function getGrantTypeConfigurationProviderPlugins(): array
    {
        return array_merge(parent::getGrantTypeConfigurationProviderPlugins(), [
            new AgentCredentialsOauthGrantTypeConfigurationProviderPlugin(),
        ]);
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Ensure that the agent can get the access token with valid credentials by sending the request:

**Request sample**

`POST https://glue.mysprykershop.com/agent-access-tokens`

```json
{
    "data": {
        "type": "agent-access-tokens",
        "attributes": {
            "username": "admin@spryker.com",
            "password": "change123"
        }
    }
}
```

**Expected response**

```json
{
    "data": {
        "type": "agent-access-tokens",
        "id": null,
        "attributes": {
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
            "refreshToken": "def50200d0f922e0c1e981add4..."
        },
        "links": {
            "self": "https://glue.mysprykershop.com/agent-access-tokens"
        }
    }
}
```

{% endinfo_block %}

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\AgentPage\Plugin\Security\UpdateAgentTokenAfterCustomerAuthenticationSuccessPlugin;
use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\SessionAgentValidation\Plugin\CustomerPage\UpdateAgentSessionAfterCustomerAuthenticationSuccessPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\AfterCustomerAuthenticationSuccessPluginInterface>
     */
    protected function getAfterCustomerAuthenticationSuccessPlugins(): array
    {
        return [
            new UpdateAgentTokenAfterCustomerAuthenticationSuccessPlugin(),
            new UpdateAgentSessionAfterCustomerAuthenticationSuccessPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in as an agent.
2. Log in as a customer.
3. Ensure that the agent's session data in storage is created or updated:
    - If session data is stored in Redis, ensure that the following Redis key exists and contains data:
      `{% raw %}{{{% endraw %}agent_id{% raw %}}}{% endraw %}:agent:entity`
    - If session data is stored in a file, ensure that a file in the following path exists and contains data:
      `data/session/session:agent:{% raw %}{{{% endraw %}agent_id{% raw %}}}{% endraw %}`

{% endinfo_block %}

**src/Pyz/Yves/AgentPage/AgentPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\AgentPage;

use SprykerShop\Yves\AgentPage\AgentPageDependencyProvider as SprykerAgentPageDependencyProvider;
use SprykerShop\Yves\SessionCustomerValidationPage\Plugin\AgentPage\CustomerUpdateSessionPostImpersonationPlugin;

class AgentPageDependencyProvider extends SprykerAgentPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\AgentPageExtension\Dependency\Plugin\SessionPostImpersonationPluginInterface>
     */
    protected function getSessionPostImpersonationPlugins(): array
    {
        return [
            new CustomerUpdateSessionPostImpersonationPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in as an agent.
2. Start impersonation session as a customer.
3. Ensure that the customer's session data in storage is created or updated:
   - If session data is stored in Redis, ensure that the following Redis key exists and contains data:
     `{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}:customer:entity`
   - If session data is stored in a file, ensure that a file in the following path exists and contains data:
     `data/session/session:customer:{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}`

{% endinfo_block %}

## Install related features

Install the following related features:

| FEATURE                     | INSTALLATION GUIDE                                                                                                                                                 |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Customer Account Management | [Customer Acount Management feature integration](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |
| Agent Assist                | [Install the Agent Assist feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature.html)                              |
| Agent Assist API            | [Install the Agent Assist Glue API](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-glue-api.html)  |
