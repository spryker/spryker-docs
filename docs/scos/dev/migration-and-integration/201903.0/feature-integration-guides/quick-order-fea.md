---
title: Quick Order Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/quick-order-feature-integration
redirect_from:
  - /v2/docs/quick-order-feature-integration
  - /v2/docs/en/quick-order-feature-integration
---


## Install Feature Core
### Prerequisites
To start the feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core E-commerce |201903.0  |
|  Cart|201903.0  |
| Product |201903.0  |
| Checkout |  201903.0|

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/quick-add-to-cart:"^201903.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following modules were installed:

|Module|Expected Directory|
|---|---|
|`QuickOrder`|`vendor/spryker/quick-order`|
</div></section>

### 2) Set up Transfer Objects

Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following changes have been applied in transfer objects:

|Transfer|Type|Event|Path|
|---|---|---|---|
|`QuickOrderTransfer`|class|created|`src/Generated/Shared/Transfer/QuickOrderTransfer`|
|`QuickOrderItemTransfer`|class|created|`src/Generated/Shared/Transfer/QuickOrderItemTransfer`|
</div></section>

### 3) Add Translations
Feature-specific glossary keys:

<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
quick-order.upload-order.errors.upload-order-invalid-sku-item,Product with this SKU is not found.,en_US
quick-order.upload-order.errors.upload-order-invalid-sku-item,Produkt mit dieser SKU wurde nicht gefunden.,de_DE
price_product.error.price_not_found,Product price not found.,en_US
price_product.error.price_not_found,Produktpreis nicht gefunden.,de_DE
product_discontinued.message.product_discontinued,"Product is discontinued, please choose an alternative one.",en_US
product_discontinued.message.product_discontinued,"Produkt ist nicht mehr verfügbar, bitte wählen Sie eine Alternative.",de_DE
product-quantity.warning.quantity.min.failed,The ordered quantity was adjusted to the next possible quantity for the article because minimum quantity is %min%.,en_US
product-quantity.warning.quantity.min.failed,Die bestellte Anzahl erfüllt nicht die Anforderungen für dieses Produkt. Mindestanzahl ist %min%.,de_DE
product-quantity.warning.quantity.max.failed,The ordered quantity was adjusted to the next possible quantity for the article because maximum quantity is %max%.,en_US
product-quantity.warning.quantity.max.failed,Die bestellte Anzahl erfüllt nicht die Anforderungen für dieses Produkt. Maximalanzahl ist %max%.,de_DE
product-quantity.warning.quantity.interval.failed,The ordered quantity was adjusted to the next possible quantity for the article because quantity step is %step%.,en_US
product-quantity.warning.quantity.interval.failed,Die bestellte Anzahl erfüllt nicht die Anforderungen für dieses Produkt. Intervallgröße ist %step%.,de_DE
```
</br>
</details>

Run the following command to import glossary changes:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data is added to the `spy_glossary` table.
{% endinfo_block %}

### 4) Set up Behavior

#### Set up additional functionality

Enable the following behaviors by registering the plugins:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`ProductPriceItemValidatorPlugin`|Checks if the provided product SKU has the price, if no - adds the error message.|None|`Spryker\Client\PriceProductStorage\Plugin\QuickOrder`|

<details open>
<summary>src/Pyz/Client/QuickOrder/QuickOrderDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Client\QuickOrder;

use Spryker\Client\PriceProductStorage\Plugin\QuickOrder\ProductPriceItemValidatorPlugin;
use Spryker\Client\QuickOrder\QuickOrderDependencyProvider as SprykerQuickOrderDependencyProvider;

class QuickOrderDependencyProvider extends SprykerQuickOrderDependencyProvider
{
	/**
	* @return \Spryker\Client\QuickOrderExtension\Dependency\Plugin\ItemValidatorPluginInterface[]
	*/
	protected function getQuickOrderBuildItemValidatorPlugins(): array
	{
		return [
			new ProductPriceItemValidatorPlugin(),
		];
	}
}
```
</br>
</details>

{% info_block warningBox "Verification" %}
Make the following checks at https://mysprykershop.com/quick-order : `ProductPriceItemValidatorPlugin` is responsible for prices. Provide SKUs with and without Volume **Price on Quick Add To Cart** page and verify if quantity changes in the row result in the correct price display.
{% endinfo_block %}

## Install Feature Frontend

### Prerequisites
To start feature integration, review and install the necessary features:

|Name|Version|
|---|---|
|Spryker Core|201903.0|
|Cart|201903.0|
|Product|201903.0|
|Checkout|201903.0|

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/quick-add-to-cart:"^201903.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following modules were installed:

|Module	Expected|Directory|
|---|---|
|`QuickOrderPage`|`vendor/spryker-shop/quick-order-page`|
</div></section>

### 2) Add Translations

Feature-specific glossary keys:

<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
quick-order.page-title,Quick Order,en_US
quick-order.page-title,Schnellbestellung,de_DE
quick-order.input-label.qty,"# Qty",en_US
quick-order.input-label.qty,"# Anzahl",de_DE
quick-order.input-label.sku,SKU,en_US
quick-order.input-label.sku,Artikelnummer,de_DE
quick-order.button.add-more-rows,Add More Rows,en_US
quick-order.button.add-more-rows,Reihen hinzufügen,de_DE
quick-order.button.create-order,Create Order,en_US
quick-order.button.create-order,Bestellen,de_DE
quick-order.button.clear-all-rows,Clear All Rows,en_US
quick-order.button.clear-all-rows,Eingabe löschen,de_DE
quick-order.message.success.the-form-items-have-been-successfully-cleared,The form items have been successfully cleared.,en_US
quick-order.message.success.the-form-items-have-been-successfully-cleared,Eingegebene Daten wurden erfolgreich gelöscht.,de_DE
quick-order.errors.items-required,Please enter at least one product SKU,en_US
quick-order.errors.items-required,Bitte geben Sie mindestens eine Produkt-Artikelnummer,de_DE
quick-order.errors.quantity-required,Quantity must be at least 1,en_US
quick-order.errors.quantity-required,Die Anzahl muss mindestens 1 sein,de_DE
quick-order.errors.quantity-invalid,Entered quantity value is invalid. Quantity was adjusted to the next possible valid value.,en_US
quick-order.errors.quantity-invalid,Der eingegebene Mengenwert ist ungültig. Die Menge wurde an den nächstmöglichen gültigen Wert angepasst.,de_DE
quick-order.paste-order.title,Paste your order,en_US
quick-order.paste-order.title,Bestellung einfügen,de_DE
quick-order.paste-order.description,"Copy and paste your order with the item # and quantity separated by spaces, semicolons or commas. One sku per line.",en_US
quick-order.paste-order.description,"Kopieren Sie und fügen Sie Ihre Bestellung bestehend aus Artikel # und Anzahl, getrennt durch Leerzeichen, Semikolon oder Komma, hier ein. Eine Artikel # pro Reihe.",de_DE
quick-order.paste-order.input-placeholder.copy-paste-order,Paste your order here,en_US
quick-order.paste-order.input-placeholder.copy-paste-order,Bestellung hier einfügen,de_DE
quick-order.paste-order.button.verify,Verify,en_US
quick-order.paste-order.button.verify,Prüfen,de_DE
quick-order.paste-order.errors.text-order-format-incorrect,"Order format is incorrect.",en_US
quick-order.paste-order.errors.text-order-format-incorrect,"Falsches Bestellungsformat.",de_DE
quick-order.paste-order.errors.parser.separator-not-detected,"Separator is not defined.",en_US
quick-order.paste-order.errors.parser.separator-not-detected,"Trennzeichen nicht definiert.",de_DE
quick-order.file-upload-order.title,Upload your order,en_US
quick-order.file-upload-order.title,Bestellung hochladen,de_DE
quick-order.file-upload-order.description,Choose file,en_US
quick-order.file-upload-order.description,Datei auswählen,de_DE
quick-order.file-upload-order.success-message,File successfully uploaded,en_US
quick-order.file-upload-order.success-message,Datei erfolgreich hochgeladen,de_DE
quick-order.file-upload-order.error-message,File could not be uploaded. Click here %url% to download the csv template,en_US
quick-order.file-upload-order.error-message,Datei konnte nich hochgeladen werden. Hier klicken %url% um das csv Vorlage,de_DE
quick-order.file-upload-order.file-template-download-message,Click here to download a %template% template,en_US
quick-order.file-upload-order.file-template-download-message,Hier klicken für das %template% Vorlage,de_DE
quick-order.file-upload-order.button.upload,Upload,en_US
quick-order.file-upload-order.button.upload,Hochladen,de_DE
quick-order.upload-order.errors.upload-order-invalid-mime-type,Invalid file type.,en_US
quick-order.upload-order.errors.upload-order-invalid-mime-type,Ungültiger Dateityp.,de_DE
quick-order.upload-order.errors.upload-order-invalid-amount-of-rows,"To many rows, file can’t be processed.",en_US
quick-order.upload-order.errors.upload-order-invalid-amount-of-rows,"Zu viele Zeilen, die Datei kann nicht bearbeitet werden.",de_DE
quick-order.upload-order.errors.upload-order-invalid-format,Invalid format.,en_US
quick-order.upload-order.errors.upload-order-invalid-format,Ungültiges Format.,de_DE
quick-order.upload-order.errors.upload-order-no-file,There was no file added.,en_US
quick-order.upload-order.errors.upload-order-no-file,Es wurde keine Datei hinzugefügt.,de_DE
quick-order.input-label.sku.name,SKU or Name,en_US
quick-order.input-label.sku.name,SKU oder Name,de_DE
quick-order.input.placeholder,Search by SKU or Name,en_US
quick-order.input.placeholder,Suche per SKU oder Name,de_DE
quick-order.input-label.measurement_unit,Measuring Unit,en_US
quick-order.input-label.measurement_unit,Maßeinheit,de_DE
quick-order.input-label.price,Price,en_US
quick-order.input-label.price,Preis,de_DE
quick-order.search.no_results,Item cannot be found,en_US
quick-order.search.no_results,Das produkt konnte nicht gefunden werden.,de_DE
quick-order.input-quantity.message.error,Die bestellte Anzahl wurde auf die nächstmögliche Anzahl für diesen Artikel angepasst.,de_DE
quick-order.input-quantity.message.error,The ordered quantity was adjusted to the next possible quantity for the article.,en_US
```
</br>
</details>

Run the following command to import glossary changes:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}
Make sure that translations data was added to the `spy_glossary` table in the database.
{% endinfo_block %}

### 3) Enable Controllers

#### Controller Provider List

Register controller provider(s) to Yves application:

|Provider|Namespace|Enabled Controller|Controller Specification|
|---|---|---|---|
|`QuickOrderPageControllerProvider`|`SprykerShop\Yves\QuickOrderPage\Plugin\Provider`|`QuickOrderController`|Provides functionality to display and process the Quick Order table.|

<details open>
<summary>src/Pyz/Yves/ShopApplication/YvesBootstrap.php</summary>

```php
namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;
use SprykerShop\Yves\QuickOrderPage\Plugin\Provider\QuickOrderPageControllerProvider;

class YvesBootstrap extends SprykerYvesBootstrap
{
	/**
	* @param bool|null $isSsl
	*
	* @return \SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider[]
	*/
	protected function QuickOrderPageControllerProvider($isSsl)
	{
		return [
			new QuickOrderPageControllerProvider($isSsl),
		];
	}
}
```
</br>
</details>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following URLs are available on Yves:

* https://mysprykershop.com/quick-order
* https://mysprykershop.com/en/quick-order
* https://mysprykershop.com/de/quick-order

... and for all other configured languages.
</div></section> 

### 4) Set up Behavior
#### Set up additional functionality

Enable the following behaviors by registering the plugins:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`QuickOrderCsvUploadedFileParserStrategyPlugin`|Enable support to parse CSV files with order items (sku, quantity), which could be uploaded on the Quick order page.|None|`SprykerShop\Yves\QuickOrderPage\Plugin\QuickOrderPage`|
|`QuickOrderCsvFileTemplateStrategyPlugin`|Generates a file template in CSV format, which can be used as a template to upload order items. The link to file download will be under the upload form.|None|`SprykerShop\Yves\QuickOrderPage\Plugin\QuickOrderPage`|
|`QuickOrderCsvUploadedFileValidatorStrategyPlugin`|Validates CSV header presence, checks mandatory columns based on header.|None|`SprykerShop\Yves\QuickOrderPage\Plugin\QuickOrderPage`|

<details open>
<summary>src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php</summary>
 
```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\QuickOrderPage\Plugin\QuickOrderPage\QuickOrderCsvFileTemplateStrategyPlugin;
use SprykerShop\Yves\QuickOrderPage\Plugin\QuickOrderPage\QuickOrderCsvUploadedFileParserStrategyPlugin;
use SprykerShop\Yves\QuickOrderPage\Plugin\QuickOrderPage\QuickOrderCsvUploadedFileValidatorStrategyPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
	/**
	* @return \SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderUploadedFileParserStrategyPluginInterface[]
	*/
	protected function getQuickOrderUploadedFileParserPlugins(): array
	{
		return [
			new QuickOrderCsvUploadedFileParserStrategyPlugin(),
		];
	}

	/**
	* @return \SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderFileTemplateStrategyPluginInterface[]
	*/
	protected function getQuickOrderFileTemplatePlugins(): array
	{
		return [
			new QuickOrderCsvFileTemplateStrategyPlugin(),
		];
	}

	/**
	* @return \SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderUploadedFileValidatorStrategyPluginInterface[]
	*/
	protected function getQuickOrderUploadedFileValidatorPlugins(): array
	{
		return [
			new QuickOrderCsvUploadedFileValidatorStrategyPlugin(),
		];
	}
}
```
</br>
</details>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make the following checks at https://mysprykershop.com/quick-order:

* `QuickOrderCsvFileTemplateStrategyPlugin` provides a template for CSV file uploading. Check if the link for CSV file template is displayed on the Quick Add To Cart page.
* `QuickOrderCsvUploadedFileParserStrategyPlugin` is needed for CSV files parsing. Upload CSV file on the Quick Add To Cart page using the provided template and make sure that products appear in the Quick Add To Cart Page form afterward.
* `QuickOrderCsvUploadedFileValidatorStrategyPlugin` serves for CSV file validation. It checks header presence and validates mandatory columns depending on the header.
</div></section>

<!-- Last review date: Mar 28, 2019 by Dmitry Lymarenko, Yuliia Boiko-->
