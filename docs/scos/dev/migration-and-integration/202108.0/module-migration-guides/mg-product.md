---
title: Migration Guide - Product
originalLink: https://documentation.spryker.com/2021080/docs/mg-product
redirect_from:
  - /2021080/docs/mg-product
  - /2021080/docs/en/mg-product
---

## Upgrading from Version 5.* to Version 6.*

This version defines connection between abstract products and stores, allowing users to manage abstract product appearance per store.

1. Update/install `spryker/collector` to at least 6.0.0 version. See [Migration Guide - Collector](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-collector) for more details.
2. Update/install `spryker/store` to at least 1.3.0 version.
3. Run `vendor/bin/console transfer:generate` to generate the new transfer objects.
4. Install the new database tables by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
5. Run `vendor/bin/console propel:migrate` to apply the database changes.
6. Generate ORM models by running `vendor/bin/console propel:model:build`.
    This command will generate some new classes in your project under `\Orm\Zed\Product\Persistence` namespace.
    It is important to make sure that they extend the base classes from the Spryker core, e.g.:
    * `\Orm\Zed\Product\Persistence\SpyProductAbstractStore extends \Spryker\Zed\Product\Persistence\Propel\AbstractSpyProductAbstractStore`
    * `\Orm\Zed\Product\Persistence\SpyProductAbstractStoreQuery extends \Spryker\Zed\Product\Persistence\Propel\AbstractSpyProductAbstractStoreQuery`
7. The newly created `spy_product_abstract_store` table defines 1 row per `abstract product-store` association. Populate this table according to your requirements.

**Example data**
Assumptions:
* You have the following abstract products: AP1, AP2.
* You have the following stores: S1, S2, S3.
Then `spy_product_abstract_store` will have the following rows as association definition:

| FK_PRODUCT_ABSTRACT | FK_STORE |
| --- | --- |
| AP1 | S1 |
| AP1 | S2 |
|AP1  | S3 |
| AP2 |  S1|
|AP2  | S2 |
|  AP2|S3  |

This example defines the data set as all abstract products are accessible in all of your stores. If you do not define or remove an association between AP1 and S2, then your AP1 abstract product and its concrete products will not be available in S2.

**IMPORTANT**: even if you have 1 store, the associations between abstract products and stores have to be defined.

**Example migration query**
To populate the new `spy_product_abstract_store` table to have all abstract products in all stores as an initial configuration, run the following query:
```sql
PostgreSQL:
INSERT INTO spy_product_abstract_store (id_product_abstract_store, fk_product_abstract, fk_store)
  SELECT nextval('id_product_abstract_store_pk_seq'), id_product_abstract, id_store FROM spy_product_abstract, spy_store;

MySQL:
INSERT INTO spy_product_abstract_store (fk_product_abstract, fk_store)
  SELECT id_product_abstract, id_store FROM spy_product_abstract, spy_store;
 ```
 
8. Product collector multi-store setup (if you have multi-stores
    1. Amend collector queries both for Search and Storage to include the information if the abstract product is available in the current store. You will need to `LEFT JOIN` the `spy_product_abstract_store` table to the selector queries on the abstract product and for the current store. Define the `spy_product_abstract_store.fk_store` column as `is_in_store` in the result (this name is a suggestion, feel free to choose an other name).

**Explanation**
The modification should not affect the number of found rows, but add information if the currently found abstract product is available in the current store or not. When the `is_in_store` is `NOT NULL`, the abstract product exists in the current store. When the `is_in_store` is `NULL`, the abstract product does not exist in the current store.
 
**Example implementation:**
    
```php
<?php
namespace Pyz\Zed\Collector\Persistence\Search\Pdo\MySql;

use Spryker\Zed\Collector\Persistence\Collector\AbstractPdoCollectorQuery;

class ProductCollectorQuery extends AbstractPdoCollectorQuery
    {
        /**
         * @return void
         */
        protected function prepareQuery()
        {
            $sql = '
    SELECT
        ...
        spy_product_abstract_store.fk_store AS is_in_store,
        ...
    FROM spy_touch
    INNER JOIN spy_product_abstract
        ON (spy_touch.item_id = spy_product_abstract.id_product_abstract)
    LEFT JOIN spy_product_abstract_store
        ON (spy_product_abstract.id_product_abstract = spy_product_abstract_store.fk_product_abstract AND spy_product_abstract_store.fk_store = :id_current_store)
    ...
    WHERE
        ...
    ';

            $this->criteriaBuilder->sql($sql)->setParameter(':id_store', $this->storeTransfer->getIdStore());
        }
    }
```

It is important to have the store matching condition inside the ON section of the `LEFT JOIN` so the number of result rows is not changed.

The current store ID can be set through a new `storeTransfer` class property which is populated by the collector classes.

2. Amend your Search and Storage collectors to make a decision on the newly created column if the abstract product should be stored or not. The `AbstractCollector::isStorable()` should return `true` when the abstract product is available in the current store and `false` when the abstract product is not available in the current store.

**Example of implementation:**

```php
<?php
namespace Pyz\Zed\Collector\Business\Search;

use Spryker\Zed\Collector\Business\Collector\Search\AbstractSearchPdoCollector;

class ProductCollector extends AbstractSearchPdoCollector
    {
        ...

        /**
         * @param array $collectItemData
         *
         * @return bool
         */
        protected function isStorable(array $collectItemData)
        {
            return $collectItemData['is_in_store'] !== null;
        }

        ...
    }
```

Collectors should now be able to export abstract product data per store both for Storage and Search.

9. `Facade/ProductToUrlInterface::hasUrl()` method is removed because it is not used within the module. Please check your code if you have customized calls to it.
10. `ProductAbstractManager` internal class was amended to handle `abstract product-store` relation, take a look if you have customized it.

Additionally you might want to update the Product Information Management (PIM) Zed Admin UI to manage abstract products and their store configuration. You can find further information about multi-store products here, and [Migration Guide - ProductManagement](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-product-mana).

Note: make sure that `ProductPriceQueryExpanderPlugin` is always registered before `FacetQueryExpanderPlugin` in your dependency provider plugin list definitions.
Check out our Demoshop implementation for implementation example and idea.

## Upgrading from Version 3.* to Version 4.*
### 1. Database Migration
`vendor/bin/console propel:diff`, also manual review is necessary for the generated migration file.
`vendor/bin/console propel:migrate`
`vendor/bin/console propel:model:build`, also need to change the parents of ALL generated classes to core, as the example shows below.

```php
<?php

namespace Orm\Zed\Product\Persistence;

use Spryker\Zed\Product\Persistence\Propel\AbstractSpyProduct as BaseSpyProduct;

/**
* Skeleton subclass for representing a row from the 'spy_product' table.
*
*
*
* You should add additional methods to this class to meet the
* application requirements.  This class will only be generated as
* long as it does not already exist in the output directory.
*/
class SpyProduct extends BaseSpyProduct
{
}
```

Remove the following Propel classes (from all namespaces) which were deleted from the database.

* `SpyProductAttributesMetadata` and `SpyProductAttributesMetadataQuery`. Use `SpyProductAttributeKey` instead to store attribute keys.
* `SpyProductAttributeType` and `SpyProductAttributeTypeQuery`. The concept of common types for attributes was removed. We store attribute types now separately for each domain, i.e. `SpyProductManagementAttribute` for PIM and `SpyProductSearchAttribute` for search filters.
* `SpyProductAttributeTypeValue` and `SpyProductAttributeTypeValueQuery`.

### 2. Major Class Changes

* `Spryker\Zed\Product\Communication\Plugin\Installer` plugin got removed. Please make sure to remove usages in your project from `Pyz\Zed\Installer\InstallerDependencyProvider`.
* `Spryker\Zed\Product\Business\Attribute\AttributeManager` was removed. Use the `ProductFacade` from the `Product` module or `Spryker\Zed\Product\Business\Attribute\AttributeKeyManager` inside the `Product` moduleinstead.

### 3. Major Transfer Changes

* ProductAbstractTransfer:
    * productImagesSets renamed to imageSets.
    * taxRate removed, use idTaxSet instead.
* ProductConcreteTransfer:
    * productImagesSets renamed to imageSets.
    * productImageUrl removed, use imageSets instead.
    * productAbstractSku renamed to abstractSku.
    * idProductAbstract renamed to fkProductAbstract.
    * name removed, use localizedAttributes.name instead.
* ProductImageTransfer:
    * sort renamed to sortOrder.
    * idProductImageSetToProductImage removed.

### 4. Introduced Product Plugins
Add product reader, creator and updater plugins in `Pyz\Zed\Product\ProductDependencyProvider`. The example below comes from the Spryker Demoshop and the used plugins are responsible for stock, price and image handling of the products. To hook in any of the read, create or update processes of abstract and concrete products you should use these extension points if the future.

<details open>
<summary>Code sample:</summary>

```php
<?php
/**
 * This file is part of the Spryker Demoshop.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Product;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Price\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterCreatePlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductAbstract\PriceProductAbstractAfterUpdatePlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductAbstract\PriceProductAbstractReadPlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterCreatePlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductConcrete\PriceProductConcreteAfterUpdatePlugin;
use Spryker\Zed\Price\Communication\Plugin\ProductConcrete\PriceProductConcreteReadPlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\ProductAbstractAfterCreatePlugin as ImageSetProductAbstractAfterCreatePlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\ProductAbstractAfterUpdatePlugin as ImageSetProductAbstractAfterUpdatePlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\ProductAbstractReadPlugin as ImageSetProductAbstractReadPlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\ProductConcreteAfterCreatePlugin as ImageSetProductConcreteAfterCreatePlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\ProductConcreteAfterUpdatePlugin as ImageSetProductConcreteAfterUpdatePlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\ProductConcreteReadPlugin as ImageSetProductConcreteReadPlugin;
use Spryker\Zed\ProductSearch\Communication\Plugin\ProductConcrete\ProductSearchProductConcreteAfterCreatePlugin;
use Spryker\Zed\ProductSearch\Communication\Plugin\ProductConcrete\ProductSearchProductConcreteAfterUpdatePlugin;
use Spryker\Zed\ProductSearch\Communication\Plugin\ProductConcrete\ProductSearchProductConcreteReadPlugin;
use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use Spryker\Zed\Stock\Communication\Plugin\ProductConcreteAfterCreatePlugin as StockProductConcreteAfterCreatePlugin;
use Spryker\Zed\Stock\Communication\Plugin\ProductConcreteAfterUpdatePlugin as StockProductConcreteAfterUpdatePlugin;
use Spryker\Zed\Stock\Communication\Plugin\ProductConcreteReadPlugin as StockProductConcreteReadPlugin;
use Spryker\Zed\TaxProductConnector\Communication\Plugin\TaxSetProductAbstractAfterCreatePlugin;
use Spryker\Zed\TaxProductConnector\Communication\Plugin\TaxSetProductAbstractAfterUpdatePlugin;
use Spryker\Zed\TaxProductConnector\Communication\Plugin\TaxSetProductAbstractReadPlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductAbstractPluginCreateInterface[]
     */
    protected function getProductAbstractBeforeCreatePlugins(Container $container)
    {
        return [];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductAbstractPluginCreateInterface[]
     */
    protected function getProductAbstractAfterCreatePlugins(Container $container)
    {
        return [
            new ImageSetProductAbstractAfterCreatePlugin(),
            new TaxSetProductAbstractAfterCreatePlugin(),
            new PriceProductAbstractAfterCreatePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductAbstractPluginReadInterface[]
     */
    protected function getProductAbstractReadPlugins(Container $container)
    {
        return [
            new ImageSetProductAbstractReadPlugin(),
            new TaxSetProductAbstractReadPlugin(),
            new PriceProductAbstractReadPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductAbstractPluginUpdateInterface[]
     */
    protected function getProductAbstractBeforeUpdatePlugins(Container $container)
    {
        return [];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductAbstractPluginUpdateInterface[]
     */
    protected function getProductAbstractAfterUpdatePlugins(Container $container)
    {
        return [
            new ImageSetProductAbstractAfterUpdatePlugin(),
            new TaxSetProductAbstractAfterUpdatePlugin(),
            new PriceProductAbstractAfterUpdatePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginCreateInterface[]
     */
    protected function getProductConcreteBeforeCreatePlugins(Container $container)
    {
        return [];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginCreateInterface[]
     */
    protected function getProductConcreteAfterCreatePlugins(Container $container)
    {
        return [
            new ImageSetProductConcreteAfterCreatePlugin(),
            new StockProductConcreteAfterCreatePlugin(),
            new PriceProductConcreteAfterCreatePlugin(),
            new ProductSearchProductConcreteAfterCreatePlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginReadInterface[]
     */
    protected function getProductConcreteReadPlugins(Container $container)
    {
        return [
            new ImageSetProductConcreteReadPlugin(),
            new StockProductConcreteReadPlugin(),
            new PriceProductConcreteReadPlugin(),
            new ProductSearchProductConcreteReadPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginUpdateInterface[]
     */
    protected function getProductConcreteBeforeUpdatePlugins(Container $container)
    {
        return [];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginUpdateInterface[]
     */
    protected function getProductConcreteAfterUpdatePlugins(Container $container)
    {
        return [
            new ImageSetProductConcreteAfterUpdatePlugin(),
            new StockProductConcreteAfterUpdatePlugin(),
            new PriceProductConcreteAfterUpdatePlugin(),
            new ProductSearchProductConcreteAfterUpdatePlugin(),
        ];
    }

}
```

</br>
</details>

### 5. Troubleshooting
For all other issues that you might encounter after migration, please refer to the Spryker Demoshop.

## Upgrading from Version 2.* to Version 3.*
The Product module does not provide the tax functionality anymore. Upgrade [Migration Guide - Tax](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-tax).
