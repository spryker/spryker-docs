

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place.

The current feature integration guide only adds the [Add product to cart from the Catalog page](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/cart-feature-overview/quick-order-from-the-catalog-page-overview.html) functionality.

{% endinfo_block %}

## Install feature core

Follow the steps below to install the core of the functionality.

### Prerequisites

Install the required features:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/cart {{page.version}} --update-with-dependencies
```

### 2) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
global.add-to-cart,In den Warenkorb,de_DE
global.add-to-cart,Add to Cart,en_US
cart_page.error_message.unexpected_error,Unexpected error occurred.,en_US
cart_page.error_message.unexpected_error,Ein unerwarteter Fehler aufgetreten.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that above keys and corresponding translations are present in the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the frontend of the functionality.

### Prerequisites

Install the required features:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

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

Navigate to the catalog and find an abstract product with a single concrete product. The button for adding this concrete product to the cart must be displayed on the catalog page.

{% endinfo_block %}
