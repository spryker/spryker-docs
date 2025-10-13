

## Upgrading from version 3.* to version 4.0.0

In this new version of the `ProductPackagingUnit` module, we have added support of decimal stock. You can find more details about the changes on the [ProductPackagingUnit module](https://github.com/spryker/product-packaging-unit/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/decimal-stock-migration-concept.html).

{% endinfo_block %}

To upgrade to the new version of the module, do the following:

1. Upgrade the `ProductPackagingUnit` module to the new version:

```bash
composer require spryker/product-packaging-unit: "^4.0.0" --update-with-dependencies
```

2. You should prepare a backup for the following database tables, just in case the migration failed: `spy_product_packaging_unit`, `spy_product_packaging_unit_amount`, and `spy_product_packaging_lead_product`.

3. Clean up the old database tables:

   - `src/Pyz/Zed/IndexGenerator/Persistence/Propel/Schema/spy_product_packaging_unit.schema.xml`:

    ```xml
    <?xml version="1.0"?>
    <database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductPackagingUnit\Persistence" package="src.Orm.Zed.ProductPackagingUnit.Persistence">
    <table name="spy_product_packaging_unit">
        <index name="index-spy_product_packaging_unit-fk_product">
        <index-column name="fk_product"/>
        </index>
    </table>
    </database>
    ```

   - `src/Pyz/Zed/ProductPackagingUnit/Persistence/Propel/Schema/spy_product_packaging_unit.schema.xml`:

    ```xml
    <?xml version="1.0"?>
    <database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"  xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductPackagingUnit\Persistence" package="src.Orm.Zed.ProductPackagingUnit.Persistence">

    <table name="spy_product_packaging_unit" phpName="SpyProductPackagingUnit">
        <behavior name="event">
            <parameter name="spy_product_packaging_unit_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_product_packaging_unit_type" phpName="SpyProductPackagingUnitType">
        <behavior name="event">
            <parameter name="spy_product_packaging_unit_type_all" column="*"/>
        </behavior>
    </table>
    </database>
    ```

4. Run the following commands for **every store**:

    - Merge database schema definition files:

    ```bash
	console propel:schema:copy
    ```

   - Build propel models:

	```bash
    console propel:model:build
    ```

    - Generate migration files:

	```bash
    console propel:diff
    ```

    - To migrate existing Packaging Unit data in your database, adjust **all generated migration files** for with the `preUp()` and `postUp()` scripts:

    {% info_block warningBox "Note" %}

    The following scripts will work for the PostgreSQL database only.

    ```sql
    public function preUp(MigrationManager $manager)
        {
            $connection = $manager->getAdapterConnection('zed');
            $connection->beginTransaction();

            /* Create temporary table */
            $connection->exec(<<<SQL
    CREATE TABLE spy_product_packaging_unit_new
    (
        id_product_packaging_unit      INTEGER,
        fk_product                     INTEGER,
        fk_lead_product                INTEGER,
        fk_product_packaging_unit_type INTEGER,
        amount_interval                NUMERIC(20, 10),
        amount_max                     NUMERIC(20, 10),
        amount_min                     NUMERIC(20, 10),
        default_amount                 NUMERIC(20, 10) default 1,
        is_amount_variable             BOOLEAN default false,
        fk_abstract_product            INTEGER,
        created_at                     TIMESTAMP,
        updated_at                     TIMESTAMP
    );
    SQL
            );

            $connection->exec(<<<SQL
    INSERT INTO spy_product_packaging_unit_new (id_product_packaging_unit, fk_product,  fk_product_packaging_unit_type, created_at, updated_at)
    SELECT id_product_packaging_unit,
        fk_product,
        fk_product_packaging_unit_type,
        created_at,
        updated_at
    FROM spy_product_packaging_unit;
    SQL
            );

            /* Update the temporary table with amount data */
            $connection->exec(<<<SQL
    UPDATE
        spy_product_packaging_unit_new AS sppun
    SET amount_min = sppua.amount_min,
        amount_max = sppua.amount_max,
        default_amount = sppua.default_amount,
        is_amount_variable = sppua.is_variable,
        amount_interval = sppua.amount_interval
    FROM spy_product_packaging_unit_amount AS sppua
    WHERE sppun.id_product_packaging_unit = sppua.fk_product_packaging_unit;
    SQL
            );

            /* Update the temporary table with lead product data */
            $connection->exec(<<<SQL
    UPDATE spy_product_packaging_unit_new sppun
    SET fk_abstract_product = sp.fk_product_abstract
    FROM spy_product sp
    WHERE sppun.fk_product = sp.id_product;
    SQL
            );

            $connection->exec(<<<SQL
    UPDATE spy_product_packaging_unit_new AS sppun
    SET fk_lead_product = sp.id_product
    FROM spy_product_packaging_lead_product AS spplp
            JOIN spy_product sp ON spplp.fk_product = sp.id_product
    WHERE spplp.fk_product <> sppun.fk_product
    AND sppun.fk_abstract_product = spplp.fk_product_abstract;
    SQL
            );

            /*
             * Cleanup the redundant packaging unit data
             * Packaging unit rows with is_lead_product, which doesn't represent a packaging unit doesn't belong to the packaging unit table anymore
             */
            $connection->exec(<<<SQL
    DELETE
    FROM spy_product_packaging_unit_new
    WHERE fk_lead_product IS NULL;
    SQL
            );

            $connection->commit();
        }
    ```

    {% endinfo_block %}



    - Change the `ALTER TABLE "spy_product_packaging_unit"` command in the `getUpSQL()` method of the migration file to the following script:

    ```sql
    ALTER TABLE "spy_product_packaging_unit"
    ADD "fk_lead_product" INTEGER,
    ADD "amount_interval" NUMERIC(20,10),
    ADD "amount_max" NUMERIC(20,10),
    ADD "amount_min" NUMERIC(20,10),
    ADD "default_amount" NUMERIC(20,10),
    ADD "is_amount_variable" BOOLEAN,
    DROP COLUMN "has_lead_product";
    ```

    - Implement the `postUp()` method the following way:

    ```sql
    public function postUp(MigrationManager $manager)
        {
            $connection = $manager->getAdapterConnection('zed');
            $connection->beginTransaction();

            /* Update the spy_product_packaging_unit table with data collected in temporary table */
            $connection->exec(<<<SQL
    UPDATE
        spy_product_packaging_unit AS sppu
    SET
        fk_lead_product = sppun.fk_lead_product,
        amount_min = sppun.amount_min,
        amount_max = sppun.amount_max,
        default_amount = sppun.default_amount,
        is_amount_variable = sppun.is_amount_variable,
        amount_interval = sppun.amount_interval
    FROM spy_product_packaging_unit_new AS sppun
    WHERE sppu.id_product_packaging_unit = sppun.id_product_packaging_unit;
    SQL
            );

            /* Cleanup the redundant packaging unit data */
            $connection->exec(<<<SQL
    DELETE
    FROM spy_product_packaging_unit
    WHERE fk_lead_product IS NULL;
    SQL
            );

            /* Alter table columns */
            $connection->exec(<<<SQL
    ALTER TABLE spy_product_packaging_unit
        ALTER COLUMN fk_lead_product SET NOT NULL,
        ALTER COLUMN default_amount SET NOT NULL,
        ALTER COLUMN is_amount_variable SET NOT NULL;
    SQL
            );

            /* Drop temporary table */
            $connection->exec('DROP TABLE spy_product_packaging_unit_new');

            $connection->commit();
        }
    ```

5. Execute the migration for **all stores**:

```bash
console propel:migrate
```

6. Generate indexes for PostgreSQL:

```bash
console propel:postgres-indexes:generate
```

7. Generate transfer objects:

```bash
console transfer:generate
```

8. Add the following plugin to the project dependency provider, if applicable:

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Oms\ProductPackagingUnitReservationAggregationStrategyPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\ReservationAggregationStrategyPluginInterface[]
     */
    protected function getReservationAggregationStrategyPlugins(): array
    {
        return [
            new ProductPackagingUnitReservationAggregationStrategyPlugin(),
        ];
    }
}
```

9. Change the cart expander plugins order in dependency provider, move `ProductPackagingUnitItemExpanderPlugin` before any other plugin related to the Packaging Unit feature:

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountGroupKeyItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\AmountSalesUnitItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\CustomAmountPriceItemExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Cart\ProductPackagingUnitItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container)
    {
        return [
            new ProductPackagingUnitItemExpanderPlugin(),
            new AmountGroupKeyItemExpanderPlugin(),
            new AmountSalesUnitItemExpanderPlugin(),
            new CustomAmountPriceItemExpanderPlugin(),
        ];
    }
}
```

10. Remove the usage of  `\Spryker\Zed\ProductPackagingUnitStorage\Communication\Plugin\Synchronization\ProductAbstractPackagingSynchronizationDataPlugin` from the `\Pyz\Zed\Synchronization\SynchronizationDependencyProvider`.

*Estimated migration time: 30 min*

## Upgrading from version 1.* to version 3.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. [Contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}
