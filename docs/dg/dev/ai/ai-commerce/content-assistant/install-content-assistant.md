---
title: Install Content Assistant
description: Learn how to install the Content Assistant feature that provides an AI-powered panel in the Back Office CMS Page and CMS Block glossary editors.
last_updated: Jun 04, 2026
template: feature-integration-guide-template
---

Content Assistant is an AI-powered panel embedded in the Back Office CMS Page and CMS Block glossary editors. It lets Back Office users generate and refine placeholder content per locale through a conversational AI interface. This document describes how to install the Content Assistant feature.

## Install the feature core

Follow the steps in the following sections to install the Content Assistant feature core.

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
    public const string AI_CONFIGURATION_CMS_AI_EDITING_OPENAI = 'AI_COMMERCE:AI_CONFIGURATION_CMS_AI_EDITING_OPENAI';
    public const string AI_CONFIGURATION_CMS_AI_EDITING_AWS = 'AI_COMMERCE:AI_CONFIGURATION_CMS_AI_EDITING_AWS';
    public const string AI_CONFIGURATION_CMS_AI_EDITING_ANTHROPIC = 'AI_COMMERCE:AI_CONFIGURATION_CMS_AI_EDITING_ANTHROPIC';
}
```

### 3) Configure AI models for Content Assistant

Add the Content Assistant named AI configuration entries to `config/Shared/config_ai.php`. The feature supports OpenAI, AWS Bedrock, and Anthropic. Only the configuration matching the vendor selected in the Back Office Configuration UI is used at runtime.

`config/Shared/config_ai.php`

```php
<?php

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use Spryker\Shared\AiFoundation\AiFoundationConstants;

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_CMS_AI_EDITING_OPENAI] = [
    'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
    'provider_config' => [
        'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_CMS_AI_EDITING_OPENAI_MODEL,
    ],
    'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_CMS_AI_EDITING_SYSTEM_PROMPT,
];

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_CMS_AI_EDITING_AWS] = [
    'provider_name' => AiFoundationConstants::PROVIDER_BEDROCK,
    'provider_config' => [
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_CMS_AI_EDITING_AWS_MODEL,
        'bedrockRuntimeClient' => [
            'region' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_AWS_REGION,
            'token' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_AWS_API_TOKEN,
        ],
    ],
    'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_CMS_AI_EDITING_SYSTEM_PROMPT,
];

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_CMS_AI_EDITING_ANTHROPIC] = [
    'provider_name' => AiFoundationConstants::PROVIDER_ANTHROPIC,
    'provider_config' => [
        'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_ANTHROPIC_API_TOKEN,
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_CMS_AI_EDITING_ANTHROPIC_MODEL,
    ],
    'system_prompt' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \SprykerFeature\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_CMS_AI_EDITING_SYSTEM_PROMPT,
];
```

{% info_block infoBox "Model requirements" %}

The model configured for Content Assistant must support both image input and structured output.

Default model values:
- OpenAI: `gpt-4.1`
- AWS Bedrock: `eu.anthropic.claude-sonnet-4-5-20250929-v1:0`
- Anthropic: `claude-sonnet-4-5`

{% endinfo_block %}

### 4) Configure the CMS AI editing configuration name

Override `AiCommerceConfig` in the Zed layer to route Content Assistant to the correct named configuration based on the Back Office setting:

**src/Pyz/Zed/AiCommerce/AiCommerceConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\AiCommerce;

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use SprykerFeature\Zed\AiCommerce\AiCommerceConfig as SprykerAiCommerceConfig;
use SprykerFeature\Shared\AiCommerce\AiCommerceConstants as SprykerFeatureAiCommerceConstants;

class AiCommerceConfig extends SprykerAiCommerceConfig
{
    public function getCmsAiEditingAiConfigurationName(): ?string
    {
        return (string)$this->getModuleConfig(
            SprykerFeatureAiCommerceConstants::CONFIGURATION_KEY_CMS_AI_EDITING_AI_CONFIGURATION,
            AiCommerceConstants::AI_CONFIGURATION_CMS_AI_EDITING_OPENAI,
        );
    }
}
```

### 5) Set up behavior

Register the following plugins to wire Content Assistant into `AiFoundationDependencyProvider`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `CmsAiContentToolSetPlugin` | Registers the CMS AI content toolset, including the `get_content_items` tool for fetching existing content items. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation` |

**src/Pyz/Zed/AiFoundation/AiFoundationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AiFoundation;

use Spryker\Zed\AiFoundation\AiFoundationDependencyProvider as SprykerAiFoundationDependencyProvider;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\AiFoundation\CmsAiContentToolSetPlugin;
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
            new CmsAiContentToolSetPlugin(),
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

Make sure `AiCommerceTwigPlugin` is registered in `TwigDependencyProvider` to provide the `isCmsAiEditingEnabled()` Twig function used in the glossary editor overrides:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `AiCommerceTwigPlugin` | Registers Twig functions and variables required by the CMS AI panel in glossary editors. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Twig` |

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
    {% if isCmsAiEditingEnabled() %}
        {% set cmsAiPageMeta = [] %}
        {% for pageAttribute in cmsPage.pageAttributes %}
            {% set cmsAiLocaleMetaAttribute = null %}
            {% for metaAttribute in cmsPage.metaAttributes %}
                {% if metaAttribute.localeName == pageAttribute.localeName %}
                    {% set cmsAiLocaleMetaAttribute = metaAttribute %}
                {% endif %}
            {% endfor %}
            {% set cmsAiPageMeta = cmsAiPageMeta|merge([{
                'localeName': pageAttribute.localeName,
                'name': pageAttribute.name,
                'url': pageAttribute.url,
                'metaTitle': cmsAiLocaleMetaAttribute ? cmsAiLocaleMetaAttribute.metaTitle : null,
                'metaKeywords': cmsAiLocaleMetaAttribute ? cmsAiLocaleMetaAttribute.metaKeywords : null,
                'metaDescription': cmsAiLocaleMetaAttribute ? cmsAiLocaleMetaAttribute.metaDescription : null,
            }]) %}
        {% endfor %}
        {% set cmsAiStores = [] %}
        {% if cmsPage.storeRelation is not null %}
            {% for store in cmsPage.storeRelation.stores %}
                {% set cmsAiStores = cmsAiStores|merge([store.name]) %}
            {% endfor %}
        {% endif %}
        {% set cmsAiEntityContext = {
            'name': cmsPage.pageAttributes is not empty ? cmsPage.pageAttributes|first.name : null,
            'templateName': cmsPage.templateName,
            'urlSlug': cmsPage.pageAttributes is not empty ? cmsPage.pageAttributes|first.url : null,
            'key': null,
            'attributes': {
                'isActive': cmsPage.isActive,
                'isSearchable': cmsPage.isSearchable,
                'validFrom': cmsPage.validFrom,
                'validTo': cmsPage.validTo,
                'stores': cmsAiStores,
                'localizedAttributes': cmsAiPageMeta,
            }|json_encode,
        } %}
        {% include '@AiCommerce/Partials/cms-glossary-ai-panel.twig' ignore missing with {
            'cmsAiEntityType': 'cms_page',
            'cmsAiIdEntity': idCmsPage,
            'cmsAiEntityContext': cmsAiEntityContext,
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
    {% if isCmsAiEditingEnabled() %}
        {% set cmsAiStores = [] %}
        {% if cmsBlock.storeRelation is not null %}
            {% for store in cmsBlock.storeRelation.stores %}
                {% set cmsAiStores = cmsAiStores|merge([store.name]) %}
            {% endfor %}
        {% endif %}
        {% set cmsAiEntityContext = {
            'name': cmsBlock.name,
            'templateName': cmsBlock.templateName,
            'urlSlug': null,
            'key': cmsBlock.key,
            'attributes': {
                'isActive': cmsBlock.isActive,
                'validFrom': cmsBlock.validFrom,
                'validTo': cmsBlock.validTo,
                'stores': cmsAiStores,
            }|json_encode,
        } %}
        {% include '@AiCommerce/Partials/cms-glossary-ai-panel.twig' ignore missing with {
            'cmsAiEntityType': 'cms_block',
            'cmsAiIdEntity': idCmsBlock,
            'cmsAiEntityContext': cmsAiEntityContext,
        } %}
    {% endif %}
    {{ parent() }}
{% endblock %}
{% endraw %}
```

{% info_block warningBox "Verification" %}

In the Back Office, open a CMS Page or CMS Block glossary editor. Make sure the AI panel is visible next to the editor when the feature is enabled.

{% endinfo_block %}

### 7) Sync configuration and build frontend assets

```bash
console configuration:sync
console frontend:project:install-dependencies
console frontend:zed:build
console twig:cache:warmer
```

### 8) Enable the feature

Enable Content Assistant in the Back Office:

1. In the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;CMS AI Editing&nbsp;<span aria-label="and then">></span>&nbsp;AI Vendor**.
2. Select the desired **AI Configuration** (OpenAI, AWS Bedrock, or Anthropic).
3. Set the model for the selected provider.
4. Click **Save**.

{% info_block warningBox "Verification" %}

In the Back Office, open a CMS Page or CMS Block glossary editor. Type a prompt in the AI panel and make sure the AI generates content for the placeholder.

{% endinfo_block %}
