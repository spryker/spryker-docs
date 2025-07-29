This document describes how to install the Self-Service Portal (SSP) File Management feature.

## Prerequisites

| FEATURE         | VERSION | INSTALLATION GUIDE                                                                                                                                          |
|--------------| ------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Self-Service Portal | 202507.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)          |

## 1) Install the required modules

```bash
composer require spryker-feature/self-service-portal:"^202507.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

| CONFIGURATION                            | SPECIFICATION                                                | NAMESPACE                               |
|------------------------------------------|--------------------------------------------------------------|-----------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE  | Flysystem configuration for file management.                 | Spryker\Shared\FileSystem               |
| SelfServicePortalConstants::STORAGE_NAME | Flysystem SelfServicePortal used for uploaded files storage. | SprykerFeature\Shared\SelfServicePortal |

**config/Shared/config_default.php**

```php
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'ssp-files' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => '/data',
        'path' => '/data/ssp-files',
    ],
];

$config[SelfServicePortalConstants::STORAGE_NAME] = 'ssp-files';
```

## Configure navigation

Add the `Files` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
   <ssp>
      <label>Customer Portal</label>
      <title>Customer Portal</title>
      <icon>fa-id-badge</icon>
      <pages>
         <self-service-portal-company-file>
            <label>File Attachments</label>
            <title>File Attachments</title>
            <bundle>self-service-portal</bundle>
            <controller>list-file</controller>
            <action>index</action>
         </self-service-portal-company-file>
      </pages>
   </ssp>
</config>
```

{% info_block warningBox "Verification" %}
Make sure that, in the Back Office, the **Customer portal** > **File Attachments** section is available.
{% endinfo_block %}

## Set up database schema and transfer objects

Apply database changes and generate entity and transfer objects:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Verify the following changes in your database:

| DATABASE ENTITY                | TYPE   | EVENT   |
|--------------------------------|--------|---------|
| spy_company_file               | table  | created |
| spy_company_user_file          | table  | created |
| spy_company_business_unit_file | table  | created |
| spy_file.file_reference        | column | created |
| spy_file.uuid                  | column | created |

Make sure the following transfer objects have been generated:

| TRANSFER                                  | TYPE     | EVENT   | PATH                                                                            |
|-------------------------------------------|----------|---------|---------------------------------------------------------------------------------|
| FileAttachment                            | transfer | created | src/Generated/Shared/Transfer/FileAttachmentTransfer                            |
| File                                      | transfer | created | src/Generated/Shared/Transfer/FileTransfer                                      |
| FileStorageDataCriteria                   | transfer | created | src/Generated/Shared/Transfer/FileStorageDataCriteriaTransfer                   |
| FileStorageDataConditions                 | transfer | created | src/Generated/Shared/Transfer/FileStorageDataConditionsTransfer                 |
| FileStorageDataCollection                 | transfer | created | src/Generated/Shared/Transfer/FileStorageDataCollectionTransfer                 |
| FileAttachmentCollectionRequest           | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCollectionRequestTransfer           |
| FileAttachmentCollectionResponse          | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCollectionResponseTransfer          |
| FileAttachmentCollectionDeleteCriteria    | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCollectionDeleteCriteriaTransfer    |
| FileAttachmentCriteria                    | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCriteriaTransfer                    |
| CriteriaRangeFilter                       | transfer | created | src/Generated/Shared/Transfer/CriteriaRangeFilterTransfer                       |
| FileAttachmentConditions                  | transfer | created | src/Generated/Shared/Transfer/FileAttachmentConditionsTransfer                  |
| FileAttachmentSearchConditions            | transfer | created | src/Generated/Shared/Transfer/FileAttachmentSearchConditionsTransfer            |
| FileAttachmentFilter                      | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFilterTransfer                      |
| FileAttachmentCollection                  | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCollectionTransfer                  |
| FileCriteria                              | transfer | created | src/Generated/Shared/Transfer/FileCriteriaTransfer                              |
| FileConditions                            | transfer | created | src/Generated/Shared/Transfer/FileConditionsTransfer                            |
| FileStorageData                           | transfer | created | src/Generated/Shared/Transfer/FileStorageDataTransfer                           |
| Error                                     | transfer | created | src/Generated/Shared/Transfer/ErrorTransfer                                     |
| Sort                                      | transfer | created | src/Generated/Shared/Transfer/SortTransfer                                      |
| Pagination                                | transfer | created | src/Generated/Shared/Transfer/PaginationTransfer                                |
| FileUploadCollection                      | transfer | created | src/Generated/Shared/Transfer/FileUploadCollectionTransfer                      |
| FileCollection                            | transfer | created | src/Generated/Shared/Transfer/FileCollectionTransfer                            |
| FileManagerData                           | transfer | created | src/Generated/Shared/Transfer/FileManagerDataTransfer                           |
| FileUpload                                | transfer | created | src/Generated/Shared/Transfer/FileUploadTransfer                                |
| FileInfo                                  | transfer | created | src/Generated/Shared/Transfer/FileInfoTransfer                                  |
| FileLocalizedAttributes                   | transfer | created | src/Generated/Shared/Transfer/FileLocalizedAttributesTransfer                   |
| FileAttachmentFileTableCriteria           | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileTableCriteriaTransfer           |
| FileAttachmentFileViewDetailTableCriteria | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileViewDetailTableCriteriaTransfer |
| CompanyBusinessUnitCriteriaFilter         | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitCriteriaFilterTransfer         |
| CompanyCriteriaFilter                     | transfer | created | src/Generated/Shared/Transfer/CompanyCriteriaFilterTransfer                     |
| CompanyUserCriteriaFilter                 | transfer | created | src/Generated/Shared/Transfer/CompanyUserCriteriaFilterTransfer                 |
| Filter                                    | transfer | created | src/Generated/Shared/Transfer/FilterTransfer                                    |
| SequenceNumberSettings                    | transfer | created | src/Generated/Shared/Transfer/SequenceNumberSettingsTransfer                    |
| CompanyUserCollection                     | transfer | created | src/Generated/Shared/Transfer/CompanyUserCollectionTransfer                     |
| CompanyBusinessUnitCollection             | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitCollectionTransfer             |
| CompanyCollection                         | transfer | created | src/Generated/Shared/Transfer/CompanyCollectionTransfer                         |
| Company                                   | transfer | created | src/Generated/Shared/Transfer/CompanyTransfer                                   |
| CompanyUser                               | transfer | created | src/Generated/Shared/Transfer/CompanyUserTransfer                               |
| CompanyBusinessUnit                       | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer                       |
| Customer                                  | transfer | created | src/Generated/Shared/Transfer/CustomerTransfer                                  |
| FileAttachmentFileCriteria                | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileCriteriaTransfer                |
| FileAttachmentFileConditions              | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileConditionsTransfer              |
| FileAttachmentFileSearchConditions        | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileSearchConditionsTransfer        |
| FileAttachmentFileCollection              | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileCollectionTransfer              |
| FileAttachmentFileTypeFilter              | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileTypeFilterTransfer              |
| DashboardResponse                         | transfer | created | src/Generated/Shared/Transfer/DashboardResponseTransfer                         |
| DashboardComponentFiles                   | transfer | created | src/Generated/Shared/Transfer/DashboardComponentFilesTransfer                   |
| DashboardRequest                          | transfer | created | src/Generated/Shared/Transfer/DashboardRequestTransfer                          |

{% endinfo_block %}

## Add translations

1. Append the glossary:

<details>
  <summary>Glossary</summary>

```csv
customer.account.button.filters,Filters,en_US
customer.account.button.filters,Filter,de_DE
permission.name.DownloadCompanyFilesPermissionPlugin,Download file(s) ,en_US
permission.name.DownloadCompanyFilesPermissionPlugin,Datei(en) herunterladen,de_DE
permission.name.ViewCompanyFilesPermissionPlugin,View Company Files,en_US
permission.name.ViewCompanyFilesPermissionPlugin,Firmendateien anzeigen,de_DE
permission.name.ViewCompanyUserFilesPermissionPlugin,View My Files,en_US
permission.name.ViewCompanyUserFilesPermissionPlugin,Meine Dateien anzeigen,de_DE
permission.name.ViewCompanyBusinessUnitFilesPermissionPlugin,View Business unit files,en_US
permission.name.ViewCompanyBusinessUnitFilesPermissionPlugin,Geschäftseinheit Dateien anzeigen,de_DE
general.fileUpload.description,Maximum of %amount% files (%format%) up to %size%,en_US
general.fileUpload.description,Maximal %amount% Dateien (%format%) bis %size%,de_DE
general.fileUpload.mb,MB,en_US
general.fileUpload.mb,MB,de_DE
self_service_portal.company_file.table.header.file_reference,File Reference,en_US
self_service_portal.company_file.table.header.file_reference,Dateireferenz,de_DE
self_service_portal.company_file.table.header.file_name,File Name,en_US
self_service_portal.company_file.table.header.file_name,Dateiname,de_DE
self_service_portal.company_file.table.header.file_type,File Type,en_US
self_service_portal.company_file.table.header.file_type,Dateityp,de_DE
self_service_portal.company_file.table.header.file_created_at,Date Added,en_US
self_service_portal.company_file.table.header.file_created_at,Datum hinzugefügt,de_DE
self_service_portal.company_file.table.header.file_size,Size,en_US
self_service_portal.company_file.table.header.file_size,Größe,de_DE
self_service_portal.company_file.table.header.actions,Actions,en_US
self_service_portal.company_file.table.header.actions,Aktionen,de_DE
self_service_portal.company_file.table.actions.download,Download,en_US
self_service_portal.company_file.table.actions.download,Herunterladen,de_DE
self_service_portal.company_file,My Files,en_US
self_service_portal.company_file,Meine Dateien,de_DE
self_service_portal.company_file.view.empty,You do not have any files yet.,en_US
self_service_portal.company_file.view.empty,Sie haben noch keine Dateien.,de_DE
self_service_portal.company_file.file_search_filter_form.field.type.placeholder,Select type,en_US
self_service_portal.company_file.file_search_filter_form.field.type.placeholder,Typ auswählen,de_DE
self_service_portal.company_file.file_search_filter_form.field.type.label,Type,en_US
self_service_portal.company_file.file_search_filter_form.field.type.label,Typ,de_DE
self_service_portal.company_file.file_search_filter_form.field.date_from.label,Date From,en_US
self_service_portal.company_file.file_search_filter_form.field.date_from.label,Datum von,de_DE
self_service_portal.company_file.file_search_filter_form.field.date_to.label,Date To,en_US
self_service_portal.company_file.file_search_filter_form.field.date_to.label,Datum bis,de_DE
self_service_portal.company_file.file_search_filter_form.field.access_level.placeholder,Select access level,en_US
self_service_portal.company_file.file_search_filter_form.field.access_level.placeholder,Zugriffsebene auswählen,de_DE
self_service_portal.company_file.file_search_filter_form.field.access_level.label,Access Level,en_US
self_service_portal.company_file.file_search_filter_form.field.access_level.label,Zugriffsebene,de_DE
self_service_portal.company_file.file_search_filter_form.field.search.label,Search,en_US
self_service_portal.company_file.file_search_filter_form.field.search.label,Suche,de_DE
self_service_portal.company_file.file_search_filter_form.field.reset_all.label,Reset All,en_US
self_service_portal.company_file.file_search_filter_form.field.reset_all.label,Alles zurücksetzen,de_DE
self_service_portal.company_file.file_search_filter_form.label.active_filters,Active Filters:,en_US
self_service_portal.company_file.file_search_filter_form.label.active_filters,Aktive Filter:,de_DE
self_service_portal.company_file.file_search_filter_form.field.type.company,Company Files,en_US
self_service_portal.company_file.file_search_filter_form.field.type.company,Unternehmensdateien,de_DE
self_service_portal.company_file.file_search_filter_form.field.type.company_user,My Files,en_US
self_service_portal.company_file.file_search_filter_form.field.type.company_user,Meine Dateien,de_DE
self_service_portal.company_file.file_search_filter_form.field.type.company_business_unit,Business unit files,en_US
self_service_portal.company_file.file_search_filter_form.field.type.company_business_unit,Geschäftseinheitsdateien,de_DE
```

</details>

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the data has been added to the `spy_glossary_key` and `spy_glossary_translation` database tables.

{% endinfo_block %}

## Set up behavior

| PLUGIN                                       | SPECIFICATION                                                                                                                                   | PREREQUISITES | NAMESPACE                                                                     |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------|
| DownloadCompanyFilesPermissionPlugin         | Enables downloading ˚f files.                                                                                                                   |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Permission                       |
| ViewCompanyUserFilesPermissionPlugin         | Enables company users to view the files they uploaded.                                                                                          |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                     |
| ViewCompanyBusinessUnitFilesPermissionPlugin | Allows access to files uploaded within a business unit.                                                                                         |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                     |
| ViewCompanyFilesPermissionPlugin             | Allows access to all files within a company.                                                                                                    |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                     |
| SelfServicePortalPageRouteProviderPlugin     | Provides Yves routes for the [SSP file management feature](/docs/pbc/all/self-service-portal/latest/ssp-file-management-feature-overview.html). |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router                           |
| SspCompanyFilesMenuItemWidget                | Provides a menu item widget for the customer account side menu.                                                                                 |               | SprykerFeature\Yves\SelfServicePortal\Widget                                  |
| FileAttachmentFilePreDeletePlugin            | Ensures a company file relation is deleted when a file is removed.                                                                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\FileManager         |
| FileSizeFormatterTwigPlugin                  | Adds a Twig filter to format file sizes in a human-readable format.                                                                             |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Twig\FileSizeFormatterTwigPlugin |

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyBusinessUnitFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyUserFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewFilesPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewFilesPermissionPlugin(),
            new ViewCompanyUserFilesPermissionPlugin(),
            new ViewCompanyBusinessUnitFilesPermissionPlugin(),
            new ViewCompanyFilesPermissionPlugin(),
        ];
    }
}

```

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Permission\DownloadcompanyFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyBusinessUnitFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyUserFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewFilesPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewFilesPermissionPlugin(),
            new DownloadCompanyFilesPermissionPlugin(),
            new ViewCompanyUserFilesPermissionPlugin(),
            new ViewCompanyBusinessUnitFilesPermissionPlugin(),
            new ViewCompanyFilesPermissionPlugin(),
        ];
    }
}

```

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Router\SelfServicePortalPageRouteProviderPlugin;

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

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SelfServicePortal\Widget\SspFileListWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            SspCompanyFilesMenuItemWidget::class,
            SspFileListWidget::class,
        ];
    }
}
```

**src/Pyz/Zed/FileManager/FileManagerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\FileManager;

use Spryker\Zed\FileManager\FileManagerDependencyProvider as SprykerFileManagerDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\FileManager\FileAttachmentFilePreDeletePlugin;

class FileManagerDependencyProvider extends SprykerFileManagerDependencyProvider
{
    protected function getFilePreDeletePlugins(): array
    {
        return [
            new FileAttachmentFilePreDeletePlugin(),
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

**src/Pyz/Zed/SelfServicePortal/SelfServicePortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SelfServicePortal;

use SprykerFeature\Zed\SelfServicePortal\SprykerSelfServicePortalDependencyProvider as SprykerSelfServicePortalDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement\SspFileDashboardDataExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspAssetManagement\SspFileSspAssetManagementExpanderPlugin;

class SelfServicePortalDependencyProvider extends SprykerSelfServicePortalDependencyProvider
{
    /**
     * @return array<int, \SprykerFeature\Zed\SelfServicePortal\Dependency\Plugin\DashboardDataExpanderPluginInterface>
     */
    protected function getDashboardDataExpanderPlugins(): array
    {
        return [
            new SspFileDashboardDataExpanderPlugin(),
        ];
    }
    
    /**
     * @return array<\SprykerFeature\Zed\SspAssetManagement\Dependency\Plugin\SspAssetManagementExpanderPluginInterface>
     */
    protected function getSspAssetManagementExpanderPlugins(): array
    {
        return [
            new SspFileSspAssetManagementExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify file upload and attachment:

1. In the Back Office, go to **Customer portal** > **File Attachments**.
2. Click **Upload**.
3. Drag and drop three files into the upload area.
4. Click **Upload**.
   Make sure the File Attachments list page shows the files you've uploaded.
5. Next to the first file you've uploaded, click **Attach**.
6. For **Company**, enter and select the company you want to attach the file to.
7. Click **Save**.
8. Click **Attach** next to the second file you've uploaded.
9. For **Company User**, enter and select the business unit you want to attach the file to.
10. Click **Save**.
11. Attach the third file to a company user.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify permission management:

1. In the Back Office, go to **Customers** > **Company Roles**.
2. Click **Add Company User Role**.
3. Select a company.
4. Enter a name for the role.
5. In **Unassigned Permissions**, enable the following permissions:
    - **Open My Files page**
    - **Download file**
    - **View My Files**
    - **View Business unit files**
    - **View Company Files**
6. Click **Submit**.
7. Go to **Customers** > **Company Users**.
8. Click **Edit** next to a user.
9. Assign the role you've just created to the user.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify permissions on Storefront:

1. On the Storefront, log in with the company user you've assigned the role to.
   Make sure the **My Files** menu item is displayed.
2. Go to **Customer Account** > **My Files** page.
   Make sure the three files you've uploaded are displayed.
3. Log out and log in with another company user that doesn't have the role.
   Make sure the **My Files** menu item is not displayed and you can't access the **My Files** page.

{% endinfo_block %}
