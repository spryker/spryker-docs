---
title: Company Account feature integration
description: The guide walks you through the process of installing Business on Behalf, Company Account Storage, and Company Account OAuth functionality into your project.
last_updated: Sep 14, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/company-account-integration
originalArticleId: b92b808b-5cc3-40a6-bb77-20a32cf63d68
redirect_from:
  - /v5/docs/company-account-integration
  - /v5/docs/en/company-account-integration
related:
  - title: Glue API - Company Account feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/glue-api/glue-api-company-account-feature-integration.html
  - title: Company Account + Order Management feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/company-account-order-management-feature-integration.html
---

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds the **Business on Behalf**, **Company Account Storage**, and **Company Account OAuth functionality**.

{% endinfo_block %}

## Install Feature Core
Follow the steps below to install feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/company-account: "^{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:

|Module|Expected Directory|
|--- |--- |
|`BusinessOnBehalf`|`vendor/spryker/business-on-behalf`|
|`BusinessOnBehalfDataImport`|`vendor/spryker/business-on-behalf-data-import`|
|`CompanyUserStorage`|`vendor/spryker/company-user-storage`|

{% endinfo_block %}

### 2) Set up Database Schema and Transfer objects

Adjust the schema definition so entity changes will trigger events.

| Affected Entity | Triggered Events |
| --- | --- |
| `spy_company` | `Entity.spy_company.update`<br>`Entity.spy_company.delete` |
| `spy_company_user` | `Entity.spy_company_user.`<br>`Entity.spy_company_user.update`<br>`Entity.spy_company_user.delete` |

**src/Pyz/Zed/CompanyUser/Persistence/Propel/Schema/spy_company_user.schema.xml**

```xml
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

**src/Pyz/Zed/Company/Persistence/Propel/Schema/spy_company.schema.xml**

```xml
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

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

|Database Entity|Type|Event|
|--- |--- |--- |
|`spy_company_user.is_default`|column|created|

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes in transfer objects:

|Transfer|Type|Event|Path|
|--- |--- |--- |--- |
|`CompanyUser.isDefault`|property|created|`src/Generated/Shared/Transfer/CompanyUserTransfer`|
|`Customer.isOnBehalf`|property|created|`src/Generated/Shared/Transfer/CustomerTransfer`|
|`CompanyUserAccessTokenRequestclass`|class|created|`src/Generated/Shared/Transfer/CompanyUserAccessTokenRequestTransfer`|
|`CompanyUserStorage`|class|created|`src/Generated/Shared/Transfer/CompanyUserStorageTransfer`|

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that propel entities have been generated successfully by checking their existence. Also, change the generated entity classes to extend from Spryker core classes.

|Class Path|Extends|
|--- |--- |
|`src/Orm/Zed/CompanyUserStorage/Persistence/SpyCompanyUserStorage.php`|`Spryker\Zed\CompanyUserStorage\Persistence\Propel\AbstractSpyCompanyUserStorage`|
|`src/Orm/Zed/CompanyUserStorage/Persistence/SpyCompanyUserStorageQuery.php`|`Spryker\Zed\CompanyUserStorage\Persistence\Propel\AbstractSpyCompanyUserStorageQuery`|

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the changes have been implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:

|Path|Method Name|
|--- |--- |
|`src/Orm/Zed/CompanyUser/Persistence/Base/SpyCompanyUser.php`|`prepareSaveEventName()``addSaveEventToMemory()``addDeleteEventToMemory()`|
|`src/Orm/Zed/Company/Persistence/Base/SpyCompany.php`|`prepareSaveEventName()``addSaveEventToMemory()``addDeleteEventToMemory()`|
|`src/Orm/Zed/CompanyUserStorage/Persistence/Base/SpyCompanyUserStorage.php`|`sendToQueue()`|

{% endinfo_block %}

### 3) Configure Export to Redis

#### Set up Event Listeners

With this step, you will be able to publish tables on change (create, edit, delete) to the `spy_company`, `spy_company_user` and synchronize the data to Storage.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CompanyUserStorageEventSubscriber` | Registers listeners that are responsible for publishing company user storage entity changes when a related entity change event occurs. | None | `NoneSpryker\Zed\CompanyUserStorage\Communication\Plugin\Event\Subscriber` |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

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

Set up synchronization queue pools so that non-multistore entities (not store-specific entities) are synchronized among stores:

**src/Pyz/Zed/CompanyUserStorage/CompanyUserStorageConfig.php**

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

#### Set up Re-Generate and Re-Sync Features

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CompanyUserSynchronizationDataPlugin` | Allows synchronizing the whole storage table content into Storage. | None | `Spryker\Zed\CompanyUserStorage\Communication\Plugin\Synchronization` |

**src/Pyz/Zed/CompanyUserStorage/CompanyUserStorageConfig.php**

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

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

Make sure that when a company user is created, updated or deleted, when company's status changes or company is activated/deactivated the corresponding company users' records are exported (or removed to Redis.

|Storage Type|Target Entity|Example Expected Data Identifier|
|--- |--- |--- |
|Redis|Company User|`kv:company_user:1`|

{% endinfo_block %}

**Example Expected Data Fragment**

```yaml
{
	"id_company_business_unit":13,
	"id_company_user":1,
	"id_company":6,
	"uuid":"4c677a6b-2f65-5645-9bf8-0ef3532bead1"
}
```

### 4) Import Data
#### Import Business On Behalf

{% info_block infoBox "Info" %}

The following imported entities will be used as data for **Business on Behalf Company Users** (b2b extension for Company User module in Spryker OS.

{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/BusinessOnBehalfDataImport/data/import/company_user.csv**

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

| Column | REQUIRED? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `customer_reference` | mandatory | string | DE--6 | The key that will identify the Customer to add data to. |
| `company_key` | mandatory | string | BoB-Hotel-Mitte | The key that will identify the Company to add data to. |
| `business_unit_key` | mandatory | string | business-unit-mitte-1 | The key that will identify the Company Business Unit to add data to. |
| `default` | mandatory | bool integer | 0 | Decides if there will be some pre-selected Company Business Unit for BoB User. |

Register the following plugins to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `BusinessOnBehalfCompanyUserDataImportPlugin` | Imports Business on Behalf Company Users. | <ul><li>Assumes that the Customer keys exist in the database.</li><li>Assumes that the Company keys exist in the database</li><li>Assumes that the Company Business Unit keys exist in the database.</li></ul> | `Spryker\Zed\BusinessOnBehalfDataImport\Communication\Plugin\DataImport` |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

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

**src/Pyz/Zed/Customer/CustomerDependencyProvider.php**

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

**Pyz\Client\Customer\CustomerDependencyProvider**

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

**Pyz\Zed\Customer\CustomerDependencyProvider**

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

**Pyz\Zed\Oauth\OauthDependencyProvider**

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

**src/Pyz/Zed/CompanyUserStorage/CompanyUserStorageDependencyProvider.php**

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

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

Log in with a customer who has multiple Company Users and a default one. Check in the session if the default Company User was assigned to the Customer. Check in the session if the `IsOnBehalf` property is set correctly for the Customer.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that token generation for a company user works. For more information, see [HowTo: Generate a Token for Login](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-generate-a-token-for-login.html).

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To make sure the `CompanyBusinessUnitCompanyUserStorageExpanderPlugin` was set up correctly, you need to check the data exported to the key-value storage key `kv:company_user:1` for the `id_company_business_unit:id`. `id_company_business_unit` needs to be set up to a correct foreign key of the business unit the company user is assigned to.

{% endinfo_block %}

## Install Feature Frontend

### Prerequisites

Overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | {{page.version}} |
| Customer Account Management | {{page.version}} |
| Company Account | {{page.version}} |

### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/company-account: "^{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

|Module|Expected Directory|
|--- |--- |
|`BusinessOnBehalfWidget`>|`vendor/spryker-shop/business-on-behalf-widget`|

{% endinfo_block %}

### 2) Add Translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
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

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

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

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Log in with a Business on Behalf customer and see the selected Company User status widget in the top menu.

{% endinfo_block %}
