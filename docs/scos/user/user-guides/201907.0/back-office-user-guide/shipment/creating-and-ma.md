---
title: Creating and Managing Shipment Methods
originalLink: https://documentation.spryker.com/v3/docs/creating-and-managing-shipment-methods
redirect_from:
  - /v3/docs/creating-and-managing-shipment-methods
  - /v3/docs/en/creating-and-managing-shipment-methods
---

This topic describes the procedures for creating and managing shipment methods. 
***
**Prerequisites**
Once you decide to add a new shipment method, please make sure that you have a carrier company to assign a shipment method. If you don't have an appropriate carrier, see  [Creating a Carrier Company](/docs/scos/dev/user-guides/201907.0/back-office-user-guide/shipment/creating-a-carr). You also need to make sure that you have an appropriate tax set in the **Taxes > Tax Sets** section, see [Taxes](/docs/scos/dev/user-guides/201907.0/back-office-user-guide/taxes/taxes).
***
To start working with the shipment methods, navigate to the **Shipment** section.
***
## Creating a Shipment Method
A shipment method is described by :
* delivery price (how is the price for a delivery calculated?)
* delivery time (what’s the estimated time for the delivery?)
* availability (when is the shipment method available?)
{% info_block errorBox "IMPORTANT" %}
Each shipment method has its own specificity, so these three aspects must be configured (this is done through plugins.
{% endinfo_block %})
To create a new shipment method:
1. In the top-right corner of the **Shipment** page, click **Add new Shipment Method**.
2. On the Create new Shipment Method page, do the following: 
    1. Select the carrier company for which you want to add the shipment method to in the Carrier drop-down list. Only one value can be selected.
    2. Enter a name for the shipment method: the name that you enter will be visible in the Online Stor.
    3. Define the prices.
    4. Select the **Availability Plugin**: you can select one of the availability plugins that is implemented in the back-end. The purpose of this plugin is to check if the shipment method is available for the customer and can be listed among the available shipment methods. If it’s not available, the shipment method won’t be shown to the customer.
    5. Select the **Price Plugin**: you can either provide a static price for your shipment method or select a configured price plugin.
    Regardless if you have multi-currency prices with multiple price modes or just one simple static price (older versions), the price plugin has priority over those prices and allows you to customize and apply logic over delivery price calculation.
    6. Select the **Delivery Time Plugin**: you can select one of the delivery time plugins that is implemented in the back-end. The purpose of this plugin is to calculate the estimated time for the delivery.
    7. Activate the shipment method by selecting the Is active checkbox.
    8. Select the tax set from the drop-down list. The values are taken from the **Taxes > Tax Sets** section.
3. Once done, click **Add**.  	

This is everything you need to do for creating a shipment method. 

## Editing a Shipment Method
In case you need to update any values that you have entered during the shipment method creation, do the following:
1. In the _Actions_ column of the **Shipment** table, click **Edit** for a specific shipment method.
2. Update the needed values.
3. Once done, click **Save**.
***
**Tips & Tricks**
This is how the Back Office setup looks in the online store:
**Back Office**
![image.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/editing-shipment-method.png){height="" width=""}

**Online Store**
![image.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/online-store.png){height="400" width="300"}
