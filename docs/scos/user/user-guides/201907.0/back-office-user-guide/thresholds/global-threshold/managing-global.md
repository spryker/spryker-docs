---
title: Managing Global Threshold
originalLink: https://documentation.spryker.com/v3/docs/managing-global-threshold
redirect_from:
  - /v3/docs/managing-global-threshold
  - /v3/docs/en/managing-global-threshold
---

This topic describes the procedures for managing thresholds per merchant relation.
***
To start working with Merchant Relationships global threshold, navigate to the **Threshold > Global threshold** section.
***
## Setting up a Hard Threshold
To set up a hard threshold for a merchant relation:
1. On the **Edit Global threshold** page in the **Store and Currency** drop-down list, select the store and currency for which you configure the minimum order value.
2. Populate the **Enter threshold value** field.
3. Enter the message for both locales.
4. For the Soft Threshold, select **None** and click **Save**.

See [Threshold: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/thresholds/references/threshold-refer) to know more about the hard threshold.
***
## Setting up a Soft Threshold
To set up a soft threshold for a merchant relation:
1. On the **Edit Global threshold** page in the **Store and Currency** drop-down list, select the store and currency for which you configure the minimum order value.
2. **Do not** populate the _Hard Threshold_ section.
3. Depending on the soft threshold that you want to set up, select the soft threshold type.
4. Enter the threshold value and, in addition to it, the respective fields based on the type you have selected:
    * For the **Soft Threshold with message**:
       N/A
   *  For the **Soft Threshold with fixed fee**:
        Enter the **fixed fee** value.
    * For the **Soft Threshold with flexible fee**:
        Enter the **flexible fee** value.
5. Populate the **Message** field for both locales.
6. Click **Save**.

See [Threshold: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/thresholds/references/threshold-refer) to know more about the soft threshold and its types.
***
## Setting up both Hard and Soft Threshold
To set up both threshold types:
1. Populate both the **Hard Threshold** and **Soft Threshold** sections following the procedures described above.
2. Click **Save**.
