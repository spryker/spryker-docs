---
title: Managing product options
last_updated: Apr 21, 2021
description: Use this document to manage product options in the Back Office.
template: back-office-user-guide-template
---

This document describes how to manage product options.

## Prerequisites

To start working with product options, go to **Catalog** > **Product Options**.


Each section in this article contains reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.


## Filtering product options by merchants

You can view product options of all merchants or individual ones. 

To filter the product options by merchants, in the *Merchants* dropdown, select a merchant. The *Product options list* table will display only the product options of the selected merchant.

## Viewing a product option

To view a product option, select **View** next to the desired product option.

## Editing general settings of a product option

To edit general settings of a product option, do the following:
1. Select **Edit** next to the product option you want to edit the general settings of.
2. Update the desired settings.
3. Select **Save**.
 This refershes the page with the success message displayed. 
 
### Reference information: Editing general settings a product option 

The following table describes the attributes you enter and select while editing product options.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Group name translation key | Glossary key of the product option group. You can enter this value only when [creating product options](/docs/marketplace/user/back-office-user-guides/{{ page.version }}/catalog/product-options/creating-product-options.html). |
| Tax Set | Conditions under which the product option group is taxed. See [Managing tax sets](https://documentation.spryker.com/docs/managing-tax-sets) to learn how to create tax sets. |
| Option name translation key | Glossary key for the product option value. You can enter this value only when [creating product options](/docs/marketplace/user/back-office-user-guides/{{ page.version }}/catalog/product-options/creating-product-options.html). |
| SKU | Unique identifier of the product option value. You can enter this value only when [creating product options](/docs/marketplace/user/back-office-user-guides/{{ page.version }}/catalog/product-options/creating-product-options.html). |
| Gross price and Net price | Price values of the product option value for gross and net modes. Prices are integer values and, in the database, they are stored in their normalized form. For example, `4EUR` is stored as `400`. If you do not define a price for a product option value, it is considered *inactive* for that specific currency and price mode. If a price is `0`, it is considered *free of charge*.|
| Group name | Option group name that's displayed on the Storefront. |
| Option name | Option name that's displayed on the Storefront. | 



## Assigning products to a prooduct option

To assign products to a product option, do the following:
1. Select **Edit** next to the product option you want to assign product to.
2. On the *Edit product option* page, switch to **Products** tab. 
3. Select the desired products. 
4. Select **Save**
    This refershes the page with the success message displayed. 

**Tips and tricks**


* To select all the products on the page, select **Deselect all on the page**. This is usually useful when you filter the products using the search field.
* After selecting products, you can view the products to be assigned in the **Products to be assigned** subtab. To unselect a product from being assigned, select **Remove** next to the desired product. 

## Deassigning products from a product option

To deassign products from a product option, do the following:
1. Select **Edit** next to the product option you want to deassign product from.
2. On the *Edit product option* page, switch to **Products** > **Assigned products** subtab. 
3. Deselect the desired products. 
4. Select **Save**
    This refershes the page with the success message displayed. 

**Tips and tricks**

* To deselect all the products on the page, select **Deselect all on the page**. This is usually useful when you filter the products using the search field.
* After deselecting products, you can view the products to be deassigned in the **Products to be deassigned** subtab. To unselect a product from being deassigned, select **Remove** next to the desired product. 

## Activating and deactivating product options

To activate a product option, select **Activate** next to the desired product option.

To deactivate a product option, select **Dectivate** next to the desired product option.



 
