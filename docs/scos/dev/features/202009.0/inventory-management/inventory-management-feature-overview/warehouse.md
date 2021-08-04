---
title: Warehouse
originalLink: https://documentation.spryker.com/v6/docs/warehouse
redirect_from:
  - /v6/docs/warehouse
  - /v6/docs/en/warehouse
---

Your product's availability is calculated on a per-store basis, meaning you can manage stocks from a single interface and make warehouse management more efficient.

If you have multiple warehouses, your products can have multiple stock quantities to reflect availability accurately. This all can be done in the Back office. See [Managing Warehouses](https://documentation.spryker.com/docs/managing-warehouses) for more details. Also, you can import warehouse information via a .csv file.

You can easily manage stocks across all stores and warehouses as well as share warehouses between different stores from a single interface and make warehouse management more efficient and flexible.

## Product Stock
Stock defines the physical amount of products you have in your warehouse. Spryker Commerce OS allows you to define stocks for your products in different warehouses.

A product is associated with at least one stock product. It should be noted that only concrete products can have stocks. Additionally, in the Back Office, you can define a product to be never out of stock to make it available at any time.
![Database scheme](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Inventory+Management/Warehouse+Management/database-scheme-inventory.png){height="" width=""}

## How Spryker Stores Your Product Stock
Spryker holds your product stock in a type called DECIMAL(20,10), which means that your product stock can be 20 digits long and have a maximum of 10 digits after the comma. For example:

* 1234567890.0987654321
* 0.0987654321
* 1234567890098765432.1
* 12345.6789009876
* 1.0000000000

## Calculating Current Stock for Products
A product quantity from stock is being reserved when an order containing it is being processed. The state machine is reserving stocks by setting the *reserved* flag. To calculate the available stock per store, not only the maintained stock (the sum of *active* stocks related to the current store from each storage location) is taken into account, but also the currently processed orders.

