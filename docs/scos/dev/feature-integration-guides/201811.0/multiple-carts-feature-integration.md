---
title: Multiple Carts feature integration
description: Multiple Carts allows customers to manage multiple shopping carts in one account. The guide describes how to integrate the feature into your project.
last_updated: Nov 25, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v1/docs/multiple-carts-feature-integration-201811
originalArticleId: b67b5107-0ec1-4a8a-93ba-887e5885a314
redirect_from:
  - /v1/docs/multiple-carts-feature-integration-201811
  - /v1/docs/en/multiple-carts-feature-integration-201811
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:
| Name | Version |
| --- | --- |
| Cart | 2018.11.0 |
| Persistent Cart | 2018.11.0 |
| Spryker Core | 2018.11.0 |    
### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/multiple-carts: "^2018.11.0" --update-with-dependencies
```
 {% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected directory</th></tr></thead><tbody><tr><td>`MultiCart`</td><td>`vendor/spryker/multi-cart`</td></tr><tr><td>`MultiCartDataImport`</td><td>`vendor/spryker/multi-cart-data-import`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Run the following commands to apply database changes and generate entity and transfer changes:
```bash
console transfer:generate
console propel:install
console transfer:generate
```
{% info_block warningBox "Verification" %}
Make sure that the following changes by checking your database:<table><thead><tr><th>Database entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_quote.name`</td><td>column</td><td>created</td></tr><tr><td>`spy_quote.is_default`</td><td>column</td><td>created</td></tr><tr><td>`spy_quote.key`</td><td>column</td><td>created</td></tr><tr><td>`spy_quote-unique-name-customer_reference`</td><td>index</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`QuoteTransfer.name`</td><td>column</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteTransfer`</td></tr><tr><td>`QuoteTransfer.isDefault`</td><td>column</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteTransfer`</td></tr><tr><td>`QuoteTransfer.key`</td><td>column</td><td>created</td><td><var>src/Generated/Shared/Transfer/QuoteTransfer</var></td></tr><tr><td>`QuoteResponseTransfer.customQuotes`</td><td>column</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteResponseTransfer`</td></tr><tr><td>`QuoteUpdateRequestAttributesTransfer.name`.</td><td>column</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer`</td></tr><tr><td>`QuoteUpdateRequestAttributesTransfer.totals`</td><td>column</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer`</td></tr><tr><td>`QuoteActivationRequestTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteActivationRequestTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Add Translations
Append glossary for feature:
<details open>
    <summary markdown='span'>src/data/import/glossary.csv</summary>
    
 ```yaml
multi_cart.cart.set_default.success,"Cart '%quote%' was successfully set as active.",en_US
multi_cart.cart.set_default.success,"Warenkorb '%quote%' wurde erfolgreich auf aktiv gesetzt.",de_DE
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
  
  ### 4) Import Data
  #### Import multi carts
  
{% info_block infoBox "Info" %}
The following imported entities will be used as carts in Spryker OS.
{% endinfo_block %}
Prepare your data according to your requirements using our demo data:

<details open>
<summary markdown='span'>vendor/spryker/spryker/multi-cart-data-import/data/import/multi_cart.csv</summary>
    
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
<br />
</details>

| Column | Is obligatory? | Data type | Data example | Data explanation |
| --- | --- | --- | --- | --- |
| key | mandatory | string | quote-19 | The key that will identify the quote to be referred in future imports. |
| name | mandatory | string | My Cart | The name of the quote. |
| customer_reference | mandatory | string | DE--21 | The customer reference of the owner of the quote. |
| store | mandatory | string | DE | Store name that the quote relates to. |
| is_default | mandatory | string | 1 | Flag to show that the quote is default for customer. |
| quote_data | mandatory | string | {""currency"":{""code"":""EUR"",""name"":""Euro"",""symbol"":""\u20ac"",""isDefault"":true,""fractionDigits"":2},""priceMode"":""GROSS_MODE""} | Quote data params serialized as json. |

Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MultiCartDataImportPlugin` | Imports customer's quotes to database. | Make sure that customers were already imported. | `Spryker\Zed\MultiCartDataImport\Communication\Plugin` |

<details open>
    <summary markdown='span'>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>
    
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
<br />
</details>

Run the following console command to import data:
```bash
console data:import multi-cart
```

{% info_block warningBox "Verification" %}
Open `spy_quote` and make sure that all data was imported.
{% endinfo_block %}

### 5) Set up Behavior

{% info_block infoBox "Info" %}
This feature requires database storage strategy enabled in quote module.
{% endinfo_block %}

#### Setup Quote integration

Register following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AddSuccessMessageAfterQuoteCreatedPlugin` | Adds success message to messenger after. |  | `Spryker\Zed\MultiCart\Communication\Plugin` |
| `AddDefaultNameBeforeQuoteSavePlugin` | Set default quote name if quote does not have name. |  | `Spryker\Zed\MultiCart\Communication\Plugin` |
| `ResolveQuoteNameBeforeQuoteCreatePlugin` | Resolve quote name to make it unique for customer before quote save. | If `AddDefaultNameBeforeQuoteSavePlugin` used, this plugin should be added after. | `Spryker\Zed\MultiCart\Communication\Plugin` |
| `DeactivateQuotesBeforeQuoteSavePlugin` | Mark quote as default.
Makes SQL request to mark all customers quote as not default.  |  | `Spryker\Zed\MultiCart\Communication\Plugin` |
| `InitDefaultQuoteCustomerQuoteDeleteAfterPlugin` | Activates any customer quote, if active customer quote was removed. |  | `Spryker\Zed\MultiCart\Communication\Plugin` |
| `NameQuoteTransferExpanderPlugin` | Set default quote name if quote does not have name. Default guest quote name will be used for guest customer quotes. |  | Spryker\Client\MultiCart\Plugin |

<details open>
<summary markdown='span'>src/Pyz/Zed/Quote/QuoteDependencyProvider.php</summary>

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
<br />
</details>

<details>
<summary markdown='span'>src/Pyz/Client/Quote/QuoteDependencyProvider.php</summary>

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
<br/>
</details>

{% info_block warningBox "Verification" %}
Make sure that customer carts have unique names. Make sure if customer creates cart with name that already used in another cart of the customer, cart name will be extended with iteratable suffix.
{% endinfo_block %}

{% info_block infoBox "Example:" %}
If Shopping cart already exists:<br>Shopping cart →  Shopping cart 1<br>Shopping cart → Shopping cart 2
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that customer has only one active cart at ones. If customer updates inactive cart it becomes active, previous active cart becomes inactive.
{% endinfo_block %}

#### Set up Persistent Cart Integration
Register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CustomerCartQuoteResponseExpanderPlugin` | Adds customer quote collection to quote response transfer after cart operation handling. Replace quote with active quote if it exist. |  |`Spryker\Zed\MultiCart\Communication\Plugin`  |
| `SaveCustomerQuotesQuoteUpdatePlugin` | Extracts Customer Quote Collection from quote response object and saves them to customer session. |  | `Spryker\Client\MultiCart\Plugin` |
| `DefaultQuoteUpdatePlugin` | Finds Customer Default Quote in customer quote collection and saves it to customer session. |  | `Spryker\Client\MultiCart\Plugin` |
| `QuoteSelectorPersistentCartChangeExpanderPlugin` | Takes quote ID form parameters and replaces it in quote change request. |  | `Spryker\Client\MultiCart\Plugin` |

<details open>
<summary markdown='span'>src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php</summary>

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
<br />
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/PersistentCart/PersistentCartDependencyProvider.php</summary>

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
<br />
</details>

{% info_block warningBox "Verification" %}
Make sure that adding items to cart will update customer's cart list in multi cart session.
{% endinfo_block %}

#### Set up Customer Integration
Register following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `GuestCartSaveCustomerSessionSetPlugin` | Executed after customer added to session. Saves guest customer quote to database if it is not empty. Takes active customer quote from database if guest cart is empty. | Should be added before `GuestCartUpdateCustomerSessionSetPlugin`. | `Spryker\Client\MultiCart\Plugin` |

<details open>
<summary markdown='span'>src/Pyz/Client/Customer/CustomerDependencyProvider.php</summary>

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
<br />
</details>

{% info_block warningBox "Verification" %}
Make sure that not empty guest cart will be saved in database in customer login.
{% endinfo_block %}

<!--### 6) Related Features
Here you can find a list of related feature integration guides.

| Feature | Recommended version | Link |
| --- | --- | --- |
| Multiple Carts Quick Add to Cart | 2018.11 | [Multiple Carts + Quick Add to Cart feature integration](multiple-carts-quick-order-feature-integration-2018) |
| Multiple Carts Reorder | 2018.11 | [Multiple Carts + Reorder feature integration](multiple-carts-reorder-feature-integration-2018) | -->

## Install Feature Frontend
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Product | 2018.11.0 |
| Cart | 2018.11.0 |
| Persistent Cart | 2018.11.0 |
| Customer Account Management | 2018.11.0 |

### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/multiple-carts: "^2018.11.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected directory</th></tr></thead><tbody><tr><td>MultiCartPage</td><td>`vendor/spryker-shop/multi-cart-page`</td></tr><tr><td>MultiCartWidget</td><td>`vendor/spryker-shop/multi-cart-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations
Append glossary according to your configuration:
<details>
<summary markdown='span'>src/data/import/glossary.csv</summary>

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
<br />
</details>

Run the following console command to import data:
```bash
console data:import glossary
```
{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}
### 3) Enable Controllers
#### Controller Provider List
Register controller provider(s) to Yves application:

| Provider | Namespace | Enabled Controller | Controller specification |
| --- | --- | --- | --- |
| `MultiCartPageControllerProvider` | `SprykerShop\Yves\MultiCartPage\Plugin\Provider` | `MultiCartController` | Provides functionality to manage multi carts. |

<details open>
<summary markdown='span'>src/Pyz/Yves/ShopApplication/YvesBootstrap.php</summary>

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\MultiCartPage\Plugin\Provider\MultiCartPageControllerProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;
 
class YvesBootstrap extends SprykerYvesBootstrap
{
    /**
     * @param bool|null $isSsl
     *
     * @return \SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider[]
     */
    protected function getControllerProviderStack($isSsl)
    {
        return [
            new MultiCartPageControllerProvider($isSsl),
        ];
    }
}
```
<br />
</details>

{% info_block warningBox "Verification" %}
Verify the changes by opening the customer cart list page with a logged in customer on `http://mysprykershop.com/multi-cart/`
{% endinfo_block %}

### 4) Set up Widgets
Register the following global widgets:

| Widget | Description | Namespace |
| --- | --- | --- |
| `AddToMultiCartWidget` | Shows cart list for add to cart functionality. | `SprykerShop\Yves\MultiCartWidget\Widget` |
| `CartOperationsWidget` | Shows multi cart functionalities in cart page. | `SprykerShop\Yves\MultiCartWidget\Widget` |
| `MiniCartWidget` | Shows Mini cart in header. | `SprykerShop\Yves\MultiCartWidget\Widget` |
| `MultiCartMenuItemWidget` | Shows link to cart list page in customer account navigation. | `SprykerShop\Yves\MultiCartWidget\Widget` |

<details open>
<summary markdown='span'>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

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
<br />
</details>

Run the following command to enable Javascript and CSS changes:
```bash
console frontend:yves:build
```
{% info_block warningBox "Verification" %}
Make sure that the following widgets were registered:<table><thead><tr><th>Module</th><th>Test</th></tr></thead><tbody><tr><td>`AddToMultiCartWidget`</td><td>Go to the product detail page. A shopping cart list should be added to the cart form.</td></tr><tr><td>`CartOperationsWidget`</td><td>Go to the cart overview page and see a title with the cart name and the Clear all button.</td></tr><tr><td>`MiniCartWidget`</td><td>Minicart with all customer's carts should be in the header.</td></tr><tr><td>`MultiCartMenuItemWidget`</td><td>Go to the customer account overview page. A shopping cart link should be in the customer navigation links.</td></tr></tbody></table>
{% endinfo_block %}
