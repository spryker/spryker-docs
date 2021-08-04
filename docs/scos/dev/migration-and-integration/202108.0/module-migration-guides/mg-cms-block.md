---
title: Migration Guide - CmsBlock
originalLink: https://documentation.spryker.com/2021080/docs/mg-cms-block
redirect_from:
  - /2021080/docs/mg-cms-block
  - /2021080/docs/en/mg-cms-block
---

## Upgrading from Version 2.* to Version 3.*
CmsBlock version 3.0.0 introduces the following backward incompatible changes:

*     Introduced the `spy_cms_block.spy_cms_block-key` unique index.
*     Adjusted `CmsBlockWriter` to use `CmsBlockKeyProvider` that persists the `key` field while writing a content entity.
*     Removed `CmsBlockClient`. Use the `CmsBlockStorageClient` module instead.
*     Removed the deprecated columns in `spy_cms_block`:  `type`, `fk_page`, `value`. If you use them directly, make sure to add their definition on the project level to `src/Pyz/Zed/CmsBlock/Persistence/Propel/Schema/spy_cms_block.schema.xml`.
*     Removed `CmsBlockConstants::YVES_THEME`. Use `CmsBlockConfig::getThemeName()` instead.
*     Moved `CmsBlockPlaceholderTwigPlugin` to the `SprykerShop\CmsBlockWidget` module.

**Upgrade the module to the new version:**

1. Upgrade the `CmsBlock` module to version 3.0.0:
```bash
composer require spryker/cms-block:"^3.0.0" --update-with-dependencies
```
2. Re-generate transfer objects:
```bash
console transfer:generate
```
4. If there are:
    a. no preexisting blocks in the database, run the database migration:
    ```bash
    console propel:install
    ```
    b. If there are preexisting blocks in the database, follow the further steps to migrate the block data.

1. On the project level in `src/Pyz/Zed/CmsBlock/Persistence/Propel/Schema/spy_cms_block.schema.xml`, update the `key` column property from `required` to `false` for data migration:

src/Pyz/Zed/Content/Persistence/Propel/Schema/spy_content.schema.xml
    
```php
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\CmsBlock\Persistence"
          package="src.Orm.Zed.CmsBlock.Persistence">
 
    <table name="spy_cms_block" phpName="SpyCmsBlock">
        <column name="key" required="false" type="VARCHAR" size="255" description="Identifier for existing entities. It should never be changed."/>
    </table>
 
</database>
``` 

2. Run the database migration:
```bash
    console propel:install
```

3. Create the `cms-block:generate-keys` command in `src/Pyz/Zed/CmsBlock/Communication/Console/CmsBlockKeyGeneratorConsoleCommand.php`:

src/Pyz/Zed/CmsBlock/Communication/Console/CmsBlockKeyGeneratorConsoleCommand.php
    
```php
<?php
 
/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */
 
namespace Pyz\Zed\CmsBlock\Communication\Console;
 
use Orm\Zed\CmsBlock\Persistence\Map\SpyCmsBlockTableMap;
use Orm\Zed\CmsBlock\Persistence\SpyCmsBlockQuery;
use Spryker\Zed\CmsBlock\Business\KeyProvider\CmsBlockKeyProvider;
use Spryker\Zed\CmsBlock\Business\KeyProvider\CmsBlockKeyProviderInterface;
use Spryker\Zed\CmsBlock\Persistence\CmsBlockRepository;
use Spryker\Zed\CmsBlock\Persistence\CmsBlockRepositoryInterface;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
 
class ContentItemKeyGeneratorConsoleCommand extends Console
{
    protected const COMMAND_NAME = 'cms-block:generate-keys';
    protected const LIMIT_CMS_BLOCKS = 1000;
 
    protected function configure(): void
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription('CmsBlock key generator');
    }
 
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $offset = 0;
        $cmsBlocks = $this->findCmsBlocks($offset);
 
        while($cmsBlocks->count()) {
 
            foreach ($cmsBlocks as $cmsBlock) {
                $cmsBlock->setKey(
                    $this->createCmsBlockKeyProvider()->generateKeyByIdCmsBlock($cmsBlock->getIdCmsBlock())
                );
            }
 
            $cmsBlocks->save();
            $offset += static::LIMIT_CONTENT_ITEMS;
            $cmsBlocks = $this->findCmsBlocks($offset);
        }
    }
 
    protected function findCmsBlocks($offset): array
    {
        $clause = SpyCmsBlockTableMap::COL_KEY . " = '' OR " . SpyCmsBlockTableMap::COL_KEY . " IS NULL";
 
        return (new SpyCmsBlockQuery())
            ->where($clause)
            ->offset($offset)
            ->limit(static::LIMIT_CMS_BLOCKS)
            ->orderByIdCmsBlock()
            ->find();
    }
 
    protected function createCmsBlockKeyProvider(): CmsBlockKeyProviderInterface
    {
        return new CmsBlockKeyProvider(
            $this->createCmsBlockRepository()
        );
    }
 
    protected function createCmsBlockRepository(): CmsBlockRepositoryInterface
    {
        return new CmsBlockRepository();
    }
}
```

4. Run the command:
```bash
console cms-block:generate-keys
```

9. Revert the previous changes to the file `spy_cms_block.schema.xml` by restoring the `required` value of key to `true`:

src/Pyz/Zed/Content/Persistence/Propel/Schema/spy_content.schema.xml
    
```php
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\CmsBlock\Persistence"
          package="src.Orm.Zed.CmsBlock.Persistence">
 
    <table name="spy_cms_block" phpName="SpyCmsBlock">
        <column name="key" required="true" type="VARCHAR" size="255" description="Identifier for existing entities. It should never be changed."/>
    </table>
 
</database>
```

10. Run the database migration:

```bash
console propel:install
```

## Upgrading from Version 1.* to Version 2.*

This version allows saving CMS Block-Store relation.

1. Update the `spryker/cms-block` module to at least Version 2.0.0.
2. Update your `spryker/cms-block-collector` module to at least Version 2.0.0. See [Migration Guide - CMS Collector](https://documentation.spryker.com/module_migration_guides/mg-cms-collector.htm) for more details.

**Custom CMS Block Collector**

If you have a custom CMS Block Collector, make sure that it collects CMS Blocks only when the related CMS Block has an entity in the `spy_cms_block_store` table for the desired store.

3. Run `vendor/bin/console transfer:generate` to update and generate transfer object changes.

**Transfer object changes**

`CmsBlock` transfer object has now a `StoreRelation` property which allows you to retrieve/define the stores assigned to the current CMS Block.

4. Install the database changes by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
5. Apply the database changes: `vendor/bin/console propel:migrate`
6. Generate and update ORM models: `vendor/bin/console propel:model:build`
7. You will find some new classes in your project under the `\Orm\Zed\CmsBlock\Persistence` namespace. It’s important to make sure that they extend the base classes from the Spryker core, e.g.:
* `\Orm\Zed\CmsBlock\Persistence\SpyCmsBlockStore` extends `\Spryker\Zed\CmsBlock\Persistence\Propel\AbstractSpyCmsBlockStore`
* `\Orm\Zed\CmsBlock\Persistence\SpyCmsBlockStoreQuery` extends `\Spryker\Zed\CmsBlock\Persistence\Propel\AbstractSpyCmsBlockStoreQuery`

8. The newly created `spy_cms_block_store` table definess 1 row per CMS Block-store association. Populate this table according to your requirements.

**Example data**
    
**Assumptions**
You have the following CMS Blocks: Block_1, Block_2, and stores: AT, DE, US.

The `spy_cms_block_store` can have a configuration like this:

| FK_CMS_BLOCK | FK_STORE |
| --- | --- |
| Block_1 | AT |
| Block_1 | DE |
| Block_1 |US  |
| Block_2 | AT |

This example defines "Block_1" to be enabled in all of your stores, but restricts "Block_2" to AT store only.
    
{% info_block warningBox "IMPORTANT" %}
Even if you have 1 store, the associations between CMS Blocks and stores have to be defined.
{% endinfo_block %}
    
**Example migration query**
    
To populate the new `spy_cms_block_store` table to have all CMS Blocks in all stores as an initial configuration, run the following query:
    
```sql
PostgreSQL:
INSERT INTO spy_cms_block_store (id_cms_block_store, fk_cms_block, fk_store)
  SELECT nextval('id_cms_block_store_pk_seq'), id_cms_block, id_store FROM spy_cms_block, spy_store;

MySQL:
INSERT INTO spy_cms_block_store (fk_cms_block, fk_store)
  SELECT id_cms_block, id_store FROM spy_cms_block, spy_store;    
```

9. Additionally, the following internal classes/methods have changed. Take a look if you have customized them:

* `CmsBlockGlossaryManager::getCmsBlockEntity()`
* `CmsBlockReader::findCmsBlockById()`
* `CmsBlockQueryContainer::queryCmsBlockByIdWithTemplateWithGlossary()`
* `CmsBlockMapper`
* `CmsBlockWriter`

You can find more details for these changes on [CMS Block module release page](https://github.com/spryker/cms-block/releases).

CMS Block is ready to be used in multi-store environment. Additionally you might want to update the `spryker/cms-block-gui` Administration Intervace to manage CMS Blocks and their store configuration. You can find further information about multi-store CMS Blocks here, and Zed Admin UI module migration guide in [Migration Guide - CMS Block GUI](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-cms-block-gu).
