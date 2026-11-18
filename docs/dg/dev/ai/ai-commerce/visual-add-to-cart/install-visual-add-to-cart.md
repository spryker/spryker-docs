---
title: Install Visual Add to Cart
description: Learn how to install the Visual Add to Cart feature that lets buyers upload a product image or a PDF order form on the Quick Order page to automatically populate the order form.
last_updated: Nov 18, 2026
template: feature-integration-guide-template
redirect_from:
  - /docs/en/cart
  - /2021080/docs/cart
---

Visual Add to Cart lets storefront users upload a product image, a screenshot, or a PDF order form on the Quick Order page to automatically recognize products and populate the order form. This document describes how to install the Visual Add to Cart feature.

## Install the feature core

Follow the steps in the following sections to install the Visual Add to Cart feature core.

### Prerequisites

Install the required features:

| NAME                       | VERSION | INSTALLATION GUIDE |
|----------------------------|---------|-------------------|
| AI Commerce                | {{page.release_tag}} | [Install AI Commerce](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html) |
| Quick Order Page           | {{page.release_tag}} | |
| Search                     | {{page.release_tag}} | |
| Catalog                    | {{page.release_tag}} | |
| SearchElasticsearch        | {{page.release_tag}} | |

### 1) Add translations

Append the glossary according to your configuration:

<details>
    <summary>data/import/common/common/glossary.csv</summary>

```csv
ai-commerce.quick-order-visual-add-to-cart.file-upload.title,Quick order with AI,en_US
ai-commerce.quick-order-visual-add-to-cart.file-upload.title,Schnellbestellung mit KI,de_DE
ai-commerce.quick-order-visual-add-to-cart.file-upload.description,"Upload a purchase order, order form, invoice or product list as a file, photo or screenshot. Supported formats: %formats%.",en_US
ai-commerce.quick-order-visual-add-to-cart.file-upload.description,"Laden Sie eine Bestellung, ein Bestellformular, eine Rechnung oder eine Produktliste als Datei, Foto oder Screenshot hoch. Unterstützte Formate: %formats%.",de_DE
ai-commerce.quick-order-visual-add-to-cart.file-upload.button.upload,Upload,en_US
ai-commerce.quick-order-visual-add-to-cart.file-upload.button.upload,Uploaden,de_DE
ai-commerce.quick-order-visual-add-to-cart.file-upload.browse-file,No file selected. Browse file,en_US
ai-commerce.quick-order-visual-add-to-cart.file-upload.browse-file,Keine Datei ausgewählt. Datei durchsuchen,de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.invalid-format,Invalid file format. Please upload a file in one of the supported formats.,en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.invalid-format,Ungültiges Dateiformat. Bitte laden Sie eine Datei in einem der unterstützten Formate hoch.,de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.invalid-mime-type,Invalid file type.,en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.invalid-mime-type,Ungültiger Dateityp.,de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.no-file,No file uploaded.,en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.no-file,Keine Datei hochgeladen.,de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.product-limit-exceeded,"The number of recognized products exceeds the limit. Please upload a file with no more than %maxProducts% products.",en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.product-limit-exceeded,"Die Anzahl der erkannten Produkte überschreitet das Limit. Bitte laden Sie eine Datei mit nicht mehr als %maxProducts% Produkten hoch.",de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.no-products-recognized,"No products were recognized in the uploaded file.",en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.no-products-recognized,"Es wurden keine Produkte in der hochgeladenen Datei erkannt.",de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.product-not-found,"Product '%product%' was not found in the catalog.",en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.product-not-found,"Produkt '%product%' wurde im Katalog nicht gefunden.",de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.ai-request-failed,The AI request failed. The file could not be recognized.,en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.ai-request-failed,Die KI-Anfrage ist fehlgeschlagen. Die Datei konnte nicht erkannt werden.,de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.file-read-failed,The uploaded file could not be read. Please upload it again.,en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.file-read-failed,Die hochgeladene Datei konnte nicht gelesen werden. Bitte laden Sie sie erneut hoch.,de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.ai-response-invalid,The AI returned an unexpected response. The file could not be recognized.,en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.ai-response-invalid,Die KI hat eine unerwartete Antwort zurückgegeben. Die Datei konnte nicht erkannt werden.,de_DE
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.file-too-large,The uploaded file exceeds the maximum allowed file size.,en_US
ai-commerce.quick-order-visual-add-to-cart.order-file.errors.file-too-large,Die hochgeladene Datei überschreitet die maximal zulässige Dateigröße.,de_DE
```

</details>

### 2) Set up behavior

Register the following plugin to integrate the feature into the Quick Order page:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| AiCommerceQuickOrderVisualAddToCartFormPlugin | Adds the image and PDF upload form to the Quick Order page and handles the Visual Add to Cart workflow. | | SprykerFeature\Yves\AiCommerce\QuickOrderVisualAddToCart\Plugin\QuickOrderPage |

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerFeature\Yves\AiCommerce\QuickOrderVisualAddToCart\Plugin\QuickOrderPage\AiCommerceQuickOrderVisualAddToCartFormPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderFormPluginInterface>
     */
    protected function getQuickOrderFormPlugins(): array
    {
        return [
            new AiCommerceQuickOrderVisualAddToCartFormPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

On the Storefront Quick Order page, make sure the upload component is displayed and that uploading a product image or a PDF order form populates the order form with recognized products.

{% endinfo_block %}

### 3) Configure AiFoundation for Visual Add to Cart

For a base AiFoundation setup, see [Configure AiFoundation](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html#2-configure-aifoundation).

Using a dedicated AI configuration for Visual Add to Cart is recommended because each named configuration is tracked separately in the AiFoundation audit log. This lets you isolate and review all AI calls made by the Visual Add to Cart recognition flow independently from other AI features in your project.

To use a dedicated AI model configuration for Visual Add to Cart instead of the default one, follow these steps:

1. Define the Visual Add to Cart configuration name and Back Office setting keys at the project level:

**src/Pyz/Shared/AiCommerce/AiCommerceConstants.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Shared\AiCommerce;

use SprykerFeature\Shared\AiCommerce\AiCommerceConstants as SprykerFeatureAiCommerceConstants;

interface AiCommerceConstants extends SprykerFeatureAiCommerceConstants
{
    public const string CONFIGURATION_KEY_OPENAI_API_TOKEN = 'ai_vendor:openai:general:api_token';
    public const string CONFIGURATION_KEY_QUICK_ORDER_VISUAL_ADD_TO_CART_AI_CONFIGURATION = 'ai_commerce:quick_order:ai_vendor:ai_configuration';
    public const string CONFIGURATION_KEY_QUICK_ORDER_VISUAL_ADD_TO_CART_OPENAI_MODEL = 'ai_commerce:quick_order:ai_vendor:openai_model';

    public const string AI_CONFIGURATION_QUICK_ORDER_VISUAL_ADD_TO_CART_OPENAI = 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI';
}
```

The `AI_CONFIGURATION_QUICK_ORDER_VISUAL_ADD_TO_CART_*` values keep the `IMAGE_TO_CART` wording of earlier module versions. Back Office stores this value when the AI configuration is saved, so the old wording keeps saved settings working.

2. In `config/Shared/config_ai.php`, register a named configuration entry keyed by the `AI_CONFIGURATION_QUICK_ORDER_VISUAL_ADD_TO_CART_OPENAI` constant:

```php
$config[\Spryker\Shared\AiFoundation\AiFoundationConstants::AI_CONFIGURATIONS][\Pyz\Shared\AiCommerce\AiCommerceConstants::AI_CONFIGURATION_QUICK_ORDER_VISUAL_ADD_TO_CART_OPENAI] = [
    'provider_name' => \Spryker\Shared\AiFoundation\AiFoundationConstants::PROVIDER_OPENAI_RESPONSES,
    'provider_config' => [
        'key' => \Spryker\Shared\AiFoundation\AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \Pyz\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
        'model' => \Spryker\Shared\AiFoundation\AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \Pyz\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_QUICK_ORDER_VISUAL_ADD_TO_CART_OPENAI_MODEL,
        'parameters' => [
            'reasoning' => [
                'effort' => 'minimal',
            ],
        ],
    ],
];
```

3. Return the configuration name from `AiCommerceConfig`. Visual Add to Cart reads this value from the Yves-layer configuration. The method reads the vendor selected in the Back Office and returns the matching configuration name, defaulting to the OpenAI configuration:

**src/Pyz/Yves/AiCommerce/AiCommerceConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\AiCommerce;

use Pyz\Shared\AiCommerce\AiCommerceConstants;
use SprykerFeature\Yves\AiCommerce\AiCommerceConfig as SprykerFeatureAiCommerceConfig;

class AiCommerceConfig extends SprykerFeatureAiCommerceConfig
{
    public function getQuickOrderVisualAddToCartAiConfigurationName(): ?string
    {
        return $this->getModuleConfig(
            AiCommerceConstants::CONFIGURATION_KEY_QUICK_ORDER_VISUAL_ADD_TO_CART_AI_CONFIGURATION,
            AiCommerceConstants::AI_CONFIGURATION_QUICK_ORDER_VISUAL_ADD_TO_CART_OPENAI,
        );
    }
}
```

To offer AWS Bedrock and Anthropic as selectable providers for Visual Add to Cart, see [Configure multiple AI providers](/docs/dg/dev/ai/ai-commerce/configure-multiple-ai-providers.html).

### 4) Sync configuration

Define the AI configuration and model settings for Visual Add to Cart in `data/configuration/ai_commerce.configuration.yml`. These settings back the `configuration::` references registered in `config/Shared/config_ai.php`, so they must exist before syncing:

**data/configuration/ai_commerce.configuration.yml**

```yaml
features:
    - key: ai_commerce
      tabs:
          - key: quick_order
            enabled: true
            groups:
                - key: ai_vendor
                  name: AI Vendor
                  description: AI configuration and vendor model used for the Quick Order Visual add to cart feature. Only the model field matching the selected AI Configuration is shown.
                  enabled: true
                  order: 1
                  scopes:
                      - global
                  settings:
                      - key: ai_configuration
                        name: AI Configuration
                        description: AI configuration used for the Quick Order Visual add to cart feature.
                        type: radio
                        default_value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI'
                        enabled: true
                        secret: false
                        storefront: true
                        order: 1
                        scopes:
                            - global
                        options:
                            - value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI'
                              label: OpenAI
                            - value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_AWS'
                              label: AWS Bedrock
                            - value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_ANTHROPIC'
                              label: Anthropic
                      - key: openai_model
                        name: OpenAI Model
                        description: The OpenAI model used for the Quick Order Visual add to cart AI configuration. Model must support image and PDF input and structured output.
                        type: select
                        default_value: 'gpt-5-nano'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 2
                        scopes:
                            - global
                        options:
                            - value: 'gpt-5-nano'
                              label: GPT-5 nano
                            - value: 'gpt-5-mini'
                              label: GPT-5 mini
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:quick_order:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI'
                      - key: aws_model
                        name: AWS Bedrock Model
                        description: The AWS Bedrock model identifier used for the Quick Order Visual add to cart AI configuration. Model must support image and PDF input and structured output.
                        type: select
                        default_value: 'eu.anthropic.claude-haiku-5-5'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 3
                        scopes:
                            - global
                        options:
                            - value: 'eu.anthropic.claude-haiku-5-5'
                              label: Claude Haiku 5.5
                            - value: 'eu.anthropic.claude-sonnet-5-5'
                              label: Claude Sonnet 5.5
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:quick_order:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_AWS'
                      - key: anthropic_model
                        name: Anthropic Model
                        description: The Anthropic model used for the Quick Order Visual add to cart AI configuration. Model must support image and PDF input and structured output.
                        type: select
                        default_value: 'claude-haiku-5-5'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 4
                        scopes:
                            - global
                        options:
                            - value: 'claude-haiku-5-5'
                              label: Claude Haiku 5.5
                            - value: 'claude-sonnet-5-5'
                              label: Claude Sonnet 5.5
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:quick_order:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_ANTHROPIC'
```

Sync the configuration to the database:

```bash
console configuration:sync
```

### 5) Enable the feature

Enable the feature in the Back Office:

1. In the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Quick Order&nbsp;<span aria-label="and then">></span>&nbsp;Visual Add to Cart**.
2. Enable it.
3. Click **Save**.

{% info_block warningBox "Verification" %}

On the Storefront Quick Order page, make sure the upload button is visible.

{% endinfo_block %}

## Integrate the feature frontend

### 1) Update the Quick Order page templates

{% info_block infoBox "Info" %}

Do this step only if you have overridden `quick-order-form.twig`, `quick-order.twig` in `QuickOrderPage` module at the project level. If you have not overridden this template, skip to [2) Apply the frontend changes](#2-apply-the-frontend-changes).

{% endinfo_block %}

In `src/Pyz/Yves/QuickOrderPage/Theme/default/components/molecules/quick-order-form/quick-order-form.twig`, make sure the plugin forms loop is placed after the `quick-order-file-upload` molecule include inside `{% raw %}{% block fields %}{% endraw %}`:

Add `pluginForms: [],` to the `data` variable definition:

```twig
{% raw %}
{% define data = {
    form: required,
    products: [],
    prices: [],
    additionalColumns: [],
    fileTemplateExtensions: [],
    textOrderForm: required,
    uploadOrderForm: required,
    pluginForms: [],
} %}
{% endraw %}
```

Add `pluginForms: data.pluginForms,` to the `embed` variable definition in `{% raw %}embed molecule('form'){% endraw %}`:

```twig
{% raw %}
 {% embed molecule('form') with {
        ...
        embed: {
            ...
            pluginForms: data.pluginForms,
        }
    } only %}
{% endraw %}
```

Add the plugin forms including.

```twig
{% raw %}
{% include molecule('quick-order-file-upload', 'QuickOrderPage') with {
    data: {
        uploadOrderForm: data.uploadOrderForm,
        fileTemplateExtensions: data.fileTemplateExtensions,
    },
} only %}

{% for pluginForm in embed.pluginForms %}
    <div class="plugins-quick-order-form">
        {% if pluginForm.vars.template_path is defined %}
            {% include pluginForm.vars.template_path with {
                data: {
                    form: pluginForm,
                },
            } only %}
        {% else %}
            {{ form_widget(pluginForm) }}
        {% endif %}
    </div>
{% endfor %}
{% endraw %}
```

Add styles to the `src/Pyz/Yves/QuickOrderPage/Theme/default/components/molecules/quick-order-form/quick-order-form.scss`:

```scss
    .plugins-quick-order-form {
        background-color: #f6f6f6;
        padding: 1.0625rem 1.25rem;
        border-radius: 2px;
        margin-top: 0.5rem;
    }
```

add the following code to the `src/Pyz/Yves/QuickOrderPage/Theme/default/views/quick-order/quick-order.twig` file:

```twig
{% raw %}
{% define data = {
    forms: {
        quickOrderForm: _view.quickOrderForm,
        textOrderForm: _view.textOrderForm,
        uploadOrderForm: _view.uploadOrderForm,
    },
    pluginForms: _view.pluginForms | default([]),
    additionalColumns: _view.additionalColumns,
    products: _view.products,
    prices: _view.prices,
    fileTemplateExtensions: _view.fileTemplateExtensions,
    title: 'quick-order.page-title' | trans,
} %}

{% block content %}
    {% include molecule('quick-order-form', 'QuickOrderPage') with {
        data: {
            form: data.forms.quickOrderForm,
            products: data.products,
            prices: data.prices,
            fileTemplateExtensions: data.fileTemplateExtensions,
            additionalColumns: data.additionalColumns,
            textOrderForm: data.forms.textOrderForm,
            uploadOrderForm: data.forms.uploadOrderForm,
            pluginForms: data.pluginForms,
        },
    } only %}
{% endblock %}
{% endraw %}
```

{% info_block warningBox "Warning" %}

If the `{% raw %}{% for pluginForm in embed.pluginForms %}{% endraw %}` loop is placed before or outside the `quick-order-file-upload` include, the Visual Add to Cart upload component will not render on the Quick Order page.

{% endinfo_block %}

### 2) Apply the frontend changes

Apply the frontend changes:

```bash
docker/sdk cli npm install
docker/sdk cli console frontend:project:install-dependencies
docker/sdk cli console frontend:yves:build
```

{% info_block warningBox "Verification" %}

On the Storefront Quick Order page, make sure you can upload a product image or a PDF order form and have the recognized products pre-filled in the order form.

{% endinfo_block %}

