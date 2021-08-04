---
title: Migration Guide - CMSBlockStorage
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-cmsblockstorage
redirect_from:
  - /v4/docs/migration-guide-cmsblockstorage
  - /v4/docs/en/migration-guide-cmsblockstorage
---

## Upgrading from Version 1.* to Version 2.*

CmsBlockStorage version 2.0.0 introduces the following backward incompatible changes:

* Introduced the `spy_cms_block_storage.cms_block_key` field to store the `cms_block` identifier.
* Introduced the `mappings` parameter to synchronization behavior to support the ability to get data by block names.
* Increased the minimum `spryker/cms-block` version in `composer.json`. See [Migration Guide - CMS Block](https://documentation.spryker.com/v4/docs/mg-cms-block##upgrading-from-version-2---to-version-3--) for more details.
* Removed `CmsBlockStorageClient::findBlockNamesByOptions()`.
* Removed `CmsBlockStorageClientInterface::generateBlockNameKey()`.
* Added return type as an array to `CmsBlockStorageClientInterface::findBlocksByNames()`.

1. Upgrade to the new module version:
    a. Upgrade the `CmsBlockStorage` module to version 2.0.0:
```shell
composer require spryker/cms-block-storage:"^2.0.0" --update-with-dependencies
```

2. Clear storage:
    a. Truncate the `spy_cms_block_storage` database table:
    ```shell
    TRUNCATE TABLE spy_cms_block_storage
    ```
    b. Remove all keys from Redis:
    ```shell
    redis-cli --scan --pattern kv:cms_block:'*' | xargs redis-cli unlink
    ```

3. Update the database schema and generate classes:
    a. Run the database migration:
    ```shell
    console propel:install
    ```
    b. Generate transfer objects:
    ```shell
    console transfer:generate
    ```
4. Populate storage with the new version:
    a. Get all the data about CMS blocks from database and publish it into Redis:
    ```shell
    console event:trigger -r cms_block
    ```
    b. Verify that the `spy_cms_block_storage.key` column uses keys instead of IDs. For example, `cms_block:en_us:blck-1`, where `blck-1` is the CMS block key.

    c. Verify that all the method overrides in `\Pyz\Zed\CmsBlockStorage\CmsBlockStorageDependencyProvider` match the signature provided in the package:
```php
protected function getContentWidgetDataExpanderPlugins(): array
```
    
</details>

5. Enable CMS Block Key support for categories and products (optional):
    a. Install CMS block key support for `CmsBlockCategoryStorage` and `CmsBlockProductStorage` modules:
    ```shell
    composer require spryker/cms-block-category-storage:"^1.4.0" spryker/cms-block-product-storage:"^1.4.0" --update-with-dependencies
    ```
    b. Add plugins in `src/Pyz/Client/CmsBlockStorage/CmsBlockStorageDependencyProvider.php`:
    ```php        
    namespace Pyz\Client\CmsBlockStorage;

    use Spryker\Client\CmsBlockCategoryStorage\Plugin\CmsBlockStorage\CmsBlockCategoryCmsBlockStorageReaderPlugin;
    use Spryker\Client\CmsBlockProductStorage\Plugin\CmsBlockStorage\CmsBlockProductCmsBlockStorageReaderPlugin;
    use Spryker\Client\CmsBlockStorage\CmsBlockStorageDependencyProvider as SprykerCmsBlockStorageDependencyProvider;

    class CmsBlockStorageDependencyProvider extends SprykerCmsBlockStorageDependencyProvider
    {
        /**
         * @return \Spryker\Client\CmsBlockStorageExtension\Dependency\Plugin\CmsBlockStorageReaderPluginInterface[]
         */
        protected function getCmsBlockStorageReaderPlugins(): array
        {
            return [
                new CmsBlockCategoryCmsBlockStorageReaderPlugin(),
                new CmsBlockProductCmsBlockStorageReaderPlugin(),
            ];
        }
    }
    ```
    </details>

    c. Trigger sync events:
    ```shell
    console event:trigger -r cms_block_category
    console event:trigger -r cms_block_product
    ```

*Estimated migration time: 1h*
