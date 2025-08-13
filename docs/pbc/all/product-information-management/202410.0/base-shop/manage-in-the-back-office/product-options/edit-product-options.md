---
title: Edit product options
description: Learn how to edit product options directly in the Spryker Cloud Commerce OS Back Office.
last_updated: June 25, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-product-options
originalArticleId: 20dd9771-8cf2-4740-b74e-3326eceaf5c2
redirect_from:
  - /2021080/docs/managing-product-options
  - /2021080/docs/en/managing-product-options
  - /docs/managing-product-options
  - /docs/en/managing-product-options
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/product-options/managing-product-options.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/product-options/managing-product-options.html  
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/product-options/edit-product-options.html
related:
  - title: Product Options feature overview
    link: docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-options-feature-overview.html
---

To edit product options in the Back Office, follow the steps below.

## Prerequisites

1. Go to **Products&nbsp;<span aria-label="and then">></span> Product Options**.
    This opens the **Product option list** page.
2. Next to the product option you want to edit, click **Create product option**.

Review the [reference information](#reference-information-edit-general-settings-of-product-options) before you start, or look up the necessary information as you go through the process.

## Edit general settings of product options

1. On the **Edit product option** page, click the **General Information** tab.
2. Select a **TAX SET**.
3. For **PRICES**, enter prices for needed options.
4. Next to the product options you want to remove, click **Remove**.
5. To add a product option, do the following:
    1. Click **Add option**.
    2. Enter an **OPTION NAME TRANSLATION KEY**.
    3. Enter a **SKU**.
    4. For **PRICES**, enter needed prices for the option.
6. Repeat step 5 until you add the needed options.
7. In the **Translation** section, enter a **GROUP NAME** per locale.
8. Enter an **OPTION NAME** per locale.
9. Click **Save**.
    The page refreshes with a success message displayed.


## Reference information: Edit general settings of product options


| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| GROUP NAME TRANSLATION KEY | Glossary key of the product option group. |
| TAX SET | Tax set to apply to the product options. To create one, see [Create tax sets](/docs/pbc/all/tax-management/{{site.version}}/base-shop/manage-in-the-back-office/create-tax-sets.html). |
| OPTION NAME TRANSLATION KEY | Glossary key of a product option. |
| SKU | Unique identifier of a product option. |
| PRICES | Gross and net values per currency per locale. When a price is set to 0, the options is *free of charge*.  |
| GROUP NAME | Name of the product option group that is displayed on the Storefront. |
| OPTION NAME | Names of product options that are displayed on the Storefront. |

## Assign and deassign product options from products

1. On the **Edit product option** page, click the **Products** tab.
2. On the **All products** subtab, select the products you want to assign the option to.
    The product options will be displayed on the pages of the selected products.
3. Click the **Assigned products** subtab.
4. Clear the checkboxes next to the products you want to deassign the option from.
    The product options will be removed from the pages of the products.
5. Click **Save**.
    The page refreshes with a success message displayed. You can check the updated selection in the **Assigned products** subtab.

**Tips and tricks**
<br>When assigning and deassigning a lot of products at a time, it may be useful to double-check your selection in **Products to be assigned** and **Products to be deassigned** tabs respectively.


## Reference information: Product options on the Storefront

**Warranty** and **Insurance** are product option groups:

![Product option example](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Options/Product+Options%3A+Reference+Information/product-option-example.png)

Product options:
![Select an option](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Options/Product+Options%3A+Reference+Information/select-option-drop-down.png)
