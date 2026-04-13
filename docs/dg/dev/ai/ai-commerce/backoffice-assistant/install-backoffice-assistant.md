---
title: Install Back Office Assistant
description: Learn how to install the Back Office Assistant feature that provides an AI-powered chat widget in the Spryker Back Office.
last_updated: Apr 13, 2026
template: feature-integration-guide-template
---

Back Office Assistant is an AI-powered chat widget embedded in the Back Office. It lets admin users ask natural language questions, navigate the Back Office, manage orders, and create or update discounts through a conversational interface. This document describes how to install the Back Office Assistant feature.

## Install the feature core

Follow the steps in the following sections to install the Back Office Assistant feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|------|---------|-------------------|
| AI Commerce | {{page.release_tag}} | [Install AI Commerce](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/ai-commerce
```

### 2) Generate transfers and run database migration

```bash
console transfer:generate
console propel:install
```

### 3) Configure AI models for Back Office Assistant

The Back Office Assistant uses a dedicated named AI configuration for each agent. Add these configuration entries to `config/Shared/config_ai.php`:

`config/Shared/config_ai.php`

```php
<?php

use Spryker\Shared\AiFoundation\AiFoundationConstants;
use SprykerFeature\Shared\AiCommerce\AiCommerceConstants;

$openAiConfiguration = [
    'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
    'provider_config' => [
        'key' => getenv('OPEN_AI_API_TOKEN') ?: '',
        'model' => 'gpt-4o-mini', // fastest non-reasoning model
    ],
];

$config[AiFoundationConstants::AI_CONFIGURATIONS] = [
    AiFoundationConstants::AI_CONFIGURATION_DEFAULT => $openAiConfiguration,
    AiCommerceConstants::AI_CONFIGURATION_INTENT_ROUTER => $openAiConfiguration,
    AiCommerceConstants::AI_CONFIGURATION_GENERAL_PURPOSE => array_merge($openAiConfiguration, [
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_GENERAL_PURPOSE_SYSTEM_PROMPT,
        'provider_config' => array_merge($openAiConfiguration['provider_config'], [
            'model' => 'gpt-4.1', // fast non-reasoning model
        ]),
    ]),
    AiCommerceConstants::AI_CONFIGURATION_ORDER_MANAGEMENT => array_merge($openAiConfiguration, [
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ORDER_MANAGEMENT_SYSTEM_PROMPT,
        'provider_config' => array_merge($openAiConfiguration['provider_config'], [
            'model' => 'gpt-4.1', // fast non-reasoning model
        ]),
    ]),
    AiCommerceConstants::AI_CONFIGURATION_DISCOUNT_MANAGEMENT => array_merge($openAiConfiguration, [
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_DISCOUNT_MANAGEMENT_SYSTEM_PROMPT,
        'provider_config' => array_merge($openAiConfiguration['provider_config'], [
            'model' => 'gpt-4.1', // fast non-reasoning model
        ]),
    ]),
    AiCommerceConstants::AI_CONFIGURATION_FORM_FILL => array_merge($openAiConfiguration, [
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_FORM_FILL_SYSTEM_PROMPT,
        'provider_config' => array_merge($openAiConfiguration['provider_config'], [
            'model' => 'gpt-4.1', // fast non-reasoning model
        ]),
    ]),
];
```

Using a dedicated AI model configuration per agent is recommended because each named configuration is tracked separately in the AiFoundation audit log. This lets you isolate and review all AI calls made by each agent independently from other AI features in your project.

### 4) Set up behavior

Register the following plugins to integrate the Back Office Assistant agents:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `GeneralAgentPlugin` | Registers the General Purpose agent that answers Back Office navigation and how-to questions. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Agent` |
| `OrderManagementAgentPlugin` | Registers the Order Management agent that provides read-only access to order and OMS data. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Agent` |
| `DiscountManagementAgentPlugin` | Registers the Discount Management agent that can create and update discounts. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Agent` |
| `FormFillAgentPlugin` | Registers the Form Fill agent that fills Back Office forms using natural language instructions. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Agent` |

**src/Pyz/Zed/AiCommerce/AiCommerceDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiCommerce;

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
        ];
    }
}
```

Register the following plugins in `AiFoundationDependencyProvider`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `BackofficeAssistantSsePreToolCallPlugin` | Streams a Server-Sent Event to the browser before each tool call. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation` |
| `BackofficeAssistantSsePostToolCallPlugin` | Streams a Server-Sent Event to the browser after each tool call. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation` |
| `AuditLogPostToolCallPlugin` | Records tool call results in the AI interaction audit log. | | `Spryker\Zed\AiFoundation\Communication\Plugin` |
| `NavigationToolSetPlugin` | Registers tools for resolving Back Office navigation paths. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation` |
| `OrderManagementToolSetPlugin` | Registers tools for fetching order lists and OMS process information. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation` |
| `OrderDetailsToolSetPlugin` | Registers tools for fetching detailed order data by reference or ID. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation` |
| `DiscountManagementToolSetPlugin` | Registers tools for reading, creating, and updating discounts. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation` |
| `FormFillToolSetPlugin` | Registers tools for filling Back Office form fields. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation` |

**src/Pyz/Zed/AiFoundation/AiFoundationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiFoundation;

use Spryker\Zed\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;
use Spryker\Zed\AiFoundation\Communication\Plugin\AuditLogPostPromptPlugin;
use Spryker\Zed\AiFoundation\Communication\Plugin\AuditLogPostToolCallPlugin;
use Spryker\Zed\AiFoundation\Communication\Plugin\Log\AiInteractionHandlerPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\BackofficeAssistantSsePostToolCallPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\BackofficeAssistantSsePreToolCallPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\DiscountManagementToolSetPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\FormFillToolSetPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\NavigationToolSetPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\OrderDetailsToolSetPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\OrderManagementToolSetPlugin;

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Plugin\PostPromptPluginInterface>
     */
    protected function getPostPromptPlugins(): array
    {
        return [
            new AuditLogPostPromptPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Plugin\PreToolCallPluginInterface>
     */
    protected function getPreToolCallPlugins(): array
    {
        return [
            new BackofficeAssistantSsePreToolCallPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Plugin\PostToolCallPluginInterface>
     */
    protected function getPostToolCallPlugins(): array
    {
        return [
            new BackofficeAssistantSsePostToolCallPlugin(),
            new AuditLogPostToolCallPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\Log\Dependency\Plugin\LogHandlerPluginInterface>
     */
    protected function getAiInteractionLogHandlerPlugins(): array
    {
        return [
            new AiInteractionHandlerPlugin(),
        ];
    }

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
        ];
    }
}
```

Register the Twig plugin to inject the chat widget into the Back Office layout:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `AiCommerceTwigPlugin` | Registers Twig functions and variables required by the Back Office Assistant chat widget. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Twig` |

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Twig\AiCommerceTwigPlugin;
use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            // ... other plugins
            new AiCommerceTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

In the Back Office, make sure the chat widget icon is visible in the Back Office layout after enabling the feature.

{% endinfo_block %}

### 5) Sync configuration

Sync the Back Office Assistant configuration to the database:

```bash
console configuration:sync
```

### 6) Enable the feature

Enable the feature in the Back Office:

1. In the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Back Office Assistant&nbsp;<span aria-label="and then">></span>&nbsp;General**.
2. Enable **Enable Back Office Assistant**.
3. Click **Save**.

![Back Office Assistant configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/backoffice-assistant-config.png)

{% info_block warningBox "Verification" %}

In the Back Office, make sure the Back Office Assistant chat icon is visible in the bottom-right corner of any Back Office page.

![Back Office Assistant icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/backoffice-assistant-icon.png)

{% endinfo_block %}

## Integrate the feature frontend

### 1) Add the chat widget to the Back Office layout

{% info_block infoBox "Info" %}

Do this step only if you have overridden `layout.twig` in the `Gui` module at the project level. If you have not overridden this template, skip to [2) Install frontend dependencies](#2-install-frontend-dependencies).

{% endinfo_block %}

In `src/Pyz/Zed/Gui/Presentation/Layout/layout.twig`, include the chat widget partial inside the `footer_js` block:

```twig
{% raw %}
{% extends '@Spryker:Gui/Layout/layout.twig' %}

{% block footer_js %}
    {% if isBackofficeAssistantConnected is defined and isBackofficeAssistantConnected %}
        {% include '@AiCommerce/Partials/chat-widget.twig' %}
    {% endif %}
    {{ parent() }}
{% endblock %}
{% endraw %}
```

```bash
console cache:empty-all
console twig:cache:warmer
console router:cache:warm-up:backoffice
```

### 2) Install frontend dependencies

The chat widget requires the `marked` and `dompurify` npm packages for rendering and sanitizing Markdown responses.

Install the required npm packages:

```bash
npm install marked@^15.0.0 dompurify@^3.2.0
```

### 3) Apply the frontend changes

```bash
docker/sdk cli console frontend:project:install-dependencies
docker/sdk cli console frontend:zed:build
```

{% info_block warningBox "Verification" %}

In the Back Office, open the Back Office Assistant chat widget and send a message. Make sure the response is rendered correctly and the widget is functional.

![Back Office Assistant chat](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/backoffice-assistant-chat.png)

{% endinfo_block %}
