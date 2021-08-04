---
title: Agent Assist + Shopping List feature integration
originalLink: https://documentation.spryker.com/2021080/docs/agent-assist-shopping-list-feature-integration
redirect_from:
  - /2021080/docs/agent-assist-shopping-list-feature-integration
  - /2021080/docs/en/agent-assist-shopping-list-feature-integration
---

This document describes how to integrate the Agent Assist + Shopping List feature into a Spryker project. 

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME          | VERSION | INTEGRATION GUIDE                                            |
| ------------- | ------- | ------------------------------------------------------------ |
| Spryker Core  | master  | [Spryker Сore feature integration](https://documentation.spryker.com/2021080/docs/spryker-core-feature-integration) |
| Agent Assist  | master  | [Agent Assist feature integration](https://documentation.spryker.com/2021080/docs/agent-assist-feature-integration) |
| Shopping List | master  | [Shopping lists feature integration](https://documentation.spryker.com/2021080/docs/shopping-lists-feature-integration) |

## 1) Set up behavior

Activate the following plugins:

| PLUGIN                                                       | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------- | ----------------------------------------------- |
| SanitizeCustomerShoppingListsImpersonationSessionFinisherPlugin | Removes a customer shopping list collection from the session. | None          | Spryker\Client\ShoppingListSession\Plugin\Agent |

**src/Pyz/Client/Agent/AgentDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Agent;

use Spryker\Client\Agent\AgentDependencyProvider as SprykerAgentDependencyProvider;
use Spryker\Client\ShoppingListSession\Plugin\Agent\SanitizeCustomerShoppingListsImpersonationSessionFinisherPlugin;

class AgentDependencyProvider extends SprykerAgentDependencyProvider
{
    /**
     * @return \Spryker\Client\AgentExtension\Dependency\Plugin\ImpersonationSessionFinisherPluginInterface[]
     */
    protected function getImpersonationSessionFinisherPlugins(): array
    {
        return [
            new SanitizeCustomerShoppingListsImpersonationSessionFinisherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that, after finishing customer impersonation, the session shopping list collection is empty.

{% endinfo_block %}



## Related features

Integrate the following related features:

| FEATURE                     | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE                                            |
| --------------------------- | -------------------------------- | ------------------------------------------------------------ |
| Agent Assist | ✓                                | [Agent Assist feature integration](https://documentation.spryker.com/2021080/docs/agent-assist-feature-integration) |
| Agent Assist + Cart |                                  | [Agent Assist + Cart feature integration](https://documentation.spryker.com/2021080/docs/agent-assist-cart-feature-integration) |

