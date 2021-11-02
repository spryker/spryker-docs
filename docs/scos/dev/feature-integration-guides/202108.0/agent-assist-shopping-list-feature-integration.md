---
title: Agent Assist + Shopping List feature integration guide
last_updated: Jul 6, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/agent-assist-shopping-list-feature-integration
originalArticleId: ab65e035-ba74-4693-83e0-4f3459ebbb97
redirect_from:
  - /2021080/docs/agent-assist-shopping-list-feature-integration
  - /2021080/docs/en/agent-assist-shopping-list-feature-integration
  - /docs/agent-assist-shopping-list-feature-integration
  - /docs/en/agent-assist-shopping-list-feature-integration
---

This document describes how to integrate the Agent Assist + Shopping List feature into a Spryker project.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME          | VERSION | INTEGRATION GUIDE                                            |
| ------------- | ------- | ------------------------------------------------------------ |
| Spryker Core  | master  | [Spryker Сore feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Agent Assist  | master  | [Agent Assist feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/agent-assist-feature-integration.html) |
| Shopping List | master  | [Shopping lists feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/shopping-lists-feature-integration.html) |

## 1) Set up behavior

Activate the following plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE  |
| -------------------- | ----------------- | ------------- | ------------------ |
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

| FEATURE  | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| ---------- | ---------------- | ----------------- |
| Agent Assist | ✓      | [Agent Assist feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/agent-assist-feature-integration.html) |
| Agent Assist + Cart |       | [Agent Assist + Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/agent-assist-cart-feature-integration.html) |
