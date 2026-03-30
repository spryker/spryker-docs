---
title: Install Visual Add to Cart
description: Learn how to install the Visual Add to Cart feature that lets buyers upload a product image on the Quick Order page to automatically populate the order form.
last_updated: Mar 30, 2026
template: feature-integration-guide-template
---

Visual Add to Cart lets storefront users upload a product image on the Quick Order page to automatically recognize products and populate the order form. This document describes how to install the Visual Add to Cart feature.

## Install the feature core

Follow the steps in the following sections to install the Visual Add to Cart feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|------|---------|-------------------|
| AiFoundation | {{page.release_tag}} | |
| Quick Order Page | {{page.release_tag}} | |
| Catalog | {{page.release_tag}} | |

### 1) Install the required modules

Install the required module:

```bash
composer require spryker-feature/ai-commerce:"^0.1.0" --update-with-dependencies
```

### 2) Add translations

Append the glossary according to your configuration:
`data/import/common/common/glossary.csv`

```csv
ai-commerce.quick-order-image-to-cart.image-order.errors.ai-request-failed,AI request failed. Please try again.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.ai-request-failed,KI-Anfrage fehlgeschlagen. Bitte versuchen Sie es erneut.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.ai-response-invalid,The AI returned an invalid response. Please try again.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.ai-response-invalid,Die KI hat eine ungültige Antwort zurückgegeben. Bitte versuchen Sie es erneut.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.no-products-recognized,No products could be recognized in the image.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.no-products-recognized,Es konnten keine Produkte im Bild erkannt werden.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.product-limit-exceeded,The image contains too many products. Please upload an image with fewer products.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.product-limit-exceeded,Das Bild enthält zu viele Produkte. Bitte laden Sie ein Bild mit weniger Produkten hoch.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.invalid-format,The uploaded file format is not supported.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.invalid-format,Das hochgeladene Dateiformat wird nicht unterstützt.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.invalid-mime-type,The uploaded file type is not allowed.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.invalid-mime-type,Der hochgeladene Dateityp ist nicht zulässig.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.file-too-large,The uploaded file exceeds the maximum allowed size.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.file-too-large,Die hochgeladene Datei überschreitet die maximal zulässige Größe.,de_DE
ai-commerce.quick-order-image-to-cart.image-order.errors.product-not-found,Product "%name%" could not be found in the catalog.,en_US
ai-commerce.quick-order-image-to-cart.image-order.errors.product-not-found,Produkt "%name%" konnte im Katalog nicht gefunden werden.,de_DE
```

### 3) Set up behavior

Register the following plugin to integrate the feature into the Quick Order page:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| AiCommerceQuickOrderImageToCartFormPlugin | Adds the image upload form to the Quick Order page and handles the image-to-cart workflow. | | SprykerFeature\Yves\AiCommerce\Plugin\QuickOrderPage |

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerFeature\Yves\AiCommerce\Plugin\QuickOrderPage\AiCommerceQuickOrderImageToCartFormPlugin;
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

### 4) Enable the feature

Enable the feature in the Back Office:

1. In the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Quick Order&nbsp;<span aria-label="and then">></span>&nbsp;Visual Add to Cart**.
2. Enable it.
3. Click **Save**.

{% info_block warningBox "Verification" %}

On the Storefront Quick Order page, make sure the image upload button is visible.

{% endinfo_block %}

### 5) Configure AiFoundation

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

## Integrate the feature frontend

### 1) Update the Quick Order form template

{% info_block infoBox "Info" %}

Do this step only if you have overridden `quick-order-form.twig` in `QuickOrderPage` module at the project level. If you have not overridden this template, skip to [2) Apply the frontend changes](#2-apply-the-frontend-changes).

{% endinfo_block %}

In `src/Pyz/Yves/QuickOrderPage/Theme/default/components/molecules/quick-order-form/quick-order-form.twig`, make sure the plugin forms loop is placed after the `quick-order-file-upload` molecule include inside `{% block fields %}`:

```twig
{% include molecule('quick-order-file-upload', 'QuickOrderPage') with {
    data: {
        uploadOrderForm: data.uploadOrderForm,
        fileTemplateExtensions: data.fileTemplateExtensions,
    },
} only %}

{% for pluginForm in embed.pluginForms %}
    <hr>

    {% if pluginForm.vars.template_path is defined %}
        {% include pluginForm.vars.template_path with {
            data: {
                form: pluginForm,
            },
        } only %}
    {% else %}
        {{ form_widget(pluginForm) }}
    {% endif %}
{% endfor %}
```

{% info_block warningBox "Warning" %}

If the `{% for pluginForm in embed.pluginForms %}` loop is placed before or outside the `quick-order-file-upload` include, the Visual Add to Cart upload component will not render on the Quick Order page.

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

