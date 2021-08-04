---
title: Prices Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/prices-feature-integration
redirect_from:
  - /v3/docs/prices-feature-integration
  - /v3/docs/en/prices-feature-integration
---

{% info_block errorBox "Attention!" %}
The following Feature Integration Guide expects the basic feature to be in place. The current Feature Integration Guide only adds the **Volume Prices** functionality.
{% endinfo_block %}

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
|---|---|
| Spryker Core | 201907.0 |
| Prices | 201907.0 |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/prices: "^201907.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
    
Make sure that the following modules were installed:
    
 | Module | Expected Directory |
| --- | --- |
| `PriceProductVolume` | `vendor/spryker/price-product-volume` |
| `PriceProductDataImport` | `vendor/spryker/price-product-data-import` |
 
</div></section>

### 2) Set up Transfer Objects

Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
    
Make sure that the following changes in transfer objects:
    
| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `PriceProductVolume` | class |  created | `src/Generated/Shared/Transfer/PriceProductVolumeTransfer` |
| `PriceProductVolumeCollection` | class |  created | `src/Generated/Shared/Transfer/PriceProductVolumeCollectionTransfer` |
| `PriceProduct.volumeQuantity` | column |  added | `src/Generated/Shared/Transfer/PriceProductTransfer` |
| `ProductViewTransfer.currentPriceProduct` | column |  added | `src/Generated/Shared/Transfer/CurrentProductPriceTransfer` |   

</div></section> 

### 3) Import Data

#### Import Volume Prices

{% info_block infoBox "Note" %}
The following imported entities will be used as product volumes in Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

<details open>
<summary>src/data/import/product_price.csv</summary>

```yaml
abstract_sku,concrete_sku,price_type,store,currency,value_net,value_gross,price_data.volume_prices
193,,DEFAULT,DE,EUR,16195,17994,"[{""quantity"":5,""net_price"":150,""gross_price"":165}, {""quantity"":10,""net_price"":145,""gross_price"":158}, {""quantity"":20,""net_price"":140,""gross_price"":152}]"
195,,DEFAULT,DE,CHF,40848,45387,"[{""quantity"":3,""net_price"":350,""gross_price"":385}, {""quantity"":8,""net_price"":340,""gross_price"":375}]"
194,,DEFAULT,AT,EUR,20780,23089,"[{""quantity"":5,""net_price"":265,""gross_price"":295}, {""quantity"":10,""net_price"":275,""gross_price"":310}, {""quantity"":20,""net_price"":285,""gross_price"":320}]"
```
 <br>   
</details>

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
|---|---|---|---|---|
|  `abstract_sku` | optional | string | 193 | Either `abstract_sku` or `concrete_sku` should be present to attach the given prices to the correct product |
|  `concrete_sku` | optional | string | 117_29890338 | Either `abstract_sku` or `concrete_sku` should be present to attach the given prices to the correct product |
|  `price_type` | mandatory | string | DEFAULT |  |
|  `store` | mandatory | string | DE | Store in which the specific product has that specific price |
|  `currency` | mandatory | string | EUR | The currency in which the specific product has that specific price |
|  `value_net` | mandatory | integer | 10200 | The net (after tax) price in cents |
|  `value_gross` | mandatory | integer | 12000 | The gross (before tax) price in cents |
|  `price_data.volume_prices` | optional | json string |  `"[{""quantity"":5,""net_price"":150,""gross_price"":165}]"` | A json description of the prices when the quantity changes (volume based pricing). In the example given, the product bought, when it has a quantity of less than 5, it uses the normal price, but uses this Volume Price when the quantity is greater than 5 |

Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `PriceProductDataImportPlugin` | Imports demo product price data into the database. | None |  `Spryker\Zed\PriceProductDataImport\Communication\Plugin` |

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
<br>
</details>

Run the following console command to import data:

```bash
console data:import price-product
```

{% info_block warningBox "Verification" %}
Make sure that in the database that the configured data is added to the `spy_product_price` table.
{% endinfo_block %}

### 4) Set up Behavior

Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `PriceProductVolumeExtractorPlugin` | Provides the ability to extract Volume Prices from an array of `PriceProductTransfers` for abstract or concrete products to show them on Frontend side to the customer while buying. | None |  `Spryker\Client\PriceProductVolume\Plugin\PriceProductStorageExtension` |
|  `PriceProductVolumeExtractorPlugin` | Provides the ability to extract Volume Prices from an array of `PriceProductTransfers` for abstract or concrete products to validate prices when adding items to cart or to validate prices on the backend side. | None |  `Spryker\Zed\PriceProductVolume\Communication\Plugin\PriceProductExtension` |
|  `PriceProductVolumeFilterPlugin` | Provides the ability to decide, based on selected product quantity, which `PriceProduct` should be chosen based on the set Volume Prices. | None |  `Spryker\Service\PriceProductVolume\Plugin\PriceProductExtension` |

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
<br>
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
<br>
</details>


<details open>
<summary>src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php</summary>

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
<br>
</details>


{% info_block warningBox "Verification" %}
Go to the product detail page for a product with Volume Prices set, update the quantity to meet any of Volume Prices boundaries and check the price. Then add the product to the cart and if the price of the item in the Cart remains the same as it was on the Product Detail Page, the plugins are installed.
{% endinfo_block %}

## Install Feature Frontend

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name | Version |
|---|---|
| Spryker Core E-commerce | 201907.0 |
| Prices | 201907.0 |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/prices: "^201907.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">


**Verification**

Make sure that the following modules were installed:

| Module | Expected Directory |
| --- | --- |
| `PriceProductVolumeWidget` | `vendor/spryker-shop/price-product-volume-widget` |

</div></section>

### 2) Add Translations

Append glossary according to your configuration:

<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
page.detail.volume_price.quantity,Quantity,en_US
page.detail.volume_price.quantity,Anzahl,de_DE
page.detail.volume_price.price,Price,en_US
page.detail.volume_price.price,Preis,de_DE
```
<br>
</details>

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 3) Set up Widgets

Enable global widgets:

| Widget | Description | Namespace |
|---|---|---|
|  `ProductPriceVolumeWidget` | Shows a table of Volume Prices for a product that contains the columns: quantity and price for that quantity threshold. |  `SprykerShop\Yves\PriceProductVolumeWidget\Widget` |

<details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

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
<br>
</details>


<section contenteditable="false" class="warningBox"><div class="content">

**Verification**

Make sure that the following widgets were registered:

| Module | Test |
| --- | --- |
| `ProductPriceVolumeWidget` | Go to the product detail page for a product with Volume Prices set, and observe the table in the detail area that contains the Volume Prices data. |

</div></section>
