---
title: Multiple Warehouse Stock Management
originalLink: https://documentation.spryker.com/v2/docs/multiple-warehouse-stock
redirect_from:
  - /v2/docs/multiple-warehouse-stock
  - /v2/docs/en/multiple-warehouse-stock
---

Your product's availability is calculated on a per-store basis, meaning you can manage stocks across all international entities from a single interface and make logistics management more efficient.

If you have multiple warehouses for storage, your products can have multiple stock quantities to accurately reflect availability. Also, warehouses can be shared between different stores and availability will be reflected accordingly. You can easily manage stocks across all stores and warehouses from a single interface and make logistics management more efficient.

* Different stock types (typically used to represent different locations/warehouses)
* Is-never-out-of stock products
* Warehouses shared between different stores

## Stock
Stock defines physical amount of products you have in your warehouse. This article will tell you how the stock module works and how product stock is calculated.

### Multiple Storage Locations
Spryker Commerce OS allows to define several storage locations in which the products are being stored. For a product you can have associated multiple stock product entries associated, each of them associated to a storage location.

### Product Stock
A product is associated to at least one stock product. Stocks cannot be attached to abstract products (only to concrete products). You can use a specific flag for stock which will indicate that the product associated to the stock (for example, a product with no physical stock) never goes out of stock.
![Product Stock](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Multiple+Warehouse+Stock+Management/product_stock.png){height="" width=""}

### Calculating Current Stock For Products
A product quantity from a stock is being reserved when an order containing it, is being processed. The state machine is doing this job of reserving stocks by setting the `reserved` flag. In order to calculate the available stock, not only the maintained stock (the sum of stocks from each storage location) is taken into account, but also the currently processed orders.

### Shared Warehouses

From Stock module version 4.1.* a store/warehouse mapping has been added.

It can be configured in `\Pyz\Zed\Stock\StockConfig::getStoreToWarehouseMapping` method, which must return an array with the following structure:

```js
/**
 * @return array
 */
public function getStoreToWarehouseMapping()
{
  return [
    'DE' => [ //key is store name
       'Warehouse1', //values are warehouse names from `spy_stock.name`
       'Warehouse2',
     ],
     'AT' => [
       'Warehouse2',
     ],
     'US' => [
       'Warehouse2',
     ],
  ];
}
```

Using this mapping, availability for product will be calculated.

<!-- Last review date: Jan 19, 2018-- by Aurimas Ličkus -->
