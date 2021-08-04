---
title: Shared Carts Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/shared-carts-feature-integration
redirect_from:
  - /v3/docs/shared-carts-feature-integration
  - /v3/docs/en/shared-carts-feature-integration
---

## Install Feature Core
### Prerequisites

To start feature integration, overview and install the necessary features:
|Name|Version|
|---|---|
|Cart|201903.0|
|Persistent Cart |201907.0|
|Multiple Carts|201907.0|
|Company Account|201907.0|
|Spryker Core|201907.0|

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/shared-carts: "^201907.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`SharedCart`</td><td>`vendor/spryker/shared-cart`</td></tr><tr><td>`SharedCartDataImport`</td><td>`vendor/spryker/shared-cart-data-import`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up the Database Schema
Run the following commands to apply the database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><th>Database Entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_quote_company_user`</td><td>table</td><td>created</td></tr><tr><td>`spy_quote_permission_group`</td><td>table</td><td>created</td></tr><tr><td>`spy_quote_permission_group_to_permission`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`QuoteResponseTransfer.sharedCustomerQuotes`</td><td>column</td><td>added</td><td>`src/Generated/Shared/Transfer/QuoteResponseTransfer`</td></tr><tr><td>`QuoteTransfer.shareDetails`</td><td>column</td><td>added</td><td>`src/Generated/Shared/Transfer/QuoteTransfer`</td></tr><tr><td>`QuoteUpdateRequestAttributesTransfer.shareDetails`</td><td>column</td><td>added</td><td>`src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer`</td></tr> <tr><td>`ShareDetailTransfer`</td><td>Class</td><td>Created</td><td>`src/Generated/Shared/Transfer/ShareDetailTransfer`</td></tr><tr><td>`ShareDetailCollectionTransfer`</td><td>Class</td><td>Created</td><td>`src/Generated/Shared/Transfer/ShareDetailCollectionTransfer`</td></tr><tr><td>`QuotePermissionGroupTransfer`</td><td>Class</td><td>Created</td><td>`src/Generated/Shared/Transfer/QuotePermissionGroupTransfer`</td></tr><tr><td>`QuotePermissionGroupCriteriaFilterTransfer`</td><td>Class</td><td>Created</td><td>`src/Generated/Shared/Transfer/QuotePermissionGroupCriteriaFilterTransfer`</td></tr><tr><td>`QuotePermissionGroupResponseTransfer`</td><td>Class</td><td>Created</td><td>`src/Generated/Shared/Transfer/QuotePermissionGroupResponseTransfer`</td></tr><tr><td>`ShareCartRequestTransfer`</td><td>Class</td><td>Created</td><td>`src/Generated/Shared/Transfer/ShareCartRequestTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Add Translations
Glossary keys for flash messages:

<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
shared_cart.share.error.already_exist,Cart was already shared with this customer,en_US
shared_cart.share.error.already_exist,Der Warenkorb wurde bereits mit diesem Kunden geteilt,de_DE
```
<br>
</details>


Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that the configured data has been added to the `spy_glossary` table in the database.
{% endinfo_block %}

### 4) Import Data

#### Add Infrastructural Data
Register the following plugins:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`SharedCartPermissionInstallerPlugin`|Installs the registered infrastructural quote permissions.|None|`Spryker\Zed\SharedCart\Communication\Plugin`|
|`ReadSharedCartPermissionPlugin`|Quote permission to check read shared cart permissions in the client layer.|None|`Spryker\Client\SharedCart\Plugin`|
|`WriteSharedCartPermissionPlugin`|Quote permission to check writing shared cart permissions in the client layer.|None|`Spryker\Client\SharedCart\Plugin`|
|`ReadSharedCartPermissionPlugin`|Quote permission to check read shared cart permissions in the zed layer. |None|`Spryker\Zed\SharedCart\Communication\Plugin`|
|`WriteSharedCartPermissionPlugin`|Quote permission to check writing shared cart permissions in the zed layer. |None|`Spryker\Zed\SharedCart\Communication\Plugin`|

<details open>
<summary>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>
    
```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\SharedCart\Communication\Plugin\SharedCartPermissionInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
	/**
	 * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
	 */
	public function getInstallerPlugins()
	{
		return [
			new SharedCartPermissionInstallerPlugin(),
		];
	}
}
```

<br>
 </details>
 
<details open>
<summary>src/Pyz/Client/Permission/PermissionDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use Spryker\Client\SharedCart\Plugin\ReadSharedCartPermissionPlugin;
use Spryker\Client\SharedCart\Plugin\WriteSharedCartPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
	/**
	 * @return \Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface[]
	 */
	protected function getPermissionPlugins(): array
	{
		return [
			new ReadSharedCartPermissionPlugin(),
			new WriteSharedCartPermissionPlugin(),
		];
	}
}
```
<br>
</details>
 
 <details open>
<summary>src/Pyz/Zed/Permission/PermissionDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use Spryker\Zed\SharedCart\Communication\Plugin\ReadSharedCartPermissionPlugin;
use Spryker\Zed\SharedCart\Communication\Plugin\WriteSharedCartPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
	/**
	 * @return \Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface[]
	 */
	protected function getPermissionPlugins()
	{
		return [
			new ReadSharedCartPermissionPlugin(),
			new WriteSharedCartPermissionPlugin(),
		];
	}
}
```
<br>
 </details>

Run the following console command to execute registered installer plugins and install infrastructural data:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}
Make sure that: </br>1. Records with the keys `ReadSharedCartPermissionPlugin` and `WriteSharedCartPermissionPlugin` have been added to the `spy_permission` table.</br>2. In the database the configured infrastructural quote permission groups have been added to the `spy_quote_permission_group` and `spy_quote_permission_group_to_permission` tables.
{% endinfo_block %}

#### Import Carts Sharing

{% info_block infoBox "Info" %}
The following imported entities will be used as carts to the company user relations in the Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/chared-cart-data-import/data/import/shared_cart.csv</summary>

```yaml
quote_key,company_user_key,permission_group_name
quote-22,Spryker--1,FULL_ACCESS
quote-23,Spryker--1,FULL_ACCESS
quote-23,Spryker--2,FULL_ACCESS
quote-23,Spryker--3,FULL_ACCESS
quote-23,Spryker--6,FULL_ACCESS
quote-23,Spryker--4,READ_ONLY
quote-23,Spryker--5,READ_ONLY
```
<br>
</details>

|Column|Is Obligatory?|Data Type|Data Example|Data Explanation|
|---|---|---|---|---|
|`quote_key`|mandatory|string |quote-22|Key that will identify the quote to add data to.|
|`company_user_key`|mandatory|string|Spryker--1|Key that will identify the company user that the quote is shared with.|
|`permission_group_name`|mandatory|string|FULL_ACCESS|Permission group that will be assigned to the shared company user.|

Register the following plugin to enable data import:

|Plugin|Specification|Prerequisites |Namespace|
|---|---|---|---|
|SharedCartDataImportPlugin|Imports customer's quotes sharing to database.| Make sure that customers have been already imported.</br> Make sure that company users have been already imported.</br>Make sure that a cart has been already imported.|Spryker\Zed\SharedCartDataImport\Communication\Plugin|

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\SharedCartDataImport\Communication\Plugin\SharedCartDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	protected function getDataImporterPlugins(): array
	{
		return [
			new SharedCartDataImportPlugin(),
		];
	}
}
```
<br>
</details>

Run the following console command to import data:

```bash
console data:import shared-cart
```

{% info_block warningBox "Verification" %}
Open the `spy_quote_company_user` DB table and make sure that all the data has been imported.
{% endinfo_block %}

### 5) Set up Behavior

{% info_block infoBox "Info" %}
This feature requires the database storage strategy enabled in the quote module.
{% endinfo_block %}

#### Quote Integration

Register the following plugins:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`CleanQuoteShareBeforeQuoteCreatePlugin`|Cleans up the cart shared details before the quote has been created.|None|`Spryker\Zed\SharedCart\Communication\Plugin`|
|`DeactivateSharedQuotesBeforeQuoteSavePlugin`|Deactivates all shared carts for the current customer if the current cart in marked as active before the cart has been created or updated. |None|`Spryker\Zed\SharedCart\Communication\Plugin`|
|`MarkAsDefaultQuoteAfterSavePlugin`|Updates the is active flag for the current shared cart based the active flag for the sharing relation.</br>It is executed after the cart has been created or updated.|None|`Spryker\Zed\SharedCart\Communication\Plugin`|
|`RemoveSharedQuoteBeforeQuoteDeletePlugin`|Removes the sharing relation for the current cart before the cart has been removed.|None|`Spryker\Zed\SharedCart\Communication\Plugin`|
|`UpdateShareDetailsQuoteAfterSavePlugin`|Updates the cart sharing relations after the cart has been created or updated.|None|`Spryker\Zed\SharedCart\Communication\Plugin`|
|`SharedQuoteSetDefaultBeforeQuoteSavePlugin`|Marks the cart sharing relation for the current customer as active if the quote has been marked as active.|None|`Spryker\Zed\SharedCart\Communication\Plugin`|

{% info_block infoBox "Information" %}
All shared cart plugins must be added after the multi-cart plugins have been registered.
{% endinfo_block %}

<details open>
<summary>src/Pyz/Zed/Quote/QuoteDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use Spryker\Zed\SharedCart\Communication\Plugin\CleanQuoteShareBeforeQuoteCreatePlugin;
use Spryker\Zed\SharedCart\Communication\Plugin\DeactivateSharedQuotesBeforeQuoteSavePlugin;
use Spryker\Zed\SharedCart\Communication\Plugin\MarkAsDefaultQuoteAfterSavePlugin;
use Spryker\Zed\SharedCart\Communication\Plugin\RemoveSharedQuoteBeforeQuoteDeletePlugin;
use Spryker\Zed\SharedCart\Communication\Plugin\SharedQuoteSetDefaultBeforeQuoteSavePlugin;
use Spryker\Zed\SharedCart\Communication\Plugin\UpdateShareDetailsQuoteAfterSavePlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
	/**
	 * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface[]
	 */
	protected function getQuoteCreateBeforePlugins(): array
	{
		return [
			new CleanQuoteShareBeforeQuoteCreatePlugin(),
			new DeactivateSharedQuotesBeforeQuoteSavePlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface[]
	 */
	protected function getQuoteUpdateAfterPlugins(): array
	{
		return [
			new UpdateShareDetailsQuoteAfterSavePlugin(),
			new MarkAsDefaultQuoteAfterSavePlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface[]
	 */
	protected function getQuoteUpdateBeforePlugins(): array
	{
		return [
			new DeactivateSharedQuotesBeforeQuoteSavePlugin(),
			new SharedQuoteSetDefaultBeforeQuoteSavePlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface[]
	 */
	protected function getQuoteDeleteBeforePlugins(): array
	{
		return [
			new RemoveSharedQuoteBeforeQuoteDeletePlugin(),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
The shared quote can be marked as default for a customer that has access. The `is_default` field in BD table `spy_quote_company_user` must be set to true in the corresponding record.<br> A new record will be added to `spy_quote_company_user` if sharing quote functionality used.
{% endinfo_block %}

#### Persistent Cart Integration

Register the following plugins:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`SharedCartsUpdateQuoteUpdatePlugin`|Adds shared cart list to multi-cart collection.</br>Sorts the collection by name.</br>Saves the multi-cart collection in the session. |`SharedCartQuoteResponseExpanderPlugin` should be included. It should be executed after `\Spryker\Client\MultiCart\Plugin\SaveCustomerQuotesQuoteUpdatePlugin` has been registered and before `\Spryker\Client\MultiCart\Plugin\DefaultQuoteUpdatePlugin` has been registered.|`Spryker\Client\SharedCart\Plugin`|
|`ProductSeparatePersistentCartChangeExpanderPlugin`|Allows adding a product as a separate item if the product with the same SKU already exists in the cart.|1|`Spryker\Client\SharedCart\Plugin`|
|`PermissionUpdateQuoteUpdatePlugin`|Takes a permission list from `QuoteResponseTransfer` and updates a customer from the session.|`SharedCartQuoteResponseExpanderPlugin` should be included.|`Spryker\Client\SharedCart\Plugin`|
|`SharedCartQuoteResponseExpanderPlugin`|Expands `QuoteResponseTransfer` with the following shared cart related data:</br>1) Carts shared with the customer.</br>2) Customer permission list.</br>3) Expands a customer cart with the sharing data.|1|`Spryker\Zed\SharedCart\Communication\Plugin`|

<details open>
<summary>src/Pyz/Client/PersistentCart/PersistentCartDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Client\PersistentCart;

use Spryker\Client\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;
use Spryker\Client\SharedCart\Plugin\PermissionUpdateQuoteUpdatePlugin;
use Spryker\Client\SharedCart\Plugin\ProductSeparatePersistentCartChangeExpanderPlugin;
use Spryker\Client\SharedCart\Plugin\SharedCartsUpdateQuoteUpdatePlugin;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
	/**
	 * @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\QuoteUpdatePluginInterface[]
	 */
	protected function getQuoteUpdatePlugins(): array
	{
		return [
			new SharedCartsUpdateQuoteUpdatePlugin(),
			new PermissionUpdateQuoteUpdatePlugin(),
		];
	}

	/**
	 * @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\PersistentCartChangeExpanderPluginInterface[]
	 */
	protected function getChangeRequestExtendPlugins(): array
	{
		return [
			new ProductSeparatePersistentCartChangeExpanderPlugin(),
		];
	}
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/PersistentCart/PersistentCartDependencyProvider.php</summary> 

```php
<?php

namespace Pyz\Zed\PersistentCart;

use Spryker\Zed\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;
use Spryker\Zed\SharedCart\Communication\Plugin\SharedCartQuoteResponseExpanderPlugin;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
	/**
	 * @return \Spryker\Zed\PersistentCartExtension\Dependency\Plugin\QuoteResponseExpanderPluginInterface[]
	 */
	protected function getQuoteResponseExpanderPlugins(): array
	{
		return [
			new SharedCartQuoteResponseExpanderPlugin(),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
After adding items to cart, the following things must be done:<br>Quotes shared with the current customer must be added to the multi-cart session ;<br>`CustomerTransfer::$permissions` must contain permissions must be updated in customer session;
{% endinfo_block %}

#### Set up Permission Integration

Register the following plugin:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`QuotePermissionStoragePlugin` |Shared cart permission provider. |None|`Spryker\Zed\SharedCart\Communication\Plugin`|

<details open>
<summary>src/Pyz/Zed/Permission/PermissionDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use Spryker\Zed\SharedCart\Communication\Plugin\QuotePermissionStoragePlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
	/**
	 * @return \Spryker\Zed\PermissionExtension\Dependency\Plugin\PermissionStoragePluginInterface[]
	 */
	protected function getPermissionStoragePlugins(): array
	{
		return [
			new QuotePermissionStoragePlugin(), #SharedCartFeature
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
A customer cannot add an item to the read-only shared quote.
{% endinfo_block %}

#### Set up Customer Integration

Register the following plugin:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`QuotePermissionCustomerExpanderPlugin`|	Expands customer with shared cart permissions. |None|`Spryker\Zed\SharedCart\Communication\Plugin`|

<details open>
<summary>src/Pyz/Zed/Customer/CustomerDependencyProvider.php</summary>

```php
	<?php

	namespace Pyz\Zed\Customer;

	use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
	use Spryker\Zed\SharedCart\Communication\Plugin\QuotePermissionCustomerExpanderPlugin;

	class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
	{
		/**
		* @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface[]
		*/
		protected function getCustomerTransferExpanderPlugins()
		{
			return [
				new QuotePermissionCustomerExpanderPlugin(),
			];
		}
	}		
```
<br>
</details>

{% info_block warningBox "Verification" %}
Logged in customer's `CustomerTransfer::$permissions` must contain permissions `ReadSharedCartPermissionPlugin` and `WriteSharedCartPermissionPlugin`.
{% endinfo_block %}

#### Set up Company User Integration

Register the following plugin:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`SharedCartCompanyUserPreDeletePlugin`|Removes all company users from the cart relations before a company user has been removed.|None|`Spryker\Zed\SharedCart\Communication\Plugin\CompanyUserExtension`|

<details open>
<summary>src/Pyz/Zed/CompanyUser/CompanyUserDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\CompanyUser;

use Spryker\Zed\CompanyUser\CompanyUserDependencyProvider as SprykerCompanyUserDependencyProvider;
use Spryker\Zed\SharedCart\Communication\Plugin\CompanyUserExtension\SharedCartCompanyUserPreDeletePlugin;

class CompanyUserDependencyProvider extends SprykerCompanyUserDependencyProvider
{
	/**
	 * @return \Spryker\Zed\CompanyUserExtension\Dependency\Plugin\CompanyUserPreDeletePluginInterface[]
	 */
	protected function getCompanyUserPreDeletePlugins(): array
	{
		return [
			new SharedCartCompanyUserPreDeletePlugin(),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Before removing company user, all records from DB table `spy_quote_company_user` related to company user must be removed.
{% endinfo_block %}

## Install Feature Frontend

### Prerequisites

Please review and install the necessary features before beginning the integration step.

|Name|Version|
|---|---|
|Cart|201907.0|
|Persistent Cart|201907.0|
|Multiple Carts|201907.0|
|Spryker Core E-commerce|201907.0|

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/shared-carts: "^201907.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`SharedCartPage`</td><td>`vendor/spryker-shop/shared-cart-page`</td></tr><tr><td>`SharedCartWidget`</td><td>`vendor/spryker-shop/shared-cart-widget`</td>`</tr>`</tbody></table>
{% endinfo_block %}

### 2) Add Translations

Append glossary according to your configuration:

<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
shared_cart_widget.add_product.separate,"Add as separate item",en_US
shared_cart_widget.add_product.separate,"Als separaten Artikel hinzufügen",de_DE
shared_cart_widget.cart.share,"Share cart",en_US
shared_cart_widget.cart.share,"Warenkorb teilen",de_DE
shared_cart_widget.cart.unshare,"Unshare cart",en_US
shared_cart_widget.cart.unshare,"Freigabewagen wird aufgehoben",de_DE
shared_cart_widget.cart.dismiss,Dismiss,en_US
shared_cart_widget.cart.dismiss,Ablehnen,de_DE
shared_cart_widget.share_list.shared_with,Cart shared with,en_US
shared_cart_widget.share_list.shared_with,Warenkorb geteilt mit,de_DE
shared_cart_widget.share_list.customer_name,Customer name,en_US
shared_cart_widget.share_list.customer_name,Kundenname,de_DE
shared_cart_widget.share_list.permission,Access level,en_US
shared_cart_widget.share_list.permission,Zugriffsebene,de_DE
shared_cart_widget.share_list.actions,Actions,en_US
shared_cart_widget.share_list.actions,Aktionen,de_DE
shared_cart_widget.share_list.action.unshare,Unshare cart,en_US
shared_cart_widget.share_list.action.unshare,Freigabe des Einkaufswagens,de_DE
shared_cart.share_list.permissions.NO_ACCESS,No access,en_US
shared_cart.share_list.permissions.NO_ACCESS,Kein Zugang,de_DE
shared_cart.share_list.permissions.READ_ONLY,Read-only,en_US
shared_cart.share_list.permissions.READ_ONLY,Schreibgeschützt,de_DE
shared_cart.share_list.permissions.FULL_ACCESS,Full access,en_US
shared_cart.share_list.permissions.FULL_ACCESS,Ohne Einschränkung,de_DE
shared_cart.share_list.permissions.OWNER_ACCESS,Owner access,en_US
shared_cart.share_list.permissions.OWNER_ACCESS,Eigentümer Zugriff,de_DE
shared_cart.form.share_cart,"Share cart",en_US
shared_cart.form.share_cart,"Warenkorb teilen",de_DE
shared_cart.form.share_cart.title,"Share cart ""cart_name""",en_US
shared_cart.form.share_cart.title,"Warenkorb teilen ""cart_name""",de_DE
shared_cart.form.customer,"Customer name",en_US
shared_cart.form.customer,Kundenname,de_DE
shared_cart.form.select_customer,Select customer,en_US
shared_cart.form.select_customer,"Wählen Sie den Kunden aus",de_DE
shared_cart.form.select_permissions,Select access level,en_US
shared_cart.form.select_permissions,"Wählen Sie Zugriffsebene",de_DE
shared_cart.form.share_button,Share,en_US
shared_cart.form.share_button,Aktie,de_DE
shared_cart.form.save_button,Save,en_US
shared_cart.form.save_button,Sparen,de_DE
shared_cart.form.data_empty,"There are no Users with whom you can share shopping cart.",en_US
shared_cart.form.data_empty,"Es gibt keine Benutzer, mit denen Sie den Einkaufswagen teilen können.",de_DE
shared_cart.share.breadcrumbs.share,Share,en_US
shared_cart.share.breadcrumbs.share,Teilen,de_DE
shared_cart.share.breadcrumbs.shopping_carts,Shopping carts,en_US
shared_cart.share.breadcrumbs.shopping_carts,Warenkörbe,de_DE
shared_cart.share.form.users,Users,en_US
shared_cart.share.form.users,Benutzer,de_DE
shared_cart_page.share.success,Cart was successfully shared,en_US
shared_cart_page.share.success,Warenkorb wurde erfolgreich geteilt,de_DE
shared_cart_page.unshare.success,Cart was successfully unshared,en_US
shared_cart_page.unshare.success,Teilen des Warenkorbs wurde erfolgreich aufgehoben ,de_DE
shared_cart_page.dismiss_confirmation.warning,Warning,en_US
shared_cart_page.dismiss_confirmation.warning,Warnung,de_DE
shared_cart.dismiss.title,Dismiss shared cart ‘quote_name’,en_US
shared_cart.dismiss.title,Warenkorb ‘quote_name’ ablehnen,de_DE
shared_cart_page.share.breadcrumbs.dismiss,Dismiss,en_US
shared_cart_page.share.breadcrumbs.dismiss,Ablehnen,de_DE
shared_cart_page.cart.dismiss,Dismiss,en_US
shared_cart_page.cart.dismiss,Ablehnen,de_DE
shared_cart_page.dismiss_confirmation.trying_to_dismiss,Are you sure that you what to dismiss shopping cart?,en_US
shared_cart_page.dismiss_confirmation.trying_to_dismiss,"Sind Sie sicher, dass Sie den Warenkorb ablehnen wollen?",de_DE
shared_cart_page.dismiss.success,Shopping cart was dismissed successfully.,en_US
shared_cart_page.dismiss.success,Warenkorb wurde erfolgreich abgelehnt.,de_DE
```
<br>
</details>

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data has been added to the `spy_glossary` table.
{% endinfo_block %}

### 3) Set up Widgets

Register the following global widgets:

|Plugin|Description|Prerequisites|Namespace|
|---|---|---|---|
|`SharedCartPermissionGroupWidget`|Adds a cart access level for the multicart list to the header. |None|`SprykerShop\Yves\SharedCartWidget\Widget`|
|`CartListPermissionGroupWidget`|Adds the cart access level column and share/dismiss links to the action column for the multicart list page.|None|`SprykerShop\Yves\SharedCartWidget\Widget`|
|`CartDeleteCompanyUsersListWidget`|Renders a list, shared with the customer, for the cart confirm delete page.|None|`SprykerShop\Yves\SharedCartWidget\Widget`|

<details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary> 

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\SharedCartWidget\Widget\CartDeleteCompanyUsersListWidget;
use SprykerShop\Yves\SharedCartWidget\Widget\CartListPermissionGroupWidget;
use SprykerShop\Yves\SharedCartWidget\Widget\SharedCartPermissionGroupWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			CartDeleteCompanyUsersListWidget::class,
			CartListPermissionGroupWidget::class,
			SharedCartPermissionGroupWidget::class,
		];
	}
}
```
<br>
</details>

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}
Make sure that the following plugin has been registered:<br>Open Yves and log in with customer.<table><thead><tr><th>Module</th><th>Test</th></tr></thead><tbody><tr><td>`SharedCartPermissionGroupWidget`</td><td>Hover over the multicart list in the header: it should contain the access column.</td></tr><tr><td>`CartListPermissionGroupWidget`</td><td>Open `https://mysprykershop.com/multi-cart/` - the page should contain the access column and share cart link</td></tr><tr><td>`CartDeleteCompanyUsersListWidget`</td><td>Open `https://mysprykershop.com/multi-cart/`. Click on the share cart link. <br />Share the cart and click on the delete link.<br />The list of customers whom this cart is shared with should appear on the delete confirmation page.</td></tr></tbody></table>
{% endinfo_block %}

### 4) Enable Controllers

Register the following plugin:

|Plugin|Description|Prerequisites|Namespace|
|---|---|---|---|
|`SharedCartPageControllerProvider`|Provides routes used in `SharedCartPage.` |None|`SprykerShop\Yves\SharedCartPage\Plugin\Provider`|

<details open>
<summary>src/Pyz/Yves/ShopApplication/YvesBootstrap.php</summary> 

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\SharedCartPage\Plugin\Provider\SharedCartPageControllerProvider;
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
			new SharedCartPageControllerProvider($isSsl), #SharedCartFeature
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that the following plugin has been registered:<ol><li> Open Yves and log in with customer.</li><li>Open `https://mysprykershop.com/multi-cart/` - the page should contain all customer's quotes.</li><li>Click on the share link. The share cart page should open.</li></ol>
{% endinfo_block %}
