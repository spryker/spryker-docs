---
title: Migration Guide - Sales
originalLink: https://documentation.spryker.com/v1/docs/mg-sales
redirect_from:
  - /v1/docs/mg-sales
  - /v1/docs/en/mg-sales
---

## Upgrading from Version 10.* to Version 11.0.0

In this new version of the **Sales** module, we have added support of split delivery. 
You can find more details about the changes on the [Sales module release page](https://github.com/spryker/sales/releases).
    
{% info_block errorBox %}
This release is a part of the **Split delivery** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](https://documentation.spryker.com/v1/docs/split-delivery-concept
{% endinfo_block %}.)
    
**To upgrade to the new version of the module, do the following:**
    
1. Upgrade the `Sales` module to the new version:

```bash
composer require spryker/sales: "^11.0.0" --update-with-dependencies
```
    
2. Clean up the database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```
    
3. Run the database migration:

```bash
console propel:install
console transfer:generate
```
    
*Estimated migration time: 5 min*

## Upgrading from Version 8.* to Version 10.0.0

{% info_block infoBox %}
To dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)

## Upgrading from Version 7.* to Version 8.*

In the **Sales** module version 8, we have added multi-currency support, this release added two new fields to `spy_sales table` to persist "currency" and "store".

Also, Order saver now stores currency and store where order is placed.

Run the following SQL request:

```sql
ALTER TABLE "spy_sales_order"

    ADD "store" VARCHAR(255),

    ADD "currency_iso_code" VARCHAR(5);

CREATE INDEX "spy_sales_order-store" ON "spy_sales_order" ("store");

CREATE INDEX "spy_sales_order-currency_iso_code" ON "spy_sales_order" ("currency_iso_code");
```

Run `propel:model:build` to generate new propel model classes.

## Upgrading from Version 6.* to Version 7.*

In the **Sales** version 7, a new table for sales order item metadata (`spy_sales_order_item_metadata`) has been added. In order to migrate, the following table should be added:

```sql
BEGIN;

CREATE SEQUENCE "spy_sales_order_item_metadata_pk_seq";

CREATE TABLE "spy_sales_order_item_metadata"
(
    "id_sales_order_item_metadata" INTEGER NOT NULL,
    "fk_sales_order_item" INTEGER NOT NULL,
    "super_attributes" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("id_sales_order_item_metadata")
);

ALTER TABLE "spy_sales_order_item_metadata" ADD CONSTRAINT "spy_sales_order_item_metadata-fk_sales_order_item"
  FOREIGN KEY ("fk_sales_order_item")
  REFERENCES "spy_sales_order_item" ("id_sales_order_item");

COMMIT;
```
    
Also, it should be ensured that each order item has such meta data records. 

To insert them, use:

```sql
INSERT INTO spy_sales_order_item_metadata (id_sales_order_item_metadata, fk_sales_order_item, super_attributes, created_at, updated_at) 
SELECT nextval('spy_sales_order_item_metadata_pk_seq'), id_sales_order_item, '[]', now(), now() FROM spy_sales_order_item;
```

For MySQL, you can omit the ID to rely on auto incrementation:

```sql
INSERT INTO spy_sales_order_item_metadata (fk_sales_order_item, super_attributes, created_at, updated_at) 
SELECT id_sales_order_item, '[]', now(), now() FROM spy_sales_order_item;
```
 
## Upgrading from Version 5.* to Version 6.*
    
There are two steps for migrating to version 6 and they should be performed in the following order:

### Step 1:
Migrating `sales_order.fk_customer`, `sales_order.fk_shipment_method` and `sales_order.shipment_delivery_time` related data, to the new structure.

{% info_block errorBox "Important" %}
Do not run any propel commands when executing this, it will drop foreign keys without giving you chance to migrate data.
{% endinfo_block %}

We created a new module into which all deprecated code was moved. We also changed the sales schema, so if you include the new bundle, fields will stay. 
1. Include the following into your `composer.json`: `"spryker/calculation-migration": "dev-master"`.
2. Run `composer update`.

{% info_block infoBox %}
As of Sales module version 6, all  foreign keys to customer and shipment were removed, so that Sales related tables won't have hard relations to other concepts like shipment and customer. This separation allows having services based on bound contexts. 
   
As a result, `fk_customer` is replaced by `customer_refecence`, a unique customer id generated by the Spryker number generator.</br>The `fk_shipment_method` foreign key has been replaced with the `spy_sales_shipment` table which stores all shipment related data.
{% endinfo_block %}
3. Create new DB columns to migrate the data to, run SQL:

```sql
BEGIN;
 CREATE SEQUENCE "spy_sales_shipment_pk_seq";

 CREATE TABLE "spy_sales_shipment"
 (
     "id_sales_shipment" INTEGER NOT NULL,
     "fk_sales_order" INTEGER NOT NULL,
     "fk_sales_expense" INTEGER,
     "name" VARCHAR(255),
     "delivery_time" VARCHAR(255),
     "carrier_name" VARCHAR(255),
     "created_at" TIMESTAMP,
     "updated_at" TIMESTAMP,
     PRIMARY KEY ("id_sales_shipment")
 );

 ALTER TABLE "spy_sales_shipment" ADD CONSTRAINT "spy_sales_shipment-fk_sales_expense"
     FOREIGN KEY ("fk_sales_expense")
     REFERENCES "spy_sales_expense" ("id_sales_expense");

 ALTER TABLE "spy_sales_shipment" ADD CONSTRAINT "spy_sales_shipment-fk_sales_order"
     FOREIGN KEY ("fk_sales_order")
     REFERENCES "spy_sales_order" ("id_sales_order");

 ALTER TABLE "spy_sales_order" ADD "customer_reference" VARCHAR(255);
 CREATE INDEX "spy_sales_order-customer_reference" ON "spy_sales_order" ("customer_reference");

 COMMIT;  
 ```
4. Now that the required fields/tables have been created,  migrate your data using the following script: *Sales Migration Console Command*. 

**This command will migrate:**
* all `sales_order.fk_customer` data to `sales_order.customer_reference`
* all `sales_order.fk_shipment_method` to `spy_sales_shipment` table.
Place the console command invoked by `vendor/bin/console` into your Sales module under `\Pyz\Zed\Sales\Communication\Console\ShipmentAndCustomerMigrationConsole.php`.
5. Register the console command at `\Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands`.
6. Run it like `vendor/bin/console sales:migrate`
{% info_block infoBox "7. Verification step:" %}
It is important to see if the data migration went well. To check, look at the tables: `spy_sales_shipment` and `spy_sales.customer_reference`. If they are populated, you can drop the old foreign keys.
{% endinfo_block %}
8. To drop the old foreign keys:

```sql
BEGIN;

 ALTER TABLE "spy_sales_order" DROP CONSTRAINT "spy_sales_order-fk_customer";
 ALTER TABLE "spy_sales_order" DROP COLUMN "fk_customer";

 ALTER TABLE "spy_sales_order" DROP CONSTRAINT "spy_sales_order-fk_shipment_method";
 ALTER TABLE "spy_sales_order" DROP COLUMN "fk_shipment_method";
 ALTER TABLE "spy_sales_order" DROP COLUMN "shipment_delivery_time";

 COMMIT;
 ```
Now that orders are migrated, run Propel migrations to update Sales related entities and relations: `vendor/bin/console propel:diff, vendor/bin/console propel:model:build`. +Run transfers update: `vendor/bin/console transfer:generate`.

### Step 2:
Migrating the calculated data and moving from the `sales-aggregator` concept requires adding the calculated fields to the sales tables.

Now you have two options: 
* keep old calculators (deprecated)
**OR**
* migrate to the new calculators logic.

1. To keep old calculation logic, see [Updating calculator stacks](https://docs.demo-spryker.com/v4/docs/mg-calculation).
2. To migrate to the new structure, see [Migrating sales to new calculator logic](https://docs.demo-spryker.com/v4/docs/mg-calculation). 

## Upgrading from Version 3.* to Version 4.*
    
With the Product-Bundle module release, the Sales schema file `spy_sales.schema.xml` was changed. Product-Bundle related entries were removed and moved to `Spryker/Zed/ProductBundle/Persistence/Propel/Schema/spy_sales.schema.xml`. As this feature was not used in `core/demoshop`, we also changed the data structure.
**Unique Product Quantity** field in sales detail page is calculated differently now. Data comes from `OrderTransfer::uniqueProductQuantity`.

{% info_block errorBox "Important" %}
Please update your templates if overwritten.
{% endinfo_block %}

## Sales Migration Console Command

<details open>
<summary>Console Command</summary>

```php
<?php
/**
 * Copyright © 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Sales\Communication\Console;

use Exception;
use Orm\Zed\Customer\Persistence\SpyCustomerQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Orm\Zed\Shipment\Persistence\SpyShipmentMethodQuery;
use PDO;
use Propel\Runtime\Exception\PropelException;
use Propel\Runtime\Propel;
use Spryker\Shared\Shipment\ShipmentConstants;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountAfterCancellationCalculatorPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountCalculatorPlugin;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Propel\Runtime\ActiveQuery\Criteria;
use Symfony\Component\Console\Question\ConfirmationQuestion;


/**
 * @method \Spryker\Zed\Sales\Communication\SalesCommunicationFactory getFactory()
 * @method \Spryker\Zed\Sales\Business\SalesFacade getFacade()
 */
class ShipmentAndCustomerMigrationConsole extends Console
{
    const COMMAND_NAME = 'sales:migrate';
    const COMMAND_DESCRIPTION = 'Migrate sales shipment and customer data to new data structure';

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int|null|void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $exportOrdersTillGivenDate = new \DateTime();

        $ordersForUpdate = SpySalesOrderQuery::create()
            ->filterByCreatedAt(
                $exportOrdersTillGivenDate,
                Criteria::LESS_EQUAL
            )
            ->find();

        $totalNumberOfOrdersForUpdate = count($ordersForUpdate);

        if ($totalNumberOfOrdersForUpdate === 0) {
            $output->writeln(
                sprintf(
                    'No orders found for given date range <= %s ',
                    $exportOrdersTillGivenDate->format('Y-m-d')
                )
            );
            return;
        }

        $helper = $this->getQuestionHelper();
        $question = new ConfirmationQuestion(
            sprintf('Migrate %s orders? (y|n)', $totalNumberOfOrdersForUpdate),
            false
        );

        if (!$helper->ask($input, $output, $question)) {
            $output->writeln('Aborted.');
            return;
        }

        $output->writeln(sprintf('Processing %s orders...', $totalNumberOfOrdersForUpdate));

        $numberOfOrdersUpdated = 0;
        $connection = Propel::getConnection();
        foreach ($ordersForUpdate as $salesOrderEntity) {

            $idShipmentMethod = $salesOrderEntity->getFkShipmentMethod();

            $shipmentMethodEntity = SpyShipmentMethodQuery::create()
                ->filterByIdShipmentMethod($idShipmentMethod)
                ->findOne();


            try {

                $connection->beginTransaction();
                if (!$shipmentMethodEntity) {
                    $output->writeln(
                        sprintf(
                            'Shipment method  with id %d for order %d not found',
                            $salesOrderEntity->getFkShipmentMethod(),
                            $salesOrderEntity->getIdSalesOrder())
                    );
                    continue;
                } else {

                    $idSalesExpense = $this->findIdSalesExpense($salesOrderEntity);

                    try {
                        $dataFetcher = $connection->query("SELECT nextval('spy_sales_shipment_pk_seq')");
                        $idSalesShipment = $dataFetcher->fetchColumn();
                    } catch (Exception $e) {
                        throw new PropelException('Unable to get sequence id.', 0, $e);
                    }

                    $modifiedColumns = [];
                    $modifiedColumns[':p0']  = 'carrier_name';
                    $modifiedColumns[':p1']  = 'name';
                    $modifiedColumns[':p2']  = 'delivery_time';
                    $modifiedColumns[':p3']  = 'fk_sales_order';
                    $modifiedColumns[':p4']  = 'fk_sales_expense';
                    $modifiedColumns[':p5']  = 'id_sales_shipment';
                    $modifiedColumns[':p6']  = 'created_at';
                    $modifiedColumns[':p7']  = 'updated_at';

                    $sql = sprintf(
                        'INSERT INTO spy_sales_shipment (%s) VALUES (%s)',
                        implode(', ', $modifiedColumns),
                        implode(', ', array_keys($modifiedColumns))
                    );

                    $dateTime = (new \DateTime())->format('Y-m-d H:i:s');

                    $stmt = $connection->prepare($sql);
                    $stmt->bindValue(':p0', $shipmentMethodEntity->getShipmentCarrier()->getName(), PDO::PARAM_STR);
                    $stmt->bindValue(':p1', $shipmentMethodEntity->getName(), PDO::PARAM_STR);
                    $stmt->bindValue(':p2', $salesOrderEntity->getShipmentDeliveryTime(), PDO::PARAM_STR);
                    $stmt->bindValue(':p3', $salesOrderEntity->getIdSalesOrder(), PDO::PARAM_INT);
                    $stmt->bindValue(':p4', $idSalesExpense, PDO::PARAM_INT);
                    $stmt->bindValue(':p5', $idSalesShipment, PDO::PARAM_INT);
                    $stmt->bindValue(':p6', $dateTime, PDO::PARAM_STR);
                    $stmt->bindValue(':p7', $dateTime, PDO::PARAM_STR);
                    $stmt->execute();

                }

                $customerEntity = $salesOrderEntity->getCustomer();
                if ($customerEntity) {

                    $stmt = $connection->prepare(
                        'UPDATE spy_sales_order SET customer_reference = :customerReference WHERE id_sales_order = :idSalesOrder'
                    );
                    $customerReference = $customerEntity->getCustomerReference();
                    $idSalesOrder = $salesOrderEntity->getIdSalesOrder();
                    $stmt->bindParam(':customerReference', $customerReference, PDO::PARAM_STR);
                    $stmt->bindParam(':idSalesOrder', $idSalesOrder, PDO::PARAM_INT);
                    $stmt->execute();

                }

                $numberOfOrdersUpdated++;

                $connection->commit();

            } catch (Exception $exception) {
                $output->writeln($exception->getMessage() . $exception->getTraceAsString());
                $connection->rollBack();
            }
        }

        $output->writeln(
            sprintf(
                'Migration complete. %s orders migrated.',
                $numberOfOrdersUpdated
            )
        );
    }

    /**
     * @return mixed
     */
    protected function getQuestionHelper()
    {
        return $this->getHelper('question');
    }

    /**
     * @param $salesOrderEntity
     *
     * @return null
     */
    protected function findIdSalesExpense($salesOrderEntity)
    {
        $idSalesExpense = null;
        foreach ($salesOrderEntity->getExpenses() as $expenseEntity) {
            if (ShipmentConstants::SHIPMENT_EXPENSE_TYPE !== $expenseEntity->getType()) {
                continue;
            }
            $idSalesExpense = $expenseEntity->getIdSalesExpense();
        }
        return $idSalesExpense;
    }


}

?>
```
</br>
</details>

</br>
</details>

<!-- Last review date: Sep 14, 2017* -by Aurimas Ličkus-->   
