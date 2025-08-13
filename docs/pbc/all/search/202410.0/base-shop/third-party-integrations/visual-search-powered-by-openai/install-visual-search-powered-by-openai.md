---
title: Install Visual Search powered by OpenAI
description: Learn how to integrate the ImageSearchAi module into a Spryker project.
last_updated: Nov 12, 2024
template: feature-integration-guide-template
redirect_from:
---

Visual Search enables users to search across the product catalog by uploading an image. This document describes how to install Visual Search.


## Install the feature core

Follow the steps in the following sections to install the Visual Search feature core.

### Prerequisites

Install the required features:

| NAME    | VERSION          | INSTALLATION GUIDE                                                                                                                                              |
|---------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OpenAi  | {{page.version}} | [Integrate OpenAi](/docs/pbc/all/miscellaneous/{{page.version}}/third-party-integrations/open-ai/integrate-openai.html) |
| Catalog | {{page.version}} |                                                                                                                                                                 |

### 1) Install the required modules

Install the required module:

```bash
composer require spryker-eco/image-search-ai:"^0.1.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE        | EXPECTED DIRECTORY                 |
|---------------|------------------------------------|
| ImageSearchAi | vendor/spryker-eco/image-search-ai |

{% endinfo_block %}

### 2) Add translations

1. Append the glossary according to your configuration:

```csv

search.with.your-images.title,Search with your images,en_US
search.with.your-images.title,Bildern suchen,de_DE
search.with.your-images.content,Upload an image to find similar products,en_US
search.with.your-images.content,"Laden Sie ein Bild hoch, um ähnliche Produkte zu finden",de_DE
search.with.your-images.error,Something went wrong. Please try another image,en_US
search.with.your-images.error,Etwas ist schiefgelaufen. Bitte versuchen Sie es mit einem anderen Bild,de_DE
search.with.your-images.button,Upload an image,en_US
search.with.your-images.button,Bild hochladen,de_DE
search.with.your.images.photo.button,Take a photo,en_US
search.with.your.images.photo.button,Foto aufnehmen,de_DE
search.with.your-images.no-results,"No results found. Please try another image.",en_US
search.with.your-images.no-results,"Keine Ergebnisse gefunden. Bitte versuchen Sie es mit einem anderen Bild.",de_DE
```

### 3) Enable controllers

Register the following route providers on the Storefront:

| PROVIDER                         | NAMESPACE                                   |
|----------------------------------|---------------------------------------------|
| ImageSearchAiRouteProviderPlugin | SprykerEco\Yves\ImageSearchAi\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerEco\Yves\ImageSearchAi\Plugin\Router\ImageSearchAiRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new ImageSearchAiRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

To validate the route provider, send an empty POST request to `https://mysprykershop.com/search-ai/image` and make sure the `{"success": false}` JSON response with 400 code is returned.

{% endinfo_block %}

### 4) Set up widgets

1. To enable widgets, register the following plugins:

| PLUGIN              | SPECIFICATION                      | PREREQUISITES | NAMESPACE                            |
|---------------------|------------------------------------|---------------|--------------------------------------|
| ImageSearchAiWidget | Displays the image uploader popup. |               | SprykerEco\Yves\ImageSearchAi\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerEco\Yves\ImageSearchAi\Widget\ImageSearchAiWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ImageSearchAiWidget::class,
        ];
    }
}
```

## Integrate the feature frontend

1. Integrate the frontend part using the example integration in Demo Shops:
- [B2B](https://github.com/spryker-shop/b2b-demo-shop/pull/491/files)
- [B2C](https://github.com/spryker-shop/b2c-demo-shop/pull/544/files)
- [B2B Marketplace](https://github.com/spryker-shop/b2b-demo-marketplace/pull/438/files)
- [B2C Marketplace](https://github.com/spryker-shop/b2c-demo-marketplace/pull/422/files)

2. Apply the frontend changes:

```bash
npm install
console frontend:project:install-dependencies
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

On Storefront, make sure that you can upload a product image and obtain a product URL if the corresponding product is found.

{% endinfo_block %}
