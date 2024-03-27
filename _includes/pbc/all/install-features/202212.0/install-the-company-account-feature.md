

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds the *Business on Behalf*, *Company Account Storage*, and *Company Account OAuth functionality*.

{% endinfo_block %}

## Install feature core

Follow the steps below to install feature core.

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/company-account: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| BusinessOnBehalf | vendor/spryker/business-on-behalf |
| BusinessOnBehalfDataImport | vendor/spryker/business-on-behalf-data-import |
| CompanyUserStorage | vendor/spryker/company-user-storage |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Adjust the schema definition so that entity changes trigger events.

| AFFECTED ENTITY | TRIGGERED EVENTS |
| --- | --- |
| spy_company | Entity.spy_company.update<br>Entity.spy_company.delete |
| spy_company_user | Entity.spy_company_user.create<br>Entity.spy_company_user.update<br>Entity.spy_company_user.delete |

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

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_company_user.is_default | column | created |

Make sure that the following changes in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| CompanyUser.isDefault | property | created | src/Generated/Shared/Transfer/CompanyUserTransfer |
| Customer.isOnBehalf | property | created | src/Generated/Shared/Transfer/CustomerTransfer |
| CompanyUserAccessTokenRequestclass | class | created | src/Generated/Shared/Transfer/CompanyUserAccessTokenRequestTransfer |
| CompanyUserStorage | class | created | src/Generated/Shared/Transfer/CompanyUserStorageTransfer |

Make sure that propel entities have been generated successfully by checking their existence. Also, change the generated entity classes to extend from Spryker core classes.

| CLASS PATH | EXTENDS |
| --- | --- |
| src/Orm/Zed/CompanyUserStorage/Persistence/SpyCompanyUserStorage.php | Spryker\\Zed\\CompanyUserStorage\\Persistence\\Propel\\AbstractSpyCompanyUserStorage |
| src/Orm/Zed/CompanyUserStorage/Persistence/SpyCompanyUserStorageQuery.php | Spryker\\Zed\\CompanyUserStorage\\Persistence\\Propel\\AbstractSpyCompanyUserStorageQuery |

Make sure that the changes have been implemented successfully. For this purpose, trigger the following methods and make sure that the preceding events have been triggered:

| PATH | METHOD NAME |
| --- | --- |
| src/Orm/Zed/CompanyUser/Persistence/Base/SpyCompanyUser.php | prepareSaveEventName(  <br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/Company/Persistence/Base/SpyCompany.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/CompanyUserStorage/Persistence/Base/SpyCompanyUserStorage.php | sendToQueue() |

{% endinfo_block %}

### 3) Configure export to Redis

Follow instructions in the following sections to configure export to Redis.

#### Set up event listeners

With this step, you can publish tables on change (create, edit, delete) to the `spy_company`, `spy_company_user` and synchronize the data to Storage.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CompanyUserStorageEventSubscriber | Registers listeners that are responsible for publishing company user storage entity changes when a related entity change event occurs. | None | Spryker\Zed\CompanyUserStorage\Communication\Plugin\Event\Subscriber |

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

Set up synchronization queue pools to synchronize non-multi-store entities (not store-specific entities) among stores:

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

#### Set up re-generate and re-sync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CompanyUserSynchronizationDataPlugin | Allows synchronizing the whole storage table content into Storage. | None | Spryker\Zed\CompanyUserStorage\Communication\Plugin\Synchronization |

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

Make sure that the corresponding company users' records are exported (or removed from Redis) when the company user is created, updated, or deleted, and the company status changes or the company is activated or deactivated.

| STORAGE TYPE | TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
| --- | --- | --- |
| Redis | Company User | kv:company_user:1 |

{% endinfo_block %}

**Example Expected data fragment**

```yaml
{
	"id_company_business_unit":13,
	"id_company_user":1,
	"id_company":6,
	"uuid":"4c677a6b-2f65-5645-9bf8-0ef3532bead1"
}
```

### 4) Import Business on Behalf

{% info_block infoBox "Info" %}

The following imported entities are used as data for *Business on Behalf Company Users*—b2b extension for the Company User module in Spryker OS.

{% endinfo_block %}

Prepare your data according to your requirements using the demo data:

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

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| customer_reference | ✓ | string | DE--6 | Identifies a customer to add data to. |
| company_key | ✓ | string | BoB-Hotel-Mitte | Identifies a company to add data to. |
| business_unit_key | ✓ | string | business-unit-mitte-1 | Identifies the Company Business Unit to add data to. |
| default | ✓ | bool integer | 0 | Decides if there is a pre-selected Company Business Unit for a Business on Behalf user. |

To enable data import, register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| BusinessOnBehalfCompanyUserDataImportPlugin | Imports Business on Behalf company users. | <ul><li>Assumes that the customer keys exist in the database.</li><li>Assumes that the company keys exist in the database</li><li>Assumes that the Company Business Unit keys exist in the database.</li></ul> | Spryker\Zed\BusinessOnBehalfDataImport\Communication\Plugin\DataImport |

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

Import data:

```bash
console data:import company-user-on-behalf
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_company_user` table in the database.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| DefaultCompanyUserCustomerTransferExpanderPlugin | Sets a default company user for a Business on Behalf customer if a company user has not been selected yet. | None | Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer |
| IsOnBehalfCustomerTransferExpanderPlugin | Sets the `CustomerTransfer.IsOnBehalf` property so that other features can determine if the selected company user is a Business on Behalf company user. | None | Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer |
| CompanyUserAccessTokenAuthenticationHandlerPlugin | Provides functionality to log in a customer by an access token. | None | Spryker\Client\OauthCompanyUser\Plugin\Customer |
| CompanyUserReloadCustomerTransferExpanderPlugin | Reloads a company user if it is already set in `CustomerTransfer`. | None | Spryker\Zed\CompanyUser\Communication\Plugin\Customer |
| CompanyUserAccessTokenOauthUserProviderPlugin | Provides a user transfer by a company user ID. | None | Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth |
| CompanyUserAccessTokenOauthGrantTypeConfigurationProviderPlugin | Provides the configuration of `CompanyUser` `GrantType`. | None | Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth |
| OauthCompanyUserInstallerPlugin| Creates new OAuth scope—adds `company_user scope` to the `spy_oauth_scope` table.) | None | Spryker\Zed\OauthCompanyUser\Communication\Plugin\Installer |
| CompanyUserOauthScopeProviderPlugin | Associates the `company_user` scope with the password Oauth `GrandType`. | None | Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth |
| CompanyUserOauthUserProviderPlugin | Associates the `company_user` scope with `idCompanyUser` Oauth `GrandType`. | None | Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth |
| IdCompanyUserOauthGrantTypeConfigurationProviderPlugin | Provides new `IdCompanyUser` Oauth `GrandType`. | None | Spryker\Zed\OauthCompanyUser\Communication\Plugin\Oauth |
| CompanyBusinessUnitCompanyUserStorageExpanderPlugin | Expands the `CompanyUserStorageTransfer` with the company business unit ID. | None | Spryker\Zed\CompanyBusinessUnitStorage\Communication\Plugin |
| CompanyFieldToCompanyUserFormExpanderPlugin | Transforms the company select dropdown on the company user edit form into an input field with search and suggestions.                          | None          | `Spryker\Zed\CompanyGui\Communication\Plugin\CompanyUserGui`                  |
| CompanyBusinessUnitToCompanyUserFormExpanderPlugin                | Transforms the business unit select dropdown on the company user edit form into an input field with search and suggestions                    | None              | `Spryker\Zed\CompanyBusinessUnitGui\Communication\Plugin\CompanyUserGui`      |
| CompanyToCompanyUserAttachCustomerFormExpanderPlugin              | Transforms the company select dropdown on the customer to the company attach form into an input field with search and suggestions                 | None              | `Spryker\Zed\CompanyGui\Communication\Plugin\CompanyUserGui`                  |
| CompanyBusinessUnitToCompanyUserAttachCustomerFormExpanderPlugin  | Transforms the business unit select dropdown on the customer to the company attach form into an input field with search and suggestions           | None              | `Spryker\Zed\CompanyBusinessUnitGui\Communication\Plugin\CompanyUserGui`      |
  | CompanyToCompanyUnitAddressEditFormExpanderPlugin                 | Transforms the company select dropdown on the company unit address edit form into an input field with search and suggestions                  | None              | `Spryker\Zed\CompanyGui\Communication\Plugin\CompanyUnitAddressGui`           |
| CompanyToCompanyRoleCreateFormExpanderPlugin                      | Transforms the company select dropdown on the company role edit form into an input field with search and suggestions                          | None              | `Spryker\Zed\CompanyGui\Communication\Plugin\CompanyRoleGui`                  |
| CompanyBusinessUnitToCustomerBusinessUnitAttachFormExpanderPlugin | Transforms the business unit select dropdown on the company user to the business unit attach form into an input field with search and suggestions | None              | `Spryker\Zed\CompanyBusinessUnitGui\Communication\Plugin\BusinessOnBehalfGui` |
| CompanyToCompanyBusinessUnitFormExpanderPlugin                    | Transforms the company select dropdown on the company business unit create form into an input field with search and suggestions               | None              | `Spryker\Zed\CompanyGui\Communication\Plugin\CompanyBusinessUnitGui`          |

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

**src/Pyz/Zed/CompanyUserGui/CompanyUserGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyUserGui;

use Spryker\Zed\CompanyBusinessUnitGui\Communication\Plugin\CompanyUserGui\CompanyBusinessUnitToCompanyUserAttachCustomerFormExpanderPlugin;
use Spryker\Zed\CompanyBusinessUnitGui\Communication\Plugin\CompanyUserGui\CompanyBusinessUnitToCompanyUserFormExpanderPlugin;
use Spryker\Zed\CompanyGui\Communication\Plugin\CompanyUserGui\CompanyFieldToCompanyUserFormExpanderPlugin;
use Spryker\Zed\CompanyGui\Communication\Plugin\CompanyUserGui\CompanyToCompanyUserAttachCustomerFormExpanderPlugin;
use Spryker\Zed\CompanyUserGui\CompanyUserGuiDependencyProvider as SprykerCompanyUserGuiDependencyProvider;

class CompanyUserGuiDependencyProvider extends SprykerCompanyUserGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CompanyUserGuiExtension\Dependency\Plugin\CompanyUserFormExpanderPluginInterface>
     */
    protected function getCompanyUserFormExpanderPlugins(): array
    {
        return [
            new CompanyFieldToCompanyUserFormExpanderPlugin(),
            new CompanyBusinessUnitToCompanyUserFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\CompanyUserGuiExtension\Dependency\Plugin\CompanyUserAttachCustomerFormExpanderPluginInterface>
     */
    protected function getCompanyUserAttachCustomerFormExpanderPlugins(): array
    {
        return [
            new CompanyBusinessUnitToCompanyUserAttachCustomerFormExpanderPlugin(),
            new CompanyToCompanyUserAttachCustomerFormExpanderPlugin(),            
        ];
    }    
}
```

**src/Pyz/Zed/CompanyUnitAddressGui/CompanyUnitAddressGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyUnitAddressGui;

use Spryker\Zed\CompanyGui\Communication\Plugin\CompanyUnitAddressGui\CompanyToCompanyUnitAddressEditFormExpanderPlugin;
use Spryker\Zed\CompanyUnitAddressGui\CompanyUnitAddressGuiDependencyProvider as SprykerCompanyUnitAddressGuiDependencyProvider;

class CompanyUnitAddressGuiDependencyProvider extends SprykerCompanyUnitAddressGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CompanyUnitAddressGuiExtension\Dependency\Plugin\CompanyUnitAddressEditFormExpanderPluginInterface>
     */
    protected function getCompanyUnitAddressFormPlugins(): array
    {
        return [
            new CompanyToCompanyUnitAddressEditFormExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CompanyRoleGui/CompanyRoleGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyRoleGui;

use Spryker\Zed\CompanyGui\Communication\Plugin\CompanyRoleGui\CompanyToCompanyRoleCreateFormExpanderPlugin;
use Spryker\Zed\CompanyRoleGui\CompanyRoleGuiDependencyProvider as SprykerCompanyRoleGuiDependencyProvider;

class CompanyRoleGuiDependencyProvider extends SprykerCompanyRoleGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CompanyRoleGuiExtension\Communication\Plugin\CompanyRoleCreateFormExpanderPluginInterface>
     */
    protected function getCompanyRoleCreateFormExpanderPlugins(): array
    {
        return [
            new CompanyToCompanyRoleCreateFormExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/BusinessOnBehalfGui/BusinessOnBehalfGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\BusinessOnBehalfGui;

use Spryker\Zed\BusinessOnBehalfGui\BusinessOnBehalfGuiDependencyProvider as SprykerBusinessOnBehalfGuiDependencyProvider;
use Spryker\Zed\CompanyBusinessUnitGui\Communication\Plugin\BusinessOnBehalfGui\CompanyBusinessUnitToCustomerBusinessUnitAttachFormExpanderPlugin;

class BusinessOnBehalfGuiDependencyProvider extends SprykerBusinessOnBehalfGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\BusinessOnBehalfGuiExtension\Dependency\Plugin\CustomerBusinessUnitAttachFormExpanderPluginInterface>
     */
    protected function getCustomerBusinessUnitAttachFormExpanderPlugins(): array
    {
        return [
            new CompanyBusinessUnitToCustomerBusinessUnitAttachFormExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CompanyBusinessUnitGui/CompanyBusinessUnitGuiDependencyProvider.php**

```php
namespace Pyz\Zed\CompanyBusinessUnitGui;

use Spryker\Zed\CompanyBusinessUnitGui\CompanyBusinessUnitGuiDependencyProvider as SprykerCompanyBusinessUnitGuiDependencyProvider;
use Spryker\Zed\CompanyGui\Communication\Plugin\CompanyBusinessUnitGui\CompanyToCompanyBusinessUnitFormExpanderPlugin;

class CompanyBusinessUnitGuiDependencyProvider extends SprykerCompanyBusinessUnitGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CompanyBusinessUnitGuiExtension\Communication\Plugin\CompanyBusinessUnitFormExpanderPluginInterface>
     */
    protected function getCompanyBusinessUnitFormExpanderPlugins(): array
    {
        return [
            new CompanyToCompanyBusinessUnitFormExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Log in to a customer account which has multiple company users and a default one. In the session, check if the default company user is assigned to the customer and the `IsOnBehalf` property is set correctly for the customer.

Make sure that token generation for a company user works. For more information, see [HowTo: Generate a Token for Login](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/generate-login-tokens.html).

To make sure the `CompanyBusinessUnitCompanyUserStorageExpanderPlugin` is set up correctly, check the data exported to the key-value storage key `kv:company_user:1` for the `id_company_business_unit:id`. `id_company_business_unit` must be set up to a correct foreign key of the business unit that the company user is assigned to.

{% endinfo_block %}

### 6) Generate Zed Translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 7) Build Zed UI frontend

Enable Javascript and CSS changes for Zed:

```bash
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

To make sure the transform dropdowns plugins (`CompanyFieldToCompanyUserFormExpanderPlugin`, `CompanyBusinessUnitToCompanyUserFormExpanderPlugin`,
`CompanyToCompanyUserAttachCustomerFormExpanderPlugin`, `CompanyBusinessUnitToCompanyUserAttachCustomerFormExpanderPlugin`,
`CompanyToCompanyUnitAddressEditFormExpanderPlugin`, `CompanyToCompanyRoleCreateFormExpanderPlugin`, `CompanyBusinessUnitToCustomerBusinessUnitAttachFormExpanderPlugin`, `CompanyToCompanyBusinessUnitFormExpanderPlugin`) are set up correctly, open the corresponding form and check that input boxes with search and suggestions are used for the company and business unit fields instead of default select dropdowns.

Make sure that field labels (like `Company`) and hints (like `Select company`) are translated correctly for the dropdowns.

{% endinfo_block %}

## Install feature frontend

Follow these steps to install feature frontend

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Customer Account Management | {{page.version}} |
| Company Account | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/company-account: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| BusinessOnBehalfWidget | vendor/spryker-shop/business-on-behalf-widget |

{% endinfo_block %}

### 2) Add translations

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

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 3) Set up widgets

To enable widgets, register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| BusinessOnBehalfStatusWidget | Displays the selected company users and allows Business on Behalf customers to change it through a link. | None | SprykerShop\Yves\BusinessOnBehalfWidget\Widget |

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

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Log in with a Business on Behalf customer, and in the top menu, see the selected company user status widget.

{% endinfo_block %}
