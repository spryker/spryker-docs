---
title: Edit delivery methods
description: Learn how to edit delivery methods in the Back Office.
last_updated: May 31, 2022
template: back-office-user-guide-template
redirect_from:
  - /docs/scos/user/back-office-user-guides/202108.0/administration/delivery-methods/creating-and-managing-delivery-methods.html
  - /docs/scos/user/back-office-user-guides/202311.0/administration/delivery-methods/edit-delivery-methods.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/manage-in-the-back-office/edit-delivery-methods.html
---

This doc describes how to edit delivery methods.

## Prerequisites

1. Go to **Administration&nbsp;<span aria-label="and then">></span> Delivery Methods**.
2. On the **Delivery Methods** page, next to the delivery method you want to edit, click **Edit**.

## Edit general settings of a delivery method

1. On the **Edit** page, click the **Configuration** tab.
2. Enter a **NAME**.
3. Select a **CARRIER**.
4. Select an **AVAILABILITY PLUGIN**.
5. Select a **PRICE PLUGIN**.
6. Select a **DELIVERY TIME PLUGIN**.
7. For **IS ACTIVE**, do one of the following:
    * To make the delivery method available on the Storefront, select the checkbox.
    * To make the delivery method unavailable on the Storefront, clear the checkbox.
8. Click **Save**.
    This opens the **Delivery Methods** page with a success message displayed.

## Edit prices of a delivery method

1. On the **Edit** page, click the **Price & Tax** tab.
2. Enter the needed prices per needed locales.
3. Select a **TAX SET**.
4. Click **Save**.
    This opens the **Delivery Methods** page with a success message displayed.


## Edit store relations of a delivery method

1. On the **Edit** page, click the **Store Relation** tab.
2. For **AVAILABLE IN THE FOLLOWING STORE(S)**, do any of the following:
    * Select the checkboxes next to the stores you want to make the method available for.
    * Clear the checkboxes next to the stores you want to make the method unavailable for.
3. Click **Save**.
    This opens the **Delivery Methods** page with a success message displayed.

## Reference information: Edit delivery methods


| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| DELIVERY METHOD KEY | The unique identifier of the delivery method. |
| NAME | The name of the delivery method displayed on the Storefront. |
| CARRIER | The carrier company that's handling the delivery of this method. To add one, see [Add carrier companies](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-carrier-companies.html). |
| AVAILABILITY PLUGIN | The plugin that checks if the delivery method is available for the customer. A developer can create plugins. |
|  PRICE PLUGIN | The plugin that calculates the price of delivery. If you select a price  plugin, it overrides the prices specified in the **Price & Tax** tab. A developer can create plugins. |
| DELIVERY TIME PLUGIN | The plugin that calculates the estimated delivery time. A developer can create plugins. |
| IS ACTIVE | Defines if customers can choose the delivery method on the Storefront. |
| TAX SET | The tax set used for the price of the method. To create tax sets, see [Create tax sets](/docs/pbc/all/tax-management/{{page.version}}/base-shop/manage-in-the-back-office/create-tax-sets.html).
| AVAILABLE IN THE FOLLOWING STORE(S) | Defines for which stores customers can choose the method. |
