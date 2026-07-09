---
title: Add a custom Back Office Assistant agent
description: Learn how to implement and register a custom agent and toolset for the Back Office Assistant feature, including a dedicated AI configuration and SSE streaming.
last_updated: Jul 09, 2026
template: concept-topic-template
---

Back Office Assistant routes each conversation to the most appropriate agent through its intent router. To handle a new domain—for example, managing customers or CMS content—implement a custom agent and register it alongside the built-in agents described in [Back Office Assistant](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/backoffice-assistant.html).

## 1) Implement the agent plugin

Create a plugin that implements `BackofficeAssistantAgentPluginInterface` from `SprykerFeature\Zed\AiCommerce\Dependency\BackofficeAssistant`:

| METHOD | PURPOSE |
|--------|---------|
| `getName()` | Returns the unique agent name used for routing. This value is matched against the intent router's response. |
| `getDescription()` | Describes what the agent handles. The intent router AI uses this description to decide which agent matches the user's request, so make it specific about the agent's domain and capabilities. |
| `isApplicable()` | Returns whether the agent is available for routing. Use this to gate the agent behind a configuration flag, similar to the built-in agents. |
| `executeAgent()` | Builds a `PromptRequestTransfer`, calls `AiFoundationFacade::prompt()`, and maps the result into a `BackofficeAssistantPromptResponseTransfer`. |

```php
<?php

namespace Pyz\Zed\AiCommerce\Communication\Plugin\Agent;

use Generated\Shared\Transfer\BackofficeAssistantPromptRequestTransfer;
use Generated\Shared\Transfer\BackofficeAssistantPromptResponseTransfer;
use Generated\Shared\Transfer\CustomerManagementAgentResponseTransfer;
use Generated\Shared\Transfer\PromptMessageTransfer;
use Generated\Shared\Transfer\PromptRequestTransfer;
use Spryker\Shared\AiFoundation\AiFoundationConstants;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use SprykerFeature\Zed\AiCommerce\Dependency\BackofficeAssistant\BackofficeAssistantAgentPluginInterface;

/**
 * @method \Pyz\Zed\AiCommerce\Communication\AiCommerceCommunicationFactory getFactory()
 * @method \Pyz\Zed\AiCommerce\AiCommerceConfig getConfig()
 */
class CustomerManagementAgentPlugin extends AbstractPlugin implements BackofficeAssistantAgentPluginInterface
{
    protected const string NAME = 'Customer Management';

    protected const string TOOL_SET_CUSTOMER_MANAGEMENT = 'customer_management_tools';

    public function getName(): string
    {
        return static::NAME;
    }

    public function getDescription(): string
    {
        return 'Answers questions about customer accounts, addresses, and status. Use for customer lookup and account management questions.';
    }

    public function isApplicable(
        BackofficeAssistantPromptRequestTransfer $backofficeAssistantPromptRequest,
    ): bool {
        return $this->getConfig()->isCustomerManagementAgentEnabled();
    }

    public function executeAgent(
        BackofficeAssistantPromptRequestTransfer $backofficeAssistantPromptRequest,
    ): BackofficeAssistantPromptResponseTransfer {
        $promptRequest = (new PromptRequestTransfer())
            ->setAiConfigurationName($this->getConfig()->getCustomerManagementAgentAiConfigurationName())
            ->setConversationReference($backofficeAssistantPromptRequest->getConversationReference())
            ->setStructuredMessage(new CustomerManagementAgentResponseTransfer())
            ->addToolSetName(static::TOOL_SET_CUSTOMER_MANAGEMENT)
            ->setPromptMessage(
                (new PromptMessageTransfer())
                    ->setType(AiFoundationConstants::MESSAGE_TYPE_USER)
                    ->setContent($backofficeAssistantPromptRequest->getPrompt())
                    ->setAttachments($backofficeAssistantPromptRequest->getAttachments()),
            );

        $promptResponse = $this->getFactory()->getAiFoundationFacade()->prompt($promptRequest);

        $backofficeAssistantPromptResponse = new BackofficeAssistantPromptResponseTransfer();

        if (!$promptResponse->getIsSuccessful()) {
            return $backofficeAssistantPromptResponse;
        }

        /** @var \Generated\Shared\Transfer\CustomerManagementAgentResponseTransfer $customerManagementAgentResponse */
        $customerManagementAgentResponse = $promptResponse->getStructuredMessage();

        $backofficeAssistantPromptResponse->setAgent($customerManagementAgentResponse->getAgent());
        $backofficeAssistantPromptResponse->setMessage($customerManagementAgentResponse->getMessage());
        $backofficeAssistantPromptResponse->setReasoningMessage($customerManagementAgentResponse->getReasoningMessage());

        return $backofficeAssistantPromptResponse;
    }
}
```

{% info_block infoBox "Info" %}

The `CustomerManagementAgentResponseTransfer` structured message transfer, the `isCustomerManagementAgentEnabled()` and `getCustomerManagementAgentAiConfigurationName()` config methods, and the `customer_management_tools` toolset are project-specific and must be defined as part of this implementation. Model the response transfer on the existing `GeneralAgentResponseTransfer` or `DiscountManagementAgentResponseTransfer` structure, with `agent`, `message`, and `reasoningMessage` fields.

{% endinfo_block %}

## 2) Implement the toolset plugin

Each agent resolves its tools through a named toolset. Create a plugin that implements `ToolSetPluginInterface` from `Spryker\Zed\AiFoundation\Dependency\Tools`:

```php
<?php

namespace Pyz\Zed\AiCommerce\Communication\Plugin\AiFoundation;

use Spryker\Zed\AiFoundation\Dependency\Tools\ToolSetPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\AiCommerce\Communication\AiCommerceCommunicationFactory getFactory()
 */
class CustomerManagementToolSetPlugin extends AbstractPlugin implements ToolSetPluginInterface
{
    protected const string TOOL_SET_CUSTOMER_MANAGEMENT = 'customer_management_tools';

    public function getName(): string
    {
        return static::TOOL_SET_CUSTOMER_MANAGEMENT;
    }

    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Tools\ToolPluginInterface>
     */
    public function getTools(): array
    {
        return [
            $this->getFactory()->createGetCustomerDetailsToolPlugin(),
        ];
    }
}
```

Each tool referenced in `getTools()` implements `ToolPluginInterface` from `Spryker\Zed\AiFoundation\Dependency\Tools`, exposing `getName()`, `getDescription()`, `getParameters()`, and `execute()`. The AI model uses `getName()` and `getDescription()` to decide when to call the tool, and `getParameters()` to know which arguments to pass.

## 3) Register the plugins

Register the agent plugin in `AiCommerceDependencyProvider::getBackofficeAssistantAgentPlugins()`, alongside the built-in agents:

**src/Pyz/Zed/AiCommerce/AiCommerceDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiCommerce;

use Pyz\Zed\AiCommerce\Communication\Plugin\Agent\CustomerManagementAgentPlugin;
use SprykerFeature\Zed\AiCommerce\AiCommerceDependencyProvider as SprykerFeatureAiCommerceDependencyProvider;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Agent\DiscountManagementAgentPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Agent\FormFillAgentPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Agent\GeneralAgentPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Agent\OrderManagementAgentPlugin;

class AiCommerceDependencyProvider extends SprykerFeatureAiCommerceDependencyProvider
{
    /**
     * @return array<\SprykerFeature\Zed\AiCommerce\Dependency\BackofficeAssistant\BackofficeAssistantAgentPluginInterface>
     */
    protected function getBackofficeAssistantAgentPlugins(): array
    {
        return [
            new GeneralAgentPlugin(),
            new OrderManagementAgentPlugin(),
            new DiscountManagementAgentPlugin(),
            new FormFillAgentPlugin(),
            new CustomerManagementAgentPlugin(),
        ];
    }
}
```

Register the toolset plugin in `AiFoundationDependencyProvider::getAiToolSetPlugins()`:

**src/Pyz/Zed/AiFoundation/AiFoundationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiFoundation;

use Pyz\Zed\AiCommerce\Communication\Plugin\AiFoundation\CustomerManagementToolSetPlugin;
use Spryker\Zed\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\DiscountManagementToolSetPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\FormFillToolSetPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\NavigationToolSetPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\OrderDetailsToolSetPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\OrderManagementToolSetPlugin;

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Tools\ToolSetPluginInterface>
     */
    protected function getAiToolSetPlugins(): array
    {
        return [
            new NavigationToolSetPlugin(),
            new OrderManagementToolSetPlugin(),
            new OrderDetailsToolSetPlugin(),
            new DiscountManagementToolSetPlugin(),
            new FormFillToolSetPlugin(),
            new CustomerManagementToolSetPlugin(),
        ];
    }
}
```

## 4) Add a dedicated AI configuration

Built-in Back Office Assistant agents share one Back Office setting, **AI Commerce > Back Office Assistant > AI Vendor**, that lets a project pick OpenAI, AWS Bedrock, or Anthropic for all agents at once. Each agent then resolves to a dedicated, per-provider named AI configuration for that choice. Follow the same pattern for a new agent so it participates in the same vendor switch and gets its own entries in the `AiFoundation` audit log.

### 4.1) Define configuration key constants

Add project-level constants for the new agent's per-provider configuration names and its model settings in `Pyz\Shared\AiCommerce\AiCommerceConstants`:

**src/Pyz/Shared/AiCommerce/AiCommerceConstants.php**

```php
<?php

namespace Pyz\Shared\AiCommerce;

use SprykerFeature\Shared\AiCommerce\AiCommerceConstants as SprykerFeatureAiCommerceConstants;

interface AiCommerceConstants extends SprykerFeatureAiCommerceConstants
{
    public const string AI_CONFIGURATION_CUSTOMER_MANAGEMENT_OPENAI = 'AI_COMMERCE:AI_CONFIGURATION_CUSTOMER_MANAGEMENT_OPENAI';

    public const string AI_CONFIGURATION_CUSTOMER_MANAGEMENT_AWS = 'AI_COMMERCE:AI_CONFIGURATION_CUSTOMER_MANAGEMENT_AWS';

    public const string AI_CONFIGURATION_CUSTOMER_MANAGEMENT_ANTHROPIC = 'AI_COMMERCE:AI_CONFIGURATION_CUSTOMER_MANAGEMENT_ANTHROPIC';
}
```

### 4.2) Resolve the configuration name from `AiCommerceConfig`

Override `AiCommerceConfig` in Zed to resolve the new agent's configuration name from the existing vendor setting, reusing `getBackofficeAssistantAiConfigurationName()`. This is the method referenced as `getCustomerManagementAgentAiConfigurationName()` in the agent plugin from step 1:

**src/Pyz/Zed/AiCommerce/AiCommerceConfig.php**

```php
<?php

namespace Pyz\Zed\AiCommerce;

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use SprykerFeature\Zed\AiCommerce\AiCommerceConfig as SprykerFeatureAiCommerceConfig;

class AiCommerceConfig extends SprykerFeatureAiCommerceConfig
{
    public function getCustomerManagementAgentAiConfigurationName(): ?string
    {
        return match ($this->getBackofficeAssistantAiConfigurationName()) {
            AiCommerceConstants::AI_CONFIGURATION_BACKOFFICE_ASSISTANT_AWS => AiCommerceConstants::AI_CONFIGURATION_CUSTOMER_MANAGEMENT_AWS,
            AiCommerceConstants::AI_CONFIGURATION_BACKOFFICE_ASSISTANT_ANTHROPIC => AiCommerceConstants::AI_CONFIGURATION_CUSTOMER_MANAGEMENT_ANTHROPIC,
            default => AiCommerceConstants::AI_CONFIGURATION_CUSTOMER_MANAGEMENT_OPENAI,
        };
    }

    public function isCustomerManagementAgentEnabled(): bool
    {
        return (bool)filter_var(
            $this->getModuleConfig('ai_commerce:customer_management:general:is_enabled', true),
            FILTER_VALIDATE_BOOLEAN,
        );
    }
}
```

`getBackofficeAssistantAiConfigurationName()` and the `AI_CONFIGURATION_BACKOFFICE_ASSISTANT_*` constants already exist in the base `AiCommerceConfig`. Reuse them instead of adding a separate vendor switch for the new agent.

### 4.3) Add the configuration entries

Add one entry per provider to `config/Shared/config_ai.php`, following the same pattern used for the built-in agents in [Install Back Office Assistant](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/install-backoffice-assistant.html#3-configure-ai-models-for-back-office-assistant). Reuse the existing `CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_*_MODEL` and API token constants so the model and provider credentials stay configurable through Configuration Management, consistent with the other agents:

**config/Shared/config_ai.php**

```php
<?php

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_CUSTOMER_MANAGEMENT_OPENAI] = [
    'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
    'provider_config' => [
        'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_OPENAI_MODEL,
    ],
];

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_CUSTOMER_MANAGEMENT_AWS] = [
    'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
    'provider_config' => [
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_AWS_MODEL,
        'bedrockRuntimeClient' => [
            'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
            'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
        ],
    ],
];

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_CUSTOMER_MANAGEMENT_ANTHROPIC] = [
    'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
    'provider_config' => [
        'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_ANTHROPIC_MODEL,
    ],
];
```

{% info_block infoBox "Info" %}

If the new agent needs its own model choice independent of the other agents, define dedicated `CONFIGURATION_KEY_CUSTOMER_MANAGEMENT_*_MODEL` constants and Configuration Management settings instead of reusing `CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_*_MODEL`.

{% endinfo_block %}

## 5) Enable SSE streaming for the new agent

Back Office Assistant streams tool call progress to the chat widget over Server-Sent Events. `BackofficeAssistantSsePreToolCallPlugin` and `BackofficeAssistantSsePostToolCallPlugin` only emit an event when the current prompt's AI configuration name is present in `AiCommerceConfig::getBackofficeAssistantSseAiConfigurationNames()`. If the new agent's configuration name is missing from that list, its tool calls run normally but their progress does not stream to the widget.

Override `getBackofficeAssistantSseAiConfigurationNames()` in the project's `AiCommerceConfig` to include the new agent's configuration name:

**src/Pyz/Zed/AiCommerce/AiCommerceConfig.php**

```php
<?php

namespace Pyz\Zed\AiCommerce;

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use SprykerFeature\Zed\AiCommerce\AiCommerceConfig as SprykerFeatureAiCommerceConfig;

class AiCommerceConfig extends SprykerFeatureAiCommerceConfig
{
    // ... getCustomerManagementAgentAiConfigurationName() and isCustomerManagementAgentEnabled() from step 4.2

    /**
     * @return array<string>
     */
    public function getBackofficeAssistantSseAiConfigurationNames(): array
    {
        return array_values(array_filter([
            ...parent::getBackofficeAssistantSseAiConfigurationNames(),
            $this->getCustomerManagementAgentAiConfigurationName(),
        ]));
    }
}
```

`BackofficeAssistantSsePreToolCallPlugin` and `BackofficeAssistantSsePostToolCallPlugin` are registered once in `AiFoundationDependencyProvider::getPreToolCallPlugins()` and `getPostToolCallPlugins()`, as shown in [Install Back Office Assistant](/docs/dg/dev/ai/ai-commerce/backoffice-assistant/install-backoffice-assistant.html#4-set-up-behavior). They apply to every agent whose configuration name is in the list above, so no additional plugin registration is required for the new agent.

{% info_block warningBox "Verification" %}

In the Back Office, open the Back Office Assistant chat widget and send a message that matches the new agent's description. Confirm the intent router routes the request to the new agent, that tool call progress streams live in the widget, and that the response uses the expected tools.

{% endinfo_block %}
