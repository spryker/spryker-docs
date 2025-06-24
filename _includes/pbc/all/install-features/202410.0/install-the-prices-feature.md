

{% info_block errorBox "Attention!" %}

The following feature integration Guide expects the basic feature to be in place. The current feature integration Guide only adds the **Volume Prices** functionality and `PriceProductWidget`.

{% endinfo_block %}

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
|---|---|
| Spryker Core | {{page.version}} |
| Prices | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/prices: "^{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| NAME | VERSION |
| --- | --- |
| PriceProductVolume | vendor/spryker/price-product-volume |
| PriceProductDataImport | vendor/spryker/price-product-data-import |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| PriceProductVolume | class |  created | src/Generated/Shared/Transfer/PriceProductVolumeTransfer |
| PriceProductVolumeCollection | class |  created | src/Generated/Shared/Transfer/PriceProductVolumeCollectionTransfer |
| PriceProduct.volumeQuantity | column |  added | src/Generated/Shared/Transfer/PriceProductTransfer |
| ProductViewTransfer.currentPriceProduct | column |  added | src/Generated/Shared/Transfer/CurrentProductPriceTransfer |

{% endinfo_block %}

### 3) Import data

#### Import volume prices

{% info_block infoBox "Note" %}

The following imported entities will be used as product volumes in Spryker OS.

{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

**src/data/import/product_price.csv**

```yaml
abstract_sku,concrete_sku,price_type,store,currency,value_net,value_gross,price_data.volume_prices
193,,DEFAULT,DE,EUR,16195,17994,"[{""quantity"":5,""net_price"":150,""gross_price"":165}, {""quantity"":10,""net_price"":145,""gross_price"":158}, {""quantity"":20,""net_price"":140,""gross_price"":152}]"
195,,DEFAULT,DE,CHF,40848,45387,"[{""quantity"":3,""net_price"":350,""gross_price"":385}, {""quantity"":8,""net_price"":340,""gross_price"":375}]"
194,,DEFAULT,AT,EUR,20780,23089,"[{""quantity"":5,""net_price"":265,""gross_price"":295}, {""quantity"":10,""net_price"":275,""gross_price"":310}, {""quantity"":20,""net_price"":285,""gross_price"":320}]"
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|---|---|---|---|---|
|  abstract_sku | optional | string | 193 | Either `abstract_sku` or `concrete_sku` should be present to attach the given prices to the correct product |
|  concrete_sku | optional | string | 117_29890338 | Either `abstract_sku` or `concrete_sku` should be present to attach the given prices to the correct product |
|  price_type | ✓ | string | DEFAULT |  |
|  store | ✓ | string | DE | Store in which the specific product has that specific price |
|  currency | ✓ | string | EUR | The currency in which the specific product has that specific price |
|  value_net | ✓ | integer | 10200 | The net (before tax) price in cents |
|  value_gross | ✓ | integer | 12000 | The gross (after tax) price in cents |
|  price_data.volume_prices | optional | json string |  `"[{""quantity"":5,""net_price"":150,""gross_price"":165}]"` | A json description of the prices when the quantity changes (volume based pricing). In the example given, the product bought, when it has a quantity of less than 5, it uses the normal price, but uses this Volume Price when the quantity is greater than 5 |

Register the following plugin to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| PriceProductDataImportPlugin | Imports demo product price data into the database. | None |  Spryker\Zed\PriceProductDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\PriceProductDataImport\Communication\Plugin\PriceProductDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new PriceProductDataImportPlugin(),
        ];
    }
}
```

Import data:

```bash
console data:import price-product
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured data is added to the `spy_product_price` table.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|  PriceProductVolumeExtractorPlugin | Provides the ability to extract Volume Prices from an array of `PriceProductTransfers` for abstract or concrete products to show them on Frontend side to the customer while buying. | None |  Spryker\Client\PriceProductVolume\Plugin\PriceProductStorageExtension |
|  PriceProductVolumeExtractorPlugin | Provides the ability to extract Volume Prices from an array of `PriceProductTransfers` for abstract or concrete products to validate prices when adding items to cart or to validate prices on the backend side. | None |  Spryker\Zed\PriceProductVolume\Communication\Plugin\PriceProductExtension |
|  PriceProductVolumeFilterPlugin | Provides the ability to decide, based on selected product quantity, which `PriceProduct` should be chosen based on the set Volume Prices. | None |  Spryker\Service\PriceProductVolume\Plugin\PriceProductExtension |

**src/Pyz/Zed/PriceProduct/PriceProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PriceProduct;

use Spryker\Zed\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Zed\PriceProductVolume\Communication\Plugin\PriceProductExtension\PriceProductVolumeExtractorPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * @return \Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceProductReaderPricesExtractorPluginInterface[]
     */
    protected function getPriceProductPricesExtractorPlugins(): array
    {
        return [
            new PriceProductVolumeExtractorPlugin(),
        ];
    }
}
```

**src/Pyz/Client/PriceProductStorage/PriceProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PriceProductStorage;

use Spryker\Client\PriceProductStorage\PriceProductStorageDependencyProvider as SprykerPriceProductStorageDependencyProvider;
use Spryker\Client\PriceProductVolume\Plugin\PriceProductStorageExtension\PriceProductVolumeExtractorPlugin;

class PriceProductStorageDependencyProvider extends SprykerPriceProductStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePricesExtractorPluginInterface[]
     */
    protected function getPriceProductPricesExtractorPlugins(): array
    {
        return [
            new PriceProductVolumeExtractorPlugin(),
        ];
    }
}
```

**src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php**

```php
<?php

namespace Pyz\Service\PriceProduct;

use Spryker\Service\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Service\PriceProductVolume\Plugin\PriceProductExtension\PriceProductVolumeFilterPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface[]
     */
    protected function getPriceProductDecisionPlugins(): array
    {
        return array_merge([
            new PriceProductVolumeFilterPlugin(),
        ], parent::getPriceProductDecisionPlugins());
    }
}
```

{% info_block warningBox "Verification" %}

Go to the product detail page for a product with Volume Prices set, update the quantity to meet any of Volume Prices boundaries and check the price. Then add the product to the cart and if the price of the item in the Cart remains the same as it was on the Product Detail Page, the plugins are installed.

{% endinfo_block %}

## Install feature frontend

### Prerequisites

Install the following required features:

| NAME | VERSION |
|---|---|
| Spryker Core E-commerce | {{page.version}} |
| Prices | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/prices: "^{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| PriceProductVolumeWidget | vendor/spryker-shop/price-product-volume-widget |
| PriceProductWidget | vendor/spryker-shop/price-product-widget |

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
page.detail.volume_price.quantity,Quantity,en_US
page.detail.volume_price.quantity,Anzahl,de_DE
page.detail.volume_price.price,Price,en_US
page.detail.volume_price.price,Preis,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up widgets

Enable global widgets:

| WIDGET | DESCRIPTION | NAMESPACE |
|---|---|---|
| ProductPriceVolumeWidget | Shows a table of Volume Prices for a product that contains the columns: quantity and price for that quantity threshold. |  SprykerShop\Yves\PriceProductVolumeWidget\Widget |
| PriceProductWidget | Shows price of a concrete product. |  SprykerShop\Yves\PriceProductWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\PriceProductVolumeWidget\Widget\ProductPriceVolumeWidget;
use SprykerShop\Yves\PriceProductWidget\Widget\PriceProductWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductPriceVolumeWidget::class,
            PriceProductWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following widgets were registered:

| MODULE | TEST |
| --- | --- |
| ProductPriceVolumeWidget | Go to the product detail page for a product with Volume Prices set, and observe the table in the detail area that contains the Volume Prices data. |
| PriceProductWidget | Could be checked on a slot configurator page of a [Configurable Bundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-bundle-feature-overview.html) feature. |

{% endinfo_block %}
