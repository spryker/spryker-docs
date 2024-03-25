This document describes how to install the [Merchant B2B Contracts](docs/pbc/all/merchant-management/{{site.version}}/base-shop/merchant-b2b-contracts-feature-overview.html) feature.

## Install feature core

### Prerequisites

Install the required features:

| NAME                      | VERSION          | INSTALLATION GUIDE                                                                                                                                                                             |
|---------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Company Account           | {{page.version}} | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Mailing and Notifications | {{page.version}} | [Install the Mailing and Notifications feature](/docs/pbc/all/emails/{{page.version}}/install-the-mailing-and-notifications-feature.html)                                                      |
| Merchant                  | {{page.version}} | [Install the Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-feature.html)                                             |
| Spryker Core              | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                    |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/merchant-contracts: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE                         | EXPECTED DIRECTORY                               |
|--------------------------------|--------------------------------------------------|
| MerchantRelationship           | vendor/spryker/merchant-relationship             |
| MerchantRelationshipExtension  | vendor/spryker/merchant-relationship-extension   |
| MerchantRelationshipDataImport | vendor/spryker/merchant-relationship-data-import |
| MerchantRelationshipGui        | vendor/spryker/merchant-relationship-gui         |

{% endinfo_block %}

### 2) Set up the configuration

Add the following configuration:

| CONFIGURATION                                | SPECIFICATION                                        | NAMESPACE                            |
|----------------------------------------------|------------------------------------------------------|--------------------------------------|
| MerchantRelationshipConstants::BASE_URL_YVES | Defines base URL for Yves including scheme and port. | Spryker\Shared\MerchantRelationship  |

**config/Shared/config_default.php**

```php
use Spryker\Shared\MerchantRelationship\MerchantRelationshipConstants;

$yvesHost = getenv('SPRYKER_FE_HOST');
$yvesPort = (int)(getenv('SPRYKER_FE_PORT')) ?: 443;

$config[MerchantRelationshipConstants::BASE_URL_YVES] = sprintf(
    'https://%s%s',
    $yvesHost,
    $yvesPort !== 443 ? ':' . $yvesPort : '',
);
```

### 3) Set up database schema and transfer objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes by checking your database:

| DATABASE ENTITY                                    | TYPE  |
|----------------------------------------------------|-------|
| spy_merchant_relationship                          | table |
| spy_merchant_relationship_to_company_business_unit | table |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer                                      | Type   | Event   | Path                                                                                |
|-----------------------------------------------|--------|---------|-------------------------------------------------------------------------------------|
| MerchantRelationship                          | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipTransfer                          |
| MerchantRelationshipRequest                   | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipRequestTransfer                   |
| MerchantRelationshipResponse                  | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipResponseTransfer                  |
| MerchantRelationshipCriteria                  | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipCriteriaTransfer                  |
| MerchantRelationshipConditions                | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipConditionsTransfer                |
| MerchantRelationshipError                     | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipErrorTransfer                     |
| MerchantRelationshipValidationErrorCollection | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipValidationErrorCollectionTransfer |
| MerchantRelationshipCollection                | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipCollectionTransfer                |
| MerchantRelationshipCollectionRequest         | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipCollectionRequestTransfer         |
| MerchantRelationshipCollectionResponse        | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipCollectionResponseTransfer        |
| MerchantRelationshipFilter                    | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipFilterTransfer                    |
| MerchantRelationshipSearchConditions          | class  | created | src/Generated/Shared/Transfer/MerchantRelationshipSearchConditionsTransfer          |
| CompanyBusinessUnit.merchantRelationships     | column | added   | src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer                           |

{% endinfo_block %}

### 4) Add translations

Add translations as follows:

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
merchant_relationship.mail.merchant_relationship_delete.subject,Your merchant relation was terminated.,en_US
merchant_relationship.mail.merchant_relationship_delete.subject,Ihre Händlerbeziehung wurde beendet.,de_DE
merchant_relationship.mail.trans.merchant_relationship_delete.salutation,"Hello,",en_US
merchant_relationship.mail.trans.merchant_relationship_delete.salutation,"Hallo,",de_DE
merchant_relationship.mail.trans.merchant_relationship_delete.main_text,"Merchant %merchant_name% terminated your merchant relation. Please get in touch with the merchant in case of questions.",en_US
merchant_relationship.mail.trans.merchant_relationship_delete.main_text,"Der Händler %merchant_name% hat Ihre Händlerbeziehung beendet. Bei Fragen wenden Sie sich bitte an den Händler.",de_DE
merchant_relationship.mail.trans.merchant_relationship_delete.link,Contact merchant,en_US
merchant_relationship.mail.trans.merchant_relationship_delete.link,Händler kontaktieren,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database, the configured data is added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 5) Import data

#### Import merchant relationships

The following imported entities will be used as merchant relationships in Spryker OS.

Prepare your data according to your requirements using our demo data:

**data/import/common/common/merchant_relationship.csv**

```yaml
merchant_relation_key,merchant_key,company_business_unit_owner_key,company_business_unit_assignee_keys
mr-001,kudu-merchant-1,test-business-unit-1,"test-business-unit-2"
mr-002,oryx-merchant-1,test-business-unit-1,"test-business-unit-1;test-business-unit-2"
mr-003,oryx-merchant-1,test-business-unit-2,"test-business-unit-1"
mr-004,oryx-merchant-1,trial-bus-unit-1,
mr-005,oryx-merchant-1,trial-bus-unit-2,"trial-bus-unit-3;trial-bus-unit-1"
mr-006,oryx-merchant-1,proof-bus-unit-2,"proof-bus-unit-2"
mr-007,kudu-merchant-1,proof-bus-unit-1,"proof-bus-unit-1;proof-bus-unit-2;proof-bus-unit-3"
sugar-monster-spryker-hq-1,sugar-monster,spryker_systems_HQ,spryker_systems_HQ
sugar-monster-spryker-hq-2,sugar-monster,spryker_systems_HQ,spryker_systems_Barcelona
sugar-monster-spryker-hq-3,sugar-monster,spryker_systems_HQ,spryker_systems_Zurich
sugar-monster-spryker-hq-4,sugar-monster,spryker_systems_HQ,spryker_systems_Zurich_Sales
sugar-monster-spryker-hq-5,sugar-monster,spryker_systems_HQ,spryker_systems_Zurich_Support
sugar-monster-spryker-hq-6,sugar-monster,spryker_systems_HQ,spryker_systems_Berlin
sugar-monster-spryker-hq-7,sugar-monster,spryker_systems_HQ,spryker_systems_HR
sugar-monster-ottom-supplier-1,sugar-monster,Supplier_Department,Supplier_Department
sugar-monster-ottom-supplier-2,sugar-monster,Supplier_Department,Ottom_store_Berlin
sugar-monster-ottom-supplier-3,sugar-monster,Supplier_Department,Ottom_store_Oslo
sugar-monster-ottom-supplier-4,sugar-monster,Supplier_Department,Ottom_store_London
mr-008,restrictions-merchant,BU-IT-no-ASUS,BU-IT-no-tablets;BU-IT-no-ASUS
mr-009,restrictions-merchant,BU-IT-only-wearables,"BU-IT-only-wearables"
mr-010,restrictions-merchant,Sales-under-400,"Sales-under-400"
mr-011,restrictions-merchant,Sales,Sales;Sales-under-400
```

| COLUMN                              | REQUIRED | DATA TYPE | DATA EXAMPLE                              | DATA EXPLANATION                                                                                                |
|-------------------------------------|----------|-----------|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| merchant_relation_key               | optional | string    | mr-002                                    | A reference used for the merchant relationship data import.                                                     |
| merchant_key                        | ✓        | string    | kudu-merchant-1                           | A reference used to define a Merchant of the contract (relationship) between him and the company business unit. |
| company_business_unit_owner_key     | ✓        | string    | test-business-unit-1                      | A reference used to define a Company Business Unit of the contract (relationship) between it and a Merchant.    |
| company_business_unit_assignee_keys | optional | string    | test-business-unit-1;test-business-unit-2 | A reference to the assigned business units, on which this contract is applied.                                  |

Register the following plugin to enable data import:

| PLUGIN                               | SPECIFICATION                                         | PREREQUISITES | NAMESPACE                                                       |
|--------------------------------------|-------------------------------------------------------|---------------|-----------------------------------------------------------------|
| MerchantRelationshipDataImportPlugin | Imports merchant relationship data into the database. |               | Spryker\Zed\MerchantRelationshipDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantRelationshipDataImport\Communication\Plugin\MerchantRelationshipDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantRelationshipDataImportPlugin(),
        ];
    }
}
```

Run the following console command to import data:

```bash
console data:import merchant-relationship
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_merchant_relationship` table in the database.

{% endinfo_block %}

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                              | SPECIFICATION                                                                                          | PREREQUISITES                                                                                                                   | NAMESPACE                                                                  |
|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| MerchantRelationshipHydratePlugin                                   | Expands company user transfers, which has a company business unit with the merchant relationship data. | Expects, that company users have an assigned company business unit, which will be expanded with the merchant relationship data. | Spryker\Zed\MerchantRelationship\Communication\Plugin\CompanyUser          |
| MerchantRelationshipDeleteMailTypeBuilderPlugin                     | Builds the `MailTransfer` with data for merchant relationship delete mail.                             |                                                                                                                                 | Spryker\Zed\MerchantRelationship\Communication\Plugin\Mail                 |
| CompanyBusinessUnitNotificationMerchantRelationshipPostDeletePlugin | Sends a notification email about deleted merchant relationships to company business units.             |                                                                                                                                 | Spryker\Zed\MerchantRelationship\Communication\Plugin\MerchantRelationship |

**src/Pyz/Zed/CompanyUser/CompanyUserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyUser;

use Spryker\Zed\CompanyUser\CompanyUserDependencyProvider as SprykerCompanyUserDependencyProvider;
use Spryker\Zed\MerchantRelationship\Communication\Plugin\CompanyUser\MerchantRelationshipHydratePlugin;

class CompanyUserDependencyProvider extends SprykerCompanyUserDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CompanyUserExtension\Dependency\Plugin\CompanyUserHydrationPluginInterface>
     */
    protected function getCompanyUserHydrationPlugins(): array
    {
        return [
            new MerchantRelationshipHydratePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when a Merchant Relationship is being created, `CompanyBusinessUnit.merchantRelationships` property of assigned business units contains merchant relationship data, when logged in as a company user of the assigned business unit.

{% endinfo_block %}

**src/Pyz/Zed/Mail/MailDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\MerchantRelationship\Communication\Plugin\Mail\MerchantRelationshipDeleteMailTypeBuilderPlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface>
     */
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            new MerchantRelationshipDeleteMailTypeBuilderPlugin(),
        ];
    }
}

```

**src/Pyz/Zed/MerchantRelationship/MerchantRelationshipDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRelationship;

use Spryker\Zed\MerchantRelationship\Communication\Plugin\MerchantRelationship\CompanyBusinessUnitNotificationMerchantRelationshipPostDeletePlugin;
use Spryker\Zed\MerchantRelationship\MerchantRelationshipDependencyProvider as SprykerMerchantRelationshipDependencyProvider;

class MerchantRelationshipDependencyProvider extends SprykerMerchantRelationshipDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantRelationshipExtension\Dependency\Plugin\MerchantRelationshipPostDeletePluginInterface>
     */
    protected function getMerchantRelationshipPostDeletePlugins(): array
    {
        return [
            new CompanyBusinessUnitNotificationMerchantRelationshipPostDeletePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you delete a merchant relationship, the notification email is sent to owner company business unit email address.

{% endinfo_block %}

### 7) Configure navigation

1. Add the `MerchantRelationshipGui` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <marketplace>
        <label>Marketplace</label>
        <title>Marketplace</title>
        <icon>fa-shopping-basket</icon>
        <pages>
            <merchant-relationship>
                <label>Merchant Relations</label>
                <title>Merchant Relations</title>
                <bundle>merchant-relationship-gui</bundle>
                <controller>list-merchant-relationship</controller>
                <action>index</action>
            </merchant-relationship>
        </pages>
    </marketplace>
</config>
```

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Log in to the Back Office. Make sure there is the **Merchant Relations** navigation menu item under the **Marketplace** menu item.

{% endinfo_block %}

## Install feature frontend

Follow these steps to install feature frontend

### Prerequisites

Overview and install the necessary features before beginning the integration step.

| NAME            | VERSION          | INSTALLATION GUIDE                                                                                                                                                                             |
|-----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Company Account | {{page.version}} | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Merchant        | {{page.version}} | [Install the Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-feature.html)                                             |
| Spryker Core    | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                    |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/merchant-contracts: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules are installed:

| MODULE                     | EXPECTED DIRECTORY                               |
|----------------------------|--------------------------------------------------|
| MerchantRelationshipPage   | vendor/spryker-shop/merchant-relationship-page   |
| MerchantRelationshipWidget | vendor/spryker-shop/merchant-relationship-widget |

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
merchant_relationship_page.table.header.merchant,Merchant,en_US
merchant_relationship_page.table.header.merchant,Händler,de_DE
merchant_relationship_page.table.header.business_unit_owner,Business Unit Owner,en_US
merchant_relationship_page.table.header.business_unit_owner,Inhaber der Geschäftseinheit,de_DE
merchant_relationship_page.table.header.business_units,Business Units,en_US
merchant_relationship_page.table.header.business_units,Geschäftseinheiten,de_DE
merchant_relationship_page.table.header.created,Created,en_US
merchant_relationship_page.table.header.created,Erstellt,de_DE
merchant_relationship_page.table.header.actions,Actions,en_US
merchant_relationship_page.table.header.actions,Aktion,de_DE
merchant_relationship_page.table.action.view,View,en_US
merchant_relationship_page.table.action.view,Ansehen,de_DE
merchant_relationship_widget.merchant_relationship_links_list.view,View,en_US
merchant_relationship_widget.merchant_relationship_links_list.view,Anzeigen,de_DE
company.account.merchant_relations,Merchant Relations,en_US
company.account.merchant_relations,Händlerbeziehungen,de_DE
merchant_relationship_page.table.filter.apply,Apply,en_US
merchant_relationship_page.table.filter.apply,Anwenden,de_DE
merchant_relationship_page.merchant_relationsip_detail,Merchant Relation,en_US
merchant_relationship_page.merchant_relationsip_detail,Händlerbeziehung,de_DE
merchant_relationship_page.merchant_relationsip_detail.date_created,Created date,en_US
merchant_relationship_page.merchant_relationsip_detail.date_created,Erstellt am,de_DE
merchant_relationship_page.merchant_relationsip_detail.company_details,Company Details,en_US
merchant_relationship_page.merchant_relationsip_detail.company_details,Firmendetails,de_DE
merchant_relationship_page.merchant_relationsip_detail.company,Company,en_US
merchant_relationship_page.merchant_relationsip_detail.company,Firma,de_DE
merchant_relationship_page.merchant_relationsip_detail.business_unit_owner,Business Unit Owner,en_US
merchant_relationship_page.merchant_relationsip_detail.business_unit_owner,Inhaber der Geschäftseinheit,de_DE
merchant_relationship_page.merchant_relationsip_detail.business_units,Business Units,en_US
merchant_relationship_page.merchant_relationsip_detail.business_units,Geschäftseinheiten,de_DE
merchant_relationship_page.merchant_relationsip_detail.view,View,en_US
merchant_relationship_page.merchant_relationsip_detail.view,Ansehen,de_DE
merchant_relationship_page.merchant_relationship.business_unit_owner,Business Unit Owner,en_US
merchant_relationship_page.merchant_relationship.business_unit_owner,Inhaber der Geschäftseinheit,de_DE
merchant_relationship_page.merchant_relationship.business_unit_owner.placeholder,Select Business Unit Owner,en_US
merchant_relationship_page.merchant_relationship.business_unit_owner.placeholder,Inhaber der Geschäftseinheit auswählen,de_DE
merchant_relationship_page.merchant_relationship.merchant,Merchant,en_US
merchant_relationship_page.merchant_relationship.merchant,Händler,de_DE
merchant_relationship_page.merchant_relationship.merchant.placeholder,Select Merchant,en_US
merchant_relationship_page.merchant_relationship.merchant.placeholder,Händler auswählen,de_DE
merchant_relationship_page.merchant_relationship.active_filters,Active Filters:,en_US
merchant_relationship_page.merchant_relationship.active_filters,Aktive Filter:,de_DE
merchant_relationship_page.merchant_relationship.reset_all,Reset All,en_US
merchant_relationship_page.merchant_relationship.reset_all,Alles zurücksetzen,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database, the configured data is added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 3) Enable controllers

Register the following route providers on the Storefront:

| PROVIDER                                    | NAMESPACE                                               |
|---------------------------------------------|---------------------------------------------------------|
| MerchantRelationshipPageRouteProviderPlugin | SprykerShop\Yves\MerchantRelationshipPage\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\MerchantRelationshipPage\Plugin\Router\MerchantRelationshipPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new MerchantRelationshipPageRouteProviderPlugin(),
        ];
    }
}
```

### 4) Set up widgets

To enable widgets, register the following plugins:

| PLUGIN                             | SPECIFICATION                                              | PREREQUISITES | NAMESPACE                                          |
|------------------------------------|------------------------------------------------------------|---------------|----------------------------------------------------|
| MerchantRelationshipLinkListWidget | Adds links to `Merchant Relations` detail pages.           |               | SprykerShop\Yves\MerchantRelationshipWidget\Widget |
| MerchantRelationshipMenuItemWidget | Adds `Merchant Relations` item to company navigation menu. |               | SprykerShop\Yves\MerchantRelationshipWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantRelationshipWidget\Widget\MerchantRelationshipLinkListWidget;
use SprykerShop\Yves\MerchantRelationshipWidget\Widget\MerchantRelationshipMenuItemWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantRelationshipLinkListWidget::class,
            MerchantRelationshipMenuItemWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET                             | VERIFICATION                                                                                                                                                           |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MerchantRelationshipLinkListWidget | `{% raw %}{%{% endraw %} widget 'MerchantRelationshipLinkListWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |
| MerchantRelationshipMenuItemWidget | `{% raw %}{%{% endraw %} widget 'MerchantRelationshipMenuItemWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |

* Make sure that you can see links to `Merchant Relations` detail pages. 
* Make sure that you can see `Merchant Relations` menu item.

{% endinfo_block %}
