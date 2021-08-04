---
title: Managing Merchant Relationships Thresholds
originalLink: https://documentation.spryker.com/v4/docs/managing-merchant-relationships-thresholds
redirect_from:
  - /v4/docs/managing-merchant-relationships-thresholds
  - /v4/docs/en/managing-merchant-relationships-thresholds
---

This topic describes the procedures for managing thresholds per merchant relation.
***
To start working with Merchant Relationships thresholds, navigate to the **Threshold > Merchant relationships** section.
***
{% info_block warningBox "Note" %}
Thresholds for merchant relationships do work only for a certain merchant relationship that was created in the **Merchant Relations** section in the Back Office.
{% endinfo_block %}

This type of threshold is managed by editing a specific merchant relation. 
 
The list of available merchant relations in the Merchant relationships table is build based on the relations that were previously added to the **Merchant > Merchant Relations** section in the Back Office. So those need to be created you can proceed to the minimum order value setup.
Every merchant relationship can have both hard and soft threshold. The thresholds need to be configured for every store and currency.
***
## Setting up a Hard Threshold

To set up a hard threshold for a specific merchant relation:
1. On the **Merchant relationships**,  click **Edit** in the _Actions_ column.
2. On the **Edit Merchant Relationship Threshold** page, from the drop-down list select the store and currency for which you configure the minimum order value.
3. Populate the **Enter threshold value** field.
4. Enter the message for both locales.
5. For the Soft Threshold, select **None** and click **Save**.

See [Threshold: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/thresholds/references/threshold-refer) to know more about the hard threshold.
***
## Setting up a Soft Threshold

To set up a soft threshold for a merchant relation:
1. On the **Merchant relationships** page, click **Edit** in the _Actions_ column.
2. On the **Edit Merchant Relationship Threshold** page, from the drop-down list select the store and currency for which you configure the minimum order value.
3. **Do not** populate the *Hard Threshold* section.
4. Depending on the soft threshold that you want to set up, select the soft threshold type.
5. Enter the threshold value and, in addition to it, the respective fields based on the type you have selected:
    * For the **Soft Threshold with message**:
       N/A
   *  For the **Soft Threshold with fixed fee**:
        Enter the **fixed fee** value.
    * For the **Soft Threshold with flexible fee**:
        Enter the **flexible fee** value.
6. Populate the **Message** field for both locales.
7. Click **Save**.

See [Threshold: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/thresholds/references/threshold-refer) to know more about the soft threshold and its types.
***
## Setting up both Hard and Soft Threshold

To set up both threshold types:

1. Populate both the **Hard Threshold** and **Soft Threshold** sections, following the procedures described above.
2. Click **Save**.
