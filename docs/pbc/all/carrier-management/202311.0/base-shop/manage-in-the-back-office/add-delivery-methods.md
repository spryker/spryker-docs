---
title: Add delivery methods
description: Learn how to add delivery methods in the Back Office.
last_updated: June 2, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-and-managing-shipment-methods
originalArticleId: 66d6acae-6c36-404a-b6fb-0dbd9d71d193
redirect_from:
  - /2021080/docs/creating-and-managing-shipment-methods
  - /2021080/docs/en/creating-and-managing-shipment-methods
  - /docs/creating-and-managing-shipment-methods
  - /docs/en/creating-and-managing-shipment-methods
  - /docs/scos/user/back-office-user-guides/201811.0/administration/delivery-methods/creating-and-managing-delivery-methods.html
  - /docs/scos/user/back-office-user-guides/202204.0/administration/delivery-methods/creating-and-managing-delivery-methods.html
  - /docs/scos/user/back-office-user-guides/202204.0/administration/delivery-methods/add-delivery-methods.htmll
  - /docs/scos/user/back-office-user-guides/202311.0/administration/delivery-methods/creating-and-managing-delivery-methods.html
  - /docs/scos/user/back-office-user-guides/202311.0/administration/delivery-methods/add-delivery-methods.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/manage-in-the-back-office/add-delivery-methods.html
related:
  - title: Shipment feature overview
    link: docs/pbc/all/carrier-management/page.version/base-shop/shipment-feature-overview.html
  - title: Creating a Carrier Company
    link: docs/pbc/all/carrier-management/page.version/base-shop/manage-in-the-back-office/add-carrier-companies.html
---

This doc describes how to add delivery methods in the Back Office.

## Prerequisites

* [Create a tax set](/docs/pbc/all/tax-management/{{page.version}}/base-shop/manage-in-the-back-office/create-tax-sets.html).
* [Add a carrier company](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-carrier-companies.html).
* Review the [reference information](#reference-information-add-delivery-methods) before you start, or look up the necessary information as you go through the process.

## Add a delivery method

1. Go to **Administration&nbsp;<span aria-label="and then">></span> Delivery Methods**.
2. On the **Delivery Methods** page, click **Create new delivery method**.
3. On the **Create** page, enter a **Delivery Method Key**.
4. Enter a **NAME**.
5. Select a **CARRIER**.
6. Optional: Select an **AVAILABILITY PLUGIN**.
7. Optional: Select a **PRICE PLUGIN**.
8. Optional: Select a **DELIVERY TIME PLUGIN**.
9. To activate the delivery method after creating it, select **IS ACTIVE**.
10. Click the **Price & Tax** tab.
11. Enter the required prices per required locales.
12. Select a **TAX SET**.
13. Click the **Store Relation** tab.
14. In **AVAILABLE IN THE FOLLOWING STORE(S)**, select the stores to display the delivery method for.
15. Click **Save**.
    This opens the **Delivery Methods** page with a success message displayed. The created delivery method is displayed in the list.

## Reference information: Add delivery methods


<div class="width-100">

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| DELIVERY METHOD KEY | The unique identifier of the delivery method. |
| NAME | The name of the delivery method to be displayed on the Storefront. |
| CARRIER | The carrier company that will be handling the delivery of this method. To add one, see [Add carrier companies](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-carrier-companies.html). |
| AVAILABILITY PLUGIN | The plugin that checks if the delivery method is available for the customer. A developer can create plugins. |
|  PRICE PLUGIN | The plugin that calculates the price of delivery. If you select a price  plugin, it will override the prices specified in the **Price & Tax** tab. A developer can create plugins. |
| DELIVERY TIME PLUGIN | The plugin that calculates the estimated delivery time. A developer can create plugins. |
| IS ACTIVE | Defines if customers will be able to choose the delivery method on the Storefront. |
| TAX SET | The tax set to apply to the price of the method. To create tax sets, see [Create tax sets](/docs/pbc/all/tax-management/{{page.version}}/base-shop/manage-in-the-back-office/create-tax-sets.html).
| AVAILABLE IN THE FOLLOWING STORE(S) | Defines which stores the method will be available for. |


</div>
