---
title: Add a custom Storefront Assistant agent
description: Learn how to add a custom agent with its own system prompt, tools, and Back Office toggle to the Storefront Assistant.
last_updated: Oct 29, 2026
template: howto-guide-template
related:
  - title: Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant.html
  - title: Install Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html
  - title: Stream AI responses with the AiFoundation module
    link: docs/dg/dev/ai/ai-foundation/ai-foundation-stream-prompt.html
---

Storefront Assistant ships with the **Product Discovery** agent. You can add your own agents to handle specific kinds of questions with a dedicated system prompt and tool list. Each agent has its own toggle in the Back Office, and customers can select it in the chat.

This document shows how to add a **Gift Advisor** agent that helps customers find a gift with a subset of the existing catalog tools.

## Prerequisites

[Install Storefront Assistant](/docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html).

## How agent selection works

`AgentSelector` selects one agent for each chat turn:

1. It skips each agent whose toggle, returned by `getEnabledConfigurationKey()`, is off.
2. If the customer selected an agent in the chat, the enabled agent with this name handles the turn.
3. If the customer selected **Auto**, the first enabled agent in the plugin stack whose `isApplicable()` method returns `true` handles the turn.
4. If no agent is found, the turn ends with the `ai_commerce.storefront_assistant.error.no_agent_available` error.

{% info_block warningBox "Plugin order" %}

Register a specialized agent before `ProductDiscoveryAgentPlugin`, and make its `isApplicable()` method strict. `ProductDiscoveryAgentPlugin::isApplicable()` always returns `true`, so in **Auto** mode, an agent after it is never selected.

{% endinfo_block %}

## The agent contract

An agent implements `SprykerFeature\Client\AiCommerce\Dependency\StorefrontAssistant\StorefrontAssistantAgentPluginInterface`:

| METHOD | DESCRIPTION |
|--------|-------------|
| `getName(): string` | Returns a unique name, for example `gift_advisor`. Use lowercase letters and underscores. The name is also part of the glossary keys of the agent. |
| `getDescription(): string` | Returns a short description. The chat uses it when the `agent.<name>.description` glossary key is missing. |
| `isApplicable(StorefrontAssistantChatRequestTransfer): bool` | Returns `true` when the agent must handle the turn in **Auto** mode. |
| `getEnabledConfigurationKey(): string` | Returns the Configuration Management key of the agent toggle. |
| `executeAgent(StorefrontAssistantChatRequestTransfer): PromptResponseTransfer` | Builds the prompt request, calls `AiFoundationClientInterface::streamPrompt()`, and returns the response. For details on `streamPrompt()`, see [Stream AI responses with the AiFoundation module](/docs/dg/dev/ai/ai-foundation/ai-foundation-stream-prompt.html). |

`StorefrontAssistantChatRequestTransfer` gives the agent the following data:

| PROPERTY | CONTENT |
|----------|---------|
| `message` | The text of the customer. |
| `conversationReference` | The conversation reference that the browser sent. It is not scoped to the customer. |
| `customerReference` | The reference of the logged-in customer. |
| `localeName` | The locale of the current request. |
| `attachments` | The validated attachments. |
| `selectedAgent` | The agent that the customer selected, or an empty value for **Auto**. |
| `storefrontAssistantPageContext` | The product, category, or search context of the current page. |

The `PromptRequestTransfer` that the agent sends must contain the following fields:

| FIELD | VALUE |
|-------|-------|
| `aiConfigurationName` | The AI configuration name. Zed resolves the vendor and the model from it. |
| `conversationReference` | The conversation reference scoped to the customer, from `ConversationReferenceDeriverInterface::deriveConversationReference()`. |
| `toolNames` | The tool names of the agent. Each name must belong to a plugin in the Client `AiFoundationDependencyProvider::getAiToolPlugins()`. |
| `systemPrompt` | The configured system prompt with the page context. |
| `promptMessage` | The customer message with the attachments. |

`StorefrontAssistantRequestMapperInterface::mapStorefrontAssistantChatRequestToPromptRequest()` sets all of these fields. Use this mapper instead of building the transfer manually.

{% info_block warningBox "Conversation reference" %}

Always derive the conversation reference with `ConversationReferenceDeriverInterface`. Do not send the raw browser reference. With a raw reference, the history endpoints cannot read the messages, and the history is not scoped to the customer.

{% endinfo_block %}

## 1) Add the constants

Define the Configuration Management keys of the agent toggle and the system prompt:

**src/Pyz/Shared/AiCommerce/AiCommerceConstants.php**

```php
    /**
     * Configuration Management key of the Gift Advisor agent toggle.
     *
     * @api
     */
    public const string CONFIGURATION_KEY_STOREFRONT_ASSISTANT_GENERAL_IS_GIFT_ADVISOR_AGENT_ENABLED = 'ai_commerce:storefront_assistant:general:is_gift_advisor_agent_enabled';

    /**
     * Configuration Management key of the Gift Advisor agent system prompt.
     *
     * @api
     */
    public const string CONFIGURATION_KEY_STOREFRONT_ASSISTANT_GIFT_ADVISOR_SYSTEM_PROMPT = 'ai_commerce:storefront_assistant:system_prompts:gift_advisor_system_prompt';
```

## 2) Add the Back Office settings

Add the toggle and the system prompt of the agent to the `storefront_assistant` tab:

**data/configuration/ai_commerce.configuration.yml**

```yaml
                - key: general
                  # ...
                  settings:
                      # ... is_enabled, is_product_discovery_agent_enabled ...
                      - key: is_gift_advisor_agent_enabled
                        name: Enable Gift Advisor Agent
                        description: When enabled, the Storefront Assistant can use the Gift Advisor agent.
                        type: boolean
                        default_value: 'true'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 2
                        scopes:
                            - global
                - key: system_prompts
                  # ...
                  settings:
                      # ... product_discovery_system_prompt ...
                      - key: gift_advisor_system_prompt
                        name: Gift Advisor System Prompt
                        description: System prompt of the Gift Advisor agent.
                        type: text
                        default_value: "You are the gift advisor of an online shop. Ask for the recipient, the occasion and the budget if the customer did not give them. Ground every product fact in tool results from the current turn. Show products only with display_products."
                        enabled: true
                        secret: false
                        storefront: true
                        order: 1
                        scopes:
                            - global
```

Consider the following when you add the settings:

- Set `storefront: true` on both settings. The agent runs in the Client layer and reads only Storefront settings.
- Always give the system prompt a `default_value`. When the value is blank, `AiCommerceConfig::getStorefrontAssistantSystemPrompt()` returns the default prompt of the **Product Discovery** agent.
- Sync the configuration before you test. A toggle key that is not synced resolves to disabled, and the agent is not displayed in the chat.

## 3) Add the Client configuration methods

Add the getters for the configuration keys and the tool list of the agent:

**src/Pyz/Client/AiCommerce/AiCommerceConfig.php**

```php
    public function getGiftAdvisorAgentEnabledKey(): string
    {
        return AiCommerceConstants::CONFIGURATION_KEY_STOREFRONT_ASSISTANT_GENERAL_IS_GIFT_ADVISOR_AGENT_ENABLED;
    }

    public function getGiftAdvisorSystemPromptKey(): string
    {
        return AiCommerceConstants::CONFIGURATION_KEY_STOREFRONT_ASSISTANT_GIFT_ADVISOR_SYSTEM_PROMPT;
    }

    /**
     * @return list<string>
     */
    public function getGiftAdvisorAgentToolNames(): array
    {
        return [
            CatalogSearchToolPlugin::TOOL_NAME,
            CategoryTreeToolPlugin::TOOL_NAME,
            ProductDetailsToolPlugin::TOOL_NAME,
            DisplayProductsToolPlugin::TOOL_NAME,
            OfferChoicesToolPlugin::TOOL_NAME,
        ];
    }
```

Each tool in this list must be registered in the Client `AiFoundationDependencyProvider::getAiToolPlugins()`. A customer-facing tool must also be in `getStorefrontAssistantCustomerFacingToolNames()`.

## 4) Add the agent plugin

**src/Pyz/Client/AiCommerce/Plugin/StorefrontAssistant/GiftAdvisorAgentPlugin.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\AiCommerce\Plugin\StorefrontAssistant;

use Generated\Shared\Transfer\PromptResponseTransfer;
use Generated\Shared\Transfer\StorefrontAssistantChatRequestTransfer;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\Kernel\BundleConfigResolverAwareTrait;
use SprykerFeature\Client\AiCommerce\Dependency\StorefrontAssistant\StorefrontAssistantAgentPluginInterface;

/**
 * @method \SprykerFeature\Client\AiCommerce\AiCommerceFactory getFactory()
 * @method \Pyz\Client\AiCommerce\AiCommerceConfig getConfig()
 */
class GiftAdvisorAgentPlugin extends AbstractPlugin implements StorefrontAssistantAgentPluginInterface
{
    use BundleConfigResolverAwareTrait;

    protected const string AGENT_NAME = 'gift_advisor';

    protected const string AGENT_DESCRIPTION = 'Helps the customer to find a gift for a recipient, an occasion and a budget.';

    protected const array GIFT_KEYWORDS = ['gift', 'present', 'geschenk'];

    /**
     * {@inheritDoc}
     *
     * @api
     */
    public function getName(): string
    {
        return static::AGENT_NAME;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     */
    public function getDescription(): string
    {
        return static::AGENT_DESCRIPTION;
    }

    /**
     * {@inheritDoc}
     * - Applies when the customer message names a gift.
     *
     * @api
     */
    public function isApplicable(StorefrontAssistantChatRequestTransfer $storefrontAssistantChatRequestTransfer): bool
    {
        $message = mb_strtolower((string)$storefrontAssistantChatRequestTransfer->getMessage());

        foreach (static::GIFT_KEYWORDS as $giftKeyword) {
            if (str_contains($message, $giftKeyword)) {
                return true;
            }
        }

        return false;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     */
    public function getEnabledConfigurationKey(): string
    {
        return $this->getConfig()->getGiftAdvisorAgentEnabledKey();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     */
    public function executeAgent(
        StorefrontAssistantChatRequestTransfer $storefrontAssistantChatRequestTransfer
    ): PromptResponseTransfer {
        $factory = $this->getFactory();
        $config = $this->getConfig();

        $scopedConversationReference = $factory->createConversationReferenceDeriver()->deriveConversationReference(
            (string)$storefrontAssistantChatRequestTransfer->getCustomerReference(),
            (string)$storefrontAssistantChatRequestTransfer->getConversationReference(),
        );

        $systemPrompt = $factory->createPageContextSystemPromptComposer()->composeSystemPrompt(
            $config->getStorefrontAssistantSystemPrompt($config->getGiftAdvisorSystemPromptKey()),
            $storefrontAssistantChatRequestTransfer,
        );

        $promptRequestTransfer = $factory->createStorefrontAssistantRequestMapper()
            ->mapStorefrontAssistantChatRequestToPromptRequest(
                $storefrontAssistantChatRequestTransfer,
                $config->getStorefrontAssistantAiConfigurationName(),
                $scopedConversationReference,
                $config->getGiftAdvisorAgentToolNames(),
                $systemPrompt,
            );

        return $factory->getAiFoundationClient()->streamPrompt($promptRequestTransfer);
    }
}
```

The Client `AbstractPlugin` has no `getConfig()` method. To read the configuration, add `BundleConfigResolverAwareTrait`, as `ProductDiscoveryAgentPlugin` does.

The `executeAgent()` method uses the `create*()` methods of the module factory, so the agent needs no project-level factory. It derives the scoped conversation reference, composes the system prompt with the page context, and maps the chat request to a prompt request.

In this example, `isApplicable()` checks keywords to keep the example short. A production agent can use the page context, the attachments, or a short classification prompt.

Follow these rules in `executeAgent()`:

- Return the `PromptResponseTransfer` of `streamPrompt()`. If the turn fails, return an unsuccessful response with errors. Storefront Assistant changes it into an `error` stream event.
- Do not write to the output. The SSE plugins stream the text, the reasoning, and the tool events.
- Do not throw an exception for an expected failure. Return an unsuccessful response instead.

## 5) Register the agent

Add the plugin to the agent stack before `ProductDiscoveryAgentPlugin`:

**src/Pyz/Client/AiCommerce/AiCommerceDependencyProvider.php**

```php
use Pyz\Client\AiCommerce\Plugin\StorefrontAssistant\GiftAdvisorAgentPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\ProductDiscoveryAgentPlugin;

    /**
     * @return array<\SprykerFeature\Client\AiCommerce\Dependency\StorefrontAssistant\StorefrontAssistantAgentPluginInterface>
     */
    protected function getStorefrontAssistantAgentPlugins(): array
    {
        return [
            new GiftAdvisorAgentPlugin(),
            new ProductDiscoveryAgentPlugin(),
        ];
    }
```

## 6) Add translations

Add the label and the description of the agent for each store locale:

**data/import/common/common/glossary.csv**

```csv
ai_commerce.storefront_assistant.agent.gift_advisor.label,Gift Advisor,en_US
ai_commerce.storefront_assistant.agent.gift_advisor.label,Geschenkberater,de_DE
ai_commerce.storefront_assistant.agent.gift_advisor.description,"Helps you find a gift for a person, an occasion and a budget.",en_US
ai_commerce.storefront_assistant.agent.gift_advisor.description,"Hilft Ihnen, ein Geschenk für eine Person, einen Anlass und ein Budget zu finden.",de_DE
```

If these keys are missing, the chat shows the agent name in a readable form, such as `Gift Advisor`, and the English text of `getDescription()`.

## 7) Apply the changes

```bash
console cache:class-resolver:build
console configuration:sync
console data:import glossary
console queue:worker:start --stop-when-empty
console cache:empty-all
```

{% info_block warningBox "Verification" %}

Make sure the following applies:

1. When you open the chat as a logged-in customer, the agent selector shows **Auto**, **Gift Advisor**, and **Product Discovery**.
2. When you select **Auto** and send "I need a gift for my father", the agent badge shows **Gift Advisor**.
3. When you select **Auto** and send "Show me cameras", the agent badge shows **Product Discovery**.
4. When you select **Gift Advisor** and send any message, the **Gift Advisor** agent answers.
5. When you turn off **Enable Gift Advisor Agent** in the Back Office, the agent disappears from the selector, and **Auto** uses **Product Discovery**.
6. After you reload the page and open the conversation, the messages of the **Gift Advisor** agent are displayed in the history.

{% endinfo_block %}

## Optional: Use a separate AI configuration for the agent

The example agent uses the same AI vendor and model as the **Product Discovery** agent. To give the agent its own model, do all of the following steps. If you skip a step, the agent fails or streams nothing.

1. Add the AI configuration constants and the model setting of the agent, as described in [Install Storefront Assistant](/docs/dg/dev/ai/ai-commerce/storefront-assistant/install-storefront-assistant.html#3-set-up-configuration).
2. Add the AI configuration to `config/Shared/config_ai.php`.
3. Add the AI configuration name to `getClientResolvableAiConfigurationNames()` in the Zed `AiFoundationConfig`. Without it, Zed rejects the turn.
4. Add the AI configuration name to `getStorefrontAssistantSseAiConfigurationNames()` in the Client `AiCommerceConfig`. Without it, the SSE plugins ignore the turn: the model runs, but the customer sees no text and no tool events.
5. In `executeAgent()`, pass the new AI configuration name to `mapStorefrontAssistantChatRequestToPromptRequest()`.

**src/Pyz/Client/AiCommerce/AiCommerceConfig.php**

```php
    /**
     * @return array<string>
     */
    public function getStorefrontAssistantSseAiConfigurationNames(): array
    {
        return [
            $this->getStorefrontAssistantAiConfigurationName(),
            $this->getGiftAdvisorAiConfigurationName(),
        ];
    }
```

## Optional: Add a custom tool for the agent

A tool is a function that the model can call during a chat turn. The agent in this guide uses only the tools of the module. To give the **Gift Advisor** agent its own data or logic, add a custom tool. This example adds the `gift_occasion_guide` tool. The tool returns a suggested budget range and gift ideas for an occasion, so the agent does not guess them.

A tool is either *research* or *customer-facing*. The result of a research tool stays on the server, and the model uses it to write the answer. The result of a customer-facing tool also goes to the browser and renders as a UI block. The example tool is a research tool. For the customer-facing tools, see [Storefront Assistant agents](/docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant-agents.html#tools).

### 1) Add the tool plugin

The tool plugin implements `Spryker\Client\AiFoundation\Dependency\Tools\ToolPluginInterface`:

| METHOD | DESCRIPTION |
|--------|-------------|
| `getName(): string` | Returns the unique tool name that the model calls. Use lowercase letters and underscores. |
| `getDescription(): string` | Returns the instruction for the model. It must say what the tool returns and when to call it. The model decides from this text whether to call the tool. |
| `getParameters(): array` | Returns the `ToolParameterInterface` list of the arguments that the model sends. Use `SprykerFeature\Client\AiCommerce\StorefrontAssistant\Tool\ToolParameter`, which takes the name, the `ToolParameterType`, a description, and a flag for a required argument. |
| `execute(...$arguments): mixed` | Runs the tool. The arguments are the values of the parameters, by name. Return an array. The array is encoded to JSON and sent to the model. |

**src/Pyz/Client/AiCommerce/Plugin/StorefrontAssistant/Tool/GiftOccasionGuideToolPlugin.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\AiCommerce\Plugin\StorefrontAssistant\Tool;

use Spryker\Client\AiFoundation\Dependency\Tools\ToolPluginInterface;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Shared\AiFoundation\Tools\ToolParameterType;
use SprykerFeature\Client\AiCommerce\StorefrontAssistant\Tool\ToolParameter;

class GiftOccasionGuideToolPlugin extends AbstractPlugin implements ToolPluginInterface
{
    public const string TOOL_NAME = 'gift_occasion_guide';

    protected const string TOOL_DESCRIPTION = <<<'DESCRIPTION'
        Returns the suggested budget range in euros and gift ideas for one occasion. Call it when the customer names an occasion and has not given a budget, then use the result to search the catalog with `catalog_search`.
        - `occasion` must be one of the listed values.
        - If the result contains `error`, correct the request as the error says.
        DESCRIPTION;

    protected const string PARAMETER_OCCASION = 'occasion';

    protected const array OCCASION_GUIDES = [
        'birthday' => ['budgetMin' => 20, 'budgetMax' => 100, 'ideas' => ['camera', 'headphones', 'smartwatch']],
        'wedding' => ['budgetMin' => 50, 'budgetMax' => 250, 'ideas' => ['tablet', 'speaker', 'photo frame']],
        'housewarming' => ['budgetMin' => 15, 'budgetMax' => 60, 'ideas' => ['lamp', 'smart plug', 'speaker']],
    ];

    /**
     * {@inheritDoc}
     *
     * @api
     */
    public function getName(): string
    {
        return static::TOOL_NAME;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     */
    public function getDescription(): string
    {
        return static::TOOL_DESCRIPTION;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return array<\Spryker\Client\AiFoundation\Dependency\Tools\ToolParameterInterface>
     */
    public function getParameters(): array
    {
        return [
            new ToolParameter(
                static::PARAMETER_OCCASION,
                ToolParameterType::String,
                sprintf('One of: %s.', implode(', ', array_keys(static::OCCASION_GUIDES))),
                true,
            ),
        ];
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param mixed ...$arguments
     *
     * @return array<string, mixed>
     */
    public function execute(...$arguments): mixed
    {
        $occasion = (string)($arguments[static::PARAMETER_OCCASION] ?? '');

        if (!isset(static::OCCASION_GUIDES[$occasion])) {
            return ['error' => sprintf('Unknown occasion. Use one of: %s.', implode(', ', array_keys(static::OCCASION_GUIDES)))];
        }

        return static::OCCASION_GUIDES[$occasion];
    }
}
```

Follow these rules in a tool:

- Do not throw an exception for an expected failure. Return an array with an `error` key, and describe in the tool description how the model must react to it.
- Return only data that the customer may see. The model can repeat any value of the result in its answer.
- To use a Client or a service, add the `create*()` method to the project `AiCommerceFactory` and call it with `$this->getFactory()`, as the tools of the module do.

### 2) Register the tool

Add the plugin to the Client `AiFoundationDependencyProvider::getAiToolPlugins()`. Keep the tool plugins that are already there:

**src/Pyz/Client/AiFoundation/AiFoundationDependencyProvider.php**

```php
use Pyz\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\GiftOccasionGuideToolPlugin;

    protected function getAiToolPlugins(): array
    {
        return [
            // ... the tool plugins of Storefront Assistant
            new GiftOccasionGuideToolPlugin(),
        ];
    }
```

### 3) Add the tool to the agent

Add the tool name to the tool list of the agent in the Client `AiCommerceConfig`:

**src/Pyz/Client/AiCommerce/AiCommerceConfig.php**

```php
    public function getGiftAdvisorAgentToolNames(): array
    {
        return [
            CatalogSearchToolPlugin::TOOL_NAME,
            CategoryTreeToolPlugin::TOOL_NAME,
            ProductDetailsToolPlugin::TOOL_NAME,
            DisplayProductsToolPlugin::TOOL_NAME,
            OfferChoicesToolPlugin::TOOL_NAME,
            GiftOccasionGuideToolPlugin::TOOL_NAME,
        ];
    }
```

A tool that is not in this list is not sent to the model, even if the plugin is registered. If the customer must see the result of the tool, also add the tool name to `getStorefrontAssistantCustomerFacingToolNames()` and add a frontend renderer. For details, see the tool renderer contract in `vendor/spryker-feature/ai-commerce/src/SprykerFeature/Shared/AiCommerce/Theme/default/Chat/README.md`.

### 4) Add the progress label

While the tool runs, the chat shows a progress label, such as "Searching the catalog". Add the glossary key for each locale:

**data/import/common/common/glossary.csv**

```csv
ai_commerce.storefront_assistant.tool.gift_occasion_guide,Looking up gift ideas,en_US
ai_commerce.storefront_assistant.tool.gift_occasion_guide,Geschenkideen werden gesucht,de_DE
```

Without the key, the progress label shows the raw glossary key.

### 5) Add the tool to the widget

The widget publishes the list of tool names to the frontend, which translates each name into the progress label. `StorefrontAssistantWidget::addToolNamesParameter()` contains a fixed list, so add the new name to it. Create a project widget that extends the module widget and overrides the protected method:

**src/Pyz/Yves/AiCommerce/StorefrontAssistant/Widget/StorefrontAssistantWidget.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\AiCommerce\StorefrontAssistant\Widget;

use Pyz\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\GiftOccasionGuideToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\CatalogSearchToolPlugin;
use SprykerFeature\Yves\AiCommerce\StorefrontAssistant\Widget\StorefrontAssistantWidget as SprykerFeatureStorefrontAssistantWidget;

class StorefrontAssistantWidget extends SprykerFeatureStorefrontAssistantWidget
{
    protected function addToolNamesParameter(): void
    {
        $this->addParameter(static::PARAMETER_TOOL_NAMES, [
            CatalogSearchToolPlugin::TOOL_NAME,
            // ... all other tool names of the module widget
            GiftOccasionGuideToolPlugin::TOOL_NAME,
        ]);
    }
}
```

Copy the full list of the tool names from `addToolNamesParameter()` of the module widget. Then register the project widget in `ShopApplicationDependencyProvider::getGlobalWidgets()` instead of the module widget, and update the `widgetGlobalExists()` and `{% raw %}{% widget %}{% endraw %}` calls of your templates to use the same widget name.

### 6) Apply the changes

```bash
console cache:class-resolver:build
console data:import glossary
console queue:worker:start --stop-when-empty
console cache:empty-all
```

{% info_block warningBox "Verification" %}

Make sure the following applies:

1. Select **Gift Advisor** and send "I need a birthday gift". The progress label "Looking up gift ideas" is displayed.
2. The answer uses the budget range and the ideas of the `birthday` entry.
3. Send "I need a gift for a graduation". The tool returns the `error` value, and the agent asks which of the listed occasions fits.

{% endinfo_block %}
