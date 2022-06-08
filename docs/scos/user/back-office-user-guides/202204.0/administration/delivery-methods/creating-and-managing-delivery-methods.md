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
related:
  - title: Shipment feature overview
    link: docs/scos/user/features/page.version/shipment-feature-overview.html
  - title: Creating a Carrier Company
    link: docs/scos/user/back-office-user-guides/page.version/administration/delivery-methods/creating-carrier-companies.html
---

This doc describes how to add delivery methods in the Back Office.

## Prerequisites

* [Create a tax set](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-sets/create-tax-sets.html).
* [Create a carrier company](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/delivery-methods/create-carrier-companies.html).
* Review the [reference information](#reference-information-create-tax-sets) before you start, or look up the necessary information as you go through the process.

## Create a delivery method

1. Go to **Administration&nbsp;<span aria-label="and then">></span> Delivery Methods**.
2. On the **Delivery Methods** page, click **Create new delivery method**.
3. On the **Create** page, enter a **Delivery Method Key**.
4. Enter a **NAME**.
5. Select a **CARRIER**.
6. Optional: Select an **AVAILABILITY PLUGIN**.
7. Optional: Select a **PRICE PLUGIN**.

{% info_block warningBox "Note" %}
Regardless if you have multi-currency prices with multiple price modes or just one simple static price, the price plugin has priority over those prices and allows you to customize and apply logic over delivery price calculation.

{% endinfo_block %}

8. Optional: Select a **DELIVERY TIME PLUGIN**.
9. To activate the delivery method after creating it, select **IS ACTIVE**.
10. Click the **Price & Tax** tab
11. Enter the needed prices per needed locales.
12. Select a **TAX SET**.
13. Click the **Store Relation** tab.
14. For **AVAILABLE IN THE FOLLOWING STORE(S)** select the stores to display the delivery method in.
15. Click **Save**. This opens the **Delivery Methods** page with a success message displayed. The created delivery method is displayed in the list.

## Reference information: Create delivery methods

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| DELIVERY METHOD KEY | Unique identifier of the delivery method. |
| NAME | Name of the delivery method to be displayed on the Storefront. |
| CARRIER | Carrier company that will be handling the delivery of this method. To create one, see [Create carrier companies](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/delivery-methods/create-carrier-companies.html). |
| AVAILABILITY PLUGIN | Drop-down list of the Availability plugins implemented in the back-end. The purpose of this plugin is to check if the delivery method is available for the customer. |
|  PRICE PLUGIN | Drop-down list of the Price plugins. You can either provide a static price for your delivery method or select a configured price plugin. |
| DELIVERY TIME PLUGIN | Drop-down list of the Delivery time plugins implemented in the back-end. The purpose of this plugin is to calculate the estimated time for the delivery method. |
| Is active | Checkbox that allows enabling or disabling the delivery method. |
| TAX SET | [create tax sets](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-sets/create-tax-sets.html).
| AVAILABLE IN THE FOLLOWING STORE(S) |
