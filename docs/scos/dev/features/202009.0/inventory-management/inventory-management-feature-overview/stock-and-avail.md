---
title: Stock and availability
originalLink: https://documentation.spryker.com/v6/docs/stock-and-availability
redirect_from:
  - /v6/docs/stock-and-availability
  - /v6/docs/en/stock-and-availability
---

The fully automated Stock calculation takes into consideration products that are reserved in open orders when defining availability. Also, you can define never-out-of-stock products, such as digital downloads. In contrast to Stock, Availability considers not only the number of products in the warehouse, but currently open orders, too. Product Availability defines if a product can or cannot be sold in the shop.

## Availability
For most of the e-commerce platforms stock does not reflect real availability of products, since stock is just the physical number of products in your warehouse which does not take reserved products into account. In contrast to stock, availability considers not just number of products in the warehouse, but current open orders as well.

In general, product availability defines if the product can or cannot be sold in the shop.

From this article, you will get to know how product availability is checked and calculated, how products are reserved, how availability can be imported to the database as well as how availability per store works.

### Availability Check
The process of checking product's availability implies several operations described in the list below.

* Product details page won’t show the **Add to cart** button when a concrete product is out of stock. Instead, informational message is displayed.
* Pre-check plugin in cart. `\Spryker\Zed\AvailabilityCartConnector\Communication\Plugin\CheckAvailabilityPlugin`checks if all items in cart are available. It’s executed after the "Add to cart" operation. If an item is not available, an error message is sent to Yves.
* Checkout pre-condition when an order is placed in the last step. `Spryker\Zed\Availability\Communication\Plugin\ProductsAvailableCheckoutPreConditionPlugin`  checks all items in cart. If any of them is not available anymore, order placing is aborted and error message is displayed.

### "Reserved" Flag
When an order is placed, payment state machine is executed and an item is moved through states. Some states have a “reserved” flag which means that the state influences the item availability.

When items are moved to state with the "reserved" flag, `ReservationHandlerPluginInterface::handle()` is triggered. This call means that the product availability has to be updated. State machine is also tracking products in the "reserved" state, and the database table `spy_oms_product_reservation` is used for this.

Below you can see dummy payment state machine, which is a sample implementation with the "reserved" flags:
![Reserved flags](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/dummy_payment.jpg){height="" width=""}

### Availability Storage

AvailabilityStorage publishes all availability information for abstract and concrete products. Items are grouped by abstract product. This process is handled by [Publish and Synchronize](https://documentation.spryker.com/docs/publish-and-synchronization).

Events are generated in these two cases:

| Case | Details |
| --- | --- |
| Case 1 | If availability amount was equal to 0 and now it’s more than 0, the event is triggered. |
| Case 2 | If availability amount was more than 0 and now it’s equal to 0, the event is triggered. |

The default behavior is having **available** or not available **status** set for product while the amount of product does not matter. Even though events are triggered when amount is changed from 0 to N or from N to 0, it's not the amount change that triggers events, but the change of product status. You can change the default behavior for the events to be triggered whenever the amount is changed. For more information, see [HowTo - Change the Default Behavior of Event Triggering in the AvailabilityStorage Module](https://documentation.spryker.com/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module).

Published data example in JSON.

```json
{
    "id_availability_abstract": 1,
    "fk_store": 1,
    "abstract_sku": "001",
    "quantity": 10,
    "SpyAvailabilities": [
        {
            "id_availability": 1,
            "fk_availability_abstract": 1,
            "fk_store": 1,
            "is_never_out_of_stock": false,
            "quantity": 10,
            "sku": "001_25904006"
        }
    ],
    "Store": {
        "id_store": 1,
        "name": "DE"
    },
    "id_product_abstract": 1,
    "_timestamp": 1554886713.989162
}
```

This information is used on product details page when **Add to cart** is rendered.

### Availability Calculation

Product availability can have flag `is_never_out_of_stock`. This indicates that the product is always available for sale and does not have a finite stock. In this situation the availability calculation is not needed anymore.

`Availability = max(0, sum of all stock types(Stock) - Reserved Items)`
In state machine items get reserved for an open order. There are certain states that release item, for example when payment fails and order is canceled. But if order is successfully fulfilled and item is delivered, item stays reserved till the next stock update.

Stock update triggers the event `stock update`. For example, in our dummy payment’s implementation this will move the items from “Shipped” state to next state. As the consecutive state is not reserved, the items that have already been shipped, will not be reserved any more.

### Import / Change Stock

It’s possible to use `vendor/bin/console data:import:product-stock` command to import stocks into database. The default stock importer uses `csv` file from `src/Pyz/Zed/Updater/Business/Internal/data/import/product_stock.csv` which imports stocks.

The Back Office is provided to allow assigning stocks to products. See [Availability](https://documentation.spryker.com/docs/managing-products-availability) for details on how to manage product stocks in the Back Office.

Stock update considers the stock from the stock file to be the absolute value. On stock update, the stock is overwritten with the values from the file. If a certain product does not have a record in the stock file, then it is considered that the stock of this product does not have to be updated.

### Availability Per Store

Since Availability module version 6.* we have added support for multi-store availability. That means that you can now have availability calculated per store basis. In the Administration Interface you can change from which store you want to see availability.

The main change in Availability in that `spy_availability` and `spy_availability_abstract` now have foreign key to store table which indicates to which store it is applicable. Reservations in OMS have also undergone a few changes to support multiple multi-store scenarios.

With Spryker shop, you can actually have several scenarios pertain to product warehouses in a multi-store environment. Each scenario is configured and enabled manually. The possible scenarios are listed below.

1. Each store has own database and own warehouse. This means that stores have separate independent stocks and therefore separated product reservations and availability.
![Scenario 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/Scenario_1.png){height="" width=""}

2. Each store has own database, but warehouse is shared between the stores. This means that reservation and availabilities are synced.For the case when stores do not share database, but reservations must be shared, three new database tables have been created.
![Scenario 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/Scenario_2.png){height="" width=""}

* spy_oms_product_reservation_store - this table will store reservation request from other stores.
* spy_oms_reservation_change_version - this table will store information about when last reservation occurred.
* spy_oms_reservation_last_exported_version - this table will store information about when reservations were exported to other stores last time.

Also, we provide a few plugins to help implement synchronization:

* `\Spryker\Zed\Oms\Communication\Plugin\Oms\ReservationHandler\ReservationVersionHandlerPlugin` - this plugin will be called when customer makes an order and reservation is made. It will store reservation to spy_oms_reservation_change_version database table. This plugin should be registered in `\Pyz\Zed\Oms\OmsDependencyProvider::getReservationHandlerPlugins` plugin stack.
* `\Spryker\Zed\Oms\Communication\Plugin\Oms\ReservationImport\ReservationExportPlugin` - is the plugin which will be called when reservation export to other store is called. This plugin should decide if the export should be accepted. The delivery mechanism is not provided, it could be done with files or queue. For example, when ReservationExportPlugin is called, you could write a file copy to other server and then read it there. Similar would be with queue "publish", then "consume" on other end.
* When reading export data on other store, you can then use `\Spryker\Zed\Oms\Business\OmsFacadeInterface::importReservation` which will store reservation information to `spy_oms_product_reservation_store` table and update all timestamps accordingly.

There is a console command to export all reservations: `\Spryker\Zed\Oms\Communication\Console\ExportReservationConsole`. It will trigger `ReservationExportPlugin` with reservations amounts to export. This command can be added to cronjob and run periodically.

3. Database is shared between stores, but warehouses are separated by store. This means, that reservations and availability are separated per store and the warehouses (and their stocks) belong to specific stores. Assume there are DE and AT stores. DE store has Warehouse 1 and Warehouse 2, and AT has Warehouse 2. If user wants to buy some product from Warehouse 2 which is not available for AT store, but available in DE store, he/she would not be able to buy it in AT store (since the warehouses are separated), but could buy it in DE store (since the database is shared and it’s possible to switch between stores). When orders are placed, each reservation in
![Scenario 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/Scenario_3.png){height="" width=""}

`spy_oms_product_reservation` table will also store information about store, the relation `fk_store`, to `spy_store` table. When adding a product to cart and displaying it there, the store identifier `fk_store` is used to define the correct availability value for the specific store.
From Availability module version 6.0 we have added a new configuration option to store.php file to have information about store with shared persistence. Add `'sharedPersistenceWithStores' => []` to `stores.php`, where array is store names.

For example:

```json
  'storesWithSharedPersistence' => ['DE', 'AT']
          $stores['DE'] = [
              ... //other options
              'storesWithSharedPersistence' => ['AT']
          ]
          $stores['AT'] = [
              ... //other options
              'storesWithSharedPersistence' => ['DE']
          ]
```

That means that DE and AT both share database. This information will be used when updating OMS reservations.

4. Database is shared between stores, warehouses are shared by the stores. In this case the reservation must be synchronized.
![Scenario 4](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/Scenario_4.png){height="" width=""}

When placing an order in Store A, the reservation is stored with the store identifier `fk_store`. An event is created and published in the queue, and synchronization with Store B happens. See scenario 3 above for information about how reservations are handled as well learn about the new configuration option for shared database in the `store.php` file.

