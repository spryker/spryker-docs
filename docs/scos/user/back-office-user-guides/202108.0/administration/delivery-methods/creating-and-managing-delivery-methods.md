---
title: Creating and managing delivery methods
description: Use the procedures to create a delivery method, activate it, set a price and tax set, and define a delivery method per store in the Back Office.
last_updated: Aug 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-and-managing-shipment-methods
originalArticleId: 66d6acae-6c36-404a-b6fb-0dbd9d71d193
redirect_from:
  - /2021080/docs/creating-and-managing-shipment-methods
  - /2021080/docs/en/creating-and-managing-shipment-methods
  - /docs/creating-and-managing-shipment-methods
  - /docs/en/creating-and-managing-shipment-methods
related:
  - title: Shipment feature overview
    link: docs/scos/user/features/page.version/shipment-feature-overview.html
  - title: Creating a Carrier Company
    link: docs/scos/user/back-office-user-guides/page.version/administration/delivery-methods/creating-carrier-companies.html
---

This topic describes how to create and manage shipment methods.

## Prerequisites

To start working with the delivery methods, go to **Administration** > **Delivery Methods**.

Once you decide to add a new shipment method, make sure that you have a carrier company to assign a shipment method on the list of delivery methods. If you don't have an appropriate carrier, see [Creating a carrier company](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/delivery-methods/creating-carrier-companies.html). You also need to make sure that you have an appropriate tax set in the **Taxes** > **Tax Sets** section, see [Taxes](/docs/scos/user/features/{{page.version}}/tax-feature-overview.html).

Review the reference information before you start, or look up the necessary information as you go through the process.

## Creating delivery methods

A delivery method is described by:
* Delivery price (how is the price for a delivery calculated?).
* Delivery time (what is the estimated time for the delivery?).
* Availability (when is the delivery method available?).

To create a new delivery method:
1. In the top-right corner of the *Delivery Methods* page, click **+Create new delivery method**. The *Create Delivery Method* page with three tabs opens: *Configuration*, *Price & Tax*, and *Store Relation*.
2. In the *Configuration* tab, enter and select the following attributes:
   * Delivery Method Key
   * Name

   {% info_block warningBox "Note" %}

   Keep in mind that it will be visible on the Storefront.

   {% endinfo_block %}

   * Carrier
   * Availability Plugin
   * Price Plugin

   {% info_block warningBox "Note" %}

   Regardless if you have multi-currency prices with multiple price modes or just one simple static price, the price plugin has priority over those prices and allows you to customize and apply logic over delivery price calculation.

   {% endinfo_block %}

   * Delivery Time Plugin

{% info_block warningBox "Note" %}

The fields marked with * are required.

{% endinfo_block %}

![Create a delivery method](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/create-delivery-method.png)

3. To activate the delivery method, select the **Is active** checkbox.
4. In the *Price & Tax* tab, do the following:
   * Define the price for the delivery method per specific locale;
   * Select the tax set from the drop-down list. The values are taken from the **Taxes** > **Tax Sets** section. For more information, see [Managing tax sets](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-sets/managing-tax-sets.html).

5. In the *Store Relation* tab, select the stores in which the delivery method should be available.

![Store relation](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/store-relation-delivery-method.png)

6. To keep the changes, click **Save**. This redirects you to the *Delivery Methods* page, where you can see the new delivery method on the list and the following message: '*Shipment method has been successfully saved*'.

### Reference information: Creating delivery methods

The following table describes the attributes you see, select, or enter while viewing or editing delivery methods.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Delivery Method Key | Fixed value of the delivery method indicated in the database. |
| Name | Name for the delivery method. |
| Carrier | Drop-down list of carrier companies available in the shop application. |
| Availability Plugin | Drop-down list of the Availability plugins implemented in the back-end. The purpose of this plugin is to check if the delivery method is available for the customer. |
| Price Plugin | Drop-down list of the Price plugins. You can either provide a static price for your delivery method or select a configured price plugin. |
| Delivery Time Plugin | Drop-down list of the Delivery time plugins implemented in the back-end. The purpose of this plugin is to calculate the estimated time for the delivery method. |
| Is active | Checkbox that allows enabling or disabling the delivery method. |

## Editing delivery methods

To update the values, you have entered during the delivery method creation:
1. In the _Actions_ column of the *Delivery Methods* page, click **Edit** for the delivery method you want to update.
2. Update the needed values.

{% info_block warningBox "Note" %}

Keep in mind that **Delivery Method Key** cannot be edited.

{% endinfo_block %}

3. To keep the changes, click **Save**. For more details on the attributes, see the [Reference information: Creating delivery methods](#reference-information-creating-delivery-methods) section.

**Tips and tricks**
<br>This is how the Back Office setup looks in the online store:

![Editing a shipment method](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/editing-shipment-method.png)


## Viewing delivery methods

To view details of a delivery method, in the *Actions* column for the delivery method you want to view, click **View**. On the *View Delivery Method: [Delivery Method name]* page, you'll see three sections containing delivery method details: *Configuration*, *Store relation*, and *Price & Tax*. For more details on the attributes you see on the page, see [Reference information: Creating delivery methods](#reference-information-creating-delivery-methods) 

## Deleting delivery methods

{% info_block warningBox "Note" %}

Deleting a delivery method has no impact on your previous purchases.

{% endinfo_block %}

To delete a delivery method:

1. In the *Actions* column, click **Delete** for the delivery method you want to delete. This redirects you to the *Delete Delivery Method* page.
2. Under **Are you sure about deleting this delivery method?**, select one of the two options:
   * **No, I want to keep this delivery method** if you want to cancel the deletion of the delivery method. This redirects you to the list of delivery methods.
   * **Yes, delete this delivery method** if you want to delete the delivery method. This deletes the delivery method and redirects you to the list of delivery methods.

**Online Store**
![Online store](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Administration/Shipment/Creating+and+Managing+Shipment+Methods/online-store.png)
