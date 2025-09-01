

This document describes how to install the Agent Assist + Cart + Order Management feature.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME             | VERSION   | INSTALLATION GUIDE                                                                                                                                                            |
|------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core     | 202507.0  | [Install the Spryker Сore feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                             |
| Agent Assist     | 202507.0  | [Install the Agent Assist feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-feature.html)                                  |
| Cart             | 202507.0  | [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)                             |
| Order Management | 202507.0  | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |


## 1) Set up behavior

Activate the following plugins:

| PLUGIN                                                  | SPECIFICATION                         | PREREQUISITES                                     | NAMESPACE                                     |
|---------------------------------------------------------|---------------------------------------|---------------------------------------------------|-----------------------------------------------|
| SanitizeCustomerQuoteImpersonationSessionFinisherPlugin | Sanitizes a customer quote.           | None                                              | Spryker\Client\Quote\Plugin\Agent             |
| AgentQuoteTransferExpanderPlugin                        | Adds agent's user email to the Quote. | AgentConfig::isSalesOrderAgentEnabled() === true  | Spryker\Client\Agent\Plugin\Quote             |
| AgentOrderExpanderPreSavePlugin                         | Adds agent email to the sales order   | AgentConfig::isSalesOrderAgentEnabled() === true  | Spryker\Zed\Agent\Communication\Plugin\Sales  |

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

For capturing the agent email in the order enable the following configuration:

<details><summary>src/Pyz/Shared/Agent/AgentConfig.php</summary>

```php
namespace Pyz\Shared\Agent;

use Spryker\Shared\Agent\AgentConfig as SprykerAgentConfig;

class AgentConfig extends SprykerAgentConfig
{
    public function isSalesOrderAgentEnabled(): bool
    {
        return true;
    }
}
```

</details>

<details><summary>src/Pyz/Client/Quote/QuoteDependencyProvider.php</summary>

```php
namespace Pyz\Client\Quote;

use Spryker\Client\Agent\Plugin\Quote\AgentQuoteTransferExpanderPlugin;

class QuoteDependencyProvider extends \Spryker\Client\Quote\QuoteDependencyProvider
{
    /**
     * @return array<\Spryker\Client\QuoteExtension\Dependency\Plugin\QuoteTransferExpanderPluginInterface>
     */
    protected function getQuoteTransferExpanderPlugins(): array
    {
        return [
            new AgentQuoteTransferExpanderPlugin(),
        ];
    }
}
```

</details>

<details><summary>src/Pyz/Zed/Sales/SalesDependencyProvider.php</summary>

```php
namespace Pyz\Zed\Sales;

use Spryker\Zed\Agent\Communication\Plugin\Sales\AgentOrderExpanderPreSavePlugin;

class SalesDependencyProvider extends \Spryker\Zed\Sales\SalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPreSavePluginInterface>
     */
    protected function getOrderExpanderPreSavePlugins(): array
    {
        return [
            new AgentOrderExpanderPreSavePlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Ensure that, after finishing a customer impersonation, the session quote is empty.
Ensure that after placing an order by an agent, the order contains the agent's email in the `agentEmail` field, when an agent assists a customer.
Ensure that the agent email is visible in the placed order in the "Orders" section of the Back Office, when an agent assists a customer.

{% endinfo_block %}


## Install related features

Integrate the following related features:

| FEATURE   | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE  |
| ----------------- | ------------ | ----------------------- |
| Agent Assist + Shopping List |         | [Install the Agent Assist + Shopping List feature](/docs/pbc/all/user-management/latest/base-shop/install-and-upgrade/install-the-agent-assist-shopping-list-feature.html) |
