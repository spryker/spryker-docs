---
title: Define merchant order thresholds
description: Learn how to define thresholds for merchant relationships in the Back Office.
last_updated: May 31, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-merchant-order-thresholds
originalArticleId: ae8c2d52-29d3-4315-b8c7-0cdffdb7ba2a
redirect_from:
  - /2021080/docs/managing-merchant-order-thresholds
  - /2021080/docs/en/managing-merchant-order-thresholds
  - /docs/managing-merchant-order-thresholds
  - /docs/en/managing-merchant-order-thresholds
  - /docs/scos/user/back-office-user-guides/202204.0/administration/thresholds/managing-merchant-order-thresholds.html
  - /docs/scos/user/back-office-user-guides/202307.0/administration/define-merchant-order-thresholds.html
related:
  - title: Managing Global Thresholds
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-in-the-back-office/define-global-thresholds.html
  - title: Managing Threshold Settings
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-in-the-back-office/manage-threshold-settings.html
  - title: Order Thresholds feature overview
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/feature-overviews/checkout-feature-overview/order-thresholds-overview.html
---

This doc describes how to manage [merchant order thresholds](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/checkout-feature-overview/order-thresholds-overview.html#merchant-order-thresholds) in the Back Office.



## Prerequisites

* [Create a merchant](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/manage-in-the-back-office/create-merchants.html).
* Review the [reference information](#reference-information-define-merchant-order-thresholds) before you start, or look up the necessary information as you go through the process.

To start working with merchant order thresholds, do the following:
1. Go to **Administration&nbsp;<span aria-label="and then">></span> Merchant Relationships Threshold**.
    This opens the **Merchant Relationships Threshold** page.
2. Next to the merchant relationship you want to set up the threshold for, click **Edit**.

## Define a minimum hard threshold for a merchant relationship

1. On the **Edit Merchant Relationship Threshold** page, select **STORE AND CURRENCY**.
2. In the **Hard Threshold** pane, for **ENTER THRESHOLD VALUE**, enter a price value.
3. Enter a **MESSAGE** for all the locales.
4. Scroll down the page and select **Save**.

The page refreshes with a success message displayed.


## Define a maximum hard threshold for a merchant relationship

1. On the **Edit Merchant Relationship Threshold** page, select the **STORE AND CURRENCY** you want to configure the threshold for.
2. In the **Hard Maximum Threshold** pane, for **ENTER THRESHOLD VALUE** field.
3. Enter a **MESSAGE** for all the locales.
4. Scroll down the page and select **Save**.

The page refreshes with a success message displayed.

## Define a minimum soft threshold for a merchant relationship

1. On the **Edit Merchant Relationship Threshold** page, select **STORE AND CURRENCY**.
2. In the **Soft Threshold** pane, select a soft threshold type.
3. Fill the **ENTER THRESHOLD VALUE** field.
4. Based on the threshold type you have selected:
   *  For the **Soft Threshold with fixed fee**, enter a **Enter fixed fee**.
   * For the **Soft Threshold with flexible fee**, enter a **Enter flexible fee**.
5. Enter a **MESSAGE** for all the locales.
6. Select **Save**.

The page refreshes with a success message displayed.


## Reference information: Define merchant order thresholds

| ATTRIBUTE |DESCRIPTION|
| --- | --- |
| STORE AND CURRENCY | Defines the store to which the threshold is applied and the currency in which it is displayed. |
| ENTER THRESHOLD VALUE | Depending on the threshold type, defines the value that should be reached or not reached.|
|MESSAGE |Short message that informs the customer about the threshold conditions. For example, _You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout._ <br><br> Enter {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} or {% raw %}{{{% endraw %}fee{% raw %}}}{% endraw %} to reference the threshold name or the defined fee respectively. When the message is rendered on the Storefront, the placeholders are replaced with the values from **Enter threshold value** and **Enter flexible fee** or **Enter fixed fee** fields. |
| ENTER FIXED FEE | Adds this value to cart if the threshold is not reached. |
| ENTER FLEXIBLE FEE | Percentage of an order's sub-total that is added to cart if the threshold is not reached.|


**Tips and tricks**
<br>In the **MESSAGE** field, enter *{% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %}* or *{% raw %}{{{% endraw %}fee{% raw %}}}{% endraw %}* to reference the threshold name or the defined fee, respectively. When the message is rendered on the Storefront, the placeholders are replaced with the values from **ENTER THRESHOLD VALUE** and **Enter flexible fee** or **Enter fixed fee** fields.
