---
title: Install Smart PIM
description: Learn how to install the Smart PIM feature that provides AI-powered content improvement, image alt text generation, category suggestions, and translation on Back Office product pages.
last_updated: Apr 23, 2026
template: feature-integration-guide-template
---

Smart PIM is an AI assistant embedded in the Back Office product creation and editing pages. It provides AI-powered capabilities for improving product content, generating image alt text, suggesting categories, and translating product data. This document describes how to install the Smart PIM feature.

## Install the feature core

Follow the steps in the following sections to install the Smart PIM feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|------|---------|-------------------|
| AI Commerce | {{page.release_tag}} | [Install AI Commerce](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html) |
| Product Management | {{page.release_tag}} | |

Make sure the following modules are installed at the required minimum versions:

| MODULE | MINIMUM VERSION |
|--------|----------------|
| `spryker/product-category` | `^4.33.1` |
| `spryker/product-management` | `^0.20.9` |
| `spryker/product-management-extension` | `^1.11.0` |
| `spryker-shop/quick-order-page-extension` | `^1.3.0` |

### 1) Generate transfers and run database migration

```bash
console transfer:generate
console propel:install
```

### 2) Add configuration constants

Add the project-level constants interface to map configuration keys used by the Back Office Configuration UI:

**src/Pyz/Shared/AiCommerce/AiCommerceConstants.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Shared\AiCommerce;

use SprykerFeature\Shared\AiCommerce\AiCommerceConstants as SprykerFeatureAiCommerceConstants;

interface AiCommerceConstants extends SprykerFeatureAiCommerceConstants
{
    public const string AI_CONFIGURATION_SMART_PIM = 'AI_COMMERCE:AI_CONFIGURATION_SMART_PIM';
}
```

### 3) Configure AI models for Smart PIM

Add the Smart PIM named AI configuration entry to `config/Shared/config_ai.php`. The API token and model are resolved at runtime from the Back Office Configuration UI using the `CONFIGURATION_REFERENCE_PREFIX`:

`config/Shared/config_ai.php`

```php
<?php

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use Spryker\Shared\AiFoundation\AiFoundationConstants;

$openAiConfiguration = [
    'provider_name' => AiFoundationConstants::PROVIDER_OPENAI,
    'provider_config' => [
        'key' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
        'model' => AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . AiCommerceConstants::CONFIGURATION_KEY_OPENAI_DEFAULT_MODEL,
    ],
];

$config[AiFoundationConstants::AI_CONFIGURATIONS][AiCommerceConstants::AI_CONFIGURATION_SMART_PIM] = $openAiConfiguration;
```


### 4) Configure Smart PIM

Override `AiCommerceConfig` in the Zed layer to route all Smart PIM capabilities to the `AI_CONFIGURATION_SMART_PIM` named configuration:

**src/Pyz/Zed/AiCommerce/AiCommerceConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\AiCommerce;

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use SprykerFeature\Zed\AiCommerce\AiCommerceConfig as SprykerAiCommerceConfig;

class AiCommerceConfig extends SprykerAiCommerceConfig
{
    public function getContentImproverAiConfigurationName(): ?string
    {
        return AiCommerceConstants::AI_CONFIGURATION_SMART_PIM;
    }

    public function getImageAltTextAiConfigurationName(): ?string
    {
        return AiCommerceConstants::AI_CONFIGURATION_SMART_PIM;
    }

    public function getCategorySuggestionAiConfigurationName(): ?string
    {
        return AiCommerceConstants::AI_CONFIGURATION_SMART_PIM;
    }

    public function getTranslationAiConfigurationName(): ?string
    {
        return AiCommerceConstants::AI_CONFIGURATION_SMART_PIM;
    }
}
```

### 5) Set up behavior

Register the following plugins to wire Smart PIM into the product management form.

Register the category lifecycle plugins in `ProductDependencyProvider`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `ProductCategoryProductAbstractPostCreatePlugin` | Saves category assignments when an abstract product is created. Required for Smart PIM category suggestions to be persisted. | | `Spryker\Zed\ProductCategory\Communication\Plugin\Product` |
| `ProductCategoryProductAbstractAfterUpdatePlugin` | Updates category assignments when an abstract product is updated. Required for Smart PIM category suggestions to be persisted. | | `Spryker\Zed\ProductCategory\Communication\Plugin\Product` |

**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use Spryker\Zed\ProductCategory\Communication\Plugin\Product\ProductCategoryProductAbstractAfterUpdatePlugin;
use Spryker\Zed\ProductCategory\Communication\Plugin\Product\ProductCategoryProductAbstractPostCreatePlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPostCreatePluginInterface>
     */
    protected function getProductAbstractPostCreatePlugins(): array
    {
        return [
            // ... other plugins
            new ProductCategoryProductAbstractPostCreatePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractAfterUpdatePluginInterface>
     */
    protected function getProductAbstractAfterUpdatePlugins(Container $container): array
    {
        return [
            // ... other plugins
            new ProductCategoryProductAbstractAfterUpdatePlugin(),
        ];
    }
}
```

Register the product form plugins in `ProductManagementDependencyProvider`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `ProductCategoryAbstractFormExpanderPlugin` | Adds the category field to the abstract product form, enabling Smart PIM to populate and display category suggestions. | | `Spryker\Zed\ProductCategory\Communication\Plugin\ProductManagement` |
| `ProductManagementAiProductAbstractFormTabContentProviderWithPriorityPlugin` | Adds the Smart PIM AI panel as a tab content provider in the abstract product form. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\ProductManagement` |

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;
use Spryker\Zed\ProductCategory\Communication\Plugin\ProductManagement\ProductCategoryAbstractFormExpanderPlugin;
use SprykerFeature\Zed\AiCommerce\Communication\Plugin\ProductManagement\ProductManagementAiProductAbstractFormTabContentProviderWithPriorityPlugin;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormExpanderPluginInterface>
     */
    protected function getProductAbstractFormExpanderPlugins(): array
    {
        return [
            // ... other plugins
            new ProductCategoryAbstractFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormTabContentProviderWithPriorityPluginInterface>
     */
    protected function getProductAbstractFormTabContentProviderWithPriorityPlugins(): array
    {
        return [
            // ... other plugins
            new ProductManagementAiProductAbstractFormTabContentProviderWithPriorityPlugin(),
        ];
    }
}
```

Register the Twig plugin to make Smart PIM Twig utilities available in the Back Office:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| `AiCommerceTwigPlugin` | Registers Twig functions and variables required by Smart PIM modals on product pages. | | `SprykerFeature\Zed\AiCommerce\Communication\Plugin\Twig` |

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

### 6) Extend product management templates

Override the following product management Twig templates to include the Smart PIM AI modals partial. Each template extends its core counterpart and includes the partial in the `content` block:

**src/Pyz/Zed/ProductManagement/Presentation/Add/index.twig**

```twig
{% raw %}
{% extends '@Spryker:ProductManagement/Add/index.twig' %}
{% block content %}
    {{ parent() }}
    {% include '@SprykerFeature:AiCommerce/SmartProductManagement/_partials/product-management-ai-modals.twig' ignore missing %}
{% endblock %}
{% endraw %}
```

**src/Pyz/Zed/ProductManagement/Presentation/AddVariant/index.twig**

```twig
{% raw %}
{% extends '@Spryker:ProductManagement/AddVariant/index.twig' %}
{% block content %}
    {{ parent() }}
    {% include '@SprykerFeature:AiCommerce/SmartProductManagement/_partials/product-management-ai-modals.twig' ignore missing %}
{% endblock %}
{% endraw %}
```

**src/Pyz/Zed/ProductManagement/Presentation/Edit/index.twig**

```twig
{% raw %}
{% extends '@Spryker:ProductManagement/Edit/index.twig' %}
{% block content %}
    {{ parent() }}
    {% include '@SprykerFeature:AiCommerce/SmartProductManagement/_partials/product-management-ai-modals.twig' ignore missing %}
{% endblock %}
{% endraw %}
```

**src/Pyz/Zed/ProductManagement/Presentation/Edit/variant.twig**

```twig
{% raw %}
{% extends '@Spryker:ProductManagement/Edit/variant.twig' %}
{% block content %}
    {{ parent() }}
    {% include '@SprykerFeature:AiCommerce/SmartProductManagement/_partials/product-management-ai-modals.twig' ignore missing %}
{% endblock %}
{% endraw %}
```

{% info_block warningBox "Verification" %}

In the Back Office, open a product create or edit page. Make sure the Smart PIM AI panel is visible in the product form.

{% endinfo_block %}

### 7) Sync configuration and build frontend assets

Sync the AI Commerce configuration to the database and build frontend assets:

```bash
console configuration:sync
console frontend:project:install-dependencies
console frontend:zed:build
console twig:cache:warmer
```

### 8) Configure OpenAI settings

Set the OpenAI API credentials and model settings in the Back Office:

1. In the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Open AI**.
2. Enter the **OpenAI API Token**.
3. Set the **OpenAI Default Model** (default: `gpt-4o`) and **OpenAI Smart Model** (default: `gpt-4.1`).
4. Click **Save**.

{% info_block warningBox "Verification" %}

In the Back Office, open a product create or edit page and use a Smart PIM capability such as content improvement or category suggestion. Make sure the AI returns a valid response.

{% endinfo_block %}
