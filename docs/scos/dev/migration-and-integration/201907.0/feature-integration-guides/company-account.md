---
title: Company Account Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/company-account-integration
redirect_from:
  - /v3/docs/company-account-integration
  - /v3/docs/en/company-account-integration
---

{% info_block errorBox %}
The following Feature Integration guide expects the basic feature to be in place. The current Feature Integration guide only adds the **Business on Behalf**, **Company Account Storage**, and **Company Account OAuth functionality**.
{% endinfo_block %}

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/company-account: "^201907.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`BusinessOnBehalf`</td><td>`vendor/spryker/business-on-behalf`</td></tr><tr><td>`BusinessOnBehalfDataImport`</td><td>`vendor/spryker/business-on-behalf-data-import`</td></tr><tr><td>`CompanyUserStorage`</td><td>`vendor/spryker/company-user-storage`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer objects
Adjust the schema definition so entity changes will trigger events.

| Affected Entity | Triggered Events |
| --- | --- |
| `spy_company` | `Entity.spy_company.update`</br>`Entity.spy_company.delete` |
| `spy_company_user` | `Entity.spy_company_user.`</br>`Entity.spy_company_user.update`</br>`Entity.spy_company_user.delete` |

<details open>   <summary>src/Pyz/Zed/CompanyUser/Persistence/Propel/Schema/spy_company_user.schema.xml</summary>
    
```html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
	   xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
	   namespace="Orm\Zed\CompanyUser\Persistence" package="src.Orm.Zed.CompanyUser.Persistence">
  
	<table name="spy_company_user">
		<behavior name="event">
			<parameter name="spy_company_user_all" column="*"/>
		</behavior>
    </table>
  
    </database>
```   
<br>
</details>

<details open><summary>src/Pyz/Zed/Company/Persistence/Propel/Schema/spy_company.schema.xml</summary>
    
```html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
	   xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
	   namespace="Orm\Zed\Company\Persistence" package="src.Orm.Zed.Company.Persistence">
  
	<table name="spy_company">
		<behavior name="event">
			<parameter name="spy_company_is_active" column="is_active"/>
			<parameter name="spy_company_status" column="status"/>
        </behavior>
	</table>
  
    </database>
```
<br>
</details>

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><th>Database Entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_company_user.is_default`</td><td>column</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`CompanyUser.isDefault`</td><td>property</td><td>created</td><td>`src/Generated/Shared/Transfer/CompanyUserTransfer`</td></tr><tr><td>`Customer.isOnBehalf`</td><td>property</td><td>created</td><td>`src/Generated/Shared/Transfer/CustomerTransfer`</td></tr><tr><td>`CompanyUserAccessTokenRequestclass`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CompanyUserAccessTokenRequestTransfer`</td></tr><tr><td>`CompanyUserStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CompanyUserStorageTransfer`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that propel entities have been generated successfully by checking their existence. Also, change the generated entity classes to extend from Spryker core classes.<table><col  /><col  /><thead><tr><th>Class Path</th><th>Extends</th></tr></thead><tbody><tr><td>`src/Orm/Zed/CompanyUserStorage/Persistence/SpyCompanyUserStorage.php`</td><td>`Spryker\Zed\CompanyUserStorage\Persistence\Propel\AbstractSpyCompanyUserStorage`</td></tr><tr><td>`src/Orm/Zed/CompanyUserStorage/Persistence/SpyCompanyUserStorageQuery.php`</td><td>`Spryker\Zed\CompanyUserStorage\Persistence\Propel\AbstractSpyCompanyUserStorageQuery`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the changes have been implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:<table><thead><tr><th>Path</th><th>Method Name</th></tr></thead><tbody><tr><td>`src/Orm/Zed/CompanyUser/Persistence/Base/SpyCompanyUser.php`</td><td>`prepareSaveEventName(
{% endinfo_block %}`<br>`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`</td></tr><tr><td>`src/Orm/Zed/Company/Persistence/Base/SpyCompany.php`</td><td>`prepareSaveEventName()`<br>`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`</td></tr><tr><td>`src/Orm/Zed/CompanyUserStorage/Persistence/Base/SpyCompanyUserStorage.php`</td><td>`sendToQueue()`</td></tr></tbody></table>)

### 3) Configure Export to Redis
#### Set up Event Listeners
With this step, you will be able to publish tables on change (create, edit, delete) to the `spy_company`, `spy_company_user` and synchronize the data to Storage.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CompanyUserStorageEventSubscriber` | Registers listeners that are responsible for publishing company user storage entity changes when a related entity change event occurs. | None | `NoneSpryker\Zed\CompanyUserStorage\Communication\Plugin\Event\Subscriber` |

<details open>
<summary>src/Pyz/Zed/Event/EventDependencyProvider.php</summary>
    
```php
<?php
  
namespace Pyz\Zed\Event;
  
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\CompanyUserStorage\Communication\Plugin\Event\Subscriber\CompanyUserStorageEventSubscriber;
  
class EventDependencyProvider extends SprykerEventDependencyProvider
{
	public function getEventSubscriberCollection()
	{
		$eventSubscriberCollection = parent::getEventSubscriberCollection();
		$eventSubscriberCollection->add(new CompanyUserStorageEventSubscriber());
  
		return $eventSubscriberCollection;
	}
}
```
<br>
</details>

Set up synchronization queue pools so that non-multistore entities (not store-specific entities) are synchronized among stores:

<details open>
<summary>src/Pyz/Zed/CompanyUserStorage/CompanyUserStorageConfig.php</summary>

```php
<?php
 
namespace Pyz\Zed\CompanyUserStorage;
 
use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\CompanyUserStorage\CompanyUserStorageConfig as SprykerCompanyUserStorageConfig;
 
class CompanyUserStorageConfig extends SprykerCompanyUserStorageConfig
{
	public function getCompanyUserSynchronizationPoolName(): ?string
	{
		return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
	}
}
```
<br>
</details>

#### Set up Re-Generate and Re-Sync Features

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CompanyUserSynchronizationDataPlugin` | Allows synchronizing the whole storage table content into Storage. | None | `Spryker\Zed\CompanyUserStorage\Communication\Plugin\Synchronization` |

<details open>
<summary>src/Pyz/Zed/CompanyUserStorage/CompanyUserStorageConfig.php</summary>

```php
<?php
  
namespace Pyz\Zed\CompanyUserStorage;
  
use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\CompanyUserStorage\CompanyUserStorageConfig as SprykerCompanyUserStorageConfig;
  
class CompanyUserStorageConfig extends SprykerCompanyUserStorageConfig
{
	/**
	 * @return string|null
	 */
	public function getCompanyUserSynchronizationPoolName(): ?string
	{
		return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
	}
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php</summary>

```php
<?php
  
namespace Pyz\Zed\Synchronization;
  
use Spryker\Zed\CompanyUserStorage\Communication\Plugin\Synchronization\CompanyUserSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;
  
class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
	/**
	 * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
	 */
	protected function getSynchronizationDataPlugins(): array
	{
		return [
			new CompanyUserSynchronizationDataPlugin(),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that when a company user is created, updated or deleted, when company's status changes or company is activated/deactivated the corresponding company users' records are exported (or removed
{% endinfo_block %} to Redis.<table><thead><tr><th>Storage Type</th><th>Target Entity</th><th>Example Expected Data Identifier</th></tr></thead><tbody><tr><td>Redis</td><td>Company User</td><td>`kv:company_user:1`</td></tr></tbody></table>)

<details open>
<summary>Example Expected Data Fragment</summary>

```yaml
{
	"id_company_business_unit":13,
	"id_company_user":1,
	"id_company":6,
	"uuid":"4c677a6b-2f65-5645-9bf8-0ef3532bead1"
}
```
<br>
</details>

### 4) Import Data
#### Import Business On Behalf

{% info_block infoBox "Info" %}
The following imported entities will be used as data for **Business on Behalf Company Users** (b2b extension for Company User module
{% endinfo_block %} in Spryker OS.)

Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/spryker/Bundles/BusinessOnBehalfDataImport/data/import/company_user.csv</summary>

```yaml
customer_reference,company_key,business_unit_key,default
DE--6,BoB-Hotel-Mitte,business-unit-mitte-1,0
DE--6,BoB-Hotel-Mitte,business-unit-mitte-2,0
DE--6,BoB-Hotel-Mitte,business-unit-mitte-3,0
DE--7,BoB-Hotel-Jim,business-unit-jim-1,0
DE--7,BoB-Hotel-Mitte,business-unit-mitte-1,0
DE--7,BoB-Hotel-Kudamm,business-unit-kudamm-1,0
DE--7,spryker_systems,spryker_systems_HQ,0
```
<br>
</details>

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `customer_reference` | mandatory | string | DE--6 | The key that will identify the Customer to add data to. |
| `company_key` | mandatory | string | BoB-Hotel-Mitte | The key that will identify the Company to add data to. |
| `business_unit_key` | mandatory | string | business-unit-mitte-1 | The key that will identify the Company Business Unit to add data to. |
| `default` | mandatory | bool integer | 0 | Decides if there will be some pre-selected Company Business Unit for BoB User. |

Register the following plugins to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `BusinessOnBehalfCompanyUserDataImportPlugin` | Imports Business on Behalf Company Users. | <ul><li>Assumes that the Customer keys exist in the database.</li><li>Assumes that the Company keys exist in the database</li><li>Assumes that the Company Business Unit keys exist in the database.</li></ul> | `Spryker\Zed\BusinessOnBehalfDataImport\Communication\Plugin\DataImport` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php
  
namespace Pyz\Zed\DataImport;
  
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\BusinessOnBehalfDataImport\Communication\Plugin\DataImport\BusinessOnBehalfCompanyUserDataImportPlugin;
  
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	protected function getDataImporterPlugins(): array
	{
		return [
			new BusinessOnBehalfCompanyUserDataImportPlugin(),
		];
	}
}
```
<br>
</details>

Run the following console command to import data:

```bash
console data:import company-user-on-behalf
```

{% info_block warningBox "Verification" %}
Make sure that the configured data are added to the `spy_company_user` table in the database.
{% endinfo_block %}

### 5) Set up Behavior
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `DefaultCompanyUserCustomerTransferExpanderPlugin` | Sets default Company User for a Business on Behalf customer if no Company User has been selected yet. | None | `Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer` |
| `IsOnBehalfCustomerTransferExpanderPlugin` | Sets the `CustomerTransfer.IsOnBehalf` property so that other features can determine if the selected Company User is a Business on Behalf Company User. | None | `Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer` |
| `CompanyUserAccessTokenAuthenticationHandlerPlugin` | Provides functionality to log in customer by access token. | None | `Spryker\Client\OauthCompanyUser\Plugin\Customer` |
| `CompanyUserReloadCustomerTransferExpanderPlugin` | Reloads company user if it is already set in `CustomerTransfer`. | None | `Spryker\Zed\CompanyUser\Communication\Plugin\Customer` |
| `CompanyUserAccessTokenOauthUserProviderPlugin` | Provides user transfer by company user id. | None | `Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth` |
| `CompanyUserAccessTokenOauthGrantTypeConfigurationProviderPlugin` | Provides configuration of `CompanyUser` `GrantType`. | None | `Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth` |
| `OauthCompanyUserInstallerPlugin`| Creates new OAuth scope (Adds `company_user scope` to the `spy_oauth_scope` table.) | None | `Spryker\Zed\OauthCompanyUser\Communication\Plugin\Installer` |
| `CompanyUserOauthScopeProviderPlugin` | Associates the `company_user` scope with the password Oauth GrandType. | None | `Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth` |
| `CompanyUserOauthUserProviderPlugin` | Associates the `company_user` scope with `idCompanyUser` Oauth GrandType. | None | `Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth` |
| `IdCompanyUserOauthGrantTypeConfigurationProviderPlugin` | Provides new `IdCompanyUser` Oauth GrandType. | None | `Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth` |
| `CompanyBusinessUnitCompanyUserStorageExpanderPlugin` | Expands the `CompanyUserStorageTransfer` with the company business unit id. | None | `Spryker\Zed\CompanyBusinessUnitStorage\Communication\Plugin` |

<details open>
<summary>src/Pyz/Zed/Customer/CustomerDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\Customer;
 
use Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer\DefaultCompanyUserCustomerTransferExpanderPlugin;
use Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer\IsOnBehalfCustomerTransferExpanderPlugin;
use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
 
class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
	/**
	 * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface[]
	 */
	protected function getCustomerTransferExpanderPlugins()
	{
		return [
			new IsOnBehalfCustomerTransferExpanderPlugin(),
			new DefaultCompanyUserCustomerTransferExpanderPlugin(),
		];
	}
}
```
<br>
</details>

<details open>
<summary>Pyz\Client\Customer\CustomerDependencyProvider</summary>

```php
<?php
 
namespace Pyz\Client\Customer;
 
use Spryker\Client\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Client\CustomerExtension\Dependency\Plugin\AccessTokenAuthenticationHandlerPluginInterface;
use Spryker\Client\OauthCompanyUser\Plugin\Customer\CompanyUserAccessTokenAuthenticationHandlerPlugin;
 
class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
	/**
	 * @return \Spryker\Client\CustomerExtension\Dependency\Plugin\AccessTokenAuthenticationHandlerPluginInterface
	 */
	protected function getAccessTokenAuthenticationHandlerPlugin(): AccessTokenAuthenticationHandlerPluginInterface
	{
		return new CompanyUserAccessTokenAuthenticationHandlerPlugin();
	}
}
```
<br>
</details>

<details open>
<summary>Pyz\Zed\Customer\CustomerDependencyProvider</summary>

```php
<?php
 
namespace Pyz\Zed\Customer;
 
use Spryker\Zed\CompanyUser\Communication\Plugin\Customer\CompanyUserReloadCustomerTransferExpanderPlugin;
use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
 
class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
	/**
	 * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface[]
	 */
	protected function getCustomerTransferExpanderPlugins()
	{
		return [
			new CompanyUserReloadCustomerTransferExpanderPlugin(),
		];
	}
}
```
<br>
</details>

<details open>
<summary>Pyz\Zed\Oauth\OauthDependencyProvider</summary>

```php
<?php
 
namespace Pyz\Zed\Oauth;
 
use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth\IdCompanyUserOauthGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth\CompanyUserOauthScopeProviderPlugin;
use Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth\CompanyUserAccessTokenOauthGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth\CompanyUserAccessTokenOauthUserProviderPlugin;
 
class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
	/**
	 * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface[]
	 */
	protected function getUserProviderPlugins(): array
	{
		return [
			new CompanyUserAccessTokenOauthUserProviderPlugin(),
			new CompanyUserOauthUserProviderPlugin(),
		];
	}
 
	/**
	 * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface[]
	 */
	protected function getScopeProviderPlugins(): array
	{
		return [
			new CompanyUserOauthScopeProviderPlugin(),
		];
	}
 
	/**
	 * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthGrantTypeConfigurationProviderPluginInterface[]
	 */
	protected function getGrantTypeConfigurationProviderPlugins(): array
	{
		return array_merge(parent::getGrantTypeConfigurationProviderPlugins(), [
			new IdCompanyUserOauthGrantTypeConfigurationProviderPlugin(),
			new CompanyUserAccessTokenOauthGrantTypeConfigurationProviderPlugin(),
		]);
	}
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/CompanyUserStorage/CompanyUserStorageDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\CompanyUserStorage;
 
use Spryker\Zed\CompanyBusinessUnitStorage\Communication\Plugin\CompanyBusinessUnitCompanyUserStorageExpanderPlugin;
use Spryker\Zed\CompanyUserStorage\CompanyUserStorageDependencyProvider as SprykerCompanyUserStorageDependencyProvider;
 
class CompanyUserStorageDependencyProvider extends SprykerCompanyUserStorageDependencyProvider
{
	/**
	 * @return \Spryker\Zed\CompanyUserStorageExtension\Dependency\Plugin\CompanyUserStorageExpanderPluginInterface[]
	 */
	protected function getCompanyUserStorageExpanderPlugins(): array
	{
		return [
			new CompanyBusinessUnitCompanyUserStorageExpanderPlugin(),
		];
	}
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\Installer;
 
use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
 
class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
	/**
	 * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
	 */
	public function getInstallerPlugins()
	{
		return [
			new OauthCompanyUserInstallerPlugin(),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Log in with a customer who has multiple Company Users and a default one. Check in the session if the default Company User was assigned to the Customer. Check in the session if the `IsOnBehalf` property is set correctly for the Customer.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that token generation for a company user works. For more information, see [HowTo: Generate a Token for Login](/docs/scos/dev/tutorials/201907.0/howtos/feature-howtos/ht-generating-t
{% endinfo_block %}.)

{% info_block warningBox "Verification" %}
To make sure the `CompanyBusinessUnitCompanyUserStorageExpanderPlugin` was set up correctly, you need to check the data exported to the key-value storage key `kv:company_user:1` for the `id_company_business_unit:id`. `id_company_business_unit` needs to be set up to a correct foreign key of the business unit the company user is assigned to.
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
Overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- | --- |
| Spryker Core | 201907.0 | 
| Customer Account Management | 201907.0 | 
| Company Account | 201907.0 | 

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/company-account: "^201907.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><col  /><col  /><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`BusinessOnBehalfWidget`></td><td>`vendor/spryker-shop/business-on-behalf-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations
Append glossary according to your configuration:

<details open>
<summary>src/data/import/glossary.csv</summary>

```bash
business_on_behalf_widget.no_selected_company,No selected company,en_US
business_on_behalf_widget.no_selected_company,Kein Unternehmen ausgewählt,de_DE
business_on_behalf_widget.change_company_user,Change Company User,en_US
business_on_behalf_widget.change_company_user,Firmenbenutzer Profil ändern,de_DE
company_user.business_on_behalf.error.company_not_active,"You can not select this company user, company is not active.",en_US
company_user.business_on_behalf.error.company_not_active,"Sie können diesen Firmennutzer nicht auswählen da die Firma inaktiv ist",de_DE
company_user.business_on_behalf.error.company_user_invalid,"You can not select this company user, it is invalid.",en_US
company_user.business_on_behalf.error.company_user_invalid,"Sie können diesen Firmennutzer nicht auswählen da er ungültig ist",de_DE
customer_page.error.customer_already_logged_in,Customer already logged in.,en_US
customer_page.error.customer_already_logged_in,Der Kunde ist bereits eingeloggt.,de_DE
customer_page.error.invalid_access_token,Invalid access token.,en_US
customer_page.error.invalid_access_token,Ungültiges Zugriffstoken.,de_DE
```
<br>
</details>

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data is added to the `spy_glossary` table.
{% endinfo_block %}

### 3) Set up Widgets
Register the following plugins to enable widgets:

| Plugin | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `BusinessOnBehalfStatusWidget` | Displays the selected Company Users and allows for Business on Behalf customers to change it through a link. | None | `SprykerShop\Yves\BusinessOnBehalfWidget\Widget` |

<details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\BusinessOnBehalfWidget\Widget\BusinessOnBehalfStatusWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
 
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			BusinessOnBehalfStatusWidget::class,
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
Log in with a Business on Behalf customer and see the selected Company User status widget in the top menu.
{% endinfo_block %}

<!-- See also:
Integrate Glue Company Account feature into your project -->
