---
title: Inventory Management feature overview
description: Learn how you can manage warehouse, stock, and availability with the Inventory Management feature
last_updated: Dec 23, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/inventory-management
originalArticleId: 3260f265-35f7-4739-abb2-0734b9c8f04a
redirect_from:
  - /v1/docs/inventory-management
  - /v1/docs/en/inventory-management
  - /v1/docs/about-inventory
  - /v1/docs/en/about-inventory
  - /v1/docs/stock-availability-management
  - /v1/docs/en/stock-availability-management
  - /v1/docs/multiple-warehouse-stock
  - /v1/docs/en/multiple-warehouse-stock
---

Thr *Inventory Management* feature refers to warehousing and managing your store’s stock. In this context, a *warehouse* is the physical place where your products are stored, and *stock* is the number of products available in the warehouse. See [Warehouse management](#warehouse-management) and [Stock management](#stock-management) for details on how to manage them.
Stock does not always reflect the real availability of products, as not all the items available in stock are available for sale. For example, if items are *reserved*, that is, there are pending orders with these items, they can not be ordered, even though physically, they are still in stock. The value that reflects the difference between the current quantity of products in stock and the quantity of these products in the pending orders, is referred to as the *availability* of products. The availability is calculated per store. See [Availability management](#availability-management) for details on how to manage availability.

## Warehouse management

You can [create warehouses in the Back Office](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/administration/warehouses/creating-warehouses.html) or [import them](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse.csv.html).

A warehouse can be assigned to a single store or shared between several stores. You can manage relations between stores and warehouses in the Back Office or by importing the warehouse and store data. See [Managing warehouses](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/administration/warehouses/managing-warehouses.html) for details on how you can manage warehouses and stores in the back office and [File details: warehouse_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse-store.csv.html) on how you can import the warehouse and store data.

### Defining a warehouse address
You can define the warehouse address that will be used as the shipping origin address by importing the warehouse address data. See [File details: warehouse_address.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse-address.csv.html) for details about the import file.

## Stock management

Stock defines the physical amount of products you have in your warehouse. Spryker Commerce OS allows you to define stocks for your products in different warehouses.

A product is associated with at least one stock product. It should be noted that only concrete products can have stocks. Additionally, in the Back Office, you can define a product to be never out of stock to make it available at any time.

When order is made, stock is not updated automatically in the system, you have to set it manually. You can define stock only for concrete products. You can set stock by:

* Editing product stock in the Back Office. See [Editing stock](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/availability/managing-products-availability.html#editing-stock) for details.
* Importing the quantities of items stored in each of the warehouses. See [Stocks](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/stocks/stocks.html) for details.

### How Spryker stores your product stock
Spryker holds your product stock in a type called DECIMAL(20,10), which means that your product stock can be 20 digits long and have a maximum of 10 digits after the comma. For example:

* 1234567890.0987654321
* 0.0987654321
* 1234567890098765432.1
* 12345.6789009876
* 1.0000000000

### Calculating the current stock for products
A product quantity from stock is being reserved when an order containing it is being processed. The state machine is reserving stocks by setting the *reserved* flag. To calculate the available stock per store, not only the maintained stock (the sum of *active* stocks related to the current store from each storage location) is taken into account, but also the currently processed orders.


## Availability management

In contrast to stock, availability considers not just the number of products in the warehouse but also current open orders.

When a buyer places an order, the products in the order become *reserved*, and the product availability changes. The changes are reflected in the Back Office: The availability is equal to the stock before the order is placed, and after the order is placed, the availability decreases, but the stock remains the same.

Product availability before the order:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/before-order-placement.png)

Product availability after the order:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/after-order-placement.png)

See [Checking availability](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/availability/managing-products-availability.html#checking-availability) for details on how you can check product availability in the Back Office.

{% info_block infoBox %}

Availability of a product bundle is defined by the availability of each product in the bundle. If at least one of them is out of stock, the entire bundle is unavailable.

{% endinfo_block %}

In the [state machine](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html), a developer can use the `reserved` parameter to define the states at which the order items are reserved. There can also be states that release an item. For example, when payment fails and order is cancelled, the item is not reserved anymore:

<details open>
<summary markdown='span'>State machine example</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/state-machine.png)

</details>

{% info_block infoBox "Unavailable products on the Storefront" %}

For SEO purposes, products that are not available can still be displayed on the Storefront with the inactive **Add to cart** button.

{% endinfo_block %}

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Create a warehouses](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/administration/warehouses/creating-warehouses.html)  |
| [Manage warehouses](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/administration/warehouses/managing-warehouses.html) |
| [Manage product availabilities](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/availability/managing-products-availability.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Inventory Management feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/nventory-management-feature-walkthrough/inventory-management-feature-walkthrough.html) for developers.

{% endinfo_block %}
