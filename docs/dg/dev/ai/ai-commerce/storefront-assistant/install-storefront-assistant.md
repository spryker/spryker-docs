---
title: Install Storefront Assistant
description: Learn how to install the Storefront Assistant feature that adds an AI shopping chat to the Spryker Storefront.
last_updated: Oct 9, 2026
template: feature-integration-guide-template
related:
  - title: Storefront Assistant
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant.html
  - title: Add a custom Storefront Assistant agent
    link: docs/dg/dev/ai/ai-commerce/storefront-assistant/add-custom-storefront-assistant-agent.html
  - title: Configure multiple AI providers
    link: docs/dg/dev/ai/ai-commerce/configure-multiple-ai-providers.html
---

Storefront Assistant is an AI chat for logged-in Storefront customers. It answers shopping questions from the shop catalog and streams each answer to the browser. This document describes how to install the Storefront Assistant feature.

For the architecture and the configuration options, see [Storefront Assistant](/docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant.html).

## Install the feature core

Follow the steps in the following sections to install the Storefront Assistant feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|------|---------|-------------------|
| AI Commerce | {{page.release_tag}} | [Install AI Commerce](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html) |
| Configuration Management | {{page.release_tag}} | [Install the Configuration Management feature](/docs/dg/dev/integrate-and-configure/integrate-confguration-feature.html) |
| Catalog | {{page.release_tag}} | |
| Customer Account Management | {{page.release_tag}} | |

Make sure that your project also has the following:

- A key-value storage (Redis). The conversation index uses it.
- The API credentials of at least one AI vendor: OpenAI, Anthropic, or AWS Bedrock. The model must support streaming and tool calls.

{% info_block infoBox "Logged-in customers only" %}

The chat is available only to logged-in customers. For guests, the widget renders nothing, and the endpoints return `403`.

{% endinfo_block %}

### 1) Install the required modules

```bash
composer require spryker-feature/ai-commerce spryker/router --update-with-dependencies
```

`spryker-feature/ai-commerce` requires `spryker/ai-foundation` version `^0.9.0` or higher. `spryker/router` is an optional dependency of `spryker-feature/ai-commerce`, but the Storefront Assistant routes need it.

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|--------|--------------------|
| AiCommerce | vendor/spryker-feature/ai-commerce |
| AiFoundation | vendor/spryker/ai-foundation |
| Router | vendor/spryker/router |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

The chat history uses the `spy_ai_conversation_history` table of the `AiFoundation` module. Apply the database changes and generate the transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied:

| ENTITY | TYPE | EVENT |
|--------|------|-------|
| spy_ai_conversation_history | table | created |
| StorefrontAssistantChatRequestTransfer | class | created |
| StorefrontAssistantPageContextTransfer | class | created |

{% endinfo_block %}

### 3) Set up configuration

Storefront Assistant needs one AI configuration for each AI vendor that you offer in the Back Office. The Back Office stores the selected vendor, the model, and the API token. The AI configuration reads these values at runtime through `AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX`.

1. Define the Storefront Assistant constants at the project level. The vendor API token keys are shared with other AI Commerce features. Add them only if they do not exist.

**src/Pyz/Shared/AiCommerce/AiCommerceConstants.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Shared\AiCommerce;

use SprykerFeature\Shared\AiCommerce\AiCommerceConstants as SprykerFeatureAiCommerceConstants;

interface AiCommerceConstants extends SprykerFeatureAiCommerceConstants
{
    // Shared AI vendor keys. Add them only if they do not exist.
    public const string CONFIGURATION_KEY_OPENAI_API_TOKEN = 'ai_vendor:openai:general:api_token';
    public const string CONFIGURATION_KEY_AWS_API_TOKEN = 'ai_vendor:aws:general:api_token';
    public const string CONFIGURATION_KEY_AWS_REGION = 'ai_vendor:aws:general:region';
    public const string CONFIGURATION_KEY_ANTHROPIC_API_TOKEN = 'ai_vendor:anthropic:general:api_token';

    public const string CONFIGURATION_KEY_STOREFRONT_ASSISTANT_AI_CONFIGURATION = 'ai_commerce:storefront_assistant:ai_vendor:ai_configuration';
    public const string CONFIGURATION_KEY_STOREFRONT_ASSISTANT_OPENAI_MODEL = 'ai_commerce:storefront_assistant:ai_vendor:openai_model';
    public const string CONFIGURATION_KEY_STOREFRONT_ASSISTANT_AWS_MODEL = 'ai_commerce:storefront_assistant:ai_vendor:aws_model';
    public const string CONFIGURATION_KEY_STOREFRONT_ASSISTANT_ANTHROPIC_MODEL = 'ai_commerce:storefront_assistant:ai_vendor:anthropic_model';

    public const string AI_CONFIGURATION_STOREFRONT_ASSISTANT_OPENAI = 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_OPENAI';
    public const string AI_CONFIGURATION_STOREFRONT_ASSISTANT_AWS = 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_AWS';
    public const string AI_CONFIGURATION_STOREFRONT_ASSISTANT_ANTHROPIC = 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_ANTHROPIC';
}
```

{% info_block warningBox "Matching values" %}

Keep the values of the `AI_CONFIGURATION_STOREFRONT_ASSISTANT_*` constants equal to the radio option values in `ai_commerce.configuration.yml` from step 4. The selected radio value is the key of the AI configuration in `config_ai.php`. If the values differ, every chat turn fails with the `AI configuration "X" is not configured` error.

{% endinfo_block %}

2. Add one AI configuration for each AI vendor to `config/Shared/config_ai.php`. Make sure that `config/Shared/config_default.php` loads this file with `require 'config_ai.php';`.

**config/Shared/config_ai.php**

```php
<?php

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_STOREFRONT_ASSISTANT_OPENAI] = [
    'provider_name' => AiFoundationConstants::PROVIDER_OPENAI_RESPONSES,
    'provider_config' => [
        'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_STOREFRONT_ASSISTANT_OPENAI_MODEL,
        'parameters' => [
            'reasoning' => [
                'effort' => 'medium',
                'summary' => 'auto',
            ],
        ],
    ],
];

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_STOREFRONT_ASSISTANT_AWS] = [
    'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
    'provider_config' => [
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_STOREFRONT_ASSISTANT_AWS_MODEL,
        'bedrockRuntimeClient' => [
            'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
            'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
        ],
        'inferenceConfig' => [
            'maxTokens' => 8192,
        ],
        'additionalModelRequestFields' => [
            'thinking' => [
                'type' => 'enabled',
                'budget_tokens' => 2048,
            ],
        ],
    ],
];

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_STOREFRONT_ASSISTANT_ANTHROPIC] = [
    'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
    'provider_config' => [
        'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_STOREFRONT_ASSISTANT_ANTHROPIC_MODEL,
        'max_tokens' => 8192,
        'parameters' => [
            'thinking' => [
                'type' => 'enabled',
                'budget_tokens' => 2048,
            ],
        ],
    ],
];
```

Consider the following when you add the AI configurations:

- For OpenAI, use `PROVIDER_OPENAI_RESPONSES`, not `PROVIDER_OPENAI`. The OpenAI Responses API streams the reasoning summary that the chat shows.
- Do not add a `system_prompt` entry. The agent composes its own system prompt. A `system_prompt` entry adds a second system prompt.
- To hide the reasoning of the model, remove the `reasoning` and `thinking` blocks, or override `isStorefrontAssistantReasoningStreamed()` to return `false` in the Client `AiCommerceConfig`.
- Optional: to change the size of the conversation history that the model receives, set `$config[AiFoundationConstants::CONVERSATION_HISTORY_CONTEXT_WINDOW]`. The maximum message length of the chat is calculated from this value.

3. Allow the Client to use the Storefront Assistant AI configurations. The Client sends the AI configuration name to Zed with each chat turn, and by default Zed rejects every name that comes from the Client layer. For details, see [Allow the AI configuration in the Client](/docs/dg/dev/ai/ai-foundation/ai-foundation-stream-prompt.html#1-allow-the-ai-configuration-in-the-client).

**src/Pyz/Zed/AiFoundation/AiFoundationConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\AiFoundation;

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use Spryker\Zed\AiFoundation\AiFoundationConfig as SprykerAiFoundationConfig;

class AiFoundationConfig extends SprykerAiFoundationConfig
{
    /**
     * @return array<string>
     */
    public function getClientResolvableAiConfigurationNames(): array
    {
        return [
            AiCommerceConstants::AI_CONFIGURATION_STOREFRONT_ASSISTANT_OPENAI,
            AiCommerceConstants::AI_CONFIGURATION_STOREFRONT_ASSISTANT_AWS,
            AiCommerceConstants::AI_CONFIGURATION_STOREFRONT_ASSISTANT_ANTHROPIC,
        ];
    }
}
```

If you already return other names from this method, add the Storefront Assistant names to the list.

4. Configure the Client `AiCommerceConfig`. The module returns empty values for these three methods, so the project must override them:

| METHOD | EFFECT WITHOUT AN OVERRIDE |
|--------|----------------------------|
| `getStorefrontAssistantAiConfigurationName()` | Zed cannot resolve the AI configuration, and every turn fails. |
| `getProductDiscoveryAgentToolNames()` | The agent has no tools and cannot search the catalog. |
| `getStorefrontAssistantCustomerFacingToolNames()` | The chat shows no product cards, comparison tables, choices, or setups. |

**src/Pyz/Client/AiCommerce/AiCommerceConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\AiCommerce;

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use SprykerFeature\Client\AiCommerce\AiCommerceConfig as SprykerFeatureAiCommerceConfig;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\CatalogSearchToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\CatalogSuggestToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\CategoryTreeToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\CompareProductsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\DisplayProductsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\DisplaySetupToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\OfferChoicesToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ProductDetailsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ProductRelationsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ProductSetsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ReadShopPageToolPlugin;

class AiCommerceConfig extends SprykerFeatureAiCommerceConfig
{
    public function getStorefrontAssistantAiConfigurationName(): string
    {
        return (string)$this->getModuleConfig(AiCommerceConstants::CONFIGURATION_KEY_STOREFRONT_ASSISTANT_AI_CONFIGURATION);
    }

    /**
     * @return list<string>
     */
    public function getProductDiscoveryAgentToolNames(): array
    {
        return [
            CatalogSearchToolPlugin::TOOL_NAME,
            CatalogSuggestToolPlugin::TOOL_NAME,
            CategoryTreeToolPlugin::TOOL_NAME,
            DisplayProductsToolPlugin::TOOL_NAME,
            ProductDetailsToolPlugin::TOOL_NAME,
            ProductRelationsToolPlugin::TOOL_NAME,
            ReadShopPageToolPlugin::TOOL_NAME,
            CompareProductsToolPlugin::TOOL_NAME,
            ProductSetsToolPlugin::TOOL_NAME,
            OfferChoicesToolPlugin::TOOL_NAME,
            DisplaySetupToolPlugin::TOOL_NAME,
        ];
    }

    /**
     * @return array<string>
     */
    public function getStorefrontAssistantCustomerFacingToolNames(): array
    {
        return [
            DisplayProductsToolPlugin::TOOL_NAME,
            CompareProductsToolPlugin::TOOL_NAME,
            OfferChoicesToolPlugin::TOOL_NAME,
            DisplaySetupToolPlugin::TOOL_NAME,
        ];
    }
}
```

For the other Client configuration methods that you can override, see [Client configuration](/docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant.html#client-configuration).

{% info_block warningBox "Verification" %}

Make sure that `config/Shared/config_ai.php` has the three `AI_CONFIGURATION_STOREFRONT_ASSISTANT_*` entries and that the Zed `AiFoundationConfig::getClientResolvableAiConfigurationNames()` returns the same three names.

{% endinfo_block %}

### 4) Sync configuration

The module configuration ships the **Storefront Assistant** tab disabled. To enable the tab and add the AI vendor settings, add the `storefront_assistant` tab to the project configuration file. The settings back the `configuration::` references in `config/Shared/config_ai.php`, so they must exist before you sync.

Set `storefront: true` on every setting that Yves or the Client reads. The Client runs in the Yves process and reads only Storefront settings. Keep `storefront: false` on the model settings, because Zed resolves them.

<details>
<summary>data/configuration/ai_commerce.configuration.yml</summary>

```yaml
features:
    - key: ai_commerce
      tabs:
          - key: storefront_assistant
            enabled: true
            groups:
                - key: general
                  name: General
                  description: General settings for the Storefront Assistant.
                  enabled: true
                  order: 0
                  scopes:
                      - global
                  settings:
                      - key: is_enabled
                        name: Enable Storefront Assistant
                        description: When enabled, the AI-powered Storefront Assistant chat is available on the storefront.
                        type: boolean
                        default_value: 'true'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 0
                        scopes:
                            - global
                      - key: is_product_discovery_agent_enabled
                        name: Enable Product Discovery Agent
                        description: When enabled, the Storefront Assistant can search the catalog, categories and product relations to ground its answers.
                        type: boolean
                        default_value: 'true'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 1
                        scopes:
                            - global
                - key: system_prompts
                  name: System Prompts
                  description: Prompt configuration for the Storefront Assistant.
                  enabled: true
                  order: 1
                  scopes:
                      - global
                  settings:
                      - key: product_discovery_system_prompt
                        name: Product Discovery System Prompt
                        description: System prompt that instructs the Product Discovery Agent to ground every product fact in catalog tool results and never invent products, prices or links.
                        type: text
                        default_value: "You are the Storefront Assistant of an online shop. Ground every product fact in tool results from the current turn, and never invent a product, price, URL, rating, stock level or alternative. Do not name a product you have not seen in a tool result.\n\nThe customer sees only what display_products (product cards with name, image, price, SKU and link) and compare_products (a side-by-side table that replaces the cards) show; every other tool result is your own research. Search widely, then judge the results and discard what does not fit the request, even though it matched. Call display_products once (to compare products, call compare_products instead) with the idProductAbstract values worth showing, in the order they should appear, exactly as a tool returned them. When nothing fits, display nothing, say so plainly and offer to broaden the search instead of showing a weak match. If display_products reports unknownIdProductAbstracts, do not describe those products as if the customer can see them.\n\nYour reply must never reproduce the cards: do not list the displayed products in any format or state their names, prices, SKUs or URLs. Answer in at most two short sentences that tell the customer how the results relate to what they asked, how they differ or what to narrow next. You may name one product when singling it out for a reason, such as the cheapest or the best reviewed, but never quote its price, SKU or link. Seller offers and add-on options are not on the cards: when asked about them, name each with its price from product_details."
                        enabled: true
                        secret: false
                        storefront: true
                        order: 0
                        scopes:
                            - global
                - key: ai_vendor
                  name: AI Vendor
                  description: AI configuration and vendor model used for the Storefront Assistant. Only the model field matching the selected AI Configuration is shown.
                  enabled: true
                  order: 2
                  scopes:
                      - global
                  settings:
                      - key: ai_configuration
                        name: AI Configuration
                        description: AI configuration used for the Storefront Assistant.
                        type: radio
                        default_value: 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_OPENAI'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 1
                        scopes:
                            - global
                        options:
                            - value: 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_OPENAI'
                              label: OpenAI
                            - value: 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_AWS'
                              label: AWS Bedrock
                            - value: 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_ANTHROPIC'
                              label: Anthropic
                      - key: openai_model
                        name: OpenAI Model
                        description: The OpenAI model used for the Storefront Assistant AI configuration. Model must support streaming.
                        type: string
                        default_value: 'gpt-6-luna'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 2
                        scopes:
                            - global
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:storefront_assistant:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_OPENAI'
                      - key: aws_model
                        name: AWS Bedrock Model
                        description: The AWS Bedrock model identifier used for the Storefront Assistant AI configuration. Model must support streaming.
                        type: string
                        default_value: 'eu.anthropic.claude-haiku-4-5-20251001-v1:0'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 3
                        scopes:
                            - global
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:storefront_assistant:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_AWS'
                      - key: anthropic_model
                        name: Anthropic Model
                        description: The Anthropic model used for the Storefront Assistant AI configuration. Model must support streaming.
                        type: string
                        default_value: 'claude-haiku-4-5'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 4
                        scopes:
                            - global
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:storefront_assistant:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_STOREFRONT_ASSISTANT_ANTHROPIC'
                - key: suggested_prompts
                  name: Suggested Prompts
                  description: Starter prompts offered to the customer as clickable chips, per storefront page type. Separate the prompts with a pipe character. Use {productName}, {categoryName} and {searchQuery} to insert what the customer is currently looking at. Leave a value empty to show no chips on that page type.
                  enabled: true
                  order: 3
                  scopes:
                      - global
                  settings:
                      - key: product_page_prompts
                        name: Product Page Prompts
                        description: Prompts offered while the customer is viewing a single product. {productName} is replaced with that product's name.
                        type: text
                        default_value: 'Show me cheaper alternatives to {productName}|Show me similar products|Compare {productName} with similar models'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 0
                        scopes:
                            - global
                      - key: category_page_prompts
                        name: Category Page Prompts
                        description: Prompts offered while the customer is browsing a category. {categoryName} is replaced with that category's name.
                        type: text
                        default_value: 'Which {categoryName} do you recommend?|Compare the top {categoryName}|Help me narrow these down|What should I look for in {categoryName}?'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 1
                        scopes:
                            - global
                      - key: search_page_prompts
                        name: Search Results Prompts
                        description: Prompts offered while the customer is looking at search results. {searchQuery} is replaced with what they searched for.
                        type: text
                        default_value: 'Narrow these results for me|Which of these is the best value?|Show me cheaper alternatives|Compare the top matches'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 2
                        scopes:
                            - global
                      - key: default_prompts
                        name: Default Prompts
                        description: Prompts offered on every other page, the storefront home page included.
                        type: text
                        default_value: 'Help me find a gift|What do you recommend?|Compare products for me'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 3
                        scopes:
                            - global
                      - key: product_results_prompts
                        name: Product Results Prompts
                        description: Follow-up prompts offered under the product cards the assistant shows in the chat. {productName} is replaced with the first product's name and {productCount} with how many were shown. Leave a value empty to show no chips under product results.
                        type: text
                        default_value: 'Compare these for me|Which of these do you recommend?|Show me cheaper alternatives|Tell me more about {productName}'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 4
                        scopes:
                            - global
```

</details>

The API tokens and the AWS region are in the shared `ai_vendor` feature in `data/configuration/ai_vendor.configuration.yml`. Other AI Commerce features use the same settings. If your project does not have these settings yet, add them as described in [Configure multiple AI providers](/docs/dg/dev/ai/ai-commerce/configure-multiple-ai-providers.html).

{% info_block warningBox "API tokens" %}

Never set `storefront: true` on an API token setting. Storefront settings are published to the key-value storage that Yves reads.

{% endinfo_block %}

Sync the configuration to the database and publish the Storefront settings:

```bash
console configuration:sync
console queue:worker:start --stop-when-empty
```

{% info_block warningBox "Verification" %}

In the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Storefront Assistant** and make sure the **General**, **System Prompts**, **AI Vendor**, and **Suggested Prompts** groups are displayed.

{% endinfo_block %}

### 5) Add translations

The chat UI, the tool progress labels, the comparison table, the refinement chips, and the error messages use the `ai_commerce.storefront_assistant.*` glossary keys. The module does not import these keys, so the project must import them.

Append the glossary according to your configuration:

<details>
<summary>data/import/common/common/glossary.csv</summary>

```csv
ai_commerce.storefront_assistant.action.open,Chat with shopping assistant,en_US
ai_commerce.storefront_assistant.action.open,Mit dem Einkaufsassistenten chatten,de_DE
ai_commerce.storefront_assistant.action.send,Send,en_US
ai_commerce.storefront_assistant.action.send,Senden,de_DE
ai_commerce.storefront_assistant.action.stop,Stop,en_US
ai_commerce.storefront_assistant.action.stop,Stopp,de_DE
ai_commerce.storefront_assistant.action.scroll_latest,Scroll to latest messages,en_US
ai_commerce.storefront_assistant.action.scroll_latest,Zu den neuesten Nachrichten scrollen,de_DE
ai_commerce.storefront_assistant.action.retry,Retry,en_US
ai_commerce.storefront_assistant.action.retry,Erneut versuchen,de_DE
ai_commerce.storefront_assistant.error.generic,"Something went wrong. Please try again.",en_US
ai_commerce.storefront_assistant.error.generic,"Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",de_DE
ai_commerce.storefront_assistant.form.message.placeholder,Ask me anything about our products...,en_US
ai_commerce.storefront_assistant.form.message.placeholder,Fragen Sie mich alles über unsere Produkte...,de_DE
ai_commerce.storefront_assistant.error.not_authenticated,Please sign in to use the shopping assistant.,en_US
ai_commerce.storefront_assistant.error.not_authenticated,"Bitte melden Sie sich an, um den Einkaufsassistenten zu nutzen.",de_DE
ai_commerce.storefront_assistant.error.tool_failed,Product information could not be retrieved. The answer may be incomplete.,en_US
ai_commerce.storefront_assistant.error.tool_failed,"Produktinformationen konnten nicht abgerufen werden. Die Antwort ist möglicherweise unvollständig.",de_DE
ai_commerce.storefront_assistant.title,Shopping Assistant,en_US
ai_commerce.storefront_assistant.title,Einkaufsassistent,de_DE
ai_commerce.storefront_assistant.error.conversation_not_found,"This conversation is no longer available.",en_US
ai_commerce.storefront_assistant.error.conversation_not_found,"Diese Unterhaltung ist nicht mehr verfügbar.",de_DE
ai_commerce.storefront_assistant.error.conversation_delete_failed,"This conversation could not be deleted. Please try again.",en_US
ai_commerce.storefront_assistant.error.conversation_delete_failed,"Diese Unterhaltung konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.",de_DE
ai_commerce.storefront_assistant.error.invalid_csrf_token,"Your session has expired. Please reload the page and try again.",en_US
ai_commerce.storefront_assistant.error.invalid_csrf_token,"Ihre Sitzung ist abgelaufen. Bitte laden Sie die Seite neu und versuchen Sie es erneut.",de_DE
ai_commerce.storefront_assistant.error.invalid_payload,"The request could not be processed. Please try again.",en_US
ai_commerce.storefront_assistant.error.invalid_payload,"Die Anfrage konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.",de_DE
ai_commerce.storefront_assistant.greeting,"Hello, %userName%! How can I help you today?",en_US
ai_commerce.storefront_assistant.greeting,"Hallo, %userName%! Wie kann ich Ihnen heute helfen?",de_DE
ai_commerce.storefront_assistant.action.history,Chat history,en_US
ai_commerce.storefront_assistant.action.history,Chatverlauf,de_DE
ai_commerce.storefront_assistant.action.new_chat,New conversation,en_US
ai_commerce.storefront_assistant.action.new_chat,Neue Unterhaltung,de_DE
ai_commerce.storefront_assistant.action.close,Close assistant,en_US
ai_commerce.storefront_assistant.action.close,Assistent schließen,de_DE
ai_commerce.storefront_assistant.action.show_result,Show result,en_US
ai_commerce.storefront_assistant.action.show_result,Ergebnis anzeigen,de_DE
ai_commerce.storefront_assistant.action.hide_result,Hide result,en_US
ai_commerce.storefront_assistant.action.hide_result,Ergebnis ausblenden,de_DE
ai_commerce.storefront_assistant.activity.running_tool,%toolName%…,en_US
ai_commerce.storefront_assistant.activity.running_tool,%toolName%…,de_DE
ai_commerce.storefront_assistant.activity.tool_result,Tool result,en_US
ai_commerce.storefront_assistant.activity.tool_result,Werkzeugergebnis,de_DE
ai_commerce.storefront_assistant.activity.products_found,Products found,en_US
ai_commerce.storefront_assistant.activity.products_found,Gefundene Produkte,de_DE
ai_commerce.storefront_assistant.page_context.remove,Do not use this page,en_US
ai_commerce.storefront_assistant.page_context.remove,Diese Seite nicht verwenden,de_DE
ai_commerce.storefront_assistant.suggestions.label,Suggested questions,en_US
ai_commerce.storefront_assistant.suggestions.label,Vorgeschlagene Fragen,de_DE
ai_commerce.storefront_assistant.histories.empty,No conversations yet. Start a new one!,en_US
ai_commerce.storefront_assistant.histories.empty,Noch keine Unterhaltungen. Starten Sie eine neue!,de_DE
ai_commerce.storefront_assistant.histories.load_error,Conversations could not be loaded. Please try again.,en_US
ai_commerce.storefront_assistant.histories.load_error,Unterhaltungen konnten nicht geladen werden. Bitte versuchen Sie es erneut.,de_DE
ai_commerce.storefront_assistant.histories.delete_confirm,Delete this conversation?,en_US
ai_commerce.storefront_assistant.histories.delete_confirm,Diese Unterhaltung löschen?,de_DE
ai_commerce.storefront_assistant.histories.untitled,Untitled conversation,en_US
ai_commerce.storefront_assistant.histories.untitled,Unbenannte Unterhaltung,de_DE
ai_commerce.storefront_assistant.form.message.label,Message input,en_US
ai_commerce.storefront_assistant.form.message.label,Nachrichteneingabe,de_DE
ai_commerce.storefront_assistant.action.attach,Attach a file,en_US
ai_commerce.storefront_assistant.action.attach,Datei anhängen,de_DE
ai_commerce.storefront_assistant.agent.auto,Auto,en_US
ai_commerce.storefront_assistant.agent.auto,Automatisch,de_DE
ai_commerce.storefront_assistant.agent.select_label,Select agent,en_US
ai_commerce.storefront_assistant.agent.select_label,Agent auswählen,de_DE
ai_commerce.storefront_assistant.agent.auto_description,"Let the assistant pick the best specialist for each question.",en_US
ai_commerce.storefront_assistant.agent.auto_description,"Der Assistent wählt für jede Frage automatisch den passenden Spezialisten.",de_DE
ai_commerce.storefront_assistant.attachment.unsupported_type,"Unsupported file type. Supported types: %types%.",en_US
ai_commerce.storefront_assistant.attachment.unsupported_type,"Nicht unterstützter Dateityp. Unterstützte Typen: %types%.",de_DE
ai_commerce.storefront_assistant.attachment.too_large,"File is too large. Maximum size is %maxBytes% bytes.",en_US
ai_commerce.storefront_assistant.attachment.too_large,"Datei ist zu groß. Maximale Größe: %maxBytes% Bytes.",de_DE
ai_commerce.storefront_assistant.attachment.too_many,"Too many attachments. Maximum is %maxCount% files.",en_US
ai_commerce.storefront_assistant.attachment.too_many,"Zu viele Anhänge. Maximal %maxCount% Dateien erlaubt.",de_DE
ai_commerce.storefront_assistant.validation.feature_disabled,"The shopping assistant is not available.",en_US
ai_commerce.storefront_assistant.validation.feature_disabled,"Der Einkaufsassistent ist nicht verfügbar.",de_DE
ai_commerce.storefront_assistant.validation.customer_reference_required,"Please sign in to use the shopping assistant.",en_US
ai_commerce.storefront_assistant.validation.customer_reference_required,"Bitte melden Sie sich an, um den Einkaufsassistenten zu nutzen.",de_DE
ai_commerce.storefront_assistant.validation.conversation_reference_invalid,"The conversation could not be identified. Please start a new conversation.",en_US
ai_commerce.storefront_assistant.validation.conversation_reference_invalid,"Die Unterhaltung konnte nicht zugeordnet werden. Bitte starten Sie eine neue Unterhaltung.",de_DE
ai_commerce.storefront_assistant.validation.message_required,"Please enter a message.",en_US
ai_commerce.storefront_assistant.validation.message_required,"Bitte geben Sie eine Nachricht ein.",de_DE
ai_commerce.storefront_assistant.validation.message_too_long,"Your message is too long. Maximum length is %max% characters.",en_US
ai_commerce.storefront_assistant.validation.message_too_long,"Ihre Nachricht ist zu lang. Maximale Länge: %max% Zeichen.",de_DE
ai_commerce.storefront_assistant.error.no_agent_available,"The shopping assistant is not available right now. Please try again later.",en_US
ai_commerce.storefront_assistant.error.no_agent_available,"Der Einkaufsassistent ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.",de_DE
ai_commerce.storefront_assistant.error.session_not_initialized,"The shopping assistant could not be started. Please try again.",en_US
ai_commerce.storefront_assistant.error.session_not_initialized,"Der Einkaufsassistent konnte nicht gestartet werden. Bitte versuchen Sie es erneut.",de_DE
ai_commerce.storefront_assistant.error.turn_failed,"The shopping assistant is temporarily unavailable. Please try again.",en_US
ai_commerce.storefront_assistant.error.turn_failed,"Der Einkaufsassistent ist vorübergehend nicht verfügbar. Bitte versuchen Sie es erneut.",de_DE
ai_commerce.storefront_assistant.agent.product_discovery.label,Product Discovery,en_US
ai_commerce.storefront_assistant.agent.product_discovery.label,Produktsuche,de_DE
ai_commerce.storefront_assistant.agent.product_discovery.description,"Finds real catalog products, categories and related products for the customer.",en_US
ai_commerce.storefront_assistant.agent.product_discovery.description,"Findet echte Katalogprodukte, Kategorien und passende Produkte für den Käufer.",de_DE
ai_commerce.storefront_assistant.tool.catalog_search,Searching the catalog,en_US
ai_commerce.storefront_assistant.tool.catalog_search,Katalogsuche,de_DE
ai_commerce.storefront_assistant.tool.catalog_suggest,Looking up shop pages,en_US
ai_commerce.storefront_assistant.tool.catalog_suggest,Shop-Seiten werden gesucht,de_DE
ai_commerce.storefront_assistant.tool.category_tree,Browsing categories,en_US
ai_commerce.storefront_assistant.tool.category_tree,Kategorien werden durchsucht,de_DE
ai_commerce.storefront_assistant.tool.display_products,Preparing products,en_US
ai_commerce.storefront_assistant.tool.display_products,Produkte werden vorbereitet,de_DE
ai_commerce.storefront_assistant.tool.product_details,Reading product details,en_US
ai_commerce.storefront_assistant.tool.product_details,Produktdetails werden gelesen,de_DE
ai_commerce.storefront_assistant.tool.product_relations,Finding related products,en_US
ai_commerce.storefront_assistant.tool.product_relations,Passende Produkte werden gesucht,de_DE
ai_commerce.storefront_assistant.tool.read_shop_page,Reading shop information,en_US
ai_commerce.storefront_assistant.tool.read_shop_page,Shop-Informationen werden gelesen,de_DE
ai_commerce.storefront_assistant.tool.compare_products,Comparing products,en_US
ai_commerce.storefront_assistant.tool.compare_products,Produkte werden verglichen,de_DE
ai_commerce.storefront_assistant.tool.product_sets,Looking up product sets,en_US
ai_commerce.storefront_assistant.tool.product_sets,Produktsets werden gesucht,de_DE
ai_commerce.storefront_assistant.tool.offer_choices,Preparing choices,en_US
ai_commerce.storefront_assistant.tool.offer_choices,Auswahl wird vorbereitet,de_DE
ai_commerce.storefront_assistant.tool.display_setup,Putting your setup together,en_US
ai_commerce.storefront_assistant.tool.display_setup,Ihr Set wird zusammengestellt,de_DE
ai_commerce.storefront_assistant.comparison.title,Product comparison,en_US
ai_commerce.storefront_assistant.comparison.title,Produktvergleich,de_DE
ai_commerce.storefront_assistant.comparison.price,Price,en_US
ai_commerce.storefront_assistant.comparison.price,Preis,de_DE
ai_commerce.storefront_assistant.comparison.rating,Rating,en_US
ai_commerce.storefront_assistant.comparison.rating,Bewertung,de_DE
ai_commerce.storefront_assistant.comparison.availability,Availability,en_US
ai_commerce.storefront_assistant.comparison.availability,Verfügbarkeit,de_DE
ai_commerce.storefront_assistant.comparison.available,In stock,en_US
ai_commerce.storefront_assistant.comparison.available,Auf Lager,de_DE
ai_commerce.storefront_assistant.comparison.unavailable,Out of stock,en_US
ai_commerce.storefront_assistant.comparison.unavailable,Nicht auf Lager,de_DE
ai_commerce.storefront_assistant.comparison.full_comparison,Full comparison,en_US
ai_commerce.storefront_assistant.comparison.full_comparison,Vollständiger Vergleich,de_DE
ai_commerce.storefront_assistant.refinement.select,Show only %label%,en_US
ai_commerce.storefront_assistant.refinement.select,Nur %label% anzeigen,de_DE
ai_commerce.storefront_assistant.refinement.remove,Remove the %label% filter,en_US
ai_commerce.storefront_assistant.refinement.remove,Filter %label% entfernen,de_DE
ai_commerce.storefront_assistant.refinement.active_filters,Active filters,en_US
ai_commerce.storefront_assistant.refinement.active_filters,Aktive Filter,de_DE
ai_commerce.storefront_assistant.refinement.chips,Narrow the results,en_US
ai_commerce.storefront_assistant.refinement.chips,Ergebnisse eingrenzen,de_DE
ai_commerce.storefront_assistant.see_all,See all %count% results,en_US
ai_commerce.storefront_assistant.see_all,Alle %count% Ergebnisse anzeigen,de_DE
ai_commerce.storefront_assistant.product.price_outlier,Price looks unusual,en_US
ai_commerce.storefront_assistant.product.price_outlier,Preis wirkt ungewöhnlich,de_DE
ai_commerce.storefront_assistant.setup.total,Total %total% of your %budget% budget,en_US
ai_commerce.storefront_assistant.setup.total,Gesamt %total% von Ihrem Budget %budget%,de_DE
ai_commerce.storefront_assistant.action.more_options,More options,en_US
ai_commerce.storefront_assistant.action.more_options,Weitere Optionen,de_DE
ai_commerce.storefront_assistant.action.expand,Expand assistant,en_US
ai_commerce.storefront_assistant.action.expand,Assistent maximieren,de_DE
ai_commerce.storefront_assistant.action.collapse,Collapse assistant,en_US
ai_commerce.storefront_assistant.action.collapse,Assistent verkleinern,de_DE
ai_commerce.storefront_assistant.action.copy,Copy response,en_US
ai_commerce.storefront_assistant.action.copy,Antwort kopieren,de_DE
ai_commerce.storefront_assistant.action.regenerate,Regenerate response,en_US
ai_commerce.storefront_assistant.action.regenerate,Antwort neu erstellen,de_DE
ai_commerce.storefront_assistant.action.back,Back to chat,en_US
ai_commerce.storefront_assistant.action.back,Zurück zum Chat,de_DE
ai_commerce.storefront_assistant.histories.start_new,Start a new chat,en_US
ai_commerce.storefront_assistant.histories.start_new,Neuen Chat starten,de_DE
ai_commerce.storefront_assistant.histories.select,Select,en_US
ai_commerce.storefront_assistant.histories.select,Auswählen,de_DE
ai_commerce.storefront_assistant.histories.cancel,Cancel,en_US
ai_commerce.storefront_assistant.histories.cancel,Abbrechen,de_DE
ai_commerce.storefront_assistant.histories.select_all,Select all,en_US
ai_commerce.storefront_assistant.histories.select_all,Alle auswählen,de_DE
ai_commerce.storefront_assistant.histories.delete,Delete,en_US
ai_commerce.storefront_assistant.histories.delete,Löschen,de_DE
ai_commerce.storefront_assistant.histories.delete_selected_confirm,Delete the selected conversations?,en_US
ai_commerce.storefront_assistant.histories.delete_selected_confirm,Die ausgewählten Unterhaltungen löschen?,de_DE
ai_commerce.storefront_assistant.histories.current,Current,en_US
ai_commerce.storefront_assistant.histories.current,Aktuell,de_DE
ai_commerce.storefront_assistant.histories.close,Close chat history,en_US
ai_commerce.storefront_assistant.histories.close,Chatverlauf schließen,de_DE
ai_commerce.storefront_assistant.histories.select_item,Select conversation %name%,en_US
ai_commerce.storefront_assistant.histories.select_item,Unterhaltung %name% auswählen,de_DE
ai_commerce.storefront_assistant.histories.delete_item,Delete conversation %name%,en_US
ai_commerce.storefront_assistant.histories.delete_item,Unterhaltung %name% löschen,de_DE
ai_commerce.storefront_assistant.product.sku,SKU,en_US
ai_commerce.storefront_assistant.product.sku,SKU,de_DE
ai_commerce.storefront_assistant.product.view,View product,en_US
ai_commerce.storefront_assistant.product.view,Produkt ansehen,de_DE
ai_commerce.storefront_assistant.product.compare,Compare,en_US
ai_commerce.storefront_assistant.product.compare,Vergleichen,de_DE
ai_commerce.storefront_assistant.product.previous,Previous product,en_US
ai_commerce.storefront_assistant.product.previous,Vorheriges Produkt,de_DE
ai_commerce.storefront_assistant.product.next,Next product,en_US
ai_commerce.storefront_assistant.product.next,Nächstes Produkt,de_DE
ai_commerce.storefront_assistant.compare.selected_one,1 product selected,en_US
ai_commerce.storefront_assistant.compare.selected_one,1 Produkt ausgewählt,de_DE
ai_commerce.storefront_assistant.compare.selected_many,%count% products selected,en_US
ai_commerce.storefront_assistant.compare.selected_many,%count% Produkte ausgewählt,de_DE
ai_commerce.storefront_assistant.compare.clear,Clear,en_US
ai_commerce.storefront_assistant.compare.clear,Leeren,de_DE
ai_commerce.storefront_assistant.compare.submit,Compare selected,en_US
ai_commerce.storefront_assistant.compare.submit,Auswahl vergleichen,de_DE
ai_commerce.storefront_assistant.compare.remove,Remove %name% from comparison,en_US
ai_commerce.storefront_assistant.compare.remove,%name% aus dem Vergleich entfernen,de_DE
ai_commerce.storefront_assistant.compare.message,Compare these products: %products%,en_US
ai_commerce.storefront_assistant.compare.message,Vergleiche diese Produkte: %products%,de_DE
ai_commerce.storefront_assistant.comparison.open,Open comparison,en_US
ai_commerce.storefront_assistant.comparison.open,Vergleich öffnen,de_DE
ai_commerce.storefront_assistant.comparison.view_title,Compare products,en_US
ai_commerce.storefront_assistant.comparison.view_title,Produkte vergleichen,de_DE
ai_commerce.storefront_assistant.comparison.products_count,%count% products,en_US
ai_commerce.storefront_assistant.comparison.products_count,%count% Produkte,de_DE
ai_commerce.storefront_assistant.comparison.differences_only,Show only differences,en_US
ai_commerce.storefront_assistant.comparison.differences_only,Nur Unterschiede anzeigen,de_DE
ai_commerce.storefront_assistant.comparison.attribute,Attribute,en_US
ai_commerce.storefront_assistant.comparison.attribute,Merkmal,de_DE
ai_commerce.storefront_assistant.comparison.overview,Overview,en_US
ai_commerce.storefront_assistant.comparison.overview,Übersicht,de_DE
ai_commerce.storefront_assistant.comparison.specifications,Key specifications,en_US
ai_commerce.storefront_assistant.comparison.specifications,Wichtige Merkmale,de_DE
ai_commerce.storefront_assistant.comparison.not_provided,Not provided,en_US
ai_commerce.storefront_assistant.comparison.not_provided,Nicht angegeben,de_DE
ai_commerce.storefront_assistant.composer.hint,Enter to send · Shift + Enter for a new line,en_US
ai_commerce.storefront_assistant.composer.hint,Enter zum Senden · Umschalt + Enter für eine neue Zeile,de_DE
ai_commerce.storefront_assistant.attachment.remove,Remove attachment,en_US
ai_commerce.storefront_assistant.attachment.remove,Anhang entfernen,de_DE
```

</details>

For each additional store locale, add one line for each key.

When you translate the keys, consider the following:

- Keep the `%placeholder%` names unchanged in every locale. The code replaces them by name.
- The `ai_commerce.storefront_assistant.compare.message` text goes to the agent as the customer message when the customer clicks **Compare selected**. Write it as a clear request, not as a label.
- When you add a tool, add the `ai_commerce.storefront_assistant.tool.<tool_name>` key for each locale. Without it, the progress label shows the raw glossary key.
- When you add an agent, add the `ai_commerce.storefront_assistant.agent.<agent_name>.label` and `ai_commerce.storefront_assistant.agent.<agent_name>.description` keys for each locale.

Import the data and publish the translations:

```bash
console data:import glossary
console queue:worker:start --stop-when-empty
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 6) Set up behavior

1. Register the tool plugins and the SSE plugins in the Client `AiFoundationDependencyProvider`. The chat runs in the Client layer, not in Zed.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| CatalogSearchToolPlugin | Searches the catalog with a query, filters, and a price range. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| CatalogSuggestToolPlugin | Looks up terms, categories, CMS pages, and product sets. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| CategoryTreeToolPlugin | Returns the category tree of the shop. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| DisplayProductsToolPlugin | Shows product cards to the customer. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| ProductDetailsToolPlugin | Returns the details of a product. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| ProductRelationsToolPlugin | Returns similar products, accessories, and alternatives. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| ReadShopPageToolPlugin | Reads the text of a CMS page. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| CompareProductsToolPlugin | Shows a comparison table to the customer. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| ProductSetsToolPlugin | Returns product sets. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| OfferChoicesToolPlugin | Shows a clarifying question with answer chips to the customer. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| DisplaySetupToolPlugin | Shows a set of products with their total against a budget to the customer. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool |
| StorefrontAssistantSsePreToolCallPlugin | Sends the `tool-input-start` and `tool-input-available` stream events before each tool call. | | SprykerFeature\Client\AiCommerce\Plugin\AiFoundation |
| StorefrontAssistantSsePostToolCallPlugin | Sends the `tool-output-available` stream event after each customer-facing tool call. | Register it before `AiInteractionAuditLogPostToolCallPlugin`. | SprykerFeature\Client\AiCommerce\Plugin\AiFoundation |
| StorefrontAssistantSseStreamEventPlugin | Sends the text and reasoning stream events. | | SprykerFeature\Client\AiCommerce\Plugin\AiFoundation |
| AiInteractionAuditLogPostToolCallPlugin | Optional: writes each tool call to the AI interaction audit log. | | Spryker\Client\AiFoundation\Plugin\AuditLog |
| AiInteractionAuditLogPostPromptPlugin | Optional: writes each prompt to the AI interaction audit log. | | Spryker\Client\AiFoundation\Plugin\AuditLog |

**src/Pyz/Client/AiFoundation/AiFoundationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\AiFoundation;

use Spryker\Client\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;
use Spryker\Client\AiFoundation\Plugin\AuditLog\AiInteractionAuditLogPostPromptPlugin;
use Spryker\Client\AiFoundation\Plugin\AuditLog\AiInteractionAuditLogPostToolCallPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\AiFoundation\StorefrontAssistantSsePostToolCallPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\AiFoundation\StorefrontAssistantSsePreToolCallPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\AiFoundation\StorefrontAssistantSseStreamEventPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\CatalogSearchToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\CatalogSuggestToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\CategoryTreeToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\CompareProductsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\DisplayProductsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\DisplaySetupToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\OfferChoicesToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ProductDetailsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ProductRelationsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ProductSetsToolPlugin;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\Tool\ReadShopPageToolPlugin;

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    /**
     * @return array<\Spryker\Client\AiFoundation\Dependency\Tools\ToolPluginInterface>
     */
    protected function getAiToolPlugins(): array
    {
        return [
            new CatalogSearchToolPlugin(),
            new CatalogSuggestToolPlugin(),
            new CategoryTreeToolPlugin(),
            new DisplayProductsToolPlugin(),
            new ProductDetailsToolPlugin(),
            new ProductRelationsToolPlugin(),
            new ReadShopPageToolPlugin(),
            new CompareProductsToolPlugin(),
            new ProductSetsToolPlugin(),
            new OfferChoicesToolPlugin(),
            new DisplaySetupToolPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\AiFoundation\Dependency\Plugin\PreToolCallPluginInterface>
     */
    protected function getPreToolCallPlugins(): array
    {
        return [
            new StorefrontAssistantSsePreToolCallPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\AiFoundation\Dependency\Plugin\PostToolCallPluginInterface>
     */
    protected function getPostToolCallPlugins(): array
    {
        return [
            new StorefrontAssistantSsePostToolCallPlugin(),
            new AiInteractionAuditLogPostToolCallPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\AiFoundation\Dependency\Plugin\StreamEventPluginInterface>
     */
    protected function getStreamEventPlugins(): array
    {
        return [
            new StorefrontAssistantSseStreamEventPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\AiFoundation\Dependency\Plugin\PostPromptPluginInterface>
     */
    protected function getPostPromptPlugins(): array
    {
        return [
            new AiInteractionAuditLogPostPromptPlugin(),
        ];
    }
}
```

{% info_block infoBox "Zed AiFoundation plugins" %}

Storefront Assistant needs no change in the Zed `AiFoundationDependencyProvider`. The Zed tool set plugins, such as `NavigationToolSetPlugin`, are for Back Office Assistant only.

{% endinfo_block %}

2. Register the agent and the search configuration plugins in the Client `AiCommerceDependencyProvider`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| ProductDiscoveryAgentPlugin | Registers the **Product Discovery** agent. Without an agent, every turn ends with the "no agent available" error. | | SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant |
| ProductSearchConfigExpanderPlugin | Adds the shop facets to `catalog_search`, which the chat shows as refinement chips. | | Spryker\Client\ProductSearchConfigStorage\Plugin\Config |
| MerchantNameSearchConfigExpanderPlugin | Adds the merchant facet to `catalog_search`. Register it only in a marketplace project. | | Spryker\Client\MerchantProductOfferSearch\Plugin\Search |

**src/Pyz/Client/AiCommerce/AiCommerceDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\AiCommerce;

use Spryker\Client\MerchantProductOfferSearch\Plugin\Search\MerchantNameSearchConfigExpanderPlugin;
use Spryker\Client\ProductSearchConfigStorage\Plugin\Config\ProductSearchConfigExpanderPlugin;
use SprykerFeature\Client\AiCommerce\AiCommerceDependencyProvider as SprykerFeatureAiCommerceDependencyProvider;
use SprykerFeature\Client\AiCommerce\Plugin\StorefrontAssistant\ProductDiscoveryAgentPlugin;

class AiCommerceDependencyProvider extends SprykerFeatureAiCommerceDependencyProvider
{
    /**
     * @return array<\SprykerFeature\Client\AiCommerce\Dependency\StorefrontAssistant\StorefrontAssistantAgentPluginInterface>
     */
    protected function getStorefrontAssistantAgentPlugins(): array
    {
        return [
            new ProductDiscoveryAgentPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface>
     */
    protected function getSearchConfigExpanderPlugins(): array
    {
        return [
            new ProductSearchConfigExpanderPlugin(),
            new MerchantNameSearchConfigExpanderPlugin(),
        ];
    }
}
```

3. Register the routes and the widget:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| StorefrontAssistantRouteProviderPlugin | Adds the `/shopping-assistant/*` routes for the prompt, the conversation list, the messages, and the delete action. | | SprykerFeature\Yves\AiCommerce\StorefrontAssistant\Plugin\Router |
| StorefrontAssistantWidget | Renders the chat for a logged-in customer when the feature is enabled. | | SprykerFeature\Yves\AiCommerce\StorefrontAssistant\Widget |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerFeature\Yves\AiCommerce\StorefrontAssistant\Plugin\Router\StorefrontAssistantRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            // ...
            new StorefrontAssistantRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\AiCommerce\StorefrontAssistant\Widget\StorefrontAssistantWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            // ...
            StorefrontAssistantWidget::class,
        ];
    }
}
```

Build the class resolver cache, warm up the router cache, and clear the application caches:

```bash
console cache:class-resolver:build
console router:cache:warm-up
console cache:empty-all
```

{% info_block warningBox "Verification" %}

Make sure the following routes are registered:

```bash
vendor/bin/yves router:debug | grep shopping-assistant
```

The output shows four routes: `shopping-assistant/prompt`, `shopping-assistant/conversations`, `shopping-assistant/conversations/messages`, and `shopping-assistant/conversations/delete`.

{% endinfo_block %}

### 7) Enable the feature

1. In the Back Office, go to **AI Vendor**.
2. Enter the API token of the AI vendor that you use. For AWS Bedrock, also enter the region.
3. Click **Save**.
4. Go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Storefront Assistant**.
5. In the **General** group, turn on **Enable Storefront Assistant** and **Enable Product Discovery Agent**.
6. In the **AI Vendor** group, select the AI configuration: **OpenAI**, **AWS Bedrock**, or **Anthropic**.
7. Enter a model of the selected vendor that supports streaming and tool calls.
8. Optional: Change the system prompt and the suggested prompts.
9. Click **Save**.
10. If the scheduler does not run in your environment, publish the settings:

```bash
console queue:worker:start --stop-when-empty
```

All values are read on each request, so changes apply without a deployment.

{% info_block warningBox "API token" %}

Enter the API token before you test the chat. Without a token, every chat turn ends with an `error` stream event.

{% endinfo_block %}

## Integrate the feature frontend

{% info_block infoBox "Note" %}

The Twig template changes in this section reflect the current implementation. These templates may be updated in future releases. Review the latest demo shop templates before applying them at the project level.

{% endinfo_block %}

### 1) Render the widget in the page layout

Add the widget to the `globalComponents` block of the main page layout. Call `parent()` first to keep the core global components.

**src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig**

```twig
{% raw %}
{% extends template('page-layout-main', '@SprykerShop:ShopUi') %}

{# ... other blocks ... #}

{% block globalComponents %}
    {{ parent() }}

    {% if widgetGlobalExists('StorefrontAssistantWidget') %}
        {% widget 'StorefrontAssistantWidget' only %}{% endwidget %}
    {% endif %}
{% endblock %}
{% endraw %}
```

The `page-layout-main` template covers the home, catalog, search, product, and CMS pages. Layouts that do not extend `page-layout-main`, such as the checkout layout, do not show the chat. To show the chat on such a layout, add the same block to it.

### 2) Add the header button

This step is optional but recommended. Without it, customers open the chat only with the floating button at the bottom of the page. With it, a **Shopping Assistant** button appears in the header on desktop screens.

In the project `header` organism, include the `storefront-assistant-launcher` molecule next to the desktop search form:

**src/Pyz/Yves/ShopUi/Theme/default/components/organisms/header/header.twig**

```twig
{% raw %}
{% if widgetGlobalExists('StorefrontAssistantWidget') %}
    {% include molecule('storefront-assistant-launcher', 'AiCommerce') with {
        class: 'col col--sm-auto-width spacing-left',
    } only %}
{% endif %}
{% endraw %}
```

To show the search form and the button in one row, put both elements in a `grid grid--middle is-hidden-sm-md` container, and give the search form the `col col--expand` class. If your project does not override the `header` organism yet, create the override first. The core `header` organism has no block around the search form, so the override must copy the core `body` block.

The button works as follows:

- The molecule renders a `<button>` with the `is-hidden` and `js-storefront-assistant-trigger` classes. It has no JavaScript of its own.
- The `storefront-assistant` organism finds every element with the `js-storefront-assistant-trigger` class, removes `is-hidden`, and makes the element open and close the chat.
- For guests, the widget renders no organism, so the button stays hidden.
- While a header button is visible, the floating button is hidden.
- On small screens, the `is-hidden-sm-md` row hides the header button, and only the floating button is visible.

{% info_block infoBox "Other trigger places" %}

To open the chat from another place, such as the mobile header or a CMS block, include the molecule there, or add the `js-storefront-assistant-trigger` class to any element.

{% endinfo_block %}

{% info_block warningBox "Core template updates" %}

A project override of the `header` organism copies the core `body` block. After you update `spryker-shop/shop-ui`, compare the core `header.twig` with the project copy.

{% endinfo_block %}

### 3) Adjust fixed page elements

When the chat panel is docked, the `body` gets a right padding, and the page moves to the left. The padding does not move elements with `position: fixed` or `position: sticky`, such as a sticky header or a cookie banner.

If such elements cover the panel, add `padding-right` or `right: var(--storefront-assistant-panel-width)` to them under `body.storefront-assistant-docked`. To change the look of the chat itself, see [Theming](/docs/dg/dev/ai/ai-commerce/storefront-assistant/storefront-assistant.html#theming).

### 4) Apply the frontend changes

The `storefront-assistant` organism and the `storefront-assistant-launcher` molecule are in the theme folder of the module, and the Yves build finds them automatically. No project-level TypeScript or SCSS is necessary.

Warm up the Twig cache and build the Yves frontend:

```bash
console twig:cache:warmer
docker/sdk cli npm install
docker/sdk cli console frontend:project:install-dependencies
docker/sdk cli console frontend:yves:build
```

If the Storefront still shows an earlier version of the header or the chat after the build, clear the browser cache.

{% info_block warningBox "Verification" %}

Make sure the following applies:

1. As a guest, the Storefront shows no chat button and no **Shopping Assistant** button in the header.
2. As a logged-in customer on a desktop screen, the **Shopping Assistant** button is displayed in the header.
3. When you click the button, the chat panel opens at the right side, and the default suggested prompts are displayed.
4. On a product page, the suggested prompts contain the product name.
5. When you send "Show me cameras under 500 euros", the chat shows progress labels, then product cards, then a short answer.
6. When you click **Compare** on two product cards and then **Compare selected**, the assistant answers with a comparison.
7. After you reload the page, **More options**&nbsp;<span aria-label="and then">></span>&nbsp;**Chat history** shows the conversation, and the messages and product cards are restored.
8. When you turn off **Enable Storefront Assistant** in the Back Office, the chat buttons disappear, and `POST /shopping-assistant/prompt` returns `404`.

{% endinfo_block %}

## Troubleshooting

| SYMPTOM | CAUSE | SOLUTION |
|---------|-------|----------|
| A logged-in customer sees no chat button. | **Enable Storefront Assistant** is off, the setting does not have `storefront: true`, or the value is not published. | Check step 4, then run `console configuration:sync` and `console queue:worker:start --stop-when-empty`. |
| A logged-in customer sees no chat button, and the setting is correct. | The widget is not registered, or the layout does not render it. | Check step 6 and the [Render the widget in the page layout](#1-render-the-widget-in-the-page-layout) step, then run `console cache:empty-all` and `console twig:cache:warmer`. |
| The chat button is displayed, but the chat has no styles or does not respond. | The Yves assets are outdated. | Build the Yves frontend and clear the browser cache. |
| The header button has no icon. | The page does not render the organism, which contains the SVG sprite. | Render the widget on the same layout. |
| Texts are displayed as glossary keys, such as `ai_commerce.storefront_assistant.compare.submit`. | The glossary keys are not imported or not published. | Check step 5. |
| `POST /shopping-assistant/prompt` returns `404` while the feature is on. | The route is not registered, or the router cache is outdated. | Check step 6, then run `console router:cache:warm-up`. |
| `POST /shopping-assistant/prompt` returns `403`. | No customer is logged in, or the `X-CSRF-Token` header is not valid. | Log in. Make sure that the frontend sends the token from the widget. |
| Every turn ends with an `error` event. | The API token is missing, Zed does not allow the AI configuration name, or `getStorefrontAssistantAiConfigurationName()` returns an empty string. | Check steps 3 and 7. |
| The log shows `AI configuration "X" is not configured`. | The radio value in the YAML file is not a key in `config_ai.php`. | Make the constants, the YAML options, and the `config_ai.php` keys equal. |
| The turn ends with the "no agent available" error. | `getStorefrontAssistantAgentPlugins()` returns no agent, or **Enable Product Discovery Agent** is off. | Check step 6, and turn on the agent in the Back Office. |
| The assistant answers without product cards. | `display_products` is not in the agent tools or in the customer-facing tools. | Check step 3. |
| The assistant never calls a tool. | The tool plugin is not in `getAiToolPlugins()`. | Check step 6. |
| The chat shows no refinement chips. | `ProductSearchConfigExpanderPlugin` is not registered. | Check step 6. |
| The answer arrives in one block, not as a stream. | A reverse proxy or PHP output buffering holds the response. | The controller sends `X-Accel-Buffering: no` for nginx. Disable response buffering for `/shopping-assistant/prompt` on other proxies and load balancers. |
| A project-level override has no effect. | The class resolver cache is outdated. | Run `console cache:class-resolver:build` and `console cache:empty-all`. |

## Next steps

- [Add a custom Storefront Assistant agent](/docs/dg/dev/ai/ai-commerce/storefront-assistant/add-custom-storefront-assistant-agent.html)
