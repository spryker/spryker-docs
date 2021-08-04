---
title: Migration Guide - CMS Block
originalLink: https://documentation.spryker.com/v3/docs/mg-cms-block
redirect_from:
  - /v3/docs/mg-cms-block
  - /v3/docs/en/mg-cms-block
---

## Upgrading from Version 1.* to Version 2.*

This version allows saving CMS Block-Store relation.

1. Update the `spryker/cms-block` module to at least Version 2.0.0.
2. Update your `spryker/cms-block-collector` module to at least Version 2.0.0. See [Migration Guide - CMS Collector](https://documentation.spryker.com/module_migration_guides/mg-cms-collector.htm) for more details.

<details open>
<summary>Custom CMS Block Collector</summary>

If you have a custom CMS Block Collector, make sure that it collects CMS Blocks only when the related CMS Block has an entity in the `spy_cms_block_store` table for the desired store.
    
</br>
</details>

3. Run `vendor/bin/console transfer:generate` to update and generate transfer object changes.

<details open>
<summary>Transfer object changes</summary>

`CmsBlock` transfer object has now a `StoreRelation` property which allows you to retrieve/define the stores assigned to the current CMS Block.
    
</br>
</details>

4. Install the database changes by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
5. Apply the database changes: `vendor/bin/console propel:migrate`
6. Generate and update ORM models: `vendor/bin/console propel:model:build`
7. You will find some new classes in your project under the `\Orm\Zed\CmsBlock\Persistence` namespace. It’s important to make sure that they extend the base classes from the Spryker core, e.g.:
* `\Orm\Zed\CmsBlock\Persistence\SpyCmsBlockStore` extends `\Spryker\Zed\CmsBlock\Persistence\Propel\AbstractSpyCmsBlockStore`
* `\Orm\Zed\CmsBlock\Persistence\SpyCmsBlockStoreQuery` extends `\Spryker\Zed\CmsBlock\Persistence\Propel\AbstractSpyCmsBlockStoreQuery`

8. The newly created `spy_cms_block_store` table definess 1 row per CMS Block-store association. Populate this table according to your requirements.

<details open>
<summary>Example data</summary>
    
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
    
</br>
</details>

<details open>
<summary>Example migration query</summary>    
    
To populate the new `spy_cms_block_store` table to have all CMS Blocks in all stores as an initial configuration, run the following query:
    
```
PostgreSQL:
INSERT INTO spy_cms_block_store (id_cms_block_store, fk_cms_block, fk_store)
  SELECT nextval('id_cms_block_store_pk_seq'), id_cms_block, id_store FROM spy_cms_block, spy_store;

MySQL:
INSERT INTO spy_cms_block_store (fk_cms_block, fk_store)
  SELECT id_cms_block, id_store FROM spy_cms_block, spy_store;    
```

</br>
</details>

9. Additionally, the following internal classes/methods have changed. Take a look if you have customized them:

* `CmsBlockGlossaryManager::getCmsBlockEntity()`
* `CmsBlockReader::findCmsBlockById()`
* `CmsBlockQueryContainer::queryCmsBlockByIdWithTemplateWithGlossary()`
* `CmsBlockMapper`
* `CmsBlockWriter`

You can find more details for these changes on [CMS Block module release page](https://github.com/spryker/cms-block/releases).

CMS Block is ready to be used in multi-store environment. Additionally you might want to update the `spryker/cms-block-gui` Administration Intervace to manage CMS Blocks and their store configuration. You can find further information about multi-store CMS Blocks here, and Zed Admin UI module migration guide in [Migration Guide - CMS Block GUI](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-cms-block-gu).

<!-- Last review date: Jan 31, 2018 by Karoly Gerner-->
