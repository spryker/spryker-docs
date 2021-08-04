---
title: Migration Guide - CMS
originalLink: https://documentation.spryker.com/v5/docs/mg-cms
redirect_from:
  - /v5/docs/mg-cms
  - /v5/docs/en/mg-cms
---

## Upgrading from Version 6.* to Version 7.*
    
Version 7.0.0 of the CMS module introduces the [multi-store functionality](https://documentation.spryker.com/docs/en/multi-store-cms-pages-201903). The multi-store CMS page feature enables management of CMS page display per store via a store toggle control in the Back Office.

### BC breaks and solutions:

* Update deprecated methods and classes
* Update removed exceptions
* Update storage behavior
* Migrate database

**To upgrade to the new version of the module, do the following:**

1. Update the `Cms` module with Composer: 

```bash
"spryker/cms": "^7.0.0"
```

2. **Remove** all deprecated references:
Search for and update usage of any deprecated class or method that was used.

* Renamed the `createLocaleQuery` method to `getLocaleQuery` in `CmsPersistenceFactory`.
* Removed the deprecated method `getName()` in favor of `getBlockPrefix()` in `CmsGlossaryForm.php`.
* Removed deprecated method `getName()` in favor of `getBlockPrefix()` in `CmsRedirectForm.php`.

Interfaces were moved to the `CmsExtension` module.

* Moved the `CmsVersionPostSavePluginInterface` interface from `Cms` to `CmsExtension`
* Moved the `CmsVersionTransferExpanderPluginInterface` interface from `Cms` to `CmsExtension`
* Moved the `CmsPageDataExpanderPluginInterface.php` interface from `Cms` to `CmsExtension`
* Removed the deprecated class `CmsBlockKeyBuilder` in favor of installing the new `CmsBlock` module instead.

Exceptions were replaced by Throwables.

* Replaced Exception in favor of _Throwable_ in `CmsPageSaver`
* Replaced Exception in favor of _Throwable_ in `PageRemover`
* Replaced Exception in favor of _Throwable_ in `CmsPageActivator`
* Replaced Exception in favor of _Throwable_ in `CmsGlossarySaver`

Also, keep in mind that a doc block with non-existing methods was removed from `CmsQueryContainerInterface`.

3. Update Database Schema.
The event behavior needs to be applied to all `SpyCmsPageStore columns`.

src/Pyz/Zed/Cms/Persistence/Propel/Schema/spy_cms.schema.xml
    
```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Cms\Persistence" package="src.Orm.Zed.Cms.Persistence">

	<table name="spy_cms_page_store">
		<behavior name="event">
			<parameter name="spy_cms_page_store_all" column="*"/>
        </behavior>
    </table>
    </database>
```

4. Perform database schema migration.

On your local development environment, you may run:

```bash
console transfer:generate
console propel:install
console transfer:generate
```
When looking to generate a production migration, this command will help you find the SQL patches needed against your production schema.

```bash
vendor/bin/console propel:diff
```

{% info_block warningBox %}
Before migrating a production database, always review each SQL statement individually, even when there are many of them.
{% endinfo_block %}

5. Perform Data Migration.

For quick and smooth migration, we have prepared an example migration script. This script will find a page and share it with every store. Your specific project may require customization, especially if you have special rules regarding sharing of pages per store or a collection of `CmsPages` larger than what can be stored in your migration server's available memory.

This script will only migrate pages to stores where persistence is shared.

Pyz\Zed\Cms\Communication\Console\CmsStoreToPageDataMigration.php
  
```php
<?php

/**
* Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
* Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
*/

namespace Pyz\Zed\Cms\Communication\Console;

use Orm\Zed\Cms\Persistence\SpyCmsPageQuery;
use Orm\Zed\Cms\Persistence\SpyCmsPageStore;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
* @method \Spryker\Zed\CmsBlock\Communication\CmsBlockCommunicationFactory getFactory()
* @method \Spryker\Zed\CmsBlock\Business\CmsBlockFacade getFacade()
*/
class CmsStoreToPageDataMigration extends Console
{
	const COMMAND_NAME = 'cms-store-cms-page:migrate';
	const COMMAND_DESCRIPTION = 'Updates CMS page store relation by existing stores';
	const COMMAND_ARGUMENT_DRY_RUN = 'dry-run';

	/**
	* @param InputInterface $input
	* @param OutputInterface $output
	*
	* @return void
	*/
	public function execute(InputInterface $input, OutputInterface $output)
	{
		$connection = Propel::getConnection();

		$spyCmsPages = SpyCmsPageQuery::create()->find();
		$spyStores = SpyStoreQuery::create()->find();
		$output->writeln(sprintf('Count pages: %s', count($spyCmsPages)));
		$output->writeln(sprintf('Stores: %s', implode(', ', array_map(function(array $spyStore) {
		return $spyStore['Name'];
		}, $spyStores->toArray()))));

		foreach ($spyCmsPages as $spyCmsPage) {
			try {
				$connection->beginTransaction();

				foreach ($spyStores as $spyStore) {
					$spyCmsPageStore = new SpyCmsPageStore();
					$spyCmsPageStore->setSpyCmsPage($spyCmsPage);
					$spyCmsPageStore->setSpyStore($spyStore);
					$spyCmsPageStore->save();
				}

				$connection->commit();
			} catch (\Exception $exception) {
				$output->writeln('ERROR: ' . $exception->getMessage());
				$connection->rollBack();
			}
		}

		$output->writeln('Successfully finished.');
	}

	/**
	* @return void
	*/
	protected function configure()
	{
		parent::configure();

		$this->setName(static::COMMAND_NAME);
		$this->setDescription(static::COMMAND_DESCRIPTION);

		$this->addOption(
			static::COMMAND_ARGUMENT_DRY_RUN,
			null,
			InputOption::VALUE_REQUIRED,
			'Run without database changes'
		);
	}
}
```

{% info_block warningBox %}
Don't forget to register your migration console command in `Pyz\Zed\Console\ConsoleDependencyProvider`.
{% endinfo_block %}

Your command should be executable with `$ console cms-store-cms-page:migrate`.

{% info_block warningBox %}
Don't forget to sync your newly updated Zed data with the storage tables.
{% endinfo_block %}

```bash
$ console event:trigger -r cms_page
$ console event:trigger -r cms_page_search
```

_Estimated migration time: 2 hours_

## Upgrading from Version 5. to Version 6.*

CMS version 5.0 is responsible only for CMS pages and page versioning. CMS Block functionality became more flexible and moved to the `CmsBlock` module.

If you used CMS Blocks before, you need to migrate your data to the new structure. If you did not use CMS Blocks in your project, you can skip the migration process.

The migration process for CMS Block data is as follows:

### Install CMS Block module

To install the module, `"spryker/cms-block": "^1.0.0"` with Composer is required.

### Perform database migration

* `vendor/bin/console propel:diff`, also manual review is necessary for the generated migration file
*  `vendor/bin/console propel:migrate`
*  `vendor/bin/console propel:model:build`

After running the last command, you’ll find some new classes in your project under the `\Orm\Zed\Cms\Persistence` namespace. 

It’s important to make sure that they are extending the base classes from the core, i.e.
* `Orm\Zed\Cms\Persistence\SpyCmsBlock` extends `Spryker\Zed\CmsBlock\Persistence\Propel\AbstractSpyCmsBlock`
* `Orm\Zed\Cms\Persistence\SpyCmsBlockQuery` extends `Spryker\Zed\CmsBlock\Persistence\Propel\AbstractSpyCmsBlockQuery.`

The same is for `SpyCmsBlockGlossaryKeyMapping`, `SpyCmsBlockGlossaryKeyMappingQuery`, `SpyCmsBlockTemplate`, and `SpyCmsBlockTemplateQuery`.

### Move templates

Now, your block and page templates can be found in `src/Pyz/Yves/Cms/Theme/default/template/*` or `src/Pyz/Shared/Cms/Theme/default/template/*` folders.
Move CMS Block templates to the `src/Pyz/Shared/CmsBlock/Theme/default/template/*` folder.

### Run migration script
For quick and smooth migration, we have prepared a migration script. You can find it below.

<details>
<summary>Code sample</summary>

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\CmsBlock\Communication\Console;

use Orm\Zed\Cms\Persistence\SpyCmsPage;
use Orm\Zed\Cms\Persistence\SpyCmsPageQuery;
use Orm\Zed\Cms\Persistence\SpyCmsTemplate;
use Orm\Zed\CmsBlock\Persistence\SpyCmsBlock;
use Orm\Zed\CmsBlock\Persistence\SpyCmsBlockGlossaryKeyMapping;
use Orm\Zed\CmsBlock\Persistence\SpyCmsBlockGlossaryKeyMappingQuery;
use Orm\Zed\CmsBlock\Persistence\SpyCmsBlockQuery;
use Orm\Zed\CmsBlock\Persistence\SpyCmsBlockTemplate;
use Orm\Zed\CmsBlock\Persistence\SpyCmsBlockTemplateQuery;
use Orm\Zed\CmsBlockCategoryConnector\Persistence\SpyCmsBlockCategoryConnector;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\Kernel\Locator;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Spryker\Zed\CmsBlock\Communication\CmsBlockCommunicationFactory getFactory()
 * @method \Spryker\Zed\CmsBlock\Business\CmsBlockFacade getFacade()
 */
class CmsToCmsBlockDataMigration extends Console
{

    const COMMAND_NAME = 'cms-cms-block:migrate';
    const COMMAND_DESCRIPTION = 'Migrates CMS Block data from CMS module';
    const COMMAND_ARGUMENT_DRY_RUN = 'dry-run';

    const CMS_BLOCK_RELATION_TYPE_CATEGORY = 'category';

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     *
     * @return void
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $connection = Propel::getConnection();

        $spyCmsBlocks = SpyCmsBlockQuery::create()
            ->filterByFkPage(null, Criteria::ISNOTNULL)
            ->filterByFkTemplate(null, Criteria::ISNULL)
            ->find();

        $spyCmsBlocksCount = count($spyCmsBlocks);

        $output->writeln(sprintf('Processing %s blocks...', $spyCmsBlocksCount));

        foreach ($spyCmsBlocks as $spyCmsBlock) {
            $spyCmsPage = SpyCmsPageQuery::create()
                ->filterByIdCmsPage($spyCmsBlock->getFkPage())
                ->findOne();

            try {
                $connection->beginTransaction();

                //Migration of template
                $spyCmsTemplate = $spyCmsPage->getCmsTemplate();
                $spyCmsBlockTemplate = $this->createCmsBlockTemplate($spyCmsTemplate);
                $spyCmsBlock->setFkTemplate($spyCmsBlockTemplate->getIdCmsBlockTemplate());

                //Migration of common data fields
                $spyCmsBlock->setValidFrom($spyCmsPage->getValidFrom());
                $spyCmsBlock->setValidTo($spyCmsPage->getValidTo());
                $spyCmsBlock->setIsActive($spyCmsPage->getIsActive());

                //Migration of category relation
                if ($spyCmsBlock->getType() === self::CMS_BLOCK_RELATION_TYPE_CATEGORY) {
                    if (!$this->isCategoryConnectorInstalled()) {
                        $output->writeln('To import relation to Category you need to install CmsBlockCategoryConnector module');
                        $connection->rollBack();
                        continue;
                    }

                    $this->createCmsBlockCategoryConnector($spyCmsBlock);
                }

                $spyCmsBlock->save();
                $this->migrateGlossary($spyCmsPage, $spyCmsBlock);

                $connection->commit();
            } catch (\Exception $exception) {
                $output->writeln('ERROR: ' . $exception->getMessage());
                $connection->rollBack();
            }
        }

        $output->writeln('Successfully finished.');
    }

    /**
     * @param \Orm\Zed\Cms\Persistence\SpyCmsTemplate $spyCmsTemplate
     *
     * @return \Orm\Zed\CmsBlock\Persistence\SpyCmsBlockTemplate
     */
    protected function createCmsBlockTemplate(SpyCmsTemplate $spyCmsTemplate)
    {
        $spyCmsBlockTemplate = SpyCmsBlockTemplateQuery::create()
            ->filterByTemplatePath($spyCmsTemplate->getTemplatePath())
            ->findOne();

        if (empty($spyCmsBlockTemplate)) {
            $spyCmsBlockTemplate = new SpyCmsBlockTemplate();
            $spyCmsBlockTemplate->setTemplateName($spyCmsTemplate->getTemplateName());
            $spyCmsBlockTemplate->setTemplatePath($spyCmsTemplate->getTemplatePath());
            $spyCmsBlockTemplate->save();
        }

        return $spyCmsBlockTemplate;
    }

    /**
     * @param SpyCmsBlock $spyCmsBlock
     *
     * @return SpyCmsBlockCategoryConnector
     */
    protected function createCmsBlockCategoryConnector(SpyCmsBlock $spyCmsBlock)
    {
        $spyCmsBlockRelation = new SpyCmsBlockCategoryConnector();
        $spyCmsBlockRelation->setFkCmsBlock($spyCmsBlock->getIdCmsBlock());
        $spyCmsBlockRelation->setFkCategory($spyCmsBlock->getValue());
        $spyCmsBlockRelation->save();

        return $spyCmsBlockRelation;
    }

    /**
     * @param SpyCmsPage $spyCmsPage
     * @param SpyCmsBlock $spyCmsBlock
     *
     * @return void
     */
    protected function migrateGlossary(SpyCmsPage $spyCmsPage, SpyCmsBlock $spyCmsBlock)
    {
        foreach ($spyCmsPage->getSpyCmsGlossaryKeyMappings() as $cmsGlossaryKeyMapping) {
            $exists = SpyCmsBlockGlossaryKeyMappingQuery::create()
                ->filterByFkCmsBlock($spyCmsBlock->getIdCmsBlock())
                ->filterByPlaceholder($cmsGlossaryKeyMapping->getPlaceholder())
                ->exists();

            if (!$exists) {
                $spyCmsBlockGlossaryKeyMapping = new SpyCmsBlockGlossaryKeyMapping();
                $spyCmsBlockGlossaryKeyMapping->setFkCmsBlock($spyCmsBlock->getIdCmsBlock());
                $spyCmsBlockGlossaryKeyMapping->setFkGlossaryKey($cmsGlossaryKeyMapping->getFkGlossaryKey());
                $spyCmsBlockGlossaryKeyMapping->setPlaceholder($cmsGlossaryKeyMapping->getPlaceholder());
                $spyCmsBlockGlossaryKeyMapping->save();
            }
        }

    }


    /**
     * @return void
     */
    protected function configure()
    {
        parent::configure();

        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        $this->addOption(
            static::COMMAND_ARGUMENT_DRY_RUN,
            null,
            InputOption::VALUE_REQUIRED,
            'Run without database changes'
        );
    }

    /**
     * @return bool
     */
    protected function isCategoryConnectorInstalled()
    {
        return class_exists(SpyCmsBlockCategoryConnector::class);
    }

}
```

</br>
</details>

Copy script to `src/Pyz/Zed/CmsBlock/Communication/Console/CmsToCmsBlockDataMigration.php` and register it in `Pyz\Zed\Console\ConsoleDependencyProvider`.

```php
<?php
namespace Pyz\Zed\Console;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    public function getConsoleCommands(Container $container)
    {
        $commands = [
          ...
          CmsToCmsBlockDataMigration()
        ];

        ...
    }
}
```

Run the script with the command `vendor/bin/console cms-cms-block:migrate`.

## Upgrading from Version 4.* to Version 5.*

CMS Version 5.0 has a new concept for showing pages in the frontend. In the previous CMS versions, after creating a CMS page and running the collectors, we were able to see the page in the frontend, but now this has changed. After creating a CMS page, another step called **Publish** is needed to display the page in the frontend. Publish aggregates all CMS related data and puts it to our new CMS table `spy_cms_version`. The new collectors push this data to the frontend storage and search.

{% info_block warningBox %}
Before upgrading, make sure that you do not use any deprecated code from version 3|4.*. Check the description of the deprecated code (inside the code
{% endinfo_block %} to see what you will need to use instead.)

### Database Migration
To start Database migration, run the following commands:

* `vendor/bin/console propel:diff`, manual review is necessary for the generated migration file.
* `vendor/bin/console propel:migrate`
* `vendor/bin/console propel:model:build`

After running the last command, you will find some new classes in your project under the `\Orm\Zed\Cms\Persistence` namespace. It is important to make sure that they are extending the base classes from the core, i.e.

* `Orm\Zed\Cms\Persistence\SpyCmsVersion` extends  `Spryker\Zed\Cms\Persistence\Propel\SpyCmsVersion`

* `Orm\Zed\Cms\Persistence\SpyCmsVersionQuery` extends `Spryker\Zed\Cms\Persistence\Propel\SpyCmsVersionQuery`

### CMS Templates

In this version, we have moved all CMS templates to the Shared layer instead of only Yves, but you are still able to use the old files.
`src/Pyz/Yves/Cms/Theme/default/template/*` => `src/Pyz/Shared/Cms/Theme/default/template/*`

### CMS Twig Functions
The `TwigCms` function has been improved to provide better speed and performance, it will only send a query to Redis when the translations are not available. 
You can still work with the current version although upgrading is highly recommended.
You can find it here: `src/Pyz/Yves/Cms/Plugin/TwigCms.php`.

### CMS Collector
To push new CMS version data to the frontend storage and search, add it to the `src/Pyz/Zed/Collector/CollectorDependencyProvider.php` plugin stack:

**Code sample:**

```php
<?php
    ...

    use Spryker\Zed\CmsCollector\Communication\Plugin\CmsVersionPageCollectorSearchPlugin;
    use Spryker\Zed\CmsCollector\Communication\Plugin\CmsVersionPageCollectorStoragePlugin;

    class CollectorDependencyProvider extends SprykerCollectorDependencyProvider
    {
    ...
        $container[self::SEARCH_PLUGINS] = function (Container $container) {
          return [
              ...
              CmsConstants::RESOURCE_TYPE_PAGE => new CmsVersionPageCollectorSearchPlugin(),
          ];
        };

          ...

        $container[self::STORAGE_PLUGINS] = function (Container $container) {
           return [
                ...
                CmsConstants::RESOURCE_TYPE_PAGE => new CmsVersionPageCollectorStoragePlugin(),
                ...
           ];
    };

    ...
    ?>
```

### CMS User Interaction

When a CMS page is published, we also store/show user information for this action. To store and show user information, register two new plugins from the new `CmsUserConnector` module.
Add them here: `src/Pyz/Zed/Cms/CmsDependencyProvider.php`

**Code sample:**
    
```php
<?php
namespace Pyz\Zed\Cms;

use Spryker\Zed\Cms\CmsDependencyProvider as SprykerCmsDependencyProvider;
use Spryker\Zed\CmsUserConnector\Communication\Plugin\UserCmsVersionPostSavePlugin;
use Spryker\Zed\CmsUserConnector\Communication\Plugin\UserCmsVersionTransferExpanderPlugin;
use Spryker\Zed\Kernel\Container;

class CmsDependencyProvider extends SprykerCmsDependencyProvider
{

    protected function getPostSavePlugins(Container $container)
    {
        return [
            new UserCmsVersionPostSavePlugin()
        ];
    }

    protected function getTransferExpanderPlugins(Container $container)
    {
        return [
            new UserCmsVersionTransferExpanderPlugin()
        ];
    }
}
?>
```

### CMS Data Importer
To publish pages after importing, add this to your CMS Importer class:

**Code sample:**
    
```php
<?php

    /**
     * @param array $data
     *
     * @return void
     */
    protected function importOne(array $data)
    {
        $page = $this->format($data);
        $templateTransfer = $this->findOrCreateTemplate($page[self::TEMPLATE]);

        $pageTransfer = $this->createPage($templateTransfer, $page);

        foreach ($this->localeFacade->getLocaleCollection() as $locale => $localeTransfer) {
            $urlTransfer = new UrlTransfer();
            $urlTransfer->setUrl($page[self::LOCALES][$locale][self::URL]);

            if ($this->urlFacade->hasUrl($urlTransfer)) {
                return;
            }

            $placeholders = $page[self::LOCALES][$locale][self::PLACEHOLDERS];

            $this->createPageUrl($pageTransfer, $urlTransfer->getUrl(), $localeTransfer);
            $this->createPlaceholder($placeholders, $pageTransfer, $localeTransfer);
        }

        $this->cmsFacade->publishWithVersion($pageTransfer->getIdCmsPage()); // Publishing the pages
    }
    ?>
```

### Publishing Current Pages
To publish current pages, create a console command that calls the following method:

```php
<?php

    protected function publishAllPages()
    {
        $spyCmsPagesEntities = SpyCmsPageQuery::create()->find();

        foreach ($spyCmsPagesEntities as $spyCmsPagesEntity) {
            $this->cmsFacade->publishWithVersion($spyCmsPagesEntity->getIdCmsPage());
        }
    ?>
```

## Upgrading from Version 2.* to Version 3.*

We have extended CMS pages with localized attributes such as name and HTML meta header information. Also, CMS pages can now be marked as searchable. These changes required some changes in the database.

1. Before upgrading to the new version, make sure that you do not use any deprecated code from version 2.* Check the description of the deprecated code to see what you will need to use instead.
2. Database migration:
* `vendor/bin/console propel:diff`, also manual review is necessary for the generated migration file.
* `vendor/bin/console propel:migrate`
* `vendor/bin/console propel:model:build`
* After running the last command you’ll find some new classes in your project under the `\Orm\Zed\Cms\Persistence` namespace. It’s important to make sure that they are extending the base classes from the core, i.e. `Orm\Zed\Cms\Persistence\SpyCmsPageLocalizedAttributes` extends `Spryker\Zed\Cms\Persistence\Propel\AbstractSpyCmsPageLocalizedAttributes`, and `Orm\Zed\Cms\Persistence\SpyCmsPageLocalizedAttributesQuery` extends `Spryker\Zed\Cms\Persistence\Propel\AbstractSpyCmsPageLocalizedAttributesQuery`.
