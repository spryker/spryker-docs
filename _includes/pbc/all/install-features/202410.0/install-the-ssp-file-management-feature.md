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

```php
<?php

use Spryker\Shared\FileSystem\FileSystemConstants;
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'ssp-files' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_SSP_FILES_KEY') ?: '',
        'secret' => getenv('SPRYKER_S3_SSP_FILES_SECRET') ?: '',
        'bucket' => getenv('SPRYKER_S3_SSP_FILES_BUCKET') ?: '',
        'region' => getenv('AWS_REGION') ?: '',
        'version' => 'latest',
        'root' => '/files',
        'path' => '',
    ],
];

$config[SelfServicePortalConstants::STORAGE_NAME] = 'ssp-files';

$config[KernelConstants::CORE_NAMESPACES] = [
    ...
    'SprykerFeature',
];
```

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

## Set up frontend templates

For information about setting up frontend templates, see [Set up SSP frontend templates](/docs/pbc/all/self-service-portal/latest/install/ssp-frontend-templates.html).
