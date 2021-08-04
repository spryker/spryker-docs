---
title: Managing Merchant Relationships Thresholds
originalLink: https://documentation.spryker.com/v5/docs/managing-merchant-relationships-thresholds
redirect_from:
  - /v5/docs/managing-merchant-relationships-thresholds
  - /v5/docs/en/managing-merchant-relationships-thresholds
---

This topic describes how to manage thresholds per merchant relation.

To start working with Merchant Relationships thresholds, go to **Administration** > **Merchant Relationships Threshold**.
***

## Prerequisites
Thresholds for merchant relationships do work only for a certain merchant relationship that was created in the **Merchant Relations** section in the Back Office.

This type of threshold is managed by editing a specific merchant relation. 
 
The list of available merchant relations in the Merchant relationships table is build based on the relations that were previously added to the **Merchant > Merchant Relations** section in the Back Office. So those need to be created you can proceed to the minimum order value setup.
Every merchant relationship can have both hard and soft threshold. The thresholds need to be configured for every store and currency.

## Setting up a Hard Threshold

To set up a hard threshold for a merchant relation:
1. On the *Merchant relationships* page,  click **Edit** next to the merchant relationship you want to set up the threshold for.
2. On the *Edit Merchant Relationship Threshold:[merchant relationship name]* page, select **Store and Currency**.
3. Enter **Enter threshold value**.
4. Enter the **Message** for all the locales.
5. Scroll down the page and click **Save**.

See [Threshold: Reference Information](https://documentation.spryker.com/docs/en/threshold-reference-information) to know more about the hard threshold.

## Setting up a Soft Threshold

To set up a soft threshold for a merchant relation:
1. On the *Merchant relationships* page, click **Edit** next to the merchant relationship you want to set up the threshold for.
2.  On the *Edit Merchant Relationship Threshold:[merchant relationship name]* page, select **Store and Currency**.
3. In the *Soft Threshold* section, select a soft threshold type.
4. Depending on the soft threshold that you want to set up, select the soft threshold type.
5. Enter **Enter threshold value**.
6. Based on the threshold type you have selected:
   *  For the **Soft Threshold with fixed fee**, enter **Enter fixed fee**.
    * For the **Soft Threshold with flexible fee**, enter **Enter flexible fee**.
7. Enter **Message** for all the locales.
8. Click **Save**.

See [Threshold: Reference Information](https://documentation.spryker.com/docs/en/threshold-reference-information) to know more about the soft threshold and its types.

## Setting up both Hard and Soft Threshold
To set up both threshold types:
1. Enter the fields both in the *Hard Threshold* and *Soft Threshold* sections following the steps in [Setting up a Hard Threshold](#setting-up-a-hard-threshold) and [Setting up a Soft Threshold](#setting-up-a-soft-threshold).
2. Click **Save**.

