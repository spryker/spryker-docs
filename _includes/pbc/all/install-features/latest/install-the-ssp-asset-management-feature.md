
This document describes how to install the Self-Service Portal (SSP) Asset Management feature.

## Prerequisites

| FEATURE         | VERSION | INSTALLATION GUIDE  |
|--------------| ------- | ------------------ |
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                        |
| Self-Service Portal | 202507.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)          |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/self-service-portal:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following packages are now listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

Add the following configuration to `config/Shared/config_default.php`:

| CONFIGURATION                             | SPECIFICATION                                       | NAMESPACE                               |
|-------------------------------------------|-----------------------------------------------------|-----------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE   | Flysystem configuration for file management.        | Spryker\Shared\FileSystem               |
| SelfServicePortalConstants::BASE_URL_YVES | Yves URL used in image URLs.                        | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConfig::getStorageName() | Defines the Storage name for asset Flysystem files. | SprykerFeature\Zed\SelfServicePortal    |

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
```

**src/Pyz/Zed/SelfServicePortal/SelfServicePortalConfig.php**

```php
namespace Pyz\Zed\SelfServicePortal;

use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{
    /**
     * @return string|null
     */
    public function getAssetStorageName(): ?string
    {
        return 'ssp-asset-image';
    }
}
```

## Set up database schema

Apply schema updates:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}
Make sure the following tables have been created in the database:

- `spy_ssp_asset`
- `spy_ssp_asset_to_company_business_unit`

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
permission.name.ViewCompanySspAssetPermissionPlugin,View company ssp assets,en_US
permission.name.ViewCompanySspAssetPermissionPlugin,Firmen-SSP-Assets anzeigen,de_DE
permission.name.ViewBusinessUnitSspAssetPermissionPlugin,View business unit ssp assets,en_US
permission.name.ViewBusinessUnitSspAssetPermissionPlugin,Geschäftseinheit-SSP-Assets anzeigen,de_DE
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
customer.ssp_asset.list.business_unit,Business Unit,en_US
customer.ssp_asset.list.business_unit,Geschäftseinheit,de_DE
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
customer.ssp_asset.list.business_unit,Business Unit Owner,en_US
customer.ssp_asset.list.business_unit,Inhaber der Geschäftseinheit,de_DE
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

## Set up behavior

| PLUGIN                                   | SPECIFICATION                                                                     | PREREQUISITES | NAMESPACE                                                                        |
|------------------------------------------|-----------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------|
| ViewCompanySspAssetPermissionPlugin      | Enables viewing of company assets.                                                |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| ViewBusinessUnitSspAssetPermissionPlugin | Provides access to assets in the same business unit.                              |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| CreateSspAssetPermissionPlugin           | Enables creation of assets.                                                       |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| UpdateSspAssetPermissionPlugin           | Enables updating of assets.                                                       |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| UnassignSspAssetPermissionPlugin         | Enables unassignment of assets.                                                   |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| SelfServicePortalPageRouteProviderPlugin | Provides Yves routes for the SSP asset management feature.                                   |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router                              |
| SspAssetManagementFilePreDeletePlugin    | Ensures files are deleted when an asset is removed.                               |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\FileManager            |
| SspAssetDashboardDataExpanderPlugin      | Adds the assets table to the SSP dashboard.                                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement |
| FileSizeFormatterTwigPlugin              | Adds a Twig filter to format file sizes in a human-readable format.                  |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Twig\FileSizeFormatterTwigPlugin    |
| SspAssetPreAddToCartPlugin               | Maps asset reference from request parameters to ItemTransfer.                     |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                            |
| SspAssetItemExpanderPlugin               | Adds SSP asset information to cart items when an SSP asset reference is provided. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart                   |
| SspAssetOrderExpanderPlugin              | Expands order items with SSP assets.                                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                  |
| SspAssetOrderItemsPostSavePlugin         | Creates a relation between a sales order item and an SSP asset in persistence.           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                  |

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
}
```

**src/Pyz/Zed/FileManager/FileManagerDependencyProvider.php**

```php
<?php


namespace Pyz\Zed\FileManager;

use Spryker\Zed\FileManager\FileManagerDependencyProvider as SprykerFileManagerDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\FileManager\SspAssetManagementFilePreDeletePlugin;

class FileManagerDependencyProvider extends SprykerFileManagerDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\FileManagerExtension\Dependency\Plugin\FilePreDeletePluginInterface>
     */
    protected function getFilePreDeletePlugins(): array
    {
        return [
            new SspAssetManagementFilePreDeletePlugin(),
        ];
    }
}
```

### Set up widgets

| PLUGIN                     | SPECIFICATION                                                             | PREREQUISITES | NAMESPACE                                    |
|----------------------------|---------------------------------------------------------------------------|---------------|----------------------------------------------|
| SspAssetListWidget         | Provides a table display for assets.                                      |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspAssetMenuItemWidget     | Provides a menu item widget for the customer account side menu.           |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspAssetInfoForItemWidget  | The widget that displays related asset for a cart item.                   |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspItemAssetSelectorWidget | Provides the autocomplete form field for asset selection on the PDP page. |               | SprykerFeature\Yves\SelfServicePortal\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetListWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetMenuItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetInfoForItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspItemAssetSelectorWidget;
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
