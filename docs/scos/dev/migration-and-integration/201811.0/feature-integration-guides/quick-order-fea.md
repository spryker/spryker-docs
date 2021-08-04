---
title: Quick Order Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/quick-order-feature-integration-201811
redirect_from:
  - /v1/docs/quick-order-feature-integration-201811
  - /v1/docs/en/quick-order-feature-integration-201811
---

## Install Feature Core
### Prerequisites
To start the feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core E-commerce |2018.11.0  |
|  Cart|2018.11.0 |
| Product |2018.11.0  |
| Checkout |  2018.11.0|

## Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/quick-add-to-cart:"^2018.11.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the module listed in the following table has been installed:

| Module |Expected Directory  |
| --- | --- |
| `QuickOrderPage` | `vendor/spryker-shop/quick-order-page`|
</div></section> 

## Set up Transfer Objects

Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**

Make sure that the modules listed in the following table have been installed:

| Module |Type |Event |Path |
| --- | --- |--- |--- |
| `QuickOrderTransfer`|class |created| `vendor/spryker-shop/quick-order-page`|
| `QuickOrderItemTransfer`|class |created| `src/Generated/Shared/Transfer/QuickOrderItemTransfer`|

</div></section> 

## Add Translations

Feature specific glossary keys:

<details open><summary>src/data/import/glossary.csv</summary>
   
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
quick-order.errors.items-required,Please enter at least one product SKU,en_US
quick-order.errors.items-required,Bitte geben Sie mindestens eine Produkt-Artikelnummer,de_DE
quick-order.errors.quantity-required,Quantity must be at least 1,en_US
quick-order.errors.quantity-required,Die Anzahl muss mindestens 1 sein,de_DE
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
page.detail.add-to-cart,In den Warenkorb,de_DE
page.detail.add-to-cart,Add to Cart,en_US
```
 <br>
</details>

Run the following command to import glossary changes:

```bash
console data:import:glossary
```

<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
Make sure that in the database the configured data are added to the `spy_glossary` table. 
</div></section>

## Enable Controllers
### Controller Provider List

Register controller provider(s) to Yves application:

| Provider | Namespace |  Enable Controller|Controller Specification  |
| --- | --- | --- | --- |
| ` QuickOrderPageControllerProvider`  | ` SprykerShop\Yves\QuickOrderPage\Plugin\Provider`  | ` QuickOrderController`  |Provides functionality to display and process Quick Order table.  |

<details open><summary>src/Pyz/Yves/ShopApplication/YvesBootstrap.php</summary>
   
```php
<?php
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
 <br>
</details>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following URLs are available on Yves: 

* https://example.url/quick-order
* https://example.url/en/quick-order
* https://example.url/de/quick-order. 
* And for all other configured languages.

</div></section>

<!-- Last review date: Dec 06, 2018 by Stanislav Matveyev, Yuliia Boiko -->
