

This document describes how to integrate the Agent Assist + Shopping List feature into a Spryker project.

## Install feature core

Follow the steps below to install the gent Assist + Shopping List feature core.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME          | VERSION | INSTALLATION GUIDE                                            |
| ------------- | ------- | ------------------------------------------------------------ |
| Spryker Core  | master  | [Install the Spryker Core feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Agent Assist  | master  | [Agent Assist feature integration](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-agent-assist-feature.html) |
| Shopping List | master  | [Integrate the Shopping Lists feature](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shopping-lists-feature.html) |


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
| Agent Assist | &check;      | [Agent Assist feature integration](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-agent-assist-feature.html) |
| Agent Assist + Cart |       | [Install the Agent Assist + Cart feature](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-agent-assist-cart-feature.html) |
