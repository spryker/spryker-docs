This document describes how to install the Marketplace Merchant Portal Data Import feature.

## Install feature core

Follow the steps below to install the Marketplace Merchant Portal Data Import feature.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE  |
| -------------------- | ------- | ------------------ |
| Marketplace Merchant Portal Core | 202507.0 | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |
| Marketplace Merchant | 202507.0 | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |

### Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/file-import-merchant-portal-gui:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                      | EXPECTED DIRECTORY                              |
|-----------------------------|-------------------------------------------------|
| MerchantFile                | vendor/spryker/merchant-file                    |
| FileImportMerchantPortalGui | vendor/spryker/file-import-merchant-portal-gui  |


{% endinfo_block %}

### Generate required transfer objects and DB changes

```bash
vendor/bin/console transfer:generate
vendor/bin/console propel:install
```

### Add translations

Generate a new translation cache:

```bash
vendor/bin/console translator:generate-cache
```

### Configure navigation

Update Merchant Portal navigation to include the Data Import page by adding the following XML snippet to your `config/Zed/navigation-main-merchant-portal.xml` file:

```xml
<file-import-merchant-portal-gui>
    <label>Data Import</label>
    <title>Data Import</title>
    <icon>file-import</icon>
    <bundle>file-import-merchant-portal-gui</bundle>
    <controller>history</controller>
    <action>index</action>
</file-import-merchant-portal-gui>
```

Build navigation cache:

```bash
vendor/bin/console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that the navigation menu of the Merchant Portal has the **Data Import** section.

{% endinfo_block %}

### Update project configuration

Update your `config/Shared/config_default.php` file to include the following configuration for the file system that will be used to store merchant files:

```php
$config[MerchantFileConstants::FILE_SYSTEM_NAME] = 'merchant-files';
$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'merchant-files' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'bucket' => 'YOUR_AWS_S3_BUCKET',
        'key' => 'YOUR_AWS_S3_BUCKET_KEY',        
        'secret' => 'YOUR_AWS_S3_BUCKET_SECRET',
        'path' => '/',
        'version' => 'latest',
        'region' => getenv('AWS_REGION'),
    ],
];
```

For local development, you can use the following configuration (`config/Shared/config_default-docker.dev.php`):

```php
$config[FileSystemConstants::FILESYSTEM_SERVICE]['merchant-files'] = [
    'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
    'root' => '/data',
    'path' => '/data/merchant-files',
];
```

### Add plugins

Add the following plugins to the dependency providers:

| PLUGIN                                                                                                                                     | PLACE                                                                                                        | DESCRIPTION                                                                        |
|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| `\Spryker\Zed\FileImportMerchantPortalGui\Communication\Plugin\AclMerchantPortal\FileImportMerchantPortalGuiMerchantAclRuleExpanderPlugin` | `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getMerchantAclRuleExpanderPlugins()`        | Adds access rules to the Data Import page in Merchant Portal.                      |
| `\Spryker\Zed\MerchantFile\Communication\Plugin\AclMerchantPortal\MerchantFileAclEntityConfigurationExpanderPlugin`                        | `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins()` | Adds ACL rules for merchant files by merchants.                                    |
| `\Spryker\Zed\FileImportMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantFileImportAclEntityConfigurationExpanderPlugin`   | `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins()` | Adds ACL rules for merchant import files by merchants.                             |
| `\Spryker\Zed\FileImportMerchantPortalGui\Communication\Console\MerchantPortalFileImportConsole`                                           | `\Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands()`                                           | Reads merchant files for data import and runs data imports. Updates import status. |
| `\Spryker\Zed\FileImportMerchantPortalGui\Communication\Plugin\MerchantFile\MerchantFileImportMerchantFilePostSavePlugin`                  | `\Pyz\Zed\MerchantFile\MerchantFileDependencyProvider::getMerchantFilePostSavePlugins()`                     | Adds merchant file relation to the merchant file import DB entity.                 |


### Synchronize ACL entity rules:

```bash
vendor/bin/console acl-entity:synchronize
```

{% info_block warningBox "Warning" %}

Make sure that this command is also part of your normal deployment process. For example, you have it in `config/install/production.yml`.

```yaml
acl:
  acl-entity-synchronize:
    command: 'vendor/bin/console acl-entity:synchronize -vvv --no-ansi'
    stores: true
```

{% endinfo_block %}

### Jenkins configuration

Include new job into `config/Zed/cronjobs/jenkins.php`

```php
$jobs[] = [
    'name' => 'merchant-portal-file-import',
    'command' => '$PHP_BIN vendor/bin/console merchant-portal:file-import',
    'schedule' => '* * * * *',
    'enable' => true,
];
```

It will be executed every minute to check if there is a new file uploaded for data import by merchants. You can change the schedule according to your project needs.

### Configure Behavior

Now you need to decide what types of files you want to allow for uploading and importing inside the Merchant Portal.

```php

namespace Pyz\Zed\MerchantFile;

use Spryker\Zed\MerchantFile\MerchantFileConfig as SprykerMerchantFileConfig;

class MerchantFileConfig extends SprykerMerchantFileConfig
{
    /**
     * @return array<string, list<string>>
     */
    public function getFileTypeToContentTypeMapping(): array
    {
        return [
            'data-import' => [
                'text/csv',
                'application/csv',
                'text/plain',
            ],
        ];
    }
}
```

Then, decide what types of imports you want to enable for merchants with the example or template file that merchants can download:

```php
namespace Pyz\Zed\FileImportMerchantPortalGui;

use Spryker\Zed\FileImportMerchantPortalGui\FileImportMerchantPortalGuiConfig as SprykerFileImportMerchantPortalGuiConfig;
use Spryker\Zed\MerchantProductDataImport\MerchantProductDataImportConfig;

class FileImportMerchantPortalGuiConfig extends SprykerFileImportMerchantPortalGuiConfig
{
    /**
     * @return list<string>
     */
    public function getImportTypes(): array
    {
        return [
            MerchantProductDataImportConfig::IMPORT_TYPE_MERCHANT_COMBINED_PRODUCT,
        ];
    }

    /**
     * @return array<string, list<string>>
     */
    public function getDataImportTemplates(): array
    {
        return [
            'CSV template Product' => 'js/static/MerchantProductDataImport/data/files/combined_product.csv',
        ];
    }
}
```


### Install feature frontend

Update `paths` in the `tsconfig.mp.json` file:

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2022",
    "paths": {
      "@mp/file-import-merchant-portal-gui": [
        "vendor/spryker/file-import-merchant-portal-gui/mp.public-api.ts"
      ]
    }
  }
}
```

Build the frontend:

```bash
npm ci
npm run mp:build
```

{% info_block warningBox "Verification" %}

Open Merchant Portal, log in with a merchant user, open the **Data Import** section, and make sure that you see data import table and can open new import form.

{% endinfo_block %}

