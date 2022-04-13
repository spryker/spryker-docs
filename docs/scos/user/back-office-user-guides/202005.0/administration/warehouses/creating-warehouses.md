---
title: Creating a Warehouse
description: Use the procedure to create warehouses and define warehouses per specific stores in the Back Office.
last_updated: Sep 14, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v5/docs/creating-a-warehouse
originalArticleId: 113f7a9d-02fc-4cab-af5b-51984f51bd33
redirect_from:
  - /v5/docs/creating-a-warehouse
  - /v5/docs/en/creating-a-warehouse
related:
  - title: Warehouses- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/administration/warehouses/references/warehouses-reference-information.html
---

The topic describes how to create a warehouse in the Back Office.

To start working with warehouses, go to **Administration** > **Warehouses** section.
***
To create a warehouse:

1. On the **Warehouses** page, click **Create Warehouse** in the top right corner.
The **Create warehouse** page with two tabs opens - **Configuration** and **Store relation**. See [Warehouses: Reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/warehouses/references/warehouses-reference-information.html) for more details.
2. In the **Configuration** tab, do the following:
    * **Name**: Enter the name of the warehouse you want to create.
    * **Is this warehouse available?**: Select *Yes* if you want to make your warehouse available (active) or *No* if you want to make your warehouse unavailable (inactive).
3. (optional) Switch to the **Store relation** tab. By default, the warehouse you are creating will be available for all the stores you have.
To make your warehouse unavailable for a specific store(s), clear the checkbox for that(those) store(s).

{% info_block warningBox "Note" %}
Keep in mind that if you clear all checkboxes for stores assigned to a specific warehouse, this warehouse won't appear on the **Edit Stock** page.
{% endinfo_block %}

4. To keep the changes, click **Save**. This will redirect you to the **Warehouses** page where you can see the new warehouse in the table and the following message: '*Warehouse has been successfully saved*'.

***
**What's next?**

The warehouse has been created. You can start working with it when creating or editing a concrete product. For more details, see [Creating a Product Variant](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/creating-product-variants.html).

Additionally, you can edit any warehouse if needed. For more details, see the [Editing Warehouse Details](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/warehouses/managing-warehouses.html#editing-warehouse-details) section in *Managing Warehouses*.

To learn more about the attributes you view or edit while creating or managing the warehouses, see [Warehouses: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/warehouses/references/warehouses-reference-information.html).

To learn how to manage stock per specific warehouse, see [Managing Product Availability](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/availability/managing-products-availability.html).
