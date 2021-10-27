---
title: Inventory Management feature overview
description: Learn how you can manage warehouse, stock, and availability with the Inventory Management feature
last_updated: Jul 22, 2021
template: concept-topic-template
originalLink: /docs/scos/user/features/{{page.version}}/inventory-management-feature-overview.html-feature-overview
originalArticleId: 6aaacd72-1ca1-4406-8614-0cacf94459d4
redirect_from:
  - /2021080/docs/inventory-management-feature-overview
  - /2021080/docs/en/inventory-management-feature-overview
  - /docs/inventory-management-feature-overview
  - /docs/en/inventory-management-feature-overview
---

Thr *Inventory Management* feature refers to warehousing and managing your store’s stock. In this context, a *warehouse* is the physical place where your products are stored, and *stock* is the number of products available in the warehouse. See [Warehouse management](#warehouse-management) and [Stock management](#stock-management) for details on how to manage them.
Stock does not always reflect the real availability of products, as not all the items available in stock are available for sale. For example, if items are *reserved*, that is, there are pending orders with these items, they can not be ordered, even though physically, they are still in stock. The value that reflects the difference between the current quantity of products in stock and the quantity of these products in the pending orders, is referred to as the *availability* of products. The availability is calculated per store. See [Availability management](#availability-management) for details on how to manage availability.

## Warehouse management

You can [create warehouses in the Back Office](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/warehouses/creating-warehouses.html) or [import them](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse.csv.html).

A warehouse can be assigned to a single store or shared between several stores. See [Managing stocks in a multi-store environment: Best practices](/docs/scos/dev/feature-walkthroughs/{{page.version}}/inventory-management-feature-walkthrough/managing-stocks-in-a-multi-store-environment-best-practices.html) for the warehouse and stock management scenarios you can set up for your project. You can manage relations between stores and warehouses in the Back Office or by importing the warehouse and store data. See [Managing warehouses](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/warehouses/managing-warehouses.html) for details on how you can manage warehouses and stores in the back office and [File details: warehouse_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse-store.csv.html) on how you can import the warehouse and store data.

### Defining a warehouse address

You can define the warehouse address that will be used as the shipping origin address by importing the warehouse address data. See [File details: warehouse_address.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse-address.csv.html) for details about the import file.

### Warehouse assignment to order items (with Avalara integration only)

{% info_block warningBox %}

By default, a warehouse is not linked to a sales order item. The logic described below applies only when [Avalara](/docs/scos/user/features/{{page.version}}/tax-feature-overview.html) is integrated into your project. That is, it is used to get warehouse addresses to calculate taxes in the USA.

{% endinfo_block %}

During the checkout, once a buyer entered delivery addresses for all order items, be it a [single delivery](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/split-delivery-overview.html) or a split delivery, the order items are assigned to warehouses to fulfil them.

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

If the first warehouse's stock is insufficient to fulfil the order item, this warehouse and the next one is assigned to the order item to fulfill the remaining quantity.

Schematically, the process looks like this:

![image](https://confluence-connect.gliffy.net/embed/image/74e2001e-4443-4e6c-b3d6-fafb14548702.png?utm_medium=live&utm_source=custom)

## Stock management

When order is made, stock is not updated automatically in the system, you have to set it manually. You can define stock only for concrete products. You can set stock by:

* Editing product stock in the Back Office. See [Editing stock](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/availability/managing-products-availability.html#editing-stock) for details.
* Importing the quantities of items stored in each of the warehouses. See [Stocks](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/stocks/stocks.html) for details.

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
| [Create a warehouses](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/warehouses/creating-warehouses.html)  |
| [Manage warehouses](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/warehouses/managing-warehouses.html) |
| [Manage product availabilities](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/availability/managing-products-availability.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Inventory Management feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/inventory-management-feature-walkthrough/inventory-management-feature-walkthrough.html) for developers.

{% endinfo_block %}
