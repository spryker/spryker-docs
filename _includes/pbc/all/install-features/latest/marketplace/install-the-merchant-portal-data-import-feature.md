This document describes how to install the Marketplace Merchant Portal Data Import feature.

## Install feature core

Follow the steps below to install the Marketplace Merchant Portal Data Import feature core.

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

### Generate transfer objects and database changes

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

1. Update Merchant Portal navigation:

 **config/Zed/navigation-main-merchant-portal.xml**

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

2. Build navigation cache:

```bash
vendor/bin/console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that, in the Merchant Portal, **Data Import** navigation item is displayed.

{% endinfo_block %}

### Add file system configuration

Add file system configuration for storing merchant files:

**config/Shared/config_default.php**

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

For local development, you can use the following configuration:

**config/Shared/config_default-docker.dev.php**

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
| `\Spryker\Zed\MerchantFile\Communication\Plugin\AclMerchantPortal\MerchantFileAclEntityConfigurationExpanderPlugin`                        | `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins()` | Adds ACL rules for merchant access to merchant files.                                    |
| `\Spryker\Zed\FileImportMerchantPortalGui\Communication\Plugin\AclMerchantPortal\MerchantFileImportAclEntityConfigurationExpanderPlugin`   | `\Pyz\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider::getAclEntityConfigurationExpanderPlugins()` | Adds ACL rules for merchant access to  import files.                             |
| `\Spryker\Zed\FileImportMerchantPortalGui\Communication\Console\MerchantPortalFileImportConsole`                                           | `\Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands()`                                           | Reads merchant files for data import, runs data imports, and updates import status. |
| `\Spryker\Zed\FileImportMerchantPortalGui\Communication\Plugin\MerchantFile\MerchantFileImportMerchantFilePostSavePlugin`                  | `\Pyz\Zed\MerchantFile\MerchantFileDependencyProvider::getMerchantFilePostSavePlugins()`                     | Adds a merchant file relation to the merchant file import DB entity.                 |


### Sync ACL entity rules

1. Sync ACL entity rules:

```bash
vendor/bin/console acl-entity:synchronize
```


2. To integrate the feature without a destructive deployment, add the following command to your normal deployment process–for example, to `config/install/production.yml`:

```yaml
acl:
  acl-entity-synchronize:
    command: 'vendor/bin/console acl-entity:synchronize -vvv --no-ansi'
    stores: true
```

{% endinfo_block %}

### Add Jenkins configuration


Add a job to check if there're new files uploaded for data import by merchants. You can change the schedule according to your project needs.

**config/Zed/cronjobs/jenkins.php**

```php
$jobs[] = [
    'name' => 'merchant-portal-file-import',
    'command' => '$PHP_BIN vendor/bin/console merchant-portal:file-import',
    'schedule' => '* * * * *',
    'enable' => true,
];
```

### Configure behavior

1. Define file types to allow uploading and importing in the Merchant Portal:

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

2. Define imports types to enable for merchants with the example or template file, which merchants can download:

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


## Install feature frontend

1. In `tsconfig.mp.json`, update `paths`:

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

2. Build the frontend:

```bash
npm ci
npm run mp:build
```

{% info_block warningBox "Verification" %}

In the Merchant Portal go to **Data Import**. Make sure the data import table is displayed and you can initiate a new import.

{% endinfo_block %}












