
This document describes how to install SSP feature.

## Prerequisites

Install the required features:

| NAME         | VERSION | INSTALLATION GUIDE                                                                                                                                          |
|--------------| ------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{site.version}}  | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| SSP features | {{site.version}}  | [Install the SSP feature](/docs/pbc/all/miscellaneous/{{site.version}}/ssp/install-ssp-features.md)          |

### 1) Install the required modules

```bash
composer require spryker-feature/ssp-file-management:"^0.1.6" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure the following modules are installed:

| MODULE                 | EXPECTED DIRECTORY                               |
|------------------------|--------------------------------------------------|
| SspFileManagement      | vendor/spryker-feature/ssp-file-management       |

{% endinfo_block %}

### Set up the configuration

1. Add the following configuration:

| CONFIGURATION                                | SPECIFICATION                                                                                          | NAMESPACE                               |
|----------------------------------------------|--------------------------------------------------------------------------------------------------------|-----------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE      | Flysystem configuration for file management.                                                           | Spryker\Shared\FileSystem               |
| SspFileManagementConstants::STORAGE_NAME     | Flysystem SspFileManagement uses.                                                                      | SprykerFeature\Shared\SspFileManagement |

**config/Shared/config_default.php**
```php
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;
use SprykerFeature\Shared\SspFileManagement\SspFileManagementConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'ssp-files' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => '/data',
        'path' => '/data/ssp-files',
    ],
];

$config[SspFileManagementConstants::STORAGE_NAME] = 'ssp-files';
```

## Configure navigation

Add the `Files` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <content>
       <ssp-file-management>
          <label>File Attachments</label>
          <title>File Attachments</title>
          <bundle>ssp-file-management</bundle>
          <controller>list</controller>
          <action>index</action>
          <visible>1</visible>
       </ssp-file-management>
    </content>
</config>
```

{% info_block warningBox "Verification" %}
Login to the backoffice. Make sure the `Files` section is visible in the navigation menu under `Content` section.
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
|--------------------------------|--------| ------- |
| spy_company_file               | table  | created |
| spy_company_user_file          | table  | created |
| spy_company_business_unit_file | table  | created |
| spy_file.file_reference        | column | created |
| spy_file.uuid                  | column | created |

Make sure the following transfer objects have been generated:

| TRANSFER                                             | TYPE     | EVENT   | PATH                                                      |
| ---------------------------------------------------- | -------- | ------- | --------------------------------------------------------- |
| FileAttachment                                       | transfer | created | src/Generated/Shared/Transfer/FileAttachmentTransfer      |
| File                                                 | transfer | created | src/Generated/Shared/Transfer/FileTransfer                |
| FileStorageDataCriteria                              | transfer | created | src/Generated/Shared/Transfer/FileStorageDataCriteriaTransfer |
| FileStorageDataConditions                            | transfer | created | src/Generated/Shared/Transfer/FileStorageDataConditionsTransfer |
| FileStorageDataCollection                            | transfer | created | src/Generated/Shared/Transfer/FileStorageDataCollectionTransfer |
| FileAttachmentCollectionRequest                      | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCollectionRequestTransfer |
| FileAttachmentCollectionResponse                     | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCollectionResponseTransfer |
| FileAttachmentCollectionDeleteCriteria               | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCollectionDeleteCriteriaTransfer |
| FileAttachmentCriteria                               | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCriteriaTransfer |
| CriteriaRangeFilter                                  | transfer | created | src/Generated/Shared/Transfer/CriteriaRangeFilterTransfer |
| FileAttachmentConditions                             | transfer | created | src/Generated/Shared/Transfer/FileAttachmentConditionsTransfer |
| FileAttachmentSearchConditions                       | transfer | created | src/Generated/Shared/Transfer/FileAttachmentSearchConditionsTransfer |
| FileAttachmentFilter                                 | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFilterTransfer |
| FileAttachmentCollection                             | transfer | created | src/Generated/Shared/Transfer/FileAttachmentCollectionTransfer |
| FileCriteria                                         | transfer | created | src/Generated/Shared/Transfer/FileCriteriaTransfer        |
| FileConditions                                       | transfer | created | src/Generated/Shared/Transfer/FileConditionsTransfer      |
| FileStorageData                                      | transfer | created | src/Generated/Shared/Transfer/FileStorageDataTransfer     |
| Error                                                | transfer | created | src/Generated/Shared/Transfer/ErrorTransfer               |
| Sort                                                 | transfer | created | src/Generated/Shared/Transfer/SortTransfer                |
| Pagination                                           | transfer | created | src/Generated/Shared/Transfer/PaginationTransfer          |
| FileUploadCollection                                 | transfer | created | src/Generated/Shared/Transfer/FileUploadCollectionTransfer |
| FileCollection                                       | transfer | created | src/Generated/Shared/Transfer/FileCollectionTransfer      |
| FileManagerData                                      | transfer | created | src/Generated/Shared/Transfer/FileManagerDataTransfer     |
| FileUpload                                           | transfer | created | src/Generated/Shared/Transfer/FileUploadTransfer          |
| FileInfo                                             | transfer | created | src/Generated/Shared/Transfer/FileInfoTransfer            |
| FileLocalizedAttributes                              | transfer | created | src/Generated/Shared/Transfer/FileLocalizedAttributesTransfer |
| FileAttachmentFileTableCriteria                      | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileTableCriteriaTransfer |
| FileAttachmentFileViewDetailTableCriteria            | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileViewDetailTableCriteriaTransfer |
| CompanyBusinessUnitCriteriaFilter                    | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitCriteriaFilterTransfer |
| CompanyCriteriaFilter                                | transfer | created | src/Generated/Shared/Transfer/CompanyCriteriaFilterTransfer |
| CompanyUserCriteriaFilter                            | transfer | created | src/Generated/Shared/Transfer/CompanyUserCriteriaFilterTransfer |
| Filter                                               | transfer | created | src/Generated/Shared/Transfer/FilterTransfer              |
| SequenceNumberSettings                               | transfer | created | src/Generated/Shared/Transfer/SequenceNumberSettingsTransfer |
| CompanyUserCollection                                | transfer | created | src/Generated/Shared/Transfer/CompanyUserCollectionTransfer |
| CompanyBusinessUnitCollection                        | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitCollectionTransfer |
| CompanyCollection                                    | transfer | created | src/Generated/Shared/Transfer/CompanyCollectionTransfer   |
| Company                                              | transfer | created | src/Generated/Shared/Transfer/CompanyTransfer             |
| CompanyUser                                          | transfer | created | src/Generated/Shared/Transfer/CompanyUserTransfer         |
| CompanyBusinessUnit                                  | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer |
| Customer                                             | transfer | created | src/Generated/Shared/Transfer/CustomerTransfer            |
| FileAttachmentFileCriteria                           | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileCriteriaTransfer |
| FileAttachmentFileConditions                         | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileConditionsTransfer |
| FileAttachmentFileSearchConditions                   | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileSearchConditionsTransfer |
| FileAttachmentFileCollection                         | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileCollectionTransfer |
| FileAttachmentFileTypeFilter                         | transfer | created | src/Generated/Shared/Transfer/FileAttachmentFileTypeFilterTransfer |
| DashboardResponse                                    | transfer | created | src/Generated/Shared/Transfer/DashboardResponseTransfer   |
| DashboardComponentFiles                              | transfer | created | src/Generated/Shared/Transfer/DashboardComponentFilesTransfer |
| DashboardRequest                                     | transfer | created | src/Generated/Shared/Transfer/DashboardRequestTransfer    |

{% endinfo_block %}

### Add translations

1. Append the glossary:

```
customer.account.button.filters,Filters,en_US
customer.account.button.filters,Filter,de_DE
permission.name.DownloadFilesPermissionPlugin,Download file(s) ,en_US
permission.name.DownloadFilesPermissionPlugin,Datei(en) herunterladen,de_DE
permission.name.ViewFilesPermissionPlugin,Open My Files page,en_US
permission.name.ViewFilesPermissionPlugin,Meine Dateien anzeigen,de_DE
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
ssp_file_management.file_management.table.header.file_reference,File Reference,en_US
ssp_file_management.file_management.table.header.file_reference,Dateireferenz,de_DE
ssp_file_management.file_management.table.header.file_name,File Name,en_US
ssp_file_management.file_management.table.header.file_name,Dateiname,de_DE
ssp_file_management.file_management.table.header.file_type,File Type,en_US
ssp_file_management.file_management.table.header.file_type,Dateityp,de_DE
ssp_file_management.file_management.table.header.file_created_at,Date Added,en_US
ssp_file_management.file_management.table.header.file_created_at,Datum hinzugefügt,de_DE
ssp_file_management.file_management.table.header.file_size,Size,en_US
ssp_file_management.file_management.table.header.file_size,Größe,de_DE
ssp_file_management.file_management.table.header.actions,Actions,en_US
ssp_file_management.file_management.table.header.actions,Aktionen,de_DE
ssp_file_management.file_management.table.actions.download,Download,en_US
ssp_file_management.file_management.table.actions.download,Herunterladen,de_DE
ssp_file_management.file_management,My Files,en_US
ssp_file_management.file_management,Meine Dateien,de_DE
ssp_file_management.file_management.view.empty,You do not have any files yet.,en_US
ssp_file_management.file_management.view.empty,Sie haben noch keine Dateien.,de_DE
ssp_file_management.file_management.file_search_filter_form.field.type.placeholder,Select type,en_US
ssp_file_management.file_management.file_search_filter_form.field.type.placeholder,Typ auswählen,de_DE
ssp_file_management.file_management.file_search_filter_form.field.type.label,Type,en_US
ssp_file_management.file_management.file_search_filter_form.field.type.label,Typ,de_DE
ssp_file_management.file_management.file_search_filter_form.field.date_from.label,Date From,en_US
ssp_file_management.file_management.file_search_filter_form.field.date_from.label,Datum von,de_DE
ssp_file_management.file_management.file_search_filter_form.field.date_to.label,Date To,en_US
ssp_file_management.file_management.file_search_filter_form.field.date_to.label,Datum bis,de_DE
ssp_file_management.file_management.file_search_filter_form.field.access_level.placeholder,Select access level,en_US
ssp_file_management.file_management.file_search_filter_form.field.access_level.placeholder,Zugriffsebene auswählen,de_DE
ssp_file_management.file_management.file_search_filter_form.field.access_level.label,Access Level,en_US
ssp_file_management.file_management.file_search_filter_form.field.access_level.label,Zugriffsebene,de_DE
ssp_file_management.file_management.file_search_filter_form.field.search.label,Search,en_US
ssp_file_management.file_management.file_search_filter_form.field.search.label,Suche,de_DE
ssp_file_management.file_management.file_search_filter_form.field.apply.label,Apply,en_US
ssp_file_management.file_management.file_search_filter_form.field.apply.label,Anwenden,de_DE
ssp_file_management.file_management.file_search_filter_form.field.reset_all.label,Reset All,en_US
ssp_file_management.file_management.file_search_filter_form.field.reset_all.label,Alles zurücksetzen,de_DE
ssp_file_management.file_management.file_search_filter_form.label.active_filters,Active Filters:,en_US
ssp_file_management.file_management.file_search_filter_form.label.active_filters,Aktive Filter:,de_DE
ssp_file_management.file_management.file_search_filter_form.field.type.company,Company Files,en_US
ssp_file_management.file_management.file_search_filter_form.field.type.company,Unternehmensdateien,de_DE
ssp_file_management.file_management.file_search_filter_form.field.type.company_user,My Files,en_US
ssp_file_management.file_management.file_search_filter_form.field.type.company_user,Meine Dateien,de_DE
ssp_file_management.file_management.file_search_filter_form.field.type.company_business_unit,Business unit files,en_US
ssp_file_management.file_management.file_search_filter_form.field.type.company_business_unit,Geschäftseinheitsdateien,de_DE
```

2. Import the data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Ensure the data has been added to the `spy_glossary_key` and `spy_glossary_translation` database tables.

{% endinfo_block %}


### Set up behavior

| PLUGIN                                       | SPECIFICATION                                                  | PREREQUISITES | NAMESPACE                                                             |
|----------------------------------------------|----------------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| ViewFilesPermissionPlugin                    | Allows viewing files (generic).                                |               | SprykerFeature\Shared\SspFileManagement\Plugin\Permission             |
| DownloadFilesPermissionPlugin                | Allows downloading files.                                      |               | SprykerFeature\Shared\SspFileManagement\Plugin\Permission             |
| ViewCompanyUserFilesPermissionPlugin         | Allows company users to view files they uploaded.              |               | SprykerFeature\Shared\SspFileManagement\Plugin\Permission             |
| ViewCompanyBusinessUnitFilesPermissionPlugin | Allows access to files uploaded within the same business unit. |               | SprykerFeature\Shared\SspFileManagement\Plugin\Permission             |
| ViewCompanyFilesPermissionPlugin             | Allows access to all files within the same company.            |               | SprykerFeature\Shared\SspFileManagement\Plugin\Permission             |
| SspFileManagementPageRouteProviderPlugin     | Provides Yves routes for SSP files feature.                    |               | SprykerFeature\Yves\SspFileManagement\Plugin\Router                   |
| SspFileManagerMenuItemWidget                 | Provides Menu item widget for the customer account side menu.  |               | SprykerFeature\Yves\SspFileManagement\Widget                          |
| FileAttachmentFilePreDeletePlugin            | Ensures the files are deleted when the file is removed.        |               | SprykerFeature\Zed\SspFileManagement\Communication\Plugin\FileManager |

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\DownloadFilesPermissionPlugin;
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\ViewCompanyBusinessUnitFilesPermissionPlugin;
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\ViewCompanyFilesPermissionPlugin;
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\ViewCompanyUserFilesPermissionPlugin;
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\ViewFilesPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewFilesPermissionPlugin(),
            new DownloadFilesPermissionPlugin(),
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
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\DownloadFilesPermissionPlugin;
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\ViewCompanyBusinessUnitFilesPermissionPlugin;
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\ViewCompanyFilesPermissionPlugin;
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\ViewCompanyUserFilesPermissionPlugin;
use SprykerFeature\Shared\SspFileManagement\Plugin\Permission\ViewFilesPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewFilesPermissionPlugin(),
            new DownloadFilesPermissionPlugin(),
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
use SprykerFeature\Yves\SspFileManagement\Plugin\Router\SspFileManagementPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new SspFileManagementPageRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SspFileManagement\Widget\SspFileManagerMenuItemWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            SspFileManagerMenuItemWidget::class,
        ];
    }
}
```

**src/Pyz/Zed/FileManager/FileManagerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\FileManager;

use Spryker\Zed\FileManager\FileManagerDependencyProvider as SprykerFileManagerDependencyProvider;
use SprykerFeature\Zed\SspFileManagement\Communication\Plugin\FileManager\FileAttachmentFilePreDeletePlugin;

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

{% info_block warningBox "Verification" %}

### Check file upload and attachment
1. Log into the Back Office.
2. Go to **Content** > **File Attachments**.
3. Click Upload button.
4. Drag and drop three files into the upload area.
5. Click **Upload**.
6. Make sure the File Attachments list page shows the files you just uploaded. 
7. Click **Attach** next to the first file you just uploaded.
8. In the **Company** field, start typing a company name, select the company you want to attach the file to.
9. Click **Save**. 
10. Click **Attach** next to the second file you just uploaded.
11. In the **Company User** field, start typing a business unit name, select the business unit you want to attach the file to. 
12. Click **Save**.
13. Attach the third file to a company user.

### Check permissions
1. Log into the Back Office.
2. Go to **Customers** > **Company Roles**.
3. Click **Add Company User Role** button.
4. Select a Company.
5. Give the role a name.
6. In the **Unassigned Permissions** list select:
   - Open My Files page
   - Download file(s)
   - View My Files
   - View Business unit files
   - View Company Files
7. Click **Submit**.
8. Go to **Customers** > **Company Users**.
9. Edit a company user and assign the role you just created.

### Check the storefront pages

1. Login to Yves as the company user you just created.
2. Make sure you can see the **My Files** menu item.
3. Go to **Customer Account** > **My Files** page.
4. Make sure you can see all three files you uploaded.
5. Login to Yves as a company user without the role you created.
6. Make sure you cannot see the **My Files** menu item.
7. Check that you cannot see the **My Files** page.

{% endinfo_block %}
