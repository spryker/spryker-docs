---
title: Install Smart CMS Content Assistant
description: Learn how to install the Smart CMS Content Assistant feature that provides an AI-powered panel in the Back Office CMS Page and CMS Block glossary editors.
last_updated: Jul 16, 2026
template: feature-integration-guide-template
---

Smart CMS Content Assistant is an AI-powered panel embedded in the Back Office CMS Page and CMS Block glossary editors. It lets Back Office users generate and refine placeholder content per locale through a conversational AI interface. This document describes how to install Smart CMS Content Assistant.

## Install the feature core

Follow the steps in the following sections to install the Smart CMS Content Assistant feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|------|---------|-------------------|
| AI Commerce | {{page.release_tag}} | [Install AI Commerce](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html) |
| CMS | {{page.release_tag}} | |

### 1) Generate transfers and run database migration

```bash
console transfer:generate
console propel:install
```

### 2) Add configuration constants

Add the project-level constants interface to map the AI configuration keys used by the Back Office Configuration UI:

**src/Pyz/Shared/AiCommerce/AiCommerceConstants.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Shared\AiCommerce;

use SprykerFeature\Shared\AiCommerce\AiCommerceConstants as SprykerFeatureAiCommerceConstants;

interface AiCommerceConstants extends SprykerFeatureAiCommerceConstants
{
    public const string CONFIGURATION_KEY_OPENAI_API_TOKEN = 'ai_vendor:openai:general:api_token';
    public const string CONFIGURATION_KEY_AWS_API_TOKEN = 'ai_vendor:aws:general:api_token';
    public const string CONFIGURATION_KEY_AWS_REGION = 'ai_vendor:aws:general:region';
    public const string CONFIGURATION_KEY_ANTHROPIC_API_TOKEN = 'ai_vendor:anthropic:general:api_token';

    public const string CONFIGURATION_KEY_SMART_CMS_AI_CONFIGURATION = 'ai_commerce:smart_cms:ai_vendor:ai_configuration';
    public const string CONFIGURATION_KEY_SMART_CMS_OPENAI_MODEL = 'ai_commerce:smart_cms:ai_vendor:openai_model';
    public const string CONFIGURATION_KEY_SMART_CMS_AWS_MODEL = 'ai_commerce:smart_cms:ai_vendor:aws_model';
    public const string CONFIGURATION_KEY_SMART_CMS_ANTHROPIC_MODEL = 'ai_commerce:smart_cms:ai_vendor:anthropic_model';

    public const string AI_CONFIGURATION_SMART_CMS_OPENAI = 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_OPENAI';
    public const string AI_CONFIGURATION_SMART_CMS_AWS = 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_AWS';
    public const string AI_CONFIGURATION_SMART_CMS_ANTHROPIC = 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_ANTHROPIC';
}
```

### 3) Configure AI models for Smart CMS Content Assistant

Add the Smart CMS Content Assistant named AI configuration entries to `config/Shared/config_ai.php`. The feature supports OpenAI, AWS Bedrock, and Anthropic. Only the configuration matching the vendor selected in the Back Office Configuration UI is used at runtime.

`config/Shared/config_ai.php`

```php
<?php

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_SMART_CMS_OPENAI] = [
    'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
    'provider_config' => [
        'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SMART_CMS_OPENAI_MODEL,
    ],
    'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SMART_CMS_SYSTEM_PROMPT,
];

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_SMART_CMS_AWS] = [
    'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
    'provider_config' => [
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SMART_CMS_AWS_MODEL,
        'bedrockRuntimeClient' => [
            'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
            'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
        ],
    ],
    'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SMART_CMS_SYSTEM_PROMPT,
];

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_SMART_CMS_ANTHROPIC] = [
    'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
    'provider_config' => [
        'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SMART_CMS_ANTHROPIC_MODEL,
    ],
    'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_SMART_CMS_SYSTEM_PROMPT,
];
```

{% info_block infoBox "Model requirements" %}

The model configured for Smart CMS Content Assistant must support both image input and structured output.

Default model values:
- OpenAI: `gpt-4.1`
- AWS Bedrock: `eu.anthropic.claude-sonnet-4-5-20250929-v1:0`
- Anthropic: `claude-sonnet-4-5`

{% endinfo_block %}

### 4) Configure the Smart CMS configuration name

Override `AiCommerceConfig` in the Zed layer to route Smart CMS Content Assistant to the correct named configuration based on the Back Office setting:

**src/Pyz/Zed/AiCommerce/AiCommerceConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\AiCommerce;

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use SprykerFeature\Zed\AiCommerce\AiCommerceConfig as SprykerFeatureAiCommerceConfig;

class AiCommerceConfig extends SprykerFeatureAiCommerceConfig
{
    public function getSmartCmsAiConfigurationName(): string
    {
        return (string)$this->getModuleConfig(
            AiCommerceConstants::CONFIGURATION_KEY_SMART_CMS_AI_CONFIGURATION,
            AiCommerceConstants::AI_CONFIGURATION_SMART_CMS_OPENAI,
        );
    }
}
```

### 5) Set up behavior

Register the following plugins to wire Smart CMS Content Assistant into `AiFoundationDependencyProvider`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `SmartCmsContentToolSetPlugin` | Registers the Smart CMS content toolset, including the `get_content_items` tool for fetching existing content items. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation` |

**src/Pyz/Zed/AiFoundation/AiFoundationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiFoundation;

use Spryker\Zed\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\SmartCmsContentToolSetPlugin;
// ... other existing imports

class AiFoundationDependencyProvider extends SprykerAiFoundationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AiFoundation\Dependency\Tools\ToolSetPluginInterface>
     */
    protected function getAiToolSetPlugins(): array
    {
        return [
            // ... other existing plugins
            new SmartCmsContentToolSetPlugin(),
        ];
    }
}
```

Register the content widget editor plugins in `AiCommerceDependencyProvider`. These plugins make the available CMS content widgets accessible to the AI when generating content:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `ContentBannerContentGuiEditorPlugin` | Registers Banner content items as available CMS widgets. | | `Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui` |
| `ContentProductContentGuiEditorPlugin` | Registers Abstract Product List content items as available CMS widgets. | | `Spryker\Zed\ContentProductGui\Communication\Plugin\ContentGui` |
| `ContentProductSetGuiEditorPlugin` | Registers Product Set content items as available CMS widgets. | | `Spryker\Zed\ContentProductSetGui\Communication\Plugin\ContentGui` |
| `ContentFileListContentGuiEditorPlugin` | Registers File List content items as available CMS widgets. | | `Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui` |
| `ContentNavigationContentGuiEditorPlugin` | Registers Navigation content items as available CMS widgets. | | `Spryker\Zed\ContentNavigationGui\Communication\Plugin\ContentGui` |

**src/Pyz/Zed/AiCommerce/AiCommerceDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiCommerce;

use Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui\ContentBannerContentGuiEditorPlugin;
use Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui\ContentFileListContentGuiEditorPlugin;
use Spryker\Zed\ContentNavigationGui\Communication\Plugin\ContentGui\ContentNavigationContentGuiEditorPlugin;
use Spryker\Zed\ContentProductGui\Communication\Plugin\ContentGui\ContentProductContentGuiEditorPlugin;
use Spryker\Zed\ContentProductSetGui\Communication\Plugin\ContentGui\ContentProductSetGuiEditorPlugin;
use SprykerFeature\Zed\AiCommerce\AiCommerceDependencyProvider as SprykerFeatureAiCommerceDependencyProvider;
// ... other existing imports

class AiCommerceDependencyProvider extends SprykerFeatureAiCommerceDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentGuiEditorPluginInterface>
     */
    protected function getContentGuiEditorPlugins(): array
    {
        return [
            new ContentBannerContentGuiEditorPlugin(),
            new ContentProductContentGuiEditorPlugin(),
            new ContentProductSetGuiEditorPlugin(),
            new ContentFileListContentGuiEditorPlugin(),
            new ContentNavigationContentGuiEditorPlugin(),
        ];
    }
}
```

Make sure `AiCommerceTwigPlugin` is registered in `TwigDependencyProvider` to provide the `isSmartCmsEnabled()` Twig function used in the glossary editor overrides:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `AiCommerceTwigPlugin` | Registers Twig functions and variables required by the Smart CMS panel in glossary editors. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Twig` |

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\Twig\AiCommerceTwigPlugin;

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

### 6) Override glossary editor templates

Override the CMS Page and CMS Block glossary editor templates to inject the AI panel. Both templates extend their core counterparts and conditionally include the AI panel partial when the feature is enabled.

**src/Pyz/Zed/CmsGui/Presentation/CreateGlossary/index.twig**

```twig
{% raw %}
{% extends '@Spryker:CmsGui/CreateGlossary/index.twig' %}

{% block content %}
    {% if isSmartCmsEnabled() %}
        {% set smartCmsPageMeta = [] %}
        {% for pageAttribute in cmsPage.pageAttributes %}
            {% set smartCmsLocaleMetaAttribute = null %}
            {% for metaAttribute in cmsPage.metaAttributes %}
                {% if metaAttribute.localeName == pageAttribute.localeName %}
                    {% set smartCmsLocaleMetaAttribute = metaAttribute %}
                {% endif %}
            {% endfor %}
            {% set smartCmsPageMeta = smartCmsPageMeta|merge([{
                'localeName': pageAttribute.localeName,
                'name': pageAttribute.name,
                'url': pageAttribute.url,
                'metaTitle': smartCmsLocaleMetaAttribute ? smartCmsLocaleMetaAttribute.metaTitle : null,
                'metaKeywords': smartCmsLocaleMetaAttribute ? smartCmsLocaleMetaAttribute.metaKeywords : null,
                'metaDescription': smartCmsLocaleMetaAttribute ? smartCmsLocaleMetaAttribute.metaDescription : null,
            }]) %}
        {% endfor %}
        {% set smartCmsStores = [] %}
        {% if cmsPage.storeRelation is not null %}
            {% for store in cmsPage.storeRelation.stores %}
                {% set smartCmsStores = smartCmsStores|merge([store.name]) %}
            {% endfor %}
        {% endif %}
        {% set smartCmsEntityContext = {
            'name': cmsPage.pageAttributes is not empty ? cmsPage.pageAttributes|first.name : null,
            'templateName': cmsPage.templateName,
            'urlSlug': cmsPage.pageAttributes is not empty ? cmsPage.pageAttributes|first.url : null,
            'key': null,
            'attributes': {
                'isActive': cmsPage.isActive,
                'isSearchable': cmsPage.isSearchable,
                'validFrom': cmsPage.validFrom,
                'validTo': cmsPage.validTo,
                'stores': smartCmsStores,
                'localizedAttributes': smartCmsPageMeta,
            }|json_encode,
        } %}
        {% include '@AiCommerce/Partials/smart-cms-glossary-panel.twig' ignore missing with {
            'smartCmsEntityType': 'cms_page',
            'smartCmsIdEntity': idCmsPage,
            'smartCmsEntityContext': smartCmsEntityContext,
        } %}
    {% endif %}
    {{ parent() }}
{% endblock %}
{% endraw %}
```

**src/Pyz/Zed/CmsBlockGui/Presentation/EditGlossary/index.twig**

```twig
{% raw %}
{% extends '@Spryker:CmsBlockGui/EditGlossary/index.twig' %}

{% block content %}
    {% if isSmartCmsEnabled() %}
        {% set smartCmsStores = [] %}
        {% if cmsBlock.storeRelation is not null %}
            {% for store in cmsBlock.storeRelation.stores %}
                {% set smartCmsStores = smartCmsStores|merge([store.name]) %}
            {% endfor %}
        {% endif %}
        {% set smartCmsEntityContext = {
            'name': cmsBlock.name,
            'templateName': cmsBlock.templateName,
            'urlSlug': null,
            'key': cmsBlock.key,
            'attributes': {
                'isActive': cmsBlock.isActive,
                'validFrom': cmsBlock.validFrom,
                'validTo': cmsBlock.validTo,
                'stores': smartCmsStores,
            }|json_encode,
        } %}
        {% include '@AiCommerce/Partials/smart-cms-glossary-panel.twig' ignore missing with {
            'smartCmsEntityType': 'cms_block',
            'smartCmsIdEntity': idCmsBlock,
            'smartCmsEntityContext': smartCmsEntityContext,
        } %}
    {% endif %}
    {{ parent() }}
{% endblock %}
{% endraw %}
```

{% info_block warningBox "Verification" %}

In the Back Office, open a CMS Page or CMS Block glossary editor. Make sure the Smart CMS panel is visible next to the editor when the feature is enabled.

{% endinfo_block %}

### 7) Sync configuration and build frontend assets

Define the AI configuration and model settings for Smart CMS in `data/configuration/ai_commerce.configuration.yml`. These settings back the `configuration::` references registered in `config/Shared/config_ai.php`, so they must exist before syncing:

**data/configuration/ai_commerce.configuration.yml**

```yaml
features:
    - key: ai_commerce
      tabs:
          - key: smart_cms
            enabled: true
            groups:
                - key: ai_vendor
                  name: AI Vendor
                  description: AI configuration and vendor model used for the Smart CMS feature. Only the model field matching the selected AI Configuration is shown.
                  enabled: true
                  order: 1
                  scopes:
                      - global
                  settings:
                      - key: ai_configuration
                        name: AI Configuration
                        description: AI configuration used for the Smart CMS feature.
                        type: radio
                        default_value: 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_OPENAI'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 1
                        scopes:
                            - global
                        options:
                            - value: 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_OPENAI'
                              label: OpenAI
                            - value: 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_AWS'
                              label: AWS Bedrock
                            - value: 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_ANTHROPIC'
                              label: Anthropic
                      - key: openai_model
                        name: OpenAI Model
                        description: The OpenAI model used for the Smart CMS AI configuration. Model must support image input and structured output.
                        type: string
                        default_value: 'gpt-4.1'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 2
                        scopes:
                            - global
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:smart_cms:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_OPENAI'
                      - key: aws_model
                        name: AWS Bedrock Model
                        description: The AWS Bedrock model identifier used for the Smart CMS AI configuration. Model must support image input and structured output.
                        type: string
                        default_value: 'eu.anthropic.claude-sonnet-4-5-20250929-v1:0'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 3
                        scopes:
                            - global
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:smart_cms:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_AWS'
                      - key: anthropic_model
                        name: Anthropic Model
                        description: The Anthropic model used for the Smart CMS AI configuration. Model must support image input and structured output.
                        type: string
                        default_value: 'claude-sonnet-4-5'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 4
                        scopes:
                            - global
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:smart_cms:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_SMART_CMS_ANTHROPIC'
```

```bash
console configuration:sync
console frontend:project:install-dependencies
console frontend:zed:build
console twig:cache:warmer
```

### 8) Enable the feature

Enable Smart CMS Content Assistant in the Back Office:

1. In the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Smart CMS&nbsp;<span aria-label="and then">></span>&nbsp;AI Vendor**.
2. Select the desired **AI Configuration** (OpenAI, AWS Bedrock, or Anthropic).
3. Set the model for the selected provider.
4. Click **Save**.

{% info_block warningBox "Verification" %}

In the Back Office, open a CMS Page or CMS Block glossary editor. Type a prompt in the Smart CMS panel and make sure the AI generates content for the placeholder.

{% endinfo_block %}
