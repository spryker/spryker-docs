---
title: Migration guide - CmsBlockCategoryConnector
description: Use the guide to update versions to the newer ones of the CMS Block Category Connector module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-cms-block-category-connector
originalArticleId: 9f3a79f2-a237-4bbe-a6fd-7d2be2479bf3
redirect_from:
  - /2021080/docs/mg-cms-block-category-connector
  - /2021080/docs/en/mg-cms-block-category-connector
  - /docs/mg-cms-block-category-connector
  - /docs/en/mg-cms-block-category-connector
  - /v1/docs/mg-cms-block-category-connector
  - /v1/docs/en/mg-cms-block-category-connector
  - /v2/docs/mg-cms-block-category-connector
  - /v2/docs/en/mg-cms-block-category-connector
  - /v3/docs/mg-cms-block-category-connector
  - /v3/docs/en/mg-cms-block-category-connector
  - /v4/docs/mg-cms-block-category-connector
  - /v4/docs/en/mg-cms-block-category-connector
  - /v5/docs/mg-cms-block-category-connector
  - /v5/docs/en/mg-cms-block-category-connector
  - /v6/docs/mg-cms-block-category-connector
  - /v6/docs/en/mg-cms-block-category-connector
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-cms-block-category-connector.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-cms-block-category-connector.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-cms-block-category-connector.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-cms-block-category-connector.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-cms-block-category-connector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-cms-block-category-connector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-cms-block-category-connector.html
---

## Upgrading from Version 1.* to Version 2.*

Due to introducing the CMS Block positioning and CMS Block templates for Category, the CMS Block Category Connector module now requires Category >=4.0.
The migration will contain the following steps:

1. New module installation
2. Deprecations migration
3. Database migration
4. Data migration

### 1. New Module Installation

Install a new module by adding the following into your composer.json: `"spryker/cms-block-category-connector": "^2.0.0"` and running the composer update.
Follow the installation instructions to enable all connector plugins: CMS Block Category Connector: Installation.

### 2. Deprecations Migration

Change usage of `\Spryker\Shared\CmsBlockCategoryConnector\CmsBlockCategoryConnectorConstants::RESOURCE_TYPE_CMS_BLOCK_CATEGORY_CONNECTOR` to `\Spryker\Shared\CmsBlockCategoryConnector\CmsBlockCategoryConnectorConfig::RESOURCE_TYPE_CMS_BLOCK_CATEGORY_CONNECTOR`

### 3. Database Migration

Run Propel migrations.  `vendor/bin/console propel:diff`, manual review is necessary for the generated migration file. `vendor/bin/console propel:migratevendor/bin/console propel:model:build`

### 4. Data Migration

Notice: You can skip this step if you don't have data in `spy_cms_block_category_connector` table.
We prepared a migration script to migrate relations to Category.
The script can be found in [Migration Guide - CMS Block Category Connector Console](/docs/scos/dev/module-migration-guides/migration-guide-cms-block-category-connector-migration-console.html).
Copy script to `src/Pyz/Zed/CmsBlockCategoryConnector/Communication/Console/CmsBlockCategoryPosition.php` and register it in `Pyz\Zed\Console\ConsoleDependencyProvider`.
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

Run console script to migrate CMS Block - Category relations to the new structure: `vendor/bin/console cms-block-category-connector:migrate-position`
<!-- Last review date: Aug 30, 2017-- by Denis Turkov -->
