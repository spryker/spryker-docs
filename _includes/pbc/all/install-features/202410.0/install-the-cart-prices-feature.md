


## Install feature core

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds the *Cart Prices functionality*.

{% endinfo_block %}

### Prerequisites

Install the required features:

| NAME                                        | VERSION          |        REQUIRED |    INSTALLATION GUIDE                                                                                                                                                 |
|---------------------------------------------|------------------|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Cart                                        | {{site.version}} |       v         |[Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                                            |
| Prices                                      | {{site.version}} |          v         |[Install the Prices feature](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html)              |
| Marketplace Product Offer Prices  | {{site.version}} |                 |  [Install the Marketplace Product Offer Prices feature](/docs/pbc/all/price-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-prices-feature.html) |

### 1) Install the required modules

```bash
composer require spryker/price-cart-connector:"^6.9.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE             | EXPECTED DIRECTORY                   |
|--------------------|--------------------------------------|
| PriceCartConnector | vendor/spryker/price-cart-connector  |

{% endinfo_block %}

### 2) Set up configuration

Set up the following configuration:

**src/Pyz/Zed/PriceCartConnector/PriceCartConnectorConfig.php**
```php
<?php

namespace Pyz\Zed\PriceCartConnector;

use Spryker\Zed\PriceCartConnector\PriceCartConnectorConfig as SprykerPriceCartConnectorConfig;

class PriceCartConnectorConfig extends SprykerPriceCartConnectorConfig
{
    /**
     * @var bool
     */
    protected const IS_ZERO_PRICE_ENABLED_FOR_CART_ACTIONS = false;
    
    /**
     * @return list<string>
     */
    public function getItemFieldsForIdentifier(): array
    {
        return array_merge(parent::getItemFieldsForIdentifier(), [
            ItemTransfer::SKU,
            ItemTransfer::QUANTITY,
            ...
        ]);
    }
}
```

If `IS_ZERO_PRICE_ENABLED_FOR_CART_ACTIONS=false` while attempting to add the product with zero price to the cart, you get the following message: "Price in selected currency not found for product with sku '%sku%'. Change the currency or remove product from order."

The `PriceCartConnectorConfig::getItemFieldsForIdentifier()` lets you set up a list of fields that are used to build item identifiers. Based on generated identifiers, the system can recognize duplicate items and perform requests only for unique items.

{% info_block warningBox "Warning" %}

Apply the following changes only if you have the [Marketplace Product Offer Prices](/docs/pbc/all/price-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-prices-feature.html) feature installed.

{% endinfo_block %}

**src/Pyz/Zed/PriceCartConnector/PriceCartConnectorConfig.php**
```php
<?php

namespace Pyz\Zed\PriceCartConnector;

use Spryker\Zed\PriceCartConnector\PriceCartConnectorConfig as SprykerPriceCartConnectorConfig;

class PriceCartConnectorConfig extends SprykerPriceCartConnectorConfig
{
    ...

    /**
     * @return list<string>
     */
    public function getItemFieldsForIdentifier(): array
    {
        return array_merge(parent::getItemFieldsForIdentifier(), [
            ItemTransfer::SKU,
            ItemTransfer::QUANTITY,
            ItemTransfer::MERCHANT_REFERENCE,
            ItemTransfer::PRODUCT_OFFER_REFERENCE,
        ]);
    }
}
```

### 3) Generate transfer objects

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                  | TYPE  | EVENT   | PATH                                                       |
|---------------------------|-------|---------|------------------------------------------------------------|
| Item                      | class | created | src/Generated/Shared/Transfer/ItemTransfer                 |
| Quote                     | class | created | src/Generated/Shared/Transfer/QuoteTransfer                |
| Store                     | class | created | src/Generated/Shared/Transfer/StoreTransfer                |
| PriceProductFilter        | class | created | src/Generated/Shared/Transfer/PriceProductFilterTransfer   |
| CartChange                | class | created | src/Generated/Shared/Transfer/CartChangeTransfer           |
| CartPreCheckResponse      | class | created | src/Generated/Shared/Transfer/CartPreCheckResponseTransfer |
| Message                   | class | created | src/Generated/Shared/Transfer/MessageTransfer              |
| PriceProduct              | class | created | src/Generated/Shared/Transfer/PriceProductTransfer         |
| Currency                  | class | created | src/Generated/Shared/Transfer/CurrencyTransfer             |
| MoneyValue                | class | created | src/Generated/Shared/Transfer/MoneyValueTransfer           |
| CartItemQuantity          | class | created | src/Generated/Shared/Transfer/CartItemQuantityTransfer     |

{% endinfo_block %}

### 4) Set up behavior

Register the following plugins:

| PLUGIN                                      | SPECIFICATION                                                                                                  | PREREQUISITES | NAMESPACE                                                |
|---------------------------------------------|----------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------|
| CartItemPricePlugin                         | Adds product prices to item, based on currency, price mode, and price type.                                     | None          | Spryker\Zed\PriceCartConnector\Communication\Plugin      |
| CartItemPricePreCheckPlugin                 | Validates product prices, checks if prices are valid for current currency, price mode, and price type combination. | None          | Spryker\Zed\PriceCartConnector\Communication\Plugin      |
| FilterItemsWithoutPricePlugin               | Removes quote items without price.                                                                             | None          | Spryker\Zed\PriceCartConnector\Communication\Plugin      |
| SanitizeSourcePricesQuoteLockPreResetPlugin | Sanitizes source prices in quote items.                                                                        | None          | Spryker\Zed\PriceCartConnector\Communication\Plugin\Cart |

<details><summary>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\PriceCartConnector\Communication\Plugin\Cart\SanitizeSourcePricesQuoteLockPreResetPlugin;
use Spryker\Zed\PriceCartConnector\Communication\Plugin\CartItemPricePlugin;
use Spryker\Zed\PriceCartConnector\Communication\Plugin\CartItemPricePreCheckPlugin;
use Spryker\Zed\PriceCartConnector\Communication\Plugin\FilterItemsWithoutPricePlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
           new CartItemPricePlugin(),
        ];
    }
	
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface>
     */
    protected function getCartPreCheckPlugins(Container $container): array
    {
        return [
            new CartItemPricePreCheckPlugin(),
        ];
    }
	
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface>
     */
    protected function getPreReloadPlugins(Container $container): array
    {
        return [
            new FilterItemsWithoutPricePlugin(),
        ];
    }
	
    /**
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\QuoteLockPreResetPluginInterface>
     */
    protected function getQuoteLockPreResetPlugins(): array
    {
        return [
            new SanitizeSourcePricesQuoteLockPreResetPlugin(),
        ];
    }
}
```
</details>
