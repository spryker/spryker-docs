

This document describes how to install the Agent Assist + Shopping List feature.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME          | VERSION | INSTALLATION GUIDE                                            |
| ------------- | ------- | ------------------------------------------------------------ |
| Spryker Core  | master  | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Agent Assist  | master  | [Install the Agent Assist feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature.html) |
| Shopping List | master  | [Install the Shopping Lists feature](/docs/pbc/all/shopping-list-and-wishlist/latest/base-shop/install-and-upgrade/install-features/install-the-shopping-lists-feature.html) |

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

## Install related features

Integrate the following related features:

| FEATURE  | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| ---------- | ---------------- | ----------------- |
| Agent Assist | ✓      | [Install the Agent Assist feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature.html) |
| Agent Assist + Cart |       | [Install the Agent Assist + Cart feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-cart-feature.html) |
