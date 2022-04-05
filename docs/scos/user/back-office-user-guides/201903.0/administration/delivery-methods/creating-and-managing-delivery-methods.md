---
title: Creating and Managing Delivery Methods
description: Use the procedures to create a delivery method, activate it, set a price and tax set, and define a delivery method per store in the Back Office.
last_updated: Jul 31, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v2/docs/creating-and-managing-shipment-methods
originalArticleId: c38da436-9164-4573-b52a-782f880fb07a
redirect_from:
  - /v2/docs/creating-and-managing-shipment-methods
  - /v2/docs/en/creating-and-managing-shipment-methods
related:
  - title: Shipment feature overview
    link: docs/scos/user/features/page.version/shipment-feature-overview.html
  - title: "Reference information: Shipment method plugins"
    link: docs/scos/dev/feature-walkthroughs/page.version/shipment-feature-walkthrough/reference-information-shipment-method-plugins.html
---

This topic describes the procedures for creating and managing shipment methods.
***
**Prerequisites**
Once you decide to add a new shipment method, make sure that you have a carrier company to assign a shipment method on the list of delivery methods. If you don't have an appropriate carrier, see [Creating Carrier Companies](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/delivery-methods/creating-carrier-companies.html). You also need to make sure that you have an appropriate tax set in the **Taxes > Tax Sets** section, see [Taxes](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-rates/taxes.html).
***
To start working with the delivery methods, navigate to the **Administration > Shipment > Delivery Methods** section.
***

## Creating a Delivery Method

A delivery method is described by :
* delivery price (how is the price for a delivery calculated?)
* delivery time (what is the estimated time for the delivery?)
* availability (when is the shipment method available?)

{% info_block errorBox "Important" %}

Each shipment method has its own specificity, so these three aspects must be configured (this is done through [plugins](/docs/scos/dev/feature-walkthroughs/{{page.version}}/shipment-feature-walkthrough/reference-information-shipment-method-plugins.html).

{% endinfo_block %}

**To create a new shipment method:**
1. In the top-right corner of the **Delivery Methods** page, click **Create new delivery method**.
2. On the **Create New Delivery Method** page, do the following:
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
***

## Editing a Shipment Method

In case you need to update any values that you have entered during the shipment method creation, do the following:
1. In the _Actions_ column of the **Shipment** table, click **Edit** for a specific shipment method.
2. Update the needed values.
3. Once done, click **Save**.
***
<!-- **Tips and tricks**
This is how the Back Office setup looks in the online store:
**Back Office**
![Editing a shipment method](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Shipment/Creating+and+Managing+Shipment+Methods/editing-shipment-method.png)

**Online Store**
![Online store](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Shipment/Creating+and+Managing+Shipment+Methods/online-store.png){height="400" width="300"}-->
