---
title: Multiple Carts feature integration
description: Multiple Carts allows customers to manage multiple shopping carts in one account. The guide describes how to integrate the feature into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/multiple-carts-feature-integration
originalArticleId: bf00a6ba-8484-43af-bfce-e24895c051b7
redirect_from:
  - /2021080/docs/multiple-carts-feature-integration
  - /2021080/docs/en/multiple-carts-feature-integration
  - /docs/multiple-carts-feature-integration
  - /docs/en/multiple-carts-feature-integration
related:
  - title: Multiple Carts per User Feature Overview
    link: docs/scos/user/features/page.version/multiple-carts-feature-overview.html
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Cart | {{page.version}} |
| Persistent Cart | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/multiple-carts: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| MultiCart | vendor/spryker/multi-cart |
| MultiCartDataImport | vendor/spryker/multi-cart-data-import |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_quote.name | column | created |
| spy_quote.is_default | column | created |
| spy_quote.key | column | created |
| spy_quote-unique-name-customer_reference | index | created |

{% endinfo_block %}

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_quote.name | column | created |
| spy_quote.is_default | column | created |
| spy_quote.key | column | created |
| spy_quote-unique-name-customer_reference | index | created |

{% info_block warningBox "Verification" %}

Make sure that the following changes in transfer objects have been applied:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| QuoteTransfer.name | column | created | src/Generated/Shared/Transfer/QuoteTransfer |
| QuoteTransfer.isDefault | column | created | src/Generated/Shared/Transfer/QuoteTransfer |
| QuoteTransfer.key | column | created | src/Generated/Shared/Transfer/QuoteTransfer |
| QuoteResponseTransfer.customQuotes | column | created | src/Generated/Shared/Transfer/QuoteResponseTransfer |
| QuoteUpdateRequestAttributesTransfer.name | column | created | src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer |
| QuoteUpdateRequestAttributesTransfer.totals | column | created | src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer |
| QuoteActivationRequestTransfer | class | created | src/Generated/Shared/Transfer/QuoteActivationRequestTransfer |

{% endinfo_block %}

### 3) Add translations

Append glossary for the feature:

**src/data/import/glossary.csv**

```yaml
multi_cart.cart.set_default.success,"Cart '%quote%' was successfully set as active.",en_US
multi_cart.cart.set_default.success,"Warenkorb '%quote%' wurde erfolgreich auf aktiv gesetzt.",de_DE
```

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that  the configured data has been added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 4) Import data

#### Import multicarts

{% info_block infoBox "Info" %}

The following imported entities will be used as carts in Spryker OS.

{% endinfo_block %}
Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/multi-cart-data-import/data/import/multi_cart.csv**

```yaml
key,name,customer_reference,store,is_default,quote_data
quote-1,My Cart,DE--1,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-2,My Cart,DE--2,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-3,My Cart,DE--3,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-4,My Cart,DE--4,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-5,My Cart,DE--5,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-6,My Cart,DE--6,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-7,My Cart,DE--7,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-8,My Cart,DE--8,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-9,My Cart,DE--9,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-10,My Cart,DE--10,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-11,My Cart,DE--11,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-12,My Cart,DE--12,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-13,My Cart,DE--13,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-14,My Cart,DE--14,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-15,My Cart,DE--15,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-16,My Cart,DE--16,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-17,My Cart,DE--17,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-18,My Cart,DE--18,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-19,My Cart,DE--19,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-20,My Cart,DE--20,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
quote-21,My Cart,DE--21,DE,1,"{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}"
```

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|---|---|---|---|---|
|key|mandatory|string|quote-19|Key that will identify the quote to be referred in future imports.|
|name|mandatory|string|>My Cart|Name of the quote.|
|customer_reference|mandatory|string|DE--21|Customer reference of the quote owner.|
|store|mandatory|string|DE|Store name that the quote relates to.|
|is_default|mandatory|int|1|Flag to show that the quote is default for the customer.|
|quote_data|mandatory|string|{""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""}|Quote data params serialized as json.|

Register the following plugin to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| MultiCartDataImportPlugin | Imports customer's quotes to database. | Make sure that customers have been imported. | Spryker\Zed\MultiCartDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MultiCartDataImport\Communication\Plugin\MultiCartDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	protected function getDataImporterPlugins(): array
	{
		return [
			new MultiCartDataImportPlugin(),
		];
	}
}
```

Run the following console command to import data:

```bash
console data:import multi-cart
```

{% info_block warningBox "Verification" %}

Open `spy_quote` and make sure that all data has been imported.

{% endinfo_block %}

### 5) Set up behavior

{% info_block infoBox "Info" %}

This feature requires a database storage strategy enabled in the quote module.

{% endinfo_block %}

#### Set up quote integration

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AddSuccessMessageAfterQuoteCreatedPlugin | Adds success message to messenger afterward. |  | Spryker\Zed\MultiCart\Communication\Plugin |
| AddDefaultNameBeforeQuoteSavePlugin | Sets default quote name if quote does not have name. |  | Spryker\Zed\MultiCart\Communication\Plugin |
| ResolveQuoteNameBeforeQuoteCreatePlugin | Resolves quote name to make it unique for customer before the quote is saved. | If `AddDefaultNameBeforeQuoteSavePlugin` is used, it should be added afterward. | Spryker\Zed\MultiCart\Communication\Plugin |
| DeactivateQuotesBeforeQuoteSavePlugin | Mark quote as default. Makes SQL request to mark all customers' quotes as not default.  |  | Spryker\Zed\MultiCart\Communication\Plugin |
| InitDefaultQuoteCustomerQuoteDeleteAfterPlugin | Activates any customer quote, if an active customer quote has been removed. |  | Spryker\Zed\MultiCart\Communication\Plugin |
| NameQuoteTransferExpanderPlugin | Sets default quote name if quote does not have a name. Default guest quote name is used for guest customer quotes. |  | Spryker\Client\MultiCart\Plugin |

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\MultiCart\Communication\Plugin\AddDefaultNameBeforeQuoteSavePlugin;
use Spryker\Zed\MultiCart\Communication\Plugin\AddSuccessMessageAfterQuoteCreatedPlugin;
use Spryker\Zed\MultiCart\Communication\Plugin\DeactivateQuotesBeforeQuoteSavePlugin;
use Spryker\Zed\MultiCart\Communication\Plugin\InitDefaultQuoteCustomerQuoteDeleteAfterPlugin;
use Spryker\Zed\MultiCart\Communication\Plugin\ResolveQuoteNameBeforeQuoteCreatePlugin;
use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
	/**
	 * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface[]
	 */
	protected function getQuoteCreateAfterPlugins(): array
	{
		return [
			new AddSuccessMessageAfterQuoteCreatedPlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface[]
	 */
	protected function getQuoteCreateBeforePlugins(): array
	{
		return [
			new AddDefaultNameBeforeQuoteSavePlugin(),
			new ResolveQuoteNameBeforeQuoteCreatePlugin(),
			new DeactivateQuotesBeforeQuoteSavePlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface[]
	 */
	protected function getQuoteUpdateBeforePlugins(): array
	{
		return [
			new AddDefaultNameBeforeQuoteSavePlugin(),
			new ResolveQuoteNameBeforeQuoteCreatePlugin(),
			new DeactivateQuotesBeforeQuoteSavePlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteDeleteAfterPluginInterface[]
	 */
	protected function getQuoteDeleteAfterPlugins(): array
	{
		return [
			new InitDefaultQuoteCustomerQuoteDeleteAfterPlugin(),
		];
	}
}
```

**src/Pyz/Client/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Quote;

use Spryker\Client\Kernel\Container;
use Spryker\Client\MultiCart\Plugin\NameQuoteTransferExpanderPlugin;
use Spryker\Client\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
	/**
	 * @param \Spryker\Client\Kernel\Container $container
	 *
	 * @return \Spryker\Client\Quote\Dependency\Plugin\QuoteTransferExpanderPluginInterface[]
	 */
	protected function getQuoteTransferExpanderPlugins(Container $container)
	{
		return [
			new NameQuoteTransferExpanderPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that customer carts have unique names. If a customer creates a cart with a name that has already been used in another cart of the customer, the cart name will be extended with an iterative suffix.

{% endinfo_block %}

{% info_block infoBox "Info" %}

For example:<br>If the name 'Shopping cart' already exists, it will be changed to the following:<br>Shopping cart → Shopping cart 1<br>Shopping cart → Shopping cart 2

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the customer has only one active cart at once. If the customer updates an inactive cart it becomes active, while the previous active cart becomes inactive.

{% endinfo_block %}

#### Set up persistent cart integration

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CustomerCartQuoteResponseExpanderPlugin | Adds customer quote collection to quote response transfer after cart operation handling. Replaces quote with active quote if it exist. |  |Spryker\Zed\Spryker\Zed\MultiCart\Communication\Plugin |
| SaveCustomerQuotesQuoteUpdatePlugin | Extracts Customer Quote Collection from quote response object and saves it to customer session. |  | Spryker\Client\MultiCart\Plugin |
| DefaultQuoteUpdatePlugin | Finds Customer Default Quote in customer quote collection and saves it to customer session. |  | Spryker\Client\MultiCart\Plugin |
| QuoteSelectorPersistentCartChangeExpanderPlugin | Takes quote ID form parameters and replaces it in quote change request. |  | Spryker\Client\MultiCart\Plugin |

**src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PersistentCart;

use Spryker\Client\MultiCart\Plugin\DefaultQuoteUpdatePlugin;
use Spryker\Client\MultiCart\Plugin\QuoteSelectorPersistentCartChangeExpanderPlugin;
use Spryker\Client\MultiCart\Plugin\SaveCustomerQuotesQuoteUpdatePlugin;
use Spryker\Client\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
	/**
 	* @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\QuoteUpdatePluginInterface[]
	 */
	protected function getQuoteUpdatePlugins(): array
	{
		return [
			new SaveCustomerQuotesQuoteUpdatePlugin(),
			new DefaultQuoteUpdatePlugin(),
		];
	}

	/**
	 * @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\PersistentCartChangeExpanderPluginInterface[]
	 */
	protected function getChangeRequestExtendPlugins(): array
	{
		return [
			new QuoteSelectorPersistentCartChangeExpanderPlugin(),
		];
	}
}
```

**src/Pyz/Zed/PersistentCart/PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PersistentCart;

use Spryker\Zed\MultiCart\Communication\Plugin\CustomerCartQuoteResponseExpanderPlugin;
use Spryker\Zed\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
	/**
	 * @return \Spryker\Zed\PersistentCartExtension\Dependency\Plugin\QuoteResponseExpanderPluginInterface[]
	 */
	protected function getQuoteResponseExpanderPlugins(): array
	{
		return [
			new CustomerCartQuoteResponseExpanderPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that adding items to the cart will update the customer's cart list in the multi-cart session.

{% endinfo_block %}

#### Set up customer integration

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|GuestCartSaveCustomerSessionSetPlugin|Executed after the customer has been added to the session. Saves a guest customer quote to the database if it is not empty.Takes an actual customer quote from the database if the guest cart is empty.|Should be added before `GuestCartUpdateCustomerSessionSetPlugin`.|Spryker\Client\MultiCart\Plugin|

**src/Pyz/Client/Customer/CustomerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Customer;

use Spryker\Client\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Client\MultiCart\Plugin\GuestCartSaveCustomerSessionSetPlugin;

class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
	/**
	 * @return \Spryker\Client\Customer\Dependency\Plugin\CustomerSessionSetPluginInterface[]
	 */
	protected function getCustomerSessionSetPlugins()
	{
		return [
			new GuestCartSaveCustomerSessionSetPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that no  empty guest cart will be saved to the database in customer login.

{% endinfo_block %}

## Install feature frontend

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| NAME | VERSION |
| --- | --- |
| Product | {{page.version}} |
| Cart | {{page.version}} |
| Persistent Cart | {{page.version}} |
| Customer Account Management | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/multiple-carts: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| MultiCartPage | vendor/spryker-shop/multi-cart-page |
| MultiCartWidget | vendor/spryker-shop/multi-cart-widget |

{% endinfo_block %}       

### 2) Add translations

Append glossary according to your configuration:

<details open><summary markdown='span'>src/data/import/glossary.csv</summary>

```yaml
page.multi_cart.shopping_cart.list.title,Shopping cart,en_US
page.multi_cart.shopping_cart.list.title,Einkaufswagen,de_DE
page.multi_cart.shopping_cart.list.create_link,Create,en_US
page.multi_cart.shopping_cart.list.create_link,Erstellen,de_DE
page.multi_cart.shopping_cart.list.label.name,Name,en_US
page.multi_cart.shopping_cart.list.label.name,Name,de_DE
page.multi_cart.shopping_cart.list.label.num_of_products,Number of products,en_US
page.multi_cart.shopping_cart.list.label.num_of_products,Anzahl der Produkte,de_DE
page.multi_cart.shopping_cart.list.label.prices,Prices,en_US
page.multi_cart.shopping_cart.list.label.prices,Preise,de_DE
page.multi_cart.shopping_cart.list.label.total,Total,en_US
page.multi_cart.shopping_cart.list.label.total,Gesamt,de_DE
page.multi_cart.shopping_cart.list.label.actions,Actions,en_US
page.multi_cart.shopping_cart.list.label.actions,Aktionen,de_DE
page.multi_cart.shopping_cart.list.link.edit_name,Edit name,en_US
page.multi_cart.shopping_cart.list.link.edit_name,Namen bearbeiten,de_DE
page.multi_cart.shopping_cart.list.link.duplicate,Duplicate,en_US
page.multi_cart.shopping_cart.list.link.duplicate,Duplikat,de_DE
page.multi_cart.shopping_cart.list.link.delete,Delete,en_US
page.multi_cart.shopping_cart.list.link.delete,Löschen,de_DE
page.multi_cart.shopping_cart.list.label.item,"Item",en_US
page.multi_cart.shopping_cart.list.label.item,"Artikel",de_DE
page.multi_cart.shopping_cart.list.label.items,"Items",en_US
page.multi_cart.shopping_cart.list.label.items,"Artikel",de_DE
customer.account.shopping_cart.list.title,Manage Shopping carts,en_US
customer.account.shopping_cart.list.title,Verwalten Sie Einkaufswagen,de_DE
page.multi_cart.shopping_cart.list.label.access,Access,en_US
page.multi_cart.shopping_cart.list.label.access,Zugriff,de_DE
page.multi_cart.shopping_cart.update.title,Edit,en_US
page.multi_cart.shopping_cart.update.title,Bearbeiten,de_DE
page.multi_cart.shopping_cart.create.title,Create,en_US
page.multi_cart.shopping_cart.create.title,Erstellen,de_DE
multi_cart.form.create_cart,"Add new cart",en_US
multi_cart.form.create_cart,"Füge einen neuen Warenkorb hinzu",de_DE
multi_cart.form.quote.name,"Cart Name",en_US
multi_cart.form.quote.name,"Name des Einkaufswagens",de_DE
multi_cart.form.edit_cart,"Change Name",en_US
multi_cart.form.edit_cart,"Namen ändern",de_DE
multi_cart.form.edit_cart_information,"Edit Cart information",en_US
multi_cart.form.edit_cart_information,"Einkaufswageninformationen bearbeiten",de_DE
multi_cart.cart.set_default.success,"Cart '%quote%' was successfully set as active.",en_US
multi_cart.cart.set_default.success,"Warenkorb '%quote%' wurde erfolgreich auf aktiv gesetzt.",de_DE
multi_cart_page.cart_clear.success,"Cart was successfully cleared",en_US
multi_cart_page.cart_clear.success,"Einkaufswagen wurde erfolgreich gelöscht",de_DE
multi_cart_page.cart_delete_confirmation.warning,Warning,en_US
multi_cart_page.cart_delete_confirmation.warning,Warnung,de_DE
multi_cart_page.cart_delete_confirmation.trying_to_delete,You are trying to delete Cart,en_US
multi_cart_page.cart_delete_confirmation.trying_to_delete,Sie versuchen den Warenkorb zu löschen,de_DE
multi_cart_page.cart_delete_confirmation.shared_with,It is shared with the following users,en_US
multi_cart_page.cart_delete_confirmation.shared_with,Der Warenkorb ist mit den folgenden Personen geteilt,de_DE
multi_cart_page.cart_delete_confirmation.from_all_of_them,It will be deleted from all of them,en_US
multi_cart_page.cart_delete_confirmation.from_all_of_them,Der Warenkorb wird für alle Nutzer gelöscht,de_DE
multi_cart_page.cart_delete_confirmation.cancel,Cancel,en_US
multi_cart_page.cart_delete_confirmation.cancel,Abbrechen,de_DE
multi_cart_page.cart_delete_confirmation.delete,Delete,en_US
multi_cart_page.cart_delete_confirmation.delete,Löschen,de_DE
multi_cart_page.cart_delete_confirmation.breadcrumbs.shopping_carts,Shopping carts,en_US
multi_cart_page.cart_delete_confirmation.breadcrumbs.shopping_carts,Warenkörbe,de_DE
multi_cart_widget.cart.cart_name,"Cart Name",en_US
multi_cart_widget.cart.cart_name,"Name des Einkaufswagens",de_DE
multi_cart_widget.cart.add,"Create New Cart",en_US
multi_cart_widget.cart.add,"Neuen Warenkorb erstellen",de_DE
multi_cart_widget.cart.action.change_name,"Change Name",en_US
multi_cart_widget.cart.action.change_name,"Namen ändern",de_DE
multi_cart_widget.cart.action.duplicate,"Duplicate",en_US
multi_cart_widget.cart.action.duplicate,"Duplikat",de_DE
multi_cart_widget.cart.action.clear,"Clear cart",en_US
multi_cart_widget.cart.action.clear,"Leerer Warenkorb",de_DE
multi_cart_widget.cart.action.delete,"Delete cart",en_US
multi_cart_widget.cart.action.delete,"Warenkorb löschen",de_DE
multi_cart_widget.cart.action.view,"View details",en_US
multi_cart_widget.cart.action.view,"Warenkorb ansehen",de_DE
multi_cart_widget.cart.action.set_default,"Set active",en_US
multi_cart_widget.cart.action.set_default,"Aktiv setzen",de_DE
multi_cart_widget.cart.default,"Active",en_US
multi_cart_widget.cart.default,"Aktiv",de_DE
multi_cart_widget.cart.item,"Item",en_US
multi_cart_widget.cart.item,"Artikel",de_DE
multi_cart_widget.cart.items,"Items",en_US
multi_cart_widget.cart.items,"Artikel",de_DE
multi_cart_widget.cart.view_all,"View all carts",en_US
multi_cart_widget.cart.view_all,"Alle Warenkörbe anzeigen",de_DE
multi_cart_widget.cart.cart,"Cart",en_US
multi_cart_widget.cart.cart,"Warenkorb",de_DE
multi_cart_widget.cart.carts,"Carts",en_US
multi_cart_widget.cart.carts,"Warenkorb",de_DE
multi_cart_widget.cart.list,"Cart List",en_US
multi_cart_widget.cart.list,"Warenkorb-Liste",de_DE
multi_cart_widget.cart.status,"Status",en_US
multi_cart_widget.cart.status,"Status",de_DE
multi_cart_widget.cart.sub_total,"Sub Total",en_US
multi_cart_widget.cart.sub_total,"Zwischensumme",de_DE
multi_cart_widget.cart.actions,"Actions",en_US
multi_cart_widget.cart.actions,"Aktionen",de_DE
multi_cart_widget.cart.created.success,"Cart '%quoteName%' was created successfully",en_US
multi_cart_widget.cart.created.success,"Warenkorb '%quoteName%' wurde erfolgreich erstellt",de_DE
multi_cart_widget.cart.updated.success,"Cart updated successfully",en_US
multi_cart_widget.cart.updated.success,"Einkaufswagen wurde erfolgreich aktualisiert",de_DE
multi_cart_widget.cart.was-deleted-before,Dieser Warenkorb wurde bereits gelöscht,de_DE
multi_cart_widget.cart.was-deleted-before,This cart was already deleted,en_US
```
</details>

Run the following console command to import data:
```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable controllers

#### Router list

Register the following route provider plugins:

| PROVIDER | NAMESPACE |
| --- | --- |
| MultiCartPageRouteProviderPlugin | SprykerShop\Yves\MultiCartPage\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\MultiCartPage\Plugin\Router\MultiCartPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new MultiCartPageRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the changes by opening the customer cart list page with a logged in customer on, for example, `http://mysprykershop.com/multi-cart/`

{% endinfo_block %}

### 4) Set up widgets

Register the following global widgets:

| WIDGET | DESCRIPTION | NAMESPACE |
| --- | --- | --- |
| AddToMultiCartWidget | Shows cart list for adding to cart functionality. | SprykerShop\Yves\MultiCartWidget\Widget |
| CartOperationsWidget | Shows multi-cart functionalities in cart page. | SprykerShop\Yves\MultiCartWidget\Widget |
| MiniCartWidget | Shows mini-cart in header. | SprykerShop\Yves\MultiCartWidget\Widget |
| MultiCartMenuItemWidget | Shows link to cart list page in customer account navigation. | SprykerShop\Yves\MultiCartWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MultiCartWidget\Widget\AddToMultiCartWidget;
use SprykerShop\Yves\MultiCartWidget\Widget\CartOperationsWidget;
use SprykerShop\Yves\MultiCartWidget\Widget\MiniCartWidget;
use SprykerShop\Yves\MultiCartWidget\Widget\MultiCartMenuItemWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			AddToMultiCartWidget::class,
			CartOperationsWidget::class,
			MiniCartWidget::class,
			MultiCartMenuItemWidget::class,
		];
	}
}
```

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets have been registered:

| MODULE | TEST |
| --- | --- |
| AddToMultiCartWidget | Go to the product detail page. A shopping cart list should be added to the cart form. |
| CartOperationsWidget | Go to the cart overview page and see a title with the cart name and the Clear all button. |
| MiniCartWidget | Mini-cart with all customer's carts should be in the header. |
| MultiCartMenuItemWidget | Go to the customer account overview page. A shopping cart link should be in the customer navigation links. |

{% endinfo_block %}
