---
title: Install Search by Image
description: Learn how to install the Search by Image feature that lets customers upload a photo to search for products using AI-powered image analysis.
last_updated: Apr 10, 2026
template: feature-integration-guide-template
---

Search by Image lets storefront customers upload a photo to find products. AI analyzes the image, identifies a search term, and redirects the customer to the search results page or the first matching product detail page. This document describes how to install the Search by Image feature.

## Install the feature core

Follow the steps in the following sections to install the Search by Image feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|------|---------|-------------------|
| AI Commerce | {{page.release_tag}} | [Install AI Commerce](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html) |
| Configuration Management | {{page.release_tag}} | [Install the Configuration Management feature](/docs/dg/dev/integrate-and-configure/integrate-confguration-feature.html) |
| Catalog | {{page.release_tag}} | |

### 1) Add translations

Append the glossary according to your configuration:
`data/import/common/common/glossary.csv`

```csv
ai_commerce.search_by_image.form.image.label,Search by image,en_US
ai_commerce.search_by_image.form.image.label,Bildersuche,de_DE
ai_commerce.search_by_image.form.image.error.mime_type,"This image type is not supported. Please upload a JPEG, PNG, WebP, or GIF.",en_US
ai_commerce.search_by_image.form.image.error.mime_type,"Dieses Bildformat wird nicht unterstützt. Bitte laden Sie ein JPEG, PNG, WebP oder GIF hoch.",de_DE
ai_commerce.search_by_image.error.no_image_provided,Please select an image to search.,en_US
ai_commerce.search_by_image.error.no_image_provided,Bitte wählen Sie ein Bild für die Suche aus.,de_DE
ai_commerce.search_by_image.error.search_failed,Search by Image failed. Please try again.,en_US
ai_commerce.search_by_image.error.search_failed,Bildsuche fehlgeschlagen. Bitte versuchen Sie es erneut.,de_DE
ai_commerce.search_by_image.error.unavailable,Search by Image is currently unavailable. Please try again later.,en_US
ai_commerce.search_by_image.error.unavailable,Bildsuche ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.,de_DE
ai_commerce.search_by_image.error.disabled,Search by Image is currently disabled.,en_US
ai_commerce.search_by_image.error.disabled,Bildsuche ist derzeit deaktiviert.,de_DE
ai_commerce.search_by_image.search,Search,en_US
ai_commerce.search_by_image.search,Suchen,de_DE
ai_commerce.search_by_image.upload_image,Upload image,en_US
ai_commerce.search_by_image.upload_image,Bild hochladen,de_DE
ai_commerce.search_by_image.upload_image_to_find_products,Upload an image to find similar products.,en_US
ai_commerce.search_by_image.upload_image_to_find_products,"Laden Sie ein Bild hoch, um ähnliche Produkte zu finden.",de_DE
ai_commerce.error.file.size.invalid,"File size is too big.",en_US
ai_commerce.error.file.size.invalid,"Ungültige Gesamtdateigröße.",de_DE
ai_commerce.search_by_image.image.description,"Max up to %size% MB. Allowed file formats %format%",en_US
ai_commerce.search_by_image.image.description,"Maximal bis zu %size%. Erlaubte Dateiformate: %format%",de_DE
```

Import the data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following transfers have been created:

| TRANSFER | TYPE | EVENT | PATH |
|----------|------|-------|------|
| SearchByImageRequest | class | created | src/Generated/Shared/Transfer/SearchByImageRequestTransfer.php |
| SearchByImageResponse | class | created | src/Generated/Shared/Transfer/SearchByImageResponseTransfer.php |
| SearchByImagePromptResponse | class | created | src/Generated/Shared/Transfer/SearchByImagePromptResponseTransfer.php |

{% endinfo_block %}

### 3) Register plugins

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------|---------------|---------------|-----------|
| SearchByImageRouteProviderPlugin | Registers the routes required for the Search by Image request handling. | | SprykerFeature\Yves\AiCommerce\SearchByImage\Plugin\Router |
| ImageSearchAiWidget | Renders the camera icon and image upload dialog next to the search input. | | SprykerFeature\Yves\AiCommerce\SearchByImage\Widget |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use SprykerFeature\Yves\AiCommerce\SearchByImage\Plugin\Router\SearchByImageRouteProviderPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Provider\ShopControllerEventHandlerPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            // ...
            new SearchByImageRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\AiCommerce\SearchByImage\Widget\ImageSearchAiWidget;
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
            ImageSearchAiWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `ImageSearchAiWidget` is registered and the camera icon is rendered next to the search bar when the feature is enabled.

{% endinfo_block %}

### 4) Configure AiFoundation for Search by Image

For a base AiFoundation setup, see [Configure AiFoundation](/docs/dg/dev/ai/ai-commerce/install-ai-commerce.html#2-configure-aifoundation).

Using a dedicated AI configuration for Search by Image is recommended because each named configuration is tracked separately in the AiFoundation audit log. This lets you isolate and review all AI calls made by the image search flow independently from other AI features in your project.

To use a dedicated AI model configuration for Search by Image instead of the default one, follow these steps:

1. In `config/Shared/config_ai.php`, add a named configuration entry using `AiCommerceConstants::SEARCH_BY_IMAGE_CONFIGURATION_NAME` as the key:

```php
$config[\Spryker\Shared\AiFoundation\AiFoundationConstants::AI_CONFIGURATIONS][\SprykerFeature\Shared\AiCommerce\AiCommerceConstants::SEARCH_BY_IMAGE_CONFIGURATION_NAME] = $openAiConfiguration;
```

2. Return the configuration name from `AiCommerceConfig`:

**src/Pyz/Yves/AiCommerce/AiCommerceConfig.php**

```php
<?php

namespace Pyz\Yves\AiCommerce;

use SprykerFeature\Shared\AiCommerce\AiCommerceConstants;
use SprykerFeature\Yves\AiCommerce\AiCommerceConfig as SprykerAiCommerceConfig;

class AiCommerceConfig extends SprykerAiCommerceConfig
{
    public function getSearchByImageAiConfigurationName(): ?string
    {
        return AiCommerceConstants::SEARCH_BY_IMAGE_CONFIGURATION_NAME;
    }
}
```

### 5) Sync configuration

Sync the Search by Image configuration to the database:

```bash
console configuration:sync
```

### 6) Enable the feature

Enable the feature in the Back Office:

1. In the Back Office, go to **AI Commerce&nbsp;<span aria-label="and then">></span>&nbsp;Search by Image&nbsp;<span aria-label="and then">></span>&nbsp;Search by Image**.
2. Turn on **Enable Search by Image**.
3. Set **Redirect type** to the desired behavior:
   - **Search results** — redirects the customer to the catalog search results page for the identified search term.
   - **First result product detail page** — redirects the customer directly to the product detail page of the first matching result.
4. Click **Save**.

![Search by Image configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/ai-commerce/search-by-image-config.png)

{% info_block warningBox "Verification" %}

On the Storefront, make sure the camera icon is visible next to the search bar.

{% endinfo_block %}

## Integrate the feature frontend

{% info_block infoBox "Note" %}

The Twig template changes in this section reflect the current implementation. These templates may be updated in future releases. Review the latest demo shop templates before applying them at the project level.

{% endinfo_block %}

### 1) Add icon sprites

{% info_block infoBox "Info" %}

Do this step only if you have overridden `icon-sprite.twig` in the `ShopUi` module at the project level. If you have not overridden this template, skip to [2) Update the search form template](#2-update-the-search-form-template).

{% endinfo_block %}

In `src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon-sprite/icon-sprite.twig`, add the following SVG symbol definitions inside the `{% raw %}{% block sprite %}{% endraw %}` block:

```twig
{% raw %}
<symbol id=":upload-image" viewBox="0 -960 960 960" fill="currentColor">
    <title id=":upload-image">Upload Image</title>
    <path d="M480-480ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h280v40h-280q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v510.76q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h510.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-280h40v280q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm46.15-144.62h418.46L560-476.92 440-325.38l-80-96.16-89.23 116.92ZM680-600v-80h-80v-40h80v-80h40v80h80v40h-80v80h-40Z"/>
</symbol>
<symbol id=":visual-search" viewBox="0 -960 960 960" fill="currentColor">
    <title id=":visual-search">Visual Search</title>
    <path d="M367-367q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm169.5-56.5Q560-447 560-480t-23.5-56.5Q513-560 480-560t-56.5 23.5Q400-513 400-480t23.5 56.5Q447-400 480-400t56.5-23.5ZM480-480ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z"/>
</symbol>
{% endraw %}
```

### 2) Update the search form template

{% info_block infoBox "Info" %}

Do this step only if you have overridden `search-form.twig` in the `ShopUi` module at the project level. If you have not overridden this template, skip to [3) Update the header template](#3-update-the-header-template).

{% endinfo_block %}

In `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/search-form/search-form.twig`, add the `ImageSearchAiWidget` inside the search input area. Place it after the `<input>` element and before the submit button:

```twig
{% raw %}
{% if data.byImage and widgetGlobalExists('ImageSearchAiWidget') %}
    <div class="{{ config.name }}__button {{ config.name }}-search">
        {% widget 'ImageSearchAiWidget' with {
            data: {
                dataSearchId: attributes['data-search-id'],
            },
        } only %}{% endwidget %}
    </div>
{% endif %}
{% endraw %}
```

### 3) Update the header template

{% info_block infoBox "Info" %}

Do this step only if you have overridden `header.twig` in the `ShopUi` module at the project level. If you have not overridden this template, skip to [4) Apply the frontend changes](#4-apply-the-frontend-changes).

{% endinfo_block %}

In `src/Pyz/Yves/ShopUi/Theme/default/components/organisms/header/header.twig`, pass `byImage: true` in the `data` block when including the search form molecule:

```twig
{% raw %}
{% include molecule('search-form', 'SearchPage') with {
    ...
    data: {
        byImage: true,
    },
} only %}
{% endraw %}
```

### 4) Apply the frontend changes

Apply the frontend changes:

```bash
docker/sdk cli npm install
docker/sdk cli console frontend:project:install-dependencies
docker/sdk cli console frontend:yves:build
```

{% info_block warningBox "Verification" %}

On the Storefront, make sure the camera icon is displayed next to the search bar. Click the icon, upload an image, and verify that you are redirected to either the search results page or the matching product detail page, depending on the configured redirect type.

{% endinfo_block %}
