## Install feature frontend

Follow the steps below to install the Product Comparison feature frontend.

### Prerequisites

Install the required features:

| NAME                        | VERSION          | INSTALLATION GUIDE                                                                                                                                                           |
|-----------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                  |
| Product                     | {{site.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/product-comparison:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                            |
|-------------------------|-----------------------------------------------|
| ProductComparisonPage   | vendor/spryker-shop/product-comparison-page   |
| ProductComparisonWidget | vendor/spryker-shop/product-comparison-widget |

{% endinfo_block %}

### 2) Add translations

Add translations as follows:

1. Append glossary for the feature:

```
TODO Add glossary
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 3) Set up router plugins

Register the following route provider plugins:

| PLUGIN                                   | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                            |
|------------------------------------------|---------------------------------------------------------------|---------------|------------------------------------------------------|
| ProductComparisonPageRouteProviderPlugin | Adds the product comparison routes to the Yves application.   |               | SprykerShop\Yves\ProductComparisonPage\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\ProductComparisonPage\Plugin\Router\ProductComparisonPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new ProductComparisonPageRouteProviderPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure product comparison page is available at `https://mysprykershop.com/product-comparison`.

{% endinfo_block %}

### 4) Set up widgets

Set up widgets as follows:

1. Register the following plugins to enable widgets:

| PLUGIN                             | SPECIFICATION                                                                | PREREQUISITES | NAMESPACE                                       |
|------------------------------------|------------------------------------------------------------------------------|---------------|-------------------------------------------------|
| AddToProductComparisonListWidget   | Displays the `Compare` button for adding product to product comparison list. |               | SprykerShop\Yves\ProductComparisonWidget\Widget |
| LinkToProductComparisonListWidget  | Displays link to Product Comparison page.                                    |               | SprykerShop\Yves\ProductComparisonWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductComparisonWidget\Widget\AddToProductComparisonListWidget;
use SprykerShop\Yves\ProductComparisonWidget\Widget\LinkToProductComparisonListWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            AddToProductComparisonListWidget::class,
            LinkToProductComparisonListWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Verify that the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET                            | VERIFICATION                                                                   |
|-----------------------------------|--------------------------------------------------------------------------------|
| AddToProductComparisonListWidget  | Go to the product details page and add a product to a product comparison list. |
| LinkToProductComparisonListWidget | In top navigation menu make sure that you see `Product comparison` menu item.  |

{% endinfo_block %}
