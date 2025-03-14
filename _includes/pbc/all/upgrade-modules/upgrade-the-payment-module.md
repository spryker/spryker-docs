
## Upgrading from version 4.* to version 5.0.0

In this new version of the `Payment` module, we have added support of the payment method per store. You can find more details about the changes on the [Payment module](https://github.com/spryker/payment/releases) release page.

*Estimated migration time: 15 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the **Payment** module to the new version:

```bash
composer require spryker/payment:"^5.0.0" --update-with-dependencies
```

2. Prepare database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
```

3. Run the database migration:

```bash
console propel:install
console transfer:generate
```

4. The `SalesPaymentMethodTypeInstallerPlugin` plugin was removed, please use `PaymentDataImport module` instead. <!-- add Install the Payments feature guide link here. -->
5. The `PaymentConfig::getSalesPaymentMethodTypes()` config method was removed, please use the `PaymentDataImport` module instead. <!-- add Install the Payments feature guide link here. -->


## Upgrading from version 3.* to version 4.*

In the Payment module version 4 we have added new payment tables to store order payment related information.
To enable the new version:

1. Composer update `spryker/payment` to new version.
2. Run `vendor/bin/console transfer:generate` to generate new transfer objects.
3. Insert new sales payment tables by executing the following queries:

```sql
CREATE SEQUENCE "spy_sales_payment_pk_seq";
CREATE TABLE "spy_sales_payment"
(
    "id_sales_payment" INTEGER NOT NULL,
    "fk_sales_order" INTEGER NOT NULL,
    "fk_sales_payment_method_type" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("id_sales_payment")
);
CREATE SEQUENCE "spy_sales_payment_method_type_pk_seq";
CREATE TABLE "spy_sales_payment_method_type"
(
    "id_sales_payment_method_type" INTEGER NOT NULL,
    "payment_provider" VARCHAR NOT NULL,
    "payment_method" VARCHAR NOT NULL,
    PRIMARY KEY ("id_sales_payment_method_type")
);
CREATE INDEX "spy_sales_payment_method_type-type" ON "spy_sales_payment_method_type" ("payment_provider","payment_method");
ALTER TABLE "spy_sales_payment" ADD CONSTRAINT "spy_sales_payment-fk_sales_order"
    FOREIGN KEY ("fk_sales_order")
    REFERENCES "spy_sales_order" ("id_sales_order");
ALTER TABLE "spy_sales_payment" ADD CONSTRAINT "spy_sales_payment-fk_sales_payment_method_type"
    FOREIGN KEY ("fk_sales_payment_method_type")
    REFERENCES "spy_sales_payment_method_type" ("id_sales_payment_method_type");
```

You should now be able to see that the new order saved payment information into the `spy_sales_payment` table.

You may also want to enable the new plugin `\Spryker\Zed\Payment\Communication\Plugin\Sales\PaymentOrderHydratePlugin` by adding it to `\Pyz\Zed\Sales\SalesDependencyProvider::getOrderHydrationPlugins`.

This enables new payment provider hydration plugins which are hydrated to `OrderTransfer`.
