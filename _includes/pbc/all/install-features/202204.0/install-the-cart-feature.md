


{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place.

The current feature integration guide only adds the [Add product to the cart from the Catalog page](/docs/scos/user/features/{{page.version}}/cart-feature-overview/quick-order-from-the-catalog-page-overview.html) functionality.

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Cart feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INTEGRATION GUIDE|
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html)|

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/cart {{page.version}} --update-with-dependencies
```

### 2) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
global.add-to-cart,In den Warenkorb,de_DE
global.add-to-cart,Add to Cart,en_US
cart_page.error_message.unexpected_error,Unexpected error occurred.,en_US
cart_page.error_message.unexpected_error,Ein unerwarteter Fehler aufgetreten.,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the preceding keys and corresponding translations are present in the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Cart feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INTEGRATION GUIDE|
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html)|

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/cart {{page.version}} --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CartPage | vendor/spryker-shop/cart-page |

{% endinfo_block %}

### 2) Set up widgets

Register the following widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAbstractAddToCartButtonWidget | Displays a button for adding the product abstract to the cart in case the product is eligible. | None | SprykerShop\Yves\CartPage\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\CartPage\Widget\ProductAbstractAddToCartButtonWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductAbstractAddToCartButtonWidget::class,
        ];
    }
}
```

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Navigate to the catalog and find an abstract product with single concrete. You should see a button for adding this concrete product to the cart right from the catalog page.

{% endinfo_block %}
