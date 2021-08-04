---
title: Volume Prices Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/volume-prices-feature-integration
redirect_from:
  - /v1/docs/volume-prices-feature-integration
  - /v1/docs/en/volume-prices-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 2018.11.0 |
| Prices | 2018.11.0 |

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**

Make sure that the following modules have been installed:

| Module | Expected directory |
| --- | --- |
| `PriceProductVolume` | `vendor/spryker/price-product-volume` |

</div></section>

### 1) Set up Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
```
<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following changes  in transfer objects have been applied:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `MoneyValue` | class | created | `src/Generated/Shared/Transfer/MoneyValueTransfer` |
| `PriceProduct` |class  |created  | `src/Generated/Shared/Transfer/PriceProductTransfer` |
| `PriceProductVolume` |class  | created | `src/Generated/Shared/Transfer/PriceProductVolumeTransfer` |
| `PriceProductVolumeCollection` |class  | created |`src/Generated/Shared/Transfer/PriceProductVolumeCollectionTransfer`  |
| `PriceProductFilter` |class  | created | `src/Generated/Shared/Transfer/PriceProductFilterTransfer` |
| `PriceProductCriteria` | class | created | `src/Generated/Shared/Transfer/PriceProductCriteriaTransfer` |

</div></section>

### 2) Import Data
#### Import Volume Prices

{% info_block infoBox "Info" %}
The following imported entities will be used as _productvol_ in Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

<details open>
<summary>src/data/import/product_price.csv</summary>

```bash
abstract_sku,concrete_sku,price_type,store,currency,value_net,value_gross,price_data.volume_prices
193,,DEFAULT,DE,EUR,16195,17994,"[{""quantity"":5,""net_price"":150,""gross_price"":165}, {""quantity"":10,""net_price"":145,""gross_price"":158}, {""quantity"":20,""net_price"":140,""gross_price"":152}]"
195,,DEFAULT,DE,CHF,40848,45387,"[{""quantity"":3,""net_price"":350,""gross_price"":385}, {""quantity"":8,""net_price"":340,""gross_price"":375}]"
194,,DEFAULT,AT,EUR,20780,23089,"[{""quantity"":5,""net_price"":265,""gross_price"":295}, {""quantity"":10,""net_price"":275,""gross_price"":310}, {""quantity"":20,""net_price"":285,""gross_price"":320}]"
```

</br>
</details>
  
|  Column| Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| `abstract_sku` | optional | string | 193 | Either `abstract_sku` or `concrete_sku` should be present to attach the given prices to the correct product. |
| `concrete_sku` | optional | string | 117_29890338 |Either `abstract_sku` or `concrete_sku` should be present to attach the given prices to the correct product.  |
| `price_type` | mandatory |string  | DEFAULT | None |
| `store` |mandatory  | string |DE  |Store in which the specific product has that specific price.  |
|`currency`  | mandatory |string  | EUR | Currency in which the specific product has that specific price. |
| `value_net` | mandatory | integer |10200  | Net (after tax is paid) price in cents. |
| `value_gross` | mandatory | integer |12000  | Gross (before tax is paid) price in cents. |
|`price_data.volume_prices` | optional| json string|`"[{""quantity"":5,""net_price"":150,""gross_price"":165}]"` |A json description of prices when the quantity changes (volume based pricing). In the example given, the product bought, when it has a quantity of less than 5, it uses the normal price, but uses this volume price when the quantity is greater than 5. |

Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PriceProductDataImportPlugin` | Imports demo product price data into the database. | None | `Spryker\Zed\PriceProductDataImport\Communication\Plugin` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

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

</br>
</details>

Run the following console command to import data:

```bash
console data:import price-product
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data has been added to the `spy_product_price` table.
{% endinfo_block %}

### 3) Set up Behavior
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PriceProductVolumeExtractorPlugin` | Provides the ability to extract volume prices from an array of `PriceProductTransfers` for abstract or concrete products to show them on Frontend side to the customer while buying. | None | `Spryker\Client\PriceProductVolume\Plugin\PriceProductStorageExtension` |
| `PriceProductVolumeExtractorPlugin` | Provides the ability to extract volume prices from an array of `PriceProductTransfers` for abstract or concrete products to validate prices when adding items to cart or to validate prices on the backend side. | None | `Spryker\Zed\PriceProductVolume\Communication\Plugin\PriceProductExtension` |
| `PriceProductVolumeFilterPlugin` |Provides the ability to decide, based on selected product quantity, which `PriceProduct` should be chosen based on the set volume prices.  | None | `Spryker\Service\PriceProductVolume\Plugin\PriceProductExtension` |

<details open>
<summary>src/Pyz/Zed/PriceProduct/PriceProductDependencyProvider.php</summary>

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

</br>
</details>

<details open>
<summary>src/Pyz/Client/PriceProductStorage/PriceProductStorageDependencyProvider.php</summary>

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

</br>
</details>

<details open>
<summary>src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

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

</br>
</details>

## Install Feature Frontend

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core E-commerce |2018.11.0  |
| Prices | 2018.11.0 |

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following modules have been installed:

| Module | Expected directory |
| --- | --- |
|`PriceProductVolumeWidget`  |`vendor/spryker-shop/price-product-volume-widget`  |

</div></section>

### 1) Add Translations
Append glossary according to your configuration:

src/data/import/glossary.csv

```bash
page.detail.volume_price.quantity,Quantity,en_US
page.detail.volume_price.quantity,Anzahl,de_DE
page.detail.volume_price.price,Price,en_US
page.detail.volume_price.price,Preis,de_DE
```

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data has been added to the `spy_glossary` table.
{% endinfo_block %}

### 2) Set up Widgets
Enable global widgets:

| Widget | Description | Namespace |
| --- | --- | --- |
| `ProductPriceVolumeWidget` | Shows a table of volume prices for a product that contains the columns: quantity and price for that quantity threshold. | `SprykerShop\Yves\PriceProductVolumeWidget\Widget` |

src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\PriceProductVolumeWidget\Widget\ProductPriceVolumeWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			ProductPriceVolumeWidget::class,
		];
	}
}
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following widgets have been registered:

| Module | Test |
| --- | --- |
| `ProductPriceVolumeWidget` | Go to the product detail page for a product with volume prices set, and observe the table in the detail area that contains the volume prices data. |

</div></section>

<!-- Last review date: Dec 06, 2018 -->

[//]: # (by Ahmed Sabaa, Yuliia Boiko)
