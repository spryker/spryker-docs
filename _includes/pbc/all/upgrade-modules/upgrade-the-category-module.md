

This document describes how to upgrade the `Category` module.

## Upgrading from version 4.* to 5.*

In Version 5.* of the Category module, we:

- Added the possibility to assign stores to categories.
- Introduced the `spy_category_store` table.
- Adjusted the `spy_category.fk_category_template` field to make it a mandatory column in the `spy_category` table.

*Estimated migration time: 30 minutes.*

To upgrade the `Category` module from version 4.* to 5.*:

1. Update the `Category` module to version 5.0.0:

   ```bash
   composer require spryker/category:"^5.0.0" --update-with-dependencies
   ```

2. In `src/Pyz/Zed/Category/Persistence/Propel/Schema/spy_category.schema.xml`, add event behavior to the `spy_category_store` and `spy_category_template` database tables.

   ```xml
   <table name="spy_category_template">
         <behavior name="event">
             <parameter name="spy_category_template_all" column="*"/>
         </behavior>
   </table>

   <table name="spy_category_store">
         <behavior name="event">
             <parameter name="spy_category_store_all" column="*"/>
         </behavior>
   </table>
   ```

   {% info_block warningBox "Verification" %}

   In case you have `src/Pyz/Zed/Category/Persistence/Propel/Schema/spy_category_template.schema.xml` file locally: if you've never changed it - remove it. If you have introduced changes to it - make sure to move them to `src/Pyz/Zed/Category/Persistence/Propel/Schema/spy_category.schema.xml` and then remove the file.

   {% endinfo_block %}

{% info_block warningBox "Verification" %}

In case you have `src/Pyz/Zed/Category/Persistence/Propel/Schema/spy_category_template.schema.xml` file locally: if you've never changed it - remove it. If you have introduced changes to it - make sure to move them to `src/Pyz/Zed/Category/Persistence/Propel/Schema/spy_category.schema.xml` and then remove the file.

{% endinfo_block %}

3. Update the database schema and the generated classes:

   ```bash
   console propel:install
   console transfer:generate
   ```

4. Update the navigation cache:

   ```bash
   console navigation:build-cache
   ```

5. From `\Pyz\Zed\Category\CategoryDependencyProvider`, remove the deprecated plugin stacks:

- `\Pyz\Zed\Category\CategoryDependencyProvider::getCategoryFormPlugins()`
- `\Pyz\Zed\Category\CategoryDependencyProvider::getCategoryFormTabExpanderPlugins()`
- `\Pyz\Zed\Category\CategoryDependencyProvider::getRelationReadPluginStack()`

6. In `\Pyz\Zed\Category\CategoryDependencyProvider` on the project level, register the plugin that describes the strategy of attaching a category to a store:  

   ```php
   <?php

   namespace Pyz\Zed\Category;

   use Spryker\Zed\Category\CategoryDependencyProvider as SprykerDependencyProvider;
   use Spryker\Zed\Category\Communication\Plugin\Category\MainChildrenPropagationCategoryStoreAssignerPlugin;
   use Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryStoreAssignerPluginInterface;

   class CategoryDependencyProvider extends SprykerDependencyProvider
   {
       /**
        * @return \Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryStoreAssignerPluginInterface
        */
       protected function getCategoryStoreAssignerPlugin(): CategoryStoreAssignerPluginInterface
       {
           return new MainChildrenPropagationCategoryStoreAssignerPlugin();
       }
   }
   ```

7. if you are using the data import:

    1. Update the `CategoryDataImport` module:

      ```bash
      composer update spryker/category-data-import --update-with-dependencies
      ```

    2. Register the data import plugins and add them to the full import list in `Pyz/Zed/DataImport/DataImportDependencyProvider`:

      ```php
      <?php

      namespace Pyz\Zed\DataImport;

      use Spryker\Zed\CategoryDataImport\Communication\Plugin\DataImport\CategoryStoreDataImportPlugin;
      use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;

      class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
      {
          /**
           * @return array
           */
          protected function getDataImporterPlugins(): array
          {
              return [
                  new CategoryStoreDataImportPlugin(),
              ];
          }
      }
      ```



    3. Add the category store import to the list of the import types by the given path `Pyz/Zed/DataImport/DataImportConfig`:

      ```php
      <?php

      namespace Pyz\Zed\DataImport;

      use Spryker\Zed\CategoryDataImport\CategoryDataImportConfig;
      use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;

      class DataImportConfig extends SprykerDataImportConfig
      {
          /**
           * @return string[]
           */
          public function getFullImportTypes(): array
          {
              return [
                  CategoryDataImportConfig::IMPORT_TYPE_CATEGORY_STORE,
              ];
          }
      }
      ```

    4. In `Pyz/Zed/Console/ConsoleDependencyProvider`, register the data import console commands:

      ```php
      <?php

      namespace Pyz\Zed\Console;

      use Spryker\Zed\Kernel\Container;
      use Spryker\Zed\CategoryDataImport\CategoryDataImportConfig;
      use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
      use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;

      class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
      {
           protected const COMMAND_SEPARATOR = ':';

          /**
           * @param \Spryker\Zed\Kernel\Container $container
           *
           * @return \Symfony\Component\Console\Command\Command[]
           */
          protected function getConsoleCommands(Container $container): array
          {
           rerurn [
                  new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . CategoryDataImportConfig::IMPORT_TYPE_CATEGORY_STORE),
            ];
          }
      }
      ```

    5. Prepare data for the category and store relationships by the given path `data/import/common/{STORE}/category_store.csv`:

      ```csv
      category_key,included_store_names,excluded_store_names
      demoshop,"DE,AT,US",
      my_category,"DE","*"
      other_category,"*","US"
      ```

    6. Import category and store relationships:

      ```bash
      console data:import:category-store
      ```

{% info_block warningBox "Verification" %}

Ensure that the `spy_category_store` table has been added and filled with data.

{% endinfo_block %}

## Upgrading from version 3.* to version 4.*

The fourth version of the `Category` module introduced the changes described below.

Added:

- category templates functionality
- category view functionality
- tests for the module
- dependencies for Storage and Event modules

Removed:

- category `is_clickable` functionality

*Estimated migration time: 1 hour. The time may vary depending on project-specific factors.*

### Update modules

1. Update the `Category` module by adding `"spryker/category": "^4.0.0"` to your `composer.json` and running composer update.
Because of the changes in the Category module, all related modules have to be updated too.
2. Run composer require `spryker/event spryker/storage` to install Event and Storage modules.

### Database update and migration

Execute the following SQL statement to create the table `spy_category_template` and modify the `spy_category` one:

**Code sample:**

```sql
CREATE SEQUENCE "spy_category_template_pk_seq";

CREATE TABLE "spy_category_template"
(
    "id_category_template" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "template_path" VARCHAR(255) NOT NULL,
    PRIMARY KEY("id_category_template"),
    CONSTRAINT "spy_category_template-template_path" UNIQUE("template_path")
);

ALTER TABLE "spy_category" ADD "fk_category_template" INTEGER;

ALTER TABLE "spy_category" ADD FOREIGN KEY("fk_category_template") REFERENCES spy_category_template(id_category_template);
```

4. Run `console propel:diff; console propel:migrate; console propel:model:build` to build propel models.
5. Run `console transfer:generate` to generate objects.

#### Resolve deprecations

Before upgrading to the new version, make sure that you do not use any deprecated code from the version 3.\*. You can find the replacements for the deprecated code in the table below.

| DEPRECATED CODE | REPLACEMENT |
| --- | --- |
| `\Spryker\Shared\Category\CategoryConstants::RESOURCE_TYPE_CATEGORY_NODE` | `\Spryker\Shared\Category\CategoryConfig::RESOURCE_TYPE_CATEGORY_NODE` |
|`Spryker\Shared\Category\CategoryConstants::RESOURCE_TYPE_NAVIGATION`|`\Spryker\Shared\Category\CategoryConfig::RESOURCE_TYPE_NAVIGATION`|
|`\Spryker\Zed\Category\Communication\Form\CategoryLocalizedAttributeType::setDefaultOptions()`|`\Spryker\Zed\Category\Communication\Form\CategoryLocalizedAttributeType::configureOptions()`|

{% info_block errorBox %}

Also, the `is_clickable` form field was removed because this functionality is obsolete, so make sure that you do not use it.

{% endinfo_block %}

#### Data migration

The following migration script is designed to add the category template selection functionality to your project. If necessary, adjust the script to cover your category implementation.

**CategoryTemplateMigration.php**

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Category\Communication\Console;

use Exception;
use Orm\Zed\Category\Persistence\SpyCategoryQuery;
use Orm\Zed\Category\Persistence\SpyCategoryTemplateQuery;
use Spryker\Zed\Category\CategoryConfig;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\PropelOrm\Business\Runtime\ActiveQuery\Criteria;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Spryker\Zed\Category\Business\CategoryFacadeInterface getFacade()
 */
class CategoryTemplateMigration extends Console
{

    const COMMAND_NAME = 'category-template:migrate';

    /**
     * @var \Symfony\Component\Console\Output\OutputInterface
     */
    protected $output;

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return void
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $this->output = $output;

        $this->getFacade()->syncCategoryTemplate();
        $this->assignTemplateToAllCategories();

        $output->writeln('Successfully finished.');
    }

    /**
    * @return void
    */
    protected function configure()
    {
        parent::configure();

        $this->setName(static::COMMAND_NAME);
        $this->setDescription('');
    }

    /**
    * @throws \Exception
    *
    * @return void
    */
    protected function assignTemplateToAllCategories()
    {
        $spyCategoryTemplate = SpyCategoryTemplateQuery::create()
            ->filterByName(CategoryConfig::CATEGORY_TEMPLATE_DEFAULT)
            ->findOne();

        if (empty($spyCategoryTemplate)) {
            throw new Exception('Please specify CATEGORY_TEMPLATE_DEFAULT in your category template list configuration');
        }

        $query = SpyCategoryQuery::create()
            ->filterByFkCategoryTemplate(null, Criteria::ISNULL);

        $this->output->writeln('Will update ' . $query->count() . ' categories without template.');

        foreach ($query->find() as $category) {
            $category->setFkCategoryTemplate($spyCategoryTemplate->getIdCategoryTemplate());
            $category->save();
        }
    }

    /**
    * @return array
    */
    protected function getTemplateList()
    {
        return $this->getFactory()
                ->getConfig()
                ->getTemplateList();
    }

}
```

6. Copy the script to `src/Pyz/Zed/Category/Communication/Console/CategoryTemplateMigration.php`.
7. Register it in `Pyz\Zed\Console\ConsoleDependencyProvider`:

**Code sample:**

```php
<?php
namespace Pyz\Zed\Console;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    public function getConsoleCommands(Container $container)
    {
        $commands = [
            ...
            CategoryTemplateMigration()
        ]; ...
    }
}
```

8. Run the command to add templates to your categories: `vendor/bin/console category-template:migrate`
