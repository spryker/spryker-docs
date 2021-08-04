---
title: Inventory Management feature overview
originalLink: https://documentation.spryker.com/2021080/docs/inventory-management-feature-overview
redirect_from:
  - /2021080/docs/inventory-management-feature-overview
  - /2021080/docs/en/inventory-management-feature-overview
---

*Inventory Management* refers to warehousing and managing your store’s stock. In this context, the *warehouse* is the physical place where your products are stored, and *stock* is the number of products available in the warehouse. See [Warehouse management](#warehouse-management) and [Stock management](#stock-management) for details on how to manage them.
Stock does not always reflect the real availability of products, as not all the items available in stock are available for sale. For example, if items are *reserved*, that is, there are pending orders with these items, they can not be ordered, even though physically, they are still in stock. The value that reflects the difference between the current quantity of products in stock and the quantity of these products in the pending orders, is referred to as the *availability* of products. The availability is calculated per store. See [Availability management](#availability-management) for details on how to manage availability.

## Warehouse management

You can [create warehouses in the Back Office](https://documentation.spryker.com/docs/creating-a-warehouse) or [import them](https://documentation.spryker.com/docs/file-details-warehousecsv).

A warehouse can be assigned to a single store or shared between several stores. See [Managing stocks in a multi-store environment: Best practices](https://documentation.spryker.com/upcoming-release/docs/managing-stocks-in-a-multi-store-environment-best-practices) for the warehouse and stock management scenarios you can set up for your project. You can manage relations between stores and warehouses in the Back Office or by importing the warehouse and store data. See [Managing warehouses](https://documentation.spryker.com/docs/managing-warehouses#managing-warehouses) for details on how you can manage warehouses and stores in the back office and [File details: warehouse_store.csv](https://documentation.spryker.com/docs/file-details-warehouse-storecsv) on how you can import the warehouse and store data.

### Defining a warehouse address
You can define the warehouse address that will be used as the shipping origin address by importing the warehouse address data. See [File details: warehouse_address.csv](https://documentation.spryker.com/upcoming-release/docs/file-details-warehouse-addresscsv) for details about the import file.

### Warehouse assignment to order items (with Avalara integration only)

{% info_block warningBox %}

By default, a warehouse is not linked to a sales order item. The logic described below applies only when [Avalara](https://documentation.spryker.com/2021080/docs/tax-feature-overview) is integrated into your project. That is, it is used to get warehouse addresses to calculate taxes in the USA.

{% endinfo_block %}

During the checkout, once a buyer entered delivery addresses for all order items, be it a [single delivery](https://documentation.spryker.com/docs/split-delivery-overview) or a split delivery, the order items are assigned to warehouses to fulfill them.

By default, if a buyer orders several items of the same SKU, the requested item’s stock is checked in all the warehouses of the store. Based on the item stock, the warehouses are sorted in descending order, for example:

1. Never out of stock
2. 1000 items
3. 999 items
4. 2 items
5. 0 items

If the requested quantity of the item is available in the first warehouse, that is, the one holding the biggest stock of the item, this warehouse is assigned to fulfill the order item.

{% info_block infoBox %}

The warehouse with the *never out of stock* item quantity is always assigned to the item.

{% endinfo_block %}

If the first warehouse's stock is insufficient to fulfill the order item, this warehouse and the next one is assigned to the order item to fulfill the remaining quantity.

Schematically, the process looks like this:

![image](https://confluence-connect.gliffy.net/embed/image/74e2001e-4443-4e6c-b3d6-fafb14548702.png?utm_medium=live&utm_source=custom){height="" width=""}

## Stock management

When order is made, stock is not updated automatically in the system, you have to set it manually. You can define stock only for concrete products. You can set stock by:

* Editing product stock in the Back Office. See [Editing stock](https://documentation.spryker.com/docs/managing-products-availability#editing-stock) for details.
* Importing the quantities of items stored in each of the warehouses. See [Stocks](https://documentation.spryker.com/docs/stocks) for details.

## Availability management

In contrast to stock, availability considers not just the number of products in the warehouse but also current open orders. 

When a buyer places an order, the products in the order become *reserved*, and the product availability changes. The changes are reflected in the Back Office: The availability is equal to the stock before the order is placed, and after the order is placed, the availability decreases, but the stock remains the same.

Product availability before the order:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/before-order-placement.png){height="" width=""}

Product availability after the order:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/after-order-placement.png){height="" width=""}

See [Checking availability](https://documentation.spryker.com/docs/managing-products-availability#checking-availability) for details on how you can check product availability in the Back Office.

{% info_block infoBox %}

Availability of a product bundle is defined by the availability of each product in the bundle. If at least one of them is out of stock, the entire bundle is unavailable. 

{% endinfo_block %}

In the [state machine](https://documentation.spryker.com/docs/order-process-modelling-state-machines), a developer can use the `reserved` parameter to define the states at which the order items are reserved. There can also be states that release an item. For example, when payment fails and order is canceled, the item is not reserved anymore:

<details open>
<summary>State machine example</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/state-machine.png){height="" width=""}

</details>

{% info_block infoBox "Unavailable products on the Storefront" %}

For SEO purposes, products that are not available can still be displayed on the Storefront with the inactive **Add to cart** button.

{% endinfo_block %}



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
       <li><a href="https://documentation.spryker.com/docs/inventory-management-feature-integration" class="mr-link">Integrate the Inventory Management feature</a></li>
       <li><a href="https://documentation.spryker.com/docs/inventory-management-feature-integration" class="mr-link">Integrate the Inventory Management Glue API</a></li>
       <li><a href="https://documentation.spryker.com/docs/managing-stocks-in-a-multi-store-environment-best-practices" class="mr-link">Manage stocks in a multi-store environment: Best practices</a></li>
       <li><a href="https://documentation.spryker.com/docs/file-details-product-stockcsv" class="mr-link">Import product stock</a></li>
       <li><a href="https://documentation.spryker.com/docs/file-details-warehouse-storecsv" class="mr-link">Import warehouse and store data</a></li>
       <li><a href="https://documentation.spryker.com/docs/file-details-warehouse-addresscsv" class="mr-link">Import warehouse address data</a></li>
       <li><a href="https://documentation.spryker.com/docs/retrieving-abstract-product-availability" class="mr-link">Retrieve abstract product availability via Glue API</a></li>
       <li><a href="https://documentation.spryker.com/docs/retrieving-concrete-product-availability" class="mr-link">Retrieve concrete product availability via Glue API</a></li>
        </div>
         <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office user</li>
                 <li><a href="https://documentation.spryker.com/docs/creating-a-warehouse" class="mr-link">Create a warehouse</a></li>
                  <li><a href="https://documentation.spryker.com/docs/managing-warehouses" class="mr-link">Manage stocks warehouses</a></li>
                  <li><a href="https://documentation.spryker.com/docs/managing-products-availability" class="mr-link">Manage product availabilities</a></li>
               </ul>
        </div>
        </div>
</div>
