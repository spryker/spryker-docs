---
title: Managing merchant order thresholds
description: Use the procedures to edit soft and hard thresholds per specific merchant relationship in the Back Office.
last_updated: Aug 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-merchant-order-thresholds
originalArticleId: ae8c2d52-29d3-4315-b8c7-0cdffdb7ba2a
redirect_from:
  - /2021080/docs/managing-merchant-order-thresholds
  - /2021080/docs/en/managing-merchant-order-thresholds
  - /docs/managing-merchant-order-thresholds
  - /docs/en/managing-merchant-order-thresholds
related:
  - title: Managing Global Thresholds
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/managing-global-thresholds.html
  - title: Managing Threshold Settings
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/managing-threshold-settings.html
---

This topic describes how to manage [merchant order thresholds](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#merchant-order-thresholds).

To start working with merchant order thresholds, go to **Administration** > **Merchant Relationships Threshold**.

## Prerequisites

The list of the merchant relations for which you can define thresholds is based on the merchant relations created in **Merchant** > **Merchant Relations**. See [Creating a Merchant](/docs/scos/user/back-office-user-guides/{{page.version}}/marketplace/merchants-and-merchant-relations/managing-merchants.html#creating-a-merchant) to learn more.

## Setting up Minimum Hard  Threshold

To set up a [hard minimum threshold](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#hard-minimum-threshold) for a merchant relation:
1. On the *Merchant relationships* page, select **Edit** next to the merchant relationship you want to set up the threshold for.
2. On the *Edit Merchant Relationship Threshold:{merchant relationship name}* page, select the **Store and Currency** you want to configure the threshold for.
3. In the *Hard Threshold* section, populate the **Enter threshold value** field.
4. In **Message**, enter a message for all the locales.
5. Scroll down the page and select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

See [Reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-global-thresholds.html#reference-information) to know more about the attributes of Hard Minimum Threshold.


## Setting up Maximum Hard  Threshold

To set up a [hard maximum threshold](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#hard-maximum-threshold) for a merchant relation:

1. On the *Merchant relationships* page, select **Edit** next to the merchant relationship you want to set up the threshold for.
2. On the *Edit Merchant Relationship Threshold:{merchant relationship name}* page, select the **Store and Currency** you want to configure the threshold for.
3. In the *Hard Maximum Threshold* section, fill the **Enter threshold value** field.
4. Enter a **Message** for all the locales.
5. Scroll down the page and select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

See [Reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-global-thresholds.html#reference-information) to know more about the attributes of Hard Maximum Threshold.

## Setting up a soft minimum threshold

To set up a [soft minimum threshold](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#soft-minimum-threshold) for a merchant relation:
1. On the *Merchant relationships* page, select **Edit** next to the merchant relationship you want to set up the threshold for.
2.  On the *Edit Merchant Relationship Threshold:{merchant relationship name}* page, select the **Store and Currency** you want to configure the threshold for.
3. In the *Soft Threshold* section, select a soft threshold type.
4. Fill the **Enter threshold value** field.
5. Based on the threshold type you have selected:
   *  For the **Soft Threshold with fixed fee**, enter a **Enter fixed fee**.
    * For the **Soft Threshold with flexible fee**, enter a **Enter flexible fee**.
6. Enter a **Message** for all the locales.
7. Select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

See [Reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-global-thresholds.html#reference-information) to know more about the soft threshold and its types.

## Setting up several thresholds

To set up several threshold types:
1. Enter the fields in the sections of the thresholds you want to set up by following the respective instructions:
    * [Setting up a Hard Minimum Threshold](#setting-up-minimum-hard--threshold)
    * [Setting up a Hard Maximum Threshold](#setting-up-maximum-hard--threshold)
    * [Setting up a Soft Minimum Threshold](#setting-up-a-soft-minimum-threshold)
2. Select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

**Tips and tricks**
<br>In the **Message** field, enter *{% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %}* or *{% raw %}{{{% endraw %}fee{% raw %}}}{% endraw %}* to reference the threshold name or the defined fee, respectively. When the message is rendered on the Storefront, the placeholders are replaced with the values from **Enter threshold value** and **Enter flexible fee** or **Enter fixed fee** fields.
