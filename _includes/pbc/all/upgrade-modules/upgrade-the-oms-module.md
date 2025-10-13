

## Upgrading from version 10.* to version 11.0.0

In this new version of the **OMS** module, we have added support of decimal stock. You can find more details about the changes on the OMS module release page.

{% info_block errorBox %}

This release is a part of the Decimal Stock concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/decimal-stock-migration-concept.html).

{% endinfo_block %}

*Estimated migration time: 5 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the **Oms** module to the new version:

```bash
composer require spryker/oms: "^11.0.0" --update-with-dependencies
```

2. Update the database entity schema for each store in the system:

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


## Upgrading from version 8.* to version 10.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. [Contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from version 7.* to version 8.*

With the new OMS version, detail lock logging has been introduced and execution bucket size decreased.

To successfully migrate to the new OMS version, perform the following steps:

1. Migrate the database:

- `vendor/bin/console propel:diff`

{% info_block warningBox "Note" %}

Manual review is necessary for the generated migration file.

{% endinfo_block %}

- `vendor/bin/console propel:migrate`
- `vendor/bin/console propel:model:build`

2. Migrate the configuration file and the constants:

- `Spryker\Shared\Oms\OmsConstants::INITIAL_STATUS` should be replaced by `Spryker\Zed\Oms\OmsConfig::getInitialStatus()`.
- `Spryker\Shared\Oms\OmsConstants::NAME_CREDIT_MEMO_REFERENCE` was deprecated and removed.

3. Migrate the deprecated classes / interfaces:

- Find the usage of `Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\ConditionCollectionInterface`and change the interface to `Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionCollectionInterface`.
- Find the usage of `Spryker\Zed\Oms\Communication\Console\ClearLocks` and change the interface to `Spryker\Zed\Oms\Communication\ClearLocksConsole`.
- Find the usage of `Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandByItemInterface` and change the interface to `Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByItemInterface`.
- Find the usage of `Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandByOrderInterface` and change the interface to `Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface`.
- Find the usage of `Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandInterface`and change the interface to `Spryker\Zed\Oms\Dependency\Plugin\Command\CommandInterface`.
- Find the usage of `Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\ConditionInterface` and change the interface to `Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionInterface`.

4. Migrate the methods:

The methods did not change the interface but the naming changed. You need to migrate only in case you extended `Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface` or `Spryker\Zed\Oms\Business\Process\ProcessInterface`.
The classes that implement `Spryker\Zed\Oms\Business\Process\ProcessInterface should be named as setIsMain` instead of `setMain` and `getIsMain` instead of `getMain`.
The classes that implement `Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface` should be named as `queryActiveProcesses` instead of `getActiveProcesses` and `queryOrderItemStates` instead of `getOrderItemStates`.
Find the usage of `\Spryker\Zed\Oms\Business\OmsBusinessFactory::createOrderStateMachineOrderStateMachine` and replace it with `\Spryker\Zed\Oms\Business\OmsBusinessFactory::createLockedOrderStateMachine`.
Find the usage of `\Spryker\Zed\Oms\Business\OmsBusinessFactory::createOrderStateMachineBuilder($xmlFolder = null)` and move the value of `$xmlFolder` to `\Spryker\Zed\Oms\OmsConfig::getProcessDefinitionLocation()`. From now on this function doesn't have `$xmlFolder` as a parameter.
Find the usage of `\Spryker\Zed\Oms\Business\OrderStateMachine\LockedOrderStateMachine::buildIdentifierForOrderItemsLock` and replace it with the two calls: `::collectIdentifiersForOrderItemsLock(array $orderItems)` and `::buildIdentifierForOrderItemIdsLock($orderItemIds)`.
Find the usage of `Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface::countSalesOrderItemsForSku` and replace it with `::collectIdentifiersForOrderItemsLock(array $orderItems)`.
Find the usage of `Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface::queryLockedItemsByIdentifierAndExpirationDate` and use your own implementation (based on `OmsQueryContainer`).
Find the usage of `Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface::queryLockedItemsByIdentifierAndExpirationDate` and use your own implementation (based on `OmsQueryContainer`).

In the **OMS** module version 8, we have also added support for stock reservations per store. We have added a few more database tables as well as a new column to the `spy_oms_reservation` table.

Run the database migrations:


<details>
  <summary>Code sample</summary>

```sql
ALTER TABLE "spy_oms_product_reservation"
  ADD "fk_store" INTEGER;

ALTER TABLE "spy_oms_product_reservation"
  ADD CONSTRAINT "spy_oms_product_reservation-fk_store" FOREIGN KEY ("fk_store")
  REFERENCES "spy_store" ("id_store");

CREATE SEQUENCE "spy_oms_product_reservation_store_pk_seq";

CREATE TABLE "spy_oms_product_reservation_store"
  (
     "id_oms_product_reservation_store" INTEGER NOT NULL,
     "store"                            VARCHAR(255) NOT NULL,
     "sku"                              VARCHAR(255) NOT NULL,
     "reservation_quantity"             INTEGER NOT NULL,
     "version"                          INT8 NOT NULL,
     "created_at"                       TIMESTAMP,
     "updated_at"                       TIMESTAMP,
     PRIMARY KEY ("id_oms_product_reservation_store"),
     CONSTRAINT "spy_oms_product_reservation_store-unique-store-sku" UNIQUE (
     "store", "sku")
  );

CREATE INDEX "spy_oms_product_reservation_store-version"
  ON "spy_oms_product_reservation_store" ("version");

CREATE INDEX "spy_oms_product_reservation_store-sku"
  ON "spy_oms_product_reservation_store" ("sku");

CREATE INDEX "spy_oms_product_reservation_store-store"
  ON "spy_oms_product_reservation_store" ("store");

CREATE SEQUENCE "spy_oms_product_reservation_change_version_pk_seq";

CREATE TABLE "spy_oms_product_reservation_change_version"
  (
     "version"                       INT8 NOT NULL,
     "id_oms_product_reservation_id" INTEGER NOT NULL,
     "created_at"                    TIMESTAMP,
     "updated_at"                    TIMESTAMP,
     PRIMARY KEY ("version")
  );

CREATE TABLE "spy_oms_product_reservation_last_exported_version"
  (
     "version"    INT8 NOT NULL,
     "created_at" TIMESTAMP,
     "updated_at" TIMESTAMP
  );
```

</details>

## Upgrading from version 6.* to version 7.*

In version 7, OMS no longer uses `SalesAggregator` to calculate totals; it's now done via the `Calculator` module. Therefore, there is no more dependency with `SalesAggregator`.
The `Spryker\Zed\Oms\Business\Mail\MailHandler` dependency to `SalesAggregatorFacade` was replaced with `SalesFacade`.
To learn how to migrate to the new structure, see the [Upgrading from version 3.* to version 4.*](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-calculation-module.html#upgrading-from-version-3-to-version-4) section in *Upgrade the Calculation module*.

## Upgrading from version 3.* to version 4.*

With the `OMS` module version 4, we added the availability integration. Therefore, a new database table was created.

```sql
CREATE SEQUENCE "spy_oms_product_reservation_pk_seq";

CREATE TABLE "spy_oms_product_reservation"
(
    "id_oms_product_reservation" INTEGER NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "reservation_quantity" INTEGER DEFAULT 0 NOT NULL,
    PRIMARY KEY ("id_oms_product_reservation"),
    CONSTRAINT "spy_oms_product_reservation-sku" UNIQUE ("sku")
);
```

A new **Oms** plugin added `ReservationHandlerPluginInterface` which is executed when an item is transferred to the state with the "reserved" flag.
To start using it with core implementation, add `Spryker\Zed\Availability\Communication\Plugin\AvailabilityHandlerPlugin` to your project `OmsDependencyProvider::getReservationHandlerPlugins()`.
