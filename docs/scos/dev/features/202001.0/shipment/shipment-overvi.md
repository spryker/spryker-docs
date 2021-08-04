---
title: Shipment Overview
originalLink: https://documentation.spryker.com/v4/docs/shipment-overview
redirect_from:
  - /v4/docs/shipment-overview
  - /v4/docs/en/shipment-overview
---

The **Shipment** feature allows you to create and manage carrier companies and assign multiple delivery methods associated with specific stores, which your customers can select during the checkout. With the feature in place, you can define delivery price and expected delivery time, tax sets and availability of the delivery method per store.

The main concepts regarding shipping are as follows:

* **carrier company**: A company that provides shipping services such as DHL, FedEx, Hermes, etc.
* **delivery method**: Shipping services provided by a carrier company such as DHL Express, DHL Standard, Hermes Next Day, Hermes Standard, etc.

A sales order can have multiple delivery methods from different carrier companies.

In the Back Office, you can create a carrier company and configure multiple delivery methods. For each delivery method, you can set a price and an associated tax set, define a store in which the delivery method can be available, as well as activate or deactivate the delivery method. For more information on how to create and manage delivery methods in the Back Office, see [Creating and Managing Delivery Methods](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/administration/shipment/creating-and-ma). 

Additional behaviors can be attached to a delivery method from the Back Office by selecting specific plugins. For more information on method plugins types, see [Shipment Method Plugins](/docs/scos/dev/features/202001.0/shipment/shipment-method).

The following schema shows how the sales order and shipment method entities are modeled in the database:

![Database schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shipment/Shipment+Overview/shipment-database-schema.png){height="" width=""}
