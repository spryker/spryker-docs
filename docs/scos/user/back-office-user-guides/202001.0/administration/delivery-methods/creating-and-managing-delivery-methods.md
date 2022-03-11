---
title: Creating and Managing Delivery Methods
description: Use the procedures to create a delivery method, activate it, set a price and tax set, and define a delivery method per store in the Back Office.
last_updated: Dec 6, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v4/docs/creating-and-managing-shipment-methods
originalArticleId: 7865fc0c-04f2-4eed-89c0-5a560a5d4b75
redirect_from:
  - /v4/docs/creating-and-managing-shipment-methods
  - /v4/docs/en/creating-and-managing-shipment-methods
related:
  - title: Shipment feature overview
    link: docs/scos/user/features/page.version/shipment-feature-overview.html
  - title: Creating a Carrier Company
    link: docs/scos/user/back-office-user-guides/page.version/administration/delivery-methods/creating-carrier-companies.html
  - title: Delivery Methods- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/administration/delivery-methods/references/delivery-methods-reference-information.html
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
* availability (when is the delivery method available?)

**To create a new delivery method:**
1. In the top-right corner of the **Delivery Methods** page, click **Create new delivery method**. The **Create Delivery Method** page with three tabs opens: **Configuration**, **Price & Tax**, and **Store Relation**.
2. In the **Configuration** tab, enter and select the following attributes:
  * Delivery Method Key
  * Name
  * Carrier
  * Availability Plugin
  * Price Plugin
  * Delivery Time Plugin

{% info_block warningBox "Note" %}

Regardless if you have multi-currency prices with multiple price modes or just one simple static price (older versions, the price plugin has priority over those prices and allows you to customize and apply logic over delivery price calculation.

{% endinfo_block %}

{% info_block warningBox "Note" %}

Keep in mind that Name will be visible in the Storefront.

The fields marked with * are required.

{% endinfo_block %}


![Create a delivery method](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/create-delivery-method.png)

1. To activate the delivery method, select the **Is active** checkbox.
2. In the **Price & Tax** tab, do the following:
    * Define the price for the delivery method per specific locale;
    * Select the tax set from the drop-down list. The values are taken from the **Taxes > Tax Sets** section. For more information, see [Managing Tax Rates and Sets](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-rates/managing-tax-rates.html).

3. In the **Store Relation** tab, select the stores in which the delivery method will be available.
![Store relation](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/store-relation-delivery-method.png)

6. To keep the changes, click **Save**. This will redirect you to the **Delivery Methods** page where you can see the new delivery method on the list and the following message: '*Shipment method has been successfully saved*'.
***

## Editing a Delivery Method
To update the values you have entered during the delivery method creation:
1. In the _Actions_ column of the **Delivery Methods** page, click **Edit** for the delivery method you want to update.
2. Update the needed values.

    {% info_block warningBox "Note" %}

    Keep in mind that **Delivery Method Key** cannot be edited.

    {% endinfo_block %}

4. To keep the changes, click **Save**.
***

**Tips and tricks**
This is how the Back Office setup looks in the online store:
**Back Office**
![Editing a shipment method](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/editing-shipment-method.png)
***

## Viewing Delivery Methods
To view the delivery method details, click **View**  in the *Actions* column for the delivery method you want to view. On the **View Delivery Method: [Delivery Method name]** page, you'll see three sections containing delivery method details: **Configuration**, **Store relation**, and **Price & Tax**. See [Delivery Methods: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/delivery-methods/references/delivery-methods-reference-information.html) for more details on the attributes you see on the page.
***

## Deleting a Delivery Method

{% info_block warningBox "Note" %}

Keep in mind that deleting a delivery method has no impact on your previous purchases.

{% endinfo_block %}

**To delete a delivery method:**

1. In the *Actions* column, click **Delete** for the delivery method you want to delete. This will redirect you to the **Delete Delivery Method** page.
2. Under **Are you sure about deleting this delivery method?**, choose one of the two options:
    * **No, I want to keep this delivery method** if you want to cancel the deletion of the delivery method. This will redirect you to the list of delivery methods.
    * **Yes, delete this delivery method** if you want to delete the delivery method. This will successfully delete the delivery method and redirect you to the list of delivery methods.

**Online Store**
![Online store](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/online-store.png)
