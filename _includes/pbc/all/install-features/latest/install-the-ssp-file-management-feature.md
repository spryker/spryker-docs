This document describes how to install the Self-Service Portal (SSP) File Management feature.

{% info_block warningBox "Install all SSP features" %}

For the Self-Service Portal to work correctly, you must install all SSP features. Each feature depends on the others for proper functionality.

{% endinfo_block %}

## Features SSP File Management depends on

- [Install the SSP Asset Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-asset-management-feature.html)
- [Install the SSP Dashboard Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-dashboard-management-feature.html)
- [Install the SSP Inquiry Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-inquiry-management-feature.html)
- [Install the SSP Model Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-model-management-feature.html)
- [Install the SSP Service Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-service-management-feature.html)
- [Install the Asset-Based Catalog feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-asset-based-catalog-feature.html)

## Prerequisites

| FEATURE         | VERSION  | INSTALLATION GUIDE                                                                                                                                          |
|--------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Self-Service Portal | {{page.release_tag}} | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)          |

## Install the required modules

```bash
composer require spryker-feature/self-service-portal:"^{{page.release_tag}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

| CONFIGURATION                               | SPECIFICATION                                                                                                                | NAMESPACE                               |
|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE     | Configures the Flysystem service for managing file uploads, specifying the adapter and storage path for files.                 | Spryker\Shared\FileSystem               |
| SelfServicePortalConstants::STORAGE_NAME    | Defines the storage name for SSP files in the Flysystem configuration, linking to the specified file system service. | SprykerFeature\Shared\SelfServicePortal |
| KernelConstants::CORE_NAMESPACES            | Defines the core namespaces.                                                                                                                                                                                                                                   | Spryker\Shared\Kerne                    |

**config/Shared/config_default.php**

To enable an IAM role configuration, use `IamAws3v3FilesystemBuilderPlugin`:

```php
<?php

use Spryker\Shared\FileSystem\FileSystemConstants;
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\IamAws3v3FilesystemBuilderPlugin;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'ssp-files' => [
        'sprykerAdapterClass' => IamAws3v3FilesystemBuilderPlugin::class,
        'bucket' => getenv('SPRYKER_S3_SSP_FILES_BUCKET') ?: '',
        'region' => getenv('AWS_REGION') ?: '',
        'path' => '/files',
    ],
];

$config[SelfServicePortalConstants::STORAGE_NAME] = 'ssp-files';

$config[KernelConstants::CORE_NAMESPACES] = [
    ...
    'SprykerFeature',
];
```

{% info_block warningBox "IAM authentication required" %}

These buckets authenticate through the IAM role attached to the workload. Access keys (`key` and `secret`) are not supported. If your project was set up from older documentation using access keys, migrate to this configuration. For more details, see [AWS S3 filesystem builder plugins](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html#aws-s3-filesystem-builder-plugins).

{% endinfo_block %}

## Set up database schema

Apply schema updates:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure the following tables have been created in the database:

- `spy_company_user_file`
- `spy_company_business_unit_file`

Make sure the following columns have been added to the `spy_file` table:

- `file_reference`
- `uuid`

{% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
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

Generate routers and navigation cache:

```bash
console router:cache:warm-up:backoffice
console navigation:build-cache 
```

{% info_block warningBox "Verification" %}

Make sure that, in the Back Office, the **Customer portal** > **File Attachments** section is available.

{% endinfo_block %}

## Set up behavior

| PLUGIN                                       | SPECIFICATION                                                                                                                                   | PREREQUISITES | NAMESPACE                                                      |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------|
| ViewCompanyUserFilesPermissionPlugin         | Enables company users to view the files they uploaded.                                                                                          |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission      |
| ViewCompanyBusinessUnitFilesPermissionPlugin | Allows access to files uploaded within a business unit.                                                                                         |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission      |
| ViewCompanyFilesPermissionPlugin             | Allows access to all files within a company.                                                                                                    |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission      |
| DownloadCompanyFilesPermissionPlugin         | Enables downloading files.                                                                                                                      |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Permission        |
| SelfServicePortalPageRouteProviderPlugin     | Provides Yves routes for the [SSP file management feature](/docs/pbc/all/self-service-portal/latest/ssp-file-management-feature-overview.html). |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router            |
| FileSizeFormatterTwigPlugin                  | Adds a Twig filter to format file sizes in a human-readable format.                                                                             |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Twig              |
| SelfServicePortalTwigPlugin                  | Provides Twig functionality for Self-Service Portal features.                                                                                   |               | SprykerFeature\Zed\SelfServicePortal\Communication\Twig        |

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyBusinessUnitFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyUserFilesPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
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
use SprykerFeature\Yves\SelfServicePortal\Plugin\Permission\DownloadCompanyFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyBusinessUnitFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyFilesPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanyUserFilesPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
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

use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalDependencyProvider as SprykerSelfServicePortalDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspAssetManagement\SspFileSspAssetManagementExpanderPlugin;

class SelfServicePortalDependencyProvider extends SprykerSelfServicePortalDependencyProvider
{   
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

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Twig\SelfServicePortalTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new SelfServicePortalTwigPlugin(),
        ];
    }
}
```

### Set up widgets

| PLUGIN                     | SPECIFICATION                                        | PREREQUISITES | NAMESPACE                                    |
|----------------------------|------------------------------------------------------|---------------|----------------------------------------------|
| SspCompanyFilesMenuItemWidget | Provides a menu item widget for the customer account side menu. |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspFileListWidget          | Displays a file attachment available to a company user on the dashboard page in the customer account. |               | SprykerFeature\Yves\SelfServicePortal\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SelfServicePortal\Widget\SspCompanyFilesMenuItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspFileListWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SspCompanyFilesMenuItemWidget::class,
            SspFileListWidget::class,
        ];
    }
}
```

### Add translations

[Here you can find how to import translations for Self-Service Portal feature](/docs/pbc/all/self-service-portal/latest/install/ssp-glossary-data-import.html)

Import translations:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Verify file upload and attachment:

1. In the Back Office, go to **Customer portal** > **File Attachments**.
2. Click **Upload file**.
3. Drag and drop three files into the upload area.
4. Click **Upload**.
   Make sure the File Attachments list page shows the files you've uploaded.
5. Next to a file attachment with reference `FILE-1`, click **Attach**.
6. Go to the **Company user** tab.
7. Select a company user.
8. Click **Save**.
   Make sure you are redirected to the view file attachments page for `FILE-1`.
9. In the **Linked entities** section, make sure the previously selected company user is displayed.
10. Go to **Customer portal** > **File Attachments**.
11. Next to a file attachment with reference `FILE-2`, click **Attach**.
12. Go to the **Business unit** tab.
13. Select a business unit.
14. Click **Save**.
    Make sure you are redirected to the view file attachments page for `FILE-2`.
15. In the **Linked entities** section, make sure the previously selected business unit is displayed.
16. Go to **Customer portal** > **File Attachments**.
17. Next to a file attachment with reference `FILE-3`, click **Attach**.
18. Go to the **Company** tab.
19. Select a company.
20. Click **Save**.
    Make sure you are redirected to the view file attachments page for `FILE-3`.
21. In the **Linked entities** section, make sure that business units from the previously selected company are displayed.

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
10. Go to **Customer portal** > **File Attachments**.
11. Next to a file attachment with reference `FILE-1`, click **Attach**.
12. Go to the **Company user** tab.
13. Select the company user you've assigned the role to.
14. Click **Save**.
   Make sure you are redirected to the view file attachments page for `FILE-1`.
9. In the **Linked entities** section, make sure the previously selected company user is displayed.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify permissions on Storefront:

1. On the Storefront, log in with the company user you've assigned the role to.
   Make sure the **Files** menu item is displayed.
2. Go to **Customer Account** > **Files** page.
   Make sure the file with reference FILE-1 is displayed.
4. Click Download next to a file. Make sure a file is downloaded.
3. Log out and log in with another company user that doesn't have the role.
   Make sure the **Files** menu item is not displayed and you can't access the **Files** page.

{% endinfo_block %}

## Import file data

The file data import requires the `SelfServicePortal` module version 20.11.0 or later:

```bash
composer require spryker-feature/self-service-portal:"^20.11.0" --update-with-dependencies
```

The feature provides two data importers:

| IMPORT TYPE                          | SPECIFICATION                                                                                                          |
|--------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| self-service-portal-file             | Imports files and uploads their content from the import file system into the file manager storage, creating file references. |
| self-service-portal-file-attachment  | Attaches previously imported files to company business units, company users, assets, and models.                          |

### Configure the import file system

The file importer reads file content from the `import-files` file system. Configure it to point to the directory where the files referenced in the CSV `path` column are stored:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE]['import-files'] = [
    'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
    'root' => APPLICATION_ROOT_DIR . '/data/import',
    'path' => '/',
];
```

### Register the data import plugins

| PLUGIN                              | SPECIFICATION                                                                                | PREREQUISITES | NAMESPACE                                                       |
|-------------------------------------|------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------|
| SspFileDataImportPlugin             | Imports files with content from a CSV file into the file manager storage.                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |
| SspFileAttachmentDataImportPlugin   | Imports file attachments, linking files to business units, company users, assets, and models.   |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\SspFileAttachmentDataImportPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\SspFileDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new SspFileDataImportPlugin(),
            new SspFileAttachmentDataImportPlugin(),
        ];
    }
}
```

Enable the data import commands by registering the following console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Kernel\Container;
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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_FILE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_FILE_ATTACHMENT),
        ];

        return $commands;
    }
}
```

### Add file demo data

Place the files to import in the configured import file system, for example, `data/import/common/common/files/`. Then prepare the import data based on your requirements using the following demo data:

**data/import/common/common/file.csv**

```csv
file_reference,file_name,path,mime_type,extension
FILE-1,Print Pro 2100 User Manual.pdf,common/common/files/user_manual.pdf,application/pdf,pdf
FILE-2,Warranty Terms.pdf,common/common/files/warranty_terms.pdf,application/pdf,pdf
FILE-3,Maintenance Checklist.pdf,common/common/files/maintenance_checklist.pdf,application/pdf,pdf
FILE-4,Asset Photo.png,common/common/files/asset_photo.png,image/png,png
FILE-5,Safety Instructions.pdf,common/common/files/safety_instructions.pdf,application/pdf,pdf
```

| COLUMN         | REQUIRED | DATA TYPE | DATA EXAMPLE                          | DATA EXPLANATION                                                              |
|----------------|----------|-----------|---------------------------------------|--------------------------------------------------------------------------------|
| file_reference | ✓        | string    | FILE-1                                | Unique identifier of the file. If a file with the same reference already exists, the importer skips it. |
| file_name      | ✓        | string    | Print Pro 2100 User Manual.pdf        | The display name of the file.                                                   |
| path           | ✓        | string    | common/common/files/user_manual.pdf   | Path to the file to import, relative to the `import-files` file system root.    |
| mime_type      | ✓        | string    | application/pdf                       | MIME type of the file.                                                          |
| extension      | ✓        | string    | pdf                                   | File extension.                                                                 |

**data/import/common/common/file_attachment.csv**

```csv
file_reference,entity_type,entity_key
FILE-1,ssp_asset,AST--1
FILE-1,ssp_model,MDL--1
FILE-2,company_business_unit,acme_corporation_HR
FILE-3,ssp_asset,AST--2
FILE-3,company_business_unit,acme_corporation_Zurich
FILE-4,ssp_model,MDL--2
FILE-5,company_user,Acme--8
```

| COLUMN         | REQUIRED | DATA TYPE | DATA EXAMPLE       | DATA EXPLANATION                                                                                             |
|----------------|----------|-----------|---------------------|-----------------------------------------------------------------------------------------------------------------|
| file_reference | ✓        | string    | FILE-1              | Reference of an imported file.                                                                                    |
| entity_type    | ✓        | string    | ssp_asset           | Type of the entity to attach the file to: `company_business_unit`, `company_user`, `ssp_asset`, or `ssp_model`.   |
| entity_key     | ✓        | string    | AST--1              | Key or reference of the target entity: business unit key, company user key, asset reference, or model reference.  |

{% info_block infoBox "Import order" %}

Import files before file attachments. The referenced entities—company business units, company users, assets, and models—must also be imported before file attachments.

{% endinfo_block %}

#### Extend the data import configuration

**data/import/local/full_EU.yml**

```yaml
version: 0

actions:
    # ...
    - data_entity: self-service-portal-file
      source: data/import/common/common/file.csv
    # ...
    - data_entity: self-service-portal-file-attachment
      source: data/import/common/common/file_attachment.csv
```

### Import the data

```bash
console data:import:self-service-portal-file
console data:import:self-service-portal-file-attachment
```

{% info_block warningBox "Verification" %}

Verify that the data was imported successfully in the Back Office:

1. Go to **Customer Portal** > **File Attachments**.
   Verify that the imported files appear on the **File Attachments** page. For example, verify that a file with the `FILE-1` reference is displayed.
2. Next to an imported file, for example `FILE-1`, click **Attach**.
   Verify that the **Linked Entities** pane displays the entities imported from the file attachment CSV. For example, for `FILE-1`, verify that the `AST--1` asset and the `MDL--1` model are listed.
{% endinfo_block %}

## Set up frontend templates

For information about setting up frontend templates, see [Set up SSP frontend templates](/docs/pbc/all/self-service-portal/latest/install/ssp-frontend-templates.html).
