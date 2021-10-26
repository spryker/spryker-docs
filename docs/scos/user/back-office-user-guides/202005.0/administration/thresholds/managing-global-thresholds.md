---
title: Managing Global Threshold
description: Use the procedures to set up hard and soft thresholds when working with global thresholds in the Back Office.
last_updated: Sep 14, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v5/docs/managing-global-thresholds
originalArticleId: 8811380a-016b-4c5e-993c-84cb0097b508
redirect_from:
  - /v5/docs/managing-global-thresholds
  - /v5/docs/en/managing-global-thresholds
related:
  - title: Managing Merchant Order Thresholds
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/managing-merchant-order-thresholds.html
  - title: Managing Merchant Relations
    link: docs/scos/user/back-office-user-guides/page.version/marketplace/merchants-and-merchant-relations/managing-merchant-relations.html
  - title: Managing Threshold Settings
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/managing-threshold-settings.html
  - title: Threshold- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/references/threshold-reference-information.html
---

This topic describes how to manage global thresholds.

To start working with global thresholds, go to **Administration** > **Global threshold**.
***
## Setting up a Hard Threshold
To set up a hard threshold:
1. On the *Edit Global threshold* page, select the **Store and Currency** you want to configure the threshold for.
2. Enter **Enter threshold value**.
3. Enter **Message** for all the locales.
4. Scroll down the page and click **Save**.

See [Threshold: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/references/threshold-reference-information.html) to know more about the hard threshold.

## Setting up a Soft Threshold
To set up a soft threshold:
1. On the *Edit Global threshold* page, select the **Store and Currency** you want to configure the threshold for.
2. In the *Soft Threshold* section, select a soft threshold type.
3. Enter **Enter threshold value** 
4. Based on the threshold type you have selected:
   * For the **Soft Threshold with fixed fee**, enter **Enter fixed fee**.
   * For the **Soft Threshold with flexible fee**, enter **Enter flexible fee**.

5. Populate the **Message** field for all the locales.
6. Click **Save**.

See [Threshold: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/references/threshold-reference-information.html) to know more about the soft threshold and its types.

## Setting up Both Hard and Soft Threshold
To set up both threshold types:
1. Enter the fields both in the *Hard Threshold* and *Soft Threshold* sections following the steps in [Setting up a Hard Threshold](#setting-up-a-hard-threshold) and [Setting up a Soft Threshold](#setting-up-a-soft-threshold).
2. Click **Save**.

