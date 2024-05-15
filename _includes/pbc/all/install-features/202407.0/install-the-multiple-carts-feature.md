


This document describes how to install the [Multiple Carts feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/multiple-carts-feature-overview.html).

## Install feature core

Follow the steps below to install the Multiple Carts feature core.

### Prerequisites

* Enable the database storage strategy in the Quote module.

* Install the required features:

| NAME            | VERSION          | INSTALLATION GUIDE                                                                                                                               |
|-----------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core    | {{page.version}} | [Spryker Сore feature integration](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)            |
| Cart            | {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |
| Persistent Cart | {{page.version}} |                                                                                                                                                 |


### 1) Install the required modules

```bash
composer require spryker-feature/multiple-carts: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE              | EXPECTED DIRECTORY                    |
|---------------------|---------------------------------------|
| MultiCart           | vendor/spryker/multi-cart             |
| MultiCartDataImport | vendor/spryker/multi-cart-data-import |

{% endinfo_block %}

### 2) Set up configuration

Configure the quote fields that are allowed for saving in quote collection in the customer's session. You can specify nested fields.

**src/Pyz/Client/MultiCart/MultiCartConfig.php**

```php
<?php

namespace Pyz\Client\MultiCart;

use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Generated\Shared\Transfer\StoreTransfer;
use Spryker\Client\MultiCart\MultiCartConfig as SprykerMultiCartConfig;

class MultiCartConfig extends SprykerMultiCartConfig
{
    /**
     * @return array<string|array<string>>
     */
    public function getQuoteFieldsAllowedForCustomerQuoteCollectionInSession(): array
    {
        return array_merge(parent::getQuoteFieldsAllowedForCustomerQuoteCollectionInSession(), [
            QuoteTransfer::ID_QUOTE,
            QuoteTransfer::ITEMS,
            QuoteTransfer::BUNDLE_ITEMS,
            QuoteTransfer::TOTALS,
            QuoteTransfer::CURRENCY,
            QuoteTransfer::PRICE_MODE,
            QuoteTransfer::NAME,
            QuoteTransfer::IS_DEFAULT,
            QuoteTransfer::CUSTOMER_REFERENCE,
            QuoteTransfer::CUSTOMER => [
                CustomerTransfer::CUSTOMER_REFERENCE,
            ],
            QuoteTransfer::IS_LOCKED,
            QuoteTransfer::STORE => [
                StoreTransfer::ID_STORE,
                StoreTransfer::NAME,
            ],
        ]);
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that only configured fields are saved in a customer's session.

{% endinfo_block %}

### 3) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                          | TYPE   | EVENT   |
|------------------------------------------|--------|---------|
| spy_quote.name                           | column | created |
| spy_quote.is_default                     | column | created |
| spy_quote.key                            | column | created |
| spy_quote-unique-name-customer_reference | index  | created |

Make sure that the following changes in transfer objects have been applied:

| TRANSFER                                    | TYPE   | EVENT   | PATH                                                               |
|---------------------------------------------|--------|---------|--------------------------------------------------------------------|
| QuoteTransfer.name                          | column | created | src/Generated/Shared/Transfer/QuoteTransfer                        |
| QuoteTransfer.isDefault                     | column | created | src/Generated/Shared/Transfer/QuoteTransfer                        |
| QuoteTransfer.key                           | column | created | src/Generated/Shared/Transfer/QuoteTransfer                        |
| QuoteResponseTransfer.customQuotes          | column | created | src/Generated/Shared/Transfer/QuoteResponseTransfer                |
| QuoteUpdateRequestAttributesTransfer.name   | column | created | src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer |
| QuoteUpdateRequestAttributesTransfer.totals | column | created | src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer |
| QuoteActivationRequestTransfer              | class  | created | src/Generated/Shared/Transfer/QuoteActivationRequestTransfer       |

{% endinfo_block %}

### 4) Import multicarts


1. Prepare data according to your requirements using our demo data:


<details>
  <summary>vendor/spryker/spryker/multi-cart-data-import/data/import/multi_cart.csv</summary>

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

</details>

| COLUMN             | REQUIRED | DATA TYPE | DATA EXAMPLE                                                                                                                                   | DATA EXPLANATION                                                   |
|--------------------|-----------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| key                | ✓ | string    | quote-19        | Unique identifier used to refer to in other imports.  |
| name               | ✓ | string    | >My Cart          | The name of the quote.                                                 |
| customer_reference | ✓ | string    | DE--21            | Customer reference of the quote owner.                             |
| store              | ✓ | string    | DE              | The store name that the quote is related to.                              |
| is_default         | ✓ | int       | 1               | Thelag to show that the quote is default for the customer.           |
| quote_data         | ✓ | string    | {""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""} | Quote data params serialized as json.                              |

2. Register the following plugin to enable data import:

| PLUGIN                    | SPECIFICATION                          | PREREQUISITES                                | NAMESPACE                                            |
|---------------------------|----------------------------------------|----------------------------------------------|------------------------------------------------------|
| MultiCartDataImportPlugin | Imports a customer's quotes to database. | Customers are imported. | Spryker\Zed\MultiCartDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MultiCartDataImport\Communication\Plugin\MultiCartDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MultiCartDataImport\Communication\Plugin\MultiCartDataImportPlugin>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new MultiCartDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import multi-cart
```

{% info_block warningBox "Verification" %}

Make sure the data has been imported to the `spy_quote` table.

{% endinfo_block %}

### 5) Set up behavior

Set up the baheviors in the following sections.

#### Set up quote integration

Register the following plugins:

| PLUGIN                                         | SPECIFICATION                                                                                                          | PREREQUISITES                                                                  | NAMESPACE                                  |
|------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|--------------------------------------------|
| AddSuccessMessageAfterQuoteCreatedPlugin       | Adds success message to messenger afterward.                                                                           |                                                                                | Spryker\Zed\MultiCart\Communication\Plugin |
| AddDefaultNameBeforeQuoteSavePlugin            | Sets the default quote name if a quote doesn't have a name.                                                                   |                                                                                | Spryker\Zed\MultiCart\Communication\Plugin |
| ResolveQuoteNameBeforeQuoteCreatePlugin        | Resolves a quote name to make it unique for the customer before it's saved.                                          | If `AddDefaultNameBeforeQuoteSavePlugin` is used, it must be added afterwards.  | Spryker\Zed\MultiCart\Communication\Plugin |
| DeactivateQuotesBeforeQuoteSavePlugin          | Marks a quote as default. Makes an SQL request to mark all customers' quotes as not default.                                 |                                                                                | Spryker\Zed\MultiCart\Communication\Plugin |
| InitDefaultQuoteCustomerQuoteDeleteAfterPlugin | Activates any customer quote if an active customer quote was removed.                                            |                                                                                | Spryker\Zed\MultiCart\Communication\Plugin |
| NameQuoteTransferExpanderPlugin                | Sets the default quote name if a quote doesn't have a name. Default guest quote name is used for guest customer quotes.     |                                                                                | Spryker\Client\MultiCart\Plugin            |
| TotalItemCountDefaultCartQuoteExpanderPlugin   | Calculates the number of items in the provided `QuoteTransfer` and sets the result to `QuoteTransfer.totalItemCount`. |                                                                                | Spryker\Client\Cart\Plugin\MultiCart       |

<details open><summary markdown='span'>src/Pyz/Zed/Quote/QuoteDependencyProvider.php</summary>

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
     * @return array<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface>
     */
    protected function getQuoteCreateAfterPlugins(): array
    {
        return [
            new AddSuccessMessageAfterQuoteCreatedPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface>
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
     * @return array<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface>
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
     * @return array<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteDeleteAfterPluginInterface>
     */
    protected function getQuoteDeleteAfterPlugins(): array
    {
        return [
            new InitDefaultQuoteCustomerQuoteDeleteAfterPlugin(),
        ];
    }
}
```
</details>

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
     * @return array<\Spryker\Client\Quote\Dependency\Plugin\QuoteTransferExpanderPluginInterface>
     */
    protected function getQuoteTransferExpanderPlugins(Container $container): array
    {
        return [
            new NameQuoteTransferExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/MultiCart/MultiCartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\MultiCart;

use Spryker\Client\Cart\Plugin\MultiCart\TotalItemCountDefaultCartQuoteExpanderPlugin;
use Spryker\Client\MultiCart\MultiCartDependencyProvider as SprykerMultiCartDependencyProvider;

class MultiCartDependencyProvider extends SprykerMultiCartDependencyProvider
{
    /**
     * @return list<\Spryker\Client\MultiCartExtension\Dependency\Plugin\DefaultCartQuoteExpanderPluginInterface>
     */
    protected function getDefaultCartQuoteExpanderPlugins(): array
    {
        return [
            new TotalItemCountDefaultCartQuoteExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that customer carts have unique names. If a customer creates a cart with a name that was already used for another cart of the same customer, the cart name is extended with an iterative suffix.

Example:
1. A customer creates a cart named "Shopping cart".
2. The customer creates a cart named "Shopping cart". It's automatically renamed to "Shopping cart 1".
3. The customer creates a cart named "Shopping cart". It's automatically renamed to "Shopping cart 2".

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Make sure that a customer has only one active cart at a time. If a customer updates an inactive cart, it becomes active, while the previous active cart becomes inactive.

{% endinfo_block %}

#### Set up persistent cart integration

Register the following plugins:

| PLUGIN                                          | SPECIFICATION                                                                                                                          | PREREQUISITES | NAMESPACE                                              |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------|
| CustomerCartQuoteResponseExpanderPlugin         | Adds a customer quote collection to the quote response transfer after cart operation handling. Replaces a quote with an active quote if it exist. |               | Spryker\Zed\Spryker\Zed\MultiCart\Communication\Plugin |
| SaveCustomerQuotesQuoteUpdatePlugin             | Extracts Customer Quote Collection from a quote response object and saves it to the customer session.                                        |               | Spryker\Client\MultiCart\Plugin                        |
| DefaultQuoteUpdatePlugin                        | Finds Customer Default Quote in a customer quote collection and saves it to the customer session.                                            |               | Spryker\Client\MultiCart\Plugin                        |
| QuoteSelectorPersistentCartChangeExpanderPlugin | Takes a quote ID form parameters and replaces it in a quote change request.                                                                |               | Spryker\Client\MultiCart\Plugin                        |

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
     * @return array<\Spryker\Client\PersistentCartExtension\Dependency\Plugin\QuoteUpdatePluginInterface>
     */
    protected function getQuoteUpdatePlugins(): array
    {
        return [
            new SaveCustomerQuotesQuoteUpdatePlugin(),
            new DefaultQuoteUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\PersistentCartExtension\Dependency\Plugin\PersistentCartChangeExpanderPluginInterface>
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
     * @return array<\Spryker\Zed\PersistentCartExtension\Dependency\Plugin\QuoteResponseExpanderPluginInterface>
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

Make sure that, in a multi-cart session, adding items to cart updates the customer's cart list.

{% endinfo_block %}

#### Set up the customer integration

Register the following plugins:

| PLUGIN                                | SPECIFICATION                                                                                                                                                                                           | PREREQUISITES                                                     | NAMESPACE                       |
|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|---------------------------------|
| GuestCartSaveCustomerSessionSetPlugin | Executed after a customer was added to the session. Saves a guest customer quote to the database if it's not empty. Takes an actual customer quote from the database if the guest cart is empty. | Must be added before `GuestCartUpdateCustomerSessionSetPlugin`. | Spryker\Client\MultiCart\Plugin |

**src/Pyz/Client/Customer/CustomerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Customer;

use Spryker\Client\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Client\MultiCart\Plugin\GuestCartSaveCustomerSessionSetPlugin;

class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
    /**
     * @return array<\Spryker\Client\Customer\Dependency\Plugin\CustomerSessionSetPluginInterface>
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

Make sure that an empty guest cart can't be saved to the database in the customer login.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Multiple Carts feature frontend.

### Prerequisites

Install the required features:


| NAME            | VERSION          | INSTALLATION GUIDE                                                                                                                               |
|-----------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core    | {{page.version}} | [Spryker Сore feature integration](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)            |
| Cart            | {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |
| Persistent Cart | {{page.version}} |                                                                                                                                                 |

### 1) Install the required modules

```bash
composer require spryker-feature/multiple-carts: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE          | EXPECTED DIRECTORY                    |
|-----------------|---------------------------------------|
| MultiCartPage   | vendor/spryker-shop/multi-cart-page   |
| MultiCartWidget | vendor/spryker-shop/multi-cart-widget |

{% endinfo_block %}

### 2) Add translations

1. Append glossary according to your configuration:

<details><summary markdown='span'>src/data/import/glossary.csv</summary>

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

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable controllers

#### Router list

Register the following route provider plugins:

| PROVIDER                         | NAMESPACE                                      |
|----------------------------------|------------------------------------------------|
| MultiCartPageRouteProviderPlugin | SprykerShop\Yves\MultiCartPage\Plugin\Router   |
| MultiCartPageAsyncRouteProviderPlugin | SprykerShop\Yves\MultiCartPage\Plugin\Router   |
| MultiCartWidgetAsyncRouteProviderPlugin | SprykerShop\Yves\MultiCartWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\MultiCartPage\Plugin\Router\MultiCartPageAsyncRouteProviderPlugin;
use SprykerShop\Yves\MultiCartPage\Plugin\Router\MultiCartPageRouteProviderPlugin;
use SprykerShop\Yves\MultiCartWidget\Plugin\Router\MultiCartWidgetAsyncRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new MultiCartPageRouteProviderPlugin(),
            new MultiCartPageAsyncRouteProviderPlugin(),
            new MultiCartWidgetAsyncRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify `MultiCartPageRouteProviderPlugin` by opening the customer cart list page with a logged-in customer on—for example, `http://mysprykershop.com/multi-cart/`.

Verify `MultiCartPageAsyncRouteProviderPlugin` after finishing the integration by clearing the cart with cart actions AJAX mode enabled.

Verify `MultiCartPageRouteProviderPlugin` - after finishing the integration make sure the mini cart counter is updated after performing the cart actions with cart actions AJAX mode enabled.

{% endinfo_block %}

### 4) Set up widgets

1. Register the following global widgets:

| WIDGET                  | DESCRIPTION                                                  | NAMESPACE                               |
|-------------------------|--------------------------------------------------------------|-----------------------------------------|
| AddToMultiCartWidget    | Shows cart list for adding to cart functionality.            | SprykerShop\Yves\MultiCartWidget\Widget |
| CartOperationsWidget    | Shows multi-cart functionalities in cart page.               | SprykerShop\Yves\MultiCartWidget\Widget |
| MiniCartWidget          | Shows mini-cart in header.                                   | SprykerShop\Yves\MultiCartWidget\Widget |
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
	 * @return array<string>
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

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE                  | TEST                                                                                                       |
|-------------------------|------------------------------------------------------------------------------------------------------------|
| AddToMultiCartWidget    | Go to the product detail page. A shopping cart list must be added to the cart form.                      |
| CartOperationsWidget    | Go to the cart overview page and see a title with the cart name and the **Clear all** button.                  |
| MiniCartWidget          | Mini-cart with all customer's carts should be in the header.                                               |
| MultiCartMenuItemWidget | Go to the customer account overview page. A shopping cart link should be in the customer navigation links. |

{% endinfo_block %}
