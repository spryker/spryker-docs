This document describes how to install the Marketplace Product + Quick Add to Cart feature.

## Install feature frontend

Follow the steps below to install the Marketplace Product + Quick Add to Cart feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-------------------|-----------------|----------------|
| Marketplace Product | 202507.0 | [Install the Marketplace Product feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html)|
| Quick Add to Cart   | 202507.0 | [Install the Quick Add to Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-feature.html)              |

### Add translations

Add translations as follows:

1. Append glossary for the feature:

```yaml
merchant_search_widget.all_merchants,All Merchants,en_US
merchant_search_widget.all_merchants,Alle Händler,de_DE
merchant_search_widget.merchants,Merchants,en_US
merchant_search_widget.merchants,Händler,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}

### Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --------------- | ------------------ | ------------- | --------------- |
| MerchantSearchWidget | Provides a widget to render a merchants filter.  |   | SprykerShop\Yves\MerchantSearchWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantSearchWidget\Widget\MerchantSearchWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantSearchWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that Quick Order Page contains "Merchant Selector" dropdown with all active merchants.

Make sure that selected merchant reference affects search results while retrieving for product by name or sku.

{% endinfo_block %}

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
|--------------|---------------|---------------|-----------------|
| MerchantProductQuickOrderItemExpanderPlugin | Expands the provided `ItemTransfer` with merchant reference.|               | SprykerShop\Yves\MerchantProductWidget\Plugin\QuickOrderPage |

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\MerchantProductWidget\Plugin\QuickOrderPage\MerchantProductQuickOrderItemExpanderPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemExpanderPluginInterface>
     */
    protected function getQuickOrderItemTransferExpanderPlugins(): array
    {
        return [
            new MerchantProductQuickOrderItemExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that merchant related products are added to cart with the corresponding merchant in "Sold By" section.

{% endinfo_block %}
