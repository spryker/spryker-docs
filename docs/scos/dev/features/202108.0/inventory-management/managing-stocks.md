---
title: Managing stocks in a multi-store environment- Best practices
originalLink: https://documentation.spryker.com/2021080/docs/managing-stocks-in-a-multi-store-environment-best-practices
redirect_from:
  - /2021080/docs/managing-stocks-in-a-multi-store-environment-best-practices
  - /2021080/docs/en/managing-stocks-in-a-multi-store-environment-best-practices
---

In a multi-store environment, you can manage the warehouses to stores and database relations in several ways. This article contains scenarios that can help you choose the most suitable warehouse management workflow and implement it using the [Inventory Management](https://documentation.spryker.com/docs/upcoming-release/docs/inventory-management-feature-overview) feature.

## Scenario 1: Separate warehouses and databases

{% info_block infoBox %}

To enable this scenario for your project, a developer should configure it.

{% endinfo_block %}

Suppose you own a big e-commerce business and ship orders worldwide. You want to manage logistics and products effectively. You also want each store to be completely independent from each other, so user, products, and other data is not shared between stores.

In this case, each store can have its own warehouse and an own database. Stocks, product reservations, and availability are not co-depended between stores, and therefore are not synced:

![image](https://confluence-connect.gliffy.net/embed/image/62d92512-6863-421f-bdc8-abcc9682c784.png?utm_medium=live&utm_source=custom){height="" width=""}

This scenario is good for big businesses managed from various locations, with worldwide deliveries. The stores do not depend on each other in any way and do not require additional communication or synchronization.

## Scenario 2: A shared warehouse but separate databases
{% info_block infoBox %}

To enable this scenario for your project, a developer should configure it. See [implementation reference](#implementation-reference) for recommendations.

{% endinfo_block %}

Suppose you have a big e-commerce business, with many products and orders, so you want to separate all data for each of your stores. For some reason, you can not have warehouses spread across various locations, or your deliveries are within a specific part of the world, so you don’t need multiple warehouses.

In this case, you can have a common warehouse for all your stores but separate databases. Since the warehouse is shared, for the correct product availability calculations, product reservations must be synced between the databases:

![image](https://confluence-connect.gliffy.net/embed/image/728ee336-f3e0-4d03-b519-24bc15566360.png?utm_medium=live&utm_source=custom){height="" width=""}

This approach is good for big businesses that can’t have or don’t need multiple warehouses but still want to have data of each store separated.

### Implementation reference

To implement this scenario, you need these three additional database tables:

* `spy_oms_product_reservation_store` to store reservation requests from other stores.
* `spy_oms_reservation_change_version` to store information about the time when the last reservation occurred.
* `spy_oms_reservation_last_exported_version` to store information about the time when reservations were exported to other stores last time.

Also, there are plugins to help you implement synchronization of the reservations:


| PLUGIN | DESCRIPTION |
| --- | --- |
|`\Spryker\Zed\Oms\Business\OmsFacadeInterface::importReservation` | You can use this plugin when reading export data from another store. The plugin stores reservation information to `spy_oms_product_reservation_store` table and updates all timestamps accordingly. |
| `\Spryker\Zed\Oms\Communication\Plugin\Oms\ReservationHandler\ReservationVersionHandlerPlugin` | The plugin is called when a customer makes an order, and a reservation is made. It stores reservation in the `spy_oms_reservation_change_version` database table. Register this plugin in `\Pyz\Zed\Oms\OmsDependencyProvider::getReservationHandlerPlugins` plugin stack. |
| `\Spryker\Zed\Oms\Communication\Plugin\Oms\ReservationImport\ReservationExportPlugin` | The plugin is called when a reservation export to another store is initiated. This plugin decides if the export should be accepted. We do not provide the delivery mechanism: you could do this with files or a queue. For example, when `ReservationExportPlugin` is called, you can write a file copy to another server and read it there. Same for queue: you could publish an event in the queue and then consume it on the other end. |

{% info_block infoBox %}

There is a console command to export all reservations: `\Spryker\Zed\Oms\Communication\Console\ExportReservationConsole`. It triggers `ReservationExportPlugin` with reservations amounts to export. You can run this command as a cronjob.

{% endinfo_block %}

## Scenario 3: Separate warehouses but a shared database

{% info_block infoBox %}

This is the default scenario implemented in the [Spryker Demo Shops](https://documentation.spryker.com/docs/about-spryker#spryker-b2bb2c-demo-shops).

{% endinfo_block %}

Suppose you own a medium to big e-commerce business and ship orders worldwide. You want to manage logistics and products effectively, so each store has its own warehouse. You also want product reservations and availability to be separated per store, but you want all the data stored in one place. So, for example, if a product is unavailable in the DE store, but available in the AT store, a registered user can simply switch from the DE store to AT store and buy the product there.

In this case, consider separated warehouses but a shared database:

![image](https://confluence-connect.gliffy.net/embed/image/f02757ee-9f81-496b-8b71-5dbdb801afe8.png?utm_medium=live&utm_source=custom){height="" width=""}

{% info_block infoBox %}

When a buyer places an order, a reservation record  is created in the database. The record also contains information about the store the reservation is made for. 

{% endinfo_block %}

This scenario is good for medium and big online shops that want to have a common database of product, user, and other data. It’s a good option to, for example, allow registered users to buy from any store without having to re-register.

## Scenario 4: Warehouse and database are shared between stores
{% info_block infoBox %}

To enable this scenario for your project, a developer should configure it.

{% endinfo_block %}

Suppose you own a small to big e-commerce business and can’t have or don’t need separate warehouses per each store. You also want all the data stored in one place. So, for example, if a product is unavailable in the DE store, but available in the AT store, a registered user can switch from DE store to AT store and buy the product there.

In this case, consider having a shared warehouse and a shared database for all the stores. Since the warehouse is shared, for the correct product availability calculations, product reservations are synced between the stores:

![image](https://confluence-connect.gliffy.net/embed/image/2848116a-7530-407f-8cef-384bdd82b9ac.png?utm_medium=live&utm_source=custom){height="" width=""}

{% info_block infoBox %}

When a buyer places an order in one of the stores, the reservation with the store identifier is stored in the database. An event is created and published in the queue, and synchronization with the other stores happens.

{% endinfo_block %}

This scenario is especially good for small online shops with one warehouse that want to have a common database of product, user, and other data.
