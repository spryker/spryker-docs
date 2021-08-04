---
title: Product Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/product-feature-integration
redirect_from:
  - /v2/docs/product-feature-integration
  - /v2/docs/en/product-feature-integration
---

{% info_block errorBox "Attention!" %}
 The following Feature Integration guide expects the basic feature to be in place. The current Feature Integration guide only adds the **Product Concrete Search Widget** functionality.
{% endinfo_block %}

## Install Feature Core

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name | Version |
|---|---|
| Spryker Core | 201903.0 |

### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:

```shell
composer require spryker-feature/product: "^201903.0" --update-with-dependencies 
```

{% info_block warningBox "Verification" %}
Make sure that the following module is installed:<table><thead><tr class="TableStyle-PatternedRows2-Head-Header1"><th class="TableStyle-PatternedRows2-HeadE-Regular-Header1">Module</th><th class="TableStyle-PatternedRows2-HeadD-Regular-Header1">Expected Directory</th></tr></thead><tbody><tr class="TableStyle-PatternedRows2-Body-LightRows"><td class="TableStyle-PatternedRows2-BodyB-Regular-LightRows">`ProductSearchWidget`</td><td class="TableStyle-PatternedRows2-BodyA-Regular-LightRows">`vendor/spryker-shop/product-search-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations

Append the glossary according to your configuration:

<details open>
    <summary>src/data/import/glossary.csv</summary>

```yaml
quick-order.input.placeholder,Search by SKU or Name,en_US
quick-order.input.placeholder,Suche per SKU oder Name,de_DE
product_quick_add_widget.form.quantity,"# Qty",en_US
product_quick_add_widget.form.quantity,"# Anzahl",de_DE
quick-order.search.no_results,Item cannot be found,en_US
quick-order.search.no_results,Das produkt konnte nicht gefunden werden.,de_DE 
  ```
<br>
</details>

Run the following console command to import data:
```shell
console data:import glossary 
```
{% info_block warningBox "Verification" %}
Make sure that the configured data are added to the `spy_glossary` table in the database.
{% endinfo_block %}

### 3) Set up Widgets
  
Register the following plugins to enable widgets:
|Plugin|Description|Prerequisites|Namespace|
|---|---|---|---|
|`ProductConcreteSearchWidget`|Allows customers to search for concrete products on the Cart page.|None|  `SprykerShop\Yves\ProductSearchWidget\Widget`|`ProductConcreteAddWidget`|Incorporates `ProductConcreteSearchWidget` and allows customers to search for concrete products and quickly add them to the Cart with the desired quantity.|None|`SprykerShop\Yves\ProductSearchWidget\Widget`|

<details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductSearchWidget\Widget\ProductConcreteAddWidget;
use SprykerShop\Yves\ProductSearchWidget\Widget\ProductConcreteSearchWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductConcreteSearchWidget::class,
            ProductConcreteAddWidget::class,
        ];
    }
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that the following widgets are registered:<table><thead><tr><th>Module</th><th>Test</th></tr></thead><tbody><tr><td>`ProductConcreteSearchWidget`</td><td>Go to the Cart page and make sure the "Quick add to Cart" section is present, so you can search for concrete products by typing their SKU.</td></tr><tr><td>`ProductConcreteAddWidget`</td><td>	Go to the Cart page and make sure the "Quick add to Cart" section is present, so you can add the found products to the Cart with the desired Quantity.</td></tr></tbody></table>
{% endinfo_block %}
