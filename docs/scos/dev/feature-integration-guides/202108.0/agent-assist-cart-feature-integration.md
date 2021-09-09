---
title: Agent Assist + Cart feature integration
originalLink: https://documentation.spryker.com/2021080/docs/agent-assist-cart-feature-integration
originalArticleId: 98b85b04-aa2a-4eca-b968-413c6fb65726
redirect_from:
  - /2021080/docs/agent-assist-cart-feature-integration
  - /2021080/docs/en/agent-assist-cart-feature-integration
  - /docs/agent-assist-cart-feature-integration
  - /docs/en/agent-assist-cart-feature-integration
---

This document describes how to integrate the Agent Assist + Cart feature into a Spryker project.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME         | VERSION | INTEGRATION GUIDE                                            |
| ------------ | ------- | ------------------------------------------------------------ |
| Spryker Core | master  | [Spryker Сore feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-ore-feature-integration.html) |
| Agent Assist | master  | [Agent Assist feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/agent-assist-feature-integration.html) |
| Cart         | master  | [Glue API: Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-cart-feature-integration.html) |


## 1) Set up behavior

Activate the following plugins:

| PLUGIN                                                  | SPECIFICATION               | PREREQUISITES | NAMESPACE                         |
| ------------------------------------------------------- | --------------------------- | ------------- | --------------------------------- |
| SanitizeCustomerQuoteImpersonationSessionFinisherPlugin | Sanitizes a customer quote. | None          | Spryker\Client\Quote\Plugin\Agent |

**src/Pyz/Client/Agent/AgentDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Agent;

use Spryker\Client\Agent\AgentDependencyProvider as SprykerAgentDependencyProvider;
use Spryker\Client\Quote\Plugin\Agent\SanitizeCustomerQuoteImpersonationSessionFinisherPlugin;

class AgentDependencyProvider extends SprykerAgentDependencyProvider
{
    /**
     * @return \Spryker\Client\AgentExtension\Dependency\Plugin\ImpersonationSessionFinisherPluginInterface[]
     */
    protected function getImpersonationSessionFinisherPlugins(): array
    {
        return [
            new SanitizeCustomerQuoteImpersonationSessionFinisherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that, after finishing a customer impersonation, the session quote is empty.

{% endinfo_block %}


## Related features

Integrate the following related features:

| FEATURE                              | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE                                            |
| ------------------------------------ | -------------------------------- | ------------------------------------------------------------ |
<<<<<<< HEAD:docs/scos/dev/feature-integration-guides/202108.0/agent-assist-cart-feature-integration-guide.md
| Agent Assist            | ✓                                | [Agent Assist feature integration guide](/docs/scos/dev/migration-and-integration/{{page.version}}/feature-integration-guides/agent-assist-feature-integration.html) |
| Agent Assist + Shopping List |                                  | [Agent Assist + Shopping List feature integration guide](/docs/scos/dev/migration-and-integration/{{page.version}}/feature-integration-guides/agent-assist-shopping-list-feature-integration.html) |
=======
| Agent Assist            | ✓                                | [Agent Assist feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/agent-assist-feature-integration.html) |
| Agent Assist + Shopping List |                                  | [Agent Assist + Shopping List feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/agent-assist-shopping-list-feature-integration.html) |

>>>>>>> scos-migration-updated:docs/scos/dev/feature-integration-guides/202108.0/agent-assist-cart-feature-integration.md
