---
title: Managing global thresholds
description: Use the procedures to set up hard and soft thresholds when working with global thresholds in the Back Office.
last_updated: Sep 15, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/managing-global-thresholds
originalArticleId: 2b6b682f-8e53-4119-9793-717803c4213e
redirect_from:
  - /v6/docs/managing-global-thresholds
  - /v6/docs/en/managing-global-thresholds
related:
  - title: Managing Merchant Order Thresholds
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/managing-merchant-order-thresholds.html
  - title: Managing Merchant Relations
    link: docs/scos/user/back-office-user-guides/page.version/marketplace/merchants-and-merchant-relations/managing-merchant-relations.html
  - title: Managing Threshold Settings
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/managing-threshold-settings.html
---

This topic describes how to manage global thresholds.

To start working with global thresholds, go to **Administration** > **Global threshold**.
***
## Setting up a Hard Minimum Threshold
To set up a [hard minimum threshold](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#hard-minimum-threshold):
1. On the *Edit Global threshold* page, select the **Store and Currency** you want to configure the threshold for.
2. In the *Minimum Hard Threshold* section, populate the **Enter threshold value** field.
3. Enter a **Message** for all the locales.
4. Scroll down the page and select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

See [Threshold: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/references/reference-information-threshold.html) to know more about the hard threshold.

## Setting up a Hard Maximum Threshold

To set up a [hard maximum threshold](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#hard-maximum-threshold):

1. On the *Edit Global threshold* page, select the **Store and Currency** you want to configure the threshold for.
2. In the *Maximum Hard Threshold* section, populate the **Enter threshold value** field.
3. Enter a **Message** for all the locales.
4. Scroll down the page and select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

…



## Setting up a Soft Minimum Threshold
To set up a [soft minimum threshold](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html#soft-minimum-threshold):
1. On the *Edit Global threshold* page, select the **Store and Currency** you want to configure the threshold for.
2. In the *Soft Threshold* section, select a soft threshold type.
3. Populate the **Enter threshold value** field.
4. Based on the threshold type you have selected:
   * For the **Soft Threshold with fixed fee**, enter a **Enter fixed fee**.
   * For the **Soft Threshold with flexible fee**, enter a **Enter flexible fee**.

5. Populate a **Message** for all the locales.
6. Select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

See [Threshold: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/references/reference-information-threshold.html) to know more about the soft threshold and its types.

## Setting up Several Thresholds
To set up several threshold types:
1. Enter the fields in the sections of the thresholds you want to set up by following the respective instructions:
    * [Setting up a Hard Minimum Threshold](#setting-up-a-hard-minimum-threshold)
    * [Setting up a Hard Maximum Threshold](#setting-up-a-hard-maximum-threshold)
    * [Setting up a Soft Minimum Threshold](#setting-up-a-soft-minimum-threshold)
2. Select **Save**.

The page refreshes, and the message about successful threshold update is displayed.

**Tips and tricks**

In the **Message** field, enter *{% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %}* or *{% raw %}{{{% endraw %}fee{% raw %}}}{% endraw %}* to reference the threshold name or the defined fee, respectively. When the message is rendered on the Storefront, the placeholders are replaced with the values from **Enter threshold value** and **Enter flexible fee** or **Enter fixed fee** fields.
