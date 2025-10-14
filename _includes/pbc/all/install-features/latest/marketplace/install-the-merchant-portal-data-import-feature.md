This document describes how to install the Marketplace Merchant Portal Data Import feature.

## Install feature core

Follow the steps below to install the Marketplace Merchant Portal Data Import feature core.

### Prerequisites

Install the required features:

| NAME                              | VERSION   | INSTALLATION GUIDE                                                                                                                                                                              |
|-----------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Portal Core  | 202507.0  | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |
| Marketplace Merchant              | 202507.0  | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html)             |

### Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/merchant-portal-data-import:"dev-master" spryker/user:"^3.29.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                      | EXPECTED DIRECTORY                             |
|-----------------------------|------------------------------------------------|
| DataImportMerchant          | vendor/spryker/data-import-merchant            |
| DataImportMerchantExtension | vendor/spryker/data-import-merchant-extension  |
| DataImportMerchantPortalGui | vendor/spryker/data-import-merchant-portal-gui |
| User                        | vendor/spryker/user                            |

{% endinfo_block %}

### Generate transfer objects and database changes

```bash
vendor/bin/console transfer:generate
vendor/bin/console propel:install
```

### Add translations

1. Generate a new translation cache:

```bash
vendor/bin/console translator:generate-cache
```

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
data_import_merchant.validation.importer_type_not_supported,Importer type is not supported.,en_US
data_import_merchant.validation.importer_type_not_supported,Der Importertyp wird nicht unterstützt.,de_DE
data_import_merchant.validation.merchant_not_found,Merchant not found.,en_US
data_import_merchant.validation.merchant_not_found,Handelspartner nicht gefunden.,de_DE
data_import_merchant.validation.user_not_found,User not found.,en_US
data_import_merchant.validation.user_not_found,Benutzer nicht gefunden.,de_DE
data_import_merchant.validation.invalid_file_content_type,Invalid file content type.,en_US
data_import_merchant.validation.invalid_file_content_type,Ungültiger Dateityp.,de_DE
merchant_product_data_import.validation.missing_required_header,The required field %header% is missing.,en_US
merchant_product_data_import.validation.missing_required_header,Das erforderliche Feld %header% fehlt.,de_DE
```

2. Import data:

```yaml
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### Configure navigation

1. Update Merchant Portal navigation:

 **config/Zed/navigation-main-merchant-portal.xml**

```xml
 <data-import-merchant-portal-gui>
    <label>Data Import</label>
    <title>Data Import</title>
    <icon>data-import</icon>
    <bundle>data-import-merchant-portal-gui</bundle>
    <controller>files</controller>
    <action>index</action>
</data-import-merchant-portal-gui>
```

2. Build navigation cache:

```bash
vendor/bin/console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that, in the Merchant Portal, the **Data Import** navigation item is displayed.

{% endinfo_block %}

### Add plugins

Add the following plugins to the dependency providers:

| PLUGIN                                                     | SPECIFICATION                                                                                             | NAMESPACE                                                                      |
|------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| DataImportMerchantPortalGuiMerchantAclRuleExpanderPlugin   | Adds access rules to the Data Import page in Merchant Portal.                                             | Spryker\Zed\DataImportMerchantPortalGui\Communication\Plugin\AclMerchantPortal |
| DataImportMerchantFileAclEntityConfigurationExpanderPlugin | Expands provided `AclEntityMetadataConfig` transfer object with data import merchant file composite data. | Spryker\Zed\DataImportMerchant\Communication\Plugin\AclMerchantPortal          |
| DataImportMerchantImportConsole                            | Reads data import merchant files for data import and runs data imports. Updates import status.            | Spryker\Zed\DataImportMerchant\Communication\Console                           |
| UserDataImportMerchantFileExpanderPlugin                   | Expands `DataImportMerchantFile` transfers with `User` data.                                              | Spryker\Zed\User\Communication\Plugin\DataImportMerchant                       |

**src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\DataImportMerchant\Communication\Plugin\AclMerchantPortal\DataImportMerchantFileAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\DataImportMerchantPortalGui\Communication\Plugin\AclMerchantPortal\DataImportMerchantPortalGuiMerchantAclRuleExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\MerchantAclRuleExpanderPluginInterface>
     */
    protected function getMerchantAclRuleExpanderPlugins(): array
    {
        return [
            new DataImportMerchantPortalGuiMerchantAclRuleExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            new DataImportMerchantFileAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImportMerchant\Communication\Console\DataImportMerchantImportConsole;
use Spryker\Zed\Kernel\Container;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DataImportMerchantImportConsole(),
        ];
    }
}
```

**src/Pyz/Zed/DataImportMerchant/DataImportMerchantDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImportMerchant;

use Spryker\Zed\DataImportMerchant\DataImportMerchantDependencyProvider as SprykerDataImportMerchantDependencyProvider;
use Spryker\Zed\User\Communication\Plugin\DataImportMerchant\UserDataImportMerchantFileExpanderPlugin;

class DataImportMerchantDependencyProvider extends SprykerDataImportMerchantDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImportMerchantExtension\Dependency\Plugin\DataImportMerchantFileExpanderPluginInterface>
     */
    protected function getDataImportMerchantFileExpanderPlugins(): array
    {
        return [
            new UserDataImportMerchantFileExpanderPlugin(),
        ];
    }
}
```

### Sync ACL entity rules

1. Add new modules to installer rules:

**src/Pyz/Zed/Acl/AclConfig.php**

```php
<?php

namespace Pyz\Zed\Acl;

use Spryker\Shared\Acl\AclConstants;
use Spryker\Zed\Acl\AclConfig as SprykerAclConfig;

class AclConfig extends SprykerAclConfig
{
    /**
     * @param array<array<string>> $installerRules
     *
     * @return array<array<string>>
     */
    protected function addMerchantPortalInstallerRules(array $installerRules): array
    {
        $bundleNames = [
            'data-import-merchant-portal-gui',
        ];

        foreach ($bundleNames as $bundleName) {
            $array<installerRules> = [
                'bundle' => $bundleName,
                'controller' => AclConstants::VALIDATOR_WILDCARD,
                'action' => AclConstants::VALIDATOR_WILDCARD,
                'type' => static::RULE_TYPE_DENY,
                'role' => AclConstants::ROOT_ROLE,
            ];
        }

        return $installerRules;
    }
}
```

{% info_block warningBox "Verification" %}

1. Run `console setup:init-db`.
2. Verify that the `data-import-merchant-portal-gui` rule has been added to the `spy_acl_rule` table.

{% endinfo_block %}

2. Sync ACL entity rules:

```bash
vendor/bin/console acl-entity:synchronize
```


3. To integrate the feature without a destructive deployment, add the following command to your normal deployment, such as `config/install/production.yml`:

```yaml
acl:
  acl-entity-synchronize:
    command: 'vendor/bin/console acl-entity:synchronize -vvv --no-ansi'
    stores: true
```

### Add Jenkins configuration


Add a job to check if there're new files uploaded for data import by merchants. You can change the schedule according to your project needs.

**config/Zed/cronjobs/jenkins.php**

```php
$jobs[] = [
    'name' => 'data-import-merchant-import',
    'command' => '$PHP_BIN vendor/bin/console data-import-merchant:import',
    'schedule' => '* * * * *',
    'enable' => true,
];
```

### Configure behavior

1. Define file types to allow uploading and importing in the Merchant Portal:

**src/Pyz/Zed/DataImportMerchant/DataImportMerchantConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImportMerchant;

use Spryker\Zed\DataImportMerchant\DataImportMerchantConfig as SprykerDataImportMerchantConfig;

class DataImportMerchantConfig extends SprykerDataImportMerchantConfig
{
    /**
     * @return list<string>
     */
    public function getSupportedContentTypes(): array
    {
        return [
            'text/csv',
            'application/csv',
            'text/plain',
        ];
    }
}
```

2. Define import templates for CSV files:

**src/Pyz/Zed/DataImportMerchantPortalGui/DataImportMerchantPortalGuiConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImportMerchantPortalGui;

use Spryker\Zed\DataImportMerchantPortalGui\DataImportMerchantPortalGuiConfig as SprykerDataImportMerchantPortalGuiConfig;

class DataImportMerchantPortalGuiConfig extends SprykerDataImportMerchantPortalGuiConfig
{
    /**
     * @return array<string, string>
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
      "@mp/data-import-merchant-portal-gui": [
        "vendor/spryker/spryker/Bundles/DataImportMerchantPortalGui/mp.public-api.ts"
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
