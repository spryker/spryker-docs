---
title: Configure multiple AI providers for AI Commerce
description: Learn how to configure OpenAI, AWS Bedrock, and Anthropic providers independently for each AI Commerce feature.
last_updated: May 11, 2026
template: howto-guide-template
---

AI Commerce supports three AI providers: OpenAI, AWS Bedrock, and Anthropic. Each feature — Back Office Assistant, Visual Add to Cart (Quick Order), Search by Image, and Smart PIM — can use a different provider independently. This lets you optimize cost, latency, or capability per feature without changing any application code.

## How it works

Each AI Commerce feature resolves its active provider at runtime by reading a named AI configuration from `AiFoundationConstants::AI_CONFIGURATIONS`. The configuration key used is controlled by a Back Office setting stored in the database. When you switch a feature to a different provider in the Back Office, it starts reading a different entry from the configuration map on the next request.

The `config/Shared/config_ai.php` file must define a configuration entry for every provider-feature combination you want to make available.

## Prerequisites

- AI Commerce is installed. For instructions, see [Install AI Commerce](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html).
- You have credentials for the providers you want to use.

## 1) Configure AI providers in config_ai.php

The following example configures all three providers for all AI Commerce features. Include only the configurations for providers you plan to use.

`config/Shared/config_ai.php`

```php
<?php

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::AI_CONFIGURATIONS] = [

    // Smart PIM
    AiCommerceConstants::AI_CONFIGURATION_SMART_PIM_OPENAI => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SMART_PIM_OPENAI_MODEL,
        ],
    ],
    AiCommerceConstants::AI_CONFIGURATION_SMART_PIM_AWS => [
        'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
        'provider_config' => [
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SMART_PIM_AWS_MODEL,
            'bedrockRuntimeClient' => [
                'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
                'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
            ],
        ],
    ],
    AiCommerceConstants::AI_CONFIGURATION_SMART_PIM_ANTHROPIC => [
        'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SMART_PIM_ANTHROPIC_MODEL,
        ],
    ],

    // Quick Order Image-to-Cart (Visual Add to Cart)
    AiCommerceConstants::AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_QUICK_ORDER_IMAGE_TO_CART_OPENAI_MODEL,
        ],
    ],
    AiCommerceConstants::AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_AWS => [
        'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
        'provider_config' => [
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_QUICK_ORDER_IMAGE_TO_CART_AWS_MODEL,
            'bedrockRuntimeClient' => [
                'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
                'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
            ],
        ],
    ],
    AiCommerceConstants::AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_ANTHROPIC => [
        'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_QUICK_ORDER_IMAGE_TO_CART_ANTHROPIC_MODEL,
        ],
    ],

    // Search by Image
    AiCommerceConstants::AI_CONFIGURATION_SEARCH_BY_IMAGE_OPENAI => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SEARCH_BY_IMAGE_OPENAI_MODEL,
        ],
    ],
    AiCommerceConstants::AI_CONFIGURATION_SEARCH_BY_IMAGE_AWS => [
        'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
        'provider_config' => [
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SEARCH_BY_IMAGE_AWS_MODEL,
            'bedrockRuntimeClient' => [
                'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
                'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
            ],
        ],
    ],
    AiCommerceConstants::AI_CONFIGURATION_SEARCH_BY_IMAGE_ANTHROPIC => [
        'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SEARCH_BY_IMAGE_ANTHROPIC_MODEL,
        ],
    ],

    // Back Office Assistant (Intent Router, General, Order Management, Discount Management, Form Fill)
    AiCommerceConstants::AI_CONFIGURATION_INTENT_ROUTER_OPENAI => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_OPENAI_MODEL,
        ],
    ],
    AiCommerceConstants::AI_CONFIGURATION_INTENT_ROUTER_AWS => [
        'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
        'provider_config' => [
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_AWS_MODEL,
            'bedrockRuntimeClient' => [
                'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
                'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
            ],
        ],
    ],
    AiCommerceConstants::AI_CONFIGURATION_INTENT_ROUTER_ANTHROPIC => [
        'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_ANTHROPIC_MODEL,
        ],
    ],
    AiCommerceConstants::AI_CONFIGURATION_GENERAL_AGENT_OPENAI => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_OPENAI_MODEL,
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_GENERAL_PURPOSE_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_GENERAL_AGENT_AWS => [
        'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
        'provider_config' => [
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_AWS_MODEL,
            'bedrockRuntimeClient' => [
                'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
                'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
            ],
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_GENERAL_PURPOSE_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_GENERAL_AGENT_ANTHROPIC => [
        'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_ANTHROPIC_MODEL,
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_GENERAL_PURPOSE_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_ORDER_MANAGEMENT_OPENAI => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_OPENAI_MODEL,
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ORDER_MANAGEMENT_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_ORDER_MANAGEMENT_AWS => [
        'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
        'provider_config' => [
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_AWS_MODEL,
            'bedrockRuntimeClient' => [
                'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
                'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
            ],
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ORDER_MANAGEMENT_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_ORDER_MANAGEMENT_ANTHROPIC => [
        'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_ANTHROPIC_MODEL,
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ORDER_MANAGEMENT_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_DISCOUNT_MANAGEMENT_OPENAI => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_OPENAI_MODEL,
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_DISCOUNT_MANAGEMENT_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_DISCOUNT_MANAGEMENT_AWS => [
        'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
        'provider_config' => [
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_AWS_MODEL,
            'bedrockRuntimeClient' => [
                'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
                'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
            ],
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_DISCOUNT_MANAGEMENT_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_DISCOUNT_MANAGEMENT_ANTHROPIC => [
        'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_ANTHROPIC_MODEL,
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_DISCOUNT_MANAGEMENT_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_FORM_FILL_OPENAI => [
        'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_OPENAI_MODEL,
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_FORM_FILL_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_FORM_FILL_AWS => [
        'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
        'provider_config' => [
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_AWS_MODEL,
            'bedrockRuntimeClient' => [
                'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
                'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
            ],
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_FORM_FILL_SYSTEM_PROMPT,
    ],
    AiCommerceConstants::AI_CONFIGURATION_FORM_FILL_ANTHROPIC => [
        'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
        'provider_config' => [
            'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
            'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_BACKOFFICE_ASSISTANT_ANTHROPIC_MODEL,
        ],
        'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_FORM_FILL_SYSTEM_PROMPT,
    ],
];
```

The configuration values that use `CONFIGURATION_REFERENCE_PREFIX` are resolved at runtime from the Back Office configuration database. This means model names and API tokens are managed in the Back Office rather than hardcoded in config files.

## 2) Sync the AI vendor configuration

The AI vendor credentials (API tokens, AWS region) are managed through the Back Office configuration system. Sync the vendor configuration schema to the database:

```bash
console configuration:sync
```

## 3) Set credentials in the Back Office

1. In the Back Office, go to **AI Vendor**.
2. For each provider you want to use, open its tab (OpenAI, Anthropic, or AWS Bedrock) and enter the credentials:

| PROVIDER | REQUIRED CREDENTIALS |
|----------|---------------------|
| OpenAI | API token |
| Anthropic | API key |
| AWS Bedrock | API token, AWS region |

3. Click **Save**.

## 4) Select the active provider per feature

Each AI Commerce feature has an **AI Configuration** radio selector in the Back Office that controls which provider it uses.

1. In the Back Office, go to **AI Commerce**.
2. Open the tab for the feature you want to configure (for example, **Smart PIM**, **Quick Order**, **Search by Image**, or **Back Office Assistant**).
3. Under **General**, select the active provider: **OpenAI**, **AWS Bedrock**, or **Anthropic**.
4. Optionally, update the model name shown for the selected provider. Each provider shows its model field only when selected.
5. Click **Save**.

Default models per feature and provider:

| FEATURE | OPENAI | AWS BEDROCK | ANTHROPIC |
|---------|--------|-------------|-----------|
| Smart PIM | `gpt-4o-mini` | `eu.anthropic.claude-haiku-4-5-20251001-v1:0` | `claude-haiku-4-5` |
| Quick Order Image-to-Cart | `gpt-4o-mini` | `eu.anthropic.claude-haiku-4-5-20251001-v1:0` | `claude-haiku-4-5` |
| Search by Image | `gpt-4o-mini` | `eu.anthropic.claude-haiku-4-5-20251001-v1:0` | `claude-haiku-4-5` |
| Back Office Assistant | `gpt-4.1` | `eu.anthropic.claude-sonnet-4-5-20250929-v1:0` | `claude-sonnet-4-5` |

{% info_block infoBox "Model requirements" %}

All AI Commerce features require a model that supports image input and structured output. Verify that the model you select meets these requirements for the provider you use.

{% endinfo_block %}

## Configuration reference

The following table maps each feature to its configuration constants and the Back Office setting key that controls the active provider.

| FEATURE | ACTIVE PROVIDER SETTING KEY | OPENAI CONFIG CONSTANT | AWS CONFIG CONSTANT | ANTHROPIC CONFIG CONSTANT |
|---------|-----------------------------|------------------------|---------------------|---------------------------|
| Smart PIM | `ai_commerce:smart_pim:general:ai_configuration` | `AI_CONFIGURATION_SMART_PIM_OPENAI` | `AI_CONFIGURATION_SMART_PIM_AWS` | `AI_CONFIGURATION_SMART_PIM_ANTHROPIC` |
| Quick Order Image-to-Cart | `ai_commerce:quick_order:general:ai_configuration` | `AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI` | `AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_AWS` | `AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_ANTHROPIC` |
| Search by Image | `ai_commerce:search_by_image:general:ai_configuration` | `AI_CONFIGURATION_SEARCH_BY_IMAGE_OPENAI` | `AI_CONFIGURATION_SEARCH_BY_IMAGE_AWS` | `AI_CONFIGURATION_SEARCH_BY_IMAGE_ANTHROPIC` |
| Back Office Assistant | `ai_commerce:backoffice_assistant:general:ai_configuration` | `AI_CONFIGURATION_INTENT_ROUTER_OPENAI` (and `_GENERAL_AGENT_OPENAI`, `_ORDER_MANAGEMENT_OPENAI`, `_DISCOUNT_MANAGEMENT_OPENAI`, `_FORM_FILL_OPENAI`) | `AI_CONFIGURATION_INTENT_ROUTER_AWS` (and `_AWS` variants) | `AI_CONFIGURATION_INTENT_ROUTER_ANTHROPIC` (and `_ANTHROPIC` variants) |

All constants are in `SprykerFeature\Shared\AiCommerce\AiCommerceConstants`.
