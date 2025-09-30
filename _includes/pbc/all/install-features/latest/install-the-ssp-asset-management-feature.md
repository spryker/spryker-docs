This document describes how to install the Self-Service Portal (SSP) Asset Management feature.

## Prerequisites

| FEATURE         | VERSION | INSTALLATION GUIDE  |
|--------------| ------- | ------------------ |
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                        |
| Self-Service Portal | 202507.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)          |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/self-service-portal:"^202507.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following packages are now listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

Add the following configuration to `config/Shared/config_default.php`:

| CONFIGURATION                                              | SPECIFICATION                                                                                                                                                                                                                                                  | NAMESPACE                               |
|------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE                    | Defines the Flysystem service configuration for handling asset file storage. This configuration specifies the adapter, such as local or S3, and the root path for storing asset files, ensuring they're managed securely and efficiently.                      | Spryker\Shared\FileSystem               |
| SelfServicePortalConstants::BASE_URL_YVES                  | Specifies the base URL for the Yves frontend. This URL is used to generate absolute links to asset-related pages on the Storefront, ensuring correct navigation and resource loading.                                                                          | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConstants::ASSET_STORAGE_NAME             | Defines the unique identifier for the Flysystem storage instance used for SSP assets. This name links the asset management feature to the specific filesystem configuration defined in `FileSystemConstants::FILESYSTEM_SERVICE`.                              | SprykerFeature\Zed\SelfServicePortal    |
| SelfServicePortalConfig::getAssetStatusClassMap()          | Defines a map that associates asset status values, such as `pending` or `approved`, with their corresponding CSS class names. This is used in the Back Office and Storefront to visually represent the status of each asset, for example, with colored labels. | SprykerFeature\Zed\SelfServicePortal    |
| SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_ASSET | Defines queue name as used for processing SSP asset storage messages.                                                                                                                                                                                          | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConfig::QUEUE_NAME_SYNC_SEARCH_SSP_ASSET  | Defines queue name as used for processing ssp asset search synchronization.                                                                                                                                                                                    | SprykerFeature\Shared\SelfServicePortal |

**config/Shared/config_default.php**

```php
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;
use SprykerFeature\Shared\SelfServicePortalConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'ssp-asset-image' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => '/data',
        'path' => '/data/ssp-asset-image',
    ],
];

$config[SelfServicePortalConstants::BASE_URL_YVES] = 'https://your-yves-url';
$config[SelfServicePortalConstants::ASSET_STORAGE_NAME] = 'ssp-asset-image';
```

**src/Pyz/Zed/SelfServicePortal/SelfServicePortalConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\SelfServicePortal;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{
    /**
     * @return array<string>
     */
    public function getAssetStatusClassMap(): array
    {
        return [
            'pending' => 'label-warning',
            'in_review' => 'label-primary',
            'approved' => 'label-success',
            'deactivated' => 'label-danger',
        ];
    }


    /**
     * @return string|null
     */
    public function getSspAssetSearchSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
```

## Configure synchronization queues

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\RabbitMq;

use Pyz\Shared\SelfServicePortal\SelfServicePortalConfig;
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_ASSET,
            SelfServicePortalConfig::QUEUE_NAME_SYNC_SEARCH_SSP_ASSET,
        ];
    }
}
```


**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Queue;

use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array 
    {
        return [  
            SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_ASSET => new SynchronizationStorageQueueMessageProcessorPlugin(),
            SelfServicePortalConfig::QUEUE_NAME_SYNC_SEARCH_SSP_ASSET => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that, in the RabbitMQ management interface, the following queues are available:
- `sync.search.ssp_asset`
- `sync.search.ssp_asset.error`
- `sync.storage.ssp_asset`
- `sync.storage.ssp_asset.error`
{% endinfo_block %}

## Configure ElasticSearch supported source indexes

**src/Pyz/Shared/SearchElasticsearch/SearchElasticsearchConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Shared\SearchElasticsearch;

use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    /**
     * @var array<string>
     */
    protected const SUPPORTED_SOURCE_IDENTIFIERS = [
        'ssp_asset',
    ];
}
```

**src/Pyz/Zed/SearchElasticsearch/SearchElasticsearchConfig.php**

```php

declare(strict_types = 1);

namespace Pyz\Zed\SearchElasticsearch;

use Spryker\Zed\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;


class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    /**
     * @return array<string>
     */
    public function getJsonSchemaDefinitionDirectories(): array
    {
        $directories = parent::getJsonSchemaDefinitionDirectories();

        $directory = sprintf('%s/vendor/spryker-feature/*/src/*/Shared/*/Schema/', APPLICATION_ROOT_DIR);
        if (glob($directory, GLOB_NOSORT | GLOB_ONLYDIR)) {
            $directories[] = $directory;
        }

        $directories[] = sprintf('%s/src/Pyz/Shared/*/Schema/', APPLICATION_ROOT_DIR);

        return $directories;
    }
}
```

## Configure the event triggering for the Asset entity

**src/Pyz/Zed/SelfServicePortal/Persistence/Propel/Schema/spy_ssp_asset.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\SelfServicePortal\Persistence" package="src.Orm.Zed.SelfServicePortal.Persistence">

    <table name="spy_ssp_asset">
        <behavior name="event">
            <parameter name="spy_ssp_asset_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_ssp_asset_to_company_business_unit">
        <behavior name="event">
            <parameter name="spy_ssp_asset_to_company_business_unit_all" column="*"/>
        </behavior>
    </table>

</database>
```

## Configure navigation

Add the `Assets` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
   <ssp>
      <label>Customer Portal</label>
      <title>Customer Portal</title>
      <icon>fa-id-badge</icon>
      <pages>
         <self-service-portal-asset>
            <label>Assets</label>
            <title>Assets</title>
            <bundle>self-service-portal</bundle>
            <controller>list-asset</controller>
            <action>index</action>
         </self-service-portal-asset>
      </pages>
   </ssp>
</config>
```

{% info_block warningBox "Verification" %}
Make sure that, in the Back Office, the **Customer portal** > **Assets** section is available.
{% endinfo_block %}

## Set up database schema

Apply schema updates:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}
Make sure the following tables have been created in the database:

- `spy_ssp_asset`
- `spy_ssp_asset_file`
- `spy_ssp_asset_to_company_business_unit`
- `spy_sales_order_item_ssp_asset`
- `spy_ssp_asset_storage`
- `spy_ssp_asset_search`

{% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure the following transfer objects have been generated:

| TRANSFER                          | TYPE     | EVENT   | PATH                                                                    |
|-----------------------------------|----------|---------|-------------------------------------------------------------------------|
| SspAssetCollection                | transfer | created | src/Generated/Shared/Transfer/SspAssetCollectionTransfer                |
| SspAsset                          | transfer | created | src/Generated/Shared/Transfer/SspAssetTransfer                          |
| File                              | transfer | created | src/Generated/Shared/Transfer/FileTransfer                              |
| FileUpload                        | transfer | created | src/Generated/Shared/Transfer/FileUploadTransfer                        |
| CompanyBusinessUnitCriteriaFilter | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitCriteriaFilterTransfer |
| FileManagerData                   | transfer | created | src/Generated/Shared/Transfer/FileManagerDataTransfer                   |
| SequenceNumberSettings            | transfer | created | src/Generated/Shared/Transfer/SequenceNumberSettingsTransfer            |
| CompanyBusinessUnitCollection     | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitCollectionTransfer     |
| FileInfo                          | transfer | created | src/Generated/Shared/Transfer/FileInfoTransfer                          |
| SspAssetAssignment                | transfer | created | src/Generated/Shared/Transfer/SspAssetAssignmentTransfer                |
| SspAssetCollectionRequest         | transfer | created | src/Generated/Shared/Transfer/SspAssetCollectionRequestTransfer         |
| SspAssetCollectionResponse        | transfer | created | src/Generated/Shared/Transfer/SspAssetCollectionResponseTransfer        |
| SspAssetCriteria                  | transfer | created | src/Generated/Shared/Transfer/SspAssetCriteriaTransfer                  |
| SspAssetConditions                | transfer | created | src/Generated/Shared/Transfer/SspAssetConditionsTransfer                |
| SspAssetInclude                   | transfer | created | src/Generated/Shared/Transfer/SspAssetIncludeTransfer                   |
| Sort                              | transfer | created | src/Generated/Shared/Transfer/SortTransfer                              |
| Pagination                        | transfer | created | src/Generated/Shared/Transfer/PaginationTransfer                        |
| Error                             | transfer | created | src/Generated/Shared/Transfer/ErrorTransfer                             |
| CompanyBusinessUnit               | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer               |
| Company                           | transfer | created | src/Generated/Shared/Transfer/CompanyTransfer                           |
| SspAssetImageRequest              | transfer | created | src/Generated/Shared/Transfer/SspAssetImageRequestTransfer              |
| CompanyUser                       | transfer | created | src/Generated/Shared/Transfer/CompanyUserTransfer                       |
| FileCollection                    | transfer | created | src/Generated/Shared/Transfer/FileCollectionTransfer                    |
| DashboardResponse                 | transfer | created | src/Generated/Shared/Transfer/DashboardResponseTransfer                 |
| DashboardComponentAssets          | transfer | created | src/Generated/Shared/Transfer/DashboardComponentAssetsTransfer          |
| DashboardRequest                  | transfer | created | src/Generated/Shared/Transfer/DashboardRequestTransfer                  |

{% endinfo_block %}

## Add translations

1. Append the glossary:

<details>
  <summary>Glossary</summary>

```csv
general.confirm.button,Confirm,en_US
general.confirm.button,Bestätigen,de_DE
permission.name.ViewCompanySspAssetPermissionPlugin,View company assets,en_US
permission.name.ViewCompanySspAssetPermissionPlugin,Firmen-SSP-Assets anzeigen,de_DE
permission.name.ViewBusinessUnitSspAssetPermissionPlugin,View business unit assets,en_US
permission.name.ViewBusinessUnitSspAssetPermissionPlugin,Geschäftseinheit-assets anzeigen,de_DE
permission.name.CreateSspAssetPermissionPlugin,Create ssp assets,en_US
permission.name.CreateSspAssetPermissionPlugin,SSP-Assets erstellen,de_DE
permission.name.UpdateSspAssetPermissionPlugin,Update ssp assets,en_US
permission.name.UpdateSspAssetPermissionPlugin,SSP-Assets aktualisieren,de_DE
permission.name.UnassignSspAssetPermissionPlugin,Unassign business unit ssp assets,en_US
permission.name.UnassignSspAssetPermissionPlugin,Geschäftseinheit-SSP-Assets anzeigen,de_DE
self_service_portal.asset.selector.label,Attach Asset,en_US
self_service_portal.asset.selector.label,Asset anhängen,de_DE
self_service_portal.asset.selector.search_placeholder,"Search by name, reference or serial number",en_US
self_service_portal.asset.selector.search_placeholder,"Nach Name, Referenz oder Seriennummer suchen",de_DE
self_service_portal.asset.selector.no_assets_available,No assets available,en_US
self_service_portal.asset.selector.no_assets_available,Keine Assets verfügbar,de_DE
self_service_portal.asset.selector.change,Change,en_US
self_service_portal.asset.selector.change,Ändern,de_DE
self_service_portal.asset.assigned_asset,Zugewiesenes Asset,de_DE
self_service_portal.asset.assigned_asset,Assigned Asset,en_US
self_service_portal.asset.name,Name,de_DE
self_service_portal.asset.name,Name,en_US
self_service_portal.asset.serial_number,Seriennummer,de_DE
self_service_portal.asset.serial_number,Serial Number,en_US
ssp_dashboard.general.ssp_assets,Assets,en_US
ssp_dashboard.general.ssp_assets,Assets,de_DE
self_service_portal.asset.form.image.description,"Max up to %size%. Allowed file formats %format%",en_US
self_service_portal.asset.form.image.description,"Maximal bis zu %size%. Erlaubte Dateiformate: %format%",de_DE
self_service_portal.asset.validation.name.not_set,Asset name must be provided,en_US
self_service_portal.asset.validation.name.not_set,Der Name des Assets muss angegeben werden,de_DE
self_service_portal.asset.validation.company_business_unit.not_set,Company business unit must be provided,en_US
self_service_portal.asset.validation.company_business_unit.not_set,Die Geschäftseinheit muss angegeben werden,de_DE
self_service_portal.asset.validation.assets_not_provided,No assets were provided,en_US
self_service_portal.asset.validation.assets_not_provided,Es wurden keine Assets bereitgestellt,de_DE
self_service_portal.asset.validation.id_not_provided,Asset ID was not provided,en_US
self_service_portal.asset.validation.id_not_provided,Asset-ID wurde nicht angegeben,de_DE
self_service_portal.asset.validation.not_found,Asset was not found,en_US
self_service_portal.asset.validation.not_found,Asset wurde nicht gefunden,de_DE
self_service_portal.asset.list.widget.title,My Assets,en_US
self_service_portal.asset.list.widget.title,Meine Assets,de_DE
self_service_portal.asset.create.title,Create Asset,en_US
self_service_portal.asset.create.title,Asset erstellen,de_DE
self_service_portal.asset.list.title,My Assets,en_US
self_service_portal.asset.list.title,Meine Assets,de_DE
self_service_portal.asset.submit.button,Save,en_US
self_service_portal.asset.submit.button,Speichern,de_DE
self_service_portal.asset.success.created,Asset has been successfully created,en_US
self_service_portal.asset.success.created,Asset wurde erfolgreich erstellt,de_DE
self_service_portal.asset.error.create,Asset creation failed,en_US
self_service_portal.asset.error.create,Fehler beim Erstellen des Assets,de_DE
self_service_portal.asset.form.name,Name,en_US
self_service_portal.asset.form.name,Name,de_DE
self_service_portal.asset.form.serial_number,Serial Number,en_US
self_service_portal.asset.form.serial_number,Seriennummer,de_DE
self_service_portal.asset.form.note,Note,en_US
self_service_portal.asset.form.note,Notiz,de_DE
self_service_portal.asset.form.image,Image,en_US
self_service_portal.asset.form.image,Bild,de_DE
self_service_portal.asset.form.image.mime_type_error,Invalid file format. Allowed file formats: {{ types }},en_US
self_service_portal.asset.form.image.mime_type_error,Ungültiges Dateiformat. Erlaubte Dateiformate: {{ types }},de_DE
self_service_portal.asset.update.title,Edit Asset,en_US
self_service_portal.asset.update.title,Asset bearbeiten,de_DE
self_service_portal.asset.details.reference,Asset Reference,en_US
self_service_portal.asset.details.reference,Asset-Referenz,de_DE
self_service_portal.asset.cancel.button,Cancel,en_US
self_service_portal.asset.cancel.button,Abbrechen,de_DE
self_service_portal.asset.details.created_date,Date added,en_US
self_service_portal.asset.details.created_date,Hinzugefügt am,de_DE
self_service_portal.asset.details.owner,Business unit owner,en_US
self_service_portal.asset.details.owner,Inhaber der Geschäftseinheit,de_DE
self_service_portal.asset.details.confirm_delete_title,Confirm delete,en_US
self_service_portal.asset.details.confirm_delete_title,Löschen bestätigen,de_DE
self_service_portal.asset.details.confirm_delete_body,Are you sure you want to delete the image?,en_US
self_service_portal.asset.details.confirm_delete_body,"Sind Sie sicher, dass Sie das Bild löschen möchten?",de_DE
self_service_portal.asset.success.updated,Asset has been successfully updated,en_US
self_service_portal.asset.success.updated,Asset wurde erfolgreich aktualisiert,de_DE
self_service_portal.asset.image.requirements,Upload image requirements,en_US
self_service_portal.asset.image.requirements,Anforderungen für das Hochladen von Bildern,de_DE
self_service_portal.asset.image.upload,Upload,en_US
self_service_portal.asset.image.upload,Hochladen,de_DE
self_service_portal.asset.details_page.search_service,Search services,en_US
self_service_portal.asset.details_page.search_service,Services suchen,de_DE
self_service_portal.asset.details_page.name,Name,en_US
self_service_portal.asset.details_page.name,Name,de_DE
self_service_portal.asset.details_page.serial_number,Serial Number,en_US
self_service_portal.asset.details_page.serial_number,Seriennummer,de_DE
self_service_portal.asset.details_page.note,Note,en_US
self_service_portal.asset.details_page.note,Notiz,de_DE
self_service_portal.asset.details_page.reference,Reference,en_US
self_service_portal.asset.details_page.reference,Referenz,de_DE
self_service_portal.asset.details_page.confirm_unassign_title,Confirm delete,en_US
self_service_portal.asset.details_page.confirm_unassign_title,Löschen bestätigen,de_DE
self_service_portal.asset.details_page.confirm_unassign_body,Unassign this asset from the business unit. Do you want to proceed?,en_US
self_service_portal.asset.details_page.confirm_unassign_body,Möchten Sie dieses Asset wirklich von der Geschäftseinheit entfernen?,de_DE
self_service_portal.asset.details_page.confirm_unassign_in_review,Asset is in Review. You can delete it after it is approved.,en_US
self_service_portal.asset.details_page.confirm_unassign_in_review,"Die Ressource wird überprüft. Du kannst sie löschen, nachdem sie genehmigt wurde.",de_DE
self_service_portal.asset.details_page.unassign,Unassign,en_US
self_service_portal.asset.details_page.unassign,Zuweisung aufheben,de_DE
self_service_portal.inquiry.type.ssp_asset,Asset,en_US
self_service_portal.inquiry.type.ssp_asset,Asset,de_DE
customer.self_service_portal.inquiry.details.ssp_asset_reference,Asset Reference,en_US
customer.self_service_portal.inquiry.details.ssp_asset_reference,Asset-Referenz,de_DE
customer.self_service_portal.inquiry.ssp_asset.details,Asset Details,en_US
customer.self_service_portal.inquiry.ssp_asset.details,Asset-Details,de_DE
customer.self_service_portal.inquiry.details.ssp_asset_not_available,Asset not available,en_US
customer.self_service_portal.inquiry.details.ssp_asset_not_available,Asset nicht verfügbar,de_DE
self_service_portal.asset.error.reference_not_found,Asset reference not found,en_US
self_service_portal.asset.error.reference_not_found,Asset-Referenz nicht gefunden,de_DE
self_service_portal.asset.error.company_user_not_found,Company user not found,en_US
self_service_portal.asset.error.company_user_not_found,Firmenbenutzer nicht gefunden,de_DE
customer.self_service_portal.inquiry.create.button,Create inquiry,en_US
customer.self_service_portal.inquiry.create.button,Anfrage stellen,de_DE
self_service_portal.inquiry.ssp_asset_reference.label,Asset Reference,en_US
self_service_portal.inquiry.ssp_asset_reference.label,Asset-Referenz,de_DE
customer.self_service_portal.inquiry.details.ssp_asset_name,Asset Name,en_US
customer.self_service_portal.inquiry.details.ssp_asset_name,Asset-Name,de_DE
customer.account.ssp_assets,Assets,en_US
customer.account.ssp_assets,Assets,de_DE
customer.account.ssp_asset,Asset,en_US
customer.account.ssp_asset,Asset,de_DE
customer.ssp_asset.list.reference,Reference,en_US
customer.ssp_asset.list.reference,Referenz,de_DE
customer.ssp_asset.list.name,Asset Name,en_US
customer.ssp_asset.list.name,Asset-Name,de_DE
customer.ssp_asset.list.serial_number,Serial Number,en_US
customer.ssp_asset.list.serial_number,Seriennummer,de_DE
customer.ssp_asset.list.date_added,Date added,en_US
customer.ssp_asset.list.date_added,Hinzugefügt am,de_DE
customer.ssp_asset.view_ssp_asset,View,en_US
customer.ssp_asset.view_ssp_asset,Anzeigen,de_DE
customer.ssp_asset.create.button,Create Asset,en_US
customer.ssp_asset.create.button,Asset erstellen,de_DE
customer.account.no_ssp_assets,No assets at the moment,en_US
customer.account.no_ssp_assets,Keine Assets vorhanden,de_DE
company.error.company_user_not_found,Company user not found,en_US
company.error.company_user_not_found,Firmenbenutzer nicht gefunden,de_DE
customer.ssp_asset.list.business_unit,Business Unit Owner,en_US
customer.ssp_asset.list.business_unit,Inhaber der Geschäftseinheit,de_DE
customer.ssp_asset.list.image,Image,en_US
customer.ssp_asset.list.image,Bild,de_DE
self_service_portal.asset.details_page.created_date,Date added,en_US
self_service_portal.asset.details_page.created_date,Hinzugefügt am,de_DE
self_service_portal.asset.details_page.owner,Business unit owner,en_US
self_service_portal.asset.details_page.owner,Inhaber der Geschäftseinheit,de_DE
self_service_portal.asset.details_page.undefined,Undefined,en_US
self_service_portal.asset.details_page.undefined,Nicht definiert,de_DE
self_service_portal.asset.success.business_unit_relation_updated,Business unit has been successfully unassigned from the asset,en_US
self_service_portal.asset.success.business_unit_relation_updated,Die Zuordnung der Geschäftseinheit zum Asset wurde erfolgreich aufgehoben,de_DE
self_service_portal.asset.details_page.status,Status,en_US
self_service_portal.asset.details_page.status,Status,de_DE
self_service_portal.asset.details.status,Status,en_US
self_service_portal.asset.details.status,Status,de_DE
self_service_portal.asset.status.pending,Pending,en_US
self_service_portal.asset.status.pending,Ausstehend,de_DE
self_service_portal.asset.status.approved,Approved,en_US
self_service_portal.asset.status.approved,Genehmigt,de_DE
self_service_portal.asset.status.in_review,In Review,en_US
self_service_portal.asset.status.in_review,In Überprüfung,de_DE
self_service_portal.asset.status.declined,Declined,en_US
self_service_portal.asset.status.declined,Abgelehnt,de_DE
self_service_portal.asset.information.assigned_bu,Assigned business units,en_US
self_service_portal.asset.information.assigned_bu,Zugewiesene Geschäftseinheiten,de_DE
customer.ssp_asset.filter.scope,Access level,en_US
customer.ssp_asset.filter.scope,Zugriffsebene,de_DE
customer.ssp_asset.filter.scope.placeholder,Select access level,en_US
customer.ssp_asset.filter.scope.placeholder,Zugriffsebene auswählen,de_DE
customer.ssp_asset.filter_by_business_unit,My business unit assets,en_US
customer.ssp_asset.filter_by_business_unit,Assets meiner Geschäftseinheit,de_DE
customer.ssp_asset.filter_by_company,My company assets,en_US
customer.ssp_asset.filter_by_company,Assets meiner Firma,de_DE
self_service_portal.asset.error.cannot_unassign_own_business_unit,You cannot unassign your own business unit from the asset,en_US
self_service_portal.asset.error.cannot_unassign_own_business_unit,Sie können Ihre eigene Geschäftseinheit nicht vom Asset trennen,de_DE
self_service_portal.asset_management.ssp_asset_search_filter_form.label.active_filters,Active filters:,en_US
self_service_portal.asset_management.ssp_asset_search_filter_form.label.active_filters,Aktive filter:,de_DE
self_service_portal.asset_management.ssp_asset_search_filter_form.field.reset_all.label,Reset all,en_US
self_service_portal.asset_management.ssp_asset_search_filter_form.field.reset_all.label,Alles zurücksetzen,de_DE
self_service_portal.asset.access.denied,Access denied.,en_US
self_service_portal.asset.access.denied,Zugriff verweigert.,de_DE
self_service_portal.asset.access.status.restricted,Restricted access.,en_US
self_service_portal.asset.access.status.restricted,Eingeschränkter Zugriff.,de_DE
ssp_asset.validation.cannot_delete_own_assignment,You cannot delete your own assignment.,en_US
ssp_asset.validation.cannot_delete_own_assignment,Sie können Ihre eigene Zuweisung nicht löschen.,de_DE
self_service_portal.asset_filter.title,ASSET FILTER,en_US
self_service_portal.asset_filter.title,ASSET FILTER,de_DE
self_service_portal.asset_filter.description,Filter items based on your assets,en_US
self_service_portal.asset_filter.description,Artikel basierend auf Ihren Assets filtern,de_DE
self_service_portal.asset_filter.select_label,Select My Assets,en_US
self_service_portal.asset_filter.select_label,Meine Assets auswählen,de_DE
self_service_portal.asset_filter.serial_label,Serial:,en_US
self_service_portal.asset_filter.serial_label,Seriennummer:,de_DE
self_service_portal.asset_filter.change,Change Asset,en_US
self_service_portal.asset_filter.change,Asset ändern,de_DE
self_service_portal.asset_filter.clear,Clear,en_US
self_service_portal.asset_filter.clear,Löschen,de_DE
self_service_portal.ssp_asset.details_page.catalog,Shop Spare Parts,en_US
catalog.ssp.itemsFound,%num_found% artikel gefunden für %ssp_asset_name%,de_DE
catalog.ssp.itemsFound,%num_found% items found for %ssp_asset_name%,en_US
self_service_portal.asset.compatibility.compatible,Compatible,en_US
self_service_portal.asset.compatibility.compatible,Kompatibel,de_DE
self_service_portal.asset.compatibility.not_compatible,Not Compatible,en_US
self_service_portal.asset.compatibility.not_compatible,Nicht kompatibel,de_DE
self_service_portal.asset.form.external_image_url,External Image URL,en_US
self_service_portal.asset.form.external_image_url,Externe Bild-URL,de_DE
self_service_portal.asset.form.external_image_url.note,"Note: If no image is uploaded locally, the asset will use the image from the provided URL.",en_US
self_service_portal.asset.form.external_image_url.note,"Hinweis: Wenn kein Bild lokal hochgeladen wird, verwendet das Asset standardmäßig das Bild von der angegebenen URL.",de_DE
self_service_portal.asset.error.not-found,Asset nicht gefunden,de_DE
self_service_portal.asset.error.not-found,Asset not found,en_US
self_service_portal.asset.validation.unknown_error,An unexpected error occurred while processing your asset,en_US
self_service_portal.asset.validation.unknown_error,Beim Verarbeiten Ihres Assets ist ein Fehler aufgetreten,en_DE
```

</details>

## Import data

Import glossary and demo data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure glossary keys have been added to `spy_glossary_key` and `spy_glossary_translation` tables.
{% endinfo_block %}

## Import the Asset data

Prepare your data according to your requirements using our demo data:

**data/import/common/common/ssp_asset.csv**

```csv
reference,name,serial_number,note,external_image_url,business_unit_key,assigned_business_unit_keys
AST--1,DemoBrand Print Pro 2100,PRNT000014,"The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg,spryker_systems_HR,"spryker_systems_HR"
AST--2,DemoHaul Titan X9,TRK1200027,"The DemoHaul Titan X9 is a high-performance heavy-duty truck engineered for demanding transport operations. Built with a reinforced steel chassis and a turbocharged diesel engine, the Titan X9 delivers exceptional hauling power, fuel efficiency, and long-distance reliability. Its ergonomic cabin features advanced driver-assist technology, real-time load monitoring, and a fully digital dashboard for enhanced control. With a payload capacity of up to 18 tons and rugged off-road capability, the Titan X9 is the ultimate solution for logistics professionals and fleet operators.",https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Truck.png,spryker_systems_Zurich,spryker_systems_Zurich
AST--3,OfficeJet Pro 9025e All-in-One Printer,CN1234ABCD,"The OfficeJet Pro 9025e is a high-performance multifunctional printer designed for modern office environments. It offers fast printing, scanning, copying, and faxing capabilities with automatic duplex printing. With built-in Wi-Fi and mobile printing options, this all-in-one device enhances workplace efficiency.",https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg,spryker_systems_HR,spryker_systems_HR
AST--4,Logistic Casa F-08,,1FUJGLDR5KL123456,https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_223498915.jpeg,spryker_systems_HR,spryker_systems_HR
```

| COLUMN                      | REQUIRED | DATA TYPE | DATA EXAMPLE                                                    | DATA EXPLANATION                                                          |
|-----------------------------|----------|-----------|----------------------------------------------------------------|---------------------------------------------------------------------------|
| reference                   | ✓        | string    | AST--1                                                         | Unique identifier for the asset used as a reference in the system.        |
| name                        | ✓        | string    | DemoBrand Print Pro 2100                                       | The display name of the asset.                                            |
| serial_number               | x        | string    | PRNT000014                                                     | The serial number of the asset for identification purposes.               |
| note                        | x        | string    | The DemoBrand Print Pro 2100...                                | Detailed description or notes about the asset.                            |
| external_image_url          | x        | string    | `https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg` | URL to an external image of the asset.                                    |
| business_unit_key           | x        | string    | spryker_systems_HR                                             | The key of the business unit that owns the asset.                         |
| assigned_business_unit_keys | x        | string    | spryker_systems_HR                                             | Comma-separated list of business unit keys that have access to the asset. |

## Extend the data import configuration

**/data/import/local/full_EU.yml**

```yaml
# ...

# SelfServicePortal
- data_entity: ssp-asset
  source: data/import/common/common/ssp_asset.csv
```

## Register the following data import plugins

| PLUGIN                   | SPECIFICATION                         | PREREQUISITES | NAMESPACE                                                            |
|--------------------------|---------------------------------------|---------------|----------------------------------------------------------------------|
| SspAssetDataImportPlugin | Imports a ssp asset into persistence. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\SspAssetDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new SspAssetDataImportPlugin(),
        ];
    }
}
```

4. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_SSP_ASSET),
        ];

        return $commands;
    }
}
```

4. Import the data:

```bash
console data:import:ssp-asset
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the following database tables:

- `spy_asset`
- `spy_ssp_asset_to_company_business_unit`
- `spy_ssp_asset_storage`
- `spy_ssp_asset_search`
{% endinfo_block %}

## Set up behavior

| PLUGIN                                                    | SPECIFICATION                                                                                           | PREREQUISITES | NAMESPACE                                                                                 |
|-----------------------------------------------------------|---------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------|
| ViewCompanySspAssetPermissionPlugin                       | Grants permission to view assets of an entire company.                                                  |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| ViewBusinessUnitSspAssetPermissionPlugin                  | Grants permission to view assets within the user's business unit.                                       |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| CreateSspAssetPermissionPlugin                            | Grants permission to create assets.                                                                     |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| UpdateSspAssetPermissionPlugin                            | Grants permission to update assets.                                                                     |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| UnassignSspAssetPermissionPlugin                          | Grants permission to unassign assets from business units.                                               |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                                 |
| SelfServicePortalPageRouteProviderPlugin                  | Provides routes for the SSP asset management pages on the Storefront.                                   |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router                                       |
| SspAssetDashboardDataExpanderPlugin                       | Expands the dashboard data with asset information to display in the assets widget.                      |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement          |
| FileSizeFormatterTwigPlugin                               | Adds a Twig filter to format file sizes into a human-readable format.                                   |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Twig\FileSizeFormatterTwigPlugin             |
| SspAssetPreAddToCartPlugin                                | When a product is added to cart, maps the asset reference from the request to the item transfer object. |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                                     |
| SspAssetItemExpanderPlugin                                | Expands cart items with asset data.                                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart                            |
| SspAssetOrderExpanderPlugin                               | Expands an order with asset data for all its items.                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                           |
| SspAssetOrderItemsPostSavePlugin                          | After an order is placed, saves the relations between order items and assets.                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                           |
| SspAssetOrderItemExpanderPlugin                           | Expands individual order items with asset data.                                                         |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                           |
| SspAssetPublisherTriggerPlugin                            | Retrieves SSP assets by offset and limit.                                                               |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher                       |
| SspAssetQueryExpanderPlugin                               | Expands search query with asset-specific product filtering based on SSP asset reference.                |               | SprykerFeature\Client\SelfServicePortal\Plugin\Catalog                                    |
| SspAssetSearchResultFormatterPlugin                       | Formats search ssp asset search result.                                                                 |               | SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\ResultFormatter              |
| SspAssetSearchQueryExpanderPlugin                         | Expands SSP asset search query with permissions, sorting and search criterias.                          |               | SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\Query                        |
| SspAssetWritePublisherPlugin                              | Publishes SSP asset data by `SpySspAsset` entity events to the storage.                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search       |
| SspAssetToModelWritePublisherPlugin                       | Publishes SSP asset data by `SpySspAssetToSspModel` entity events to the storage.                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search       |
| SspAssetToCompanyBusinessUnitWritePublisherPlugin         | Publishes SSP asset data by `SpySspAssetToCompanyBusinessUnit` entity events to the storage.            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search       |
| SspAssetWritePublisherPlugin                              | Publishes SSP asset data by `SpySspAsset` entity events to the search engine.                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage      |
| SearchSspAssetToModelWritePublisherPlugin                 | Publishes SSP asset data by `SpySspAssetToSspModel` entity events to the search engine.                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage      |
| SearchSspAssetToCompanyBusinessUnitWritePublisherPlugin   | Publishes SSP asset data by `SpySspAssetToCompanyBusinessUnit` entity events to the search engine.      |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage      |
| SspAssetListSynchronizationDataBulkRepositoryPlugin       | Retrieves SSP assets by offset and limit for synchronization to a storage.                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\Storage         |
| SearchSspAssetListSynchronizationDataBulkRepositoryPlugin | Retrieves SSP assets by offset and limit for synchronization to a search engine.                        |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\SspAsset\Search |

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\CreateSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\UnassignSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\UpdateSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewBusinessUnitSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanySspAssetPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewCompanySspAssetPermissionPlugin(),
            new ViewBusinessUnitSspAssetPermissionPlugin(),
            new UpdateSspAssetPermissionPlugin(),
            new UnassignSspAssetPermissionPlugin(),
            new CreateSspAssetPermissionPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\CreateSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\UnassignSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\UpdateSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewBusinessUnitSspAssetPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanySspAssetPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewCompanySspAssetPermissionPlugin(),
            new ViewBusinessUnitSspAssetPermissionPlugin(),
            new UpdateSspAssetPermissionPlugin(),
            new UnassignSspAssetPermissionPlugin(),
            new CreateSspAssetPermissionPlugin(),
        ];
    }
}

```

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\RouterSspAssetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new SelfServicePortalPageRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Twig\FileSizeFormatterTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new FileSizeFormatterTwigPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/CartPage/CartPageDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\SspAssetPreAddToCartPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CartPageExtension\Dependency\Plugin\PreAddToCartPluginInterface>
     */
    protected function getPreAddToCartPlugins(): array
    {
        return [
           new SspAssetPreAddToCartPlugin,
        ];
    }
}
```

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart\SspAssetItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            new SspAssetItemExpanderPlugin,
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspAssetOrderExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspAssetOrderItemsPostSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface>
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new SspAssetOrderExpanderPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
     */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new SspAssetOrderItemsPostSavePlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new SspAssetOrderItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Publisher;

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search\SspAssetToCompanyBusinessUnitWritePublisherPlugin as SearchSspAssetToCompanyBusinessUnitWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search\SspAssetToModelWritePublisherPlugin as SearchSspAssetToModelWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search\SspAssetWritePublisherPlugin as SearchSspAssetWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage\SspAssetToCompanyBusinessUnitWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage\SspAssetToModelWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage\SspAssetWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAssetPublisherTriggerPlugin;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>|array<string, array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>>
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getSspAssetStoragePlugins(),
            $this->getSspAssetSearchPlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new SspAssetPublisherTriggerPlugin(),
        ];
    }
    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getSspAssetStoragePlugins(): array
    {
        return [
            new SspAssetWritePublisherPlugin(),
            new SspAssetToCompanyBusinessUnitWritePublisherPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getSspAssetSearchPlugins(): array
    {
        return [
            new SearchSspAssetWritePublisherPlugin(),
            new SearchSspAssetToModelWritePublisherPlugin(),
            new SearchSspAssetToCompanyBusinessUnitWritePublisherPlugin(),
        ];
    }
}
```


**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;

use 

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>|array<\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function createCatalogSearchQueryExpanderPlugins(): array
    {
        return [
            new SspAssetQueryExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/SelfServicePortal/SelfServicePortalDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\SelfServicePortal;

use SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\Query\SspAssetSearchQueryExpanderPlugin;
use SprykerFeature\Client\SelfServicePortal\Plugin\Elasticsearch\ResultFormatter\SspAssetSearchResultFormatterPlugin;
use SprykerFeature\Client\SelfServicePortal\SelfServicePortalDependencyProvider as SprykerSelfServicePortalDependencyProvider;

class SelfServicePortalDependencyProvider extends SprykerSelfServicePortalDependencyProvider
{
    /**
     * @return list<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>
     */
    protected function getSspAssetSearchResultFormatterPlugins(): array
    {
        return [
            new SspAssetSearchResultFormatterPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function getSspAssetSearchQueryExpanderPlugins(): array
    {
        return [
            new SspAssetSearchQueryExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Synchronization;

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\SspAsset\Search\SspAssetListSynchronizationDataBulkRepositoryPlugin as SearchSspAssetListSynchronizationDataBulkRepositoryPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\Storage\SspAssetListSynchronizationDataBulkRepositoryPlugin;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new SspAssetListSynchronizationDataBulkRepositoryPlugin(),
            new SearchSspAssetListSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

2. Enable the Storefront API endpoints:

| PLUGIN                       | SPECIFICATION                                           | PREREQUISITES | NAMESPACE                                                    |
|------------------------------|---------------------------------------------------------|---------------|--------------------------------------------------------------|
| SspAssetsResourceRoutePlugin | Provides the GET and POST endpoints for the SSP assets. |               | SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\GlueApplication;

use SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication\SspAssetsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
   /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {    
        return [
            new SspAssetsResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can manage `ssp-assets` resources for the company user:

0. Prerequisites:
  - You have a company user
  - You have company user credentials: username and password.
  - Assets are assigned to the business unit of the company user
  - You have imported assets as described in the previous sections.

1. get the access token by sending a `POST` request to the token endpoint with the company user credentials.
  `POST https://glue.mysprykershop.com/token`

```json
{
    "data": {
        "type": "token",
        "attributes": {
            "grant_type": "password",
            "username": {% raw %}{{{% endraw %}username{% raw %}}}{% endraw %},
            "password": {% raw %}{{{% endraw %}password{% raw %}}}{% endraw %},
        }
    }
}
```

2. Use the access token to access the `ssp-assets` endpoint:


<details>
  <summary>GET https://glue.mysprykershop.com/ssp-assets</summary>

```json
{
  "data": [
    {
      "type": "ssp-assets",
      "id": "AST--1",
      "attributes": {
        "reference": "AST--1",
        "name": "DemoBrand Print Pro 2100",
        "serialNumber": "PRNT000014",
        "note": "The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",
        "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg"
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-assets/AST--1"
      }
    },
    {
      "type": "ssp-assets",
      "id": "AST--2",
      "attributes": {
        "reference": "AST--2",
        "name": "DemoHaul Titan X9",
        "serialNumber": "TRK1200027",
        "note": "The DemoHaul Titan X9 is a high-performance heavy-duty truck engineered for demanding transport operations. Built with a reinforced steel chassis and a turbocharged diesel engine, the Titan X9 delivers exceptional hauling power, fuel efficiency, and long-distance reliability. Its ergonomic cabin features advanced driver-assist technology, real-time load monitoring, and a fully digital dashboard for enhanced control. With a payload capacity of up to 18 tons and rugged off-road capability, the Titan X9 is the ultimate solution for logistics professionals and fleet operators.",
        "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Truck.png"
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-assets/AST--2"
      }
    },
    {
      "type": "ssp-assets",
      "id": "AST--3",
      "attributes": {
        "reference": "AST--3",
        "name": "OfficeJet Pro 9025e All-in-One Printer",
        "serialNumber": "CN1234ABCD",
        "note": "The OfficeJet Pro 9025e is a high-performance multifunctional printer designed for modern office environments. It offers fast printing, scanning, copying, and faxing capabilities with automatic duplex printing. With built-in Wi-Fi and mobile printing options, this all-in-one device enhances workplace efficiency.",
        "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg"
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-assets/AST--3"
      }
    },
    {
      "type": "ssp-assets",
      "id": "AST--4",
      "attributes": {
        "reference": "AST--4",
        "name": "Logistic Casa F-08",
        "serialNumber": "",
        "note": "1FUJGLDR5KL123456",
        "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_223498915.jpeg"
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-assets/AST--4"
      }
    }
  ],
  "links": {
    "self": "http://glue.eu.spryker.local/ssp-assets"
  }
}
```

</details>

3. To get the particular asset, use the access token to send a `GET` request to the `ssp-assets` endpoint with the asset ID:

`GET https://glue.mysprykershop.com/ssp-assets/AST--1`

```json
{
    "data": {
        "type": "ssp-assets",
        "id": "AST--1",
        "attributes": {
            "reference": "AST--1",
            "name": "DemoBrand Print Pro 2100",
            "serialNumber": "PRNT000014",
            "note": "The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",
            "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg"
        },
        "links": {
            "self": "http://glue.eu.spryker.local/ssp-assets/AST--1"
        }
    }
}
```

4. Use the access token to create the `ssp-assets` resource:

`POST https://glue.mysprykershop.com/ssp-assets`

```json
{
  "data": {
    "type": "ssp-assets",
    "attributes": {
      "reference": {% raw %}{{{% endraw %}Asset reference{% raw %}}}{% endraw %},
      "name": {% raw %}{{{% endraw %}Asset name{% raw %}}}{% endraw %},
      "serialNumber": {% raw %}{{{% endraw %}Serial number{% raw %}}}{% endraw %},
      "note": {% raw %}{{{% endraw %}Note{% raw %}}}{% endraw %},
      "externalImageUrl": {% raw %}{{{% endraw %}URL{% raw %}}}{% endraw %}
    }
  }
}
```

Example of a successful response:

```json
{
  "data": {
    "type": "ssp-assets",
    "id": "AST--5",
    "attributes": {
      "reference": "AST--5",
      "name": "AssetName1",
      "serialNumber": "serialNumberAsset1API",
      "note": "noteAsset",
      "externalImageUrl": "http://emaple.com"
    },
    "links": {
      "self": "http://glue.eu.spryker.local/ssp-assets/AST--5"
    }
  }
}
```

{% endinfo_block %}

3. Enable the Backend API endpoints:

| PLUGIN                         | SPECIFICATION                                                  | PREREQUISITES | NAMESPACE                                                              |
|--------------------------------|----------------------------------------------------------------|---------------|------------------------------------------------------------------------|
| SspAssetsBackendResourcePlugin | Provides the GET, POST and PATCH endpoints for SSP assets. |               | SprykerFeature\Glue\SelfServicePortal\Plugin\GlueBackendApiApplication |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use SprykerFeature\Glue\SelfServicePortal\Plugin\GlueBackendApiApplication\SspAssetsBackendResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new SspAssetsBackendResourcePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can manage `ssp-assets` resources as a Back Office user:


1. Get the access token by sending a `POST` request to the token endpoint with back office user credentials:

`POST https://glue-backend.mysprykershop.com/token`

```http
POST https://glue.backend.com/token HTTP/2.0
Host: glue-backend.mysprykershop.com
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Content-Length: 1051

grant_type=password&username={username}&password={password}
```

2. Use the access token to access the `ssp-assets` backend endpoint:

<details>
  <summary>GET https://glue-backend.mysprykershop.com/ssp-assets</summary>

```json
{
    "data": [
        {
            "id": "AST--1",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--1",
                "name": "DemoBrand Print Pro 2100",
                "serialNumber": "PRNT000014",
                "status": "pending",
                "note": "The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",
                "createdDate": "2025-09-23 10:37:21",
                "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg",
                "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--1"
            }
        },
        {
            "id": "AST--2",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--2",
                "name": "DemoHaul Titan X9",
                "serialNumber": "TRK1200027",
                "status": "pending",
                "note": "The DemoHaul Titan X9 is a high-performance heavy-duty truck engineered for demanding transport operations. Built with a reinforced steel chassis and a turbocharged diesel engine, the Titan X9 delivers exceptional hauling power, fuel efficiency, and long-distance reliability. Its ergonomic cabin features advanced driver-assist technology, real-time load monitoring, and a fully digital dashboard for enhanced control. With a payload capacity of up to 18 tons and rugged off-road capability, the Titan X9 is the ultimate solution for logistics professionals and fleet operators.",
                "createdDate": "2025-09-23 10:37:21",
                "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Truck.png",
                "companyBusinessUnitOwnerUuid": "5860fdd0-21fc-5389-87c9-5f1507d1ef3e"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--2"
            }
        },
        {
            "id": "AST--3",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--3",
                "name": "OfficeJet Pro 9025e All-in-One Printer",
                "serialNumber": "CN1234ABCD",
                "status": "pending",
                "note": "The OfficeJet Pro 9025e is a high-performance multifunctional printer designed for modern office environments. It offers fast printing, scanning, copying, and faxing capabilities with automatic duplex printing. With built-in Wi-Fi and mobile printing options, this all-in-one device enhances workplace efficiency.",
                "createdDate": "2025-09-23 10:37:21",
                "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg",
                "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--3"
            }
        },
        {
            "id": "AST--4",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--4",
                "name": "Logistic Casa F-08",
                "serialNumber": "",
                "status": "pending",
                "note": "1FUJGLDR5KL123456",
                "createdDate": "2025-09-23 10:37:21",
                "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_223498915.jpeg",
                "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--4"
            }
        },
        {
            "id": "AST--5",
            "type": "ssp-assets",
            "attributes": {
                "reference": "AST--5",
                "name": "AssetName1",
                "serialNumber": "serialNumberAsset1API",
                "status": "pending",
                "note": "noteAsset",
                "createdDate": "2025-09-23 12:50:06",
                "externalImageUrl": "http://emaple.com",
                "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            },
            "links": {
                "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--5"
            }
        }
    ],
    "links": {
        "self": "http://glue-backend.eu.spryker.local/ssp-assets"
    }
}
```

</details>

3. To get the particular asset, use the access token to send a `GET` request to the `ssp-assets` endpoint with the asset ID:

`GET https://glue-backend.mysprykershop.com/ssp-assets/AST--1`

```json
{
  "data": {
    "id": "AST--1",
    "type": "ssp-assets",
    "attributes": {
      "reference": "AST--1",
      "name": "DemoBrand Print Pro 2100",
      "serialNumber": "PRNT000014",
      "status": "pending",
      "note": "The DemoBrand Print Pro 2100 is a compact, high-speed monochrome LaserJet printer designed for home offices and small workgroups. It delivers crisp text and sharp graphics with a print speed of up to 24 pages per minute. Featuring wireless connectivity, auto-duplex printing, and a user-friendly control panel, the BlazeJet 2100 ensures professional output with minimal maintenance. Compatible with Windows, macOS, and mobile devices via Wi-Fi.",
      "createdDate": "2025-09-23 10:37:21",
      "externalImageUrl": "https://d2s0ynfc62ej12.cloudfront.net/image/Demo_Printer.jpeg",
      "companyBusinessUnitOwnerUuid": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
    },
    "links": {
      "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--1"
    }
  }
}
```

4. Use the access token to create the `ssp-assets` resource:
`POST https://glue-backend.mysprykershop.com/ssp-assets`

```json
{
  "data": {
    "type": "ssp-assets",
    "attributes":
    {
      "name": {% raw %}{{{% endraw %}Asset name{% raw %}}}{% endraw %},
      "serialNumber": {% raw %}{{{% endraw %}Serial number{% raw %}}}{% endraw %}",
      "status": {% raw %}{{{% endraw %}One of the following statuses: pending, in_review, approved and deactivated{% raw %}}}{% endraw %},
      "note":{% raw %}{{{% endraw %}Note{% raw %}}}{% endraw %},
      "externalImageUrl": {% raw %}{{{% endraw %}URL to an image{% raw %}}}{% endraw %},
      "companyBusinessUnitOwnerUuid": {% raw %}{{{% endraw %}The UUID of the company business unit{% raw %}}}{% endraw %},
    }
  }
}
```

Example of a successful response:

```json
{
  "data": {
    "id": "AST--6",
    "type": "ssp-assets",
    "attributes": {
      "reference": "AST--6",
      "name": "Test Asset for CRUD TEST",
      "serialNumber": "CRUD-TEST-YYYYY",
      "status": "pending",
      "note": "This asset will be used for testing all CRUD operations!!!!!",
      "createdDate": "2025-09-23 13:59:35",
      "externalImageUrl": "https://example.com/asset-image_1.jpg",
      "companyBusinessUnitOwnerUuid": "5860fdd0-21fc-5389-87c9-5f1507d1ef3e"
    },
    "links": {
      "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--6"
    }
  }
}
```

5. For updating the particular asset, use the access token to send a `PATCH` request to the `ssp-assets` endpoint with the asset ID:

`PATCH https://glue-backend.mysprykershop.com/ssp-assets/AST--6`

```json
{
  "data": {
    "type": "ssp-assets",
    "attributes":
    {
      "name": {% raw %}{{{% endraw %}Asset name{% raw %}}}{% endraw %},
      "serialNumber": {% raw %}{{{% endraw %}Serial number{% raw %}}}{% endraw %}",
      "status": {% raw %}{{{% endraw %}One of the following statuses: pending, in_review, approved and deactivated{% raw %}}}{% endraw %},
      "note":{% raw %}{{{% endraw %}Note{% raw %}}}{% endraw %},
      "externalImageUrl": {% raw %}{{{% endraw %}URL to an image{% raw %}}}{% endraw %},
      "companyBusinessUnitOwnerUuid": {% raw %}{{{% endraw %}The UUID of the company business unit{% raw %}}}{% endraw %},
    }
  }
}
```

Example of a successful response:

```json
{
  "data": {
    "id": "AST--6",
    "type": "ssp-assets",
    "attributes": {
      "reference": "AST--6",
      "name": "Test Asset for CRUD TEST",
      "serialNumber": "CRUD-TEST-XXXX",
      "status": "pending",
      "note": "This asset will be used for testing all CRUD operations!!!!!",
      "createdDate": "2025-09-23 13:59:35",
      "externalImageUrl": "https://example.com/asset-image_1.jpg",
      "companyBusinessUnitOwnerUuid": "5860fdd0-21fc-5389-87c9-5f1507d1ef3e"
    },
    "links": {
      "self": "http://glue-backend.eu.spryker.local/ssp-assets/AST--6"
    }
  }
}
```

{% endinfo_block %}

### Set up widgets

| PLUGIN                        | SPECIFICATION                                                                           | PREREQUISITES | NAMESPACE                                    |
|-------------------------------|-----------------------------------------------------------------------------------------|---------------|----------------------------------------------|
| SspAssetListWidget            | Renders a list of assets on the **My Assets** page in the Customer Account.             |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspAssetMenuItemWidget        | Renders the **My Assets** menu item in the Customer Account side menu.                  |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspAssetInfoForItemWidget     | On the cart page, renders asset information for a cart item.                            |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspItemAssetSelectorWidget    | On the product details page, renders an autocomplete form field for selecting an asset. |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| AssetCompatibilityLabelWidget | Displays the compatibility label for assets.                                            |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspAssetFilterNameWidget      | Displays the asset name in search result section.                                       |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspAssetFilterWidget          | Display the asset data.                                                                 |               | SprykerFeature\Yves\SelfServicePortal\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetListWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetMenuItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetInfoForItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspItemAssetSelectorWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetFilterNameWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\AssetCompatibilityLabelWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetFilterWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SspAssetInfoForItemWidget::class,
            SspAssetListWidget::class,
            SspAssetMenuItemWidget::class,
            SspItemAssetSelectorWidget::class
            SspAssetFilterNameWidget::class,
            AssetCompatibilityLabelWidget::class,
            SspAssetFilterWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Customers** > **Company Roles**.
2. Click **Add Company User Role**.
3. Select a company.
4. Enter a name for the role.
5. In **Unassigned Permissions**, enable the following permissions:
    - **View company ssp assets**
    - **View business unit ssp assets**
    - **Update ssp assets**
    - **Unassign business unit ssp assets**
    - **Create ssp assets**
6. Click **Submit**.
7. Go to **Customers** > **Company Users**.
8. Click **Edit** next to a user.
9. Assign the role you've just created to the user.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

1. On the Storefront, log in with the company user you've assigned the role to.
   Make sure the **My Assets** menu item is displayed.
2. Go to **Customer Account** > **My Assets**.
3. Click **Create Asset**.
4. Upload an image and fill in the required fields.
5. Click **Save**.
   Make sure the asset gets saved and this opens the asset details page.
6. Go to **Customer Account** > **My Assets**.
   Make sure the asset you've created is displayed in the list.
7. Go to **Customer Account** > **Dashboard**.
   Make sure the **My Assets** widget displays the asset you've created.
8. Log out and log in with a company user without the role you've created.
   Make sure the **My Assets** menu item is not displayed, and you can't access the **My Assets** page.

{% endinfo_block %}

