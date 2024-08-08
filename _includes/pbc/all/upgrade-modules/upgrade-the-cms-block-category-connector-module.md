

## Upgrading from version 1.* to version 2.*

Due to introducing the CMS Block positioning and CMS Block templates for Category, the CMS Block Category Connector module now requires Category >=4.0.
The migration will contain the following steps:

1. New module installation
2. Deprecations migration
3. Database migration
4. Data migration

### 1. New module installation

Install a new module by adding the following into your composer.json: `"spryker/cms-block-category-connector": "^2.0.0"` and running the composer update.
Follow the installation instructions to enable all connector plugins: CMS Block Category Connector: Installation.

### 2. Deprecations migration

Change the usage of `\Spryker\Shared\CmsBlockCategoryConnector\CmsBlockCategoryConnectorConstants::RESOURCE_TYPE_CMS_BLOCK_CATEGORY_CONNECTOR` to `\Spryker\Shared\CmsBlockCategoryConnector\CmsBlockCategoryConnectorConfig::RESOURCE_TYPE_CMS_BLOCK_CATEGORY_CONNECTOR`

### 3. Database migration

Run Propel migrations.  `vendor/bin/console propel:diff`, manual review is necessary for the generated migration file. `vendor/bin/console propel:migratevendor/bin/console propel:model:build`

### 4. Data migration

{% info_block infoBox "Info" %}

You can skip this step if you don't have data in `spy_cms_block_category_connector` table.

{% endinfo_block %}

We prepared a migration script to migrate relations to Category.
The script can be found in [Upgrade the CMSBlockCategoryConnectorConsole module](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockcategoryconnector-module.html).
Copy the script to `src/Pyz/Zed/CmsBlockCategoryConnector/Communication/Console/CmsBlockCategoryPosition.php` and register it in `Pyz\Zed\Console\ConsoleDependencyProvider`.
Check that the script covers your `Category and CmsBlockCategoryConnector` configuration.


```php
<?php
namespace Pyz\Zed\Console;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    public function getConsoleCommands(Container $container)
    {
        $commands = [
          ...
          CmsBlockCategoryPosition()
        ];

        ...
    }
}
?>
```

Run console script to migrate CMS Block - Category relations to the new structure: `vendor/bin/console cms-block-category-connector:migrate-position`.
