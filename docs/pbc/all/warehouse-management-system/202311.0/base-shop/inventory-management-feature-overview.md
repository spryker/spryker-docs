---
title: Inventory Management feature overview
description: Learn how you can manage warehouse, stock, and availability with the Inventory Management feature
last_updated: Jul 22, 2021
template: concept-topic-template
originalLink: /docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/inventory-management-feature-overview.html-feature-overview
originalArticleId: 6aaacd72-1ca1-4406-8614-0cacf94459d4
redirect_from:
  - /2021080/docs/inventory-management-feature-overview
  - /2021080/docs/en/inventory-management-feature-overview
  - /docs/inventory-management-feature-overview
  - /docs/en/inventory-management-feature-overview
  - /docs/scos/user/features/202200.0/inventory-management-feature-overview.html
  - /docs/scos/user/features/202311.0/inventory-management-feature-overview.html
  - /docs/pbc/all/warehouse-management-system/inventory-management-feature-overview.html  
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/inventory-management-feature-overview.html
---

The *Inventory Management* feature refers to warehousing and managing your store’s stock. In this context, a *warehouse* is a physical place where your products are stored, and *stock* is the number of products available in the warehouse. See [Warehouse management](#warehouse-management) and [Stock management](#stock-management) for details about how to manage them.
Stock does not always reflect the real availability of products, as not all the items available in stock are available for sale. For example, if items are *reserved*, that is, there are pending orders with these items, they can not be ordered, even though physically, they are still in stock. The value that reflects the difference between the current quantity of products in stock and the quantity of these products in the pending orders, is referred to as the *availability* of products. The availability is calculated per store. For details about managing availability, see [Availability management](#availability-management).

## Warehouse management

You can [create warehouses in the Back Office](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/create-warehouses.html) or [import them](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse.csv.html).

A warehouse can be assigned to a single store or shared between several stores. For the warehouse and stock management scenarios you can set up for your project, see [Manage stocks in a multi-store environment: Best practices](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/extend-and-customize/manage-stocks-in-a-multi-store-environment-best-practices.html). You can manage relations between stores and warehouses in the Back Office or by importing the warehouse and store data. For details about managing warehouses and stores in the back office, see [Managing warehouses](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/edit-warehouses.html). For details about importing the warehouse and store data, see [File details: warehouse_store.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse-store.csv.html).

### Defining a warehouse address

You can define the warehouse address that will be used as the shipping origin address by importing the warehouse address data. For details about the import file, see [File details: warehouse_address.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse-address.csv.html).

### Avalara: Warehouse assignment to order items

{% info_block warningBox %}

By default, a warehouse is not linked to a sales order item. The logic described below applies only when [Avalara](/docs/pbc/all/tax-management/{{page.version}}/base-shop/tax-feature-overview.html) is integrated into your project. That is, it's used to get warehouse addresses to calculate taxes in the USA.

{% endinfo_block %}

During the checkout, once a buyer entered delivery addresses for all order items, be it a [single delivery](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/split-delivery-overview.html) or a split delivery, the order items are assigned to warehouses to fulfill them.

By default, if a buyer orders several items of the same SKU, the requested item’s stock is checked in all the warehouses of the store. Based on the item stock, the warehouses are sorted in descending order—for example:

1. Never out of stock
2. 1000 items
3. 999 items
4. 2 items
5. 0 items

If the requested quantity of the item is available in the first warehouse, that is, the one holding the biggest stock of the item, this warehouse is assigned to fulfill the order item.

{% info_block infoBox %}

The warehouse with the *never out of stock* item quantity is always assigned to the item.

{% endinfo_block %}

If the first warehouse's stock is insufficient to fulfill the order item, this warehouse and the next one are assigned to the order item to fulfill the remaining quantity.

Schematically, the process looks like this:

![image](https://confluence-connect.gliffy.net/embed/image/74e2001e-4443-4e6c-b3d6-fafb14548702.png?utm_medium=live&utm_source=custom)

## Stock management

When the order is made, the stock is not updated automatically in the system, and you have to set it manually. You can define stock only for concrete products. You can set stock by doing the following:

* Editing product stock in the Back Office. For details, see [Edit stock of products and product bundles](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/edit-stock-of-products-and-product-bundles.html).
* Importing the quantities of items stored in each of the warehouses. For details, see [Import file details: product_stock.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-stock.csv.html).

## Availability management

In contrast to stock, availability considers not just the number of products in the warehouse but also current open orders.

When a buyer places an order, the products in the order become *reserved*, and the product availability changes. The changes are reflected in the Back Office: The availability is equal to the stock before the order is placed, and after the order is placed, the availability decreases, but the stock remains the same.

Product availability before the order:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/before-order-placement.png)

Product availability after the order:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/after-order-placement.png)

For details about checking product availability in the Back Office, see [Check availability of products](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/check-availability-of-products.html).

{% info_block infoBox %}

The availability of a product bundle is defined by the availability of each product in the bundle. If at least one of them is out of stock, the entire bundle is unavailable.

{% endinfo_block %}

In the [state machine](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html), a developer can use the `reserved` parameter to define the states at which the order items are reserved. There can also be states that release an item. For example, when the payment fails and the order is canceled, the item is not reserved anymore:

<details>
<summary>State machine example</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/state-machine.png)

</details>

{% info_block infoBox "Unavailable products on the Storefront" %}

For SEO purposes, products that are not available can still be displayed on the Storefront with the inactive **Add to cart** button.

{% endinfo_block %}

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create warehouses](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/create-warehouses.html)  |
| [Edit warehouses](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/edit-warehouses.html) |
| [Check availability of products](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/check-availability-of-products.html)  |
| [Edit stock of products and product bundles](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-in-the-back-office/edit-stock-of-products-and-product-bundles.html)  |

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT | REFERENCES |
|---|---|---|---|-|
| [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html) | [Upgrade the Availability module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availability-module.html) | [Retrieve abstract product availability](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-availability.html) | [File details: product_stock.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-stock.csv.html) | |
| [Install the Inventory Management + Alternative Products feature](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-alternative-products-feature.html) | [Upgrade the AvailabilityCartConnector module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilitycartconnector-module.html) | [Retrieve concrete product availability](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-availability.html) | [File details: warehouse_address.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse-address.csv.html) | [Manage stocks in a multi-store environment: Best practices](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/extend-and-customize/manage-stocks-in-a-multi-store-environment-best-practices.html) |
| [Install the Inventory Management Glue API](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-glue-api.html) | [Upgrade the AvailabilityGui module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilitygui-module.html) | [Retrieve availability when retrieving abstract products](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-availability-when-retrieving-abstract-products.html) | [File details: warehouse_store.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse-store.csv.html) |  |
|| [Upgrade the AvailabilityOfferConnector module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilityofferconnector-module.html) | [Retrieve availability when retrieving concrete products](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-availability-when-retrieving-concrete-products.html) | ["Import file details: warehouse.csv"](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse.csv.html) |
| | [Upgrade the AvailabilityStorage module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilitystorage-module.html) | | |
