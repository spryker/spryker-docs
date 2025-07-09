

This document describes how to install the Agent Assist + Cart feature.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME         | VERSION | INSTALLATION GUIDE                                            |
| ------------ | ------- | ------------------------------------------------------------ |
| Spryker Core | 202507.0 | [Install the Spryker Сore feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Agent Assist | 202507.0 | [Install the Agent Assist feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature.html) |
| Cart         | 202507.0 | [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html) |


## 1) Set up behavior

Activate the following plugins:

| PLUGIN   | SPECIFICATION   | PREREQUISITES | NAMESPACE   |
| -------------------- | -------------------- | ------------- | -------------------- |
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


## Install related features

Integrate the following related features:

| FEATURE   | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE  |
| ----------------- | ------------ | ----------------------- |
| Agent Assist + Shopping List |         | [Install the Agent Assist + Shopping List feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-shopping-list-feature.html) |
