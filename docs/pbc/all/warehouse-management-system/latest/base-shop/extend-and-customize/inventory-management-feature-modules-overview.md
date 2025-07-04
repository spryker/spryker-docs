---
title: Inventory Management feature modules overview
last_updated: Aug 13, 2021
description: The Inventory Management feature adds stock and availability management as well as multiple warehouse stock management for products
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/201903.0/nventory-management-feature-walkthrough/inventory-management-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/inventory-management-feature-walkthrough/availabilitystorage-module-reference-informaton.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/inventory-management-feature-walkthrough/inventory-management-feature-walkthrough.html
  - /docs/pbc/all/warehouse-management-system/extend-and-customize/inventory-management-feature-modules-overview.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/extend-and-customize/inventory-management-feature-modules-overview.html
---

This document describes the modules of the Inventory Management feature.

## Availability

This section describes how the availability modules works.

### Availability check

A product's availability is checked with the following operations:

- The product details page doesn't show the **Add to cart** button when a concrete product is out of stock. Instead, a message about the product being out of stock is displayed.
- `\Spryker\Zed\AvailabilityCartConnector\Communication\Plugin\CheckAvailabilityPlugin` checks if all items in cart are available. It's executed after the "Add to cart" operation. If an item is not available, an error message is sent to Yves.
- `Spryker\Zed\Availability\Communication\Plugin\ProductsAvailableCheckoutPreConditionPlugin` checks if all items in the cart are available before placing the order. If one or more items are not available, order placing is aborted and an error message is displayed.

### Reserved flag

When an order is placed, the items are moved through states in the payment state machine. Some states have a `reserved` flag that influences the availability of items.

When an item is moved to a state with the `reserved` flag, `ReservationHandlerPluginInterface::handle()` is triggered. This call updates the product's availability. The state machine is also tracking products in the reserved state using the `spy_oms_product_reservation` database table.

Sample payment state machine with `reserved` flags:
![Reserved flags](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/dummy_payment.jpg)

## AvailabilityStorage

`AvailabilityStorage` publishes all availability information for abstract and concrete products. Items are grouped by abstract product. This process is handled by [Publish and Synchronize](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html).

Events are generated in the following cases:

| CASE | DETAILS |
| --- | --- |
| Case 1 | If availability amount was equal to 0 and now it's more than 0, the event is triggered. |
| Case 2 | If availability amount was more than 0 and now it's equal to 0, the event is triggered. |

The default behavior is having the *available* or *not available* status set for a product while the amount of product does not matter. Even though events are triggered when amount is changed from 0 to N or from N to 0, it's not the amount change that triggers events, but the change of product status. You can change the default behavior for the events to be triggered whenever the amount is changed. For more information, see [HowTo: Change the Default Behavior of Event Triggering in the AvailabilityStorage Module](/docs/pbc/all/warehouse-management-system/latest/base-shop/extend-and-customize/configure-product-availability-to-be-published-on-product-amount-changes.html).

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

### Availability calculation

Product availability can have the flag `is_never_out_of_stock`. This indicates that the product is always available for sale and does not have a finite stock. In this situation, the availability calculation is no longer needed.

`Availability = max(0, sum of all stock types(Stock) - Reserved Items)`

In the state machine, items get reserved for an open order. There are certain states that release items—for example, when the payment fails and the order is canceled. However, if the order is successfully fulfilled, and the item is delivered, the item stays reserved until the next stock update.

A stock update triggers the event `stock update`. For example, in our dummy payment's implementation, this would move the items from the "Shipped" state to next state. As the consecutive state is not reserved, the items that have already been shipped will no longer be reserved.

### Import or change stock

It's possible to use the `vendor/bin/console data:import:product-stock` command to import stocks into the database. The default stock importer uses the `csv` file from `src/Pyz/Zed/Updater/Business/Internal/data/import/product_stock.csv` which imports stocks.

To edit stock in the Back Office, see [Edit stock of products and product bundles](/docs/pbc/all/warehouse-management-system/latest/base-shop/manage-in-the-back-office/edit-stock-of-products-and-product-bundles.html).

Stock update considers the stock from the stock file to be the absolute value. On stock update, the stock is overwritten with the values from the file. If a certain product does not have a record in the stock file, then it's considered that the stock of this product does not have to be updated.

### Availability per store

Since Availability module version 6.*, we have added support for multi-store availability. That means that you can now have availability calculated per store basis. In the Administration Interface, you can change from which store you want to see availability.

The main change in Availability is that `spy_availability` and `spy_availability_abstract` now have foreign keys to store tables which indicates to which store it's applicable. Reservations in OMS have also undergone a few changes to support multiple multi-store scenarios.

With Spryker shop, you can actually have several scenarios pertain to product warehouses in a multi-store environment. Each scenario is configured and enabled manually. The possible scenarios are listed below.

1. Each store has its own database and own warehouse. This means that stores have separate independent stocks and therefore separate product reservations and availability.
![Scenario 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/Scenario_1.png)

2. Each store has its own database, but a warehouse is shared between the stores. This means that reservation and availabilities are synced. For the case when stores do not share a database, but reservations must be shared, three new database tables have been created.
![Scenario 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/Scenario_2.png)

- spy_oms_product_reservation_store - this table will store reservation request from other stores.
- spy_oms_reservation_change_version - this table will store information about when last reservation occurred.
- spy_oms_reservation_last_exported_version - this table will store information about when reservations were exported to other stores last time.

Also, we provide a few plugins to help implement synchronization:

- `\Spryker\Zed\Oms\Communication\Plugin\Oms\ReservationHandler\ReservationVersionHandlerPlugin` - this plugin will be called when customer makes an order and a reservation is made. It will store the reservation to the spy_oms_reservation_change_version database table. This plugin should be registered in the `\Pyz\Zed\Oms\OmsDependencyProvider::getReservationHandlerPlugins` plugin stack.
- `\Spryker\Zed\Oms\Communication\Plugin\Oms\ReservationImport\ReservationExportPlugin` - is the plugin which will be called when a reservation export to another store is called. This plugin decides if the export should be accepted. The delivery mechanism is not provided, and instead could be done with files or a queue. For example, when ReservationExportPlugin is called, you could write a file copy to another server and then read it there. Similarly would be with the use of a queue called "publish", with another named "consume" on other end.
- When reading export data on another store, you can then use `\Spryker\Zed\Oms\Business\OmsFacadeInterface::importReservation` which will store reservation information to the `spy_oms_product_reservation_store` table and update all timestamps accordingly.

There is a console command to export all reservations: `\Spryker\Zed\Oms\Communication\Console\ExportReservationConsole`. It will trigger `ReservationExportPlugin` with reservations amounts to export. This command can be added to cronjob and run periodically.

3. Database is shared between stores, but warehouses are separated by store. This means that reservations and availability are separated per store and the warehouses (and their stocks) belong to specific stores. Assume there are DE and AT stores: DE store has Warehouse 1 and Warehouse 2, and AT has Warehouse 2. If a user wants to buy some product from Warehouse 2 which is not available for AT store, but available in DE store, they would not be able to buy it from the AT store since the warehouses are separated. However, the user could buy it in DE store, since the database is shared and it's possible to switch between stores. When orders are placed, each reservation in
![Scenario 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/Scenario_3.png)

The `spy_oms_product_reservation` table will also store information about stores, the relation `fk_store`, to the `spy_store` table. When adding a product to cart and displaying it there, the store identifier `fk_store` is used to define the correct availability value for the specific store.

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

That means that both DE and AT share a database. This information will be used when updating OMS reservations.

4. Database is shared between stores, and warehouses are shared by the stores. In this case the reservation must be synchronized.
![Scenario 4](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Stock+and+Availability+Management/Scenario_4.png)

When placing an order in Store A, the reservation is stored with the store identifier `fk_store`. An event is created and published in the queue, and synchronization with Store B happens. See scenario 3 above for information about how reservations are handled as well learn about the new configuration option for shared database in the `store.php` file.

To learn more about the feature and to find out how end users use it, see [Inventory Management feature overview](/docs/pbc/all/warehouse-management-system/latest/base-shop/inventory-management-feature-overview.html) for business users.
