---
title: Glue API- Agent Assist feature integration
originalLink: https://documentation.spryker.com/v6/docs/glue-api-agent-assist-feature-integration
redirect_from:
  - /v6/docs/glue-api-agent-assist-feature-integration
  - /v6/docs/en/glue-api-agent-assist-feature-integration
---

Follow the steps below to install the Agent Assist feature API.

## Prerequisites


To start the feature integration, overview and install the necessary features:


| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | master | [Glue API: Spryker Core feature integration](https://documentation.spryker.com/docs/glue-spryker-core-feature-integration) |
| Customer Account Management + Agent Assist | master | [Customer Account Management + Agent Assist feature integration](https://documentation.spryker.com/docs/customer-account-management-agent-assist-feature-integration) |

## 1) Install the required modules using composer


Run the following command to install the required modules:

```bash
composer require spryker/agent-auth-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following module has been installed:


| Module | Expected Directory |
| --- | --- |
| AgentAuthRestApi | vendor/spryker/agent-auth-rest-api |


{% endinfo_block %}

## 2) Set up transfer objects


Run the following command to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}


Ensure that the following changes have been applied in the transfer objects:


| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| RestAgentAccessTokensRequestAttributesTransfer | cell | cell | src/Generated/Shared/Transfer/RestAgentAccessTokensRequestAttributesTransfer |
| RestAgentAccessTokensAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestAgentAccessTokensAttributesTransfer |
| RestAgentCustomerImpersonationAccessTokensRequestAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestAgentCustomerImpersonationAccessTokensRequestAttributesTransfer |
| RestAgentCustomerImpersonationAccessTokensAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestAgentCustomerImpersonationAccessTokensAttributesTransfer |
| RestAgentCustomerSearchAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestAgentCustomerSearchAttributesTransfer |
| RestAgentCustomerSearchCustomersAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestAgentCustomerSearchCustomersAttributesTransfer |
| RestUserTransfer.idAgent | property | created | src/Generated/Shared/Transfer/RestUserTransfer |
| CustomerQueryTransfer | class | created | src/Generated/Shared/Transfer/CustomerQueryTransfer |
| OauthRequestTransfer | class | created | src/Generated/Shared/Transfer/OauthRequestTransfer |
| RestErrorCollectionTransfer | class | created | src/Generated/Shared/Transfer/RestErrorCollectionTransfer |
| RestErrorMessageTransfer | class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer |
| OauthAccessTokenValidationRequestTransfer | class | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationRequestTransfer |
| CustomerAutocompleteResponseTransfer | class | created | src/Generated/Shared/Transfer/CustomerAutocompleteResponseTransfer |
| PaginationTransfer | class | created | src/Generated/Shared/Transfer/PaginationTransfer |
| OauthResponseTransfer | class | created | src/Generated/Shared/Transfer/OauthResponseTransfer |
| OauthAccessTokenDataTransfer | class | created | src/Generated/Shared/Transfer/OauthAccessTokenDataTransfer |
| OauthAccessTokenValidationResponseTransfer | class | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationResponseTransfer |
| CustomerTransfer | class | created | src/Generated/Shared/Transfer/CustomerTransfer |

{% endinfo_block %}


## 3) Set up behavior


Activate the following plugins:


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| AgentRestUserMapperPlugin | Maps Agent data to the Rest user identifier. | None | Spryker\Glue\AgentAuthRestApi\Plugin\AuthRestApi |
| AgentAccessTokenRestRequestValidatorPlugin | Validates the access token passed via the `X-Agent-Authorization` header. | None | Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication |
| AgentRestUserValidatorPlugin | Checks if the `RestRequest.restUser` is an Agent when an agent-only resource is accessed. | None | Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication |
| AgentAccessTokenRestUserFinderPlugin | Finds the Rest user for the `X-Agent-Authorization` header. | None | Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication |
| AgentAccessTokensResourceRoutePlugin | Provides the `/agent-access-tokens` resource route. | None | Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication |
| AgentCustomerImpersonationAccessTokensResourceRoutePlugin | Provides the `/agent-customer-impersonation-access-tokens` resource route. | The Customer impersonation grant type must be configured. See the [Customer Account Management feature integration](https://documentation.spryker.com/docs/customer-account-management-feature-integration) for details. | Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication |
| AgentCustomerSearchResourceRoutePlugin | Provides the `/agent-customer-search` resource route. | None | Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication |


<details open>
    <summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentAccessTokenRestRequestValidatorPlugin;
use Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentAccessTokenRestUserFinderPlugin;
use Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentAccessTokensResourceRoutePlugin;
use Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentCustomerImpersonationAccessTokensResourceRoutePlugin;
use Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentCustomerSearchResourceRoutePlugin;
use Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentRestUserValidatorPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AgentAccessTokensResourceRoutePlugin(),
            new AgentCustomerImpersonationAccessTokensResourceRoutePlugin(),
            new AgentCustomerSearchResourceRoutePlugin(),
        ];
    }
    
    

    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RestRequestValidatorPluginInterface[]
     */
    protected function getRestRequestValidatorPlugins(): array
    {
        return [
            new AgentAccessTokenRestRequestValidatorPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RestUserValidatorPluginInterface[]
     */
    protected function getRestUserValidatorPlugins(): array
    {
        return [
            new AgentRestUserValidatorPlugin(),
        ];
    }
    
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RestUserFinderPluginInterface[]
     */
    protected function getRestUserFinderPlugins(): array
    {
        return [
            new AgentAccessTokenRestUserFinderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Ensure that:

*   Invalid agent access tokens passed in the `X-Agent-Authorization` header are rejected with the 401 error code.
    
*   The `X-Agent-Authorization` header is required for `/agent-customer-impersonation-access-tokens` and `/agent-customer-search` resources. Requests without the header return the 401 error code.
    
*   When a valid agent access token is provided via the `X-Agent-Authorization`, the `RestRequest` object in Glue controllers populates `restUser.idAgent` with the current agent identifier.
    
*   The following resources are available:
    

| Resource | Request to check | 
| --- | --- | 
| /agent-access-tokens | POST https://glue.mysprykershop.com/agent-access-tokens | 
| /agent-customer-impersonation-access-tokens | POST https://glue.mysprykershop.com/agent-customer-impersonation-access-tokens | 
| /agent-customer-search | GET https://glue.mysprykershop.com/agent-customer-search | 


{% endinfo_block %}


**src/Pyz/Glue/AuthRestApi/AuthRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\AuthRestApi;

use Spryker\Glue\AgentAuthRestApi\Plugin\AuthRestApi\AgentRestUserMapperPlugin;
use Spryker\Glue\AuthRestApi\AuthRestApiDependencyProvider as SprykerAuthRestApiDependencyProvider;

class AuthRestApiDependencyProvider extends SprykerAuthRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\AuthRestApiExtension\Dependency\Plugin\RestUserMapperPluginInterface[]
     */
    protected function getRestUserExpanderPlugins(): array
    {
        return [
            new AgentRestUserMapperPlugin(),
        ];
    }
}
```



{% info_block warningBox "Verification" %}


Ensure that, when `Authorization` and `X-Agent-Authorization` headers are sent, `RestRequest.restUser` is populated with Customer and Agent information.


{% endinfo_block %}


## Related features


Integrate the following related features:


| Feature | Integration guide |
| --- | --- |
| Customer account management | [Customer account management feature integration](https://documentation.spryker.com/docs/customer-account-management-feature-integration) |
| Customer account management + Agent assist | [Customer Account Management + Agent Assist feature integration](https://documentation.spryker.com/docs/customer-account-management-agent-assist-feature-integration) |

