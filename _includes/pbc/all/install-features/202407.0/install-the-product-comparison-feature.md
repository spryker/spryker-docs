This document describes how to install the Product Comparison feature.


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
product_comparison_page.page_title,Artikel vergleichen,de_DE
product_comparison_page.page_title,Compare products,en_US
product_comparison_page.empty_comparison,Vergleichsliste ist leer.,de_DE
product_comparison_page.empty_comparison,Comparison list is empty.,en_US
product_comparison_page.clear-compare-list,Vergleichsliste leeren,de_DE
product_comparison_page.clear-compare-list,Clear the comparison list,en_US
product_comparison_page.add_to_comparison-list,Vergleichen,de_DE
product_comparison_page.add_to_comparison-list,Compare,en_US
product_comparison_page.remove_from_comparison-list,Aus Vergleich entfernen,de_DE
product_comparison_page.remove_from_comparison-list,Remove from Compare,en_US
product_comparison_page.list_link,Artikelvergleich,de_DE
product_comparison_page.list_link,Product comparison,en_US
product_comparison_page.add_to_comparison.success,Zum Vergleich hinzugefügt,de_DE
product_comparison_page.add_to_comparison.success,Added to comparison,en_US
product_comparison_page.add_to_comparison.error.max,Das Limit ist bereits erreicht,de_DE
product_comparison_page.add_to_comparison.error.max,The limit has already been reached,en_US
product_comparison_page.removed_from_the_list,Artikel wurde aus der Vergleichsliste entfernt.,de_DE
product_comparison_page.removed_from_the_list,Product was removed from the comparison list.,en_US
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

Make sure the product comparison page is available at `https://mysprykershop.com/product-comparison`.

{% endinfo_block %}

### 4) Set up widgets

Set up widgets as follows:

1. Register the following plugins to enable widgets:

| PLUGIN                                       | SPECIFICATION                                                                                                                  | PREREQUISITES | NAMESPACE                                       |
|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------|
| ComparisonProductTogglerComparisonListWidget | Displays the **Compare** and **Remove from Compare** buttons for adding and removing a product from the comparison list. |               | SprykerShop\Yves\ProductComparisonWidget\Widget |
| LinkToProductComparisonListWidget            | Displays a link to the Product Comparison page.                                                                                      |               | SprykerShop\Yves\ProductComparisonWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductComparisonWidget\Widget\ComparisonProductTogglerComparisonListWidget;
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
            ComparisonProductTogglerComparisonListWidget::class,
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

| WIDGET                                       | VERIFICATION                                                                   |
|----------------------------------------------|--------------------------------------------------------------------------------|
| ComparisonProductTogglerComparisonListWidget | Make sure that, on the product details page, you can add a product to a product comparison list. |
| LinkToProductComparisonListWidget            | Make sure that the `Product comparison` menu item is displayed in the menu bar.  |

{% endinfo_block %}
