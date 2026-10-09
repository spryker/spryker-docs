---
title: Add a custom Storefront Assistant agent
description: Learn how to add a custom agent with its own system prompt, tools, and Back Office toggle to the Storefront Assistant.
last_updated: Oct 9, 2026
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

## 4) Add the prompt request builder

The builder derives the scoped conversation reference, composes the system prompt with the page context, and maps the chat request to a prompt request.

**src/Pyz/Client/AiCommerce/StorefrontAssistant/Prompt/GiftAdvisorPromptRequestBuilderInterface.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\AiCommerce\StorefrontAssistant\Prompt;

use Generated\Shared\Transfer\PromptRequestTransfer;
use Generated\Shared\Transfer\StorefrontAssistantChatRequestTransfer;

interface GiftAdvisorPromptRequestBuilderInterface
{
    public function buildPromptRequest(
        StorefrontAssistantChatRequestTransfer $storefrontAssistantChatRequestTransfer
    ): PromptRequestTransfer;
}
```

**src/Pyz/Client/AiCommerce/StorefrontAssistant/Prompt/GiftAdvisorPromptRequestBuilder.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\AiCommerce\StorefrontAssistant\Prompt;

use Generated\Shared\Transfer\PromptRequestTransfer;
use Generated\Shared\Transfer\StorefrontAssistantChatRequestTransfer;
use Pyz\Client\AiCommerce\AiCommerceConfig;
use SprykerFeature\Client\AiCommerce\StorefrontAssistant\Conversation\ConversationReferenceDeriverInterface;
use SprykerFeature\Client\AiCommerce\StorefrontAssistant\Mapper\StorefrontAssistantRequestMapperInterface;
use SprykerFeature\Client\AiCommerce\StorefrontAssistant\Prompt\PageContextSystemPromptComposerInterface;

class GiftAdvisorPromptRequestBuilder implements GiftAdvisorPromptRequestBuilderInterface
{
    public function __construct(
        protected ConversationReferenceDeriverInterface $conversationReferenceDeriver,
        protected StorefrontAssistantRequestMapperInterface $storefrontAssistantRequestMapper,
        protected PageContextSystemPromptComposerInterface $pageContextSystemPromptComposer,
        protected AiCommerceConfig $aiCommerceConfig
    ) {
    }

    public function buildPromptRequest(
        StorefrontAssistantChatRequestTransfer $storefrontAssistantChatRequestTransfer
    ): PromptRequestTransfer {
        $scopedConversationReference = $this->conversationReferenceDeriver->deriveConversationReference(
            (string)$storefrontAssistantChatRequestTransfer->getCustomerReference(),
            (string)$storefrontAssistantChatRequestTransfer->getConversationReference(),
        );

        $systemPrompt = $this->pageContextSystemPromptComposer->composeSystemPrompt(
            $this->aiCommerceConfig->getStorefrontAssistantSystemPrompt(
                $this->aiCommerceConfig->getGiftAdvisorSystemPromptKey(),
            ),
            $storefrontAssistantChatRequestTransfer,
        );

        return $this->storefrontAssistantRequestMapper->mapStorefrontAssistantChatRequestToPromptRequest(
            $storefrontAssistantChatRequestTransfer,
            $this->aiCommerceConfig->getStorefrontAssistantAiConfigurationName(),
            $scopedConversationReference,
            $this->aiCommerceConfig->getGiftAdvisorAgentToolNames(),
            $systemPrompt,
        );
    }
}
```

## 5) Add the factory method

Create a project-level Client factory that extends the module factory. The module factory already provides the helper `create*()` methods and `getAiFoundationClient()`.

**src/Pyz/Client/AiCommerce/AiCommerceFactory.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\AiCommerce;

use Pyz\Client\AiCommerce\StorefrontAssistant\Prompt\GiftAdvisorPromptRequestBuilder;
use Pyz\Client\AiCommerce\StorefrontAssistant\Prompt\GiftAdvisorPromptRequestBuilderInterface;
use SprykerFeature\Client\AiCommerce\AiCommerceFactory as SprykerFeatureAiCommerceFactory;

/**
 * @method \Pyz\Client\AiCommerce\AiCommerceConfig getConfig()
 */
class AiCommerceFactory extends SprykerFeatureAiCommerceFactory
{
    public function createGiftAdvisorPromptRequestBuilder(): GiftAdvisorPromptRequestBuilderInterface
    {
        return new GiftAdvisorPromptRequestBuilder(
            $this->createConversationReferenceDeriver(),
            $this->createStorefrontAssistantRequestMapper(),
            $this->createPageContextSystemPromptComposer(),
            $this->getConfig(),
        );
    }
}
```

If your project already has a Client `AiCommerceFactory`, add the method to it.

## 6) Add the agent plugin

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
 * @method \Pyz\Client\AiCommerce\AiCommerceFactory getFactory()
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
        $promptRequestTransfer = $this->getFactory()
            ->createGiftAdvisorPromptRequestBuilder()
            ->buildPromptRequest($storefrontAssistantChatRequestTransfer);

        return $this->getFactory()
            ->getAiFoundationClient()
            ->streamPrompt($promptRequestTransfer);
    }
}
```

The Client `AbstractPlugin` has no `getConfig()` method. To read the configuration, add `BundleConfigResolverAwareTrait`, as `ProductDiscoveryAgentPlugin` does.

In this example, `isApplicable()` checks keywords to keep the example short. A production agent can use the page context, the attachments, or a short classification prompt.

Follow these rules in `executeAgent()`:

- Return the `PromptResponseTransfer` of `streamPrompt()`. If the turn fails, return an unsuccessful response with errors. Storefront Assistant changes it into an `error` stream event.
- Do not write to the output. The SSE plugins stream the text, the reasoning, and the tool events.
- Do not throw an exception for an expected failure. Return an unsuccessful response instead.

## 7) Register the agent

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

## 8) Add translations

Add the label and the description of the agent for each store locale:

**data/import/common/common/glossary.csv**

```csv
ai_commerce.storefront_assistant.agent.gift_advisor.label,Gift Advisor,en_US
ai_commerce.storefront_assistant.agent.gift_advisor.label,Geschenkberater,de_DE
ai_commerce.storefront_assistant.agent.gift_advisor.description,"Helps you find a gift for a person, an occasion and a budget.",en_US
ai_commerce.storefront_assistant.agent.gift_advisor.description,"Hilft Ihnen, ein Geschenk für eine Person, einen Anlass und ein Budget zu finden.",de_DE
```

If these keys are missing, the chat shows the agent name in a readable form, such as `Gift Advisor`, and the English text of `getDescription()`.

## 9) Apply the changes

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
5. In the prompt request builder, pass the new AI configuration name to `mapStorefrontAssistantChatRequestToPromptRequest()`.

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

## Optional: Add a new tool for the agent

1. Create a class that implements `Spryker\Client\AiFoundation\Dependency\Tools\ToolPluginInterface` and has a `TOOL_NAME` constant.
2. Register the tool in the Client `AiFoundationDependencyProvider::getAiToolPlugins()`.
3. Add the tool name to the tool list of the agent, for example `getGiftAdvisorAgentToolNames()`.
4. If the customer must see the result, add the tool name to `getStorefrontAssistantCustomerFacingToolNames()`, and add a frontend renderer for the result. For details, see the component README: `vendor/spryker-feature/ai-commerce/src/SprykerFeature/Yves/AiCommerce/Theme/default/components/organisms/storefront-assistant/README.md`.
5. Add the `ai_commerce.storefront_assistant.tool.<tool_name>` glossary key for each locale. Without it, the progress label shows the raw glossary key.
6. Add the tool name to the tool list of the widget. `StorefrontAssistantWidget::addToolNamesParameter()` contains a fixed list. Create `Pyz\Yves\AiCommerce\StorefrontAssistant\Widget\StorefrontAssistantWidget` that extends the module widget and overrides this protected method. Then register the project widget in `ShopApplicationDependencyProvider::getGlobalWidgets()` instead of the module widget.
