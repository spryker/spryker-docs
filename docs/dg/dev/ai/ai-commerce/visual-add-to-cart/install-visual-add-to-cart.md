---
title: Install Visual Add to Cart
description: Learn how to install the Visual Add to Cart feature that lets buyers upload a product image on the Quick Order page to automatically populate the order form.
last_updated: Jul 16, 2026
template: feature-integration-guide-template
---

Visual Add to Cart lets storefront users upload a product image on the Quick Order page to automatically recognize products and populate the order form. This document describes how to install the Visual Add to Cart feature.

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
ai-commerce.quick-order-image-to-cart.image-upload.title,Quick order with AI,en_US
ai-commerce.quick-order-image-to-cart.image-upload.title,Schnellbestellung mit KI,de_DE
ai-commerce.quick-order-image-to-cart.image-upload.description,"Upload purchase order, invoices or product lists. Supports %formats% formats and Screenshots.",en_US
ai-commerce.quick-order-image-to-cart.image-upload.description,"Titelliste, Rechnungen oder Produktlisten hochladen. Unterstützt %formats% Formate und Screenshots.",de_DE
ai-commerce.quick-order-image-to-cart.image-upload.button.upload,Upload,en_US
ai-commerce.quick-order-image-to-cart.image-upload.button.upload,Uploaden,de_DE
ai-commerce.quick-order-image-to-cart.image-upload.browse-file,No file selected. Browse file,en_US
ai-commerce.quick-order-image-to-cart.image-upload.browse-file,Keine Datei ausgewählt. Datei durchsuchen,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.invalid-format,Invalid image format. Please upload a image file.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.invalid-format,Ungültiges Bildformat. Bitte laden Sie eine Bilddatei hoch.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.invalid-mime-type,Invalid image mime type.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.invalid-mime-type,Ungültiger Bild-MIME-Typ.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.no-image,No image uploaded.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.no-image,Kein Bild hochgeladen.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.product-limit-exceeded,"The number of recognized products exceeds the limit. Please upload an image with no more than %maxProducts% products.",en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.product-limit-exceeded,"Die Anzahl der erkannten Produkte überschreitet das Limit. Bitte laden Sie ein Bild mit nicht mehr als %maxProducts% Produkten hoch.",de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.no-products-recognized,"No products were recognized in the uploaded image.",en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.no-products-recognized,"Es wurden keine Produkte im hochgeladenen Bild erkannt.",de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.product-not-found,"Product '%product%' was not found in the catalog.",en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.product-not-found,"Produkt '%product%' wurde im Katalog nicht gefunden.",de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.ai-request-failed,The AI request failed. The image could not be recognized.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.ai-request-failed,Die KI-Anfrage ist fehlgeschlagen. Das Bild konnte nicht erkannt werden.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.ai-response-invalid,The AI returned an unexpected response. The image could not be recognized.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.ai-response-invalid,Die KI hat eine unerwartete Antwort zurückgegeben. Das Bild konnte nicht erkannt werden.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.file-too-large,The uploaded image exceeds the maximum allowed file size.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.file-too-large,Das hochgeladene Bild überschreitet die maximal zulässige Dateigröße.,de_DE
```

</details>

### 2) Set up behavior

Register the following plugin to integrate the feature into the Quick Order page:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| AiCommerceQuickOrderImageToCartFormPlugin | Adds the image upload form to the Quick Order page and handles the image-to-cart workflow. | | SprykerFeature\Yves\AiCommerce\QuickOrderImageToCart\Plugin\QuickOrderPage |

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerFeature\Yves\AiCommerce\QuickOrderImageToCart\Plugin\QuickOrderPage\AiCommerceQuickOrderImageToCartFormPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderFormPluginInterface>
     */
    protected function getQuickOrderFormPlugins(): array
    {
        return [
            new AiCommerceQuickOrderImageToCartFormPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

On the Storefront Quick Order page, make sure the image upload component is displayed and that uploading a product image populates the order form with recognized products.

{% endinfo_block %}

### 3) Configure AiFoundation for Visual Add to Cart

For a base AiFoundation setup, see [Configure AiFoundation](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html#2-configure-aifoundation).

Using a dedicated AI configuration for Visual Add to Cart is recommended because each named configuration is tracked separately in the AiFoundation audit log. This lets you isolate and review all AI calls made by the image recognition flow independently from other AI features in your project.

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
    public const string CONFIGURATION_KEY_QUICK_ORDER_IMAGE_TO_CART_AI_CONFIGURATION = 'ai_commerce:quick_order:ai_vendor:ai_configuration';
    public const string CONFIGURATION_KEY_QUICK_ORDER_IMAGE_TO_CART_OPENAI_MODEL = 'ai_commerce:quick_order:ai_vendor:openai_model';

    public const string AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI = 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI';
}
```

2. In `config/Shared/config_ai.php`, register a named configuration entry keyed by the `AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI` constant:

```php
$config[\Spryker\Shared\AiFoundation\AiFoundationConstants::AI_CONFIGURATIONS][\Pyz\Shared\AiCommerce\AiCommerceConstants::AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI] = [
    'provider_name' => \Spryker\Shared\AiFoundation\AiFoundationConstants::PROVIDER_OPENAI,
    'provider_config' => [
        'key' => \Spryker\Shared\AiFoundation\AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \Pyz\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_OPENAI_API_TOKEN,
        'model' => \Spryker\Shared\AiFoundation\AiFoundationConstants::CONFIGURATION_REFERENCE_PREFIX . \Pyz\Shared\AiCommerce\AiCommerceConstants::CONFIGURATION_KEY_QUICK_ORDER_IMAGE_TO_CART_OPENAI_MODEL,
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
    public function getQuickOrderImageToCartAiConfigurationName(): ?string
    {
        return $this->getModuleConfig(
            AiCommerceConstants::CONFIGURATION_KEY_QUICK_ORDER_IMAGE_TO_CART_AI_CONFIGURATION,
            AiCommerceConstants::AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI,
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
                  description: AI configuration and vendor model used for the Quick Order Image-to-Cart feature. Only the model field matching the selected AI Configuration is shown.
                  enabled: true
                  order: 1
                  scopes:
                      - global
                  settings:
                      - key: ai_configuration
                        name: AI Configuration
                        description: AI configuration used for the Quick Order Image-to-Cart feature.
                        type: radio
                        default_value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI'
                        enabled: true
                        secret: false
                        storefront: false
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
                        description: The OpenAI model used for the Quick Order Image-to-Cart AI configuration. Model must support image input and structured output.
                        type: string
                        default_value: 'gpt-4o-mini'
                        enabled: true
                        secret: false
                        storefront: false
                        order: 2
                        scopes:
                            - global
                        dependencies:
                            - when:
                                  any:
                                      - setting: ai_commerce:quick_order:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_OPENAI'
                      - key: aws_model
                        name: AWS Bedrock Model
                        description: The AWS Bedrock model identifier used for the Quick Order Image-to-Cart AI configuration. Model must support image input and structured output.
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
                                      - setting: ai_commerce:quick_order:ai_vendor:ai_configuration
                                        operator: equals
                                        value: 'AI_COMMERCE:AI_CONFIGURATION_QUICK_ORDER_IMAGE_TO_CART_AWS'
                      - key: anthropic_model
                        name: Anthropic Model
                        description: The Anthropic model used for the Quick Order Image-to-Cart AI configuration. Model must support image input and structured output.
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

On the Storefront Quick Order page, make sure the image upload button is visible.

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

On the Storefront Quick Order page, make sure you can upload a product image and have the recognized products pre-filled in the order form.

{% endinfo_block %}

