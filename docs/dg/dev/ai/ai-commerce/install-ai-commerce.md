---
title: Install AI Commerce
description: Learn how to install the AI Commerce package, which is the base for AI-powered storefront features like Visual Add to Cart.
last_updated: Apr 25, 2026
template: feature-integration-guide-template
---

This document describes how to install the AI Commerce base package. Individual AI Commerce features require additional installation steps — see their respective installation guides.

## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|------|---------|-------------------|
| AiFoundation | {{page.release_tag}} | |

## 1) Install the required modules

Install the required module:

```bash
composer require spryker-feature/ai-commerce --update-with-dependencies
```

## 2) Configure AiFoundation

Add the AI provider configuration:

`config/Shared/config_ai.php`

```php
$openAiConfiguration = [
    'provider_name' => \Spryker\Shared\AiFoundation\AiFoundationConstants::PROVIDER_OPENAI,
    'provider_config' => [
        'key' => getenv('OPEN_AI_API_TOKEN') ?: '', // provide your OpenAi api key
        'model' => 'gpt-4o-mini',
    ],
];
$config[\Spryker\Shared\AiFoundation\AiFoundationConstants::AI_CONFIGURATIONS] = [
    \Spryker\Shared\AiFoundation\AiFoundationConstants::AI_CONFIGURATION_DEFAULT => $openAiConfiguration,
];
```

`config/Shared/config_default.php`

```php
require 'config_ai.php';
```

## 3) Enable AI Commerce features at the project level

AI Commerce features are disabled by default in the module-level configuration. To enable individual features, create a project-level configuration file that overrides the default settings.

Create the following file:

**data/configuration/ai_commerce.configuration.yml**

```yaml
features:
    - key: ai_commerce
      tabs:
          - key: backoffice_assistant
            enabled: true
          - key: quick_order
            enabled: true
          - key: search_by_image
            enabled: true
```

Set `enabled: true` only for the features you want to activate. You can omit tabs you do not want to enable.

After creating the file, sync the configuration to the database:

```bash
console configuration:sync
```

{% info_block warningBox "Verification" %}

In the Back Office, go to **AI Commerce** and make sure the enabled features are visible in the navigation.

{% endinfo_block %}
