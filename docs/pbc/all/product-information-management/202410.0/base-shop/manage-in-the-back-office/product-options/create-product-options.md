---
title: Create product options
description: Learn how to create product options directly in the Spryker Cloud Commerce OS Back Office.
last_updated: June 25, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-product-option
originalArticleId: 64e7486e-5904-4cc8-b336-c57dd13f9e14
redirect_from:
  - /2021080/docs/creating-a-product-option
  - /2021080/docs/en/creating-a-product-option
  - /docs/creating-a-product-option
  - /docs/en/creating-a-product-option
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/product-options/creating-product-options.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/product-options/creating-product-options.html  
  - /docs/scos/user/back-office-user-guides/202005.0/catalog/product-options/create-product-options.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/product-options/create-product-options.html
related:
  - title: Product Options feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-options-feature-overview.html
---

This document describes how to create product options. Product options are additions to products, like warranty or gift wrapping.

## Prerequisites

* [Create a tax set](/docs/pbc/all/tax-management/{{site.version}}/base-shop/manage-in-the-back-office/create-tax-sets.html) to apply to the product options.
* Review the [reference information](#reference-information-create-product-options) before you start, or look up the necessary information as you go through the process.

## Create product options

1. Go to **Products&nbsp;<span aria-label="and then">></span> Product Options**.
2. On the **Product option list** page, click **Create product option**.
3. On the **Create product option** page, enter a **GROUP NAME TRANSLATION KEY**.
4. Select a **TAX SET**.
5. Enter an **OPTION NAME TRANSLATION KEY**.
6. Enter a **SKU**.
7. For **PRICES**, enter the needed prices for the option.
8. Optional: To add one more option, click **Add option** and repeat steps 5-7.
9. Repeat steps 5-8 until you add the needed options.
10. In the **Translation** section, enter a **GROUP NAME** per locale.
11. Enter an **OPTION NAME** for each option per locale.
12. Click **Next**.
13. On the **Products** tab, select one or more products to assign the option to.
    The option will be displayed on the pages of the products.
14. Click **Save**.
    The page refreshes with a success message displayed.
15. Optional: To display the options on the Storefront, click **Activate**.
    The page refreshes with a success message displayed.


**Tips and tricks**
<br>When assigning an option to a lot of products at a time, it might be useful to double-check your selection on the  **Products to be assigned** subtab.



## Reference information: Create product options


| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| GROUP NAME TRANSLATION KEY | Glossary key for the name of product option group. For example, `product.option.group.name.wrapping`. It will be used for identifying and translating the group name per locale. |
| TAX SET | Tax set to apply to the product options. To create one, see [Create tax sets](/docs/pbc/all/tax-management/{{site.version}}/base-shop/manage-in-the-back-office/create-tax-sets.html). |
| OPTION NAME TRANSLATION KEY | Glossary key for a product option. For example, `product.option.paper.wrapping`. It will be used for identifying and translating the option name per locale. |
| SKU | Unique identifier to assign to a product option. |
| PRICES | Gross and net prices per currency per locale to sell product options for. When a price is set to 0, the options is *free of charge*.  |
| GROUP NAME | Name of the product option group that will be displayed on the Storefront. |
| OPTION NAME | Names of product options that will be displayed on the Storefront. |


### Reference information: Product options on the Storefront

**Warranty** and **Insurance** are product option groups:

![Product option example](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Options/Product+Options%3A+Reference+Information/product-option-example.png)

Product options:
![Select an option](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Options/Product+Options%3A+Reference+Information/select-option-drop-down.png)

## Next steps

[Edit product options](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-options/edit-product-options.html)
